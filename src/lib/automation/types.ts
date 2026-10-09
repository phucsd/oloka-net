/**
 * OLoka News Automation - Core Types & Interfaces
 * Architecture: TypeScript 5.7+ / Payload CMS 3.0 / Cloudflare D1
 */

export type LicenseType = 
  | 'CC0'
  | 'CC BY'
  | 'CC BY-SA'
  | 'CC BY-NC'
  | 'CC BY-NC-SA'
  | 'CC BY-ND'
  | 'Public Domain'
  | 'Open Government License'
  | 'All Rights Reserved'
  | 'Unknown'

export interface SourceLicensePolicy {
  defaultLicense: LicenseType
  licensePolicyUrl: string
  permittedContentScope: string // e.g. "Full articles", "Tutorials", "Abstracts & Facts"
  canVerbatimTranslate: boolean // Whether direct full translation is legally permitted
  canRepublish: boolean // Whether republication is allowed under CC license
  commercialReuse: boolean // Whether commercial use is permitted
  requiresAttribution: boolean // Whether author/source attribution is mandatory
  attributionTemplate: string // e.g. "Nguồn: {source_name} ({author}) - Giấy phép: {license}"
  imageReusePolicy: 'original_allowed' | 'media_kit_only' | 'external_stock_only' | 'prohibited'
}

export interface NewsSource {
  sourceId: string
  name: string
  domain: string
  rssUrl: string
  backupRssUrl?: string
  licensePolicy: SourceLicensePolicy
  categories: string[] // Target Oloka category slugs
  crawlIntervalMinutes: number
  rateLimitPerMinute: number
  enabled: boolean
  isDiscoveryOnly?: boolean // True for sources used only for event tracking/fact checking
  lastCrawlAt?: string
  lastArticlePublishedAt?: string
  consecutiveErrors?: number
}

export interface RawFeedItem {
  guid: string
  title: string
  link: string
  pubDate: string
  author?: string
  summary?: string
  content?: string
  categories?: string[]
  enclosureUrl?: string
  sourceId: string
}

export interface NewsCandidate {
  id?: number
  guid: string
  sourceId: string
  sourceName: string
  originalUrl: string
  canonicalUrl: string
  title: string
  originalTitle: string
  originalAuthor: string
  originalPublishedAt: string
  contentSnippet: string
  rawContent?: string
  license: LicenseType
  licenseUrl?: string
  licenseVerified: boolean
  categorySlug: string
  categoryName: string
  tags: string[]
  fingerprint: string // SHA-256 hash of normalized title + core text
  score?: number
  scoreBreakdown?: ScoreBreakdown
  status: 'discovered' | 'scored' | 'approved' | 'rejected' | 'published' | 'drafted'
  rejectionReason?: string
  createdAt: string
  updatedAt: string
}

export interface ScoreBreakdown {
  freshness: number // 0-25
  vietnamRelevance: number // 0-25
  importance: number // 0-20
  depthValue: number // 0-15
  credibility: number // 0-15
  total: number // 0-100
  notes?: string
}

export interface ArticleImageMetadata {
  url: string
  thumbnailUrl?: string
  photographer?: string
  sourceName: string
  sourceUrl: string
  license: LicenseType
  licenseUrl?: string
  altTextVi: string
  captionVi: string
  width?: number
  height?: number
  isVerifiedSafe: boolean
}

export interface EnrichedArticleSection {
  heading: string
  paragraphs: string[]
  quote?: {
    text: string
    author: string
    title?: string
  }
}

export interface EnrichedArticleReference {
  title: string
  source: string
  url?: string
}

export interface EnrichedArticle {
  titleVi: string
  slug: string
  excerptVi: string
  categorySlug: string
  categoryId: number
  categoryName: string
  categoryColor: string
  authorVi: string
  readTime: string
  featured: boolean
  keyTakeaways: string[]
  sections: EnrichedArticleSection[]
  references: EnrichedArticleReference[]
  tags: string[]
  image: ArticleImageMetadata
  seo: {
    metaTitle: string
    metaDescription: string
    canonicalUrl: string
    keywords: string[]
  }
  attribution: {
    sourceName: string
    sourceUrl: string
    originalAuthor: string
    originalPublishedAt: string
    license: LicenseType
    licenseUrl: string
    disclaimerVi: string
  }
  lexicalContent: any // Payload Lexical RichText AST
  score: number
  fingerprint: string
}

export interface AutomationConfig {
  autoPublishEnabled: boolean
  dryRunMode: boolean
  manualReviewMode: boolean // When true, publishes as 'draft' instead of 'published'
  minScoreThreshold: number // Default 75
  publishIntervalHours: number // Default 3
  dailyMaxArticles: number // Default 8
  maxArticlesPerRun: number // Default 1
  timezone: string // 'Asia/Ho_Chi_Minh'
  allowedCategories: string[]
}

export interface AutomationLogEntry {
  id?: number
  jobId: string
  runType: 'scheduled' | 'manual' | 'dry_run' | 'test'
  status: 'success' | 'failed' | 'skipped' | 'partial'
  articlesDiscovered: number
  articlesEligible: number
  articlePublishedId?: number
  articlePublishedSlug?: string
  articlePublishedTitle?: string
  executionTimeMs: number
  scoreAchieved?: number
  errorDetails?: string
  aiTokensUsed?: number
  createdAt: string
}

export interface DistributedLock {
  lockKey: string
  lockedBy: string
  lockedAt: string
  expiresAt: string
}
