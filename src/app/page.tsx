/**
 * Main Landing Page - ForexPro Trading Platform
 * Purpose: Hero section, live ticker, features, pricing, testimonials
 * Security: No sensitive data exposed
 * Performance: Lazy loads heavy components, optimized images, skeleton loading
 */

import { Suspense } from 'react'
import { HeroSection } from '@/components/landing/hero-section'
import { LiveTicker } from '@/components/market/live-ticker'
import { FeaturesSection } from '@/components/landing/features-section'
import { PricingSection } from '@/components/landing/pricing-section'
import { TestimonialsSection } from '@/components/landing/testimonials-section'
import { FAQSection } from '@/components/landing/faq-section'
import { CTASection } from '@/components/landing/cta-section'
import { Footer } from '@/components/layout/footer'
import { LoadingSkeleton } from '@/components/shared/loading-skeleton'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-dark-950 text-white overflow-hidden">
      {/* Animated background mesh gradient */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-neon-blue/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-neon-purple/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
      </div>

      {/* Live forex ticker bar (top) */}
      <Suspense fallback={<div className="h-10 bg-dark-900 border-b border-dark-800 animate-pulse" />}>
        <LiveTicker />
      </Suspense>

      {/* Main content flow */}
      <main className="relative z-10">
        {/* Hero Section */}
        <Suspense fallback={<HeroSkeleton />}>
          <HeroSection />
        </Suspense>

        {/* Features Section */}
        <section id="features" className="py-20 md:py-32 scroll-mt-20">
          <div className="container mx-auto px-4 md:px-6">
            <Suspense fallback={<SectionSkeleton />}>
              <FeaturesSection />
            </Suspense>
          </div>
        </section>

        {/* Stats Section with Animated Numbers */}
        <section className="py-16 bg-dark-900/50 backdrop-blur-sm border-y border-dark-800">
          <div className="container mx-auto px-4 md:px-6">
            <Suspense fallback={<StatsSkeleton />}>
              <StatsSection />
            </Suspense>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 md:py-32 scroll-mt-20">
          <div className="container mx-auto px-4 md:px-6">
            <Suspense fallback={<SectionSkeleton />}>
              <PricingSection />
            </Suspense>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20 md:py-32 scroll-mt-20">
          <div className="container mx-auto px-4 md:px-6">
            <Suspense fallback={<SectionSkeleton />}>
              <HowItWorksSection />
            </Suspense>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-20 md:py-32 scroll-mt-20">
          <div className="container mx-auto px-4 md:px-6">
            <Suspense fallback={<SectionSkeleton />}>
              <TestimonialsSection />
            </Suspense>
          </div>
        </section>

        {/* Economic Calendar Preview */}
        <section className="py-20 md:py-32 bg-dark-900/30">
          <div className="container mx-auto px-4 md:px-6">
            <Suspense fallback={<SectionSkeleton />}>
              <EconomicCalendarPreview />
            </Suspense>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <Suspense fallback={<SectionSkeleton />}>
              <CTASection />
            </Suspense>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 md:py-32 bg-dark-900/30 scroll-mt-20">
          <div className="container mx-auto px-4 md:px-6">
            <Suspense fallback={<SectionSkeleton />}>
              <FAQSection />
            </Suspense>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating elements for visual depth */}
      <FloatingElements />
    </div>
  )
}

/**
 * Hero Section Skeleton Loader
 */
