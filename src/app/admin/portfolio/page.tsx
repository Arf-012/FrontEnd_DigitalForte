'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { authApi } from 'lib/api/auth'
import AdminSidebar from 'components/ui/AdminSidebar'
import Image from 'next/image'
import type { ApiResponse, PaginatedResponse, Portfolio } from 'types'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'

type View = 'list' | 'form'

export default function PortfolioPage() {
  const router = useRouter()

  // ── Auth ────────────────────────────────────────────────────
  const [loading, setLoading] = useState(true)

  const checkAuth = useCallback(async () => {
    try {
      const res = await authApi.getCurrentUser()
      if (!res.success) router.push('/admin/login')
    } catch {
      router.push('/admin/login')
    } finally {
      setLoading(false)
    }
  }, [router])

  // ── Portfolio list ──────────────────────────────────────────
  const [portfolios, setPortfolios] = useState<Portfolio[]>([])
  const [portfolioLoading, setPortfolioLoading] = useState(false)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const fetchPortfolios = useCallback(async () => {
    setPortfolioLoading(true)
    setErrorMsg(null)
    try {
      const res = await fetch(`${API_BASE}/api/portfolios`, { credentials: 'include' })
      const json: ApiResponse<PaginatedResponse<Portfolio>> = await res.json()
      if (json.success) {
        setPortfolios(json.data.data)
      } else {
        setErrorMsg(json.message)
        setPortfolios([])
      }
    } catch (err) {
      console.error(err)
      setErrorMsg('Gagal memuat data portfolio.')
      setPortfolios([])
    } finally {
      setPortfolioLoading(false)
    }
  }, [])

  useEffect(() => {
    checkAuth()
    fetchPortfolios()
  }, [checkAuth, fetchPortfolios])

  // ── View state ─────────────────────────────────────────────
  const [view, setView] = useState<View>('list')
  const [editItem, setEditItem] = useState<Portfolio | null>(null)

  // ── Form state ─────────────────────────────────────────────
  const [fTitle, setFTitle] = useState('')
  const [fDesc, setFDesc] = useState('')
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [coverPreview, setCoverPreview] = useState<string | null>(null)
  const [galleryFiles, setGalleryFiles] = useState<File[]>([])
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([])
  const [saving, setSaving] = useState(false)

  const coverRef = useRef<HTMLInputElement>(null)
  const galleryRef = useRef<HTMLInputElement>(null)
  const titleRef = useRef<HTMLInputElement>(null)

  // ── Toast ───────────────────────────────────────────────────
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

  function showToast(msg: string, type: 'success' | 'error') {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  // ── Open form ───────────────────────────────────────────────
  function openCreate() {
    setEditItem(null)
    setFTitle('')
    setFDesc('')
    setCoverFile(null)
    setCoverPreview(null)
    setGalleryFiles([])
    setGalleryPreviews([])
    setView('form')
  }

  function openEdit(item: Portfolio) {
    setEditItem(item)
    setFTitle(item.title)
    setFDesc(item.description || '')
    setCoverFile(null)
    setCoverPreview(item.image ? `${API_BASE}/storage/${item.image}` : null)
    setGalleryFiles([])
    setGalleryPreviews([])
    setView('form')
  }

  function backToList() {
    setView('list')
    setEditItem(null)
  }

  // ── File handlers ───────────────────────────────────────────
  function handleCoverChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setCoverFile(file)
    setCoverPreview(URL.createObjectURL(file))
  }

  function handleGalleryChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    setGalleryFiles((prev) => [...prev, ...files])
    setGalleryPreviews((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))])
  }

  function removeGallery(index: number) {
    setGalleryFiles((prev) => prev.filter((_, i) => i !== index))
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index))
  }

  // ── Save ────────────────────────────────────────────────────
  async function handleSave() {
    if (!fTitle.trim()) { showToast('Title wajib diisi.', 'error'); return }
    if (!fDesc.trim()) { showToast('Description wajib diisi.', 'error'); return }
    if (!editItem && !coverFile) { showToast('Cover image wajib diunggah.', 'error'); return }

    setSaving(true)
    try {
      const form = new FormData()
      form.append('title', fTitle.trim())
      form.append('description', fDesc.trim())
      if (coverFile) form.append('image', coverFile)
      galleryFiles.forEach((f) => form.append('gallery[]', f))

      let res: Response
      if (editItem) {
        form.append('_method', 'PUT')
        res = await fetch(`${API_BASE}/api/admin/portfolios/${editItem.id}`, {
          method: 'POST', credentials: 'include', body: form,
        })
      } else {
        res = await fetch(`${API_BASE}/api/admin/portfolios`, {
          method: 'POST', credentials: 'include', body: form,
        })
      }

      const json = await res.json()
      if (json.success) {
        showToast(json.message || 'Portfolio berhasil disimpan!', 'success')
        await fetchPortfolios()
        setTimeout(() => backToList(), 900)
      } else {
        showToast(json.message || 'Terjadi kesalahan.', 'error')
      }
    } catch (err) {
      console.error(err)
      showToast('Gagal menyimpan portfolio.', 'error')
    } finally {
      setSaving(false)
    }
  }

  // ── Delete ──────────────────────────────────────────────────
  async function handleDelete(id: number) {
    if (!confirm('Yakin ingin menghapus portfolio ini?')) return
    try {
      const res = await fetch(`${API_BASE}/api/admin/portfolios/${id}`, {
        method: 'DELETE', credentials: 'include',
      })
      if (res.ok) {
        setPortfolios((prev) => prev.filter((p) => p.id !== id))
        if (selectedId === id) setSelectedId(null)
        showToast('Portfolio berhasil dihapus!', 'success')
      } else {
        showToast('Gagal menghapus portfolio.', 'error')
      }
    } catch (err) {
      console.error(err)
      showToast('Gagal menghapus portfolio.', 'error')
    }
  }

  // ── Logout ──────────────────────────────────────────────────
  const handleLogout = async () => {
    try {
      await authApi.logout()
      router.push('/admin/login')
    } catch (err) {
      console.error(err)
    }
  }

  // ── Loading screen ──────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // ══════════════════════════════════════════════════════════════
  // RENDER
  // ══════════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen flex bg-gray-100">
      <AdminSidebar onLogout={handleLogout} />

      <div className="flex-1 flex flex-col min-h-screen">

        {/* ── LIST VIEW ─────────────────────────────────────── */}
        {view === 'list' && (
          <>
            {/* Topbar */}
            <header className="bg-white border-b border-gray-200 h-[46px] flex items-center justify-end px-6">
              <button
                onClick={openCreate}
                className="flex items-center gap-1.5 bg-[#8B1A1A] hover:bg-[#6B1212] text-white text-xs font-medium px-3 py-1.5 rounded transition-colors"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
                New Entry +
              </button>
            </header>

            {/* Card list */}
            <main className="flex-1 p-4 flex flex-col gap-3">
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-xs flex items-center justify-between">
                  {errorMsg}
                  <button onClick={fetchPortfolios} className="underline font-medium ml-2">Coba lagi</button>
                </div>
              )}

              {portfolioLoading ? (
                [...Array(4)].map((_, i) => (
                  <div key={i} className="bg-[#8B1A1A] rounded-md h-[88px] animate-pulse opacity-70" />
                ))
              ) : portfolios.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-gray-400">
                  <svg className="w-10 h-10 mb-3 opacity-25" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-sm font-medium">Belum ada portfolio.</p>
                  <p className="text-xs mt-1">Klik <strong>New Entry +</strong> untuk menambah.</p>
                </div>
              ) : (
                portfolios.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedId(item.id === selectedId ? null : item.id)}
                    style={selectedId === item.id ? { outline: '2.5px solid #4A8FD4' } : {}}
                    className="relative bg-[#8B1A1A] rounded-md p-3 pb-10 cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      {item.image && (
                        <Image
                          src={`${API_BASE}/storage/${item.image}`}
                          alt={item.title}
                          width={40}
                          height={40}
                          className="rounded object-cover shrink-0 opacity-90 mt-0.5"
                        />
                      )}
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-white leading-snug truncate">{item.title}</p>
                        {item.description && (
                          <p className="text-xs text-red-200 mt-1 leading-relaxed line-clamp-2">{item.description}</p>
                        )}
                      </div>
                    </div>

                    <div className="absolute bottom-2 right-2 flex gap-1">
                      <button
                        onClick={(e) => { e.stopPropagation(); openEdit(item) }}
                        className="w-[26px] h-[26px] rounded flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                        style={{ background: 'rgba(255,255,255,0.15)' }}
                        title="Edit"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDelete(item.id) }}
                        className="w-[26px] h-[26px] rounded flex items-center justify-center text-white hover:bg-red-500/70 transition-colors"
                        style={{ background: 'rgba(255,255,255,0.15)' }}
                        title="Hapus"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </main>
          </>
        )}

        {/* ── FORM VIEW (New / Edit) ─────────────────────────── */}
        {view === 'form' && (
          <main className="flex-1 bg-white">
            <div className="max-w-[700px] mx-auto px-7 py-6 pb-16">

              {/* Back link */}
              <button
                onClick={backToList}
                className="flex items-center gap-1.5 text-[#8B1A1A] text-xs mb-5 hover:underline"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to list without saving changes
              </button>

              {/* Title */}
              <div className="flex items-center gap-2.5 mb-5">
                <input
                  ref={titleRef}
                  type="text"
                  value={fTitle}
                  onChange={(e) => setFTitle(e.target.value)}
                  placeholder="Title"
                  className="text-[28px] font-bold text-[#8B1A1A] border-0 border-b-2 border-[#8B1A1A] outline-none flex-1 pb-0.5 bg-transparent placeholder:text-red-300"
                />
                <button
                  onClick={() => titleRef.current?.focus()}
                  className="text-[#8B1A1A] flex-shrink-0"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
              </div>

              {/* Cover Image */}
              <div
                onClick={() => coverRef.current?.click()}
                className="w-full h-[140px] bg-[#8B1A1A] rounded flex flex-col items-center justify-center gap-3 mb-5 relative overflow-hidden cursor-pointer"
              >
                {coverPreview && (
                  <Image src={coverPreview} alt="Cover" fill className="object-cover" />
                )}
                {!coverPreview && (
                  <p className="text-white text-xl font-bold">Cover Image</p>
                )}
                <button
                  onClick={(e) => { e.stopPropagation(); coverRef.current?.click() }}
                  className="relative z-10 bg-white text-[#8B1A1A] text-sm font-semibold px-4 py-2 rounded-sm flex items-center gap-1.5 hover:bg-gray-50 transition-colors"
                >
                  {coverPreview ? 'Change Image' : 'Add Image'}
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                <input
                  ref={coverRef}
                  type="file"
                  accept="image/jpeg,image/png,image/gif,image/webp"
                  className="hidden"
                  onChange={handleCoverChange}
                />
              </div>

              {/* Description + Gallery */}
              <div className="grid grid-cols-2 gap-4 mb-5">
                <div>
                  <p className="text-sm font-bold text-[#8B1A1A] mb-2">Description</p>
                  <textarea
                    value={fDesc}
                    onChange={(e) => setFDesc(e.target.value)}
                    placeholder="Write a short description here..."
                    className="w-full h-[178px] border border-gray-300 rounded px-3 py-2.5 text-xs resize-none focus:outline-none focus:border-[#8B1A1A] text-gray-700"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#8B1A1A] mb-2">Gallery</p>
                  <div
                    onClick={() => galleryRef.current?.click()}
                    className="w-full h-[178px] border border-gray-300 rounded flex flex-col items-center justify-center cursor-pointer overflow-hidden"
                  >
                    {galleryPreviews.length > 0 ? (
                      <div className="w-full h-full grid grid-cols-3 gap-1 p-1 content-start overflow-y-auto">
                        {galleryPreviews.map((src, i) => (
                          <div key={i} className="relative group">
                            <img src={src} alt="" className="w-full h-[52px] object-cover rounded-sm" />
                            <button
                              onClick={(e) => { e.stopPropagation(); removeGallery(i) }}
                              className="absolute top-0.5 right-0.5 bg-black/50 text-white rounded-full w-4 h-4 text-[10px] items-center justify-center hidden group-hover:flex"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                        <div
                          onClick={(e) => { e.stopPropagation(); galleryRef.current?.click() }}
                          className="w-full h-[52px] border border-dashed border-gray-300 rounded-sm flex items-center justify-center text-gray-400 text-lg hover:border-[#8B1A1A] hover:text-[#8B1A1A] transition-colors"
                        >
                          +
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={(e) => { e.stopPropagation(); galleryRef.current?.click() }}
                        className="bg-[#8B1A1A] text-white text-sm font-semibold px-4 py-2 rounded-sm flex items-center gap-1.5 hover:bg-[#6B1212] transition-colors"
                      >
                        Add Images
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    )}
                  </div>
                  <input
                    ref={galleryRef}
                    type="file"
                    accept="image/jpeg,image/png,image/gif,image/webp"
                    multiple
                    className="hidden"
                    onChange={handleGalleryChange}
                  />
                </div>
              </div>

              {/* Save */}
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 bg-[#8B1A1A] hover:bg-[#6B1212] disabled:opacity-60 text-white text-sm font-semibold px-5 py-2.5 rounded transition-colors"
              >
                {saving ? (
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {saving ? 'Menyimpan...' : 'Save Changes'}
              </button>
            </div>
          </main>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium shadow-md
          ${toast.type === 'success'
            ? 'bg-white border border-green-200 text-green-800'
            : 'bg-white border border-red-200 text-red-800'}`}
        >
          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
          {toast.msg}
        </div>
      )}
    </div>
  )
}