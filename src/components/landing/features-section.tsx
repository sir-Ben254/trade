/**
 * Features Section
 */

import { Card, CardContent } from '@/components/ui/card'

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

export function FeaturesSection() {
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
