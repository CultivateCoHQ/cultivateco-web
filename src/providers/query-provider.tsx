'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'

export function CannabisQueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            retry: 1,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  )
}

// Export aliases for backward compatibility
export const QueryProvider = CannabisQueryProvider

// Cannabis Query Keys
export const cannabisQueryKeys = {
  all: ['cannabis'] as const,
  products: () => [...cannabisQueryKeys.all, 'products'] as const,
  customers: () => [...cannabisQueryKeys.all, 'customers'] as const,
  orders: () => [...cannabisQueryKeys.all, 'orders'] as const,
  staff: () => [...cannabisQueryKeys.all, 'staff'] as const,
  vendors: () => [...cannabisQueryKeys.all, 'vendors'] as const,
  inventory: () => [...cannabisQueryKeys.all, 'inventory'] as const,
  metrics: () => [...cannabisQueryKeys.all, 'metrics'] as const,
}

// Cannabis Query Utils
export const cannabisQueryUtils = {
  invalidateAll: (queryClient: QueryClient) => {
    queryClient.invalidateQueries({ queryKey: cannabisQueryKeys.all })
  },
  invalidateProducts: (queryClient: QueryClient) => {
    queryClient.invalidateQueries({ queryKey: cannabisQueryKeys.products() })
  },
  invalidateCustomers: (queryClient: QueryClient) => {
    queryClient.invalidateQueries({ queryKey: cannabisQueryKeys.customers() })
  },
}
