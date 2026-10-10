import React from 'react'
import type { Metadata } from 'next'
import './styles.css'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { buildOrganizationSchema, buildWebSiteSchema } from '@/lib/automation/seo-geo-engine'

export const metadata: Metadata = {
  metadataBase: new URL('https://oloka.net'),
  title: {
    default: 'Oloka.net | Hub Công cụ AI, TTS, Voice, QR Code & Tin tức Công nghệ',
    template: '%s | Oloka.net',
  },
  description:
    'Oloka.net - Cổng tổng hợp công cụ AI, Text to Speech tiếng Việt, Voice Studio, tạo mã QR 2 tone màu thương hiệu độc đáo và tin tức công nghệ AI nóng hổi mỗi ngày.',
  icons: {
    icon: '/oloka-logo.svg',
    shortcut: '/oloka-logo.svg',
    apple: '/oloka-logo.svg',
  },
  keywords: [
    'oloka',
    'oloka.net',
    'AI tools',
    'text to speech viet nam',
    'tts studio',
    'voice changer',
    'qr code generator',
    'tin tuc ai',
    'tin tuc cong nghe',
    'payload cms cloudflare',
  ],
  openGraph: {
    title: 'Oloka.net | Hub Công cụ AI, TTS, Voice, QR Code & Tin tức Công nghệ',
    description:
      'Oloka.net - Cổng tổng hợp công cụ AI, Text to Speech tiếng Việt, Voice Studio, tạo mã QR 2 tone màu thương hiệu độc đáo và tin tức công nghệ AI nóng hổi mỗi ngày.',
    url: 'https://oloka.net',
    siteName: 'Oloka.net',
    locale: 'vi_VN',
    type: 'website',
    images: [
      {
        url: '/oloka-logo.svg',
        width: 600,
        height: 60,
        alt: 'Oloka.net Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@olokanet',
    creator: '@olokanet',
  },
  other: {
    'geo.region': 'VN',
    'geo.placename': 'Hà Nội, Việt Nam',
    'geo.position': '21.0285;105.8542',
    'ICBM': '21.0285, 105.8542',
    'rating': 'general',
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  // Root WebSite & Organization JSON-LD schemas
  const rootJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [buildWebSiteSchema(), buildOrganizationSchema()],
  }

  return (
    <html lang="vi">
      <head>
        <link rel="icon" type="image/svg+xml" href="/oloka-logo.svg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(rootJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 antialiased selection:bg-[#46C7F0]/25 selection:text-slate-900">
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
