import React from 'react'
import Link from 'next/link'
import { Logo } from './Logo'
import { Sparkles, ExternalLink, Newspaper, FolderTree } from 'lucide-react'

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-[#070A10] text-slate-400 mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="inline-block">
              <Logo className="h-8 w-auto" />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Oloka.net – Chuyên trang Tin tức Công nghệ, cập nhật xu hướng Trí tuệ Nhân tạo (AI News) và kho danh bạ liên kết các công cụ thông minh.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-[#46C7F0]/10 text-[#46C7F0] border border-[#46C7F0]/20">
                Payload CMS 3.0
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-[#F47D59]/10 text-[#F47D59] border border-[#F47D59]/20">
                Cloudflare Edge
              </span>
            </div>
          </div>

          {/* News Categories column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-4 flex items-center gap-1.5">
              <Newspaper className="w-4 h-4 text-[#46C7F0]" />
              <span>Chuyên mục Tin tức</span>
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/news?category=ai-news" className="hover:text-[#46C7F0] transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#46C7F0]" />
                  Tin tức Trí tuệ Nhân tạo (AI)
                </Link>
              </li>
              <li>
                <Link href="/news?category=tech-trends" className="hover:text-[#F47D59] transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F47D59]" />
                  Xu hướng Công nghệ & Điện toán
                </Link>
              </li>
              <li>
                <Link href="/news?category=tutorials" className="hover:text-[#46C7F0] transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#46C7F0]" />
                  Thủ thuật & Hướng dẫn
                </Link>
              </li>
              <li>
                <Link href="/news?category=reviews" className="hover:text-[#F47D59] transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F47D59]" />
                  Đánh giá Sản phẩm & Công nghệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Curated Tools Hyperlinks column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-4 flex items-center gap-1.5">
              <FolderTree className="w-4 h-4 text-[#F47D59]" />
              <span>Kho Công cụ (Liên kết)</span>
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a 
                  href="https://voice.oloka.net" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-[#46C7F0] transition-colors flex items-center gap-1"
                >
                  <span>OmniVoice AI Gateway (TTS & Voice)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/phucsd/oloka-qr-generator" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-[#F47D59] transition-colors flex items-center gap-1"
                >
                  <span>Oloka QR Generator</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <Link href="/tools" className="hover:text-white transition-colors text-xs text-slate-400">
                  → Xem toàn bộ Danh bạ Công cụ (/tools)
                </Link>
              </li>
            </ul>
          </div>

          {/* System & Admin */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Biên tập & Quản trị
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/admin" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Trang quản trị Payload CMS</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </Link>
              </li>
              <li>
                <span className="text-xs text-slate-500">
                  Lưu trữ Media: Cloudflare R2
                </span>
              </li>
              <li>
                <span className="text-xs text-slate-500">
                  Cơ sở dữ liệu: Cloudflare D1
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Oloka.net. Báo điện tử & Tin tức AI Công nghệ.</p>
          <div className="flex items-center gap-2">
            <span>Tone màu nhận diện:</span>
            <span className="px-1.5 py-0.5 rounded bg-[#46C7F0]/20 text-[#46C7F0] font-mono">#46C7F0</span>
            <span className="px-1.5 py-0.5 rounded bg-[#F47D59]/20 text-[#F47D59] font-mono">#F47D59</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
