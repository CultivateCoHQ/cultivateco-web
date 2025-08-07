/**
 * =============================================================================
 * CultivateCo Cannabis Compliance Features Page
 * =============================================================================
 * Comprehensive showcase of cannabis regulatory compliance and monitoring
 */

'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  Shield,
  AlertTriangle,
  CheckCircle,
  FileCheck,
  Clock,
  Bell,
  BarChart3,
  Eye,
  Database,
  Zap,
  Target,
  Award,
  TrendingUp,
  Users,
  Building2,
  MapPin,
  Calendar,
  Download,
  ExternalLink,
  Play,
  Star,
  RefreshCw,
  Lock,
  Smartphone,
  Globe,
  DollarSign,
} from 'lucide-react'

import { CannabisLayout } from '@/components/layout/CannabisLayout'
import { 
  cn, 
  trackCannabisEvent, 
  formatComplianceScore,
  formatCannabisRevenue,
} from '@/lib/cannabis-utils'
import type { 
  CannabisSEOData, 
  CannabisTestimonial,
  CannabisStateInfo,
} from '@/types/cannabis-marketing'

// === ADDED THIS LINE ===
import Calculator from '@/components/Calculator';
// =========================

// ============================================================================
// CANNABIS COMPLIANCE DATA
// ============================================================================

const CANNABIS_COMPLIANCE_STATS = [
  { label: 'Violations Prevented', value: '25,000+', icon: Shield },
  { label: 'Compliance Score Average', value: '99.8%', icon: Target },
  { label: 'METRC Integrations', value: '19 States', icon: Globe },
  { label: 'Real-time Monitoring', value: '24/7', icon: Eye },
]

const CANNABIS_COMPLIANCE_FEATURES = [
  {
    id: 'metrc-integration',
    icon: Database,
    title: 'METRC Integration',
    subtitle: 'Seamless State Tracking',
    description: 'Complete METRC integration with real-time synchronization, package tracking, and manifest management for all supported states.',
    image: '/compliance/metrc-integration-dashboard.jpg',
    features: [
      'Real-time METRC synchronization across 19+ states',
      'Automated package lifecycle tracking',
      'Transfer manifest generation and submission',
      'Lab result integration and compliance verification',
      'Waste tracking and disposal documentation',
      'License verification and renewal alerts',
      'Multi-state operation support',
      'Batch and lot traceability management',
    ],
    benefits: [
      { metric: '100%', description: 'METRC sync accuracy' },
      { metric: '50%', description: 'Faster reporting' },
      { metric: '0', description: 'Sync errors' },
    ],
    states: ['New Mexico', 'Colorado', 'California', 'Oregon', 'Nevada', 'Michigan'],
    color: 'cannabis-blue',
  },
  {
    id: 'violation-prevention',
    icon: Shield,
    title: 'AI-Powered Violation Prevention',
    subtitle: 'Proactive Compliance Monitoring',
    description: 'Advanced AI algorithms continuously monitor your operations to detect and prevent compliance violations before they occur.',
    image: '/compliance/violation-prevention-alerts.jpg',
    features: [
      'Machine learning violation pattern recognition',
      'Predictive compliance risk assessment',
      'Real-time business rule enforcement',
      'Automated purchase limit validation',
      'Business hours compliance monitoring',
      'License status verification',
      'Multi-tier alert system with escalation',
      'Historical violation analysis and trends',
    ],
    benefits: [
      { metric: '95%', description: 'Violation reduction' },
      { metric: '$25K', description: 'Avg. fine savings' },
      { metric: '2 min', description: 'Alert response time' },
    ],
    alertTypes: ['Critical', 'High Priority', 'Medium Risk', 'Low Risk'],
    color: 'cannabis-green',
  },
  {
    id: 'compliance-reporting',
    icon: FileCheck,
    title: 'Automated Compliance Reporting',
    subtitle: 'Effortless Regulatory Submissions',
    description: 'Generate and submit all required compliance reports automatically with state-specific formatting and regulatory requirements.',
    image: '/compliance/automated-reporting-system.jpg',
    features: [
      'Automated monthly and quarterly report generation',
      'State-specific compliance report formatting',
      'Direct regulatory agency submission integration',
      'Custom report builder for unique requirements',
      'Historical compliance data archiving',
      'Audit trail documentation and export',
      'Multi-jurisdiction reporting support',
      'Compliance certificate generation',
    ],
    benefits: [
      { metric: '80%', description: 'Time savings' },
      { metric: '100%', description: 'Report accuracy' },
      { metric: '24hrs', description: 'Submission turnaround' },
    ],
    reportTypes: ['Monthly Sales', 'Inventory Reports', 'Tax Filings', 'License Renewals'],
    color: 'cannabis-green',
  },
  {
    id: 'audit-trail',
    icon: Eye,
    title: 'Comprehensive Audit Trail',
    subtitle: 'Complete Activity Documentation',
    description: 'Maintain detailed audit trails of all cannabis operations with tamper-proof logging and regulatory-compliant documentation.',
    image: '/compliance/audit-trail-management.jpg',
    features: [
      'Immutable transaction logging and timestamping',
      'User activity tracking and authentication',
      'System change documentation and approval',
      'Regulatory inspection preparation tools',
      'Data integrity verification and validation',
      'Multi-user access control and permissions',
      'Compliance event correlation and analysis',
      'Long-term data retention and archiving',
    ],
    benefits: [
      { metric: '100%', description: 'Audit readiness' },
      { metric: '10 years', description: 'Data retention' },
      { metric: '5 min', description: 'Audit report generation' },
    ],
    auditCategories: ['Transactions', 'Inventory Changes', 'User Access', 'System Events'],
    color: 'cannabis-blue',
  },
]

