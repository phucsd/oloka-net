'use client'

import React, { useState } from 'react'
import { Share2, Check } from 'lucide-react'

export function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false)

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      if (navigator.share) {
        navigator.share({ title, url: window.location.href }).catch(() => {})
      } else {
        navigator.clipboard.writeText(window.location.href)
        setCopied(true)
        setTimeout(() => setCopied(false), 2500)
      }
    }
  }

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer"
      aria-label="Chia sẻ bài viết"
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
  )
}
