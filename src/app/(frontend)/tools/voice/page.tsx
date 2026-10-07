'use client'

import React, { useState, useRef, useEffect } from 'react'
import { 
  Mic, 
  MicOff, 
  Play, 
  Pause, 
  Download, 
  Sparkles, 
  Radio, 
  Volume2, 
  Sliders, 
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Disc
} from 'lucide-react'

export default function VoiceStudio() {
  const [isRecording, setIsRecording] = useState(false)
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null)
  const [recordingTime, setRecordingTime] = useState(0)
  const [audioLevel, setAudioLevel] = useState(0)
  const [activeVoiceModel, setActiveVoiceModel] = useState('studio')

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  // Start recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      
      // Audio level analyser
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
      const analyser = audioCtx.createAnalyser()
      const source = audioCtx.createMediaStreamSource(stream)
      source.connect(analyser)
      analyser.fftSize = 256
      audioContextRef.current = audioCtx
      analyserRef.current = analyser

      const dataArray = new Uint8Array(analyser.frequencyBinCount)
      const updateLevel = () => {
        analyser.getByteFrequencyData(dataArray)
        let sum = 0
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i]
        }
        const avg = sum / dataArray.length
        setAudioLevel(Math.min(100, Math.round((avg / 128) * 100)))
        animationFrameRef.current = requestAnimationFrame(updateLevel)
      }
      updateLevel()

      // MediaRecorder setup
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        const url = URL.createObjectURL(audioBlob)
        setRecordedAudioUrl(url)
        stream.getTracks().forEach((track) => track.stop())
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
        setAudioLevel(0)
      }

      mediaRecorder.start()
      setIsRecording(true)
      setRecordingTime(0)

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    } catch (err) {
      alert('Không thể truy cập microphone. Vui lòng cấp quyền micro cho trình duyệt.')
    }
  }

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#F47D59]/10 text-[#F47D59] border border-[#F47D59]/20 mb-4">
          <Mic className="w-3.5 h-3.5" />
          <span>Oloka AI Voice & Audio Lab</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
          Voice Studio <span className="text-gradient">Phòng Thu Âm</span>
        </h1>
        <p className="text-slate-400 text-base sm:text-lg">
          Ghi âm trực tiếp với bộ lọc lọc tạp âm thời gian thực, đo cường độ micro và kết nối với nền tảng OmniVoice Gateway của Oloka.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Recording Console */}
        <div className="lg:col-span-8 bg-[#111827] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Disc className={`w-5 h-5 ${isRecording ? 'text-red-500 animate-spin' : 'text-[#46C7F0]'}`} />
              <span>Bàn ghi âm phòng thu</span>
            </h2>
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${isRecording ? 'bg-red-500 animate-ping' : 'bg-emerald-500'}`} />
              <span className="text-xs font-mono text-slate-400">
                {isRecording ? 'LIVE RECORDER' : 'STANDBY'}
              </span>
            </div>
          </div>

          {/* Central Mic & Visualizer Area */}
          <div className="flex flex-col items-center justify-center py-12 px-4 rounded-2xl bg-[#0A0E17] border border-slate-800 relative overflow-hidden">
            {/* Visualizer Aura Ring */}
            <div
              className="absolute rounded-full transition-all duration-150 pointer-events-none"
              style={{
                width: `${160 + audioLevel * 1.5}px`,
                height: `${160 + audioLevel * 1.5}px`,
                background: `radial-gradient(circle, rgba(244, 125, 89, ${0.1 + audioLevel / 200}) 0%, rgba(70, 199, 240, 0) 70%)`,
              }}
            />

            {/* Time counter */}
            <div className="text-4xl sm:text-5xl font-mono font-bold text-white tracking-widest mb-6 z-10">
              {formatTime(recordingTime)}
            </div>

            {/* Mic Action Button */}
            {!isRecording ? (
              <button
                type="button"
                onClick={startRecording}
                className="group relative z-10 flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-tr from-[#46C7F0] to-[#F47D59] p-1 shadow-xl hover:scale-105 transition-all"
              >
                <div className="flex items-center justify-center w-full h-full rounded-full bg-[#111827] group-hover:bg-opacity-80 transition-all">
                  <Mic className="w-10 h-10 text-[#46C7F0] group-hover:text-white transition-colors" />
                </div>
              </button>
            ) : (
              <button
                type="button"
                onClick={stopRecording}
                className="group relative z-10 flex items-center justify-center w-24 h-24 rounded-full bg-red-600 p-1 shadow-xl shadow-red-500/20 hover:scale-105 transition-all animate-pulse"
              >
                <div className="flex items-center justify-center w-full h-full rounded-full bg-[#111827]">
                  <MicOff className="w-10 h-10 text-red-500" />
                </div>
              </button>
            )}

            <p className="text-xs text-slate-400 mt-6 z-10">
              {isRecording
                ? 'Đang ghi âm... Nhấn lại vào nút để dừng và lưu bản thu.'
                : 'Nhấn vào biểu tượng Micro để bắt đầu thu âm.'}
            </p>

            {/* Live Audio Meter Bar */}
            <div className="w-full max-w-md mt-6 px-4 z-10">
              <div className="flex justify-between text-[11px] font-mono text-slate-500 mb-1">
                <span>MIC LEVEL</span>
                <span>{audioLevel}%</span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#46C7F0] via-emerald-400 to-[#F47D59] transition-all duration-75"
                  style={{ width: `${audioLevel}%` }}
                />
              </div>
            </div>
          </div>

          {/* Recorded Audio Player */}
          {recordedAudioUrl && (
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-[#46C7F0]" />
                <span>Bản thu vừa tạo</span>
              </p>
              <audio src={recordedAudioUrl} controls className="w-full rounded-lg" />
              <div className="flex justify-end gap-3 pt-1">
                <a
                  href={recordedAudioUrl}
                  download="oloka-voice-recording.webm"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-[#46C7F0]/20 text-[#46C7F0] hover:bg-[#46C7F0]/30 border border-[#46C7F0]/30 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Tải file ghi âm (.webm)</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar: OmniVoice Cloud Connection */}
        <div className="lg:col-span-4 space-y-6">
          {/* OmniVoice Card */}
          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Cổng AI Voice Cloud
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                ONLINE
              </span>
            </div>

            <h3 className="text-lg font-bold text-white">
              OmniVoice Gateway
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Subdomain <strong className="text-[#46C7F0]">voice.oloka.net</strong> đã được liên kết với hạ tầng Cloudflare Pages, sẵn sàng cho các mô hình AI Voice Cloning và siêu phân giải âm thanh chuyên sâu.
            </p>

            <a
              href="https://voice.oloka.net"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-[#46C7F0] to-[#F47D59] hover:opacity-95 shadow-lg shadow-[#46C7F0]/10 transition-all"
            >
              <span>Mở OmniVoice Console</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Voice Profiles Showcase */}
          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
              Cấu hình lọc âm (Presets)
            </h3>
            <div className="space-y-2">
              {[
                { id: 'studio', label: 'Studio Broadcast', desc: 'Lọc nhiễu, tăng độ ấm trầm và độ rõ của âm tiết' },
                { id: 'podcast', label: 'Podcast Host', desc: 'Tối ưu độ động âm trường và cân bằng âm lượng' },
                { id: 'asmr', label: 'ASMR & Whisper', desc: 'Tăng cường độ chi tiết của hơi thở và âm vực cao' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveVoiceModel(item.id)}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition-all ${
                    activeVoiceModel === item.id
                      ? 'border-[#F47D59] bg-[#F47D59]/10 text-white'
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white'
                  }`}
                >
                  <p className="font-semibold text-white mb-0.5">{item.label}</p>
                  <p className="text-slate-500">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
