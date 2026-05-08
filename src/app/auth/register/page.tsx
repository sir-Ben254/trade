/**
 * Register Page
 * Purpose: New user registration with referral tracking
 * Security: Password strength validation, email verification, captcha (optional)
 */

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Loader2, Mail, Lock, User, Eye, EyeOff, Gift, AlertCircle } from 'lucide-react'
import { isValidEmail } from '@/lib/utils'

export default function RegisterPage() {
  const router = useRouter()
  const { register, isLoading } = useAuth()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    agreeToMarketing: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [referralCode, setReferralCode] = useState('')

  // Password strength
  const passwordStrength = calculatePasswordStrength(formData.password)
  const passwordsMatch = formData.password === formData.confirmPassword

  // Get referral code from URL if present
  useState(() => {
    const params = new URLSearchParams(window.location.search)
    const ref = params.get('ref')
    if (ref) setReferralCode(ref)
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!formData.name || formData.name.length < 2) {
      setError('Please enter your full name')
      return
    }

    if (!isValidEmail(formData.email)) {
      setError('Please enter a valid email address')
      return
    }

    if (passwordStrength < 3) {
      setError('Please choose a stronger password')
      return
    }

    if (!passwordsMatch) {
      setError('Passwords do not match')
      return
    }

    if (!formData.agreeToTerms) {
      setError('You must agree to the terms and conditions')
      return
    }

    try {
      await register({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        referrerCode: referralCode || undefined,
      })
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-dark-950 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 right-10 w-64 h-64 bg-neon-purple/5 rounded-full filter blur-3xl animate-float opacity-30" />
        <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-neon-green/5 rounded-full filter blur-3xl animate-float opacity-20" style={{ animationDelay: '2s' }} />
      </div>

      <Card className="relative z-10 w-full max-w-md glass">
        <CardHeader className="space-y-1 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-green to-neon-blue flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl font-bold">+</span>
          </div>
          <CardTitle className="text-2xl font-display">Create Your Account</CardTitle>
          <CardDescription>
            Join thousands of traders on ForexPro
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

            {/* Name field */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-dark-200">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Email field */}
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
              <label htmlFor="password" className="text-sm font-medium text-dark-200">
                Password
              </label>
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

              {/* Password strength indicator */}
              {formData.password && (
                <div className="space-y-1">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={cn(
                          'h-1 flex-1 rounded-full transition-colors',
                          passwordStrength >= level
                            ? passwordStrength === 4
                              ? 'bg-trading-up'
                              : passwordStrength === 3
                              ? 'bg-neon-blue'
                              : 'bg-trading-neutral'
                            : 'bg-dark-700'
                        )}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-dark-400">
                    {passwordStrength === 0 && 'Enter a password'}
                    {passwordStrength === 1 && 'Weak - add numbers and symbols'}
                    {passwordStrength === 2 && 'Fair - add uppercase letters'}
                    {passwordStrength === 3 && 'Good - strong password'}
                    {passwordStrength === 4 && 'Excellent - very strong password'}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm password */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-dark-200">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
                <Input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className={cn(
                    'pl-10',
                    formData.confirmPassword && !passwordsMatch && 'border-trading-down focus:border-trading-down'
                  )}
                  required
                />
              </div>
              {formData.confirmPassword && !passwordsMatch && (
                <p className="text-xs text-trading-down">Passwords do not match</p>
              )}
            </div>

            {/* Referral code */}
            {referralCode && (
              <div className="p-3 rounded-lg bg-neon-blue/10 border border-neon-blue/20">
                <div className="flex items-center gap-2">
                  <Gift className="w-4 h-4 text-neon-blue" />
                  <p className="text-sm">
                    You were referred by a friend! Use code{' '}
                    <span className="font-mono font-bold text-neon-blue">{referralCode}</span>
                  </p>
                </div>
              </div>
            )}

            {/* Terms agreement */}
            <div className="space-y-3">
              <label className="flex items-start gap-2 cursor-pointer">
                <Checkbox
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, agreeToTerms: checked as boolean })
                  }
                  required
                />
                <span className="text-sm text-dark-300">
                  I agree to the{' '}
                  <Link href="/terms" className="text-neon-blue hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-neon-blue hover:underline">
                    Privacy Policy
                  </Link>
                </span>
              </label>

              <label className="flex items-start gap-2 cursor-pointer">
                <Checkbox
                  checked={formData.agreeToMarketing}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, agreeToMarketing: checked as boolean })
                  }
                />
                <span className="text-sm text-dark-300">
                  I want to receive marketing emails and product updates
                </span>
              </label>
            </div>

            {/* Submit button */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </Button>
          </form>

          {/* Login link */}
          <p className="text-center text-sm text-dark-400 mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-neon-blue hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

/**
 * Calculate password strength (0-4)
 */
function calculatePasswordStrength(password: string): number {
  let strength = 0

  if (password.length >= 8) strength++
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
  if (/\d/.test(password)) strength++
  if (/[^a-zA-Z0-9]/.test(password)) strength++

  return strength
}
