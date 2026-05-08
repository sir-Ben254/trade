/**
 * UI Button Component
 * Purpose: Reusable button with multiple variants
 * Security: Prevents double-clicks, type='button' by default
 * Accessibility: Proper ARIA attributes, keyboard navigation
 * Usage: Import from '@/components/ui/button'
 */

'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * Button variants for different use cases
 * Tailwind class variants optimized for fintech UI
 */
const buttonVariants = cva(
  // Base styles - all buttons
  'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-950 disabled:pointer-events-none disabled:opacity-50 active:scale-95',
  {
    variants: {
      variant: {
        // Primary button - main actions
        default:
          'bg-gradient-to-r from-neon-blue to-neon-cyan text-white shadow-lg hover:shadow-neon-blue/25 hover:from-neon-blue/90 hover:to-neon-cyan/90',
        // Secondary button - alternative actions
        secondary:
          'bg-dark-800 text-white border border-dark-700 hover:bg-dark-700 hover:border-neon-blue/50',
        // Ghost button - minimal styling
        ghost:
          'hover:bg-dark-800/50 text-dark-200 hover:text-white',
        // Outline button - bordered
        outline:
          'border border-dark-600 bg-transparent hover:border-neon-blue hover:bg-neon-blue/10 text-white',
        // Success button - positive actions
        success:
          'bg-trading-up text-white shadow-lg hover:bg-trading-up/90',
        // Danger button - destructive actions
        danger:
          'bg-trading-down text-white shadow-lg hover:bg-trading-down/90',
        // Gradient variants
        gradient:
          'bg-gradient-to-r from-neon-purple to-neon-pink text-white shadow-lg hover:shadow-neon-purple/25',
        // Pricing card button
        pricing:
          'w-full bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-neon-blue/25 transition-all hover:scale-[1.02]',
        // Glass morphism button
        glass:
          'glass text-white hover:bg-white/10 border border-glass-border',
      },
      size: {
        // Small button - compact UI
        sm: 'h-8 px-3 text-xs rounded-lg',
        // Medium button - default
        md: 'h-10 px-4 py-2 rounded-lg',
        // Large button - hero CTA
        lg: 'h-12 px-8 text-base rounded-xl',
        // XLarge - hero section
        xl: 'h-14 px-10 text-lg rounded-xl',
        // Full width
        full: 'w-full h-12 px-6 rounded-lg',
        // Icon button - square
        icon: 'h-10 w-10 p-0 rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

/**
 * Button Props combining HTML button attributes with our variants
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
  loadingText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

/**
 * Button Component with multiple visual variants
 *
 * @example
 * // Default primary button
 * <Button>Click me</Button>
 *
 * @example
 * // Outline with icons
 * <Button variant="outline" size="lg" leftIcon={<Download />}>
 *   Download
 * </Button>
 *
 * @example
 * // Glass morphism button
 * <Button variant="glass" className="mt-4">
 *   Get Started Free
 * </Button>
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      loadingText,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        type={asChild ? undefined : 'button'}
        aria-busy={isLoading ? 'true' : 'false'}
        aria-live="polite"
        {...props}
      >
        {/* Loading spinner */}
        {isLoading && (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}

        {/* Left icon */}
        {!isLoading && leftIcon && (
          <span className="w-4 h-4">{leftIcon}</span>
        )}

        {/* Button text - show loading text if loading */}
        {isLoading && loadingText ? (
          <span>{loadingText}</span>
        ) : (
          children
        )}

        {/* Right icon */}
        {!isLoading && rightIcon && (
          <span className="w-4 h-4">{rightIcon}</span>
        )}
      </Comp>
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
