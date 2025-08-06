/**
 * =============================================================================
 * CultivateCo Cannabis Marketing API Service Layer
 * =============================================================================
 * Comprehensive API service functions for cannabis marketing website
 */

import type {
  CannabisStateInfo,
  CannabisTestimonial,
  CannabisCaseStudy,
  CannabisLead,
  CannabisContactForm,
  CannabisDemoRequest,
  CannabisWebsiteAnalytics,
  CannabisDispensaryLocation,
  CannabisApiResponse,
  CannabisPaginatedResponse,
  CannabisError,
} from '@/types/cannabis-marketing'

// ============================================================================
// CANNABIS API CONFIGURATION
// ============================================================================

const CANNABIS_API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_CULTIVATECO_API_URL || 'https://api.cultivateco.com',
  version: process.env.CULTIVATECO_API_VERSION || 'v1',
  timeout: parseInt(process.env.CANNABIS_API_TIMEOUT || '30000'),
  retries: parseInt(process.env.CANNABIS_API_RETRY_ATTEMPTS || '3'),
}

const CANNABIS_API_ENDPOINTS = {
  // Cannabis governance and state data
  states: '/cannabis/states',
  stateDetail: (code: string) => `/cannabis/states/${code}`,
  complianceScores: '/cannabis/compliance/scores',
  legalizationPredictions: '/cannabis/predictions',
  
  // Cannabis dispensary and location data
  dispensaries: '/cannabis/dispensaries',
  dispensaryDetail: (id: string) => `/cannabis/dispensaries/${id}`,
  dispensaryAnalytics: '/cannabis/dispensaries/analytics',
  
  // Cannabis marketing and content
  testimonials: '/cannabis/testimonials',
  caseStudies: '/cannabis/case-studies',
  blogPosts: '/cannabis/blog',
  
  // Cannabis lead generation
  leads: '/cannabis/leads',
  contactForm: '/cannabis/contact',
  demoRequest: '/cannabis/demo',
  consultation: '/cannabis/consultation',
  
  // Cannabis analytics and tracking
  analytics: '/cannabis/analytics',
  events: '/cannabis/events',
  conversions: '/cannabis/conversions',
  
  // Cannabis platform and features
  platformStats: '/cannabis/platform/stats',
  integrations: '/cannabis/integrations',
  features: '/cannabis/features',
} as const

// ============================================================================
// CANNABIS API CLIENT CLASS
// ============================================================================

class CannabisApiClient {
  private baseURL: string
  private timeout: number
  private retries: number
  private cache: Map<string, { data: any; timestamp: number; ttl: number }>

  constructor() {
    this.baseURL = `${CANNABIS_API_CONFIG.baseURL}/${CANNABIS_API_CONFIG.version}`
    this.timeout = CANNABIS_API_CONFIG.timeout
    this.retries = CANNABIS_API_CONFIG.retries
    this.cache = new Map()
  }

