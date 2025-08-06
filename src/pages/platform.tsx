/**
 * =============================================================================
 * CultivateCo Cannabis Platform Features Page
 * =============================================================================
 * Comprehensive showcase of cannabis compliance platform and POS features
 */

'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  Shield,
  Calculator,
  BarChart3,
  FileCheck,
  Database,
  Smartphone,
  Monitor,
  Cloud,
  CheckCircle,
  Star,
  Play,
  Download,
  ExternalLink,
  Users,
  Clock,
  TrendingUp,
  Zap,
  Lock,
  RefreshCw,
  Bell,
  Settings,
  Building2,
  MapPin,
  CreditCard,
  Printer,
  Scan,
  Calendar,
  Mail,
} from 'lucide-react'

import { CannabisLayout } from '@/components/layout/CannabisLayout'
import { cn, formatCannabisRevenue, trackCannabisEvent } from '@/lib/cannabis-utils'
import type { CannabisSEOData, CannabisTestimonial } from '@/types/cannabis-marketing'

// ============================================================================
// CANNABIS PLATFORM FEATURES DATA
// ============================================================================

const CANNABIS_PLATFORM_HERO_STATS = [
  { label: 'Transactions Processed', value: '50M+', icon: Calculator },
  { label: 'Compliance Violations Prevented', value: '25K+', icon: Shield },
  { label: 'Cannabis Operators', value: '2,500+', icon: Building2 },
  { label: 'Uptime Guarantee', value: '99.9%', icon: Cloud },
]

const CANNABIS_CORE_FEATURES = [
  {
    id: 'pos',
    icon: Calculator,
    title: 'Cannabis POS System',
    subtitle: 'Complete Point-of-Sale Solution',
    description: 'Professional cannabis POS system with tax calculation, age verification, and purchase limit enforcement. Built specifically for cannabis retail operations.',
    image: '/platform/cannabis-pos-interface.jpg',
    features: [
      'Real-time tax calculation with state and local rates',
      'Automatic age verification and ID scanning',
      'Purchase limit enforcement and tracking',
      'Receipt printing with compliance information',
      'Payment processing integration (cash, debit, credit)',
      'Inventory sync with automatic updates',
      'Budtender interface optimized for cannabis sales',
      'Multi-location support with centralized management',
    ],
    benefits: [
      { metric: '40%', description: 'Faster checkout times' },
      { metric: '99.8%', description: 'Tax calculation accuracy' },
      { metric: '100%', description: 'Compliance adherence' },
    ],
    integrations: ['METRC', 'QuickBooks', 'Stripe', 'Square'],
    color: 'cannabis-green',
  },
  {
    id: 'compliance',
    icon: Shield,
    title: 'Cannabis Compliance Monitoring',
    subtitle: 'AI-Powered Regulatory Compliance',
    description: 'Real-time compliance monitoring with AI-powered violation detection, automated METRC synchronization, and comprehensive audit trail management.',
    image: '/platform/cannabis-compliance-dashboard.jpg',
    features: [
      'Real-time METRC integration and synchronization',
      'AI-powered violation detection and prevention',
      'Automated compliance reporting and submissions',
      'License expiration tracking and renewal alerts',
      'Business hours compliance monitoring',
      'Purchase limit validation and enforcement',
      'Comprehensive audit trail generation',
      'Multi-state regulatory framework support',
    ],
    benefits: [
      { metric: '95%', description: 'Reduction in violations' },
      { metric: '80%', description: 'Time saved on reporting' },
      { metric: '24/7', description: 'Continuous monitoring' },
    ],
    integrations: ['METRC', 'BioTrack', 'Leaf Data Systems', 'State APIs'],
    color: 'cannabis-blue',
  },
  {
    id: 'analytics',
    icon: BarChart3,
    title: 'Cannabis Analytics & Reporting',
    subtitle: 'Business Intelligence for Cannabis',
    description: 'Comprehensive analytics platform with sales insights, inventory optimization, customer segmentation, and regulatory reporting for data-driven decisions.',
    image: '/platform/cannabis-analytics-reports.jpg',
    features: [
      'Sales performance analytics and forecasting',
      'Inventory turnover and optimization insights',
      'Customer segmentation and loyalty analysis',
      'Product performance and strain analytics',
      'Compliance score tracking and trends',
      'Financial reporting and profit analysis',
      'Custom dashboard creation and sharing',
      'Automated report generation and delivery',
    ],
    benefits: [
      { metric: '35%', description: 'Average revenue increase' },
      { metric: '25%', description: 'Inventory optimization' },
      { metric: '50%', description: 'Faster reporting' },
    ],
    integrations: ['Google Analytics', 'Tableau', 'Power BI', 'Excel'],
    color: 'cannabis-green',
  },
  {
    id: 'inventory',
    icon: Database,
    title: 'Cannabis Inventory Management',
    subtitle: 'Real-Time Inventory Control',
    description: 'Advanced inventory management with real-time tracking, expiration monitoring, automated reordering, and seamless METRC package management.',
    image: '/platform/cannabis-inventory-tracking.jpg',
    features: [
      'Real-time inventory tracking and updates',
      'METRC package lifecycle management',
      'Expiration date monitoring and alerts',
      'Automated reorder point calculations',
      'Batch and lot tracking for compliance',
      'Transfer and manifest management',
      'Waste tracking and disposal documentation',
      'Multi-location inventory synchronization',
    ],
    benefits: [
      { metric: '90%', description: 'Reduction in stockouts' },
      { metric: '30%', description: 'Less expired inventory' },
      { metric: '100%', description: 'METRC sync accuracy' },
    ],
    integrations: ['METRC', 'QuickBooks', 'NetSuite', 'Shopify'],
    color: 'cannabis-blue',
  },
]

