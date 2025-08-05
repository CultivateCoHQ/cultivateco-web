'use client'

import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

/**
 * =============================================================================
 * CultivateCo Cannabis Query Provider
 * =============================================================================
 * React Query configuration optimized for cannabis business operations
 */

interface QueryProviderProps {
  children: React.ReactNode
}

export function QueryProvider({ children }: QueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Cannabis business data caching strategy
            staleTime: 1000 * 60 * 5, // 5 minutes for cannabis business data
            gcTime: 1000 * 60 * 30, // 30 minutes garbage collection
            
            // Cannabis compliance requires reliable data
            refetchOnWindowFocus: true,
            refetchOnReconnect: true,
            
            // Cannabis business operations retry strategy
            retry: (failureCount, error: any) => {
              // Don't retry on authentication errors
              if (error?.status === 401 || error?.status === 403) {
                return false
              }
              
              // Don't retry on cannabis compliance validation errors
              if (error?.status === 422) {
                return false
              }
              
              // Retry up to 3 times for cannabis API connectivity issues
              return failureCount < 3
            },
            
            // Cannabis business error handling
            throwOnError: (error: any) => {
              // Always throw critical cannabis compliance errors
              if (error?.isCritical || error?.isComplianceError) {
                return true
              }
              
              // Don't throw on expected cannabis business errors
              if (error?.status >= 400 && error?.status < 500) {
                return false
              }
              
              return true
            },
          },
          mutations: {
            // Cannabis transaction and compliance mutations
            retry: (failureCount, error: any) => {
              // Never retry cannabis transactions to prevent duplicates
              if (error?.isTransactionError) {
                return false
              }
              
              // Don't retry on validation errors
              if (error?.status === 400 || error?.status === 422) {
                return false
              }
              
              // Retry cannabis compliance submissions once
              return failureCount < 1
            },
            
            // Cannabis business mutation error handling
            throwOnError: (error: any) => {
              // Always throw cannabis transaction errors
              if (error?.isTransactionError || error?.isComplianceError) {
                return true
              }
              
              return error?.status >= 500
            },
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      
      {/* Cannabis development tools - only in development */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools
          initialIsOpen={false}
          position="bottom-right"
          buttonStyle={{
            backgroundColor: '#154438', // CultivateCo green
            color: '#fbfaf7', // CultivateCo cream
            borderRadius: '8px',
            border: 'none',
            padding: '8px 12px',
            fontSize: '12px',
            fontWeight: '500',
            boxShadow: '0 4px 6px -1px rgba(21, 68, 56, 0.1)',
          }}
          panelStyle={{
            backgroundColor: '#fbfaf7', // CultivateCo cream
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            boxShadow: '0 10px 15px -3px rgba(21, 68, 56, 0.1)',
          }}
        />
      )}
    </QueryClientProvider>
  )
}

// Cannabis business query keys for consistency
export const cannabisQueryKeys = {
  // Cannabis authentication queries
  auth: {
    user: () => ['cannabis', 'auth', 'user'] as const,
    permissions: () => ['cannabis', 'auth', 'permissions'] as const,
    facilities: () => ['cannabis', 'auth', 'facilities'] as const,
  },
  
  // Cannabis compliance queries
  compliance: {
    all: () => ['cannabis', 'compliance'] as const,
    status: () => ['cannabis', 'compliance', 'status'] as const,
    violations: () => ['cannabis', 'compliance', 'violations'] as const,
    score: (facilityId: string) => ['cannabis', 'compliance', 'score', facilityId] as const,
    metrc: (facilityId: string) => ['cannabis', 'compliance', 'metrc', facilityId] as const,
  },
  
  // Cannabis product queries
  products: {
    all: () => ['cannabis', 'products'] as const,
    list: (filters: Record<string, any>) => ['cannabis', 'products', 'list', filters] as const,
    detail: (id: string) => ['cannabis', 'products', 'detail', id] as const,
    inventory: (id: string) => ['cannabis', 'products', 'inventory', id] as const,
    lab: (id: string) => ['cannabis', 'products', 'lab', id] as const,
  },
  
  // Cannabis transaction queries
  transactions: {
    all: () => ['cannabis', 'transactions'] as const,
    list: (filters: Record<string, any>) => ['cannabis', 'transactions', 'list', filters] as const,
    detail: (id: string) => ['cannabis', 'transactions', 'detail', id] as const,
    recent: (limit: number) => ['cannabis', 'transactions', 'recent', limit] as const,
    daily: (date: string) => ['cannabis', 'transactions', 'daily', date] as const,
  },
  
  // Cannabis customer queries
  customers: {
    all: () => ['cannabis', 'customers'] as const,
    list: (filters: Record<string, any>) => ['cannabis', 'customers', 'list', filters] as const,
    detail: (id: string) => ['cannabis', 'customers', 'detail', id] as const,
    history: (id: string) => ['cannabis', 'customers', 'history', id] as const,
    limits: (id: string) => ['cannabis', 'customers', 'limits', id] as const,
  },
  
  // Cannabis inventory queries
  inventory: {
    all: () => ['cannabis', 'inventory'] as const,
    list: (filters: Record<string, any>) => ['cannabis', 'inventory', 'list', filters] as const,
    alerts: () => ['cannabis', 'inventory', 'alerts'] as const,
    low: () => ['cannabis', 'inventory', 'low'] as const,
    expiring: () => ['cannabis', 'inventory', 'expiring'] as const,
  },
  
  // Cannabis analytics queries
  analytics: {
    all: () => ['cannabis', 'analytics'] as const,
    dashboard: (dateRange: string) => ['cannabis', 'analytics', 'dashboard', dateRange] as const,
    sales: (dateRange: string) => ['cannabis', 'analytics', 'sales', dateRange] as const,
    inventory: (dateRange: string) => ['cannabis', 'analytics', 'inventory', dateRange] as const,
    compliance: (dateRange: string) => ['cannabis', 'analytics', 'compliance', dateRange] as const,
    customers: (dateRange: string) => ['cannabis', 'analytics', 'customers', dateRange] as const,
  },
  
  // Cannabis business settings queries
  settings: {
    all: () => ['cannabis', 'settings'] as const,
    facility: () => ['cannabis', 'settings', 'facility'] as const,
    pos: () => ['cannabis', 'settings', 'pos'] as const,
    compliance: () => ['cannabis', 'settings', 'compliance'] as const,
    integrations: () => ['cannabis', 'settings', 'integrations'] as const,
  },
  
  // Cannabis METRC queries
  metrc: {
    all: () => ['cannabis', 'metrc'] as const,
    packages: (filters: Record<string, any>) => ['cannabis', 'metrc', 'packages', filters] as const,
    transfers: (filters: Record<string, any>) => ['cannabis', 'metrc', 'transfers', filters] as const,
    sync: () => ['cannabis', 'metrc', 'sync'] as const,
    status: () => ['cannabis', 'metrc', 'status'] as const,
  },
} as const

