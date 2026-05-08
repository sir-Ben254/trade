/**
 * Header Component
 * Purpose: Top navigation bar with search, notifications, user menu
 * Features: Breadcrumbs, theme toggle, mobile menu toggle
 */

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'
import { useNotifications } from '@/components/providers/notification-provider'
import { cn } from '@/lib/utils'
import { Bell, Search, Menu, X, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme/theme-toggle'

export function Header() {
  const { user, isAuthenticated } = useAuth()
  const { unreadCount, notifications, markAsRead } = useNotifications()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)

  // Generate breadcrumbs from pathname
  const breadcrumbs = generateBreadcrumbs(pathname)

  return (
    <header className="sticky top-0 z-30 h-16 bg-dark-900/80 backdrop-blur-xl border-b border-dark-800">
      <div className="h-full max-w-screen-2xl mx-auto px-4 flex items-center justify-between gap-4">
        {/* Left section - Mobile menu + Breadcrumbs */}
        <div className="flex items-center gap-4 min-w-0">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-dark-800 transition-colors"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>

          {/* Breadcrumbs */}
          <nav className="hidden md:flex items-center gap-2 text-sm">
            {breadcrumbs.map((crumb, index) => (
              <div key={crumb.href} className="flex items-center gap-2">
                {index > 0 && (
                  <span className="text-dark-500 text-xs">/</span>
                )}
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-white font-medium truncate max-w-[200px]">
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="text-dark-400 hover:text-white transition-colors truncate max-w-[120px]"
                  >
                    {crumb.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile page title */}
          <h1 className="md:hidden font-medium text-white truncate">
            {breadcrumbs[breadcrumbs.length - 1]?.label || 'ForexPro'}
          </h1>
        </div>

        {/* Center section - Search */}
        <div className="hidden md:flex flex-1 max-w-xl mx-4">
          <div
            className={cn(
              'relative w-full transition-all duration-200',
              searchFocused ? 'scale-105' : ''
            )}
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
            <input
              type="text"
              placeholder="Search pairs, indicators, strategies..."
              className="w-full bg-dark-800 border border-dark-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-dark-400 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue/50 transition-all"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-dark-400 bg-dark-700 rounded border border-dark-600">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
        </div>

        {/* Right section - Actions */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <ThemeToggle />

          {/* Notifications */}
          {isAuthenticated && (
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative p-2 rounded-lg hover:bg-dark-800 transition-colors"
                aria-label="Notifications"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-trading-down text-[10px] font-bold text-white animate-pulse">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {/* Dropdown */}
              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-dark-900 border border-dark-700 rounded-xl shadow-xl z-50 overflow-hidden">
                  <div className="p-4 border-b border-dark-800">
                    <h3 className="font-semibold">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.slice(0, 5).length === 0 ? (
                      <div className="p-4 text-center text-dark-400 text-sm">
                        No new notifications
                      </div>
                    ) : (
                      notifications.slice(0, 5).map((n) => (
                        <div
                          key={n.id}
                          className={cn(
                            'p-4 border-b border-dark-800 hover:bg-dark-800/50 transition-colors cursor-pointer',
                            !n.read && 'bg-neon-blue/5'
                          )}
                          onClick={() => markAsRead(n.id)}
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-dark-800 flex items-center justify-center">
                              {n.type === 'signal' && '📈'}
                              {n.type === 'trade' && '💰'}
                              {n.type === 'error' && '❌'}
                              {!['signal', 'trade', 'error'].includes(n.type) && '🔔'}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{n.title}</p>
                              <p className="text-xs text-dark-400 line-clamp-2">{n.message}</p>
                              <span className="text-xs text-dark-500 mt-1 block">
                                {new Date(n.timestamp).toLocaleTimeString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="p-2 border-t border-dark-800">
                    <Link
                      href="/notifications"
                      className="block text-center text-sm text-neon-blue hover:text-neon-blue/80 py-1"
                      onClick={() => setNotifOpen(false)}
                    >
                      View All Notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* User menu */}
          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-dark-800 border border-dark-700">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-neon-green to-neon-blue flex items-center justify-center text-xs font-bold">
                  {user.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <span className="text-sm font-medium">{user.name}</span>
              </div>
              <Button variant="outline" size="sm" onClick={() => {/* logout logic */}}>
                <LogOut size={16} />
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          )}

          {/* Mobile search toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-dark-800 transition-colors"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/60" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-72 bg-dark-900 border-r border-dark-800 p-4">
            <div className="flex items-center justify-between mb-6">
              <span className="font-display font-bold text-xl">Menu</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-dark-800 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            {/* Mobile navigation items */}
            <nav className="space-y-2">
              {breadcrumbs.map((crumb, index) => (
                <Link
                  key={crumb.href}
                  href={crumb.href}
                  className="block px-4 py-3 rounded-lg hover:bg-dark-800 transition-colors"
                >
                  {crumb.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

/**
 * Generate breadcrumb array from pathname
 */
function generateBreadcrumbs(pathname: string): Array<{ label: string; href: string }> {
  const segments = pathname.split('/').filter(Boolean)
  const breadcrumbs = [{ label: 'Home', href: '/' }]

  let currentPath = ''
  segments.forEach((segment) => {
    currentPath += `/${segment}`
    const formattedLabel = segment
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase())

    breadcrumbs.push({
      label: formattedLabel,
      href: currentPath,
    })
  })

  return breadcrumbs
}

import { cn } from '@/lib/utils'
