/**
 * Textarea Component
 * Purpose: Multi-line text input with validation
 * Accessibility: Proper ARIA labels, resize handling
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string
  label?: string
}

/**
 * Textarea with validation states
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, label, id, ...props }, ref) => {
    const textareaId = id || React.useId()

    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-dark-200 mb-1.5"
          >
            {label}
          </label>
        )}

        {/* Textarea */}
        <textarea
          id={textareaId}
          ref={ref}
          className={cn(
            'flex min-h-[80px] w-full rounded-lg border bg-dark-900 px-3 py-2 text-sm text-white',
            'placeholder:text-dark-500',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-blue/50 focus-visible:border-neon-blue',
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-dark-800',
            'transition-colors duration-200 resize-y',
            error
              ? 'border-trading-down focus-visible:ring-trading-down/50'
              : 'border-dark-700 hover:border-dark-600',
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${textareaId}-error` : undefined}
          {...props}
        />

        {/* Error message */}
        {error && (
          <p
            id={`${textareaId}-error`}
            className="mt-1.5 text-sm text-trading-down flex items-center gap-1"
            role="alert"
          >
            <span className="w-3 h-3 rounded-full bg-trading-down/20 flex items-center justify-center text-xs">
              !
            </span>
            {error}
          </p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

export { Textarea }
