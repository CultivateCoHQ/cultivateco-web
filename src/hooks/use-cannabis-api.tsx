'use client'

import { 
  useQuery, 
  useMutation, 
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions
} from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { cannabisApi, CannabisApiResponse, CannabisPaginatedResponse, handleCannabisApiError } from '@/services/cannabis-api'
import { cannabisQueryKeys, cannabisQueryUtils } from '@/providers/query-provider'

/**
 * =============================================================================
 * CultivateCo Cannabis API Hooks
 * =============================================================================
 * React Query hooks for cannabis business operations and compliance
 */

// ============================================================================
// CANNABIS AUTHENTICATION HOOKS
// ============================================================================

/**
 * Cannabis user profile hook
 */
export function useCannabisUserProfile() {
  return useQuery({
    queryKey: cannabisQueryKeys.auth.user(),
    queryFn: async () => {
      const response = await cannabisApi.getUserProfile()
      return response.data
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false, // Don't retry auth failures
  })
}

/**
 * Cannabis user profile update mutation
 */
export function useCannabisUpdateProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (userData: any) => {
      const response = await cannabisApi.updateUserProfile(userData)
      return response.data
    },
    onSuccess: (data) => {
      // Update cached user data
      queryClient.setQueryData(cannabisQueryKeys.auth.user(), data)
      toast.success('Cannabis profile updated successfully')
    },
    onError: (error: any) => {
      handleCannabisApiError(error, true)
    },
  })
}

// ============================================================================
// CANNABIS COMPLIANCE HOOKS
// ============================================================================

/**
 * Cannabis compliance status hook
 */
export function useCannabisComplianceStatus(facilityId?: string) {
  return useQuery({
    queryKey: cannabisQueryKeys.compliance.status(),
    queryFn: async () => {
      const response = await cannabisApi.getComplianceStatus(facilityId)
      return response.data
    },
    staleTime: 1000 * 60 * 1, // 1 minute for compliance
    refetchInterval: 1000 * 60 * 2, // Refetch every 2 minutes
    refetchIntervalInBackground: true,
  })
}

/**
 * Cannabis compliance violations hook
 */
export function useCannabisComplianceViolations(params?: {
  page?: number
  limit?: number
  status?: string
  severity?: string
}) {
  return useQuery({
    queryKey: [...cannabisQueryKeys.compliance.violations(), params],
    queryFn: async () => {
      const response = await cannabisApi.getComplianceViolations(params)
      return response
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
  })
}

/**
 * Cannabis violation resolution mutation
 */
export function useCannabisResolveViolation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ violationId, resolution }: {
      violationId: string
      resolution: { notes: string; action: string }
    }) => {
      const response = await cannabisApi.resolveViolation(violationId, resolution)
      return response.data
    },
    onSuccess: () => {
      // Invalidate compliance queries
      cannabisQueryUtils.invalidateCompliance(queryClient)
      toast.success('Cannabis violation resolved successfully')
    },
    onError: (error: any) => {
      handleCannabisApiError(error, true)
    },
  })
}

/**
 * Cannabis compliance report generation mutation
 */
export function useCannabisGenerateComplianceReport() {
  return useMutation({
    mutationFn: async (params: {
      type: string
      dateRange: { start: string; end: string }
      format?: 'pdf' | 'csv' | 'json'
    }) => {
      const response = await cannabisApi.generateComplianceReport(params)
      return response.data
    },
    onSuccess: () => {
      toast.success('Cannabis compliance report generated successfully')
    },
    onError: (error: any) => {
      handleCannabisApiError(error, true)
    },
  })
}

// ============================================================================
// CANNABIS PRODUCT HOOKS
// ============================================================================

/**
 * Cannabis products hook
 */
export function useCannabisProducts(params?: {
  page?: number
  limit?: number
  category?: string
  search?: string
  lowStock?: boolean
}) {
  return useQuery({
    queryKey: cannabisQueryKeys.products.list(params || {}),
    queryFn: async () => {
      const response = await cannabisApi.getProducts(params)
      return response
    },
    staleTime: 1000 * 60 * 3, // 3 minutes
  })
}

