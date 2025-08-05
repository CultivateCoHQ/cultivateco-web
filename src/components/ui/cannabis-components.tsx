'use client'

import React, { useState, useEffect, forwardRef } from 'react'
import { 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  X, 
  Eye, 
  EyeOff, 
  Search, 
  Filter, 
  Download, 
  Upload, 
  Calendar, 
  Clock, 
  DollarSign, 
  Percent, 
  TrendingUp, 
  TrendingDown, 
  Loader2,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  Copy,
  Check,
  Leaf
} from 'lucide-react'
import { cn, formatCurrency, formatCannabisWeight, calculateGrowth } from '@/lib/utils'
import { CannabisStatusIndicator } from '@/providers/theme-provider'

/**
 * =============================================================================
 * CultivateCo Cannabis UI Components
 * =============================================================================
 * Professional cannabis industry UI components with CultivateCo branding
 */

// ============================================================================
// CANNABIS BUTTON COMPONENTS
// ============================================================================

interface CannabisButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  icon?: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}

export const CannabisButton = forwardRef<HTMLButtonElement, CannabisButtonProps>(
  ({ variant = 'primary', size = 'md', loading = false, icon: Icon, children, className, disabled, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
    
    const variantClasses = {
      primary: 'bg-cultivateco-green text-cultivateco-cream hover:bg-cultivateco-green/90 focus:ring-cultivateco-green',
      secondary: 'bg-cultivateco-blue text-cultivateco-cream hover:bg-cultivateco-blue/90 focus:ring-cultivateco-blue',
      outline: 'border-2 border-cultivateco-green text-cultivateco-green hover:bg-cultivateco-green hover:text-cultivateco-cream focus:ring-cultivateco-green',
      ghost: 'text-cultivateco-green hover:bg-cultivateco-green/10 focus:ring-cultivateco-green',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
    }
    
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base'
    }

    return (
      <button
        ref={ref}
        className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : Icon ? (
          <Icon className="w-4 h-4 mr-2" />
        ) : null}
        {children}
      </button>
    )
  }
)

CannabisButton.displayName = 'CannabisButton'

// ============================================================================
// CANNABIS INPUT COMPONENTS
// ============================================================================

interface CannabisInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helpText?: string
  icon?: React.ComponentType<{ className?: string }>
  cannabis?: boolean
}

export const CannabisInput = forwardRef<HTMLInputElement, CannabisInputProps>(
  ({ label, error, helpText, icon: Icon, cannabis = true, className, ...props }, ref) => {
    const inputClasses = cn(
      'block w-full rounded-lg border-gray-300 shadow-sm transition-colors duration-200',
      'focus:border-cultivateco-green focus:ring-cultivateco-green focus:ring-1',
      'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
      error && 'border-red-300 focus:border-red-500 focus:ring-red-500',
      Icon && 'pl-10',
      className
    )

    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
            {cannabis && (
              <span className="text-cultivateco-green ml-1">
                <Leaf className="w-3 h-3 inline" />
              </span>
            )}
          </label>
        )}
        
        <div className="relative">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon className="w-4 h-4 text-gray-400" />
            </div>
          )}
          
          <input
            ref={ref}
            className={inputClasses}
            {...props}
          />
        </div>
        
        {error && (
          <div className="flex items-center space-x-1 text-sm text-red-600">
            <AlertTriangle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}
        
        {helpText && !error && (
          <div className="text-sm text-gray-500">
            {helpText}
          </div>
        )}
      </div>
    )
  }
)

CannabisInput.displayName = 'CannabisInput'

// ============================================================================
// CANNABIS PASSWORD INPUT
// ============================================================================

interface CannabisPasswordInputProps extends Omit<CannabisInputProps, 'type'> {
  showStrength?: boolean
}

