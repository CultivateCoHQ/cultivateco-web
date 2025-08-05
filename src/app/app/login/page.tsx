'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, Shield, Leaf, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react'
import { useCannabisAuth } from '@/providers/auth-provider'
import { CannabisThemeContainer } from '@/providers/theme-provider'
import { isWithinCannabisBusinessHours, formatCannabisBusinessHours } from '@/lib/utils'

/**
 * =============================================================================
 * CultivateCo Cannabis Login Page
 * =============================================================================
 * Professional cannabis business authentication with MFA support
 */

interface LoginFormData {
  email: string
  password: string
  mfaCode?: string
}

interface LoginFormErrors {
  email?: string
  password?: string
  mfaCode?: string
  general?: string
}

export default function CannabisLoginPage() {
  const router = useRouter()
  const { login, isLoading, isAuthenticated } = useCannabisAuth()
  
  // Cannabis login form state
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    mfaCode: '',
  })
  
  const [errors, setErrors] = useState<LoginFormErrors>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showMFA, setShowMFA] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Cannabis business hours check
  const [businessHoursStatus, setBusinessHoursStatus] = useState({
    isOpen: true,
    timeUntilChange: '',
  })

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.push('/app/dashboard')
    }
  }, [isAuthenticated, isLoading, router])

  // Check cannabis business hours
  useEffect(() => {
    const checkBusinessHours = () => {
      const isOpen = isWithinCannabisBusinessHours()
      setBusinessHoursStatus({
        isOpen,
        timeUntilChange: isOpen ? 'Open until 10:00 PM MT' : 'Closed until 8:00 AM MT',
      })
    }

    checkBusinessHours()
    const interval = setInterval(checkBusinessHours, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [])

  /**
   * Validate cannabis login form
   */
  const validateForm = (): boolean => {
    const newErrors: LoginFormErrors = {}

    // Cannabis email validation
    if (!formData.email) {
      newErrors.email = 'Cannabis business email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid cannabis business email'
    }

    // Cannabis password validation
    if (!formData.password) {
      newErrors.password = 'Cannabis account password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Cannabis password must be at least 8 characters'
    }

    // Cannabis MFA validation
    if (showMFA && !formData.mfaCode) {
      newErrors.mfaCode = 'Cannabis MFA code is required'
    } else if (showMFA && formData.mfaCode && !/^\d{6}$/.test(formData.mfaCode)) {
      newErrors.mfaCode = 'Cannabis MFA code must be 6 digits'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  /**
   * Handle cannabis login form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    setErrors({})

    try {
      await login(formData.email, formData.password, formData.mfaCode)
      // Redirect handled by auth provider
    } catch (error: any) {
      console.error('Cannabis login error:', error)
      
      if (error.message.includes('MFA') || error.message.includes('two-factor')) {
        setShowMFA(true)
        setErrors({ general: 'Please enter your cannabis MFA code to continue' })
      } else if (error.message.includes('credentials')) {
        setErrors({ general: 'Invalid cannabis business credentials. Please try again.' })
      } else if (error.message.includes('locked') || error.message.includes('suspended')) {
        setErrors({ general: 'Cannabis account is locked. Please contact support.' })
      } else {
        setErrors({ general: error.message || 'Cannabis login failed. Please try again.' })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  /**
   * Handle form input changes
   */
  const handleInputChange = (field: keyof LoginFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear field-specific errors
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <div className="min-h-screen bg-cultivateco-hero flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Cannabis Business Hours Status */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
        <div className={`
          rounded-lg p-4 text-center text-sm font-medium
          ${businessHoursStatus.isOpen 
            ? 'bg-cultivateco-green/10 text-cultivateco-green border border-cultivateco-green/20' 
            : 'bg-amber-50 text-amber-700 border border-amber-200'
          }
        `}>
          <div className="flex items-center justify-center space-x-2">
            {businessHoursStatus.isOpen ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            <span>Cannabis Business Hours: {businessHoursStatus.timeUntilChange}</span>
          </div>
        </div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Cannabis Brand Header */}
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-cultivateco-gradient rounded-xl flex items-center justify-center">
              <Leaf className="w-8 h-8 text-cultivateco-cream" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-cultivateco-green">
              Welcome Back
            </h1>
            <p className="text-lg text-gray-600">
              Sign in to your cannabis business portal
            </p>
          </div>
        </div>

        {/* Cannabis Login Form */}
        <CannabisThemeContainer variant="card" className="mt-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* General Error Message */}
            {errors.general && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <span className="text-sm text-red-700">{errors.general}</span>
                </div>
              </div>
            )}

            {/* Cannabis Email Field */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Cannabis Business Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`form-input ${errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                placeholder="your@cannabisbusiness.com"
                disabled={isSubmitting}
                autoComplete="email"
              />
              {errors.email && (
                <div className="form-error">{errors.email}</div>
              )}
            </div>

            {/* Cannabis Password Field */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Cannabis Account Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`form-input pr-12 ${errors.password ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="Enter your secure password"
                  disabled={isSubmitting}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-cultivateco-green"
                  disabled={isSubmitting}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <div className="form-error">{errors.password}</div>
              )}
            </div>

            {/* Cannabis MFA Field */}
            {showMFA && (
              <div className="form-group">
                <label htmlFor="mfaCode" className="form-label">
                  Cannabis MFA Authentication Code
                </label>
                <input
                  id="mfaCode"
                  type="text"
                  value={formData.mfaCode || ''}
                  onChange={(e) => handleInputChange('mfaCode', e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className={`form-input text-center text-lg tracking-wider ${errors.mfaCode ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="000000"
                  disabled={isSubmitting}
                  autoComplete="one-time-code"
                  maxLength={6}
                />
                {errors.mfaCode && (
                  <div className="form-error">{errors.mfaCode}</div>
                )}
                <div className="text-sm text-gray-600 mt-2">
                  Enter the 6-digit code from your cannabis MFA app
                </div>
              </div>
            )}

            {/* Cannabis Login Button */}
            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="w-full btn-cultivateco-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-cultivateco-cream border-t-transparent rounded-full animate-spin" />
                  <span>Authenticating Cannabis Account...</span>
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4" />
                  <span>Access Cannabis Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Cannabis Account Actions */}
            <div className="flex items-center justify-between text-sm">
              <Link 
                href="/app/reset-password" 
                className="text-cultivateco-blue hover:text-cultivateco-green transition-colors"
              >
                Forgot cannabis password?
              </Link>
              
              <Link 
                href="/app/signup" 
                className="text-cultivateco-blue hover:text-cultivateco-green transition-colors"
              >
                Create cannabis account
              </Link>
            </div>
          </form>
        </CannabisThemeContainer>

        {/* Cannabis Security Notice */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 text-sm text-gray-600">
            <Shield className="w-4 h-4" />
            <span>Your cannabis business data is protected with enterprise-grade security</span>
          </div>
        </div>

        {/* Cannabis Support Links */}
        <div className="mt-6 text-center space-y-2">
          <div className="text-sm text-gray-600">
            Need help accessing your cannabis account?
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
              href="/docs" 
              className="text-cultivateco-blue hover:text-cultivateco-green transition-colors"
            >
              Documentation
            </Link>
            <span className="text-gray-300">•</span>
            <Link 
              href="/contact" 
              className="text-cultivateco-blue hover:text-cultivateco-green transition-colors"
            >
              Contact Sales
            </Link>
          </div>
        </div>

        {/* Cannabis Business Hours Info */}
        <div className="mt-8 bg-gray-50 rounded-lg p-4">
          <div className="text-center space-y-2">
            <div className="text-sm font-medium text-cultivateco-green">
              Cannabis Business Operations
            </div>
            <div className="text-sm text-gray-600">
              System available 24/7 • Business hours: {formatCannabisBusinessHours()}
            </div>
            <div className="text-xs text-gray-500">
              Compliance monitoring active during business hours for New Mexico Cannabis Control Division requirements
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
