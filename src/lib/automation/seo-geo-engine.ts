/**
 * OLoka News Automation - SEO & GEO Optimization Engine
 * 
 * Generates:
 * - Natural Vietnamese SEO title (60-70 chars)
 * - Vietnamese meta description (140-160 chars)
 * - Diacritic-free Vietnamese URL slug
 * - JSON-LD NewsArticle structured data schema
 * - Open Graph & Twitter cards
 * - Self-canonical URL (https://oloka.net/news/{slug})
 */

import { EnrichedArticle } from './types'

/**
 * Converts Vietnamese text to URL-friendly ASCII slug without diacritics
 */
export function slugifyVietnamese(text: string): string {
  if (!text) return ''

  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/-+/g, '-') // Collapse consecutive dashes
    .slice(0, 80)
    .replace(/^-|-$/g, '')
}

/**
 * Truncates text cleanly at word boundaries
 */
export function truncateClean(text: string, maxLen: number): string {
  if (!text || text.length <= maxLen) return text || ''
  const sub = text.slice(0, maxLen)
  const lastSpace = sub.lastIndexOf(' ')
  return (lastSpace > 0 ? sub.slice(0, lastSpace) : sub).trim() + '...'
}

/**
 * Builds JSON-LD NewsArticle schema
 */
export function buildNewsArticleSchema(article: EnrichedArticle): object {
  const siteUrl = 'https://oloka.net'
  const articleUrl = `${siteUrl}/news/${article.slug}`

  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    'headline': article.titleVi,
    'description': article.excerptVi,
    'image': [article.image.url],
    'datePublished': new Date().toISOString(),
    'dateModified': new Date().toISOString(),
    'author': {
      '@type': 'Person',
      'name': article.authorVi,
      'jobTitle': 'Biên tập viên Công nghệ Oloka',
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Oloka.net',
      'url': siteUrl,
      'logo': {
        '@type': 'ImageObject',
        'url': `${siteUrl}/icon.ico`,
      },
    },
    'isAccessibleForFree': true,
    'license': article.attribution.licenseUrl,
    'keywords': article.tags.join(', '),
    'articleSection': article.categoryName,
    'inLanguage': 'vi-VN',
  }
}

/**
 * Builds BreadcrumbList JSON-LD schema
 */
export function buildBreadcrumbSchema(article: EnrichedArticle): object {
  const siteUrl = 'https://oloka.net'
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Trang chủ',
        'item': siteUrl,
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Tin tức',
        'item': `${siteUrl}/news`,
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': article.categoryName,
        'item': `${siteUrl}/news?category=${article.categorySlug}`,
      },
      {
        '@type': 'ListItem',
        'position': 4,
        'name': article.titleVi,
        'item': `${siteUrl}/news/${article.slug}`,
      },
    ],
  }
}

/**
 * Optimizes SEO title and meta description
 */
export function generateSeoMetadata(titleVi: string, excerptVi: string, slug: string): {
  metaTitle: string
  metaDescription: string
  canonicalUrl: string
} {
  const cleanTitle = titleVi.replace(/\s+/g, ' ').trim()
  const metaTitle = cleanTitle.length <= 65 ? `${cleanTitle} | Oloka.net` : truncateClean(cleanTitle, 65)

  const cleanExcerpt = excerptVi.replace(/\s+/g, ' ').trim()
  const metaDescription = truncateClean(cleanExcerpt, 155)

  return {
    metaTitle,
    metaDescription,
    canonicalUrl: `https://oloka.net/news/${slug}`,
  }
}
