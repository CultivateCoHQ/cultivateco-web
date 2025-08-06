/**
 * =============================================================================
 * CultivateCo Cannabis Marketing Website - Type Definitions
 * =============================================================================
 * Comprehensive type definitions for cannabis marketing and governance features
 */

// ============================================================================
// CANNABIS LEGALIZATION STATUS TYPES
// ============================================================================

export type CannabisLegalStatus = 
  | 'recreational'      // Full adult-use legalization
  | 'medical-only'      // Medical cannabis only
  | 'illegal'          // Completely illegal
  | 'decriminalized'   // Decriminalized possession
  | 'cbd-only'         // CBD/hemp only
  | 'pending'          // Legislation pending

export type CannabisMarketType = 
  | 'adult-use'
  | 'medical'
  | 'dual-use'
  | 'hemp-cbd'
  | 'none'

// ============================================================================
// CANNABIS STATE GOVERNANCE TYPES
// ============================================================================

export interface CannabisStateInfo {
  id: string
  name: string
  code: string
  legalStatus: CannabisLegalStatus
  marketType: CannabisMarketType[]
  legalizationDate?: string
  effectiveDate?: string
  
  // Regulatory framework
  regulatoryAgency: string
  licensingAuthority: string
  trackingSystem: 'METRC' | 'BioTrack' | 'Leaf Data' | 'Custom' | 'None'
  
  // Business rules
  businessHours: {
    earliest: string  // "08:00"
    latest: string    // "22:00"
    timezone: string  // "America/Denver"
  }
  
  // Purchase limits
  purchaseLimits: {
    adultUse?: {
      flower: number      // grams per day
      concentrates: number // grams per day  
      edibles: number     // mg THC per day
    }
    medical?: {
      flower: number
      concentrates: number
      edibles: number
    }
  }
  
  // Age requirements
  ageRequirements: {
    adultUse: number    // 21
    medical: number     // 18 or 21
  }
  
  // Tax structure
  taxation: {
    exciseTax: number   // percentage
    stateTax: number    // percentage
    localTax?: number   // percentage
  }
  
  // Compliance scoring
  complianceScore: number // 0-100
  complianceGrade: 'A+' | 'A' | 'B+' | 'B' | 'C+' | 'C' | 'D' | 'F'
  
  // Legalization prediction
  legalizationPrediction: {
    probability: number     // 0-100
    timeframe: '2025' | '2026' | '2027' | '2028+' | 'unlikely'
    confidence: 'high' | 'medium' | 'low'
    keyFactors: string[]
  }
  
  // Market readiness
  marketReadiness: {
    score: number           // 0-100
    infrastructure: number  // 0-100
    demand: number         // 0-100  
    regulation: number     // 0-100
    competition: number    // 0-100
  }
  
  // Revenue projections
  revenueProjection: {
    year1: number          // millions
    year3: number          // millions
    year5: number          // millions
    marketSize: number     // total addressable market
  }
  
  // Alert and violation data
  alerts: {
    total: number
    critical: number
    high: number
    medium: number
    low: number
  }
}

// ============================================================================
// CANNABIS INTERACTIVE MAP TYPES
// ============================================================================

export interface CannabisMapFeature {
  type: 'Feature'
  geometry: {
    type: 'Polygon'
    coordinates: number[][][]
  }
  properties: CannabisStateInfo & {
    // Additional map-specific properties
    centroid: [number, number]  // [lng, lat]
    bounds: [[number, number], [number, number]]  // [[minLng, minLat], [maxLng, maxLat]]
    area: number  // square miles
    population: number
    
    // Visual styling
    fillColor: string
    strokeColor: string
    fillOpacity: number
    strokeWeight: number
    
    // Interactive features
    clickable: boolean
    hoverable: boolean
    showTooltip: boolean
    
    // Dispensary data
    dispensaryCount: number
    dispensaryLocations: CannabisDispensaryLocation[]
  }
}

