import type { ApiResponse } from 'types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'
const defaultHeaders: HeadersInit = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
}

function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('auth_token')
}

function buildHeaders(useAuth: boolean): HeadersInit {
  if (!useAuth) return defaultHeaders

  const token = getAuthToken()

  return token
    ? { ...defaultHeaders, Authorization: `Bearer ${token}` }
    : defaultHeaders
}

async function request<T>(
  endpoint: string,
  options: {
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
    body?: unknown
    useAuth?: boolean
  }
): Promise<ApiResponse<T>> {
  const { method, body, useAuth = false } = options

  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: buildHeaders(useAuth),
    body: body ? JSON.stringify(body) : undefined,
  })

  const json = await response.json()

  if (!response.ok) {
    throw new Error(json.message || 'Request failed')
  }

  return json as ApiResponse<T>
}

export const apiCore = {
  get: <T>(endpoint: string, useAuth = false) =>
    request<T>(endpoint, { method: 'GET', useAuth }),

  post: <T>(endpoint: string, body: unknown, useAuth = false) =>
    request<T>(endpoint, { method: 'POST', body, useAuth }),

  put: <T>(endpoint: string, body: unknown, useAuth = false) =>
    request<T>(endpoint, { method: 'PUT', body, useAuth }),

  patch: <T>(endpoint: string, body: unknown, useAuth = false) =>
    request<T>(endpoint, { method: 'PATCH', body, useAuth }),

  delete: <T>(endpoint: string, useAuth = false) =>
    request<T>(endpoint, { method: 'DELETE', useAuth }),
}