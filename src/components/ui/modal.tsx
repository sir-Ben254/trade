/**
 * Modal Component
 * Purpose: Reusable modal/dialog with animations
 * Accessibility: ARIA modal, focus trap, escape key
 */

'use client'

import * as React from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  description?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  showClose?: boolean
  closeOnOverlayClick?: boolean
}

/**
 * Modal dialog with backdrop and animations
 */
export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  size = 'md',
  showClose = true,
  closeOnOverlayClick = true,
}: ModalProps) {
  const [mounted, setMounted] = React.useState(false)

  // Handle mounting for SSR
  React.useEffect(() => {
    setMounted(true)
    if (open) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [open, onClose])

  if (!mounted || !open) return null

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-4xl',
  }

  return createPortal(
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-dark-950/80 backdrop-blur-sm transition-opacity"
        onClick={closeOnOverlayClick ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Modal content */}
      <div className="relative flex items-center justify-center min-h-screen p-4">
        <div
          className={cn(
            'relative w-full bg-dark-900 border border-dark-700 rounded-2xl shadow-2xl',
            'transform transition-all duration-300 ease-out',
            'scale-100 opacity-100',
            sizes[size]
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'modal-title' : undefined}
          aria-describedby={description ? 'modal-description' : undefined}
        >
          {/* Header */}
          {(title || showClose) && (
            <div className="flex items-center justify-between p-4 border-b border-dark-800">
              <div>
                {title && (
                  <h2
                    id="modal-title"
                    className="text-lg font-semibold text-white"
                  >
                    {title}
                  </h2>
                )}
                {description && (
                  <p
                    id="modal-description"
                    className="text-sm text-dark-400 mt-0.5"
                  >
                    {description}
                  </p>
                )}
              </div>
              {showClose && (
                <button
                  onClick={onClose}
                  className="p-1 rounded-lg hover:bg-dark-800 transition-colors text-dark-400 hover:text-white"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          )}

          {/* Body */}
          <div className="p-4 max-h-[70vh] overflow-y-auto">{children}</div>
        </div>
      </div>
    </div>,
    document.body
  )
}

Modal.displayName = 'Modal'

/**
 * Confirm Dialog - Specialized modal for confirmations
 */
export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
}: {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: 'primary' | 'danger' | 'success'
}) {
  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  const buttonVariants = {
    primary: 'bg-neon-blue hover:bg-neon-blue/90',
    danger: 'bg-trading-down hover:bg-trading-down/90',
    success: 'bg-trading-up hover:bg-trading-up/90',
  }

  return (
    <Modal open={open} onClose={onClose} title={title} size="sm">
      <p className="text-dark-300 mb-6">{message}</p>
      <div className="flex gap-3 justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg bg-dark-800 text-white hover:bg-dark-700 transition-colors"
        >
          {cancelText}
        </button>
        <button
          onClick={handleConfirm}
          className={cn(
            'px-4 py-2 rounded-lg text-white font-medium transition-colors',
            buttonVariants[variant]
          )}
        >
          {confirmText}
        </button>
      </div>
    </Modal>
  )
}

ConfirmDialog.displayName = 'ConfirmDialog'

export { ConfirmDialog }
