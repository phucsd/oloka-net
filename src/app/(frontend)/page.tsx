'use client'

import React from 'react'
import Link from 'next/link'
import { Logo } from './components/Logo'
import { 
  Sparkles, 
  ArrowRight, 
  Newspaper, 
  Zap, 
  Clock, 
  Calendar,
  ExternalLink,
  Cpu, 
  TrendingUp, 
  FolderTree,
  ChevronRight,
  Flame,
  Volume2,
  QrCode,
  Mic,
  Share2
} from 'lucide-react'

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#46C7F0]/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-48 right-1/4 w-[500px] h-[500px] bg-[#F47D59]/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Breaking News Ticker Bar */}
      <div className="border-b border-slate-800 bg-[#0B0F19]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold bg-[#F47D59]/20 text-[#F47D59] border border-[#F47D59]/30 uppercase text-[10px] tracking-wider">
              <Flame className="w-3 h-3 fill-[#F47D59]" />
              <span>Tin Mới Nhận</span>
            </span>
          </div>

          <div className="overflow-hidden flex-1">
            <Link
              href="/news/mo-hinh-ai-da-phuong-thuc-the-he-moi"
              className="text-slate-300 hover:text-[#46C7F0] transition-colors truncate block"
            >
              Mô hình AI đa phương thức thế hệ mới chính thức vượt mốc tư duy thời gian thực với độ trễ dưới 80ms • Cloudflare mở rộng hạ tầng Edge AI tại châu Á
            </Link>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-slate-500 font-mono text-[11px] flex-shrink-0">
            <span>07/10/2026</span>
          </div>
        </div>
      </div>

      {/* Top Editorial Section: Lead News Hero */}
      <section className="pt-10 pb-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Top Story (8 Columns) */}
          <div className="lg:col-span-8 bg-[#111827] border border-slate-800 hover:border-slate-700 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#46C7F0]/10 flex flex-col justify-between">
            <div className="relative h-72 sm:h-96 w-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"
                alt="AI Multimodal Revolution"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/40 to-transparent" />
              
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#46C7F0]/90 text-slate-950 backdrop-blur-md shadow">
                  TIÊU ĐIỂM AI
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#0A0E17]/80 text-slate-300 border border-slate-700/80 backdrop-blur-md">
                  Đặc biệt
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                <span className="flex items-center gap-1 text-[#46C7F0]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Trí tuệ nhân tạo (AI)</span>
                </span>
                <span>•</span>
                <span>5 phút đọc</span>
                <span>•</span>
                <span>07/10/2026</span>
              </div>

              <Link href="/news/mo-hinh-ai-da-phuong-thuc-the-he-moi">
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-4 hover:text-[#46C7F0] transition-colors leading-tight">
                  Kỷ nguyên AI Đa phương thức: Kết hợp TTS, Giọng nói và Điện toán Edge tại Oloka.net
                </h2>
              </Link>

              <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-6">
                Các phòng thí nghiệm trí tuệ nhân tạo hàng đầu vừa công bố bước nhảy vọt trong xử lý video và âm thanh song song với độ trễ dưới 80ms, mở ra tương lai trợ lý ảo giọng nói siêu thực kết hợp cùng hệ thống phân tán Cloudflare Edge.
              </p>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <Link
                  href="/news/mo-hinh-ai-da-phuong-thuc-the-he-moi"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#46C7F0] hover:text-[#F47D59] transition-colors"
                >
                  <span>Đọc bài phân tích chuyên sâu</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <span className="text-xs text-slate-500 font-mono">OLOKA EDITORIAL</span>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Curated Tool Hyperlinks (4 Columns) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Curated Tools Box */}
            <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <FolderTree className="w-4 h-4 text-[#46C7F0]" />
                  <span>Kho Công cụ Tuyển chọn</span>
                </h3>
                <Link
                  href="/tools"
                  className="text-xs font-semibold text-[#46C7F0] hover:text-[#F47D59] transition-colors"
                >
                  Tất cả ↗
                </Link>
              </div>

              <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                Các tiện ích trực tuyến được liên kết và tuyển chọn phục vụ sáng tạo nội dung & lập trình viên:
              </p>

              {/* Tool Hyperlink Cards */}
              <div className="space-y-3">
                {/* OmniVoice Gateway Link */}
                <a
                  href="https://voice.oloka.net"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-start gap-3 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-[#46C7F0]/60 hover:bg-slate-800/80 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#46C7F0]/10 border border-[#46C7F0]/30 text-[#46C7F0] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Volume2 className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <p className="text-xs font-bold text-white group-hover:text-[#46C7F0] transition-colors truncate">
                        OmniVoice Gateway
                      </p>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-white" />
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      Chuyển văn bản thành giọng nói (TTS) & AI Voice Studio tại subdomain voice.oloka.net
                    </p>
                  </div>
                </a>

                {/* QR Generator Link */}
                <a
                  href="https://github.com/phucsd/oloka-qr-generator"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-start gap-3 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-[#F47D59]/60 hover:bg-slate-800/80 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#F47D59]/10 border border-[#F47D59]/30 text-[#F47D59] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <p className="text-xs font-bold text-white group-hover:text-[#F47D59] transition-colors truncate">
                        Oloka QR Generator
                      </p>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-white" />
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      Tạo mã QR thương hiệu Oloka với 2 tone màu #46C7F0 & #F47D59 chuẩn in ấn
                    </p>
                  </div>
                </a>

                {/* Gemini AI Studio Link */}
                <a
                  href="https://aistudio.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-start gap-3 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/80 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <p className="text-xs font-bold text-white group-hover:text-purple-400 transition-colors truncate">
                        Google AI Studio
                      </p>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-white" />
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      Nền tảng phát triển và kiểm thử prompt với các mô hình Gemini đa phương thức
                    </p>
                  </div>
                </a>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800 text-center">
                <Link
                  href="/tools"
                  className="text-xs font-semibold text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>Khám phá thêm công cụ trong danh bạ</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Trending Tags Widget */}
            <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-[#F47D59]" />
                <span>Chủ đề được quan tâm</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {['#ChatGPT-5', '#Claude 3.7', '#Edge TTS', '#Cloudflare D1', '#OpenNext', '#Payload CMS', '#Voice Cloning', '#Prompting'].map((tag, i) => (
                  <Link
                    key={i}
                    href="/news"
                    className="text-xs px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:border-[#46C7F0] hover:text-[#46C7F0] transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest AI News Feed Grid */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#46C7F0] uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Dòng sự kiện</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Bản tin Công nghệ & AI Nổi bật
            </h2>
          </div>
          <Link
            href="/news"
            className="mt-3 sm:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-[#46C7F0] hover:text-[#F47D59] transition-colors"
          >
            <span>Xem tất cả bài viết</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Cách tối ưu hóa giọng đọc AI cho Podcast và Video ngắn với TTS Studio',
              category: 'Thủ thuật',
              categoryColor: 'coral',
              date: '06/10/2026',
              slug: 'cach-toi-uu-hoa-giong-doc-ai-podcast-tts',
              readTime: '6 phút đọc',
              image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80',
              excerpt: 'Hướng dẫn từng bước thiết lập cao độ (pitch), tốc độ đọc và xử lý hậu kỳ âm thanh để biến giọng đọc máy thành giọng người truyền cảm.',
            },
            {
              title: 'Cloudflare ra mắt kỷ nguyên Edge Database siêu tốc với độ trễ phân tán toàn cầu',
              category: 'Xu hướng Công nghệ',
              categoryColor: 'cyan',
              date: '05/10/2026',
              slug: 'cloudflare-ra-mat-ky-nguyen-edge-database-sieu-toc',
              readTime: '5 phút đọc',
              image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
              excerpt: 'Khảo sát hiệu năng thực tế của Cloudflare D1 và Workers khi vận hành CMS quy mô lớn: Tiết kiệm chi phí vượt trội và phản hồi dưới 15ms.',
            },
            {
              title: 'Top 5 công cụ tạo mã QR thương hiệu 2 tone màu đẹp mắt và chuẩn in ấn 2026',
              category: 'Đánh giá',
              categoryColor: 'coral',
              date: '04/10/2026',
              slug: 'top-5-cong-cu-tao-ma-qr-thuong-hieu-dep-mat',
              readTime: '3 phút đọc',
              image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
              excerpt: 'Không còn những mã QR đen trắng đơn điệu, các nhà thiết kế hiện đại đang chuyển sang mã QR gradient có lồng ghép logo tâm điểm.',
            },
          ].map((item, idx) => (
            <article
              key={idx}
              className="group bg-[#111827] border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold border backdrop-blur-md ${
                        item.categoryColor === 'cyan'
                          ? 'bg-[#0A0E17]/80 text-[#46C7F0] border-[#46C7F0]/30'
                          : 'bg-[#0A0E17]/80 text-[#F47D59] border-[#F47D59]/30'
                      }`}
                    >
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-2.5 text-xs text-slate-500 mb-2">
                    <span>{item.date}</span>
                    <span>•</span>
                    <span>{item.readTime}</span>
                  </div>

                  <Link href={`/news/${item.slug}`}>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#46C7F0] transition-colors line-clamp-2 leading-snug mb-3">
                      {item.title}
                    </h3>
                  </Link>

                  <p className="text-xs sm:text-sm text-slate-400 line-clamp-3 leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 sm:p-6 pt-0 border-t border-slate-800/80 mt-2 flex items-center justify-between">
                <Link
                  href={`/news/${item.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#46C7F0] hover:text-[#F47D59] transition-colors"
                >
                  <span>Xem đầy đủ</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <span className="text-[11px] text-slate-500 font-mono">OLOKA NEWS</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-r from-[#111827] via-[#0D1322] to-[#111827] border border-slate-800 p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#46C7F0]/10 text-[#46C7F0] border border-[#46C7F0]/20 mb-4">
              <Zap className="w-3.5 h-3.5" />
              <span>Bản tin Công nghệ Hàng tuần</span>
            </span>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">
              Không bỏ lỡ bất kỳ bước đột phá AI nào
            </h2>
            <p className="text-sm text-slate-400 mb-8 leading-relaxed">
              Nhận tóm tắt các mô hình trí tuệ nhân tạo mới nhất, phân tích công nghệ từ chuyên gia và các công cụ thực chiến được gửi vào hòm thư của bạn.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                alert('Cảm ơn bạn đã đăng ký nhận tin tức từ Oloka.net!')
              }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                placeholder="Nhập địa chỉ email của bạn..."
                className="w-full px-4 py-3 rounded-xl bg-[#0A0E17] border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#46C7F0]"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#46C7F0] to-[#F47D59] hover:opacity-95 shadow-md shadow-[#46C7F0]/20 transition-all flex-shrink-0"
              >
                Đăng ký ngay
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
