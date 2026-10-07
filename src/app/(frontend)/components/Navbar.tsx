'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Logo } from './Logo'
import { 
  Sparkles, 
  Newspaper, 
  Settings, 
  Menu, 
  X, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Cpu,
  BookmarkCheck,
  FolderTree
} from 'lucide-react'

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#0A0E17]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group transition-transform hover:scale-[1.02]">
          <Logo className="h-8 md:h-9 w-auto" />
          <span className="sr-only">Oloka.net</span>
        </Link>

        {/* Desktop News Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <Link
            href="/"
            className="px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
          >
            Trang chủ
          </Link>

          <Link
            href="/news?category=ai-news"
            className="px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-[#46C7F0]" />
            <span>Tin tức AI</span>
            <span className="px-1.5 py-0.2 text-[9px] font-bold bg-[#46C7F0]/20 text-[#46C7F0] rounded border border-[#46C7F0]/30">
              HOT
            </span>
          </Link>

          <Link
            href="/news?category=tech-trends"
            className="px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Cpu className="w-4 h-4 text-[#F47D59]" />
            <span>Công nghệ</span>
          </Link>

          <Link
            href="/news?category=tutorials"
            className="px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
          >
            Thủ thuật
          </Link>

          <Link
            href="/news?category=reviews"
            className="px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
          >
            Đánh giá
          </Link>

          {/* Tools Hyperlinks Portal */}
          <Link
            href="/tools"
            className="px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors flex items-center gap-1.5 ml-2 border-l border-slate-800 pl-4"
          >
            <FolderTree className="w-4 h-4 text-[#46C7F0]" />
            <span>Kho Công cụ</span>
            <span className="px-1.5 py-0.5 text-[9px] font-semibold bg-[#F47D59]/20 text-[#F47D59] rounded border border-[#F47D59]/30">
              Directory
            </span>
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/admin"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-lg transition-colors"
            title="Bảng Quản trị Payload CMS"
          >
            <Settings className="w-3.5 h-3.5 text-slate-400" />
            <span>Payload CMS</span>
          </Link>

          <Link
            href="/news"
            className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-semibold rounded-lg group bg-gradient-to-br from-[#46C7F0] to-[#F47D59] text-white hover:shadow-lg hover:shadow-[#46C7F0]/20 transition-all"
          >
            <span className="relative px-3.5 py-1.5 transition-all ease-in duration-75 bg-[#0A0E17] rounded-[6px] group-hover:bg-opacity-0 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-[#46C7F0] group-hover:text-white" />
              <span>Bản tin mới</span>
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
            href="/news?category=ai-news"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-between px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-lg"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#46C7F0]" />
              Tin tức Trí tuệ Nhân tạo (AI)
            </span>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </Link>
          <Link
            href="/news?category=tech-trends"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-between px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-lg"
          >
            <span className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-[#F47D59]" />
              Xu hướng Công nghệ Mới
            </span>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </Link>
          <Link
            href="/news?category=tutorials"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-lg"
          >
            Thủ thuật & Hướng dẫn
          </Link>
          <Link
            href="/news?category=reviews"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-lg"
          >
            Đánh giá Công cụ
          </Link>
          <Link
            href="/tools"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-between px-3 py-2 text-base font-medium text-white bg-slate-800/60 rounded-lg border border-slate-700/60"
          >
            <span className="flex items-center gap-2">
              <FolderTree className="w-5 h-5 text-[#46C7F0]" />
              Kho Công cụ (Hyperlink Directory)
            </span>
            <ExternalLink className="w-4 h-4 text-slate-400" />
          </Link>
          <div className="pt-3 border-t border-slate-800">
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-slate-800 text-slate-200 text-sm font-semibold"
            >
              <Settings className="w-4 h-4" />
              <span>Quản trị CMS (/admin)</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
