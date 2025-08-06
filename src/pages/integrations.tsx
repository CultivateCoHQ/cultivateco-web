/**
 * =============================================================================
 * CultivateCo Cannabis Integrations Page
 * =============================================================================
 * Comprehensive showcase of cannabis industry integrations and partnerships
 */

'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  Database,
  CreditCard,
  Calculator,
  ShoppingCart,
  Mail,
  Smartphone,
  BarChart3,
  Shield,
  CheckCircle,
  ExternalLink,
  Code,
  Zap,
  Users,
  Building2,
  Star,
  Award,
  Clock,
  Target,
  Globe,
  Play,
  Download,
  Settings,
  Lock,
  RefreshCw,
} from 'lucide-react'

import { CannabisLayout } from '@/components/layout/CannabisLayout'
import { cn, trackCannabisEvent } from '@/lib/cannabis-utils'
import type { CannabisSEOData, CannabisTestimonial } from '@/types/cannabis-marketing'

// ============================================================================
// CANNABIS INTEGRATIONS DATA
// ============================================================================

interface CannabisIntegration {
  id: string
  name: string
  category: string
  description: string
  logo: string
  website: string
  status: 'active' | 'beta' | 'coming-soon'
  setupTime: string
  features: string[]
  benefits: string[]
  popularity: 'high' | 'medium' | 'low'
  tier: 'essential' | 'professional' | 'enterprise'
}

