/**
 * =============================================================================
 * CultivateCo Cannabis Marketing Layout Component
 * =============================================================================
 * Main layout wrapper for cannabis marketing website with navigation and SEO
 */

'use client'

import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, 
  X, 
  Leaf, 
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
} from 'lucide-react'

import { cn, trackCannabisPageView, formatCannabisPhone } from '@/lib/cannabis-utils'
import type { CannabisSEOData } from '@/types/cannabis-marketing'

// ============================================================================
// CANNABIS LAYOUT TYPES
// ============================================================================

interface CannabisLayoutProps {
  children: React.ReactNode
  seo?: CannabisSEOData
  className?: string
  showHeader?: boolean
  showFooter?: boolean
  containerClassName?: string
}

interface CannabisNavItem {
  label: string
  href: string
  description?: string
  external?: boolean
  highlight?: boolean
}

// ============================================================================
// CANNABIS NAVIGATION DATA
// ============================================================================

const CANNABIS_NAV_ITEMS: CannabisNavItem[] = [
  {
    label: 'Platform',
    href: '/platform',
    description: 'Cannabis POS, compliance, and analytics platform',
  },
  {
    label: 'Compliance',
    href: '/compliance',
    description: 'Cannabis regulatory compliance and METRC integration',
  },
  {
    label: 'Integrations',
    href: '/integrations',
    description: 'Connect with cannabis industry software and services',
  },
  {
    label: 'Pricing',
    href: '/pricing',
    description: 'Transparent pricing for cannabis operators',
  },
  {
    label: 'Resources',
    href: '/resources',
    description: 'Cannabis industry insights and compliance guides',
  },
]

const CANNABIS_FOOTER_LINKS = {
  platform: [
    { label: 'Cannabis POS', href: '/platform/pos' },
    { label: 'Compliance Monitoring', href: '/platform/compliance' },
    { label: 'Analytics & Reporting', href: '/platform/analytics' },
    { label: 'METRC Integration', href: '/platform/metrc' },
  ],
  solutions: [
    { label: 'Dispensary Management', href: '/solutions/dispensary' },
    { label: 'Cultivation Software', href: '/solutions/cultivation' },
    { label: 'Manufacturing Tools', href: '/solutions/manufacturing' },
    { label: 'Delivery Management', href: '/solutions/delivery' },
  ],
  resources: [
    { label: 'Cannabis Blog', href: '/resources/blog' },
    { label: 'Compliance Guides', href: '/resources/compliance-guides' },
    { label: 'Case Studies', href: '/resources/case-studies' },
    { label: 'Cannabis Webinars', href: '/resources/webinars' },
  ],
  company: [
    { label: 'About CultivateCo', href: '/about' },
    { label: 'Cannabis Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
    { label: 'Support', href: '/support' },
  ],
}

// ============================================================================
// CANNABIS HEADER COMPONENT
// ============================================================================

const CannabisHeader: React.FC<{ className?: string }> = ({ className }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [router.asPath])

  const headerVariants = {
    initial: { y: -100 },
    animate: { y: 0 },
    exit: { y: -100 },
  }

  const mobileMenuVariants = {
    closed: { opacity: 0, height: 0 },
    open: { opacity: 1, height: 'auto' },
  }

  return (
    <>
      <motion.header
        variants={headerVariants}
        initial="initial"
        animate="animate"
        className={cn(
          'sticky top-0 z-50 w-full border-b transition-all duration-300',
          isScrolled
            ? 'border-cannabis-green-200/20 bg-white/95 backdrop-blur-sm shadow-cannabis'
            : 'border-transparent bg-white',
          className,
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Cannabis Logo */}
            <Link
              href="/"
              className="flex items-center space-x-2 transition-transform hover:scale-105"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg cannabis-gradient">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-cannabis-green-900">
                CultivateCo
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {CANNABIS_NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'group relative px-3 py-2 text-sm font-medium transition-colors',
                    router.asPath === item.href
                      ? 'text-cannabis-green-700'
                      : 'text-gray-700 hover:text-cannabis-green-600',
                  )}
                >
                  {item.label}
                  
                  {/* Active indicator */}
                  {router.asPath === item.href && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-px left-0 right-0 h-0.5 bg-cannabis-green-600"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}

                  {/* Hover tooltip */}
                  {item.description && (
                    <div className="absolute top-full left-1/2 mt-2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <div className="whitespace-nowrap rounded-lg bg-gray-900 px-3 py-2 text-xs text-white shadow-lg">
                        {item.description}
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-b-gray-900" />
                      </div>
                    </div>
                  )}
                </Link>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link
                href="/contact"
                className="text-sm font-medium text-gray-700 hover:text-cannabis-green-600 transition-colors"
              >
                Contact Sales
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center space-x-2 rounded-lg cannabis-gradient px-4 py-2 text-sm font-medium text-white shadow-cannabis hover:shadow-cannabis-lg transition-all duration-200 hover:scale-105"
              >
                <span>Book Demo</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-cannabis-green-600 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="lg:hidden border-t border-gray-200 bg-white"
            >
              <div className="container mx-auto px-4 py-4">
                <div className="space-y-4">
                  {CANNABIS_NAV_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'block px-3 py-2 text-base font-medium rounded-lg transition-colors',
                        router.asPath === item.href
                          ? 'bg-cannabis-green-50 text-cannabis-green-700'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-cannabis-green-600',
                      )}
                    >
                      {item.label}
                      {item.description && (
                        <div className="mt-1 text-sm text-gray-500">
                          {item.description}
                        </div>
                      )}
                    </Link>
                  ))}
                  
                  <div className="pt-4 border-t border-gray-200 space-y-2">
                    <Link
                      href="/contact"
                      className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-cannabis-green-600 transition-colors rounded-lg"
                    >
                      Contact Sales
                    </Link>
                    <Link
                      href="/demo"
                      className="block rounded-lg cannabis-gradient px-3 py-2 text-base font-medium text-white text-center"
                    >
                      Book Demo
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

