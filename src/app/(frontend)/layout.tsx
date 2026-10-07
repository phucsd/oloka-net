import React from 'react'
import './styles.css'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'

export const metadata = {
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
