/**
 * Select Component
 * Purpose: Dropdown selection with search
 * Accessibility: Full keyboard navigation, ARIA compliant
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { ChevronDown, Check } from 'lucide-react'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
  icon?: React.ReactNode
}

interface SelectProps {
  options: SelectOption[]
  value?: string
  onValueChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  error?: string
  className?: string
  searchable?: boolean
}

/**
 * Custom select dropdown with search support
 */
export function Select({
  options,
  value,
  onValueChange,
  placeholder = 'Select...',
  disabled = false,
  error,
  className,
  searchable = false,
}: SelectProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState('')
  const [highlightedIndex, setHighlightedIndex] = React.useState(0)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const searchInputRef = React.useRef<HTMLInputElement>(null)

  // Filter options based on search
  const filteredOptions = React.useMemo(() => {
    if (!searchable || !search) return options
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(search.toLowerCase())
    )
  }, [options, search, searchable])

  // Reset highlighted index when filtered options change
  React.useEffect(() => {
    setHighlightedIndex(0)
  }, [filteredOptions.length])

  // Focus search input when opened
  React.useEffect(() => {
    if (open && searchable && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [open, searchable])

  // Click outside handler
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
        setSearch('')
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        setOpen(true)
      }
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0))
        break
      case 'Enter':
        e.preventDefault()
        const selected = filteredOptions[highlightedIndex]
        if (selected && !selected.disabled) {
          onValueChange(selected.value)
          setOpen(false)
          setSearch('')
        }
        break
      case 'Escape':
        e.preventDefault()
        setOpen(false)
        setSearch('')
        break
    }
  }

  const selectedOption = options.find((opt) => opt.value === value)

  return (
    <div ref={containerRef} className={cn('w-full relative', className)}>
      {/* Trigger button */}
      <button
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby="select-label"
        disabled={disabled}
        onClick={() => setOpen(!open)}
        onKeyDown={handleKeyDown}
        className={cn(
          'flex h-10 w-full items-center justify-between rounded-lg border bg-dark-900 px-3 py-2 text-sm',
          'placeholder:text-dark-500',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-blue/50',
          'disabled:cursor-not-allowed disabled:opacity-50',
          error ? 'border-trading-down' : 'border-dark-700 hover:border-dark-600',
          open && 'border-neon-blue ring-1 ring-neon-blue/50'
        )}
      >
        <span className={cn(!selectedOption && 'text-dark-500')}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={cn(
            'h-4 w-4 text-dark-400 transition-transform',
            open && 'rotate-180'
          )}
        />
      </button>

      {/* Dropdown menu */}
      {open && (
        <div
          role="listbox"
          className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-dark-700 bg-dark-900 shadow-xl"
        >
          {/* Search input (if searchable) */}
          {searchable && (
            <div className="p-2 border-b border-dark-800">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-3 py-1.5 bg-dark-800 border border-dark-700 rounded text-sm text-white placeholder-dark-400 focus:outline-none focus:border-neon-blue"
              />
            </div>
          )}

          {/* Options list */}
          <div role="group">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-sm text-dark-400 text-center">
                No options found
              </div>
            ) : (
              filteredOptions.map((option, index) => (
                <div
                  key={option.value}
                  role="option"
                  aria-selected={value === option.value}
                  aria-disabled={option.disabled}
                  onClick={() => {
                    if (!option.disabled) {
                      onValueChange(option.value)
                      setOpen(false)
                      setSearch('')
                    }
                  }}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 text-sm cursor-pointer transition-colors',
                    'hover:bg-dark-800',
                    highlightedIndex === index && 'bg-dark-800',
                    value === option.value && 'bg-neon-blue/10 text-neon-blue',
                    option.disabled && 'opacity-50 cursor-not-allowed'
                  )}
                >
                  {option.icon && <span className="w-4 h-4">{option.icon}</span>}
                  <span className="flex-1">{option.label}</span>
                  {value === option.value && (
                    <Check className="h-4 w-4 text-neon-blue" />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <p className="mt-1.5 text-sm text-trading-down flex items-center gap-1" role="alert">
          <span className="w-3 h-3 rounded-full bg-trading-down/20 flex items-center justify-center text-xs">!</span>
          {error}
        </p>
      )}
    </div>
  )
}
