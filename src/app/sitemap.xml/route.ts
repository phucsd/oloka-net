import { NextResponse } from 'next/server'
import { ALL_ARTICLES } from '@/lib/news-data'

function safeIsoDate(dateStr?: string, fallback: string = new Date().toISOString()): string {
  if (!dateStr) return fallback
  try {
    // If format is dd/mm/yyyy
    if (dateStr.includes('/')) {
      const parts = dateStr.split('/')
      if (parts.length === 3) {
        const d = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`)
        if (!isNaN(d.getTime())) return d.toISOString()
      }
    }
    const d = new Date(dateStr)
    if (!isNaN(d.getTime())) return d.toISOString()
  } catch {}
  return fallback
}

export async function GET() {
  const baseUrl = 'https://oloka.net'
  const now = new Date().toISOString()

  const staticUrls = [
    { loc: `${baseUrl}`, priority: '1.0', changefreq: 'hourly', lastmod: now },
    { loc: `${baseUrl}/news`, priority: '0.9', changefreq: 'hourly', lastmod: now },
    { loc: `${baseUrl}/tools`, priority: '0.8', changefreq: 'weekly', lastmod: now },
    { loc: `${baseUrl}/tools/qr-code`, priority: '0.7', changefreq: 'weekly', lastmod: now },
    { loc: `${baseUrl}/tools/tts`, priority: '0.7', changefreq: 'weekly', lastmod: now },
    { loc: `${baseUrl}/tools/voice`, priority: '0.7', changefreq: 'weekly', lastmod: now },
  ]

  const articleUrls = ALL_ARTICLES.map((a) => ({
    loc: `${baseUrl}/news/${a.slug}`,
    priority: '0.8',
    changefreq: 'daily',
    lastmod: safeIsoDate(a.publishedAt, now),
  }))

  const allUrls = [...staticUrls, ...articleUrls]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>`

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
