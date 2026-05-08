/**
 * Economic Calendar Component
 * Purpose: Display upcoming economic events with impact levels
 * Features: Filter by country/impact, countdown timers, historical viewing
 */

'use client'

import { useState, useMemo } from 'react'
import { Calendar, Clock, TrendingUp, AlertCircle, Filter } from 'lucide-react'
import { format, formatDistanceToNow, isAfter, isBefore } from 'date-fns'
import { cn } from '@/lib/utils'

export interface EconomicEvent {
  id: string
  date: Date
  time: string
  country: string
  currency: string
  event: string
  impact: 'low' | 'medium' | 'high' | 'critical'
  previous: string
  forecast: string
  actual?: string
  revised?: string
}

/**
 * Sample economic events data (would come from ForexFactory API)
 */
const sampleEvents: EconomicEvent[] = [
  {
    id: '1',
    date: new Date(Date.now() + 2 * 60 * 60 * 1000),
    time: '08:30',
    country: 'United States',
    currency: 'USD',
    event: 'Nonfarm Payrolls',
    impact: 'critical',
    previous: '236K',
    forecast: '240K',
  },
  {
    id: '2',
    date: new Date(Date.now() + 1 * 60 * 60 * 1000),
    time: '10:00',
    country: 'United States',
    currency: 'USD',
    event: 'ISM Manufacturing PMI',
    impact: 'high',
    previous: '47.8',
    forecast: '48.0',
  },
  {
    id: '3',
    date: new Date(Date.now() + 4 * 60 * 60 * 1000),
    time: '14:00',
    country: 'Eurozone',
    currency: 'EUR',
    event: 'ECB President Lagarde Speech',
    impact: 'high',
    previous: '',
    forecast: '',
  },
  {
    id: '4',
    date: new Date(Date.now() + 6 * 60 * 60 * 1000),
    time: '16:30',
    country: 'United States',
    currency: 'USD',
    event: 'Crude Oil Inventories',
    impact: 'medium',
    previous: '1,365K',
    forecast: '-1,000K',
  },
  {
    id: '5',
    date: new Date(Date.now() + 24 * 60 * 60 * 1000),
    time: '09:30',
    country: 'United Kingdom',
    currency: 'GBP',
    event: 'GDP Annualized',
    impact: 'high',
    previous: '0.2%',
    forecast: '0.1%',
  },
  {
    id: '6',
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    time: '00:30',
    country: 'Japan',
    currency: 'JPY',
    event: 'BoJ Policy Rate Decision',
    impact: 'critical',
    previous: '-0.10%',
    forecast: '-0.10%',
  },
]

/**
 * Economic Calendar Component
 * Displays upcoming economic events with impact indicators
 */