  /**
   * Cannabis API request with retry logic and caching
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    cacheTTL: number = 5 * 60 * 1000, // 5 minutes default cache
  ): Promise<CannabisApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`
    const cacheKey = `${options.method || 'GET'}-${url}`
    
    // Check cache first for GET requests
    if ((!options.method || options.method === 'GET') && cacheTTL > 0) {
      const cached = this.cache.get(cacheKey)
      if (cached && Date.now() - cached.timestamp < cached.ttl) {
        return cached.data
      }
    }

    const requestOptions: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'X-Cannabis-Client': 'cultivateco-marketing-website',
        'X-Cannabis-Version': '1.0.0',
        ...options.headers,
      },
      signal: AbortSignal.timeout(this.timeout),
    }

    // Add API key if available
    if (process.env.CULTIVATECO_API_KEY) {
      ;(requestOptions.headers as Record<string, string>)['Authorization'] = 
        `Bearer ${process.env.CULTIVATECO_API_KEY}`
    }

    let lastError: Error | null = null

    for (let attempt = 1; attempt <= this.retries; attempt++) {
      try {
        const response = await fetch(url, requestOptions)
        
        if (!response.ok) {
          throw new Error(`Cannabis API Error ${response.status}: ${response.statusText}`)
        }

        const data: CannabisApiResponse<T> = await response.json()
        
        // Cache successful GET responses
        if ((!options.method || options.method === 'GET') && cacheTTL > 0) {
          this.cache.set(cacheKey, {
            data,
            timestamp: Date.now(),
            ttl: cacheTTL,
          })
        }

        return data
        
      } catch (error) {
        lastError = error as Error
        
        // Don't retry on client errors (4xx)
        if (error instanceof Error && error.message.includes('4')) {
          break
        }
        
        // Wait before retrying (exponential backoff)
        if (attempt < this.retries) {
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000))
        }
      }
    }

    // Return error response
    return {
      success: false,
      error: lastError?.message || 'Unknown cannabis API error',
      timestamp: new Date().toISOString(),
    }
  }

  /**
   * Clear cannabis API cache
   */
  clearCache(): void {
    this.cache.clear()
  }

  /**
   * Get cannabis API cache stats
   */
  getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    }
  }
}

// Create singleton instance
const cannabisApi = new CannabisApiClient()

// ============================================================================
// CANNABIS STATE AND GOVERNANCE API FUNCTIONS
// ============================================================================

/**
 * Get all cannabis state governance data
 */
export async function getCannabisStates(): Promise<CannabisStateInfo[]> {
  try {
    const response = await cannabisApi.request<CannabisStateInfo[]>(
      CANNABIS_API_ENDPOINTS.states,
      {},
      10 * 60 * 1000 // 10 minute cache
    )

    if (response.success && response.data) {
      return response.data
    }

    // Fallback to mock data if API fails
    return getCannabisStatesMockData()
    
  } catch (error) {
    console.warn('Cannabis API: Failed to fetch states, using fallback data', error)
    return getCannabisStatesMockData()
  }
}

/**
 * Get specific cannabis state details
 */
export async function getCannabisStateDetail(stateCode: string): Promise<CannabisStateInfo | null> {
  try {
    const response = await cannabisApi.request<CannabisStateInfo>(
      CANNABIS_API_ENDPOINTS.stateDetail(stateCode.toUpperCase()),
      {},
      10 * 60 * 1000 // 10 minute cache
    )

    if (response.success && response.data) {
      return response.data
    }

    return null
    
  } catch (error) {
    console.warn(`Cannabis API: Failed to fetch state ${stateCode}`, error)
    return null
  }
}

/**
 * Get cannabis compliance scores by state
 */
export async function getCannabisComplianceScores(): Promise<Record<string, number>> {
  try {
    const response = await cannabisApi.request<Record<string, number>>(
      CANNABIS_API_ENDPOINTS.complianceScores,
      {},
      5 * 60 * 1000 // 5 minute cache
    )

    if (response.success && response.data) {
      return response.data
    }

    return {}
    
  } catch (error) {
    console.warn('Cannabis API: Failed to fetch compliance scores', error)
    return {}
  }
}

/**
 * Get cannabis legalization predictions
 */
export async function getCannabisLegalizationPredictions(): Promise<Record<string, number>> {
  try {
    const response = await cannabisApi.request<Record<string, number>>(
      CANNABIS_API_ENDPOINTS.legalizationPredictions,
      {},
      60 * 60 * 1000 // 1 hour cache
    )

    if (response.success && response.data) {
      return response.data
    }

    return {}
    
  } catch (error) {
    console.warn('Cannabis API: Failed to fetch legalization predictions', error)
    return {}
  }
}

// ============================================================================
// CANNABIS DISPENSARY AND LOCATION API FUNCTIONS
// ============================================================================

/**
 * Get cannabis dispensary locations
 */
