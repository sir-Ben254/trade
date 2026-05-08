/**
 * Logger Utility
 * Purpose: Structured logging for debugging and monitoring
 * Security: Sanitizes sensitive data before logging
 * Performance: No-op in production for console logs
 */

const LOG_LEVELS = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
} as const

type LogLevel = keyof typeof LOG_LEVELS

class Logger {
  private level: LogLevel
  private context?: string

  constructor(context?: string, level: LogLevel = process.env.NODE_ENV === 'development' ? 'debug' : 'info') {
    this.context = context
    this.level = level
  }

  /**
   * Log an error
   */
  error(message: string, error?: Error | object) {
    if (LOG_LEVELS.error <= LOG_LEVELS[this.level]) {
      console.error(
        `%c[${this.getTimestamp()}] ${this.context ? `[${this.context}]` : ''} ERROR: ${message}`,
        'color: #ff5252; font-weight: bold;',
        this.sanitize(error)
      )
    }
  }

  /**
   * Log a warning
   */
  warn(message: string, data?: object) {
    if (LOG_LEVELS.warn <= LOG_LEVELS[this.level]) {
      console.warn(
        `%c[${this.getTimestamp()}] ${this.context ? `[${this.context}]` : ''} WARN: ${message}`,
        'color: #ffd600; font-weight: bold;',
        data
      )
    }
  }

  /**
   * Log informational message
   */
  info(message: string, data?: object) {
    if (LOG_LEVELS.info <= LOG_LEVELS[this.level]) {
      console.info(
        `%c[${this.getTimestamp()}] ${this.context ? `[${this.context}]` : ''} INFO: ${message}`,
        'color: #00d4ff; font-weight: bold;',
        data
      )
    }
  }

  /**
   * Log debug message (dev only)
   */
  debug(message: string, data?: object) {
    if (LOG_LEVELS.debug <= LOG_LEVELS[this.level]) {
      console.debug(
        `%c[${this.getTimestamp()}] ${this.context ? `[${this.context}]` : ''} DEBUG: ${message}`,
        'color: #8e8e8e; font-weight: bold;',
        data
      )
    }
  }

  /**
   * Log API request
   */
  api(method: string, url: string, status: number, duration: number) {
    const color = status >= 200 && status < 300 ? '#00c853' : status >= 400 ? '#ff5252' : '#ffd600'
    console.log(
      `%c[${this.getTimestamp()}] ${this.context ? `[${this.context}]` : ''} API: ${method} ${url}`,
      `color: ${color}; font-weight: bold;`,
      `Status: ${status} (${duration}ms)`
    )
  }

  /**
   * Log performance metric
   */
  perf(label: string, duration: number) {
    this.debug(`PERF: ${label}`, { duration })
  }

  /**
   * Log user action
   */
  user(action: string, userId?: string, metadata?: object) {
    this.info(`USER: ${action}`, { userId, ...metadata })
  }

  /**
   * Sanitize data to prevent logging sensitive info
   */
  private sanitize(data?: object | Error): object | undefined {
    if (!data) return undefined

    try {
      const sensitiveKeys = ['password', 'token', 'secret', 'apiKey', 'authorization', 'cookie']

      if (data instanceof Error) {
        return {
          message: data.message,
          name: data.name,
          stack: process.env.NODE_ENV === 'development' ? data.stack : undefined,
        }
      }

      const sanitized: any = { ...data }
      sensitiveKeys.forEach((key) => {
        if (sanitized[key]) {
          sanitized[key] = '***REDACTED***'
        }
      })

      // Sanitize nested objects
      Object.keys(sanitized).forEach((key) => {
        if (typeof sanitized[key] === 'object' && sanitized[key] !== null) {
          sanitized[key] = this.sanitize(sanitized[key])
        }
      })

      return sanitized
    } catch {
      return { error: 'Failed to sanitize' }
    }
  }

  /**
   * Get formatted timestamp
   */
  private getTimestamp(): string {
    return new Date().toISOString()
  }

  /**
   * Create child logger with context
   */
  child(context: string): Logger {
    return new Logger(`${this.context ? this.context + '/' : ''}${context}`)
  }
}

/**
 * Global logger instance
 */
export const logger = new Logger('ForexPro')

export default logger
