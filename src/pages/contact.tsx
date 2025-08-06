/**
 * =============================================================================
 * CultivateCo Cannabis Contact & Sales Page
 * =============================================================================
 * Comprehensive contact page with sales forms and enterprise inquiries
 */

'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Building2,
  Users,
  Headphones,
  CheckCircle,
  Send,
  Calendar,
  Award,
  Shield,
  Zap,
  Globe,
  HelpCircle,
  ExternalLink,
} from 'lucide-react'

import { CannabisLayout } from '@/components/layout/CannabisLayout'
import { 
  cn, 
  trackCannabisEvent, 
  formatCannabisPhone,
  isValidCannabisEmail,
  isValidCannabisPhone,
  sanitizeCannabisInput,
} from '@/lib/cannabis-utils'
import { submitCannabisContactForm } from '@/lib/cannabis-api'
import type { 
  CannabisSEOData, 
  CannabisContactForm,
} from '@/types/cannabis-marketing'

// ============================================================================
// CANNABIS CONTACT PAGE DATA
// ============================================================================

const CANNABIS_CONTACT_METHODS = [
  {
    icon: Phone,
    title: 'Call Cannabis Sales',
    description: 'Speak directly with our cannabis experts',
    value: formatCannabisPhone('(555) 123-CANN'),
    action: 'tel:+15551232266',
    hours: 'Mon-Fri 8AM-6PM MT',
    response: 'Immediate',
  },
  {
    icon: Mail,
    title: 'Email Cannabis Team',
    description: 'Get detailed information and custom quotes',
    value: 'sales@cultivateco.com',
    action: 'mailto:sales@cultivateco.com',
    hours: '24/7 submission',
    response: '2-hour response',
  },
  {
    icon: MessageSquare,
    title: 'Live Cannabis Chat',
    description: 'Chat with cannabis compliance specialists',
    value: 'Start Chat',
    action: '#',
    hours: 'Mon-Fri 8AM-8PM MT',
    response: 'Instant response',
  },
  {
    icon: Calendar,
    title: 'Book Cannabis Demo',
    description: 'Schedule personalized platform demonstration',
    value: 'Schedule Demo',
    action: '/demo',
    hours: 'Flexible scheduling',
    response: '30-min session',
  },
]

const CANNABIS_OFFICE_LOCATIONS = [
  {
    city: 'Albuquerque',
    state: 'New Mexico',
    address: '2500 Louisiana Blvd NE, Suite 200',
    zipCode: '87110',
    phone: formatCannabisPhone('(505) 555-0123'),
    email: 'albuquerque@cultivateco.com',
    hours: 'Mon-Fri 8AM-6PM MT',
    description: 'Cannabis compliance headquarters and METRC integration center',
    image: '/offices/albuquerque-office.jpg',
  },
  {
    city: 'Denver',
    state: 'Colorado',
    address: '1400 16th Street, Suite 300',
    zipCode: '80202',
    phone: formatCannabisPhone('(303) 555-0124'),
    email: 'denver@cultivateco.com',
    hours: 'Mon-Fri 9AM-5PM MT',
    description: 'Cannabis innovation lab and customer success center',
    image: '/offices/denver-office.jpg',
  },
]

const CANNABIS_SUPPORT_OPTIONS = [
  {
    icon: Shield,
    title: 'Cannabis Compliance Support',
    description: 'Get help with METRC integration, regulatory compliance, and violation prevention',
    email: 'compliance@cultivateco.com',
    phone: formatCannabisPhone('(555) 123-COMP'),
    hours: '24/7 for critical compliance issues',
  },
  {
    icon: Headphones,
    title: 'Technical Support',
    description: 'Platform assistance, troubleshooting, and technical questions',
    email: 'support@cultivateco.com',
    phone: formatCannabisPhone('(555) 123-TECH'),
    hours: 'Mon-Fri 7AM-7PM MT',
  },
  {
    icon: Users,
    title: 'Customer Success',
    description: 'Training, onboarding, and optimization for existing customers',
    email: 'success@cultivateco.com',
    phone: formatCannabisPhone('(555) 123-SUCC'),
    hours: 'Mon-Fri 8AM-6PM MT',
  },
]

const CANNABIS_CONTACT_REASONS = [
  'General Information',
  'Sales Inquiry',
  'Enterprise Solutions',
  'Demo Request',
  'Technical Support',
  'Compliance Questions',
  'Partnership Inquiry',
  'Investor Relations',
  'Media Inquiry',
  'Other',
]

