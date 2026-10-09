'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Sparkles,
  Play,
  RotateCw,
  ShieldCheck,
  AlertTriangle,
  Clock,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Sliders,
  Database,
  ArrowLeft,
  PauseCircle,
  Check,
  FileText,
  Layers,
  Zap,
} from 'lucide-react'

export default function AutomationAdminPage() {
  const [loading, setLoading] = useState(true)
  const [running, setRunning] = useState(false)
  const [statusData, setStatusData] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'sources' | 'logs'>('overview')
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)
  const [dryRunMode, setDryRunMode] = useState(false)
  const [manualReview, setManualReview] = useState(false)

  const fetchStatus = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/automation/status')
      const json = (await res.json()) as any
      if (json.success) {
        setStatusData(json.data)
      }
    } catch (err: any) {
      console.error('Error fetching automation status:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStatus()
  }, [])

  const handleTriggerRun = async (isDry: boolean) => {
    try {
      setRunning(true)
      setMessage(null)
      const res = await fetch('/api/automation/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dryRun: isDry,
          manualReview,
          forceRun: true,
        }),
      })
      const result = (await res.json()) as any
      if (result.success) {
        setMessage({ text: result.message, type: 'success' })
        fetchStatus()
      } else {
        setMessage({ text: result.message || result.error || 'Thực thi thất bại', type: 'error' })
      }
    } catch (err: any) {
      setMessage({ text: err.message || 'Lỗi mạng khi kích hoạt', type: 'error' })
    } finally {
      setRunning(false)
    }
  }

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#0284c7] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Về Admin CMS</span>
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-xs font-bold text-slate-800">News Automation Engine</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchStatus}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 shadow-2xs transition-colors cursor-pointer"
          >
            <RotateCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Làm mới</span>
          </button>
        </div>
      </div>

      {/* Header Banner */}
      <div className="mb-10 text-center sm:text-left flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-gradient-to-r from-sky-50 via-white to-orange-50 p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-[#0284c7] border border-sky-200 mb-3 shadow-2xs">
            <Zap className="w-3.5 h-3.5" />
            <span>Autonomous AI News Publisher · Chu kỳ mỗi 3 giờ</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Quản trị Hệ thống <span className="text-gradient">Tự động Xuất bản Tin tức</span>
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
            Giám sát quy trình Thu thập RSS, Xác minh Bản quyền (CC), Chấm điểm 100 điểm, Biên tập tiếng Việt và Xuất bản lên Cloudflare D1.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={() => handleTriggerRun(true)}
            disabled={running}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 shadow-2xs transition-colors cursor-pointer disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 text-amber-500" />
            <span>Chạy thử (Dry Run)</span>
          </button>

          <button
            onClick={() => handleTriggerRun(false)}
            disabled={running}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#46C7F0] to-[#F47D59] hover:opacity-95 shadow-xs transition-all cursor-pointer disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            <span>{running ? 'Đang thực thi...' : 'Kích hoạt Xuất bản ngay'}</span>
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {message && (
        <div
          className={`mb-8 p-4 rounded-2xl border flex items-center gap-3 text-sm font-medium ${
            message.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-rose-50 text-rose-800 border-rose-200'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Trạng thái Scheduler</span>
            <Clock className="w-4 h-4 text-[#0284c7]" />
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-lg font-extrabold text-slate-900">Mỗi 3 giờ (00, 03, 06...)</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Lịch chạy tự động qua GitHub Actions Cron</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Nguồn tin Hợp lệ</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">
            {statusData?.sources?.length || 5} nguồn đã duyệt
          </div>
          <p className="text-xs text-slate-500 mt-1">It's FOSS, Horizon, EFF, SciDev...</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Tiêu chuẩn Duyệt</span>
            <Sliders className="w-4 h-4 text-orange-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">≥ 75 / 100 điểm</div>
          <p className="text-xs text-slate-500 mt-1">Độ mới, Tính phù hợp, Bản quyền CC</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Tổng Bài viết D1</span>
            <Database className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">
            {statusData?.totalArticlesPublished || 40} bài
          </div>
          <p className="text-xs text-slate-500 mt-1">Lưu trữ trên Cloudflare D1 Edge</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'overview'
              ? 'bg-[#0284c7] text-white shadow-2xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Tổng quan & Hàng đợi
        </button>
        <button
          onClick={() => setActiveTab('sources')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'sources'
              ? 'bg-[#0284c7] text-white shadow-2xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Danh bạ Nguồn tin ({statusData?.sources?.length || 5})
        </button>
        <button
          onClick={() => setActiveTab('logs')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'logs'
              ? 'bg-[#0284c7] text-white shadow-2xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Nhật ký Thực thi (Logs)
        </button>
      </div>

      {/* Tab: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#0284c7]" />
              <span>Cấu hình Vận hành & An toàn</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="font-bold text-slate-800 mb-1">Quy định Số lượng Bài viết</div>
                <div className="text-slate-600 text-xs leading-relaxed">
                  Tối đa 1 bài mỗi lượt chạy (mỗi 3 giờ), tối đa 8 bài/ngày. Hệ thống tự động tạm dừng khi đạt giới hạn hoặc khi không có tin đạt ≥ 75 điểm.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="font-bold text-slate-800 mb-1">Cơ chế Khóa Phân tán (Distributed Lock)</div>
                <div className="text-slate-600 text-xs leading-relaxed">
                  Trạng thái hiện tại: {statusData?.isLocked ? '🔴 Đang có tiến trình chạy' : '🟢 Sẵn sàng'}. Khóa tự giải phóng sau 10 phút để chống deadlock.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Sources */}
      {activeTab === 'sources' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Source Registry (Nguồn cấp phép hợp lệ)</h3>
            <span className="text-xs text-slate-500 font-medium">Bản quyền Creative Commons đã xác thực</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600 text-xs uppercase font-bold border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3.5">Nguồn tin</th>
                  <th className="px-5 py-3.5">Domain & RSS</th>
                  <th className="px-5 py-3.5">Giấy phép</th>
                  <th className="px-5 py-3.5">Quyền Dịch & Tái bản</th>
                  <th className="px-5 py-3.5">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(statusData?.sources || []).map((source: any) => (
                  <tr key={source.sourceId} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-5 py-4 font-bold text-slate-900">
                      {source.name}
                      <div className="text-xs text-slate-400 font-normal mt-0.5">ID: {source.sourceId}</div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="text-slate-800 font-mono text-xs">{source.domain}</div>
                      <a
                        href={source.rssUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-[#0284c7] hover:underline inline-flex items-center gap-1 mt-0.5"
                      >
                        <span>Kiểm tra RSS Feed</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-sky-100 text-[#0284c7] border border-sky-200">
                        {source.licensePolicy?.defaultLicense || 'CC BY'}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-xs">
                      {source.licensePolicy?.canVerbatimTranslate ? (
                        <span className="text-emerald-700 flex items-center gap-1 font-semibold">
                          <Check className="w-3.5 h-3.5" /> Được phép dịch (Kèm ghi công)
                        </span>
                      ) : (
                        <span className="text-amber-700 flex items-center gap-1 font-semibold">
                          <AlertTriangle className="w-3.5 h-3.5" /> Chỉ khai thác dữ kiện
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-emerald-100 text-emerald-800">
                        Hoạt động
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Logs */}
      {activeTab === 'logs' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
          <div className="p-5 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900">Lịch sử Thực thi Pipeline (Gần nhất)</h3>
          </div>

          <div className="divide-y divide-slate-100">
            {(statusData?.recentLogs || []).length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-sm">
                Chưa có nhật ký nào được ghi nhận. Nhấn "Chạy thử (Dry Run)" ở trên để tạo log đầu tiên!
              </div>
            ) : (
              (statusData?.recentLogs || []).map((log: any) => (
                <div key={log.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold ${
                          log.status === 'success'
                            ? 'bg-emerald-100 text-emerald-800'
                            : log.status === 'skipped'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {log.status.toUpperCase()} ({log.run_type})
                      </span>
                      <span className="text-xs text-slate-400 font-mono">{log.job_id}</span>
                      <span className="text-xs text-slate-400">· {new Date(log.created_at).toLocaleString('vi-VN')}</span>
                    </div>

                    <div className="font-bold text-slate-800">
                      {log.article_published_title || log.error_details || 'Hoàn thành chu kỳ kiểm tra'}
                    </div>

                    {log.article_published_slug && (
                      <Link
                        href={`/news/${log.article_published_slug}`}
                        className="text-xs text-[#0284c7] hover:underline inline-flex items-center gap-1 mt-1"
                      >
                        <span>Xem bài viết: /news/{log.article_published_slug}</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    )}
                  </div>

                  <div className="text-xs text-slate-500 text-right sm:flex-shrink-0">
                    <div>Thu thập: {log.articles_discovered || 0} bài</div>
                    <div>Thời gian: {log.execution_time_ms}ms</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
