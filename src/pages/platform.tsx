import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useState, useRef } from 'react'
import { 
  Shield, Activity, BarChart3, Building2, Users, Phone, CheckCircle, ArrowRight, Star,
  Lock, Database, Cloud, RefreshCw, Bell, Settings, Award, Target, TrendingUp,
  FileCheck, Zap, Monitor, Smartphone, Globe, CreditCard, Calendar, Mail,
  AlertTriangle, Layers, Network, Server, Eye, UserCheck, Key, Wifi
} from 'lucide-react'
import CannabisLayout from '../components/layout/CannabisLayout'

const PlatformPage: NextPage = () => {
  const [activeFeature, setActiveFeature] = useState('security')

  const enterpriseStats = [
    { label: 'Multi-State Operators', value: '50+', icon: Building2 },
    { label: 'Compliance Score', value: '99.99%', icon: Shield },
    { label: 'Uptime SLA', value: '99.99%', icon: Activity },
    { label: 'Annual Transactions', value: '$5B+', icon: TrendingUp }
  ]

  const coreFeatures = [
    {
      id: 'security',
      icon: Shield,
      title: 'Enterprise Security Architecture',
      subtitle: 'SOC 2 Type II Certified Platform',
      description: 'Pharmaceutical-grade security infrastructure with enterprise access controls, complete audit trails, and institutional-level data protection.',
      image: '/platform/enterprise-security-dashboard.jpg',
      features: [
        'SOC 2 Type II certification and compliance',
        'End-to-end encryption for all data transmission',
        'Role-based access control with granular permissions',
        'Complete audit trail logging and retention',
        'Multi-factor authentication enforcement',
        'Advanced threat detection and prevention',
        'HIPAA-compliant data handling procedures',
        'Banking-grade infrastructure security'
      ],
      benefits: [
        { metric: '100%', description: 'Audit compliance' },
        { metric: '256-bit', description: 'Encryption standard' },
        { metric: '24/7', description: 'Security monitoring' }
      ],
      color: 'teal'
    },
    {
      id: 'reliability',
      icon: Activity,
      title: 'Guaranteed Reliability & Performance',
      subtitle: '99.99% Uptime SLA with Financial Penalties',
      description: 'Enterprise infrastructure designed for mission-critical cannabis operations with guaranteed uptime and automatic failover systems.',
      image: '/platform/enterprise-infrastructure.jpg',
      features: [
        '99.99% uptime SLA with financial penalties',
        'Automatic failover and disaster recovery',
        'Global CDN for optimal performance',
        'Real-time system monitoring and alerts',
        'Predictive scaling and load balancing',
        'Zero-downtime maintenance windows',
        'Performance optimization and tuning',
        '24/7 infrastructure monitoring'
      ],
      benefits: [
        { metric: '53 min', description: 'Max downtime/year' },
        { metric: '<200ms', description: 'Response time' },
        { metric: '99.99%', description: 'Data availability' }
      ],
      color: 'cyan'
    },
    {
      id: 'banking',
      icon: CreditCard,
      title: 'Banking & Financial Compliance',
      subtitle: 'BSA/AML Ready for Financial Partnerships',
      description: 'Advanced financial compliance tools designed for cannabis banking partnerships and institutional investor requirements.',
      image: '/platform/banking-compliance-tools.jpg',
      features: [
        'BSA/AML transaction monitoring integration',
        'Real-time suspicious activity detection',
        'Automated compliance reporting to FinCEN',
        'Know Your Customer (KYC) verification',
        'Enhanced due diligence workflows',
        'Currency transaction report automation',
        'Financial institution API integrations',
        'Institutional audit trail generation'
      ],
      benefits: [
        { metric: '100%', description: 'Transaction monitoring' },
        { metric: '<5 min', description: 'Alert response time' },
        { metric: '99.9%', description: 'Accuracy rate' }
      ],
      color: 'blue'
    },
    {
      id: 'multistate',
      icon: Globe,
      title: 'Multi-State Operations Platform',
      subtitle: 'Unified Management Across Jurisdictions',
      description: 'Comprehensive platform for managing cannabis operations across multiple states with unified reporting and compliance management.',
      image: '/platform/multistate-operations.jpg',
      features: [
        'Unified dashboard for all locations',
        'State-specific compliance automation',
        'Cross-jurisdictional reporting capabilities',
        'Centralized inventory management',
        'Multi-state license tracking',
        'Automated regulatory update management',
        'Consolidated financial reporting',
        'Executive-level analytics and insights'
      ],
      benefits: [
        { metric: '15+', description: 'States supported' },
        { metric: '80%', description: 'Operational efficiency gain' },
        { metric: '1', description: 'Unified platform' }
      ],
      color: 'emerald'
    }
  ]

  const enterpriseFeatures = [
    {
      icon: Database,
      title: 'Enterprise Data Management',
      description: 'Pharmaceutical-grade data handling with complete lineage tracking and validation protocols.'
    },
    {
      icon: Cloud,
      title: 'Cloud Infrastructure',
      description: 'AWS GovCloud hosting with enterprise security, compliance, and disaster recovery capabilities.'
    },
    {
      icon: RefreshCw,
      title: 'Automated Compliance Updates',
      description: 'Real-time regulatory changes automatically integrated across all jurisdictions and operations.'
    },
    {
      icon: Bell,
      title: 'Intelligent Alert System',
      description: 'Predictive compliance alerts and risk assessment notifications for proactive management.'
    },
    {
      icon: Settings,
      title: 'Custom Workflow Engine',
      description: 'Configurable business processes designed for enterprise cannabis operations and compliance.'
    },
    {
      icon: Award,
      title: 'Validation & Certification',
      description: 'Pharmaceutical-style validation processes with IQ/OQ/PQ documentation and change control.'
    }
  ]

  const integrationCategories = [
    {
      category: 'Enterprise Infrastructure',
      integrations: [
        { name: 'AWS GovCloud', description: 'Government-compliant cloud hosting' },
        { name: 'Microsoft 365', description: 'Enterprise collaboration suite' },
        { name: 'DocuSign', description: 'Enterprise digital signatures' }
      ]
    },
    {
      category: 'Financial & Banking',
      integrations: [
        { name: 'QuickBooks Enterprise', description: 'Advanced accounting integration' },
        { name: 'Salesforce', description: 'Enterprise CRM platform' },
        { name: 'NetSuite', description: 'Enterprise resource planning' }
      ]
    },
    {
      category: 'Compliance & Regulatory',
      integrations: [
        { name: 'METRC', description: 'State tracking systems' },
        { name: 'BioTrack', description: 'Multi-state compliance' },
        { name: 'Regulatory APIs', description: 'Direct government connections' }
      ]
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Martinez',
      title: 'Chief Compliance Officer',
      company: 'Verde Holdings',
      quote: 'CultivateCo\'s pharmaceutical-grade approach transformed our multi-state compliance process. We went from constant regulatory stress to complete confidence across 12 states.',
      image: '/testimonials/sarah-martinez.jpg',
      state: '12 States'
    },
    {
      name: 'Michael Chen',
      title: 'CEO',
      company: 'Pacific Cannabis Group',
      quote: 'The SOC 2 certification was crucial for our institutional investors. CultivateCo\'s enterprise-grade security gave them confidence in our $50M Series B.',
      image: '/testimonials/michael-chen.jpg',
      state: 'California'
    },
    {
      name: 'Lisa Thompson',
      title: 'COO',
      company: 'Rocky Mountain Cannabis',
      quote: '99.99% uptime SLA means we never lose revenue to system failures. The guaranteed reliability is worth every penny for our 24/7 operations.',
      image: '/testimonials/lisa-thompson.jpg',
      state: 'Colorado'
    }
  ]

  return (
    <CannabisLayout>
      <Head>
        <title>Pharmaceutical-Grade Cannabis Platform | Enterprise Compliance | CultivateCo</title>
        <meta name="description" content="Enterprise cannabis platform with SOC 2 Type II certification, 99.99% uptime SLA, and banking compliance. Built for multi-state operators and institutional investors." />
        <meta property="og:title" content="Pharmaceutical-Grade Cannabis Platform - CultivateCo" />
        <meta property="og:description" content="The only cannabis platform built to pharmaceutical standards. Enterprise security, guaranteed reliability, and banking-ready compliance." />
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
                  <Award className="h-4 w-4" />
                  <span>Pharmaceutical-Grade Cannabis Platform</span>
                </div>
                
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Enterprise Cannabis
                  <span className="block text-cyan-200">Compliance Platform</span>
                </h1>
                
                <p className="text-xl lg:text-2xl text-white/90 leading-relaxed">
                  The only cannabis platform built to pharmaceutical standards. SOC 2 Type II certified 
                  with 99.99% uptime SLA, banking compliance, and enterprise security for multi-state operations.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>SOC 2 Type II Certified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>99.99% Uptime SLA</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Banking Compliance Ready</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/demo" className="inline-flex items-center justify-center px-8 py-4 bg-white text-teal-700 font-semibold rounded-lg hover:bg-white/90 transition-colors">
                  Schedule Enterprise Demo
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
                  {enterpriseStats.map((stat) => {
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

      {/* Core Enterprise Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Enterprise Cannabis Platform Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Pharmaceutical-grade capabilities designed for multi-state operators, institutional investors, 
              and enterprise cannabis operations demanding the highest standards.
            </p>
          </div>

          {/* Feature Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {coreFeatures.map((feature) => {
              const Icon = feature.icon
              return (
                <button
                  key={feature.id}
                  onClick={() => setActiveFeature(feature.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                    activeFeature === feature.id
                      ? 'bg-teal-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{feature.title.split(' ')[0]} {feature.title.split(' ')[1]}</span>
                </button>
              )
            })}
          </div>

          {/* Active Feature Display */}
          {coreFeatures.map((feature) => {
            if (feature.id !== activeFeature) return null
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
                      <div key={index} className="text-center p-4 rounded-lg bg-gray-50">
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
                </div>

                <div className="relative">
                  <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-8 border border-teal-100">
                    <div className="aspect-video bg-white rounded-lg shadow-lg flex items-center justify-center">
                      <Icon className="w-16 h-16 text-teal-600" />
                    </div>
                    <div className="mt-6 space-y-4">
                      <h4 className="text-lg font-semibold text-gray-900">Key Benefits</h4>
                      <div className="space-y-2">
                        {feature.benefits.map((benefit, index) => (
                          <div key={index} className="flex justify-between">
                            <span className="text-gray-600">{benefit.description}:</span>
                            <span className="font-semibold text-teal-600">{benefit.metric}</span>
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

      {/* Additional Enterprise Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Complete Enterprise Solution
            </h2>
            <p className="text-xl text-gray-600">
              Beyond core compliance features, our platform includes everything enterprise cannabis operations demand.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {enterpriseFeatures.map((feature) => {
              const Icon = feature.icon
              return (
                <div key={feature.title} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="bg-teal-100 rounded-xl p-3">
                      <Icon className="h-6 w-6 text-teal-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Enterprise Integrations */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Enterprise-Grade Integrations
            </h2>
            <p className="text-xl text-gray-600">
              Connect with the enterprise tools and services your multi-state operation requires.
            </p>
          </div>

          <div className="space-y-12">
            {integrationCategories.map((category) => (
              <div key={category.category}>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                  {category.category}
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {category.integrations.map((integration) => (
                    <div key={integration.name} className="bg-gray-50 rounded-xl p-6 text-center hover:bg-gray-100 transition-colors">
                      <div className="w-16 h-16 bg-teal-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                        <Globe className="w-8 h-8 text-teal-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">{integration.name}</h4>
                      <p className="text-sm text-gray-600">{integration.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">Need a custom integration for your enterprise operation?</p>
            <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors">
              Request Custom Integration
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Enterprise Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Enterprise Cannabis Leaders
            </h2>
            <p className="text-xl text-gray-600">
              See how pharmaceutical-grade compliance is transforming cannabis operations.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="bg-white rounded-xl p-8 shadow-sm">
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
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.title}</div>
                      <div className="text-sm text-gray-600">{testimonial.company}</div>
                      <div className="text-sm text-teal-600 font-medium">{testimonial.state}</div>
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
            Join the enterprise cannabis operators who demand pharmaceutical standards for their compliance platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/demo" className="inline-flex items-center justify-center px-8 py-4 bg-white text-teal-700 font-semibold rounded-lg hover:bg-white/90 transition-colors">
              Schedule Enterprise Demo
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link href="/pricing" className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
              View Enterprise Pricing
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-cyan-200">SOC 2</div>
              <div className="text-white/80">Type II Certified</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyan-200">99.99%</div>
              <div className="text-white/80">Uptime SLA</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyan-200">50+</div>
              <div className="text-white/80">Enterprise Clients</div>
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

export default PlatformPage
