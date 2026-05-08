/**
 * Avatar Component
 * Purpose: User avatar with fallback initials
 * Features: Multiple sizes, status indicator, online/offline badge
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface AvatarProps {
  src?: string | null
  alt?: string
  name?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  showStatus?: boolean
  isOnline?: boolean
  className?: string
}

/**
 * Avatar component with fallback initials and status indicator
 */
export function Avatar({
  src,
  alt = '',
  name = '',
  size = 'md',
  showStatus = false,
  isOnline = false,
  className,
}: AvatarProps) {
  const [imgError, setImgError] = React.useState(!src)

  // Generate initials from name
  const initials = React.useMemo(() => {
    if (!name) return '?'
    const parts = name.trim().split(' ')
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }, [name])

  // Size configurations
  const sizes = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
    '2xl': 'w-20 h-20 text-xl',
  }

  const statusSizes = {
    xs: 'w-2 h-2',
    sm: 'w-2.5 h-2.5',
    md: 'w-3 h-3',
    lg: 'w-3.5 h-3.5',
    xl: 'w-4 h-4',
    '2xl': 'w-5 h-5',
  }

  return (
    <div className={cn('relative inline-block', className)}>
      <div
        className={cn(
          'rounded-full flex items-center justify-center font-medium overflow-hidden',
          'bg-gradient-to-br from-neon-blue to-neon-purple text-white',
          'ring-2 ring-dark-800',
          sizes[size]
        )}
      >
        {!imgError && src ? (
          <img
            src={src}
            alt={alt || name}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="truncate px-1">{initials}</span>
        )}
      </div>

      {/* Online status indicator */}
      {showStatus && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full border-2 border-dark-800',
            statusSizes[size],
            isOnline ? 'bg-trading-up' : 'bg-dark-500'
          )}
          aria-label={isOnline ? 'Online' : 'Offline'}
        />
      )}
    </div>
  )
}

Avatar.displayName = 'Avatar'

export { Avatar }
