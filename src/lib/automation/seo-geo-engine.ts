/**
 * OLoka News Automation - Comprehensive SEO & GEO Optimization Engine
 * 
 * Generates:
 * - Natural Vietnamese SEO title (60-70 chars) & meta description (140-160 chars)
 * - Diacritic-free Vietnamese URL slug
 * - Geographic targeting & Local Geotagging (W3C / ICBM Geo Meta tags)
 * - Structured Data (JSON-LD NewsArticle, BreadcrumbList, Organization, WebSite)
 * - Open Graph & Twitter Card specifications
 * - Self-canonical URL generation
 * - Edge Geolocation detection & localized content routing helpers
 */

import type { Metadata } from 'next'
import { EnrichedArticle, GeoTargetInfo } from './types'

// Default publisher & geo coordinates for Oloka.net (Hanoi, Vietnam)
export const DEFAULT_GEO_CONFIG: GeoTargetInfo = {
  region: 'VN',
  place: 'Việt Nam',
  coordinates: '21.0285, 105.8542',
  countryCode: 'VN',
  placenameEn: 'Vietnam',
}

export const REGIONAL_GEO_PRESETS: Record<string, GeoTargetInfo> = {
  'VN-HN': {
    region: 'VN-HN',
    place: 'Hà Nội, Việt Nam',
    coordinates: '21.0285, 105.8542',
    countryCode: 'VN',
    placenameEn: 'Hanoi, Vietnam',
  },
  'VN-SG': {
    region: 'VN-SG',
    place: 'TP. Hồ Chí Minh, Việt Nam',
    coordinates: '10.8231, 106.6297',
    countryCode: 'VN',
    placenameEn: 'Ho Chi Minh City, Vietnam',
  },
  'VN-DN': {
    region: 'VN-DN',
    place: 'Đà Nẵng, Việt Nam',
    coordinates: '16.0544, 108.2022',
    countryCode: 'VN',
    placenameEn: 'Da Nang, Vietnam',
  },
  'GLOBAL': {
    region: 'GLOBAL',
    place: 'Toàn cầu (Global Tech Hub)',
    coordinates: '37.7749, -122.4194', // Silicon Valley / San Francisco
    countryCode: 'US',
    placenameEn: 'Silicon Valley, United States',
  },
}

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
 * Automatically classifies geographic target from article content, title, and tags
 */
export function detectGeoTarget(title: string, content: string, tags: string[] = []): GeoTargetInfo {
  const corpus = `${title} ${content} ${tags.join(' ')}`.toLowerCase()

  // Hanoi / Northern Vietnam
  if (
    corpus.includes('hà nội') ||
    corpus.includes('ha noi') ||
    corpus.includes('thủ đô') ||
    corpus.includes('nội bài') ||
    corpus.includes('hòa lạc')
  ) {
    return REGIONAL_GEO_PRESETS['VN-HN']
  }

  // Ho Chi Minh City / Southern Vietnam
  if (
    corpus.includes('tp.hcm') ||
    corpus.includes('tphcm') ||
    corpus.includes('sài gòn') ||
    corpus.includes('hồ chí minh') ||
    corpus.includes('quang trung') ||
    corpus.includes('thủ đức')
  ) {
    return REGIONAL_GEO_PRESETS['VN-SG']
  }

  // Da Nang / Central Vietnam
  if (
    corpus.includes('đà nẵng') ||
    corpus.includes('da nang') ||
    corpus.includes('miền trung') ||
    corpus.includes('huế')
  ) {
    return REGIONAL_GEO_PRESETS['VN-DN']
  }

  // International / Global Tech focus
  if (
    corpus.includes('silicon valley') ||
    corpus.includes('thung lũng silicon') ||
    corpus.includes('hoa kỳ') ||
    corpus.includes('openai') ||
    corpus.includes('san francisco') ||
    corpus.includes('châu âu')
  ) {
    return {
      ...REGIONAL_GEO_PRESETS['GLOBAL'],
      // Target region remains VN for search optimization for Vietnamese audience
      region: 'VN',
      place: 'Việt Nam (Tin tức Công nghệ Quốc tế)',
    }
  }

  return DEFAULT_GEO_CONFIG
}

/**
 * Generates standard W3C & ICBM Geotagging Meta tags
 */
export function buildGeoMetaTags(geo: GeoTargetInfo): Record<string, string> {
  const [lat, long] = geo.coordinates.split(',').map((s) => s.trim())
  const position = `${lat};${long}`

  return {
    'geo.region': geo.region,
    'geo.placename': geo.place,
    'geo.position': position,
    'ICBM': `${lat}, ${long}`,
  }
}

/**
 * Builds JSON-LD NewsArticle structured data schema with location & authorship
 */
