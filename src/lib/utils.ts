import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * =============================================================================
 * CultivateCo Cannabis Utility Functions
 * =============================================================================
 * Essential utility functions for cannabis compliance and business operations
 */

// ============================================================================
// CSS AND STYLING UTILITIES
// ============================================================================

/**
 * Combines CSS classes with Tailwind CSS conflict resolution
 * Perfect for CultivateCo component styling with brand colors
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ============================================================================
// CANNABIS BUSINESS UTILITIES
// ============================================================================

/**
 * Cannabis business hours validation for New Mexico compliance
 * New Mexico Cannabis Control Division: 8:00 AM - 10:00 PM
 */
export function isWithinCannabisBusinessHours(date: Date = new Date()): boolean {
  const hour = date.getHours()
  return hour >= 8 && hour <= 22 // 8 AM - 10 PM
}

/**
 * Format cannabis business hours for display
 */
export function formatCannabisBusinessHours(): string {
  return '8:00 AM - 10:00 PM MT'
}

/**
 * Calculate time until next business state change
 */
export function getTimeUntilNextBusinessChange(date: Date = new Date()): {
  isOpen: boolean
  timeUntilChange: string
  nextState: 'open' | 'closed'
} {
  const hour = date.getHours()
  const minute = date.getMinutes()
  const isCurrentlyOpen = hour >= 8 && hour <= 22

  if (isCurrentlyOpen) {
    // Calculate time until close (10 PM)
    const closeTime = new Date(date)
    closeTime.setHours(22, 0, 0, 0)
    
    if (date > closeTime) {
      // Already past close time, calculate time until next open
      const nextOpen = new Date(date)
      nextOpen.setDate(nextOpen.getDate() + 1)
      nextOpen.setHours(8, 0, 0, 0)
      const diffMs = nextOpen.getTime() - date.getTime()
      const hours = Math.floor(diffMs / (1000 * 60 * 60))
      return {
        isOpen: false,
        timeUntilChange: `${hours}h ${Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))}m`,
        nextState: 'open'
      }
    }

    const diffMs = closeTime.getTime() - date.getTime()
    const hours = Math.floor(diffMs / (1000 * 60 * 60))
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
    
    return {
      isOpen: true,
      timeUntilChange: hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`,
      nextState: 'closed'
    }
  } else {
    // Calculate time until open (8 AM)
    const nextOpen = new Date(date)
    if (hour >= 22 || hour < 8) {
      if (hour >= 22) {
        nextOpen.setDate(nextOpen.getDate() + 1)
      }
      nextOpen.setHours(8, 0, 0, 0)
    }
    
    const diffMs = nextOpen.getTime() - date.getTime()
    const hours = Math.floor(diffMs / (1000 * 60 * 60))
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
    
    return {
      isOpen: false,
      timeUntilChange: hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`,
      nextState: 'open'
    }
  }
}

// ============================================================================
// CANNABIS COMPLIANCE UTILITIES
// ============================================================================

/**
 * Validate age for cannabis purchases
 * Adult-use: 21+, Medical: 18+
 */
export function validateCannabisAge(birthDate: Date, isMedial: boolean = false): {
  isValid: boolean
  age: number
  minimumAge: number
} {
  const today = new Date()
  const age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  
  const actualAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate()) 
    ? age - 1 
    : age

  const minimumAge = isMedial ? 18 : 21

  return {
    isValid: actualAge >= minimumAge,
    age: actualAge,
    minimumAge
  }
}

/**
 * Cannabis purchase limit validation for New Mexico
 */
export interface CannabisPurchaseLimits {
  flower: number      // grams
  concentrates: number // grams  
  edibles: number     // mg THC
}

export const NEW_MEXICO_LIMITS = {
  ADULT_USE: {
    flower: 56,        // 2 ounces
    concentrates: 16,  // 16 grams
    edibles: 800       // 800mg THC
  } as CannabisPurchaseLimits,
  MEDICAL: {
    flower: 113,       // 4 ounces
    concentrates: 32,  // 32 grams
    edibles: 1600      // 1600mg THC
  } as CannabisPurchaseLimits
}

/**
 * Check if purchase is within New Mexico limits
 */