export interface CannabisDispensaryLocation {
  id: string
  name: string
  address: string
  city: string
  state: string
  coordinates: [number, number]  // [lng, lat]
  status: 'operational' | 'planned' | 'construction' | 'licensed'
  marketTier: 'flagship' | 'tier-1' | 'tier-2' | 'future'
  openingDate?: string
  monthlyRevenue?: number
  complianceScore: number
}

export interface CannabisMapViewport {
  center: [number, number]  // [lng, lat]
  zoom: number
  bearing: number
  pitch: number
  bounds?: [[number, number], [number, number]]
}

export interface CannabisMapLayer {
  id: string
  type: 'fill' | 'circle' | 'symbol' | 'heatmap'
  source: string
  paint: Record<string, any>
  layout?: Record<string, any>
  filter?: any[]
  visible: boolean
}

export interface CannabisMapFilter {
  legalStatus?: CannabisLegalStatus[]
  complianceScore?: { min: number; max: number }
  legalizationProbability?: { min: number; max: number }
  marketReadiness?: { min: number; max: number }
  revenueProjection?: { min: number; max: number }
  showDispensaries?: boolean
  showAlerts?: boolean
}

// ============================================================================
// CANNABIS MARKETING CONTENT TYPES
// ============================================================================

export interface CannabisMarketingPage {
  slug: string
  title: string
  description: string
  keywords: string[]
  content: CannabisContentSection[]
  seo: CannabisSEOData
  published: boolean
  lastUpdated: string
}

export interface CannabisContentSection {
  id: string
  type: 'hero' | 'features' | 'testimonial' | 'cta' | 'content' | 'map' | 'stats'
  title?: string
  subtitle?: string
  content?: string
  image?: CannabisMediaAsset
  data?: any
  order: number
}

export interface CannabisMediaAsset {
  id: string
  url: string
  alt: string
  width: number
  height: number
  format: 'webp' | 'jpeg' | 'png' | 'svg'
  size: number
  placeholder?: string
}

export interface CannabisSEOData {
  title: string
  description: string
  keywords: string[]
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  canonicalUrl?: string
  structuredData?: Record<string, any>
}

// ============================================================================
// CANNABIS TESTIMONIAL AND CASE STUDY TYPES
// ============================================================================

export interface CannabisTestimonial {
  id: string
  name: string
  title: string
  company: string
  state: string
  image?: string
  quote: string
  rating: number  // 1-5
  category: 'compliance' | 'pos' | 'analytics' | 'general'
  featured: boolean
  verified: boolean
  date: string
}

export interface CannabisCaseStudy {
  id: string
  title: string
  slug: string
  company: string
  state: string
  industry: string
  challenge: string
  solution: string
  results: CannabisCaseStudyResult[]
  image?: string
  testimonial?: CannabisTestimonial
  published: boolean
  featured: boolean
  date: string
}

export interface CannabisCaseStudyResult {
  metric: string
  before: string | number
  after: string | number
  improvement: string
  description?: string
}

// ============================================================================
// CANNABIS LEAD GENERATION TYPES
// ============================================================================

export interface CannabisLead {
  id: string
  type: 'contact' | 'demo' | 'consultation' | 'pricing'
  
  // Contact information
  firstName: string
  lastName: string
  email: string
  phone?: string
  company?: string
  title?: string
  
  // Cannabis business information
  businessType: 'dispensary' | 'cultivation' | 'manufacturing' | 'testing' | 'delivery' | 'other'
  state: string
  licenseStatus: 'licensed' | 'pending' | 'planning' | 'none'
  currentSoftware?: string
  
  // Lead qualification
  monthlyRevenue?: string
  locations?: number
  employees?: number
  timeline?: 'immediate' | '1-3-months' | '3-6-months' | '6-12-months' | 'planning'
  
  // Interests and needs
  interests: string[]  // ['pos', 'compliance', 'analytics', 'metrc', 'reporting']
  painPoints: string[]
  message?: string
  
  // Lead scoring and tracking
  score: number  // 0-100
  status: 'new' | 'contacted' | 'qualified' | 'opportunity' | 'customer' | 'lost'
  source: 'website' | 'map' | 'blog' | 'social' | 'referral' | 'paid' | 'organic'
  
  // Timestamps
  createdAt: string
  updatedAt: string
  lastContactedAt?: string
}