export function EconomicCalendar({
  events = sampleEvents,
  showFilters = true,
  onEventClick,
}: {
  events?: EconomicEvent[]
  showFilters?: boolean
  onEventClick?: (event: EconomicEvent) => void
}) {
  const [selectedImpact, setSelectedImpact] = useState<string>('all')
  const [selectedCurrency, setSelectedCurrency] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'today' | 'tomorrow' | 'week'>('today')

  // Filter events
  const filteredEvents = useMemo(() => {
    let result = events

    // Filter by date
    const now = new Date()
    const tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)
    const nextWeek = new Date(now)
    nextWeek.setDate(nextWeek.getDate() + 7)

    if (viewMode === 'today') {
      result = result.filter((e) =>
        isAfter(e.date, now) && isBefore(e.date, tomorrow)
      )
    } else if (viewMode === 'tomorrow') {
      result = result.filter((e) =>
        isAfter(e.date, tomorrow) && isBefore(e.date, nextWeek)
      )
    }

    // Filter by impact
    if (selectedImpact !== 'all') {
      result = result.filter((e) => e.impact === selectedImpact)
    }

    // Filter by currency
    if (selectedCurrency !== 'all') {
      result = result.filter((e) => e.currency === selectedCurrency)
    }

    // Sort by date
    return result.sort((a, b) => a.date.getTime() - b.date.getTime())
  }, [events, selectedImpact, selectedCurrency, viewMode])

  // Get unique currencies
  const currencies = useMemo(() => {
    const unique = new Set(events.map((e) => e.currency))
    return Array.from(unique).sort()
  }, [events])

  const impactColors = {
    low: 'bg-dark-500',
    medium: 'bg-trading-neutral',
    high: 'bg-neon-orange',
    critical: 'bg-trading-down',
  }

  const impactIcons = {
    low: <AlertCircle size={12} />,
    medium: <AlertCircle size={12} />,
    high: <TrendingUp size={12} />,
    critical: <TrendingUp size={12} />,
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      {showFilters && (
        <div className="flex flex-wrap gap-3 p-4 glass rounded-xl">
          {/* View mode */}
          <div className="flex gap-1 bg-dark-800 rounded-lg p-1">
            {(['today', 'tomorrow', 'week'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={cn(
                  'px-3 py-1.5 rounded-md text-sm font-medium transition-colors capitalize',
                  viewMode === mode
                    ? 'bg-dark-700 text-white'
                    : 'text-dark-400 hover:text-white'
                )}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Impact filter */}
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-dark-400" />
            <select
              value={selectedImpact}
              onChange={(e) => setSelectedImpact(e.target.value)}
              className="bg-dark-800 border border-dark-700 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-neon-blue"
            >
              <option value="all">All Impacts</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          {/* Currency filter */}
          <select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            className="bg-dark-800 border border-dark-700 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-neon-blue"
          >
            <option value="all">All Currencies</option>
            {currencies.map((curr) => (
              <option key={curr} value={curr}>
                {curr}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Events list */}
      <div className="glass rounded-xl divide-y divide-dark-800">
        {filteredEvents.length === 0 ? (
          <div className="p-8 text-center text-dark-400">
            <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No economic events found</p>
          </div>
        ) : (
          filteredEvents.map((event) => (
            <div
              key={event.id}
              onClick={() => onEventClick?.(event)}
              className="p-4 hover:bg-dark-800/50 transition-colors cursor-pointer group"
            >
              <div className="flex items-start gap-4">
                {/* Time & Date */}
                <div className="flex-shrink-0 w-16 text-center">
                  <div className="font-mono text-sm text-white">
                    {event.time}
                  </div>
                  <div className="text-xs text-dark-400 mt-1">
                    {format(event.date, 'MMM dd')}
                  </div>
                </div>

                {/* Impact indicator */}
                <div className="flex-shrink-0 mt-1">
                  <span
                    className={cn(
                      'inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium',
                      impactColors[event.impact]
                    )}
                  >
                    {impactIcons[event.impact]}
                    {event.impact}
                  </span>
                </div>

                {/* Event details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono bg-dark-800 px-1.5 py-0.5 rounded text-dark-300">
                      {event.currency}
                    </span>
                    <h4 className="font-medium text-white group-hover:text-neon-blue transition-colors truncate">
                      {event.event}
                    </h4>
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-dark-500 text-xs">Prev:</span>
                      <span className="font-mono text-dark-300">{event.previous || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-dark-500 text-xs">Fore:</span>
                      <span className="font-mono font-medium text-white">{event.forecast || 'N/A'}</span>
                    </div>
                    {event.actual && (
                      <div className="flex items-center gap-2">
                        <span className="text-dark-500 text-xs">Act:</span>
                        <span className="font-mono font-medium text-trading-up">{event.actual}</span>
                      </div>
                    )}
                  </div>

                  {/* Countdown */}
                  <div className="flex items-center gap-1 mt-2 text-xs text-dark-400">
                    <Clock size={12} />
                    <span>
                      {event.date > new Date()
                        ? `In ${formatDistanceToNow(event.date, { addSuffix: false })}`
                        : 'Released'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export { EconomicCalendar }
