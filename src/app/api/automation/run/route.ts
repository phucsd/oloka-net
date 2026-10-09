import { NextRequest, NextResponse } from 'next/server'
import { getD1Executor } from '@/lib/automation/cloudflare-d1-adapter'
import { runNewsAutomationPipeline } from '@/lib/automation/pipeline'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    // Optional bearer token or query secret protection
    const authHeader = req.headers.get('authorization')
    const secretKey = req.nextUrl.searchParams.get('key')
    const expectedSecret = process.env.AUTOMATION_SECRET || 'oloka_news_secret_2026'

    if (authHeader !== `Bearer ${expectedSecret}` && secretKey !== expectedSecret) {
      // Allow local development and same-origin admin calls
      const referer = req.headers.get('referer') || ''
      if (!referer.includes('oloka.net') && !referer.includes('localhost') && !referer.includes('127.0.0.1')) {
        return NextResponse.json({ success: false, error: 'Unauthorized automation trigger' }, { status: 401 })
      }
    }

    let body: any = {}
    try {
      body = await req.json()
    } catch {
      // Empty body is acceptable
    }

    const dryRun = Boolean(body.dryRun)
    const forceRun = Boolean(body.forceRun)
    const manualReview = Boolean(body.manualReview)
    const targetSourceId = body.targetSourceId

    const db = await getD1Executor()
    const result = await runNewsAutomationPipeline(db, {
      dryRun,
      forceRun,
      manualReview,
      targetSourceId,
    })

    return NextResponse.json({
      success: result.success,
      message: result.message,
      publishedArticle: result.publishedArticle,
      log: result.log,
    })
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Lỗi thực thi pipeline' },
      { status: 500 },
    )
  }
}