const CANNABIS_INTEGRATION_CATEGORIES = [
  {
    id: 'state-tracking',
    name: 'State Tracking Systems',
    description: 'Cannabis seed-to-sale tracking and regulatory compliance',
    icon: Database,
    color: 'cannabis-green',
    integrations: [
      {
        id: 'metrc',
        name: 'METRC',
        category: 'State Tracking',
        description: 'Complete METRC integration with real-time synchronization for cannabis compliance across 19+ states',
        logo: '/integrations/metrc-logo.svg',
        website: 'https://metrc.com',
        status: 'active' as const,
        setupTime: '1 day',
        features: [
          'Real-time package tracking',
          'Automated manifest generation',
          'Transfer documentation',
          'Lab result integration',
          'Waste tracking',
          'License verification',
        ],
        benefits: [
          '100% compliance accuracy',
          '50% faster reporting',
          'Zero sync errors',
          'Automated state submissions',
        ],
        popularity: 'high' as const,
        tier: 'essential' as const,
      },
      {
        id: 'biotrack',
        name: 'BioTrackTHC',
        category: 'State Tracking',
        description: 'BioTrack integration for Washington, Hawaii, and Illinois cannabis tracking requirements',
        logo: '/integrations/biotrack-logo.svg',
        website: 'https://biotrack.com',
        status: 'active' as const,
        setupTime: '2 days',
        features: [
          'Multi-state compliance',
          'Inventory synchronization',
          'Sales reporting',
          'Plant tracking',
          'Transport manifests',
          'Compliance monitoring',
        ],
        benefits: [
          'Multi-state operations',
          'Simplified compliance',
          'Automated tracking',
          'Regulatory reporting',
        ],
        popularity: 'medium' as const,
        tier: 'professional' as const,
      },
      {
        id: 'leafdata',
        name: 'Leaf Data Systems',
        category: 'State Tracking',
        description: 'Washington State cannabis traceability system integration for comprehensive compliance',
        logo: '/integrations/leafdata-logo.svg',
        website: 'https://lcb.wa.gov',
        status: 'active' as const,
        setupTime: '3 days',
        features: [
          'Washington State compliance',
          'Real-time reporting',
          'Inventory tracking',
          'Sales documentation',
          'Transfer records',
          'Lab testing integration',
        ],
        benefits: [
          'Washington compliance',
          'Real-time sync',
          'Automated reporting',
          'Audit trail',
        ],
        popularity: 'medium' as const,
        tier: 'professional' as const,
      },
    ],
  },
  {
    id: 'payment-processing',
    name: 'Payment Processing',
    description: 'Secure payment solutions for cannabis retail operations',
    icon: CreditCard,
    color: 'cannabis-blue',
    integrations: [
      {
        id: 'stripe',
        name: 'Stripe',
        category: 'Payment Processing',
        description: 'Secure credit card processing with cannabis-compliant payment flows and fraud protection',
        logo: '/integrations/stripe-logo.svg',
        website: 'https://stripe.com',
        status: 'active' as const,
        setupTime: '30 minutes',
        features: [
          'Credit card processing',
          'Fraud protection',
          'Recurring billing',
          'Mobile payments',
          'International payments',
          'Real-time analytics',
        ],
        benefits: [
          'Secure transactions',
          '99.9% uptime',
          'Lower processing fees',
          'Advanced fraud detection',
        ],
        popularity: 'high' as const,
        tier: 'essential' as const,
      },
      {
        id: 'square',
        name: 'Square',
        category: 'Payment Processing',
        description: 'Integrated POS and payment processing solution for cannabis retail with inventory management',
        logo: '/integrations/square-logo.svg',
        website: 'https://squareup.com',
        status: 'active' as const,
        setupTime: '1 hour',
        features: [
          'POS integration',
          'Inventory sync',
          'Payment processing',
          'Customer management',
          'Sales reporting',
          'Hardware support',
        ],
        benefits: [
          'All-in-one solution',
          'Easy setup',
          'Competitive rates',
          'Hardware included',
        ],
        popularity: 'high' as const,
        tier: 'professional' as const,
      },
      {
        id: 'paypal',
        name: 'PayPal',
        category: 'Payment Processing',
        description: 'Digital wallet and online payment processing for cannabis e-commerce and delivery services',
        logo: '/integrations/paypal-logo.svg',
        website: 'https://paypal.com',
        status: 'beta' as const,
        setupTime: '45 minutes',
        features: [
          'Digital wallet',
          'Online payments',
          'Mobile checkout',
          'Buyer protection',
          'International support',
          'Subscription billing',
        ],
        benefits: [
          'Trusted brand',
          'Global reach',
          'Customer protection',
          'Easy integration',
        ],
        popularity: 'medium' as const,
        tier: 'professional' as const,
      },
    ],
  },
  {
    id: 'accounting-finance',
    name: 'Accounting & Finance',
    description: 'Financial management and accounting software for cannabis businesses',
    icon: Calculator,
    color: 'cannabis-green',
    integrations: [
      {
        id: 'quickbooks',
        name: 'QuickBooks',
        category: 'Accounting & Finance',
        description: 'Comprehensive accounting integration with cannabis-specific tax handling and financial reporting',
        logo: '/integrations/quickbooks-logo.svg',
        website: 'https://quickbooks.intuit.com',
        status: 'active' as const,
        setupTime: '2 hours',
        features: [
          'Automated bookkeeping',
          '280E tax compliance',
          'Financial reporting',
          'Expense tracking',
          'Inventory costing',
          'Multi-entity support',
        ],
        benefits: [
          '280E tax compliance',
          'Automated sync',
          'Financial insights',
          'Tax preparation ready',
        ],
        popularity: 'high' as const,
        tier: 'essential' as const,
      },
      {
        id: 'netsuite',
        name: 'NetSuite',
        category: 'Accounting & Finance',
        description: 'Enterprise ERP solution with advanced financial management for large cannabis operations',
        logo: '/integrations/netsuite-logo.svg',
        website: 'https://netsuite.com',
        status: 'active' as const,
        setupTime: '1 week',
        features: [
          'Enterprise ERP',
          'Advanced financials',
          'Multi-subsidiary',
          'Cannabis-specific modules',
          'Advanced reporting',
          'Workflow automation',
        ],
        benefits: [
          'Enterprise scalability',
          'Advanced analytics',
          'Multi-entity management',
          'Regulatory compliance',
        ],
        popularity: 'medium' as const,
        tier: 'enterprise' as const,
      },
      {
        id: 'xero',
        name: 'Xero',
        category: 'Accounting & Finance',
        description: 'Cloud-based accounting software with cannabis business financial management and reporting',
        logo: '/integrations/xero-logo.svg',
        website: 'https://xero.com',
        status: 'active' as const,
        setupTime: '1 hour',
        features: [
          'Cloud accounting',
          'Bank reconciliation',
          'Invoice management',
          'Expense tracking',
          'Financial reporting',
          'Multi-currency support',
        ],
        benefits: [
          'Cloud accessibility',
          'Easy collaboration',
          'Real-time data',
          'Affordable pricing',
        ],
        popularity: 'medium' as const,
        tier: 'professional' as const,
      },
    ],
  },
  {
    id: 'ecommerce-retail',
    name: 'E-commerce & Retail',
    description: 'Online sales platforms and retail management solutions',
    icon: ShoppingCart,
    color: 'cannabis-blue',
    integrations: [
      {
        id: 'shopify',
        name: 'Shopify',
        category: 'E-commerce & Retail',
        description: 'Cannabis e-commerce platform integration with inventory sync and compliant online ordering',
        logo: '/integrations/shopify-logo.svg',
        website: 'https://shopify.com',
        status: 'active' as const,
        setupTime: '4 hours',
        features: [
          'Online store creation',
          'Inventory synchronization',
          'Order management',
          'Customer accounts',
          'Mobile optimization',
          'Payment processing',
        ],
        benefits: [
          'Professional storefront',
          'Mobile-first design',
          'Inventory sync',
          'Marketing tools',
        ],
        popularity: 'high' as const,
        tier: 'professional' as const,
      },
      {
        id: 'woocommerce',
        name: 'WooCommerce',
        category: 'E-commerce & Retail',
        description: 'WordPress-based cannabis e-commerce solution with customizable online store features',
        logo: '/integrations/woocommerce-logo.svg',
        website: 'https://woocommerce.com',
        status: 'coming-soon' as const,
        setupTime: '1 day',
        features: [
          'WordPress integration',
          'Customizable design',
          'Product management',
          'Order processing',
          'SEO optimization',
          'Plugin ecosystem',
        ],
        benefits: [
          'Full customization',
          'SEO friendly',
          'Cost effective',
          'Large community',
        ],
        popularity: 'medium' as const,
        tier: 'professional' as const,
      },
    ],
  },
  {
    id: 'marketing-communication',
    name: 'Marketing & Communication',
    description: 'Customer engagement and marketing automation tools',
    icon: Mail,
    color: 'cannabis-green',
    integrations: [
      {
        id: 'mailchimp',
        name: 'Mailchimp',
        category: 'Marketing & Communication',
        description: 'Email marketing automation with cannabis customer segmentation and compliance-aware campaigns',
        logo: '/integrations/mailchimp-logo.svg',
        website: 'https://mailchimp.com',
        status: 'active' as const,
        setupTime: '1 hour',
        features: [
          'Email campaigns',
          'Customer segmentation',
          'Automated workflows',
          'A/B testing',
          'Analytics tracking',
          'Mobile optimization',
        ],
        benefits: [
          'Increased retention',
          'Automated marketing',
          'Customer insights',
          'Mobile-friendly',
        ],
        popularity: 'high' as const,
        tier: 'professional' as const,
      },
      {
        id: 'twilio',
        name: 'Twilio',
        category: 'Marketing & Communication',
        description: 'SMS notifications and customer communication platform for cannabis business alerts',
        logo: '/integrations/twilio-logo.svg',
        website: 'https://twilio.com',
        status: 'active' as const,
        setupTime: '2 hours',
        features: [
          'SMS notifications',
          'Voice calling',
          'WhatsApp messaging',
          'Automated alerts',
          'Two-factor auth',
          'Global reach',
        ],
        benefits: [
          'Instant notifications',
          'Global coverage',
          'High delivery rates',
          'Scalable messaging',
        ],
        popularity: 'medium' as const,
        tier: 'professional' as const,
      },
      {
        id: 'klaviyo',
        name: 'Klaviyo',
        category: 'Marketing & Communication',
        description: 'Advanced email and SMS marketing platform with cannabis customer lifetime value optimization',
        logo: '/integrations/klaviyo-logo.svg',
        website: 'https://klaviyo.com',
        status: 'coming-soon' as const,
        setupTime: '3 hours',
        features: [
          'Advanced segmentation',
          'Predictive analytics',
          'Cross-channel campaigns',
          'Customer profiles',
          'Revenue attribution',
          'Real-time personalization',
        ],
        benefits: [
          'Increased revenue',
          'Better targeting',
          'Predictive insights',
          'Omnichannel marketing',
        ],
        popularity: 'medium' as const,
        tier: 'enterprise' as const,
      },
    ],
  },
  {
    id: 'business-intelligence',
    name: 'Business Intelligence',
    description: 'Advanced analytics and reporting platforms',
    icon: BarChart3,
    color: 'cannabis-blue',
    integrations: [
      {
        id: 'tableau',
        name: 'Tableau',
        category: 'Business Intelligence',
        description: 'Advanced cannabis analytics with customizable dashboards and regulatory compliance reporting',
        logo: '/integrations/tableau-logo.svg',
        website: 'https://tableau.com',
        status: 'active' as const,
        setupTime: '1 week',
        features: [
          'Custom dashboards',
          'Advanced visualizations',
          'Real-time data',
          'Regulatory reports',
          'Predictive analytics',
          'Mobile access',
        ],
        benefits: [
          'Deep insights',
          'Custom reporting',
          'Data visualization',
          'Regulatory compliance',
        ],
        popularity: 'medium' as const,
        tier: 'enterprise' as const,
      },
      {
        id: 'powerbi',
        name: 'Power BI',
        category: 'Business Intelligence',
        description: 'Microsoft Power BI integration for cannabis business intelligence and regulatory reporting',
        logo: '/integrations/powerbi-logo.svg',
        website: 'https://powerbi.microsoft.com',
        status: 'active' as const,
        setupTime: '3 days',
        features: [
          'Microsoft ecosystem',
          'Self-service BI',
          'Real-time dashboards',
          'Data modeling',
          'Natural language queries',
          'Mobile apps',
        ],
        benefits: [
          'Microsoft integration',
          'Cost effective',
          'Easy to use',
          'Scalable solution',
        ],
        popularity: 'medium' as const,
        tier: 'professional' as const,
      },
    ],
  },
]

