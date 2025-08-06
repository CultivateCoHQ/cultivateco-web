/**
 * =============================================================================
 * CultivateCo Cannabis Marketing Website - Homepage
 * =============================================================================
 * Main homepage showcasing cannabis compliance platform and governance map
 */

'use client'

import { useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  ArrowRight,
  Shield,
  BarChart3,
  CheckCircle,
  MapPin,
  Users,
  TrendingUp,
  Zap,
  Globe,
  Award,
  Play,
  Star,
  Building2,
  Leaf,
  Calculator,
  FileCheck,
  Database,
  Smartphone,
} from 'lucide-react'

import { CannabisLayout } from '@/components/layout/CannabisLayout'
import { cn, formatCannabisRevenue, trackCannabisEvent } from '@/lib/cannabis-utils'
import type { CannabisSEOData, CannabisTestimonial } from '@/types/cannabis-marketing'

// ============================================================================
// CANNABIS HOMEPAGE DATA
// ============================================================================

const CANNABIS_HERO_STATS = [
  { label: 'Cannabis Operators', value: '2,500+', icon: Building2 },
  { label: 'States Supported', value: '19', icon: MapPin },
  { label: 'Compliance Score', value: '99.8%', icon: Shield },
  { label: 'Revenue Tracked', value: '$2.1B', icon: TrendingUp },
]

const CANNABIS_PLATFORM_FEATURES = [
  {
    icon: Shield,
    title: 'Cannabis Compliance Monitoring',
    description: 'Real-time compliance tracking with AI-powered violation detection and automated METRC synchronization.',
    features: ['METRC Integration', 'Violation Alerts', 'Audit Trails', 'Regulatory Updates'],
    color: 'cannabis-blue',
  },
  {
    icon: Calculator,
    title: 'Cannabis POS System',
    description: 'Complete point-of-sale solution with tax calculation, age verification, and purchase limit enforcement.',
    features: ['Tax Calculation', 'Age Verification', 'Purchase Limits', 'Receipt Printing'],
    color: 'cannabis-green',
  },
  {
    icon: BarChart3,
    title: 'Cannabis Analytics',
    description: 'Comprehensive business intelligence with sales analytics, inventory insights, and compliance reporting.',
    features: ['Sales Reports', 'Inventory Analytics', 'Customer Insights', 'Performance Metrics'],
    color: 'cannabis-blue',
  },
  {
    icon: FileCheck,
    title: 'Regulatory Reporting',
    description: 'Automated regulatory report generation and submission with state-specific compliance requirements.',
    features: ['Automated Reports', 'State Compliance', 'Audit Support', 'Documentation'],
    color: 'cannabis-green',
  },
]

const CANNABIS_INTEGRATION_PARTNERS = [
  { name: 'METRC', logo: '/integrations/metrc-logo.svg', description: 'New Mexico State Tracking' },
  { name: 'QuickBooks', logo: '/integrations/quickbooks-logo.svg', description: 'Accounting Integration' },
  { name: 'Stripe', logo: '/integrations/stripe-logo.svg', description: 'Payment Processing' },
  { name: 'Shopify', logo: '/integrations/shopify-logo.svg', description: 'E-commerce Platform' },
  { name: 'Mailchimp', logo: '/integrations/mailchimp-logo.svg', description: 'Email Marketing' },
  { name: 'Twilio', logo: '/integrations/twilio-logo.svg', description: 'SMS Notifications' },
]