export const CannabisPasswordInput = forwardRef<HTMLInputElement, CannabisPasswordInputProps>(
  ({ showStrength = false, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    const [strength, setStrength] = useState(0)

    const calculateStrength = (password: string): number => {
      let score = 0
      if (password.length >= 8) score += 1
      if (/[a-z]/.test(password)) score += 1
      if (/[A-Z]/.test(password)) score += 1
      if (/\d/.test(password)) score += 1
      if (/[^a-zA-Z\d]/.test(password)) score += 1
      return score
    }

    const getStrengthColor = (strength: number): string => {
      if (strength <= 2) return 'bg-red-500'
      if (strength <= 3) return 'bg-amber-500'
      return 'bg-cultivateco-green'
    }

    const getStrengthText = (strength: number): string => {
      if (strength <= 2) return 'Weak'
      if (strength <= 3) return 'Medium'
      return 'Strong'
    }

    return (
      <div className="space-y-2">
        <div className="relative">
          <CannabisInput
            ref={ref}
            type={showPassword ? 'text' : 'password'}
            {...props}
            onChange={(e) => {
              if (showStrength) {
                setStrength(calculateStrength(e.target.value))
              }
              props.onChange?.(e)
            }}
          />
          
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-cultivateco-green"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        
        {showStrength && props.value && (
          <div className="space-y-1">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'h-1 flex-1 rounded-full transition-colors duration-200',
                    i < strength ? getStrengthColor(strength) : 'bg-gray-200'
                  )}
                />
              ))}
            </div>
            <div className="text-xs text-gray-600">
              Password strength: <span className={cn(
                'font-medium',
                strength <= 2 ? 'text-red-600' : strength <= 3 ? 'text-amber-600' : 'text-cultivateco-green'
              )}>
                {getStrengthText(strength)}
              </span>
            </div>
          </div>
        )}
      </div>
    )
  }
)

CannabisPasswordInput.displayName = 'CannabisPasswordInput'

// ============================================================================
// CANNABIS SELECT COMPONENT
// ============================================================================

interface CannabisSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  helpText?: string
  options: Array<{ value: string; label: string; disabled?: boolean }>
  placeholder?: string
}

export const CannabisSelect = forwardRef<HTMLSelectElement, CannabisSelectProps>(
  ({ label, error, helpText, options, placeholder, className, ...props }, ref) => {
    const selectClasses = cn(
      'block w-full rounded-lg border-gray-300 shadow-sm transition-colors duration-200',
      'focus:border-cultivateco-green focus:ring-cultivateco-green focus:ring-1',
      'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
      error && 'border-red-300 focus:border-red-500 focus:ring-red-500',
      className
    )

    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        
        <select ref={ref} className={selectClasses} {...props}>
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
        
        {error && (
          <div className="flex items-center space-x-1 text-sm text-red-600">
            <AlertTriangle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}
        
        {helpText && !error && (
          <div className="text-sm text-gray-500">
            {helpText}
          </div>
        )}
      </div>
    )
  }
)

CannabisSelect.displayName = 'CannabisSelect'

// ============================================================================
// CANNABIS METRIC CARD
// ============================================================================

interface CannabisMetricCardProps {
  title: string
  value: string | number
  change?: {
    value: number
    type: 'increase' | 'decrease'
    period: string
  }
  icon?: React.ComponentType<{ className?: string }>
  color?: 'green' | 'blue' | 'purple' | 'amber' | 'red'
  loading?: boolean
  onClick?: () => void
  className?: string
}

