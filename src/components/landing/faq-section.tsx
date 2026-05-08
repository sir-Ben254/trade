/**
 * FAQ Section
 */

import { Card, CardContent } from '@/components/ui/card'

const faqs = [
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
    a: "We offer competitive spreads starting from 0.0 pips on major pairs. No hidden fees, transparent pricing.",
  },
  {
    q: "Is my money safe?",
    a: "Yes. We use bank-level encryption, keep client funds in segregated accounts with top-tier banks, and are fully regulated in multiple jurisdictions.",
  },
]

export function FAQSection() {
  return (
    <section className="py-20 bg-dark-900/30">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
          Frequently asked <span className="text-neon-blue">questions</span>
        </h2>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, i) => (
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
