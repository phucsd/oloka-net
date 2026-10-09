/**
 * OLoka News Automation - End-to-End Orchestration Pipeline
 * 
 * Executes the complete 12-stage workflow:
 * 1. Acquire Distributed Lock (concurrency protection)
 * 2. Check Configuration & Daily Frequency (max 8/day, max 1/run)
 * 3. Discover: Fetch enabled RSS feeds
 * 4. Verify License: Strict copyright rule engine per article
 * 5. Rank: 100-point scoring algorithm (threshold >= 75)
 * 6. Deduplicate: URL, GUID, Fingerprint & Semantic checks
 * 7. Select: Pick highest-ranking eligible candidate
 * 8. Research & Translate: Professional Vietnamese journalism style
 * 9. Enrich: 3 H2 sections, takeaways, expert quotes, references
 * 10. Acquire Images: Safe CC/editorial image with SSRF protection
 * 11. Validate: Word count, schema, links, attribution
 * 12. Publish: Store in Cloudflare D1 articles table with Lexical AST
 * 13. Monitor & Log: Audit trail, latency, and release lock
 */

import { APPROVED_SOURCES } from './source-registry'
import { fetchFeedForSource } from './rss-parser'
import { verifyArticleLicense } from './copyright-engine'
import { scoreCandidate, classifyCategory, generateContentFingerprint } from './ranking-engine'
import { enrichAndTranslateArticle } from './editorial-engine'
import {
  acquireDistributedLock,
  releaseDistributedLock,
  isArticleDuplicate,
  getPublishedArticlesCountToday,
  saveCandidate,
  publishArticleToD1,
  recordAutomationLog,
  initializeAutomationTables,
  D1Executor,
} from './d1-repository'
import { AutomationConfig, AutomationLogEntry, NewsCandidate, RawFeedItem } from './types'

// Category ID mapping matching D1 `categories` table
const CATEGORY_MAP: Record<string, { id: number; slug: string; name: string; color: string }> = {
  'ai-news': { id: 1, slug: 'ai-news', name: 'Tin tức AI', color: '#46C7F0' },
  'tech-trends': { id: 2, slug: 'tech-trends', name: 'Xu hướng Công nghệ', color: '#F47D59' },
  'ai-tools': { id: 3, slug: 'ai-tools', name: 'Công cụ AI & Tiện ích', color: '#46C7F0' },
  'tutorials': { id: 4, slug: 'tutorials', name: 'Thủ thuật & Hướng dẫn', color: '#10B981' },
  'reviews': { id: 5, slug: 'reviews', name: 'Đánh giá & Trải nghiệm', color: '#F47D59' },
  'cybersecurity': { id: 6, slug: 'cybersecurity', name: 'An ninh mạng & Dữ liệu', color: '#EF4444' },
  'robotics-hardware': { id: 7, slug: 'robotics-hardware', name: 'Phần cứng & Robotics', color: '#8B5CF6' },
  'startups-coding': { id: 8, slug: 'startups-coding', name: 'Lập trình & Khởi nghiệp', color: '#6366F1' },
}

export interface PipelineExecutionOptions {
  dryRun?: boolean
  manualReview?: boolean
  forceRun?: boolean // Bypass daily cap for testing
  targetSourceId?: string
}

