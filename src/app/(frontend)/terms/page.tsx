import React from 'react'
import type { Metadata } from 'next'
import { FileCheck, ShieldAlert, Award, ExternalLink, Scale } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Điều khoản sử dụng & Bản quyền | Oloka.net',
  description:
    'Điều khoản sử dụng, chính sách bản quyền sở hữu trí tuệ và tuyên bố miễn trừ trách nhiệm nội dung tại Oloka.net.',
  alternates: {
    canonical: 'https://oloka.net/terms',
  },
  openGraph: {
    title: 'Điều khoản sử dụng & Bản quyền | Oloka.net',
    description:
      'Điều khoản sử dụng, chính sách bản quyền sở hữu trí tuệ và tuyên bố miễn trừ trách nhiệm nội dung tại Oloka.net.',
    url: 'https://oloka.net/terms',
    type: 'website',
  },
}

export default function TermsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Điều khoản sử dụng - Oloka.net',
    url: 'https://oloka.net/terms',
    description: 'Quy định điều khoản dịch vụ và bản quyền nội dung trên Oloka.net',
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
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-800 border border-sky-200">
              <Scale className="w-3.5 h-3.5 text-sky-600" />
              <span>Quy định pháp lý & Bản quyền</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Điều khoản Sử dụng & Bản quyền Nội dung
            </h1>
            <p className="text-sm text-slate-500">
              Cập nhật có hiệu lực từ: Tháng 10/2026 • Ban hành bởi Ban Quản trị Oloka.net
            </p>
          </div>

          {/* Nội dung */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-8 text-slate-700 leading-relaxed text-sm">
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-sky-600" />
                1. Chấp nhận Điều khoản
              </h2>
              <p>
                Bằng việc truy cập, tra cứu thông tin hoặc sử dụng các công cụ tiện ích trên website <strong>Oloka.net</strong>, bạn đồng ý tuân thủ các điều khoản và điều kiện được nêu tại đây. Nếu không đồng ý với bất kỳ phần nào, vui lòng ngừng sử dụng dịch vụ.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-orange-500" />
                2. Quyền Sở hữu Trí tuệ & Giấy phép Chia sẻ
              </h2>
              <p>
                Tất cả bài viết, đồ họa, thiết kế giao diện và mã nguồn độc quyền trên Oloka.net đều thuộc quyền sở hữu của Oloka.net hoặc các tác giả được cấp phép trích dẫn.
              </p>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="font-semibold text-slate-900 text-sm">Giấy phép Creative Commons (CC BY-NC-SA 4.0):</div>
                <p className="text-xs text-slate-600">
                  Bạn được tự do chia sẻ, sao chép hoặc trích dẫn các bài phân tích kỹ thuật của chúng tôi với điều kiện:
                </p>
                <ul className="list-disc pl-5 text-xs text-slate-600 space-y-1">
                  <li><strong>Ghi rõ nguồn tác giả:</strong> Đặt liên kết (hyperlink) trỏ về bài viết gốc trên Oloka.net.</li>
                  <li><strong>Phi thương mại:</strong> Không sử dụng nội dung cho mục đích bán lại hoặc thu phí.</li>
                  <li><strong>Chia sẻ tương tự:</strong> Nếu phái sinh hoặc phát triển thêm, phải áp dụng giấy phép mở tương đương.</li>
                </ul>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-500" />
                3. Tuyên bố Miễn trừ Trách nhiệm (Disclaimer)
              </h2>
              <p>
                Thông tin trên Oloka.net được biên soạn nhằm mục đích <strong>cung cấp kiến thức công nghệ tham khảo</strong>. Mặc dù chúng tôi nỗ lực tối đa để đảm bảo tính chuẩn xác:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Công nghệ AI và phần mềm thay đổi liên tục; chúng tôi không đảm bảo tính hoàn hảo tuyệt đối của mọi dòng mã hoặc hướng dẫn tại thời điểm bạn áp dụng.</li>
                <li>Oloka.net không chịu trách nhiệm pháp lý đối với bất kỳ thiệt hại trực tiếp hay gián tiếp nào phát sinh từ việc sử dụng các công cụ hoặc thông tin được cung cấp trên website.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <ExternalLink className="w-5 h-5 text-purple-600" />
                4. Liên kết đến Bên thứ Ba (External Tools)
              </h2>
              <p>
                Kho danh bạ công cụ (`/tools`) có thể chứa liên kết đến các nền tảng trí tuệ nhân tạo bên ngoài (như OpenAI, Google, Hugging Face, GitHub). Oloka.net không kiểm soát và không chịu trách nhiệm về chính sách quyền riêng tư hay nội dung của các trang web bên thứ ba đó.
              </p>
            </section>

            <section className="space-y-3 border-t border-slate-100 pt-6">
              <h2 className="text-lg font-bold text-slate-900">5. Cơ chế Xử lý Vi phạm Bản quyền (DMCA Compliance)</h2>
              <p>
                Oloka.net tôn trọng quyền sở hữu trí tuệ của tác giả khác. Nếu bạn tin rằng bất kỳ nội dung nào trên trang vi phạm bản quyền của bạn, vui lòng gửi thông báo kèm bằng chứng sở hữu về email <code className="text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded font-mono">editorial@oloka.net</code> để chúng tôi thẩm tra và xử lý gỡ bỏ trong vòng 24 giờ làm việc.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
