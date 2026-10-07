'use client'

import React, { useState, useEffect, useRef } from 'react'
import QRCode from 'qrcode'
import { 
  QrCode, 
  Download, 
  Copy, 
  Check, 
  Wifi, 
  Globe, 
  FileText, 
  User, 
  Sparkles, 
  Palette, 
  Share2,
  RefreshCw
} from 'lucide-react'

type QRType = 'url' | 'text' | 'wifi' | 'vcard'

export default function QRCodeStudio() {
  const [qrType, setQrType] = useState<QRType>('url')
  const [url, setUrl] = useState('https://oloka.net')
  const [text, setText] = useState('Chào mừng bạn đến với Oloka.net - AI & Tech Portal!')
  const [wifiSsid, setWifiSsid] = useState('Oloka-Studio')
  const [wifiPass, setWifiPass] = useState('oloka2026')
  const [wifiType, setWifiType] = useState('WPA')
  const [vcardName, setVcardName] = useState('Oloka AI')
  const [vcardPhone, setVcardPhone] = useState('0901234567')
  const [vcardEmail, setVcardEmail] = useState('contact@oloka.net')

  // Visual Customization
  const [colorDark, setColorDark] = useState('#0f172a') // Slate 900
  const [colorLight, setColorLight] = useState('#ffffff') // Clean White
  const [includeLogo, setIncludeLogo] = useState(true)
  const [errorLevel, setErrorLevel] = useState<'L' | 'M' | 'Q' | 'H'>('H')
  
  const [qrDataUrl, setQrDataUrl] = useState('')
  const [copied, setCopied] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  // Compute Raw String based on type
  const getQRContent = () => {
    switch (qrType) {
      case 'url':
        return url || 'https://oloka.net'
      case 'text':
        return text || 'Oloka.net'
      case 'wifi':
        return `WIFI:T:${wifiType};S:${wifiSsid};P:${wifiPass};;`
      case 'vcard':
        return `BEGIN:VCARD\nVERSION:3.0\nFN:${vcardName}\nTEL:${vcardPhone}\nEMAIL:${vcardEmail}\nEND:VCARD`
      default:
        return 'https://oloka.net'
    }
  }

  // Generate QR Canvas with optional Logo
  useEffect(() => {
    const generate = async () => {
      try {
        const content = getQRContent()
        const canvas = document.createElement('canvas')
        const size = 600

        await QRCode.toCanvas(canvas, content, {
          width: size,
          margin: 2,
          errorCorrectionLevel: errorLevel,
          color: {
            dark: colorDark,
            light: colorLight,
          },
        })

        // Draw central logo badge if selected
        if (includeLogo) {
          const ctx = canvas.getContext('2d')
          if (ctx) {
            const logoSize = size * 0.22
            const center = size / 2
            const badgeRadius = logoSize / 2 + 8

            // Draw center circular container
            ctx.save()
            ctx.beginPath()
            ctx.arc(center, center, badgeRadius, 0, Math.PI * 2)
            ctx.fillStyle = colorLight
            ctx.fill()
            ctx.lineWidth = 4
            ctx.strokeStyle = '#F47D59' // Brand Coral stroke
            ctx.stroke()
            ctx.restore()

            // Draw Oloka Emblem
            const img = new Image()
            img.src = '/oloka-logo.svg'
            await new Promise<void>((resolve) => {
              img.onload = () => {
                const imgW = logoSize
                const imgH = logoSize * (img.height / img.width || 0.3)
                ctx.drawImage(img, center - imgW / 2, center - imgH / 2, imgW, imgH)
                resolve()
              }
              img.onerror = () => resolve()
            })
          }
        }

        setQrDataUrl(canvas.toDataURL('image/png'))
      } catch (err) {
        console.error('QR Generation failed', err)
      }
    }

    generate()
  }, [qrType, url, text, wifiSsid, wifiPass, wifiType, vcardName, vcardPhone, vcardEmail, colorDark, colorLight, includeLogo, errorLevel])

  const handleDownload = () => {
    if (!qrDataUrl) return
    const link = document.createElement('a')
    link.download = `oloka-qrcode-${qrType}.png`
    link.href = qrDataUrl
    link.click()
  }

  const handleCopy = async () => {
    if (!qrDataUrl) return
    try {
      const res = await fetch(qrDataUrl)
      const blob = await res.blob()
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ])
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      navigator.clipboard.writeText(getQRContent())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-[#0284c7] border border-sky-200 mb-4 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Oloka Brand QR Generator</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
          QR Code Studio <span className="text-gradient">2-Tone</span>
        </h1>
        <p className="text-slate-600 text-base sm:text-lg">
          Tạo mã QR cá nhân hóa cao cấp chuẩn thương hiệu Oloka với 2 tone màu <strong className="text-[#0284c7]">#46C7F0</strong> & <strong className="text-[#ea580c]">#F47D59</strong>, tích hợp chèn logo tâm điểm và xuất file vector chuẩn in ấn.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Control Panel */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          {/* QR Type Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
              1. Chọn Loại Nội Dung QR
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: 'url', label: 'Website URL', icon: Globe },
                { id: 'text', label: 'Văn bản', icon: FileText },
                { id: 'wifi', label: 'Mạng WiFi', icon: Wifi },
                { id: 'vcard', label: 'Danh thiếp', icon: User },
              ].map((item) => {
                const Icon = item.icon
                const active = qrType === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => setQrType(item.id as QRType)}
                    className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl border text-sm font-semibold transition-all ${
                      active
                        ? 'border-[#0284c7] bg-sky-50 text-[#0284c7] shadow-xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:text-slate-900 hover:border-slate-300'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${active ? 'text-[#0284c7]' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Type Specific Inputs */}
          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
            {qrType === 'url' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Địa chỉ URL trang web:
                </label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://oloka.net"
                  className="w-full px-4 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0284c7] text-sm"
                />
              </div>
            )}

            {qrType === 'text' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Nội dung văn bản:
                </label>
                <textarea
                  rows={3}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Nhập nội dung bất kỳ cần mã hóa..."
                  className="w-full px-4 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0284c7] text-sm"
                />
              </div>
            )}

            {qrType === 'wifi' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Tên mạng WiFi (SSID):
                  </label>
                  <input
                    type="text"
                    value={wifiSsid}
                    onChange={(e) => setWifiSsid(e.target.value)}
                    placeholder="Tên WiFi"
                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-[#0284c7] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Mật khẩu WiFi:
                  </label>
                  <input
                    type="text"
                    value={wifiPass}
                    onChange={(e) => setWifiPass(e.target.value)}
                    placeholder="Mật khẩu"
                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-[#0284c7] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Chuẩn bảo mật:
                  </label>
                  <select
                    value={wifiType}
                    onChange={(e) => setWifiType(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-[#0284c7] text-sm"
                  >
                    <option value="WPA">WPA/WPA2/WPA3</option>
                    <option value="WEP">WEP</option>
                    <option value="nopass">Không có mật khẩu</option>
                  </select>
                </div>
              </div>
            )}

            {qrType === 'vcard' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Họ và tên:
                  </label>
                  <input
                    type="text"
                    value={vcardName}
                    onChange={(e) => setVcardName(e.target.value)}
                    placeholder="Nguyễn Văn A"
                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-[#0284c7] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Số điện thoại:
                  </label>
                  <input
                    type="tel"
                    value={vcardPhone}
                    onChange={(e) => setVcardPhone(e.target.value)}
                    placeholder="0901234567"
                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-[#0284c7] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Email liên hệ:
                  </label>
                  <input
                    type="email"
                    value={vcardEmail}
                    onChange={(e) => setVcardEmail(e.target.value)}
                    placeholder="contact@oloka.net"
                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-[#0284c7] text-sm"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Color & Brand Customizer */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
              <Palette className="w-4 h-4 text-[#ea580c]" />
              <span>2. Phối Màu Thương Hiệu Oloka</span>
            </label>

            {/* Presets */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
              <button
                type="button"
                onClick={() => {
                  setColorDark('#0284c7')
                  setColorLight('#ffffff')
                }}
                className="p-2.5 rounded-lg border border-slate-200 bg-white flex items-center gap-2 hover:border-[#0284c7] transition-colors"
              >
                <div className="w-5 h-5 rounded-full bg-[#0284c7] border border-slate-300" />
                <span className="text-xs font-medium text-slate-700">Oloka Cyan</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setColorDark('#ea580c')
                  setColorLight('#ffffff')
                }}
                className="p-2.5 rounded-lg border border-slate-200 bg-white flex items-center gap-2 hover:border-[#ea580c] transition-colors"
              >
                <div className="w-5 h-5 rounded-full bg-[#ea580c] border border-slate-300" />
                <span className="text-xs font-medium text-slate-700">Oloka Coral</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setColorDark('#0f172a')
                  setColorLight('#ffffff')
                }}
                className="p-2.5 rounded-lg border border-slate-200 bg-white flex items-center gap-2 hover:border-slate-500 transition-colors"
              >
                <div className="w-5 h-5 rounded-full bg-slate-900 border border-slate-300" />
                <span className="text-xs font-medium text-slate-700">Classic Crisp</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setColorDark('#46c7f0')
                  setColorLight('#0f172a')
                }}
                className="p-2.5 rounded-lg border border-slate-200 bg-white flex items-center gap-2 hover:border-slate-500 transition-colors"
              >
                <div className="w-5 h-5 rounded-full bg-[#46c7f0] border border-slate-800" />
                <span className="text-xs font-medium text-slate-700">Neon Dark</span>
              </button>
            </div>

            {/* Custom Pickers */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <input
                  type="color"
                  value={colorDark}
                  onChange={(e) => setColorDark(e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer bg-transparent border-0"
                />
                <div className="text-xs">
                  <p className="text-slate-500 font-medium">Màu mã QR</p>
                  <p className="font-mono text-slate-800 font-bold uppercase">{colorDark}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <input
                  type="color"
                  value={colorLight}
                  onChange={(e) => setColorLight(e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer bg-transparent border-0"
                />
                <div className="text-xs">
                  <p className="text-slate-500 font-medium">Màu nền</p>
                  <p className="font-mono text-slate-800 font-bold uppercase">{colorLight}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Logo in Center Toggle */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <p className="text-sm font-semibold text-slate-800">Chèn Logo Oloka ở giữa mã QR</p>
              <p className="text-xs text-slate-500">Tự động vẽ huy hiệu biểu tượng Oloka vào tâm mã QR</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={includeLogo}
                onChange={(e) => setIncludeLogo(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0284c7]"></div>
            </label>
          </div>
        </div>

        {/* Right Preview Card */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="w-full bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col items-center sticky top-24 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-6 flex items-center gap-1.5">
              <QrCode className="w-4 h-4 text-[#0284c7]" />
              <span>Bản xem trước Real-time</span>
            </h3>

            {/* QR Card Container */}
            <div className="p-6 rounded-2xl bg-white border-2 border-slate-200 relative group transition-all duration-300 hover:border-sky-300 shadow-md">
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt="Oloka Generated QR Code"
                  className="w-64 h-64 sm:w-72 sm:h-72 object-contain rounded-lg"
                />
              ) : (
                <div className="w-64 h-64 flex items-center justify-center text-slate-400">
                  <RefreshCw className="w-8 h-8 animate-spin" />
                </div>
              )}

              {/* Oloka Brand badge */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-700 shadow-xs">
                OLOKA.NET STUDIO
              </div>
            </div>

            {/* Actions */}
            <div className="w-full mt-8 grid grid-cols-2 gap-3">
              <button
                onClick={handleDownload}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#46C7F0] to-[#F47D59] hover:opacity-90 shadow-sm transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Tải PNG</span>
              </button>

              <button
                onClick={handleCopy}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700">Đã chép</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Sao chép ảnh</span>
                  </>
                )}
              </button>
            </div>

            {/* Hint */}
            <p className="text-xs text-slate-500 text-center mt-4">
              Mã QR độ phân giải cao 600×600px chuẩn vector in ấn & hiển thị màn hình OLED.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
