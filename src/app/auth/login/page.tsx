/**
 * Login Page
 * Purpose: User authentication with email/password and OAuth
 * Security: Brute force protection, CSRF tokens, rate limiting
 * Features: Remember me, 2FA support, social login
 */

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Loader2, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const { login, isLoading } = useAuth()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [requires2FA, setRequires2FA] = useState(false)
  const [twoFactorCode, setTwoFactorCode] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      if (requires2FA) {
        const success = await login.verify2FA(twoFactorCode)
        if (success) {
          router.push('/dashboard')
        } else {
          setError('Invalid verification code')
        }
      } else {
        await login(formData.email, formData.password, formData.remember)
        // User will be redirected by login function
      }
    } catch (err: any) {
      if (err.message?.includes('2FA')) {
        setRequires2FA(true)
      } else {
        setError(err.message || 'Login failed. Please try again.')
      }
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await login.loginWithGoogle()
    } catch (error) {
      setError('Google login failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-dark-950 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-neon-blue/5 rounded-full filter blur-3xl animate-float opacity-30" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-neon-purple/5 rounded-full filter blur-3xl animate-float opacity-20" style={{ animationDelay: '2s' }} />
      </div>

      <Card className="relative z-10 w-full max-w-md glass">
        <CardHeader className="space-y-1 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl font-bold">F</span>
          </div>
          <CardTitle className="text-2xl font-display">
            Welcome to ForexPro
          </CardTitle>
          <CardDescription>
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error message */}
            {error && (
              <div className="p-3 rounded-lg bg-trading-down/10 border border-trading-down/20 text-trading-down text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* 2FA input */}
            {requires2FA && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-dark-200">
                  Two-Factor Authentication Code
                </label>
                <Input
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value)}
                  maxLength={6}
                  className="text-center text-2xl tracking-widest"
                  autoFocus
                />
                <p className="text-xs text-dark-400 text-center">
                  Open your authenticator app to get the code
                </p>
              </div>
            )}

            {/* Email field */}
            {!requires2FA && (
              <>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-dark-200">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Password field */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-sm font-medium text-dark-200">
                      Password
                    </label>
                    <Link href="/forgot-password" className="text-xs text-neon-blue hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Remember me */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.remember}
                      onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                      className="w-4 h-4 rounded border-dark-600 bg-dark-900 text-neon-blue focus:ring-neon-blue/50"
                    />
                    <span className="text-sm text-dark-300">Remember me</span>
                  </label>
                </div>
              </>
            )}

            {/* Submit button */}
            {requires2FA ? (
              <Button type="submit" className="w-full" disabled={isLoading || twoFactorCode.length !== 6}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Verify & Login'
                )}
              </Button>
            ) : (
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            )}
          </form>

          {/* Divider */}
          {!requires2FA && (
            <>
              <div className="relative my-6">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-2 bg-dark-900 text-dark-400 text-xs">
                  or continue with
                </span>
              </div>

              {/* Social login */}
              <Button
                variant="outline"
                className="w-full"
                onClick={handleGoogleLogin}
                disabled={isLoading}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>
            </>
          )}

          {/* Register link */}
          {!requires2FA && (
            <p className="text-center text-sm text-dark-400 mt-6">
              Don't have an account?{' '}
              <Link href="/register" className="text-neon-blue hover:underline font-medium">
                Sign up free
              </Link>
            </p>
          )}

          {/* Back to 2FA */}
          {requires2FA && (
            <button
              type="button"
              onClick={() => setRequires2FA(false)}
              className="w-full text-center text-sm text-neon-blue hover:underline mt-4"
            >
              Back to login
            </button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
