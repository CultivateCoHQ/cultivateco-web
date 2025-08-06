/**
 * =============================================================================
 * CultivateCo Cannabis 404 Error Page
 * =============================================================================
 * Custom 404 page for cannabis marketing website with helpful navigation
 */

'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import {
  ArrowRight,
  Home,
  Search,
  Phone,
  Mail,
  BookOpen,
  Building2,
  Shield,
  Users,
  Globe,
  AlertTriangle,
  Compass,
  ExternalLink,
  RefreshCw,
  MessageCircle,
  HelpCircle,
  Star,
  TrendingUp,
} from 'lucide-react'

import { CannabisLayout } from '@/components/layout/CannabisLayout'
import { cn, trackCannabisEvent } from '@/lib/cannabis-utils'
import type { CannabisSEOData } from '@/types/cannabis-marketing'

// ============================================================================
// CANNABIS 404 PAGE DATA
// ============================================================================

const CANNABIS_404_SUGGESTIONS = [
  {
    title: 'Cannabis Platform',
    description: 'Explore our comprehensive cannabis compliance platform features',
    href: '/platform',
    icon: Shield,
    category: 'Platform',
    popular: true,
  },
  {
    title: 'Cannabis Compliance',
    description: 'Learn about AI-powered compliance monitoring and METRC integration',
    href: '/compliance',
    icon: FileCheck,
    category: 'Features',
    popular: true,
  },
  {
    title: 'Cannabis Pricing',
    description: 'View transparent pricing for cannabis businesses of all sizes',
    href: '/pricing',
    icon: TrendingUp,
    category: 'Pricing',
    popular: true,
  },
  {
    title: 'Cannabis Resources',
    description: 'Access compliance guides, templates, and industry insights',
    href: '/resources',
    icon: BookOpen,
    category: 'Resources',
    popular: false,
  },
  {
    title: 'Cannabis Integrations',
    description: 'Connect with METRC, QuickBooks, Stripe, and 25+ other tools',
    href: '/integrations',
    icon: Globe,
    category: 'Integrations',
    popular: false,
  },
  {
    title: 'Cannabis Demo',
    description: 'Schedule a personalized demo with our cannabis experts',
    href: '/demo',
    icon: Users,
    category: 'Demo',
    popular: true,
  },
  {
    title: 'About CultivateCo',
    description: 'Meet our cannabis industry experts and learn our story',
    href: '/about',
    icon: Building2,
    category: 'Company',
    popular: false,
  },
  {
    title: 'Contact Cannabis Experts',
    description: 'Get in touch with our cannabis compliance specialists',
    href: '/contact',
    icon: Phone,
    category: 'Contact',
    popular: false,
  },
]

const CANNABIS_POPULAR_SEARCHES = [
  'METRC integration',
  'Cannabis compliance monitoring',
  'Dispensary software',
  'Cannabis POS system',
  'Cannabis regulatory reporting',
  'Cannabis inventory management',
  'Cannabis violation prevention',
  'Multi-state cannabis operations',
]

