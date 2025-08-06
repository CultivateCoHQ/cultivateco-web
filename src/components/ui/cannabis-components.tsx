'use client'

import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { Loader2, Search, Filter, Copy, Check, ChevronDown } from 'lucide-react'

// Basic Button Component
export const CannabisButton = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    loading?: boolean
    icon?: React.ElementType
  }
>(({ className, variant = 'primary', size = 'md', loading, icon: Icon, children, ...props }, ref) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50'
  
  const variants = {
    primary: 'bg-green-600 text-white hover:bg-green-700',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
    ghost: 'text-gray-700 hover:bg-gray-100'
  }
  
  const sizes = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4 py-2',
    lg: 'h-11 px-8'
  }

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      ref={ref}
      disabled={loading}
      {...props}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {!loading && Icon && <Icon className="mr-2 h-4 w-4" />}
      {children}
    </button>
  )
})

// Input Component
export const CannabisInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string
  }
>(({ className, label, ...props }, ref) => (
  <div className="space-y-2">
    {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
    <input
      className={cn(
        'flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  </div>
))

// Select Component
export const CannabisSelect = forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement> & {
    label?: string
    options: Array<{ value: string; label: string }>
  }
>(({ className, label, options, ...props }, ref) => (
  <div className="space-y-2">
    {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
    <select
      className={cn(
        'flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
))

// TextArea Component
export const CannabisTextArea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label?: string
  }
>(({ className, label, ...props }, ref) => (
  <div className="space-y-2">
    {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
    <textarea
      className={cn(
        'flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  </div>
))

// Metric Card Component
export const CannabisMetricCard = ({
  title,
  value,
  icon: Icon,
  color = 'green',
  change,
  onClick
}: {
  title: string
  value: string | number
  icon: React.ElementType
  color?: 'green' | 'blue' | 'purple' | 'amber' | 'red' | 'info'
  change?: number
  onClick?: () => void
}) => {
  const colors = {
    green: 'text-green-600 bg-green-100',
    blue: 'text-blue-600 bg-blue-100',
    purple: 'text-purple-600 bg-purple-100',
    amber: 'text-amber-600 bg-amber-100',
    red: 'text-red-600 bg-red-100',
    info: 'text-gray-600 bg-gray-100'
  }

  return (
    <div
      className={cn(
        'bg-white rounded-lg border border-gray-200 p-6',
        onClick && 'cursor-pointer hover:bg-gray-50'
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={cn('text-sm', change > 0 ? 'text-green-600' : 'text-red-600')}>
              {change > 0 ? '+' : ''}{change}%
            </p>
          )}
        </div>
        <div className={cn('p-3 rounded-full', colors[color])}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  )
}

// Alert Component
export const CannabisAlert = ({
  type,
  title,
  message,
  action
}: {
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  action?: { label: string; onClick: () => void }
}) => {
  const colors = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
    error: 'bg-red-50 border-red-200 text-red-800'
  }

  return (
    <div className={cn('border rounded-md p-4', colors[type])}>
      <div className="flex justify-between">
        <div>
          <h3 className="text-sm font-medium">{title}</h3>
          <p className="text-sm mt-1">{message}</p>
        </div>
        {action && (
          <button
            onClick={action.onClick}
            className="text-sm underline hover:no-underline"
          >
            {action.label}
          </button>
        )}
      </div>
    </div>
  )
}

// Loading Spinner Component
export const CannabisLoadingSpinner = ({
  size = 'md',
  text
}: {
  size?: 'sm' | 'md' | 'lg'
  text?: string
}) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  }

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <Loader2 className={cn('animate-spin text-green-600', sizes[size])} />
      {text && <p className="mt-4 text-sm text-gray-600">{text}</p>}
    </div>
  )
}

// Badge Component
export const CannabisBadge = ({
  children,
  variant = 'info',
  size = 'md'
}: {
  children: React.ReactNode
  variant?: 'success' | 'warning' | 'violation' | 'info' | 'processing'
  size?: 'sm' | 'md'
}) => {
  const variants = {
    success: 'bg-green-100 text-green-800',
    warning: 'bg-amber-100 text-amber-800',
    violation: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    processing: 'bg-purple-100 text-purple-800'
  }

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm'
  }

  return (
    <span className={cn('inline-flex items-center rounded-full font-medium', variants[variant], sizes[size])}>
      {children}
    </span>
  )
}

// Search Input Component
export const CannabisSearchInput = ({
  value,
  onChange,
  placeholder,
  showFilter,
  onFilter
}: {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  showFilter?: boolean
  onFilter?: () => void
}) => (
  <div className="relative">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
    <input
      type="text"
      className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
    {showFilter && (
      <button
        onClick={onFilter}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
      >
        <Filter className="h-4 w-4" />
      </button>
    )}
  </div>
)

// Quantity Input Component
export const CannabisQuantityInput = ({
  value,
  onChange,
  min = 0,
  max,
  step = 1
}: {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
}) => (
  <div className="flex items-center border border-gray-300 rounded-md">
    <button
      type="button"
      onClick={() => onChange(Math.max(min, value - step))}
      className="px-3 py-1 text-gray-600 hover:text-gray-800"
    >
      -
    </button>
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      min={min}
      max={max}
      step={step}
      className="w-20 text-center border-none focus:ring-0"
    />
    <button
      type="button"
      onClick={() => onChange(max ? Math.min(max, value + step) : value + step)}
      className="px-3 py-1 text-gray-600 hover:text-gray-800"
    >
      +
    </button>
  </div>
)

// Collapsible Component
export const CannabisCollapsible = ({
  title,
  children,
  defaultOpen = false
}: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)

  return (
    <div className="border border-gray-200 rounded-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 text-left font-medium text-gray-900 hover:bg-gray-50 flex items-center justify-between"
      >
        {title}
        <ChevronDown className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')} />
      </button>
      {isOpen && (
        <div className="px-4 py-3 border-t border-gray-200">
          {children}
        </div>
      )}
    </div>
  )
}

// Empty State Component
export const CannabisEmptyState = ({
  icon: Icon,
  title,
  description,
  action
}: {
  icon: React.ElementType
  title: string
  description: string
  action?: { label: string; onClick: () => void }
}) => (
  <div className="text-center py-12">
    <Icon className="mx-auto h-12 w-12 text-gray-400" />
    <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>
    <p className="mt-2 text-sm text-gray-600">{description}</p>
    {action && (
      <div className="mt-6">
        <CannabisButton onClick={action.onClick} variant="primary">
          {action.label}
        </CannabisButton>
      </div>
    )}
  </div>
)

// Copy to Clipboard Component
export const CannabisCopyToClipboard = ({
  text,
  children,
  className
}: {
  text: string
  children: React.ReactNode
  className?: string
}) => {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className={cn('inline-flex items-center space-x-1 hover:text-green-600', className)}
    >
      <span>{children}</span>
      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
    </button>
  )
}

// Date Picker Component (simplified)
export const CannabisDatePicker = ({
  value,
  onChange,
  label
}: {
  value: string
  onChange: (value: string) => void
  label?: string
}) => (
  <div className="space-y-2">
    {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
    <input
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
    />
  </div>
)

// Toggle Component
export const CannabisToggle = ({
  checked,
  onChange,
  label
}: {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
}) => (
  <div className="flex items-center space-x-2">
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cn(
        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
        checked ? 'bg-green-600' : 'bg-gray-200'
      )}
    >
      <span
        className={cn(
          'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
          checked ? 'translate-x-6' : 'translate-x-1'
        )}
      />
    </button>
    {label && <span className="text-sm text-gray-700">{label}</span>}
  </div>
)

// Chart Component (simplified with Recharts)
export const CannabisChart = ({
  type,
  data,
  xKey,
  yKeys,
  colors,
  formatValue
}: {
  type: 'line' | 'bar' | 'area'
  data: any[]
  xKey: string
  yKeys: string[]
  colors: string[]
  formatValue?: (value: number) => string
}) => (
  <div className="h-full w-full flex items-center justify-center text-gray-500">
    Chart Component ({type}) - {data.length} data points
  </div>
)

// Progress Bar Component
export const CannabisProgressBar = ({
  value,
  max = 100,
  color = '#10B981',
  className
}: {
  value: number
  max?: number
  color?: string
  className?: string
}) => (
  <div className={cn('w-full bg-gray-200 rounded-full h-2', className)}>
    <div
      className="h-2 rounded-full transition-all"
      style={{
        width: `${(value / max) * 100}%`,
        backgroundColor: color
      }}
    />
  </div>
)
