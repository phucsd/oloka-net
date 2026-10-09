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
  ArrowRight,
  Check,
  User,
  ExternalLink,
  Quote as QuoteIcon,
  BookOpen,
  CheckCircle2,
  Camera,
  ShieldCheck,
  Tag
} from 'lucide-react'
import { ALL_ARTICLES, ArticleItem } from '@/lib/news-data'

export default function ArticleDetailPage() {
  const params = useParams()
  const slug = params?.slug as string
  const [copied, setCopied] = useState(false)
  const [dynamicArticle, setDynamicArticle] = useState<ArticleItem | null>(null)

  // Fetch from D1 if not present in static ALL_ARTICLES
  React.useEffect(() => {
    const staticFound = ALL_ARTICLES.find((a) => a.slug === slug)
    if (!staticFound && slug) {
      fetch(`/api/articles?where[slug][equals]=${encodeURIComponent(slug)}&depth=1`)
        .then((res) => res.json())
        .then((data: any) => {
          const doc = data?.docs?.[0]
          if (doc) {
            let paragraphs: string[] = []
            try {
              if (doc.content?.root?.children) {
                paragraphs = doc.content.root.children
                  .filter((c: any) => c.type === 'paragraph')
                  .map((c: any) => c.children?.map((ch: any) => ch.text).join('') || '')
                  .filter(Boolean)
              }
            } catch {}

            setDynamicArticle({
              id: String(doc.id),
              title: doc.title,
              slug: doc.slug,
              category: doc.category?.slug || 'tech-trends',
              categoryName: doc.category?.name || 'Xu hướng Công nghệ',
              categoryColor: doc.category?.color || '#46C7F0',
              excerpt: doc.excerpt || '',
              imageUrl: doc.imageUrl || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
              imageCaption: 'Ảnh tư liệu bài viết tự động cập nhật',
              author: 'Biên tập viên Oloka News',
              source: { name: 'Oloka Automation' },
              publishedAt: doc.publishedAt ? new Date(doc.publishedAt).toLocaleDateString('vi-VN') : 'Mới cập nhật',
              readTime: '4 phút đọc',
              featured: Boolean(doc.featured),
              keyTakeaways: ['Bài viết phân tích tự động từ hệ thống xuất bản tin tức AI Oloka.'],
              sections: [
                {
                  heading: 'Diễn biến và bối cảnh sự kiện',
                  paragraphs: paragraphs.length > 0 ? paragraphs : [doc.excerpt || ''],
                },
              ],
              references: [],
              tags: (doc.tags || []).map((t: any) => t.tag || t).filter(Boolean),
            })
          }
        })
        .catch(() => {})
    }
  }, [slug])

  // Find article by slug, or dynamic article, or fallback to first article
  const article = ALL_ARTICLES.find((a) => a.slug === slug) || dynamicArticle || ALL_ARTICLES[0]

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
          {/* Metadata badges */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-[#0284c7] border border-sky-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{article.categoryName}</span>
            </span>
            <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{article.publishedAt}</span>
            </span>
            <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{article.readTime}</span>
            </span>
          </div>

          {/* Article Title */}
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight">
            {article.title}
          </h1>

          {/* Author & Accredited Source Attribution */}
          <div className="flex flex-wrap items-center gap-4 py-3 border-y border-slate-100 text-xs text-slate-600">
            <div className="flex items-center gap-1.5 font-medium">
              <User className="w-4 h-4 text-[#0284c7]" />
              <span>Tác giả / Biên tập: <strong className="text-slate-900 font-semibold">{article.author || 'Ban biên tập Oloka'}</strong></span>
            </div>
            {article.source && (
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Nguồn tin gốc: </span>
                {article.source.url ? (
                  <a 
                    href={article.source.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-semibold text-[#0284c7] hover:underline inline-flex items-center gap-0.5"
                  >
                    <span>{article.source.name}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="font-semibold text-slate-800">{article.source.name}</span>
                )}
              </div>
            )}
          </div>

          {/* Sa-pô / Editorial Lead */}
          <div className="border-l-4 border-[#0284c7] pl-5 py-3 bg-gradient-to-r from-sky-50/70 via-slate-50/50 to-transparent rounded-r-2xl">
            <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-medium italic">
              {article.excerpt}
            </p>
          </div>
        </header>

        {/* Cover Image & Caption */}
        <figure className="mb-10">
          <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-2xs">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-[320px] sm:h-[460px] object-cover"
            />
          </div>
          {article.imageCaption && (
            <figcaption className="text-xs text-slate-500 mt-2.5 px-2 flex items-center gap-1.5 italic">
              <Camera className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{article.imageCaption}</span>
            </figcaption>
          )}
        </figure>

        {/* Key Takeaways Box (Điểm nhấn then chốt) */}
        {article.keyTakeaways && article.keyTakeaways.length > 0 && (
          <div className="p-6 rounded-2xl bg-gradient-to-br from-sky-50/80 via-slate-50 to-orange-50/40 border border-sky-200/80 mb-10 shadow-2xs">
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#0284c7]" />
              <span>Điểm nhấn then chốt (Key Takeaways)</span>
            </h3>
            <ul className="space-y-2.5">
              {article.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm sm:text-base text-slate-700 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7] mt-2.5 shrink-0" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Main Body Content - Structured Editorial Sections */}
        <div className="text-slate-800 space-y-8 text-base sm:text-lg leading-relaxed">
          {article.sections && article.sections.length > 0 ? (
            article.sections.map((section, sIdx) => (
              <section key={sIdx} className="space-y-4 pt-2">
                {section.heading && (
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-8 mb-4 flex items-center gap-3">
                    <span className="w-2 h-7 rounded-full bg-gradient-to-b from-[#46C7F0] to-[#F47D59] shrink-0" />
                    <span>{section.heading}</span>
                  </h2>
                )}

                {/* Multi-paragraph analysis */}
                <div className="space-y-4">
                  {section.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="text-slate-700 leading-relaxed text-base sm:text-lg">
                      {p}
                    </p>
                  ))}
                </div>

                {/* Stylized Pull Quote / Blockquote */}
                {section.quote && (
                  <blockquote className="my-6 p-6 rounded-2xl bg-slate-50 border-l-4 border-[#F47D59] relative">
                    <QuoteIcon className="w-8 h-8 text-orange-200 absolute right-4 top-4 pointer-events-none" />
                    <p className="text-slate-800 italic font-medium text-base sm:text-lg leading-relaxed mb-3">
                      "{section.quote.text}"
                    </p>
                    <footer className="text-xs sm:text-sm text-slate-600 flex items-center gap-1.5 font-semibold">
                      <span className="text-[#ea580c]">— {section.quote.author}</span>
                      {section.quote.title && (
                        <span className="text-slate-400 font-normal">({section.quote.title})</span>
                      )}
                    </footer>
                  </blockquote>
                )}
              </section>
            ))
          ) : article.headings && article.headings.length > 0 ? (
            // Backward compatibility fallback
            article.headings.map((heading, idx) => (
              <section key={idx} className="space-y-3 pt-2">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-6 mb-3 flex items-center gap-2.5">
                  <span className="w-2 h-6 rounded-full bg-gradient-to-b from-[#46C7F0] to-[#F47D59]" />
                  <span>{heading}</span>
                </h2>
                <p className="text-slate-700 leading-relaxed">
                  {article.paragraphs && article.paragraphs[idx]}
                </p>
              </section>
            ))
          ) : (
            <p>Nội dung phân tích đang được cập nhật từ ban biên tập.</p>
          )}

          {/* References & Source Citations Box */}
          {article.references && article.references.length > 0 && (
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 my-8">
              <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#0284c7]" />
                <span>Nguồn tin & Tài liệu tham khảo chính thống</span>
              </h3>
              <p className="text-xs text-slate-500 mb-3">
                Bài viết được tổng hợp, đối chiếu và biên dịch từ các ấn phẩm và báo cáo kỹ thuật:
              </p>
              <ul className="space-y-2">
                {article.references.map((ref, rIdx) => (
                  <li key={rIdx} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2">
                    <span className="text-slate-400 font-bold shrink-0">[{rIdx + 1}]</span>
                    <div>
                      {ref.url ? (
                        <a
                          href={ref.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-[#0284c7] hover:underline inline-flex items-center gap-1"
                        >
                          <span>{ref.title}</span>
                          <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>
                      ) : (
                        <span className="font-medium text-slate-800">{ref.title}</span>
                      )}
                      <span className="text-slate-500 text-xs ml-1.5">— ({ref.source})</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Editorial Sign-off Note */}
          <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#0284c7]" />
              <span>Ban biên tập Công nghệ Oloka.net</span>
            </h4>
            <p>
              Bài viết được biên soạn và kiểm chứng độc lập bởi đội ngũ phóng viên công nghệ Oloka.net. Chúng tôi tuân thủ các nguyên tắc minh bạch dữ liệu và trích dẫn nguồn tin gốc. Mọi phản hồi xin vui lòng liên hệ tòa soạn.
            </p>
          </div>
        </div>

        {/* Share & Tags Footer */}
        <footer className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <Tag className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs text-slate-400 font-medium">Thẻ chủ đề:</span>
            {article.tags && article.tags.map((t, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 transition-colors"
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
