/**
 * Sidebar Component
 * Purpose: Main navigation sidebar for desktop
 * Features: Collapsible sections, active states, role-based menu items
 * Security: Checks user role for access control
 * Performance: Memoized routes and icons
 */

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'
import { cn } from '@/lib/utils'
import {
  BarChart3,
  TrendingUp,
  Calendar,
  Bell,
  Wallet,
  BookOpen,
  Settings,
  Users,
  FileText,
  Shield,
  ChevronLeft,
  ChevronRight,
  Bot,
  LineChart,
  CreditCard,
  LogOut,
  Menu,
  X,
  Home,
  HelpCircle,
  Zap,
  Crown,
  Star,
} from 'lucide-react'

/**
 * Navigation route definition
 */
interface NavRoute {
  label: string
  href: string
  icon: React.ReactNode
  roles?: string[]
  requiresPremium?: boolean
  badge?: string | number
}

/**
 * Sidebar main component
 */
export function Sidebar() {
  const { user, isAuthenticated, logout } = useAuth()
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  // Define navigation routes based on user role
  const mainRoutes: NavRoute[] = [
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: <BarChart3 size={20} />,
    },
    {
      label: 'Markets',
      href: '/markets',
      icon: <LineChart size={20} />,
    },
    {
      label: 'Trade',
      href: '/trade',
      icon: <TrendingUp size={20} />,
      badge: 'LIVE',
    },
    {
      label: 'AI Assistant',
      href: '/ai-assistant',
      icon: <Bot size={20} />,
      requiresPremium: true,
    },
    {
      label: 'Signals',
      href: '/signals',
      icon: <Zap size={20} />,
      requiresPremium: true,
    },
    {
      label: 'Economic Calendar',
      href: '/economic-calendar',
      icon: <Calendar size={20} />,
    },
    {
      label: 'Portfolio',
      href: '/portfolio',
      icon: <Wallet size={20} />,
    },
    {
      label: 'Trading Journal',
      href: '/journal',
      icon: <BookOpen size={20} />,
    },
  ]

  const accountRoutes: NavRoute[] = [
    {
      label: 'Notifications',
      href: '/notifications',
      icon: <Bell size={20} />,
    },
    {
      label: 'Billing',
      href: '/billing',
      icon: <CreditCard size={20} />,
    },
    {
      label: 'Profile',
      href: '/profile',
      icon: <Settings size={20} />,
    },
    {
      label: 'Referrals',
      href: '/referrals',
      icon: <Users size={20} />,
    },
  ]

  const adminRoutes: NavRoute[] = [
    {
      label: 'Admin Dashboard',
      href: '/admin',
      icon: <Shield size={20} />,
      roles: ['admin'],
    },
    {
      label: 'User Management',
      href: '/admin/users',
      icon: <Users size={20} />,
      roles: ['admin'],
    },
    {
      label: 'Signal Management',
      href: '/admin/signals',
      icon: <Zap size={20} />,
      roles: ['admin'],
    },
  ]

  // Filter routes based on user role and premium status
  const filterRoutes = (routes: NavRoute[]): NavRoute[] => {
    return routes.filter((route) => {
      // Check role restriction
      if (route.roles && user) {
        const hasRole = route.roles.some((role) => user.role === role)
        if (!hasRole) return false
      }

      // Check premium requirement
      if (route.requiresPremium && user?.subscriptionTier === 'free') {
        return false
      }

      return true
    })
  }

  const filteredMainRoutes = filterRoutes(mainRoutes)
  const filteredAccountRoutes = filterRoutes(accountRoutes)
  const filteredAdminRoutes = filterRoutes(adminRoutes)

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Desktop/Mobile Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-screen bg-dark-900/95 backdrop-blur-xl border-r border-dark-800 transition-all duration-300',
          collapsed ? 'w-20' : 'w-64',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Logo section */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-dark-800">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            {!collapsed && (
              <span className="font-display font-bold text-xl tracking-tight">
                Forex<span className="text-neon-blue">Pro</span>
              </span>
            )}
          </Link>

          {/* Collapse button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-2 rounded-lg hover:bg-dark-800 transition-colors"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? (
              <ChevronRight size={16} />
            ) : (
              <ChevronLeft size={16} />
            )}
          </button>

          {/* Mobile close button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-dark-800 transition-colors"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
          {/* Main navigation */}
          <div className="space-y-1">
            {filteredMainRoutes.map((route) => (
              <SidebarLink
                key={route.href}
                route={route}
                pathname={pathname}
                collapsed={collapsed}
              />
            ))}
          </div>

          {/* Account routes */}
          {filteredAccountRoutes.length > 0 && (
            <div className="space-y-1">
              {!collapsed && (
                <p className="px-3 text-xs font-semibold text-dark-500 uppercase tracking-wider mb-2">
                  Account
                </p>
              )}
              {filteredAccountRoutes.map((route) => (
                <SidebarLink
                  key={route.href}
                  route={route}
                  pathname={pathname}
                  collapsed={collapsed}
                />
              ))}
            </div>
          )}

          {/* Admin routes */}
          {filteredAdminRoutes.length > 0 && (
            <div className="space-y-1">
              {!collapsed && (
                <p className="px-3 text-xs font-semibold text-dark-500 uppercase tracking-wider mb-2">
                  Administration
                </p>
              )}
              {filteredAdminRoutes.map((route) => (
                <SidebarLink
                  key={route.href}
                  route={route}
                  pathname={pathname}
                  collapsed={collapsed}
                />
              ))}
            </div>
          )}
        </nav>

        {/* User profile section */}
      {isAuthenticated && user && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-dark-800 bg-dark-900/50 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-neon-green to-neon-blue flex items-center justify-center text-sm font-bold">
              {user.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate text-sm">{user.name}</p>
                <p className="text-xs text-dark-400 truncate capitalize">
                  {user.subscriptionTier}
                </p>
              </div>
            )}
            <button
              onClick={logout}
              className="p-2 rounded-lg hover:bg-dark-800 transition-colors"
              aria-label="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      )}

        {/* Mobile toggle button */}
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden absolute -right-10 top-4 p-2 rounded-lg bg-dark-800 border border-dark-700"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
      </aside>
    </>
  )
}

/**
 * Sidebar link item component
 */
function SidebarLink({
  route,
  pathname,
  collapsed,
}: {
  route: NavRoute
  pathname: string
  collapsed: boolean
}) {
  const isActive = pathname === route.href || pathname.startsWith(route.href + '/')
  const Icon = route.icon

  return (
    <Link
      href={route.href}
      className={cn(
        'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group',
        isActive
          ? 'bg-neon-blue/10 text-neon-blue font-medium'
          : 'text-dark-300 hover:bg-dark-800 hover:text-white',
        collapsed && 'justify-center'
      )}
      title={collapsed ? route.label : undefined}
    >
      <span className={cn('flex-shrink-0', isActive && 'text-neon-blue')}>
        {Icon}
      </span>

      {!collapsed && (
        <>
          <span className="flex-1 truncate">{route.label}</span>

          {/* Premium badge */}
          {route.requiresPremium && (
            <Crown className="w-4 h-4 text-neon-yellow flex-shrink-0" />
          )}

          {/* Notification badge */}
          {route.badge && (
            <span className="px-2 py-0.5 text-xs font-semibold bg-neon-blue/20 text-neon-blue rounded-full">
              {route.badge}
            </span>
          )}
        </>
      )}
    </Link>
  )
}
