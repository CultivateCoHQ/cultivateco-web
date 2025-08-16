import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { 
  Shield, FileCheck, AlertTriangle, CheckCircle, ArrowRight, Phone, Award,
  BarChart3, Users, Building2, Globe, Eye, UserCheck, Lock, RefreshCw,
  Bell, Activity, Target, TrendingUp, Clock, Database, Settings, Star,
  AlertCircle, Zap, Monitor, Network, Key, Layers, Server, FileText,
  Play, Download, ExternalLink, MapPin, Calendar, DollarSign
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

const CompliancePage: NextPage = () => {
  const [activeCompliance, setActiveCompliance] = useState('monitoring')
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const complianceStats = [
    { label: 'Violations Prevented', value: '25,000+', icon: Shield },
    { label: 'Compliance Score', value: '99.99%', icon: Award },
    { label: 'Multi-State Operators', value: '50+', icon: Building2 },
    { label: 'Real-Time Monitoring', value: '24/7', icon: Activity }
  ]

  const complianceFeatures = [
    {
      id: 'monitoring',
      icon: Eye,
      title: 'Real-Time Compliance Monitoring',
      subtitle: 'AI-Powered Violation Prevention',
      description: 'Pharmaceutical-grade compliance monitoring with predictive analytics, real-time alerts, and automated violation prevention across all cannabis operations.',
      image: '/compliance/enterprise-monitoring-dashboard.jpg',
      features: [
        'AI-powered predictive compliance analytics',
        'Real-time violation detection and prevention',
        'Automated regulatory change monitoring',
        'Cross-jurisdictional compliance tracking',
        'Continuous audit trail generation',
        'Intelligent risk assessment scoring',
        'Automated compliance reporting workflows',
        'Executive compliance dashboard and alerts'
      ],
      benefits: [
        { metric: '95%', description: 'Violation reduction' },
        { metric: '<5 min', description: 'Alert response time' },
        { metric: '24/7', description: 'Continuous monitoring' }
      ],
      riskMitigation: '$50,000 - $2M+ in potential fines prevented annually'
    },
    {
      id: 'validation',
      icon: FileCheck,
      title: 'Pharmaceutical-Grade Validation',
      subtitle: 'IQ/OQ/PQ Documentation & Change Control',
      description: 'Complete validation framework following pharmaceutical industry standards with installation, operational, and performance qualification documentation.',
      image: '/compliance/pharmaceutical-validation.jpg',
      features: [
        'Installation Qualification (IQ) documentation',
        'Operational Qualification (OQ) testing protocols',
        'Performance Qualification (PQ) validation',
        'Change control and deviation management',
        'ALCOA+ data integrity compliance',
        'Electronic signature and audit trails',
        'Validation master plan development',
        'Risk-based validation approaches'
      ],
      benefits: [
        { metric: '100%', description: 'Audit readiness' },
        { metric: 'FDA-Style', description: 'Validation protocols' },
        { metric: '21 CFR 11', description: 'Compliant records' }
      ],
      riskMitigation: 'Federal legalization and export readiness preparation'
    },
    {
      id: 'multistate',
      icon: Globe,
      title: 'Multi-State Compliance Management',
      subtitle: 'Unified Compliance Across Jurisdictions',
      description: 'Comprehensive multi-state compliance platform that manages regulatory requirements across all operating jurisdictions with unified reporting and control.',
      image: '/compliance/multistate-operations.jpg',
      features: [
        'State-specific regulatory framework mapping',
        'Automated compliance rule engine updates',
        'Cross-jurisdictional reporting capabilities',
        'Multi-state license management and tracking',
        'Unified audit trail across all locations',
        'Regulatory intelligence and change alerts',
        'Executive compliance reporting dashboards',
        'Standardized operating procedures (SOPs)'
      ],
      benefits: [
        { metric: '15+', description: 'States supported' },
        { metric: '80%', description: 'Efficiency improvement' },
        { metric: '1', description: 'Unified platform' }
      ],
      riskMitigation: 'Eliminates compliance gaps in multi-state operations'
    },
    {
      id: 'banking',
      icon: Lock,
      title: 'Banking & Financial Compliance',
      subtitle: 'BSA/AML Ready for Financial Partnerships',
      description: 'Advanced financial compliance framework designed for cannabis banking partnerships, institutional investors, and regulatory financial reporting.',
      image: '/compliance/banking-compliance.jpg',
      features: [
        'BSA/AML transaction monitoring integration',
        'Know Your Customer (KYC) verification workflows',
        'Suspicious Activity Report (SAR) automation',
        'Currency Transaction Report (CTR) generation',
        'Enhanced Due Diligence (EDD) procedures',
        'FinCEN compliance reporting automation',
        'Financial institution API integrations',
        'Institutional audit trail requirements'
      ],
      benefits: [
        { metric: '100%', description: 'Transaction monitoring' },
        { metric: '<2 hrs', description: 'Compliance response' },
        { metric: 'Bank-Ready', description: 'Partnership enabler' }
      ],
      riskMitigation: 'Enables banking relationships and institutional investment'
    }
  ]

  const complianceROI = [
    {
      category: 'Violation Prevention',
      annualSavings: '$750,000',
      description: 'Average savings from prevented regulatory violations and fines'
    },
    {
      category: 'Operational Efficiency',
      annualSavings: '$300,000',
      description: 'Reduced manual compliance work and audit preparation time'
    },
    {
      category: 'Banking Access',
      annualSavings: '$400,000',
      description: 'Reduced cash handling costs and improved financial operations'
    },
    {
      category: 'Investor Readiness',
      annualSavings: '$200,000',
      description: 'Faster due diligence and reduced legal/consulting fees'
    }
  ]

  const testimonials = [
    {
      name: 'Dr. Sarah Martinez',
      title: 'Chief Compliance Officer',
      company: 'Verde Holdings (12 States)',
      quote: 'CultivateCo\'s pharmaceutical-grade compliance approach eliminated our regulatory stress completely. We\'ve had zero violations across 12 states for 18 months straight.',
      avatar: '/testimonials/sarah-martinez.jpg',
      compliance_score: '100%',
      states: 12
    },
    {
      name: 'Marcus Thompson',
      title: 'VP of Regulatory Affairs',
      company: 'Golden State Cannabis',
      quote: 'The banking compliance features enabled our first institutional banking relationship. Our Series B investors were impressed with our compliance documentation.',
      avatar: '/testimonials/marcus-thompson.jpg',
      compliance_score: '99.8%',
      states: 3
    },
    {
      name: 'Jennifer Kim',
      title: 'Director of Operations',
      company: 'Rocky Mountain Dispensary',
      quote: 'Multi-state compliance used to require separate systems for each state. Now we have one unified platform that handles everything seamlessly.',
      avatar: '/testimonials/jennifer-kim.jpg',
      compliance_score: '99.9%',
      states: 5
    }
  ]

  // Animation variants
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

  const handleDemoClick = () => {
    trackCannabisEvent('cannabis_compliance_demo_click', {
      source: 'compliance_hero',
      button_text: 'Schedule Compliance Demo'
    })
  }

  const handleVideoPlay = () => {
    trackCannabisEvent('cannabis_compliance_video_play', {
      source: 'compliance_hero',
      video_type: 'compliance_overview'
    })
  }

  const seoData: CannabisSEOData = {
    title: 'Enterprise Cannabis Compliance | Pharmaceutical-Grade Validation | CultivateCo',
    description: 'Pharmaceutical-grade cannabis compliance with SOC 2 Type II certification, real-time monitoring, and banking compliance. Prevent $50K-$2M+ in regulatory fines.',
    ogImage: '/compliance/og-enterprise-compliance.jpg',
  }

  return (
    <CannabisLayout seoData={seoData}>
      <Head>
        <title>Enterprise Cannabis Compliance | Pharmaceutical-Grade Validation | CultivateCo</title>
        <meta name="description" content="Pharmaceutical-grade cannabis compliance with SOC 2 Type II certification, real-time monitoring, and banking compliance. Prevent $50K-$2M+ in regulatory fines." />
        <meta property="og:title" content="Enterprise Cannabis Compliance - CultivateCo" />
        <meta property="og:description" content="The only pharmaceutical-grade cannabis compliance platform. Real-time monitoring, multi-state management, and banking compliance." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-600 text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 rounded-full bg-white/10 backdrop-blur-sm px-6 py-3 text-sm font-medium border border-white/20">
                  <Shield className="h-4 w-4" />
                  <span>Pharmaceutical-Grade Cannabis Compliance</span>
                </div>
                
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Enterprise Cannabis
                  <span className="block text-cyan-200">Compliance Platform</span>
                </h1>
                
                <p className="text-xl lg:text-2xl text-white/90 leading-relaxed">
                  The only cannabis compliance platform built to pharmaceutical standards. Real-time monitoring, 
                  multi-state management, and banking compliance that prevents $50,000 - $2M+ in regulatory fines.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span>99.99% Compliance Score</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="h-5 w-5" />
                  <span>Real-Time Monitoring</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Lock className="h-5 w-5" />
                  <span>Banking Compliance Ready</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/demo" className="inline-flex items-center justify-center px-8 py-4 bg-white text-teal-700 font-semibold rounded-lg hover:bg-white/90 transition-colors">
                  Schedule Compliance Demo
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
                  Speak with Expert
                  <Phone className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8">
                <div className="grid grid-cols-2 gap-6">
                  {complianceStats.map((stat) => {
                    const Icon = stat.icon
                    return (
                      <div key={stat.label} className="text-center">
                        <Icon className="w-8 h-8 mx-auto mb-3 text-cyan-200" />
                        <div className="text-2xl font-bold text-white">{stat.value}</div>
                        <div className="text-sm text-white/80">{stat.label}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Mitigation Value */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              The True Cost of Cannabis Compliance Failures
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Basic cannabis software leaves enterprises exposed to massive regulatory, financial, and operational risks. 
              Pharmaceutical-grade compliance prevents these costly failures.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="text-center p-6 bg-red-50 rounded-xl border border-red-200">
              <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-red-600" />
              <div className="text-2xl font-bold text-red-600 mb-2">$2M+</div>
              <div className="text-gray-900 font-semibold mb-1">License Revocation</div>
              <div className="text-sm text-gray-600">Maximum regulatory penalty</div>
            </div>
            <div className="text-center p-6 bg-orange-50 rounded-xl border border-orange-200">
              <Building2 className="w-12 h-12 mx-auto mb-4 text-orange-600" />
              <div className="text-2xl font-bold text-orange-600 mb-2">$1M+</div>
              <div className="text-gray-900 font-semibold mb-1">Banking Loss</div>
              <div className="text-sm text-gray-600">Cash handling costs annually</div>
            </div>
            <div className="text-center p-6 bg-yellow-50 rounded-xl border border-yellow-200">
              <Clock className="w-12 h-12 mx-auto mb-4 text-yellow-600" />
              <div className="text-2xl font-bold text-yellow-600 mb-2">$500K+</div>
              <div className="text-gray-900 font-semibold mb-1">Manual Overhead</div>
              <div className="text-sm text-gray-600">Annual compliance labor costs</div>
            </div>
            <div className="text-center p-6 bg-teal-50 rounded-xl border border-teal-200">
              <Shield className="w-12 h-12 mx-auto mb-4 text-teal-600" />
              <div className="text-2xl font-bold text-teal-600 mb-2">$1.65M</div>
              <div className="text-gray-900 font-semibold mb-1">Total Protection</div>
              <div className="text-sm text-gray-600">Average annual risk mitigation</div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Compliance Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Pharmaceutical-Grade Compliance Capabilities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enterprise compliance features designed for multi-state operators, institutional investors, 
              and cannabis businesses demanding the highest regulatory standards.
            </p>
          </div>

          {/* Feature Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {complianceFeatures.map((feature) => {
              const Icon = feature.icon
              return (
                <button
                  key={feature.id}
                  onClick={() => setActiveCompliance(feature.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                    activeCompliance === feature.id
                      ? 'bg-teal-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{feature.title.split(' ')[0]} {feature.title.split(' ')[1]}</span>
                </button>
              )
            })}
          </div>

          {/* Active Feature Display */}
          {complianceFeatures.map((feature) => {
            if (feature.id !== activeCompliance) return null
            const Icon = feature.icon

            return (
              <div key={feature.id} className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                  <div className="space-y-6">
                    <div className="inline-flex items-center space-x-2 rounded-full bg-teal-100 px-4 py-2 text-sm font-medium text-teal-800">
                      <Icon className="h-4 w-4" />
                      <span>{feature.subtitle}</span>
                    </div>
                    
                    <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">
                      {feature.title}
                    </h3>
                    
                    <p className="text-xl text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {feature.benefits.map((benefit, index) => (
                      <div key={index} className="text-center p-4 rounded-lg bg-white shadow-sm">
                        <div className="text-2xl font-bold text-teal-600 mb-1">
                          {benefit.metric}
                        </div>
                        <div className="text-sm text-gray-600">{benefit.description}</div>
                      </div>
                    ))}
                  </div>

                  <div className="grid md:grid-cols-2 gap-3">
                    {feature.features.map((featureItem, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 mt-0.5 text-teal-500 flex-shrink-0" />
                        <span className="text-gray-700">{featureItem}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
                    <div className="flex items-start space-x-3">
                      <Shield className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-teal-900 mb-2">Risk Mitigation</h4>
                        <p className="text-teal-800">{feature.riskMitigation}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                    <div className="aspect-square bg-teal-50 rounded-lg flex items-center justify-center mb-6">
                      <Icon className="w-16 h-16 text-teal-600" />
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-gray-900">Enterprise Benefits</h4>
                      <div className="space-y-3">
                        {feature.benefits.map((benefit, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-gray-600">{benefit.description}</span>
                            <span className="font-semibold text-teal-600 text-lg">{benefit.metric}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Compliance ROI */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Enterprise Compliance ROI
            </h2>
            <p className="text-xl text-gray-600">
              Pharmaceutical-grade compliance delivers measurable returns through risk prevention and operational efficiency.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {complianceROI.map((roi) => (
              <div key={roi.category} className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="text-3xl font-bold text-teal-600 mb-2">{roi.annualSavings}</div>
                <div className="font-semibold text-gray-900 mb-2">{roi.category}</div>
                <div className="text-sm text-gray-600">{roi.description}</div>
              </div>
            ))}
          </div>

          <div className="text-center bg-teal-50 rounded-2xl p-8 border border-teal-200">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-teal-900 mb-4">
                Total Annual Risk Protection: $1.65M Average
              </h3>
              <p className="text-teal-800 mb-6">
                Enterprise cannabis operators using CultivateCo's pharmaceutical-grade compliance platform 
                protect an average of $1.65 million annually in regulatory, financial, and operational risks.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/demo" className="inline-flex items-center justify-center px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors">
                  Calculate Your ROI
                  <BarChart3 className="ml-2 w-4 h-4" />
                </Link>
                <Link href="/pricing" className="inline-flex items-center justify-center px-6 py-3 border-2 border-teal-600 text-teal-600 font-medium rounded-lg hover:bg-teal-50 transition-colors">
                  View Pricing Plans
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Risk Categories
            </h2>
            <p className="text-xl text-gray-600">
              Understanding the full spectrum of compliance risks facing enterprise cannabis operations.
            </p>
          </div>

          <div className="space-y-8">
            {riskCategories.map((category) => (
              <div key={category.category} className="bg-white rounded-2xl p-8 shadow-sm">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{category.category}</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.risks.map((risk, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-6 hover:border-teal-200 transition-colors">
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-900">{risk.risk}</h4>
                        <div className="text-2xl font-bold text-red-600">{risk.cost}</div>
                        <div className="text-sm text-gray-600">Potential annual cost</div>
                        <div className="flex items-center space-x-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-teal-500" />
                          <span className="text-teal-700 font-medium">{risk.prevention}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Compliance Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Enterprise cannabis leaders share their pharmaceutical-grade compliance results.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="bg-gray-50 rounded-xl p-8">
                <div className="space-y-6">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  <blockquote className="text-gray-700 italic">
                    "{testimonial.quote}"
                  </blockquote>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-teal-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.title}</div>
                      <div className="text-sm text-gray-600">{testimonial.company}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                    <div className="text-center">
                      <div className="text-xl font-bold text-teal-600">{testimonial.compliance_score}</div>
                      <div className="text-xs text-gray-600">Compliance Score</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-teal-600">{testimonial.states}</div>
                      <div className="text-xs text-gray-600">States Managed</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise CTA */}
      <section className="py-20 bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready for Pharmaceutical-Grade Cannabis Compliance?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Stop risking $50,000 - $2M+ in regulatory fines. Join enterprise cannabis operators who trust 
            pharmaceutical-grade compliance for their multi-state operations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/demo" className="inline-flex items-center justify-center px-8 py-4 bg-white text-teal-700 font-semibold rounded-lg hover:bg-white/90 transition-colors">
              Schedule Compliance Demo
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
              Speak with Compliance Expert
              <Phone className="ml-2 w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-cyan-200">99.99%</div>
              <div className="text-white/80">Compliance Score</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyan-200">25,000+</div>
              <div className="text-white/80">Violations Prevented</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyan-200">$1.65M</div>
              <div className="text-white/80">Average Risk Protection</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyan-200">15+</div>
              <div className="text-white/80">States Supported</div>
            </div>
          </div>
        </div>
      </section>
    </CannabisLayout>
  )
}

export default CompliancePage