const CANNABIS_COMPLIANCE_STATES = [
  {
    state: 'New Mexico',
    code: 'NM',
    status: 'Full Integration',
    complianceScore: 98,
    trackingSystem: 'METRC',
    features: ['Real-time sync', 'Automated reporting', 'License tracking'],
    launchDate: '2022-04-01',
  },
  {
    state: 'Colorado',
    code: 'CO',
    status: 'Full Integration', 
    complianceScore: 96,
    trackingSystem: 'METRC',
    features: ['Multi-license support', 'Advanced analytics', 'Tax integration'],
    launchDate: '2023-01-15',
  },
  {
    state: 'California',
    code: 'CA',
    status: 'Full Integration',
    complianceScore: 94,
    trackingSystem: 'METRC',
    features: ['Multi-jurisdiction', 'Complex regulations', 'Local compliance'],
    launchDate: '2023-03-01',
  },
  {
    state: 'Oregon',
    code: 'OR',
    status: 'Coming Soon',
    complianceScore: 0,
    trackingSystem: 'METRC',
    features: ['In development', 'Q2 2025 launch'],
    launchDate: '2025-06-01',
  },
]

const CANNABIS_COMPLIANCE_TESTIMONIALS: CannabisTestimonial[] = [
  {
    id: '1',
    name: 'Rachel Martinez',
    title: 'Compliance Director',
    company: 'Green Valley Cannabis Co.',
    state: 'Colorado',
    image: '/testimonials/rachel-martinez.jpg',
    quote: 'CultivateCo\'s compliance monitoring saved us from 12 potential violations in our first year. The AI-powered alerts are incredibly accurate and give us time to correct issues before they become problems.',
    rating: 5,
    category: 'compliance',
    featured: true,
    verified: true,
    date: '2024-01-18',
  },
  {
    id: '2',
    name: 'Michael Chen',
    title: 'Operations Manager', 
    company: 'Desert Bloom Dispensary',
    state: 'New Mexico',
    image: '/testimonials/michael-chen.jpg',
    quote: 'The METRC integration is flawless. We went from spending 20 hours a week on compliance reporting to just 2 hours. The automated reporting feature is a game-changer for our multi-location operation.',
    rating: 5,
    category: 'compliance',
    featured: true,
    verified: true,
    date: '2024-02-03',
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    title: 'CEO',
    company: 'Rocky Mountain Cannabis',
    state: 'Colorado',
    image: '/testimonials/sarah-johnson.jpg',
    quote: 'During our state inspection, the auditor was impressed with our audit trail documentation. CultivateCo\'s compliance system made the process effortless and we passed with flying colors.',
    rating: 5,
    category: 'compliance',
    featured: true,
    verified: true,
    date: '2024-01-25',
  },
]

