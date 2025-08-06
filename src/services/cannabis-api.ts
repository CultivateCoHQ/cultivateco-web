// Cannabis API Service - Basic implementation for development
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api'

// Basic API client
const apiClient = {
  async get(endpoint: string) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`)
    return response.json()
  },

  async post(endpoint: string, data: any) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return response.json()
  },

  async put(endpoint: string, data: any) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return response.json()
  },

  async delete(endpoint: string) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
    })
    return response.json()
  },
}

// Cannabis API endpoints
export const cannabisAPI = {
  // Products
  getProducts: (params?: any) => apiClient.get('/cannabis/products'),
  createProduct: (data: any) => apiClient.post('/cannabis/products', data),
  updateProduct: (id: string, data: any) => apiClient.put(`/cannabis/products/${id}`, data),
  deleteProduct: (id: string) => apiClient.delete(`/cannabis/products/${id}`),

  // Customers
  getCustomers: (params?: any) => apiClient.get('/cannabis/customers'),
  createCustomer: (data: any) => apiClient.post('/cannabis/customers', data),
  updateCustomer: (id: string, data: any) => apiClient.put(`/cannabis/customers/${id}`, data),
  deleteCustomer: (id: string) => apiClient.delete(`/cannabis/customers/${id}`),

  // Orders
  getOrders: (params?: any) => apiClient.get('/cannabis/orders'),
  createOrder: (data: any) => apiClient.post('/cannabis/orders', data),
  updateOrder: (id: string, data: any) => apiClient.put(`/cannabis/orders/${id}`, data),
  deleteOrder: (id: string) => apiClient.delete(`/cannabis/orders/${id}`),

  // Staff
  getStaff: (params?: any) => apiClient.get('/cannabis/staff'),
  createStaff: (data: any) => apiClient.post('/cannabis/staff', data),
  updateStaff: (id: string, data: any) => apiClient.put(`/cannabis/staff/${id}`, data),
  deleteStaff: (id: string) => apiClient.delete(`/cannabis/staff/${id}`),

  // Vendors
  getVendors: (params?: any) => apiClient.get('/cannabis/vendors'),
  createVendor: (data: any) => apiClient.post('/cannabis/vendors', data),
  updateVendor: (id: string, data: any) => apiClient.put(`/cannabis/vendors/${id}`, data),
  deleteVendor: (id: string) => apiClient.delete(`/cannabis/vendors/${id}`),

  // Business metrics
  getBusinessMetrics: (params?: any) => apiClient.get('/cannabis/metrics'),
}