export async function getCannabisDispensaries(filters?: {
  state?: string
  status?: string
  marketTier?: string
}): Promise<CannabisDispensaryLocation[]> {
  try {
    const queryParams = new URLSearchParams()
    
    if (filters?.state) queryParams.set('state', filters.state)
    if (filters?.status) queryParams.set('status', filters.status)
    if (filters?.marketTier) queryParams.set('marketTier', filters.marketTier)
    
    const endpoint = CANNABIS_API_ENDPOINTS.dispensaries + 
      (queryParams.toString() ? `?${queryParams.toString()}` : '')

    const response = await cannabisApi.request<CannabisDispensaryLocation[]>(
      endpoint,
      {},
      5 * 60 * 1000 // 5 minute cache
    )

    if (response.success && response.data) {
      return response.data
    }

    return getCannabisDispensariesMockData()
    
  } catch (error) {
    console.warn('Cannabis API: Failed to fetch dispensaries', error)
    return getCannabisDispensariesMockData()
  }
}

/**
 * Get specific cannabis dispensary details
 */
export async function getCannabisDispensaryDetail(dispensaryId: string): Promise<CannabisDispensaryLocation | null> {
  try {
    const response = await cannabisApi.request<CannabisDispensaryLocation>(
      CANNABIS_API_ENDPOINTS.dispensaryDetail(dispensaryId),
      {},
      10 * 60 * 1000 // 10 minute cache
    )

    if (response.success && response.data) {
      return response.data
    }

    return null
    
  } catch (error) {
    console.warn(`Cannabis API: Failed to fetch dispensary ${dispensaryId}`, error)
    return null
  }
}

/**
 * Get cannabis dispensary analytics
 */
export async function getCannabisDispensaryAnalytics(): Promise<{
  totalRevenue: number
  averageTransaction: number
  topPerformers: CannabisDispensaryLocation[]
}> {
  try {
    const response = await cannabisApi.request<{
      totalRevenue: number
      averageTransaction: number
      topPerformers: CannabisDispensaryLocation[]
    }>(
      CANNABIS_API_ENDPOINTS.dispensaryAnalytics,
      {},
      5 * 60 * 1000 // 5 minute cache
    )

    if (response.success && response.data) {
      return response.data
    }

    // Fallback mock data
    return {
      totalRevenue: 2100000000, // $2.1B
      averageTransaction: 65,
      topPerformers: getCannabisDispensariesMockData().slice(0, 3),
    }
    
  } catch (error) {
    console.warn('Cannabis API: Failed to fetch dispensary analytics', error)
    return {
      totalRevenue: 2100000000,
      averageTransaction: 65,
      topPerformers: [],
    }
  }
}

// ============================================================================
// CANNABIS MARKETING CONTENT API FUNCTIONS
// ============================================================================

/**
 * Get cannabis testimonials
 */
export async function getCannabisTestimonials(filters?: {
  category?: string
  featured?: boolean
  limit?: number
}): Promise<CannabisTestimonial[]> {
  try {
    const queryParams = new URLSearchParams()
    
    if (filters?.category) queryParams.set('category', filters.category)
    if (filters?.featured !== undefined) queryParams.set('featured', filters.featured.toString())
    if (filters?.limit) queryParams.set('limit', filters.limit.toString())
    
    const endpoint = CANNABIS_API_ENDPOINTS.testimonials + 
      (queryParams.toString() ? `?${queryParams.toString()}` : '')

    const response = await cannabisApi.request<CannabisTestimonial[]>(
      endpoint,
      {},
      15 * 60 * 1000 // 15 minute cache
    )

    if (response.success && response.data) {
      return response.data
    }

    return getCannabisTestimonialsMockData()
    
  } catch (error) {
    console.warn('Cannabis API: Failed to fetch testimonials', error)
    return getCannabisTestimonialsMockData()
  }
}

