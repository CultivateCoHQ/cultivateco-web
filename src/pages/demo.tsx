/**
 * =============================================================================
 * CultivateCo Enterprise Cannabis Consultation Booking Page
 * =============================================================================
 * Pharmaceutical-grade cannabis compliance consultation for enterprise prospects
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
  Globe,
  Lock,
  Eye,
  AlertTriangle,
  DollarSign,
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
// ENTERPRISE CANNABIS CONSULTATION DATA
// ============================================================================

const ENTERPRISE_CONSULTATION_BENEFITS = [
  {
    icon: Shield,
    title: 'Pharmaceutical-Grade Validation',
    description: 'See our IQ/OQ/PQ documentation framework and 21 CFR Part 11 compliant electronic records system.',
    duration: '15 minutes',
    riskMitigation: 'Prevents $500K-$2M+ license revocation risk'
  },
  {
    icon: Lock,
    title: 'Banking Compliance Demonstration',
    description: 'Live demonstration of BSA/AML transaction monitoring and institutional investor-ready audit trails.',
    duration: '15 minutes',
    riskMitigation: 'Enables banking partnerships worth $200K-$1M+ annually'
  },
  {
    icon: Globe,
    title: 'Multi-State Operations Platform',
    description: 'Unified compliance management across 15+ states with real-time regulatory change monitoring.',
    duration: '15 minutes',
    riskMitigation: 'Eliminates 80% of compliance overhead across jurisdictions'
  },
  {
    icon: BarChart3,
    title: 'Enterprise ROI Analysis',
    description: 'Custom ROI calculation showing $1.65M+ average annual risk protection for your specific operation.',
    duration: '15 minutes',
    riskMitigation: 'Quantifies exact savings and risk mitigation value'
  },
]

const ENTERPRISE_CONSULTATION_STATS = [
  { label: 'Average Consultation', value: '60 min', icon: Clock },
  { label: 'Executive Questions Answered', value: '50+', icon: Users },
  { label: 'Average ROI Demonstrated', value: '400%', icon: TrendingUp },
  { label: 'Enterprise Implementation', value: '2 weeks', icon: Zap },
]

const ENTERPRISE_TESTIMONIALS: CannabisTestimonial[] = [
  {
    id: '1',
    name: 'Dr. Sarah Martinez',
    title: 'Chief Compliance Officer',
    company: 'Verde Holdings (12 States)',
    state: 'Multi-State',
    image: '/testimonials/sarah-martinez.jpg',
    quote: 'The enterprise consultation showed us exactly how pharmaceutical-grade compliance would eliminate our $2M+ annual risk exposure. We signed the next day.',
    rating: 5,
    category: 'enterprise',
    featured: true,
    verified: true,
    date: '2024-02-10',
  },
  {
    id: '2',
    name: 'Michael Chen',
    title: 'CEO',
    company: 'Pacific Cannabis Group',
    state: 'California',
    image: '/testimonials/michael-chen.jpg',
    quote: 'The SOC 2 Type II certification was crucial for our Series B. CultivateCo\'s enterprise consultation convinced our institutional investors immediately.',
    rating: 5,
    category: 'enterprise',
    featured: true,
    verified: true,
    date: '2024-01-28',
  },
  {
    id: '3',
    name: 'Jennifer Kim',
    title: 'COO',
    company: 'Rocky Mountain Cannabis',
    state: 'Colorado',
    image: '/testimonials/jennifer-kim.jpg',
    quote: 'Best enterprise software consultation I\'ve experienced. The pharmaceutical-grade approach is exactly what our industry needs for institutional credibility.',
    rating: 5,
    category: 'enterprise',
    featured: true,
    verified: true,
    date: '2024-02-05',
  },
]

const ENTERPRISE_BUSINESS_TYPES = [
  'Multi-State Operator (MSO)',
  'Single-State Enterprise (5+ locations)',
  'Cultivation Facility (Large Scale)',
  'Manufacturing & Processing',
  'Testing Laboratory',
  'Institutional Investor/Fund',
  'Cannabis Holding Company',
  'Other Enterprise Operation',
]

const ENTERPRISE_REVENUE_OPTIONS = [
  '$1M - $5M annually',
  '$5M - $15M annually', 
  '$15M - $50M annually',
  '$50M - $100M annually',
  '$100M+ annually',
  'Pre-revenue (institutional backing)',
  'Confidential/Custom discussion',
]

const ENTERPRISE_URGENCY_OPTIONS = [
  'Immediate compliance crisis (< 30 days)',
  'Regulatory deadline approaching (1-3 months)',
  'Planned expansion (3-6 months)',
  'Strategic initiative (6-12 months)',
  'Due diligence for investment',
  'Evaluating current solution replacement',
]

const ENTERPRISE_COMPLIANCE_CHALLENGES = [
  'Multi-state regulatory coordination',
  'Banking relationship requirements',
  'Institutional investor compliance',
  'SOC 2 / Security certification needs',
  'Audit preparation and documentation',
  'Risk mitigation and insurance',
  'Federal legalization preparation',
  'Export/international requirements',
  'Pharmaceutical-grade validation',
  'Custom compliance requirements',
]

// ============================================================================
// ENTERPRISE FORM COMPONENT
// ============================================================================

interface EnterpriseFormErrors {
  [key: string]: string
}

const EnterpriseConsultationForm: React.FC = () => {
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

  const [errors, setErrors] = useState<EnterpriseFormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string>('')

  const handleInputChange = (field: keyof CannabisDemoRequest, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleChallengeToggle = (challenge: string) => {
    const currentChallenges = formData.interests
    const isSelected = currentChallenges.includes(challenge)
    
    const newChallenges = isSelected
      ? currentChallenges.filter(i => i !== challenge)
      : [...currentChallenges, challenge]
    
    handleInputChange('interests', newChallenges)
  }

  const validateForm = (): boolean => {
    const newErrors: EnterpriseFormErrors = {}

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Business email is required'
    } else if (!isValidCannabisEmail(formData.email)) {
      newErrors.email = 'Please enter a valid business email address'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!isValidCannabisPhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }
    if (!formData.company.trim()) newErrors.company = 'Company name is required'
    if (!formData.title.trim()) newErrors.title = 'Executive title is required'
    if (!formData.businessType) newErrors.businessType = 'Business type is required'
    if (!formData.monthlyRevenue) newErrors.monthlyRevenue = 'Revenue range is required'
    if (!formData.timeline) newErrors.timeline = 'Urgency level is required'
    if (formData.interests.length === 0) newErrors.interests = 'Please select at least one compliance challenge'
    if (!formData.consent) newErrors.consent = 'Consent is required for enterprise consultation'

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
        
        trackCannabisEvent('enterprise_consultation_request_submitted', {
          business_type: formData.businessType,
          revenue: formData.monthlyRevenue,
          urgency: formData.timeline,
          challenges: formData.interests,
          lead_id: result.leadId,
          lead_score: 'enterprise',
        })
      } else {
        setSubmitError('Failed to submit consultation request. Please contact us directly at enterprise@cultivateco.com')
      }
    } catch (error) {
      console.error('Enterprise consultation submission error:', error)
      setSubmitError('An unexpected error occurred. Please contact enterprise@cultivateco.com directly.')
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
        className="bg-white rounded-2xl shadow-lg p-8 text-center border border-teal-200"
      >
        <div className="space-y-6">
          <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-teal-600" />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Enterprise Consultation Requested
            </h3>
            <p className="text-gray-600">
              Our pharmaceutical-grade compliance experts will contact you within 4 business hours 
              to schedule your confidential enterprise consultation.
            </p>
          </div>

          <div className="bg-teal-50 rounded-lg p-6 space-y-4 border border-teal-200">
            <h4 className="font-semibold text-teal-900">Your Enterprise Consultation Process</h4>
            <div className="space-y-3 text-sm text-teal-800">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                <span>Compliance expert reviews your enterprise requirements</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                <span>60-minute executive consultation scheduled (within 4 hours)</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                <span>Live demonstration of pharmaceutical-grade capabilities</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs font-bold">4</div>
                <span>Custom ROI analysis and risk mitigation assessment</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center text-xs font-bold">5</div>
                <span>Enterprise pricing proposal and implementation timeline</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/platform"
              className="flex-1 inline-flex items-center justify-center space-x-2 rounded-lg border-2 border-teal-600 px-6 py-3 text-teal-600 hover:bg-teal-50 transition-colors"
            >
              <span>Explore Platform</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            
            <Link
              href="/pricing"
              className="flex-1 inline-flex items-center justify-center space-x-2 rounded-lg bg-teal-600 px-6 py-3 text-white hover:bg-teal-700 transition-colors"
            >
              <span>Enterprise Pricing</span>
              <DollarSign className="w-4 h-4" />
            </Link>
          </div>

          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Urgent compliance needs?</p>
            <p className="text-sm">
              <Phone className="inline w-4 h-4 mr-1" />
              Call enterprise hotline: <span className="font-semibold text-teal-600">(555) 123-ENTERPRISE</span>
            </p>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.form
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
          }
        }
      }}
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-lg p-8 space-y-8 border border-teal-200"
    >
      <motion.div 
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
        }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Schedule Enterprise Consultation
        </h2>
        <p className="text-gray-600">
          Confidential 60-minute consultation on pharmaceutical-grade cannabis compliance for enterprise operations.
        </p>
        <div className="mt-4 inline-flex items-center space-x-2 text-sm bg-teal-50 text-teal-800 px-4 py-2 rounded-full border border-teal-200">
          <Shield className="w-4 h-4" />
          <span>SOC 2 Type II Certified • Enterprise Security</span>
        </div>
      </motion.div>

      {submitError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 text-sm">{submitError}</p>
        </div>
      )}

      {/* Executive Information */}
      <motion.div 
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
        }}
        className="space-y-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
          Executive Contact Information
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
                'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors',
                errors.firstName ? 'border-red-300' : 'border-gray-300'
              )}
              placeholder="Executive first name"
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
                'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors',
                errors.lastName ? 'border-red-300' : 'border-gray-300'
              )}
              placeholder="Executive last name"
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
                'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors',
                errors.email ? 'border-red-300' : 'border-gray-300'
              )}
              placeholder="executive@company.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Direct Phone *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className={cn(
                'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors',
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
                'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors',
                errors.company ? 'border-red-300' : 'border-gray-300'
              )}
              placeholder="Cannabis enterprise name"
            />
            {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Executive Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={cn(
                'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors',
                errors.title ? 'border-red-300' : 'border-gray-300'
              )}
              placeholder="CEO, COO, Chief Compliance Officer, etc."
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
          </div>
        </div>
      </motion.div>

      {/* Enterprise Operation Details */}
      <motion.div 
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
        }}
        className="space-y-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
          Enterprise Operation Details
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enterprise Business Type *
            </label>
            <select
              value={formData.businessType}
              onChange={(e) => handleInputChange('businessType', e.target.value)}
              className={cn(
                'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors',
                errors.businessType ? 'border-red-300' : 'border-gray-300'
              )}
            >
              <option value="">Select enterprise type</option>
              {ENTERPRISE_BUSINESS_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.businessType && <p className="mt-1 text-sm text-red-600">{errors.businessType}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annual Revenue Range *
            </label>
            <select
              value={formData.monthlyRevenue}
              onChange={(e) => handleInputChange('monthlyRevenue', e.target.value)}
              className={cn(
                'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors',
                errors.monthlyRevenue ? 'border-red-300' : 'border-gray-300'
              )}
            >
              <option value="">Select revenue range</option>
              {ENTERPRISE_REVENUE_OPTIONS.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {errors.monthlyRevenue && <p className="mt-1 text-sm text-red-600">{errors.monthlyRevenue}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Implementation Urgency *
            </label>
            <select
              value={formData.timeline}
              onChange={(e) => handleInputChange('timeline', e.target.value)}
              className={cn(
                'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors',
                errors.timeline ? 'border-red-300' : 'border-gray-300'
              )}
            >
              <option value="">Select urgency level</option>
              {ENTERPRISE_URGENCY_OPTIONS.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {errors.timeline && <p className="mt-1 text-sm text-red-600">{errors.timeline}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Compliance Solution
            </label>
            <input
              type="text"
              value={formData.currentSoftware}
              onChange={(e) => handleInputChange('currentSoftware', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
              placeholder="Current software or manual processes"
            />
          </div>
        </div>
      </motion.div>

      {/* Enterprise Compliance Challenges */}
      <motion.div 
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
        }}
        className="space-y-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
          Primary Compliance Challenges *
        </h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {ENTERPRISE_COMPLIANCE_CHALLENGES.map(challenge => (
            <label
              key={challenge}
              className={cn(
                'flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-all duration-200',
                formData.interests.includes(challenge)
                  ? 'border-teal-500 bg-teal-50'
                  : 'border-gray-200 hover:border-teal-300'
              )}
            >
              <input
                type="checkbox"
                checked={formData.interests.includes(challenge)}
                onChange={() => handleChallengeToggle(challenge)}
                className="text-teal-600 focus:ring-teal-500"
              />
              <span className="text-sm font-medium text-gray-700">{challenge}</span>
            </label>
          ))}
        </div>
        {errors.interests && <p className="mt-1 text-sm text-red-600">{errors.interests}</p>}
      </motion.div>

      {/* Additional Details */}
      <motion.div 
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
        }}
        className="space-y-6"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Specific Compliance Requirements or Questions
          </label>
          <textarea
            value={formData.questions}
            onChange={(e) => handleInputChange('questions', e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
            placeholder="Describe your specific enterprise compliance challenges, regulatory deadlines, or pharmaceutical-grade requirements..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Consultation Time
          </label>
          <input
            type="text"
            value={formData.preferredTime}
            onChange={(e) => handleInputChange('preferredTime', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
            placeholder="e.g., Weekday mornings, specific time zones, executive calendar availability"
          />
        </div>
      </motion.div>

      {/* Consent and Submit */}
      <motion.div 
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
        }}
        className="space-y-6"
      >
        <div className="space-y-4">
          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={formData.consent}
              onChange={(e) => handleInputChange('consent', e.target.checked)}
              className={cn(
                'mt-1 text-teal-600 focus:ring-teal-500',
                errors.consent ? 'border-red-300' : ''
              )}
            />
            <span className="text-sm text-gray-600">
              I authorize CultivateCo to contact me regarding enterprise cannabis compliance solutions 
              and agree to confidential discussion of our compliance requirements and business operations. 
              I understand this consultation is for qualified enterprise prospects only. *
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
              : 'bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 hover:shadow-lg hover:scale-105'
          )}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Submitting Enterprise Request...</span>
            </>
          ) : (
            <>
              <Calendar className="h-5 w-5" />
              <span>Schedule Enterprise Consultation</span>
            </>
          )}
        </button>

        <p className="text-center text-sm text-gray-500">
          By submitting, you agree to our{' '}
          <Link href="/privacy" className="text-teal-600 hover:underline">
            Privacy Policy
          </Link>{' '}
          and{' '}
          <Link href="/terms" className="text-teal-600 hover:underline">
            Enterprise Terms
          </Link>
        </p>
      </motion.div>
    </motion.form>
  )
}

