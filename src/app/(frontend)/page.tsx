'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  Sparkles, 
  ArrowRight, 
  Flame, 
  Volume2, 
  QrCode, 
  Cpu, 
  TrendingUp, 
  FolderTree, 
  ExternalLink,
  ChevronRight,
  BookOpen,
  Award,
  ShieldCheck,
  Bot
} from 'lucide-react'
import { ALL_ARTICLES, CATEGORIES } from '@/lib/news-data'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('all')

  // Featured lead story (first featured article)
  const leadArticle = ALL_ARTICLES[0]
  const subLeadArticles = ALL_ARTICLES.slice(1, 4)
  const trendingArticles = ALL_ARTICLES.slice(4, 9)

  // Filtered articles for the feed grid
  const filteredFeed = activeTab === 'all' 
    ? ALL_ARTICLES.slice(9, 21) 
    : ALL_ARTICLES.filter(a => a.category === activeTab).slice(0, 12)

  return (
    <div className="relative">
      {/* Breaking News Ticker Bar - Light High Contrast */}
      <div className="border-b border-slate-200 bg-white shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold bg-orange-100 text-[#ea580c] border border-orange-200 uppercase text-[10px] tracking-wider">
              <Flame className="w-3 h-3 fill-[#ea580c]" />
              <span>Tin Mới Nhận</span>
            </span>
          </div>

          <div className="overflow-hidden flex-1">
            <Link
              href={`/news/${leadArticle.slug}`}
              className="text-slate-700 hover:text-[#0284c7] font-medium transition-colors truncate block"
            >
              {leadArticle.title} • {subLeadArticles[0].title}
            </Link>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-slate-500 font-mono text-[11px] flex-shrink-0">
            <span>07/10/2026</span>
          </div>
        </div>
      </div>

      {/* Top Editorial Section: Lead News Hero */}
      <section className="pt-8 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Top Story (8 Columns) - Clean Editorial Card */}
          <div className="lg:col-span-8 bg-white border border-slate-200 hover:border-slate-300 rounded-3xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between">
            <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-slate-100">
              <img
                src={leadArticle.imageUrl}
                alt={leadArticle.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#0284c7] text-white shadow-sm">
                  TIÊU ĐIỂM HÔM NAY
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/95 text-slate-800 border border-slate-200 shadow-xs backdrop-blur-sm">
                  {leadArticle.categoryName}
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                <span className="font-semibold text-[#0284c7] flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{leadArticle.categoryName}</span>
                </span>
                <span>•</span>
                <span>{leadArticle.readTime}</span>
                <span>•</span>
                <span>{leadArticle.publishedAt}</span>
              </div>

              <Link href={`/news/${leadArticle.slug}`}>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4 hover:text-[#0284c7] transition-colors leading-tight tracking-tight">
                  {leadArticle.title}
                </h2>
              </Link>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                {leadArticle.excerpt}
              </p>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={`/news/${leadArticle.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#0284c7] hover:text-[#ea580c] transition-colors"
                >
                  <span>Đọc bài phân tích chuyên sâu</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <span className="text-xs text-slate-400 font-mono uppercase tracking-wider">OLOKA EDITORIAL</span>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Curated Tool Hyperlinks (4 Columns) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Curated Tools Box - Light Theme */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <FolderTree className="w-4 h-4 text-[#0284c7]" />
                  <span>Kho Công cụ Tuyển chọn</span>
                </h3>
                <Link
                  href="/tools"
                  className="text-xs font-semibold text-[#0284c7] hover:text-[#ea580c] transition-colors"
                >
                  Tất cả ↗
                </Link>
              </div>

              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                Các tiện ích ngoại vi hữu ích được liên kết trực tiếp phục vụ sáng tạo nội dung & lập trình:
              </p>

              {/* Tool Hyperlink Cards */}
              <div className="space-y-3">
                {/* OmniVoice Gateway Link */}
                <a
                  href="https://voice.oloka.net"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-sky-300 hover:bg-sky-50/50 transition-all shadow-2xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-sky-100 border border-sky-200 text-[#0284c7] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Volume2 className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <p className="text-xs font-bold text-slate-900 group-hover:text-[#0284c7] transition-colors truncate">
                        OmniVoice AI Gateway
                      </p>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700" />
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                      Chuyển văn bản thành giọng nói (TTS) tiếng Việt & Voice Studio tại subdomain voice.oloka.net
                    </p>
                  </div>
                </a>

                {/* QR Generator Link */}
                <a
                  href="https://github.com/phucsd/oloka-qr-generator"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-orange-300 hover:bg-orange-50/50 transition-all shadow-2xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-orange-100 border border-orange-200 text-[#ea580c] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <p className="text-xs font-bold text-slate-900 group-hover:text-[#ea580c] transition-colors truncate">
                        Oloka QR Generator
                      </p>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700" />
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                      Tạo mã QR thương hiệu Oloka với 2 tone màu #46C7F0 & #F47D59 chuẩn vector in ấn
                    </p>
                  </div>
                </a>

                {/* Gemini AI Studio Link */}
                <a
                  href="https://aistudio.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-purple-300 hover:bg-purple-50/50 transition-all shadow-2xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-100 border border-purple-200 text-purple-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <p className="text-xs font-bold text-slate-900 group-hover:text-purple-600 transition-colors truncate">
                        Google AI Studio
                      </p>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700" />
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                      Nền tảng phát triển và kiểm thử prompt với các mô hình Gemini Flash & Pro đa phương thức
                    </p>
                  </div>
                </a>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-center">
                <Link
                  href="/tools"
                  className="text-xs font-semibold text-[#0284c7] hover:text-[#ea580c] transition-colors inline-flex items-center gap-1"
                >
                  <span>Khám phá thêm công cụ trong danh bạ</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Trending Articles List Widget */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-[#ea580c]" />
                <span>Đọc nhiều nhất trong tuần</span>
              </h3>
              
              <div className="divide-y divide-slate-100">
                {trendingArticles.map((art, idx) => (
                  <article key={art.id} className="py-3 first:pt-0 last:pb-0">
                    <div className="flex items-start gap-3">
                      <span className="text-lg font-black text-slate-300 font-mono w-5 text-right flex-shrink-0">
                        {idx + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <Link href={`/news/${art.slug}`}>
                          <h4 className="text-xs font-bold text-slate-800 hover:text-[#0284c7] transition-colors line-clamp-2 leading-snug">
                            {art.title}
                          </h4>
                        </Link>
                        <span className="text-[11px] text-slate-500 mt-1 block">
                          {art.categoryName} • {art.readTime}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3 Sub-lead News Cards */}
      <section className="pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subLeadArticles.map((art) => (
            <article
              key={art.id}
              className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="h-44 overflow-hidden relative bg-slate-100">
                  <img
                    src={art.imageUrl}
                    alt={art.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/95 text-slate-800 border border-slate-200 shadow-xs backdrop-blur-sm">
                      {art.categoryName}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                    <span>{art.publishedAt}</span>
                    <span>•</span>
                    <span>{art.readTime}</span>
                  </div>

                  <Link href={`/news/${art.slug}`}>
                    <h3 className="text-base font-bold text-slate-900 hover:text-[#0284c7] transition-colors line-clamp-2 leading-snug mb-2">
                      {art.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                <Link
                  href={`/news/${art.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0284c7] hover:text-[#ea580c] transition-colors"
                >
                  <span>Xem chi tiết</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-[11px] text-slate-400 font-mono">OLOKA</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Category Tabs & 100 Articles Feed Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0284c7] uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Kho Lưu trữ 100 Bài viết</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Dòng Tin tức & Sự kiện Công nghệ
            </h2>
          </div>
          <Link
            href="/news"
            className="mt-3 sm:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-[#0284c7] hover:text-[#ea580c] transition-colors"
          >
            <span>Mở toàn bộ danh sách 100 bài</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category Pills Filter */}
        <div className="flex flex-wrap items-center gap-2 mb-8 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'all'
                ? 'bg-gradient-to-r from-[#46C7F0] to-[#F47D59] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Tất cả bài viết ({ALL_ARTICLES.length})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.slug)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === cat.slug
                  ? 'bg-gradient-to-r from-[#46C7F0] to-[#F47D59] text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFeed.map((item) => (
            <article
              key={item.id}
              className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="h-44 overflow-hidden relative bg-slate-100">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/95 text-slate-800 border border-slate-200 shadow-xs backdrop-blur-sm">
                      {item.categoryName}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                    <span>{item.publishedAt}</span>
                    <span>•</span>
                    <span>{item.readTime}</span>
                  </div>

                  <Link href={`/news/${item.slug}`}>
                    <h3 className="text-base font-bold text-slate-900 hover:text-[#0284c7] transition-colors line-clamp-2 leading-snug mb-2">
                      {item.title}
                    </h3>
                  </Link>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                <Link
                  href={`/news/${item.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0284c7] hover:text-[#ea580c] transition-colors"
                >
                  <span>Xem đầy đủ</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-[11px] text-slate-400 font-mono">OLOKA NEWS</span>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-10 text-center">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-slate-800 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-xs transition-all"
          >
            <span>Duyệt toàn bộ 100 bài viết theo chuyên mục</span>
            <ArrowRight className="w-4 h-4 text-[#0284c7]" />
          </Link>
        </div>
      </section>

      {/* Newsletter Section - Clean White Card */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-r from-sky-50 via-white to-orange-50 border border-slate-200 p-8 sm:p-12 text-center shadow-xs">
          <div className="max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-[#0284c7] border border-sky-200 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bản tin Công nghệ & AI Hàng tuần</span>
            </span>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              Đồng hành cùng bước tiến công nghệ tại Oloka.net
            </h2>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
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
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#0284c7] shadow-2xs"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#46C7F0] to-[#F47D59] hover:opacity-90 shadow-sm transition-all flex-shrink-0 cursor-pointer"
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
