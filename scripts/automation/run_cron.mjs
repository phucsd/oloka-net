/**
 * OLoka News Automation - Standalone CLI & Cron Runner
 * 
 * Usage:
 *   node scripts/automation/run_cron.mjs [--dry-run] [--force] [--source=<id>]
 */

import dotenv from 'dotenv'
dotenv.config()

import { getD1Executor } from '../../src/lib/automation/cloudflare-d1-adapter.js'
import { runNewsAutomationPipeline } from '../../src/lib/automation/pipeline.js'

async function main() {
  console.log('================================================================')
  console.log('🤖 OLoka News Automation Engine — 3-Hour Publishing Cycle')
  console.log('⏰ Time:', new Date().toISOString())
  console.log('================================================================')

  const args = process.argv.slice(2)
  const isDryRun = args.includes('--dry-run')
  const isForce = args.includes('--force')
  const targetSourceArg = args.find((a) => a.startsWith('--source='))
  const targetSourceId = targetSourceArg ? targetSourceArg.split('=')[1] : undefined

  console.log(`[Config] Dry Run: ${isDryRun} | Force Run: ${isForce} | Target Source: ${targetSourceId || 'All'}`)

  try {
    const db = await getD1Executor()
    const result = await runNewsAutomationPipeline(db, {
      dryRun: isDryRun,
      forceRun: isForce,
      targetSourceId,
    })

    console.log('\n[Pipeline Result]')
    console.log('Status:', result.success ? '✅ SUCCESS' : '⚠️ WARNING / SKIPPED')
    console.log('Message:', result.message)
    if (result.publishedArticle) {
      console.log('Article Title:', result.publishedArticle.title)
      console.log('Article Slug:', result.publishedArticle.slug)
      console.log('Article ID:', result.publishedArticle.id)
    }
    console.log('\n[Metrics]')
    console.log('Articles Discovered:', result.log.articlesDiscovered)
    console.log('Articles Eligible:', result.log.articlesEligible)
    console.log('Execution Time:', `${result.log.executionTimeMs}ms`)

    process.exit(0)
  } catch (err) {
    console.error('\n❌ Fatal Error running automation pipeline:', err)
    process.exit(1)
  }
}

main()