// ============================================================================
// CANNABIS FOOTER COMPONENT
// ============================================================================

const CannabisFooter: React.FC<{ className?: string }> = ({ className }) => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={cn('bg-gray-900 text-white', className)}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Cannabis Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg cannabis-gradient">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">CultivateCo</span>
            </Link>
            <p className="text-gray-300 text-sm mb-6">
              The leading cannabis compliance platform trusted by dispensaries, 
              cultivators, and cannabis operators nationwide.
            </p>
            
            {/* Cannabis Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-cannabis-green-400" />
                <span className="text-sm text-gray-300">
                  {formatCannabisPhone('(555) 123-CANN')}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-cannabis-green-400" />
                <span className="text-sm text-gray-300">hello@cultivateco.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-cannabis-green-400" />
                <span className="text-sm text-gray-300">
                  Albuquerque, NM • Denver, CO
                </span>
              </div>
            </div>
          </div>

          {/* Cannabis Footer Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
              Platform
            </h3>
            <ul className="space-y-3">
              {CANNABIS_FOOTER_LINKS.platform.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-cannabis-green-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
              Solutions
            </h3>
            <ul className="space-y-3">
              {CANNABIS_FOOTER_LINKS.solutions.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-cannabis-green-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
              Resources
            </h3>
            <ul className="space-y-3">
              {CANNABIS_FOOTER_LINKS.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-cannabis-green-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
              Company
            </h3>
            <ul className="space-y-3">
              {CANNABIS_FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-cannabis-green-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Cannabis Footer Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <p className="text-sm text-gray-400">
                © {currentYear} CultivateCo. All rights reserved.
              </p>
              <div className="flex items-center space-x-4">
                <Link
                  href="/privacy"
                  className="text-sm text-gray-400 hover:text-cannabis-green-400 transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-sm text-gray-400 hover:text-cannabis-green-400 transition-colors"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/cookies"
                  className="text-sm text-gray-400 hover:text-cannabis-green-400 transition-colors"
                >
                  Cookie Policy
                </Link>
              </div>
            </div>

            {/* Cannabis Social Links */}
            <div className="flex items-center space-x-4">
              <Link
                href="https://twitter.com/cultivateco"
                className="p-2 text-gray-400 hover:text-cannabis-green-400 transition-colors"
                aria-label="Follow CultivateCo on Twitter"
              >
                <ExternalLink className="h-4 w-4" />
              </Link>
              <Link
                href="https://linkedin.com/company/cultivateco"
                className="p-2 text-gray-400 hover:text-cannabis-green-400 transition-colors"
                aria-label="Follow CultivateCo on LinkedIn"
              >
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Cannabis Legal Disclaimer */}
          <div className="mt-6 pt-6 border-t border-gray-800">
            <p className="text-xs text-gray-500 text-center max-w-4xl mx-auto">
              CultivateCo provides software and compliance solutions for licensed cannabis 
              businesses operating in states where cannabis is legal. We do not sell, 
              distribute, or facilitate the sale of cannabis products. Cannabis laws vary 
              by state and locality. Users are responsible for ensuring compliance with 
              all applicable laws and regulations.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ============================================================================
