/**
 * Root Layout - Forex Trading Platform
 * Purpose: Root component that wraps all pages
 * Security: Sets security headers, CSP, and authentication state
 * Performance: Implements font optimization and prefetching
 */

import type { Metadata } from 'next'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import { Suspense } from 'react'
import { Providers } from '@/components/providers'
import { Header } from '@/components/layout/header'
import { BottomNav } from '@/components/layout/bottom-nav'
import { Sidebar } from '@/components/layout/sidebar'
import { Toaster } from '@/components/ui/toaster'
import '@/styles/globals.css'

// Font optimization - preload critical fonts
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-space-grotesk',
  preload: true,
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jetbrains-mono',
  preload: true,
})

// SEO metadata for the platform
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: {
    default: 'ForexPro - Institutional Grade Trading Platform',
    template: '%s | ForexPro',
  },
  description: 'Professional forex trading platform with AI-powered analytics, real-time market data, advanced charting, and institutional-grade tools. Trade 100+ currency pairs with competitive spreads.',
  keywords: [
    'forex trading',
    'currency trading',
    'foreign exchange',
    'trading platform',
    'live forex',
    'currency pairs',
    'trading signals',
    'AI trading',
    'technical analysis',
    'economic calendar',
    'risk management',
    'demo trading',
    'portfolio tracking',
    'trading journal',
  ],
  authors: [{ name: 'ForexPro Team' }],
  creator: 'ForexPro',
  publisher: 'ForexPro',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    siteName: 'ForexPro',
    title: 'ForexPro - Institutional Grade Trading Platform',
    description: 'Professional forex trading with AI analytics, real-time data, and advanced tools',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ForexPro Trading Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@forexpro',
    creator: '@forexpro',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || '',
  },
  other: {
    'theme-color': '#0a0a0a',
    'msapplication-TileColor': '#0a0a0a',
  },
}

// Layout props interface
interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Security Headers */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="referrer" content="origin-when-cross-origin" />

        {/* PWA & Mobile */}
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="ForexPro" />
        <meta name="application-name" content="ForexPro" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#0a0a0a" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preconnect"
          href="https://cdn.tradingview.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://widgets.coingecko.com"
          crossOrigin="anonymous"
        />

        {/* DNS prefetch for API endpoints */}
        <link rel="dns-prefetch" href="//api.twelvedata.com" />
        <link rel="dns-prefetch" href="//finnhub.io" />
        <link rel="dns-prefetch" href="//api.openai.com" />
        <link rel="dns-prefetch" href="//pusher.com" />

        {/* Preload critical assets */}
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
          href="/fonts/inter-regular.woff2"
        />
      </head>

      <body className="antialiased min-h-screen bg-dark-950">
        <Suspense fallback={<LoadingFallback />}>
          <Providers>
            {/* Layout structure */}
            <div className="relative flex min-h-screen">
              {/* Sidebar - hidden on mobile */}
              <aside className="hidden lg:block fixed left-0 top-0 h-screen w-64 z-50">
                <Sidebar />
              </aside>

              {/* Main Content Area */}
              <main className="flex-1 lg:ml-64 min-h-screen">
                {/* Top header */}
                <Header />

                {/* Page content */}
                <div className="p-4 md:p-6 lg:p-8 pb-20 md:pb-8">
                  {children}
                </div>

                {/* Mobile bottom navigation */}
                <nav className="lg:hidden sticky-bottom-mobile">
                  <BottomNav />
                </nav>

                {/* Toast notifications */}
                <Toaster />
              </main>
            </div>

            {/* Loading overlay for async operations */}
            <LoadingOverlay />
          </Providers>
        </Suspense>

        {/* Analytics & Monitoring */}
        <AnalyticsScripts />
      </body>
    </html>
  )
}

/**
 * Loading fallback component for Suspense boundaries
 */
function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-dark-950">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-neon-blue border-t-transparent rounded-full animate-spin" />
        <p className="text-dark-400 text-sm animate-pulse">Loading ForexPro...</p>
      </div>
    </div>
  )
}

/**
 * Loading overlay for page transitions
 */
function LoadingOverlay() {
  return (
    <div
      id="loading-overlay"
      className="fixed inset-0 bg-dark-950/80 backdrop-blur-sm z-[9999] flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-300"
      aria-hidden="true"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-neon-blue/20 rounded-full" />
          <div className="absolute inset-0 border-4 border-neon-blue border-t-transparent rounded-full animate-spin" />
        </div>
        <p className="text-neon-blue font-mono text-sm animate-pulse">
          PROCESSING...
        </p>
      </div>
    </div>
  )
}

/**
 * Analytics and monitoring scripts (Sentry, GA, etc.)
 * Loaded at the end to avoid blocking
 */
function AnalyticsScripts() {
  return (
    <>
      {/* Google Analytics */}
      {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && (
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
          strategy="afterInteractive"
        />
      )}

      {/* Sentry Error Monitoring */}
      {process.env.NEXT_PUBLIC_SENTRY_DSN && (
        <script
          src="https://js.sentry-cdn.com/sentry-latest.min.js"
          strategy="afterInteractive"
          data-csp-nonce="true"
        />
      )}

      {/* Heap Analytics (optional) */}
      {/* <script
        type="text/javascript"
        src="https://cdn.heapanalytics.com/js/heap-${process.env.HEAP_ANALYTICS_ID}.js"
        strategy="afterInteractive"
      /> */}
    </>
  )
}

/**
 * Next.js Server Component for dynamic imports
 * Splits bundles for better performance
 */
export const dynamic = 'force-dynamic'
export const dynamicParams = true
export const revalidate = 0
export const fetchCache = 'force-no-store'
