/**
 * =============================================================================
 * CultivateCo Cannabis Marketing Website - Utility Functions
 * =============================================================================
 * Core utility functions for cannabis industry marketing and compliance
 */

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

import type {
  CannabisLegalStatus,
  CannabisStateInfo,
  CannabisLead,
  CannabisDispensaryLocation,
  CannabisCoordinates,
  CannabisMapViewport,
} from '@/types/cannabis-marketing'

// ============================================================================
// CANNABIS UTILITY FUNCTIONS
// ============================================================================

/**
 * Cannabis-aware className utility combining clsx and tailwind-merge
 * Handles cannabis brand colors and design system classes
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * Format cannabis business revenue for display
 */
export function formatCannabisRevenue(amount: number): string {
  if (amount >= 1_000_000_000) {
    return `$${(amount / 1_000_000_000).toFixed(1)}B`
  }
  if (amount >= 1_000_000) {
    return `$${(amount / 1_000_000).toFixed(1)}M`
  }
  if (amount >= 1_000) {
    return `$${(amount / 1_000).toFixed(0)}K`
  }
  return `$${amount.toLocaleString()}`
}

/**
 * Format cannabis purchase limits for display
 */
export function formatCannabisLimit(amount: number, unit: 'g' | 'mg' | 'oz'): string {
  switch (unit) {
    case 'g':
      return `${amount}g`
    case 'mg':
      return `${amount}mg`
    case 'oz':
      return `${amount} oz`
    default:
      return `${amount}`
  }
}

/**
 * Convert grams to ounces for cannabis measurements
 */
export function gramsToOunces(grams: number): number {
  return Number((grams / 28.3495).toFixed(2))
}

/**
 * Convert ounces to grams for cannabis measurements
 */
export function ouncesToGrams(ounces: number): number {
  return Number((ounces * 28.3495).toFixed(1))
}

/**
 * Format cannabis compliance score with grade
 */
export function formatComplianceScore(score: number): {
  score: number
  grade: string
  color: string
  description: string
} {
  const grades = [
    { min: 95, grade: 'A+', color: '#154438', description: 'Excellent Compliance' },
    { min: 90, grade: 'A', color: '#3d9a87', description: 'Superior Compliance' },
    { min: 85, grade: 'B+', color: '#0b447a', description: 'Good Compliance' },
    { min: 80, grade: 'B', color: '#7cc8ff', description: 'Adequate Compliance' },
    { min: 75, grade: 'C+', color: '#d97706', description: 'Fair Compliance' },
    { min: 70, grade: 'C', color: '#f59e0b', description: 'Poor Compliance' },
    { min: 60, grade: 'D', color: '#dc2626', description: 'Critical Compliance Issues' },
    { min: 0, grade: 'F', color: '#991b1b', description: 'Non-Compliant' },
  ]

  const match = grades.find(g => score >= g.min) || grades[grades.length - 1]
  
  return {
    score,
    grade: match.grade,
    color: match.color,
    description: match.description,
  }
}

/**
 * Get cannabis legal status display information
 */
export function getCannabisStatusInfo(status: CannabisLegalStatus): {
  label: string
  color: string
  description: string
  icon: string
} {
  const statusMap = {
    recreational: {
      label: 'Recreational Legal',
      color: '#154438',
      description: 'Adult-use cannabis fully legal',
      icon: '🌿',
    },
    'medical-only': {
      label: 'Medical Only',
      color: '#0b447a',
      description: 'Medical cannabis program only',
      icon: '🏥',
    },
    illegal: {
      label: 'Illegal',
      color: '#6b7280',
      description: 'Cannabis prohibited',
      icon: '🚫',
    },
    decriminalized: {
      label: 'Decriminalized',
      color: '#8dd1c1',
      description: 'Possession decriminalized',
      icon: '⚖️',
    },
    'cbd-only': {
      label: 'CBD Only',
      color: '#3d9a87',
      description: 'CBD/hemp products only',
      icon: '🌱',
    },
    pending: {
      label: 'Pending',
      color: '#7cc8ff',
      description: 'Legalization pending',
      icon: '⏳',
    },
  }

  return statusMap[status]
}

/**
 * Calculate cannabis legalization probability color
 */
