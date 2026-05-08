/**
 * Tabs Component
 * Purpose: Tabbed content organization
 * Accessibility: Proper ARIA attributes, keyboard navigation
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface TabsProps {
  defaultValue: string
  value?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
  className?: string
}

interface TabsListProps {
  children: React.ReactNode
  className?: string
}

interface TabsTriggerProps {
  value: string
  children: React.ReactNode
  className?: string
  disabled?: boolean
}

interface TabsContentProps {
  value: string
  children: React.ReactNode
  className?: string
}

const TabsContext = React.createContext<{
  value: string
  onValueChange: (value: string) => void
}>({
  value: '',
  onValueChange: () => {},
})

/**
 * Tabs Root Provider
 */
function Tabs({ defaultValue, value, onValueChange, children, className }: TabsProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const currentValue = value ?? internalValue

  const handleValueChange = React.useCallback(
    (newValue: string) => {
      setInternalValue(newValue)
      onValueChange?.(newValue)
    },
    [onValueChange]
  )

  return (
    <TabsContext.Provider value={{ value: currentValue, onValueChange: handleValueChange }}>
      <div className={cn('w-full', className)}>{children}</div>
    </TabsContext.Provider>
  )
}

/**
 * Tabs List (the tab navigation bar)
 */
function TabsList({ children, className }: TabsListProps) {
  return (
    <div
      role="tablist"
      aria-orientation="horizontal"
      className={cn(
        'inline-flex items-center justify-center rounded-lg bg-dark-800 p-1 text-dark-400',
        className
      )}
    >
      {children}
    </div>
  )
}

/**
 * Individual Tab Trigger
 */
function TabsTrigger({ value, children, className, disabled }: TabsTriggerProps) {
  const { value: selectedValue, onValueChange } = React.useContext(TabsContext)
  const isSelected = selectedValue === value

  return (
    <button
      role="tab"
      aria-selected={isSelected}
      aria-controls={`tabpanel-${value}`}
      tabIndex={isSelected ? 0 : -1}
      disabled={disabled}
      onClick={() => !disabled && onValueChange(value)}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium',
        'ring-offset-dark-950 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-blue/50',
        'disabled:pointer-events-none disabled:opacity-50',
        isSelected
          ? 'bg-dark-700 text-white shadow-sm'
          : 'hover:text-white hover:bg-dark-700/50',
        className
      )}
    >
      {children}
    </button>
  )
}

/**
 * Tab Content Panel
 */
function TabsContent({ value, children, className }: TabsContentProps) {
  const { value: selectedValue } = React.useContext(TabsContext)
  const isSelected = selectedValue === value

  if (!isSelected) return null

  return (
    <div
      role="tabpanel"
      id={`tabpanel-${value}`}
      aria-labelledby={`tab-${value}`}
      className={cn('mt-2 ring-offset-dark-950 focus-visible:outline-none', className)}
    >
      {children}
    </div>
  )
}

Tabs.List = TabsList
Tabs.Trigger = TabsTrigger
Tabs.Content = TabsContent

export { Tabs }
