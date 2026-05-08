/**
 * Trade Page
 * Purpose: Main trading interface with order entry, positions, and chart
 * Features: Buy/sell orders, position management, order types
 */

'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { TradingViewChart } from '@/components/market/tradingview-chart'
import { Watchlist } from '@/components/market/watchlist'
import { Separator } from '@/components/ui/separator'
import { DollarSign, TrendingUp, TrendingDown, Percent, AlertCircle } from 'lucide-react'
import { cn, formatCurrency } from '@/lib/utils'

export default function TradePage() {
  const [symbol, setSymbol] = useState('EURUSD')
  const [orderType, setOrderType] = useState<'market' | 'limit' | 'stop'>('market')
  const [side, setSide] = useState<'buy' | 'sell'>('buy')
  const [volume, setVolume] = useState(1)
  const [leverage, setLeverage] = useState(100)
  const [useStopLoss, setUseStopLoss] = useState(false)
  const [useTakeProfit, setUseTakeProfit] = useState(false)
  const [stopLoss, setStopLoss] = useState('')
  const [takeProfit, setTakeProfit] = useState('')

  // Calculate margin, required, potential
  const notionalValue = volume * 100000 // Standard lot = 100,000 units
  const margin = notionalValue / leverage
  const spread = 0.0002 // Demo spread

  const currentPrice = 1.0854
  const askPrice = side === 'buy' ? currentPrice + spread : currentPrice - spread
  const bidPrice = side === 'sell' ? currentPrice + spread : currentPrice - spread

  const positionSize = volume * 100000
  const requiredMargin = positionSize / leverage

  const handlePlaceOrder = () => {
    console.log('Placing order:', {
      symbol,
      type: orderType,
      side,
      volume,
      leverage,
      stopLoss: useStopLoss ? stopLoss : null,
      takeProfit: useTakeProfit ? takeProfit : null,
    })
    // TODO: Execute order via API
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="flex-1 flex overflow-hidden">
        {/* Main trading area */}
        <div className="flex-1 flex flex-col">
          {/* Top bar - symbol selector */}
          <div className="h-16 border-b border-dark-800 bg-dark-900/50 flex items-center px-6 gap-4">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-display font-bold">{symbol}</h1>
              <Badge variant="success">LIVE</Badge>
            </div>
            <div className="text-2xl font-mono font-bold text-trading-up">
              {currentPrice.toFixed(5)}
            </div>
            <div className="text-sm text-dark-400">
              <span className="text-trading-up">+0.0023 (+0.21%)</span>
            </div>
          </div>

          {/* Chart area */}
          <div className="flex-1 p-4 overflow-hidden">
            <TradingViewChart symbol={symbol} height="100%" />
          </div>

          {/* Bottom section - order entry & positions */}
          <div className="h-96 border-t border-dark-800 bg-dark-900/50 p-4 overflow-y-auto">
            <Tabs defaultValue="order" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="order">Order Entry</TabsTrigger>
                <TabsTrigger value="positions">Positions (3)</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>

              <TabsContent value="order" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Order Panel */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Place Order</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Symbol selector */}
                      <div>
                        <label className="text-sm font-medium text-dark-200 mb-2 block">
                          Symbol
                        </label>
                        <select
                          value={symbol}
                          onChange={(e) => setSymbol(e.target.value)}
                          className="w-full px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-neon-blue"
                        >
                          <option value="EURUSD">EUR/USD</option>
                          <option value="GBPUSD">GBP/USD</option>
                          <option value="USDJPY">USD/JPY</option>
                          <option value="AUDUSD">AUD/USD</option>
                                          </select>
                      </div>

                      {/* Order type */}
                      <div>
                        <label className="text-sm font-medium text-dark-200 mb-2 block">
                          Order Type
                        </label>
                        <div className="flex gap-2">
                          {(['market', 'limit', 'stop'] as const).map((type) => (
                            <button
                              key={type}
                              onClick={() => setOrderType(type)}
                              className={cn(
                                'flex-1 py-2 rounded-lg border text-sm font-medium transition-colors capitalize',
                                orderType === type
                                  ? 'bg-neon-blue/10 border-neon-blue text-neon-blue'
                                  : 'border-dark-700 text-dark-300 hover:border-dark-600'
                              )}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Side */}
                      <div>
                        <label className="text-sm font-medium text-dark-200 mb-2 block">
                          Direction
                        </label>
                        <div className="flex gap-2">
                          <Button
                            variant={side === 'buy' ? 'success' : 'outline'}
                            size="lg"
                            className="flex-1"
                            onClick={() => setSide('buy')}
                          >
                            <TrendingUp className="w-4 h-4 mr-2" />
                            BUY
                          </Button>
                          <Button
                            variant={side === 'sell' ? 'danger' : 'outline'}
                            size="lg"
                            className="flex-1"
                            onClick={() => setSide('sell')}
                          >
                            <TrendingDown className="w-4 h-4 mr-2" />
                            SELL
                          </Button>
                        </div>
                      </div>

                      {/* Volume */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-sm font-medium text-dark-200">
                            Volume (Lots)
                          </label>
                          <span className="text-sm text-dark-400">{volume} lot(s)</span>
                        </div>
                        <input
                          type="range"
                          min="0.01"
                          max="100"
                          step="0.01"
                          value={volume}
                          onChange={(e) => setVolume(parseFloat(e.target.value))}
                          className="w-full accent-neon-blue"
                        />
                        <div className="flex justify-between text-xs text-dark-500 mt-1">
                          <span>0.01</span>
                          <span>1</span>
                          <span>100</span>
                        </div>
                      </div>

                      {/* Leverage */}
                      <div>
                        <label className="text-sm font-medium text-dark-200 mb-2 block">
                          Leverage
                        </label>
                        <select
                          value={leverage}
                          onChange={(e) => setLeverage(Number(e.target.value))}
                          className="w-full px-3 py-2 bg-dark-800 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-neon-blue"
                        >
                          <option value={10}>1:10</option>
                          <option value={50}>1:50</option>
                          <option value={100}>1:100</option>
                          <option value={200}>1:200</option>
                          <option value={500}>1:500</option>
                          <option value={1000}>1:1000</option>
                        </select>
                      </div>

                      {/* Stop Loss / Take Profit toggles */}
                      <div className="space-y-3 pt-4 border-t border-dark-800">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium text-dark-200 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            Stop Loss
                          </label>
                          <Switch
                            checked={useStopLoss}
                            onCheckedChange={setUseStopLoss}
                          />
                        </div>
                        {useStopLoss && (
                          <Input
                            type="number"
                            placeholder={`${side === 'buy' ? 'Below' : 'Above'} entry price`}
                            value={stopLoss}
                            onChange={(e) => setStopLoss(e.target.value)}
                          />
                        )}
                      </div>

                      <div className="space-y-3 pt-2">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium text-dark-200">
                            Take Profit
                          </label>
                          <Switch
                            checked={useTakeProfit}
                            onCheckedChange={setUseTakeProfit}
                          />
                        </div>
                        {useTakeProfit && (
                          <Input
                            type="number"
                            placeholder={`${side === 'buy' ? 'Above' : 'Below'} entry price`}
                            value={takeProfit}
                            onChange={(e) => setTakeProfit(e.target.value)}
                          />
                        )}
                      </div>

                      {/* Summary */}
                      <div className="pt-4 border-t border-dark-800 space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-dark-400">Position Size</span>
                          <span className="font-mono">${formatCurrency(positionSize)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-dark-400">Required Margin</span>
                          <span className="font-mono">${formatCurrency(requiredMargin)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-dark-400">Spread</span>
                          <span className="font-mono text-dark-300">{(spread * 10000).toFixed(1)} pips</span>
                                                </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick stats panel */}
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Market Sentiment</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-dark-400">Buy</span>
                              <span className="font-medium text-trading-up">68%</span>
                            </div>
                            <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-trading-up/80 to-trading-up rounded-full" style={{ width: '68%' }} />
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-dark-400">Sell</span>
                              <span className="font-medium text-trading-down">32%</span>
                            </div>
                            <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-trading-down/80 to-trading-down rounded-full" style={{ width: '32%' }} />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Price Levels</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-dark-400">Today's High</span>
                          <span className="font-mono text-trading-up">1.0862</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-dark-400">Today's Low</span>
                          <span className="font-mono text-trading-down">1.0831</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-dark-400">Day Change</span>
                          <span className="font-mono text-trading-up">+23 pips</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Place order button */}
                <div className="pt-4">
                  <Button
                    size="lg"
                    className={cn(
                      'w-full text-lg h-14',
                      side === 'buy'
                        ? 'bg-trading-up hover:bg-trading-up/90 text-white'
                        : 'bg-trading-down hover:bg-trading-down/90 text-white'
                    )}
                    onClick={handlePlaceOrder}
                  >
                    <DollarSign className="w-5 h-5 mr-2" />
                    {side === 'buy' ? 'BUY' : 'SELL'} {symbol} at {side === 'buy' ? askPrice.toFixed(5) : bidPrice.toFixed(5)}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="positions">
                <div className="space-y-2">
                  {/* Positions will be rendered here */}
                  <div className="text-center py-16 text-dark-400">
                    <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-30" />
                    <p>No open positions</p>
                    <p className="text-sm mt-2">Place an order to start trading</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="history">
                <div className="text-center py-16 text-dark-400">
                  <Activity className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <p>No trade history yet</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Right sidebar - Watchlist */}
        <div className="w-80 border-l border-dark-800 p-4 overflow-y-auto hidden xl:block">
          <Watchlist
            onTrade={(symbol) => {
              setSymbol(symbol.replace('/', ''))
            }}
          />
        </div>
      </div>
    </div>
  )
}
