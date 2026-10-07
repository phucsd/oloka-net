'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Logo } from './Logo'
import { 
  Sparkles, 
  Mic, 
  QrCode, 
  Newspaper, 
  Settings, 
  Menu, 
  X, 
  Volume2, 
  ExternalLink,
  ChevronRight
} from 'lucide-react'

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#0A0E17]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group transition-transform hover:scale-[1.02]">
          <Logo className="h-8 md:h-9 w-auto" />
          <span className="sr-only">Oloka.net</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <Link
            href="/"
            className="px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
          >
            Trang chủ
          </Link>

          <Link
            href="/tools"
            className="px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <span>Kho Công cụ</span>
            <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-[#46C7F0]/20 text-[#46C7F0] rounded-full border border-[#46C7F0]/30">
              AI Hub
            </span>
          </Link>

          <Link
            href="/tools/tts"
            className="px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Volume2 className="w-4 h-4 text-[#46C7F0]" />
            <span>TTS Studio</span>
          </Link>

          <Link
            href="/tools/voice"
            className="px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Mic className="w-4 h-4 text-[#F47D59]" />
            <span>Voice Studio</span>
          </Link>

          <Link
            href="/tools/qr-code"
            className="px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <QrCode className="w-4 h-4 text-[#46C7F0]" />
            <span>QR Studio</span>
            <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-[#F47D59]/20 text-[#F47D59] rounded-full border border-[#F47D59]/30">
              2-Tone
            </span>
          </Link>

          <Link
            href="/news"
            className="px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Newspaper className="w-4 h-4 text-slate-400" />
            <span>Tin tức AI</span>
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/admin"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-lg transition-colors"
            title="Truy cập Payload CMS Admin"
          >
            <Settings className="w-3.5 h-3.5 text-slate-400" />
            <span>CMS Admin</span>
          </Link>

          <Link
            href="/tools"
            className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-semibold rounded-lg group bg-gradient-to-br from-[#46C7F0] to-[#F47D59] text-white hover:shadow-lg hover:shadow-[#46C7F0]/20 transition-all"
          >
            <span className="relative px-3.5 py-1.5 transition-all ease-in duration-75 bg-[#0A0E17] rounded-[6px] group-hover:bg-opacity-0 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#46C7F0] group-hover:text-white" />
              <span>Khám phá ngay</span>
            </span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href="/admin"
            className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg"
          >
            <Settings className="w-4 h-4" />
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-lg focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#0A0E17]/98 px-4 pt-2 pb-6 space-y-2">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-lg"
          >
            Trang chủ
          </Link>
          <Link
            href="/tools"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-lg"
          >
            Kho Công cụ
          </Link>
          <Link
            href="/tools/tts"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-between px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-lg"
          >
            <span className="flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-[#46C7F0]" />
              TTS Studio (Chuyển văn bản thành giọng nói)
            </span>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </Link>
          <Link
            href="/tools/voice"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-between px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-lg"
          >
            <span className="flex items-center gap-2">
              <Mic className="w-5 h-5 text-[#F47D59]" />
              Voice Studio (Ghi âm & Âm thanh)
            </span>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </Link>
          <Link
            href="/tools/qr-code"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-between px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-lg"
          >
            <span className="flex items-center gap-2">
              <QrCode className="w-5 h-5 text-[#46C7F0]" />
              QR Code Studio (2-Tone Brand QR)
            </span>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </Link>
          <Link
            href="/news"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-lg"
          >
            Tin tức Công nghệ & AI
          </Link>
          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-slate-800 text-slate-200 text-sm font-medium"
            >
              <Settings className="w-4 h-4" />
              <span>Bảng Quản trị Payload CMS</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
