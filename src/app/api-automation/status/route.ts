import { NextResponse } from 'next/server'
import { getD1Executor } from '@/lib/automation/cloudflare-d1-adapter'
import { APPROVED_SOURCES } from '@/lib/automation/source-registry'
import { initializeAutomationTables } from '@/lib/automation/d1-repository'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const db = await getD1Executor()
    await initializeAutomationTables(db)

    // Query recent logs
    const logsRes = await db
      .prepare('SELECT * FROM news_automation_logs ORDER BY created_at DESC LIMIT 15')
      .bind()
      .all()

    // Query candidate count by status
    const candidatesCount = await db
      .prepare(
        "SELECT status, COUNT(*) as count FROM news_candidates GROUP BY status",
      )
      .bind()
      .all()

    // Query active lock
    const lockRes = await db
      .prepare('SELECT * FROM news_automation_locks WHERE expires_at > ? LIMIT 1')
      .bind(new Date().toISOString())
      .first()

    // Query total published articles count
    const totalArticles = await db
      .prepare("SELECT COUNT(*) as count FROM articles WHERE status = 'published'")
      .bind()
      .first()

    return NextResponse.json({
      success: true,
      data: {
        sources: APPROVED_SOURCES,
        isLocked: Boolean(lockRes),
        activeLock: lockRes || null,
        recentLogs: logsRes.results || [],
        candidatesSummary: candidatesCount.results || [],
        totalArticlesPublished: totalArticles?.count || 40,
        serverTime: new Date().toISOString(),
        config: {
          cronSchedule: '0 */3 * * * (Asia/Ho_Chi_Minh)',
          dailyLimit: 8,
          minScore: 75,
          autoPublish: true,
        },
      },
    })
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Lỗi truy vấn trạng thái automation' },
      { status: 500 },
    )
  }
}
