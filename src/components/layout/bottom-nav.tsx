/**
 * Mobile Bottom Navigation
 * Purpose: Bottom tab bar for mobile users
 * Features: Quick access to main features, active state indicators
 * Performance: Sticky positioning, optimized reflows
 */

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  BarChart3,
  LineChart,
  TrendingUp,
  Bell,
  User,
  Menu,
} from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { useNotifications } from '@/components/providers/notification-provider'

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  activeIcon?: React.ReactNode
  requiresAuth?: boolean
  badge?: number
}

/**
 * Bottom navigation for mobile devices
 * Fixed to bottom, 5-item maximum for thumb reach
 */
export function BottomNav() {
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()
  const { unreadCount } = useNotifications()

  const mainNavItems: NavItem[] = [
    {
      label: 'Home',
      href: '/',
      icon: <BarChart3 size={22} />,
      requiresAuth: false,
    },
    {
      label: 'Markets',
      href: '/markets',
      icon: <LineChart size={22} />,
      requiresAuth: false,
    },
    {
      label: 'Trade',
      href: '/trade',
      icon: <TrendingUp size={22} />,
      requiresAuth: true,
      badge: 1,
    },
    {
      label: 'Alerts',
      href: '/notifications',
      icon: <Bell size={22} />,
      requiresAuth: true,
      badge: unreadCount,
    },
    {
      label: 'More',
      href: '/menu',
      icon: <Menu size={22} />,
      requiresAuth: true,
    },
  ]

  // Filter items based on auth status
  const visibleItems = mainNavItems.filter((item) => {
    if (item.requiresAuth && !isAuthenticated) return false
    return true
  })

  return (
    <nav className="lg:hidden sticky-bottom-mobile bg-dark-950/95 backdrop-blur-xl border-t border-dark-800 safe-area-inset-bottom">
      <div className="flex items-center justify-around h-16 max-w-screen-xl mx-auto px-2">
        {visibleItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'relative flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all duration-200',
                'active:scale-95 touch-manipulation',
                isActive
                  ? 'text-neon-blue'
                  : 'text-dark-400 hover:text-white'
              )}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              {/* Icon with badge */}
              <div className="relative">
                {isActive ? item.activeIcon || item.icon : item.icon}

                {/* Notification badge */}
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-4 min-w-[1rem] items-center justify-center px-1 rounded-full bg-trading-down text-[10px] font-bold text-white">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </div>

              {/* Label */}
              <span className="text-[10px] font-medium truncate max-w-full">
                {item.label}
              </span>

              {/* Active indicator dot */}
              {isActive && (
                <div className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-neon-blue" />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
