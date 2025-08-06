/**
 * =============================================================================
 * CultivateCo Cannabis Demo Booking Page
 * =============================================================================
 * Comprehensive demo booking page with form and conversion optimization
 */

'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  Shield,
  Calculator,
  BarChart3,
  CheckCircle,
  Calendar,
  Clock,
  Users,
  Zap,
  Star,
  Building2,
  Phone,
  Mail,
  MapPin,
  Award,
  TrendingUp,
  Target,
  Smartphone,
  Monitor,
  Play,
  Download,
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
import { submitCannabisDemoRequest } from '@/lib/cannabis-api'
import type { 
  CannabisSEOData, 
  CannabisDemoRequest,
  CannabisTestimonial,
} from '@/types/cannabis-marketing'

// ============================================================================
// CANNABIS DEMO PAGE DATA
// ============================================================================

const CANNABIS_DEMO_BENEFITS = [
  {
    icon: Shield,
    title: 'Compliance Made Simple',
    description: 'See how our AI-powered compliance monitoring prevents violations and maintains perfect regulatory scores.',
    duration: '10 minutes',
  },
  {
    icon: Calculator,
    title: 'Cannabis POS Demo',
    description: 'Experience our intuitive POS system with tax calculation, age verification, and purchase limits.',
    duration: '15 minutes',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Explore powerful analytics showing sales insights, inventory optimization, and compliance trends.',
    duration: '10 minutes',
  },
  {
    icon: Target,
    title: 'METRC Integration',
    description: 'Watch seamless METRC synchronization with real-time package tracking and manifest management.',
    duration: '15 minutes',
  },
]

const CANNABIS_DEMO_STATS = [
  { label: 'Average Demo Length', value: '30 min', icon: Clock },
  { label: 'Questions Answered', value: '25+', icon: Users },
  { label: 'ROI Demonstrated', value: '300%', icon: TrendingUp },
  { label: 'Implementation Time', value: '2 weeks', icon: Zap },
]

const CANNABIS_DEMO_TESTIMONIALS: CannabisTestimonial[] = [
  {
    id: '1',
    name: 'Maria Gonzalez',
    title: 'Operations Director',
    company: 'Green Valley Cannabis',
    state: 'Colorado',
    image: '/testimonials/maria-gonzalez.jpg',
    quote: 'The demo showed us exactly how CultivateCo would solve our compliance headaches. We signed up the same day.',
    rating: 5,
    category: 'general',
    featured: true,
    verified: true,
    date: '2024-02-10',
  },
  {
    id: '2',
    name: 'James Rodriguez',
    title: 'CEO',
    company: 'Desert Sun Dispensary',
    state: 'New Mexico',
    image: '/testimonials/james-rodriguez.jpg',
    quote: 'Best 30 minutes I\'ve spent on software demos. CultivateCo\'s platform is exactly what our industry needs.',
    rating: 5,
    category: 'general',
    featured: true,
    verified: true,
    date: '2024-01-28',
  },
  {
    id: '3',
    name: 'Lisa Chen',
    title: 'Compliance Manager',
    company: 'Rocky Mountain Cannabis',
    state: 'Colorado',
    image: '/testimonials/lisa-chen.jpg',
    quote: 'The demo convinced our entire team. Seeing the compliance features in action made the decision easy.',
    rating: 5,
    category: 'compliance',
    featured: true,
    verified: true,
    date: '2024-02-05',
  },
]

const CANNABIS_BUSINESS_TYPES = [
  'Dispensary',
  'Cultivation',
  'Manufacturing',
  'Testing Lab',
  'Delivery Service',
  'Consulting',
  'Other',
]

const CANNABIS_MONTHLY_REVENUE_OPTIONS = [
  'Pre-revenue',
  'Less than $50K',
  '$50K - $100K',
  '$100K - $250K',
  '$250K - $500K',
  '$500K - $1M',
  '$1M+',
  'Prefer not to say',
]

const CANNABIS_TIMELINE_OPTIONS = [
  'Immediate (within 1 month)',
  '1-3 months',
  '3-6 months',
  '6-12 months',
  'Just researching',
]

const CANNABIS_INTERESTS = [
  'POS System',
  'Compliance Monitoring',
  'METRC Integration',
  'Analytics & Reporting',
  'Inventory Management',
  'Multi-location Management',
  'Mobile Apps',
  'API Integration',
]

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
  'Wisconsin', 'Wyoming',
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
// CANNABIS DEMO FORM COMPONENT
// ============================================================================

interface CannabisFormErrors {
  [key: string]: string
}

