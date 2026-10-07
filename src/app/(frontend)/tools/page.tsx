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
  ExternalLink,
  FolderTree,
  CheckCircle2,
  Settings
} from 'lucide-react'

interface ToolDirectoryItem {
  id: string
  name: string
  category: 'voice' | 'utility' | 'ai' | 'dev'
  description: string
  badge: 'Hot' | 'Mới' | 'Miễn phí' | 'Nội bộ'
  url: string
  icon: any
  accentColor: 'cyan' | 'coral'
}

const TOOLS_DIRECTORY: ToolDirectoryItem[] = [
  {
    id: 'omnivoice',
    name: 'OmniVoice AI Gateway (TTS & Voice Studio)',
    category: 'voice',
    description: 'Nền tảng xử lý giọng nói, chuyển văn bản thành giọng đọc (TTS) tiếng Việt và nhân bản giọng nói AI (Voice Cloning) vận hành trên Cloudflare Pages.',
    badge: 'Nội bộ',
    url: 'https://voice.oloka.net',
    icon: Volume2,
    accentColor: 'cyan',
  },
  {
    id: 'oloka-qr',
    name: 'Oloka QR Code Generator Studio',
    category: 'utility',
    description: 'Bộ công cụ tạo mã QR nhận diện 2 tone màu Oloka (#46C7F0 & #F47D59), hỗ trợ chèn logo trung tâm, tạo mã QR WiFi, vCard, URL độ nét cao.',
    badge: 'Mới',
    url: 'https://github.com/phucsd/oloka-qr-generator',
    icon: QrCode,
    accentColor: 'coral',
  },
  {
    id: 'vieneu',
    name: 'VietNeu Vietnamese Speech Lab',
    category: 'voice',
    description: 'Cổng mô hình tổng hợp tiếng nói nơ-ron tự nhiên dành riêng cho phương ngữ 3 miền Bắc - Trung - Nam với ngữ điệu truyền cảm.',
    badge: 'Hot',
    url: 'https://voice.oloka.net',
    icon: Mic,
    accentColor: 'cyan',
  },
  {
    id: 'gemini-studio',
    name: 'Google Gemini AI Studio',
    category: 'ai',
    description: 'Môi trường phát triển và thử nghiệm các mô hình AI đa phương thức (Multimodal) tiên tiến nhất hiện nay của Google.',
    badge: 'Miễn phí',
    url: 'https://aistudio.google.com',
    icon: Sparkles,
    accentColor: 'coral',
  },
  {
    id: 'prompt-optimizer',
    name: 'AI Prompt Engineering Studio',
    category: 'ai',
    description: 'Bộ khung gợi ý và cấu trúc hóa câu lệnh (System Prompt) chuẩn mực giúp tăng 300% chất lượng đầu ra của các mô hình LLM.',
    badge: 'Miễn phí',
    url: 'https://huggingface.co',
    icon: Wand2,
    accentColor: 'cyan',
  },
  {
    id: 'dev-formatter',
    name: 'Cloudflare Workers Developer Hub',
    category: 'dev',
    description: 'Tài liệu và công cụ triển khai serverless edge computing, D1 database và R2 storage trên mạng lưới Cloudflare toàn cầu.',
    badge: 'Miễn phí',
    url: 'https://developers.cloudflare.com/workers',
    icon: Cpu,
    accentColor: 'coral',
  },
]

export default function ToolsDirectoryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTools = TOOLS_DIRECTORY.filter((tool) => {
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#46C7F0]/10 text-[#46C7F0] border border-[#46C7F0]/20 mb-4">
          <FolderTree className="w-3.5 h-3.5" />
          <span>Danh bạ Liên kết Công cụ Tuyển chọn</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
          Kho Công cụ <span className="text-gradient">AI & Tiện ích</span>
        </h1>
        <p className="text-slate-400 text-base sm:text-lg">
          Tổng hợp liên kết trực tiếp tới các công cụ TTS, Giọng nói, Tạo mã QR và dịch vụ AI hữu ích nhất. Dễ dàng quản trị và bổ sung liên kết mới thông qua <strong>Payload CMS</strong>.
        </p>

        {/* Search Input */}
        <div className="mt-8 max-w-xl mx-auto relative">
          <Search className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm công cụ theo tên, chức năng (vd: voice, qr, tts...)"
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[#111827] border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-[#46C7F0] text-sm shadow-xl"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {[
          { id: 'all', label: 'Tất cả liên kết' },
          { id: 'voice', label: 'Voice & TTS Âm thanh' },
          { id: 'utility', label: 'QR Code & Tiện ích' },
          { id: 'ai', label: 'Trí tuệ nhân tạo (AI)' },
          { id: 'dev', label: 'Developer & Cloud' },
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

      {/* Grid of External Hyperlinked Tools */}
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
                        : tool.badge === 'Nội bộ'
                        ? 'bg-[#46C7F0]/15 text-[#46C7F0] border-[#46C7F0]/30'
                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
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

              {/* Direct Hyperlink Button */}
              <a
                href={tool.url}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white transition-all ${
                  isCyan
                    ? 'bg-gradient-to-r from-[#46C7F0] to-sky-600 hover:opacity-95 shadow-md shadow-[#46C7F0]/20'
                    : 'bg-gradient-to-r from-[#F47D59] to-orange-600 hover:opacity-95 shadow-md shadow-[#F47D59]/20'
                }`}
              >
                <span>Mở công cụ</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )
        })}
      </div>

      {/* Admin Notice */}
      <div className="mt-14 p-6 rounded-2xl bg-[#0A0E17] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-[#46C7F0]">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Quản trị danh bạ công cụ</h4>
            <p className="text-xs text-slate-400">
              Bạn có thể thêm, chỉnh sửa hoặc thay đổi hyperlink của các công cụ bất cứ lúc nào trong bộ sưu tập <strong>Tools</strong> tại Payload CMS.
            </p>
          </div>
        </div>

        <Link
          href="/admin"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors"
        >
          <span>Mở CMS Admin</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  )
}