const CANNABIS_COMPLIANCE_ROI = [
  {
    category: 'Violation Prevention',
    description: 'Average fine savings from prevented violations',
    savings: 25000,
    frequency: 'per violation',
    icon: Shield,
  },
  {
    category: 'Compliance Reporting',
    description: 'Time savings on manual reporting tasks',
    savings: 18000,
    frequency: 'per year',
    icon: FileCheck,
  },
  {
    category: 'License Protection',
    description: 'Avoided license suspension costs and lost revenue',
    savings: 150000,
    frequency: 'per incident',
    icon: Award,
  },
  {
    category: 'Audit Preparation',
    description: 'Reduced audit preparation time and legal fees',
    savings: 8000,
    frequency: 'per audit',
    icon: Eye,
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
// CANNABIS COMPLIANCE PAGE SECTIONS
// ============================================================================

const CannabisComplianceHeroSection: React.FC = () => {
  const handleDemoClick = () => {
    trackCannabisEvent('cannabis_compliance_demo_click', {
      source: 'compliance_hero',
      button_text: 'See Compliance Demo'
    })
  }

  const handleVideoPlay = () => {
    trackCannabisEvent('cannabis_compliance_video_play', {
      source: 'compliance_hero',
      video_type: 'compliance_overview'
    })
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cannabis-cream-50 to-white py-20 lg:py-32">
      {/* Cannabis Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 cannabis-gradient rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cannabis-blue-500 rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Cannabis Compliance Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainerVariants}
            className="space-y-8"
          >
            <motion.div variants={fadeInUpVariants} className="space-y-6">
              <div className="inline-flex items-center space-x-2 rounded-full bg-cannabis-green-100 px-4 py-2 text-sm font-medium text-cannabis-green-800">
                <Shield className="h-4 w-4" />
                <span>AI-Powered Cannabis Compliance</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Cannabis
                <span className="block text-cannabis-green-700">Compliance</span>
                <span className="block">Made Simple</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                Advanced AI-powered compliance monitoring with real-time METRC integration, 
                automated violation prevention, and comprehensive audit trails for cannabis operators.
              </p>
            </motion.div>

            <motion.div variants={fadeInUpVariants} className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/demo"
                onClick={handleDemoClick}
                className="inline-flex items-center justify-center space-x-2 rounded-lg cannabis-gradient px-8 py-4 text-lg font-semibold text-white shadow-cannabis hover:shadow-cannabis-lg transition-all duration-200 hover:scale-105"
              >
                <span>See Compliance Demo</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              
              <button
                onClick={handleVideoPlay}
                className="inline-flex items-center justify-center space-x-2 rounded-lg border-2 border-gray-300 px-8 py-4 text-lg font-semibold text-gray-700 hover:bg-gray-50 transition-all duration-200"
              >
                <Play className="h-5 w-5" />
                <span>Watch Video</span>
              </button>
            </motion.div>

            {/* Cannabis Compliance Stats */}
            <motion.div variants={fadeInUpVariants} className="pt-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {CANNABIS_COMPLIANCE_STATS.map((stat, index) => {
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

          {/* Cannabis Compliance Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/compliance/cannabis-compliance-dashboard.jpg"
                alt="CultivateCo Cannabis Compliance Dashboard"
                width={600}
                height={400}
                className="w-full h-auto"
                priority
              />
              
              {/* Cannabis Compliance Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cannabis-green-600/20 to-cannabis-blue-600/20" />
            </div>

            {/* Cannabis Compliance Highlights */}
            <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4 max-w-xs">
              <div className="flex items-center space-x-3">
                <div className="bg-cannabis-green-100 rounded-full p-2">
                  <CheckCircle className="h-4 w-4 text-cannabis-green-600" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">99.8% Compliant</div>
                  <div className="text-xs text-gray-600">Real-time monitoring</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4 max-w-xs">
              <div className="flex items-center space-x-3">
                <div className="bg-cannabis-blue-100 rounded-full p-2">
                  <AlertTriangle className="h-4 w-4 text-cannabis-blue-600" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">25K+ Violations</div>
                  <div className="text-xs text-gray-600">Prevented & avoided</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const CannabisComplianceFeatureSection: React.FC<{ 
  feature: typeof CANNABIS_COMPLIANCE_FEATURES[0], 
  index: number 
}> = ({ feature, index }) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const Icon = feature.icon

  const handleFeatureClick = () => {
    trackCannabisEvent('cannabis_compliance_feature_click', {
      feature_id: feature.id,
      feature_title: feature.title,
      section: 'compliance_features'
    })
  }

  return (
    <section 
      ref={ref} 
      className={cn("py-20 lg:py-32", index % 2 === 0 ? "bg-white" : "bg-cannabis-cream-50")}
    >
      <div className="container mx-auto px-4">
        <div className={cn("grid lg:grid-cols-2 gap-12 items-center", index % 2 === 1 && "lg:grid-flow-col-dense")}>
          {/* Cannabis Compliance Feature Content */}
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

            {/* Cannabis Compliance Benefits */}
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

            {/* Cannabis Compliance Features List */}
            <motion.div variants={fadeInUpVariants} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-3">
                {feature.features.slice(0, 6).map((featureItem, featureIndex) => (
                  <div key={featureIndex} className="flex items-start space-x-3">
                    <CheckCircle className={cn(
                      'h-5 w-5 mt-0.5 flex-shrink-0',
                      feature.color === 'cannabis-green' ? 'text-cannabis-green-500' : 'text-cannabis-blue-500'
                    )} />
                    <span className="text-gray-700 text-sm">{featureItem}</span>
                  </div>
                ))}
              </div>
              {feature.features.length > 6 && (
                <div className="text-sm text-gray-600">
                  + {feature.features.length - 6} more advanced features
                </div>
              )}
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
                <span>Explore {feature.title}</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </motion.div>
          </motion.div>

          {/* Cannabis Compliance Feature Image */}
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

const CannabisComplianceStatesSection: React.FC = () => {
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
              Multi-State Cannabis
              <span className="block text-cannabis-green-400">Compliance Coverage</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive compliance monitoring across legal cannabis states with 
              state-specific regulations and automated reporting.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {CANNABIS_COMPLIANCE_STATES.map((state, index) => {
            const complianceInfo = formatComplianceScore(state.complianceScore)
            return (
              <motion.div
                key={state.code}
                variants={scaleInVariants}
                className="bg-gray-800 rounded-2xl p-6 hover:bg-gray-750 transition-all duration-300 hover:shadow-cannabis-lg"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white">{state.state}</h3>
                    <span className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      state.status === 'Full Integration' 
                        ? "bg-cannabis-green-100 text-cannabis-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                    )}>
                      {state.status}
                    </span>
                  </div>

                  {state.complianceScore > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-300">Compliance Score</span>
                        <span className="font-bold" style={{ color: complianceInfo.color }}>
                          {complianceInfo.score}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${complianceInfo.score}%`,
                            backgroundColor: complianceInfo.color,
                          }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="text-sm text-gray-300">Tracking System:</div>
                    <div className="text-sm font-medium text-white">{state.trackingSystem}</div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm text-gray-300">Features:</div>
                    <div className="space-y-1">
                      {state.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2 text-sm">
                          <CheckCircle className="h-3 w-3 text-cannabis-green-400 flex-shrink-0" />
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {state.launchDate && (
                    <div className="text-xs text-gray-400">
                      {state.status === 'Coming Soon' ? 'Expected: ' : 'Available since: '}
                      {new Date(state.launchDate).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUpVariants}
          className="text-center"
        >
          <div className="bg-gray-800 rounded-2xl p-8 max-w-4xl mx-auto">
            <Globe className="h-12 w-12 text-cannabis-green-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">
              Your State Coming Soon?
            </h3>
            <p className="text-gray-300 mb-6">
              We're continuously adding new state integrations based on customer demand. 
              Contact us to request priority support for your state.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 rounded-lg cannabis-gradient px-8 py-3 text-white font-semibold hover:shadow-cannabis-lg transition-all duration-200"
            >
              <span>Request State Integration</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const CannabisComplianceTestimonialsSection: React.FC = () => {
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
              Compliance Success
              <span className="block text-cannabis-green-700">Stories</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how CultivateCo's compliance platform is helping cannabis operators 
              maintain perfect regulatory adherence across legal states.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
          className="grid lg:grid-cols-3 gap-8"
        >
          {CANNABIS_COMPLIANCE_TESTIMONIALS.map((testimonial) => (
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

                {/* Cannabis Compliance Testimonial */}
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

                {/* Cannabis Compliance Badge */}
                <div className="flex items-center space-x-2 text-sm text-cannabis-green-600">
                  <Shield className="h-4 w-4" />
                  <span>Compliance Success Story</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

const CannabisComplianceROISection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [calculatorResult, setCalculatorResult] = useState<number | null>(null);

  const totalPotentialSavings = CANNABIS_COMPLIANCE_ROI.reduce((sum, item) => sum + item.savings, 0)
  const formattedSavings = formatCannabisRevenue(totalPotentialSavings);
  
  return (
    <section ref={ref} className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* ROI Content */}
          <motion.div variants={fadeInUpVariants} className="space-y-6">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900">
              Calculate Your
              <span className="block text-cannabis-green-700">Compliance ROI</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Use our calculator to estimate your potential savings by preventing fines and
              streamlining reporting with our platform.
            </p>
            <motion.div variants={fadeInUpVariants} className="grid sm:grid-cols-2 gap-6">
              {CANNABIS_COMPLIANCE_ROI.map((item, index) => {
                const Icon = item.icon
                return (
                  <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-cannabis-cream-50">
                    <div className="flex-shrink-0 p-2 rounded-full bg-cannabis-green-100">
                      <Icon className="h-6 w-6 text-cannabis-green-600" />
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-gray-900">{item.category}</div>
                      <div className="text-sm text-gray-600">{item.description}</div>
                    </div>
                  </div>
                )
              })}
            </motion.div>
            <div className="bg-cannabis-green-100 rounded-lg p-6 flex items-center justify-between mt-8 shadow-cannabis">
              <div>
                <div className="text-sm text-gray-600 font-medium">Estimated Total Annual Savings</div>
                <div className="text-3xl font-bold text-cannabis-green-700">{formattedSavings}</div>
              </div>
              <DollarSign className="h-10 w-10 text-cannabis-green-600" />
            </div>
          </motion.div>

          {/* Calculator Component */}
          <motion.div
            variants={fadeInUpVariants}
            className="flex justify-center"
          >
            <Calculator />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}


export default function CompliancePage() {
  const seoData: CannabisSEOData = {
    title: 'Cannabis Compliance & METRC Integration | CultivateCo',
    description: 'Automate cannabis compliance with CultivateCo\'s AI-powered platform. Features include real-time METRC integration, violation prevention, and automated reporting.',
    ogImage: '/compliance/og-image.jpg',
  }

  return (
    <CannabisLayout seoData={seoData}>
      <CannabisComplianceHeroSection />
      {CANNABIS_COMPLIANCE_FEATURES.map((feature, index) => (
        <CannabisComplianceFeatureSection key={feature.id} feature={feature} index={index} />
      ))}
      <CannabisComplianceStatesSection />
      <CannabisComplianceROISection />
      <CannabisComplianceTestimonialsSection />
    </CannabisLayout>
  )
}
