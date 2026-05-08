/*
 * LANDING PAGE SECTIONS
 * Purpose: Hero, Features, Pricing, Testimonials, FAQ, CTA
 */

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check } from 'lucide-react'
import Link from 'next/link'

/**
 * Hero Section
 */
export function HeroSection() {
  return (
    <section className="min-h-[85vh] flex items-center justify-center pt-20">
      <div className="container mx-auto px-4 text-center">
        <div className="space-y-8 max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-neon-blue/30">
            <span className="w-2 h-2 rounded-full bg-neon-blue animate-pulse" />
            <span className="text-sm text-neon-blue font-medium">Now in Beta - Join Free</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight">
            <span className="text-white">Trade Forex Like</span>
            <br />
            <span className="gradient-text">An Institution</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-dark-300 max-w-3xl mx-auto leading-relaxed">
            AI-powered analytics, institutional-grade tools, and real-time market data.
            Join over <span className="text-neon-blue font-semibold">100,000+</span> traders who trust ForexPro.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="xl" className="text-lg px-8">
              Start Trading Free
            </Button>
            <Button size="xl" variant="outline" className="text-lg px-8">
              <span className="i-lucide-play-circle mr-2" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
            {[
              { value: '$2.5B+', label: 'Trading Volume' },
              { value: '100K+', label: 'Active Traders' },
              { value: '150+', label: 'Currency Pairs' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl md:text-4xl font-display font-bold gradient-text">{stat.value}</p>
                <p className="text-sm text-dark-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * Features Section
 */
export function FeaturesSection() {
  const features = [
    {
      icon: '📈',
      title: 'Advanced Analytics',
      description: 'Deep market insights with AI-powered predictions, sentiment analysis, and advanced charting tools.',
    },
    {
      icon: '🤖',
      title: 'AI Trading Assistant',
      description: 'Get personalized trade recommendations, risk assessments, and market analysis from our GPT-4 powered assistant.',
    },
    {
      icon: '📡',
      title: 'Real-time Data',
      description: 'Millisecond-latency price feeds from top liquidity providers with 99.99% uptime guarantee.',
    },
    {
      icon: '🛡️',
      title: 'Bank-Grade Security',
      description: 'Enterprise security with encryption, 2FA, and compliance with international financial regulations.',
    },
    {
      icon: '📱',
      title: 'Mobile-First Design',
      description: 'Trade on the go with our PWA. Native app experience on any device.',
    },
    {
      icon: '💰',
      title: 'Low Fees',
      description: 'Competitive spreads starting from 0.0 pips. No hidden fees. Transparent pricing.',
    },
  ]

  return (
    <section>
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-3xl md:text-5xl font-display font-bold">
          Everything you need to{' '}
          <span className="text-neon-blue">trade profitably</span>
        </h2>
        <p className="text-dark-300 text-lg max-w-2xl mx-auto">
          Powerful tools designed for both beginners and professional traders
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, i) => (
          <Card key={i} className="group hover:-translate-y-2 transition-all duration-300">
            <CardContent className="p-6">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 border border-neon-blue/30 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-dark-400 leading-relaxed">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

/**
 * Pricing Section
 */
export function PricingSection() {
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

  return (
    <section className="py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
          Simple, transparent <span className="text-neon-blue">pricing</span>
        </h2>
        <p className="text-dark-300 text-lg max-w-2xl mx-auto">
          Choose the plan that fits your trading style. All plans include a 14-day free trial.
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
                <Badge variant="info" className="px-3">
                  <span className="i-lucide-zap w-3 h-3 mr-1" />
                  Most Popular
                </Badge>
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

/**
 * Testimonials Section
 */
export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "ForexPro transformed my trading. The AI insights are like having a mentor 24/7.",
      author: "Sarah K.",
      role: "Professional Trader",
      avatar: "SK",
    },
    {
      quote: "The best platform I've used. Charting tools are Bloomberg-level quality.",
      author: "Michael R.",
      role: "Hedge Fund Analyst",
      avatar: "MR",
    },
    {
      quote: "Signals accuracy is remarkable. Consistently profitable since I started.",
      author: "Emma L.",
      role: "Retail Trader",
      avatar: "EL",
    },
  ]

  return (
    <section className="py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
          Loved by <span className="text-neon-blue">traders worldwide</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonials.map((t, i) => (
          <Card key={i} className="glass">
            <CardContent className="p-6">
              <p className="text-lg leading-relaxed mb-6">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center font-bold">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold">{t.author}</p>
                  <p className="text-sm text-dark-400">{t.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

/**
 * FAQ Section
 */
export function FAQSection() {
  return (
    <section className="py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
          Frequently asked <span className="text-neon-blue">questions</span>
        </h2>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {[
          {
            q: "Is ForexPro suitable for beginners?",
            a: "Absolutely! We offer a comprehensive learning center, demo account with $100,000 virtual funds, and intuitive interfaces designed for all skill levels.",
          },
          {
            q: "How accurate are the AI trading signals?",
            a: "Our AI prediction models have an average accuracy of 78% across major currency pairs. Past performance doesn't guarantee future results, but our track record speaks for itself.",
          },
          {
            q: "What are the fees?",
            a: "We offer competitive spreads starting from 0.0 pips on major pairs. There are no hidden fees, and we're transparent about all costs upfront.",
          },
          {
            q: "Is my money safe?",
            a: "Yes. We use bank-level encryption, keep client funds in segregated accounts with top-tier banks, and are fully regulated in multiple jurisdictions.",
          },
        ].map((faq, i) => (
          <details key={i} className="glass rounded-xl group">
            <summary className="cursor-pointer p-6 font-semibold list-none flex items-center justify-between">
              {faq.q}
              <span className="i-lucide-chevron-down w-5 h-5 group-open:rotate-180 transition-transform" />
            </summary>
            <div className="px-6 pb-6 text-dark-400 leading-relaxed">
              {faq.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}

/**
 * CTA Section
 */
export function CTASection() {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto text-center glass rounded-3xl p-12 md:p-16">
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
          Ready to start trading?
        </h2>
        <p className="text-dark-300 text-lg mb-8 max-w-2xl mx-auto">
          Join thousands of traders who trust ForexPro. Start with a free demo account and upgrade when you're ready.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="xl" className="text-lg px-8">
            Create Free Account
          </Button>
          <Button size="xl" variant="outline" className="text-lg px-8">
            Schedule Demo
          </Button>
        </div>

        <p className="text-xs text-dark-500 mt-6">
          No credit card required • 14-day free trial • Cancel anytime
        </p>
      </div>
    </section>
  )
}
