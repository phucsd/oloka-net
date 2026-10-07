'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { 
  Mic, 
  MicOff, 
  Volume2, 
  Sparkles, 
  ExternalLink,
  Disc,
  Download,
  ArrowLeft
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
        if (audioContextRef.current) audioContextRef.current.close()
        setAudioLevel(0)
      }

      mediaRecorder.start()
      setIsRecording(true)
      setRecordingTime(0)

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    } catch (err) {
      console.error('Error accessing microphone', err)
      alert('Không thể truy cập microphone. Vui lòng cấp quyền micro trong trình duyệt.')
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-[#ea580c] border border-orange-200 mb-4 shadow-2xs">
          <Mic className="w-3.5 h-3.5" />
          <span>Oloka AI Voice & Audio Lab</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
          Voice Studio <span className="text-gradient">Phòng Thu Âm</span>
        </h1>
        <p className="text-slate-600 text-base sm:text-lg">
          Ghi âm thử giọng, kiểm tra micro và liên kết trực tiếp tới nền tảng <strong>OmniVoice Gateway</strong> tại subdomain <strong className="text-[#0284c7]">voice.oloka.net</strong>.
        </p>
      </div>

      {/* OmniVoice Gateway Callout Banner */}
      <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-sky-50 via-white to-orange-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-sky-100 border border-sky-200 text-[#0284c7] flex items-center justify-center flex-shrink-0">
            <Volume2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-base font-bold text-slate-900">OmniVoice AI Gateway Chuyên Dụng</h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                LIVE
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Cổng dịch vụ chuyển văn bản thành giọng đọc (TTS) tiếng Việt và nhân bản giọng nói AI (Voice Cloning) chính thức.
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Recording Console - Light Theme */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Disc className={`w-5 h-5 ${isRecording ? 'text-red-500 animate-spin' : 'text-[#0284c7]'}`} />
              <span>Bàn ghi âm thử giọng</span>
            </h2>
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${isRecording ? 'bg-red-500 animate-ping' : 'bg-emerald-500'}`} />
              <span className="text-xs font-mono font-semibold text-slate-600">
                {isRecording ? 'LIVE RECORDING' : 'STANDBY'}
              </span>
            </div>
          </div>

          {/* Central Mic & Visualizer Area */}
          <div className="flex flex-col items-center justify-center py-12 px-4 rounded-2xl bg-slate-50 border border-slate-200 relative overflow-hidden">
            {/* Visualizer Aura Ring */}
            <div
              className="absolute rounded-full transition-all duration-150 pointer-events-none"
              style={{
                width: `${160 + audioLevel * 1.5}px`,
                height: `${160 + audioLevel * 1.5}px`,
                background: `radial-gradient(circle, rgba(2, 132, 199, ${0.1 + audioLevel / 200}) 0%, rgba(244, 125, 89, 0) 70%)`,
              }}
            />

            {/* Time counter */}
            <div className="text-4xl sm:text-5xl font-mono font-bold text-slate-900 tracking-widest mb-6 z-10">
              {formatTime(recordingTime)}
            </div>

            {/* Mic Action Button */}
            {!isRecording ? (
              <button
                type="button"
                onClick={startRecording}
                className="group relative z-10 flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-tr from-[#46C7F0] to-[#F47D59] p-1 shadow-lg hover:scale-105 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-center w-full h-full rounded-full bg-white group-hover:bg-opacity-90 transition-all">
                  <Mic className="w-10 h-10 text-[#0284c7] group-hover:scale-110 transition-transform" />
                </div>
              </button>
            ) : (
              <button
                type="button"
                onClick={stopRecording}
                className="group relative z-10 flex items-center justify-center w-24 h-24 rounded-full bg-red-600 p-1 shadow-lg shadow-red-500/20 hover:scale-105 transition-all animate-pulse cursor-pointer"
              >
                <div className="flex items-center justify-center w-full h-full rounded-full bg-white">
                  <MicOff className="w-10 h-10 text-red-600" />
                </div>
              </button>
            )}

            <p className="text-xs text-slate-600 font-medium mt-6 z-10">
              {isRecording
                ? 'Đang ghi âm... Nhấn lại vào nút để dừng và nghe lại.'
                : 'Nhấn vào biểu tượng Micro để kiểm tra âm thanh đầu vào.'}
            </p>

            {/* Live Audio Meter Bar */}
            <div className="w-full max-w-md mt-6 px-4 z-10">
              <div className="flex justify-between text-[11px] font-mono text-slate-500 mb-1 font-semibold">
                <span>MIC LEVEL</span>
                <span>{audioLevel}%</span>
              </div>
              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#46C7F0] to-[#F47D59] transition-all duration-75"
                  style={{ width: `${audioLevel}%` }}
                />
              </div>
            </div>
          </div>

          {/* Recorded Audio Player */}
          {recordedAudioUrl && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <p className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-[#0284c7]" />
                <span>Bản thu vừa tạo</span>
              </p>
              <audio src={recordedAudioUrl} controls className="w-full rounded-lg" />
              <div className="flex justify-end gap-3 pt-1">
                <a
                  href={recordedAudioUrl}
                  download="oloka-voice-recording.webm"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold bg-sky-100 text-[#0284c7] hover:bg-sky-200 border border-sky-200 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Tải file ghi âm (.webm)</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar: Presets and details */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Cấu hình lọc âm (Studio Presets)
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
                      ? 'border-[#ea580c] bg-orange-50/70 text-slate-900 font-semibold'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <p className="font-bold text-slate-900 mb-0.5">{item.label}</p>
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
