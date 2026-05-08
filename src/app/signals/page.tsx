/**
 * Signals Page
 * Purpose: Trading signals with confidence scores, entry/exit points
 * Features: Real-time alerts, performance tracking, premium signals
 */

'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Avatar } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import {
  Zap,
  TrendingUp,
  TrendingDown,
  Clock,
  Target,
  AlertCircle,
  Bell,
  Star,
  Crown,
} from 'lucide-react'
import { cn, formatCurrency } from '@/lib/utils'

export default function SignalsPage() {
  const [filter, setFilter] = useState<'all' | 'active' | 'closed'>('all')
  const [symbolFilter, setSymbolFilter] = useState<string>('all')

  // Mock signals data
  const signals = [
    {
      id: '1',
      pair: 'EUR/USD',
      type: 'buy' as const,
      entry: 1.0842,
      current: 1.0854,
      sl: 1.0815,
      tp1: 1.0880,
      tp2: 1.0910,
      tp3: 1.0950,
      confidence: 85,
      status: 'active',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      analyst: 'Team Alpha',
    },
    {
      id: '2',
      pair: 'GBP/USD',
      type: 'sell' as const,
      entry: 1.2680,
      current: 1.2654,
      sl: 1.2715,
      tp1: 1.2620,
      tp2: 1.2580,
      tp3: 1.2540,
      confidence: 72,
      status: 'active',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      analyst: 'Team Beta',
    },
    {
      id: '3',
      pair: 'USD/JPY',
      type: 'buy' as const,
      entry: 156.30,
      current: 156.45,
      sl: 155.80,
      tp1: 156.80,
      tp2: 157.20,
      tp3: 157.80,
      confidence: 91,
      status: 'active',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      analyst: 'Team Alpha',
    },
    {
      id: '4',
      pair: 'XAU/USD',
      type: 'buy' as const,
      entry: 2340.50,
      current: 2345.80,
      sl: 2330.00,
      tp1: 2355.00,
      tp2: 2370.00,
      tp3: 2390.00,
      confidence: 78,
      status: 'closed',
      closedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      result: 'tp1',
      profit: '+0.62%',
      analyst: 'Team Gamma',
    },
  ]

  const pairs = ['all', ...Array.from(new Set(signals.map((s) => s.pair)))]

  const filteredSignals = signals.filter((s) => {
    if (filter === 'active' && s.status !== 'active') return false
    if (filter === 'closed' && s.status !== 'closed') return false
    if (symbolFilter !== 'all' && s.pair !== symbolFilter) return false
    return true
  })

  const activeSignals = signals.filter((s) => s.status === 'active').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">Trading Signals</h1>
          <p className="text-dark-400 mt-1">
            AI-powered trade ideas with institutional analysis
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="info" className="px-3 py-1">
            <Zap className="w-3 h-3 mr-1" />
            {activeSignals} Active
          </Badge>
          <Button variant="outline" size="sm">
            <Bell className="w-4 h-4 mr-2" />
            Subscribe
          </Button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Win Rate', value: '78%', change: '+4%', positive: true },
          { label: 'Avg R/R', value: '1:2.5', change: 'improved', positive: true },
          { label: 'Monthly P&L', value: '+12.4%', change: '+2.1%', positive: true },
          { label: 'Subscribers', value: '2,847', change: '+156', positive: true },
        ].map((stat, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <p className="text-sm text-dark-400">{stat.label}</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-bold">{stat.value}</span>
                {stat.change && (
                  <span className={cn(
                    'text-xs font-medium',
                    stat.positive ? 'text-trading-up' : 'text-trading-down'
                  )}>
                    {stat.change}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <Tabs value={filter} onValueChange={(v) => setFilter(v as any)}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="closed">Closed</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex gap-2 flex-wrap">
          <select
            value={symbolFilter}
            onChange={(e) => setSymbolFilter(e.target.value)}
            className="bg-dark-800 border border-dark-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-neon-blue"
          >
            {pairs.map((pair) => (
              <option key={pair} value={pair}>
                {pair === 'all' ? 'All Pairs' : pair}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Signals list */}
      <div className="space-y-4">
        {filteredSignals.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Zap className="w-12 h-12 mx-auto mb-4 text-dark-500" />
              <h3 className="font-semibold text-lg mb-2">No signals found</h3>
              <p className="text-dark-400">Check back later for new trading opportunities</p>
            </CardContent>
          </Card>
        ) : (
          filteredSignals.map((signal) => (
            <SignalCard key={signal.id} signal={signal} />
          ))
        )}
      </div>

      {/* Premium upsell */}
      <Card className="border-neon-blue/30 bg-gradient-to-br from-neon-blue/5 to-neon-purple/5">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-yellow to-neon-orange flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Unlock Premium Signals</h3>
                <p className="text-sm text-dark-400">
                  Get access to exclusive high-confidence signals, SMS alerts, and 1-on-1 support
                </p>
              </div>
            </div>
            <Button size="lg" className="bg-gradient-to-r from-neon-yellow to-neon-orange text-black hover:opacity-90">
              Upgrade Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

/**
 * Signal card component
 */
function SignalCard({ signal }: { signal: any }) {
  const isActive = signal.status === 'active'
  const isBuy = signal.type === 'buy'
  const profit =
    isActive && signal.current
      ? ((signal.current - signal.entry) / signal.entry) * 100 * (isBuy ? 1 : -1)
      : signal.profit
        ? parseFloat(signal.profit.replace('%', ''))
        : 0

  return (
    <Card className={cn('overflow-hidden', isActive && 'border-l-4 border-l-neon-blue')}>
      <CardContent className="p-0">
        {/* Header */}
        <div className="p-4 border-b border-dark-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'w-10 h-10 rounded-lg flex items-center justify-center',
                isBuy ? 'bg-trading-up/20' : 'bg-trading-down/20'
              )}
            >
              {isBuy ? (
                <TrendingUp className="w-5 h-5 text-trading-up" />
              ) : (
                <TrendingDown className="w-5 h-5 text-trading-down" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-lg">{signal.pair}</span>
                <Badge variant={isBuy ? 'success' : 'error'}>{signal.type.toUpperCase()}</Badge>
                {isActive && <Badge variant="info">LIVE</Badge>}
              </div>
              <div className="flex items-center gap-2 text-xs text-dark-400 mt-0.5">
                <Clock size={12} />
                {formatDistance(signal.timestamp)}
                <span>•</span>
                <span>{signal.analyst}</span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-2xl font-mono font-bold">
              {signal.current?.toFixed(signal.pair.includes('JPY') ? 2 : 4) || signal.entry.toFixed(5)}
            </div>
            <div className={cn('text-sm font-medium', profit >= 0 ? 'text-trading-up' : 'text-trading-down')}>
              {profit >= 0 ? '+' : ''}{profit?.toFixed(2)}%
            </div>
          </div>
        </div>

        {/* Signal details grid */}
        <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4 bg-dark-900/30">
          <div>
            <p className="text-xs text-dark-400 mb-1">Entry</p>
            <p className="font-mono text-white">{signal.entry.toFixed(5)}</p>
          </div>
          <div>
            <p className="text-xs text-dark-400 mb-1">Stop Loss</p>
            <p className="font-mono text-trading-down">{signal.sl.toFixed(5)}</p>
          </div>
          <div>
            <p className="text-xs text-dark-400 mb-1">Take Profit 1</p>
            <p className="font-mono text-trading-up">{signal.tp1.toFixed(5)}</p>
          </div>
          <div>
            <p className="text-xs text-dark-400 mb-1">Confidence</p>
            <div className="flex items-center gap-2">
              <Progress value={signal.confidence} size="sm" variant="success" />
              <span className="text-sm font-semibold">{signal.confidence}%</span>
            </div>
          </div>
        </div>

        {/* Additional TPs */}
        {signal.tp2 && (
          <div className="px-4 py-2 border-t border-dark-800 flex items-center justify-between text-sm">
            <span className="text-dark-400">TP2: {signal.tp2.toFixed(5)}</span>
            <span className="text-dark-400">TP3: {signal.tp3?.toFixed(5)}</span>
          </div>
        )}

        {/* Actions */}
        {isActive && (
          <div className="p-4 border-t border-dark-800 flex gap-2">
            <Button size="sm" className="flex-1">
              <TrendingUp className="w-4 h-4 mr-2" />
              Copy Trade
            </Button>
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4" />
              Set Alert
            </Button>
            <Button variant="outline" size="sm" className="px-3">
              <Star className="w-4 h-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

/**
 * Format relative time
 */
function formatDistance(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)

  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  return format(date, 'MMM dd, HH:mm')
}
