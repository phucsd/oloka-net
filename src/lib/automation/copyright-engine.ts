/**
 * OLoka News Automation - Copyright & License Verification Engine
 * 
 * Strict enforcement of user copyright rules:
 * - CC BY: Permitted (requires attribution)
 * - CC BY-SA: Permitted (requires ShareAlike & attribution)
 * - CC0 / Public Domain: Permitted
 * - CC BY-NC: Prohibited from auto-publishing on commercial site
 * - CC BY-ND: Prohibited from auto-translation (derivative work violation)
 * - All Rights Reserved / Unknown: Prohibited from auto-republication (fact extraction only)
 * 
 * Includes untrusted input protection against prompt injection.
 */

import { LicenseType, NewsSource, RawFeedItem } from './types'

export interface LicenseCheckResult {
  isEligibleForAutoPublish: boolean
  detectedLicense: LicenseType
  licenseUrl?: string
  canTranslate: boolean
  canRepublish: boolean
  shareAlikeRequired: boolean
  attributionRequired: boolean
  rejectionReason?: string
  attributionText: string
}

/**
 * Detects specific license overrides within an article's raw text or HTML metadata
 */
export function detectArticleLicense(content: string, defaultSourceLicense: LicenseType): LicenseType {
  if (!content) return defaultSourceLicense

  const lower = content.toLowerCase()

  if (lower.includes('creative commons zero') || lower.includes('cc0') || lower.includes('public domain')) {
    return 'CC0'
  }
  if (lower.includes('cc by-sa') || lower.includes('attribution-sharealike') || lower.includes('share alike')) {
    return 'CC BY-SA'
  }
  if (lower.includes('cc by-nc-nd') || lower.includes('noncommercial-noderivatives')) {
    return 'CC BY-ND' // Most restrictive
  }
  if (lower.includes('cc by-nd') || lower.includes('no derivatives') || lower.includes('noderivatives')) {
    return 'CC BY-ND'
  }
  if (lower.includes('cc by-nc') || lower.includes('non-commercial') || lower.includes('noncommercial')) {
    return 'CC BY-NC'
  }
  if (lower.includes('cc by') || lower.includes('creative commons attribution') || lower.includes('cc-by')) {
    return 'CC BY'
  }
  if (lower.includes('all rights reserved') || lower.includes('bản quyền thuộc về') || lower.includes('copyright ©')) {
    return 'All Rights Reserved'
  }

  return defaultSourceLicense
}

/**
 * Evaluates whether an incoming feed item meets all copyright criteria for auto-publishing
 */
export function verifyArticleLicense(
  item: RawFeedItem,
  source: NewsSource,
): LicenseCheckResult {
  // Check article-specific content for license declarations
  const detectedLicense = detectArticleLicense(
    (item.content || '') + ' ' + (item.summary || ''),
    source.licensePolicy.defaultLicense,
  )

  let isEligible = false
  let canTranslate = false
  let canRepublish = false
  let shareAlikeRequired = false
  let attributionRequired = source.licensePolicy.requiresAttribution
  let rejectionReason: string | undefined = undefined

  switch (detectedLicense) {
    case 'CC0':
    case 'Public Domain':
      isEligible = true
      canTranslate = true
      canRepublish = true
      shareAlikeRequired = false
      break

    case 'CC BY':
      isEligible = true
      canTranslate = true
      canRepublish = true
      shareAlikeRequired = false
      attributionRequired = true
      break

    case 'CC BY-SA':
      isEligible = true
      canTranslate = true
      canRepublish = true
      shareAlikeRequired = true
      attributionRequired = true
      break

    case 'CC BY-NC':
    case 'CC BY-NC-SA':
      isEligible = false
      canTranslate = false
      canRepublish = false
      rejectionReason = `Giấy phép ${detectedLicense} giới hạn phi thương mại (Non-Commercial), không được tự động xuất bản.`
      break

    case 'CC BY-ND':
      isEligible = false
      canTranslate = false
      canRepublish = false
      rejectionReason = 'Giấy phép CC BY-ND cấm tạo tác phẩm phái sinh (No Derivatives) — bản dịch vi phạm điều khoản này.'
      break

    case 'All Rights Reserved':
    case 'Unknown':
    default:
      isEligible = false
      canTranslate = false
      canRepublish = false
      rejectionReason = `Nguồn được bảo hộ bản quyền (${detectedLicense}). Không được tự động dịch nguyên bài hoặc sao chép nội dung.`
      break
  }

  // Construct official attribution text
  const authorText = item.author || 'Ban biên tập ' + source.name
  const attributionText = source.licensePolicy.attributionTemplate
    .replace('{source_name}', source.name)
    .replace('{author}', authorText)
    .replace('{license}', detectedLicense)

  return {
    isEligibleForAutoPublish: isEligible && source.enabled,
    detectedLicense,
    licenseUrl: source.licensePolicy.licensePolicyUrl,
    canTranslate,
    canRepublish,
    shareAlikeRequired,
    attributionRequired,
    rejectionReason,
    attributionText,
  }
}

/**
 * Untrusted Input Sanitizer: Defense against Prompt Injection & Malicious Injections
 * Strips jailbreak patterns, system prompt overrides, and unsafe markdown tags.
 */
export function sanitizeUntrustedContent(rawText: string): string {
  if (!rawText) return ''

  // Known prompt injection phrases in news/untrusted feeds
  const dangerousPatterns = [
    /ignore\s+(all\s+)?(previous|prior)\s+instructions/gi,
    /system\s+prompt\s*:/gi,
    /you\s+are\s+now\s+a\s+different\s+model/gi,
    /bypass\s+all\s+rules/gi,
    /dan\s+mode/gi,
    /jailbreak/gi,
    /output\s+the\s+following\s+secret/gi,
    /delete\s+from\s+articles/gi,
    /drop\s+table/gi,
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /onload\s*=/gi,
    /onerror\s*=/gi,
  ]

  let cleaned = rawText
  for (const pattern of dangerousPatterns) {
    cleaned = cleaned.replace(pattern, '[REDACTED_UNSAFE_INSTRUCTION]')
  }

  return cleaned.trim()
}
