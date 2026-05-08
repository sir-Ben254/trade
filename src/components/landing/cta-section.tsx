/**
 * CTA Section
 */

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

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
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        <p className="text-xs text-dark-500 mt-6">
          No credit card required • 14-day free trial • Cancel anytime
        </p>
      </div>
    </section>
  )
}
