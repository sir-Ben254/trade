/**
 * Footer Component
 * Purpose: Site-wide footer with links, legal, social
 */

import Link from 'next/link'
import { Separator } from '@/components/ui/separator'

const footerLinks = {
  product: [
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Markets', href: '/markets' },
    { label: 'Signals', href: '/signals' },
    { label: 'Economic Calendar', href: '/economic-calendar' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
    { label: 'Partners', href: '/partners' },
  ],
  resources: [
    { label: 'Documentation', href: '/docs' },
    { label: 'API Reference', href: '/api' },
    { label: 'Help Center', href: '/help' },
    { label: 'Community', href: '/community' },
    { label: 'Webinars', href: '/webinars' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Risk Disclosure', href: '/risk-disclosure' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],
}

const socialLinks = [
  { name: 'Twitter', href: 'https://twitter.com/forexpro', icon: '𝕏' },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/forexpro', icon: 'in' },
  { name: 'Discord', href: 'https://discord.gg/forexpro', icon: '►' },
  { name: 'YouTube', href: 'https://youtube.com/c/forexpro', icon: '▶' },
  { name: 'Telegram', href: 'https://t.me/forexpro', icon: '✈' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark-950 border-t border-dark-800">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand column */}
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
                <span className="text-xl font-bold">F</span>
              </div>
              <span className="font-display font-bold text-xl">
                Forex<span className="text-neon-blue">Pro</span>
              </span>
            </Link>
            <p className="text-dark-400 text-sm leading-relaxed max-w-xs mb-6">
              Institutional-grade forex trading platform with AI-powered analytics, real-time data, and advanced risk management tools.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-dark-800 border border-dark-700 flex items-center justify-center text-sm hover:bg-dark-700 hover:border-neon-blue/30 transition-colors"
                  aria-label={`Follow us on ${social.name}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Product links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-dark-400 hover:text-neon-blue text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-dark-400 hover:text-neon-blue text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-dark-400 hover:text-neon-blue text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter signup */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Stay Updated</h4>
            <p className="text-dark-400 text-sm mb-4">
              Get the latest market insights and product updates.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg text-sm text-white placeholder-dark-400 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue/50"
              />
              <button
                type="submit"
                className="w-full px-3 py-2 bg-neon-blue text-white rounded-lg text-sm font-medium hover:bg-neon-blue/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <Separator className="bg-dark-800" />
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-dark-400">
          <div className="text-center md:text-left">
            © {currentYear} ForexPro. All rights reserved. Trading involves significant risk.
          </div>
          <div className="flex items-center gap-4">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-neon-blue transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Risk warning */}
        <div className="mt-6 p-4 bg-dark-900/50 border border-dark-800 rounded-lg">
          <p className="text-xs text-dark-400 leading-relaxed">
            <strong className="text-dark-300">Risk Disclosure:</strong> Trading forex and CFDs carries a high level of risk and may not be suitable for all investors. Leverage can work both for and against you. Before deciding to trade, you should carefully consider your investment objectives, level of experience, and risk appetite. The possibility exists that you could sustain a loss of some or all of your initial investment and therefore you should not invest money that you cannot afford to lose. Past performance is not indicative of future results.
          </p>
        </div>
      </div>
    </footer>
  )
}