const CannabisDemoForm: React.FC = () => {
  const [formData, setFormData] = useState<CannabisDemoRequest>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    title: '',
    state: '',
    businessType: '',
    monthlyRevenue: '',
    currentSoftware: '',
    timeline: '',
    interests: [],
    questions: '',
    preferredTime: '',
    consent: false,
  })

  const [errors, setErrors] = useState<CannabisFormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string>('')

  const handleInputChange = (field: keyof CannabisDemoRequest, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleInterestToggle = (interest: string) => {
    const currentInterests = formData.interests
    const isSelected = currentInterests.includes(interest)
    
    const newInterests = isSelected
      ? currentInterests.filter(i => i !== interest)
      : [...currentInterests, interest]
    
    handleInputChange('interests', newInterests)
  }

  const validateForm = (): boolean => {
    const newErrors: CannabisFormErrors = {}

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
    if (!formData.title.trim()) newErrors.title = 'Title is required'
    if (!formData.state) newErrors.state = 'State is required'
    if (!formData.businessType) newErrors.businessType = 'Business type is required'
    if (!formData.monthlyRevenue) newErrors.monthlyRevenue = 'Revenue range is required'
    if (!formData.timeline) newErrors.timeline = 'Timeline is required'
    if (formData.interests.length === 0) newErrors.interests = 'Please select at least one area of interest'
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
      const sanitizedData: CannabisDemoRequest = {
        ...formData,
        firstName: sanitizeCannabisInput(formData.firstName),
        lastName: sanitizeCannabisInput(formData.lastName),
        email: sanitizeCannabisInput(formData.email),
        phone: formatCannabisPhone(formData.phone),
        company: sanitizeCannabisInput(formData.company),
        title: sanitizeCannabisInput(formData.title),
        currentSoftware: formData.currentSoftware ? sanitizeCannabisInput(formData.currentSoftware) : '',
        questions: formData.questions ? sanitizeCannabisInput(formData.questions) : '',
      }

      const result = await submitCannabisDemoRequest(sanitizedData)
      
      if (result.success) {
        setIsSubmitted(true)
        
        // Track successful demo request
        trackCannabisEvent('cannabis_demo_request_submitted', {
          business_type: formData.businessType,
          state: formData.state,
          revenue: formData.monthlyRevenue,
          timeline: formData.timeline,
          interests: formData.interests,
          lead_id: result.leadId,
        })
      } else {
        setSubmitError('Failed to submit demo request. Please try again or contact us directly.')
      }
    } catch (error) {
      console.error('Demo form submission error:', error)
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
              Demo Request Received!
            </h3>
            <p className="text-gray-600">
              Thank you for your interest in CultivateCo. Our cannabis experts will contact you 
              within 24 hours to schedule your personalized demo.
            </p>
          </div>

          <div className="bg-cannabis-green-50 rounded-lg p-6 space-y-4">
            <h4 className="font-semibold text-cannabis-green-900">What happens next?</h4>
            <div className="space-y-3 text-sm text-cannabis-green-800">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-cannabis-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                <span>Cannabis specialist reviews your requirements</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-cannabis-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                <span>Personalized demo scheduled within 24 hours</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-cannabis-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                <span>Live demo of features relevant to your business</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-cannabis-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">4</div>
                <span>Custom pricing and implementation plan</span>
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
              <Download className="w-4 h-4" />
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
          Book Your Cannabis Demo
        </h2>
        <p className="text-gray-600">
          See how CultivateCo can transform your cannabis operations in just 30 minutes.
        </p>
      </motion.div>

      {submitError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 text-sm">{submitError}</p>
        </div>
      )}

      {/* Personal Information */}
      <motion.div variants={fadeInUpVariants} className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
          Contact Information
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

          <div>
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={cn(
                'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-cannabis-green-500 focus:border-cannabis-green-500 transition-colors',
                errors.title ? 'border-red-300' : 'border-gray-300'
              )}
              placeholder="CEO, Owner, Manager, etc."
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
          </div>
        </div>
      </motion.div>

      {/* Business Information */}
      <motion.div variants={fadeInUpVariants} className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
          Business Information
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              State *
            </label>
            <select
              value={formData.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
              className={cn(
                'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-cannabis-green-500 focus:border-cannabis-green-500 transition-colors',
                errors.state ? 'border-red-300' : 'border-gray-300'
              )}
            >
              <option value="">Select your state</option>
              {US_STATES.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Type *
            </label>
            <select
              value={formData.businessType}
              onChange={(e) => handleInputChange('businessType', e.target.value)}
              className={cn(
                'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-cannabis-green-500 focus:border-cannabis-green-500 transition-colors',
                errors.businessType ? 'border-red-300' : 'border-gray-300'
              )}
            >
              <option value="">Select business type</option>
              {CANNABIS_BUSINESS_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.businessType && <p className="mt-1 text-sm text-red-600">{errors.businessType}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Revenue *
            </label>
            <select
              value={formData.monthlyRevenue}
              onChange={(e) => handleInputChange('monthlyRevenue', e.target.value)}
              className={cn(
                'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-cannabis-green-500 focus:border-cannabis-green-500 transition-colors',
                errors.monthlyRevenue ? 'border-red-300' : 'border-gray-300'
              )}
            >
              <option value="">Select revenue range</option>
              {CANNABIS_MONTHLY_REVENUE_OPTIONS.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {errors.monthlyRevenue && <p className="mt-1 text-sm text-red-600">{errors.monthlyRevenue}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Implementation Timeline *
            </label>
            <select
              value={formData.timeline}
              onChange={(e) => handleInputChange('timeline', e.target.value)}
              className={cn(
                'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-cannabis-green-500 focus:border-cannabis-green-500 transition-colors',
                errors.timeline ? 'border-red-300' : 'border-gray-300'
              )}
            >
              <option value="">Select timeline</option>
              {CANNABIS_TIMELINE_OPTIONS.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {errors.timeline && <p className="mt-1 text-sm text-red-600">{errors.timeline}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Software (Optional)
          </label>
          <input
            type="text"
            value={formData.currentSoftware}
            onChange={(e) => handleInputChange('currentSoftware', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cannabis-green-500 focus:border-cannabis-green-500 transition-colors"
            placeholder="What cannabis software do you currently use?"
          />
        </div>
      </motion.div>

      {/* Areas of Interest */}
      <motion.div variants={fadeInUpVariants} className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
          Areas of Interest *
        </h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {CANNABIS_INTERESTS.map(interest => (
            <label
              key={interest}
              className={cn(
                'flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-all duration-200',
                formData.interests.includes(interest)
                  ? 'border-cannabis-green-500 bg-cannabis-green-50'
                  : 'border-gray-200 hover:border-cannabis-green-300'
              )}
            >
              <input
                type="checkbox"
                checked={formData.interests.includes(interest)}
                onChange={() => handleInterestToggle(interest)}
                className="text-cannabis-green-600 focus:ring-cannabis-green-500"
              />
              <span className="text-sm font-medium text-gray-700">{interest}</span>
            </label>
          ))}
        </div>
        {errors.interests && <p className="mt-1 text-sm text-red-600">{errors.interests}</p>}
      </motion.div>

      {/* Additional Information */}
      <motion.div variants={fadeInUpVariants} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Questions or Specific Needs (Optional)
          </label>
          <textarea
            value={formData.questions}
            onChange={(e) => handleInputChange('questions', e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cannabis-green-500 focus:border-cannabis-green-500 transition-colors"
            placeholder="Tell us about your specific cannabis compliance challenges or questions..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Demo Time
          </label>
          <input
            type="text"
            value={formData.preferredTime}
            onChange={(e) => handleInputChange('preferredTime', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cannabis-green-500 focus:border-cannabis-green-500 transition-colors"
            placeholder="e.g., Mornings, Afternoons, Specific days/times"
          />
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
              I agree to be contacted by CultivateCo regarding my demo request and consent 
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
              <span>Submitting Demo Request...</span>
            </>
          ) : (
            <>
              <Calendar className="h-5 w-5" />
              <span>Book My Cannabis Demo</span>
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
// CANNABIS DEMO PAGE SECTIONS
// ============================================================================

const CannabisDemoHeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cannabis-green-600 to-cannabis-blue-600 text-white py-20 lg:py-32">
      {/* Cannabis Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Cannabis Demo Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainerVariants}
            className="space-y-8"
          >
            <motion.div variants={fadeInUpVariants} className="space-y-6">
              <div className="inline-flex items-center space-x-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium">
                <Calendar className="h-4 w-4" />
                <span>Personalized Cannabis Demo</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                See Cannabis
                <span className="block">Compliance</span>
                <span className="block">In Action</span>
              </h1>
              
              <p className="text-xl opacity-90 leading-relaxed">
                Watch how CultivateCo transforms cannabis operations with live compliance 
                monitoring, seamless POS integration, and powerful analytics in just 30 minutes.
              </p>
            </motion.div>

            <motion.div variants={fadeInUpVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {CANNABIS_DEMO_STATS.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={stat.label} className="text-center">
                    <Icon className="h-6 w-6 mx-auto mb-2 opacity-75" />
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm opacity-75">{stat.label}</div>
                  </div>
                )
              })}
            </motion.div>

            <motion.div variants={fadeInUpVariants} className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>No software installation</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>Live Q&A with experts</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>Custom pricing included</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Cannabis Demo Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 space-y-6">
              <h2 className="text-2xl font-bold">What You'll See</h2>
              
              {CANNABIS_DEMO_BENEFITS.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <div key={benefit.title} className="flex items-start space-x-4">
                    <div className="bg-white/20 rounded-lg p-2">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold">{benefit.title}</h3>
                        <span className="text-sm opacity-75">{benefit.duration}</span>
                      </div>
                      <p className="text-sm opacity-90">{benefit.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>
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
              Demo Success
              <span className="block text-cannabis-green-700">Stories</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See why cannabis operators choose CultivateCo after just one demo. 
              Real results from real customers who saw the difference.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
          className="grid lg:grid-cols-3 gap-8"
        >
          {CANNABIS_DEMO_TESTIMONIALS.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={scaleInVariants}
              className="bg-white rounded-2xl p-8 shadow-cannabis hover:shadow-cannabis-lg transition-all duration-300"
            >
              <div className="space-y-6">
                {/* Cannabis Rating Stars */}
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Cannabis Demo Testimonial */}
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

                {/* Cannabis Demo Badge */}
                <div className="flex items-center space-x-2 text-sm text-cannabis-green-600">
                  <Award className="h-4 w-4" />
                  <span>Demo to Customer in 1 Day</span>
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
// MAIN CANNABIS DEMO PAGE COMPONENT
// ============================================================================

const CannabisDemoPage: React.FC = () => {
  const seo: CannabisSEOData = {
    title: 'Book Cannabis Demo | See CultivateCo Platform Live | Free 30-Minute Demo',
    description: 'Book a free 30-minute demo of CultivateCo cannabis platform. See compliance monitoring, POS system, and analytics in action. Custom pricing included.',
    keywords: [
      'cannabis demo',
      'cannabis software demo',
      'dispensary software demo',
      'cannabis compliance demo',
      'cannabis pos demo',
      'metrc integration demo',
      'book cannabis demo',
      'cannabis platform demo',
      'dispensary management demo',
      'cannabis analytics demo',
    ],
    ogTitle: 'Book Free Cannabis Demo | See CultivateCo Platform Live',
    ogDescription: 'Watch how CultivateCo transforms cannabis operations with live compliance monitoring, POS integration, and analytics in just 30 minutes.',
    ogImage: 'https://cultivateco.com/og-cannabis-demo-booking.jpg',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'CultivateCo Cannabis Platform Demo',
      description: 'Free 30-minute personalized demo of complete cannabis compliance platform',
      provider: {
        '@type': 'Organization',
        name: 'CultivateCo',
      },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        description: 'Free 30-minute cannabis platform demo',
      },
    },
  }

  return (
    <CannabisLayout seo={seo}>
      <CannabisDemoHeroSection />
      
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Cannabis Demo Form */}
            <div className="lg:col-span-2">
              <CannabisDemoForm />
            </div>

            {/* Cannabis Demo Info Sidebar */}
            <div className="space-y-8">
              {/* Contact Info */}
              <div className="bg-cannabis-cream-50 rounded-2xl p-6 space-y-4">
                <h3 className="font-semibold text-gray-900 mb-4">Need Help?</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-cannabis-green-600" />
                    <div>
                      <div className="font-medium text-gray-900">Call Us</div>
                      <div className="text-sm text-gray-600">{formatCannabisPhone('(555) 123-CANN')}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-cannabis-green-600" />
                    <div>
                      <div className="font-medium text-gray-900">Email</div>
                      <div className="text-sm text-gray-600">demo@cultivateco.com</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-cannabis-green-600" />
                    <div>
                      <div className="font-medium text-gray-900">Business Hours</div>
                      <div className="text-sm text-gray-600">Mon-Fri 8AM-6PM MT</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Demo Benefits */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
                <h3 className="font-semibold text-gray-900 mb-4">Demo Benefits</h3>
                
                <div className="space-y-3">
                  {[
                    'Live platform walkthrough',
                    'Custom ROI calculation',
                    'Implementation timeline',
                    'Personalized pricing',
                    'Q&A with cannabis experts',
                    'Integration planning',
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-cannabis-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security Badge */}
              <div className="bg-gray-50 rounded-2xl p-6 text-center space-y-3">
                <Shield className="h-8 w-8 text-cannabis-green-600 mx-auto" />
                <div className="text-sm font-medium text-gray-900">
                  SOC 2 Compliant & Cannabis Secure
                </div>
                <div className="text-xs text-gray-600">
                  Your data is protected with bank-level security
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CannabisTestimonialsSection />
    </CannabisLayout>
  )
}

export default CannabisDemoPage
