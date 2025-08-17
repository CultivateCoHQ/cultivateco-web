/**
 * =============================================================================
 * CultivateCo Enterprise Cannabis Compliance Page
 * =============================================================================
 * Pharmaceutical-grade cannabis compliance for enterprise operations
 */

'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Globe,
  Lock,
  Eye,
  FileText,
  TrendingUp,
  Users,
  Building2,
  Award,
  Clock,
  DollarSign,
  ArrowRight,
  Play,
  Star,
} from 'lucide-react'

import { CannabisLayout } from '@/components/layout/CannabisLayout'

// ============================================================================
// ENTERPRISE COMPLIANCE DATA
// ============================================================================

const ENTERPRISE_COMPLIANCE_FEATURES = [
  {
    icon: Eye,
    title: 'Real-Time Monitoring',
    description: 'AI-powered predictive analytics with 24/7 continuous monitoring and <5 minute alert response times.',
    benefits: ['95% violation reduction', 'Predictive compliance alerts', 'Real-time regulatory tracking'],
    riskMitigation: 'Prevents $50K-$500K in regulatory fines'
  },
  {
    icon: Shield,
    title: 'Pharmaceutical Validation',
    description: 'IQ/OQ/PQ documentation framework with FDA-style protocols and change control management.',
    benefits: ['Complete audit trails', 'Validation documentation', 'Change control workflows'],
    riskMitigation: 'Supports $500K-$5M license protection'
  },
  {
    icon: Globe,
    title: 'Multi-State Management',
    description: 'Unified platform across 15+ states with 80% efficiency improvement and centralized reporting.',
    benefits: ['Cross-jurisdictional compliance', 'Unified reporting', 'State-specific automation'],
    riskMitigation: 'Eliminates $50K-$200K compliance overhead'
  },
  {
    icon: Lock,
    title: 'Banking Compliance',
    description: 'BSA/AML ready with KYC verification, transaction monitoring, and FinCEN reporting automation.',
    benefits: ['Real-time transaction monitoring', 'Automated compliance reporting', 'Banking partnership ready'],
    riskMitigation: 'Enables $200K-$2M banking relationships'
  },
]

const COMPLIANCE_STATS = [
  { label: 'Compliance Violations Prevented', value: '10K+', icon: Shield },
  { label: 'Average Annual Risk Protection', value: '$1.65M', icon: DollarSign },
  { label: 'Multi-State Operators Protected', value: '50+', icon: Globe },
  { label: 'Regulatory Updates Tracked', value: '500+', icon: TrendingUp },
]

const RISK_CATEGORIES = [
  {
    category: 'Regulatory Violations',
    description: 'License revocation, operating violations, and compliance failures',
    averageCost: '$500K - $5M',
    frequency: 'High',
    mitigation: 'Real-time monitoring and predictive alerts'
  },
  {
    category: 'Financial Penalties',
    description: 'Regulatory fines, tax penalties, and compliance-related costs',
    averageCost: '$50K - $2M',
    frequency: 'Medium',
    mitigation: 'Automated reporting and audit trail management'
  },
  {
    category: 'Operational Disruption',
    description: 'Business interruption, system failures, and process inefficiencies',
    averageCost: '$25K - $500K',
    frequency: 'Medium',
    mitigation: '99.99% uptime SLA and enterprise infrastructure'
  },
  {
    category: 'Banking Restrictions',
    description: 'Loss of banking services, cash handling costs, and payment limitations',
    averageCost: '$100K - $1M',
    frequency: 'High',
    mitigation: 'BSA/AML compliance and banking partnership support'
  },
]

