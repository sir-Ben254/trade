/**
 * Toast Provider (react-hot-toast wrapper)
 * Purpose: Global toast notification system
 * Accessibility: ARIA live regions for screen readers
 */

'use client'

import { Toaster as HotToaster } from 'react-hot-toast'
import { cn } from '@/lib/utils'

/**
 * Toast container with custom styling
 */
export function Toaster() {
  return (
    <HotToaster
      position="top-right"
      toastOptions={{
        className: cn(
          'glass border border-dark-700 shadow-2xl rounded-lg pointer-events-auto',
          'dark:bg-dark-900/90 dark:border-dark-700'
        ),
        duration: 4000,
        style: {
          background: 'rgba(26, 26, 26, 0.9)',
          color: '#fff',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
        },
        success: {
          iconTheme: {
            primary: '#00c853',
            secondary: '#fff',
          },
        },
        error: {
          iconTheme: {
            primary: '#ff5252',
            secondary: '#fff',
          },
        },
      }}
    />
  )
}
