/**
 * Separator Component
 * Purpose: Visual divider between content sections
 */

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical'
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, orientation = 'horizontal', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'shrink-0 bg-dark-800',
          orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]'
        )}
        {...props}
      />
    )
  }
)

Separator.displayName = 'Separator'

export { Separator }