const CANNABIS_COMPANY_SIZES = [
  'Single location',
  '2-5 locations',
  '6-10 locations',
  '11-25 locations',
  '25+ locations',
  'Multi-state operation',
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
// CANNABIS CONTACT FORM COMPONENT
// ============================================================================

interface CannabisContactFormErrors {
  [key: string]: string
}

const CannabisContactFormComponent: React.FC = () => {
  const [formData, setFormData] = useState<CannabisContactForm & {
    reason: string
    companySize: string
    timeline: string
    currentSoftware: string
  }>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    interests: [],
    consent: false,
    reason: '',
    companySize: '',
    timeline: '',
    currentSoftware: '',
  })

  const [errors, setErrors] = useState<CannabisContactFormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string>('')

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: CannabisContactFormErrors = {}

    // Required field validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!isValidCannabisEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!isValidCannabisPhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }
    if (!formData.company.trim()) newErrors.company = 'Company name is required'
    if (!formData.reason) newErrors.reason = 'Please select a reason for contact'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    if (!formData.consent) newErrors.consent = 'You must agree to be contacted'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitError('')

    try {
      // Sanitize form data
      const sanitizedData: CannabisContactForm = {
        firstName: sanitizeCannabisInput(formData.firstName),
        lastName: sanitizeCannabisInput(formData.lastName),
        email: sanitizeCannabisInput(formData.email),
        phone: formatCannabisPhone(formData.phone),
        company: sanitizeCannabisInput(formData.company),
        message: sanitizeCannabisInput(formData.message),
        interests: [formData.reason, formData.companySize, formData.timeline].filter(Boolean),
        consent: formData.consent,
      }

      const success = await submitCannabisContactForm(sanitizedData)
      
      if (success) {
        setIsSubmitted(true)
        
        // Track successful contact form submission
        trackCannabisEvent('cannabis_contact_form_submitted', {
          reason: formData.reason,
          company_size: formData.companySize,
          timeline: formData.timeline,
          has_current_software: !!formData.currentSoftware,
        })
      } else {
        setSubmitError('Failed to submit contact form. Please try again or call us directly.')
      }
    } catch (error) {
      console.error('Contact form submission error:', error)
      setSubmitError('An unexpected error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Success state
  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-cannabis p-8 text-center"
      >
        <div className="space-y-6">
          <div className="w-16 h-16 bg-cannabis-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-cannabis-green-600" />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Message Received!
            </h3>
            <p className="text-gray-600">
              Thank you for contacting CultivateCo. Our cannabis experts will respond 
              within 2 hours during business hours.
            </p>
          </div>

          <div className="bg-cannabis-green-50 rounded-lg p-6 space-y-4">
            <h4 className="font-semibold text-cannabis-green-900">What happens next?</h4>
            <div className="space-y-3 text-sm text-cannabis-green-800">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-cannabis-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                <span>Cannabis specialist reviews your inquiry (within 2 hours)</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-cannabis-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                <span>Personalized response with relevant information</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-cannabis-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                <span>Demo scheduling or detailed consultation as needed</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/platform"
              className="flex-1 inline-flex items-center justify-center space-x-2 rounded-lg border-2 border-cannabis-green-600 px-6 py-3 text-cannabis-green-600 hover:bg-cannabis-green-50 transition-colors"
            >
              <span>Explore Platform</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            
            <Link
              href="/resources"
              className="flex-1 inline-flex items-center justify-center space-x-2 rounded-lg cannabis-gradient px-6 py-3 text-white hover:shadow-cannabis-lg transition-all duration-200"
            >
              <span>Browse Resources</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.form
      initial="hidden"
      animate="visible"
      variants={staggerContainerVariants}
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-cannabis p-8 space-y-8"
    >
      <motion.div variants={fadeInUpVariants} className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Contact Cannabis Experts
        </h2>
        <p className="text-gray-600">
          Get personalized information about CultivateCo's cannabis platform
        </p>
      </motion.div>

      {submitError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 text-sm">{submitError}</p>
        </div>
      )}

      {/* Contact Information */}
      <motion.div variants={fadeInUpVariants} className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
          Your Information
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name *
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className={cn(
                'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-cannabis-green-500 focus:border-cannabis-green-500 transition-colors',
                errors.firstName ? 'border-red-300' : 'border-gray-300'
              )}
              placeholder="Enter your first name"
            />
            {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name *
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className={cn(
                'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-cannabis-green-500 focus:border-cannabis-green-500 transition-colors',
                errors.lastName ? 'border-red-300' : 'border-gray-300'
              )}
              placeholder="Enter your last name"
            />
            {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Email *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={cn(
                'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-cannabis-green-500 focus:border-cannabis-green-500 transition-colors',
                errors.email ? 'border-red-300' : 'border-gray-300'
              )}
              placeholder="you@company.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className={cn(
                'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-cannabis-green-500 focus:border-cannabis-green-500 transition-colors',
                errors.phone ? 'border-red-300' : 'border-gray-300'
              )}
              placeholder="(555) 123-4567"
            />
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name *
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              className={cn(
                'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-cannabis-green-500 focus:border-cannabis-green-500 transition-colors',
                errors.company ? 'border-red-300' : 'border-gray-300'
              )}
              placeholder="Your cannabis business name"
            />
            {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company}</p>}
          </div>
        </div>
      </motion.div>

      {/* Inquiry Details */}
      <motion.div variants={fadeInUpVariants} className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
          How Can We Help?
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason for Contact *
            </label>
            <select
              value={formData.reason}
              onChange={(e) => handleInputChange('reason', e.target.value)}
              className={cn(
                'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-cannabis-green-500 focus:border-cannabis-green-500 transition-colors',
                errors.reason ? 'border-red-300' : 'border-gray-300'
              )}
            >
              <option value="">Select reason</option>
              {CANNABIS_CONTACT_REASONS.map(reason => (
                <option key={reason} value={reason}>{reason}</option>
              ))}
            </select>
            {errors.reason && <p className="mt-1 text-sm text-red-600">{errors.reason}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Size
            </label>
            <select
              value={formData.companySize}
              onChange={(e) => handleInputChange('companySize', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cannabis-green-500 focus:border-cannabis-green-500 transition-colors"
            >
              <option value="">Select company size</option>
              {CANNABIS_COMPANY_SIZES.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Implementation Timeline
            </label>
            <select
              value={formData.timeline}
              onChange={(e) => handleInputChange('timeline', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cannabis-green-500 focus:border-cannabis-green-500 transition-colors"
            >
              <option value="">Select timeline</option>
              <option value="Immediate">Immediate (within 1 month)</option>
              <option value="1-3 months">1-3 months</option>
              <option value="3-6 months">3-6 months</option>
              <option value="6-12 months">6-12 months</option>
              <option value="Research">Just researching</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Software
            </label>
            <input
              type="text"
              value={formData.currentSoftware}
              onChange={(e) => handleInputChange('currentSoftware', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cannabis-green-500 focus:border-cannabis-green-500 transition-colors"
              placeholder="What cannabis software do you currently use?"
            />
          </div>
        </div>
      </motion.div>

      {/* Message */}
      <motion.div variants={fadeInUpVariants} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Message *
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            rows={6}
            className={cn(
              'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-cannabis-green-500 focus:border-cannabis-green-500 transition-colors',
              errors.message ? 'border-red-300' : 'border-gray-300'
            )}
            placeholder="Tell us about your cannabis business needs, compliance challenges, or questions about our platform..."
          />
          {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
        </div>
      </motion.div>

      {/* Consent and Submit */}
      <motion.div variants={fadeInUpVariants} className="space-y-6">
        <div className="space-y-4">
          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={formData.consent}
              onChange={(e) => handleInputChange('consent', e.target.checked)}
              className={cn(
                'mt-1 text-cannabis-green-600 focus:ring-cannabis-green-500',
                errors.consent ? 'border-red-300' : ''
              )}
            />
            <span className="text-sm text-gray-600">
              I agree to be contacted by CultivateCo regarding my inquiry and consent 
              to receiving communications about cannabis compliance solutions. *
            </span>
          </label>
          {errors.consent && <p className="ml-6 text-sm text-red-600">{errors.consent}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            'w-full inline-flex items-center justify-center space-x-2 rounded-lg px-8 py-4 text-lg font-semibold text-white transition-all duration-200',
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'cannabis-gradient hover:shadow-cannabis-lg hover:scale-105'
          )}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Sending Message...</span>
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              <span>Send Message</span>
            </>
          )}
        </button>

        <p className="text-center text-sm text-gray-500">
          By submitting this form, you agree to our{' '}
          <Link href="/privacy" className="text-cannabis-green-600 hover:underline">
            Privacy Policy
          </Link>{' '}
          and{' '}
          <Link href="/terms" className="text-cannabis-green-600 hover:underline">
            Terms of Service
          </Link>
        </p>
      </motion.div>
    </motion.form>
  )
}

// ============================================================================
// CANNABIS CONTACT PAGE SECTIONS
// ============================================================================

const CannabisContactHeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cannabis-green-600 to-cannabis-blue-600 text-white py-20 lg:py-32">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainerVariants}
          className="max-w-4xl mx-auto space-y-8"
        >
          <motion.div variants={fadeInUpVariants} className="space-y-6">
            <div className="inline-flex items-center space-x-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium">
              <Phone className="h-4 w-4" />
              <span>Contact Cannabis Experts</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Get Cannabis
              <span className="block">Compliance</span>
              <span className="block">Answers</span>
            </h1>
            
            <p className="text-xl opacity-90 leading-relaxed">
              Connect with our cannabis compliance experts for personalized solutions, 
              enterprise pricing, and implementation guidance for your cannabis business.
            </p>
          </motion.div>

          <motion.div variants={fadeInUpVariants} className="grid md:grid-cols-4 gap-6">
            {CANNABIS_CONTACT_METHODS.map((method, index) => {
              const Icon = method.icon
              return (
                <div key={method.title} className="text-center">
                  <Icon className="h-8 w-8 mx-auto mb-3 opacity-75" />
                  <div className="text-lg font-semibold">{method.title}</div>
                  <div className="text-sm opacity-75">{method.response}</div>
                </div>
              )
            })}
          </motion.div>

          <motion.div variants={fadeInUpVariants} className="flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>2-hour response time</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>Cannabis industry experts</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>Free consultation</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

const CannabisContactMethodsSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const handleContactClick = (method: typeof CANNABIS_CONTACT_METHODS[0]) => {
    trackCannabisEvent('cannabis_contact_method_click', {
      method: method.title,
      action: method.action,
    })
  }

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
              Multiple Ways to
              <span className="block text-cannabis-green-700">Connect</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the method that works best for your cannabis business. 
              Our experts are standing by to help with your compliance needs.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {CANNABIS_CONTACT_METHODS.map((method, index) => {
            const Icon = method.icon
            return (
              <motion.div
                key={method.title}
                variants={scaleInVariants}
                className="bg-white rounded-2xl p-8 shadow-cannabis hover:shadow-cannabis-lg transition-all duration-300 text-center"
              >
                <div className="bg-cannabis-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-6">
                  <Icon className="h-8 w-8 text-cannabis-green-600" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">{method.title}</h3>
                <p className="text-gray-600 mb-4">{method.description}</p>
                
                <div className="space-y-2 text-sm text-gray-500 mb-6">
                  <div className="flex items-center justify-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{method.hours}</span>
                  </div>
                  <div className="font-medium text-cannabis-green-600">{method.response}</div>
                </div>

                {method.action.startsWith('#') ? (
                  <button
                    onClick={() => handleContactClick(method)}
                    className="w-full bg-cannabis-green-600 hover:bg-cannabis-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    {method.value}
                  </button>
                ) : method.action.startsWith('/') ? (
                  <Link
                    href={method.action}
                    onClick={() => handleContactClick(method)}
                    className="block w-full bg-cannabis-green-600 hover:bg-cannabis-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    {method.value}
                  </Link>
                ) : (
                  
                    href={method.action}
                    onClick={() => handleContactClick(method)}
                    className="block w-full bg-cannabis-green-600 hover:bg-cannabis-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    {method.value}
                  </a>
                )}
              </motion.div>
            )
          })}
        </motion.div>

        {/* Emergency Contact */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUpVariants}
          className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center"
        >
          <Shield className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-red-900 mb-2">
            Cannabis Compliance Emergency?
          </h3>
          <p className="text-red-700 mb-4">
            For urgent compliance violations or critical METRC issues affecting your cannabis license.
          </p>
          
            href="tel:+15551234911"
            className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            <Phone className="h-4 w-4" />
            <span>Emergency Line: {formatCannabisPhone('(555) 123-4911')}</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

const CannabisOfficeLocationsSection: React.FC = () => {
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
              Cannabis Office
              <span className="block text-cannabis-green-700">Locations</span>
            </h2>
            <p className="text-xl text-gray-600">
              Visit our cannabis compliance centers or schedule remote consultations
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
          className="grid lg:grid-cols-2 gap-12"
        >
          {CANNABIS_OFFICE_LOCATIONS.map((office, index) => (
            <motion.div
              key={`${office.city}-${office.state}`}
              variants={scaleInVariants}
              className="bg-cannabis-cream-50 rounded-2xl overflow-hidden shadow-cannabis hover:shadow-cannabis-lg transition-all duration-300"
            >
              <div className="relative h-48">
                <Image
                  src={office.image}
                  alt={`CultivateCo ${office.city} Office`}
                  width={600}
                  height={300}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold">{office.city}, {office.state}</h3>
                </div>
              </div>

              <div className="p-8 space-y-6">
                <p className="text-gray-700">{office.description}</p>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-cannabis-green-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">
                        {office.address}
                      </div>
                      <div className="text-gray-600">
                        {office.city}, {office.state} {office.zipCode}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-cannabis-green-600" />
                    
                      href={`tel:${office.phone.replace(/\D/g, '')}`}
                      className="font-medium text-gray-900 hover:text-cannabis-green-600 transition-colors"
                    >
                      {office.phone}
                    </a>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-cannabis-green-600" />
                    
                      href={`mailto:${office.email}`}
                      className="font-medium text-gray-900 hover:text-cannabis-green-600 transition-colors"
                    >
                      {office.email}
                    </a>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-cannabis-green-600" />
                    <span className="text-gray-700">{office.hours}</span>
                  </div>
                </div>

                <div className="flex space-x-4">
                  
                    href={`https://maps.google.com/?q=${encodeURIComponent(office.address + ', ' + office.city + ', ' + office.state)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center space-x-2 border-2 border-cannabis-green-600 text-cannabis-green-600 hover:bg-cannabis-green-50 font-semibold py-2 px-4 rounded-lg transition-colors"
                  >
                    <MapPin className="h-4 w-4" />
                    <span>Directions</span>
                  </a>
                  
                    href={`tel:${office.phone.replace(/\D/g, '')}`}
                    className="flex-1 inline-flex items-center justify-center space-x-2 cannabis-gradient text-white font-semibold py-2 px-4 rounded-lg hover:shadow-cannabis transition-all duration-200"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Call</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

const CannabisSupportSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUpVariants}>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              Cannabis Support
              <span className="block text-cannabis-green-700">Options</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get specialized help for different aspects of your cannabis operations. 
              Our expert teams are ready to assist with your specific needs.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
          className="grid lg:grid-cols-3 gap-8"
        >
          {CANNABIS_SUPPORT_OPTIONS.map((support, index) => {
            const Icon = support.icon
            return (
              <motion.div
                key={support.title}
                variants={scaleInVariants}
                className="bg-white rounded-2xl p-8 shadow-cannabis hover:shadow-cannabis-lg transition-all duration-300"
              >
                <div className="space-y-6">
                  <div className="bg-cannabis-green-100 rounded-full p-4 w-16 h-16">
                    <Icon className="h-8 w-8 text-cannabis-green-600" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{support.title}</h3>
                    <p className="text-gray-600">{support.description}</p>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-cannabis-green-600" />
                      
                        href={`mailto:${support.email}`}
                        className="text-cannabis-green-600 hover:underline"
                      >
                        {support.email}
                      </a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-cannabis-green-600" />
                      
                        href={`tel:${support.phone.replace(/\D/g, '')}`}
                        className="text-cannabis-green-600 hover:underline"
                      >
                        {support.phone}
                      </a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-cannabis-green-600" />
                      <span className="text-gray-600">{support.hours}</span>
                    </div>
                  </div>

                  
                    href={`mailto:${support.email}`}
                    className="block w-full bg-cannabis-green-600 hover:bg-cannabis-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-center"
                  >
                    Contact {support.title.split(' ')[1]}
                  </a>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// MAIN CANNABIS CONTACT PAGE COMPONENT
// ============================================================================

const CannabisContactPage: React.FC = () => {
  const seo: CannabisSEOData = {
    title: 'Contact Cannabis Experts | CultivateCo Sales & Support | Get Answers',
    description: 'Contact CultivateCo cannabis experts for sales inquiries, technical support, and compliance questions. 2-hour response time. Call (555) 123-CANN or email sales@cultivateco.com.',
    keywords: [
      'contact cannabis experts',
      'cannabis software sales',
      'cannabis compliance support',
      'dispensary software contact',
      'cannabis technical support',
      'metrc integration help',
      'cannabis platform sales',
      'cannabis software consultation',
      'dispensary management support',
      'cannabis pos support',
    ],
    ogTitle: 'Contact Cannabis Experts | Sales & Support | CultivateCo',
    ogDescription: 'Get personalized help from cannabis compliance experts. Sales inquiries, technical support, and consultation available. 2-hour response time guaranteed.',
    ogImage: 'https://cultivateco.com/og-cannabis-contact-experts.jpg',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      mainEntity: {
        '@type': 'Organization',
        name: 'CultivateCo',
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: '+1-555-123-2266',
            contactType: 'sales',
            availableLanguage: 'English',
          },
          {
            '@type': 'ContactPoint',
            email: 'sales@cultivateco.com',
            contactType: 'sales',
          },
        ],
        address: [
          {
            '@type': 'PostalAddress',
            streetAddress: '2500 Louisiana Blvd NE, Suite 200',
            addressLocality: 'Albuquerque',
            addressRegion: 'NM',
            postalCode: '87110',
          },
        ],
      },
    },
  }

  return (
    <CannabisLayout seo={seo}>
      <CannabisContactHeroSection />
      
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <CannabisContactFormComponent />
            </div>

            {/* Contact Info Sidebar */}
            <div className="space-y-8">
              {/* Quick Contact */}
              <div className="bg-cannabis-green-50 rounded-2xl p-6 space-y-4">
                <h3 className="font-semibold text-cannabis-green-900 mb-4">Quick Contact</h3>
                
                <div className="space-y-3">
                  
                    href="tel:+15551232266"
                    className="flex items-center space-x-3 p-3 bg-white rounded-lg hover:shadow-cannabis transition-all duration-200"
                  >
                    <Phone className="h-5 w-5 text-cannabis-green-600" />
                    <div>
                      <div className="font-medium text-gray-900">Call Sales</div>
                      <div className="text-sm text-gray-600">{formatCannabisPhone('(555) 123-CANN')}</div>
                    </div>
                  </a>
                  
                  
                    href="mailto:sales@cultivateco.com"
                    className="flex items-center space-x-3 p-3 bg-white rounded-lg hover:shadow-cannabis transition-all duration-200"
                  >
                    <Mail className="h-5 w-5 text-cannabis-green-600" />
                    <div>
                      <div className="font-medium text-gray-900">Email Sales</div>
                      <div className="text-sm text-gray-600">sales@cultivateco.com</div>
                    </div>
                  </a>

                  <Link
                    href="/demo"
                    className="flex items-center space-x-3 p-3 bg-white rounded-lg hover:shadow-cannabis transition-all duration-200"
                  >
                    <Calendar className="h-5 w-5 text-cannabis-green-600" />
                    <div>
                      <div className="font-medium text-gray-900">Book Demo</div>
                      <div className="text-sm text-gray-600">30-minute consultation</div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
                <h3 className="font-semibold text-gray-900 mb-4">Response Times</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Sales Inquiries</span>
                    <span className="text-sm font-medium text-cannabis-green-600">2 hours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Technical Support</span>
                    <span className="text-sm font-medium text-cannabis-green-600">4 hours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Demo Scheduling</span>
                    <span className="text-sm font-medium text-cannabis-green-600">1 hour</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Compliance Emergency</span>
                    <span className="text-sm font-medium text-red-600">Immediate</span>
                  </div>
                </div>
              </div>

              {/* Awards */}
              <div className="bg-gray-50 rounded-2xl p-6 text-center space-y-3">
                <Award className="h-8 w-8 text-cannabis-green-600 mx-auto" />
                <div className="text-sm font-medium text-gray-900">
                  Award-Winning Cannabis Support
                </div>
                <div className="text-xs text-gray-600">
                  Recognized for excellence in cannabis compliance assistance
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CannabisContactMethodsSection />
      <CannabisOfficeLocationsSection />
      <CannabisSupportSection />
    </CannabisLayout>
  )
}

export default CannabisContactPage
