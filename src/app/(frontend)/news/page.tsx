'use client'

import React, { useState, useMemo, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { 
  Sparkles, 
  Clock, 
  Calendar, 
  ArrowRight, 
  Search, 
  Tag,
  Zap,
  ChevronLeft,
  ChevronRight,
  Filter
} from 'lucide-react'
import { ALL_ARTICLES, CATEGORIES, ArticleItem } from '@/lib/news-data'

function NewsContent() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get('category') || 'all'

  const [selectedCat, setSelectedCat] = useState<string>(initialCategory)
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const articlesPerPage = 12

  // Filter articles based on category and search query
  const filteredArticles = useMemo(() => {
    return ALL_ARTICLES.filter((item) => {
      const matchesCat = selectedCat === 'all' || item.category === selectedCat
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        item.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
      return matchesCat && matchesSearch
    })
  }, [selectedCat, search])

  // Pagination calculation
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage) || 1
  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * articlesPerPage
    return filteredArticles.slice(start, start + articlesPerPage)
  }, [filteredArticles, currentPage])

  // Handle category change
  const handleCategoryChange = (catSlug: string) => {
    setSelectedCat(catSlug)
    setCurrentPage(1)
  }

  // Handle search change
  const handleSearchChange = (val: string) => {
    setSearch(val)
    setCurrentPage(1)
  }

  const featuredArticle = ALL_ARTICLES.find((item) => item.featured) || ALL_ARTICLES[0]

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-[#0284c7] border border-sky-200 mb-4 shadow-2xs">
          <Zap className="w-3.5 h-3.5" />
          <span>Oloka Tech & AI Newsroom ({ALL_ARTICLES.length} Bài viết tuyển chọn)</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
          Cổng Tin tức Công nghệ <span className="text-gradient">& AI News</span>
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          Cập nhật chuyển động nhanh nhất về Trí tuệ Nhân tạo, điện toán Edge computing, cẩm nang thủ thuật và đánh giá sản phẩm thực chiến.
        </p>

        {/* Search Input - Light Theme */}
        <div className="mt-8 max-w-xl mx-auto relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Tìm kiếm theo tiêu đề, nội dung hoặc thẻ (#AI, #TTS, #Security...)"
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0284c7] text-sm shadow-xs"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10 pb-2">
        <button
          onClick={() => handleCategoryChange('all')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            selectedCat === 'all'
              ? 'bg-gradient-to-r from-[#46C7F0] to-[#F47D59] text-white shadow-xs'
              : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Tất cả ({ALL_ARTICLES.length})
        </button>

        {CATEGORIES.map((tab) => {
          const count = ALL_ARTICLES.filter(a => a.category === tab.slug).length
          return (
            <button
              key={tab.id}
              onClick={() => handleCategoryChange(tab.slug)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedCat === tab.slug
                  ? 'bg-gradient-to-r from-[#46C7F0] to-[#F47D59] text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {tab.name} ({count})
            </button>
          )
        })}
      </div>

      {/* Featured Big Card (Visible on page 1, all categories, no search) */}
      {currentPage === 1 && selectedCat === 'all' && !search && featuredArticle && (
        <div className="mb-12 bg-white border border-slate-200 hover:border-slate-300 rounded-3xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-[#0284c7] border border-sky-200 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" />
                    <span>{featuredArticle.categoryName}</span>
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{featuredArticle.publishedAt}</span>
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{featuredArticle.readTime}</span>
                  </span>
                </div>

                <Link href={`/news/${featuredArticle.slug}`}>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4 hover:text-[#0284c7] transition-colors leading-snug tracking-tight">
                    {featuredArticle.title}
                  </h2>
                </Link>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                  {featuredArticle.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono font-bold tracking-wider">TIÊU ĐIỂM CHỌN LỌC</span>
                <Link
                  href={`/news/${featuredArticle.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#0284c7] hover:text-[#ea580c] transition-colors"
                >
                  <span>Đọc toàn bộ bài viết</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full bg-slate-100">
              <img
                src={featuredArticle.imageUrl}
                alt={featuredArticle.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}

      {/* Result Count and Current Filter Indicator */}
      <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-200 text-xs text-slate-500">
        <span>
          Hiển thị <strong>{paginatedArticles.length}</strong> / <strong>{filteredArticles.length}</strong> bài viết phù hợp
        </span>
        <span>
          Trang <strong>{currentPage}</strong> trên <strong>{totalPages}</strong>
        </span>
      </div>

      {/* Regular Articles Grid */}
      {paginatedArticles.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
          <p className="text-base text-slate-600 mb-3">Không tìm thấy bài viết nào phù hợp với từ khóa "{search}".</p>
          <button
            onClick={() => { setSearch(''); setSelectedCat('all'); }}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#46C7F0] to-[#F47D59]"
          >
            Đặt lại bộ lọc
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedArticles.map((article) => (
            <article
              key={article.id}
              className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="h-48 overflow-hidden relative bg-slate-100">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/95 text-slate-800 border border-slate-200 shadow-xs backdrop-blur-sm">
                      {article.categoryName}
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-2.5">
                    <span>{article.publishedAt}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>

                  <Link href={`/news/${article.slug}`}>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2.5 line-clamp-2 hover:text-[#0284c7] transition-colors leading-snug">
                      {article.title}
                    </h3>
                  </Link>
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4">
                    {article.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {article.tags.slice(0, 3).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                <Link
                  href={`/news/${article.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0284c7] hover:text-[#ea580c] transition-colors"
                >
                  <span>Xem chi tiết</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-[11px] text-slate-400 font-mono">OLOKA NEWS</span>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-2">
          <button
            onClick={() => {
              if (currentPage > 1) {
                setCurrentPage(currentPage - 1)
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }
            }}
            disabled={currentPage === 1}
            className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            // Show only relevant pages around current page
            if (page === 1 || page === totalPages || (page >= currentPage - 2 && page <= currentPage + 2)) {
              return (
                <button
                  key={page}
                  onClick={() => {
                    setCurrentPage(page)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  className={`min-w-[40px] h-10 px-3 rounded-xl text-xs font-bold transition-all ${
                    currentPage === page
                      ? 'bg-gradient-to-r from-[#46C7F0] to-[#F47D59] text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                  }`}
                >
                  {page}
                </button>
              )
            }
            if (page === currentPage - 3 || page === currentPage + 3) {
              return <span key={page} className="px-1 text-slate-400 text-xs">...</span>
            }
            return null
          })}

          <button
            onClick={() => {
              if (currentPage < totalPages) {
                setCurrentPage(currentPage + 1)
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }
            }}
            disabled={currentPage === totalPages}
            className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs"
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}

export default function NewsPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-slate-500 text-sm">Đang tải bản tin...</div>}>
      <NewsContent />
    </Suspense>
  )
}
