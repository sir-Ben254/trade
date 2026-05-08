/**
 * Portfolio Page
 * Purpose: Detailed portfolio tracking, performance analytics, asset allocation
 */

'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import { TrendingUp, DollarSign, Percent, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

export default function PortfolioPage() {
  // Mock performance data
  const performanceData = [
    { date: 'Jan', value: 24200 },
    { date: 'Feb', value: 25100 },
    { date: 'Mar', value: 24850 },
    { date: 'Apr', value: 25600 },
    { date: 'May', value: 26320 },
    { date: 'Jun', value: 26800 },
    { date: 'Jul', value: 27500 },
    { date: 'Aug', value: 28300 },
    { date: 'Sep', value: 27800 },
    { date: 'Oct', value: 28500 },
    { date: 'Nov', value: 28900 },
    { date: 'Dec', value: 29400 },
  ]

  const assetAllocation = [
    { name: 'Cash', value: 35, color: '#00d4ff' },
    { name: 'EUR/USD', value: 25, color: '#00c853' },
    { name: 'GBP/USD', value: 20, color: '#9d4edd' },
    { name: 'XAU/USD', value: 12, color: '#ffd600' },
    { name: 'USD/JPY', value: 8, color: '#ff5252' },
  ]

  const metrics = [
    { label: 'Total Equity', value: 29400, change: 15.2, icon: Wallet },
    { label: 'Day P&L', value: 235.50, change: 0.8, icon: TrendingUp },
    { label: 'Win Rate', value: '68%', change: 3, icon: Percent },
    { label: 'Profit Factor', value: '1.85', change: 0.2, icon: DollarSign },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-white">Portfolio</h1>
        <p className="text-dark-400 mt-1">
          Track your trading performance and asset allocation
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-dark-400">{metric.label}</p>
                  <p className="text-2xl font-bold mt-1">
                    {typeof metric.value === 'number' && metric.label.includes('P&L')
                      ? formatCurrency(metric.value)
                      : metric.value}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    {(metric.change as number) > 0 ? (
                      <ArrowUpRight className="w-3 h-3 text-trading-up" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3 text-trading-down" />
                    )}
                    <span
                      className={cn(
                        'text-xs font-medium',
                        (metric.change as number) > 0 ? 'text-trading-up' : 'text-trading-down'
                      )}
                    >
                      {metric.change > 0 ? '+' : ''}{metric.change}%
                    </span>
                    <span className="text-xs text-dark-500">vs last month</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-lg bg-dark-800 border border-dark-700 flex items-center justify-center">
                  <metric.icon className="w-5 h-5 text-neon-blue" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Portfolio Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#00d4ff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="date" stroke="#8e8e8e" fontSize={12} />
                  <YAxis stroke="#8e8e8e" fontSize={12} tickFormatter={(v) => `$${v / 1000}k`} />
                  <Tooltip
                    contentStyle={{
                      background: '#1a1a1a',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number) => [formatCurrency(value), 'Equity']}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#00d4ff"
                    fill="url(#colorValue)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Asset allocation */}
        <Card>
          <CardHeader>
            <CardTitle>Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={assetAllocation}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {assetAllocation.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: '#1a1a1a',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number) => [`${value}%`, '']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {assetAllocation.map((item, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed view tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Account Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="breakdown">
            <TabsList>
              <TabsTrigger value="breakdown">Asset Breakdown</TabsTrigger>
              <TabsTrigger value="history">Trade History</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            <TabsContent value="breakdown" className="space-y-4 pt-4">
              <div className="space-y-3">
                {[
                  { asset: 'Cash', amount: 10290, percentage: 35 },
                  { asset: 'EUR/USD', amount: 7350, percentage: 25 },
                  { asset: 'GBP/USD', amount: 5880, percentage: 20 },
                  { asset: 'Gold (XAU)', amount: 3528, percentage: 12 },
                  { asset: 'USD/JPY', amount: 2352, percentage: 8 },
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>{item.asset}</span>
                      <div className="flex items-center gap-4">
                        <span className="font-mono">{formatCurrency(item.amount)}</span>
                        <span className="text-dark-400">{item.percentage}%</span>
                      </div>
                    </div>
                    <Progress value={item.percentage} size="sm" />
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="history" className="pt-4">
              <p className="text-center py-12 text-dark-400">
                Trade history will appear here
              </p>
            </TabsContent>

            <TabsContent value="analytics" className="pt-4">
              <p className="text-center py-12 text-dark-400">
                Advanced analytics coming soon
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

import { cn } from '@/lib/utils'