// ============================================================================
// ENTERPRISE CONSULTATION PAGE SECTIONS
// ============================================================================

const EnterpriseConsultationHeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-600 text-white py-20 lg:py-32">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
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
            className="space-y-8"
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
                <span>Enterprise Cannabis Consultation</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Pharmaceutical-Grade
                <span className="block">Cannabis Compliance</span>
                <span className="block text-cyan-200">Consultation</span>
              </h1>
              
              <p className="text-xl opacity-90 leading-relaxed">
                Exclusive 60-minute consultation for enterprise cannabis operations. See how pharmaceutical-grade 
                compliance prevents $50K-$2M+ in regulatory fines while enabling banking partnerships and institutional investment.
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
              className="grid grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {ENTERPRISE_CONSULTATION_STATS.map((stat, index) => {
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

            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 60 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.6, ease: 'easeOut' }
                }
              }}
              className="flex items-center space-x-4 text-sm"
            >
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>Confidential enterprise discussion</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>Custom ROI analysis included</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>Executive-level consultation</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 space-y-6">
              <h2 className="text-2xl font-bold">Consultation Agenda</h2>
              
              {ENTERPRISE_CONSULTATION_BENEFITS.map((benefit, index) => {
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
                      <p className="text-sm opacity-90 mb-2">{benefit.description}</p>
                      <div className="text-xs bg-white/20 rounded px-2 py-1 inline-block">
                        {benefit.riskMitigation}
                      </div>
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

const EnterpriseTestimonialsSection: React.FC = () => {
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
              Enterprise Consultation
              <span className="block text-teal-700">Success Stories</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              C-level executives share why they chose pharmaceutical-grade compliance after their enterprise consultation.
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
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-teal-100"
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

                <div className="flex items-center space-x-2 text-sm text-teal-600">
                  <Award className="h-4 w-4" />
                  <span>Consultation to Contract in 48 Hours</span>
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
// MAIN ENTERPRISE CONSULTATION PAGE COMPONENT
// ============================================================================

const EnterpriseConsultationPage: React.FC = () => {
  const seo: CannabisSEOData = {
    title: 'Enterprise Cannabis Compliance Consultation | Pharmaceutical-Grade Cannabis Platform | CultivateCo',
    description: 'Schedule confidential 60-minute enterprise consultation on pharmaceutical-grade cannabis compliance. SOC 2 certified platform prevents $50K-$2M+ in regulatory fines.',
    keywords: [
      'enterprise cannabis consultation',
      'pharmaceutical-grade cannabis compliance',
      'cannabis enterprise software demo',
      'multi-state cannabis compliance',
      'cannabis banking compliance',
      'SOC 2 cannabis platform',
      'institutional cannabis investors',
      'cannabis compliance consultation',
      'enterprise cannabis platform',
      'pharmaceutical cannabis validation',
    ],
    ogTitle: 'Enterprise Cannabis Compliance Consultation | CultivateCo',
    ogDescription: 'Exclusive consultation for enterprise cannabis operations. See how pharmaceutical-grade compliance prevents regulatory fines and enables banking partnerships.',
    ogImage: 'https://cultivateco.com/og-enterprise-cannabis-consultation.jpg',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Enterprise Cannabis Compliance Consultation',
      description: '60-minute confidential consultation on pharmaceutical-grade cannabis compliance for enterprise operations',
      provider: {
        '@type': 'Organization',
        name: 'CultivateCo',
      },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        description: 'Confidential enterprise consultation with custom ROI analysis',
      },
    },
  }

  return (
    <CannabisLayout seo={seo}>
      <EnterpriseConsultationHeroSection />
      
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <EnterpriseConsultationForm />
            </div>

            <div className="space-y-8">
              {/* Enterprise Contact Info */}
              <div className="bg-teal-50 rounded-2xl p-6 space-y-4 border border-teal-200">
                <h3 className="font-semibold text-gray-900 mb-4">Enterprise Support</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-teal-600" />
                    <div>
                      <div className="font-medium text-gray-900">Enterprise Hotline</div>
                      <div className="text-sm text-gray-600">(555) 123-ENTERPRISE</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-teal-600" />
                    <div>
                      <div className="font-medium text-gray-900">Executive Email</div>
                      <div className="text-sm text-gray-600">enterprise@cultivateco.com</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-teal-600" />
                    <div>
                      <div className="font-medium text-gray-900">Consultation Hours</div>
                      <div className="text-sm text-gray-600">Mon-Fri 7AM-7PM MT</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enterprise Benefits */}
              <div className="bg-white rounded-2xl border-2 border-teal-200 p-6 space-y-4">
                <h3 className="font-semibold text-gray-900 mb-4">Consultation Includes</h3>
                
                <div className="space-y-3">
                  {[
                    'Live pharmaceutical-grade platform demonstration',
                    'Custom ROI and risk mitigation analysis',
                    'Multi-state compliance strategy session',
                    'Banking partnership readiness assessment',
                    'Implementation timeline and resource planning',
                    'Enterprise pricing proposal',
                    'Dedicated compliance officer introduction',
                    'Executive references and case studies',
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-teal-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Risk Protection Value */}
              <div className="bg-gradient-to-br from-teal-600 to-cyan-600 text-white rounded-2xl p-6 space-y-3">
                <Shield className="h-8 w-8 mx-auto" />
                <div className="text-center">
                  <div className="text-2xl font-bold">$1.65M</div>
                  <div className="text-sm opacity-90">Average Annual Risk Protection</div>
                </div>
                <div className="text-xs text-center opacity-75">
                  Pharmaceutical-grade compliance prevents regulatory fines, 
                  enables banking partnerships, and protects enterprise operations
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EnterpriseTestimonialsSection />
    </CannabisLayout>
  )
}

export default EnterpriseConsultationPage
