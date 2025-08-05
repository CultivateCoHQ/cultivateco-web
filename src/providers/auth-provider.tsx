'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

/**
 * =============================================================================
 * CultivateCo Cannabis Authentication Provider
 * =============================================================================
 * Secure authentication system for cannabis business operations
 */

// Cannabis user types from our shared types
interface CannabisUser {
  id: string
  email: string
  firstName: string
  lastName: string
  username: string
  role: CannabisUserRole
  permissions: CannabisPermission[]
  licenseNumber?: string
  facilityIds: string[]
  isActive: boolean
  lastLogin?: Date
  mfaEnabled: boolean
  createdAt: Date
  updatedAt: Date
}

type CannabisUserRole = 
  | 'owner' | 'manager' | 'budtender' | 'inventory' | 'compliance'
  | 'accountant' | 'security' | 'admin' | 'auditor' | 'delivery'
  | 'lab' | 'cultivation'

type CannabisPermission =
  | 'cannabis.transactions.create' | 'cannabis.transactions.view'
  | 'cannabis.inventory.manage' | 'cannabis.compliance.view'
  | 'cannabis.reports.generate' | 'cannabis.settings.manage'
  | 'cannabis.users.manage' | 'cannabis.metrc.sync'

interface CannabisAuthState {
  user: CannabisUser | null
  isLoading: boolean
  isAuthenticated: boolean
  token: string | null
  refreshToken: string | null
  facilities: CannabisFacility[]
  currentFacility: CannabisFacility | null
}

interface CannabisFacility {
  id: string
  name: string
  licenseNumber: string
  address: string
  isActive: boolean
}

interface CannabisAuthContextType extends CannabisAuthState {
  // Authentication methods
  login: (email: string, password: string, mfaCode?: string) => Promise<void>
  logout: () => Promise<void>
  register: (userData: CannabisRegistrationData) => Promise<void>
  resetPassword: (email: string) => Promise<void>
  updateProfile: (userData: Partial<CannabisUser>) => Promise<void>
  
  // Cannabis business operations
  switchFacility: (facilityId: string) => Promise<void>
  hasPermission: (permission: CannabisPermission) => boolean
  hasRole: (role: CannabisUserRole) => boolean
  refreshAuth: () => Promise<void>
  
  // MFA operations
  enableMFA: () => Promise<{ qrCode: string; backupCodes: string[] }>
  verifyMFA: (code: string) => Promise<void>
  disableMFA: (password: string) => Promise<void>
}

interface CannabisRegistrationData {
  email: string
  password: string
  firstName: string
  lastName: string
  username: string
  facilityName: string
  licenseNumber: string
  role: CannabisUserRole
}

