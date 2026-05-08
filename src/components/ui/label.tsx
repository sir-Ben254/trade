/**
 * Label Component
 * Purpose: Form label with support for error states and required indicator
 * Accessibility: Proper label-for association
 */

import * as React from 'react'
import { cn } from '@/lib/utils'

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  error?: boolean
  required?: boolean
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, error, required, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          'text-sm font-medium leading-none',
          error ? 'text-trading-down' : 'text-dark-200',
          className
        )}
        {...props}
      >
        {children}
        {required && <span className="text-trading-down ml-1">*</span>}
      </label>
    )
  }
)

Label.displayName = 'Label'

export { Label }
