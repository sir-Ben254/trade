/**
 * Providers Component
 * Purpose: Wrap application with necessary context providers
 * Security: Session and auth security handled
 * Performance: Reduces unnecessary re-renders
 */

'use client'

import { SessionProvider } from 'next-auth/react'
import { QueryProvider } from '@/components/providers/query-provider'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { SocketProvider } from '@/components/providers/socket-provider'
import { NotificationProvider } from '@/components/providers/notification-provider'

interface ProvidersProps {
  children: React.ReactNode
  session?: any // Replace with proper NextAuth session type
}

/**
 * Main providers wrapper component
 * Combines all context providers with proper ordering
 */
export function Providers({ children, session }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <SessionProvider session={session}>
        <QueryProvider>
          <SocketProvider>
            <NotificationProvider>
              {children}
            </NotificationProvider>
          </SocketProvider>
        </QueryProvider>
      </SessionProvider>
    </ThemeProvider>
  )
}

