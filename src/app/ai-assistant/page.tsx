/**
 * AI Trading Assistant Page
 * Purpose: AI-powered market analysis, trade suggestions, risk insights
 * Features: Chat interface, analysis generation, sentiment tracking, predictions
 */

'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Avatar } from '@/components/ui/avatar'
import { Skeleton } from '@/components/shared/loading-skeleton'
import {
  Bot,
  Send,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Lightbulb,
  BarChart2,
  MessageSquare,
  Sparkles,
  Loader2,
} from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: `Hello! I'm your AI trading assistant. I can help you with:

📊 Market analysis and predictions
📈 Trade setup ideas with risk/reward
⚠️ Risk warnings and market alerts
📰 News sentiment analysis
💡 Trading strategy suggestions

What would you like to know today?`,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const aiResponse: AIMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(input),
        timestamp: new Date(),
        suggestions: getSuggestions(input),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-16 border-b border-dark-800 flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-display font-semibold">AI Trading Assistant</h1>
              <div className="flex items-center gap-2">
                <span className="live-indicator" />
                <span className="text-xs text-dark-400">Online</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="info">GPT-4 Powered</Badge>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}

          {/* Typing indicator */}
          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="glass rounded-2xl rounded-tl-none p-4 max-w-2xl">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-neon-blue" />
                  <span className="text-dark-300 text-sm">Analyzing market data...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="p-4 border-t border-dark-800">
          <div className="flex gap-2 max-w-4xl mx-auto">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about market conditions, trade ideas, or risk analysis..."
              className="flex-1"
            />
            <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>

          {/* Quick prompts */}
          <div className="flex flex-wrap gap-2 mt-3 max-w-4xl mx-auto">
            {[
              'Analyze EUR/USD',
              'Market sentiment today',
              'Best trade opportunities',
              'Risk assessment',
            ].map((prompt) => (
              <button
                key={prompt}
                onClick={() => setInput(prompt)}
                className="px-3 py-1 text-xs rounded-full bg-dark-800 border border-dark-700 text-dark-300 hover:border-neon-blue hover:text-neon-blue transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right sidebar - Suggestions & tools */}
      <div className="w-80 border-l border-dark-800 p-4 overflow-y-auto hidden xl:block">
        <Tabs defaultValue="suggestions">
          <TabsList className="w-full">
            <TabsTrigger value="suggestions" className="flex-1">
              <Lightbulb className="w-4 h-4 mr-2" />
              Ideas
            </TabsTrigger>
            <TabsTrigger value="analysis" className="flex-1">
              <BarChart2 className="w-4 h-4 mr-2" />
              Analysis
            </TabsTrigger>
          </TabsList>

          <TabsContent value="suggestions" className="space-y-3 mt-4">
            <h3 className="font-medium text-sm text-dark-300">Today's AI Insights</h3>

            {[
              {
                pair: 'EUR/USD',
                type: 'buy' as const,
                confidence: 72,
                reason: 'Bullish divergence on 4H',
              },
              {
                pair: 'GBP/USD',
                type: 'sell' as const,
                confidence: 68,
                reason: 'Resistance at 1.2700',
              },
              {
                pair: 'USD/JPY',
                type: 'buy' as const,
                confidence: 81,
                reason: 'BOJ policy expectations',
              },
            ].map((suggestion, i) => (
              <Card key={i} className="cursor-pointer hover:border-neon-blue/50 transition-colors">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono font-semibold">{suggestion.pair}</span>
                    <Badge variant={suggestion.type === 'buy' ? 'success' : 'error'} className="text-xs">
                      {suggestion.type.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-dark-400">{suggestion.reason}</span>
                    <span className="font-medium text-neon-blue">{suggestion.confidence}%</span>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button variant="outline" className="w-full mt-2">
              Request Custom Analysis
            </Button>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-3 mt-4">
            <h3 className="font-medium text-sm text-dark-300">Market Overview</h3>

            <div className="space-y-2">
              {[
                { name: ' EUR/USD', sentiment: 'bullish', change: 0.21 },
                { name: ' GBP/USD', sentiment: 'bearish', change: -0.14 },
                { name: ' USD/JPY', sentiment: 'neutral', change: 0.05 },
                { name: ' XAU/USD', sentiment: 'bullish', change: 0.33 },
              ].map((pair, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-dark-800/50">
                  <span className="font-mono text-sm">{pair.name}</span>
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      'text-xs px-2 py-0.5 rounded-full',
                      pair.sentiment === 'bullish' && 'bg-trading-up/20 text-trading-up',
                      pair.sentiment === 'bearish' && 'bg-trading-down/20 text-trading-down',
                      pair.sentiment === 'neutral' && 'bg-dark-700 text-dark-300',
                    )}>
                      {pair.sentiment}
                    </span>
                    <span className={cn(
                      'text-xs font-mono',
                      pair.change > 0 ? 'text-trading-up' : 'text-trading-down'
                    )}>
                      {pair.change > 0 ? '+' : ''}{pair.change.toFixed(2)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

/**
 * Message bubble component
 */
function MessageBubble({ message }: { message: AIMessage }) {
  const isAI = message.type === 'ai'

  return (
    <div className={cn('flex items-start gap-3', !isAi && 'flex-row-reverse')}>
      {/* Avatar */}
      <Avatar
        src={isAI ? undefined : '/avatar-placeholder.png'}
        name={isAI ? 'AI Assistant' : 'You'}
        size="md"
        className={cn('flex-shrink-0', !isAi && 'bg-neon-blue')}
      />

      {/* Message content */}
      <div
        className={cn(
          'glass rounded-2xl p-4 max-w-2xl',
          isAI ? 'rounded-tl-none' : 'rounded-tr-none'
        )}
      >
        <div className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.content}
        </div>

        {/* Suggestions */}
        {message.suggestions && message.suggestions.length > 0 && (
          <div className="mt-3 pt-3 border-t border-dark-700 space-y-2">
            {message.suggestions.map((suggestion, i) => (
              <button
                key={i}
                className="w-full text-left p-2 rounded-lg bg-dark-800/50 hover:bg-dark-700 transition-colors text-sm"
              >
                <div className="flex items-center justify-between">
                  <span>{suggestion.pair}</span>
                  <Badge variant={suggestion.type === 'buy' ? 'success' : 'error'} className="text-xs">
                    {suggestion.type.toUpperCase()}
                  </Badge>
                </div>
                <div className="text-xs text-dark-400 mt-1">{suggestion.idea}</div>
              </button>
            ))}
          </div>
        )}

        {/* Timestamp */}
        <div className="text-xs text-dark-500 mt-2">
          {format(message.timestamp, 'h:mm a')}
        </div>
      </div>
    </div>
  )
}

/**
 * Generate AI response (mock - replace with OpenAI API)
 */
function generateAIResponse(query: string): string {
  const q = query.toLowerCase()

  if (q.includes('eur/usd') || q.includes('euro')) {
    return `**EUR/USD Analysis**

📈 **Trend**: Bullish (4H timeframe)
🎯 **Key Levels**:
   - Support: 1.0840, 1.0820
   - Resistance: 1.0870, 1.0895
⚡ **Sentiment**: 68% Buy

**Factors**:
- ECB hawkish meeting minutes
- US data showing softness
- RSI divergence suggesting upward momentum

**Trade Idea**:
- Buy on dip to 1.0840
- Stop: 1.0820 (20 pips risk)
- Target: 1.0895 (55 pips)
- R/R: 1:2.75

⚠️ Watch for US CPI data release today at 13:30 UTC`
  }

  if (q.includes('sentiment') || q.includes('market')) {
    return `**Today's Market Sentiment**

🔵 **Risk-On**: Moderate
📊 **VIX**: 14.2 (Low volatility)
💵 **DXY**: 103.45 (-0.23%)

**Currency Sentiment**:
🟢 **Bullish**: EUR, GBP, CHF
🔴 **Bearish**: USD (moderate), CAD
🟡 **Neutral**: JPY, AUD

**Key Drivers**:
1. Fed speakers suggesting dovish tilt
2. Strong Eurozone PMI data
3. Crude oil inventory draw

**Caution**: High-impact US data this afternoon could increase volatility significantly. Position size accordingly.`
  }

  if (q.includes('risk') || q.includes('safe')) {
    return `**Risk Assessment for Current Market**

⚠️ **Overall Risk Level**: MODERATE

**Risk Factors**:
- Economic calendar: 3 high-impact events this week
- Position sizing: Recommend max 2% per trade
- Correlation risk: EUR/USD & GBP/USD highly correlated

**Risk Management Tips**:
1. ✅ Use stop losses on all trades
2. ✅ Keep leverage under 1:50
3. ✅ Diversify across currency pairs
4. ⚠️ Avoid trading 5 min before/after high-impact news

**Portfolio Risk Score**: 6/10 (Moderate)

Would you like specific risk analysis for your open positions?`
  }

  // Default response
  return `I understand you're asking about "${query}".

I can provide:
• 📊 Technical analysis
• 📰 Fundamental analysis  
• 💡 Trade ideas with R/R ratios
• ⚠️ Risk warnings
• 📈 Market sentiment
• 📉 Trend analysis

Could you specify which currency pair or market you're interested in?`

}

/**
 * Get trade suggestions based on query
 */
function getSuggestions(query: string): Array<{ pair: string; type: 'buy' | 'sell'; idea: string }> {
  return [
    { pair: 'EUR/USD', type: 'buy', idea: 'Bullish divergence on 4H' },
    { pair: 'GBP/USD', type: 'sell', idea: 'Resistance at 1.2700' },
    { pair: 'USD/JPY', type: 'buy', idea: 'BOJ policy expectations' },
  ]
}

type AIMessage = {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
  suggestions?: Array<{ pair: string; type: 'buy' | 'sell'; idea: string }>
}