function HeroSkeleton() {
  return (
    <section className="min-h-[90vh] flex items-center justify-center pt-20">
      <div className="container mx-auto px-4 text-center">
        <div className="space-y-8 max-w-4xl mx-auto">
          {/* Badge skeleton */}
          <div className="h-8 w-32 mx-auto rounded-full skeleton" />

          {/* Headline skeleton */}
          <div className="space-y-4">
            <div className="h-16 md:h-24 mx-auto rounded skeleton w-full max-w-3xl" />
            <div className="h-16 md:h-24 mx-auto rounded skeleton w-3/4 max-w-2xl" />
          </div>

          {/* Description skeleton */}
          <div className="h-6 mx-auto rounded skeleton w-full max-w-2xl" />
          <div className="h-6 mx-auto rounded skeleton w-5/6 max-w-xl" />

          {/* CTA skeleton */}
          <div className="flex gap-4 justify-center pt-8">
            <div className="h-12 w-40 rounded-lg skeleton" />
            <div className="h-12 w-40 rounded-lg skeleton" />
          </div>

          {/* Stats skeleton */}
          <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 rounded skeleton" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * Section Skeleton Loader
 */
function SectionSkeleton() {
  return (
    <div className="space-y-16">
      {/* Section header */}
      <div className="text-center space-y-4">
        <div className="h-8 w-48 mx-auto rounded skeleton" />
        <div className="h-4 w-96 mx-auto rounded skeleton" />
      </div>

      {/* Cards grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-80 rounded-2xl skeleton" />
        ))}
      </div>
    </div>
  )
}

/**
 * Stats Section Skeleton
 */
function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="text-center space-y-2">
          <div className="h-12 w-32 mx-auto rounded skeleton" />
          <div className="h-4 w-24 mx-auto rounded skeleton" />
        </div>
      ))}
    </div>
  )
}

/**
 * Floating decorative elements for visual interest
 */
function FloatingElements() {
  return (
    <>
      {/* Animated floating orbs */}
      <div className="fixed top-1/4 left-10 w-64 h-64 bg-neon-blue/5 rounded-full filter blur-3xl animate-float opacity-30 pointer-events-none" />
      <div className="fixed bottom-1/4 right-10 w-96 h-96 bg-neon-purple/5 rounded-full filter blur-3xl animate-float opacity-20 pointer-events-none" style={{ animationDelay: '2s' }} />
      <div className="fixed top-1/2 left-1/3 w-48 h-48 bg-neon-green/5 rounded-full filter blur-3xl animate-float opacity-25 pointer-events-none" style={{ animationDelay: '4s' }} />

      {/* Gradient mesh background */}
      <div className="fixed inset-0 bg-gradient-to-b from-dark-950 via-dark-950 to-dark-900 opacity-50 pointer-events-none" />
    </>
  )
}

/**
 * Stats Section Component
 */
function StatsSection() {
  const stats = [
    { value: '$2.5B+', label: 'Trading Volume' },
    { value: '100K+', label: 'Active Traders' },
    { value: '150+', label: 'Currency Pairs' },
    { value: '99.9%', label: 'Uptime' },
  ]

  return (
    <section className="relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group"
            >
              <div className="relative inline-block">
                <div className="absolute -inset-4 bg-neon-blue/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <p className="relative text-3xl md:text-5xl font-display font-bold gradient-text">
                  {stat.value}
                </p>
              </div>
              <p className="mt-2 text-dark-300 text-sm md:text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * How It Works Section Component
 */
function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      title: 'Create Account',
      description: 'Sign up in minutes with email or social login. No credit card required for demo.',
      icon: 'user-plus',
    },
    {
      number: '02',
      title: 'Verify Identity',
      description: 'Complete KYC for enhanced limits and features. Takes less than 24 hours.',
      icon: 'shield-check',
    },
    {
      number: '03',
      title: 'Fund & Trade',
      description: 'Deposit funds and start trading with institutional-grade tools and analytics.',
      icon: 'chart-line',
    },
    {
      number: '04',
      title: 'Grow & Scale',
      description: 'Use AI insights, signals, and risk management to optimize performance.',
      icon: 'trending-up',
    },
  ]

  return (
    <section>
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-purple mb-4">
          How It Works
        </h2>
        <p className="text-dark-300 text-lg max-w-2xl mx-auto">
          Get started in 4 simple steps and join thousands of successful traders
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="relative group"
          >
            {/* Connector line */}
            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-neon-blue/50 to-transparent z-0" />
            )}

            <div className="relative bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-2xl p-8 hover:border-neon-blue/50 transition-all duration-300 group-hover:-translate-y-2 z-10">
              {/* Step number */}
              <span className="absolute -top-4 -right-4 text-8xl font-display font-bold text-dark-800/50 leading-none">
                {step.number}
              </span>

              {/* Icon */}
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 border border-neon-blue/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">✨</span>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-dark-300 leading-relaxed">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
