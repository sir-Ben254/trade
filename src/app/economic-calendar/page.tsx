/**
 * Economic Calendar Page
 * Purpose: Display all economic events
 */

import { EconomicCalendar } from '@/components/calendar/economic-calendar'

export const metadata = {
  title: 'Economic Calendar - ForexPro',
  description: 'Stay updated with upcoming economic events, central bank meetings, and data releases that impact forex markets.',
}

export default function EconomicCalendarPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-white">Economic Calendar</h1>
        <p className="text-dark-400 mt-1">
          Track upcoming economic events and data releases
        </p>
      </div>

      <EconomicCalendar />
    </div>
  )
}
