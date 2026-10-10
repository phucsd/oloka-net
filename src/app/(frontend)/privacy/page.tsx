import React from 'react'
import type { Metadata } from 'next'
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Chính sách bảo mật dữ liệu | Oloka.net',
  description:
    'Chính sách bảo mật thông tin và quyền riêng tư người dùng tại Oloka.net. Cam kết tuân thủ Nghị định 13/2023/NĐ-CP và tiêu chuẩn bảo vệ dữ liệu toàn cầu.',
  alternates: {
    canonical: 'https://oloka.net/privacy',
  },
  openGraph: {
    title: 'Chính sách bảo mật dữ liệu | Oloka.net',
    description:
      'Chính sách bảo mật thông tin và quyền riêng tư người dùng tại Oloka.net. Cam kết tuân thủ Nghị định 13/2023/NĐ-CP và tiêu chuẩn bảo vệ dữ liệu toàn cầu.',
    url: 'https://oloka.net/privacy',
    type: 'website',
  },
}

export default function PrivacyPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Chính sách bảo mật - Oloka.net',
    url: 'https://oloka.net/privacy',
    description: 'Chính sách bảo mật và quyền riêng tư thông tin người dùng của Oloka.net',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-slate-50 py-12 lg:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Header */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Chính sách minh bạch & Bảo vệ dữ liệu</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Chính sách Bảo mật Quyền riêng tư
            </h1>
            <p className="text-sm text-slate-500">
              Cập nhật lần cuối: Tháng 10/2026 • Áp dụng cho toàn bộ người dùng truy cập Oloka.net
            </p>
          </div>

          {/* Nội dung chính sách */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-8 text-slate-700 leading-relaxed text-sm">
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Lock className="w-5 h-5 text-sky-600" />
                1. Cam kết Chung về Quyền Riêng Tư
              </h2>
              <p>
                <strong>Oloka.net</strong> cam kết tôn trọng tuyệt đối quyền riêng tư của mọi độc giả truy cập website. Chúng tôi tuân thủ các quy định hiện hành của pháp luật Việt Nam, bao gồm <strong>Luật An toàn thông tin mạng</strong>, <strong>Nghị định 13/2023/NĐ-CP</strong> về bảo vệ dữ liệu cá nhân, cũng như các tiêu chuẩn bảo mật dữ liệu quốc tế (GDPR).
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Eye className="w-5 h-5 text-orange-500" />
                2. Thông tin Chúng tôi Thu thập
              </h2>
              <p>
                Oloka.net là chuyên trang thông tin mở. Chúng tôi <strong>không yêu cầu đăng ký tài khoản</strong> để đọc tin tức và chỉ thu thập các dữ liệu kỹ thuật không định danh cá nhân:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Nhật ký kỹ thuật truy cập:</strong> Địa chỉ IP (được ẩn danh hóa một phần qua mạng lưới Cloudflare), loại trình duyệt, phiên bản hệ điều hành, thời gian truy cập và các trang được xem.
                </li>
                <li>
                  <strong>Dữ liệu cookie & phiên làm việc (Session Cookies):</strong> Lưu trữ tùy chọn giao diện cá nhân (chế độ sáng/tối, kích thước văn bản, chuyên mục quan tâm).
                </li>
                <li>
                  <strong>Dữ liệu liên hệ:</strong> Địa chỉ email và họ tên bạn chủ động cung cấp khi gửi biểu mẫu liên hệ hoặc góp ý bài viết.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-600" />
                3. Mục đích Sử dụng Thông tin
              </h2>
              <p>Dữ liệu kỹ thuật thu thập được chỉ nhằm mục đích:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Duy trì và tối ưu hóa hiệu năng tải trang thông qua Cloudflare Edge Network.</li>
                <li>Phân tích xu hướng độc giả để cải thiện chất lượng nội dung công nghệ & AI.</li>
                <li>Phát hiện và ngăn chặn các hành vi tấn công mạng độc hại (DDoS, Scraping trái phép).</li>
                <li>Tuyệt đối <strong>không bán, không trao đổi hoặc chia sẻ</strong> thông tin người dùng cho bất kỳ bên thứ ba nào vì mục đích thương mại.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-purple-600" />
                4. Quyền của Độc giả đối với Dữ liệu
              </h2>
              <p>Theo quy định bảo vệ dữ liệu cá nhân, bạn có toàn quyền:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Vô hiệu hóa việc lưu trữ Cookie bất kỳ lúc nào thông qua cài đặt của trình duyệt web.</li>
                <li>Yêu cầu xóa bỏ thông tin liên hệ bạn đã gửi qua form liên hệ của chúng tôi bằng cách gửi email về: <code className="text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded font-mono">contact@oloka.net</code>.</li>
              </ul>
            </section>

            <section className="space-y-3 border-t border-slate-100 pt-6">
              <h2 className="text-lg font-bold text-slate-900">5. Bảo mật Cơ sở Hạ tầng</h2>
              <p>
                Toàn bộ dữ liệu truyền tải giữa máy tính của bạn và Oloka.net được bảo vệ bởi chứng chỉ mã hóa hiện đại <strong>TLS/SSL 256-bit</strong> qua nền tảng Cloudflare, ngăn chặn hoàn toàn nguy cơ bị nghe lén hoặc giả mạo gói tin.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
