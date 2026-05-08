/**
 * Admin Dashboard
 * Purpose: Admin panel with user management, analytics, platform monitoring
 * Security: Admin-only access
 */

'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/shared/loading-skeleton'
import { useRouter } from 'next/navigation'
import {
  Users,
  DollarSign,
  TrendingUp,
  Activity,
  Shield,
  Settings,
  AlertTriangle,
  BarChart2,
} from 'lucide-react'

export default function AdminDashboard() {
  const { user, isAdmin } = useAuth()
  const router = useRouter()

  // Permission check
  if (!isAdmin) {
    router.push('/dashboard')
    return null
  }

  const stats = [
    { label: 'Total Users', value: '12,847', change: '+12%', icon: Users, color: 'from-neon-blue to-neon-cyan' },
    { label: 'Monthly Revenue', value: '$284,590', change: '+8%', icon: DollarSign, color: 'from-neon-green to-neon-blue' },
    { label: 'Active Now', value: '1,234', change: '+5%', icon: Activity, color: 'from-neon-orange to-neon-yellow' },
    { label: 'Conversion Rate', value: '4.2%', change: '+0.3%', icon: TrendingUp, color: 'from-neon-purple to-neon-pink' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-white flex items-center gap-3">
            <Shield className="w-8 h-8 text-neon-blue" />
            Admin Dashboard
          </h1>
          <p className="text-dark-400 mt-1">
            Platform overview and management tools
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            System Config
          </Button>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs text-trading-up font-medium">+{stat.change}</span>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-dark-400">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main admin panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent users */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Signups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-dark-800/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple" />
                    <div>
                      <p className="font-medium text-sm">user{1000 + i}@mail.com</p>
                      <p className="text-xs text-dark-400">2 hours ago</p>
                    </div>
                  </div>
                  <Badge variant="secondary">Free</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System health */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">System Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <HealthIndicator label="API Response Time" value="45ms" status="healthy" />
            <HealthIndicator label="Database Connection" value="Active" status="healthy" />
            <HealthIndicator label="WebSocket Server" value="1,234 conn" status="healthy" />
            <HealthIndicator label="Error Rate" value="0.02%" status="warning" />
            <HealthIndicator label="Cache Hit Rate" value="94%" status="healthy" />
          </CardContent>
        </Card>

        {/* Quick actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-auto py-3 flex-col">
                <Users className="w-5 h-5 mb-2" />
                Manage Users
              </Button>
              <Button variant="outline" className="h-auto py-3 flex-col">
                <BarChart2 className="w-5 h-5 mb-2" />
                View Analytics
              </Button>
              <Button variant="outline" className="h-auto py-3 flex-col">
                <AlertTriangle className="w-5 h-5 mb-2" />
                Review Reports
              </Button>
              <Button variant="outline" className="h-auto py-3 flex-col">
                <Settings className="w-5 h-5 mb-2" />
                System Settings
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { type: 'warning', msg: 'High error rate detected on /api/market' },
                { type: 'info', msg: 'New user milestone: 10,000 registered' },
                { type: 'success', msg: 'Database backup completed' },
              ].map((alert, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-lg bg-dark-800/50 border-l-2"
                  style={{
                    borderColor:
                      alert.type === 'warning'
                        ? 'rgb(255, 214, 0)'
                        : alert.type === 'success'
                        ? 'rgb(0, 200, 83)'
                        : 'rgb(0, 212, 255)',
                  }}
                >
                  <AlertTriangle
                    className="w-4 h-4 mt-0.5"
                    style={{
                      color:
                        alert.type === 'warning'
                          ? 'rgb(255, 214, 0)'
                          : alert.type === 'success'
                          ? 'rgb(0, 200, 83)'
                          : 'rgb(0, 212, 255)',
                    }}
                  />
                  <div className="flex-1">
                    <p className="text-sm">{alert.msg}</p>
                    <p className="text-xs text-dark-500 mt-1">
                      {i + 1} hour{i > 0 ? 's' : ''} ago
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

/**
 * Health indicator component
 */
function HealthIndicator({
  label,
  value,
  status,
}: {
  label: string
  value: string
  status: 'healthy' | 'warning' | 'error'
}) {
  const statusColors = {
    healthy: 'text-trading-up',
    warning: 'text-trading-neutral',
    error: 'text-trading-down',
  }

  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-dark-300">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-sm font-mono">{value}</span>
        <div
          className={`w-2 h-2 rounded-full ${status === 'healthy' ? 'bg-trading-up' : status === 'warning' ? 'bg-trading-neutral' : 'bg-trading-down'}`}
        />
      </div>
    </div>
  )
}

import { cn } from '@/lib/utils'
