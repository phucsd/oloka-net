'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  Newspaper, 
  Sparkles, 
  Clock, 
  Calendar, 
  ArrowRight, 
  Search, 
  TrendingUp, 
  Tag,
  Zap
} from 'lucide-react'

interface NewsItem {
  id: string
  title: string
  slug: string
  category: string
  categoryLabel: string
  excerpt: string
  publishedAt: string
  readTime: string
  featured?: boolean
  color: 'cyan' | 'coral'
  image: string
}

const SAMPLE_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'Mô hình AI đa phương thức thế hệ mới chính thức vượt mốc tư duy thời gian thực',
    slug: 'mo-hinh-ai-da-phuong-thuc-the-he-moi',
    category: 'ai-news',
    categoryLabel: 'Tin tức AI',
    excerpt: 'Các phòng thí nghiệm trí tuệ nhân tạo hàng đầu vừa công bố bước nhảy vọt trong xử lý video và âm thanh song song với độ trễ dưới 80ms, mở ra kỷ nguyên trợ lý giọng nói siêu thực.',
    publishedAt: '07/10/2026',
    readTime: '4 phút đọc',
    featured: true,
    color: 'cyan',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '2',
    title: 'Cách tối ưu hóa giọng đọc AI cho Podcast và Video ngắn với TTS Studio',
    slug: 'cach-toi-uu-hoa-giong-doc-ai-podcast-tts',
    category: 'tutorials',
    categoryLabel: 'Thủ thuật',
    excerpt: 'Hướng dẫn từng bước thiết lập cao độ (pitch), tốc độ đọc và xử lý hậu kỳ âm thanh để biến giọng đọc máy thành giọng người truyền cảm đầy lôi cuốn.',
    publishedAt: '06/10/2026',
    readTime: '6 phút đọc',
    featured: false,
    color: 'coral',
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    title: 'Cloudflare ra mắt kỷ nguyên Edge Database siêu tốc với độ trễ phân tán toàn cầu',
    slug: 'cloudflare-ra-mat-ky-nguyen-edge-database-sieu-toc',
    category: 'tech-trends',
    categoryLabel: 'Xu hướng Công nghệ',
    excerpt: 'Khảo sát hiệu năng thực tế của Cloudflare D1 và Workers khi vận hành CMS quy mô lớn: Tiết kiệm chi phí vượt trội và phản hồi dưới 15ms tại các điểm POP châu Á.',
    publishedAt: '05/10/2026',
    readTime: '5 phút đọc',
    featured: false,
    color: 'cyan',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '4',
    title: 'Top 5 công cụ tạo mã QR thương hiệu 2 tone màu đẹp mắt và chuẩn in ấn 2026',
    slug: 'top-5-cong-cu-tao-ma-qr-thuong-hieu-dep-mat',
    category: 'reviews',
    categoryLabel: 'Đánh giá Công cụ',
    excerpt: 'Không còn những mã QR đen trắng đơn điệu, các nhà thiết kế hiện đại đang chuyển sang mã QR gradient có lồng ghép logo tâm điểm để tăng tỷ lệ quét lên 40%.',
    publishedAt: '04/10/2026',
    readTime: '3 phút đọc',
    featured: false,
    color: 'coral',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
  },
]

export default function NewsPage() {
  const [selectedCat, setSelectedCat] = useState('all')
  const [search, setSearch] = useState('')

  const featuredArticle = SAMPLE_NEWS.find((item) => item.featured)
  const regularArticles = SAMPLE_NEWS.filter((item) => {
    const matchesCat = selectedCat === 'all' || item.category === selectedCat
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(search.toLowerCase())
    return matchesCat && matchesSearch
  })

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#F47D59]/10 text-[#F47D59] border border-[#F47D59]/20 mb-4">
          <Zap className="w-3.5 h-3.5" />
          <span>Oloka Tech & AI Newsroom</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
          Tin tức Công nghệ <span className="text-gradient">& AI News</span>
        </h1>
        <p className="text-slate-400 text-base sm:text-lg">
          Cập nhật chuyển động nhanh nhất về Trí tuệ Nhân tạo, xu hướng đám mây Edge computing, đánh giá công cụ và hướng dẫn chuyên sâu.
        </p>

        {/* Search Input */}
        <div className="mt-8 max-w-xl mx-auto relative">
          <Search className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm bài viết công nghệ, tin AI..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-[#111827] border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-[#46C7F0] text-sm"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {[
          { id: 'all', label: 'Tất cả bài viết' },
          { id: 'ai-news', label: 'Tin tức AI' },
          { id: 'tech-trends', label: 'Xu hướng Công nghệ' },
          { id: 'tutorials', label: 'Thủ thuật & Hướng dẫn' },
          { id: 'reviews', label: 'Đánh giá Công cụ' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedCat(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              selectedCat === tab.id
                ? 'bg-gradient-to-r from-[#46C7F0] to-[#F47D59] text-white shadow-md'
                : 'bg-[#111827] text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Featured Big Card */}
      {featuredArticle && selectedCat === 'all' && !search && (
        <div className="mb-12 bg-[#111827] border border-slate-800 hover:border-slate-700 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#46C7F0]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#46C7F0]/10 text-[#46C7F0] border border-[#46C7F0]/20 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" />
                    <span>{featuredArticle.categoryLabel}</span>
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{featuredArticle.publishedAt}</span>
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{featuredArticle.readTime}</span>
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 hover:text-[#46C7F0] transition-colors leading-snug">
                  {featuredArticle.title}
                </h2>
                <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-6">
                  {featuredArticle.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-mono">BÀI VIẾT NỔI BẬT</span>
                <Link
                  href={`/news/${featuredArticle.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#46C7F0] hover:text-[#F47D59] transition-colors"
                >
                  <span>Đọc toàn bộ bài viết</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent lg:hidden" />
            </div>
          </div>
        </div>
      )}

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {regularArticles.map((article) => {
          const isCyan = article.color === 'cyan'

          return (
            <article
              key={article.id}
              className="bg-[#111827] border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#46C7F0]/10 flex flex-col justify-between"
            >
              <div>
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold border backdrop-blur-md ${
                        isCyan
                          ? 'bg-[#0A0E17]/80 text-[#46C7F0] border-[#46C7F0]/30'
                          : 'bg-[#0A0E17]/80 text-[#F47D59] border-[#F47D59]/30'
                      }`}
                    >
                      {article.categoryLabel}
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-2.5">
                    <span>{article.publishedAt}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2.5 line-clamp-2 hover:text-[#46C7F0] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 sm:p-6 pt-0 border-t border-slate-800/80 mt-4 flex items-center justify-between">
                <Link
                  href={`/news/${article.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#46C7F0] hover:text-white transition-colors"
                >
                  <span>Xem chi tiết</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-[11px] text-slate-500 font-mono">OLOKA NEWS</span>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