/**
 * Get cannabis case studies
 */
export async function getCannabisCaseStudies(filters?: {
  featured?: boolean
  state?: string
  limit?: number
}): Promise<CannabisCaseStudy[]> {
  try {
    const queryParams = new URLSearchParams()
    
    if (filters?.featured !== undefined) queryParams.set('featured', filters.featured.toString())
    if (filters?.state) queryParams.set('state', filters.state)
    if (filters?.limit) queryParams.set('limit', filters.limit.toString())
    
    const endpoint = CANNABIS_API_ENDPOINTS.caseStudies + 
      (queryParams.toString() ? `?${queryParams.toString()}` : '')

    const response = await cannabisApi.request<CannabisCaseStudy[]>(
      endpoint,
      {},
      30 * 60 * 1000 // 30 minute cache
    )

    if (response.success && response.data) {
      return response.data
    }

    return []
    
  } catch (error) {
    console.warn('Cannabis API: Failed to fetch case studies', error)
    return []
  }
}

// ============================================================================
// CANNABIS LEAD GENERATION API FUNCTIONS
// ============================================================================

/**
 * Submit cannabis contact form
 */
export async function submitCannabisContactForm(formData: CannabisContactForm): Promise<boolean> {
  try {
    const response = await cannabisApi.request(
      CANNABIS_API_ENDPOINTS.contactForm,
      {
        method: 'POST',
        body: JSON.stringify({
          ...formData,
          source: 'marketing_website',
          timestamp: new Date().toISOString(),
        }),
      },
      0 // No cache for submissions
    )

    return response.success
    
  } catch (error) {
    console.error('Cannabis API: Failed to submit contact form', error)
    return false
  }
}

/**
 * Submit cannabis demo request
 */
export async function submitCannabisDemoRequest(demoData: CannabisDemoRequest): Promise<{
  success: boolean
  leadId?: string
  calendarLink?: string
}> {
  try {
    const response = await cannabisApi.request<{
      leadId: string
      calendarLink: string
    }>(
      CANNABIS_API_ENDPOINTS.demoRequest,
      {
        method: 'POST',
        body: JSON.stringify({
          ...demoData,
          source: 'marketing_website',
          timestamp: new Date().toISOString(),
        }),
      },
      0 // No cache for submissions
    )

    if (response.success && response.data) {
      return {
        success: true,
        leadId: response.data.leadId,
        calendarLink: response.data.calendarLink,
      }
    }

    return { success: false }
    
  } catch (error) {
    console.error('Cannabis API: Failed to submit demo request', error)
    return { success: false }
  }
}

/**
 * Submit cannabis consultation request
 */
export async function submitCannabisConsultation(consultationData: {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  state: string
  businessType: string
  challenges: string[]
  timeline: string
  budget?: string
}): Promise<boolean> {
  try {
    const response = await cannabisApi.request(
      CANNABIS_API_ENDPOINTS.consultation,
      {
        method: 'POST',
        body: JSON.stringify({
          ...consultationData,
          source: 'marketing_website',
          timestamp: new Date().toISOString(),
        }),
      },
      0 // No cache for submissions
    )

    return response.success
    
  } catch (error) {
    console.error('Cannabis API: Failed to submit consultation request', error)
    return false
  }
}

// ============================================================================
// CANNABIS ANALYTICS API FUNCTIONS
// ============================================================================

/**
 * Track cannabis marketing event
 */
export async function trackCannabisMarketingEvent(
  eventName: string,
  properties: Record<string, any> = {}
): Promise<void> {
  try {
    await cannabisApi.request(
      CANNABIS_API_ENDPOINTS.events,
      {
        method: 'POST',
        body: JSON.stringify({
          event: eventName,
          properties: {
            ...properties,
            timestamp: new Date().toISOString(),
            url: typeof window !== 'undefined' ? window.location.href : '',
            userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : '',
            cannabis_website: true,
          },
        }),
      },
      0 // No cache for events
    )
  } catch (error) {
    // Silently fail for analytics to avoid disrupting user experience
    console.debug('Cannabis API: Failed to track event', eventName, error)
  }
}

