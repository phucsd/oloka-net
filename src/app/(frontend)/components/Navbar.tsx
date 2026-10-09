'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Logo } from './Logo'
import { 
  Sparkles, 
  Settings, 
  Menu, 
  X, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Cpu,
  FolderTree,
  BookOpen,
  Award,
  Search
} from 'lucide-react'

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/90 bg-white/95 backdrop-blur-md shadow-xs">
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
            className="px-3 py-1.5 text-sm font-semibold text-slate-700 hover:text-[#0284c7] hover:bg-slate-100/80 rounded-lg transition-colors"
          >
            Trang chủ
          </Link>

          <Link
            href="/news?category=ai-news"
            className="px-3 py-1.5 text-sm font-semibold text-slate-700 hover:text-[#0284c7] hover:bg-slate-100/80 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-[#0284c7]" />
            <span>Tin tức AI</span>
            <span className="px-1.5 py-0.2 text-[9px] font-bold bg-sky-100 text-[#0284c7] rounded border border-sky-200">
              HOT
            </span>
          </Link>

          <Link
            href="/news?category=tech-trends"
            className="px-3 py-1.5 text-sm font-semibold text-slate-700 hover:text-[#ea580c] hover:bg-slate-100/80 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Cpu className="w-4 h-4 text-[#ea580c]" />
            <span>Công nghệ</span>
          </Link>

          <Link
            href="/news?category=tutorials"
            className="px-3 py-1.5 text-sm font-semibold text-slate-700 hover:text-emerald-600 hover:bg-slate-100/80 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span>Thủ thuật</span>
          </Link>

          <Link
            href="/news?category=reviews"
            className="px-3 py-1.5 text-sm font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-100/80 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Award className="w-4 h-4 text-indigo-600" />
            <span>Đánh giá</span>
          </Link>

          {/* Tools Hyperlinks Portal */}
          <Link
            href="/tools"
            className="px-3 py-1.5 text-sm font-semibold text-slate-700 hover:text-[#0284c7] hover:bg-slate-100/80 rounded-lg transition-colors flex items-center gap-1.5 ml-1 border-l border-slate-200 pl-3"
          >
            <FolderTree className="w-4 h-4 text-[#0284c7]" />
            <span>Kho Công cụ</span>
            <span className="px-1.5 py-0.5 text-[9px] font-bold bg-orange-100 text-[#ea580c] rounded border border-orange-200">
              Links
            </span>
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/news"
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            title="Tìm kiếm tin tức"
          >
            <Search className="w-4 h-4" />
          </Link>

          <Link
            href="/admin"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors"
            title="Bảng Quản trị Payload CMS"
          >
            <Settings className="w-3.5 h-3.5 text-slate-500" />
            <span>Payload CMS</span>
          </Link>

          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-[#46C7F0] to-[#F47D59] hover:opacity-90 rounded-lg shadow-xs transition-all"
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>40 Bài viết</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href="/admin"
            className="p-1.5 text-slate-600 hover:text-slate-900 bg-slate-100 rounded-lg"
          >
            <Settings className="w-4 h-4" />
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 rounded-lg focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-2 shadow-lg">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 text-base font-semibold text-slate-800 hover:text-[#0284c7] hover:bg-slate-50 rounded-lg"
          >
            Trang chủ
          </Link>
          <Link
            href="/news?category=ai-news"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-between px-3 py-2 text-base font-semibold text-slate-800 hover:text-[#0284c7] hover:bg-slate-50 rounded-lg"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#0284c7]" />
              Tin tức Trí tuệ Nhân tạo (AI)
            </span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </Link>
          <Link
            href="/news?category=tech-trends"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-between px-3 py-2 text-base font-semibold text-slate-800 hover:text-[#ea580c] hover:bg-slate-50 rounded-lg"
          >
            <span className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-[#ea580c]" />
              Xu hướng Công nghệ Mới
            </span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </Link>
          <Link
            href="/news?category=tutorials"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 text-base font-semibold text-slate-800 hover:text-emerald-600 hover:bg-slate-50 rounded-lg"
          >
            Thủ thuật & Hướng dẫn
          </Link>
          <Link
            href="/news?category=reviews"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 text-base font-semibold text-slate-800 hover:text-indigo-600 hover:bg-slate-50 rounded-lg"
          >
            Đánh giá Công cụ & Phần cứng
          </Link>
          <Link
            href="/tools"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-between px-3 py-2 text-base font-semibold text-slate-900 bg-slate-50 rounded-lg border border-slate-200"
          >
            <span className="flex items-center gap-2">
              <FolderTree className="w-5 h-5 text-[#0284c7]" />
              Kho Công cụ (Hyperlink Directory)
            </span>
            <ExternalLink className="w-4 h-4 text-slate-400" />
          </Link>
          <div className="pt-3 border-t border-slate-200">
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-slate-100 text-slate-800 text-sm font-semibold hover:bg-slate-200"
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
