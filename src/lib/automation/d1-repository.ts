/**
 * OLoka News Automation - D1 Database Repository & State Management
 * 
 * Works seamlessly in both Cloudflare Workers runtime (D1 binding)
 * and external CLI / GitHub Actions runners (via Cloudflare REST API).
 * 
 * Manages:
 * - news_automation_config
 * - news_automation_sources
 * - news_candidates
 * - news_automation_logs
 * - news_automation_locks (Distributed Lock)
 * - Publishing into the main `articles` and `articles_tags` tables
 */

import { AutomationConfig, AutomationLogEntry, EnrichedArticle, NewsCandidate, NewsSource } from './types'

export interface D1Executor {
  prepare: (query: string) => {
    bind: (...params: any[]) => {
      run: () => Promise<any>
      all: () => Promise<{ results: any[] }>
      first: () => Promise<any>
    }
  }
  exec?: (query: string) => Promise<any>
}

/**
 * Initializes all automation tables in Cloudflare D1 if they do not exist
 */
export async function initializeAutomationTables(db: D1Executor): Promise<void> {
  const statements = [
    `CREATE TABLE IF NOT EXISTS news_automation_config (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
    );`,

    `CREATE TABLE IF NOT EXISTS news_automation_sources (
      source_id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      domain TEXT NOT NULL,
      rss_url TEXT NOT NULL,
      license_type TEXT NOT NULL,
      enabled INTEGER DEFAULT 1,
      last_crawl_at TEXT,
      consecutive_errors INTEGER DEFAULT 0,
      updated_at TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
    );`,

    `CREATE TABLE IF NOT EXISTS news_candidates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      guid TEXT NOT NULL,
      source_id TEXT NOT NULL,
      original_url TEXT NOT NULL,
      canonical_url TEXT NOT NULL,
      title TEXT NOT NULL,
      original_author TEXT,
      published_at TEXT,
      license TEXT NOT NULL,
      license_verified INTEGER DEFAULT 1,
      category_slug TEXT NOT NULL,
      score INTEGER DEFAULT 0,
      fingerprint TEXT NOT NULL,
      status TEXT DEFAULT 'discovered',
      rejection_reason TEXT,
      created_at TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
      updated_at TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
    );`,
    `CREATE INDEX IF NOT EXISTS news_candidates_fingerprint_idx ON news_candidates (fingerprint);`,
    `CREATE INDEX IF NOT EXISTS news_candidates_canonical_url_idx ON news_candidates (canonical_url);`,
    `CREATE INDEX IF NOT EXISTS news_candidates_status_idx ON news_candidates (status);`,

    `CREATE TABLE IF NOT EXISTS news_automation_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      job_id TEXT NOT NULL,
      run_type TEXT NOT NULL,
      status TEXT NOT NULL,
      articles_discovered INTEGER DEFAULT 0,
      articles_eligible INTEGER DEFAULT 0,
      article_published_slug TEXT,
      article_published_title TEXT,
      execution_time_ms INTEGER DEFAULT 0,
      error_details TEXT,
      created_at TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
    );`,

    `CREATE TABLE IF NOT EXISTS news_automation_locks (
      lock_key TEXT PRIMARY KEY,
      locked_by TEXT NOT NULL,
      locked_at TEXT NOT NULL,
      expires_at TEXT NOT NULL
    );`,
  ]

  for (const sql of statements) {
    await db.prepare(sql).bind().run()
  }
}

/**
 * Distributed Lock Management
 * Prevents concurrent execution of overlapping cron runs.
 */
export async function acquireDistributedLock(
  db: D1Executor,
  lockKey: string = 'news_automation_cron_lock',
  lockedBy: string = 'cron_worker',
  ttlSeconds: number = 900, // 15 minutes TTL
): Promise<boolean> {
  const now = new Date()
  const expiresAt = new Date(now.getTime() + ttlSeconds * 1000).toISOString()
  const nowIso = now.toISOString()

  // Clean expired locks
  await db
    .prepare('DELETE FROM news_automation_locks WHERE lock_key = ? AND expires_at < ?')
    .bind(lockKey, nowIso)
    .run()

  // Attempt to acquire lock
  try {
    const res = await db
      .prepare('INSERT INTO news_automation_locks (lock_key, locked_by, locked_at, expires_at) VALUES (?, ?, ?, ?)')
      .bind(lockKey, lockedBy, nowIso, expiresAt)
      .run()
    return true
  } catch {
    // Lock already held by another process
    return false
  }
}

export async function releaseDistributedLock(
  db: D1Executor,
  lockKey: string = 'news_automation_cron_lock',
): Promise<void> {
  try {
    await db.prepare('DELETE FROM news_automation_locks WHERE lock_key = ?').bind(lockKey).run()
  } catch {
    // Ignore cleanup error
  }
}