/**
 * Track cannabis conversion
 */
export async function trackCannabisConversion(
  conversionType: 'lead' | 'demo' | 'trial' | 'contact',
  value: number,
  leadId?: string
): Promise<void> {
  try {
    await cannabisApi.request(
      CANNABIS_API_ENDPOINTS.conversions,
      {
        method: 'POST',
        body: JSON.stringify({
          type: conversionType,
          value,
          leadId,
          timestamp: new Date().toISOString(),
          cannabis_website: true,
        }),
      },
      0 // No cache for conversions
    )
  } catch (error) {
    console.debug('Cannabis API: Failed to track conversion', conversionType, error)
  }
}

/**
 * Get cannabis website analytics
 */
export async function getCannabisWebsiteAnalytics(
  timeRange: '7d' | '30d' | '90d' = '30d'
): Promise<CannabisWebsiteAnalytics | null> {
  try {
    const response = await cannabisApi.request<CannabisWebsiteAnalytics>(
      `${CANNABIS_API_ENDPOINTS.analytics}?range=${timeRange}`,
      {},
      5 * 60 * 1000 // 5 minute cache
    )

    if (response.success && response.data) {
      return response.data
    }

    return null
    
  } catch (error) {
    console.warn('Cannabis API: Failed to fetch analytics', error)
    return null
  }
}

// ============================================================================
// CANNABIS PLATFORM DATA API FUNCTIONS
// ============================================================================

/**
 * Get cannabis platform statistics
 */
export async function getCannabisPlatformStats(): Promise<{
  totalTransactions: number
  totalOperators: number
  averageComplianceScore: number
  revenueTracked: number
  violationsPrevented: number
  statesSupported: number
}> {
  try {
    const response = await cannabisApi.request<{
      totalTransactions: number
      totalOperators: number
      averageComplianceScore: number
      revenueTracked: number
      violationsPrevented: number
      statesSupported: number
    }>(
      CANNABIS_API_ENDPOINTS.platformStats,
      {},
      10 * 60 * 1000 // 10 minute cache
    )

    if (response.success && response.data) {
      return response.data
    }

    // Fallback mock stats
    return {
      totalTransactions: 50000000,
      totalOperators: 2500,
      averageComplianceScore: 94.2,
      revenueTracked: 2100000000,
      violationsPrevented: 25000,
      statesSupported: 19,
    }
    
  } catch (error) {
    console.warn('Cannabis API: Failed to fetch platform stats', error)
    return {
      totalTransactions: 50000000,
      totalOperators: 2500,
      averageComplianceScore: 94.2,
      revenueTracked: 2100000000,
      violationsPrevented: 25000,
      statesSupported: 19,
    }
  }
}

/**
 * Get cannabis integrations list
 */
export async function getCannabisIntegrations(): Promise<{
  category: string
  integrations: Array<{
    name: string
    logo: string
    description: string
    status: 'active' | 'beta' | 'coming-soon'
  }>
}[]> {
  try {
    const response = await cannabisApi.request<{
      category: string
      integrations: Array<{
        name: string
        logo: string
        description: string
        status: 'active' | 'beta' | 'coming-soon'
      }>
    }[]>(
      CANNABIS_API_ENDPOINTS.integrations,
      {},
      60 * 60 * 1000 // 1 hour cache
    )

    if (response.success && response.data) {
      return response.data
    }

    return getCannabisIntegrationsMockData()
    
  } catch (error) {
    console.warn('Cannabis API: Failed to fetch integrations', error)
    return getCannabisIntegrationsMockData()
  }
}

// ============================================================================
// CANNABIS MOCK DATA (FALLBACKS)
// ============================================================================