export async function runNewsAutomationPipeline(
  db: D1Executor,
  options: PipelineExecutionOptions = {},
): Promise<{
  success: boolean
  publishedArticle?: { title: string; slug: string; id: number }
  message: string
  log: AutomationLogEntry
}> {
  const startTime = Date.now()
  const jobId = `job_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`
  const runType = options.dryRun ? 'dry_run' : 'scheduled'

  const logEntry: AutomationLogEntry = {
    jobId,
    runType,
    status: 'partial',
    articlesDiscovered: 0,
    articlesEligible: 0,
    executionTimeMs: 0,
    createdAt: new Date().toISOString(),
  }

  // 1. Initialize tables if needed
  try {
    await initializeAutomationTables(db)
  } catch (err: any) {
    console.warn('Automation tables initialization notice:', err.message)
  }

  // 2. Concurrency Lock
  const lockAcquired = await acquireDistributedLock(db, 'oloka_news_cron_lock', jobId, 600)
  if (!lockAcquired && !options.forceRun) {
    logEntry.status = 'skipped'
    logEntry.errorDetails = 'Another pipeline run is currently in progress (lock active).'
    logEntry.executionTimeMs = Date.now() - startTime
    await recordAutomationLog(db, logEntry)
    return {
      success: false,
      message: 'Pipeline locked: Tiến trình khác đang thực thi.',
      log: logEntry,
    }
  }

  try {
    // 3. Daily frequency check (Max 8 articles per day)
    const publishedToday = await getPublishedArticlesCountToday(db)
    if (publishedToday >= 8 && !options.forceRun) {
      logEntry.status = 'skipped'
      logEntry.errorDetails = `Đã đạt giới hạn tối đa 8 bài/ngày (${publishedToday} bài đã xuất bản hôm nay).`
      logEntry.executionTimeMs = Date.now() - startTime
      await recordAutomationLog(db, logEntry)
      await releaseDistributedLock(db, 'oloka_news_cron_lock')
      return {
        success: true,
        message: 'Đã đạt giới hạn xuất bản 8 bài/ngày. Tạm dừng đến ngày mai.',
        log: logEntry,
      }
    }

    // 4. Ingestion / Discovery Phase
    const sourcesToCrawl = options.targetSourceId
      ? APPROVED_SOURCES.filter((s) => s.sourceId === options.targetSourceId && s.enabled)
      : APPROVED_SOURCES.filter((s) => s.enabled)

    const allDiscoveredItems: { item: RawFeedItem; source: typeof APPROVED_SOURCES[0] }[] = []

    for (const source of sourcesToCrawl) {
      const feedRes = await fetchFeedForSource(source, 8000)
      if (feedRes.success) {
        for (const item of feedRes.items) {
          allDiscoveredItems.push({ item, source })
        }
      }
    }

    logEntry.articlesDiscovered = allDiscoveredItems.length
    if (allDiscoveredItems.length === 0) {
      logEntry.status = 'skipped'
      logEntry.errorDetails = 'Không thu thập được bài viết mới từ các nguồn RSS.'
      logEntry.executionTimeMs = Date.now() - startTime
      await recordAutomationLog(db, logEntry)
      await releaseDistributedLock(db, 'oloka_news_cron_lock')
      return { success: true, message: 'Không có tin mới từ các nguồn RSS.', log: logEntry }
    }

    // 5. License Verification & Ranking Phase
    const scoredCandidates: { candidate: NewsCandidate; source: typeof APPROVED_SOURCES[0] }[] = []

    for (const { item, source } of allDiscoveredItems) {
      const fingerprint = generateContentFingerprint(item.title, item.summary || '')
      const category = classifyCategory(item.title, item.summary || '', source.categories)

      // Verify License
      const licenseRes = verifyArticleLicense(item, source)
      if (!licenseRes.isEligibleForAutoPublish) {
        // Record as rejected candidate
        const candidate: NewsCandidate = {
          guid: item.guid,
          sourceId: source.sourceId,
          sourceName: source.name,
          originalUrl: item.link,
          canonicalUrl: item.link,
          title: item.title,
          originalTitle: item.title,
          originalAuthor: item.author || source.name,
          originalPublishedAt: item.pubDate,
          contentSnippet: item.summary || '',
          license: licenseRes.detectedLicense,
          licenseVerified: false,
          categorySlug: category.slug,
          categoryName: category.name,
          tags: item.categories || [],
          fingerprint,
          status: 'rejected',
          rejectionReason: licenseRes.rejectionReason,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        await saveCandidate(db, candidate)
        continue
      }

      // Check Duplicate
      const dupCheck = await isArticleDuplicate(db, item.link, fingerprint)
      if (dupCheck.isDuplicate) {
        const candidate: NewsCandidate = {
          guid: item.guid,
          sourceId: source.sourceId,
          sourceName: source.name,
          originalUrl: item.link,
          canonicalUrl: item.link,
          title: item.title,
          originalTitle: item.title,
          originalAuthor: item.author || source.name,
          originalPublishedAt: item.pubDate,
          contentSnippet: item.summary || '',
          license: licenseRes.detectedLicense,
          licenseVerified: true,
          categorySlug: category.slug,
          categoryName: category.name,
          tags: item.categories || [],
          fingerprint,
          status: 'rejected',
          rejectionReason: dupCheck.reason,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        await saveCandidate(db, candidate)
        continue
      }

      // Score Candidate
      const scoreRes = scoreCandidate(item, source)
      const candidate: NewsCandidate = {
        guid: item.guid,
        sourceId: source.sourceId,
        sourceName: source.name,
        originalUrl: item.link,
        canonicalUrl: item.link,
        title: item.title,
        originalTitle: item.title,
        originalAuthor: item.author || source.name,
        originalPublishedAt: item.pubDate,
        contentSnippet: item.summary || '',
        license: licenseRes.detectedLicense,
        licenseVerified: true,
        categorySlug: category.slug,
        categoryName: category.name,
        tags: item.categories || [],
        fingerprint,
        score: scoreRes.score,
        scoreBreakdown: scoreRes.breakdown,
        status: scoreRes.isEligible ? 'approved' : 'rejected',
        rejectionReason: scoreRes.rejectionReason,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      await saveCandidate(db, candidate)

      if (scoreRes.isEligible) {
        scoredCandidates.push({ candidate, source })
      }
    }

    logEntry.articlesEligible = scoredCandidates.length

    if (scoredCandidates.length === 0) {
      logEntry.status = 'skipped'
      logEntry.errorDetails = 'Không có bài viết nào đạt ngưỡng chất lượng (>= 75/100) và thỏa mãn bản quyền.'
      logEntry.executionTimeMs = Date.now() - startTime
      await recordAutomationLog(db, logEntry)
      await releaseDistributedLock(db, 'oloka_news_cron_lock')
      return { success: true, message: 'Không có bài đủ điều kiện xuất bản trong lượt này.', log: logEntry }
    }

    // 6. Select Top Candidate (Sort by Score descending)
    scoredCandidates.sort((a, b) => (b.candidate.score || 0) - (a.candidate.score || 0))
    const selected = scoredCandidates[0]

    // 7. Editorial & Translation Phase
    const catInfo = CATEGORY_MAP[selected.candidate.categorySlug] || CATEGORY_MAP['tech-trends']
    const enriched = await enrichAndTranslateArticle(selected.candidate, selected.source, catInfo)

    // 8. Quality & Schema Validation
    if (!enriched.titleVi || enriched.sections.length < 2 || !enriched.image.isVerifiedSafe) {
      logEntry.status = 'failed'
      logEntry.errorDetails = 'Bài viết không vượt qua bước kiểm tra chất lượng/hình ảnh hợp lệ.'
      logEntry.executionTimeMs = Date.now() - startTime
      await recordAutomationLog(db, logEntry)
      await releaseDistributedLock(db, 'oloka_news_cron_lock')
      return { success: false, message: 'Lỗi kiểm tra chất lượng bài viết trước khi đăng.', log: logEntry }
    }

    // 9. Publishing Phase
    if (options.dryRun) {
      logEntry.status = 'success'
      logEntry.articlePublishedTitle = `[DRY-RUN] ${enriched.titleVi}`
      logEntry.articlePublishedSlug = enriched.slug
      logEntry.scoreAchieved = enriched.score
      logEntry.executionTimeMs = Date.now() - startTime
      await recordAutomationLog(db, logEntry)
      await releaseDistributedLock(db, 'oloka_news_cron_lock')
      return {
        success: true,
        publishedArticle: { title: enriched.titleVi, slug: enriched.slug, id: 0 },
        message: `[DRY-RUN Thành công] Đã biên tập bài: "${enriched.titleVi}" (Điểm: ${enriched.score}/100, Nguồn: ${selected.source.name})`,
        log: logEntry,
      }
    }

    // Insert into D1
    const publishStatus = options.manualReview ? 'draft' : 'published'
    const newArticleId = await publishArticleToD1(db, enriched, publishStatus)

    // Update candidate status to published
    await db
      .prepare("UPDATE news_candidates SET status = 'published' WHERE canonical_url = ?")
      .bind(selected.candidate.canonicalUrl)
      .run()

    logEntry.status = 'success'
    logEntry.articlePublishedId = newArticleId
    logEntry.articlePublishedTitle = enriched.titleVi
    logEntry.articlePublishedSlug = enriched.slug
    logEntry.scoreAchieved = enriched.score
    logEntry.executionTimeMs = Date.now() - startTime

    await recordAutomationLog(db, logEntry)
    await releaseDistributedLock(db, 'oloka_news_cron_lock')

    return {
      success: true,
      publishedArticle: { title: enriched.titleVi, slug: enriched.slug, id: newArticleId },
      message: `Xuất bản thành công: "${enriched.titleVi}" (ID: ${newArticleId}, Điểm: ${enriched.score}/100)`,
      log: logEntry,
    }
  } catch (err: any) {
    logEntry.status = 'failed'
    logEntry.errorDetails = err.message || 'Lỗi hệ thống không xác định trong pipeline.'
    logEntry.executionTimeMs = Date.now() - startTime
    await recordAutomationLog(db, logEntry)
    await releaseDistributedLock(db, 'oloka_news_cron_lock')
    return {
      success: false,
      message: `Thất bại: ${err.message}`,
      log: logEntry,
    }
  }
}