const CANNABIS_ADDITIONAL_FEATURES = [
  {
    icon: Smartphone,
    title: 'Mobile Applications',
    description: 'Native mobile apps for iOS and Android with offline capabilities and real-time synchronization.',
  },
  {
    icon: Cloud,
    title: 'Cloud Infrastructure',
    description: 'Enterprise-grade cloud hosting with 99.9% uptime, automatic backups, and global CDN.',
  },
  {
    icon: Lock,
    title: 'Security & Privacy',
    description: 'Bank-level security with encryption, audit logs, and compliance with cannabis data regulations.',
  },
  {
    icon: RefreshCw,
    title: 'Automatic Updates',
    description: 'Seamless updates with new features, security patches, and regulatory changes.',
  },
  {
    icon: Bell,
    title: 'Smart Notifications',
    description: 'Intelligent alerts for compliance violations, inventory issues, and business insights.',
  },
  {
    icon: Settings,
    title: 'Customizable Workflows',
    description: 'Flexible configuration to match your unique cannabis business operations and processes.',
  },
]

const CANNABIS_INTEGRATIONS = [
  {
    category: 'State Tracking',
    integrations: [
      { name: 'METRC', logo: '/integrations/metrc-logo.svg', description: 'New Mexico, Colorado, California' },
      { name: 'BioTrack', logo: '/integrations/biotrack-logo.svg', description: 'Washington, Hawaii, Illinois' },
      { name: 'Leaf Data Systems', logo: '/integrations/leafdata-logo.svg', description: 'Washington State' },
    ],
  },
  {
    category: 'Payment Processing',
    integrations: [
      { name: 'Stripe', logo: '/integrations/stripe-logo.svg', description: 'Credit card processing' },
      { name: 'Square', logo: '/integrations/square-logo.svg', description: 'POS and payments' },
      { name: 'PayPal', logo: '/integrations/paypal-logo.svg', description: 'Online payments' },
    ],
  },
  {
    category: 'Accounting & Finance',
    integrations: [
      { name: 'QuickBooks', logo: '/integrations/quickbooks-logo.svg', description: 'Accounting integration' },
      { name: 'NetSuite', logo: '/integrations/netsuite-logo.svg', description: 'Enterprise ERP' },
      { name: 'Xero', logo: '/integrations/xero-logo.svg', description: 'Cloud accounting' },
    ],
  },
  {
    category: 'E-commerce & Marketing',
    integrations: [
      { name: 'Shopify', logo: '/integrations/shopify-logo.svg', description: 'E-commerce platform' },
      { name: 'Mailchimp', logo: '/integrations/mailchimp-logo.svg', description: 'Email marketing' },
      { name: 'Twilio', logo: '/integrations/twilio-logo.svg', description: 'SMS notifications' },
    ],
  },
]

