/**
 * Skeleton Loader Component
 * Purpose: Loading state placeholder
 * Features: Shimmer animation, multiple variants
 */

import * as React from 'react'
import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded'
  width?: string | number
  height?: string | number
  animation?: 'pulse' | 'wave' | 'none'
}

/**
 * Skeleton loader component for loading states
 * Used throughout the app during data fetching
 */
export function Skeleton({
  className,
  variant = 'text',
  width,
  height,
  animation = 'wave',
}: SkeletonProps) {
  const variants = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-none',
    rounded: 'rounded-lg',
  }

  const animations = {
    pulse: 'animate-pulse',
    wave: 'skeleton',
    none: '',
  }

  return (
    <div
      className={cn(
        'bg-dark-800',
        variants[variant],
        animations[animation],
        className
      )}
      style={{
        width: width ?? (variant === 'circular' ? '40px' : '100%'),
        height: height ?? (variant === 'text' ? '1rem' : variant === 'circular' ? '40px' : '100px'),
      }}
      aria-hidden="true"
    />
  )
}

/**
 * Card skeleton for loading card components
 */
export function CardSkeleton() {
  return (
    <div className="glass rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-8 w-8 rounded" />
      </div>
      <Skeleton className="h-8 w-2/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <div className="pt-4 border-t border-dark-800">
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  )
}

/**
 * Table row skeleton
 */
export function TableRowSkeleton({ columns = 5 }: { columns?: number }) {
  return (
    <div className="flex items-center gap-4 p-4 border-b border-dark-800">
      {Array.from({ length: columns }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            'h-4',
            i === 0 ? 'flex-1' : i === columns - 1 ? 'w-20' : 'w-32'
          )}
        />
      ))}
    </div>
  )
}

/**
 * Chart skeleton
 */
export function ChartSkeleton() {
  return (
    <div className="w-full h-[300px] flex items-end justify-between gap-1 px-4">
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="flex-1 bg-dark-800 rounded-t animate-pulse"
          style={{
            height: `${Math.random() * 80 + 20}%`,
            animationDelay: `${i * 0.05}s`,
          }}
        />
      ))}
    </div>
  )
}

export { Skeleton }
