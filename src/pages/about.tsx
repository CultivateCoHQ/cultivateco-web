/**
 * =============================================================================
 * CultivateCo About Page - Pharmaceutical-Grade Cannabis Compliance
 * =============================================================================
 * Company story, team, and enterprise credentials
 */

'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import {
  Shield,
  Award,
  Users,
  TrendingUp,
  Globe,
  Lock,
  CheckCircle,
  Building2,
  Target,
  Zap,
  ArrowRight,
  Star,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  GraduationCap,
  Lightbulb,
  BarChart3,
} from 'lucide-react'

import { CannabisLayout } from '@/components/layout/CannabisLayout'

// ============================================================================
// ENTERPRISE COMPANY DATA
// ============================================================================

const ENTERPRISE_STATS = [
  { label: 'Multi-State Operators', value: '50+', icon: Globe },
  { label: 'Annual Transactions Protected', value: '$5B+', icon: Shield },
  { label: 'Compliance Violations Prevented', value: '10K+', icon: CheckCircle },
  { label: 'Enterprise Implementations', value: '95%', icon: Award },
]

const ENTERPRISE_CREDENTIALS = [
  {
    icon: Shield,
    title: 'SOC 2 Type II Certified',
    description: 'Audited enterprise security controls protecting sensitive cannabis business data with pharmaceutical-grade standards.',
  },
  {
    icon: Lock,
    title: 'Banking Partnership Ready',
    description: 'BSA/AML compliant platform enabling cannabis operators to establish institutional banking relationships.',
  },
  {
    icon: Award,
    title: '99.99% Uptime SLA',
    description: 'Contractually guaranteed reliability with financial penalties - preventing revenue loss from system failures.',
  },
  {
    icon: Globe,
    title: 'Multi-State Expertise',
    description: 'Unified compliance platform covering 15+ states with real-time regulatory change monitoring.',
  },
]

const LEADERSHIP_TEAM = [
  {
    name: 'William Brown',
    title: 'CEO & Founder',
    bio: 'Former pharmaceutical compliance executive with 15+ years implementing FDA validation protocols. Led enterprise software teams serving Fortune 500 pharmaceutical companies before founding CultivateCo.',
    credentials: ['MBA - Stanford Business', 'Former FDA Validation Expert', 'Enterprise Software Veteran'],
    image: '/team/william-brown.jpg',
  },
  {
    name: 'Dr. Sarah Chen',
    title: 'Chief Technology Officer',
    bio: 'Former AWS enterprise architect with expertise in SOC 2 compliance and pharmaceutical-grade system validation. Built compliance platforms for Fortune 100 companies.',
    credentials: ['PhD Computer Science - MIT', 'AWS Enterprise Architect', 'SOC 2 Compliance Expert'],
    image: '/team/sarah-chen.jpg',
  },
  {
    name: 'Michael Rodriguez',
    title: 'Chief Compliance Officer',
    bio: 'Former pharmaceutical regulatory affairs director with deep expertise in 21 CFR Part 11 compliance and multi-state cannabis regulations. 20+ years in pharmaceutical validation.',
    credentials: ['JD - Harvard Law', 'Former FDA Regulatory Affairs', 'Cannabis Legal Expert'],
    image: '/team/michael-rodriguez.jpg',
  },
]

const ENTERPRISE_CUSTOMERS = [
  {
    company: 'Verde Holdings',
    type: 'Multi-State Operator',
    states: '12 States',
    testimonial: 'Pharmaceutical-grade compliance enabled our $50M Series B funding round.',
    logo: '/customers/verde-holdings.png',
  },
  {
    company: 'Pacific Cannabis Group',
    type: 'Enterprise Cultivation',
    states: 'California',
    testimonial: 'SOC 2 certification was crucial for institutional investor confidence.',
    logo: '/customers/pacific-cannabis.png',
  },
  {
    company: 'Rocky Mountain Cannabis',
    type: 'Multi-Location Retail',
    states: 'Colorado',
    testimonial: 'Banking partnerships finally became possible with compliance certainty.',
    logo: '/customers/rocky-mountain.png',
  },
]

