/**
 * Testimonials Section
 */

import { Card, CardContent } from '@/components/ui/card'

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

export function TestimonialsSection() {
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
