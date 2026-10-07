'use client'

import React from 'react'
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
  Mic, 
  ArrowRight,
  Bookmark
} from 'lucide-react'

export default function ArticleDetailPage() {
  const params = useParams()
  const slug = params?.slug as string

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Back button */}
      <Link
        href="/news"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-[#46C7F0] transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Quay lại trang Tin tức</span>
      </Link>

      {/* Article Header */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#46C7F0]/10 text-[#46C7F0] border border-[#46C7F0]/20 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tin tức AI & Công nghệ</span>
          </span>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>07/10/2026</span>
          </span>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>5 phút đọc</span>
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
          Kỷ nguyên AI Đa phương thức: Kết hợp TTS, Giọng nói và Điện toán Edge tại Oloka.net
        </h1>

        <p className="text-base sm:text-lg text-slate-400 leading-relaxed border-l-2 border-[#46C7F0] pl-4 italic">
          Khám phá sự giao thoa giữa các mô hình ngôn ngữ lớn, công nghệ tổng hợp âm thanh giọng người (TTS) và hạ tầng mạng phân tán toàn cầu của Cloudflare.
        </p>
      </div>

      {/* Cover Image */}
      <div className="rounded-2xl overflow-hidden border border-slate-800 mb-10">
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"
          alt="Oloka AI News Header"
          className="w-full h-[360px] sm:h-[450px] object-cover"
        />
      </div>

      {/* Body Content */}
      <div className="prose prose-invert max-w-none text-slate-300 space-y-6 text-base leading-relaxed">
        <p>
          Trong bối cảnh trí tuệ nhân tạo (AI) đang phát triển như vũ bão, nhu cầu tiếp cận các công cụ ứng dụng trực quan và nhanh chóng trở nên cấp thiết hơn bao giờ hết. Người sáng tạo nội dung không chỉ cần các mô hình xử lý văn bản mà còn cần các công cụ tạo giọng đọc (Text-to-Speech) truyền cảm, kiểm tra âm thanh phòng thu và các giải pháp kết nối số như mã QR tiện lợi.
        </p>

        <h2 className="text-xl sm:text-2xl font-bold text-white mt-8 mb-4 flex items-center gap-2">
          <span className="w-2 h-6 rounded bg-[#46C7F0]" />
          1. Bước đột phá của Text-to-Speech (TTS) thế hệ mới
        </h2>
        <p>
          Trước đây, các giọng đọc máy thường mang âm hưởng vô hồn, thiếu ngữ điệu và phát âm không chuẩn xác các từ đồng âm hoặc tiếng địa phương. Ngày nay, với sự hỗ trợ của các mô hình nơ-ron học sâu, giọng đọc AI đã đạt đến độ mượt mà đáng kinh ngạc, có khả năng diễn cảm theo cảm xúc của văn bản.
        </p>
        <p>
          Tại <strong className="text-white">Oloka.net</strong>, công cụ <strong>TTS Studio</strong> được thiết kế nhằm mang lại sự linh hoạt tối đa: người dùng có thể tùy chỉnh cao độ (pitch), nhịp điệu (rate) và phát ngay lập tức trên trình duyệt mà không cần cài đặt phần mềm phức tạp.
        </p>

        <h2 className="text-xl sm:text-2xl font-bold text-white mt-8 mb-4 flex items-center gap-2">
          <span className="w-2 h-6 rounded bg-[#F47D59]" />
          2. QR Code thương hiệu: Tương tác vật lý và kỹ thuật số
        </h2>
        <p>
          Mã QR không còn là những ô vuông pixel khô khan đơn điệu. Bằng cách áp dụng bảng màu nhận diện 2 tone <strong className="text-[#46C7F0]">#46C7F0</strong> và <strong className="text-[#F47D59]">#F47D59</strong> kết hợp logo trung tâm, thương hiệu có thể tăng mức độ nhận diện và kích thích người dùng quét mã lên gấp nhiều lần.
        </p>

        {/* Callout Box */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#46C7F0]/10 to-[#F47D59]/10 border border-slate-700/80 my-8">
          <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#46C7F0]" />
            Trải nghiệm công cụ miễn phí ngay trên Oloka
          </h3>
          <p className="text-sm text-slate-300 mb-4">
            Bạn có thể thử nghiệm tạo mã QR 2 tone màu hoặc nghe thử giọng đọc AI tiếng Việt ngay bây giờ:
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/tts"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#46C7F0] hover:bg-[#46C7F0]/90 transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Mở TTS Studio</span>
            </Link>
            <Link
              href="/tools/qr-code"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#F47D59] hover:bg-[#F47D59]/90 transition-colors"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Mở QR Code Studio</span>
            </Link>
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-white mt-8 mb-4 flex items-center gap-2">
          <span className="w-2 h-6 rounded bg-[#46C7F0]" />
          3. Sức mạnh của kiến trúc Payload CMS trên Cloudflare
        </h2>
        <p>
          Hệ thống Oloka.net được xây dựng trên nền tảng <strong>Payload CMS 3.0</strong>, kết hợp cùng cơ sở dữ liệu serverless <strong>Cloudflare D1</strong> và kho lưu trữ tệp <strong>Cloudflare R2</strong>. Điều này mang lại tốc độ phản hồi cực kỳ ấn tượng trên toàn cầu, đồng thời cho phép đội ngũ biên tập quản trị bài viết và công cụ một cách trực quan, an toàn.
        </p>
      </div>

      {/* Share / Tags Footer */}
      <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Thẻ bài viết:</span>
          <span className="px-2.5 py-1 rounded-md text-xs bg-slate-800 text-slate-300">#AI</span>
          <span className="px-2.5 py-1 rounded-md text-xs bg-slate-800 text-slate-300">#TTS</span>
          <span className="px-2.5 py-1 rounded-md text-xs bg-slate-800 text-slate-300">#Cloudflare</span>
        </div>

        <button
          onClick={() => {
            if (navigator.share) {
              navigator.share({ title: document.title, url: window.location.href })
            } else {
              navigator.clipboard.writeText(window.location.href)
              alert('Đã sao chép liên kết bài viết!')
            }
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors"
        >
          <Share2 className="w-3.5 h-3.5 text-[#46C7F0]" />
          <span>Chia sẻ bài viết</span>
        </button>
      </div>
    </div>
  )
}
