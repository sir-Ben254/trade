/**
 * Billing & Subscriptions Page
 * Purpose: Manage subscription, payment methods, invoices
 */

'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  CreditCard,
  Plus,
  Check,
  Crown,
  Zap,
  Star,
  Loader2,
} from 'lucide-react'
import { cn, formatCurrency } from '@/lib/utils'

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    period: 'forever',
    description: 'For beginners exploring the platform',
    features: [
      'Basic market data',
      'Demo trading account',
      '5 watchlist items',
      'Email support',
      'Basic charts',
    ],
    popular: false,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 49,
    period: 'month',
    description: 'For serious traders',
    features: [
      'Live real-time data',
      'AI trading assistant',
      'Unlimited watchlists',
      'Premium signals',
      'Advanced charting',
      'Priority support',
      'Trading journal',
      'Economic calendar',
    ],
    popular: true,
  },
  {
    id: 'vip',
    name: 'VIP',
    price: 149,
    period: 'month',
    description: 'For professional traders',
    features: [
      'Everything in Premium',
      '1-on-1 coaching calls',
      'Custom indicators',
      'Institutional research',
      'API access',
      'White-glove support',
      'Early feature access',
      'Custom strategy builder',
    ],
    popular: false,
  },
]

export default function BillingPage() {
  const [currentPlan] = useState('premium')
  const [isLoading, setIsLoading] = useState(false)

  const handleUpgrade = async (planId: string) => {
    setIsLoading(true)
    // Simulate checkout (replace with Stripe Checkout)
    setTimeout(() => {
      setIsLoading(false)
      window.location.href = `/api/checkout?plan=${planId}`
    }, 1000)
  }

  const handleManageSubscription = async () => {
    setIsLoading(true)
    // Redirect to Stripe Customer Portal
    setTimeout(() => {
      setIsLoading(false)
      console.log('Redirect to customer portal')
    }, 1000)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">Billing & Subscription</h1>
          <p className="text-dark-400 mt-1">
            Manage your subscription and payment methods
          </p>
        </div>

        {/* Current subscription card */}
        <Card className="border-neon-blue/30 bg-gradient-to-br from-neon-blue/5 to-neon-purple/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-dark-400">Current Plan</p>
                  <h2 className="text-xl font-bold">Premium</h2>
                </div>
                <Badge variant="success" className="ml-2">
                  Active
                </Badge>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleManageSubscription}>
                  Manage Subscription
                </Button>
                <Button variant="ghost" className="text-trading-down">
                  Cancel Plan
                </Button>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-dark-800 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-dark-400">Next billing date</p>
                <p className="font-medium">June 1, 2026</p>
              </div>
              <div>
                <p className="text-sm text-dark-400">Amount</p>
                <p className="font-medium">$49.00 / month</p>
              </div>
              <div>
                <p className="text-sm text-dark-400">Payment method</p>
                <p className="font-medium">•••• 4242 (Visa)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Plans */}
        <div>
          <h2 className="text-2xl font-display font-bold mb-4">Available Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANS.map((plan) => (
              <Card
                key={plan.id}
                className={cn(
                  'relative flex flex-col',
                  plan.popular && 'border-neon-blue scale-105 shadow-neon-blue/20'
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-neon-blue to-neon-purple px-3">
                      <Zap className="w-3 h-3 mr-1" />
                      Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 mb-2">
                    {plan.id === 'vip' && <Crown className="w-5 h-5 text-neon-yellow" />}
                    {plan.id === 'premium' && <Star className="w-5 h-5 text-neon-blue" />}
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                  </div>
                  <p className="text-dark-400 text-sm">{plan.description}</p>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col">
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{formatCurrency(plan.price)}</span>
                    <span className="text-dark-400"> / {plan.period}</span>
                  </div>

                  <ul className="space-y-3 mb-6 flex-1">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-trading-up flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={plan.popular ? 'default' : 'outline'}
                    className={cn(
                      'w-full',
                      plan.popular && 'bg-gradient-to-r from-neon-blue to-neon-purple'
                    )}
                    disabled={isLoading || plan.id === currentPlan}
                    onClick={() => handleUpgrade(plan.id)}
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : plan.id === currentPlan ? (
                      'Current Plan'
                    ) : plan.id === 'free' ? (
                      'Downgrade'
                    ) : (
                      'Upgrade Now'
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Payment methods */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Payment Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-lg bg-dark-800 border border-dark-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-dark-700 flex items-center justify-center text-xs font-bold">
                    VISA
                  </div>
                  <div>
                    <p className="font-medium">•••• 4242</p>
                    <p className="text-xs text-dark-400">Expires 12/2026</p>
                  </div>
                </div>
                <Badge variant="success">Default</Badge>
              </div>

              <Button variant="outline" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Payment Method
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
