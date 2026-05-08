/**
 * Socket Provider (WebSocket Connection Manager)
 * Purpose: Global WebSocket connection for live market data
 * Security: Token-based authentication, encrypted connections (WSS)
 * Performance: Auto-reconnection with exponential backoff, connection pooling
 */

'use client'

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from 'react'
import { io, Socket } from 'socket.io-client'

interface SocketContextType {
  socket: Socket | null
  isConnected: boolean
  lastMessage: any
  joinRoom: (room: string) => void
  leaveRoom: (room: string) => void
  emit: (event: string, data?: any) => void
  subscribe: (event: string, callback: (data: any) => void) => () => void
}

const SocketContext = createContext<SocketContextType | undefined>(undefined)

interface SocketProviderProps {
  children: ReactNode
  url?: string
  options?: Partial<{
    auth: { token: string }
    transports: string[]
    reconnectionAttempts: number
    reconnectionDelay: number
  }>
}

/**
 * Global WebSocket provider for real-time trading data
 * Features:
 * - Auto-reconnect with exponential backoff
 * - Room-based subscriptions for channels (prices, signals, notifications)
 * - Event subscription management
 */
export function SocketProvider({
  children,
  url,
  options = {},
}: SocketProviderProps) {
  const socketRef = useRef<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [lastMessage, setLastMessage] = useState<any>(null)
  const subscriptionsRef = useRef<Map<string, Set<Function>>>(new Map())

  // Initialize socket connection
  useEffect(() => {
    if (!url && process.env.NODE_ENV === 'development') {
      url = 'http://localhost:3001'
    } else if (!url) {
      url = process.env.NEXT_PUBLIC_SOCKET_URL || ''
    }

    // Default options with production-ready defaults
    const socketOptions = {
      auth: options.auth || {
        token: localStorage.getItem('accessToken') || '',
      },
      transports: options.transports || ['websocket', 'polling'],
      reconnectionAttempts: options.reconnectionAttempts ?? 10,
      reconnectionDelay: options.reconnectionDelay ?? 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
      autoConnect: true,
      ...options,
    }

    // Create socket instance
    const socket = io(url, socketOptions)

    // Connection established
    socket.on('connect', () => {
      console.log('[Socket] Connected:', socket.id)
      setIsConnected(true)

      // Re-subscribe to rooms after reconnection
      subscriptionsRef.current.forEach((callbacks, room) => {
        socket.emit('join', room)
      })
    })

    // Disconnection handler
    socket.on('disconnect', (reason) => {
      console.log('[Socket] Disconnected:', reason)
      setIsConnected(false)

      // Show user notification if unexpected disconnect
      if (reason === 'io server disconnect') {
        // Server-initiated disconnect, attempt manual reconnect
        socket.connect()
      }
    })

    // Reconnection attempt handler
    socket.on('reconnect_attempt', (attempt) => {
      console.log(`[Socket] Reconnection attempt ${attempt}`)
    })

    // Reconnection success
    socket.on('reconnect', (attempt) => {
      console.log(`[Socket] Reconnected after ${attempt} attempts`)
    })

    // Error handler
    socket.on('error', (error) => {
      console.error('[Socket] Error:', error)
    })

    // Message received handler
    socket.onAny((event, ...args) => {
      setLastMessage({ event, args, timestamp: Date.now() })

      // Notify all subscribers of this event
      const callbacks = subscriptionsRef.current.get(event)
      if (callbacks) {
        callbacks.forEach((callback) => {
          try {
            callback(args[0])
          } catch (error) {
            console.error(`[Socket] Error in ${event} callback:`, error)
          }
        })
      }
    })

    socketRef.current = socket

    // Cleanup on unmount
    return () => {
      socket.disconnect()
      socketRef.current = null
      subscriptionsRef.current.clear()
    }
  }, [url])

  /**
   * Join a room/channel for targeted updates
   * Examples: 'user:123', 'trading:pairs:EURUSD', 'signals:premium'
   */
  const joinRoom = (room: string) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('join', room)
    }
  }

  /**
   * Leave a room/channel
   */
  const leaveRoom = (room: string) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('leave', room)
    }
  }

  /**
   * Emit an event to the server
   */
  const emit = (event: string, data?: any) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit(event, data)
    } else {
      console.warn(`[Socket] Cannot emit "${event}" - not connected`)
    }
  }

  /**
   * Subscribe to a socket event
   * Returns unsubscribe function for cleanup
   */
  const subscribe = (event: string, callback: (data: any) => void) => {
    // Add callback to subscription map
    if (!subscriptionsRef.current.has(event)) {
      subscriptionsRef.current.set(event, new Set())

      // Join appropriate room based on event type for efficient data routing
      if (event.startsWith('price:')) {
        const symbol = event.replace('price:', '')
        joinRoom(`trading:pairs:${symbol}`)
      } else if (event.startsWith('signal:')) {
        joinRoom('signals:all')
      } else if (event === 'notification:new') {
        joinRoom('notifications:all')
      } else if (event === 'market:update') {
        joinRoom('market:all')
      } else if (event === 'user:activity') {
        joinRoom('user:activity')
      }
    }
    subscriptionsRef.current.get(event)!.add(callback)

    // Return unsubscribe function
    return () => {
      const callbacks = subscriptionsRef.current.get(event)
      if (callbacks) {
        callbacks.delete(callback)
        if (callbacks.size === 0) {
          subscriptionsRef.current.delete(event)

          // Optionally leave room if no more subscribers
          if (event.startsWith('price:') || event.startsWith('signal:') || event === 'notification:new') {
            // Room cleanup logic if needed
          }
        }
      }
    }
  }
    subscriptionsRef.current.get(event)!.add(callback)

    // Join appropriate room based on event type
    if (event.startsWith('price:')) {
      const symbol = event.replace('price:', '')
      joinRoom(`trading:pairs:${symbol}`)
    } else if (event.startsWith('signal:')) {
      joinRoom('signals:all')
    } else if (event === 'notification:new') {
      joinRoom('notifications:all')
    }

    // Return unsubscribe function
    return () => {
      const callbacks = subscriptionsRef.current.get(event)
      if (callbacks) {
        callbacks.delete(callback)
        if (callbacks.size === 0) {
          subscriptionsRef.current.delete(event)

          // Optionally leave room if no more subscribers
              }
            }
          }
        }
      </div>
    )
  }

  const value: SocketContextType = {
    socket: socketRef.current,
    isConnected,
    lastMessage,
    joinRoom,
    leaveRoom,
    emit,
    subscribe,
  }

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  )
}

/**
 * Custom hook to use socket context
 */
export function useSocket() {
  const context = useContext(SocketContext)
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider')
  }
  return context
}
