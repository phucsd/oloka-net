/**
 * OLoka News Automation - Ranking, Scoring & Deduplication Engine
 * 
 * 100-Point Evaluation Matrix:
 * - Freshness: 25 points
 * - Relevance to Vietnamese Tech Readers: 25 points
 * - Technical Importance & Industry Impact: 20 points
 * - Educational & Practical Depth: 15 points
 * - Source Authority & Credibility: 15 points
 * 
 * Minimum Threshold: 75/100 to qualify for auto-publishing.
 * Multi-layer Deduplication: Canonical URL, GUID, Fingerprint & Semantic Similarity.
 */

import { NewsCandidate, RawFeedItem, ScoreBreakdown, NewsSource } from './types'
import { normalizeCanonicalUrl, stripHtml } from './rss-parser'

// High-value tech keyword signals for Vietnamese tech audience
const VN_RELEVANCE_HIGH_SIGNALS = [
  'ai', 'artificial intelligence', 'llm', 'machine learning', 'deep learning',
  'deepseek', 'openai', 'chatgpt', 'claude', 'gemini', 'llama', 'copilot', 'cursor',
  'linux', 'ubuntu', 'open source', 'opensource', 'github', 'kernel', 'rust', 'python',
  'security', 'vulnerability', 'privacy', 'cve', 'zero-day', 'malware', 'passkey',
  'cloudflare', 'serverless', 'docker', 'kubernetes', 'cloud', 'edge',
  'robot', 'robotics', 'hardware', 'semiconductor', 'gpu', 'nvidia', 'quantum',
  'tutorial', 'guide', 'how to', 'architecture', 'best practices', 'performance'
]

const CLICKBAIT_OR_LOW_VALUE_SIGNALS = [
  'you won\'t believe',
  'shocking truth',
  'sponsored post',
  'sponsored content',
  'buy now',
  'discount code',
  'crypto airdrop',
  'casino',
  'celebrity gossip',
  'horoscope',
  'unconfirmed rumor',
  'leak claims',
]

/**
 * Creates a unique SHA-like 64-char fingerprint from text for fast duplicate indexing
 */
export function generateContentFingerprint(title: string, text: string): string {
  const normalized = (title + ' ' + text)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .slice(0, 500)

  // Simple, deterministic 64-character hash without heavy external crypto
  let hash1 = 0x811c9dc5
  let hash2 = 0x9e3779b9
  for (let i = 0; i < normalized.length; i++) {
    const char = normalized.charCodeAt(i)
    hash1 = Math.imul(hash1 ^ char, 0x01000193)
    hash2 = Math.imul(hash2 ^ (char << 1), 0x85ebca6b)
  }
  const h1 = (hash1 >>> 0).toString(16).padStart(8, '0')
  const h2 = (hash2 >>> 0).toString(16).padStart(8, '0')
  const h3 = ((hash1 ^ hash2) >>> 0).toString(16).padStart(8, '0')
  const h4 = ((hash1 + hash2) >>> 0).toString(16).padStart(8, '0')
  return `${h1}${h2}${h3}${h4}${h1}${h2}${h3}${h4}`.slice(0, 64)
}

/**
 * Computes Jaccard word similarity between two titles (0.0 to 1.0)
 */
export function computeTitleSimilarity(titleA: string, titleB: string): number {
  const getTokens = (t: string) =>
    new Set(
      t
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .split(/\s+/)
        .filter((w) => w.length > 2),
    )

  const tokensA = getTokens(titleA)
  const tokensB = getTokens(titleB)

  if (tokensA.size === 0 || tokensB.size === 0) return 0

  let intersection = 0
  for (const token of tokensA) {
    if (tokensB.has(token)) intersection++
  }

  const union = tokensA.size + tokensB.size - intersection
  return union === 0 ? 0 : intersection / union
}

/**
 * Categorizes an article into one of Oloka's 8 primary categories
 */
export function classifyCategory(title: string, content: string, sourceCategories: string[]): { slug: string; name: string } {
  const combined = (title + ' ' + content).toLowerCase()

  if (combined.includes('cve-') || combined.includes('vulnerability') || combined.includes('malware') || combined.includes('security') || combined.includes('privacy') || combined.includes('passkey')) {
    return { slug: 'cybersecurity', name: 'An ninh mạng & Dữ liệu' }
  }
  if (combined.includes('tutorial') || combined.includes('how to') || combined.includes('guide') || combined.includes('step-by-step') || combined.includes('tips')) {
    return { slug: 'tutorials', name: 'Thủ thuật & Hướng dẫn' }
  }
  if (combined.includes('robot') || combined.includes('robotics') || combined.includes('hardware') || combined.includes('chip') || combined.includes('gpu') || combined.includes('semiconductor') || combined.includes('npu')) {
    return { slug: 'robotics-hardware', name: 'Phần cứng & Robotics' }
  }
  if (combined.includes('review') || combined.includes('hands-on') || combined.includes('tested') || combined.includes('benchmark') || combined.includes('vs ') || combined.includes('comparison')) {
    return { slug: 'reviews', name: 'Đánh giá & Trải nghiệm' }
  }
  if (combined.includes('open source') || combined.includes('linux') || combined.includes('kernel') || combined.includes('python') || combined.includes('rust') || combined.includes('framework') || combined.includes('github') || combined.includes('code')) {
    return { slug: 'startups-coding', name: 'Lập trình & Khởi nghiệp' }
  }
  if (combined.includes('llm') || combined.includes('openai') || combined.includes('deepseek') || combined.includes('model') || combined.includes('generative ai') || combined.includes('chatgpt') || combined.includes('claude')) {
    return { slug: 'ai-news', name: 'Tin tức AI' }
  }
  if (combined.includes('tool') || combined.includes('app') || combined.includes('extension') || combined.includes('cli') || combined.includes('utility')) {
    return { slug: 'ai-tools', name: 'Công cụ AI & Tiện ích' }
  }

  // Fallback to source's preferred primary category
  const primarySourceCat = sourceCategories[0] || 'tech-trends'
  const namesMap: Record<string, string> = {
    'ai-news': 'Tin tức AI',
    'tech-trends': 'Xu hướng Công nghệ',
    'ai-tools': 'Công cụ AI & Tiện ích',
    'tutorials': 'Thủ thuật & Hướng dẫn',
    'reviews': 'Đánh giá & Trải nghiệm',
    'cybersecurity': 'An ninh mạng & Dữ liệu',
    'robotics-hardware': 'Phần cứng & Robotics',
    'startups-coding': 'Lập trình & Khởi nghiệp',
  }

  return { slug: primarySourceCat, name: namesMap[primarySourceCat] || 'Xu hướng Công nghệ' }
}

