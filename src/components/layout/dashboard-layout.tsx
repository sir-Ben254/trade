/**
 * Dashboard Layout Page Wrapper
 * Purpose: Consistent layout for all dashboard pages
 * Features: Sidebar, header, responsive design
 */

import { Sidebar } from '@/components/layout/sidebar'
import { Header } from '@/components/layout/header'
import { BottomNav } from '@/components/layout/bottom-nav'

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block fixed left-0 top-0 h-screen w-64 z-50">
        <Sidebar />
      </aside>

      {/* Main content */}
      <main className="flex-1 lg:ml-64 min-h-screen">
        {/* Header */}
        <Header />

        {/* Page content */}
        <div className="p-4 md:p-6 lg:p-8 pb-20 md:pb-8">
          {children}
        </div>

        {/* Mobile bottom navigation */}
        <nav className="lg:hidden sticky-bottom-mobile">
          <BottomNav />
        </nav>
      </main>
    </div>
  )
}
