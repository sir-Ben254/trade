/**
 * Authentication Hook (NextAuth)
 * Purpose: Provide authentication state and methods throughout the app
 * Security: JWT token management, secure session handling
 * Performance: Optimistic UI updates, minimal re-renders
 */

'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'user' | 'premium' | 'vip' | 'admin'
  subscriptionTier: 'free' | 'premium' | 'vip'
  verified: boolean
  twoFactorEnabled: boolean
  createdAt: Date
}

interface UseAuthReturn {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  isAdmin: boolean
  isPremium: boolean
  isVIP: boolean
  login: (email: string, password: string, remember?: boolean) => Promise<void>
  loginWithGoogle: () => Promise<void>
  logout: () => Promise<void>
  register: (data: RegisterData) => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<void>
  enable2FA: () => Promise<string>
  disable2FA: (code: string) => Promise<void>
  verify2FA: (code: string) => Promise<boolean>
}

interface RegisterData {
  email: string
  password: string
  name: string
  referrerCode?: string
}

/**
 * Authentication context hook
 * Handles login, logout, registration, 2FA, profile updates
 */
export function useAuth(): UseAuthReturn {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // Map NextAuth session to our User type
  const user: User | null = session?.user
    ? {
        id: session.user.id || '',
        email: session.user.email || '',
        name: session.user.name || '',
        avatar: session.user.image || undefined,
        role: (session.user.role as User['role']) || 'user',
        subscriptionTier: (session.user.subscriptionTier as User['subscriptionTier']) || 'free',
        verified: session.user.verified || false,
        twoFactorEnabled: session.user.twoFactorEnabled || false,
        createdAt: session.user.createdAt ? new Date(session.user.createdAt) : new Date(),
      }
    : null

  const isAuthenticated = status === 'authenticated'
  const isAdmin = user?.role === 'admin'
  const isPremium = ['premium', 'vip', 'admin'].includes(user?.subscriptionTier || '')
  const isVIP = user?.subscriptionTier === 'vip'

  /**
   * Email/password login
   */
  const login = async (email: string, password: string, remember = false) => {
    setIsLoading(true)
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
        remember,
      })

      if (result?.error) {
        throw new Error(result.error)
      }

      // Successful login will trigger session update
      router.push('/dashboard')
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * OAuth login (Google)
   */
  const loginWithGoogle = async () => {
    setIsLoading(true)
    try {
      await signIn('google', { callbackUrl: '/dashboard' })
    } catch (error) {
      console.error('Google login failed:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Logout current user
   */
  const logout = async () => {
    setIsLoading(true)
    try {
      await signOut({ redirect: false })
      router.push('/')
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * User registration
   */
  const register = async (data: RegisterData) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Registration failed')
      }

      // Auto-login after registration
      await login(data.email, data.password, false)
    } catch (error) {
      console.error('Registration failed:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Update user profile
   */
  const updateProfile = async (data: Partial<User>) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to update profile')
      }

      // Session will be updated automatically via NextAuth
    } catch (error) {
      console.error('Profile update failed:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Enable 2FA - generates QR code
   */
  const enable2FA = async (): Promise<string> => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/2fa/enable', {
        method: 'POST',
        credentials: 'include',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to enable 2FA')
      }

      return data.qrCode // Returns QR code as data URL or secret
    } catch (error) {
      console.error('2FA enable failed:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Disable 2FA
   */
  const disable2FA = async (code: string) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/2fa/disable', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to disable 2FA')
      }
    } catch (error) {
      console.error('2FA disable failed:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Verify 2FA code during login
   */
  const verify2FA = async (code: string): Promise<boolean> => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        code,
        isTwoFactor: true,
      })

      return result?.ok ?? false
    } catch (error) {
      console.error('2FA verification failed:', error)
      return false
    }
  }

  return {
    user,
    isAuthenticated,
    isLoading: isLoading || status === 'loading',
    isAdmin,
    isPremium,
    isVIP,
    login,
    loginWithGoogle,
    logout,
    register,
    updateProfile,
    enable2FA,
    disable2FA,
    verify2FA,
  }
}
