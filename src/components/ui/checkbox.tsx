/**
 * Checkbox Component
 * Purpose: Checkbox input with custom styling
 * Accessibility: Proper ARIA, keyboard support
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onCheckedChange?: (checked: boolean) => void
  checked?: boolean
  defaultChecked?: boolean
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      onCheckedChange,
      checked,
      defaultChecked,
      disabled,
      ...props
    },
    ref
  ) => {
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked || false)
    const isControlled = checked !== undefined
    const isChecked = isControlled ? checked : internalChecked

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = e.target.checked

      if (!isControlled) {
        setInternalChecked(newChecked)
      }

      onCheckedChange?.(newChecked)
    }

    return (
      <div className="relative flex items-center">
        <input
          type="checkbox"
          ref={ref}
          checked={isChecked}
          onChange={handleChange}
          disabled={disabled}
          className={cn(
            'peer h-4 w-4 appearance-none rounded border border-dark-600 bg-dark-900',
            'checked:bg-neon-blue checked:border-neon-blue',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-blue/50 focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'transition-colors cursor-pointer',
            className
          )}
          {...props}
        />
        {/* Custom checkmark */}
        <svg
          className="pointer-events-none absolute left-0 top-0 h-4 w-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path
            d="M2 6L5 9L10 3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'

export { Checkbox }
