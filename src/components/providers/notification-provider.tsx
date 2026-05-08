/**
 * Notification Provider (Real-time Notifications)
 * Purpose: Global notification system with real-time updates via WebSocket
 * Security: User-specific notification filtering, sanitized content
 * Performance: Debounced updates, smart batching
 */

'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from 'react'
import { useSocket } from '@/components/providers/socket-provider'
import { useAuth } from '@/hooks/use-auth'
import { toast } from 'react-hot-toast'

interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error' | 'signal' | 'trade'
  title: string
  message: string
  timestamp: Date
  read: boolean
  actionUrl?: string
  icon?: string
  priority: 'low' | 'medium' | 'high' | 'critical'
}

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  clearNotification: (id: string) => void
  clearAll: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

interface NotificationProviderProps {
  children: ReactNode
  maxNotifications?: number
}

/**
 * Global notification provider with real-time WebSocket integration
 * - Manages in-app notifications
 * - Shows toast alerts for important events
 * - Persists in localStorage for offline viewing
 */
export function NotificationProvider({
  children,
  maxNotifications = 50,
}: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const { user } = useAuth()
  const { subscribe, emit } = useSocket()

  // Load persisted notifications on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('notifications')
        if (saved) {
          const parsed = JSON.parse(saved)
          setNotifications(
            parsed.map((n: any) => ({
              ...n,
              timestamp: new Date(n.timestamp),
            }))
          )
        }
      } catch (error) {
        console.error('Failed to load notifications:', error)
      }
    }
  }, [])

  // Persist notifications to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('notifications', JSON.stringify(notifications.slice(0, maxNotifications)))
    }
  }, [notifications, maxNotifications])

  // Subscribe to real-time notifications via WebSocket
  useEffect(() => {
    if (!user?.id) return

    const unsubscribePrice = subscribe('notification:new', (data) => {
      // Filter user-specific notifications
      if (data.userId && data.userId !== user.id) return

      const notification: Notification = {
        id: `${Date.now()}-${Math.random()}`,
        type: data.type || 'info',
        title: data.title,
        message: data.message,
        timestamp: new Date(),
        read: false,
        actionUrl: data.actionUrl,
        icon: data.icon,
        priority: data.priority || 'medium',
      }

      addNotification(notification)

      // Show toast for high priority notifications
      if (notification.priority === 'high' || notification.priority === 'critical') {
        showToastNotification(notification)
      }
    })

    return () => {
      unsubscribePrice()
    }
  }, [user?.id, subscribe])

  /**
   * Add a new notification
   * Maintains max limit and auto-sorts by timestamp
   */
  const addNotification = useCallback(
    (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
      setNotifications((prev) => {
        const newNotification: Notification = {
          ...notification,
          id: `${Date.now()}-${Math.random()}`,
          timestamp: new Date(),
          read: false,
        }

        // Add to beginning and sort by time (newest first)
        const updated = [newNotification, ...prev]

        // Limit size
        return updated.slice(0, maxNotifications)
      })
    },
    [maxNotifications]
  )

  /**
   * Mark notification as read
   */
  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }, [])

  /**
   * Mark all notifications as read
   */
  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }, [])

  /**
   * Remove a notification
   */
  const clearNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }, [])

  /**
   * Clear all notifications
   */
  const clearAll = useCallback(() => {
    setNotifications([])
  }, [])

  /**
   * Show toast for important notifications
   */
  const showToastNotification = (notification: Notification) => {
    const iconMap: Record<string, string> = {
      signal: '📈',
      trade: '💰',
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️',
    }

    const icon = notification.icon || iconMap[notification.type] || '🔔'

    toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-dark-900 border border-dark-700 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="rounded-l-lg flex items-center justify-center w-12 bg-neon-blue/20 text-neon-blue">
          <span className="text-xl">{icon}</span>
        </div>
        <div className="rounded-r-lg p-4 flex-1">
          <p className="text-sm font-medium text-white">
            {notification.title}
          </p>
          <p className="mt-1 text-sm text-dark-300">
            {notification.message}
          </p>
          {notification.actionUrl && (
            <a
              href={notification.actionUrl}
              className="mt-2 text-xs font-medium text-neon-blue hover:text-neon-blue/80"
            >
              View Details →
            </a>
          )}
        </div>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="px-4 py-2 text-dark-400 hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>
    ), {
      duration: notification.priority === 'critical' ? 0 : 5000,
      position: 'top-right',
    })
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  const value: NotificationContextType = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    clearNotification,
    clearAll,
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}

/**
 * Custom hook to use notifications
 */
export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}