export function validateCannabisPurchaseLimits(
  purchase: CannabisPurchaseLimits,
  currentPeriodPurchases: CannabisPurchaseLimits,
  isMedial: boolean = false
): {
  isValid: boolean
  violations: string[]
  remainingLimits: CannabisPurchaseLimits
} {
  const limits = isMedial ? NEW_MEXICO_LIMITS.MEDICAL : NEW_MEXICO_LIMITS.ADULT_USE
  const violations: string[] = []
  
  const totalFlower = purchase.flower + currentPeriodPurchases.flower
  const totalConcentrates = purchase.concentrates + currentPeriodPurchases.concentrates
  const totalEdibles = purchase.edibles + currentPeriodPurchases.edibles

  if (totalFlower > limits.flower) {
    violations.push(`Flower limit exceeded: ${totalFlower}g exceeds ${limits.flower}g limit`)
  }
  
  if (totalConcentrates > limits.concentrates) {
    violations.push(`Concentrates limit exceeded: ${totalConcentrates}g exceeds ${limits.concentrates}g limit`)
  }
  
  if (totalEdibles > limits.edibles) {
    violations.push(`Edibles limit exceeded: ${totalEdibles}mg exceeds ${limits.edibles}mg limit`)
  }

  return {
    isValid: violations.length === 0,
    violations,
    remainingLimits: {
      flower: Math.max(0, limits.flower - currentPeriodPurchases.flower),
      concentrates: Math.max(0, limits.concentrates - currentPeriodPurchases.concentrates),
      edibles: Math.max(0, limits.edibles - currentPeriodPurchases.edibles)
    }
  }
}

// ============================================================================
// FORMATTING UTILITIES
// ============================================================================

/**
 * Format currency for cannabis business
 */
export function formatCurrency(
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

/**
 * Format cannabis weights with proper units
 */
export function formatCannabisWeight(grams: number): string {
  if (grams >= 28.35) {
    const ounces = grams / 28.35
    return `${ounces.toFixed(2)} oz`
  }
  return `${grams.toFixed(1)} g`
}

/**
 * Format THC/CBD percentages
 */
export function formatPotency(percentage: number): string {
  return `${percentage.toFixed(2)}%`
}

/**
 * Format cannabis compliance score
 */
export function formatComplianceScore(score: number): {
  score: string
  status: 'compliant' | 'warning' | 'violation'
  color: string
} {
  const formattedScore = `${score.toFixed(1)}%`
  
  if (score >= 95) {
    return { score: formattedScore, status: 'compliant', color: 'text-cultivateco-green' }
  } else if (score >= 80) {
    return { score: formattedScore, status: 'warning', color: 'text-amber-600' }
  } else {
    return { score: formattedScore, status: 'violation', color: 'text-red-600' }
  }
}

// ============================================================================
// DATE AND TIME UTILITIES
// ============================================================================

/**
 * Format dates for cannabis business use
 */
export function formatDate(date: Date, includeTime: boolean = false): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'America/Denver', // Mountain Time for New Mexico
  }

  if (includeTime) {
    options.hour = '2-digit'
    options.minute = '2-digit'
    options.timeZoneName = 'short'
  }

  return new Intl.DateTimeFormat('en-US', options).format(date)
}

/**
 * Get relative time for cannabis business activities
 */
export function getRelativeTime(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffSeconds = Math.floor(diffMs / 1000)
  const diffMinutes = Math.floor(diffSeconds / 60)
  const diffHours = Math.floor(diffMinutes / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffSeconds < 60) return 'just now'
  if (diffMinutes < 60) return `${diffMinutes}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  
  return formatDate(date)
}

// ============================================================================
// VALIDATION UTILITIES
// ============================================================================

/**
 * Validate email addresses for cannabis business
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate phone numbers for cannabis business
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\+?1?[-.\s]?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/
  return phoneRegex.test(phone)
}

/**
 * Generate secure cannabis business IDs
 */
export function generateSecureId(prefix: string = 'cc'): string {
  const timestamp = Date.now().toString(36)
  const randomStr = Math.random().toString(36).substring(2, 15)
  return `${prefix}_${timestamp}_${randomStr}`
}

// ============================================================================
// CANNABIS BUSINESS ANALYTICS UTILITIES
// ============================================================================

/**
 * Calculate growth percentage for cannabis business metrics
 */
export function calculateGrowth(current: number, previous: number): {
  percentage: number
  isPositive: boolean
  formatted: string
} {
  if (previous === 0) {
    return {
      percentage: current > 0 ? 100 : 0,
      isPositive: current > 0,
      formatted: current > 0 ? '+100%' : '0%'
    }
  }

  const percentage = ((current - previous) / previous) * 100
  const isPositive = percentage >= 0

  return {
    percentage: Math.abs(percentage),
    isPositive,
    formatted: `${isPositive ? '+' : '-'}${Math.abs(percentage).toFixed(1)}%`
  }
}

/**
 * Debounce function for cannabis search and form inputs
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout

  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Cannabis business error handling utility
 */
export function handleCannabisError(error: unknown): {
  message: string
  code?: string
  isApiError: boolean
} {
  if (error instanceof Error) {
    return {
      message: error.message,
      code: (error as any).code,
      isApiError: (error as any).isApiError || false
    }
  }

  if (typeof error === 'string') {
    return {
      message: error,
      isApiError: false
    }
  }

  return {
    message: 'An unexpected error occurred in the cannabis compliance system',
    isApiError: false
  }
}
