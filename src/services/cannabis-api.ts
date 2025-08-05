/**
 * =============================================================================
 * CultivateCo Cannabis API Service
 * =============================================================================
 * Comprehensive API service for cannabis business operations and compliance
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { toast } from 'react-hot-toast'

// Cannabis API types
interface CannabisApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
  timestamp: string
  requestId: string
}

interface CannabisPaginatedResponse<T = any> extends CannabisApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

interface CannabisApiError {
  message: string
  code: string
  status: number
  details?: any
  isApiError: boolean
  isNetworkError: boolean
  isAuthError: boolean
  isValidationError: boolean
  isComplianceError: boolean
  isTransactionError: boolean
}

/**
 * CultivateCo Cannabis API Service Class
 */
class CannabisApiService {
  private api: AxiosInstance
  private baseURL: string
  private authToken: string | null = null
  private refreshToken: string | null = null

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://api.cultivateco.com'
    
    // Create cannabis API instance
    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 30000, // 30 seconds for cannabis operations
      headers: {
        'Content-Type': 'application/json',
        'X-Cannabis-Client': 'CultivateCo-Web',
        'X-Cannabis-Version': '1.0.0',
      },
    })

    this.setupInterceptors()
    this.loadTokensFromStorage()
  }

  /**
   * Setup cannabis API interceptors for authentication and error handling
   */
  private setupInterceptors(): void {
    // Cannabis request interceptor
    this.api.interceptors.request.use(
      (config) => {
        // Add cannabis authentication token
        if (this.authToken) {
          config.headers.Authorization = `Bearer ${this.authToken}`
        }

        // Add cannabis business context
        const facilityId = this.getCurrentFacilityId()
        if (facilityId) {
          config.headers['X-Cannabis-Facility'] = facilityId
        }

        // Add request timestamp for cannabis audit trails
        config.headers['X-Cannabis-Timestamp'] = new Date().toISOString()

        return config
      },
      (error) => {
        return Promise.reject(this.handleCannabisError(error))
      }
    )

    // Cannabis response interceptor
    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        return response
      },
      async (error) => {
        // Handle cannabis token expiry
        if (error.response?.status === 401 && this.refreshToken) {
          try {
            await this.refreshAuthToken()
            // Retry original cannabis request
            return this.api.request(error.config)
          } catch (refreshError) {
            this.clearTokens()
            window.location.href = '/app/login'
            return Promise.reject(this.handleCannabisError(refreshError))
          }
        }

        return Promise.reject(this.handleCannabisError(error))
      }
    )
  }

  /**
   * Handle cannabis API errors with proper categorization
   */
  private handleCannabisError(error: any): CannabisApiError {
    const cannabisError: CannabisApiError = {
      message: 'Cannabis API request failed',
      code: 'CANNABIS_API_ERROR',
      status: error.response?.status || 0,
      details: error.response?.data,
      isApiError: true,
      isNetworkError: !error.response,
      isAuthError: false,
      isValidationError: false,
      isComplianceError: false,
      isTransactionError: false,
    }

    // Cannabis network errors
    if (!error.response) {
      cannabisError.message = 'Cannabis system connection failed. Please check your internet connection.'
      cannabisError.code = 'CANNABIS_NETWORK_ERROR'
      cannabisError.isNetworkError = true
    }
    // Cannabis authentication errors
    else if (error.response.status === 401) {
      cannabisError.message = 'Cannabis authentication expired. Please sign in again.'
      cannabisError.code = 'CANNABIS_AUTH_ERROR'
      cannabisError.isAuthError = true
    }
    // Cannabis authorization errors
    else if (error.response.status === 403) {
      cannabisError.message = 'Cannabis operation not authorized for your role.'
      cannabisError.code = 'CANNABIS_PERMISSION_ERROR'
      cannabisError.isAuthError = true
    }
    // Cannabis validation errors
    else if (error.response.status === 400 || error.response.status === 422) {
      cannabisError.message = error.response.data?.message || 'Cannabis data validation failed.'
      cannabisError.code = 'CANNABIS_VALIDATION_ERROR'
      cannabisError.isValidationError = true
    }
    // Cannabis compliance errors
    else if (error.response.status === 409) {
      cannabisError.message = error.response.data?.message || 'Cannabis compliance violation detected.'
      cannabisError.code = 'CANNABIS_COMPLIANCE_ERROR'
      cannabisError.isComplianceError = true
    }
    // Cannabis server errors
    else if (error.response.status >= 500) {
      cannabisError.message = 'Cannabis system temporarily unavailable. Please try again.'
      cannabisError.code = 'CANNABIS_SERVER_ERROR'
    }
    // Other cannabis API errors
    else {
      cannabisError.message = error.response.data?.message || 'Cannabis operation failed.'
      cannabisError.code = error.response.data?.code || 'CANNABIS_API_ERROR'
    }

    // Check for cannabis transaction errors
    if (error.config?.url?.includes('/transactions') || error.response.data?.isTransactionError) {
      cannabisError.isTransactionError = true
    }

    return cannabisError
  }

  /**
   * Set cannabis authentication tokens
   */
  setTokens(authToken: string, refreshToken: string): void {
    this.authToken = authToken
    this.refreshToken = refreshToken
    
    // Store cannabis tokens securely
    localStorage.setItem('cultivateco_token', authToken)
    localStorage.setItem('cultivateco_refresh_token', refreshToken)
  }

  /**
   * Clear cannabis authentication tokens
   */
  clearTokens(): void {
    this.authToken = null
    this.refreshToken = null
    
    localStorage.removeItem('cultivateco_token')
    localStorage.removeItem('cultivateco_refresh_token')
    localStorage.removeItem('cultivateco_user')
  }

  /**
   * Load cannabis tokens from storage
   */
  private loadTokensFromStorage(): void {
    this.authToken = localStorage.getItem('cultivateco_token')
    this.refreshToken = localStorage.getItem('cultivateco_refresh_token')
  }

  /**
   * Refresh cannabis authentication token
   */
  private async refreshAuthToken(): Promise<void> {
    if (!this.refreshToken) {
      throw new Error('Cannabis refresh token not available')
    }

    const response = await axios.post(`${this.baseURL}/auth/refresh`, {
      refreshToken: this.refreshToken,
    })

    const { token, refreshToken } = response.data
    this.setTokens(token, refreshToken)
  }

  /**
   * Get current cannabis facility ID
   */
  private getCurrentFacilityId(): string | null {
    const user = localStorage.getItem('cultivateco_user')
    if (user) {
      const userData = JSON.parse(user)
      return userData.currentFacilityId || userData.facilityIds?.[0] || null
    }
    return null
  }

  // ============================================================================
  // CANNABIS AUTHENTICATION API
  // ============================================================================

  /**
   * Cannabis business login
   */
  async login(credentials: {
    email: string
    password: string
    mfaCode?: string
  }): Promise<CannabisApiResponse> {
    const response = await this.api.post('/auth/login', credentials)
    
    if (response.data.token) {
      this.setTokens(response.data.token, response.data.refreshToken)
    }
    
    return response.data
  }

  /**
   * Cannabis business logout
   */
  async logout(): Promise<void> {
    try {
      await this.api.post('/auth/logout')
    } finally {
      this.clearTokens()
    }
  }

  /**
   * Cannabis business registration
   */
  async register(userData: any): Promise<CannabisApiResponse> {
    const response = await this.api.post('/auth/register', userData)
    return response.data
  }

  /**
   * Get cannabis user profile
   */
  async getUserProfile(): Promise<CannabisApiResponse> {
    const response = await this.api.get('/auth/me')
    return response.data
  }

  /**
   * Update cannabis user profile
   */
  async updateUserProfile(userData: any): Promise<CannabisApiResponse> {
    const response = await this.api.put('/auth/profile', userData)
    return response.data
  }

  // ============================================================================
  // CANNABIS COMPLIANCE API
  // ============================================================================

  /**
   * Get cannabis compliance status
   */
  async getComplianceStatus(facilityId?: string): Promise<CannabisApiResponse> {
    const params = facilityId ? { facilityId } : {}
    const response = await this.api.get('/compliance/status', { params })
    return response.data
  }

  /**
   * Get cannabis compliance violations
   */
  async getComplianceViolations(params?: {
    page?: number
    limit?: number
    status?: string
    severity?: string
  }): Promise<CannabisPaginatedResponse> {
    const response = await this.api.get('/compliance/violations', { params })
    return response.data
  }

  /**
   * Resolve cannabis compliance violation
   */
  async resolveViolation(violationId: string, resolution: {
    notes: string
    action: string
  }): Promise<CannabisApiResponse> {
    const response = await this.api.post(`/compliance/violations/${violationId}/resolve`, resolution)
    return response.data
  }

  /**
   * Generate cannabis compliance report
   */
  async generateComplianceReport(params: {
    type: string
    dateRange: { start: string; end: string }
    format?: 'pdf' | 'csv' | 'json'
  }): Promise<CannabisApiResponse> {
    const response = await this.api.post('/compliance/reports/generate', params)
    return response.data
  }

  // ============================================================================
  // CANNABIS PRODUCT API
  // ============================================================================

  /**
   * Get cannabis products
   */
  async getProducts(params?: {
    page?: number
    limit?: number
    category?: string
    search?: string
    lowStock?: boolean
  }): Promise<CannabisPaginatedResponse> {
    const response = await this.api.get('/products', { params })
    return response.data
  }

  /**
   * Get cannabis product details
   */
  async getProduct(productId: string): Promise<CannabisApiResponse> {
    const response = await this.api.get(`/products/${productId}`)
    return response.data
  }

  /**
   * Create cannabis product
   */
  async createProduct(productData: any): Promise<CannabisApiResponse> {
    const response = await this.api.post('/products', productData)
    return response.data
  }

  /**
   * Update cannabis product
   */
  async updateProduct(productId: string, productData: any): Promise<CannabisApiResponse> {
    const response = await this.api.put(`/products/${productId}`, productData)
    return response.data
  }

  /**
   * Delete cannabis product
   */
  async deleteProduct(productId: string): Promise<CannabisApiResponse> {
    const response = await this.api.delete(`/products/${productId}`)
    return response.data
  }

  // ============================================================================
  // CANNABIS INVENTORY API
  // ============================================================================

  /**
   * Get cannabis inventory
   */
  async getInventory(params?: {
    page?: number
    limit?: number
    location?: string
    lowStock?: boolean
    expiring?: boolean
  }): Promise<CannabisPaginatedResponse> {
    const response = await this.api.get('/inventory', { params })
    return response.data
  }

  /**
   * Update cannabis inventory
   */
  async updateInventory(inventoryId: string, updateData: {
    quantity?: number
    location?: string
    notes?: string
  }): Promise<CannabisApiResponse> {
    const response = await this.api.put(`/inventory/${inventoryId}`, updateData)
    return response.data
  }

  /**
   * Get cannabis inventory alerts
   */
  async getInventoryAlerts(): Promise<CannabisApiResponse> {
    const response = await this.api.get('/inventory/alerts')
    return response.data
  }

  /**
   * Receive cannabis inventory
   */
  async receiveInventory(receiptData: {
    productId: string
    quantity: number
    batchNumber: string
    expirationDate?: string
    cost: number
    supplier: string
    metrcPackageId?: string
  }): Promise<CannabisApiResponse> {
    const response = await this.api.post('/inventory/receive', receiptData)
    return response.data
  }

  // ============================================================================
  // CANNABIS TRANSACTION API
  // ============================================================================

  /**
   * Get cannabis transactions
   */
  async getTransactions(params?: {
    page?: number
    limit?: number
    dateRange?: { start: string; end: string }
    customerId?: string
    status?: string
  }): Promise<CannabisPaginatedResponse> {
    const response = await this.api.get('/transactions', { params })
    return response.data
  }

  /**
   * Get cannabis transaction details
   */
  async getTransaction(transactionId: string): Promise<CannabisApiResponse> {
    const response = await this.api.get(`/transactions/${transactionId}`)
    return response.data
  }

  /**
   * Create cannabis transaction
   */
  async createTransaction(transactionData: {
    customerId?: string
    items: Array<{
      productId: string
      quantity: number
      price: number
    }>
    payment: {
      method: string
      amount: number
      tendered?: number
    }
    discounts?: Array<{
      type: string
      amount: number
    }>
  }): Promise<CannabisApiResponse> {
    const response = await this.api.post('/transactions', transactionData)
    return response.data
  }

  /**
   * Void cannabis transaction
   */
  async voidTransaction(transactionId: string, reason: string): Promise<CannabisApiResponse> {
    const response = await this.api.post(`/transactions/${transactionId}/void`, { reason })
    return response.data
  }

  /**
   * Refund cannabis transaction
   */
  async refundTransaction(transactionId: string, refundData: {
    amount: number
    reason: string
    items?: Array<{
      transactionItemId: string
      quantity: number
    }>
  }): Promise<CannabisApiResponse> {
    const response = await this.api.post(`/transactions/${transactionId}/refund`, refundData)
    return response.data
  }

  // ============================================================================
  // CANNABIS CUSTOMER API
  // ============================================================================

  /**
   * Get cannabis customers
   */
  async getCustomers(params?: {
    page?: number
    limit?: number
    search?: string
    type?: string
  }): Promise<CannabisPaginatedResponse> {
    const response = await this.api.get('/customers', { params })
    return response.data
  }

  /**
   * Get cannabis customer details
   */
  async getCustomer(customerId: string): Promise<CannabisApiResponse> {
    const response = await this.api.get(`/customers/${customerId}`)
    return response.data
  }

  /**
   * Create cannabis customer
   */
  async createCustomer(customerData: {
    firstName?: string
    lastName?: string
    email?: string
    phone?: string
    dateOfBirth: string
    identification: {
      type: string
      number: string
      issuingState: string
      expirationDate: string
    }
    medicalCard?: {
      number: string
      expirationDate: string
      issuingState: string
    }
  }): Promise<CannabisApiResponse> {
    const response = await this.api.post('/customers', customerData)
    return response.data
  }

  /**
   * Update cannabis customer
   */
  async updateCustomer(customerId: string, customerData: any): Promise<CannabisApiResponse> {
    const response = await this.api.put(`/customers/${customerId}`, customerData)
    return response.data
  }

  /**
   * Get cannabis customer purchase history
   */
  async getCustomerPurchaseHistory(customerId: string, params?: {
    page?: number
    limit?: number
    dateRange?: { start: string; end: string }
  }): Promise<CannabisPaginatedResponse> {
    const response = await this.api.get(`/customers/${customerId}/purchases`, { params })
    return response.data
  }

  /**
   * Verify cannabis customer age and limits
   */
  async verifyCustomer(customerData: {
    identification: {
      type: string
      number: string
      expirationDate: string
    }
    dateOfBirth: string
  }): Promise<CannabisApiResponse> {
    const response = await this.api.post('/customers/verify', customerData)
    return response.data
  }

  // ============================================================================
  // CANNABIS METRC API
  // ============================================================================

  /**
   * Get METRC sync status
   */
  async getMetrcSyncStatus(): Promise<CannabisApiResponse> {
    const response = await this.api.get('/metrc/sync/status')
    return response.data
  }

  /**
   * Trigger METRC sync
   */
  async triggerMetrcSync(): Promise<CannabisApiResponse> {
    const response = await this.api.post('/metrc/sync/trigger')
    return response.data
  }

  /**
   * Get METRC packages
   */
  async getMetrcPackages(params?: {
    page?: number
    limit?: number
    status?: string
  }): Promise<CannabisPaginatedResponse> {
    const response = await this.api.get('/metrc/packages', { params })
    return response.data
  }

  /**
   * Get METRC transfers
   */
  async getMetrcTransfers(params?: {
    page?: number
    limit?: number
    status?: string
  }): Promise<CannabisPaginatedResponse> {
    const response = await this.api.get('/metrc/transfers', { params })
    return response.data
  }

  // ============================================================================
  // CANNABIS ANALYTICS API
  // ============================================================================

  /**
   * Get cannabis dashboard analytics
   */
  async getDashboardAnalytics(dateRange: string = '7d'): Promise<CannabisApiResponse> {
    const response = await this.api.get('/analytics/dashboard', {
      params: { dateRange }
    })
    return response.data
  }

  /**
   * Get cannabis sales analytics
   */
  async getSalesAnalytics(params: {
    dateRange: { start: string; end: string }
    groupBy?: 'day' | 'week' | 'month'
    category?: string
  }): Promise<CannabisApiResponse> {
    const response = await this.api.get('/analytics/sales', { params })
    return response.data
  }

  /**
   * Get cannabis inventory analytics
   */
  async getInventoryAnalytics(params?: {
    dateRange?: { start: string; end: string }
    category?: string
  }): Promise<CannabisApiResponse> {
    const response = await this.api.get('/analytics/inventory', { params })
    return response.data
  }

  /**
   * Get cannabis customer analytics
   */
  async getCustomerAnalytics(params: {
    dateRange: { start: string; end: string }
    segment?: string
  }): Promise<CannabisApiResponse> {
    const response = await this.api.get('/analytics/customers', { params })
    return response.data
  }

  // ============================================================================
  // CANNABIS SETTINGS API
  // ============================================================================

  /**
   * Get cannabis facility settings
   */
  async getFacilitySettings(): Promise<CannabisApiResponse> {
    const response = await this.api.get('/settings/facility')
    return response.data
  }

  /**
   * Update cannabis facility settings
   */
  async updateFacilitySettings(settings: any): Promise<CannabisApiResponse> {
    const response = await this.api.put('/settings/facility', settings)
    return response.data
  }

  /**
   * Get cannabis POS settings
   */
  async getPosSettings(): Promise<CannabisApiResponse> {
    const response = await this.api.get('/settings/pos')
    return response.data
  }

  /**
   * Update cannabis POS settings
   */
  async updatePosSettings(settings: any): Promise<CannabisApiResponse> {
    const response = await this.api.put('/settings/pos', settings)
    return response.data
  }

  // ============================================================================
  // CANNABIS FILE UPLOAD API
  // ============================================================================

  /**
   * Upload cannabis business file
   */
  async uploadFile(file: File, type: 'product-image' | 'license-document' | 'lab-result' | 'other'): Promise<CannabisApiResponse> {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('type', type)

    const response = await this.api.post('/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response.data
  }

  // ============================================================================
  // CANNABIS HEALTH CHECK API
  // ============================================================================

  /**
   * Check cannabis API health
   */
  async healthCheck(): Promise<CannabisApiResponse> {
    const response = await this.api.get('/health')
    return response.data
  }
}

