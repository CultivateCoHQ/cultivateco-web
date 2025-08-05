'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  ArrowRight, 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  Shield, 
  Building2, 
  User, 
  CheckCircle, 
  AlertCircle,
  Leaf,
  FileText,
  MapPin
} from 'lucide-react'
import { useCannabisAuth } from '@/providers/auth-provider'
import { CannabisThemeContainer } from '@/providers/theme-provider'
import { isValidEmail, isValidPhone } from '@/lib/utils'

/**
 * =============================================================================
 * CultivateCo Cannabis Business Signup Page
 * =============================================================================
 * Multi-step cannabis business registration with compliance validation
 */

interface CannabisSignupData {
  // Business Information
  businessName: string
  licenseNumber: string
  licenseType: string
  businessAddress: string
  businessCity: string
  businessState: string
  businessZip: string
  businessPhone: string
  
  // User Account
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  role: string
  
  // Legal & Compliance
  hasValidLicense: boolean
  agreedToTerms: boolean
  agreedToCompliance: boolean
}

interface SignupErrors {
  [key: string]: string
}

type SignupStep = 'business' | 'account' | 'compliance' | 'complete'

export default function CannabisSignupPage() {
  const router = useRouter()
  const { register, isLoading, isAuthenticated } = useCannabisAuth()
  
  // Cannabis signup state
  const [currentStep, setCurrentStep] = useState<SignupStep>('business')
  const [signupData, setSignupData] = useState<CannabisSignupData>({
    businessName: '',
    licenseNumber: '',
    licenseType: 'adult-use-retail',
    businessAddress: '',
    businessCity: '',
    businessState: 'NM',
    businessZip: '',
    businessPhone: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'owner',
    hasValidLicense: false,
    agreedToTerms: false,
    agreedToCompliance: false,
  })
  
  const [errors, setErrors] = useState<SignupErrors>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.push('/app/dashboard')
    }
  }, [isAuthenticated, isLoading, router])

  /**
   * Handle form input changes
   */
  const handleInputChange = (field: keyof CannabisSignupData, value: string | boolean) => {
    setSignupData(prev => ({ ...prev, [field]: value }))
    
    // Clear field-specific errors
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  /**
   * Validate current step
   */
  const validateCurrentStep = (): boolean => {
    const newErrors: SignupErrors = {}

    switch (currentStep) {
      case 'business':
        if (!signupData.businessName.trim()) {
          newErrors.businessName = 'Cannabis business name is required'
        }
        
        if (!signupData.licenseNumber.trim()) {
          newErrors.licenseNumber = 'Cannabis license number is required'
        } else if (!/^[A-Z0-9-]+$/i.test(signupData.licenseNumber)) {
          newErrors.licenseNumber = 'Invalid cannabis license format'
        }
        
        if (!signupData.businessAddress.trim()) {
          newErrors.businessAddress = 'Cannabis business address is required'
        }
        
        if (!signupData.businessCity.trim()) {
          newErrors.businessCity = 'Cannabis business city is required'
        }
        
        if (!signupData.businessZip.trim()) {
          newErrors.businessZip = 'Cannabis business ZIP code is required'
        } else if (!/^\d{5}(-\d{4})?$/.test(signupData.businessZip)) {
          newErrors.businessZip = 'Invalid ZIP code format'
        }
        
        if (!signupData.businessPhone.trim()) {
          newErrors.businessPhone = 'Cannabis business phone is required'
        } else if (!isValidPhone(signupData.businessPhone)) {
          newErrors.businessPhone = 'Invalid phone number format'
        }
        break

      case 'account':
        if (!signupData.firstName.trim()) {
          newErrors.firstName = 'First name is required'
        }
        
        if (!signupData.lastName.trim()) {
          newErrors.lastName = 'Last name is required'
        }
        
        if (!signupData.email.trim()) {
          newErrors.email = 'Email address is required'
        } else if (!isValidEmail(signupData.email)) {
          newErrors.email = 'Invalid email address format'
        }
        
        if (!signupData.password) {
          newErrors.password = 'Password is required'
        } else if (signupData.password.length < 8) {
          newErrors.password = 'Password must be at least 8 characters'
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(signupData.password)) {
          newErrors.password = 'Password must contain uppercase, lowercase, and number'
        }
        
        if (!signupData.confirmPassword) {
          newErrors.confirmPassword = 'Password confirmation is required'
        } else if (signupData.password !== signupData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match'
        }
        break

      case 'compliance':
        if (!signupData.hasValidLicense) {
          newErrors.hasValidLicense = 'Valid cannabis license confirmation is required'
        }
        
        if (!signupData.agreedToTerms) {
          newErrors.agreedToTerms = 'Agreement to terms is required'
        }
        
        if (!signupData.agreedToCompliance) {
          newErrors.agreedToCompliance = 'Cannabis compliance agreement is required'
        }
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  /**
   * Handle step navigation
   */
  const handleNextStep = () => {
    if (!validateCurrentStep()) return

    const steps: SignupStep[] = ['business', 'account', 'compliance', 'complete']
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1])
    }
  }

  const handlePreviousStep = () => {
    const steps: SignupStep[] = ['business', 'account', 'compliance', 'complete']
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1])
    }
  }

  /**
   * Handle final signup submission
   */
  const handleSubmit = async () => {
    if (!validateCurrentStep()) return

    setIsSubmitting(true)
    setErrors({})

    try {
      await register({
        email: signupData.email,
        password: signupData.password,
        firstName: signupData.firstName,
        lastName: signupData.lastName,
        username: signupData.email,
        facilityName: signupData.businessName,
        licenseNumber: signupData.licenseNumber,
        role: signupData.role as any,
      })
      
      setCurrentStep('complete')
    } catch (error: any) {
      console.error('Cannabis signup error:', error)
      setErrors({ general: error.message || 'Cannabis business registration failed' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-cultivateco-hero flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        {/* Cannabis Brand Header */}
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-cultivateco-gradient rounded-xl flex items-center justify-center">
              <Leaf className="w-8 h-8 text-cultivateco-cream" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-cultivateco-green">
              Join CultivateCo
            </h1>
            <p className="text-lg text-gray-600">
              Register your cannabis business for professional compliance management
            </p>
          </div>
        </div>

        {/* Cannabis Signup Progress */}
        <CannabisSignupProgress currentStep={currentStep} />

        {/* Cannabis Signup Form */}
        <CannabisThemeContainer variant="card" className="mt-8">
          {currentStep === 'business' && (
            <CannabisBusinessStep 
              data={signupData}
              errors={errors}
              onChange={handleInputChange}
              onNext={handleNextStep}
            />
          )}
          
          {currentStep === 'account' && (
            <CannabisAccountStep 
              data={signupData}
              errors={errors}
              showPassword={showPassword}
              showConfirmPassword={showConfirmPassword}
              onChange={handleInputChange}
              onTogglePassword={() => setShowPassword(!showPassword)}
              onToggleConfirmPassword={() => setShowConfirmPassword(!showConfirmPassword)}
              onNext={handleNextStep}
              onBack={handlePreviousStep}
            />
          )}
          
          {currentStep === 'compliance' && (
            <CannabisComplianceStep 
              data={signupData}
              errors={errors}
              onChange={handleInputChange}
              onSubmit={handleSubmit}
              onBack={handlePreviousStep}
              isSubmitting={isSubmitting}
            />
          )}
          
          {currentStep === 'complete' && (
            <CannabisCompleteStep />
          )}
        </CannabisThemeContainer>

        {/* Cannabis Support Links */}
        <div className="mt-6 text-center space-y-2">
          <div className="text-sm text-gray-600">
            Already have a cannabis business account?{' '}
            <Link 
              href="/app/login" 
              className="text-cultivateco-blue hover:text-cultivateco-green transition-colors font-medium"
            >
              Sign in here
            </Link>
          </div>
          
          <div className="flex items-center justify-center space-x-4 text-sm">
            <Link 
              href="/support" 
              className="text-cultivateco-blue hover:text-cultivateco-green transition-colors"
            >
              Cannabis Support
            </Link>
            <span className="text-gray-300">•</span>
            <Link 
              href="/privacy" 
              className="text-cultivateco-blue hover:text-cultivateco-green transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-gray-300">•</span>
            <Link 
              href="/terms" 
              className="text-cultivateco-blue hover:text-cultivateco-green transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Cannabis signup progress indicator
 */
function CannabisSignupProgress({ currentStep }: { currentStep: SignupStep }) {
  const steps = [
    { id: 'business', title: 'Business Info', icon: Building2 },
    { id: 'account', title: 'User Account', icon: User },
    { id: 'compliance', title: 'Compliance', icon: Shield },
    { id: 'complete', title: 'Complete', icon: CheckCircle },
  ]

  const getCurrentStepIndex = () => steps.findIndex(step => step.id === currentStep)

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isActive = step.id === currentStep
          const isCompleted = index < getCurrentStepIndex()
          const Icon = step.icon

          return (
            <div key={step.id} className="flex items-center">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200
                ${isActive 
                  ? 'bg-cultivateco-green text-cultivateco-cream' 
                  : isCompleted 
                    ? 'bg-cultivateco-green text-cultivateco-cream' 
                    : 'bg-gray-200 text-gray-500'
                }
              `}>
                {isCompleted ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <Icon className="w-5 h-5" />
                )}
              </div>
              
              <div className="ml-3 text-sm">
                <div className={`font-medium ${isActive ? 'text-cultivateco-green' : 'text-gray-500'}`}>
                  {step.title}
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className={`
                  mx-4 h-0.5 w-12 transition-all duration-200
                  ${isCompleted ? 'bg-cultivateco-green' : 'bg-gray-200'}
                `} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/**
 * Cannabis business information step
 */
function CannabisBusinessStep({
  data,
  errors,
  onChange,
  onNext
}: {
  data: CannabisSignupData
  errors: SignupErrors
  onChange: (field: keyof CannabisSignupData, value: string) => void
  onNext: () => void
}) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-xl font-semibold text-cultivateco-green">
          Cannabis Business Information
        </h2>
        <p className="text-sm text-gray-600">
          Tell us about your cannabis business and license details
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Business Name */}
        <div className="md:col-span-2 form-group">
          <label htmlFor="businessName" className="form-label">
            Cannabis Business Name *
          </label>
          <input
            id="businessName"
            type="text"
            value={data.businessName}
            onChange={(e) => onChange('businessName', e.target.value)}
            className={`form-input ${errors.businessName ? 'border-red-300' : ''}`}
            placeholder="Green Valley Dispensary"
          />
          {errors.businessName && <div className="form-error">{errors.businessName}</div>}
        </div>

        {/* License Number */}
        <div className="form-group">
          <label htmlFor="licenseNumber" className="form-label">
            Cannabis License Number *
          </label>
          <input
            id="licenseNumber"
            type="text"
            value={data.licenseNumber}
            onChange={(e) => onChange('licenseNumber', e.target.value.toUpperCase())}
            className={`form-input ${errors.licenseNumber ? 'border-red-300' : ''}`}
            placeholder="NM-RET-001-2024"
          />
          {errors.licenseNumber && <div className="form-error">{errors.licenseNumber}</div>}
        </div>

        {/* License Type */}
        <div className="form-group">
          <label htmlFor="licenseType" className="form-label">
            Cannabis License Type *
          </label>
          <select
            id="licenseType"
            value={data.licenseType}
            onChange={(e) => onChange('licenseType', e.target.value)}
            className="form-input"
          >
            <option value="adult-use-retail">Adult-Use Retail</option>
            <option value="medical-retail">Medical Retail</option>
            <option value="dual-use-retail">Dual-Use Retail</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="cultivation">Cultivation</option>
          </select>
        </div>

        {/* Business Address */}
        <div className="md:col-span-2 form-group">
          <label htmlFor="businessAddress" className="form-label">
            Cannabis Business Address *
          </label>
          <input
            id="businessAddress"
            type="text"
            value={data.businessAddress}
            onChange={(e) => onChange('businessAddress', e.target.value)}
            className={`form-input ${errors.businessAddress ? 'border-red-300' : ''}`}
            placeholder="123 Cannabis St"
          />
          {errors.businessAddress && <div className="form-error">{errors.businessAddress}</div>}
        </div>

        {/* City */}
        <div className="form-group">
          <label htmlFor="businessCity" className="form-label">
            City *
          </label>
          <input
            id="businessCity"
            type="text"
            value={data.businessCity}
            onChange={(e) => onChange('businessCity', e.target.value)}
            className={`form-input ${errors.businessCity ? 'border-red-300' : ''}`}
            placeholder="Albuquerque"
          />
          {errors.businessCity && <div className="form-error">{errors.businessCity}</div>}
        </div>

        {/* State */}
        <div className="form-group">
          <label htmlFor="businessState" className="form-label">
            State *
          </label>
          <select
            id="businessState"
            value={data.businessState}
            onChange={(e) => onChange('businessState', e.target.value)}
            className="form-input"
          >
            <option value="NM">New Mexico</option>
            <option value="AZ">Arizona</option>
            <option value="CO">Colorado</option>
            <option value="CA">California</option>
          </select>
        </div>

        {/* ZIP Code */}
        <div className="form-group">
          <label htmlFor="businessZip" className="form-label">
            ZIP Code *
          </label>
          <input
            id="businessZip"
            type="text"
            value={data.businessZip}
            onChange={(e) => onChange('businessZip', e.target.value)}
            className={`form-input ${errors.businessZip ? 'border-red-300' : ''}`}
            placeholder="87101"
          />
          {errors.businessZip && <div className="form-error">{errors.businessZip}</div>}
        </div>

        {/* Business Phone */}
        <div className="form-group">
          <label htmlFor="businessPhone" className="form-label">
            Business Phone *
          </label>
          <input
            id="businessPhone"
            type="tel"
            value={data.businessPhone}
            onChange={(e) => onChange('businessPhone', e.target.value)}
            className={`form-input ${errors.businessPhone ? 'border-red-300' : ''}`}
            placeholder="(505) 555-0123"
          />
          {errors.businessPhone && <div className="form-error">{errors.businessPhone}</div>}
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full btn-cultivateco-primary flex items-center justify-center space-x-2"
      >
        <span>Continue to Account Setup</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  )
}

/**
 * Cannabis user account step
 */
function CannabisAccountStep({
  data,
  errors,
  showPassword,
  showConfirmPassword,
  onChange,
  onTogglePassword,
  onToggleConfirmPassword,
  onNext,
  onBack
}: {
  data: CannabisSignupData
  errors: SignupErrors
  showPassword: boolean
  showConfirmPassword: boolean
  onChange: (field: keyof CannabisSignupData, value: string) => void
  onTogglePassword: () => void
  onToggleConfirmPassword: () => void
  onNext: () => void
  onBack: () => void
}) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-xl font-semibold text-cultivateco-green">
          Create Your Account
        </h2>
        <p className="text-sm text-gray-600">
          Set up your personal cannabis business account
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name */}
        <div className="form-group">
          <label htmlFor="firstName" className="form-label">
            First Name *
          </label>
          <input
            id="firstName"
            type="text"
            value={data.firstName}
            onChange={(e) => onChange('firstName', e.target.value)}
            className={`form-input ${errors.firstName ? 'border-red-300' : ''}`}
            placeholder="John"
          />
          {errors.firstName && <div className="form-error">{errors.firstName}</div>}
        </div>

        {/* Last Name */}
        <div className="form-group">
          <label htmlFor="lastName" className="form-label">
            Last Name *
          </label>
          <input
            id="lastName"
            type="text"
            value={data.lastName}
            onChange={(e) => onChange('lastName', e.target.value)}
            className={`form-input ${errors.lastName ? 'border-red-300' : ''}`}
            placeholder="Doe"
          />
          {errors.lastName && <div className="form-error">{errors.lastName}</div>}
        </div>

        {/* Email */}
        <div className="md:col-span-2 form-group">
          <label htmlFor="email" className="form-label">
            Email Address *
          </label>
          <input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => onChange('email', e.target.value)}
            className={`form-input ${errors.email ? 'border-red-300' : ''}`}
            placeholder="john@cannabisbusiness.com"
          />
          {errors.email && <div className="form-error">{errors.email}</div>}
        </div>

        {/* Password */}
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password *
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={data.password}
              onChange={(e) => onChange('password', e.target.value)}
              className={`form-input pr-12 ${errors.password ? 'border-red-300' : ''}`}
              placeholder="Create secure password"
            />
            <button
              type="button"
              onClick={onTogglePassword}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-cultivateco-green"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && <div className="form-error">{errors.password}</div>}
          <div className="text-xs text-gray-500 mt-1">
            Must contain uppercase, lowercase, and number. Minimum 8 characters.
          </div>
        </div>

        {/* Confirm Password */}
        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password *
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={data.confirmPassword}
              onChange={(e) => onChange('confirmPassword', e.target.value)}
              className={`form-input pr-12 ${errors.confirmPassword ? 'border-red-300' : ''}`}
              placeholder="Confirm your password"
            />
            <button
              type="button"
              onClick={onToggleConfirmPassword}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-cultivateco-green"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.confirmPassword && <div className="form-error">{errors.confirmPassword}</div>}
        </div>

        {/* Role */}
        <div className="md:col-span-2 form-group">
          <label htmlFor="role" className="form-label">
            Your Role in Cannabis Business *
          </label>
          <select
            id="role"
            value={data.role}
            onChange={(e) => onChange('role', e.target.value)}
            className="form-input"
          >
            <option value="owner">Business Owner</option>
            <option value="manager">General Manager</option>
            <option value="compliance">Compliance Officer</option>
            <option value="accountant">Financial Manager</option>
          </select>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={onBack}
          className="flex-1 btn-cultivateco-outline flex items-center justify-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        
        <button
          onClick={onNext}
          className="flex-1 btn-cultivateco-primary flex items-center justify-center space-x-2"
        >
          <span>Continue to Compliance</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

/**
 * Cannabis compliance agreement step
 */
function CannabisComplianceStep({
  data,
  errors,
  onChange,
  onSubmit,
  onBack,
  isSubmitting
}: {
  data: CannabisSignupData
  errors: SignupErrors
  onChange: (field: keyof CannabisSignupData, value: boolean) => void
  onSubmit: () => void
  onBack: () => void
  isSubmitting: boolean
}) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-xl font-semibold text-cultivateco-green">
          Cannabis Compliance Agreement
        </h2>
        <p className="text-sm text-gray-600">
          Confirm your cannabis business compliance and legal agreements
        </p>
      </div>

      {/* General Error */}
      {errors.general && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <span className="text-sm text-red-700">{errors.general}</span>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {/* License Confirmation */}
        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
          <div className="flex items-start space-x-3">
            <input
              id="hasValidLicense"
              type="checkbox"
              checked={data.hasValidLicense}
              onChange={(e) => onChange('hasValidLicense', e.target.checked)}
              className="mt-1 h-4 w-4 text-cultivateco-green focus:ring-cultivateco-green border-gray-300 rounded"
            />
            <div className="flex-1">
              <label htmlFor="hasValidLicense" className="text-sm font-medium text-gray-900">
                Valid Cannabis License Confirmation *
              </label>
              <p className="text-sm text-gray-600 mt-1">
                I confirm that my cannabis business holds a valid, active license issued by the appropriate state regulatory authority and is in good standing with all cannabis regulations.
              </p>
              {errors.hasValidLicense && <div className="form-error mt-2">{errors.hasValidLicense}</div>}
            </div>
          </div>
        </div>

        {/* Terms Agreement */}
        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
          <div className="flex items-start space-x-3">
            <input
              id="agreedToTerms"
              type="checkbox"
              checked={data.agreedToTerms}
              onChange={(e) => onChange('agreedToTerms', e.target.checked)}
              className="mt-1 h-4 w-4 text-cultivateco-green focus:ring-cultivateco-green border-gray-300 rounded"
            />
            <div className="flex-1">
              <label htmlFor="agreedToTerms" className="text-sm font-medium text-gray-900">
                Terms of Service Agreement *
              </label>
              <p className="text-sm text-gray-600 mt-1">
                I agree to CultivateCo's{' '}
                <Link href="/terms" className="text-cultivateco-blue hover:text-cultivateco-green" target="_blank">
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-cultivateco-blue hover:text-cultivateco-green" target="_blank">
                  Privacy Policy
                </Link>
                , and understand the responsibilities of using cannabis compliance software.
              </p>
              {errors.agreedToTerms && <div className="form-error mt-2">{errors.agreedToTerms}</div>}
            </div>
          </div>
        </div>

        {/* Compliance Agreement */}
        <div className="bg-cultivateco-green/5 border border-cultivateco-green/20 rounded-lg p-6 space-y-4">
          <div className="flex items-start space-x-3">
            <input
              id="agreedToCompliance"
              type="checkbox"
              checked={data.agreedToCompliance}
              onChange={(e) => onChange('agreedToCompliance', e.target.checked)}
              className="mt-1 h-4 w-4 text-cultivateco-green focus:ring-cultivateco-green border-gray-300 rounded"
            />
            <div className="flex-1">
              <label htmlFor="agreedToCompliance" className="text-sm font-medium text-cultivateco-green">
                Cannabis Compliance Responsibility *
              </label>
              <p className="text-sm text-cultivateco-green/80 mt-1">
                I understand that while CultivateCo provides compliance monitoring tools, my cannabis business remains fully responsible for maintaining compliance with all applicable state and local cannabis regulations, including but not limited to New Mexico Cannabis Control Division requirements.
              </p>
              {errors.agreedToCompliance && <div className="form-error mt-2">{errors.agreedToCompliance}</div>}
            </div>
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={onBack}
          disabled={isSubmitting}
          className="flex-1 btn-cultivateco-outline flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        
        <button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="flex-1 btn-cultivateco-primary flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-cultivateco-cream border-t-transparent rounded-full animate-spin" />
              <span>Creating Cannabis Account...</span>
            </>
          ) : (
            <>
              <Shield className="w-4 h-4" />
              <span>Create Cannabis Account</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}

/**
 * Cannabis signup complete step
 */
function CannabisCompleteStep() {
  const router = useRouter()

  return (
    <div className="text-center space-y-6">
      <div className="w-16 h-16 bg-cultivateco-green rounded-full flex items-center justify-center mx-auto">
        <CheckCircle className="w-8 h-8 text-cultivateco-cream" />
      </div>
      
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-cultivateco-green">
          Cannabis Account Created Successfully!
        </h2>
        <p className="text-gray-600">
          Your cannabis business account has been created. Please check your email to verify your account and complete the setup process.
        </p>
      </div>
      
      <div className="bg-cultivateco-green/10 border border-cultivateco-green/20 rounded-lg p-4">
        <div className="flex items-center space-x-2 text-cultivateco-green">
          <Shield className="w-5 h-5" />
          <span className="text-sm font-medium">What's Next?</span>
        </div>
        <div className="text-sm text-cultivateco-green/80 mt-2 space-y-1">
          <div>1. Check your email for verification instructions</div>
          <div>2. Complete cannabis license verification</div>
          <div>3. Set up your cannabis compliance monitoring</div>
          <div>4. Import your existing cannabis business data</div>
        </div>
      </div>
      
      <button
        onClick={() => router.push('/app/login')}
        className="btn-cultivateco-primary flex items-center justify-center space-x-2 mx-auto"
      >
        <span>Continue to Cannabis Login</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  )
}
