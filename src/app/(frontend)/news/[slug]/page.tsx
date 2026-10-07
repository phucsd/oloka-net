'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Share2, 
  Sparkles, 
  Volume2, 
  QrCode, 
  ArrowRight,
  Bookmark,
  Check,
  Tag
} from 'lucide-react'
import { ALL_ARTICLES } from '@/lib/news-data'

export default function ArticleDetailPage() {
  const params = useParams()
  const slug = params?.slug as string
  const [copied, setCopied] = useState(false)

  // Find article by slug, or fallback to first article
  const article = ALL_ARTICLES.find((a) => a.slug === slug) || ALL_ARTICLES[0]

  // Related articles in same category
  const relatedArticles = ALL_ARTICLES
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 3)

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      if (navigator.share) {
        navigator.share({ title: article.title, url: window.location.href })
      } else {
        navigator.clipboard.writeText(window.location.href)
        setCopied(true)
        setTimeout(() => setCopied(false), 2500)
      }
    }
  }

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Back button */}
      <Link
        href="/news"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#0284c7] transition-colors mb-6 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>Quay lại danh sách Tin tức</span>
      </Link>

      {/* Main Article Container - Clean White Editorial Paper */}
      <article className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
        
        {/* Article Header */}
        <header className="space-y-4 mb-8">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-[#0284c7] border border-sky-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{article.categoryName}</span>
            </span>
            <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
              <Calendar className="w-3.5 h-3.5" />
              <span>{article.publishedAt}</span>
            </span>
            <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readTime}</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed border-l-4 border-[#0284c7] pl-4 py-1 italic bg-slate-50/70 rounded-r-xl">
            {article.excerpt}
          </p>
        </header>

        {/* Cover Image */}
        <div className="rounded-2xl overflow-hidden border border-slate-200 mb-8 bg-slate-100">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-[320px] sm:h-[460px] object-cover"
          />
        </div>

        {/* Body Content */}
        <div className="text-slate-700 space-y-6 text-base sm:text-lg leading-relaxed">
          {article.headings && article.headings.length > 0 ? (
            article.headings.map((heading, idx) => (
              <section key={idx} className="space-y-3 pt-2">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-6 mb-3 flex items-center gap-2.5">
                  <span className="w-2 h-6 rounded-full bg-gradient-to-b from-[#46C7F0] to-[#F47D59]" />
                  <span>{heading}</span>
                </h2>
                <p className="text-slate-700 leading-relaxed">
                  {article.paragraphs[idx] || 'Nội dung phân tích đang được cập nhật chi tiết từ các chuyên gia công nghệ.'}
                </p>
              </section>
            ))
          ) : (
            <p>Nội dung đang được cập nhật.</p>
          )}

          {/* Callout Box - Curated Tool Experience */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-sky-50 via-slate-50 to-orange-50 border border-slate-200 my-8 shadow-2xs">
            <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#0284c7]" />
              <span>Trải nghiệm các tiện ích miễn phí liên kết tại Oloka</span>
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              Bạn có thể nghe thử giọng đọc AI tiếng Việt hoặc tạo mã QR thương hiệu 2 tone màu ngay bây giờ:
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://voice.oloka.net"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#0284c7] hover:bg-sky-600 shadow-xs transition-colors"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Mở OmniVoice (voice.oloka.net) ↗</span>
              </a>
              <a
                href="https://github.com/phucsd/oloka-qr-generator"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#ea580c] hover:bg-orange-600 shadow-xs transition-colors"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Mở Oloka QR Studio ↗</span>
              </a>
            </div>
          </div>

          {/* Conclusion */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-600 leading-relaxed">
            <h4 className="font-bold text-slate-900 mb-1">Ban biên tập Oloka.net</h4>
            <p>
              Bài viết được biên soạn và kiểm chứng độc lập bởi đội ngũ phóng viên công nghệ Oloka.net. Mọi đóng góp ý kiến hoặc phản hồi xin vui lòng liên hệ ban quản trị.
            </p>
          </div>
        </div>

        {/* Share & Tags Footer */}
        <footer className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-400 font-medium">Thẻ:</span>
            {article.tags.map((t, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200"
              >
                #{t}
              </span>
            ))}
          </div>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Đã chép liên kết!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-[#0284c7]" />
                <span>Chia sẻ bài viết</span>
              </>
            )}
          </button>
        </footer>
      </article>

      {/* Related Articles Section */}
      {relatedArticles.length > 0 && (
        <section className="mt-14">
          <h3 className="text-xl font-extrabold text-slate-900 mb-6 flex items-center gap-2">
            <span>Bài viết cùng chuyên mục</span>
            <span className="text-[#0284c7] font-semibold text-sm">({article.categoryName})</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((rel) => (
              <article
                key={rel.id}
                className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl overflow-hidden transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="h-36 overflow-hidden bg-slate-100">
                    <img
                      src={rel.imageUrl}
                      alt={rel.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-[11px] text-slate-400 block mb-1">
                      {rel.publishedAt} • {rel.readTime}
                    </span>
                    <Link href={`/news/${rel.slug}`}>
                      <h4 className="text-sm font-bold text-slate-900 hover:text-[#0284c7] line-clamp-2 leading-snug">
                        {rel.title}
                      </h4>
                    </Link>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <Link
                    href={`/news/${rel.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#0284c7] hover:text-[#ea580c]"
                  >
                    <span>Xem tiếp</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
