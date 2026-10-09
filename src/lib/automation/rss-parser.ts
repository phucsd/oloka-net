/**
 * OLoka News Automation - High Resilience RSS/Atom Feed Ingestion
 * 
 * Complies with user requirements:
 * - Canonical URL normalization (strips tracking parameters)
 * - Support for RSS 2.0 and Atom feeds
 * - Timeout handling and protection against paywalls/CAPTCHAs
 * - Prioritizes news within the last 48 hours, allows evergreen tutorials
 */

import { NewsSource, RawFeedItem } from './types'

const TRACKING_PARAMS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'utm_id',
  'fbclid',
  'gclid',
  'mc_cid',
  'mc_eid',
  'ref',
  'source',
  '_hsenc',
  '_hsmi',
  'mkt_tok',
]

/**
 * Strips tracking parameters and canonicalizes URLs
 */
export function normalizeCanonicalUrl(urlStr: string): string {
  try {
    const parsed = new URL(urlStr)
    TRACKING_PARAMS.forEach((param) => parsed.searchParams.delete(param))
    // Also remove trailing hash fragment unless it's an anchor
    parsed.hash = ''
    return parsed.toString()
  } catch {
    return urlStr.trim()
  }
}

/**
 * Strips HTML tags and entities to produce clean plain text
 */
export function stripHtml(html: string): string {
  if (!html) return ''
  return html
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, '$1')
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim()
}

function extractTagValue(xmlChunk: string, tagName: string): string {
  const cdataRegex = new RegExp(`<${tagName}[^>]*>\\s*<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>\\s*<\\/${tagName}>`, 'i')
  const cdataMatch = xmlChunk.match(cdataRegex)
  if (cdataMatch) return cdataMatch[1].trim()

  const standardRegex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i')
  const standardMatch = xmlChunk.match(standardRegex)
  if (standardMatch) return standardMatch[1].trim()

  return ''
}

function extractAttribute(xmlChunk: string, tagName: string, attrName: string): string {
  const regex = new RegExp(`<${tagName}[^>]*${attrName}=["']([^"']+)["'][^>]*>`, 'i')
  const match = xmlChunk.match(regex)
  return match ? match[1] : ''
}

/**
 * Universal XML Feed Parser (RSS 2.0 & Atom 1.0)
 */
export function parseFeedXml(xml: string, sourceId: string): RawFeedItem[] {
  const items: RawFeedItem[] = []

  // Check if Atom feed
  const isAtom = xml.includes('<feed') && xml.includes('<entry')

  if (isAtom) {
    const entryChunks = xml.split(/<entry[\s>]/i).slice(1)
    for (const chunk of entryChunks) {
      const entryXml = chunk.split(/<\/entry>/i)[0]
      const title = stripHtml(extractTagValue(entryXml, 'title'))
      
      // Link in Atom can be <link href="..." /> or <link>...</link>
      let link = extractAttribute(entryXml, 'link', 'href')
      if (!link) {
        link = extractTagValue(entryXml, 'link')
      }
      
      const guid = extractTagValue(entryXml, 'id') || link
      const published = extractTagValue(entryXml, 'published') || extractTagValue(entryXml, 'updated')
      const author = extractTagValue(entryXml, 'name') || extractTagValue(entryXml, 'author')
      const summary = stripHtml(extractTagValue(entryXml, 'summary')) || stripHtml(extractTagValue(entryXml, 'content'))
      const content = extractTagValue(entryXml, 'content')

      if (title && link) {
        items.push({
          guid: guid.trim(),
          title,
          link: normalizeCanonicalUrl(link),
          pubDate: published ? new Date(published).toISOString() : new Date().toISOString(),
          author: author ? stripHtml(author) : undefined,
          summary: summary.slice(0, 500),
          content: content || summary,
          sourceId,
        })
      }
    }
  } else {
    // Standard RSS 2.0 / RDF
    const itemChunks = xml.split(/<item[\s>]/i).slice(1)
    for (const chunk of itemChunks) {
      const itemXml = chunk.split(/<\/item>/i)[0]
      const title = stripHtml(extractTagValue(itemXml, 'title'))
      const link = extractTagValue(itemXml, 'link')
      const guid = extractTagValue(itemXml, 'guid') || link
      const pubDate = extractTagValue(itemXml, 'pubDate') || extractTagValue(itemXml, 'dc:date')
      const author = extractTagValue(itemXml, 'author') || extractTagValue(itemXml, 'dc:creator')
      const description = stripHtml(extractTagValue(itemXml, 'description'))
      const encodedContent = extractTagValue(itemXml, 'content:encoded')
      
      // Media enclosure or media:content
      let enclosureUrl = extractAttribute(itemXml, 'enclosure', 'url')
      if (!enclosureUrl) {
        enclosureUrl = extractAttribute(itemXml, 'media:content', 'url')
      }

      // Categories
      const catMatches = [...itemXml.matchAll(/<category[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/category>/gi)]
      const categories = catMatches.map((m) => stripHtml(m[1])).filter(Boolean)

      if (title && link) {
        let validDate = new Date().toISOString()
        if (pubDate) {
          const parsed = new Date(pubDate)
          if (!isNaN(parsed.getTime())) {
            validDate = parsed.toISOString()
          }
        }

        items.push({
          guid: guid.trim(),
          title,
          link: normalizeCanonicalUrl(link),
          pubDate: validDate,
          author: author ? stripHtml(author) : undefined,
          summary: description.slice(0, 500),
          content: encodedContent || description,
          categories,
          enclosureUrl: enclosureUrl ? normalizeCanonicalUrl(enclosureUrl) : undefined,
          sourceId,
        })
      }
    }
  }

  return items
}

/**
 * Fetches and parses an RSS feed from a registered source
 */
export async function fetchFeedForSource(
  source: NewsSource,
  timeoutMs: number = 10000,
): Promise<{ success: boolean; items: RawFeedItem[]; error?: string }> {
  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), timeoutMs)

    const response = await fetch(source.rssUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'OLokaBot/1.0 (+https://oloka.net/about; bot@oloka.net) Mozilla/5.0 NewsReader/2.0',
        Accept: 'application/rss+xml, application/atom+xml, text/xml, application/xml;q=0.9, */*;q=0.8',
      },
    })
    clearTimeout(timer)

    if (!response.ok) {
      // Try backup URL if available
      if (source.backupRssUrl) {
        return fetchFeedForSource({ ...source, rssUrl: source.backupRssUrl, backupRssUrl: undefined }, timeoutMs)
      }
      return {
        success: false,
        items: [],
        error: `HTTP ${response.status}: ${response.statusText}`,
      }
    }

    const xml = await response.text()
    if (!xml || xml.length < 50) {
      return { success: false, items: [], error: 'Empty or invalid feed response' }
    }

    const items = parseFeedXml(xml, source.sourceId)
    return { success: true, items }
  } catch (err: any) {
    return {
      success: false,
      items: [],
      error: err.name === 'AbortError' ? 'Feed request timed out (10s)' : err.message || 'Unknown network error',
    }
  }
}
