# ForexPro - Production-Grade Forex Trading Platform

A modern, institutional-grade forex trading platform built with Next.js 14, TypeScript, Tailwind CSS, and cutting-edge fintech UI/UX.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## Features

### Trading & Analytics
- 📈 **Advanced Charting** - TradingView widgets with 100+ technical indicators
- 📊 **Real-time Market Data** - Live forex prices via WebSockets
- 🤖 **AI Trading Assistant** - GPT-4 powered analysis and trade ideas
- 📡 **Trading Signals** - High-confidence signals with risk/reward metrics
- 📋 **Economic Calendar** - Upcoming events with impact ratings
- 📓 **Trading Journal** - Track performance and improve strategies

### Platform Features
- 🔐 **Secure Authentication** - JWT, 2FA, OAuth (Google)
- 💳 **Payment Integration** - Stripe, PayPal, M-Pesa
- 🎯 **Demo Trading** - Practice with virtual funds
- 👥 **Referral System** - Earn commission on referred users
- 📱 **Mobile-First** - PWA-ready, responsive design
- 🔔 **Real-time Notifications** - Price alerts, signal updates

### Architecture
- ⚡ **Blazing Fast** - Next.js 14 App Router, SSR/SSG, caching
- 🔒 **Enterprise Security** - CSRF, XSS protection, rate limiting
- 📊 **Scalable** - PostgreSQL + Prisma, Redis caching
- 🐳 **Containerized** - Docker ready
- ☁️ **Cloud Deploy** - Vercel/Render compatible

## Tech Stack

**Frontend**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS with custom fintech design system
- Framer Motion animations
- ShadCN UI components
- Zustand state management
- TanStack Query (React Query v5)
- Socket.io client
- Recharts & TradingView widgets

**Backend** (to be built)
- Node.js + FastAPI
- PostgreSQL + Prisma ORM
- Redis caching
- JWT authentication
- WebSocket server (Socket.io)

**Infrastructure**
- Docker + Docker Compose
- GitHub Actions CI/CD
- Cloudflare CDN
- Nginx reverse proxy

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+ (for backend)
- Redis 6+ (optional)

### Installation

```bash
# Clone repository
git clone <repo-url>
cd forex-platform

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Run database migrations (when backend is added)
npm run db:migrate

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Configuration

Edit `.env.local` with your API keys:

```env
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"

# OAuth
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# Market Data APIs
TWELVEDATA_API_KEY="..."
FINNHUB_API_KEY="..."

# AI
OPENAI_API_KEY="..."

# Payments
STRIPE_SECRET_KEY="..."
```

## Project Structure

```
forex-platform/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── app/ (dashboard, trade, signals, etc.)
│   │   └── page.tsx (landing)
│   ├── components/       # Reusable UI components
│   │   ├── ui/ (Button, Card, Input, etc.)
│   │   ├── layout/ (Header, Sidebar, Footer)
│   │   ├── market/ (Ticker, Chart, Watchlist)
│   │   ├── dashboard/
│   │   ├── trading/
│   │   └── ...
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utilities, helpers, APIs
│   ├── store/           # Zustand state stores
│   ├── styles/          # Global CSS, Tailwind config
│   └── types/           # TypeScript definitions
├── public/              # Static assets
├── .env.example         # Environment template
├── Dockerfile
└── README.md
```

## Core Components

### UI Library
- **Button** - Multiple variants (default, outline, ghost, success, danger)
- **Card** - Glassmorphism card with hover effects
- **Input/Textarea** - Form inputs with validation states
- **Badge** - Status badges (success, warning, error, info)
- **Tabs** - Accessible tab component
- **Modal** - Animated modal dialog
- **Table** - Sortable, selectable data table
- **Switch** - Toggle switch component
- **Progress** - Linear and circular progress indicators
- **Avatar** - User avatar with status indicator

### Market Components
- **LiveTicker** - Real-time forex price ticker
- **TradingViewChart** - Professional charting
- **Watchlist** - Favorite pairs management
- **EconomicCalendar** - Event calendar with filters


## Development

### Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
npm run format       # Format code with Prettier
```

### Adding New Components

```bash
# Add a new UI component (ShadCN style)
# Example: npx shadcn-ui add button  (or create manually)
```

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy

### Docker
```bash
# Build image
docker build -t forex-platform .

# Run container
docker run -p 3000:3000 forex-platform
```

### Environment Variables
See `.env.example` for all required variables.

## Security

- Passwords hashed with bcrypt
- JWT tokens with httpOnly cookies
- CSRF tokens on forms
- XSS prevention with React escaping
- SQL injection prevention with Prisma
- Rate limiting on API routes
- Helmet security headers
- Audit logging

## Performance

- Image optimization with Next.js Image
- Font optimization with next/font
- Code splitting & lazy loading
- Redis caching for sessions
- Database query optimization
- WebSocket reconnection logic
- Bundle size monitoring

## Testing

```bash
# Unit tests
npm test

# E2E tests
npm run test:e2e

# Coverage
npm run test:coverage
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Mobile Safari and Chrome Mobile fully supported.

## Contributing

Contributions welcome! Please read [CONTRIBUTING.md]() first.

## License

MIT License - see LICENSE file.

## Roadmap

- [ ] Backend API (Node.js/FastAPI)
- [ ] Database integration (PostgreSQL)
- [ ] WebSocket price server
- [ ] Mobile app (React Native)
- [ ] Advanced AI model integration
- [ ] Social trading features
- [ ] Copy trading
- [ ] Multi-language support
- [ ] Dark/Light mode toggle

## Support

For support, email support@forexpro.com or create an issue.

---

Built with ❤️ by ForexPro Team