export interface CannabisContactForm {
  firstName: string
  lastName: string
  email: string
  phone?: string
  company?: string
  message: string
  interests: string[]
  consent: boolean
}

export interface CannabisDemoRequest {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  title: string
  state: string
  businessType: string
  monthlyRevenue: string
  currentSoftware?: string
  timeline: string
  interests: string[]
  questions?: string
  preferredTime: string
  consent: boolean
}

// ============================================================================
// CANNABIS ANALYTICS AND TRACKING TYPES
// ============================================================================

export interface CannabisWebsiteAnalytics {
  pageViews: number
  uniqueVisitors: number
  bounceRate: number
  averageSessionDuration: number
  conversionRate: number
  
  // Cannabis-specific metrics
  mapInteractions: number
  stateClicks: Record<string, number>
  leadConversions: number
  demoRequests: number
  
  // Top pages
  topPages: Array<{
    path: string
    views: number
    conversions: number
  }>
  
  // Traffic sources
  trafficSources: Record<string, number>
  
  // Cannabis industry insights
  popularStates: string[]
  popularBusinessTypes: string[]
  commonPainPoints: string[]
}

// ============================================================================
// CANNABIS COMPONENT PROPS TYPES
// ============================================================================

export interface CannabisButtonProps {
  variant: 'primary' | 'secondary' | 'cannabis' | 'compliance' | 'outline'
  size: 'sm' | 'md' | 'lg' | 'xl'
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  href?: string
  className?: string
}

export interface CannabisCardProps {
  title?: string
  description?: string
  image?: CannabisMediaAsset
  children: React.ReactNode
  hover?: boolean
  className?: string
}

export interface CannabisModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  children: React.ReactNode
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
}

export interface CannabisTooltipProps {
  content: string | React.ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
  children: React.ReactNode
  delay?: number
  className?: string
}

// ============================================================================
// CANNABIS API RESPONSE TYPES
// ============================================================================

export interface CannabisApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
  timestamp: string
}

export interface CannabisPaginatedResponse<T = any> extends CannabisApiResponse<T> {
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

// ============================================================================
// CANNABIS ERROR TYPES
// ============================================================================

export interface CannabisError {
  code: string
  message: string
  details?: Record<string, any>
  timestamp: string
}

// ============================================================================
// CANNABIS UTILITY TYPES
// ============================================================================

export type CannabisId = string
export type CannabisTimestamp = string
export type CannabisColor = string
export type CannabisCoordinates = [number, number]  // [lng, lat]

// ============================================================================
// CANNABIS CONSTANTS AND ENUMS
// ============================================================================

export const CANNABIS_LEGAL_STATUSES = [
  'recreational',
  'medical-only', 
  'illegal',
  'decriminalized',
  'cbd-only',
  'pending',
] as const

export const CANNABIS_BUSINESS_TYPES = [
  'dispensary',
  'cultivation',
  'manufacturing',
  'testing',
  'delivery',
  'consulting',
  'software',
  'other',
] as const

export const CANNABIS_LEAD_SOURCES = [
  'website',
  'map',
  'blog',
  'social',
  'referral',
  'paid',
  'organic',
  'event',
  'partnership',
] as const

export const CANNABIS_MAP_COLORS = {
  recreational: '#154438',      // Brand green
  'medical-only': '#0b447a',   // Brand blue  
  illegal: '#fbfaf7',          // Brand cream
  decriminalized: '#8dd1c1',   // Light green
  'cbd-only': '#3d9a87',       // Medium green
  pending: '#7cc8ff',          // Light blue
} as const

export const CANNABIS_COMPLIANCE_GRADES = {
  'A+': { min: 95, color: '#154438' },
  'A': { min: 90, color: '#3d9a87' },
  'B+': { min: 85, color: '#0b447a' },
  'B': { min: 80, color: '#7cc8ff' },
  'C+': { min: 75, color: '#d97706' },
  'C': { min: 70, color: '#f59e0b' },
  'D': { min: 60, color: '#dc2626' },
  'F': { min: 0, color: '#991b1b' },
} as const