function getCannabisStatesMockData(): CannabisStateInfo[] {
  return [
    {
      id: 'nm',
      name: 'New Mexico',
      code: 'NM',
      legalStatus: 'recreational',
      marketType: ['adult-use', 'medical'],
      legalizationDate: '2021-04-12',
      effectiveDate: '2022-04-01',
      regulatoryAgency: 'Cannabis Control Division',
      licensingAuthority: 'NM Regulation & Licensing Department',
      trackingSystem: 'METRC',
      businessHours: {
        earliest: '08:00',
        latest: '22:00',
        timezone: 'America/Denver',
      },
      purchaseLimits: {
        adultUse: { flower: 56, concentrates: 16, edibles: 800 },
        medical: { flower: 113, concentrates: 32, edibles: 1600 },
      },
      ageRequirements: { adultUse: 21, medical: 18 },
      taxation: { exciseTax: 12.0, stateTax: 5.125, localTax: 3.3125 },
      complianceScore: 96,
      complianceGrade: 'A+',
      legalizationPrediction: {
        probability: 100,
        timeframe: '2025',
        confidence: 'high',
        keyFactors: ['Already legalized', 'Established market', 'Strong regulatory framework'],
      },
      marketReadiness: {
        score: 95,
        infrastructure: 98,
        demand: 94,
        regulation: 97,
        competition: 89,
      },
      revenueProjection: {
        year1: 85,
        year3: 150,
        year5: 220,
        marketSize: 350,
      },
      alerts: { total: 2, critical: 0, high: 0, medium: 1, low: 1 },
    },
    // Add more mock states as needed...
  ]
}

function getCannabisDispensariesMockData(): CannabisDispensaryLocation[] {
  return [
    {
      id: 'nm-albuquerque-1',
      name: 'CultivateCo Albuquerque North',
      address: '2500 Central Ave NE',
      city: 'Albuquerque',
      state: 'NM',
      coordinates: [-106.609991, 35.084386],
      status: 'operational',
      marketTier: 'flagship',
      openingDate: '2022-04-01',
      monthlyRevenue: 485000,
      complianceScore: 98,
    },
    // Add more mock dispensaries...
  ]
}

function getCannabisTestimonialsMockData(): CannabisTestimonial[] {
  return [
    {
      id: '1',
      name: 'Sarah Martinez',
      title: 'Compliance Manager',
      company: 'Desert Bloom Dispensary',
      state: 'New Mexico',
      image: '/testimonials/sarah-martinez.jpg',
      quote: 'CultivateCo transformed our compliance process. We went from constant stress about violations to complete confidence in our regulatory adherence.',
      rating: 5,
      category: 'compliance',
      featured: true,
      verified: true,
      date: '2024-01-15',
    },
    // Add more mock testimonials...
  ]
}

function getCannabisIntegrationsMockData() {
  return [
    {
      category: 'State Tracking',
      integrations: [
        { name: 'METRC', logo: '/integrations/metrc-logo.svg', description: 'New Mexico, Colorado, California', status: 'active' as const },
        { name: 'BioTrack', logo: '/integrations/biotrack-logo.svg', description: 'Washington, Hawaii, Illinois', status: 'active' as const },
      ],
    },
    // Add more mock integrations...
  ]
}

// ============================================================================
// EXPORT API CLIENT AND UTILITY FUNCTIONS
// ============================================================================

export { cannabisApi }

/**
 * Health check for cannabis API
 */
export async function checkCannabisApiHealth(): Promise<boolean> {
  try {
    const response = await cannabisApi.request('/health')
    return response.success
  } catch {
    return false
  }
}

/**
 * Clear all cannabis API caches
 */
export function clearCannabisCaches(): void {
  cannabisApi.clearCache()
}

/**
 * Get cannabis API cache statistics
 */
export function getCannabisCacheStats(): { size: number; keys: string[] } {
  return cannabisApi.getCacheStats()
}
