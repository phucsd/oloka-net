import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Sparkles, ShieldCheck, Users, Target, CheckCircle2, Cpu, Globe, Award, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Về chúng tôi | Giới thiệu & Sứ mệnh Ban biên tập Oloka.net',
  description:
    'Oloka.net – Chuyên trang thông tin, phân tích công nghệ và xu hướng Trí tuệ nhân tạo (AI). Khám phá sứ mệnh, tiêu chuẩn kiểm chứng thông tin và đội ngũ phát triển.',
  alternates: {
    canonical: 'https://oloka.net/about',
  },
  openGraph: {
    title: 'Về chúng tôi | Ban biên tập Oloka.net',
    description:
      'Chuyên trang thông tin, phân tích công nghệ và xu hướng Trí tuệ nhân tạo (AI). Khám phá sứ mệnh, tiêu chuẩn kiểm chứng thông tin và đội ngũ phát triển.',
    url: 'https://oloka.net/about',
    type: 'website',
  },
}

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'Về chúng tôi - Oloka.net',
    description: 'Chuyên trang Thông tin & Nghiên cứu Trí tuệ Nhân tạo Oloka.net',
    url: 'https://oloka.net/about',
    publisher: {
      '@type': 'NewsMediaOrganization',
      name: 'Oloka.net',
      url: 'https://oloka.net',
      logo: 'https://oloka.net/oloka-logo.svg',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-slate-50 py-12 lg:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-800 border border-sky-200">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>Giới thiệu & Minh bạch biên tập</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Về chúng tôi — <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-orange-500">Oloka.net</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Cổng thông tin độc lập chuyên sâu về Trí tuệ Nhân tạo (AI), cập nhật xu hướng công nghệ tương lai và kết nối kho tiện ích số hữu ích cho cộng đồng.
            </p>
          </div>

          {/* Sứ mệnh & Tầm nhìn */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600 border border-sky-100">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Sứ mệnh của Oloka.net</h2>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Trong kỷ nguyên bùng nổ của AI và các mô hình ngôn ngữ lớn (LLM), người dùng và doanh nghiệp thường xuyên đối mặt với biển thông tin đa chiều, phân mảnh và nhiều thuật ngữ phức tạp. Sứ mệnh của <strong>Oloka.net</strong> là:
            </p>
            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm">Chắt lọc & Phân tích chuyên sâu</h3>
                  <p className="text-xs text-slate-600 mt-1">Cung cấp các bài viết được thẩm định kỹ thuật, giải thích trực quan các đột phá công nghệ mới nhất.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm">Cầu nối ứng dụng thực tiễn</h3>
                  <p className="text-xs text-slate-600 mt-1">Tuyển chọn và xây dựng các công cụ AI thực chiến (Voice, TTS, QR Code Studio, GenAI).</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tiêu chuẩn Kiểm chứng thông tin (Fact-Checking & E-E-A-T) */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Quy trình Kiểm chứng Thông tin (Fact-Checking)</h2>
            </div>
            <div className="space-y-4 text-slate-700 leading-relaxed text-sm">
              <p>
                Mọi bài viết xuất bản trên Oloka.net đều tuân thủ nghiêm ngặt 3 nguyên tắc kiểm duyệt:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Xác thực nguồn tin gốc:</strong> Ưu tiên trích dẫn trực tiếp từ thông cáo của các viện nghiên cứu, trường đại học (MIT, Stanford), các phòng lab công nghệ (OpenAI, Google DeepMind, Anthropic, Meta AI) và báo cáo khoa học (arXiv, Nature).
                </li>
                <li>
                  <strong>Kiểm tra chéo độc lập:</strong> Các thông tin về benchmark, tính năng sản phẩm hoặc dữ liệu tài chính công nghệ đều được đối chiếu với ít nhất 2 nguồn độc lập trước khi đăng tải.
                </li>
                <li>
                  <strong>Chính sách đính chính minh bạch:</strong> Nếu có bất kỳ sai sót khách quan nào, ban biên tập cam kết cập nhật ghi chú đính chính rõ ràng ngay đầu bài viết kèm ngày giờ sửa đổi.
                </li>
              </ul>
            </div>
          </div>

          {/* Tuyên bố Minh bạch AI (AI Transparency Statement) */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
                <Cpu className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Tuyên bố Minh bạch về Trí tuệ Nhân tạo (AI Policy)</h2>
            </div>
            <p className="text-slate-700 leading-relaxed text-sm">
              Tại Oloka.net, chúng tôi ứng dụng các mô hình AI tiên tiến trong việc hỗ trợ tổng hợp, dịch thuật sơ bộ và gợi ý cấu trúc bài viết. Tuy nhiên, <strong>con người luôn là người chịu trách nhiệm cuối cùng</strong>: mỗi bài viết đều phải trải qua khâu đọc soát, biên tập văn phong, kiểm tra logic ngữ nghĩa và phê duyệt của biên tập viên trước khi được phân phối đến bạn đọc.
            </p>
          </div>

          {/* Đội ngũ & Tác giả */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-orange-50 text-orange-600 border border-orange-100">
                <Users className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Đội ngũ & Ban Biên tập</h2>
            </div>
            <p className="text-slate-700 text-sm leading-relaxed">
              Oloka.net được sáng lập và vận hành bởi nhóm kỹ sư phần mềm, nhà nghiên cứu trí tuệ nhân tạo và chuyên viên nội dung công nghệ đam mê chia sẻ tri thức mở:
            </p>
            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                <div className="font-bold text-slate-900">Ban Biên tập Công nghệ AI</div>
                <div className="text-xs text-sky-600 font-medium mt-0.5">Phụ trách nội dung & Phân tích kỹ thuật</div>
                <p className="text-xs text-slate-600 mt-2">Theo dõi sát sao các đột phá về Generative AI, Large Multimodal Models (LMMs), Computer Vision và Robotics.</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                <div className="font-bold text-slate-900">Nhóm Kỹ thuật & Hạ tầng Số</div>
                <div className="text-xs text-orange-600 font-medium mt-0.5">Phát triển Nền tảng & Công cụ Tools</div>
                <p className="text-xs text-slate-600 mt-2">Vận hành hạ tầng máy chủ phân tán toàn cầu, tối ưu tốc độ đọc báo dưới 100ms trên mạng lưới Cloudflare Edge.</p>
              </div>
            </div>
          </div>

          {/* Footer Callout */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-sky-500/10 via-orange-500/10 to-purple-500/10 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-slate-900">Bạn muốn liên hệ hoặc đóng góp bài viết?</h3>
              <p className="text-xs text-slate-600 mt-1">Chúng tôi luôn hoan nghênh các phản hồi, bài viết chuyên sâu và đề xuất hợp tác.</p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition-colors shrink-0 shadow-sm"
            >
              <Mail className="w-4 h-4" />
              <span>Gửi liên hệ ngay</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
