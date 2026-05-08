/**
 * Notifications Page
 * Purpose: Notification center with filtering and bulk actions
 */

'use client'

import { useState } from 'react'
import { useNotifications } from '@/components/providers/notification-provider'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, Trash2, Bell, Zap, DollarSign, Info, AlertTriangle } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { cn } from '@/lib/utils'

export default function NotificationsPage() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearNotification, clearAll } =
    useNotifications()
  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  const filtered = notifications.filter((n) => {
    if (filter === 'unread') return !n.read
    return true
  })

  const icons = {
    signal: <Zap className="w-4 h-4" />,
    trade: <DollarSign className="w-4 h-4" />,
    success: <Check className="w-4 h-4" />,
    error: <AlertTriangle className="w-4 h-4" />,
    warning: <AlertTriangle className="w-4 h-4" />,
    info: <Info className="w-4 h-4" />,
  }

  const typeColors = {
    signal: 'text-neon-blue',
    trade: 'text-trading-up',
    success: 'text-trading-up',
    error: 'text-trading-down',
    warning: 'text-trading-neutral',
    info: 'text-neon-blue',
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">Notifications</h1>
          <p className="text-dark-400 mt-1">
            {unreadCount > 0 ? `You have ${unreadCount} unread notifications` : 'All caught up!'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              <Check className="w-4 h-4 mr-2" />
              Mark all read
            </Button>
          )}
          {notifications.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearAll}>
              <Trash2 className="w-4 h-4 mr-2" />
              Clear all
            </Button>
          )}
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {(['all', 'unread'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize',
              filter === f
                ? 'bg-neon-blue text-white'
                : 'bg-dark-800 text-dark-300 hover:bg-dark-700'
            )}
          >
            {f === 'all' ? 'All' : 'Unread'}
            {f === 'unread' && unreadCount > 0 && (
              <span className="ml-2 px-1.5 py-0.5 rounded-full bg-trading-down text-xs">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Notifications list */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Bell className="w-12 h-12 mx-auto mb-4 text-dark-500" />
              <h3 className="font-semibold text-lg mb-2">
                {filter === 'unread' ? 'No unread notifications' : 'No notifications'}
              </h3>
              <p className="text-dark-400">
                {filter === 'unread'
                  ? 'You are all caught up!'
                  : 'When you receive notifications, they will appear here'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filtered.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              icon={icons[notification.type]}
              iconColor={typeColors[notification.type]}
              onMarkRead={() => markAsRead(notification.id)}
              onDelete={() => clearNotification(notification.id)}
            />
          ))
        )}
      </div>
    </div>
  )
}

/**
 * Notification card
 */
function NotificationCard({
  notification,
  icon,
  iconColor,
  onMarkRead,
  onDelete,
}: {
  notification: any
  icon: React.ReactNode
  iconColor: string
  onMarkRead: () => void
  onDelete: () => void
}) {
  const priorityColors = {
    low: 'border-l-dark-500',
    medium: 'border-l-dark-400',
    high: 'border-l-neon-blue',
    critical: 'border-l-trading-down',
  }

  return (
    <Card
      className={cn(
        'overflow-hidden transition-all hover:shadow-lg',
        !notification.read && 'border-l-4 border-l-neon-blue bg-neon-blue/5',
        notification.read && `border-l border-l-dark-700 border-l-${notification.priority}`
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0', iconColor)}>
            {icon}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className="font-medium text-white">{notification.title}</h4>
                <p className="text-sm text-dark-300 mt-1">{notification.message}</p>
              </div>
              {notification.priority === 'critical' && (
                <Badge variant="error" className="flex-shrink-0">Urgent</Badge>
              )}
            </div>

            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-dark-500">
                {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
              </span>

              {!notification.read && (
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={onMarkRead}>
                    <Check className="w-3 h-3 mr-1" />
                    Mark read
                  </Button>
                  <Button variant="ghost" size="sm" onClick={onDelete}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
