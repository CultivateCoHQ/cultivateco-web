'use client'

import { ThemeProvider } from 'next-themes'
import { cn } from '@/lib/utils'

export function CannabisThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
}

export function CannabisThemeContainer({ 
  children, 
  variant = 'default',
  className 
}: { 
  children: React.ReactNode
  variant?: 'default' | 'card' | 'section'
  className?: string
}) {
  const variants = {
    default: '',
    card: 'bg-white rounded-lg shadow-sm border border-gray-200 p-6',
    section: 'bg-gray-50 rounded-lg p-4'
  }

  return (
    <div className={cn(variants[variant], className)}>
      {children}
    </div>
  )
}

export function CannabisStatusIndicator({ 
  status,
  size = 'sm'
}: { 
  status: 'success' | 'warning' | 'error' | 'info'
  size?: 'sm' | 'md' | 'lg'
}) {
  const statusColors = {
    success: 'bg-green-500',
    warning: 'bg-yellow-500', 
    error: 'bg-red-500',
    info: 'bg-blue-500'
  }

  const sizes = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  }

  return (
    <div className={cn('rounded-full', statusColors[status], sizes[size])} />
  )
}
