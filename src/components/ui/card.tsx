/**
 * Card Component
 * Purpose: Container for grouped content with glassmorphism
 * Design: Modern fintech aesthetic with hover effects
 * Security: Safe content rendering with React escaping
 */

import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * Card component hierarchy
 * Card > CardHeader > CardTitle/CardDescription
 *        > CardContent
 *        > CardFooter
 *
 * @example
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Title</CardTitle>
 *     <CardDescription>Description</CardDescription>
 *   </CardHeader>
 *   <CardContent>Content</CardContent>
 *   <CardFooter>Footer</CardContent>
 * </Card>
 */
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: 'default' | 'elevated' | 'bordered' | 'flat'
    hoverable?: boolean
    glow?: 'none' | 'blue' | 'green' | 'purple' | 'pink'
  }
>(
  (
    {
      className,
      variant = 'default',
      hoverable = false,
      glow = 'none',
      children,
      ...props
    },
    ref
  ) => {
    // Base card styles
    const baseStyles =
      'relative rounded-xl border transition-all duration-300 overflow-hidden'

    // Variant styles
    const variants = {
      default: 'glass border-dark-800/50 hover:border-dark-700/50',
      elevated: 'bg-dark-900/80 border border-dark-800 shadow-floating hover:shadow-neon-blue/10',
      bordered: 'bg-transparent border-2 border-dark-700 hover:border-neon-blue/50',
      flat: 'bg-dark-900/40 border-0',
    }

    // Glow effect on hover
    const glowStyles = {
      none: '',
      blue: 'hover:shadow-neon-blue/20 hover:border-neon-blue/30',
      green: 'hover:shadow-neon-green/20 hover:border-neon-green/30',
      purple: 'hover:shadow-neon-purple/20 hover:border-neon-purple/30',
      pink: 'hover:shadow-neon-pink/20 hover:border-neon-pink/30',
    }

    // Hover transform
    const hoverStyles = hoverable ? 'hover:-translate-y-1 hover:scale-[1.02]' : ''

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          glowStyles[glow],
          hoverStyles,
          className
        )}
        {...props}
      >
        {/* Gradient overlay for glass effect */}
        {variant === 'default' && (
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        )}

        {children}
      </div>
    )
  }
)
Card.displayName = 'Card'

/**
 * Card Header
 */
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6 pb-0', className)}
    {...props}
  />
))
CardHeader.displayName = 'CardHeader'

/**
 * Card Title
 */
const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement> & {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  }
>(({ className, as: Component = 'h3', ...props }, ref) => (
  <Component
    ref={ref}
    className={cn(
      'font-display font-semibold leading-none tracking-tight text-lg md:text-xl',
      className
    )}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

/**
 * Card Description
 */
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-dark-400 leading-relaxed', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

/**
 * Card Content
 */
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-2', className)} {...props} />
))
CardContent.displayName = 'CardContent'

/**
 * Card Footer
 */
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