// Cannabis business query client utilities
export const cannabisQueryUtils = {
  /**
   * Invalidate all cannabis compliance queries
   */
  invalidateCompliance: (queryClient: QueryClient) => {
    queryClient.invalidateQueries({ queryKey: cannabisQueryKeys.compliance.all() })
  },
  
  /**
   * Invalidate cannabis inventory queries
   */
  invalidateInventory: (queryClient: QueryClient) => {
    queryClient.invalidateQueries({ queryKey: cannabisQueryKeys.inventory.all() })
  },
  
  /**
   * Invalidate cannabis transaction queries
   */
  invalidateTransactions: (queryClient: QueryClient) => {
    queryClient.invalidateQueries({ queryKey: cannabisQueryKeys.transactions.all() })
  },
  
  /**
   * Invalidate all cannabis analytics
   */
  invalidateAnalytics: (queryClient: QueryClient) => {
    queryClient.invalidateQueries({ queryKey: cannabisQueryKeys.analytics.all() })
  },
  
  /**
   * Prefetch cannabis dashboard data
   */
  prefetchDashboard: async (queryClient: QueryClient, dateRange: string = '7d') => {
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: cannabisQueryKeys.analytics.dashboard(dateRange),
        staleTime: 1000 * 60 * 2, // 2 minutes for dashboard
      }),
      queryClient.prefetchQuery({
        queryKey: cannabisQueryKeys.compliance.status(),
        staleTime: 1000 * 60 * 1, // 1 minute for compliance
      }),
      queryClient.prefetchQuery({
        queryKey: cannabisQueryKeys.inventory.alerts(),
        staleTime: 1000 * 30, // 30 seconds for alerts
      }),
    ])
  },
  
  /**
   * Clear all cannabis business cache
   */
  clearAll: (queryClient: QueryClient) => {
    queryClient.clear()
  },
}

// Cannabis business mutation keys
export const cannabisMutationKeys = {
  // Cannabis authentication mutations
  auth: {
    login: 'cannabis-auth-login',
    logout: 'cannabis-auth-logout',
    register: 'cannabis-auth-register',
    resetPassword: 'cannabis-auth-reset-password',
  },
  
  // Cannabis transaction mutations
  transactions: {
    create: 'cannabis-transaction-create',
    update: 'cannabis-transaction-update',
    void: 'cannabis-transaction-void',
    refund: 'cannabis-transaction-refund',
  },
  
  // Cannabis product mutations
  products: {
    create: 'cannabis-product-create',
    update: 'cannabis-product-update',
    delete: 'cannabis-product-delete',
    updateInventory: 'cannabis-product-update-inventory',
  },
  
  // Cannabis compliance mutations
  compliance: {
    resolve: 'cannabis-compliance-resolve',
    report: 'cannabis-compliance-report',
    sync: 'cannabis-compliance-sync',
    acknowledge: 'cannabis-compliance-acknowledge',
  },
  
  // Cannabis METRC mutations
  metrc: {
    sync: 'cannabis-metrc-sync',
    package: 'cannabis-metrc-package',
    transfer: 'cannabis-metrc-transfer',
  },
} as const
