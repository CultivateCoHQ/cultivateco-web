'use client'

import { useState, useMemo } from 'react'
import { 
  ShoppingCart, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Download, 
  Upload, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Package,
  User,
  Calendar,
  MapPin,
  Phone,
  Mail,
  CreditCard,
  Truck,
  RefreshCw,
  X,
  Save,
  FileText,
  Star,
  MessageCircle,
  Archive,
  RotateCcw,
  Printer,
  Send,
  CheckCircle2,
  AlertCircle,
  Info,
  Zap,
  Target,
  Activity
} from 'lucide-react'
import {
  useCannabisOrders,
  useCannabisCreateOrder,
  useCannabisUpdateOrder,
  useCannabisDeleteOrder,
  useCannabisOrderItems,
  useCannabisCustomers,
  useCannabisProducts
} from '@/hooks/use-cannabis-api'
import {
  CannabisButton,
  CannabisInput,
  CannabisSelect,
  CannabisMetricCard,
  CannabisAlert,
  CannabisLoadingSpinner,
  CannabisBadge,
  CannabisSearchInput,
  CannabisQuantityInput,
  CannabisCollapsible,
  CannabisEmptyState,
  CannabisCopyToClipboard,
  CannabisDatePicker,
  CannabisTextArea
} from '@/components/ui/cannabis-components'
import { CannabisThemeContainer, CannabisStatusIndicator } from '@/providers/theme-provider'
import { formatCurrency, formatCannabisWeight, formatDate, cn } from '@/lib/utils'

/**
 * =============================================================================
 * CultivateCo Cannabis Orders Management
 * =============================================================================
 * Comprehensive cannabis order management with compliance tracking and fulfillment
 */

interface CannabisOrder {
  id: string
  orderNumber: string
  customerId: string
  customer: {
    id: string
    name: string
    email: string
    phone: string
    dateOfBirth: string
    governmentId: string
    medicalCard?: string
    loyaltyPoints: number
  }
  
  // Order details
  items: Array<{
    id: string
    productId: string
    product: {
      name: string
      brand: string
      category: string
      sku: string
      thcPercentage?: number
      cbdPercentage?: number
      strainType?: string
      unit: string
    }
    quantity: number
    unitPrice: number
    totalPrice: number
    discountAmount: number
  }>
  
  // Pricing & taxes
  subtotal: number
  discountTotal: number
  taxAmount: number
  deliveryFee: number
  totalAmount: number
  paymentMethod: 'cash' | 'debit' | 'credit' | 'bank-transfer'
  
  // Order status & workflow
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'out-for-delivery' | 'delivered' | 'cancelled' | 'refunded'
  priority: 'low' | 'normal' | 'high' | 'urgent'
  orderType: 'pickup' | 'delivery' | 'in-store'
  
  // Fulfillment details
  fulfillmentDate?: string
  estimatedDelivery?: string
  actualDelivery?: string
  trackingNumber?: string
  deliveryInstructions?: string
  
  // Location & delivery
  deliveryAddress?: {
    street: string
    city: string
    state: string
    zipCode: string
    coordinates?: { lat: number; lng: number }
  }
  
  // Compliance & audit
  budtenderId?: string
  budtender?: { name: string; licenseNumber: string }
  metrcTransferId?: string
  complianceNotes?: string
  ageVerified: boolean
  purchaseLimitChecked: boolean
  medicalCardVerified?: boolean
  
  // Communication & notes
  customerNotes?: string
  internalNotes?: string
  communicationLog: Array<{
    timestamp: string
    type: 'sms' | 'email' | 'phone' | 'in-person'
    message: string
    staffMember: string
  }>
  
  // Timestamps
  createdAt: string
  updatedAt: string
}

interface OrderFilters {
  status: string
  orderType: string
  priority: string
  paymentMethod: string
  dateRange: { start: string; end: string }
  search: string
  customerId: string
  budtenderId: string
}

type OrderSortField = 'orderNumber' | 'totalAmount' | 'createdAt' | 'estimatedDelivery' | 'customer'
type OrderSortDirection = 'asc' | 'desc'

const ORDER_STATUSES = {
  'pending': { label: 'Pending', color: 'warning', icon: Clock },
  'confirmed': { label: 'Confirmed', color: 'info', icon: CheckCircle2 },
  'preparing': { label: 'Preparing', color: 'processing', icon: Activity },
  'ready': { label: 'Ready', color: 'success', icon: CheckCircle },
  'out-for-delivery': { label: 'Out for Delivery', color: 'processing', icon: Truck },
  'delivered': { label: 'Delivered', color: 'success', icon: CheckCircle },
  'cancelled': { label: 'Cancelled', color: 'violation', icon: XCircle },
  'refunded': { label: 'Refunded', color: 'info', icon: RotateCcw }
}

