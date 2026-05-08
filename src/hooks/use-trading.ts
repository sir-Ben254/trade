/**
 * Trading Hook
 * Purpose: Place orders, manage positions, track trades
 */

'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@/hooks/use-auth'
import { toast } from 'react-hot-toast'

export interface OrderRequest {
  symbol: string
  side: 'buy' | 'sell'
  type: 'market' | 'limit' | 'stop'
  volume: number
  price?: number
  stopLoss?: number
  takeProfit?: number
  leverage?: number
}

export interface OrderResponse {
  orderId: string
  symbol: string
  side: 'buy' | 'sell'
  volume: number
  entryPrice: number
  stopLoss?: number
  takeProfit?: number
  status: 'filled' | 'pending' | 'rejected'
  timestamp: number
}

export interface Position {
  id: string
  symbol: string
  side: 'long' | 'short'
  volume: number
  entryPrice: number
  currentPrice: number
  stopLoss?: number
  takeProfit?: number
  unrealizedPnL: number
  unrealizedPnLPercent: number
  margin: number
  leverage: number
  timestamp: number
}

/**
 * Hook for placing trades
 */
export function useTrade() {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  const mutation = useMutation({
    mutationFn: async (order: OrderRequest): Promise<OrderResponse> => {
      const response = await fetch('/api/trading/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
        credentials: 'include',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to place order')
      }

      return data
    },
    onSuccess: (data) => {
      toast.success(`Order ${data.status}: ${data.symbol} ${data.side.toUpperCase()}`)
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['trading', 'positions'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'metrics'] })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to place order')
    },
  })

  return {
    placeOrder: mutation.mutateAsync,
    isPending: mutation.isPending,
  }
}

/**
 * Hook for fetching open positions
 */
export function usePositions() {
  const { data: positions, isLoading, error, refetch } = useQuery({
    queryKey: ['trading', 'positions'],
    queryFn: async (): Promise<Position[]> => {
      const response = await fetch('/api/trading/positions', {
        credentials: 'include',
      })
      if (!response.ok) throw new Error('Failed to fetch positions')
      return response.json()
    },
    staleTime: 1000 * 5, // 5 seconds - positions update frequently
    refetchInterval: 1000 * 10, // Refetch every 10 seconds
  })

  return {
    positions: positions || [],
    isLoading,
    error,
    refetch,
  }
}

/**
 * Hook for position management (close, modify SL/TP)
 */
export function usePositionActions() {
  const queryClient = useQueryClient()

  const closeMutation = useMutation({
    mutationFn: async (positionId: string): Promise<{ success: boolean }> => {
      const response = await fetch(`/api/trading/positions/${positionId}/close`, {
        method: 'POST',
        credentials: 'include',
      })
      if (!response.ok) throw new Error('Failed to close position')
      return response.json()
    },
    onSuccess: () => {
      toast.success('Position closed successfully')
      queryClient.invalidateQueries({ queryKey: ['trading', 'positions'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'metrics'] })
    },
    onError: () => toast.error('Failed to close position'),
  })

  const modifySLTP = useMutation({
    mutationFn: async ({
      positionId,
      stopLoss,
      takeProfit,
    }: {
      positionId: string
      stopLoss?: number
      takeProfit?: number
    }): Promise<{ success: boolean }> => {
      const response = await fetch(`/api/trading/positions/${positionId}/modify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stopLoss, takeProfit }),
        credentials: 'include',
      })
      if (!response.ok) throw new Error('Failed to modify position')
      return response.json()
    },
    onSuccess: () => {
      toast.success('Position updated')
      queryClient.invalidateQueries({ queryKey: ['trading', 'positions'] })
    },
    onError: () => toast.error('Failed to update position'),
  })

  return {
    closePosition: closeMutation.mutateAsync,
    modifyPosition: modifySLTP.mutateAsync,
    isClosing: closeMutation.isPending,
    isModifying: modifySLTP.isPending,
  }
}
