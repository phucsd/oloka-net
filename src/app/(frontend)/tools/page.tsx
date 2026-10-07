'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  Volume2, 
  Mic, 
  QrCode, 
  Sparkles, 
  Wand2, 
  Code, 
  Cpu, 
  Search, 
  ExternalLink,
  FolderTree,
  Settings,
  Globe
} from 'lucide-react'

interface ToolDirectoryItem {
  id: string
  name: string
  category: 'voice' | 'utility' | 'ai' | 'dev'
  categoryLabel: string
  description: string
  badge: 'Hot' | 'Mới' | 'Miễn phí' | 'Nội bộ'
  url: string
  icon: any
  accentColor: 'cyan' | 'coral' | 'purple'
}

const TOOLS_DIRECTORY: ToolDirectoryItem[] = [
  {
    id: 'omnivoice',
    name: 'OmniVoice AI Gateway (TTS Studio)',
    category: 'voice',
    categoryLabel: 'Voice & TTS Âm thanh',
    description: 'Nền tảng chuyển văn bản thành giọng đọc (TTS) tiếng Việt và AI Voice Studio tự nhiên vận hành tốc độ cao trên Cloudflare Edge.',
    badge: 'Nội bộ',
    url: 'https://voice.oloka.net',
    icon: Volume2,
    accentColor: 'cyan',
  },
  {
    id: 'oloka-qr',
    name: 'Oloka QR Code Generator Studio',
    category: 'utility',
    categoryLabel: 'QR Code & Tiện ích',
    description: 'Bộ công cụ tạo mã QR thương hiệu 2 tone màu Oloka (#46C7F0 & #F47D59), chèn logo tâm điểm và xuất file vector SVG chuẩn in ấn.',
    badge: 'Mới',
    url: 'https://github.com/phucsd/oloka-qr-generator',
    icon: QrCode,
    accentColor: 'coral',
  },
  {
    id: 'vieneu',
    name: 'VietNeu Vietnamese Speech Lab',
    category: 'voice',
    categoryLabel: 'Voice & TTS Âm thanh',
    description: 'Mô hình tổng hợp tiếng nói nơ-ron tự nhiên dành riêng cho phương ngữ 3 miền Bắc - Trung - Nam với ngữ điệu truyền cảm.',
    badge: 'Hot',
    url: 'https://voice.oloka.net',
    icon: Mic,
    accentColor: 'cyan',
  },
  {
    id: 'gemini-studio',
    name: 'Google Gemini AI Studio',
    category: 'ai',
    categoryLabel: 'Trí tuệ nhân tạo (AI)',
    description: 'Môi trường phát triển và kiểm thử prompt đa phương thức với các mô hình Gemini Flash & Pro từ Google DeepMind.',
    badge: 'Miễn phí',
    url: 'https://aistudio.google.com',
    icon: Sparkles,
    accentColor: 'purple',
  },
  {
    id: 'cursor-editor',
    name: 'Cursor AI Code Editor',
    category: 'dev',
    categoryLabel: 'Lập trình & Cloud',
    description: 'Trình biên tập mã nguồn tích hợp trợ lý AI thông minh thế hệ mới dựa trên VS Code, hiểu sâu toàn bộ ngữ cảnh dự án.',
    badge: 'Hot',
    url: 'https://cursor.com',
    icon: Code,
    accentColor: 'cyan',
  },
  {
    id: 'cloudflare-workers',
    name: 'Cloudflare Workers Developer Hub',
    category: 'dev',
    categoryLabel: 'Lập trình & Cloud',
    description: 'Tài liệu và công cụ triển khai serverless edge computing, D1 database và R2 storage trên mạng lưới Cloudflare toàn cầu.',
    badge: 'Miễn phí',
    url: 'https://developers.cloudflare.com/workers',
    icon: Cpu,
    accentColor: 'coral',
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs Voice Engine',
    category: 'voice',
    categoryLabel: 'Voice & TTS Âm thanh',
    description: 'Nền tảng nhân bản giọng nói AI đa ngôn ngữ với độ chân thực cảm xúc và tính năng lồng tiếng tự động hàng đầu thế giới.',
    badge: 'Miễn phí',
    url: 'https://elevenlabs.io',
    icon: Mic,
    accentColor: 'cyan',
  },
  {
    id: 'perplexity',
    name: 'Perplexity AI Search',
    category: 'ai',
    categoryLabel: 'Trí tuệ nhân tạo (AI)',
    description: 'Công cụ tìm kiếm hội thoại thông minh trích dẫn nguồn thời gian thực và tổng hợp thông tin học thuật không quảng cáo.',
    badge: 'Miễn phí',
    url: 'https://perplexity.ai',
    icon: Globe,
    accentColor: 'purple',
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
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-[#0284c7] border border-sky-200 mb-4 shadow-2xs">
          <FolderTree className="w-3.5 h-3.5" />
          <span>Danh bạ Liên kết Công cụ Tuyển chọn</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
          Kho Công cụ <span className="text-gradient">AI & Tiện ích</span>
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          Tổng hợp liên kết trực tiếp tới các công cụ TTS, Giọng nói, Tạo mã QR và dịch vụ AI hữu ích nhất. Dễ dàng quản trị và bổ sung liên kết mới thông qua <strong>Payload CMS</strong>.
        </p>

        {/* Search Input */}
        <div className="mt-8 max-w-xl mx-auto relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm công cụ theo tên, chức năng (vd: voice, qr, tts...)"
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0284c7] text-sm shadow-xs"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10 pb-2">
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
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              selectedCategory === tab.id
                ? 'bg-gradient-to-r from-[#46C7F0] to-[#F47D59] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid of External Hyperlinked Tools - Clean White Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => {
          const Icon = tool.icon

          return (
            <div
              key={tool.id}
              className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-6 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between"
            >
              <div>
                {/* Header with Icon and Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
                      tool.accentColor === 'cyan'
                        ? 'bg-sky-50 border-sky-200 text-[#0284c7]'
                        : tool.accentColor === 'coral'
                        ? 'bg-orange-50 border-orange-200 text-[#ea580c]'
                        : 'bg-purple-50 border-purple-200 text-purple-600'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border ${
                      tool.badge === 'Hot'
                        ? 'bg-red-50 text-red-700 border-red-200'
                        : tool.badge === 'Nội bộ'
                        ? 'bg-sky-50 text-sky-700 border-sky-200'
                        : tool.badge === 'Mới'
                        ? 'bg-orange-50 text-orange-700 border-orange-200'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}
                  >
                    {tool.badge}
                  </span>
                </div>

                <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                  {tool.categoryLabel}
                </span>

                <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">
                  {tool.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {tool.description}
                </p>
              </div>

              {/* Direct External Hyperlink Button */}
              <a
                href={tool.url}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white transition-all shadow-xs cursor-pointer ${
                  tool.accentColor === 'cyan'
                    ? 'bg-[#0284c7] hover:bg-sky-600'
                    : tool.accentColor === 'coral'
                    ? 'bg-[#ea580c] hover:bg-orange-600'
                    : 'bg-purple-600 hover:bg-purple-700'
                }`}
              >
                <span>Mở công cụ trực tiếp</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )
        })}
      </div>

      {/* Admin Notice - Light Card */}
      <div className="mt-14 p-6 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-100 border border-sky-200 flex items-center justify-center text-[#0284c7]">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">Quản trị danh bạ công cụ</h4>
            <p className="text-xs text-slate-500">
              Bạn có thể bổ sung, sửa đổi hoặc thêm hyperlink dẫn tới các công cụ mới bất cứ lúc nào trong bộ sưu tập <strong>Tools</strong> tại Payload CMS.
            </p>
          </div>
        </div>

        <Link
          href="/admin"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors"
        >
          <span>Mở CMS Admin (/admin)</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  )
}
