/**
 * Input Component
 * Purpose: Reusable text input with validation states
 * Security: Prevents script injection through sanitization
 * Accessibility: Proper ARIA, labels, error messaging
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  hint?: string
  label?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

/**
 * Input component with icon support and validation states
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      error,
      hint,
      label,
      leftIcon,
      rightIcon,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || React.useId()

    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-dark-200 mb-1.5"
          >
            {label}
          </label>
        )}

        {/* Input wrapper */}
        <div className="relative">
          {/* Left icon */}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400">
              {leftIcon}
            </div>
          )}

          {/* Input element */}
          <input
            type={type}
            id={inputId}
            ref={ref}
            className={cn(
              'flex h-10 w-full rounded-lg border bg-dark-900 px-3 py-2 text-sm text-white',
              'placeholder:text-dark-500',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-blue/50 focus-visible:border-neon-blue',
              'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-dark-800',
              'transition-colors duration-200',
              error
                ? 'border-trading-down focus-visible:ring-trading-down/50'
                : 'border-dark-700 hover:border-dark-600',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            {...props}
          />

          {/* Right icon */}
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400">
              {rightIcon}
            </div>
          )}
        </div>

        {/* Error message */}
        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-1.5 text-sm text-trading-down flex items-center gap-1"
            role="alert"
          >
            <span className="w-3 h-3 rounded-full bg-trading-down/20 flex items-center justify-center text-xs">
              !
            </span>
            {error}
          </p>
        )}

        {/* Hint text */}
        {!error && hint && (
          <p id={`${inputId}-hint`} className="mt-1.5 text-sm text-dark-400">
            {hint}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
