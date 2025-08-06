/**
 * =============================================================================
 * CultivateCo Cannabis Platform Configuration
 * =============================================================================
 * Centralized configuration for cannabis marketing website and platform
 */

// ============================================================================
// CANNABIS PLATFORM CONFIGURATION
// ============================================================================

export const CANNABIS_CONFIG = {
  // Company Information
  company: {
    name: 'CultivateCo',
    legalName: 'CultivateCo, Inc.',
    tagline: 'Cannabis Compliance Made Simple',
    description: 'The leading cannabis compliance platform helping dispensaries, cultivators, and manufacturers maintain perfect regulatory compliance across 19+ states.',
    founded: '2016',
    industry: 'Cannabis Technology & Compliance',
    headquarters: 'Albuquerque, New Mexico',
  },

  // Contact Information
  contact: {
    phone: {
      primary: '+1-555-123-CANN',
      formatted: '(555) 123-CANN',
      sales: '+1-555-123-2266',
      support: '+1-555-123-TECH',
      compliance: '+1-555-123-COMP',
      emergency: '+1-555-123-4911',
    },
    email: {
      primary: 'hello@cultivateco.com',
      sales: 'sales@cultivateco.com',
      support: 'support@cultivateco.com',
      compliance: 'compliance@cultivateco.com',
      privacy: 'privacy@cultivateco.com',
      legal: 'legal@cultivateco.com',
      press: 'press@cultivateco.com',
      careers: 'careers@cultivateco.com',
    },
    addresses: {
      headquarters: {
        street: '2500 Louisiana Blvd NE, Suite 200',
        city: 'Albuquerque',
        state: 'New Mexico',
        zip: '87110',
        country: 'United States',
      },
      denver: {
        street: '1400 16th Street, Suite 300',
        city: 'Denver',
        state: 'Colorado', 
        zip: '80202',
        country: 'United States',
      },
    },
  },

  // Website & Platform URLs
  urls: {
    website: 'https://cultivateco.com',
    platform: 'https://app.cultivateco.com',
    api: 'https://api.cultivateco.com',
    docs: 'https://docs.cultivateco.com',
    status: 'https://status.cultivateco.com',
    blog: 'https://cultivateco.com/resources/blog',
    support: 'https://help.cultivateco.com',
  },

  // Social Media & Online Presence
  social: {
    linkedin: 'https://linkedin.com/company/cultivateco',
    twitter: 'https://twitter.com/cultivateco',
    facebook: 'https://facebook.com/cultivateco',
    instagram: 'https://instagram.com/cultivateco',
    youtube: 'https://youtube.com/@cultivateco',
    github: 'https://github.com/cultivateco',
  },

  // Cannabis Industry Metrics
  metrics: {
    customers: '2,500+',
    statesSupported: 19,
    complianceScore: 99.8,
    violationsPrevented: 25000,
    yearsExperience: 8,
    teamMembers: 85,
    monthlyTransactions: 50000000, // $50M
    uptime: 99.9,
  },

  // Cannabis Compliance Features
  features: {
    core: [
      'METRC Integration',
      'Real-time Compliance Monitoring',
      'Automated Violation Prevention',
      'Cannabis POS System',
      'Inventory Management',
      'Regulatory Reporting',
      'Audit Trail Management',
      'Multi-State Support',
    ],
    integrations: [
      'METRC (19+ States)',
      'QuickBooks',
      'Stripe',
      'Square', 
      'Shopify',
      'Mailchimp',
      'Tableau',
      'NetSuite',
    ],
    industries: [
      'Cannabis Dispensaries',
      'Cannabis Cultivation',
      'Cannabis Manufacturing',
      'Cannabis Testing Labs',
      'Cannabis Delivery Services',
      'Cannabis Distribution',
      'Vertically Integrated Operators',
      'Multi-State Operators (MSOs)',
    ],
  },

  // Supported Cannabis States
  supportedStates: [
    {
      name: 'New Mexico',
      code: 'NM',
      trackingSystem: 'METRC',
      status: 'active',
      launchDate: '2022-04-01',
      complianceScore: 98,
    },
    {
      name: 'Colorado',
      code: 'CO', 
      trackingSystem: 'METRC',
      status: 'active',
      launchDate: '2017-01-15',
      complianceScore: 96,
    },
    {
      name: 'California',
      code: 'CA',
      trackingSystem: 'METRC',
      status: 'active',
      launchDate: '2019-03-01',
      complianceScore: 94,
    },
    {
      name: 'Oregon',
      code: 'OR',
      trackingSystem: 'METRC',
      status: 'coming-soon',
      launchDate: '2025-06-01',
      complianceScore: 0,
    },
    // Additional states...
  ],

  // Cannabis Pricing Plans
  pricing: {
    starter: {
      name: 'Cannabis Starter',
      price: {
        monthly: 299,
        annual: 2990,
        setup: 500,
      },
      limits: {
        locations: 1,
        users: 5,
        transactions: 5000,
        storage: 10,
      },
    },
    professional: {
      name: 'Cannabis Professional', 
      price: {
        monthly: 599,
        annual: 5990,
        setup: 1000,
      },
      limits: {
        locations: 3,
        users: 15,
        transactions: 25000,
        storage: 100,
      },
    },
    enterprise: {
      name: 'Cannabis Enterprise',
      price: {
        monthly: 1299,
        annual: 12990,
        setup: 2500,
      },
      limits: {
        locations: 'unlimited',
        users: 'unlimited',
        transactions: 'unlimited', 
        storage: 1000,
      },
    },
  },

  // Cannabis Legal & Compliance
  legal: {
    termsVersion: '2024.02.15',
    privacyVersion: '2024.02.15',
    complianceCertifications: [
      'SOC 2 Type II',
      'Cannabis Industry Security Standards',
      'State Cannabis Data Protection Requirements',
      'METRC Integration Certified',
    ],
    governingLaw: 'New Mexico',
    disputeResolution: 'Binding Arbitration',
  },

  // Cannabis Marketing & SEO
  seo: {
    defaultTitle: 'Cannabis Compliance Platform | CultivateCo',
    defaultDescription: 'Leading cannabis compliance platform with METRC integration, real-time monitoring, and automated violation prevention for dispensaries and cannabis businesses.',
    keywords: [
      'cannabis compliance',
      'cannabis software',
      'METRC integration',
      'cannabis POS',
      'dispensary software',
      'cannabis regulatory compliance',
      'cannabis business management',
      'cannabis inventory management',
      'cannabis point of sale',
      'cannabis tracking software',
    ],
    ogImage: 'https://cultivateco.com/og-cannabis-compliance-platform.jpg',
    twitterHandle: '@cultivateco',
  },

  // Cannabis Analytics & Tracking
  analytics: {
    googleAnalytics: 'GA-XXXXXXXX-X',
    googleTagManager: 'GTM-XXXXXXX',
    facebookPixel: 'XXXXXXXXXXXXXXXXX',
    linkedInInsight: 'XXXXXXX',
    intercomAppId: 'XXXXXXXX',
    hotjarSiteId: 'XXXXXXX',
  },

  // Third-Party Service Configuration
  services: {
    stripe: {
      publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
      priceIds: {
        starter_monthly: 'price_starter_monthly',
        starter_annual: 'price_starter_annual',
        professional_monthly: 'price_professional_monthly',
        professional_annual: 'price_professional_annual',
        enterprise_monthly: 'price_enterprise_monthly',
        enterprise_annual: 'price_enterprise_annual',
      },
    },
    mailchimp: {
      audienceId: process.env.MAILCHIMP_AUDIENCE_ID || '',
      serverPrefix: process.env.MAILCHIMP_SERVER_PREFIX || '',
    },
    salesforce: {
      orgId: process.env.SALESFORCE_ORG_ID || '',
      webToLeadUrl: 'https://webto.salesforce.com/servlet/servlet.WebToLead',
    },
    intercom: {
      appId: process.env.NEXT_PUBLIC_INTERCOM_APP_ID || '',
    },
  },

  // Cannabis Business Hours & Support
  businessHours: {
    timezone: 'America/Denver', // Mountain Time
    support: {
      weekdays: '7:00 AM - 7:00 PM MT',
      weekends: '9:00 AM - 5:00 PM MT',
    },
    sales: {
      weekdays: '8:00 AM - 6:00 PM MT',
      weekends: 'Closed',
    },
    compliance: {
      emergency: '24/7 for critical violations',
      regular: '8:00 AM - 8:00 PM MT',
    },
  },

  // Cannabis Platform Features & Limits
  platform: {
    maxFileUploadSize: 50 * 1024 * 1024, // 50MB
    maxBulkImportRows: 10000,
    dataRetentionYears: 7,
    backupFrequency: 'hourly',
    systemMaintenanceWindow: 'Sunday 2:00 AM - 4:00 AM MT',
    apiRateLimit: 1000, // requests per hour
    sessionTimeout: 8, // hours
  },

  // Cannabis Compliance Requirements
  compliance: {
    requiredDocuments: [
      'Cannabis License',
      'State Registration Certificate', 
      'Local Operating Permit',
      'Tax Registration',
      'Insurance Certificate',
      'Security Plan',
    ],
    auditRetention: {
      transactionLogs: 7, // years
      complianceReports: 5, // years
      userActivity: 3, // years
      systemLogs: 2, // years
    },
    reportingFrequency: {
      daily: ['Inventory Updates', 'Sales Reports'],
      weekly: ['Compliance Summary'],
      monthly: ['Financial Reports', 'Tax Filings'],
      quarterly: ['Regulatory Submissions'],
      annual: ['License Renewals'],
    },
  },
} as const

