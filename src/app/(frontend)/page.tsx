import React from 'react'
import Link from 'next/link'
import { Logo } from './components/Logo'
import { 
  Volume2, 
  Mic, 
  QrCode, 
  Sparkles, 
  ArrowRight, 
  Newspaper, 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Sliders, 
  Clock, 
  Calendar,
  ExternalLink,
  Layers,
  ChevronRight
} from 'lucide-react'

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#46C7F0]/15 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute top-36 right-1/4 w-[500px] h-[500px] bg-[#F47D59]/15 rounded-full blur-[130px] pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Brand Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-slate-900/90 border border-slate-700/80 shadow-inner mb-8">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#46C7F0] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#46C7F0]"></span>
          </span>
          <span className="text-slate-300">Nền tảng Oloka.net</span>
          <span className="text-slate-600">|</span>
          <span className="text-gradient font-bold">AI Tools & Tech Portal</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-5xl mx-auto leading-[1.15] mb-6">
          Sáng tạo không giới hạn với{' '}
          <span className="text-gradient">Công cụ AI & Tiện ích</span>{' '}
          thông minh
        </h1>

        {/* Hero Subtitle */}
        <p className="text-base sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-10">
          Tổng hợp giải pháp <strong className="text-[#46C7F0]">TTS Studio</strong> (chuyển văn bản thành giọng nói), <strong className="text-[#F47D59]">Voice Studio</strong> phòng thu, <strong className="text-[#46C7F0]">Mã QR 2-Tone</strong> thương hiệu và kênh cập nhật Tin tức Công nghệ & AI đột phá.
        </p>

        {/* CTA Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-16">
          <Link
            href="/tools"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#46C7F0] to-[#F47D59] hover:opacity-95 shadow-xl shadow-[#46C7F0]/20 transition-all hover:scale-[1.02]"
          >
            <Sparkles className="w-4 h-4" />
            <span>Khám phá Kho Công cụ</span>
          </Link>

          <Link
            href="/news"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 transition-all"
          >
            <Newspaper className="w-4 h-4 text-[#F47D59]" />
            <span>Đọc Tin tức AI</span>
          </Link>
        </div>

        {/* Platform Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-slate-800/80 text-left">
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <p className="text-[11px] font-mono uppercase text-[#46C7F0] mb-1 font-bold">Tốc độ cao</p>
            <p className="text-sm font-semibold text-white">Cloudflare Edge</p>
            <p className="text-xs text-slate-500">Phản hồi dưới 30ms</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <p className="text-[11px] font-mono uppercase text-[#F47D59] mb-1 font-bold">Quản trị CMS</p>
            <p className="text-sm font-semibold text-white">Payload CMS 3.0</p>
            <p className="text-xs text-slate-500">Linh hoạt & Hiện đại</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <p className="text-[11px] font-mono uppercase text-[#46C7F0] mb-1 font-bold">Lưu trữ</p>
            <p className="text-sm font-semibold text-white">Cloudflare R2</p>
            <p className="text-xs text-slate-500">Bucket oloka-net-media</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <p className="text-[11px] font-mono uppercase text-[#F47D59] mb-1 font-bold">Nhận diện</p>
            <p className="text-sm font-semibold text-white">Dual-Tone Style</p>
            <p className="text-xs text-slate-500">#46C7F0 & #F47D59</p>
          </div>
        </div>
      </section>

      {/* Featured Tools Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#46C7F0] uppercase tracking-wider mb-2">
              <Zap className="w-4 h-4" />
              <span>Tiện ích chính</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Bộ ba Công cụ Nổi bật tại Oloka
            </h2>
          </div>
          <Link
            href="/tools"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-[#46C7F0] hover:text-[#F47D59] transition-colors"
          >
            <span>Xem toàn bộ công cụ</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: TTS Studio */}
          <div className="group relative bg-[#111827] border border-slate-800 hover:border-[#46C7F0]/60 rounded-3xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-[#46C7F0]/15 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#46C7F0]/10 border border-[#46C7F0]/30 text-[#46C7F0] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Volume2 className="w-7 h-7" />
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#46C7F0]/10 text-[#46C7F0] border border-[#46C7F0]/20">
                  AUDIO AI
                </span>
                <span className="text-xs text-slate-500">Tiếng Việt & Đa ngữ</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#46C7F0] transition-colors">
                TTS Studio (Text-to-Speech)
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Chuyển văn bản thành giọng đọc truyền cảm ngay lập tức. Tùy chỉnh tốc độ, cao độ, trực quan hóa sóng âm và tải file âm thanh thuận tiện.
              </p>
            </div>
            <Link
              href="/tools/tts"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-[#46C7F0] to-sky-600 hover:opacity-95 shadow-md shadow-[#46C7F0]/20 transition-all"
            >
              <span>Mở TTS Studio</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 2: Voice Studio */}
          <div className="group relative bg-[#111827] border border-slate-800 hover:border-[#F47D59]/60 rounded-3xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-[#F47D59]/15 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#F47D59]/10 border border-[#F47D59]/30 text-[#F47D59] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Mic className="w-7 h-7" />
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#F47D59]/10 text-[#F47D59] border border-[#F47D59]/20">
                  LAB PHÒNG THU
                </span>
                <span className="text-xs text-slate-500">Ghi âm & Khử nhiễu</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#F47D59] transition-colors">
                AI Voice Studio
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Ghi âm giọng nói chất lượng cao với bộ đo cường độ mic, bộ lọc âm ấm áp chuẩn podcast và liên kết liền mạch tới cổng OmniVoice Cloud.
              </p>
            </div>
            <Link
              href="/tools/voice"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-[#F47D59] to-orange-600 hover:opacity-95 shadow-md shadow-[#F47D59]/20 transition-all"
            >
              <span>Mở Voice Studio</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 3: QR Code Studio */}
          <div className="group relative bg-[#111827] border border-slate-800 hover:border-[#46C7F0]/60 rounded-3xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-[#46C7F0]/15 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#46C7F0]/10 border border-[#46C7F0]/30 text-[#46C7F0] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <QrCode className="w-7 h-7" />
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#46C7F0]/10 text-[#46C7F0] border border-[#46C7F0]/20">
                  2-TONE BRAND
                </span>
                <span className="text-xs text-slate-500">Tùy biến cao cấp</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#46C7F0] transition-colors">
                QR Code Studio 2-Tone
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Tạo mã QR thương hiệu Oloka với bảng màu đặc trưng #46C7F0 & #F47D59. Hỗ trợ chèn logo Oloka ở tâm điểm, tạo mã Wifi, vCard, URL siêu nét.
              </p>
            </div>
            <Link
              href="/tools/qr-code"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-[#46C7F0] to-[#F47D59] hover:opacity-95 shadow-md shadow-[#46C7F0]/20 transition-all"
            >
              <span>Tạo mã QR ngay</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Tech & AI News Highlights */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F47D59] uppercase tracking-wider mb-2">
              <Newspaper className="w-4 h-4" />
              <span>Bản tin nóng hổi</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Tin tức Công nghệ & AI News
            </h2>
          </div>
          <Link
            href="/news"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-[#F47D59] hover:text-[#46C7F0] transition-colors"
          >
            <span>Tất cả bài viết</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Mô hình AI đa phương thức thế hệ mới chính thức vượt mốc tư duy thời gian thực',
              category: 'Tin tức AI',
              date: '07/10/2026',
              slug: 'mo-hinh-ai-da-phuong-thuc-the-he-moi',
              color: 'cyan',
              image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
            },
            {
              title: 'Cách tối ưu hóa giọng đọc AI cho Podcast và Video ngắn với TTS Studio',
              category: 'Thủ thuật',
              date: '06/10/2026',
              slug: 'cach-toi-uu-hoa-giong-doc-ai-podcast-tts',
              color: 'coral',
              image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80',
            },
            {
              title: 'Cloudflare ra mắt kỷ nguyên Edge Database siêu tốc với độ trễ phân tán toàn cầu',
              category: 'Xu hướng Công nghệ',
              date: '05/10/2026',
              slug: 'cloudflare-ra-mat-ky-nguyen-edge-database-sieu-toc',
              color: 'cyan',
              image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
            },
          ].map((item, idx) => (
            <Link
              key={idx}
              href={`/news/${item.slug}`}
              className="group bg-[#111827] border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#0A0E17]/80 text-[#46C7F0] border border-[#46C7F0]/30 backdrop-blur-md">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-xs text-slate-500 mb-2">{item.date}</p>
                  <h3 className="text-base font-bold text-white group-hover:text-[#46C7F0] transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center gap-1.5 text-xs font-semibold text-[#46C7F0]">
                <span>Đọc bài viết</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Cloudflare & Payload Architecture Showcase */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-br from-[#111827] to-[#0A0E17] border border-slate-800 p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#46C7F0]/10 text-[#46C7F0] border border-[#46C7F0]/20 mb-4">
              <Cpu className="w-3.5 h-3.5" />
              <span>Kiến trúc Hiện đại & Đột phá</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">
              Vận hành trên Payload CMS 3.0 & Cloudflare Serverless
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-8">
              Trang web <strong>oloka.net</strong> được thiết kế theo mô hình điện toán biên toàn cầu: Next.js 15, Payload CMS 3.0, cơ sở dữ liệu phân tán Cloudflare D1 và lưu trữ media qua bucket <code>oloka-net-media</code> (R2). Hệ thống sẵn sàng phục vụ hàng triệu lượt truy cập với chi phí tối ưu nhất.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
              >
                <span>Mở Bảng Quản Trị Payload CMS (/admin)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <a
                href="https://voice.oloka.net"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs text-[#F47D59] bg-[#F47D59]/10 hover:bg-[#F47D59]/20 border border-[#F47D59]/30 transition-colors"
              >
                <span>Kiểm tra voice.oloka.net</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
