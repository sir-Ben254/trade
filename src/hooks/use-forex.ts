/**
 * Custom Hook: useForex
 * Purpose: Fetch and manage forex market data
 * Features: Real-time updates, cached queries, error handling
 */

'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useSocket } from '@/components/providers/socket-provider'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { cn } from '@/lib/utils'

export interface PriceData {
  symbol: string
  bid: number
  ask: number
  spread: number
  change: number
  changePercent: number
  high: number
  low: number
  open: number
  prevClose: number
  volume: number
  timestamp: number
}

const POPULAR_PAIRS = [
  'EUR/USD', 'GBP/USD', 'USD/JPY', 'AUD/USD', 'USD/CAD',
  'XAU/USD', 'BTC/USD', 'ETH/USD', 'USD/CHF', 'NZD/USD'
]

/**
 * Hook for fetching and managing forex price data
 */
export function useForex() {
  const { subscribe, isConnected } = useSocket()
  const queryClient = useQueryClient()

  // Fetch initial data for all pairs
  const { data: prices, isLoading, error, refetch } = useQuery({
    queryKey: ['forex', 'prices'],
    queryFn: async () => {
      // In production, fetch from your backend API
      const response = await fetch('/api/market/prices')
      if (!response.ok) throw new Error('Failed to fetch prices')
      return response.json()
    },
    staleTime: 1000 * 10, // 10 seconds
    refetchInterval: 1000 * 30, // Refetch every 30 seconds
  })

  // Subscribe to real-time price updates via WebSocket
  useEffect(() => {
    if (!isConnected) return

    const unsubscribers: (() => void)[] = []

    POPULAR_PAIRS.forEach((pair) => {
      const unsubscribe = subscribe(`price:${pair}`, (data: PriceData) => {
        // Update cache with new price
        const queryClient = useQueryClient()
        queryClient.setQueryData(['forex', 'prices'], (old: PriceData[] = []) => {
          return old.map((item) =>
            item.symbol === data.symbol ? { ...item, ...data } : item
          )
        })

        // Show toast for significant price moves
        if (Math.abs(data.changePercent) > 1) {
          toast.custom((t) => (
            <div className={`glass rounded-lg p-3 border-l-4 ${data.change > 0 ? 'border-trading-up' : 'border-trading-down'}`}>
              <p className="text-sm font-medium">{data.symbol}</p>
              <p className={cn('text-xs', data.change > 0 ? 'text-trading-up' : 'text-trading-down')}>
                {data.change > 0 ? '+' : ''}{data.changePercent.toFixed(2)}%
              </p>
            </div>
          ), { duration: 2000 })
        }
      })
      unsubscribers.push(unsubscribe)
    })

    return () => {
      unsubscribers.forEach((unsub) => unsub())
    }
  }, [isConnected, subscribe])

  // Get single price by symbol
  const getPrice = (symbol: string) => {
    return prices?.find((p) => p.symbol === symbol)
  }

  return {
    prices,
    isLoading,
    error,
    refetch,
    getPrice,
    isConnected,
  }
}

/**
 * Hook for fetching chart data (candlesticks)
 */
export function useChartData(symbol: string, timeframe: string = '1D') {
  const { subscribe, isConnected } = useSocket()
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ['chart', symbol, timeframe],
    queryFn: async () => {
      const response = await fetch(`/api/market/chart?symbol=${symbol}&interval=${timeframe}`)
      if (!response.ok) throw new Error('Failed to fetch chart data')
      return response.json()
    },
    enabled: !!symbol,
    staleTime: 1000 * 60, // 1 minute
  })

  // Subscribe to real-time updates
  useEffect(() => {
    if (!isConnected || !symbol) return

    const unsubscribe = subscribe(`chart:${symbol}:${timeframe}`, (newCandle: any) => {
      const queryClient = useQueryClient()
      queryClient.setQueryData(['chart', symbol, timeframe], (old: any) => {
        if (!old) return [newCandle]
        return [...old.slice(0, -1), newCandle]
      })
    })

    return unsubscribe
  }, [isConnected, symbol, timeframe, subscribe])

  return {
    data,
    isLoading,
    error,
  }
}

/**
 * Hook for fetching economic events
 */
export function useEconomicEvents(daysAhead = 7) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['economic', 'events', daysAhead],
    queryFn: async () => {
      const response = await fetch(`/api/economic/events?days=${daysAhead}`)
      if (!response.ok) throw new Error('Failed to fetch events')
      return response.json()
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  return {
    events: data,
    isLoading,
    error,
  }
}
