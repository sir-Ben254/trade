/**
 * Progress Component
 * Purpose: Progress indicator for loading states
 * Variants: linear (bar), circular (spinner), animated
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface ProgressProps {
  value: number // 0-100
  max?: number
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'success' | 'warning' | 'danger'
  showLabel?: boolean
  animated?: boolean
  className?: string
}

/**
 * Linear progress bar with optional animation
 */
export function Progress({
  value,
  max = 100,
  size = 'md',
  variant = 'default',
  showLabel = false,
  animated = true,
  className,
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  }

  const variants = {
    default: 'bg-neon-blue',
    success: 'bg-trading-up',
    warning: 'bg-trading-neutral',
    danger: 'bg-trading-down',
  }

  return (
    <div className={cn('w-full', className)}>
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        className={cn(
          'w-full bg-dark-800 rounded-full overflow-hidden',
          sizes[size]
        )}
      >
        <div
          className={cn(
            'h-full rounded-full transition-all duration-300 ease-out',
            variants[variant],
            animated && 'progress-animated'
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {showLabel && (
        <div className="mt-1 text-right text-xs text-dark-400 font-mono">
          {Math.round(percentage)}%
        </div>
      )}
    </div>
  )
}

/**
 * Circular progress indicator
 */
export function CircularProgress({
  value,
  max = 100,
  size = 48,
  strokeWidth = 4,
  variant = 'default',
  label,
}: {
  value: number
  max?: number
  size?: number
  strokeWidth?: number
  variant?: 'default' | 'success' | 'warning' | 'danger'
  label?: React.ReactNode
}) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (percentage / 100) * circumference

  const variants = {
    default: 'text-neon-blue',
    success: 'text-trading-up',
    warning: 'text-trading-neutral',
    danger: 'text-trading-down',
  }

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
        aria-label={`Progress: ${Math.round(percentage)}%`}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-dark-800"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className={cn('transition-all duration-300', variants[variant])}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>

      {/* Optional label in center */}
      {label && (
        <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
          {label}
        </div>
      )}
    </div>
  )
}

Progress.displayName = 'Progress'
CircularProgress.displayName = 'CircularProgress'

export { Progress, CircularProgress }
