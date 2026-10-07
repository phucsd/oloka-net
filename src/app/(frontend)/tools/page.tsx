'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  Volume2, 
  Mic, 
  QrCode, 
  Sparkles, 
  Wand2, 
  FileCode, 
  Cpu, 
  Search, 
  ArrowUpRight,
  Filter
} from 'lucide-react'

interface ToolItem {
  id: string
  name: string
  category: 'voice' | 'utility' | 'ai' | 'dev'
  description: string
  badge: 'Hot' | 'Mới' | 'Miễn phí' | '2-Tone'
  route: string
  isExternal?: boolean
  icon: any
  accentColor: 'cyan' | 'coral'
}

const TOOLS_DATA: ToolItem[] = [
  {
    id: 'tts',
    name: 'TTS Studio (Text-to-Speech)',
    category: 'voice',
    description: 'Chuyển văn bản thành giọng nói tiếng Việt mượt mà, hỗ trợ đa giọng đọc vùng miền, điều chỉnh tốc độ & cao độ chuẩn xác.',
    badge: 'Hot',
    route: '/tools/tts',
    icon: Volume2,
    accentColor: 'cyan',
  },
  {
    id: 'voice',
    name: 'AI Voice Studio',
    category: 'voice',
    description: 'Bàn ghi âm phòng thu trực tuyến tích hợp đo biên độ micro, bộ lọc ấm tiếng và kết nối thẳng tới nền tảng OmniVoice Gateway.',
    badge: '2-Tone',
    route: '/tools/voice',
    icon: Mic,
    accentColor: 'coral',
  },
  {
    id: 'qr-code',
    name: 'QR Code Studio 2-Tone',
    category: 'utility',
    description: 'Bộ tạo mã QR thương hiệu Oloka với 2 tone màu #46C7F0 & #F47D59, hỗ trợ chèn logo trung tâm, tạo QR Wifi, vCard, URL siêu nét.',
    badge: 'Mới',
    route: '/tools/qr-code',
    icon: QrCode,
    accentColor: 'cyan',
  },
  {
    id: 'omnivoice',
    name: 'OmniVoice Cloud Gateway',
    category: 'voice',
    description: 'Hạ tầng tính toán âm thanh và nhân bản giọng nói AI (Voice Cloning) chạy trên Cloudflare Pages tại subdomain voice.oloka.net.',
    badge: 'Hot',
    route: 'https://voice.oloka.net',
    isExternal: true,
    icon: Cpu,
    accentColor: 'coral',
  },
  {
    id: 'prompt-optimizer',
    name: 'AI Prompt Optimizer',
    category: 'ai',
    description: 'Tối ưu hóa câu lệnh prompt cho các mô hình ngôn ngữ lớn (Gemini, Claude, GPT), giúp tạo câu trả lời sâu sắc và chuẩn xác hơn.',
    badge: 'Miễn phí',
    route: '/tools/tts',
    icon: Wand2,
    accentColor: 'cyan',
  },
  {
    id: 'dev-formatter',
    name: 'JSON & Code Formatter',
    category: 'dev',
    description: 'Tiện ích định dạng, kiểm tra cú pháp JSON, YAML và minified code cực nhanh ngay trên trình duyệt mà không gửi dữ liệu ra ngoài.',
    badge: 'Miễn phí',
    route: '/tools/qr-code',
    icon: FileCode,
    accentColor: 'coral',
  },
]

export default function ToolsDirectoryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTools = TOOLS_DATA.filter((tool) => {
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#46C7F0]/10 text-[#46C7F0] border border-[#46C7F0]/20 mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Oloka AI & Utility Portal</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
          Kho Công cụ <span className="text-gradient">Đa Năng</span>
        </h1>
        <p className="text-slate-400 text-base sm:text-lg">
          Trải nghiệm toàn bộ tiện ích trực tuyến: Chuyển văn bản thành giọng nói (TTS), Thu âm giọng nói, Tạo mã QR thương hiệu và công cụ hỗ trợ AI sáng tạo.
        </p>

        {/* Search Input */}
        <div className="mt-8 max-w-xl mx-auto relative">
          <Search className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm công cụ theo tên, chức năng (vd: tts, qr, voice...)"
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[#111827] border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-[#46C7F0] text-sm shadow-xl"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {[
          { id: 'all', label: 'Tất cả công cụ' },
          { id: 'voice', label: 'Voice & Âm thanh' },
          { id: 'utility', label: 'Tiện ích & QR' },
          { id: 'ai', label: 'Trí tuệ nhân tạo (AI)' },
          { id: 'dev', label: 'Lập trình viên' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedCategory(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              selectedCategory === tab.id
                ? 'bg-gradient-to-r from-[#46C7F0] to-[#F47D59] text-white shadow-md'
                : 'bg-[#111827] text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid of Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => {
          const Icon = tool.icon
          const isCyan = tool.accentColor === 'cyan'

          return (
            <div
              key={tool.id}
              className="group bg-[#111827] border border-slate-800 hover:border-slate-700 rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-[#46C7F0]/10 flex flex-col justify-between"
            >
              <div>
                {/* Header with Icon and Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
                      isCyan
                        ? 'bg-[#46C7F0]/10 border-[#46C7F0]/30 text-[#46C7F0]'
                        : 'bg-[#F47D59]/10 border-[#F47D59]/30 text-[#F47D59]'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border ${
                      tool.badge === 'Hot'
                        ? 'bg-red-500/10 text-red-400 border-red-500/30'
                        : tool.badge === '2-Tone'
                        ? 'bg-gradient-to-r from-[#46C7F0]/20 to-[#F47D59]/20 text-white border-[#46C7F0]/30'
                        : isCyan
                        ? 'bg-[#46C7F0]/10 text-[#46C7F0] border-[#46C7F0]/30'
                        : 'bg-[#F47D59]/10 text-[#F47D59] border-[#F47D59]/30'
                    }`}
                  >
                    {tool.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#46C7F0] transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                  {tool.description}
                </p>
              </div>

              {/* Action Button */}
              {tool.isExternal ? (
                <a
                  href={tool.route}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 hover:border-[#F47D59] transition-all"
                >
                  <span>Truy cập Cloud Gateway</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              ) : (
                <Link
                  href={tool.route}
                  className={`inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white transition-all ${
                    isCyan
                      ? 'bg-gradient-to-r from-[#46C7F0] to-sky-600 hover:opacity-90 shadow-md shadow-[#46C7F0]/20'
                      : 'bg-gradient-to-r from-[#F47D59] to-orange-600 hover:opacity-90 shadow-md shadow-[#F47D59]/20'
                  }`}
                >
                  <span>Khởi chạy công cụ</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