/**
 * Checks whether an article with the same fingerprint or URL has already been processed or published
 */
export async function isArticleDuplicate(
  db: D1Executor,
  canonicalUrl: string,
  fingerprint: string,
): Promise<{ isDuplicate: boolean; reason?: string }> {
  // Check in candidates table
  const candidateCheck = await db
    .prepare(
      "SELECT id, status, title FROM news_candidates WHERE (canonical_url = ? OR fingerprint = ?) AND status IN ('published', 'drafted', 'approved')",
    )
    .bind(canonicalUrl, fingerprint)
    .first()

  if (candidateCheck) {
    return {
      isDuplicate: true,
      reason: `Trùng lặp với bài ứng viên #${candidateCheck.id} (${candidateCheck.status}): "${candidateCheck.title}"`,
    }
  }

  // Check in articles table (by slug or direct check)
  const articleCheck = await db
    .prepare('SELECT id, title, slug FROM articles WHERE slug = ? LIMIT 1')
    .bind(canonicalUrl)
    .first()

  if (articleCheck) {
    return {
      isDuplicate: true,
      reason: `Trùng lặp với bài viết đã xuất bản #${articleCheck.id}: "${articleCheck.title}"`,
    }
  }

  return { isDuplicate: false }
}

/**
 * Checks how many articles have been published in the last 24 hours (Daily rate limiting)
 */
export async function getPublishedArticlesCountToday(db: D1Executor): Promise<number> {
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  const res = await db
    .prepare("SELECT COUNT(*) as count FROM news_automation_logs WHERE status = 'success' AND article_published_slug IS NOT NULL AND created_at >= ?")
    .bind(since)
    .first()

  return res?.count || 0
}

/**
 * Saves candidate into `news_candidates`
 */
export async function saveCandidate(db: D1Executor, candidate: NewsCandidate): Promise<number> {
  const res = await db
    .prepare(
      `INSERT INTO news_candidates (
        guid, source_id, original_url, canonical_url, title, original_author,
        published_at, license, license_verified, category_slug, score,
        fingerprint, status, rejection_reason
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      candidate.guid,
      candidate.sourceId,
      candidate.originalUrl,
      candidate.canonicalUrl,
      candidate.title,
      candidate.originalAuthor || 'Unknown',
      candidate.originalPublishedAt,
      candidate.license,
      candidate.licenseVerified ? 1 : 0,
      candidate.categorySlug,
      candidate.score || 0,
      candidate.fingerprint,
      candidate.status,
      candidate.rejectionReason || null,
    )
    .run()

  return res?.meta?.last_row_id || 1
}

/**
 * Publishes an EnrichedArticle directly into the main `articles` and `articles_tags` tables in D1
 */
export async function publishArticleToD1(
  db: D1Executor,
  article: EnrichedArticle,
  status: 'published' | 'draft' = 'published',
): Promise<number> {
  const now = new Date().toISOString()
  const lexicalContentStr = JSON.stringify(article.lexicalContent)

  const insertRes = await db
    .prepare(
      `INSERT INTO articles (
        title, slug, excerpt, category_id, image_url, content,
        featured, status, published_at, updated_at, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      article.titleVi,
      article.slug,
      article.excerptVi,
      article.categoryId,
      article.image.url,
      lexicalContentStr,
      article.featured ? 1 : 0,
      status,
      now,
      now,
      now,
    )
    .run()

  const articleId = insertRes?.meta?.last_row_id || 0

  // Insert tags into `articles_tags`
  if (articleId && article.tags && article.tags.length > 0) {
    for (let i = 0; i < article.tags.length; i++) {
      const tag = article.tags[i]
      const tagId = `tag_${articleId}_${i}`
      await db
        .prepare('INSERT INTO articles_tags (_order, _parent_id, id, tag) VALUES (?, ?, ?, ?)')
        .bind(i + 1, articleId, tagId, tag)
        .run()
    }
  }

  return articleId
}

/**
 * Records pipeline execution log in `news_automation_logs`
 */
export async function recordAutomationLog(db: D1Executor, log: AutomationLogEntry): Promise<void> {
  await db
    .prepare(
      `INSERT INTO news_automation_logs (
        job_id, run_type, status, articles_discovered, articles_eligible,
        article_published_slug, article_published_title, execution_time_ms,
        error_details, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      log.jobId,
      log.runType,
      log.status,
      log.articlesDiscovered,
      log.articlesEligible,
      log.articlePublishedSlug || null,
      log.articlePublishedTitle || null,
      log.executionTimeMs,
      log.errorDetails || null,
      log.createdAt,
    )
    .run()
}