const ORDER_PRIORITIES = {
  'low': { label: 'Low', color: 'success' },
  'normal': { label: 'Normal', color: 'info' },
  'high': { label: 'High', color: 'warning' },
  'urgent': { label: 'Urgent', color: 'violation' }
}

export default function CannabisOrdersPage() {
  // Cannabis orders state
  const [filters, setFilters] = useState<OrderFilters>({
    status: 'all',
    orderType: 'all',
    priority: 'all',
    paymentMethod: 'all',
    dateRange: { start: '', end: '' },
    search: '',
    customerId: 'all',
    budtenderId: 'all'
  })
  const [sortField, setSortField] = useState<OrderSortField>('createdAt')
  const [sortDirection, setSortDirection] = useState<OrderSortDirection>('desc')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set())
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showOrderDetails, setShowOrderDetails] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<CannabisOrder | null>(null)

  // Cannabis API hooks
  const { 
    data: ordersResponse, 
    isLoading: ordersLoading, 
    error: ordersError,
    refetch: refetchOrders 
  } = useCannabisOrders({
    page: 1,
    limit: 100,
    status: filters.status !== 'all' ? filters.status : undefined,
    orderType: filters.orderType !== 'all' ? filters.orderType : undefined,
    search: filters.search || undefined,
    startDate: filters.dateRange.start || undefined,
    endDate: filters.dateRange.end || undefined
  })

  const { data: customersResponse } = useCannabisCustomers({ page: 1, limit: 1000 })
  const { data: productsResponse } = useCannabisProducts({ page: 1, limit: 1000 })

  const createOrderMutation = useCannabisCreateOrder()
  const updateOrderMutation = useCannabisUpdateOrder()
  const deleteOrderMutation = useCannabisDeleteOrder()

  // Cannabis orders data processing
  const orders = ordersResponse?.data || []
  const customers = customersResponse?.data || []
  const products = productsResponse?.data || []

  // Cannabis order filtering and sorting
  const filteredAndSortedOrders = useMemo(() => {
    let filtered = orders.filter((order: CannabisOrder) => {
      const matchesStatus = filters.status === 'all' || order.status === filters.status
      const matchesOrderType = filters.orderType === 'all' || order.orderType === filters.orderType
      const matchesPriority = filters.priority === 'all' || order.priority === filters.priority
      const matchesPaymentMethod = filters.paymentMethod === 'all' || order.paymentMethod === filters.paymentMethod
      const matchesCustomer = filters.customerId === 'all' || order.customerId === filters.customerId
      const matchesSearch = !filters.search || 
        order.orderNumber.toLowerCase().includes(filters.search.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        order.customer.email.toLowerCase().includes(filters.search.toLowerCase())

      let matchesDateRange = true
      if (filters.dateRange.start && filters.dateRange.end) {
        const orderDate = new Date(order.createdAt).getTime()
        const startDate = new Date(filters.dateRange.start).getTime()
        const endDate = new Date(filters.dateRange.end).getTime()
        matchesDateRange = orderDate >= startDate && orderDate <= endDate
      }

      return matchesStatus && matchesOrderType && matchesPriority && 
             matchesPaymentMethod && matchesCustomer && matchesSearch && matchesDateRange
    })

    // Cannabis order sorting
    filtered.sort((a: CannabisOrder, b: CannabisOrder) => {
      let aVal, bVal

      switch (sortField) {
        case 'orderNumber':
          aVal = a.orderNumber.toLowerCase()
          bVal = b.orderNumber.toLowerCase()
          break
        case 'totalAmount':
          aVal = a.totalAmount
          bVal = b.totalAmount
          break
        case 'createdAt':
          aVal = new Date(a.createdAt).getTime()
          bVal = new Date(b.createdAt).getTime()
          break
        case 'estimatedDelivery':
          aVal = a.estimatedDelivery ? new Date(a.estimatedDelivery).getTime() : 0
          bVal = b.estimatedDelivery ? new Date(b.estimatedDelivery).getTime() : 0
          break
        case 'customer':
          aVal = a.customer.name.toLowerCase()
          bVal = b.customer.name.toLowerCase()
          break
        default:
          return 0
      }

      if (sortDirection === 'asc') {
        return aVal < bVal ? -1 : aVal > bVal ? 1 : 0
      } else {
        return aVal > bVal ? -1 : aVal < bVal ? 1 : 0
      }
    })

    return filtered
  }, [orders, filters, sortField, sortDirection])

  // Cannabis order metrics
  const orderMetrics = useMemo(() => {
    const today = new Date()
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    
    const totalOrders = orders.length
    const todayOrders = orders.filter((o: CannabisOrder) => new Date(o.createdAt) >= todayStart).length
    const pendingOrders = orders.filter((o: CannabisOrder) => ['pending', 'confirmed', 'preparing'].includes(o.status)).length
    const totalRevenue = orders.reduce((sum: number, o: CannabisOrder) => sum + o.totalAmount, 0)
    const todayRevenue = orders
      .filter((o: CannabisOrder) => new Date(o.createdAt) >= todayStart)
      .reduce((sum: number, o: CannabisOrder) => sum + o.totalAmount, 0)
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0
    const deliveryOrders = orders.filter((o: CannabisOrder) => o.orderType === 'delivery').length

    return {
      totalOrders,
      todayOrders,
      pendingOrders,
      totalRevenue,
      todayRevenue,
      averageOrderValue,
      deliveryOrders
    }
  }, [orders])

  /**
   * Handle cannabis order operations
   */
  const handleFilterChange = (key: keyof OrderFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleSort = (field: OrderSortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const handleSelectOrder = (orderId: string) => {
    const newSelected = new Set(selectedOrders)
    if (newSelected.has(orderId)) {
      newSelected.delete(orderId)
    } else {
      newSelected.add(orderId)
    }
    setSelectedOrders(newSelected)
  }

  const handleSelectAll = () => {
    if (selectedOrders.size === filteredAndSortedOrders.length) {
      setSelectedOrders(new Set())
    } else {
      setSelectedOrders(new Set(filteredAndSortedOrders.map((order: CannabisOrder) => order.id)))
    }
  }

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    updateOrderMutation.mutate({
      orderId,
      orderData: { status: newStatus }
    })
  }

  const handleBulkAction = (action: 'confirm' | 'prepare' | 'ready' | 'cancel' | 'archive') => {
    console.log(`Bulk ${action} for orders:`, Array.from(selectedOrders))
    setSelectedOrders(new Set())
  }

  if (ordersLoading) {
    return (
      <div className="space-y-6">
        <CannabisOrdersHeader 
          onRefresh={() => {}} 
          onCreateOrder={() => {}} 
          onExport={() => {}}
        />
        <CannabisLoadingSpinner size="lg" text="Loading cannabis orders..." />
      </div>
    )
  }

  if (ordersError) {
    return (
      <div className="space-y-6">
        <CannabisOrdersHeader 
          onRefresh={refetchOrders} 
          onCreateOrder={() => setShowCreateModal(true)} 
          onExport={() => console.log('Export orders')}
        />
        <CannabisAlert
          type="error"
          title="Cannabis Orders Error"
          message="Failed to load cannabis orders. Please try again."
          action={{ label: 'Retry', onClick: refetchOrders }}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Cannabis Orders Header */}
      <CannabisOrdersHeader 
        onRefresh={refetchOrders} 
        onCreateOrder={() => setShowCreateModal(true)} 
        onExport={() => console.log('Export orders')}
      />

      {/* Cannabis Order Metrics */}
      <CannabisOrderMetrics metrics={orderMetrics} />

      {/* Cannabis Order Filters */}
      <CannabisOrderFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
        customers={customers}
      />

      {/* Cannabis Bulk Actions */}
      {selectedOrders.size > 0 && (
        <CannabisOrderBulkActions
          selectedCount={selectedOrders.size}
          onBulkAction={handleBulkAction}
          onClearSelection={() => setSelectedOrders(new Set())}
        />
      )}

      {/* Cannabis Orders Table */}
      <CannabisThemeContainer variant="card">
        <CannabisOrdersTable
          orders={filteredAndSortedOrders}
          selectedOrders={selectedOrders}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
          onSelectOrder={handleSelectOrder}
          onSelectAll={handleSelectAll}
          onViewOrder={(order) => {
            setSelectedOrder(order)
            setShowOrderDetails(true)
          }}
          onEditOrder={(order) => {
            setSelectedOrder(order)
            setShowEditModal(true)
          }}
          onStatusUpdate={handleStatusUpdate}
          onDeleteOrder={(orderId) => deleteOrderMutation.mutate(orderId)}
        />
      </CannabisThemeContainer>

      {/* Cannabis Create Order Modal */}
      {showCreateModal && (
        <CannabisOrderModal
          mode="create"
          customers={customers}
          products={products}
          onClose={() => setShowCreateModal(false)}
          onSubmit={(orderData) => {
            createOrderMutation.mutate(orderData, {
              onSuccess: () => setShowCreateModal(false)
            })
          }}
          isSubmitting={createOrderMutation.isPending}
        />
      )}

      {/* Cannabis Edit Order Modal */}
      {showEditModal && selectedOrder && (
        <CannabisOrderModal
          mode="edit"
          order={selectedOrder}
          customers={customers}
          products={products}
          onClose={() => {
            setShowEditModal(false)
            setSelectedOrder(null)
          }}
          onSubmit={(orderData) => {
            updateOrderMutation.mutate(
              { orderId: selectedOrder.id, orderData },
              {
                onSuccess: () => {
                  setShowEditModal(false)
                  setSelectedOrder(null)
                }
              }
            )
          }}
          isSubmitting={updateOrderMutation.isPending}
        />
      )}

      {/* Cannabis Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <CannabisOrderDetailsModal
          order={selectedOrder}
          onClose={() => {
            setShowOrderDetails(false)
            setSelectedOrder(null)
          }}
          onEdit={() => {
            setShowOrderDetails(false)
            setShowEditModal(true)
          }}
          onStatusUpdate={(newStatus) => handleStatusUpdate(selectedOrder.id, newStatus)}
        />
      )}
    </div>
  )
}

/**
 * Cannabis orders page header
 */
function CannabisOrdersHeader({
  onRefresh,
  onCreateOrder,
  onExport
}: {
  onRefresh: () => void
  onCreateOrder: () => void
  onExport: () => void
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-cultivateco-green flex items-center space-x-2">
          <ShoppingCart className="w-6 h-6" />
          <span>Cannabis Orders</span>
        </h1>
        <p className="text-gray-600">
          Manage cannabis orders, fulfillment, and customer communications
        </p>
      </div>

      <div className="flex items-center space-x-3">
        <CannabisButton
          variant="outline"
          onClick={onRefresh}
          icon={RefreshCw}
        >
          Refresh
        </CannabisButton>

        <CannabisButton
          variant="outline"
          onClick={onExport}
          icon={Download}
        >
          Export
        </CannabisButton>

        <CannabisButton
          variant="primary"
          onClick={onCreateOrder}
          icon={Plus}
        >
          Create Order
        </CannabisButton>
      </div>
    </div>
  )
}

/**
 * Cannabis order metrics cards
 */
function CannabisOrderMetrics({ 
  metrics 
}: { 
  metrics: {
    totalOrders: number
    todayOrders: number
    pendingOrders: number
    totalRevenue: number
    todayRevenue: number
    averageOrderValue: number
    deliveryOrders: number
  }
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-6">
      <CannabisMetricCard
        title="Total Orders"
        value={metrics.totalOrders}
        icon={ShoppingCart}
        color="green"
      />

      <CannabisMetricCard
        title="Today's Orders"
        value={metrics.todayOrders}
        icon={Calendar}
        color="blue"
      />

      <CannabisMetricCard
        title="Pending Orders"
        value={metrics.pendingOrders}
        icon={Clock}
        color={metrics.pendingOrders > 0 ? 'warning' : 'green'}
      />

      <CannabisMetricCard
        title="Total Revenue"
        value={formatCurrency(metrics.totalRevenue)}
        icon={DollarSign}
        color="purple"
      />

      <CannabisMetricCard
        title="Today's Revenue"
        value={formatCurrency(metrics.todayRevenue)}
        icon={TrendingUp}
        color="green"
      />

      <CannabisMetricCard
        title="Average Order"
        value={formatCurrency(metrics.averageOrderValue)}
        icon={Target}
        color="amber"
      />

      <CannabisMetricCard
        title="Delivery Orders"
        value={metrics.deliveryOrders}
        icon={Truck}
        color="info"
      />
    </div>
  )
}

/**
 * Cannabis order filters
 */
function CannabisOrderFilters({
  filters,
  onFilterChange,
  showFilters,
  onToggleFilters,
  customers
}: {
  filters: OrderFilters
  onFilterChange: (key: keyof OrderFilters, value: any) => void
  showFilters: boolean
  onToggleFilters: () => void
  customers: any[]
}) {
  return (
    <CannabisThemeContainer variant="card">
      <div className="space-y-4">
        {/* Search and Filter Toggle */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <CannabisSearchInput
              value={filters.search}
              onChange={(e) => onFilterChange('search', e.target.value)}
              placeholder="Search orders, customers, order numbers..."
              showFilter={true}
              onFilter={onToggleFilters}
            />
          </div>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {Object.entries(ORDER_STATUSES).map(([status, config]) => (
            <button
              key={status}
              onClick={() => onFilterChange('status', filters.status === status ? 'all' : status)}
              className={cn(
                'px-3 py-1 rounded-full text-sm font-medium transition-colors flex items-center space-x-1',
                filters.status === status
                  ? 'bg-cultivateco-green text-cultivateco-cream'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              )}
            >
              <config.icon className="w-3 h-3" />
              <span>{config.label}</span>
            </button>
          ))}
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-4 border-t border-gray-200">
            <CannabisSelect
              label="Order Type"
              value={filters.orderType}
              onChange={(e) => onFilterChange('orderType', e.target.value)}
              options={[
                { value: 'all', label: 'All Types' },
                { value: 'pickup', label: 'Pickup' },
                { value: 'delivery', label: 'Delivery' },
                { value: 'in-store', label: 'In-Store' }
              ]}
            />

            <CannabisSelect
              label="Priority"
              value={filters.priority}
              onChange={(e) => onFilterChange('priority', e.target.value)}
              options={[
                { value: 'all', label: 'All Priorities' },
                ...Object.entries(ORDER_PRIORITIES).map(([key, priority]) => ({
                  value: key,
                  label: priority.label
                }))
              ]}
            />

            <CannabisSelect
              label="Payment Method"
              value={filters.paymentMethod}
              onChange={(e) => onFilterChange('paymentMethod', e.target.value)}
              options={[
                { value: 'all', label: 'All Methods' },
                { value: 'cash', label: 'Cash' },
                { value: 'debit', label: 'Debit Card' },
                { value: 'credit', label: 'Credit Card' },
                { value: 'bank-transfer', label: 'Bank Transfer' }
              ]}
            />

            <CannabisSelect
              label="Customer"
              value={filters.customerId}
              onChange={(e) => onFilterChange('customerId', e.target.value)}
              options={[
                { value: 'all', label: 'All Customers' },
                ...customers.map(customer => ({
                  value: customer.id,
                  label: customer.name
                }))
              ]}
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Date Range</label>
              <div className="grid grid-cols-2 gap-2">
                <CannabisInput
                  type="date"
                  value={filters.dateRange.start}
                  onChange={(e) => onFilterChange('dateRange', { ...filters.dateRange, start: e.target.value })}
                  placeholder="Start date"
                />
                <CannabisInput
                  type="date"
                  value={filters.dateRange.end}
                  onChange={(e) => onFilterChange('dateRange', { ...filters.dateRange, end: e.target.value })}
                  placeholder="End date"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </CannabisThemeContainer>
  )
}

/**
 * Cannabis order bulk actions bar
 */
function CannabisOrderBulkActions({
  selectedCount,
  onBulkAction,
  onClearSelection
}: {
  selectedCount: number
  onBulkAction: (action: 'confirm' | 'prepare' | 'ready' | 'cancel' | 'archive') => void
  onClearSelection: () => void
}) {
  return (
    <CannabisThemeContainer variant="card">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-900">
            {selectedCount} order{selectedCount !== 1 ? 's' : ''} selected
          </span>
          
          <div className="flex space-x-2">
            <CannabisButton
              variant="outline"
              size="sm"
              onClick={() => onBulkAction('confirm')}
            >
              Confirm
            </CannabisButton>
            
            <CannabisButton
              variant="outline"
              size="sm"
              onClick={() => onBulkAction('prepare')}
            >
              Start Preparing
            </CannabisButton>
            
            <CannabisButton
              variant="outline"
              size="sm"
              onClick={() => onBulkAction('ready')}
            >
              Mark Ready
            </CannabisButton>
            
            <CannabisButton
              variant="outline"
              size="sm"
              onClick={() => onBulkAction('cancel')}
              className="text-red-600 border-red-300 hover:bg-red-50"
            >
              Cancel
            </CannabisButton>
          </div>
        </div>
        
        <CannabisButton
          variant="ghost"
          size="sm"
          onClick={onClearSelection}
          icon={X}
        >
          Clear Selection
        </CannabisButton>
      </div>
    </CannabisThemeContainer>
  )
}

/**
 * Cannabis orders table
 */
function CannabisOrdersTable({
  orders,
  selectedOrders,
  sortField,
  sortDirection,
  onSort,
  onSelectOrder,
  onSelectAll,
  onViewOrder,
  onEditOrder,
  onStatusUpdate,
  onDeleteOrder
}: {
  orders: CannabisOrder[]
  selectedOrders: Set<string>
  sortField: OrderSortField
  sortDirection: OrderSortDirection
  onSort: (field: OrderSortField) => void
  onSelectOrder: (orderId: string) => void
  onSelectAll: () => void
  onViewOrder: (order: CannabisOrder) => void
  onEditOrder: (order: CannabisOrder) => void
  onStatusUpdate: (orderId: string, status: string) => void
  onDeleteOrder: (orderId: string) => void
}) {
  const SortIcon = sortDirection === 'asc' ? TrendingUp : TrendingDown

  const renderSortHeader = (field: OrderSortField, label: string) => (
    <button
      onClick={() => onSort(field)}
      className="flex items-center space-x-1 text-left font-medium text-gray-700 hover:text-cultivateco-green"
    >
      <span>{label}</span>
      {sortField === field && <SortIcon className="w-4 h-4" />}
    </button>
  )

  if (orders.length === 0) {
    return (
      <CannabisEmptyState
        icon={ShoppingCart}
        title="No Cannabis Orders Found"
        description="No cannabis orders match your current filters. Try adjusting your search criteria or create a new order."
        action={{
          label: 'Create Cannabis Order',
          onClick: () => console.log('Create order')
        }}
      />
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-4 py-3 text-left">
              <input
                type="checkbox"
                checked={selectedOrders.size === orders.length && orders.length > 0}
                onChange={onSelectAll}
                className="rounded border-gray-300 text-cultivateco-green focus:ring-cultivateco-green"
              />
            </th>
            <th className="px-4 py-3 text-left">
              {renderSortHeader('orderNumber', 'Order')}
            </th>
            <th className="px-4 py-3 text-left">
              {renderSortHeader('customer', 'Customer')}
            </th>
            <th className="px-4 py-3 text-left">Items</th>
            <th className="px-4 py-3 text-left">
              {renderSortHeader('totalAmount', 'Total')}
            </th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Type</th>
            <th className="px-4 py-3 text-left">
              {renderSortHeader('createdAt', 'Created')}
            </th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>
        
        <tbody className="divide-y divide-gray-200">
          {orders.map((order: CannabisOrder) => (
            <CannabisOrderRow
              key={order.id}
              order={order}
              isSelected={selectedOrders.has(order.id)}
              onSelect={() => onSelectOrder(order.id)}
              onView={() => onViewOrder(order)}
              onEdit={() => onEditOrder(order)}
              onStatusUpdate={onStatusUpdate}
              onDelete={() => onDeleteOrder(order.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

/**
 * Cannabis order table row
 */
function CannabisOrderRow({
  order,
  isSelected,
  onSelect,
  onView,
  onEdit,
  onStatusUpdate,
  onDelete
}: {
  order: CannabisOrder
  isSelected: boolean
  onSelect: () => void
  onView: () => void
  onEdit: () => void
  onStatusUpdate: (orderId: string, status: string) => void
  onDelete: () => void
}) {
  const statusConfig = ORDER_STATUSES[order.status as keyof typeof ORDER_STATUSES]
  const StatusIcon = statusConfig.icon

  const getOrderTypeIcon = (type: string) => {
    switch (type) {
      case 'delivery': return Truck
      case 'pickup': return Package
      case 'in-store': return ShoppingCart
      default: return ShoppingCart
    }
  }

  const OrderTypeIcon = getOrderTypeIcon(order.orderType)

  const getNextStatusOptions = (currentStatus: string) => {
    const workflow = {
      'pending': ['confirmed', 'cancelled'],
      'confirmed': ['preparing', 'cancelled'],
      'preparing': ['ready', 'cancelled'],
      'ready': ['out-for-delivery', 'delivered', 'cancelled'],
      'out-for-delivery': ['delivered', 'cancelled'],
      'delivered': ['refunded'],
      'cancelled': [],
      'refunded': []
    }
    return workflow[currentStatus as keyof typeof workflow] || []
  }

  const nextStatusOptions = getNextStatusOptions(order.status)

  return (
    <tr className={cn(
      'hover:bg-gray-50 transition-colors',
      isSelected && 'bg-cultivateco-green/5'
    )}>
      <td className="px-4 py-3">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
          className="rounded border-gray-300 text-cultivateco-green focus:ring-cultivateco-green"
        />
      </td>
      
      <td className="px-4 py-3">
        <div className="space-y-1">
          <div className="font-medium text-cultivateco-green">
            <CannabisCopyToClipboard text={order.orderNumber}>
              {order.orderNumber}
            </CannabisCopyToClipboard>
          </div>
          {order.priority !== 'normal' && (
            <CannabisBadge 
              variant={ORDER_PRIORITIES[order.priority as keyof typeof ORDER_PRIORITIES].color as any} 
              size="sm"
            >
              {ORDER_PRIORITIES[order.priority as keyof typeof ORDER_PRIORITIES].label}
            </CannabisBadge>
          )}
        </div>
      </td>
      
      <td className="px-4 py-3">
        <div className="space-y-1">
          <div className="font-medium text-gray-900">{order.customer.name}</div>
          <div className="text-sm text-gray-600">{order.customer.email}</div>
          {order.customer.loyaltyPoints > 0 && (
            <div className="flex items-center space-x-1 text-xs text-cultivateco-green">
              <Star className="w-3 h-3" />
              <span>{order.customer.loyaltyPoints} pts</span>
            </div>
          )}
        </div>
      </td>
      
      <td className="px-4 py-3">
        <div className="space-y-1">
          <div className="text-sm font-medium">
            {order.items.length} item{order.items.length !== 1 ? 's' : ''}
          </div>
          <div className="text-xs text-gray-600">
            {order.items.slice(0, 2).map(item => item.product.name).join(', ')}
            {order.items.length > 2 && ` +${order.items.length - 2} more`}
          </div>
        </div>
      </td>
      
      <td className="px-4 py-3">
        <div className="space-y-1">
          <div className="font-semibold text-cultivateco-green">
            {formatCurrency(order.totalAmount)}
          </div>
          <div className="text-xs text-gray-600 capitalize">
            {order.paymentMethod.replace('-', ' ')}
          </div>
        </div>
      </td>
      
      <td className="px-4 py-3">
        <div className="flex items-center space-x-2">
          <CannabisBadge variant={statusConfig.color as any} size="sm">
            <StatusIcon className="w-3 h-3 mr-1" />
            {statusConfig.label}
          </CannabisBadge>
          
          {nextStatusOptions.length > 0 && (
            <select
              onChange={(e) => onStatusUpdate(order.id, e.target.value)}
              className="text-xs border border-gray-300 rounded px-2 py-1"
              defaultValue=""
            >
              <option value="" disabled>Update...</option>
              {nextStatusOptions.map(status => (
                <option key={status} value={status}>
                  {ORDER_STATUSES[status as keyof typeof ORDER_STATUSES].label}
                </option>
              ))}
            </select>
          )}
        </div>
      </td>
      
      <td className="px-4 py-3">
        <div className="flex items-center space-x-1 text-sm text-gray-600">
          <OrderTypeIcon className="w-4 h-4" />
          <span className="capitalize">{order.orderType.replace('-', ' ')}</span>
        </div>
      </td>
      
      <td className="px-4 py-3">
        <div className="space-y-1">
          <div className="text-sm">{formatDate(order.createdAt)}</div>
          {order.estimatedDelivery && (
            <div className="text-xs text-gray-600">
              Est: {formatDate(order.estimatedDelivery)}
            </div>
          )}
        </div>
      </td>
      
      <td className="px-4 py-3">
        <div className="flex items-center space-x-2">
          <button
            onClick={onView}
            className="text-cultivateco-blue hover:text-cultivateco-green"
            title="View cannabis order details"
          >
            <Eye className="w-4 h-4" />
          </button>
          
          <button
            onClick={onEdit}
            className="text-cultivateco-blue hover:text-cultivateco-green"
            title="Edit cannabis order"
          >
            <Edit className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => console.log('Print order', order.id)}
            className="text-cultivateco-blue hover:text-cultivateco-green"
            title="Print cannabis order"
          >
            <Printer className="w-4 h-4" />
          </button>
          
          <button
            onClick={onDelete}
            className="text-gray-400 hover:text-red-600"
            title="Delete cannabis order"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  )
}

/**
 * Cannabis order modal - simplified for space
 */
function CannabisOrderModal({
  mode,
  order,
  customers,
  products,
  onClose,
  onSubmit,
  isSubmitting
}: {
  mode: 'create' | 'edit'
  order?: CannabisOrder
  customers: any[]
  products: any[]
  onClose: () => void
  onSubmit: (data: any) => void
  isSubmitting: boolean
}) {
  const [formData, setFormData] = useState({
    customerId: order?.customerId || '',
    orderType: order?.orderType || 'pickup',
    priority: order?.priority || 'normal',
    paymentMethod: order?.paymentMethod || 'cash',
    items: order?.items || [],
    customerNotes: order?.customerNotes || '',
    internalNotes: order?.internalNotes || ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-cultivateco-green">
              {mode === 'create' ? 'Create Cannabis Order' : 'Edit Cannabis Order'}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CannabisSelect
              label="Customer"
              value={formData.customerId}
              onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
              options={[
                { value: '', label: 'Select Customer' },
                ...customers.map(customer => ({
                  value: customer.id,
                  label: `${customer.name} (${customer.email})`
                }))
              ]}
              required
            />

            <CannabisSelect
              label="Order Type"
              value={formData.orderType}
              onChange={(e) => setFormData({ ...formData, orderType: e.target.value })}
              options={[
                { value: 'pickup', label: 'Pickup' },
                { value: 'delivery', label: 'Delivery' },
                { value: 'in-store', label: 'In-Store' }
              ]}
              required
            />

            <CannabisSelect
              label="Priority"
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              options={Object.entries(ORDER_PRIORITIES).map(([key, priority]) => ({
                value: key,
                label: priority.label
              }))}
              required
            />

            <CannabisSelect
              label="Payment Method"
              value={formData.paymentMethod}
              onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
              options={[
                { value: 'cash', label: 'Cash' },
                { value: 'debit', label: 'Debit Card' },
                { value: 'credit', label: 'Credit Card' },
                { value: 'bank-transfer', label: 'Bank Transfer' }
              ]}
              required
            />
          </div>

          <CannabisTextArea
            label="Customer Notes"
            value={formData.customerNotes}
            onChange={(e) => setFormData({ ...formData, customerNotes: e.target.value })}
            placeholder="Customer instructions or special requests..."
            rows={3}
          />

          <CannabisTextArea
            label="Internal Notes"
            value={formData.internalNotes}
            onChange={(e) => setFormData({ ...formData, internalNotes: e.target.value })}
            placeholder="Internal staff notes..."
            rows={3}
          />

          <div className="flex space-x-4">
            <CannabisButton
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1"
            >
              Cancel
            </CannabisButton>
            
            <CannabisButton
              type="submit"
              variant="primary"
              loading={isSubmitting}
              icon={Save}
              className="flex-1"
            >
              {mode === 'create' ? 'Create Order' : 'Save Changes'}
            </CannabisButton>
          </div>
        </form>
      </div>
    </div>
  )
}

/**
 * Cannabis order details modal - simplified
 */
function CannabisOrderDetailsModal({
  order,
  onClose,
  onEdit,
  onStatusUpdate
}: {
  order: CannabisOrder
  onClose: () => void
  onEdit: () => void
  onStatusUpdate: (status: string) => void
}) {
  const statusConfig = ORDER_STATUSES[order.status as keyof typeof ORDER_STATUSES]
  const StatusIcon = statusConfig.icon

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h2 className="text-lg font-semibold text-cultivateco-green">
                Order {order.orderNumber}
              </h2>
              <CannabisBadge variant={statusConfig.color as any}>
                <StatusIcon className="w-3 h-3 mr-1" />
                {statusConfig.label}
              </CannabisBadge>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Customer Information */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Customer Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span>{order.customer.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span>{order.customer.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>{order.customer.phone}</span>
                </div>
                {order.customer.loyaltyPoints > 0 && (
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-cultivateco-green" />
                    <span>{order.customer.loyaltyPoints} loyalty points</span>
                  </div>
                )}
              </div>
            </div>

            {/* Order Information */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Order Information</h3>
              <div className="space-y-2 text-sm">
                <div><span className="text-gray-600">Type:</span> <span className="ml-2 capitalize">{order.orderType.replace('-', ' ')}</span></div>
                <div><span className="text-gray-600">Priority:</span> <span className="ml-2 capitalize">{order.priority}</span></div>
                <div><span className="text-gray-600">Payment:</span> <span className="ml-2 capitalize">{order.paymentMethod.replace('-', ' ')}</span></div>
                <div><span className="text-gray-600">Created:</span> <span className="ml-2">{formatDate(order.createdAt)}</span></div>
                {order.estimatedDelivery && (
                  <div><span className="text-gray-600">Est. Delivery:</span> <span className="ml-2">{formatDate(order.estimatedDelivery)}</span></div>
                )}
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Order Items</h3>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Product</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Quantity</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Price</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {order.items.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2">
                        <div className="space-y-1">
                          <div className="font-medium">{item.product.name}</div>
                          <div className="text-sm text-gray-600">{item.product.brand}</div>
                          {(item.product.thcPercentage || item.product.cbdPercentage) && (
                            <div className="text-xs text-cultivateco-green">
                              {item.product.thcPercentage && `${item.product.thcPercentage}% THC`}
                              {item.product.thcPercentage && item.product.cbdPercentage && ' • '}
                              {item.product.cbdPercentage && `${item.product.cbdPercentage}% CBD`}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        {formatCannabisWeight(item.quantity, item.product.unit)}
                      </td>
                      <td className="px-4 py-2">
                        {formatCurrency(item.unitPrice)}
                      </td>
                      <td className="px-4 py-2 font-medium">
                        {formatCurrency(item.totalPrice)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="space-y-2">
              <div className="flex justify-between"><span>Subtotal:</span> <span>{formatCurrency(order.subtotal)}</span></div>
              {order.discountTotal > 0 && (
                <div className="flex justify-between text-green-600"><span>Discount:</span> <span>-{formatCurrency(order.discountTotal)}</span></div>
              )}
              <div className="flex justify-between"><span>Tax:</span> <span>{formatCurrency(order.taxAmount)}</span></div>
              {order.deliveryFee > 0 && (
                <div className="flex justify-between"><span>Delivery:</span> <span>{formatCurrency(order.deliveryFee)}</span></div>
              )}
              <div className="flex justify-between font-semibold text-lg border-t pt-2">
                <span>Total:</span> 
                <span className="text-cultivateco-green">{formatCurrency(order.totalAmount)}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {(order.customerNotes || order.internalNotes) && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {order.customerNotes && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Customer Notes</h3>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{order.customerNotes}</p>
                </div>
              )}
              {order.internalNotes && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Internal Notes</h3>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{order.internalNotes}</p>
                </div>
              )}
            </div>
          )}

          <div className="flex space-x-4">
            <CannabisButton
              onClick={onEdit}
              variant="primary"
              icon={Edit}
              className="flex-1"
            >
              Edit Order
            </CannabisButton>
            
            <CannabisButton
              onClick={() => console.log('Print order')}
              variant="outline"
              icon={Printer}
              className="flex-1"
            >
              Print Order
            </CannabisButton>
          </div>
        </div>
      </div>
    </div>
  )
}
