/**
 * Badge Component
 * Purpose: Small status indicators and labels
 * Variants: default, secondary, success, warning, error, info
 */

import * as React from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'profit' | 'loss'
  size?: 'sm' | 'md'
  dot?: boolean
  pulse?: boolean
}

/**
 * Badge component for status indicators
 * Shows small colored labels with optional dot indicator
 */
const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant = 'default',
      size = 'md',
      dot = false,
      pulse = false,
      children,
      ...props
    },
    ref
  ) => {
    const variants = {
      default: 'bg-dark-800 text-dark-200 border-dark-700',
      secondary: 'bg-dark-700 text-dark-200 border-dark-600',
      success: 'bg-trading-up/10 text-trading-up border-trading-up/20',
      warning: 'bg-trading-neutral/10 text-trading-neutral border-trading-neutral/20',
      error: 'bg-trading-down/10 text-trading-down border-trading-down/20',
      info: 'bg-neon-blue/10 text-neon-blue border-neon-blue/20',
      profit: 'bg-trading-up/15 text-trading-up border-trading-up/30 shadow-[0_0_10px_rgba(0,200,83,0.2)]',
      loss: 'bg-trading-down/15 text-trading-down border-trading-down/30 shadow-[0_0_10px_rgba(255,82,82,0.2)]',
    }

    const sizes = {
      sm: 'px-1.5 py-0.5 text-[10px]',
      md: 'px-2 py-1 text-xs',
    }

    const dotColors = {
      default: 'bg-dark-400',
      secondary: 'bg-dark-500',
      success: 'bg-trading-up',
      warning: 'bg-trading-neutral',
      error: 'bg-trading-down',
      info: 'bg-neon-blue',
      profit: 'bg-trading-up',
      loss: 'bg-trading-down',
    }

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1.5 border rounded-full font-medium whitespace-nowrap',
          'transition-all duration-200',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {/* Pulse dot */}
        {dot && (
          <span
            className={cn(
              'w-1.5 h-1.5 rounded-full',
              dotColors[variant],
              pulse && 'animate-pulse'
            )}
          />
        )}
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

export { Badge }