/**
 * Cannabis product detail hook
 */
export function useCannabisProduct(productId: string, enabled: boolean = true) {
  return useQuery({
    queryKey: cannabisQueryKeys.products.detail(productId),
    queryFn: async () => {
      const response = await cannabisApi.getProduct(productId)
      return response.data
    },
    enabled: enabled && !!productId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

/**
 * Cannabis product creation mutation
 */
export function useCannabisCreateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (productData: any) => {
      const response = await cannabisApi.createProduct(productData)
      return response.data
    },
    onSuccess: () => {
      // Invalidate products list
      queryClient.invalidateQueries({ queryKey: cannabisQueryKeys.products.all() })
      cannabisQueryUtils.invalidateInventory(queryClient)
      toast.success('Cannabis product created successfully')
    },
    onError: (error: any) => {
      handleCannabisApiError(error, true)
    },
  })
}

/**
 * Cannabis product update mutation
 */
export function useCannabisUpdateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ productId, productData }: {
      productId: string
      productData: any
    }) => {
      const response = await cannabisApi.updateProduct(productId, productData)
      return response.data
    },
    onSuccess: (data, variables) => {
      // Update cached product data
      queryClient.setQueryData(cannabisQueryKeys.products.detail(variables.productId), data)
      queryClient.invalidateQueries({ queryKey: cannabisQueryKeys.products.all() })
      toast.success('Cannabis product updated successfully')
    },
    onError: (error: any) => {
      handleCannabisApiError(error, true)
    },
  })
}

/**
 * Cannabis product deletion mutation
 */
export function useCannabisDeleteProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (productId: string) => {
      const response = await cannabisApi.deleteProduct(productId)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cannabisQueryKeys.products.all() })
      cannabisQueryUtils.invalidateInventory(queryClient)
      toast.success('Cannabis product deleted successfully')
    },
    onError: (error: any) => {
      handleCannabisApiError(error, true)
    },
  })
}

// ============================================================================
// CANNABIS INVENTORY HOOKS
// ============================================================================

/**
 * Cannabis inventory hook
 */
export function useCannabisInventory(params?: {
  page?: number
  limit?: number
  location?: string
  lowStock?: boolean
  expiring?: boolean
}) {
  return useQuery({
    queryKey: cannabisQueryKeys.inventory.list(params || {}),
    queryFn: async () => {
      const response = await cannabisApi.getInventory(params)
      return response
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
    refetchInterval: 1000 * 60 * 5, // Refetch every 5 minutes
  })
}

/**
 * Cannabis inventory alerts hook
 */
export function useCannabisInventoryAlerts() {
  return useQuery({
    queryKey: cannabisQueryKeys.inventory.alerts(),
    queryFn: async () => {
      const response = await cannabisApi.getInventoryAlerts()
      return response.data
    },
    staleTime: 1000 * 30, // 30 seconds
    refetchInterval: 1000 * 60, // Refetch every minute
    refetchIntervalInBackground: true,
  })
}

/**
 * Cannabis inventory update mutation
 */
export function useCannabisUpdateInventory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ inventoryId, updateData }: {
      inventoryId: string
      updateData: { quantity?: number; location?: string; notes?: string }
    }) => {
      const response = await cannabisApi.updateInventory(inventoryId, updateData)
      return response.data
    },
    onSuccess: () => {
      cannabisQueryUtils.invalidateInventory(queryClient)
      cannabisQueryUtils.invalidateAnalytics(queryClient)
      toast.success('Cannabis inventory updated successfully')
    },
    onError: (error: any) => {
      handleCannabisApiError(error, true)
    },
  })
}

/**
 * Cannabis inventory receive mutation
 */
export function useCannabisReceiveInventory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (receiptData: {
      productId: string
      quantity: number
      batchNumber: string
      expirationDate?: string
      cost: number
      supplier: string
      metrcPackageId?: string
    }) => {
      const response = await cannabisApi.receiveInventory(receiptData)
      return response.data
    },
    onSuccess: () => {
      cannabisQueryUtils.invalidateInventory(queryClient)
      cannabisQueryUtils.invalidateAnalytics(queryClient)
      cannabisQueryUtils.invalidateCompliance(queryClient)
      toast.success('Cannabis inventory received successfully')
    },
    onError: (error: any) => {
      handleCannabisApiError(error, true)
    },
  })
}

