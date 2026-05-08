/**
 * TradingView Chart Component
 * Purpose: Advanced forex charting with TradingView widgets
 * Features: Multiple timeframes, indicators, drawing tools
 */

'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'

interface TradingViewChartProps {
  symbol?: string
  interval?: string
  height?: number | string
  showTopBar?: boolean
  showBottomBar?: boolean
  containerId?: string
}

/**
 * TradingView Advanced Real-Time Chart widget
 * Provides professional-grade charting for forex trading
 */
export function TradingViewChart({
  symbol = 'FX:EURUSD',
  interval = 'D',
  height = 500,
  showTopBar = true,
  showBottomBar = false,
  containerId,
}: TradingViewChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  useEffect(() => {
    if (!containerRef.current) return

    // Clear any existing widget
    containerRef.current.innerHTML = ''

    // Create script element
    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/tv.js'
    script.async = true
    script.onload = () => {
      if (!containerRef.current || !(window as any).TradingView) return

      new (window as any).TradingView.widget({
        autosize: true,
        symbol: symbol.startsWith('FX:') ? symbol : `FX:${symbol.replace('/', '')}`,
        interval: interval,
        timezone: 'Etc/UTC',
        theme: isDark ? 'dark' : 'light',
        style: '1',
        locale: 'en',
        toolbar_bg: isDark ? '#1a1a1a' : '#f8f9fa',
        enable_publishing: false,
        hide_side_toolbar: false,
        allow_symbol_change: true,
        container_id: containerId || containerRef.current?.id,
        height: height,
        width: '100%',
        studies: [
          'Volume@tv-basicstudies',
          'MAExp@tv-basicstudies',
          'RSI@tv-basicstudies',
          'MACD@tv-basicstudies',
          'BB@tv-basicstudies',
        ],
        drawings_access: { type: 'all', tools: [{ name: 'all' }] },
        saved_data: null,
        overrides: {
          'paneProperties.background': isDark ? '#0a0a0a' : '#ffffff',
          'paneProperties.vertGridProperties.color': isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
          'paneProperties.horzGridProperties.color': isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
          'symbolWatermarkProperties.color': isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
        },
        custom_css_url: '/tradingview-custom.css',
        loading_screen: { bgcolor: isDark ? '#0a0a0a' : '#ffffff', color: isDark ? '#00d4ff' : '#333' },
      })
    }

    containerRef.current.appendChild(script)

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
    }
  }, [symbol, interval, height, isDark, containerId])

  return (
    <div className="w-full glass rounded-xl overflow-hidden">
      <div
        id={containerId || 'tradingview_widget'}
        ref={containerRef}
        className="w-full"
        style={{ height: typeof height === 'number' ? `${height}px` : height }}
      />
    </div>
  )
}

TradingViewChart.displayName = 'TradingViewChart'