// ============================================================================
// ENVIRONMENT-SPECIFIC CONFIGURATION
// ============================================================================

export const getEnvironmentConfig = () => {
  const isDevelopment = process.env.NODE_ENV === 'development'
  const isProduction = process.env.NODE_ENV === 'production'
  const isStaging = process.env.NEXT_PUBLIC_ENVIRONMENT === 'staging'

  return {
    isDevelopment,
    isProduction,
    isStaging,
    apiUrl: isDevelopment 
      ? 'http://localhost:3001/api'
      : isStaging
      ? 'https://api-staging.cultivateco.com'
      : 'https://api.cultivateco.com',
    websiteUrl: isDevelopment
      ? 'http://localhost:3000'
      : isStaging  
      ? 'https://staging.cultivateco.com'
      : 'https://cultivateco.com',
    enableAnalytics: isProduction,
    enableDebugMode: isDevelopment,
    logLevel: isDevelopment ? 'debug' : isProduction ? 'error' : 'info',
  }
}

// ============================================================================
// CANNABIS FEATURE FLAGS
// ============================================================================

export const CANNABIS_FEATURE_FLAGS = {
  // Platform Features
  enableAdvancedAnalytics: true,
  enableMultiStateOperations: true,
  enableAPIAccess: true,
  enableMobileApp: true,
  enableIntegrations: true,
  enableAICompliance: true,
  
  // Cannabis Specific Features
  enableMETRCIntegration: true,
  enableCannabisDelivery: true,
  enableCannabisManufacturing: true,
  enableCannabisTesting: true,
  enableCannabisDistribution: true,
  
  // Beta Features
  enableBetaFeatures: process.env.NODE_ENV !== 'production',
  enableExperimentalCompliance: false,
  enableNewStateIntegrations: true,
  
  // UI/UX Features
  enableDarkMode: true,
  enableAccessibility: true,
  enableMobileOptimization: true,
  enableProgressiveWebApp: true,
  
  // Marketing Features
  enableABTesting: true,
  enablePersonalization: true,
  enableChatSupport: true,
  enableVideoOnboarding: true,
} as const