// ============================================================================
// CANNABIS TRANSACTION HOOKS
// ============================================================================

/**
 * Cannabis transactions hook
 */
export function useCannabisTransactions(params?: {
  page?: number
  limit?: number
  dateRange?: { start: string; end: string }
  customerId?: string
  status?: string
}) {
  return useQuery({
    queryKey: cannabisQueryKeys.transactions.list(params || {}),
    queryFn: async () => {
      const response = await cannabisApi.getTransactions(params)
      return response
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
  })
}

/**
 * Cannabis recent transactions hook
 */
export function useCannabisRecentTransactions(limit: number = 10) {
  return useQuery({
    queryKey: cannabisQueryKeys.transactions.recent(limit),
    queryFn: async () => {
      const response = await cannabisApi.getTransactions({ limit, page: 1 })
      return response.data || []
    },
    staleTime: 1000 * 30, // 30 seconds
    refetchInterval: 1000 * 60, // Refetch every minute
  })
}

/**
 * Cannabis transaction detail hook
 */
export function useCannabisTransaction(transactionId: string, enabled: boolean = true) {
  return useQuery({
    queryKey: cannabisQueryKeys.transactions.detail(transactionId),
    queryFn: async () => {
      const response = await cannabisApi.getTransaction(transactionId)
      return response.data
    },
    enabled: enabled && !!transactionId,
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}

/**
 * Cannabis transaction creation mutation
 */
export function useCannabisCreateTransaction() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (transactionData: {
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
    }) => {
      const response = await cannabisApi.createTransaction(transactionData)
      return response.data
    },
    onSuccess: () => {
      cannabisQueryUtils.invalidateTransactions(queryClient)
      cannabisQueryUtils.invalidateInventory(queryClient)
      cannabisQueryUtils.invalidateAnalytics(queryClient)
      cannabisQueryUtils.invalidateCompliance(queryClient)
      toast.success('Cannabis transaction completed successfully')
    },
    onError: (error: any) => {
      handleCannabisApiError(error, true)
    },
  })
}

/**
 * Cannabis transaction void mutation
 */
export function useCannabisVoidTransaction() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ transactionId, reason }: {
      transactionId: string
      reason: string
    }) => {
      const response = await cannabisApi.voidTransaction(transactionId, reason)
      return response.data
    },
    onSuccess: () => {
      cannabisQueryUtils.invalidateTransactions(queryClient)
      cannabisQueryUtils.invalidateInventory(queryClient)
      cannabisQueryUtils.invalidateAnalytics(queryClient)
      toast.success('Cannabis transaction voided successfully')
    },
    onError: (error: any) => {
      handleCannabisApiError(error, true)
    },
  })
}

/**
 * Cannabis transaction refund mutation
 */
export function useCannabisRefundTransaction() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ transactionId, refundData }: {
      transactionId: string
      refundData: {
        amount: number
        reason: string
        items?: Array<{
          transactionItemId: string
          quantity: number
        }>
      }
    }) => {
      const response = await cannabisApi.refundTransaction(transactionId, refundData)
      return response.data
    },
    onSuccess: () => {
      cannabisQueryUtils.invalidateTransactions(queryClient)
      cannabisQueryUtils.invalidateInventory(queryClient)
      cannabisQueryUtils.invalidateAnalytics(queryClient)
      toast.success('Cannabis transaction refunded successfully')
    },
    onError: (error: any) => {
      handleCannabisApiError(error, true)
    },
  })
}

// ============================================================================
// CANNABIS CUSTOMER HOOKS
// ============================================================================

/**
 * Cannabis customers hook
 */