// Create and export cannabis API service instance
export const cannabisApi = new CannabisApiService()

// Export cannabis API service class for dependency injection
export { CannabisApiService }

// Export cannabis API types
export type { 
  CannabisApiResponse, 
  CannabisPaginatedResponse, 
  CannabisApiError 
}

/**
 * Cannabis API error handler utility
 */
export const handleCannabisApiError = (error: CannabisApiError, showToast: boolean = true) => {
  console.error('Cannabis API Error:', error)

  if (showToast) {
    // Show appropriate toast message based on error type
    if (error.isNetworkError) {
      toast.error('Cannabis system connection failed. Please check your internet.')
    } else if (error.isAuthError) {
      toast.error('Cannabis authentication required. Please sign in.')
    } else if (error.isValidationError) {
      toast.error(error.message || 'Cannabis data validation failed.')
    } else if (error.isComplianceError) {
      toast.error(error.message || 'Cannabis compliance violation detected.')
    } else if (error.isTransactionError) {
      toast.error(error.message || 'Cannabis transaction failed.')
    } else {
      toast.error(error.message || 'Cannabis operation failed.')
    }
  }

  return error
}

/**
 * Cannabis API request wrapper with error handling
 */
export const withCannabisErrorHandling = async <T>(
  apiCall: () => Promise<T>,
  showToast: boolean = true
): Promise<T> => {
  try {
    return await apiCall()
  } catch (error) {
    throw handleCannabisApiError(error as CannabisApiError, showToast)
  }
}
