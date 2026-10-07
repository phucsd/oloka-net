'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { 
  Volume2, 
  Play, 
  Pause, 
  RotateCcw, 
  Download, 
  Sparkles, 
  Sliders, 
  Mic, 
  Globe2, 
  Copy, 
  Check, 
  ExternalLink,
  ArrowLeft
} from 'lucide-react'

export default function TTSStudio() {
  const [text, setText] = useState(
    'Chào mừng bạn đến với Oloka.net! Nền tảng tổng hợp tin tức công nghệ AI nóng hổi và danh bạ liên kết các công cụ thông minh.'
  )
  const [rate, setRate] = useState(1.0)
  const [pitch, setPitch] = useState(1.0)
  const [volume, setVolume] = useState(1.0)
  
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([])
  const [selectedVoiceIndex, setSelectedVoiceIndex] = useState<number>(0)
  
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [copied, setCopied] = useState(false)

  const synthRef = useRef<SpeechSynthesis | null>(null)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  // Initialize Speech Synthesis
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis

      const updateVoices = () => {
        const voices = synthRef.current?.getVoices() || []
        setAvailableVoices(voices)

        const viIndex = voices.findIndex((v) => v.lang.startsWith('vi'))
        if (viIndex !== -1) {
          setSelectedVoiceIndex(viIndex)
        } else if (voices.length > 0) {
          setSelectedVoiceIndex(0)
        }
      }

      updateVoices()
      if (synthRef.current.onvoiceschanged !== undefined) {
        synthRef.current.onvoiceschanged = updateVoices
      }
    }
  }, [])

  // Handle Play/Stop Speech
  const handlePlay = () => {
    if (!synthRef.current) {
      alert('Trình duyệt của bạn không hỗ trợ Web Speech API.')
      return
    }

    if (isPaused) {
      synthRef.current.resume()
      setIsPaused(false)
      setIsPlaying(true)
      return
    }

    synthRef.current.cancel()

    if (!text.trim()) return

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = rate
    utterance.pitch = pitch
    utterance.volume = volume

    if (availableVoices[selectedVoiceIndex]) {
      utterance.voice = availableVoices[selectedVoiceIndex]
    }

    utterance.onend = () => {
      setIsPlaying(false)
      setIsPaused(false)
    }

    utterance.onerror = (e) => {
      console.error('Speech error', e)
      setIsPlaying(false)
      setIsPaused(false)
    }

    utteranceRef.current = utterance
    synthRef.current.speak(utterance)
    setIsPlaying(true)
    setIsPaused(false)
  }

  const handlePause = () => {
    if (synthRef.current && isPlaying) {
      synthRef.current.pause()
      setIsPaused(true)
      setIsPlaying(false)
    }
  }

  const handleStop = () => {
    if (synthRef.current) {
      synthRef.current.cancel()
      setIsPlaying(false)
      setIsPaused(false)
    }
  }

  const handleReset = () => {
    setRate(1.0)
    setPitch(1.0)
    setVolume(1.0)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Back button */}
      <Link
        href="/tools"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#0284c7] transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Quay lại Kho Công cụ</span>
      </Link>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-[#0284c7] border border-sky-200 mb-4 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Oloka Text-to-Speech Studio</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
          TTS Studio <span className="text-gradient">Giọng Đọc AI</span>
        </h1>
        <p className="text-slate-600 text-base sm:text-lg">
          Thử nghiệm chuyển văn bản thành giọng nói trực tiếp trên trình duyệt, kết hợp liên kết trực tiếp tới <strong>OmniVoice Gateway</strong> tại <strong className="text-[#0284c7]">voice.oloka.net</strong>.
        </p>
      </div>

      {/* OmniVoice Callout Banner */}
      <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-sky-50 via-white to-orange-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-sky-100 border border-sky-200 text-[#0284c7] flex items-center justify-center flex-shrink-0">
            <Volume2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-base font-bold text-slate-900">OmniVoice AI Gateway Chuyên Nghiệp</h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                RECOMMENDED
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Để sử dụng các mô hình nơ-ron sâu tiếng Việt 3 miền Bắc - Trung - Nam đạt chuẩn studio, hãy truy cập trực tiếp cổng OmniVoice.
            </p>
          </div>
        </div>

        <a
          href="https://voice.oloka.net"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0284c7] hover:bg-sky-600 shadow-xs transition-colors flex-shrink-0"
        >
          <span>Mở voice.oloka.net</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Main Studio Console - Light Theme */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Text Input & Controls */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Văn bản cần đọc
              </label>
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span>{text.length} ký tự</span>
                <button
                  onClick={handleCopy}
                  className="hover:text-slate-900 flex items-center gap-1 font-semibold"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Đã chép' : 'Sao chép'}</span>
                </button>
              </div>
            </div>

            <textarea
              rows={6}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Nhập nội dung cần chuyển thành giọng đọc..."
              className="w-full p-4 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0284c7] text-sm leading-relaxed"
            />
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-3">
              {!isPlaying ? (
                <button
                  type="button"
                  onClick={handlePlay}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#46C7F0] to-[#F47D59] hover:opacity-90 shadow-sm transition-all cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>{isPaused ? 'Tiếp tục đọc' : 'Phát âm thanh'}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handlePause}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-amber-500 hover:bg-amber-600 shadow-sm transition-all cursor-pointer"
                >
                  <Pause className="w-4 h-4 fill-white" />
                  <span>Tạm dừng</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleStop}
                disabled={!isPlaying && !isPaused}
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <span>Dừng lại</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 font-semibold transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Đặt lại thông số</span>
            </button>
          </div>
        </div>

        {/* Right: Sound Controls Sidebar */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-sm">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#0284c7]" />
              <span>Tùy chỉnh thông số âm</span>
            </h3>

            {/* Voice Selector */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Giọng đọc hệ thống:
              </label>
              <select
                value={selectedVoiceIndex}
                onChange={(e) => setSelectedVoiceIndex(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg bg-slate-50 border border-slate-300 text-slate-800 text-xs focus:outline-none focus:border-[#0284c7]"
              >
                {availableVoices.length > 0 ? (
                  availableVoices.map((voice, idx) => (
                    <option key={idx} value={idx}>
                      {voice.name} ({voice.lang})
                    </option>
                  ))
                ) : (
                  <option value={0}>Giọng đọc mặc định</option>
                )}
              </select>
            </div>

            {/* Sliders */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Tốc độ đọc (Speed)</span>
                  <span className="font-mono text-[#0284c7]">{rate}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(parseFloat(e.target.value))}
                  className="w-full accent-[#0284c7] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Cao độ (Pitch)</span>
                  <span className="font-mono text-[#ea580c]">{pitch}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="1.5"
                  step="0.1"
                  value={pitch}
                  onChange={(e) => setPitch(parseFloat(e.target.value))}
                  className="w-full accent-[#ea580c] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Âm lượng (Volume)</span>
                  <span className="font-mono text-slate-800">{Math.round(volume * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="1.0"
                  step="0.05"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-full accent-slate-800 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