export function useCannabisCustomers(params?: {
  page?: number
  limit?: number
  search?: string
  type?: string
}) {
  return useQuery({
    queryKey: cannabisQueryKeys.customers.list(params || {}),
    queryFn: async () => {
      const response = await cannabisApi.getCustomers(params)
      return response
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

/**
 * Cannabis customer detail hook
 */
export function useCannabisCustomer(customerId: string, enabled: boolean = true) {
  return useQuery({
    queryKey: cannabisQueryKeys.customers.detail(customerId),
    queryFn: async () => {
      const response = await cannabisApi.getCustomer(customerId)
      return response.data
    },
    enabled: enabled && !!customerId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

/**
 * Cannabis customer creation mutation
 */
export function useCannabisCreateCustomer() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (customerData: {
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
    }) => {
      const response = await cannabisApi.createCustomer(customerData)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cannabisQueryKeys.customers.all() })
      toast.success('Cannabis customer created successfully')
    },
    onError: (error: any) => {
      handleCannabisApiError(error, true)
    },
  })
}

/**
 * Cannabis customer verification mutation
 */
export function useCannabisVerifyCustomer() {
  return useMutation({
    mutationFn: async (customerData: {
      identification: {
        type: string
        number: string
        expirationDate: string
      }
      dateOfBirth: string
    }) => {
      const response = await cannabisApi.verifyCustomer(customerData)
      return response.data
    },
    onError: (error: any) => {
      handleCannabisApiError(error, true)
    },
  })
}

/**
 * Cannabis customer purchase history hook
 */
export function useCannabisCustomerPurchaseHistory(
  customerId: string,
  params?: {
    page?: number
    limit?: number
    dateRange?: { start: string; end: string }
  },
  enabled: boolean = true
) {
  return useQuery({
    queryKey: cannabisQueryKeys.customers.history(customerId),
    queryFn: async () => {
      const response = await cannabisApi.getCustomerPurchaseHistory(customerId, params)
      return response
    },
    enabled: enabled && !!customerId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

// ============================================================================
// CANNABIS METRC HOOKS
// ============================================================================

/**
 * Cannabis METRC sync status hook
 */
export function useCannabisMetrcSyncStatus() {
  return useQuery({
    queryKey: cannabisQueryKeys.metrc.status(),
    queryFn: async () => {
      const response = await cannabisApi.getMetrcSyncStatus()
      return response.data
    },
    staleTime: 1000 * 30, // 30 seconds
    refetchInterval: 1000 * 60, // Refetch every minute
    refetchIntervalInBackground: true,
  })
}

/**
 * Cannabis METRC sync trigger mutation
 */
export function useCannabisTriggerMetrcSync() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      const response = await cannabisApi.triggerMetrcSync()
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cannabisQueryKeys.metrc.all() })
      cannabisQueryUtils.invalidateCompliance(queryClient)
      toast.success('Cannabis METRC sync initiated successfully')
    },
    onError: (error: any) => {
      handleCannabisApiError(error, true)
    },
  })
}

/**
 * Cannabis METRC packages hook
 */
