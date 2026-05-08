/**
 * Switch/Toggle Component
 * Purpose: Binary on/off toggle control
 * Accessibility: Proper ARIA switch role, keyboard support
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface SwitchProps {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  label?: string
  description?: string
  className?: string
}

/**
 * Toggle switch component for binary settings
 */
export function Switch({
  checked,
  onCheckedChange,
  disabled = false,
  size = 'md',
  label,
  description,
  className,
}: SwitchProps) {
  const sizes = {
    sm: {
      track: 'w-8 h-4',
      thumb: 'w-3 h-3',
      translate: 'translate-x-4',
    },
    md: {
      track: 'w-11 h-6',
      thumb: 'w-5 h-5',
      translate: 'translate-x-5',
    },
    lg: {
      track: 'w-14 h-7',
      thumb: 'w-6 h-6',
      translate: 'translate-x-7',
    },
  }

  const sizeConfig = sizes[size]

  return (
    <div className={cn('flex items-start gap-3', className)}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onCheckedChange(!checked)}
        className={cn(
          'relative inline-flex flex-shrink-0 rounded-full transition-colors duration-200 ease-in-out',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-blue/50 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-950',
          disabled && 'opacity-50 cursor-not-allowed',
          sizeConfig.track,
          checked ? 'bg-neon-blue' : 'bg-dark-700'
        )}
      >
        <span
          className={cn(
            'pointer-events-none inline-block rounded-full shadow-lg transform transition-transform duration-200 ease-in-out',
            sizeConfig.thumb,
            checked ? sizeConfig.translate : 'translate-x-1',
            'mt-0.5 ml-0.5'
          )}
          style={{ backgroundColor: 'var(--color-white)' }}
          aria-hidden="true"
        />
      </button>

      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <span
              className={cn(
                'text-sm font-medium',
                disabled ? 'text-dark-500' : 'text-white'
              )}
            >
              {label}
            </span>
          )}
          {description && (
            <span className="text-xs text-dark-400">{description}</span>
          )}
        </div>
      )}
    </div>
  )
}

Switch.displayName = 'Switch'

export { Switch }
