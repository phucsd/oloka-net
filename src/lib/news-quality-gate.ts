/**
 * Conservative publishing gate for imported technology news.
 * No network access or external services: callers must provide verified facts.
 * Fail closed on missing attribution, permission, or duplicate checks.
 */
export type NewsQualityInput = {
  title: string
  body: string
  sourceUrl: string
  sourceName: string
  language: string
  factualReviewPassed: boolean
  duplicateCheckPassed: boolean
  contentReuseAuthorized: boolean
  imageReuseAuthorized?: boolean
  imageUrl?: string
  references: string[]
}

export type NewsQualityResult = {
  publish: boolean
  status: 'published' | 'draft'
  reasons: string[]
}

export function assessNewsQuality(input: NewsQualityInput): NewsQualityResult {
  const reasons: string[] = []
  const title = input.title.trim()
  const body = input.body.trim()
  if (title.length < 25 || title.length > 110) reasons.push('invalid_title_length')
  if (body.length < 800) reasons.push('insufficient_original_content')
  if (input.language.toLowerCase() !== 'vi') reasons.push('not_vietnamese')
  if (!input.sourceName.trim()) reasons.push('missing_source_name')
  const validHttps = (value: string) => {
    try {
      const url = new URL(value)
      return url.protocol === 'https:' && Boolean(url.hostname)
    } catch {
      return false
    }
  }
  if (!validHttps(input.sourceUrl)) reasons.push('invalid_source_url')
  if (input.references.length < 1 || !input.references.every(validHttps)) reasons.push('missing_or_invalid_references')
  if (!input.factualReviewPassed) reasons.push('factual_review_required')
  if (!input.duplicateCheckPassed) reasons.push('duplicate_check_required')
  if (!input.contentReuseAuthorized) reasons.push('content_rights_not_verified')
  if (input.imageUrl && (!validHttps(input.imageUrl) || !input.imageReuseAuthorized)) {
    reasons.push('image_rights_not_verified')
  }
  return { publish: reasons.length === 0, status: reasons.length === 0 ? 'published' : 'draft', reasons }
}
