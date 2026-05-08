/**
 * Pricing Section
 */

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for trying out the platform',
    features: ['Real-time quotes', 'Demo account', '5 watchlists', 'Basic charts', 'Email support'],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$49',
    period: 'month',
    description: 'For serious traders',
    features: ['Everything in Free', 'AI assistant', 'Premium signals', 'Unlimited watchlists', 'Advanced indicators', 'Priority support'],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Institutional',
    price: '$149',
    period: 'month',
    description: 'For professionals and funds',
    features: ['Everything in Pro', '1-on-1 coaching', 'API access', 'Custom indicators', 'White-glove support', 'Dedicated account manager'],
    cta: 'Contact Sales',
    popular: false,
  },
]

export function PricingSection() {
  return (
    <section className="py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
          Simple, transparent <span className="text-neon-blue">pricing</span>
        </h2>
        <p className="text-dark-300 text-lg max-w-2xl mx-auto">
          Choose the plan that fits your trading style.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, i) => (
          <Card
            key={i}
            className={`relative flex flex-col ${plan.popular ? 'border-neon-blue shadow-neon-blue/20 scale-105' : ''}`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge variant="info" className="px-3">Most Popular</Badge>
              </div>
            )}

            <CardContent className="p-8 flex-1 flex flex-col">
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-dark-400 text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-display font-bold">{plan.price}</span>
                  <span className="text-dark-400">/{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-trading-up flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${plan.popular ? 'bg-gradient-to-r from-neon-blue to-neon-purple' : ''}`}
                variant={plan.popular ? 'default' : 'outline'}
              >
                {plan.cta}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
