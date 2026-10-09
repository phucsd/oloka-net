import type { MetadataRoute } from 'next'

/** Static public routes only; dynamic published article routes should be added after
 * verifying Payload's production read permissions and pagination. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://oloka.net'
  return ['/', '/news'].map((path) => ({
    url: base + path,
    changeFrequency: path === '/' ? 'weekly' : 'daily',
    priority: path === '/' ? 1 : 0.8,
  }))
}
