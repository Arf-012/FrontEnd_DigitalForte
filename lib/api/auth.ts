// lib/api/auth.ts

import { apiCore } from './core'
import type { ApiResponse, User, LoginResponse } from 'types'

export const authApi = {
  login: async (
    credentials: { name: string; password: string }
  ): Promise<ApiResponse<LoginResponse>> => {
    const response = await apiCore.post<LoginResponse>(
      '/admin/login',
      credentials
    )

    if (response.success) {
      localStorage.setItem('auth_token', response.data.token)
    }

    return response
  },

  logout: async (): Promise<ApiResponse<null>> => {
    const response = await apiCore.post<null>(
      '/admin/logout',
      {},
      true
    )

    localStorage.removeItem('auth_token')

    return response
  },

  getCurrentUser: (): Promise<ApiResponse<User>> =>
    apiCore.get<User>('/admin/me', true),
}