export function useCannabisMetrcPackages(params?: {
  page?: number
  limit?: number
  status?: string
}) {
  return useQuery({
    queryKey: cannabisQueryKeys.metrc.packages(params || {}),
    queryFn: async () => {
      const response = await cannabisApi.getMetrcPackages(params)
      return response
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
  })
}

// ============================================================================
// CANNABIS ANALYTICS HOOKS
// ============================================================================

/**
 * Cannabis dashboard analytics hook
 */
export function useCannabisDashboardAnalytics(dateRange: string = '7d') {
  return useQuery({
    queryKey: cannabisQueryKeys.analytics.dashboard(dateRange),
    queryFn: async () => {
      const response = await cannabisApi.getDashboardAnalytics(dateRange)
      return response.data
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
    refetchInterval: 1000 * 60 * 5, // Refetch every 5 minutes
  })
}

/**
 * Cannabis sales analytics hook
 */
export function useCannabisSalesAnalytics(params: {
  dateRange: { start: string; end: string }
  groupBy?: 'day' | 'week' | 'month'
  category?: string
}) {
  return useQuery({
    queryKey: cannabisQueryKeys.analytics.sales(params.dateRange.start + '-' + params.dateRange.end),
    queryFn: async () => {
      const response = await cannabisApi.getSalesAnalytics(params)
      return response.data
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

/**
 * Cannabis inventory analytics hook
 */
export function useCannabisInventoryAnalytics(params?: {
  dateRange?: { start: string; end: string }
  category?: string
}) {
  return useQuery({
    queryKey: cannabisQueryKeys.analytics.inventory(params?.dateRange?.start + '-' + params?.dateRange?.end || 'all'),
    queryFn: async () => {
      const response = await cannabisApi.getInventoryAnalytics(params)
      return response.data
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

// ============================================================================
// CANNABIS SETTINGS HOOKS
// ============================================================================

/**
 * Cannabis facility settings hook
 */
export function useCannabisFacilitySettings() {
  return useQuery({
    queryKey: cannabisQueryKeys.settings.facility(),
    queryFn: async () => {
      const response = await cannabisApi.getFacilitySettings()
      return response.data
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}

/**
 * Cannabis facility settings update mutation
 */
export function useCannabisUpdateFacilitySettings() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (settings: any) => {
      const response = await cannabisApi.updateFacilitySettings(settings)
      return response.data
    },
    onSuccess: (data) => {
      queryClient.setQueryData(cannabisQueryKeys.settings.facility(), data)
      toast.success('Cannabis facility settings updated successfully')
    },
    onError: (error: any) => {
      handleCannabisApiError(error, true)
    },
  })
}

/**
 * Cannabis POS settings hook
 */
export function useCannabisPosSettings() {
  return useQuery({
    queryKey: cannabisQueryKeys.settings.pos(),
    queryFn: async () => {
      const response = await cannabisApi.getPosSettings()
      return response.data
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}

// ============================================================================
// CANNABIS FILE UPLOAD HOOKS
// ============================================================================

/**
 * Cannabis file upload mutation
 */
export function useCannabisFileUpload() {
  return useMutation({
    mutationFn: async ({ file, type }: {
      file: File
      type: 'product-image' | 'license-document' | 'lab-result' | 'other'
    }) => {
      const response = await cannabisApi.uploadFile(file, type)
      return response.data
    },
    onSuccess: () => {
      toast.success('Cannabis file uploaded successfully')
    },
    onError: (error: any) => {
      handleCannabisApiError(error, true)
    },
  })
}

// ============================================================================
// CANNABIS HEALTH CHECK HOOKS
// ============================================================================

/**
 * Cannabis API health check hook
 */
export function useCannabisHealthCheck() {
  return useQuery({
    queryKey: ['cannabis', 'health'],
    queryFn: async () => {
      const response = await cannabisApi.healthCheck()
      return response.data
    },
    staleTime: 1000 * 30, // 30 seconds
    refetchInterval: 1000 * 60, // Check every minute
    retry: 1,
  })
}

// ============================================================================
// CANNABIS UTILITY HOOKS
// ============================================================================

/**
 * Cannabis optimistic update utility hook
 */
export function useCannabisOptimisticUpdate<T>(
  queryKey: any[],
  updateFn: (oldData: T, newData: any) => T
) {
  const queryClient = useQueryClient()

  return {
    optimisticUpdate: (newData: any) => {
      queryClient.setQueryData(queryKey, (oldData: T) => {
        if (!oldData) return oldData
        return updateFn(oldData, newData)
      })
    },
    rollback: () => {
      queryClient.invalidateQueries({ queryKey })
    }
  }
}

/**
 * Cannabis prefetch utility hook
 */
export function useCannabisPrefetch() {
  const queryClient = useQueryClient()

  return {
    prefetchDashboard: (dateRange: string = '7d') => {
      cannabisQueryUtils.prefetchDashboard(queryClient, dateRange)
    },
    prefetchProduct: (productId: string) => {
      queryClient.prefetchQuery({
        queryKey: cannabisQueryKeys.products.detail(productId),
        queryFn: async () => {
          const response = await cannabisApi.getProduct(productId)
          return response.data
        },
      })
    },
    prefetchCustomer: (customerId: string) => {
      queryClient.prefetchQuery({
        queryKey: cannabisQueryKeys.customers.detail(customerId),
        queryFn: async () => {
          const response = await cannabisApi.getCustomer(customerId)
          return response.data
        },
      })
    }
  }
}