const CANNABIS_INTEGRATION_TESTIMONIALS: CannabisTestimonial[] = [
  {
    id: '1',
    name: 'David Kim',
    title: 'IT Director',
    company: 'Mountain View Cannabis',
    state: 'Colorado',
    image: '/testimonials/david-kim.jpg',
    quote: 'The METRC integration was seamless and saved us 30 hours per week on compliance reporting. CultivateCo\'s integration team made the whole process effortless.',
    rating: 5,
    category: 'general',
    featured: true,
    verified: true,
    date: '2024-01-20',
  },
  {
    id: '2',
    name: 'Maria Rodriguez',
    title: 'CFO',
    company: 'Desert Sun Dispensary',
    state: 'New Mexico',
    image: '/testimonials/maria-rodriguez.jpg',
    quote: 'QuickBooks integration with 280E tax compliance handling is exactly what our cannabis business needed. Our accountant was amazed at how clean our books are now.',
    rating: 5,
    category: 'general',
    featured: true,
    verified: true,
    date: '2024-02-12',
  },
  {
    id: '3',
    name: 'Jennifer Walsh',
    title: 'Marketing Manager',
    company: 'Green Valley Cannabis',
    state: 'California',
    image: '/testimonials/jennifer-walsh.jpg',
    quote: 'Mailchimp integration helped us increase customer retention by 45%. The automated cannabis marketing campaigns are compliant and effective.',
    rating: 5,
    category: 'general',
    featured: true,
    verified: true,
    date: '2024-01-30',
  },
]

