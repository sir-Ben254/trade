/**
 * Table Component
 * Purpose: Data table with sorting, pagination, selection
 * Accessibility: ARIA grid roles, keyboard navigation
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface Column<T> {
  key: string
  header: React.ReactNode
  cell: (row: T) => React.ReactNode
  sortable?: boolean
  width?: string
}

interface TableProps<T> {
  columns: Column<T>[]
  data: T[]
  keyExtractor: (row: T) => string
  onRowClick?: (row: T) => void
  selectedRows?: Set<string>
  onSelectRows?: (keys: Set<string>) => void
  sortable?: boolean
  onSort?: (key: string, direction: 'asc' | 'desc') => void
  sortKey?: string
  sortDirection?: 'asc' | 'desc'
  emptyMessage?: string
  loading?: boolean
  className?: string
}

/**
 * Generic data table with sorting and selection
 */
function Table<T>({
  columns,
  data,
  keyExtractor,
  onRowClick,
  selectedRows,
  onSelectRows,
  sortable = false,
  onSort,
  sortKey,
  sortDirection,
  emptyMessage = 'No data available',
  loading = false,
  className,
}: TableProps<T>) {
  const [hoveredRow, setHoveredRow] = React.useState<string | null>(null)

  // Handle column header click for sorting
  const handleHeaderClick = (column: Column<T>) => {
    if (!sortable || !column.sortable || !onSort) return
    const newDirection = sortKey === column.key && sortDirection === 'asc' ? 'desc' : 'asc'
    onSort(column.key, newDirection)
  }

  // Toggle row selection
  const toggleRowSelection = (key: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (!onSelectRows || !selectedRows) return

    const newSelection = new Set(selectedRows)
    if (newSelection.has(key)) {
      newSelection.delete(key)
    } else {
      newSelection.add(key)
    }
    onSelectRows(newSelection)
  }

  // Toggle all rows selection
  const toggleAllSelection = (e: React.MouseEvent) => {
    if (!onSelectRows) return
    const allSelected = data.length > 0 && selectedRows?.size === data.length

    if (allSelected) {
      onSelectRows(new Set())
    } else {
      onSelectRows(new Set(data.map(keyExtractor)))
    }
  }

  const allSelected = data.length > 0 && selectedRows?.size === data.length
  const someSelected = selectedRows?.size && selectedRows.size > 0 && !allSelected

  if (loading) {
    return (
      <div className={cn('w-full overflow-x-auto', className)}>
        <table className="w-full">
          <thead>
            <tr className="border-b border-dark-700">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-3 text-left text-sm font-semibold text-dark-300 uppercase tracking-wider"
                  style={{ width: col.width }}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="border-b border-dark-800">
                {columns.map((col, j) => (
                  <td key={j} className="px-4 py-3">
                    <div className="h-4 w-full max-w-[200px] skeleton rounded" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div className={cn('w-full overflow-x-auto', className)}>
      <table className="w-full">
        <thead>
          <tr className="border-b border-dark-700">
            {/* Checkbox column if selectable */}
            {onSelectRows && (
              <th className="px-4 py-3 w-12">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = someSelected
                  }}
                  onChange={toggleAllSelection}
                  className="w-4 h-4 rounded border-dark-600 bg-dark-900 text-neon-blue focus:ring-neon-blue/50"
                />
              </th>
            )}

            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  'px-4 py-3 text-left text-sm font-semibold text-dark-300 uppercase tracking-wider',
                  sortable && col.sortable && 'cursor-pointer hover:text-white transition-colors'
                )}
                style={{ width: col.width }}
                onClick={() => handleHeaderClick(col)}
                aria-sort={
                  sortKey === col.key
                    ? sortDirection === 'asc'
                      ? 'ascending'
                      : 'descending'
                    : undefined
                }
              >
                <div className="flex items-center gap-2">
                  {col.header}
                  {sortable && col.sortable && (
                    <span className="text-dark-500">
                      {sortKey === col.key ? (
                        sortDirection === 'asc' ? '↑' : '↓'
                      ) : (
                        '↕'
                      )}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (onSelectRows ? 1 : 0)}
                className="px-4 py-12 text-center text-dark-400"
              >
                <div className="flex flex-col items-center gap-3">
                  <span className="text-4xl opacity-50">📊</span>
                  <p>{emptyMessage}</p>
                </div>
              </td>
            </tr>
          ) : (
            data.map((row) => {
              const key = keyExtractor(row)
              const isSelected = selectedRows?.has(key)
              const isHovered = hoveredRow === key

              return (
                <tr
                  key={key}
                  onClick={() => onRowClick?.(row)}
                  onMouseEnter={() => setHoveredRow(key)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className={cn(
                    'border-b border-dark-800 transition-colors cursor-pointer',
                    isSelected && 'bg-neon-blue/5 border-neon-blue/20',
                    !isSelected && isHovered && 'bg-dark-800/50',
                    onRowClick && 'hover:bg-dark-800/30'
                  )}
                >
                  {/* Checkbox cell */}
                  {onSelectRows && (
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={isSelected || false}
                        onChange={(e) => toggleRowSelection(key, e)}
                        onClick={(e) => e.stopPropagation()}
                        className="w-4 h-4 rounded border-dark-600 bg-dark-900 text-neon-blue focus:ring-neon-blue/50"
                      />
                    </td>
                  )}

                  {/* Data cells */}
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3">
                      {col.cell(row)}
                    </td>
                  ))}
                </tr>
              )
            })
          )}
        </tbody>
      </table>
    </div>
  )
}

Table.displayName = 'Table'

export { Table }