const CANNABIS_TESTIMONIALS: CannabisTestimonial[] = [
  {
    id: '1',
    name: 'Sarah Martinez',
    title: 'Compliance Manager',
    company: 'Desert Bloom Dispensary',
    state: 'New Mexico',
    image: '/testimonials/sarah-martinez.jpg',
    quote: 'CultivateCo transformed our compliance process. We went from constant stress about violations to complete confidence in our regulatory adherence.',
    rating: 5,
    category: 'compliance',
    featured: true,
    verified: true,
    date: '2024-01-15',
  },
  {
    id: '2',
    name: 'Mike Chen',
    title: 'Operations Director',
    company: 'Green Valley Cannabis',
    state: 'Colorado',
    image: '/testimonials/mike-chen.jpg',
    quote: 'The POS integration is seamless. Our budtenders love the intuitive interface and the real-time inventory updates keep us compliant.',
    rating: 5,
    category: 'pos',
    featured: true,
    verified: true,
    date: '2024-02-03',
  },
  {
    id: '3',
    name: 'Lisa Thompson',
    title: 'CEO',
    company: 'Sunrise Cannabis Co.',
    state: 'Arizona',
    image: '/testimonials/lisa-thompson.jpg',
    quote: 'CultivateCo\'s analytics helped us increase revenue by 40% while maintaining perfect compliance scores across all our locations.',
    rating: 5,
    category: 'analytics',
    featured: true,
    verified: true,
    date: '2024-01-28',
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
// CANNABIS HOMEPAGE SECTIONS
// ============================================================================

const CannabisHeroSection: React.FC = () => {
  const [currentStat, setCurrentStat] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % CANNABIS_HERO_STATS.length)
    }, 3000)
    
    return () => clearInterval(interval)
  }, [])

  const handleDemoClick = () => {
    trackCannabisEvent('cannabis_demo_request_click', {
      source: 'hero_section',
      button_text: 'Book Demo'
    })
  }

  const handleGovernanceMapClick = () => {
    trackCannabisEvent('cannabis_governance_map_click', {
      source: 'hero_section',
      button_text: 'View Governance Map'
    })
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cannabis-cream-50 to-white py-20 lg:py-32">
      {/* Cannabis Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 cannabis-gradient rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cannabis-blue-500 rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Cannabis Hero Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainerVariants}
            className="space-y-8"
          >
            <motion.div variants={fadeInUpVariants} className="space-y-6">
              <div className="inline-flex items-center space-x-2 rounded-full bg-cannabis-green-100 px-4 py-2 text-sm font-medium text-cannabis-green-800">
                <Leaf className="h-4 w-4" />
                <span>Trusted by 2,500+ Cannabis Operators</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Cannabis
                <span className="block text-cannabis-green-700">Compliance</span>
                <span className="block">Made Simple</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                The complete cannabis compliance platform with POS system, METRC integration, 
                and AI-powered monitoring. Built by operators, for operators.
              </p>
            </motion.div>

            <motion.div variants={fadeInUpVariants} className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/demo"
                onClick={handleDemoClick}
                className="inline-flex items-center justify-center space-x-2 rounded-lg cannabis-gradient px-8 py-4 text-lg font-semibold text-white shadow-cannabis hover:shadow-cannabis-lg transition-all duration-200 hover:scale-105"
              >
                <span>Book Demo</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              
              <Link
                href="/governance-map"
                onClick={handleGovernanceMapClick}
                className="inline-flex items-center justify-center space-x-2 rounded-lg border-2 border-cannabis-blue-600 px-8 py-4 text-lg font-semibold text-cannabis-blue-600 hover:bg-cannabis-blue-50 transition-all duration-200"
              >
                <Globe className="h-5 w-5" />
                <span>View Governance Map</span>
              </Link>
            </motion.div>

            {/* Cannabis Stats Carousel */}
            <motion.div variants={fadeInUpVariants} className="pt-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {CANNABIS_HERO_STATS.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <motion.div
                      key={stat.label}
                      variants={scaleInVariants}
                      className={cn(
                        'text-center p-4 rounded-lg transition-all duration-300',
                        currentStat === index 
                          ? 'bg-cannabis-green-100 scale-105' 
                          : 'bg-white hover:bg-gray-50'
                      )}
                    >
                      <Icon className={cn(
                        'h-6 w-6 mx-auto mb-2',
                        currentStat === index 
                          ? 'text-cannabis-green-600' 
                          : 'text-gray-600'
                      )} />
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* Cannabis Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/cannabis-platform-dashboard.jpg"
                alt="CultivateCo Cannabis Compliance Platform Dashboard"
                width={600}
                height={400}
                className="w-full h-auto"
                priority
              />
              
              {/* Cannabis Platform Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cannabis-green-600/20 to-transparent" />
              
              {/* Cannabis Play Button */}
              <button
                onClick={() => trackCannabisEvent('cannabis_video_play', { source: 'hero_image' })}
                className="absolute inset-0 flex items-center justify-center group"
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-6 shadow-lg group-hover:scale-110 transition-transform duration-200">
                  <Play className="h-8 w-8 text-cannabis-green-600 ml-1" fill="currentColor" />
                </div>
              </button>
            </div>

            {/* Cannabis Platform Features Floating Cards */}
            <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4 max-w-xs">
              <div className="flex items-center space-x-3">
                <div className="bg-cannabis-green-100 rounded-full p-2">
                  <Shield className="h-4 w-4 text-cannabis-green-600" />
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
                  <TrendingUp className="h-4 w-4 text-cannabis-blue-600" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">$2.1B Tracked</div>
                  <div className="text-xs text-gray-600">Revenue processed</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const CannabisPlatformSection: React.FC = () => {
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
          <motion.div variants={fadeInUpVariants} className="space-y-4">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900">
              Complete Cannabis
              <span className="block text-cannabis-green-700">Management Platform</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to run a compliant cannabis business. From POS to compliance 
              monitoring, we've got you covered with the industry's most comprehensive platform.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
          className="grid lg:grid-cols-2 gap-8"
        >
          {CANNABIS_PLATFORM_FEATURES.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                variants={fadeInUpVariants}
                className="group relative bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-cannabis-lg transition-all duration-300 hover:border-cannabis-green-200"
              >
                <div className="flex items-start space-x-6">
                  <div className={cn(
                    'flex-shrink-0 rounded-xl p-3',
                    feature.color === 'cannabis-green' 
                      ? 'bg-cannabis-green-100' 
                      : 'bg-cannabis-blue-100'
                  )}>
                    <Icon className={cn(
                      'h-6 w-6',
                      feature.color === 'cannabis-green'
                        ? 'text-cannabis-green-600'
                        : 'text-cannabis-blue-600'
                    )} />
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      {feature.features.map((item) => (
                        <div key={item} className="flex items-center space-x-2 text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-cannabis-green-500 flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="h-5 w-5 text-cannabis-green-600" />
                </div>
              </motion.div>
            )
          })}
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
              Trusted by Cannabis
              <span className="block text-cannabis-green-700">Operators Nationwide</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how CultivateCo is helping cannabis businesses maintain compliance 
              while growing their operations across legal states.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
          className="grid lg:grid-cols-3 gap-8"
        >
          {CANNABIS_TESTIMONIALS.map((testimonial) => (
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

                {/* Cannabis Verification Badge */}
                {testimonial.verified && (
                  <div className="flex items-center space-x-2 text-sm text-cannabis-green-600">
                    <Award className="h-4 w-4" />
                    <span>Verified Cannabis Customer</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
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
              Seamless Cannabis
              <span className="block text-cannabis-green-700">Integrations</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect CultivateCo with the tools you already use. Our platform integrates 
              with leading cannabis industry services and business applications.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
        >
          {CANNABIS_INTEGRATION_PARTNERS.map((partner) => (
            <motion.div
              key={partner.name}
              variants={scaleInVariants}
              className="group text-center"
            >
              <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-cannabis-green-200 hover:shadow-cannabis transition-all duration-300 group-hover:scale-105">
                <div className="h-12 w-12 mx-auto mb-4 relative">
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} integration`}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{partner.name}</h3>
                <p className="text-sm text-gray-600">{partner.description}</p>
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
            className="inline-flex items-center space-x-2 rounded-lg border-2 border-cannabis-green-600 px-6 py-3 text-lg font-semibold text-cannabis-green-600 hover:bg-cannabis-green-50 transition-all duration-200"
          >
            <span>View All Integrations</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

const CannabisCTASection: React.FC = () => {
  const handleDemoClick = () => {
    trackCannabisEvent('cannabis_demo_request_click', {
      source: 'cta_section',
      button_text: 'Start Free Trial'
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
              <span className="block">Cannabis Business?</span>
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Join thousands of cannabis operators who trust CultivateCo for compliance, 
              operations, and growth. Start your free trial today.
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
              href="/contact"
              className="inline-flex items-center justify-center space-x-2 rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold text-white hover:bg-white/10 transition-all duration-200"
            >
              <span>Contact Sales</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>

          <motion.div variants={fadeInUpVariants} className="pt-8">
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm opacity-75">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>No setup fees</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>30-day free trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// MAIN CANNABIS HOMEPAGE COMPONENT
// ============================================================================

const CannabisHomepage: React.FC = () => {
  const seo: CannabisSEOData = {
    title: 'CultivateCo | Cannabis Compliance Platform & Dispensary Software',
    description: 'Leading cannabis compliance platform with POS system, METRC integration, and AI-powered monitoring. Trusted by 2,500+ cannabis operators nationwide. Book your demo today.',
    keywords: [
      'cannabis compliance software',
      'dispensary management system',
      'cannabis pos system',
      'metrc integration',
      'cannabis analytics',
      'dispensary software',
      'cannabis regulatory compliance',
      'seed to sale tracking',
      'cannabis business management',
      'dispensary pos software',
    ],
    ogTitle: 'CultivateCo - Cannabis Compliance Platform Trusted by 2,500+ Operators',
    ogDescription: 'Complete cannabis business management platform with compliance monitoring, POS system, and METRC integration. Transform your cannabis operations today.',
    ogImage: 'https://cultivateco.com/og-homepage-cannabis-platform.jpg',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'CultivateCo Cannabis Compliance Platform',
      applicationCategory: 'Business Software',
      operatingSystem: 'Web-based',
      description: 'Complete cannabis compliance platform with POS system, METRC integration, and AI-powered monitoring for dispensaries and cannabis operators.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        description: '30-day free trial available',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: '847',
        bestRating: '5',
        worstRating: '1',
      },
      provider: {
        '@type': 'Organization',
        name: 'CultivateCo',
        url: 'https://cultivateco.com',
      },
    },
  }

  return (
    <CannabisLayout seo={seo}>
      <CannabisHeroSection />
      <CannabisPlatformSection />
      <CannabisTestimonialsSection />
      <CannabisIntegrationsSection />
      <CannabisCTASection />
    </CannabisLayout>
  )
}

export default CannabisHomepage