export function getLegalizationProbabilityColor(probability: number): string {
  if (probability >= 80) return '#154438' // High probability - brand green
  if (probability >= 60) return '#3d9a87' // Good probability - medium green
  if (probability >= 40) return '#0b447a' // Fair probability - brand blue
  if (probability >= 20) return '#d97706' // Low probability - orange
  return '#6b7280' // Very low probability - gray
}

/**
 * Calculate cannabis market readiness color
 */
export function getMarketReadinessColor(readiness: number): string {
  if (readiness >= 80) return '#154438' // Ready - brand green
  if (readiness >= 50) return '#0b447a' // Developing - brand blue
  return '#fbfaf7' // Emerging - brand cream
}

// ============================================================================
// CANNABIS MAP UTILITIES
// ============================================================================

/**
 * Calculate distance between two cannabis coordinates (Haversine formula)
 */
export function calculateCannabisDistance(
  coord1: CannabisCoordinates,
  coord2: CannabisCoordinates,
): number {
  const [lng1, lat1] = coord1
  const [lng2, lat2] = coord2
  
  const R = 3959 // Earth's radius in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

/**
 * Get cannabis map bounds for multiple dispensaries
 */
export function getCannabisMapBounds(
  dispensaries: CannabisDispensaryLocation[],
): [[number, number], [number, number]] {
  if (dispensaries.length === 0) {
    return [[-125, 20], [-65, 50]] // Continental US bounds
  }

  const lngs = dispensaries.map(d => d.coordinates[0])
  const lats = dispensaries.map(d => d.coordinates[1])
  
  const padding = 0.5 // degrees
  
  return [
    [Math.min(...lngs) - padding, Math.min(...lats) - padding],
    [Math.max(...lngs) + padding, Math.max(...lats) + padding],
  ]
}

/**
 * Get cannabis map center point
 */
export function getCannabisMapCenter(
  dispensaries: CannabisDispensaryLocation[],
): CannabisCoordinates {
  if (dispensaries.length === 0) {
    return [-98.35, 39.5] // Geographic center of US
  }

  const totalLng = dispensaries.reduce((sum, d) => sum + d.coordinates[0], 0)
  const totalLat = dispensaries.reduce((sum, d) => sum + d.coordinates[1], 0)
  
  return [totalLng / dispensaries.length, totalLat / dispensaries.length]
}

/**
 * Get optimal cannabis map zoom level
 */
export function getCannabisMapZoom(dispensaries: CannabisDispensaryLocation[]): number {
  if (dispensaries.length <= 1) return 6
  
  const bounds = getCannabisMapBounds(dispensaries)
  const [[minLng, minLat], [maxLng, maxLat]] = bounds
  
  const latDiff = maxLat - minLat
  const lngDiff = maxLng - minLng
  const maxDiff = Math.max(latDiff, lngDiff)
  
  if (maxDiff > 20) return 3
  if (maxDiff > 10) return 4
  if (maxDiff > 5) return 5
  if (maxDiff > 2) return 6
  if (maxDiff > 1) return 7
  return 8
}

/**
 * Create cannabis map viewport from state info
 */
export function createCannabisMapViewport(state: CannabisStateInfo): CannabisMapViewport {
  // State center coordinates (simplified - in production would use actual geographic data)
  const stateCenters: Record<string, CannabisCoordinates> = {
    'NM': [-106.2, 34.5],
    'AZ': [-111.5, 34.2],
    'CO': [-105.5, 39.0],
    'CA': [-119.5, 36.5],
    'WA': [-120.5, 47.5],
    'OR': [-120.5, 43.9],
    'NV': [-116.8, 39.3],
    'MT': [-109.5, 47.0],
    'IL': [-89.2, 40.0],
    'MI': [-84.5, 44.3],
    'MA': [-71.8, 42.4],
    'ME': [-69.2, 45.2],
    'VT': [-72.6, 44.3],
    'CT': [-72.7, 41.6],
    'RI': [-71.5, 41.7],
    'NJ': [-74.4, 40.0],
    'NY': [-74.9, 43.0],
    'VA': [-78.9, 37.5],
    'MD': [-76.5, 39.0],
    'DE': [-75.5, 39.0],
    'MN': [-94.6, 46.4],
    'OH': [-82.9, 40.2],
    'MO': [-92.6, 38.3],
    'AK': [-153.0, 64.2],
    'HI': [-155.5, 19.9],
  }

  const center = stateCenters[state.code] || [-98.35, 39.5]
  
  return {
    center,
    zoom: 6,
    bearing: 0,
    pitch: 0,
  }
}

// ============================================================================
// CANNABIS LEAD SCORING UTILITIES
// ============================================================================

/**
 * Calculate cannabis lead score based on qualification criteria
 */
export function calculateCannabisLeadScore(lead: Partial<CannabisLead>): number {
  let score = 0

  // Business type scoring (dispensary = highest value)
  const businessTypeScores: Record<string, number> = {
    'dispensary': 30,
    'cultivation': 25,
    'manufacturing': 20,
    'testing': 15,
    'delivery': 20,
    'other': 5,
  }
  score += businessTypeScores[lead.businessType || 'other'] || 5

  // License status scoring
  const licenseScores: Record<string, number> = {
    'licensed': 25,
    'pending': 20,
    'planning': 15,
    'none': 5,
  }
  score += licenseScores[lead.licenseStatus || 'none'] || 5

  // Revenue scoring
  const revenueScores: Record<string, number> = {
    '$1M+': 20,
    '$500K-$1M': 15,
    '$250K-$500K': 10,
    '$100K-$250K': 8,
    '$50K-$100K': 5,
    'Less than $50K': 2,
    'Pre-revenue': 1,
  }
  score += revenueScores[lead.monthlyRevenue || 'Pre-revenue'] || 1

  // Timeline urgency scoring
  const timelineScores: Record<string, number> = {
    'immediate': 15,
    '1-3-months': 12,
    '3-6-months': 8,
    '6-12-months': 5,
    'planning': 2,
  }
  score += timelineScores[lead.timeline || 'planning'] || 2

  // Multi-location bonus
  if (lead.locations && lead.locations > 1) {
    score += Math.min(lead.locations * 2, 10) // Max 10 points for locations
  }

  // Interest scoring
  if (lead.interests && lead.interests.length > 0) {
    const interestScores: Record<string, number> = {
      'compliance': 8,
      'pos': 7,
      'metrc': 6,
      'analytics': 5,
      'reporting': 4,
    }
    
    const interestScore = lead.interests.reduce((sum, interest) => {
      return sum + (interestScores[interest] || 2)
    }, 0)
    
    score += Math.min(interestScore, 15) // Max 15 points for interests
  }

  return Math.min(score, 100) // Cap at 100
}

/**
 * Get cannabis lead priority based on score
 */
export function getCannabisLeadPriority(score: number): {
  priority: 'hot' | 'warm' | 'cold'
  color: string
  description: string
} {
  if (score >= 80) {
    return {
      priority: 'hot',
      color: '#154438',
      description: 'High-value prospect - immediate follow-up',
    }
  }
  
  if (score >= 50) {
    return {
      priority: 'warm',
      color: '#0b447a',
      description: 'Qualified prospect - follow-up within 24 hours',
    }
  }
  
  return {
    priority: 'cold',
    color: '#6b7280',
    description: 'Lead requires nurturing',
  }
}

// ============================================================================
// CANNABIS SEO UTILITIES
// ============================================================================

/**
 * Generate cannabis industry SEO title
 */
export function generateCannabisSEOTitle(
  baseTitle: string,
  state?: string,
  businessType?: string,
): string {
  let title = baseTitle

  if (state) {
    title += ` | ${state} Cannabis`
  }
  
  if (businessType && businessType !== 'other') {
    const typeMap: Record<string, string> = {
      'dispensary': 'Dispensary',
      'cultivation': 'Cultivation',
      'manufacturing': 'Manufacturing',
      'testing': 'Testing Lab',
      'delivery': 'Delivery',
    }
    title += ` ${typeMap[businessType] || businessType}`
  }
  
  title += ' Software | CultivateCo'
  
  return title.length > 60 ? baseTitle + ' | CultivateCo' : title
}

/**
 * Generate cannabis industry SEO description
 */
export function generateCannabisSEODescription(
  baseDescription: string,
  features?: string[],
): string {
  let description = baseDescription

  if (features && features.length > 0) {
    const featureText = features.slice(0, 3).join(', ')
    description += ` Features: ${featureText}.`
  }
  
  description += ' Trusted by cannabis operators nationwide.'
  
  return description.length > 160 
    ? baseDescription + ' Trusted by cannabis operators.' 
    : description
}

/**
 * Generate cannabis keywords for SEO
 */
export function generateCannabisKeywords(
  baseKeywords: string[],
  state?: string,
  businessType?: string,
): string[] {
  const keywords = [...baseKeywords]
  
  if (state) {
    keywords.push(
      `${state.toLowerCase()} cannabis software`,
      `${state.toLowerCase()} dispensary management`,
      `${state.toLowerCase()} cannabis compliance`,
    )
  }
  
  if (businessType && businessType !== 'other') {
    keywords.push(
      `cannabis ${businessType} software`,
      `${businessType} management system`,
      `${businessType} compliance tracking`,
    )
  }
  
  // Add cannabis industry standard keywords
  keywords.push(
    'cannabis pos system',
    'dispensary software',
    'cannabis compliance',
    'metrc integration',
    'seed to sale tracking',
    'cannabis analytics',
  )
  
  return [...new Set(keywords)] // Remove duplicates
}

// ============================================================================
// CANNABIS DATE AND TIME UTILITIES
// ============================================================================

/**
 * Format cannabis business hours
 */
export function formatCannabisBusinessHours(
  startTime: string,
  endTime: string,
  timezone: string = 'MT',
): string {
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':')
    const hour24 = parseInt(hours)
    const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24
    const period = hour24 >= 12 ? 'PM' : 'AM'
    return `${hour12}:${minutes} ${period}`
  }
  
  return `${formatTime(startTime)} - ${formatTime(endTime)} ${timezone}`
}

