/**
 * Live Ticker Component
 * Purpose: Top bar showing live forex price updates
 * Real-time: WebSocket updates with color flash animations
 */

'use client'

import { useEffect, useState } from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ForexTickerItem {
  symbol: string
  name: string
  bid: number
  ask: number
  change: number
  changePercent: number
  high: number
  low: number
  volume?: number
}

interface LiveTickerProps {
  items?: ForexTickerItem[]
  refreshInterval?: number
  onSymbolClick?: (symbol: string) => void
}

/**
 * Default demo data when API fails
 */
const defaultTickerItems: ForexTickerItem[] = [
  { symbol: 'EUR/USD', name: 'Euro / US Dollar', bid: 1.0854, ask: 1.0856, change: 0.0023, changePercent: 0.21, high: 1.0862, low: 1.0831 },
  { symbol: 'GBP/USD', name: 'British Pound / US Dollar', bid: 1.2654, ask: 1.2657, change: -0.0018, changePercent: -0.14, high: 1.2689, low: 1.2621 },
  { symbol: 'USD/JPY', name: 'US Dollar / Japanese Yen', bid: 156.42, ask: 156.45, change: 0.28, changePercent: 0.18, high: 156.89, low: 156.01 },
  { symbol: 'AUD/USD', name: 'Australian Dollar / US Dollar', bid: 0.6532, ask: 0.6534, change: 0.0012, changePercent: 0.18, high: 0.6545, low: 0.6510 },
  { symbol: 'USD/CAD', name: 'US Dollar / Canadian Dollar', bid: 1.3621, ask: 1.3624, change: -0.0025, changePercent: -0.18, high: 1.3655, low: 1.3598 },
  { symbol: 'XAU/USD', name: 'Gold / US Dollar', bid: 2345.30, ask: 2345.80, change: 5.20, changePercent: 0.22, high: 2348.50, low: 2338.10 },
  { symbol: 'BTC/USD', name: 'Bitcoin / US Dollar', bid: 67240.50, ask: 67250.00, change: -245.30, changePercent: -0.36, high: 67890.00, low: 66800.00 },
]

/**
 * Live forex ticker component
 * Displays horizontal scrolling ticker with live price updates
 */
export function LiveTicker({ items = defaultTickerItems, refreshInterval = 5000, onSymbolClick }: LiveTickerProps) {
  const [tickerItems, setTickerItems] = useState<ForexTickerItem[]>(items)
  const [lastChanges, setLastChanges] = useState<Record<string, 'up' | 'down' | 'neutral'>>({})

  // Simulate live updates (replace with WebSocket)
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerItems((prev) =>
        prev.map((item) => {
          const randomChange = (Math.random() - 0.5) * 0.0002
          const newBid = Math.max(0, item.bid + randomChange)
          const newAsk = newBid + 0.0002
          const newChange = randomChange
          const changePercent = (newChange / item.bid) * 100

          // Determine direction for animation
          let direction: 'up' | 'down' | 'neutral' = 'neutral'
          if (newChange > 0.00001) direction = 'up'
          else if (newChange < -0.00001) direction = 'down'

          // Update last change direction
          setLastChanges((prev) => ({ ...prev, [item.symbol]: direction }))

          return {
            ...item,
            bid: newBid,
            ask: newAsk,
            change: newChange,
            changePercent,
          }
        })
      )
    }, refreshInterval)

    return () => clearInterval(interval)
  }, [refreshInterval])

  // Clear animation flag after animation completes
  useEffect(() => {
    const timer = setTimeout(() => {
      setLastChanges({})
    }, 500)
    return () => clearTimeout(timer)
  }, [lastChanges])

  return (
    <div className="h-10 bg-dark-900 border-b border-dark-800 overflow-hidden">
      <div className="flex h-full items-center animate-marquee">
        {tickerItems.map((item, index) => (
          <button
            key={item.symbol}
            onClick={() => onSymbolClick?.(item.symbol)}
            className={cn(
              'flex items-center gap-3 px-4 py-2 hover:bg-dark-800 transition-colors border-r border-dark-800/50',
              'group min-w-fit'
            )}
          >
            {/* Symbol and name */}
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-semibold text-white group-hover:text-neon-blue transition-colors">
                  {item.symbol}
                </span>
                <span className="text-xs text-dark-500 hidden sm:inline-block">
                  {item.name}
                </span>
              </div>
            </div>

            {/* Prices */}
            <div className="flex items-center gap-3 ml-4">
              <div className="text-right">
                <div className="font-mono text-sm text-white tabular-nums">
                  {item.symbol.includes('JPY') ? item.bid.toFixed(2) : item.bid.toFixed(4)}
                </div>
                <div className="font-mono text-xs text-dark-400 tabular-nums">
                  {item.symbol.includes('JPY') ? item.ask.toFixed(2) : item.ask.toFixed(4)}
                </div>
              </div>

              {/* Change indicator */}
              <div
                className={cn(
                  'flex items-center gap-1 min-w-[60px] justify-end transition-all duration-300',
                  lastChanges[item.symbol] === 'up' && 'animate-price-up',
                  lastChanges[item.symbol] === 'down' && 'animate-price-down'
                )}
              >
                {item.change > 0 ? (
                  <TrendingUp className="w-3 h-3 text-trading-up" />
                ) : item.change < 0 ? (
                  <TrendingDown className="w-3 h-3 text-trading-down" />
                ) : (
                  <Minus className="w-3 h-3 text-dark-500" />
                )}
                <span
                  className={cn(
                    'font-mono text-sm font-medium',
                    item.change > 0 ? 'text-trading-up' : item.change < 0 ? 'text-trading-down' : 'text-dark-400'
                  )}
                >
                  {item.change > 0 ? '+' : ''}
                  {item.symbol.includes('JPY') ? item.change.toFixed(2) : item.change.toFixed(4)}
                </span>
                <span
                  className={cn(
                    'font-mono text-xs',
                    item.changePercent > 0 ? 'text-trading-up' : item.changePercent < 0 ? 'text-trading-down' : 'text-dark-500'
                  )}
                >
                  ({item.changePercent > 0 ? '+' : ''}{item.changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Second row for infinite scroll effect */}
      <div className="flex h-full items-center animate-marquee opacity-50">
        {tickerItems.map((item, index) => (
          <div
            key={`duplicate-${item.symbol}`}
            className="flex items-center gap-3 px-4 py-2 border-r border-dark-800/50 min-w-fit"
          >
            <div className="font-mono text-sm text-dark-400 tabular-nums">
              {item.symbol}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export { LiveTicker }