// ============================================================================
// CANNABIS ERROR CODES & MESSAGES
// ============================================================================

export const CANNABIS_ERROR_CODES = {
  // Authentication Errors
  AUTH_INVALID_CREDENTIALS: 'CANN_AUTH_001',
  AUTH_EXPIRED_SESSION: 'CANN_AUTH_002',
  AUTH_INSUFFICIENT_PERMISSIONS: 'CANN_AUTH_003',
  AUTH_CANNABIS_LICENSE_REQUIRED: 'CANN_AUTH_004',
  
  // Compliance Errors  
  COMPLIANCE_VIOLATION_DETECTED: 'CANN_COMP_001',
  COMPLIANCE_LICENSE_EXPIRED: 'CANN_COMP_002',
  COMPLIANCE_METRC_SYNC_FAILED: 'CANN_COMP_003',
  COMPLIANCE_REPORT_GENERATION_FAILED: 'CANN_COMP_004',
  COMPLIANCE_AUDIT_TRAIL_MISSING: 'CANN_COMP_005',
  
  // Business Logic Errors
  BUSINESS_INVALID_CANNABIS_DATA: 'CANN_BUS_001',
  BUSINESS_INVENTORY_MISMATCH: 'CANN_BUS_002',
  BUSINESS_TRANSACTION_LIMIT_EXCEEDED: 'CANN_BUS_003',
  BUSINESS_STATE_NOT_SUPPORTED: 'CANN_BUS_004',
  
  // System Errors
  SYSTEM_API_RATE_LIMIT: 'CANN_SYS_001',
  SYSTEM_DATABASE_ERROR: 'CANN_SYS_002',
  SYSTEM_INTEGRATION_TIMEOUT: 'CANN_SYS_003',
  SYSTEM_MAINTENANCE_MODE: 'CANN_SYS_004',
} as const

// ============================================================================
// CANNABIS VALIDATION RULES
// ============================================================================

