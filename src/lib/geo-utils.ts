/**
 * OLoka News - Cloudflare Edge Geolocation & Localized Routing Utilities
 * 
 * Leverages Cloudflare edge runtime context & headers to detect user location:
 * - CF-IPCountry (ISO-3166-1 alpha-2)
 * - CF-Region / CF-Region-Code
 * - CF-IPCity
 * - CF-IPLatitude, CF-IPLongitude
 * - CF-Timezone
 */

export interface EdgeGeoContext {
  country: string
  region: string
  city: string
  latitude: number | null
  longitude: number | null
  timezone: string
  isVietnam: boolean
  targetRegionCode: 'VN' | 'VN-HN' | 'VN-SG' | 'VN-DN' | 'GLOBAL'
}

/**
 * Extracts Edge Geo info from request headers or Cloudflare context
 */
export function extractEdgeGeo(headers: Headers): EdgeGeoContext {
  const country = headers.get('cf-ipcountry') || 'VN'
  const region = headers.get('cf-region') || headers.get('cf-region-code') || ''
  const city = headers.get('cf-ipcity') || ''
  const latStr = headers.get('cf-iplatitude')
  const lonStr = headers.get('cf-iplongitude')
  const timezone = headers.get('cf-timezone') || 'Asia/Ho_Chi_Minh'

  const latitude = latStr ? parseFloat(latStr) : 21.0285
  const longitude = lonStr ? parseFloat(lonStr) : 105.8542

  const isVietnam = country.toUpperCase() === 'VN'

  let targetRegionCode: EdgeGeoContext['targetRegionCode'] = 'VN'
  const cityLower = city.toLowerCase()
  const regionLower = region.toLowerCase()

  if (isVietnam) {
    if (cityLower.includes('hanoi') || cityLower.includes('ha noi') || regionLower === 'hn') {
      targetRegionCode = 'VN-HN'
    } else if (
      cityLower.includes('ho chi minh') ||
      cityLower.includes('saigon') ||
      regionLower === 'sg' ||
      regionLower === 'hc'
    ) {
      targetRegionCode = 'VN-SG'
    } else if (cityLower.includes('da nang') || cityLower.includes('danang') || regionLower === 'dn') {
      targetRegionCode = 'VN-DN'
    } else {
      targetRegionCode = 'VN'
    }
  } else {
    targetRegionCode = 'GLOBAL'
  }

  return {
    country,
    region,
    city,
    latitude,
    longitude,
    timezone,
    isVietnam,
    targetRegionCode,
  }
}

/**
 * Returns localized welcome badge based on Edge Geolocation
 */
export function getGeoBadgeText(geo: EdgeGeoContext): string {
  if (geo.targetRegionCode === 'VN-HN') {
    return 'Khu vực Hà Nội & Miền Bắc'
  }
  if (geo.targetRegionCode === 'VN-SG') {
    return 'Khu vực TP.HCM & Miền Nam'
  }
  if (geo.targetRegionCode === 'VN-DN') {
    return 'Khu vực Đà Nẵng & Miền Trung'
  }
  if (geo.isVietnam) {
    return 'Việt Nam'
  }
  return `Quốc tế (${geo.country})`
}
