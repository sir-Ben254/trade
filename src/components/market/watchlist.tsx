/**
 * Watchlist Component
 * Purpose: User's favorite currency pairs watchlist
 * Features: Add/remove symbols, quick trade, price alerts
 */

'use client'

import { useState, useEffect } from 'react'
import { Plus, Star, TrendingUp, TrendingDown, Minus, MoreVertical, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ForexTickerItem } from './live-ticker'

interface WatchlistItem extends ForexTickerItem {
  isFavorite: boolean
  alertHigh?: number
  alertLow?: number
}

interface WatchlistProps {
  initialItems?: WatchlistItem[]
  onTrade?: (symbol: string) => void
  onAddAlert?: (symbol: string, price: number, type: 'high' | 'low') => void
  onRemove?: (symbol: string) => void
  maxItems?: number
}

/**
 * Default watchlist items
 */
const defaultWatchlist: WatchlistItem[] = [
  { symbol: 'EUR/USD', name: 'Euro / US Dollar', bid: 1.0854, ask: 1.0856, change: 0.0023, changePercent: 0.21, high: 1.0862, low: 1.0831, isFavorite: true },
  { symbol: 'GBP/USD', name: 'British Pound / US Dollar', bid: 1.2654, ask: 1.2657, change: -0.0018, changePercent: -0.14, high: 1.2689, low: 1.2621, isFavorite: true },
  { symbol: 'USD/JPY', name: 'US Dollar / Japanese Yen', bid: 156.42, ask: 156.45, change: 0.28, changePercent: 0.18, high: 156.89, low: 156.01, isFavorite: true },
  { symbol: 'AUD/USD', name: 'Australian Dollar / US Dollar', bid: 0.6532, ask: 0.6534, change: 0.0012, changePercent: 0.18, high: 0.6545, low: 0.6510, isFavorite: false },
  { symbol: 'USD/CAD', name: 'US Dollar / Canadian Dollar', bid: 1.3621, ask: 1.3624, change: -0.0025, changePercent: -0.18, high: 1.3655, low: 1.3598, isFavorite: false },
  { symbol: 'XAU/USD', name: 'Gold / US Dollar', bid: 2345.30, ask: 2345.80, change: 5.20, changePercent: 0.22, high: 2348.50, low: 2338.10, isFavorite: true },
  { symbol: 'NZD/USD', name: 'New Zealand Dollar / US Dollar', bid: 0.6112, ask: 0.6114, change: -0.0008, changePercent: -0.13, high: 0.6125, low: 0.6098, isFavorite: false },
  { symbol: 'USD/CHF', name: 'US Dollar / Swiss Franc', bid: 0.9123, ask: 0.9125, change: 0.0015, changePercent: 0.16, high: 0.9142, low: 0.9101, isFavorite: false },
  { symbol: 'EUR/GBP', name: 'Euro / British Pound', bid: 0.8578, ask: 0.8580, change: 0.0009, changePercent: 0.10, high: 0.8589, low: 0.8565, isFavorite: false },
  { symbol: 'BTC/USD', name: 'Bitcoin / US Dollar', bid: 67240.50, ask: 67250.00, change: -245.30, changePercent: -0.36, high: 67890.00, low: 66800.00, isFavorite: true },
]

/**
 * Watchlist sidebar component
 */
