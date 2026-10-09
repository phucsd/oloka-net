import { NextRequest, NextResponse } from 'next/server'
import { getD1Executor } from '@/lib/automation/cloudflare-d1-adapter'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const db = await getD1Executor()
    const rows = await db.prepare('SELECT * FROM news_automation_config').bind().all()

    const configMap: Record<string, string> = {}
    for (const row of rows.results || []) {
      configMap[row.key] = row.value
    }

    return NextResponse.json({
      success: true,
      config: {
        autoPublishEnabled: configMap.auto_publish_enabled !== 'false',
        dryRunMode: configMap.dry_run_mode === 'true',
        manualReviewMode: configMap.manual_review_mode === 'true',
        minScoreThreshold: parseInt(configMap.min_score_threshold || '75', 10),
        publishIntervalHours: parseInt(configMap.publish_interval_hours || '3', 10),
        dailyMaxArticles: parseInt(configMap.daily_max_articles || '8', 10),
      },
    })
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Lỗi đọc cấu hình' },
      { status: 500 },
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as any
    const db = await getD1Executor()

    const updateKeys: Record<string, string> = {
      auto_publish_enabled: String(body.autoPublishEnabled ?? true),
      dry_run_mode: String(body.dryRunMode ?? false),
      manual_review_mode: String(body.manualReviewMode ?? false),
      min_score_threshold: String(body.minScoreThreshold ?? 75),
      publish_interval_hours: String(body.publishIntervalHours ?? 3),
      daily_max_articles: String(body.dailyMaxArticles ?? 8),
    }

    for (const [key, val] of Object.entries(updateKeys)) {
      await db
        .prepare(
          `INSERT INTO news_automation_config (key, value, updated_at) 
           VALUES (?, ?, strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
           ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`,
        )
        .bind(key, val)
        .run()
    }

    return NextResponse.json({ success: true, message: 'Đã cập nhật cấu hình automation thành công.' })
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Lỗi cập nhật cấu hình' },
      { status: 500 },
    )
  }
}
