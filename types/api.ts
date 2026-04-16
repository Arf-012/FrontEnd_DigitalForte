// =============================================================================
// API TYPES
// =============================================================================

// ==========================
// API Envelope
// ==========================

export interface ApiSuccess<T> {
  success: true
  message: string
  data: T
}

export interface ApiError {
  success: false
  message: string
  data?: unknown
  code?: string
  errors?: unknown
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError

// ==========================
// Pagination
// ==========================

export interface PaginatedResponse<T> {
  current_page: number
  data: T[]
  first_page_url: string
  from: number | null
  last_page: number
  last_page_url: string
  next_page_url: string | null
  path: string
  per_page: number
  prev_page_url: string | null
  to: number | null
  total: number
}

// ==========================
// Portfolio
// ==========================

export interface Portfolio {
  id: number
  title: string
  description: string
  image: string
  galleries: { id: number; image: string }[]
  created_at: string
  updated_at: string
}

// ==========================
// File Upload 
// ==========================

export interface FileUploadData {
  fileUrl: string
  fileName: string
  fileSize: number
}