export function buildNewsArticleSchema(article: any): object {
  const siteUrl = 'https://oloka.net'
  const articleUrl = `${siteUrl}/news/${article.slug}`
  const imageUrl = article.image?.url || article.imageUrl || `${siteUrl}/oloka-logo.svg`
  const title = article.titleVi || article.title || ''
  const excerpt = article.excerptVi || article.excerpt || ''
  const authorName = article.authorVi || article.author || 'Ban biên tập Oloka.net'
  const categoryName = article.categoryName || 'Tin tức Công nghệ'
  const publishedDate = article.publishedAt || new Date().toISOString()
  const tagsList = article.tags ? (Array.isArray(article.tags) ? article.tags.map((t: any) => t.tag || t).join(', ') : '') : ''

  const geo = article.geo || (article.targetRegion ? REGIONAL_GEO_PRESETS[article.targetRegion] : undefined) || DEFAULT_GEO_CONFIG
  const [lat, long] = geo.coordinates.split(',').map((s: string) => parseFloat(s.trim()))

  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    'headline': title,
    'description': excerpt,
    'image': [imageUrl],
    'datePublished': publishedDate,
    'dateModified': article.updatedAt || publishedDate,
    'author': {
      '@type': 'Person',
      'name': authorName,
      'jobTitle': 'Biên tập viên Công nghệ Oloka',
      'url': siteUrl,
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Oloka.net',
      'url': siteUrl,
      'logo': {
        '@type': 'ImageObject',
        'url': `${siteUrl}/oloka-logo.svg`,
        'width': 600,
        'height': 60,
      },
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Hà Nội',
        'addressCountry': 'VN',
      },
    },
    'isAccessibleForFree': true,
    'inLanguage': 'vi-VN',
    'keywords': tagsList,
    'articleSection': categoryName,
    'contentLocation': {
      '@type': 'Place',
      'name': geo.place,
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': lat || 21.0285,
        'longitude': long || 105.8542,
      },
    },
    'spatialCoverage': geo.region,
  }
}

/**
 * Builds BreadcrumbList JSON-LD schema
 */
export function buildBreadcrumbSchema(article: any): object {
  const siteUrl = 'https://oloka.net'
  const categorySlug = article.categorySlug || article.category || 'tech-trends'
  const categoryName = article.categoryName || 'Tin tức'
  const title = article.titleVi || article.title || ''

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
        'name': categoryName,
        'item': `${siteUrl}/news?category=${categorySlug}`,
      },
      {
        '@type': 'ListItem',
        'position': 4,
        'name': title,
        'item': `${siteUrl}/news/${article.slug}`,
      },
    ],
  }
}

/**
 * Builds Organization Schema for Oloka.net with GeoCoordinates
 */
export function buildOrganizationSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsMediaOrganization',
    'name': 'Oloka.net',
    'alternateName': 'Oloka News & AI Hub',
    'url': 'https://oloka.net',
    'logo': 'https://oloka.net/oloka-logo.svg',
    'sameAs': [
      'https://twitter.com/olokanet',
      'https://facebook.com/olokanet',
      'https://github.com/olokanet',
    ],
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Hà Nội',
      'addressCountry': 'VN',
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 21.0285,
      'longitude': 105.8542,
    },
    'contactPoint': {
      '@type': 'ContactPoint',
      'contactType': 'editorial',
      'availableLanguage': ['Vietnamese', 'English'],
    },
  }
}

/**
 * Builds WebSite Schema with Sitelinks SearchBox
 */
export function buildWebSiteSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'Oloka.net',
    'url': 'https://oloka.net',
    'potentialAction': {
      '@type': 'SearchAction',
      'target': 'https://oloka.net/news?search={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
    'inLanguage': 'vi-VN',
  }
}

/**
 * Builds Combined JSON-LD Schema Graph for Article Page
 */
export function buildCombinedArticleJsonLd(article: any): object {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildNewsArticleSchema(article),
      buildBreadcrumbSchema(article),
      buildOrganizationSchema(),
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

/**
 * Generates Next.js Metadata object with complete OpenGraph, Twitter, Canonical & Geo tags
 */
export function generateFullArticleMetadata(article: any): Metadata {
  const title = article.metaTitle || article.titleVi || article.title || 'Tin tức Oloka.net'
  const fullTitle = title.includes('Oloka.net') ? title : `${title} | Oloka.net`
  const description = truncateClean(article.metaDescription || article.excerptVi || article.excerpt || '', 155)
  const canonicalUrl = article.canonicalUrl || `https://oloka.net/news/${article.slug}`
  const imageUrl = article.imageUrl || article.image?.url || 'https://oloka.net/oloka-logo.svg'
  const publishedTime = article.publishedAt || new Date().toISOString()
  const modifiedTime = article.updatedAt || publishedTime
  const author = article.authorVi || article.author || 'Ban biên tập Oloka.net'
  const tags = article.tags
    ? Array.isArray(article.tags)
      ? article.tags.map((t: any) => (typeof t === 'string' ? t : t.tag || '')).filter(Boolean)
      : []
    : []

  const geo = article.geo || (article.targetRegion ? REGIONAL_GEO_PRESETS[article.targetRegion] : undefined) || detectGeoTarget(title, description, tags)
  const geoMeta = buildGeoMetaTags(geo)

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: 'Oloka.net',
      locale: 'vi_VN',
      type: 'article',
      publishedTime,
      modifiedTime,
      authors: [author],
      tags,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
      creator: '@olokanet',
    },
    keywords: [
      'oloka',
      'tin tuc cong nghe',
      'AI',
      'tri tue nhan tao',
      article.categoryName || 'cong nghe',
      ...tags,
    ],
    other: {
      ...geoMeta,
      'news_keywords': tags.join(', '),
      'article:section': article.categoryName || 'Tin tức Công nghệ',
      'article:author': author,
    },
  }
}