const CANNABIS_PLATFORM_TESTIMONIALS: CannabisTestimonial[] = [
  {
    id: '1',
    name: 'David Rodriguez',
    title: 'Owner',
    company: 'High Desert Cannabis',
    state: 'New Mexico',
    image: '/testimonials/david-rodriguez.jpg',
    quote: 'CultivateCo\'s platform increased our operational efficiency by 60%. The compliance monitoring alone has saved us from multiple potential violations.',
    rating: 5,
    category: 'general',
    featured: true,
    verified: true,
    date: '2024-02-15',
  },
  {
    id: '2',
    name: 'Jennifer Kim',
    title: 'Operations Manager',
    company: 'Rocky Mountain Dispensary',
    state: 'Colorado',
    image: '/testimonials/jennifer-kim.jpg',
    quote: 'The analytics dashboard gives us insights we never had before. We\'ve optimized our inventory and increased profit margins by 25%.',
    rating: 5,
    category: 'analytics',
    featured: true,
    verified: true,
    date: '2024-01-22',
  },
  {
    id: '3',
    name: 'Marcus Thompson',
    title: 'Compliance Director',
    company: 'Golden State Cannabis',
    state: 'California',
    image: '/testimonials/marcus-thompson.jpg',
    quote: 'METRC integration is flawless. We process thousands of transactions monthly with zero compliance issues thanks to CultivateCo.',
    rating: 5,
    category: 'compliance',
    featured: true,
    verified: true,
    date: '2024-02-08',
  },
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
      staggerChildren: 0.15,
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
// CANNABIS PLATFORM PAGE SECTIONS
// ============================================================================

const CannabisPlatformHeroSection: React.FC = () => {
  const handleDemoClick = () => {
    trackCannabisEvent('cannabis_demo_request_click', {
      source: 'platform_hero',
      button_text: 'Get Free Demo'
    })
  }

  const handleVideoPlay = () => {
    trackCannabisEvent('cannabis_platform_video_play', {
      source: 'platform_hero',
      video_type: 'platform_overview'
    })
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cannabis-cream-50 to-white py-20 lg:py-32">
      {/* Cannabis Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-72 h-72 cannabis-gradient rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-cannabis-blue-500 rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Cannabis Platform Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainerVariants}
            className="space-y-8"
          >
            <motion.div variants={fadeInUpVariants} className="space-y-6">
              <div className="inline-flex items-center space-x-2 rounded-full bg-cannabis-green-100 px-4 py-2 text-sm font-medium text-cannabis-green-800">
                <Shield className="h-4 w-4" />
                <span>Complete Cannabis Compliance Platform</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Cannabis
                <span className="block text-cannabis-green-700">Platform</span>
                <span className="block">That Works</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                The only cannabis platform you need. POS system, compliance monitoring, 
                analytics, and inventory management built specifically for cannabis operations.
              </p>
            </motion.div>

            <motion.div variants={fadeInUpVariants} className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/demo"
                onClick={handleDemoClick}
                className="inline-flex items-center justify-center space-x-2 rounded-lg cannabis-gradient px-8 py-4 text-lg font-semibold text-white shadow-cannabis hover:shadow-cannabis-lg transition-all duration-200 hover:scale-105"
              >
                <span>Get Free Demo</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              
              <button
                onClick={handleVideoPlay}
                className="inline-flex items-center justify-center space-x-2 rounded-lg border-2 border-gray-300 px-8 py-4 text-lg font-semibold text-gray-700 hover:bg-gray-50 transition-all duration-200"
              >
                <Play className="h-5 w-5" />
                <span>Watch Demo</span>
              </button>
            </motion.div>

            {/* Cannabis Platform Stats */}
            <motion.div variants={fadeInUpVariants} className="pt-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {CANNABIS_PLATFORM_HERO_STATS.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <motion.div
                      key={stat.label}
                      variants={scaleInVariants}
                      className="text-center p-4 rounded-lg bg-white shadow-cannabis hover:shadow-cannabis-lg transition-all duration-300"
                    >
                      <Icon className="h-6 w-6 mx-auto mb-2 text-cannabis-green-600" />
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* Cannabis Platform Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/platform/cannabis-platform-overview.jpg"
                alt="CultivateCo Cannabis Platform Overview"
                width={600}
                height={400}
                className="w-full h-auto"
                priority
              />
              
              {/* Cannabis Platform Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cannabis-green-600/20 to-cannabis-blue-600/20" />
            </div>

            {/* Cannabis Feature Highlights */}
            <div className="absolute -top-4 -left-4 bg-white rounded-lg shadow-lg p-4 max-w-xs">
              <div className="flex items-center space-x-3">
                <div className="bg-cannabis-green-100 rounded-full p-2">
                  <Calculator className="h-4 w-4 text-cannabis-green-600" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">50M+ Transactions</div>
                  <div className="text-xs text-gray-600">Processed securely</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-4 max-w-xs">
              <div className="flex items-center space-x-3">
                <div className="bg-cannabis-blue-100 rounded-full p-2">
                  <Shield className="h-4 w-4 text-cannabis-blue-600" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">99.8% Compliant</div>
                  <div className="text-xs text-gray-600">Regulatory adherence</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const CannabisCoreFeatureSection: React.FC<{ feature: typeof CANNABIS_CORE_FEATURES[0], index: number }> = ({ 
  feature, 
  index 
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const Icon = feature.icon

  const handleFeatureClick = () => {
    trackCannabisEvent('cannabis_platform_feature_click', {
      feature_id: feature.id,
      feature_title: feature.title,
      section: 'core_features'
    })
  }

  return (
    <section ref={ref} className={cn("py-20 lg:py-32", index % 2 === 0 ? "bg-white" : "bg-cannabis-cream-50")}>
      <div className="container mx-auto px-4">
        <div className={cn("grid lg:grid-cols-2 gap-12 items-center", index % 2 === 1 && "lg:grid-flow-col-dense")}>
          {/* Cannabis Feature Content */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainerVariants}
            className={cn("space-y-8", index % 2 === 1 && "lg:col-start-2")}
          >
            <motion.div variants={fadeInUpVariants} className="space-y-6">
              <div className={cn(
                'inline-flex items-center space-x-2 rounded-full px-4 py-2 text-sm font-medium',
                feature.color === 'cannabis-green' 
                  ? 'bg-cannabis-green-100 text-cannabis-green-800'
                  : 'bg-cannabis-blue-100 text-cannabis-blue-800'
              )}>
                <Icon className="h-4 w-4" />
                <span>{feature.subtitle}</span>
              </div>
              
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900">
                {feature.title}
              </h2>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>

            {/* Cannabis Feature Benefits */}
            <motion.div variants={fadeInUpVariants} className="grid grid-cols-3 gap-4">
              {feature.benefits.map((benefit, benefitIndex) => (
                <div key={benefitIndex} className="text-center p-4 rounded-lg bg-white shadow-cannabis">
                  <div className={cn(
                    'text-2xl font-bold mb-1',
                    feature.color === 'cannabis-green' ? 'text-cannabis-green-600' : 'text-cannabis-blue-600'
                  )}>
                    {benefit.metric}
                  </div>
                  <div className="text-sm text-gray-600">{benefit.description}</div>
                </div>
              ))}
            </motion.div>

            {/* Cannabis Feature List */}
            <motion.div variants={fadeInUpVariants} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-3">
                {feature.features.map((featureItem, featureIndex) => (
                  <div key={featureIndex} className="flex items-start space-x-3">
                    <CheckCircle className={cn(
                      'h-5 w-5 mt-0.5 flex-shrink-0',
                      feature.color === 'cannabis-green' ? 'text-cannabis-green-500' : 'text-cannabis-blue-500'
                    )} />
                    <span className="text-gray-700 text-sm">{featureItem}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Cannabis Feature Integrations */}
            <motion.div variants={fadeInUpVariants} className="space-y-3">
              <div className="text-sm font-medium text-gray-700">Key Integrations:</div>
              <div className="flex flex-wrap gap-2">
                {feature.integrations.map((integration, integrationIndex) => (
                  <span
                    key={integrationIndex}
                    className={cn(
                      'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
                      feature.color === 'cannabis-green'
                        ? 'bg-cannabis-green-100 text-cannabis-green-800'
                        : 'bg-cannabis-blue-100 text-cannabis-blue-800'
                    )}
                  >
                    {integration}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeInUpVariants}>
              <button
                onClick={handleFeatureClick}
                className={cn(
                  'inline-flex items-center space-x-2 rounded-lg px-6 py-3 text-lg font-semibold transition-all duration-200 hover:scale-105',
                  feature.color === 'cannabis-green'
                    ? 'cannabis-gradient text-white shadow-cannabis hover:shadow-cannabis-lg'
                    : 'bg-cannabis-blue-600 hover:bg-cannabis-blue-700 text-white shadow-cannabis hover:shadow-cannabis-lg'
                )}
              >
                <span>Learn More</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </motion.div>
          </motion.div>

          {/* Cannabis Feature Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={cn("relative", index % 2 === 1 && "lg:col-start-1")}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={feature.image}
                alt={feature.title}
                width={600}
                height={400}
                className="w-full h-auto"
              />
              
              {/* Cannabis Feature Overlay */}
              <div className={cn(
                "absolute inset-0 bg-gradient-to-tr to-transparent",
                feature.color === 'cannabis-green' 
                  ? "from-cannabis-green-600/20" 
                  : "from-cannabis-blue-600/20"
              )} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const CannabisAdditionalFeaturesSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUpVariants}>
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Everything You Need
              <span className="block text-cannabis-green-400">In One Platform</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Beyond our core features, CultivateCo includes everything cannabis 
              operators need to run compliant, profitable businesses.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {CANNABIS_ADDITIONAL_FEATURES.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                variants={scaleInVariants}
                className="bg-gray-800 rounded-2xl p-8 hover:bg-gray-750 transition-all duration-300 hover:shadow-cannabis-lg"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-cannabis-green-100 rounded-xl p-3">
                    <Icon className="h-6 w-6 text-cannabis-green-600" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

const CannabisIntegrationsSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

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
              Seamless
              <span className="block text-cannabis-green-700">Integrations</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect CultivateCo with the cannabis industry tools and business 
              applications you already use. No disruption to your workflow.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
          className="space-y-12"
        >
          {CANNABIS_INTEGRATIONS.map((category, categoryIndex) => (
            <motion.div key={category.category} variants={fadeInUpVariants}>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                {category.category}
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                {category.integrations.map((integration, integrationIndex) => (
                  <motion.div
                    key={integration.name}
                    variants={scaleInVariants}
                    className="bg-white rounded-xl border border-gray-200 p-6 hover:border-cannabis-green-200 hover:shadow-cannabis transition-all duration-300 text-center"
                  >
                    <div className="h-16 w-16 mx-auto mb-4 relative">
                      <Image
                        src={integration.logo}
                        alt={`${integration.name} integration`}
                        width={64}
                        height={64}
                        className="object-contain"
                      />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{integration.name}</h4>
                    <p className="text-sm text-gray-600">{integration.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUpVariants}
          className="text-center mt-12"
        >
          <Link
            href="/integrations"
            className="inline-flex items-center space-x-2 rounded-lg border-2 border-cannabis-green-600 px-8 py-4 text-lg font-semibold text-cannabis-green-600 hover:bg-cannabis-green-50 transition-all duration-200"
          >
            <span>View All Integrations</span>
            <ExternalLink className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

const CannabisTestimonialsSection: React.FC = () => {
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
              Platform Success
              <span className="block text-cannabis-green-700">Stories</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how CultivateCo's platform is transforming cannabis operations 
              across legal states with measurable results and compliance success.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
          className="grid lg:grid-cols-3 gap-8"
        >
          {CANNABIS_PLATFORM_TESTIMONIALS.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={scaleInVariants}
              className="bg-white rounded-2xl p-8 shadow-cannabis hover:shadow-cannabis-lg transition-all duration-300"
            >
              <div className="space-y-6">
                {/* Cannabis Rating Stars */}
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>

                {/* Cannabis Testimonial Quote */}
                <blockquote className="text-gray-700 italic">
                  "{testimonial.quote}"
                </blockquote>

                {/* Cannabis Customer Info */}
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
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

const CannabisCTASection: React.FC = () => {
  const handleDemoClick = () => {
    trackCannabisEvent('cannabis_demo_request_click', {
      source: 'platform_cta',
      button_text: 'Start Free Trial'
    })
  }

  const handlePricingClick = () => {
    trackCannabisEvent('cannabis_pricing_click', {
      source: 'platform_cta',
      button_text: 'View Pricing'
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
              Ready to Transform Your
              <span className="block">Cannabis Operations?</span>
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Join thousands of cannabis operators who trust CultivateCo's platform 
              for compliance, growth, and operational excellence. Start your free trial today.
            </p>
          </motion.div>

          <motion.div variants={fadeInUpVariants} className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/demo"
              onClick={handleDemoClick}
              className="inline-flex items-center justify-center space-x-2 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-cannabis-green-700 hover:bg-cannabis-cream-50 transition-all duration-200 hover:scale-105"
            >
              <span>Start Free Trial</span>
              <Zap className="h-5 w-5" />
            </Link>
            
            <Link
              href="/pricing"
              onClick={handlePricingClick}
              className="inline-flex items-center justify-center space-x-2 rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold text-white hover:bg-white/10 transition-all duration-200"
            >
              <span>View Pricing</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>

          <motion.div variants={fadeInUpVariants} className="pt-8">
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm opacity-75">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>30-day free trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>No setup fees</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>Expert onboarding</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// MAIN CANNABIS PLATFORM PAGE COMPONENT
// ============================================================================

const CannabisPlatformPage: React.FC = () => {
  const seo: CannabisSEOData = {
    title: 'Cannabis Platform Features | POS, Compliance & Analytics | CultivateCo',
    description: 'Complete cannabis platform with POS system, compliance monitoring, analytics, and inventory management. Trusted by 2,500+ cannabis operators. Start your free trial today.',
    keywords: [
      'cannabis platform features',
      'cannabis pos system',
      'cannabis compliance monitoring',
      'cannabis analytics software',
      'cannabis inventory management',
      'dispensary management platform',
      'metrc integration',
      'cannabis business software',
      'dispensary pos software',
      'cannabis regulatory compliance',
    ],
    ogTitle: 'Complete Cannabis Platform | POS, Compliance & Analytics',
    ogDescription: 'Everything cannabis operators need in one platform: POS system, compliance monitoring, analytics, and inventory management with METRC integration.',
    ogImage: 'https://cultivateco.com/og-cannabis-platform-features.jpg',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'CultivateCo Cannabis Platform',
      description: 'Complete cannabis business management platform with POS, compliance, analytics, and inventory management.',
      brand: {
        '@type': 'Brand',
        name: 'CultivateCo',
      },
      offers: {
        '@type': 'Offer',
        description: '30-day free trial available',
        priceValidUntil: '2025-12-31',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: '847',
      },
    },
  }

  return (
    <CannabisLayout seo={seo}>
      <CannabisPlatformHeroSection />
      
      {CANNABIS_CORE_FEATURES.map((feature, index) => (
        <CannabisCoreFeatureSection 
          key={feature.id} 
          feature={feature} 
          index={index} 
        />
      ))}
      
      <CannabisAdditionalFeaturesSection />
      <CannabisIntegrationsSection />
      <CannabisTestimonialsSection />
      <CannabisCTASection />
    </CannabisLayout>
  )
}

export default CannabisPlatformPage
