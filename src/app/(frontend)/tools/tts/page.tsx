'use client'

import React, { useState, useEffect, useRef } from 'react'
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
  AudioWaveform as Waveform,
  Radio
} from 'lucide-react'

interface VoiceOption {
  name: string
  lang: string
  gender: string
  tag: string
  systemVoice?: SpeechSynthesisVoice
}

export default function TTSStudio() {
  const [text, setText] = useState(
    'Chào mừng bạn đến với Oloka.net! Nền tảng tổng hợp các công cụ AI, Text to Speech, Voice Studio và cập nhật tin tức công nghệ mới nhất.'
  )
  const [rate, setRate] = useState(1.0)
  const [pitch, setPitch] = useState(1.0)
  const [volume, setVolume] = useState(1.0)
  
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([])
  const [selectedVoiceIndex, setSelectedVoiceIndex] = useState<number>(0)
  
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [engineMode, setEngineMode] = useState<'browser' | 'gateway'>('browser')
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

        // Try to pick Vietnamese voice first, or default
        const viIndex = voices.findIndex((v) => v.lang.startsWith('vi'))
        if (viIndex !== -1) {
          setSelectedVoiceIndex(viIndex)
        } else if (voices.length > 0) {
          setSelectedVoiceIndex(0)
        }
      }

      updateVoices()
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = updateVoices
      }
    }
  }, [])

  const handlePlay = () => {
    if (!synthRef.current || !text.trim()) return

    if (isPaused) {
      synthRef.current.resume()
      setIsPaused(false)
      setIsPlaying(true)
      return
    }

    synthRef.current.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    if (availableVoices[selectedVoiceIndex]) {
      utterance.voice = availableVoices[selectedVoiceIndex]
    }
    utterance.rate = rate
    utterance.pitch = pitch
    utterance.volume = volume

    utterance.onstart = () => {
      setIsPlaying(true)
      setIsPaused(false)
    }

    utterance.onend = () => {
      setIsPlaying(false)
      setIsPaused(false)
    }

    utterance.onerror = () => {
      setIsPlaying(false)
      setIsPaused(false)
    }

    utteranceRef.current = utterance
    synthRef.current.speak(utterance)
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

  const handlePreset = (presetText: string) => {
    handleStop()
    setText(presetText)
  }

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#46C7F0]/10 text-[#46C7F0] border border-[#46C7F0]/20 mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Oloka AI Text-to-Speech Engine</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
          TTS Studio <span className="text-gradient">Chuyển Giọng Nói</span>
        </h1>
        <p className="text-slate-400 text-base sm:text-lg">
          Trình đọc văn bản tự động tốc độ cao, hỗ trợ đa giọng điệu tiếng Việt và quốc tế, tinh chỉnh cao độ & nhịp điệu mượt mà.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Editor */}
        <div className="lg:col-span-8 bg-[#111827] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          {/* Quick Presets */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Mẫu nội dung đọc nhanh:
              </label>
              <span className="text-xs text-slate-500">{text.length} ký tự</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() =>
                  handlePreset(
                    'Chào bạn! Hãy cùng Oloka.net cập nhật những tin tức công nghệ AI nóng hổi và trải nghiệm các công cụ sáng tạo nhất hôm nay.'
                  )
                }
                className="text-xs px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:border-[#46C7F0] hover:text-[#46C7F0] transition-colors"
              >
                Lời chào mở đầu
              </button>
              <button
                type="button"
                onClick={() =>
                  handlePreset(
                    'Hôm nay, các nhà nghiên cứu vừa công bố bước đột phá mới trong lĩnh vực mô hình đa phương thức, giúp xử lý ngôn ngữ và hình ảnh tức thì.'
                  )
                }
                className="text-xs px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:border-[#F47D59] hover:text-[#F47D59] transition-colors"
              >
                Bản tin AI News
              </button>
              <button
                type="button"
                onClick={() =>
                  handlePreset(
                    'Đừng quên quét mã QR bên dưới để tải tài liệu và kết nối với cộng đồng công nghệ Oloka nhé.'
                  )
                }
                className="text-xs px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:border-[#46C7F0] hover:text-[#46C7F0] transition-colors"
              >
                Kêu gọi hành động
              </button>
            </div>
          </div>

          {/* Text Area */}
          <div className="relative">
            <textarea
              rows={7}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Nhập hoặc dán đoạn văn bản bạn muốn chuyển thành giọng nói tại đây..."
              className="w-full p-4 rounded-xl bg-[#0A0E17] border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-[#46C7F0] text-base leading-relaxed resize-y"
            />
          </div>

          {/* Controls Bar & Waveform */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Playback Buttons */}
            <div className="flex items-center gap-3">
              {!isPlaying ? (
                <button
                  type="button"
                  onClick={handlePlay}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-[#46C7F0] to-[#F47D59] hover:opacity-95 shadow-lg shadow-[#46C7F0]/20 transition-all"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Đọc ngay</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handlePause}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-[#F47D59] hover:bg-[#F47D59]/90 transition-all"
                >
                  <Pause className="w-4 h-4 fill-white" />
                  <span>Tạm dừng</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleStop}
                className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                title="Dừng lại"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Waveform Visualizer effect */}
            <div className="flex items-center gap-1.5 h-8 px-4 bg-[#0A0E17] rounded-lg border border-slate-800">
              {[40, 75, 55, 90, 60, 85, 45, 95, 70, 50, 80, 65].map((height, i) => (
                <span
                  key={i}
                  className={`w-1 rounded-full transition-all duration-200 ${
                    isPlaying
                      ? i % 2 === 0
                        ? 'bg-[#46C7F0] animate-pulse'
                        : 'bg-[#F47D59] animate-pulse'
                      : 'bg-slate-700'
                  }`}
                  style={{
                    height: isPlaying ? `${Math.max(15, (height * (i % 3 + 1)) % 100)}%` : '20%',
                  }}
                />
              ))}
              <span className="text-[11px] font-mono text-slate-400 ml-2">
                {isPlaying ? 'ĐANG PHÁT' : 'SẴN SÀNG'}
              </span>
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="lg:col-span-4 bg-[#111827] border border-slate-800 rounded-2xl p-6 space-y-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#46C7F0]" />
            <span>Tùy chỉnh Giọng đọc</span>
          </h3>

          {/* Engine Selector */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2">
              Bộ xử lý âm thanh:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setEngineMode('browser')}
                className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-all ${
                  engineMode === 'browser'
                    ? 'border-[#46C7F0] bg-[#46C7F0]/10 text-white'
                    : 'border-slate-800 bg-slate-900 text-slate-400'
                }`}
              >
                Trình duyệt (Browser)
              </button>
              <a
                href="https://voice.oloka.net"
                target="_blank"
                rel="noreferrer"
                className="py-2 px-3 text-xs font-medium rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-white hover:border-[#F47D59] text-center flex items-center justify-center gap-1"
              >
                <span>OmniVoice (Cloud)</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#F47D59] animate-ping" />
              </a>
            </div>
          </div>

          {/* Voice selection */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2">
              Chọn giọng đọc ({availableVoices.length} giọng khả dụng):
            </label>
            <select
              value={selectedVoiceIndex}
              onChange={(e) => setSelectedVoiceIndex(Number(e.target.value))}
              className="w-full px-3 py-2.5 rounded-xl bg-[#0A0E17] border border-slate-700 text-white text-xs focus:outline-none focus:border-[#46C7F0]"
            >
              {availableVoices.map((voice, idx) => (
                <option key={idx} value={idx}>
                  {voice.name} ({voice.lang})
                </option>
              ))}
            </select>
          </div>

          {/* Sliders */}
          <div className="space-y-4 pt-2 border-t border-slate-800">
            {/* Speed / Rate */}
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Tốc độ đọc (Speed)</span>
                <span className="font-mono text-[#46C7F0]">{rate}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(parseFloat(e.target.value))}
                className="w-full accent-[#46C7F0] cursor-pointer"
              />
            </div>

            {/* Pitch */}
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Cao độ (Pitch)</span>
                <span className="font-mono text-[#F47D59]">{pitch}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="1.5"
                step="0.1"
                value={pitch}
                onChange={(e) => setPitch(parseFloat(e.target.value))}
                className="w-full accent-[#F47D59] cursor-pointer"
              />
            </div>

            {/* Volume */}
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Âm lượng (Volume)</span>
                <span className="font-mono text-white">{Math.round(volume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full accent-slate-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Tips card */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 space-y-1.5">
            <p className="font-semibold text-slate-300 flex items-center gap-1">
              <Radio className="w-3.5 h-3.5 text-[#46C7F0]" />
              <span>Gợi ý trải nghiệm tốt nhất</span>
            </p>
            <p>
              Đối với tiếng Việt, nếu thiết bị của bạn có sẵn Google Tiếng Việt hoặc Microsoft HoaiMy, hệ thống sẽ tự động ưu tiên giọng đọc truyền cảm tự nhiên nhất.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
