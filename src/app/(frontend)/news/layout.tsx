import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Tin tức Công nghệ, AI & Xu hướng Số | Oloka News',
  description:
    'Cập nhật tin tức công nghệ nóng hổi, phân tích chuyên sâu về mô hình AI, công cụ tiện ích, an ninh mạng và xu hướng lập trình từ Ban biên tập Oloka.net.',
  alternates: {
    canonical: 'https://oloka.net/news',
  },
  openGraph: {
    title: 'Tin tức Công nghệ, AI & Xu hướng Số | Oloka News',
    description:
      'Cập nhật tin tức công nghệ nóng hổi, phân tích chuyên sâu về mô hình AI, công cụ tiện ích, an ninh mạng và xu hướng lập trình.',
    url: 'https://oloka.net/news',
    siteName: 'Oloka.net',
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tin tức Công nghệ, AI & Xu hướng Số | Oloka News',
    description:
      'Cập nhật tin tức công nghệ nóng hổi, phân tích chuyên sâu về mô hình AI, công cụ tiện ích, an ninh mạng và xu hướng lập trình.',
  },
  other: {
    'geo.region': 'VN',
    'geo.placename': 'Hà Nội, Việt Nam',
    'geo.position': '21.0285;105.8542',
    'ICBM': '21.0285, 105.8542',
  },
}

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
