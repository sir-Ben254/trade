/**
 * Dashboard Page
 * Purpose: Main user dashboard with portfolio overview, analytics, positions
 * Features: Real-time stats, performance charts, recent trades, market overview
 */

'use client'

import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/shared/loading-skeleton'
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { formatCurrency, formatPercentage } from '@/lib/utils'

/**
 * Dashboard metrics card
 */
function MetricCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  prefix = '',
}: {
  title: string
  value: string | number
  change?: number
  changeType?: 'positive' | 'negative' | 'neutral'
  icon: React.ElementType
  prefix?: string
}) {
  return (
    <Card className="hover:-translate-y-1 transition-transform duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm text-dark-400 font-medium">{title}</p>
            <p className="text-2xl font-display font-bold text-white">
              {prefix}{typeof value === 'number' ? formatCurrency(value) : value}
            </p>
            {change !== undefined && (
              <div className="flex items-center gap-1">
                {changeType === 'positive' ? (
                  <ArrowUpRight className="w-4 h-4 text-trading-up" />
                ) : changeType === 'negative' ? (
                  <ArrowDownRight className="w-4 h-4 text-trading-down" />
                ) : null}
                <span
                  className={cn(
                    'text-sm font-medium',
                    changeType === 'positive' && 'text-trading-up',
                    changeType === 'negative' && 'text-trading-down'
                  )}
                >
                  {change > 0 ? '+' : ''}{formatPercentage(change)}
                </span>
                <span className="text-xs text-dark-500">vs last month</span>
              </div>
            )}
          </div>
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 border border-neon-blue/30 flex items-center justify-center">
            <Icon className="w-6 h-6 text-neon-blue" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * Position row component
 */
function PositionRow({
  symbol,
  type,
  size,
  entryPrice,
  currentPrice,
  pnl,
  pnlPercent,
}: {
  symbol: string
  type: 'long' | 'short'
  size: number
  entryPrice: number
  currentPrice: number
  pnl: number
  pnlPercent: number
}) {
  const isProfitable = pnl >= 0

  return (
    <div className="flex items-center justify-between p-4 border-b border-dark-800 hover:bg-dark-800/30 transition-colors">
      <div className="flex items-center gap-3">
        <Badge variant={type === 'long' ? 'success' : 'error'}>
          {type === 'long' ? 'LONG' : 'SHORT'}
        </Badge>
        <div>
          <p className="font-mono font-semibold text-white">{symbol}</p>
          <p className="text-xs text-dark-400">
            {size} lots @ {entryPrice.toFixed(5)}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-mono text-white">{currentPrice.toFixed(5)}</p>
        <p className={cn(
          'text-sm font-medium',
          isProfitable ? 'text-trading-up' : 'text-trading-down'
        )}>
          {isProfitable ? '+' : ''}{formatCurrency(pnl)} ({pnlPercent.toFixed(2)}%)
        </p>
      </div>
    </div>
  )
}

/**
 * Main Dashboard Page
 */
export default function DashboardPage() {
  const { user } = useAuth()

  // Fetch dashboard data
  const { data: metrics, isLoading: loadingMetrics } = useQuery({
    queryKey: ['dashboard', 'metrics'],
    queryFn: async () => ({
      totalBalance: 24850.32,
      availableBalance: 12420.15,
      equity: 26320.45,
      unrealizedPnL: 1470.13,
      dailyPnL: 235.50,
      weeklyPnL: -420.80,
    }),
    staleTime: 1000 * 30,
  })

  const { data: positions, isLoading: loadingPositions } = useQuery({
    queryKey: ['dashboard', 'positions'],
    queryFn: async () => [
      { symbol: 'EUR/USD', type: 'long' as const, size: 2, entryPrice: 1.0842, currentPrice: 1.0854, pnl: 24.00, pnlPercent: 0.11 },
      { symbol: 'GBP/USD', type: 'short' as const, size: 1, entryPrice: 1.2660, currentPrice: 1.2654, pnl: 6.00, pnlPercent: 0.05 },
      { symbol: 'USD/JPY', type: 'long' as const, size: 3, entryPrice: 156.30, currentPrice: 156.42, pnl: 36.00, pnlPercent: 0.19 },
    ],
    staleTime: 1000 * 10,
  })

  const { data: recentTrades, isLoading: loadingTrades } = useQuery({
    queryKey: ['dashboard', 'recent-trades'],
    queryFn: async () => [
      { symbol: 'EUR/USD', type: 'BUY', price: 1.0845, time: '2 min ago', pnl: 12.50 },
      { symbol: 'GBP/USD', type: 'SELL', price: 1.2665, time: '15 min ago', pnl: -5.30 },
      { symbol: 'USD/JPY', type: 'BUY', price: 156.28, time: '1 hour ago', pnl: 28.70 },
    ],
    staleTime: 1000 * 60,
  })

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-white">
          Welcome back, {user?.name?.split(' ')[0]}
        </h1>
        <p className="text-dark-400 mt-1">
          Here's your trading overview for today
        </p>
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {loadingMetrics ? (
          <>
            <Skeleton className="h-32 rounded-xl" />
            <Skeleton className="h-32 rounded-xl" />
            <Skeleton className="h-32 rounded-xl" />
            <Skeleton className="h-32 rounded-xl" />
          </>
        ) : metrics ? (
          <>
            <MetricCard
              title="Total Balance"
              value={metrics.totalBalance}
              change={metrics.dailyPnL}
              changeType={metrics.dailyPnL >= 0 ? 'positive' : 'negative'}
              icon={Wallet}
              prefix="$"
            />
            <MetricCard
              title="Available Balance"
              value={metrics.availableBalance}
              icon={DollarSign}
              prefix="$"
            />
            <MetricCard
              title="Unrealized P&L"
              value={metrics.unrealizedPnL}
              change={metrics.weeklyPnL}
              changeType={metrics.weeklyPnL >= 0 ? 'positive' : 'negative'}
              icon={Activity}
              prefix="$"
            />
            <MetricCard
              title="Equity"
              value={metrics.equity}
              icon={TrendingUp}
              prefix="$"
            />
          </>
        ) : null}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Open positions - spans 2 columns */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Open Positions</CardTitle>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {loadingPositions ? (
                <div className="p-6 space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-4 border-b border-dark-800">
                      <Skeleton className="h-6 w-24" />
                      <Skeleton className="h-6 w-20" />
                    </div>
                  ))}
                </div>
              ) : positions && positions.length > 0 ? (
                <div>
                  {positions.map((position, index) => (
                    <PositionRow key={index} {...position} />
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center text-dark-400">
                  <Activity className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>No open positions</p>
                  <Button className="mt-4" size="sm">
                    Open Trade
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick actions & market summary */}
        <div className="space-y-6">
          {/* Quick trade */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Trade</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  className="h-auto py-3 flex-col gap-1 border-trading-down/50 hover:border-trading-down hover:bg-trading-down/10"
                >
                  <TrendingDown className="w-5 h-5 text-trading-down" />
                  <span className="font-medium">Sell</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto py-3 flex-col gap-1 border-trading-up/50 hover:border-trading-up hover:bg-trading-up/10"
                >
                  <TrendingUp className="w-5 h-5 text-trading-up" />
                  <span className="font-medium">Buy</span>
                </Button>
              </div>
              <Button variant="default" className="w-full">
                Advanced Trading View
              </Button>
            </CardContent>
          </Card>

          {/* Market movers */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Market Movers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { symbol: 'XAU/USD', change: 0.45, volume: '2.3B' },
                { symbol: 'USD/JPY', change: -0.23, volume: '1.8B' },
                { symbol: 'GBP/USD', change: 0.18, volume: '980M' },
              ].map((mover) => (
                <div
                  key={mover.symbol}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-dark-800/50 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-medium">{mover.symbol}</span>
                    <span className="text-xs text-dark-500">{mover.volume}</span>
                  </div>
                  <span
                    className={cn(
                      'text-sm font-mono font-medium',
                      mover.change > 0 ? 'text-trading-up' : 'text-trading-down'
                    )}
                  >
                    {mover.change > 0 ? '+' : ''}{mover.change.toFixed(2)}%
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent trades */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Trades</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingTrades ? (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 border-b border-dark-800">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-24" />
                </div>
              ))}
            </div>
          ) : recentTrades && recentTrades.length > 0 ? (
            <div className="divide-y divide-dark-800">
              {recentTrades.map((trade, i) => (
                <div key={i} className="flex items-center justify-between p-4 hover:bg-dark-800/30">
                  <div className="flex items-center gap-4">
                    <Badge variant={trade.type === 'BUY' ? 'success' : 'error'}>
                      {trade.type}
                    </Badge>
                    <span className="font-mono text-sm font-medium">{trade.symbol}</span>
                  </div>
                  <span className="text-sm text-dark-400">@ {trade.price.toFixed(5)}</span>
                  <span className="text-sm text-dark-500">{trade.time}</span>
                  <span className={cn(
                    'font-mono text-sm font-medium',
                    trade.pnl >= 0 ? 'text-trading-up' : 'text-trading-down'
                  )}>
                    {trade.pnl >= 0 ? '+' : ''}{formatCurrency(trade.pnl)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-dark-400">
              <Activity className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No recent trades</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

import { cn } from '@/lib/utils'
