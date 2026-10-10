import { NextResponse } from 'next/server'

export async function GET() {
  const content = `# Robots.txt for Oloka.net
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /api-automation/

User-agent: Googlebot
Allow: /
Disallow: /admin/
Disallow: /api/

User-agent: Googlebot-News
Allow: /news/
Allow: /news/*

Sitemap: https://oloka.net/sitemap.xml
Host: https://oloka.net
`

  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}