// MAIN CANNABIS LAYOUT COMPONENT
// ============================================================================

export const CannabisLayout: React.FC<CannabisLayoutProps> = ({
  children,
  seo,
  className,
  showHeader = true,
  showFooter = true,
  containerClassName,
}) => {
  const router = useRouter()

  // Track page views for cannabis analytics
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      trackCannabisPageView(url, document.title)
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router.events])

  // Default SEO for cannabis marketing
  const defaultSEO: CannabisSEOData = {
    title: 'CultivateCo | Cannabis Compliance Platform & Dispensary Software',
    description: 'Leading cannabis compliance platform with POS, METRC integration, and analytics. Trusted by dispensaries and cannabis operators nationwide.',
    keywords: [
      'cannabis software',
      'dispensary management',
      'cannabis compliance',
      'metrc integration',
      'cannabis pos system',
      'dispensary software',
      'cannabis analytics',
    ],
    ogTitle: 'CultivateCo - Cannabis Compliance Platform',
    ogDescription: 'Complete cannabis business management platform with compliance monitoring, POS system, and METRC integration.',
    canonicalUrl: `https://cultivateco.com${router.asPath}`,
  }

  const finalSEO = { ...defaultSEO, ...seo }

  return (
    <>
      {/* Cannabis SEO Head */}
      <Head>
        <title>{finalSEO.title}</title>
        <meta name="description" content={finalSEO.description} />
        <meta name="keywords" content={finalSEO.keywords.join(', ')} />
        
        {/* Open Graph */}
        <meta property="og:title" content={finalSEO.ogTitle || finalSEO.title} />
        <meta property="og:description" content={finalSEO.ogDescription || finalSEO.description} />
        <meta property="og:image" content={finalSEO.ogImage || 'https://cultivateco.com/og-cannabis-platform.jpg'} />
        <meta property="og:url" content={finalSEO.canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="CultivateCo" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={finalSEO.ogTitle || finalSEO.title} />
        <meta name="twitter:description" content={finalSEO.ogDescription || finalSEO.description} />
        <meta name="twitter:image" content={finalSEO.ogImage || 'https://cultivateco.com/twitter-cannabis-platform.jpg'} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={finalSEO.canonicalUrl} />
        
        {/* Cannabis Favicon */}
        <link rel="icon" type="image/svg+xml" href="/favicon-cannabis.svg" />
        <link rel="icon" type="image/png" href="/favicon-cannabis.png" />
        
        {/* Cannabis Theme */}
        <meta name="theme-color" content="#154438" />
        <meta name="msapplication-TileColor" content="#154438" />
        
        {/* Cannabis Industry Structured Data */}
        {finalSEO.structuredData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(finalSEO.structuredData),
            }}
          />
        )}
      </Head>

      {/* Cannabis Layout Structure */}
      <div className={cn('min-h-screen flex flex-col bg-cannabis-cream-50', className)}>
        {showHeader && <CannabisHeader />}
        
        <main className={cn('flex-1', containerClassName)}>
          {children}
        </main>
        
        {showFooter && <CannabisFooter />}
      </div>

      {/* Cannabis Analytics Scripts */}
      {process.env.NODE_ENV === 'production' && (
        <>
          {/* Google Analytics for Cannabis Marketing */}
          {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                      page_title: document.title,
                      page_location: window.location.href,
                      custom_map: {
                        cannabis_website: true,
                        industry: 'cannabis'
                      }
                    });
                  `,
                }}
              />
            </>
          )}

          {/* Hotjar for Cannabis UX Analytics */}
          {process.env.NEXT_PUBLIC_HOTJAR_ID && (
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  (function(h,o,t,j,a,r){
                    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                    h._hjSettings={hjid:${process.env.NEXT_PUBLIC_HOTJAR_ID},hjsv:6};
                    a=o.getElementsByTagName('head')[0];
                    r=o.createElement('script');r.async=1;
                    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                    a.appendChild(r);
                  })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
                `,
              }}
            />
          )}
        </>
      )}
    </>
  )
}

export default CannabisLayout
