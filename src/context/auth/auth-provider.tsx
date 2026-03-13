"use client"

import { useEffect, useState } from "react"
import { AuthContext } from "./auth-context"

import { authApi } from "lib/api/auth"
import type { User, AuthContextType } from "types"

interface Props {
  children: React.ReactNode
}

export function AuthProvider({ children }: Props) {

  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const isAuthenticated = !!user

  async function refreshUser() {
    try {
      const response = await authApi.getCurrentUser()

      if (response.success) {
        setUser(response.data)
      }
    } catch {
      setUser(null)
    }
  }

  async function login(name: string, password: string) {

    const response = await authApi.login({
      name,
      password
    })

    if (!response.success) {
      throw new Error("Login failed")
    }

    await refreshUser()
  }

  async function logout() {

    try {
      await authApi.logout()
    } catch {
      // ignore network errors
    }

    setUser(null)
  }

  useEffect(() => {

    async function initAuth() {

      const token = localStorage.getItem("auth_token")

      if (!token) {
        setIsLoading(false)
        return
      }

      await refreshUser()
      setIsLoading(false)
    }

    initAuth()

  }, [])

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    refreshUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}