import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Danh mục Tiện ích & Công cụ AI, Voice, QR Code | Oloka.net',
  description:
    'Khám phá bộ công cụ trực tuyến miễn phí của Oloka: OmniVoice TTS Studio, bộ tạo mã QR đa phong cách, công cụ AI và tiện ích lập trình tối ưu tốc độ cao.',
  alternates: {
    canonical: 'https://oloka.net/tools',
  },
  openGraph: {
    title: 'Danh mục Tiện ích & Công cụ AI, Voice, QR Code | Oloka.net',
    description:
      'Khám phá bộ công cụ trực tuyến miễn phí của Oloka: OmniVoice TTS Studio, bộ tạo mã QR đa phong cách, công cụ AI và tiện ích lập trình tối ưu tốc độ cao.',
    url: 'https://oloka.net/tools',
    siteName: 'Oloka.net',
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Danh mục Tiện ích & Công cụ AI, Voice, QR Code | Oloka.net',
    description:
      'Khám phá bộ công cụ trực tuyến miễn phí của Oloka: OmniVoice TTS Studio, bộ tạo mã QR đa phong cách, công cụ AI và tiện ích lập trình.',
  },
  other: {
    'geo.region': 'VN',
    'geo.placename': 'Hà Nội, Việt Nam',
    'geo.position': '21.0285;105.8542',
    'ICBM': '21.0285, 105.8542',
  },
}

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
