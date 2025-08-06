/**
 * =============================================================================
 * CultivateCo Cannabis Pricing Page
 * =============================================================================
 * Comprehensive pricing plans for cannabis operators with ROI calculator
 */

'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight,
  Shield,
  Calculator,
  BarChart3,
  CheckCircle,
  X,
  Zap,
  Building2,
  Users,
  TrendingUp,
  Star,
  HelpCircle,
  Plus,
  Minus,
  Phone,
  Award,
  Clock,
  Target,
  Smartphone,
  Cloud,
  Database,
  FileCheck,
} from 'lucide-react'

import { CannabisLayout } from '@/components/layout/CannabisLayout'
import { 
  cn, 
  trackCannabisEvent, 
  formatCannabisRevenue,
} from '@/lib/cannabis-utils'
import type { CannabisSEOData } from '@/types/cannabis-marketing'

// ============================================================================
// CANNABIS PRICING DATA
// ============================================================================

interface CannabisPricingPlan {
  id: string
  name: string
  description: string
  price: {
    monthly: number
    annual: number
    setup?: number
  }
  badge?: string
  badgeColor?: string
  popular?: boolean
  features: {
    category: string
    items: Array<{
      name: string
      included: boolean
      limit?: string
    }>
  }[]
  limits: {
    transactions?: string
    locations?: string
    users?: string
    storage?: string
  }
  support: string
  implementation: string
}