const COMPANY_MILESTONES = [
  {
    year: '2016',
    title: 'Founded on Pharmaceutical Standards',
    description: 'CultivateCo founded by pharmaceutical compliance veterans who recognized cannabis industry deserved enterprise-grade solutions.',
  },
  {
    year: '2018',
    title: 'First SOC 2 Certified Cannabis Platform',
    description: 'Achieved SOC 2 Type II certification - first cannabis platform to meet institutional security standards.',
  },
  {
    year: '2020',
    title: 'Banking Compliance Breakthrough',
    description: 'Enabled first cannabis-banking partnerships through BSA/AML compliant transaction monitoring.',
  },
  {
    year: '2022',
    title: 'Multi-State Enterprise Focus',
    description: 'Shifted focus to multi-state operators requiring pharmaceutical-grade compliance across jurisdictions.',
  },
  {
    year: '2024',
    title: 'Institutional Investment Ready',
    description: 'Platform now supports $100M+ cannabis enterprises with pharmaceutical validation and banking compliance.',
  },
]

// ============================================================================
// ABOUT PAGE SECTIONS
// ============================================================================

const AboutHeroSection: React.FC = () => {
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
              <span>Pharmaceutical-Grade Cannabis Compliance Leaders</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Elevating Cannabis from
              <span className="block text-cyan-200">Agricultural Product</span>
              <span className="block">to Pharmaceutical Ingredient</span>
            </h1>
            
            <p className="text-xl opacity-90 leading-relaxed max-w-3xl mx-auto">
              Founded by pharmaceutical compliance veterans, CultivateCo brings enterprise-grade validation, 
              SOC 2 security, and banking-ready compliance to the cannabis industry. We believe cannabis 
              businesses deserve pharmaceutical standards, not basic agricultural software.
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
            {ENTERPRISE_STATS.map((stat, index) => {
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
        </motion.div>
      </div>
    </section>
  )
}

const CompanyMissionSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { 
                opacity: 1, 
                x: 0,
                transition: { duration: 0.8, ease: 'easeOut' }
              }
            }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900">
                Our Mission: Pharmaceutical
                <span className="block text-teal-700">Standards for Cannabis</span>
              </h2>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                When cannabis businesses demand institutional investment, banking partnerships, and export opportunities, 
                they need pharmaceutical-grade compliance - not basic agricultural software.
              </p>
              
              <p className="text-gray-600 leading-relaxed">
                CultivateCo was founded by pharmaceutical compliance veterans who witnessed the massive gap between 
                cannabis software ($35-500/month) and pharmaceutical platforms ($500K+ annually). We recognized that 
                cannabis businesses preparing for federal legalization need pharmaceutical standards today.
              </p>
            </div>

            <div className="space-y-4">
              {[
                'Apply pharmaceutical validation protocols to cannabis operations',
                'Enable banking partnerships through BSA/AML compliance',
                'Support institutional investment with SOC 2 security',
                'Prepare cannabis businesses for federal legalization',
                'Unify multi-state compliance across complex regulations',
              ].map((point, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-teal-500 flex-shrink-0" />
                  <span className="text-gray-700">{point}</span>
                </div>
              ))}
            </div>

            <Link
              href="/platform"
              className="inline-flex items-center space-x-2 rounded-lg bg-teal-600 px-6 py-3 text-white hover:bg-teal-700 transition-colors"
            >
              <span>See Our Platform</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { 
                opacity: 1, 
                x: 0,
                transition: { duration: 0.8, ease: 'easeOut' }
              }
            }}
            className="space-y-6"
          >
            {ENTERPRISE_CREDENTIALS.map((credential, index) => {
              const Icon = credential.icon
              return (
                <div key={credential.title} className="bg-gray-50 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-teal-100 rounded-lg p-3">
                      <Icon className="h-6 w-6 text-teal-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{credential.title}</h3>
                  </div>
                  <p className="text-gray-600">{credential.description}</p>
                </div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const LeadershipTeamSection: React.FC = () => {
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
              Pharmaceutical Compliance
              <span className="block text-teal-700">Veterans</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our leadership team brings pharmaceutical industry experience to cannabis compliance, 
              applying enterprise standards to an industry ready for institutional credibility.
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
          {LEADERSHIP_TEAM.map((leader) => (
            <motion.div
              key={leader.name}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { 
                  opacity: 1, 
                  scale: 1,
                  transition: { duration: 0.5, ease: 'easeOut' }
                }
              }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-24 h-24 bg-teal-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-12 h-12 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{leader.name}</h3>
                  <p className="text-teal-600 font-medium">{leader.title}</p>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed">{leader.bio}</p>

                <div className="space-y-2">
                  {leader.credentials.map((credential, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <GraduationCap className="h-4 w-4 text-teal-500 flex-shrink-0" />
                      <span className="text-gray-700">{credential}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

const CompanyTimelineSection: React.FC = () => {
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
              Building the Future of
              <span className="block text-teal-700">Cannabis Compliance</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Eight years of transforming cannabis from agricultural product to pharmaceutical ingredient 
              through enterprise-grade compliance platforms.
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
          className="space-y-8"
        >
          {COMPANY_MILESTONES.map((milestone, index) => (
            <motion.div
              key={milestone.year}
              variants={{
                hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
                visible: { 
                  opacity: 1, 
                  x: 0,
                  transition: { duration: 0.6, ease: 'easeOut' }
                }
              }}
              className={`flex items-center gap-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
            >
              <div className="flex-1 bg-gray-50 rounded-2xl p-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-teal-600 text-white rounded-lg px-4 py-2 font-bold">
                      {milestone.year}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{milestone.title}</h3>
                  </div>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
              
              <div className="hidden lg:block">
                <div className="w-4 h-4 bg-teal-600 rounded-full"></div>
              </div>
              
              <div className="flex-1"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

const EnterpriseCustomersSection: React.FC = () => {
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
              Trusted by Enterprise
              <span className="block text-teal-700">Cannabis Leaders</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Multi-state operators and institutional investors choose CultivateCo for pharmaceutical-grade 
              compliance that enables banking partnerships and Series B funding rounds.
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
          {ENTERPRISE_CUSTOMERS.map((customer) => (
            <motion.div
              key={customer.company}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { 
                  opacity: 1, 
                  scale: 1,
                  transition: { duration: 0.5, ease: 'easeOut' }
                }
              }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-teal-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{customer.company}</h3>
                  <p className="text-teal-600 font-medium">{customer.type}</p>
                  <p className="text-sm text-gray-600">{customer.states}</p>
                </div>

                <blockquote className="text-gray-700 italic text-center">
                  "{customer.testimonial}"
                </blockquote>

                <div className="flex justify-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
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
          className="text-center mt-12"
        >
          <Link
            href="/demo"
            className="inline-flex items-center space-x-2 rounded-lg bg-teal-600 px-8 py-4 text-lg font-semibold text-white hover:bg-teal-700 transition-colors"
          >
            <span>Schedule Enterprise Consultation</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// MAIN ABOUT PAGE COMPONENT
// ============================================================================

const AboutPage: React.FC = () => {
  return (
    <CannabisLayout seo={{
      title: 'About CultivateCo | Pharmaceutical-Grade Cannabis Compliance Leaders | Enterprise Cannabis Platform',
      description: 'Founded by pharmaceutical compliance veterans, CultivateCo brings SOC 2 security and enterprise validation to cannabis. Trusted by 50+ multi-state operators.',
      keywords: [
        'pharmaceutical-grade cannabis compliance company',
        'enterprise cannabis platform team',
        'SOC 2 certified cannabis software',
        'cannabis compliance veterans',
        'pharmaceutical standards cannabis',
        'multi-state cannabis compliance experts',
        'institutional cannabis investment platform',
        'banking-ready cannabis compliance',
        'cannabis enterprise software leaders',
        'pharmaceutical validation cannabis',
      ],
      ogTitle: 'About CultivateCo | Pharmaceutical-Grade Cannabis Compliance Leaders',
      ogDescription: 'Founded by pharmaceutical veterans bringing enterprise standards to cannabis. SOC 2 certified platform trusted by 50+ multi-state operators.',
      ogImage: 'https://cultivateco.com/og-about-cannabis-compliance.jpg',
    }}>
      <AboutHeroSection />
      <CompanyMissionSection />
      <LeadershipTeamSection />
      <CompanyTimelineSection />
      <EnterpriseCustomersSection />
    </CannabisLayout>
  )
}

export default AboutPage