export function Watchlist({
  initialItems = defaultWatchlist,
  onTrade,
  onAddAlert,
  onRemove,
  maxItems = 10,
}: WatchlistProps) {
  const [items, setItems] = useState<WatchlistItem[]>(initialItems.slice(0, maxItems))
  const [showAddModal, setShowAddModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [contextMenu, setContextMenu] = useState<{ symbol: string; x: number; y: number } | null>(null)

  // Filter available symbols to add (not already in watchlist)
  const allSymbols = defaultWatchlist
  const availableSymbols = allSymbols.filter(
    (s) => !items.find((item) => item.symbol === s.symbol)
  )

  const handleAddSymbol = (symbol: string) => {
    const symbolData = allSymbols.find((s) => s.symbol === symbol)
    if (symbolData && items.length < maxItems) {
      setItems([...items, { ...symbolData, isFavorite: true }])
      setShowAddModal(false)
      setSearchQuery('')
    }
  }

  const handleRemoveSymbol = (symbol: string) => {
    setItems(items.filter((item) => item.symbol !== symbol))
    onRemove?.(symbol)
  }

  const handleRightClick = (e: React.MouseEvent, symbol: string) => {
    e.preventDefault()
    setContextMenu({ symbol, x: e.clientX, y: e.clientY })
  }

  // Close context menu on click outside
  useEffect(() => {
    const handleClick = () => setContextMenu(null)
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return (
    <div className="glass rounded-xl p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display font-semibold text-white">Watchlist</h3>
          <p className="text-xs text-dark-400">{items.length}/{maxItems} pairs</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          disabled={items.length >= maxItems}
          className="p-2 rounded-lg hover:bg-dark-800 transition-colors disabled:opacity-50"
          aria-label="Add symbol"
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Watchlist items */}
      <div className="space-y-1">
        {items.map((item) => (
          <WatchlistItemRow
            key={item.symbol}
            item={item}
            onTrade={onTrade}
            onRemove={handleRemoveSymbol}
            onContextMenu={handleRightClick}
          />
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-8 text-dark-400">
          <Star className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">Your watchlist is empty</p>
          <p className="text-xs">Click + to add currency pairs</p>
        </div>
      )}

      {/* Add symbol modal */}
      {showAddModal && (
        <AddSymbolModal
          availableSymbols={availableSymbols}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSelect={handleAddSymbol}
          onClose={() => {
            setShowAddModal(false)
            setSearchQuery('')
          }}
        />
      )}

      {/* Context menu */}
      {contextMenu && (
        <ContextMenu
          symbol={contextMenu.symbol}
          position={{ x: contextMenu.x, y: contextMenu.y }}
          onTrade={() => onTrade?.(contextMenu.symbol)}
          onAddAlert={(type, price) => onAddAlert?.(contextMenu.symbol, price, type)}
          onClose={() => setContextMenu(null)}
        />
      )}
    </div>
  )
}

/**
 * Individual watchlist row
 */
function WatchlistItemRow({
  item,
  onTrade,
  onRemove,
  onContextMenu,
}: {
  item: WatchlistItem
  onTrade?: (symbol: string) => void
  onRemove: (symbol: string) => void
  onContextMenu: (e: React.MouseEvent, symbol: string) => void
}) {
  const [showActions, setShowActions] = useState(false)

  return (
    <div
      className={cn(
        'group flex items-center justify-between p-3 rounded-lg transition-all cursor-pointer',
        'hover:bg-dark-800/50 active:scale-[0.98]'
      )}
      onClick={() => onTrade?.(item.symbol)}
      onContextMenu={(e) => onContextMenu(e, item.symbol)}
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {/* Favorite star */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onRemove(item.symbol)
          }}
          className="flex-shrink-0"
          aria-label="Remove from watchlist"
        >
          <Star
            size={14}
            className={cn(
              'text-neon-yellow fill-neon-yellow',
              'transition-transform hover:scale-110'
            )}
          />
        </button>

        {/* Symbol info */}
        <div className="min-w-0 flex-1">
          <div className="font-mono text-sm font-semibold text-white truncate">
            {item.symbol}
          </div>
          <div className="text-xs text-dark-400 truncate">{item.name}</div>
        </div>
      </div>

      {/* Price info */}
      <div className="flex items-center gap-3 ml-2">
        <div className="text-right">
          <div className="font-mono text-sm text-white tabular-nums">
            {item.symbol.includes('JPY') ? item.bid.toFixed(2) : item.bid.toFixed(4)}
          </div>
          <div className="flex items-center gap-1 justify-end">
            {item.change > 0 ? (
              <TrendingUp className="w-3 h-3 text-trading-up" />
            ) : item.change < 0 ? (
              <TrendingDown className="w-3 h-3 text-trading-down" />
            ) : (
              <Minus className="w-3 h-3 text-dark-500" />
            )}
            <span
              className={cn(
                'font-mono text-xs',
                item.change > 0 ? 'text-trading-up' : item.change < 0 ? 'text-trading-down' : 'text-dark-400'
              )}
            >
              {item.change > 0 ? '+' : ''}
              {item.changePercent.toFixed(2)}%
            </span>
          </div>
        </div>

        {/* Action button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            setShowActions(!showActions)
          }}
          className="p-1 rounded hover:bg-dark-700 transition-colors opacity-0 group-hover:opacity-100"
          aria-label="More options"
        >
          <MoreVertical size={16} className="text-dark-400" />
        </button>
      </div>
    </div>
  )
}

/**
 * Add symbol modal
 */
function AddSymbolModal({
  availableSymbols,
  searchQuery,
  onSearchChange,
  onSelect,
  onClose,
}: {
  availableSymbols: WatchlistItem[]
  searchQuery: string
  onSearchChange: (q: string) => void
  onSelect: (symbol: string) => void
  onClose: () => void
}) {
  const filtered = availableSymbols.filter((s) =>
    s.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-sm">
      <div className="w-full max-w-md glass rounded-2xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-semibold text-lg">Add to Watchlist</h3>
          <button onClick={onClose} className="p-1 hover:bg-dark-800 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <input
          type="text"
          placeholder="Search currency pairs..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-3 py-2 mb-4 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:border-neon-blue"
          autoFocus
        />

        <div className="max-h-60 overflow-y-auto space-y-1">
          {filtered.length === 0 ? (
            <div className="text-center py-8 text-dark-400 text-sm">No symbols available</div>
          ) : (
            filtered.map((symbol) => (
              <button
                key={symbol.symbol}
                onClick={() => onSelect(symbol.symbol)}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-dark-800 transition-colors text-left"
              >
                <div>
                  <div className="font-mono text-sm font-medium">{symbol.symbol}</div>
                  <div className="text-xs text-dark-400">{symbol.name}</div>
                </div>
                <Plus size={16} className="text-neon-blue" />
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * Context menu for quick actions
 */
function ContextMenu({
  symbol,
  position,
  onTrade,
  onAddAlert,
  onClose,
}: {
  symbol: string
  position: { x: number; y: number }
  onTrade: () => void
  onAddAlert: (type: 'high' | 'low', price?: number) => void
  onClose: () => void
}) {
  return (
    <div
      className="fixed z-50 w-48 glass rounded-xl shadow-2xl overflow-hidden"
      style={{ left: position.x, top: position.y }}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={() => { onTrade(); onClose(); }}
        className="w-full px-4 py-3 text-left text-sm hover:bg-dark-800 transition-colors flex items-center gap-2"
      >
        <TrendingUp size={16} /> Trade {symbol}
      </button>
      <button
        onClick={() => { onAddAlert('high'); onClose(); }}
        className="w-full px-4 py-3 text-left text-sm hover:bg-dark-800 transition-colors flex items-center gap-2"
      >
        <span className="text-trading-up">▲</span> Set High Alert
      </button>
      <button
        onClick={() => { onAddAlert('low'); onClose(); }}
        className="w-full px-4 py-3 text-left text-sm hover:bg-dark-800 transition-colors flex items-center gap-2"
      >
        <span className="text-trading-down">▼</span> Set Low Alert
      </button>
    </div>
  )
}

export { Watchlist }