const CANNABIS_PRICING_PLANS: CannabisPricingPlan[] = [
  {
    id: 'starter',
    name: 'Cannabis Starter',
    description: 'Perfect for new cannabis businesses and single-location operations',
    price: {
      monthly: 299,
      annual: 2990, // ~17% discount
      setup: 500,
    },
    features: [
      {
        category: 'Cannabis POS System',
        items: [
          { name: 'Basic POS Interface', included: true },
          { name: 'Tax Calculation (State & Local)', included: true },
          { name: 'Age Verification', included: true },
          { name: 'Purchase Limit Enforcement', included: true },
          { name: 'Receipt Printing', included: true },
          { name: 'Payment Processing', included: true },
          { name: 'Basic Reporting', included: true },
          { name: 'Mobile POS', included: false },
        ],
      },
      {
        category: 'Cannabis Compliance',
        items: [
          { name: 'METRC Integration', included: true },
          { name: 'Basic Compliance Monitoring', included: true },
          { name: 'License Tracking', included: true },
          { name: 'Business Hours Enforcement', included: true },
          { name: 'Basic Audit Trail', included: true },
          { name: 'AI-Powered Violation Detection', included: false },
          { name: 'Advanced Compliance Alerts', included: false },
          { name: 'Automated Reporting', included: false },
        ],
      },
      {
        category: 'Cannabis Analytics',
        items: [
          { name: 'Basic Sales Reports', included: true },
          { name: 'Inventory Reports', included: true },
          { name: 'Tax Reports', included: true },
          { name: 'Custom Dashboards', included: false },
          { name: 'Advanced Analytics', included: false },
          { name: 'Forecasting', included: false },
          { name: 'Customer Analytics', included: false },
        ],
      },
      {
        category: 'Support & Training',
        items: [
          { name: 'Email Support', included: true },
          { name: 'Knowledge Base', included: true },
          { name: 'Video Training', included: true },
          { name: 'Phone Support', included: false },
          { name: 'Priority Support', included: false },
          { name: 'Dedicated Account Manager', included: false },
        ],
      },
    ],
    limits: {
      transactions: 'Up to 5K/month',
      locations: '1 location',
      users: 'Up to 5 users',
      storage: '10GB',
    },
    support: 'Email & Chat Support',
    implementation: '2-week setup',
  },
  {
    id: 'professional',
    name: 'Cannabis Professional',
    description: 'Complete cannabis platform for growing dispensaries and multi-location operators',
    price: {
      monthly: 599,
      annual: 5990, // ~17% discount
      setup: 1000,
    },
    badge: 'Most Popular',
    badgeColor: 'cannabis-green',
    popular: true,
    features: [
      {
        category: 'Cannabis POS System',
        items: [
          { name: 'Advanced POS Interface', included: true },
          { name: 'Tax Calculation (State & Local)', included: true },
          { name: 'Age Verification & ID Scanning', included: true },
          { name: 'Purchase Limit Enforcement', included: true },
          { name: 'Receipt Printing & Email', included: true },
          { name: 'Payment Processing', included: true },
          { name: 'Advanced Reporting', included: true },
          { name: 'Mobile POS', included: true },
        ],
      },
      {
        category: 'Cannabis Compliance',
        items: [
          { name: 'METRC Integration', included: true },
          { name: 'Real-time Compliance Monitoring', included: true },
          { name: 'License Tracking & Renewal Alerts', included: true },
          { name: 'Business Hours Enforcement', included: true },
          { name: 'Comprehensive Audit Trail', included: true },
          { name: 'AI-Powered Violation Detection', included: true },
          { name: 'Advanced Compliance Alerts', included: true },
          { name: 'Automated Reporting', included: true },
        ],
      },
      {
        category: 'Cannabis Analytics',
        items: [
          { name: 'Advanced Sales Analytics', included: true },
          { name: 'Inventory Optimization', included: true },
          { name: 'Tax & Financial Reports', included: true },
          { name: 'Custom Dashboards', included: true },
          { name: 'Predictive Analytics', included: true },
          { name: 'Sales Forecasting', included: true },
          { name: 'Customer Analytics', included: true },
        ],
      },
      {
        category: 'Support & Training',
        items: [
          { name: 'Email & Chat Support', included: true },
          { name: 'Knowledge Base', included: true },
          { name: 'Video Training Library', included: true },
          { name: 'Phone Support', included: true },
          { name: 'Priority Support Queue', included: true },
          { name: 'Dedicated Account Manager', included: false },
        ],
      },
    ],
    limits: {
      transactions: 'Up to 25K/month',
      locations: 'Up to 3 locations',
      users: 'Up to 15 users',
      storage: '100GB',
    },
    support: 'Phone, Email & Priority Support',
    implementation: '1-week setup',
  },
  {
    id: 'enterprise',
    name: 'Cannabis Enterprise',
    description: 'Full-scale cannabis platform for large operations and multi-state businesses',
    price: {
      monthly: 1299,
      annual: 12990, // ~17% discount
      setup: 2500,
    },
    badge: 'Best Value',
    badgeColor: 'cannabis-blue',
    features: [
      {
        category: 'Cannabis POS System',
        items: [
          { name: 'Enterprise POS Suite', included: true },
          { name: 'Multi-State Tax Calculation', included: true },
          { name: 'Advanced ID Scanning & Verification', included: true },
          { name: 'Dynamic Purchase Limit Management', included: true },
          { name: 'Branded Receipt & Email Templates', included: true },
          { name: 'Multi-Payment Processing', included: true },
          { name: 'Executive Reporting Suite', included: true },
          { name: 'Mobile POS & Tablet Support', included: true },
        ],
      },
      {
        category: 'Cannabis Compliance',
        items: [
          { name: 'Multi-State METRC Integration', included: true },
          { name: 'Enterprise Compliance Monitoring', included: true },
          { name: 'Multi-License Management', included: true },
          { name: 'Advanced Business Rules Engine', included: true },
          { name: 'Enterprise Audit Trail', included: true },
          { name: 'AI-Powered Risk Assessment', included: true },
          { name: 'Real-time Compliance Alerts', included: true },
          { name: 'Automated Multi-State Reporting', included: true },
        ],
      },
      {
        category: 'Cannabis Analytics',
        items: [
          { name: 'Enterprise Analytics Suite', included: true },
          { name: 'Multi-Location Inventory Optimization', included: true },
          { name: 'Advanced Financial Reporting', included: true },
          { name: 'Executive Dashboards', included: true },
          { name: 'AI-Powered Business Intelligence', included: true },
          { name: 'Advanced Forecasting & Planning', included: true },
          { name: 'Customer Lifetime Value Analytics', included: true },
        ],
      },
      {
        category: 'Support & Training',
        items: [
          { name: '24/7 Priority Support', included: true },
          { name: 'Dedicated Knowledge Base', included: true },
          { name: 'Custom Training Programs', included: true },
          { name: 'Priority Phone Support', included: true },
          { name: 'White-Glove Onboarding', included: true },
          { name: 'Dedicated Account Manager', included: true },
        ],
      },
    ],
    limits: {
      transactions: 'Unlimited',
      locations: 'Unlimited',
      users: 'Unlimited',
      storage: '1TB+',
    },
    support: '24/7 Dedicated Support + Account Manager',
    implementation: '3-day priority setup',
  },
]

