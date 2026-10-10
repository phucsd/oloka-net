'use client'

import React, { useState } from 'react'
import { Mail, MapPin, Send, CheckCircle2, MessageSquare, Clock, Globe, Code2 } from 'lucide-react'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'gopy', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 lg:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-800 border border-sky-200">
            <Mail className="w-3.5 h-3.5 text-sky-600" />
            <span>Kênh kết nối & Đóng góp ý kiến</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Liên hệ với Ban Biên tập <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-orange-500">Oloka.net</span>
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Chúng tôi luôn lắng nghe ý kiến phản hồi, các đề xuất hợp tác công nghệ, thông cáo báo chí hoặc đóng góp đính chính nội dung từ bạn đọc.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Thông tin liên hệ nhanh */}
          <div className="md:col-span-1 space-y-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
              <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600 inline-block border border-sky-100">
                <Mail className="w-5 h-5" />
              </div>
              <h2 className="font-bold text-slate-900 text-sm">Hòm thư Điện tử</h2>
              <div className="space-y-1.5 text-xs text-slate-600">
                <p>Biên tập: <a href="mailto:editorial@oloka.net" className="text-sky-600 font-medium hover:underline">editorial@oloka.net</a></p>
                <p>Hợp tác: <a href="mailto:contact@oloka.net" className="text-orange-600 font-medium hover:underline">contact@oloka.net</a></p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 inline-block border border-emerald-100">
                <MapPin className="w-5 h-5" />
              </div>
              <h2 className="font-bold text-slate-900 text-sm">Trụ sở & Địa chỉ</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Hà Nội, Việt Nam <br />
                <span className="text-slate-400 font-mono text-[11px]">Tọa độ: 21.0285° N, 105.8542° E</span>
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
              <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 inline-block border border-purple-100">
                <Clock className="w-5 h-5" />
              </div>
              <h2 className="font-bold text-slate-900 text-sm">Thời gian Phản hồi</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Các email thắc mắc hoặc yêu cầu đính chính bản quyền được xử lý trong vòng <strong>12 – 24 giờ</strong> làm việc.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 text-white text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-slate-300" />
                <span>GitHub Repository</span>
              </div>
              <a
                href="https://github.com/phucsd/oloka-net"
                target="_blank"
                rel="noreferrer"
                className="text-sky-400 hover:text-sky-300 font-medium underline"
              >
                phucsd/oloka-net
              </a>
            </div>
          </div>

          {/* Form gửi liên hệ */}
          <div className="md:col-span-2">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Đã gửi tin nhắn thành công!</h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Cảm ơn bạn đã liên hệ với Oloka.net. Ban biên tập đã nhận được nội dung và sẽ phản hồi qua email <span className="font-semibold text-slate-900">{formData.email}</span> trong thời gian sớm nhất.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false)
                      setFormData({ name: '', email: '', subject: 'gopy', message: '' })
                    }}
                    className="mt-4 px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors"
                  >
                    Gửi tin nhắn khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Họ và tên <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Nguyễn Văn A"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Địa chỉ Email <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="youremail@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Chủ đề liên hệ
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all bg-white"
                    >
                      <option value="gopy">Góp ý nội dung / Đính chính thông tin bài viết</option>
                      <option value="hop-tac">Đề xuất hợp tác công nghệ & tài trợ</option>
                      <option value="dmca">Yêu cầu quyền tác giả & Bản quyền (DMCA)</option>
                      <option value="khac">Khác</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Nội dung tin nhắn <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Chi tiết câu hỏi, bài viết cần phản ánh hoặc nội dung bạn muốn gửi..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-500 hover:to-sky-600 text-white font-semibold text-sm shadow-sm transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Gửi tin nhắn đến Ban Biên tập</span>
                  </button>

                  <p className="text-[11px] text-slate-400 text-center">
                    Thông tin của bạn được bảo mật tuyệt đối theo <a href="/privacy" className="text-sky-600 hover:underline">Chính sách quyền riêng tư</a> của Oloka.net.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
