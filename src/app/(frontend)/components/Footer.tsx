import React from 'react'
import Link from 'next/link'
import { Logo } from './Logo'
import { ExternalLink, Newspaper, FolderTree } from 'lucide-react'

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 bg-slate-100 text-slate-600 mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="inline-block">
              <Logo className="h-8 w-auto" />
            </Link>
            <p className="text-sm text-slate-600 leading-relaxed">
              Oloka.net – Chuyên trang Tin tức Công nghệ, cập nhật xu hướng Trí tuệ Nhân tạo (AI News) và kho danh bạ liên kết các công cụ thông minh.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-sky-100 text-sky-700 border border-sky-200">
                Payload CMS 3.0
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-orange-100 text-orange-700 border border-orange-200">
                Cloudflare D1
              </span>
            </div>
          </div>

          {/* News Categories column */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-4 flex items-center gap-1.5">
              <Newspaper className="w-4 h-4 text-[#0284c7]" />
              <span>Chuyên mục Tin tức</span>
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/news?category=ai-news" className="text-slate-600 hover:text-[#0284c7] transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#46C7F0]" />
                  Tin tức Trí tuệ Nhân tạo (AI)
                </Link>
              </li>
              <li>
                <Link href="/news?category=tech-trends" className="text-slate-600 hover:text-[#ea580c] transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F47D59]" />
                  Xu hướng Công nghệ Mới
                </Link>
              </li>
              <li>
                <Link href="/news?category=tutorials" className="text-slate-600 hover:text-emerald-600 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Thủ thuật & Hướng dẫn
                </Link>
              </li>
              <li>
                <Link href="/news?category=reviews" className="text-slate-600 hover:text-indigo-600 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  Đánh giá Sản phẩm & Công nghệ
                </Link>
              </li>
              <li>
                <Link href="/news?category=cybersecurity" className="text-slate-600 hover:text-pink-600 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                  An ninh mạng & Dữ liệu
                </Link>
              </li>
            </ul>
          </div>

          {/* Curated Tools Hyperlinks column */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-4 flex items-center gap-1.5">
              <FolderTree className="w-4 h-4 text-[#ea580c]" />
              <span>Kho Công cụ (Tuyển chọn)</span>
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a 
                  href="https://voice.oloka.net" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-slate-600 hover:text-[#0284c7] transition-colors flex items-center gap-1"
                >
                  <span>OmniVoice AI Gateway (TTS & Voice)</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/phucsd/oloka-qr-generator" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-slate-600 hover:text-[#ea580c] transition-colors flex items-center gap-1"
                >
                  <span>Oloka QR Generator (2 Tone Brand)</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a 
                  href="https://aistudio.google.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-slate-600 hover:text-purple-600 transition-colors flex items-center gap-1"
                >
                  <span>Google AI Studio (Gemini Pro/Flash)</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <Link href="/tools" className="hover:text-slate-900 transition-colors text-xs font-semibold text-[#0284c7] block pt-1">
                  → Xem toàn bộ Danh bạ Công cụ (/tools)
                </Link>
              </li>
            </ul>
          </div>

          {/* About & Policies */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-4">
              Về Oloka & Pháp lý
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-slate-600 hover:text-[#0284c7] transition-colors">
                  Giới thiệu & Ban biên tập
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-slate-600 hover:text-[#0284c7] transition-colors">
                  Chính sách bảo mật dữ liệu
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-600 hover:text-[#0284c7] transition-colors">
                  Điều khoản & Bản quyền
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-600 hover:text-[#0284c7] transition-colors">
                  Liên hệ & Góp ý nội dung
                </Link>
              </li>
              <li className="pt-1 border-t border-slate-200">
                <Link href="/admin" className="text-slate-700 hover:text-slate-900 font-semibold transition-colors flex items-center gap-1 text-xs">
                  <span>Trang quản trị Payload CMS</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Oloka.net. Chuyên trang Tin tức & Kiến thức Công nghệ AI.</p>
          <div className="flex flex-wrap items-center gap-3">
            {/* DMCA Protected Badge */}
            <a
              href="https://www.dmca.com/Protection/Status.aspx?ID=oloka-net"
              target="_blank"
              rel="noreferrer"
              title="DMCA.com Protection Status"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 text-white text-[11px] font-bold hover:bg-slate-800 transition-colors shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="tracking-wide">DMCA</span>
              <span className="text-[10px] text-slate-300 font-normal border-l border-slate-700 pl-1.5">PROTECTED</span>
            </a>

            {/* Creative Commons Open License */}
            <span className="inline-flex items-center px-2 py-0.5 rounded bg-slate-200/80 text-slate-700 text-[11px] font-medium">
              CC BY-NC-SA 4.0
            </span>

            <span className="text-slate-400 hidden sm:inline">•</span>
            <span className="text-slate-500 text-[11px] hidden sm:inline">Edge Cloudflare Network</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