const CannabisAuthContext = createContext<CannabisAuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter()
  
  // Cannabis authentication state
  const [authState, setAuthState] = useState<CannabisAuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    token: null,
    refreshToken: null,
    facilities: [],
    currentFacility: null,
  })

  // Cannabis API base URL
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://api.cultivateco.com'

  /**
   * Cannabis business API request helper
   */
  const cannabisApiRequest = async (
    endpoint: string,
    options: RequestInit = {}
  ): Promise<any> => {
    const url = `${API_BASE}${endpoint}`
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    }

    // Add cannabis authentication token
    if (authState.token) {
      headers['Authorization'] = `Bearer ${authState.token}`
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      })

      if (!response.ok) {
        // Handle cannabis authentication errors
        if (response.status === 401) {
          await handleTokenExpiry()
          throw new Error('Cannabis authentication expired')
        }
        
        if (response.status === 403) {
          throw new Error('Cannabis operation not authorized')
        }

        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || 'Cannabis API request failed')
      }

      return await response.json()
    } catch (error) {
      console.error('Cannabis API Error:', error)
      throw error
    }
  }

  /**
   * Handle token expiry and refresh
   */
  const handleTokenExpiry = useCallback(async () => {
    if (!authState.refreshToken) {
      await logout()
      return
    }

    try {
      const response = await fetch(`${API_BASE}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: authState.refreshToken }),
      })

      if (!response.ok) {
        await logout()
        return
      }

      const { token, refreshToken, user } = await response.json()
      
      // Update cannabis authentication state
      setAuthState(prev => ({
        ...prev,
        token,
        refreshToken,
        user,
        isAuthenticated: true,
      }))

      // Store cannabis tokens securely
      localStorage.setItem('cultivateco_token', token)
      localStorage.setItem('cultivateco_refresh_token', refreshToken)
      
    } catch (error) {
      console.error('Cannabis token refresh failed:', error)
      await logout()
    }
  }, [authState.refreshToken])

  /**
   * Cannabis business login
   */
  const login = async (email: string, password: string, mfaCode?: string): Promise<void> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }))

      const response = await cannabisApiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password, mfaCode }),
      })

      const { user, token, refreshToken, facilities } = response

      // Update cannabis authentication state
      setAuthState({
        user,
        token,
        refreshToken,
        facilities,
        currentFacility: facilities[0] || null,
        isLoading: false,
        isAuthenticated: true,
      })

      // Store cannabis tokens securely
      localStorage.setItem('cultivateco_token', token)
      localStorage.setItem('cultivateco_refresh_token', refreshToken)
      localStorage.setItem('cultivateco_user', JSON.stringify(user))

      toast.success(`Welcome back, ${user.firstName}! Ready for cannabis operations.`)
      
      // Redirect to cannabis dashboard
      router.push('/app/dashboard')
      
    } catch (error: any) {
      setAuthState(prev => ({ ...prev, isLoading: false }))
      
      if (error.message.includes('MFA')) {
        throw error // Let the login form handle MFA
      }
      
      toast.error(error.message || 'Cannabis login failed')
      throw error
    }
  }

  /**
   * Cannabis business logout
   */
  const logout = async (): Promise<void> => {
    try {
      // Notify cannabis backend of logout
      if (authState.token) {
        await cannabisApiRequest('/auth/logout', { method: 'POST' })
      }
    } catch (error) {
      console.error('Cannabis logout API error:', error)
    }

    // Clear cannabis authentication state
    setAuthState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
      token: null,
      refreshToken: null,
      facilities: [],
      currentFacility: null,
    })

    // Clear cannabis storage
    localStorage.removeItem('cultivateco_token')
    localStorage.removeItem('cultivateco_refresh_token')
    localStorage.removeItem('cultivateco_user')

    toast.success('Cannabis session ended successfully')
    router.push('/app/login')
  }

  /**
   * Cannabis business registration
   */
  const register = async (userData: CannabisRegistrationData): Promise<void> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }))

      await cannabisApiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      })

      toast.success('Cannabis business account created! Please check your email to verify.')
      router.push('/app/login')
      
    } catch (error: any) {
      setAuthState(prev => ({ ...prev, isLoading: false }))
      toast.error(error.message || 'Cannabis registration failed')
      throw error
    }
  }

  /**
   * Cannabis business password reset
   */
  const resetPassword = async (email: string): Promise<void> => {
    try {
      await cannabisApiRequest('/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
      })

      toast.success('Cannabis password reset email sent')
    } catch (error: any) {
      toast.error(error.message || 'Cannabis password reset failed')
      throw error
    }
  }

  /**
   * Update cannabis user profile
   */
  const updateProfile = async (userData: Partial<CannabisUser>): Promise<void> => {
    try {
      const updatedUser = await cannabisApiRequest('/auth/profile', {
        method: 'PUT',
        body: JSON.stringify(userData),
      })

      setAuthState(prev => ({
        ...prev,
        user: updatedUser,
      }))

      localStorage.setItem('cultivateco_user', JSON.stringify(updatedUser))
      toast.success('Cannabis profile updated successfully')
      
    } catch (error: any) {
      toast.error(error.message || 'Cannabis profile update failed')
      throw error
    }
  }

  /**
   * Switch cannabis facility
   */
  const switchFacility = async (facilityId: string): Promise<void> => {
    try {
      const facility = authState.facilities.find(f => f.id === facilityId)
      if (!facility) {
        throw new Error('Cannabis facility not found')
      }

      await cannabisApiRequest(`/auth/switch-facility/${facilityId}`, {
        method: 'POST',
      })

      setAuthState(prev => ({
        ...prev,
        currentFacility: facility,
      }))

      toast.success(`Switched to ${facility.name}`)
      
    } catch (error: any) {
      toast.error(error.message || 'Cannabis facility switch failed')
      throw error
    }
  }

  /**
   * Check cannabis business permission
   */
  const hasPermission = (permission: CannabisPermission): boolean => {
    return authState.user?.permissions.includes(permission) || false
  }

  /**
   * Check cannabis business role
   */
  const hasRole = (role: CannabisUserRole): boolean => {
    return authState.user?.role === role
  }

  /**
   * Refresh cannabis authentication
   */
  const refreshAuth = async (): Promise<void> => {
    try {
      const user = await cannabisApiRequest('/auth/me')
      const facilities = await cannabisApiRequest('/auth/facilities')

      setAuthState(prev => ({
        ...prev,
        user,
        facilities,
        currentFacility: facilities.find((f: CannabisFacility) => f.id === prev.currentFacility?.id) || facilities[0],
      }))
      
    } catch (error: any) {
      console.error('Cannabis auth refresh failed:', error)
      await logout()
    }
  }

  /**
   * Enable MFA for cannabis account
   */
  const enableMFA = async (): Promise<{ qrCode: string; backupCodes: string[] }> => {
    try {
      const response = await cannabisApiRequest('/auth/mfa/enable', {
        method: 'POST',
      })

      return response
    } catch (error: any) {
      toast.error(error.message || 'Cannabis MFA setup failed')
      throw error
    }
  }

  /**
   * Verify MFA for cannabis account
   */
  const verifyMFA = async (code: string): Promise<void> => {
    try {
      await cannabisApiRequest('/auth/mfa/verify', {
        method: 'POST',
        body: JSON.stringify({ code }),
      })

      if (authState.user) {
        setAuthState(prev => ({
          ...prev,
          user: { ...prev.user!, mfaEnabled: true },
        }))
      }

      toast.success('Cannabis MFA enabled successfully')
    } catch (error: any) {
      toast.error(error.message || 'Cannabis MFA verification failed')
      throw error
    }
  }

  /**
   * Disable MFA for cannabis account
   */
  const disableMFA = async (password: string): Promise<void> => {
    try {
      await cannabisApiRequest('/auth/mfa/disable', {
        method: 'POST',
        body: JSON.stringify({ password }),
      })

      if (authState.user) {
        setAuthState(prev => ({
          ...prev,
          user: { ...prev.user!, mfaEnabled: false },
        }))
      }

      toast.success('Cannabis MFA disabled successfully')
    } catch (error: any) {
      toast.error(error.message || 'Cannabis MFA disable failed')
      throw error
    }
  }

  /**
   * Initialize cannabis authentication on mount
   */
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('cultivateco_token')
        const refreshToken = localStorage.getItem('cultivateco_refresh_token')
        const storedUser = localStorage.getItem('cultivateco_user')

        if (token && refreshToken && storedUser) {
          const user = JSON.parse(storedUser)
          
          setAuthState(prev => ({
            ...prev,
            user,
            token,
            refreshToken,
            isAuthenticated: true,
            isLoading: false,
          }))

          // Refresh cannabis user data and facilities
          await refreshAuth()
        } else {
          setAuthState(prev => ({ ...prev, isLoading: false }))
        }
      } catch (error) {
        console.error('Cannabis auth initialization failed:', error)
        setAuthState(prev => ({ ...prev, isLoading: false }))
      }
    }

    initializeAuth()
  }, [])

  const contextValue: CannabisAuthContextType = {
    ...authState,
    login,
    logout,
    register,
    resetPassword,
    updateProfile,
    switchFacility,
    hasPermission,
    hasRole,
    refreshAuth,
    enableMFA,
    verifyMFA,
    disableMFA,
  }

  return (
    <CannabisAuthContext.Provider value={contextValue}>
      {children}
    </CannabisAuthContext.Provider>
  )
}

/**
 * Cannabis authentication hook
 */
export function useCannabisAuth() {
  const context = useContext(CannabisAuthContext)
  if (context === undefined) {
    throw new Error('useCannabisAuth must be used within an AuthProvider')
  }
  return context
}

/**
 * Cannabis authentication guard hook
 */
export function useRequireAuth() {
  const auth = useCannabisAuth()
  const router = useRouter()

  useEffect(() => {
    if (!auth.isLoading && !auth.isAuthenticated) {
      router.push('/app/login')
    }
  }, [auth.isLoading, auth.isAuthenticated, router])

  return auth
}

/**
 * Cannabis role guard hook
 */
export function useRequireRole(requiredRole: CannabisUserRole) {
  const auth = useCannabisAuth()
  const router = useRouter()

  useEffect(() => {
    if (!auth.isLoading && auth.isAuthenticated && !auth.hasRole(requiredRole)) {
      toast.error('Cannabis operation requires different role')
      router.push('/app/dashboard')
    }
  }, [auth.isLoading, auth.isAuthenticated, auth.user, requiredRole, router])

  return auth
}

/**
 * Cannabis permission guard hook
 */
export function useRequirePermission(requiredPermission: CannabisPermission) {
  const auth = useCannabisAuth()
  const router = useRouter()

  useEffect(() => {
    if (!auth.isLoading && auth.isAuthenticated && !auth.hasPermission(requiredPermission)) {
      toast.error('Cannabis operation requires additional permissions')
      router.push('/app/dashboard')
    }
  }, [auth.isLoading, auth.isAuthenticated, auth.user, requiredPermission, router])

  return auth
}
