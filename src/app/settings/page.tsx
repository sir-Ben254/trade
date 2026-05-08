/**
 * Settings Page with Navigation
 * Purpose: Settings hub linking to all account settings
 */

import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  User,
  CreditCard,
  Bell,
  Shield,
  Palette,
  Key,
  Users,
  HelpCircle,
} from 'lucide-react'
import Link from 'next/link'

const settingsSections = [
  {
    title: 'Profile',
    description: 'Personal information and bio',
    icon: User,
    href: '/settings/profile',
    gradient: 'from-neon-blue to-neon-cyan',
  },
  {
    title: 'Billing',
    description: 'Subscription and payment methods',
    icon: CreditCard,
    href: '/settings/billing',
    gradient: 'from-neon-green to-neon-blue',
  },
  {
    title: 'Notifications',
    description: 'Email, push, and alert preferences',
    icon: Bell,
    href: '/settings/notifications',
    gradient: 'from-neon-orange to-neon-yellow',
  },
  {
    title: 'Security',
    description: 'Password and two-factor authentication',
    icon: Shield,
    href: '/settings/security',
    gradient: 'from-neon-purple to-neon-pink',
  },
  {
    title: 'API Keys',
    description: 'Manage API access and integrations',
    icon: Key,
    href: '/settings/api',
    gradient: 'from-neon-cyan to-neon-blue',
  },
  {
    title: 'Referrals',
    description: 'Your referral links and earnings',
    icon: Users,
    href: '/referrals',
    gradient: 'from-neon-green to-neon-yellow',
  },
  {
    title: 'Help & Support',
    description: 'FAQs, contact, and troubleshooting',
    icon: HelpCircle,
    href: '/help',
    gradient: 'from-neon-blue to-neon-purple',
  },
]

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">Settings</h1>
          <p className="text-dark-400 mt-1">
            Manage your account preferences and security
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {settingsSections.map((section) => (
            <Link key={section.href} href={section.href}>
              <Card className="h-full hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6">
                  <div
                    className="w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                    className={`bg-gradient-to-br ${section.gradient}`}
                  >
                    <section.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{section.title}</h3>
                  <p className="text-sm text-dark-400">{section.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
