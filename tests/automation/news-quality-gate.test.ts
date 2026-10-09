import { describe, expect, it } from 'vitest'
import { assessNewsQuality, type NewsQualityInput } from '../../src/lib/news-quality-gate'

const valid: NewsQualityInput = {
  title: 'Nghiên cứu công nghệ mới và tác động đến người dùng Việt Nam',
  body: 'Đây là bài phân tích độc lập. '.repeat(45),
  sourceUrl: 'https://example.org/research',
  sourceName: 'Nguồn nghiên cứu',
  language: 'vi',
  factualReviewPassed: true,
  duplicateCheckPassed: true,
  contentReuseAuthorized: true,
  references: ['https://example.org/research'],
}

describe('automated news publishing quality gate', () => {
  it('publishes only when all checks pass', () => {
    expect(assessNewsQuality(valid)).toEqual({ publish: true, status: 'published', reasons: [] })
  })
  it('keeps articles in draft when rights are unknown', () => {
    const result = assessNewsQuality({ ...valid, contentReuseAuthorized: false })
    expect(result.status).toBe('draft')
    expect(result.reasons).toContain('content_rights_not_verified')
  })
  it('rejects images without verified reuse rights', () => {
    const result = assessNewsQuality({ ...valid, imageUrl: 'https://example.org/photo.jpg' })
    expect(result.publish).toBe(false)
    expect(result.reasons).toContain('image_rights_not_verified')
  })
  it('rejects duplicate or unreviewed articles', () => {
    expect(assessNewsQuality({ ...valid, duplicateCheckPassed: false }).publish).toBe(false)
    expect(assessNewsQuality({ ...valid, factualReviewPassed: false }).publish).toBe(false)
  })
})