const CANNABIS_INTEGRATION_STATS = [
  { label: 'Total Integrations', value: '25+', icon: Globe },
  { label: 'Average Setup Time', value: '2 hours', icon: Clock },
  { label: 'Data Sync Accuracy', value: '99.9%', icon: Target },
  { label: 'Customer Satisfaction', value: '4.9/5', icon: Star },
]

// ============================================================================
// CANNABIS ANIMATION VARIANTS
// ============================================================================

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
}

const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
}

// ============================================================================
// CANNABIS INTEGRATIONS COMPONENTS
// ============================================================================

const CannabisIntegrationCard: React.FC<{
  integration: CannabisIntegration
  onSelect: (integration: CannabisIntegration) => void
}> = ({ integration, onSelect }) => {
  const handleClick = () => {
    onSelect(integration)
    trackCannabisEvent('cannabis_integration_click', {
      integration_id: integration.id,
      integration_name: integration.name,
      category: integration.category,
      status: integration.status,
    })
  }

  const getStatusBadge = () => {
    switch (integration.status) {
      case 'active':
        return <span className="px-2 py-1 bg-cannabis-green-100 text-cannabis-green-800 text-xs font-medium rounded-full">Active</span>
      case 'beta':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">Beta</span>
      case 'coming-soon':
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">Coming Soon</span>
    }
  }

  const getTierBadge = () => {
    const tierColors = {
      essential: 'bg-cannabis-green-100 text-cannabis-green-800',
      professional: 'bg-cannabis-blue-100 text-cannabis-blue-800', 
      enterprise: 'bg-purple-100 text-purple-800',
    }
    
    return (
      <span className={cn('px-2 py-1 text-xs font-medium rounded-full capitalize', tierColors[integration.tier])}>
        {integration.tier}
      </span>
    )
  }

  return (
    <motion.div
      variants={scaleInVariants}
      className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-cannabis-green-200 hover:shadow-cannabis transition-all duration-300 cursor-pointer"
      onClick={handleClick}
    >
      <div className="space-y-4">
        {/* Integration Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center">
              <Image
                src={integration.logo}
                alt={`${integration.name} integration`}
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{integration.name}</h3>
              <div className="flex items-center space-x-2">
                {getStatusBadge()}
                {getTierBadge()}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => {
              const filled = integration.popularity === 'high' ? i < 5 : 
                           integration.popularity === 'medium' ? i < 3 : i < 2
              return (
                <Star
                  key={i}
                  className={cn('h-4 w-4', filled ? 'text-yellow-400 fill-current' : 'text-gray-200')}
                />
              )
            })}
          </div>
        </div>

        {/* Integration Description */}
        <p className="text-gray-600 text-sm leading-relaxed">
          {integration.description}
        </p>

        {/* Setup Time */}
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Clock className="h-4 w-4" />
          <span>Setup time: {integration.setupTime}</span>
        </div>

        {/* Key Features */}
        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-700">Key Features:</div>
          <div className="grid grid-cols-2 gap-1">
            {integration.features.slice(0, 4).map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                <CheckCircle className="h-3 w-3 text-cannabis-green-500 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
          {integration.features.length > 4 && (
            <div className="text-sm text-gray-500">
              +{integration.features.length - 4} more features
            </div>
          )}
        </div>

        {/* Benefits */}
        <div className="flex flex-wrap gap-2">
          {integration.benefits.slice(0, 2).map((benefit, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-cannabis-green-50 text-cannabis-green-700 text-xs font-medium rounded"
            >
              {benefit}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <div className="pt-2 border-t border-gray-100">
          <button className="w-full flex items-center justify-center space-x-2 text-cannabis-green-600 hover:text-cannabis-green-700 font-medium text-sm transition-colors">
            <span>Learn More</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

const CannabisIntegrationModal: React.FC<{
  integration: CannabisIntegration | null
  isOpen: boolean
  onClose: () => void
}> = ({ integration, isOpen, onClose }) => {
  if (!integration || !isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="flex items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="p-8 space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center">
                  <Image
                    src={integration.logo}
                    alt={`${integration.name} integration`}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{integration.name}</h2>
                  <p className="text-gray-600">{integration.category}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ExternalLink className="h-5 w-5 text-gray-400" />
              </button>
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed">{integration.description}</p>

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Features & Capabilities</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {integration.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-cannabis-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Benefits</h3>
              <div className="space-y-2">
                {integration.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Star className="h-4 w-4 text-yellow-400 flex-shrink-0 fill-current" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Setup Information */}
            <div className="bg-cannabis-cream-50 rounded-lg p-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Setup Information</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="text-center p-3 bg-white rounded-lg">
                  <Clock className="h-6 w-6 text-cannabis-green-600 mx-auto mb-2" />
                  <div className="font-medium text-gray-900">Setup Time</div>
                  <div className="text-gray-600">{integration.setupTime}</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <Target className="h-6 w-6 text-cannabis-blue-600 mx-auto mb-2" />
                  <div className="font-medium text-gray-900">Plan Tier</div>
                  <div className="text-gray-600 capitalize">{integration.tier}</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <Shield className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                  <div className="font-medium text-gray-900">Status</div>
                  <div className="text-gray-600 capitalize">{integration.status.replace('-', ' ')}</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Link
                href="/demo"
                className="flex-1 inline-flex items-center justify-center space-x-2 rounded-lg cannabis-gradient px-6 py-3 text-white font-semibold hover:shadow-cannabis-lg transition-all duration-200"
              >
                <span>Setup Integration</span>
                <Settings className="h-4 w-4" />
              </Link>
              
                href={integration.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center space-x-2 rounded-lg border-2 border-cannabis-green-600 px-6 py-3 text-cannabis-green-600 font-semibold hover:bg-cannabis-green-50 transition-colors"
              >
                <span>Visit Website</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// ============================================================================
// CANNABIS INTEGRATIONS PAGE SECTIONS
// ============================================================================

const CannabisIntegrationsHeroSection: React.FC = () => {
  const handleDemoClick = () => {
    trackCannabisEvent('cannabis_integrations_demo_click', {
      source: 'integrations_hero',
      button_text: 'See Integration Demo'
    })
  }

  const handleAPIClick = () => {
    trackCannabisEvent('cannabis_api_docs_click', {
      source: 'integrations_hero',
      button_text: 'View API Documentation'
    })
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cannabis-cream-50 to-white py-20 lg:py-32">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 cannabis-gradient rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cannabis-blue-500 rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainerVariants}
          className="max-w-4xl mx-auto space-y-8"
        >
          <motion.div variants={fadeInUpVariants} className="space-y-6">
            <div className="inline-flex items-center space-x-2 rounded-full bg-cannabis-green-100 px-4 py-2 text-sm font-medium text-cannabis-green-800">
              <Globe className="h-4 w-4" />
              <span>25+ Cannabis Industry Integrations</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Cannabis
              <span className="block text-cannabis-green-700">Integrations</span>
              <span className="block">That Work</span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              Connect CultivateCo with the cannabis industry tools and business applications 
              you already use. Seamless integrations for METRC, payments, accounting, and more.
            </p>
          </motion.div>

          <motion.div variants={fadeInUpVariants} className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/demo"
              onClick={handleDemoClick}
              className="inline-flex items-center justify-center space-x-2 rounded-lg cannabis-gradient px-8 py-4 text-lg font-semibold text-white shadow-cannabis hover:shadow-cannabis-lg transition-all duration-200 hover:scale-105"
            >
              <span>See Integration Demo</span>
              <Play className="h-5 w-5" />
            </Link>
            
            <button
              onClick={handleAPIClick}
              className="inline-flex items-center justify-center space-x-2 rounded-lg border-2 border-gray-300 px-8 py-4 text-lg font-semibold text-gray-700 hover:bg-gray-50 transition-all duration-200"
            >
              <Code className="h-5 w-5" />
              <span>View API Docs</span>
            </button>
          </motion.div>

          <motion.div variants={fadeInUpVariants} className="grid md:grid-cols-4 gap-6">
            {CANNABIS_INTEGRATION_STATS.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="text-center p-4 bg-white rounded-lg shadow-cannabis">
                  <Icon className="h-6 w-6 mx-auto mb-2 text-cannabis-green-600" />
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

const CannabisIntegrationsCategoriesSection: React.FC = () => {
  const [selectedIntegration, setSelectedIntegration] = useState<CannabisIntegration | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('state-tracking')
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const activeIntegrations = CANNABIS_INTEGRATION_CATEGORIES.find(
    cat => cat.id === activeCategory
  )?.integrations || []

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUpVariants}>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              Cannabis Integration
              <span className="block text-cannabis-green-700">Categories</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore integrations by category to find the perfect solutions for your cannabis business needs.
            </p>
          </motion.div>
        </motion.div>

        {/* Category Navigation */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUpVariants}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {CANNABIS_INTEGRATION_CATEGORIES.map((category) => {
            const Icon = category.icon
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  'flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200',
                  activeCategory === category.id
                    ? 'cannabis-gradient text-white shadow-cannabis'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{category.name}</span>
              </button>
            )
          })}
        </motion.div>

        {/* Active Category Description */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-12"
        >
          {CANNABIS_INTEGRATION_CATEGORIES.map((category) => 
            category.id === activeCategory && (
              <p key={category.id} className="text-lg text-gray-600 max-w-2xl mx-auto">
                {category.description}
              </p>
            )
          )}
        </motion.div>

        {/* Integration Cards */}
        <motion.div
          key={activeCategory}
          initial="hidden"
          animate="visible"
          variants={staggerContainerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {activeIntegrations.map((integration) => (
            <CannabisIntegrationCard
              key={integration.id}
              integration={integration}
              onSelect={setSelectedIntegration}
            />
          ))}
        </motion.div>

        {/* Integration Modal */}
        <CannabisIntegrationModal
          integration={selectedIntegration}
          isOpen={!!selectedIntegration}
          onClose={() => setSelectedIntegration(null)}
        />
      </div>
    </section>
  )
}

const CannabisIntegrationsTestimonialsSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-cannabis-cream-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUpVariants}>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              Integration Success
              <span className="block text-cannabis-green-700">Stories</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how CultivateCo's integrations are helping cannabis operators 
              streamline their operations and improve efficiency.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
          className="grid lg:grid-cols-3 gap-8"
        >
          {CANNABIS_INTEGRATION_TESTIMONIALS.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={scaleInVariants}
              className="bg-white rounded-2xl p-8 shadow-cannabis hover:shadow-cannabis-lg transition-all duration-300"
            >
              <div className="space-y-6">
                {/* Rating */}
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-gray-700 italic">
                  "{testimonial.quote}"
                </blockquote>

                {/* Customer Info */}
                <div className="flex items-center space-x-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden bg-cannabis-green-100">
                    {testimonial.image ? (
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-cannabis-green-100 flex items-center justify-center">
                        <Users className="h-6 w-6 text-cannabis-green-600" />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">
                      {testimonial.title}, {testimonial.company}
                    </div>
                    <div className="text-sm text-cannabis-green-600 font-medium">
                      {testimonial.state}
                    </div>
                  </div>
                </div>

                {/* Integration Badge */}
                <div className="flex items-center space-x-2 text-sm text-cannabis-green-600">
                  <Globe className="h-4 w-4" />
                  <span>Integration Success</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

const CannabisIntegrationsCTASection: React.FC = () => {
  const handleDemoClick = () => {
    trackCannabisEvent('cannabis_integrations_cta_click', {
      source: 'integrations_cta',
      button_text: 'Start Integration Setup'
    })
  }

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-cannabis-green-700 to-cannabis-blue-700 text-white">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainerVariants}
          className="space-y-8"
        >
          <motion.div variants={fadeInUpVariants}>
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Ready to Connect Your
              <span className="block">Cannabis Tech Stack?</span>
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Join thousands of cannabis operators who have streamlined their operations 
              with CultivateCo's seamless integrations. Setup takes minutes, not hours.
            </p>
          </motion.div>

          <motion.div variants={fadeInUpVariants} className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/demo"
              onClick={handleDemoClick}
              className="inline-flex items-center justify-center space-x-2 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-cannabis-green-700 hover:bg-cannabis-cream-50 transition-all duration-200 hover:scale-105"
            >
              <span>Start Integration Setup</span>
              <Settings className="h-5 w-5" />
            </Link>
            
            <Link
              href="/contact"
              className="inline-flex items-center justify-center space-x-2 rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold text-white hover:bg-white/10 transition-all duration-200"
            >
              <span>Contact Integration Team</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>

          <motion.div variants={fadeInUpVariants} className="pt-8">
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm opacity-75">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>2-hour average setup</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>99.9% data sync accuracy</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>Dedicated integration support</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// MAIN CANNABIS INTEGRATIONS PAGE COMPONENT
// ============================================================================

const CannabisIntegrationsPage: React.FC = () => {
  const seo: CannabisSEOData = {
    title: 'Cannabis Software Integrations | METRC, QuickBooks, Stripe | CultivateCo',
    description: '25+ cannabis industry integrations including METRC, QuickBooks, Stripe, Shopify, and Mailchimp. Seamless setup with 99.9% data sync accuracy and 2-hour average setup time.',
    keywords: [
      'cannabis software integrations',
      'metrc integration',
      'cannabis quickbooks integration', 
      'dispensary software integrations',
      'cannabis pos integrations',
      'cannabis accounting integration',
      'cannabis payment processing',
      'cannabis ecommerce integration',
      'cannabis marketing integrations',
      'cannabis api integrations',
    ],
    ogTitle: 'Cannabis Software Integrations | METRC, QuickBooks & 25+ More',
    ogDescription: 'Connect CultivateCo with METRC, QuickBooks, Stripe, and 25+ cannabis industry tools. 2-hour setup, 99.9% accuracy, dedicated support.',
    ogImage: 'https://cultivateco.com/og-cannabis-integrations.jpg',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'CultivateCo Cannabis Integrations',
      description: 'Comprehensive integration platform for cannabis business software and tools',
      applicationCategory: 'Business Software',
      offers: {
        '@type': 'Offer',
        description: 'Free integration setup with platform subscription',
      },
      featureList: [
        'METRC state tracking integration',
        'QuickBooks accounting integration',
        'Stripe payment processing',
        'Shopify e-commerce integration',
        'Mailchimp marketing automation',
        'API developer tools',
      ],
    },
  }

  return (
    <CannabisLayout seo={seo}>
      <CannabisIntegrationsHeroSection />
      <CannabisIntegrationsCategoriesSection />
      <CannabisIntegrationsTestimonialsSection />
      <CannabisIntegrationsCTASection />
    </CannabisLayout>
  )
}

export default CannabisIntegrationsPage