const CANNABIS_HELP_OPTIONS = [
  {
    icon: MessageCircle,
    title: 'Live Cannabis Chat',
    description: 'Chat with cannabis compliance experts',
    action: 'Start Chat',
    href: '#chat',
  },
  {
    icon: Phone,
    title: 'Call Cannabis Sales',
    description: 'Speak directly with our team',
    action: 'Call Now',
    href: 'tel:+15551232266',
  },
  {
    icon: Mail,
    title: 'Email Cannabis Team',
    description: 'Send us your questions',
    action: 'Send Email',
    href: 'mailto:sales@cultivateco.com',
  },
  {
    icon: BookOpen,
    title: 'Cannabis Help Center',
    description: 'Browse our knowledge base',
    action: 'Browse Help',
    href: '/help',
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
// CANNABIS 404 COMPONENTS
// ============================================================================

const Cannabis404SearchComponent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      trackCannabisEvent('cannabis_404_search', {
        search_query: searchQuery,
        source_page: router.asPath,
      })
      // Redirect to resources page with search query
      router.push(`/resources?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handlePopularSearch = (query: string) => {
    trackCannabisEvent('cannabis_404_popular_search', {
      search_query: query,
      source_page: router.asPath,
    })
    router.push(`/resources?search=${encodeURIComponent(query)}`)
  }

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search cannabis compliance guides, resources, features..."
            className="w-full pl-12 pr-16 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-cannabis-green-500 focus:border-cannabis-green-500 transition-colors"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-cannabis-green-600 hover:bg-cannabis-green-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      {/* Popular Searches */}
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-3">Popular cannabis searches:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {CANNABIS_POPULAR_SEARCHES.map((query) => (
            <button
              key={query}
              onClick={() => handlePopularSearch(query)}
              className="px-3 py-1 bg-cannabis-green-100 hover:bg-cannabis-green-200 text-cannabis-green-700 text-sm rounded-full transition-colors"
            >
              {query}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

const Cannabis404SuggestionCard: React.FC<{
  suggestion: typeof CANNABIS_404_SUGGESTIONS[0]
}> = ({ suggestion }) => {
  const Icon = suggestion.icon

  const handleClick = () => {
    trackCannabisEvent('cannabis_404_suggestion_click', {
      suggestion_title: suggestion.title,
      suggestion_href: suggestion.href,
      suggestion_category: suggestion.category,
    })
  }

  return (
    <motion.div
      variants={scaleInVariants}
      className="group relative bg-white rounded-2xl p-6 shadow-cannabis hover:shadow-cannabis-lg transition-all duration-300 hover:scale-105"
    >
      <Link href={suggestion.href} onClick={handleClick}>
        <div className="space-y-4">
          {/* Suggestion Icon & Badge */}
          <div className="flex items-start justify-between">
            <div className="p-3 bg-cannabis-green-100 rounded-lg group-hover:bg-cannabis-green-200 transition-colors">
              <Icon className="h-6 w-6 text-cannabis-green-600" />
            </div>
            {suggestion.popular && (
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                Popular
              </span>
            )}
          </div>

          {/* Suggestion Content */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-cannabis-green-700 transition-colors">
              {suggestion.title}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-2">
              {suggestion.description}
            </p>
          </div>

          {/* Suggestion Category */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 font-medium">
              {suggestion.category}
            </span>
            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-cannabis-green-600 transition-colors" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

// ============================================================================
// CANNABIS 404 PAGE SECTIONS
// ============================================================================

const Cannabis404HeroSection: React.FC = () => {
  const router = useRouter()
  
  useEffect(() => {
    // Track 404 page view
    trackCannabisEvent('cannabis_404_page_view', {
      requested_path: router.asPath,
      referrer: document.referrer,
    })
  }, [router.asPath])

  const handleGoHome = () => {
    trackCannabisEvent('cannabis_404_home_click', {
      source_page: router.asPath,
    })
  }

  const handleGoBack = () => {
    trackCannabisEvent('cannabis_404_back_click', {
      source_page: router.asPath,
    })
    router.back()
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cannabis-cream-50 to-white py-20 lg:py-32">
      {/* Cannabis Background Elements */}
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
          {/* Cannabis 404 Icon */}
          <motion.div variants={fadeInUpVariants} className="space-y-6">
            <div className="relative w-32 h-32 mx-auto">
              <div className="w-full h-full bg-cannabis-green-100 rounded-full flex items-center justify-center">
                <Compass className="h-16 w-16 text-cannabis-green-600" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </div>
            </div>
            
            <div className="inline-flex items-center space-x-2 rounded-full bg-cannabis-green-100 px-4 py-2 text-sm font-medium text-cannabis-green-800">
              <HelpCircle className="h-4 w-4" />
              <span>Cannabis Page Not Found</span>
            </div>
          </motion.div>

          {/* Cannabis 404 Content */}
          <motion.div variants={fadeInUpVariants} className="space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Oops! Cannabis
              <span className="block text-cannabis-green-700">Page Not</span>
              <span className="block">Found</span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              The cannabis page you're looking for doesn't exist or may have been moved. 
              Don't worry – we'll help you find what you need for your cannabis business.
            </p>
          </motion.div>

          {/* Cannabis 404 Actions */}
          <motion.div variants={fadeInUpVariants} className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/"
              onClick={handleGoHome}
              className="inline-flex items-center justify-center space-x-2 rounded-lg cannabis-gradient px-8 py-4 text-lg font-semibold text-white shadow-cannabis hover:shadow-cannabis-lg transition-all duration-200 hover:scale-105"
            >
              <Home className="h-5 w-5" />
              <span>Go to Homepage</span>
            </Link>
            
            <button
              onClick={handleGoBack}
              className="inline-flex items-center justify-center space-x-2 rounded-lg border-2 border-gray-300 px-8 py-4 text-lg font-semibold text-gray-700 hover:bg-gray-50 transition-all duration-200"
            >
              <RefreshCw className="h-5 w-5" />
              <span>Go Back</span>
            </button>
          </motion.div>

          {/* Cannabis Search */}
          <motion.div variants={fadeInUpVariants}>
            <Cannabis404SearchComponent />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

const Cannabis404SuggestionsSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const popularSuggestions = CANNABIS_404_SUGGESTIONS.filter(s => s.popular)
  const otherSuggestions = CANNABIS_404_SUGGESTIONS.filter(s => !s.popular)

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
          className="space-y-16"
        >
          {/* Popular Cannabis Pages */}
          <div>
            <motion.div variants={fadeInUpVariants} className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Popular Cannabis
                <span className="block text-cannabis-green-700">Pages</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                These are the most visited pages by cannabis operators looking for compliance solutions.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainerVariants}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {popularSuggestions.map((suggestion) => (
                <Cannabis404SuggestionCard
                  key={suggestion.href}
                  suggestion={suggestion}
                />
              ))}
            </motion.div>
          </div>

          {/* Other Cannabis Resources */}
          <div>
            <motion.div variants={fadeInUpVariants} className="text-center mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                Other Cannabis Resources
              </h2>
              <p className="text-lg text-gray-600">
                Explore more cannabis business tools, resources, and company information.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainerVariants}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {otherSuggestions.map((suggestion) => (
                <Cannabis404SuggestionCard
                  key={suggestion.href}
                  suggestion={suggestion}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const Cannabis404HelpSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const handleHelpClick = (option: typeof CANNABIS_HELP_OPTIONS[0]) => {
    trackCannabisEvent('cannabis_404_help_click', {
      help_option: option.title,
      help_action: option.action,
      help_href: option.href,
    })
  }

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-cannabis-cream-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
          className="text-center"
        >
          <motion.div variants={fadeInUpVariants} className="mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Need Cannabis
              <span className="block text-cannabis-green-700">Help?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Can't find what you're looking for? Our cannabis experts are here to help 
              you with compliance questions, platform guidance, and business solutions.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto"
          >
            {CANNABIS_HELP_OPTIONS.map((option) => {
              const Icon = option.icon
              return (
                <motion.div
                  key={option.title}
                  variants={scaleInVariants}
                  className="bg-white rounded-2xl p-6 shadow-cannabis hover:shadow-cannabis-lg transition-all duration-300 text-center group"
                >
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-cannabis-green-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-cannabis-green-200 transition-colors">
                      <Icon className="h-8 w-8 text-cannabis-green-600" />
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{option.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{option.description}</p>
                    </div>

                    {option.href.startsWith('#') ? (
                      <button
                        onClick={() => handleHelpClick(option)}
                        className="w-full bg-cannabis-green-600 hover:bg-cannabis-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                      >
                        {option.action}
                      </button>
                    ) : (
                      
                        href={option.href}
                        onClick={() => handleHelpClick(option)}
                        className="block w-full bg-cannabis-green-600 hover:bg-cannabis-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                      >
                        {option.action}
                      </a>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Emergency Contact */}
          <motion.div variants={fadeInUpVariants} className="mt-12">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
                <h3 className="text-lg font-bold text-red-900">Cannabis Compliance Emergency?</h3>
              </div>
              <p className="text-red-700 mb-4">
                For urgent cannabis compliance violations or critical license issues.
              </p>
              
                href="tel:+15551234911"
                className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>Emergency Line: (555) 123-4911</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// MAIN CANNABIS 404 PAGE COMPONENT
// ============================================================================

const Cannabis404Page: React.FC = () => {
  const seo: CannabisSEOData = {
    title: 'Page Not Found | CultivateCo Cannabis Platform | 404 Error',
    description: 'The cannabis page you\'re looking for doesn\'t exist. Explore our cannabis compliance platform, resources, pricing, and get help from our cannabis experts.',
    keywords: [
      'cannabis page not found',
      'cannabis 404 error',
      'cannabis website help',
      'cannabis platform navigation',
      'cannabis compliance help',
      'cannabis resources',
      'cannabis platform support',
      'cannabis business help',
      'cannabis compliance guidance',
      'cannabis platform assistance',
    ],
    ogTitle: 'Page Not Found | Cannabis Platform Help & Resources',
    ogDescription: 'Cannabis page not found. Explore our compliance platform, resources, and get help from cannabis experts. Find what you need for your cannabis business.',
    ogImage: 'https://cultivateco.com/og-cannabis-404-help.jpg',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Cannabis Platform 404 Page',
      description: '404 error page with cannabis platform navigation and help resources',
      url: 'https://cultivateco.com/404',
    },
  }

  return (
    <CannabisLayout seo={seo}>
      <Cannabis404HeroSection />
      <Cannabis404SuggestionsSection />
      <Cannabis404HelpSection />
    </CannabisLayout>
  )
}

export default Cannabis404Page