const CANNABIS_PRICING_FAQ = [
  {
    question: 'Is there a free trial available?',
    answer: 'Yes! We offer a 30-day free trial with full access to all features in your chosen plan. No credit card required to start.',
  },
  {
    question: 'Can I switch plans as my cannabis business grows?',
    answer: 'Absolutely. You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate any billing differences.',
  },
  {
    question: 'What states do you support for METRC integration?',
    answer: 'We currently support METRC integration in 19+ states including New Mexico, Colorado, California, and more. We\'re constantly adding new state integrations.',
  },
  {
    question: 'Is my cannabis business data secure?',
    answer: 'Yes. We use bank-level encryption, SOC 2 compliance, and cannabis industry security standards. Your data is protected with multiple layers of security.',
  },
  {
    question: 'Do you offer custom pricing for large cannabis operations?',
    answer: 'Yes. For cannabis businesses with 10+ locations or unique requirements, we offer custom enterprise pricing. Contact our sales team for a quote.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, ACH transfers, and wire transfers. All payments are processed securely with cannabis industry compliance.',
  },
  {
    question: 'How long does implementation take?',
    answer: 'Implementation varies by plan: Starter (2 weeks), Professional (1 week), Enterprise (3 days priority). We handle all setup and data migration.',
  },
  {
    question: 'Do you provide training for my cannabis staff?',
    answer: 'Yes. All plans include comprehensive training materials, video tutorials, and live training sessions to ensure your team is fully prepared.',
  },
]

