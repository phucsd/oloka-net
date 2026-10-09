/**
 * OLoka News Automation - Source Registry
 * 
 * Strict compliance with user-permitted source registry and verified live RSS endpoints:
 * 1. It's FOSS (https://feed.itsfoss.com/)
 * 2. Horizon Magazine (https://projects.research-and-innovation.ec.europa.eu/en/horizon-magazine/rss)
 * 3. Opensource.com (https://opensource.com/feed)
 * 4. Electronic Frontier Foundation (https://www.eff.org/rss/updates.xml)
 * 5. SciDev.Net (https://www.scidev.net/feed/)
 * 
 * Discovery-only sources for cross-checking facts without direct verbatim copying:
 * - Ars Technica, TechCrunch, The Verge (isDiscoveryOnly: true)
 */

import { NewsSource } from './types'

export const APPROVED_SOURCES: NewsSource[] = [
  {
    sourceId: 'its-foss',
    name: "It's FOSS",
    domain: 'itsfoss.com',
    rssUrl: 'https://feed.itsfoss.com/',
    backupRssUrl: 'https://itsfoss.com/rss/',
    licensePolicy: {
      defaultLicense: 'CC BY-SA',
      licensePolicyUrl: 'https://itsfoss.com/copyright/',
      permittedContentScope: 'Open Source, Linux Tutorials, Software Reviews',
      canVerbatimTranslate: true,
      canRepublish: true,
      commercialReuse: true,
      requiresAttribution: true,
      attributionTemplate: 'Dựa trên hướng dẫn từ It\'s FOSS ({author}). Giấy phép: CC BY-SA 4.0.',
      imageReusePolicy: 'external_stock_only', // It\'s FOSS images may have individual copyrights, use verified stock/Unsplash
    },
    categories: ['tutorials', 'startups-coding', 'tech-trends'],
    crawlIntervalMinutes: 180,
    rateLimitPerMinute: 10,
    enabled: true,
  },
  {
    sourceId: 'horizon-magazine',
    name: 'Horizon Magazine (European Commission)',
    domain: 'projects.research-and-innovation.ec.europa.eu',
    rssUrl: 'https://projects.research-and-innovation.ec.europa.eu/en/horizon-magazine/rss',
    licensePolicy: {
      defaultLicense: 'CC BY',
      licensePolicyUrl: 'https://projects.research-and-innovation.ec.europa.eu/en/horizon-magazine/republish-our-stories',
      permittedContentScope: 'EU Scientific Research, AI Innovations, Clean Tech, Robotics',
      canVerbatimTranslate: true,
      canRepublish: true,
      commercialReuse: true,
      requiresAttribution: true,
      attributionTemplate: 'Bài viết được dịch và tổng hợp từ Horizon: The EU Research & Innovation Magazine ({author}) theo giấy phép Creative Commons Attribution 4.0 International (CC BY 4.0).',
      imageReusePolicy: 'media_kit_only',
    },
    categories: ['ai-news', 'tech-trends', 'robotics-hardware'],
    crawlIntervalMinutes: 180,
    rateLimitPerMinute: 10,
    enabled: true,
  },
  {
    sourceId: 'opensource-com',
    name: 'Opensource.com',
    domain: 'opensource.com',
    rssUrl: 'https://opensource.com/feed',
    licensePolicy: {
      defaultLicense: 'CC BY-SA',
      licensePolicyUrl: 'https://opensource.com/license-and-copyright',
      permittedContentScope: 'Open Source Architecture, DevOps, Linux, Programming',
      canVerbatimTranslate: true,
      canRepublish: true,
      commercialReuse: true,
      requiresAttribution: true,
      attributionTemplate: 'Nội dung chia sẻ từ Opensource.com ({author}) theo điều khoản giấy phép CC BY-SA 4.0.',
      imageReusePolicy: 'external_stock_only',
    },
    categories: ['startups-coding', 'tutorials', 'tech-trends'],
    crawlIntervalMinutes: 180,
    rateLimitPerMinute: 10,
    enabled: true,
  },
  {
    sourceId: 'eff',
    name: 'Electronic Frontier Foundation (EFF)',
    domain: 'eff.org',
    rssUrl: 'https://www.eff.org/rss/updates.xml',
    licensePolicy: {
      defaultLicense: 'CC BY',
      licensePolicyUrl: 'https://www.eff.org/copyright',
      permittedContentScope: 'Cybersecurity, Digital Privacy, AI Policy, Free Speech Tech',
      canVerbatimTranslate: true,
      canRepublish: true,
      commercialReuse: true,
      requiresAttribution: true,
      attributionTemplate: 'Thông tin phân tích an ninh và quyền riêng tư từ Electronic Frontier Foundation ({author}) theo giấy phép CC BY 3.0 US.',
      imageReusePolicy: 'external_stock_only',
    },
    categories: ['cybersecurity', 'tech-trends', 'ai-news'],
    crawlIntervalMinutes: 180,
    rateLimitPerMinute: 10,
    enabled: true,
  },
  {
    sourceId: 'scidev-net',
    name: 'SciDev.Net',
    domain: 'scidev.net',
    rssUrl: 'https://www.scidev.net/feed/',
    licensePolicy: {
      defaultLicense: 'CC BY',
      licensePolicyUrl: 'https://www.scidev.net/global/creative-commons/',
      permittedContentScope: 'Science, Technology and Development, AI for Good, Medical Tech',
      canVerbatimTranslate: true,
      canRepublish: true,
      commercialReuse: true,
      requiresAttribution: true,
      attributionTemplate: 'Bản tin khoa học công nghệ phát triển từ SciDev.Net ({author}) theo điều khoản Creative Commons Attribution (CC BY 3.0).',
      imageReusePolicy: 'external_stock_only',
    },
    categories: ['tech-trends', 'ai-news'],
    crawlIntervalMinutes: 180,
    rateLimitPerMinute: 10,
    enabled: true,
  },
]

/**
 * Secondary sources used EXCLUSIVELY for event detection and cross-checking facts.
 * Absolutely NO verbatim copying, translation or direct image downloading.
 */
export const DISCOVERY_ONLY_SOURCES: NewsSource[] = [
  {
    sourceId: 'ars-technica-discovery',
    name: 'Ars Technica (Fact Check Only)',
    domain: 'arstechnica.com',
    rssUrl: 'https://feeds.arstechnica.com/arstechnica/index',
    licensePolicy: {
      defaultLicense: 'All Rights Reserved',
      licensePolicyUrl: 'https://arstechnica.com/',
      permittedContentScope: 'Event discovery and fact verification only',
      canVerbatimTranslate: false,
      canRepublish: false,
      commercialReuse: false,
      requiresAttribution: true,
      attributionTemplate: 'Tham khảo dữ kiện từ Ars Technica.',
      imageReusePolicy: 'prohibited',
    },
    categories: ['tech-trends', 'ai-news', 'cybersecurity'],
    crawlIntervalMinutes: 360,
    rateLimitPerMinute: 5,
    enabled: false, // Default disabled, can be toggled in admin for research
    isDiscoveryOnly: true,
  },
]

export function getSourceById(sourceId: string): NewsSource | undefined {
  return (
    APPROVED_SOURCES.find((s) => s.sourceId === sourceId) ||
    DISCOVERY_ONLY_SOURCES.find((s) => s.sourceId === sourceId)
  )
}

export function getAllActiveSources(): NewsSource[] {
  return APPROVED_SOURCES.filter((s) => s.enabled)
}
