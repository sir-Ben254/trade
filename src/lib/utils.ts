/**
 * Utility function for className merging
 * Purpose: Combine conditional classes with Tailwind CSS
 * Dependencies: clsx for conditional logic, tailwind-merge for deduplication
 * Performance: Lightweight, O(n) where n is number of classes
 */

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges Tailwind CSS classes with automatic conflict resolution
 *
 * @param inputs - Array of class names (strings, objects, arrays)
 * @returns Merged class string with conflicts resolved
 *
 * @example
 * cn('px-4 py-2', 'bg-red-500', { 'bg-blue-500': isActive })
 * // Output: 'px-4 py-2 bg-red-500' or 'px-4 py-2 bg-blue-500'
 *
 * @example
 * cn('px-4', 'px-2') // 'px-2' (last wins, Tailwind conflict resolution)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * Format utility helpers
 */

export const formatCurrency = (amount: number, currency = 'USD', decimals = 2): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount)
}

export const formatPercentage = (value: number, decimals = 2): string => {
  const fixed = value.toFixed(decimals)
  return `${fixed}%`
}

export const formatNumber = (value: number, decimals = 2): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

export const formatCompactNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value)
}

export const formatDate = (date: Date | string, format = 'MMM dd, yyyy HH:mm'): string => {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(d)
}

export const formatTimeAgo = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000)

  if (diffInSeconds < 60) return 'just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`
  return formatDate(d)
}

/**
 * Color utilities for trading values
 */
export const getChangeColor = (change: number): string => {
  if (change > 0) return 'text-trading-up'
  if (change < 0) return 'text-trading-down'
  return 'text-trading-neutral'
}

export const getChangeBgColor = (change: number): string => {
  if (change > 0) return 'bg-trading-up/10 border-trading-up/20'
  if (change < 0) return 'bg-trading-down/10 border-trading-down/20'
  return 'bg-trading-neutral/10 border-trading-neutral/20'
}

/**
 * Generate unique ID
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Debounce function for performance
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), wait)
  }
}

/**
 * Throttle function for performance
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Safely convert string to number with fallback
 */
export const toNumber = (value: string | number | null | undefined, fallback = 0): number => {
  if (value === null || value === undefined) return fallback
  const num = typeof value === 'string' ? parseFloat(value) : value
  return isNaN(num) ? fallback : num
}

/**
 * Validate email address format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate currency pair format (e.g., EURUSD)
 */
export const isValidForexPair = (pair: string): boolean => {
  const pairRegex = /^[A-Z]{6}$/
  return pairRegex.test(pair.toUpperCase())
}

/**
 * Format forex pair for display
 */
export const formatForexPair = (pair: string): string => {
  const upper = pair.toUpperCase()
  if (upper.length === 6) {
    return `${upper.substring(0, 3)}/${upper.substring(3)}`
  }
  return upper
}

/**
 * Calculate profit/loss percentage
 */
export const calculatePercentageChange = (
  current: number,
  previous: number
): number => {
  if (previous === 0) return 0
  return ((current - previous) / previous) * 100
}

/**
 * Round to specific decimal places
 */
export const roundTo = (value: number, decimals = 2): number => {
  const factor = Math.pow(10, decimals)
  return Math.round(value * factor) / factor
}

/**
 * Format pips (for forex)
 */
export const formatPips = (pips: number, precision = 1): string => {
  return `${pips.toFixed(precision)} pips`
}
