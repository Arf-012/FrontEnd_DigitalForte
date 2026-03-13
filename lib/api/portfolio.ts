// lib/api/portfolio.ts

import { apiCore } from './core'
import type {
  ApiResponse,
  PaginatedResponse,
  Portfolio,
} from 'types'

interface PortfolioPayload {
  title: string
  description: string
  image: string
}

export const portfolioApi = {
  getAll: (): Promise<ApiResponse<PaginatedResponse<Portfolio>>> =>
    apiCore.get<PaginatedResponse<Portfolio>>('/portfolios'),

  getById: (
    id: number
  ): Promise<ApiResponse<Portfolio>> =>
    apiCore.get<Portfolio>(`/portfolios/${id}`),

  getByCategory: (
    category: string
  ): Promise<ApiResponse<PaginatedResponse<Portfolio>>> =>
    apiCore.get<PaginatedResponse<Portfolio>>(
      `/portfolios?category=${category}`
    ),

  create: (
    data: PortfolioPayload
  ): Promise<ApiResponse<Portfolio>> =>
    apiCore.post<Portfolio>('/portfolios', data, true),

  update: (
    id: number,
    data: PortfolioPayload
  ): Promise<ApiResponse<Portfolio>> =>
    apiCore.put<Portfolio>(
      `/portfolios/${id}`,
      data,
      true
    ),

  delete: (
    id: number
  ): Promise<ApiResponse<null>> =>
    apiCore.delete<null>(`/portfolios/${id}`, true),
}