export const CANNABIS_VALIDATION = {
  // User Input Validation
  user: {
    nameMinLength: 2,
    nameMaxLength: 50,
    emailMaxLength: 254,
    phoneMinLength: 10,
    phoneMaxLength: 15,
    passwordMinLength: 8,
    passwordRequireSpecialChar: true,
  },
  
  // Cannabis Business Validation
  business: {
    nameMinLength: 3,
    nameMaxLength: 100,
    licenseNumberMinLength: 5,
    licenseNumberMaxLength: 50,
    requiredBusinessTypes: [
      'Dispensary',
      'Cultivation',
      'Manufacturing', 
      'Testing Lab',
      'Distribution',
      'Delivery',
      'Vertically Integrated',
    ],
    maxLocations: {
      starter: 1,
      professional: 3,
      enterprise: 999,
    },
  },
  
  // Cannabis Product Validation
  product: {
    nameMaxLength: 200,
    skuMaxLength: 50,
    descriptionMaxLength: 2000,
    maxWeight: 99999.99, // grams
    maxPrice: 999999.99, // dollars
    requiredFields: ['name', 'sku', 'category', 'weight', 'price'],
  },
  
  // File Upload Validation
  files: {
    maxSizeBytes: 50 * 1024 * 1024, // 50MB
    allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp'],
    allowedDocumentTypes: ['application/pdf', 'text/csv', 'application/vnd.ms-excel'],
    maxFilesPerUpload: 10,
  },
} as const

// ============================================================================
// CANNABIS NOTIFICATION SETTINGS
// ============================================================================

export const CANNABIS_NOTIFICATIONS = {
  // Compliance Notifications
  compliance: {
    criticalViolationAlert: {
      email: true,
      sms: true,
      push: true,
      immediate: true,
    },
    licenseExpirationWarning: {
      email: true,
      sms: true,
      push: false,
      daysBeforeExpiry: [90, 60, 30, 14, 7, 1],
    },
    auditReminder: {
      email: true,
      sms: false,
      push: true,
      daysBeforeAudit: [30, 14, 7, 1],
    },
  },
  
  // System Notifications
  system: {
    maintenanceWindow: {
      email: true,
      sms: false,
      push: true,
      hoursBeforeMaintenance: 24,
    },
    securityAlert: {
      email: true,
      sms: true,
      push: true,
      immediate: true,
    },
    backupStatus: {
      email: false,
      sms: false,
      push: false,
      frequency: 'daily',
    },
  },
  
  // Marketing Notifications
  marketing: {
    newsletter: {
      frequency: 'weekly',
      defaultOptIn: false,
    },
    productUpdates: {
      frequency: 'monthly',
      defaultOptIn: true,
    },
    webinarInvitations: {
      frequency: 'as-needed',
      defaultOptIn: true,
    },
  },
} as const

// ============================================================================
// EXPORT CONFIGURATION HELPERS
// ============================================================================

export const getCannabisConfig = () => CANNABIS_CONFIG
export const getCannabisFeatureFlags = () => CANNABIS_FEATURE_FLAGS
export const getCannabisErrorCodes = () => CANNABIS_ERROR_CODES
export const getCannabisValidation = () => CANNABIS_VALIDATION
export const getCannabisNotifications = () => CANNABIS_NOTIFICATIONS

// Helper function to get configuration by environment
export const getConfig = () => ({
  ...CANNABIS_CONFIG,
  environment: getEnvironmentConfig(),
  features: CANNABIS_FEATURE_FLAGS,
  errors: CANNABIS_ERROR_CODES,
  validation: CANNABIS_VALIDATION,
  notifications: CANNABIS_NOTIFICATIONS,
})

// Helper function to check if feature is enabled
export const isFeatureEnabled = (feature: keyof typeof CANNABIS_FEATURE_FLAGS): boolean => {
  return CANNABIS_FEATURE_FLAGS[feature]
}

// Helper function to get cannabis state info
export const getCannabisStateInfo = (stateCode: string) => {
  return CANNABIS_CONFIG.supportedStates.find(state => state.code === stateCode)
}

// Helper function to get pricing plan info
export const getPricingPlan = (planName: 'starter' | 'professional' | 'enterprise') => {
  return CANNABIS_CONFIG.pricing[planName]
}

// Helper function to format contact information
export const getFormattedContact = () => {
  const { contact } = CANNABIS_CONFIG
  return {
    phone: contact.phone.formatted,
    email: contact.email.primary,
    address: `${contact.addresses.headquarters.street}, ${contact.addresses.headquarters.city}, ${contact.addresses.headquarters.state} ${contact.addresses.headquarters.zip}`,
  }
}

// Default export
export default getConfig()
