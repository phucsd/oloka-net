import React from 'react'
import Link from 'next/link'
import { Logo } from './Logo'
import { Sparkles, Heart, Shield, Cpu, ExternalLink } from 'lucide-react'

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-850 bg-[#070A10] text-slate-400 mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="inline-block">
              <Logo className="h-8 w-auto" />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Oloka.net – Nền tảng tổng hợp công cụ AI, TTS, Voice, QR Code và bản tin công nghệ đột phá dành cho nhà sáng tạo nội dung & lập trình viên.
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

          {/* Tools column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Công cụ nổi bật
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/tools/tts" className="hover:text-[#46C7F0] transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#46C7F0]" />
                  TTS Studio (Text to Speech)
                </Link>
              </li>
              <li>
                <Link href="/tools/voice" className="hover:text-[#F47D59] transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F47D59]" />
                  AI Voice Studio & Ghi âm
                </Link>
              </li>
              <li>
                <Link href="/tools/qr-code" className="hover:text-[#46C7F0] transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#46C7F0]" />
                  QR Code Studio (2-Tone Brand)
                </Link>
              </li>
              <li>
                <Link href="/tools" className="hover:text-white transition-colors">
                  Tất cả công cụ AI & Tiện ích
                </Link>
              </li>
            </ul>
          </div>

          {/* News column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Tin tức & Bài viết
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/news?category=ai-news" className="hover:text-[#46C7F0] transition-colors">
                  Tin tức Trí tuệ Nhân tạo (AI)
                </Link>
              </li>
              <li>
                <Link href="/news?category=tech-trends" className="hover:text-[#F47D59] transition-colors">
                  Xu hướng Công nghệ Mới
                </Link>
              </li>
              <li>
                <Link href="/news?category=tutorials" className="hover:text-[#46C7F0] transition-colors">
                  Hướng dẫn & Thủ thuật
                </Link>
              </li>
              <li>
                <Link href="/news?category=reviews" className="hover:text-[#F47D59] transition-colors">
                  Đánh giá Công cụ Thực tế
                </Link>
              </li>
            </ul>
          </div>

          {/* System & Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Hệ thống & Quản trị
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/admin" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Trang quản trị CMS (/admin)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </Link>
              </li>
              <li>
                <a 
                  href="https://voice.oloka.net" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-[#F47D59] transition-colors flex items-center gap-1"
                >
                  <span>OmniVoice Gateway</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <span className="text-xs text-slate-500">
                  Lưu trữ Media: Cloudflare R2 (oloka-net-media)
                </span>
              </li>
              <li>
                <span className="text-xs text-slate-500">
                  Cơ sở dữ liệu: Cloudflare D1 Serverless
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Oloka.net. Tất cả các quyền được bảo lưu.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Phát triển với tone màu nhận diện <span className="text-[#46C7F0]">#46C7F0</span> & <span className="text-[#F47D59]">#F47D59</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
