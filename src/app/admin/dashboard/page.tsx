'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { authApi } from 'lib/api/auth'
import AdminSidebar from 'components/ui/AdminSidebar'
import Image from 'next/image'
import type { ApiResponse, PaginatedResponse, Portfolio, User } from 'types'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'

export default function AdminDashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [portfolios, setPortfolios] = useState<Portfolio[]>([])
  const [portfolioLoading, setPortfolioLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const checkAuth = useCallback(async () => {
    try {
      const response = await authApi.getCurrentUser()
      if (response.success) {
        setUser(response.data)
      } else {
        router.push('/admin/login')
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      router.push('/admin/login')
    } finally {
      setLoading(false)
    }
  }, [router])

  const fetchPortfolios = useCallback(async () => {
    setPortfolioLoading(true)
    setErrorMsg(null)
    try {
      const res = await fetch(`${API_BASE}/api/portfolios`, {
        credentials: 'include',
      })
      const json: ApiResponse<PaginatedResponse<Portfolio>> = await res.json()

      if (json.success) {
        setPortfolios(json.data.data) // json.data = paginator object, .data = actual array
      } else {
        setErrorMsg(json.message)
        setPortfolios([])
      }
    } catch (err) {
      console.error('Failed to fetch portfolios:', err)
      setErrorMsg('Failed to load portfolios from API.')
      setPortfolios([])
    } finally {
      setPortfolioLoading(false)
    }
  }, [])

  useEffect(() => {
    checkAuth()
    fetchPortfolios()
  }, [checkAuth, fetchPortfolios])

  const handleNewEntry = () => {
    router.push('/admin/portfolio/new')
  }

  const handleEdit = (id: number) => {
    router.push(`/admin/portfolio/${id}/edit`)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this portfolio entry?')) return
    try {
      const res = await fetch(`${API_BASE}/api/admin/portfolios/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      if (res.ok) {
        setPortfolios((prev) => prev.filter((p) => p.id !== id))
      } else {
        alert('Failed to delete portfolio.')
      }
    } catch (err) {
      console.error('Delete error:', err)
    }
  }

  const handleLogout = async () => {
    try {
      await authApi.logout()
      router.push('/admin/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

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

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar onLogout={handleLogout} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-8 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex items-center gap-3">
            <div className="text-sm text-right">
              <p className="text-gray-500 text-xs">Logged in as</p>
              <p className="font-semibold text-gray-900">{user?.name}</p>
            </div>
          </div>
        </header>

        <main className="flex-1 px-8 py-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              label="Total Portfolios"
              value={portfolios.length}
              bgColor="bg-red-100"
              textColor="text-red-600"
              icon={
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              }
            />
            <StatCard
              label="Messages"
              value={12}
              bgColor="bg-blue-100"
              textColor="text-blue-600"
              icon={
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              }
            />
            <StatCard
              label="Subscribers"
              value={156}
              bgColor="bg-green-100"
              textColor="text-green-600"
              icon={
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              }
            />
            <StatCard
              label="Blog Posts"
              value={8}
              bgColor="bg-purple-100"
              textColor="text-purple-600"
              icon={
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              }
            />
          </div>

          {/* Portfolio Section */}
          <div className="bg-white rounded-lg shadow p-6">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-gray-900">Portfolio</h2>
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <button
                onClick={handleNewEntry}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#8B1A1A] hover:bg-red-800 text-white text-sm font-semibold rounded-md transition-colors"
              >
                New Entry
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>

            {/* Error */}
            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
                {errorMsg}
                <button onClick={fetchPortfolios} className="ml-2 underline font-medium">Retry</button>
              </div>
            )}

            {/* Portfolio Cards List */}
            {portfolioLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600" />
              </div>
            ) : portfolios.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="font-medium">No portfolio entries yet.</p>
                <p className="text-sm mt-1">Click New Entry to add one.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {portfolios.map((portfolio) => (
                  <PortfolioCard
                    key={portfolio.id}
                    portfolio={portfolio}
                    onEdit={() => handleEdit(portfolio.id)}
                    onDelete={() => handleDelete(portfolio.id)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Welcome Banner */}
          <div className="mt-8 bg-linear-to-r from-red-600 to-red-900 rounded-lg shadow p-8 text-white">
            <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.name}! 👋</h2>
            <p className="text-red-100 text-sm">
              You are logged in as the superadmin. You have full access to manage the Digital Forte Indonesia website.
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}

// ── Sub-components ─────────────────────────────────────────────

function StatCard({
  label,
  value,
  bgColor,
  textColor,
  icon,
}: {
  label: string
  value: number
  bgColor: string
  textColor: string
  icon: React.ReactNode
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className={`p-3 ${bgColor} rounded-lg`}>
          <svg className={`w-6 h-6 ${textColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {icon}
          </svg>
        </div>
        <div className="ml-4">
          <p className="text-sm text-gray-600">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  )
}

function PortfolioCard({
  portfolio,
  onEdit,
  onDelete,
}: {
  portfolio: Portfolio
  onEdit: () => void
  onDelete: () => void
}) {
  return (
    <div className="flex items-center justify-between bg-[#8B1A1A] text-white rounded-md px-5 py-4">
      <div className="flex items-center gap-4 min-w-0">
        {portfolio.image && (
          <Image
            src={`${API_BASE}/storage/${portfolio.image}`}
            alt={portfolio.title}
            width={48}
            height={48}
            className="rounded object-cover shrink-0 opacity-90"
          />
        )}
        <div className="min-w-0">
          <p className="font-semibold text-base truncate">{portfolio.title}</p>
          {portfolio.description && (
            <p className="text-red-200 text-xs mt-0.5 truncate">{portfolio.description}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 ml-4 shrink-0">
        {/* Edit */}
        <button
          onClick={onEdit}
          className="p-1.5 rounded hover:bg-red-700 transition-colors"
          title="Edit"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>
        {/* Delete */}
        <button
          onClick={onDelete}
          className="p-1.5 rounded hover:bg-red-900 transition-colors"
          title="Delete"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}