export function CannabisMetricCard({
  title,
  value,
  change,
  icon: Icon,
  color = 'green',
  loading = false,
  onClick,
  className
}: CannabisMetricCardProps) {
  const colorClasses = {
    green: 'bg-cultivateco-green/10 text-cultivateco-green',
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    amber: 'bg-amber-50 text-amber-600',
    red: 'bg-red-50 text-red-600'
  }

  const TrendIcon = change?.type === 'increase' ? TrendingUp : TrendingDown
  const trendColor = change?.type === 'increase' ? 'text-cultivateco-green' : 'text-red-500'

  if (loading) {
    return (
      <div className={cn(
        'bg-cultivateco-cream border border-gray-200 rounded-lg p-6 animate-pulse',
        className
      )}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
          </div>
          <div className="space-y-2">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'bg-cultivateco-cream border border-gray-200 rounded-lg p-6 transition-all duration-200',
        onClick && 'cursor-pointer hover:shadow-cultivateco-lg hover:-translate-y-1',
        className
      )}
      onClick={onClick}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-gray-600">{title}</div>
          {Icon && (
            <div className={cn('p-2 rounded-lg', colorClasses[color])}>
              <Icon className="w-5 h-5" />
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <div className="text-2xl font-bold text-cultivateco-green">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </div>
          
          {change && (
            <div className="flex items-center space-x-2">
              <TrendIcon className={cn('w-4 h-4', trendColor)} />
              <span className={cn('text-sm font-medium', trendColor)}>
                {change.value > 0 ? '+' : ''}{change.value.toFixed(1)}%
              </span>
              <span className="text-sm text-gray-500">vs {change.period}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// CANNABIS ALERT COMPONENT
// ============================================================================

interface CannabisAlertProps {
  type: 'success' | 'warning' | 'error' | 'info'
  title?: string
  message: string
  dismissible?: boolean
  onDismiss?: () => void
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export function CannabisAlert({
  type,
  title,
  message,
  dismissible = false,
  onDismiss,
  action,
  className
}: CannabisAlertProps) {
  const typeConfig = {
    success: {
      icon: CheckCircle,
      classes: 'bg-cultivateco-green/10 border-cultivateco-green/20 text-cultivateco-green'
    },
    warning: {
      icon: AlertTriangle,
      classes: 'bg-amber-50 border-amber-200 text-amber-700'
    },
    error: {
      icon: AlertTriangle,
      classes: 'bg-red-50 border-red-200 text-red-700'
    },
    info: {
      icon: Info,
      classes: 'bg-blue-50 border-blue-200 text-blue-700'
    }
  }

  const { icon: Icon, classes } = typeConfig[type]

  return (
    <div className={cn('rounded-lg border p-4', classes, className)}>
      <div className="flex items-start space-x-3">
        <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
        
        <div className="flex-1 min-w-0">
          {title && (
            <div className="font-medium text-sm mb-1">{title}</div>
          )}
          <div className="text-sm">{message}</div>
          
          {action && (
            <div className="mt-3">
              <button
                onClick={action.onClick}
                className="text-sm font-medium underline hover:no-underline"
              >
                {action.label}
              </button>
            </div>
          )}
        </div>
        
        {dismissible && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// CANNABIS LOADING SPINNER
// ============================================================================

interface CannabisLoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  className?: string
}

export function CannabisLoadingSpinner({ 
  size = 'md', 
  text, 
  className 
}: CannabisLoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  return (
    <div className={cn('flex items-center justify-center space-x-2', className)}>
      <Loader2 className={cn('animate-spin text-cultivateco-green', sizeClasses[size])} />
      {text && (
        <span className="text-sm text-gray-600">{text}</span>
      )}
    </div>
  )
}

// ============================================================================
// CANNABIS BADGE COMPONENT
// ============================================================================

interface CannabisBadgeProps {
  variant: 'compliant' | 'warning' | 'violation' | 'info' | 'success' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
}

export function CannabisBadge({ 
  variant, 
  size = 'md', 
  children, 
  className 
}: CannabisBadgeProps) {
  const variantClasses = {
    compliant: 'bg-cultivateco-green/10 text-cultivateco-green border-cultivateco-green/20',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    violation: 'bg-red-50 text-red-700 border-red-200',
    info: 'bg-blue-50 text-blue-700 border-blue-200',
    success: 'bg-cultivateco-green/10 text-cultivateco-green border-cultivateco-green/20',
    danger: 'bg-red-50 text-red-700 border-red-200'
  }

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base'
  }

  return (
    <span className={cn(
      'inline-flex items-center font-medium rounded-full border',
      variantClasses[variant],
      sizeClasses[size],
      className
    )}>
      {children}
    </span>
  )
}

// ============================================================================
// CANNABIS COPY TO CLIPBOARD
// ============================================================================

interface CannabisCopyToClipboardProps {
  text: string
  children?: React.ReactNode
  onCopy?: () => void
  className?: string
}

export function CannabisCopyToClipboard({
  text,
  children,
  onCopy,
  className
}: CannabisCopyToClipboardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      onCopy?.()
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy to clipboard:', error)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={cn(
        'inline-flex items-center space-x-2 text-sm text-cultivateco-blue hover:text-cultivateco-green transition-colors',
        className
      )}
    >
      {children || <span className="font-mono">{text}</span>}
      {copied ? (
        <Check className="w-4 h-4 text-cultivateco-green" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
    </button>
  )
}

// ============================================================================
// CANNABIS SEARCH INPUT
// ============================================================================

interface CannabisSearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  onSearch?: (query: string) => void
  loading?: boolean
  showFilter?: boolean
  onFilter?: () => void
}

export function CannabisSearchInput({
  onSearch,
  loading = false,
  showFilter = false,
  onFilter,
  className,
  ...props
}: CannabisSearchInputProps) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(query)
  }

  return (
    <form onSubmit={handleSubmit} className={cn('relative', className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:border-cultivateco-green focus:ring-cultivateco-green focus:ring-1"
          placeholder="Search cannabis products, customers..."
          {...props}
        />
        
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
          {loading && <Loader2 className="w-4 h-4 animate-spin text-cultivateco-green" />}
          
          {showFilter && (
            <button
              type="button"
              onClick={onFilter}
              className="p-1 text-gray-400 hover:text-cultivateco-green rounded"
            >
              <Filter className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </form>
  )
}

// ============================================================================
// CANNABIS QUANTITY INPUT
// ============================================================================

interface CannabisQuantityInputProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  unit?: string
  label?: string
  error?: string
  disabled?: boolean
  className?: string
}

export function CannabisQuantityInput({
  value,
  onChange,
  min = 0,
  max = 999999,
  step = 1,
  unit = 'grams',
  label,
  error,
  disabled = false,
  className
}: CannabisQuantityInputProps) {
  const increment = () => {
    const newValue = Math.min(value + step, max)
    onChange(newValue)
  }

  const decrement = () => {
    const newValue = Math.max(value - step, min)
    onChange(newValue)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value) || 0
    onChange(Math.min(Math.max(newValue, min), max))
  }

  return (
    <div className={cn('space-y-1', className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      
      <div className="flex items-center">
        <button
          type="button"
          onClick={decrement}
          disabled={disabled || value <= min}
          className="p-2 border border-r-0 border-gray-300 rounded-l-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Minus className="w-4 h-4" />
        </button>
        
        <div className="flex-1 relative">
          <input
            type="number"
            value={value}
            onChange={handleInputChange}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            className={cn(
              'block w-full text-center border-t border-b border-gray-300 focus:border-cultivateco-green focus:ring-cultivateco-green focus:ring-1',
              error && 'border-red-300 focus:border-red-500 focus:ring-red-500'
            )}
          />
          {unit && (
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
              {unit}
            </div>
          )}
        </div>
        
        <button
          type="button"
          onClick={increment}
          disabled={disabled || value >= max}
          className="p-2 border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      
      {error && (
        <div className="flex items-center space-x-1 text-sm text-red-600">
          <AlertTriangle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}

// ============================================================================
// CANNABIS COLLAPSIBLE SECTION
// ============================================================================

interface CannabisCollapsibleProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
  icon?: React.ComponentType<{ className?: string }>
  className?: string
}

export function CannabisCollapsible({
  title,
  children,
  defaultOpen = false,
  icon: Icon,
  className
}: CannabisCollapsibleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className={cn('border border-gray-200 rounded-lg', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          {Icon && <Icon className="w-5 h-5 text-cultivateco-green" />}
          <span className="font-medium text-gray-900">{title}</span>
        </div>
        
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </button>
      
      {isOpen && (
        <div className="px-4 pb-4 border-t border-gray-200">
          {children}
        </div>
      )}
    </div>
  )
}

// ============================================================================
// CANNABIS EMPTY STATE
// ============================================================================

interface CannabisEmptyStateProps {
  icon?: React.ComponentType<{ className?: string }>
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export function CannabisEmptyState({
  icon: Icon = Leaf,
  title,
  description,
  action,
  className
}: CannabisEmptyStateProps) {
  return (
    <div className={cn('text-center py-12', className)}>
      <div className="w-16 h-16 bg-cultivateco-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon className="w-8 h-8 text-cultivateco-green" />
      </div>
      
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">{description}</p>
      
      {action && (
        <CannabisButton onClick={action.onClick}>
          {action.label}
        </CannabisButton>
      )}
    </div>
  )
}