/**
 * Check if current time is within cannabis business hours
 */
export function isWithinCannabisBusinessHours(
  startTime: string,
  endTime: string,
  timezone: string = 'America/Denver',
): boolean {
  try {
    const now = new Date()
    const currentTime = now.toLocaleTimeString('en-US', {
      timeZone: timezone,
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    })
    
    return currentTime >= startTime && currentTime <= endTime
  } catch {
    return false
  }
}

// ============================================================================
// CANNABIS VALIDATION UTILITIES
// ============================================================================

/**
 * Validate cannabis business email
 */
export function isValidCannabisEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate cannabis business phone number
 */
export function isValidCannabisPhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[1]?[\s\-\.]?[\(]?[0-9]{3}[\)]?[\s\-\.]?[0-9]{3}[\s\-\.]?[0-9]{4}$/
  return phoneRegex.test(phone.replace(/[^\d\+\(\)]/g, ''))
}

/**
 * Format cannabis business phone number
 */
export function formatCannabisPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  }
  
  if (cleaned.length === 11 && cleaned[0] === '1') {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`
  }
  
  return phone
}

/**
 * Sanitize cannabis form input
 */
export function sanitizeCannabisInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .substring(0, 500) // Limit length
}

// ============================================================================
// CANNABIS ANALYTICS UTILITIES
// ============================================================================

/**
 * Track cannabis marketing event
 */
export function trackCannabisEvent(
  eventName: string,
  properties: Record<string, any> = {},
): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      ...properties,
      cannabis_website: true,
      timestamp: new Date().toISOString(),
    })
  }
}

/**
 * Track cannabis page view
 */
export function trackCannabisPageView(pagePath: string, pageTitle: string): void {
  trackCannabisEvent('page_view', {
    page_path: pagePath,
    page_title: pageTitle,
  })
}

/**
 * Track cannabis lead conversion
 */
export function trackCannabisLeadConversion(
  leadType: string,
  leadValue: number,
  source: string,
): void {
  trackCannabisEvent('cannabis_lead_conversion', {
    lead_type: leadType,
    value: leadValue,
    source: source,
    currency: 'USD',
  })
}

/**
 * Debounce function for cannabis form inputs
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Throttle function for cannabis scroll events
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number,
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}
