/**
 * Hero Section Component
 */

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="min-h-[85vh] flex items-center justify-center pt-20">
      <div className="container mx-auto px-4 text-center">
        <div className="space-y-8 max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-neon-blue/30">
            <span className="w-2 h-2 rounded-full bg-neon-blue animate-pulse" />
            <span className="text-sm text-neon-blue font-medium">Now in Beta - Free Access</span>
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
            Join <span className="text-neon-blue font-semibold">100,000+</span> traders worldwide.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="xl" className="text-lg px-8">
              Start Trading Free
            </Button>
            <Button size="xl" variant="outline" className="text-lg px-8">
              Watch Demo
              <ArrowRight className="w-5 h-5 ml-2" />
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
