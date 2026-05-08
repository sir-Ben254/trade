/**
 * Theme Provider (Dark mode only for fintech)
 * Purpose: Theme management with system preference detection
 * Security: No sensitive data stored
 * Performance: Minimal re-renders, SSR-safe
 */

'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

/**
 * Theme provider wrapper
 * - Default: dark
 * - Disable transition on change for instant app switching
 * - No system preference detection (fintech apps should be consistent)
 */
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      {...props}
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    />
  )
}