/**
 * 100-Point Scoring Algorithm
 */
export function scoreCandidate(
  item: RawFeedItem,
  source: NewsSource,
): { score: number; breakdown: ScoreBreakdown; isEligible: boolean; rejectionReason?: string } {
  const combinedText = (item.title + ' ' + (item.summary || '') + ' ' + (item.content || '')).toLowerCase()

  // 1. Clickbait / Spam / Low-value check
  for (const spamSignal of CLICKBAIT_OR_LOW_VALUE_SIGNALS) {
    if (combinedText.includes(spamSignal)) {
      return {
        score: 0,
        breakdown: { freshness: 0, vietnamRelevance: 0, importance: 0, depthValue: 0, credibility: 0, total: 0 },
        isEligible: false,
        rejectionReason: `Phát hiện dấu hiệu quảng cáo/clickbait (${spamSignal})`,
      }
    }
  }

  // 2. Minimum length check (must have substantive description or content)
  const plainText = stripHtml(item.content || item.summary || '')
  if (plainText.split(/\s+/).length < 25) {
    return {
      score: 20,
      breakdown: { freshness: 10, vietnamRelevance: 5, importance: 5, depthValue: 0, credibility: 0, total: 20 },
      isEligible: false,
      rejectionReason: 'Nội dung nguồn quá ngắn hoặc chỉ có tiêu đề (< 25 từ).',
    }
  }

  // 3. Freshness (25 pts)
  let freshness = 10
  const pubDate = new Date(item.pubDate)
  const now = new Date()
  const ageHours = (now.getTime() - pubDate.getTime()) / (1000 * 60 * 60)

  if (ageHours <= 12) {
    freshness = 25
  } else if (ageHours <= 24) {
    freshness = 20
  } else if (ageHours <= 48) {
    freshness = 16
  } else if (ageHours <= 168) { // Up to 7 days
    freshness = combinedText.includes('tutorial') || combinedText.includes('guide') ? 14 : 8
  } else {
    // Older than 7 days - only evergreen tutorials allowed with limited score
    freshness = combinedText.includes('tutorial') ? 10 : 4
  }

  // 4. Relevance to Vietnamese Tech Readers (25 pts)
  let relevance = 10
  let matchedSignals = 0
  for (const signal of VN_RELEVANCE_HIGH_SIGNALS) {
    if (combinedText.includes(signal)) {
      matchedSignals++
    }
  }
  relevance = Math.min(25, 10 + matchedSignals * 3)

  // 5. Technical Importance & Impact (20 pts)
  let importance = 10
  if (combinedText.includes('critical') || combinedText.includes('release') || combinedText.includes('breakthrough') || combinedText.includes('standard') || combinedText.includes('security advisory')) {
    importance += 6
  }
  if (combinedText.includes('benchmark') || combinedText.includes('major update') || combinedText.includes('revolution') || combinedText.includes('milestone')) {
    importance += 4
  }
  importance = Math.min(20, importance)

  // 6. Educational & Practical Depth (15 pts)
  let depth = 8
  if (combinedText.includes('step') || combinedText.includes('how to') || combinedText.includes('code') || combinedText.includes('architecture') || combinedText.includes('example')) {
    depth += 4
  }
  if (plainText.split(/\s+/).length > 200) {
    depth += 3
  }
  depth = Math.min(15, depth)

  // 7. Source Authority & Credibility (15 pts)
  let credibility = 14
  if (source.domain.includes('.europa.eu') || source.domain === 'eff.org') {
    credibility = 15
  } else if (source.domain === 'itsfoss.com' || source.domain === 'opensource.com' || source.domain === 'scidev.net') {
    credibility = 14
  }

  const total = Math.min(100, freshness + relevance + importance + depth + credibility)
  const isEligible = total >= 75

  return {
    score: total,
    breakdown: {
      freshness,
      vietnamRelevance: relevance,
      importance,
      depthValue: depth,
      credibility,
      total,
      notes: `Matched ${matchedSignals} tech signals, Age: ${Math.round(ageHours)}h`,
    },
    isEligible,
    rejectionReason: isEligible ? undefined : `Điểm chất lượng (${total}/100) chưa đạt ngưỡng tối thiểu 75/100.`,
  }
}