const CANNABIS_ROI_METRICS = [
  {
    metric: 'Compliance Violations Prevented',
    value: '95%',
    description: 'Average reduction in regulatory violations',
    savings: '$25,000',
  },
  {
    metric: 'Time Saved on Reporting',
    value: '80%',
    description: 'Less time spent on manual compliance reporting',
    savings: '$15,000',
  },
  {
    metric: 'Inventory Optimization',
    value: '25%',
    description: 'Improvement in inventory turnover',
    savings: '$30,000',
  },
  {
    metric: 'Transaction Processing Speed',
    value: '40%',
    description: 'Faster customer checkout times',
    savings: '$20,000',
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
// CANNABIS PRICING COMPONENTS
// ============================================================================

const CannabisPricingToggle: React.FC<{
  billing: 'monthly' | 'annual'
  setBilling: (billing: 'monthly' | 'annual') => void
}> = ({ billing, setBilling }) => {
  return (
    <div className="flex items-center justify-center space-x-4">
      <span className={cn('text-sm font-medium', billing === 'monthly' ? 'text-gray-900' : 'text-gray-500')}>
        Monthly
      </span>
      
      <button
        onClick={() => setBilling(billing === 'monthly' ? 'annual' : 'monthly')}
        className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cannabis-green-500 focus:ring-offset-2 cannabis-gradient"
        role="switch"
        aria-checked={billing === 'annual'}
      >
        <span
          className={cn(
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
            billing === 'annual' ? 'translate-x-5' : 'translate-x-0'
          )}
        />
      </button>
      
      <span className={cn('text-sm font-medium', billing === 'annual' ? 'text-gray-900' : 'text-gray-500')}>
        Annual
        <span className="ml-1 text-cannabis-green-600 font-semibold">(Save 17%)</span>
      </span>
    </div>
  )
}

const CannabisPricingCard: React.FC<{
  plan: CannabisPricingPlan
  billing: 'monthly' | 'annual'
  onSelectPlan: (planId: string) => void
}> = ({ plan, billing, onSelectPlan }) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  
  const price = billing === 'monthly' ? plan.price.monthly : Math.floor(plan.price.annual / 12)
  const annualPrice = plan.price.annual
  const setupFee = plan.price.setup || 0

  const handleSelectPlan = () => {
    onSelectPlan(plan.id)
    trackCannabisEvent('cannabis_pricing_plan_selected', {
      plan_id: plan.id,
      plan_name: plan.name,
      billing: billing,
      monthly_price: price,
      annual_price: annualPrice,
    })
  }

  return (
    <motion.div
      variants={scaleInVariants}
      className={cn(
        'relative bg-white rounded-2xl shadow-cannabis hover:shadow-cannabis-lg transition-all duration-300 border-2',
        plan.popular ? 'border-cannabis-green-500 scale-105' : 'border-gray-200'
      )}
    >
      {/* Cannabis Plan Badge */}
      {plan.badge && (
        <div className={cn(
          'absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold text-white',
          plan.badgeColor === 'cannabis-green' ? 'cannabis-gradient' : 'bg-cannabis-blue-600'
        )}>
          {plan.badge}
        </div>
      )}

      <div className="p-8 space-y-6">
        {/* Cannabis Plan Header */}
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
          <p className="text-gray-600">{plan.description}</p>
        </div>

        {/* Cannabis Pricing */}
        <div className="text-center space-y-2">
          <div className="space-y-1">
            <div className="text-4xl font-bold text-gray-900">
              ${price.toLocaleString()}
              <span className="text-lg font-medium text-gray-600">/month</span>
            </div>
            {billing === 'annual' && (
              <div className="text-sm text-gray-500">
                Billed annually (${annualPrice.toLocaleString()})
              </div>
            )}
            {setupFee > 0 && (
              <div className="text-sm text-gray-500">
                + ${setupFee.toLocaleString()} setup fee
              </div>
            )}
          </div>
        </div>

        {/* Cannabis Plan Limits */}
        <div className="bg-cannabis-cream-50 rounded-lg p-4 space-y-2">
          <div className="text-sm font-medium text-gray-700 mb-2">Plan Includes:</div>
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
            <div>📊 {plan.limits.transactions}</div>
            <div>🏢 {plan.limits.locations}</div>
            <div>👥 {plan.limits.users}</div>
            <div>💾 {plan.limits.storage}</div>
          </div>
        </div>

        {/* Cannabis Select Plan Button */}
        <button
          onClick={handleSelectPlan}
          className={cn(
            'w-full inline-flex items-center justify-center space-x-2 rounded-lg px-6 py-3 text-lg font-semibold transition-all duration-200 hover:scale-105',
            plan.popular
              ? 'cannabis-gradient text-white shadow-cannabis hover:shadow-cannabis-lg'
              : 'border-2 border-cannabis-green-600 text-cannabis-green-600 hover:bg-cannabis-green-50'
          )}
        >
          <span>Start {plan.name}</span>
          <ArrowRight className="h-5 w-5" />
        </button>

        {/* Cannabis Features Preview */}
        <div className="space-y-3">
          {plan.features.slice(0, 2).map((category) => (
            <div key={category.category}>
              <button
                onClick={() => setExpandedCategory(
                  expandedCategory === category.category ? null : category.category
                )}
                className="flex items-center justify-between w-full text-left"
              >
                <span className="text-sm font-medium text-gray-700">{category.category}</span>
                {expandedCategory === category.category ? (
                  <Minus className="h-4 w-4 text-gray-400" />
                ) : (
                  <Plus className="h-4 w-4 text-gray-400" />
                )}
              </button>
              
              {expandedCategory === category.category && (
                <div className="mt-2 space-y-1">
                  {category.items.slice(0, 6).map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      {feature.included ? (
                        <CheckCircle className="h-3 w-3 text-cannabis-green-500 flex-shrink-0" />
                      ) : (
                        <X className="h-3 w-3 text-gray-300 flex-shrink-0" />
                      )}
                      <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                        {feature.name}
                        {feature.limit && (
                          <span className="text-xs text-gray-500"> ({feature.limit})</span>
                        )}
                      </span>
                    </div>
                  ))}
                  {category.items.length > 6 && (
                    <div className="text-xs text-gray-500">
                      +{category.items.length - 6} more features
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Cannabis Support Info */}
        <div className="pt-4 border-t border-gray-200 space-y-2">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Phone className="h-4 w-4 text-cannabis-green-500" />
            <span>{plan.support}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="h-4 w-4 text-cannabis-green-500" />
            <span>{plan.implementation}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const CannabisROICalculator: React.FC = () => {
  const [monthlyRevenue, setMonthlyRevenue] = useState(250000)
  const [violations, setViolations] = useState(2)
  const [reportingHours, setReportingHours] = useState(20)
  
  const calculateSavings = () => {
    // Violation prevention savings ($12,500 per violation prevented)
    const violationSavings = violations * 12500
    
    // Time savings (20 hours at $75/hour average)
    const timeSavings = reportingHours * 75 * 12 // Annual
    
    // Inventory optimization (2.5% of revenue)
    const inventorySavings = (monthlyRevenue * 12) * 0.025
    
    // Transaction efficiency (1% revenue increase from faster checkout)
    const efficiencySavings = (monthlyRevenue * 12) * 0.01
    
    const totalSavings = violationSavings + timeSavings + inventorySavings + efficiencySavings
    
    return {
      violations: violationSavings,
      time: timeSavings,
      inventory: inventorySavings,
      efficiency: efficiencySavings,
      total: totalSavings,
    }
  }

  const savings = calculateSavings()
  
  return (
    <div className="bg-white rounded-2xl shadow-cannabis p-8 space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold text-gray-900">Cannabis ROI Calculator</h3>
        <p className="text-gray-600">
          See how much CultivateCo can save your cannabis business
        </p>
      </div>

      {/* Calculator Inputs */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Monthly Revenue: ${monthlyRevenue.toLocaleString()}
          </label>
          <input
            type="range"
            min="50000"
            max="1000000"
            step="25000"
            value={monthlyRevenue}
            onChange={(e) => setMonthlyRevenue(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer cannabis-gradient"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>$50K</span>
            <span>$1M+</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Compliance Violations per Year: {violations}
          </label>
          <input
            type="range"
            min="0"
            max="10"
            step="1"
            value={violations}
            onChange={(e) => setViolations(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer cannabis-gradient"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0</span>
            <span>10+</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hours/Month on Compliance Reporting: {reportingHours}
          </label>
          <input
            type="range"
            min="5"
            max="80"
            step="5"
            value={reportingHours}
            onChange={(e) => setReportingHours(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer cannabis-gradient"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>5 hrs</span>
            <span>80+ hrs</span>
          </div>
        </div>
      </div>

      {/* ROI Results */}
      <div className="bg-cannabis-green-50 rounded-lg p-6 space-y-4">
        <h4 className="text-lg font-semibold text-cannabis-green-900">
          Annual Savings Breakdown
        </h4>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-cannabis-green-800">Violation Prevention</span>
            <span className="font-semibold text-cannabis-green-900">
              {formatCannabisRevenue(savings.violations)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-cannabis-green-800">Time Savings</span>
            <span className="font-semibold text-cannabis-green-900">
              {formatCannabisRevenue(savings.time)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-cannabis-green-800">Inventory Optimization</span>
            <span className="font-semibold text-cannabis-green-900">
              {formatCannabisRevenue(savings.inventory)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-cannabis-green-800">Efficiency Gains</span>
            <span className="font-semibold text-cannabis-green-900">
              {formatCannabisRevenue(savings.efficiency)}
            </span>
          </div>
          
          <div className="pt-3 border-t border-cannabis-green-200">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-cannabis-green-900">Total Annual Savings</span>
              <span className="text-2xl font-bold text-cannabis-green-700">
                {formatCannabisRevenue(savings.total)}
              </span>
            </div>
          </div>
        </div>

        <div className="text-center pt-4">
          <div className="text-sm text-cannabis-green-800 mb-2">
            ROI with Professional Plan (${CANNABIS_PRICING_PLANS[1].price.annual}/year):
          </div>
          <div className="text-3xl font-bold text-cannabis-green-700">
            {Math.round((savings.total / CANNABIS_PRICING_PLANS[1].price.annual) * 100)}% ROI
          </div>
        </div>
      </div>
    </div>
  )
}

const CannabisFAQSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-cannabis-cream-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={fadeInUpVariants} className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              Cannabis Pricing
              <span className="block text-cannabis-green-700">Questions</span>
            </h2>
            <p className="text-xl text-gray-600">
              Get answers to common questions about CultivateCo pricing and plans
            </p>
          </motion.div>

          <motion.div variants={staggerContainerVariants} className="space-y-4">
            {CANNABIS_PRICING_FAQ.map((faq, index) => (
              <motion.div
                key={index}
                variants={fadeInUpVariants}
                className="bg-white rounded-lg shadow-cannabis"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                  {openFaq === index ? (
                    <Minus className="h-5 w-5 text-cannabis-green-600" />
                  ) : (
                    <Plus className="h-5 w-5 text-cannabis-green-600" />
                  )}
                </button>
                
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeInUpVariants} className="text-center mt-12">
            <div className="bg-white rounded-2xl shadow-cannabis p-8 space-y-4">
              <HelpCircle className="h-12 w-12 text-cannabis-green-600 mx-auto" />
              <h3 className="text-xl font-bold text-gray-900">Still have questions?</h3>
              <p className="text-gray-600">
                Our cannabis experts are here to help you choose the right plan for your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/demo"
                  className="inline-flex items-center space-x-2 rounded-lg cannabis-gradient px-6 py-3 text-white font-semibold hover:shadow-cannabis-lg transition-all duration-200"
                >
                  <span>Book Demo</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center space-x-2 rounded-lg border-2 border-cannabis-green-600 px-6 py-3 text-cannabis-green-600 font-semibold hover:bg-cannabis-green-50 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call Sales</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// MAIN CANNABIS PRICING PAGE SECTIONS
// ============================================================================

const CannabisPricingHeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cannabis-cream-50 to-white py-20 lg:py-32">
      <div className="container relative mx-auto px-4 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainerVariants}
          className="max-w-4xl mx-auto space-y-8"
        >
          <motion.div variants={fadeInUpVariants} className="space-y-6">
            <div className="inline-flex items-center space-x-2 rounded-full bg-cannabis-green-100 px-4 py-2 text-sm font-medium text-cannabis-green-800">
              <Star className="h-4 w-4" />
              <span>Transparent Cannabis Pricing</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Cannabis Platform
              <span className="block text-cannabis-green-700">Pricing</span>
              <span className="block">That Scales</span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              Choose the perfect cannabis compliance platform for your business. All plans include 
              METRC integration, compliance monitoring, and our expert support team.
            </p>
          </motion.div>

          <motion.div variants={fadeInUpVariants} className="grid md:grid-cols-4 gap-6">
            {CANNABIS_ROI_METRICS.map((metric) => (
              <div key={metric.metric} className="text-center p-4 bg-white rounded-lg shadow-cannabis">
                <div className="text-2xl font-bold text-cannabis-green-600">{metric.value}</div>
                <div className="text-sm font-medium text-gray-900">{metric.metric}</div>
                <div className="text-xs text-gray-600 mt-1">{metric.description}</div>
                <div className="text-sm font-semibold text-cannabis-green-700 mt-2">
                  Avg. {metric.savings}/year savings
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeInUpVariants} className="flex items-center justify-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-cannabis-green-500" />
              <span>30-day free trial</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-cannabis-green-500" />
              <span>No setup fees</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-cannabis-green-500" />
              <span>Cancel anytime</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

const CannabisPricingSection: React.FC = () => {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('annual')
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const handleSelectPlan = (planId: string) => {
    // Redirect to demo page with plan selection
    window.location.href = `/demo?plan=${planId}&billing=${billing}`
  }

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
          className="space-y-16"
        >
          {/* Billing Toggle */}
          <motion.div variants={fadeInUpVariants} className="text-center">
            <CannabisPricingToggle billing={billing} setBilling={setBilling} />
          </motion.div>

          {/* Pricing Cards */}
          <motion.div
            variants={staggerContainerVariants}
            className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          >
            {CANNABIS_PRICING_PLANS.map((plan) => (
              <CannabisPricingCard
                key={plan.id}
                plan={plan}
                billing={billing}
                onSelectPlan={handleSelectPlan}
              />
            ))}
          </motion.div>

          {/* Enterprise Note */}
          <motion.div variants={fadeInUpVariants} className="text-center">
            <div className="bg-cannabis-cream-50 rounded-2xl p-8 max-w-4xl mx-auto">
              <Building2 className="h-12 w-12 text-cannabis-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Need Custom Cannabis Solutions?
              </h3>
              <p className="text-gray-600 mb-6">
                For cannabis businesses with 10+ locations, unique compliance requirements, 
                or custom integration needs, we offer tailored enterprise solutions.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center space-x-2 rounded-lg cannabis-gradient px-8 py-3 text-white font-semibold hover:shadow-cannabis-lg transition-all duration-200"
              >
                <Phone className="h-5 w-5" />
                <span>Contact Enterprise Sales</span>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

const CannabisROISection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* ROI Content */}
          <motion.div variants={fadeInUpVariants} className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900">
                Calculate Your
                <span className="block text-cannabis-green-700">Cannabis ROI</span>
              </h2>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                See exactly how much CultivateCo can save your cannabis business. 
                Our customers typically see 300%+ ROI in their first year.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {CANNABIS_ROI_METRICS.map((metric) => (
                <div key={metric.metric} className="space-y-2">
                  <div className="text-3xl font-bold text-cannabis-green-600">{metric.value}</div>
                  <div className="text-sm font-medium text-gray-900">{metric.metric}</div>
                  <div className="text-xs text-gray-600">{metric.description}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/demo"
                className="inline-flex items-center justify-center space-x-2 rounded-lg cannabis-gradient px-6 py-3 text-white font-semibold hover:shadow-cannabis-lg transition-all duration-200"
              >
                <Target className="h-5 w-5" />
                <span>Get ROI Analysis</span>
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex items-center justify-center space-x-2 rounded-lg border-2 border-cannabis-green-600 px-6 py-3 text-cannabis-green-600 font-semibold hover:bg-cannabis-green-50 transition-colors"
              >
                <Award className="h-5 w-5" />
                <span>View Success Stories</span>
              </Link>
            </div>
          </motion.div>

          {/* ROI Calculator */}
          <motion.div variants={scaleInVariants}>
            <CannabisROICalculator />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// MAIN CANNABIS PRICING PAGE COMPONENT
// ============================================================================

const CannabisPricingPage: React.FC = () => {
  const seo: CannabisSEOData = {
    title: 'Cannabis Software Pricing | CultivateCo Platform Plans | Transparent Pricing',
    description: 'Transparent cannabis software pricing starting at $299/month. All plans include METRC integration, compliance monitoring, and POS system. 30-day free trial available.',
    keywords: [
      'cannabis software pricing',
      'dispensary software cost',
      'cannabis compliance pricing',
      'cannabis pos pricing',
      'metrc integration cost',
      'dispensary management pricing',
      'cannabis platform pricing',
      'cannabis software plans',
      'dispensary pos cost',
      'cannabis compliance cost',
    ],
    ogTitle: 'Cannabis Software Pricing | Plans Starting at $299/month',
    ogDescription: 'Transparent cannabis platform pricing with METRC integration, compliance monitoring, and POS system. See pricing plans and calculate your ROI.',
    ogImage: 'https://cultivateco.com/og-cannabis-pricing-plans.jpg',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'CultivateCo Cannabis Platform',
      description: 'Complete cannabis business management platform with transparent pricing',
      offers: [
        {
          '@type': 'Offer',
          name: 'Cannabis Starter',
          price: '299',
          priceCurrency: 'USD',
          description: 'Perfect for new cannabis businesses and single-location operations',
        },
        {
          '@type': 'Offer',
          name: 'Cannabis Professional',
          price: '599',
          priceCurrency: 'USD',
          description: 'Complete cannabis platform for growing dispensaries',
        },
        {
          '@type': 'Offer',
          name: 'Cannabis Enterprise',
          price: '1299',
          priceCurrency: 'USD',
          description: 'Full-scale platform for large operations and multi-state businesses',
        },
      ],
    },
  }

  return (
    <CannabisLayout seo={seo}>
      <CannabisPricingHeroSection />
      <CannabisPricingSection />
      <CannabisROISection />
      <CannabisFAQSection />
    </CannabisLayout>
  )
}

export default CannabisPricingPage
