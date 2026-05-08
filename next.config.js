/** @type {import('next').NextConfig} */
const nextConfig = {
  // Base configuration
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,

  // Experimental features
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', 'date-fns', 'clsx'],
    scrollRestoration: true,
  },

  // Output configuration
  output: 'standalone',

  // Compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.tradingview.com',
      },
      {
        protocol: 'https',
        hostname: '**.twimg.com',
      },
      {
        protocol: 'https',
        hostname: '**.alicdn.com',
      },
    ],
  },

  // Environment variables exposed to browser
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  // headers: async () => [
  //   {
  //     source: '/:path*',
  //     headers: [
  //       {
  //         key: 'X-DNS-Prefetch-Control',
  //         value: 'on'
  //       },
  //       {
  //         key: 'X-XSS-Protection',
  //         value: '1; mode=block'
  //       },
  //       {
  //         key: 'X-Frame-Options',
  //         value: 'DENY'
  //       },
  //       {
  //         key: 'X-Content-Type-Options',
  //         value: 'nosniff'
  //       },
  //       {
  //         key: 'Referrer-Policy',
  //         value: 'origin-when-cross-origin'
  //       },
  //     ],
  //   },
  // ],

  // Redirects
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/app',
        destination: '/dashboard',
        permanent: true,
      },
    ]
  },

  // Rewrites for API proxying
  async rewrites() {
    return [
      {
        source: '/api/market/:path*',
        destination: `${process.env.MARKET_API_BASE_URL || 'https://api.marketdata.com'}/:path*`,
      },
      {
        source: '/api/ai/:path*',
        destination: `${process.env.AI_API_BASE_URL || 'https://api.openai.com'}/:path*`,
      },
    ]
  },

  // Webpack configuration for optimization
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Optimize chunk strategy for better performance
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        minRemainingSize: 0,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        enforceSizeThresholds: true,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
          // Separate vendor chunks for better caching
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'react',
            chunks: 'all',
            priority: 20,
          },
          // Split heavy chart libraries
          charts: {
            test: /[\\/]node_modules[\\/]((recharts|chart-js-react|lightweight-charts|d3|victory)[\\/]*)/,
            name: 'charts',
            chunks: 'all',
            priority: 15,
          },
        },
      }
    }

    return config
  },

  // Webpack 5 features
  future: {
    webpack5: true,
    // Disable deprecated features
    disableStaticImages: true,
  },
}

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})

module.exports = withPWA(nextConfig)
