/**
 * @fileoverview Configuration file for the CultivateCo Cannabis Platform marketing website.
 * This file centralizes all environment variables, API endpoints, and other static configurations.
 * It ensures a single source of truth for all environment-specific and static values.
 */

// ============================================================================
// ENVIRONMENT-SPECIFIC CONFIGURATION
// ============================================================================

export type Environment = 'development' | 'production' | 'test';

interface EnvironmentConfig {
  apiUrl: string;
  enableAnalytics: boolean;
  mapboxAccessToken: string;
  complianceAlertsEnabled: boolean;
}

const developmentConfig: EnvironmentConfig = {
  apiUrl: 'http://localhost:3000/api',
  enableAnalytics: false,
  mapboxAccessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || 'YOUR_DEV_MAPBOX_TOKEN',
  complianceAlertsEnabled: true,
};

const productionConfig: EnvironmentConfig = {
  apiUrl: 'https://api.cultivateco.com',
  enableAnalytics: true,
  mapboxAccessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || 'YOUR_PROD_MAPBOX_TOKEN',
  complianceAlertsEnabled: true,
};

const testConfig: EnvironmentConfig = {
  apiUrl: 'http://localhost:3000/api',
  enableAnalytics: false,
  mapboxAccessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || 'YOUR_TEST_MAPBOX_TOKEN',
  complianceAlertsEnabled: false,
};

export const getEnvironmentConfig = (env: Environment = process.env.NODE_ENV as Environment): EnvironmentConfig => {
  switch (env) {
    case 'production':
      return productionConfig;
    case 'test':
      return testConfig;
    default:
      return developmentConfig;
  }
};

// ============================================================================
// STATIC & GLOBAL CONFIGURATION
// ============================================================================

export const CANNABIS_CONFIG = {
  company: {
    name: 'CultivateCo',
    legalName: 'CultivateCo, Inc.',
    description: 'The premier cannabis compliance platform for cultivators and dispensaries.',
    founded: '2023-01-01',
    industry: 'Cannabis Software',
  },
  urls: {
    website: 'https://cultivateco.com',
    platform: 'https://app.cultivateco.com',
  },
  social: {
    linkedin: 'https://www.linkedin.com/company/cultivateco',
    twitter: 'https://twitter.com/cultivateco',
    facebook: 'https://facebook.com/cultivateco',
  },
  contact: {
    phone: {
      sales: '+1 (555) 123-4567',
      support: '+1 (555) 987-6543',
    },
    email: {
      sales: 'sales@cultivateco.com',
      support: 'support@cultivateco.com',
      press: 'press@cultivateco.com',
    },
    addresses: {
      headquarters: {
        street: '123 Cultivate St',
        city: 'Cannabis City',
        state: 'CA',
        zip: '90210',
        country: 'USA',
      },
    },
  },
  pricing: {
    starter: {
      name: 'Starter Plan',
      price: {
        monthly: 99,
        yearly: 999,
      },
    },
  },
  analytics: {
    googleAnalytics: process.env.NEXT_PUBLIC_GA_ID,
    googleTagManager: process.env.NEXT_PUBLIC_GTM_ID,
    facebookPixel: process.env.NEXT_PUBLIC_FB_PIXEL_ID,
    linkedInInsight: process.env.NEXT_PUBLIC_LI_INSIGHT_ID,
    intercomAppId: process.env.NEXT_PUBLIC_INTERCOM_APP_ID,
    hotjarSiteId: process.env.NEXT_PUBLIC_HOTJAR_SITE_ID,
  },
  services: {
    intercom: {
      appId: process.env.NEXT_PUBLIC_INTERCOM_APP_ID,
    },
  },
};