const ENTERPRISE_TESTIMONIALS = [
  {
    id: '1',
    name: 'Dr. Sarah Martinez',
    title: 'Chief Compliance Officer',
    company: 'Verde Holdings (12 States)',
    quote: 'CultivateCo transformed our multi-state compliance from constant crisis management to predictive prevention. We\'ve eliminated 95% of our violation risks.',
    rating: 5,
    savings: '$2.5M annual risk reduction'
  },
  {
    id: '2',
    name: 'Michael Chen',
    title: 'CEO',
    company: 'Pacific Cannabis Group',
    quote: 'The pharmaceutical-grade validation was crucial for our Series B. Our institutional investors required SOC 2 certification and got complete confidence.',
    rating: 5,
    savings: '$50M funding round completed'
  },
  {
    id: '3',
    name: 'Jennifer Kim',
    title: 'VP Regulatory Affairs',
    company: 'Rocky Mountain Cannabis',
    quote: 'Banking partnerships became possible once we demonstrated pharmaceutical-grade compliance. CultivateCo made the impossible achievable.',
    rating: 5,
    savings: '$1.2M banking relationship established'
  },
]

// ============================================================================
// COMPLIANCE PAGE SECTIONS
// ============================================================================

const ComplianceHeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-600 text-white py-20 lg:py-32">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
              }
            }
          }}
          className="text-center max-w-4xl mx-auto space-y-8"
        >
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 60 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.6, ease: 'easeOut' }
              }
            }}
            className="space-y-6"
          >
            <div className="inline-flex items-center space-x-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium">
              <Shield className="h-4 w-4" />
              <span>Enterprise Cannabis Compliance</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Pharmaceutical-Grade
              <span className="block text-cyan-200">Cannabis Compliance</span>
            </h1>
            
            <p className="text-xl opacity-90 leading-relaxed max-w-3xl mx-auto">
              Prevent $50K-$2M+ in regulatory fines with enterprise compliance designed for multi-state operators. 
              SOC 2 Type II certified platform with pharmaceutical validation and banking compliance.
            </p>
          </motion.div>

          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 60 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.6, ease: 'easeOut' }
              }
            }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {COMPLIANCE_STATS.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="text-center">
                  <Icon className="h-8 w-8 mx-auto mb-3 opacity-75" />
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="text-sm opacity-75">{stat.label}</div>
                </div>
              )
            })}
          </motion.div>

          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 60 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.6, ease: 'easeOut' }
              }
            }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/demo"
              className="inline-flex items-center space-x-2 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-teal-600 hover:bg-gray-50 transition-colors"
            >
              <span>Enterprise Consultation</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            <Link
              href="/platform"
              className="inline-flex items-center space-x-2 rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold text-white hover:bg-white/10 transition-colors"
            >
              <span>Platform Demo</span>
              <Play className="w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

const ComplianceFeaturesSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
              }
            }
          }}
          className="text-center mb-16"
        >
          <motion.div variants={{
            hidden: { opacity: 0, y: 60 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.6, ease: 'easeOut' }
            }
          }}>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              Enterprise Compliance
              <span className="block text-teal-700">Capabilities</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive pharmaceutical-grade compliance platform designed for multi-state operators 
              requiring institutional investor confidence and banking partnerships.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
              }
            }
          }}
          className="grid lg:grid-cols-2 gap-8"
        >
          {ENTERPRISE_COMPLIANCE_FEATURES.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { 
                    opacity: 1, 
                    scale: 1,
                    transition: { duration: 0.5, ease: 'easeOut' }
                  }
                }}
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
              >
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-teal-100 rounded-lg p-3">
                      <Icon className="h-6 w-6 text-teal-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                  </div>

                  <p className="text-gray-600">{feature.description}</p>

                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Key Benefits:</h4>
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center space-x-2 text-sm text-gray-700">
                          <CheckCircle className="h-4 w-4 text-teal-500 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <DollarSign className="h-4 w-4 text-teal-600" />
                      <span className="font-medium text-teal-900">Risk Mitigation Value</span>
                    </div>
                    <p className="text-sm text-teal-800">{feature.riskMitigation}</p>
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

const RiskAnalysisSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
              }
            }
          }}
          className="text-center mb-16"
        >
          <motion.div variants={{
            hidden: { opacity: 0, y: 60 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.6, ease: 'easeOut' }
            }
          }}>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              Cannabis Compliance
              <span className="block text-teal-700">Risk Analysis</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding and mitigating the financial risks of cannabis compliance failures 
              through pharmaceutical-grade prevention strategies.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
              }
            }
          }}
          className="grid md:grid-cols-2 gap-8"
        >
          {RISK_CATEGORIES.map((risk, index) => (
            <motion.div
              key={risk.category}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.5, ease: 'easeOut' }
                }
              }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">{risk.category}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    risk.frequency === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {risk.frequency} Risk
                  </span>
                </div>

                <p className="text-gray-600 text-sm">{risk.description}</p>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Average Cost:</span>
                    <span className="text-lg font-bold text-red-600">{risk.averageCost}</span>
                  </div>

                  <div className="bg-teal-50 rounded-lg p-3 border border-teal-200">
                    <div className="flex items-center space-x-2 mb-1">
                      <Shield className="h-4 w-4 text-teal-600" />
                      <span className="font-medium text-teal-900 text-sm">CultivateCo Mitigation:</span>
                    </div>
                    <p className="text-sm text-teal-800">{risk.mitigation}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.6, ease: 'easeOut', delay: 0.6 }
            }
          }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-br from-teal-600 to-cyan-600 text-white rounded-2xl p-8">
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <Award className="h-8 w-8" />
                <h3 className="text-2xl font-bold">Total Risk Protection Value</h3>
              </div>
              <div className="text-4xl font-bold">$1.65M</div>
              <p className="text-xl opacity-90">Average Annual Risk Mitigation per Enterprise Client</p>
              <p className="text-sm opacity-75">
                Based on analysis of 50+ multi-state operators using pharmaceutical-grade compliance
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const EnterpriseTestimonialsSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
              }
            }
          }}
          className="text-center mb-16"
        >
          <motion.div variants={{
            hidden: { opacity: 0, y: 60 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.6, ease: 'easeOut' }
            }
          }}>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              Enterprise Compliance
              <span className="block text-teal-700">Success Stories</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              C-level executives share how pharmaceutical-grade compliance transformed their multi-state operations 
              and enabled institutional investment.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
              }
            }
          }}
          className="grid lg:grid-cols-3 gap-8"
        >
          {ENTERPRISE_TESTIMONIALS.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { 
                  opacity: 1, 
                  scale: 1,
                  transition: { duration: 0.5, ease: 'easeOut' }
                }
              }}
              className="bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
            >
              <div className="space-y-6">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                <blockquote className="text-gray-700 italic">
                  "{testimonial.quote}"
                </blockquote>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.title}</div>
                      <div className="text-sm text-gray-600">{testimonial.company}</div>
                    </div>
                  </div>

                  <div className="bg-teal-50 rounded-lg p-3 border border-teal-200">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-teal-600" />
                      <span className="font-medium text-teal-900 text-sm">Business Impact:</span>
                    </div>
                    <p className="text-sm text-teal-800 font-semibold">{testimonial.savings}</p>
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

// ============================================================================
// MAIN COMPLIANCE PAGE COMPONENT
// ============================================================================

const CompliancePage: React.FC = () => {
  return (
    <CannabisLayout seo={{
      title: 'Enterprise Cannabis Compliance | Pharmaceutical-Grade Platform | CultivateCo',
      description: 'Prevent $50K-$2M+ in regulatory fines with pharmaceutical-grade cannabis compliance. SOC 2 Type II certified platform for multi-state operators.',
      keywords: [
        'enterprise cannabis compliance',
        'pharmaceutical-grade cannabis compliance',
        'multi-state cannabis compliance platform',
        'cannabis regulatory compliance software',
        'SOC 2 cannabis compliance',
        'cannabis banking compliance',
        'institutional cannabis compliance',
        'cannabis compliance automation',
        'pharmaceutical validation cannabis',
        'enterprise cannabis risk management',
      ],
      ogTitle: 'Enterprise Cannabis Compliance | CultivateCo',
      ogDescription: 'Pharmaceutical-grade compliance platform preventing $50K-$2M+ in regulatory fines. SOC 2 certified for multi-state cannabis operations.',
      ogImage: 'https://cultivateco.com/og-cannabis-compliance.jpg',
    }}>
      <ComplianceHeroSection />
      <ComplianceFeaturesSection />
      <RiskAnalysisSection />
      <EnterpriseTestimonialsSection />
    </CannabisLayout>
  )
}

export default CompliancePage
