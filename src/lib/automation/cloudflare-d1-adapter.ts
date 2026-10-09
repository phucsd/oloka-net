/**
 * OLoka News Automation - Universal Cloudflare D1 Adapter
 * 
 * Provides a unified D1Executor interface across:
 * 1. Cloudflare Workers runtime (via @opennextjs/cloudflare getCloudflareContext)
 * 2. Standalone Node.js scripts / GitHub Actions (via Cloudflare D1 REST API)
 */

import { D1Executor } from './d1-repository'

/**
 * Creates an HTTP-based D1 Executor using Cloudflare's REST API
 * for standalone CLI / cron runner scripts outside Worker environment.
 */
export function createHttpD1Executor(
  accountId: string,
  databaseId: string,
  apiToken: string,
): D1Executor {
  const endpoint = `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/query`

  const executeSql = async (sql: string, params: any[] = []) => {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sql,
        params,
      }),
    })

    if (!res.ok) {
      const errText = await res.text()
      throw new Error(`Cloudflare D1 HTTP API Error (${res.status}): ${errText}`)
    }

    const data = (await res.json()) as any
    if (!data.success) {
      throw new Error(`D1 Query Error: ${JSON.stringify(data.errors)}`)
    }

    const results = data.result?.[0]?.results || []
    const meta = data.result?.[0]?.meta || {}
    return { results, meta }
  }

  return {
    prepare: (query: string) => {
      return {
        bind: (...params: any[]) => {
          return {
            run: async () => {
              const { meta } = await executeSql(query, params)
              return { success: true, meta }
            },
            all: async () => {
              const { results, meta } = await executeSql(query, params)
              return { results, meta }
            },
            first: async () => {
              const { results } = await executeSql(query, params)
              return results[0] || null
            },
          }
        },
      }
    },
    exec: async (query: string) => {
      return executeSql(query, [])
    },
  }
}

export async function getD1Executor(): Promise<D1Executor> {
  const token = process.env.CLOUDFLARE_API_TOKEN || ''
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID || '7719e72989f5f2c061f486cb0fe89fda'
  const dbId = '4c06a31a-d8d7-4106-bfbe-e0bba7ff8157' // oloka-net D1 database ID

  // If running from CLI / standalone runner, ALWAYS use Cloudflare HTTP API to target remote D1 directly
  if (process.env.IS_STANDALONE_RUNNER === 'true' || typeof (globalThis as any).WebSocketPair === 'undefined') {
    return createHttpD1Executor(accountId, dbId, token)
  }

  // Check if running in OpenNext / Cloudflare Workers runtime
  try {
    const { getCloudflareContext } = await import('@opennextjs/cloudflare')
    const ctx = await getCloudflareContext({ async: true })
    if (ctx?.env?.D1) {
      return ctx.env.D1 as any
    }
  } catch {
    // Not in worker runtime
  }

  return createHttpD1Executor(accountId, dbId, token)
}
