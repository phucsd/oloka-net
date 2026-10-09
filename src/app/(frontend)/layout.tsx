import React from 'react'
import './styles.css'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'

export const metadata = {
  metadataBase: new URL('https://oloka.net'),
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    siteName: 'Oloka.net',
    url: 'https://oloka.net',
    title: 'Oloka.net | Công cụ AI và Tin tức Công nghệ',
    description: 'Công cụ AI tiếng Việt, TTS, tạo mã QR và tin tức công nghệ tại Oloka.net.',
  },
  title: 'Oloka.net | Hub Công cụ AI, TTS, Voice, QR Code & Tin tức Công nghệ',
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
    'payload cms cloudflare',
  ],
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="vi">
      <head>
        <link rel="icon" type="image/svg+xml" href="/oloka-logo.svg" />
      </head>
      <body className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 antialiased selection:bg-[#46C7F0]/25 selection:text-slate-900">
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
