/**
 * Query Provider (TanStack Query v5)
 * Purpose: Global state management for server state
 * Security: Secure cache configuration with isolation
 * Performance: Stale time and GC settings optimized for trading data
 */

'use client'

import { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  QueryClientProvider,
  DefaultOptions,
} from '@tanstack/react-query'
import { useState } from 'react'
import { logger } from '@/lib/logger'

/**
 * React Query default configuration optimized for real-time trading data
 * - Stale time: 30 seconds for market data (keeps UI responsive)
 * - Cache time: 5 minutes (reduces API calls)
 * - Retry: 3 attempts for critical data
 * - Refetch on window focus: false (trading apps shouldn't auto-refresh)
 */
const defaultOptions: Partial<DefaultOptions> = {
  queries: {
    staleTime: 1000 * 30, // 30 seconds
    gcTime: 1000 * 60 * 5, // 5 minutes (previously cacheTime)
    retry: 3,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchOnMount: true,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  },
  mutations: {
    retry: 1,
    retryDelay: 1000,
  },
}

/**
 * Query Provider Component
 * Creates a new QueryClient for each session to prevent state leakage
 */
export function QueryProvider({
  children,
}: {
  children: React.ReactNode
}) {
  // Create a new QueryClient for each session to prevent cache pollution
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions,
        logger: {
          log: console.log,
          warn: console.warn,
          error: (error) => {
            logger.error('React Query Error:', error)
            console.error(error)
          },
          // Silence development logs in production
          ...(process.env.NODE_ENV === 'production'
            ? { log: () => {}, warn: () => {} }
            : {}),
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient} trpcMutationTransformer>
      {children}
      {/* Devtools only in development */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  )
}
