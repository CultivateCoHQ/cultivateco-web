'use client'

import { useState, useMemo } from 'react'
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Download, 
  Upload, 
  Calendar, 
  CreditCard, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Phone, 
  Mail, 
  MapPin, 
  IdCard, 
  Activity,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  X,
  Plus,
  FileText,
  Star,
  Gift,
  Percent
} from 'lucide-react'
import {
  useCannabisCustomers,
  useCannabisCustomer,
  useCannabisCreateCustomer,
  useCannabisVerifyCustomer,
  useCannabisCustomerPurchaseHistory,
  useCannabisDashboardAnalytics
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
  CannabisCollapsible,
  CannabisEmptyState,
  CannabisCopyToClipboard
} from '@/components/ui/cannabis-components'
import { CannabisThemeContainer, CannabisStatusIndicator } from '@/providers/theme-provider'
import { formatCurrency, formatDate, calculateAge, isValidEmail, isValidPhone, cn } from '@/lib/utils'

/**
 * =============================================================================
 * CultivateCo Cannabis Customer Management Page
 * =============================================================================
 * Comprehensive customer tracking with compliance monitoring and purchase limits
 */

interface CannabisCustomer {
  id: string
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  dateOfBirth: string
  age: number
  customerType: 'adult-use' | 'medical' | 'dual'
  totalPurchases: number
  totalSpent: number
  lastVisit?: string
  createdAt: string
  status: 'active' | 'suspended' | 'banned'
  loyaltyPoints: number
  identification: {
    type: string
    number: string
    issuingState: string
    expirationDate: string
    verified: boolean
  }
  medicalCard?: {
    number: string
    expirationDate: string
    issuingState: string
    verified: boolean
  }
  purchaseLimits: {
    daily: { current: number; limit: number }
    monthly: { current: number; limit: number }
  }
  compliance: {
    status: 'compliant' | 'warning' | 'violation'
    lastCheck: string
    issues: string[]
  }
}

interface CustomerMetrics {
  totalCustomers: number
  activeCustomers: number
  newCustomersThisMonth: number
  averageSpend: number
  medicalCardHolders: number
  complianceIssues: number
}

type CustomerSortField = 'name' | 'totalSpent' | 'lastVisit' | 'createdAt' | 'age'
type CustomerSortDirection = 'asc' | 'desc'

export default function CannabisCustomersPage() {
  // Cannabis customer state
  const [searchQuery, setSearchQuery] = useState('')
  const [customerTypeFilter, setCustomerTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [complianceFilter, setComplianceFilter] = useState('all')
  const [sortField, setSortField] = useState<CustomerSortField>('name')
  const [sortDirection, setSortDirection] = useState<CustomerSortDirection>('asc')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCustomers, setSelectedCustomers] = useState<Set<string>>(new Set())
  const [showAddModal, setShowAddModal] = useState(false)
  const [showVerifyModal, setShowVerifyModal] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<CannabisCustomer | null>(null)
  const [showCustomerDetails, setShowCustomerDetails] = useState(false)

  // Cannabis API hooks
  const { 
    data: customersResponse, 
    isLoading: customersLoading, 
    error: customersError,
    refetch: refetchCustomers 
  } = useCannabisCustomers({
    page: 1,
    limit: 100,
    search: searchQuery || undefined,
    type: customerTypeFilter !== 'all' ? customerTypeFilter : undefined
  })

  const { 
    data: analyticsData 
  } = useCannabisDashboardAnalytics('30d')

  const createCustomerMutation = useCannabisCreateCustomer()
  const verifyCustomerMutation = useCannabisVerifyCustomer()

  // Cannabis customer data processing
  const customers = customersResponse?.data || []

  // Cannabis customer filtering and sorting
  const filteredAndSortedCustomers = useMemo(() => {
    let filtered = customers.filter((customer: CannabisCustomer) => {
      const fullName = `${customer.firstName || ''} ${customer.lastName || ''}`.trim()
      const matchesSearch = !searchQuery || 
        fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.phone?.includes(searchQuery) ||
        customer.identification.number.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesType = customerTypeFilter === 'all' || customer.customerType === customerTypeFilter
      const matchesStatus = statusFilter === 'all' || customer.status === statusFilter
      const matchesCompliance = complianceFilter === 'all' || customer.compliance.status === complianceFilter

      return matchesSearch && matchesType && matchesStatus && matchesCompliance
    })

    // Cannabis customer sorting
    filtered.sort((a: CannabisCustomer, b: CannabisCustomer) => {
      let aVal, bVal

      switch (sortField) {
        case 'name':
          aVal = `${a.firstName || ''} ${a.lastName || ''}`.trim()
          bVal = `${b.firstName || ''} ${b.lastName || ''}`.trim()
          break
        case 'totalSpent':
          aVal = a.totalSpent
          bVal = b.totalSpent
          break
        case 'lastVisit':
          aVal = new Date(a.lastVisit || '').getTime()
          bVal = new Date(b.lastVisit || '').getTime()
          break
        case 'createdAt':
          aVal = new Date(a.createdAt).getTime()
          bVal = new Date(b.createdAt).getTime()
          break
        case 'age':
          aVal = a.age
          bVal = b.age
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
  }, [customers, searchQuery, customerTypeFilter, statusFilter, complianceFilter, sortField, sortDirection])

  // Cannabis customer metrics
  const customerMetrics = useMemo((): CustomerMetrics => {
    const totalCustomers = customers.length
    const activeCustomers = customers.filter((c: CannabisCustomer) => c.status === 'active').length
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    const newCustomersThisMonth = customers.filter((c: CannabisCustomer) => 
      new Date(c.createdAt) >= thirtyDaysAgo
    ).length
    const averageSpend = totalCustomers > 0 
      ? customers.reduce((sum: number, c: CannabisCustomer) => sum + c.totalSpent, 0) / totalCustomers 
      : 0
    const medicalCardHolders = customers.filter((c: CannabisCustomer) => c.medicalCard?.verified).length
    const complianceIssues = customers.filter((c: CannabisCustomer) => 
      c.compliance.status === 'violation' || c.compliance.status === 'warning'
    ).length

    return {
      totalCustomers,
      activeCustomers,
      newCustomersThisMonth,
      averageSpend,
      medicalCardHolders,
      complianceIssues
    }
  }, [customers])

  /**
   * Handle cannabis customer operations
   */
  const handleSort = (field: CustomerSortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const handleSelectCustomer = (customerId: string) => {
    const newSelected = new Set(selectedCustomers)
    if (newSelected.has(customerId)) {
      newSelected.delete(customerId)
    } else {
      newSelected.add(customerId)
    }
    setSelectedCustomers(newSelected)
  }

  const handleSelectAll = () => {
    if (selectedCustomers.size === filteredAndSortedCustomers.length) {
      setSelectedCustomers(new Set())
    } else {
      setSelectedCustomers(new Set(filteredAndSortedCustomers.map((customer: CannabisCustomer) => customer.id)))
    }
  }

  if (customersLoading) {
    return (
      <div className="space-y-6">
        <CannabisCustomersHeader 
          onRefresh={() => {}} 
          onAddCustomer={() => {}} 
          onVerifyCustomer={() => {}}
        />
        <CannabisLoadingSpinner size="lg" text="Loading cannabis customers..." />
      </div>
    )
  }

  if (customersError) {
    return (
      <div className="space-y-6">
        <CannabisCustomersHeader 
          onRefresh={refetchCustomers} 
          onAddCustomer={() => setShowAddModal(true)} 
          onVerifyCustomer={() => setShowVerifyModal(true)}
        />
        <CannabisAlert
          type="error"
          title="Cannabis Customer Error"
          message="Failed to load cannabis customers. Please try again."
          action={{ label: 'Retry', onClick: refetchCustomers }}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Cannabis Customers Header */}
      <CannabisCustomersHeader 
        onRefresh={refetchCustomers} 
        onAddCustomer={() => setShowAddModal(true)} 
        onVerifyCustomer={() => setShowVerifyModal(true)}
      />

      {/* Cannabis Customer Metrics */}
      <CannabisCustomerMetrics metrics={customerMetrics} />

      {/* Cannabis Customer Filters */}
      <CannabisCustomerFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        customerTypeFilter={customerTypeFilter}
        onCustomerTypeChange={setCustomerTypeFilter}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        complianceFilter={complianceFilter}
        onComplianceChange={setComplianceFilter}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
      />

      {/* Cannabis Customers Table */}
      <CannabisThemeContainer variant="card">
        <CannabisCustomersTable
          customers={filteredAndSortedCustomers}
          selectedCustomers={selectedCustomers}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
          onSelectCustomer={handleSelectCustomer}
          onSelectAll={handleSelectAll}
          onViewCustomer={(customer) => {
            setSelectedCustomer(customer)
            setShowCustomerDetails(true)
          }}
          onEditCustomer={setSelectedCustomer}
        />
      </CannabisThemeContainer>

      {/* Cannabis Add Customer Modal */}
      {showAddModal && (
        <CannabisAddCustomerModal
          onClose={() => setShowAddModal(false)}
          onSubmit={(customerData) => {
            createCustomerMutation.mutate(customerData, {
              onSuccess: () => setShowAddModal(false)
            })
          }}
          isSubmitting={createCustomerMutation.isPending}
        />
      )}

      {/* Cannabis Verify Customer Modal */}
      {showVerifyModal && (
        <CannabisVerifyCustomerModal
          onClose={() => setShowVerifyModal(false)}
          onSubmit={(verificationData) => {
            verifyCustomerMutation.mutate(verificationData, {
              onSuccess: () => setShowVerifyModal(false)
            })
          }}
          isSubmitting={verifyCustomerMutation.isPending}
        />
      )}

      {/* Cannabis Customer Details Modal */}
      {showCustomerDetails && selectedCustomer && (
        <CannabisCustomerDetailsModal
          customer={selectedCustomer}
          onClose={() => {
            setShowCustomerDetails(false)
            setSelectedCustomer(null)
          }}
        />
      )}
    </div>
  )
}

/**
 * Cannabis customers page header
 */
function CannabisCustomersHeader({
  onRefresh,
  onAddCustomer,
  onVerifyCustomer
}: {
  onRefresh: () => void
  onAddCustomer: () => void
  onVerifyCustomer: () => void
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-cultivateco-green flex items-center space-x-2">
          <Users className="w-6 h-6" />
          <span>Cannabis Customers</span>
        </h1>
        <p className="text-gray-600">
          Manage customer profiles, track purchases, and ensure cannabis compliance
        </p>
      </div>

      <div className="flex items-center space-x-3">
        <CannabisButton
          variant="outline"
          onClick={onRefresh}
          icon={Activity}
        >
          Refresh
        </CannabisButton>

        <CannabisButton
          variant="outline"
          onClick={onVerifyCustomer}
          icon={Shield}
        >
          Quick Verify
        </CannabisButton>

        <CannabisButton
          variant="primary"
          onClick={onAddCustomer}
          icon={UserPlus}
        >
          Add Customer
        </CannabisButton>
      </div>
    </div>
  )
}

/**
 * Cannabis customer metrics cards
 */
function CannabisCustomerMetrics({ 
  metrics 
}: { 
  metrics: CustomerMetrics 
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      <CannabisMetricCard
        title="Total Cannabis Customers"
        value={metrics.totalCustomers}
        icon={Users}
        color="green"
      />

      <CannabisMetricCard
        title="Active Customers"
        value={metrics.activeCustomers}
        icon={CheckCircle}
        color="blue"
      />

      <CannabisMetricCard
        title="New This Month"
        value={metrics.newCustomersThisMonth}
        icon={TrendingUp}
        color="purple"
      />

      <CannabisMetricCard
        title="Average Spend"
        value={formatCurrency(metrics.averageSpend)}
        icon={DollarSign}
        color="green"
      />

      <CannabisMetricCard
        title="Medical Card Holders"
        value={metrics.medicalCardHolders}
        icon={Shield}
        color="blue"
      />

      <CannabisMetricCard
        title="Compliance Issues"
        value={metrics.complianceIssues}
        icon={AlertTriangle}
        color={metrics.complianceIssues > 0 ? 'red' : 'green'}
      />
    </div>
  )
}

/**
 * Cannabis customer filters
 */
function CannabisCustomerFilters({
  searchQuery,
  onSearchChange,
  customerTypeFilter,
  onCustomerTypeChange,
  statusFilter,
  onStatusChange,
  complianceFilter,
  onComplianceChange,
  showFilters,
  onToggleFilters
}: {
  searchQuery: string
  onSearchChange: (query: string) => void
  customerTypeFilter: string
  onCustomerTypeChange: (type: string) => void
  statusFilter: string
  onStatusChange: (status: string) => void
  complianceFilter: string
  onComplianceChange: (compliance: string) => void
  showFilters: boolean
  onToggleFilters: () => void
}) {
  return (
    <CannabisThemeContainer variant="card">
      <div className="space-y-4">
        {/* Search and Filter Toggle */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <CannabisSearchInput
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search cannabis customers by name, email, phone, or ID..."
              showFilter={true}
              onFilter={onToggleFilters}
            />
          </div>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
            <CannabisSelect
              label="Customer Type"
              value={customerTypeFilter}
              onChange={(e) => onCustomerTypeChange(e.target.value)}
              options={[
                { value: 'all', label: 'All Customer Types' },
                { value: 'adult-use', label: 'Adult-Use Only' },
                { value: 'medical', label: 'Medical Only' },
                { value: 'dual', label: 'Dual (Adult-Use + Medical)' }
              ]}
            />

            <CannabisSelect
              label="Account Status"
              value={statusFilter}
              onChange={(e) => onStatusChange(e.target.value)}
              options={[
                { value: 'all', label: 'All Statuses' },
                { value: 'active', label: 'Active' },
                { value: 'suspended', label: 'Suspended' },
                { value: 'banned', label: 'Banned' }
              ]}
            />

            <CannabisSelect
              label="Compliance Status"
              value={complianceFilter}
              onChange={(e) => onComplianceChange(e.target.value)}
              options={[
                { value: 'all', label: 'All Compliance' },
                { value: 'compliant', label: 'Compliant' },
                { value: 'warning', label: 'Warning' },
                { value: 'violation', label: 'Violation' }
              ]}
            />
          </div>
        )}
      </div>
    </CannabisThemeContainer>
  )
}

/**
 * Cannabis customers table
 */
function CannabisCustomersTable({
  customers,
  selectedCustomers,
  sortField,
  sortDirection,
  onSort,
  onSelectCustomer,
  onSelectAll,
  onViewCustomer,
  onEditCustomer
}: {
  customers: CannabisCustomer[]
  selectedCustomers: Set<string>
  sortField: CustomerSortField
  sortDirection: CustomerSortDirection
  onSort: (field: CustomerSortField) => void
  onSelectCustomer: (customerId: string) => void
  onSelectAll: () => void
  onViewCustomer: (customer: CannabisCustomer) => void
  onEditCustomer: (customer: CannabisCustomer) => void
}) {
  const SortIcon = sortDirection === 'asc' ? SortAsc : SortDesc

  const renderSortHeader = (field: CustomerSortField, label: string) => (
    <button
      onClick={() => onSort(field)}
      className="flex items-center space-x-1 text-left font-medium text-gray-700 hover:text-cultivateco-green"
    >
      <span>{label}</span>
      {sortField === field && <SortIcon className="w-4 h-4" />}
    </button>
  )

  if (customers.length === 0) {
    return (
      <CannabisEmptyState
        icon={Users}
        title="No Cannabis Customers Found"
        description="No cannabis customers match your current filters. Try adjusting your search criteria or add a new customer."
        action={{
          label: 'Add Cannabis Customer',
          onClick: () => console.log('Open add customer modal')
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
                checked={selectedCustomers.size === customers.length && customers.length > 0}
                onChange={onSelectAll}
                className="rounded border-gray-300 text-cultivateco-green focus:ring-cultivateco-green"
              />
            </th>
            <th className="px-4 py-3 text-left">
              {renderSortHeader('name', 'Cannabis Customer')}
            </th>
            <th className="px-4 py-3 text-left">Contact</th>
            <th className="px-4 py-3 text-left">
              {renderSortHeader('age', 'Age')}
            </th>
            <th className="px-4 py-3 text-left">Type</th>
            <th className="px-4 py-3 text-left">
              {renderSortHeader('totalSpent', 'Total Spent')}
            </th>
            <th className="px-4 py-3 text-left">
              {renderSortHeader('lastVisit', 'Last Visit')}
            </th>
            <th className="px-4 py-3 text-left">Compliance</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>
        
        <tbody className="divide-y divide-gray-200">
          {customers.map((customer: CannabisCustomer) => (
            <CannabisCustomerRow
              key={customer.id}
              customer={customer}
              isSelected={selectedCustomers.has(customer.id)}
              onSelect={() => onSelectCustomer(customer.id)}
              onView={() => onViewCustomer(customer)}
              onEdit={() => onEditCustomer(customer)}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

/**
 * Cannabis customer table row
 */
function CannabisCustomerRow({
  customer,
  isSelected,
  onSelect,
  onView,
  onEdit
}: {
  customer: CannabisCustomer
  isSelected: boolean
  onSelect: () => void
  onView: () => void
  onEdit: () => void
}) {
  const fullName = `${customer.firstName || ''} ${customer.lastName || ''}`.trim() || 'Anonymous Customer'
  
  const getCustomerTypeIcon = (type: string) => {
    switch (type) {
      case 'medical': return Shield
      case 'dual': return Star
      default: return Users
    }
  }

  const getComplianceColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'compliant'
      case 'warning': return 'warning'
      case 'violation': return 'violation'
      default: return 'info'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success'
      case 'suspended': return 'warning'
      case 'banned': return 'danger'
      default: return 'info'
    }
  }

  const CustomerTypeIcon = getCustomerTypeIcon(customer.customerType)

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
          <div className="font-medium text-gray-900">{fullName}</div>
          <div className="text-sm text-gray-500">
            Customer since {formatDate(customer.createdAt)}
          </div>
          {customer.loyaltyPoints > 0 && (
            <div className="flex items-center space-x-1 text-sm text-cultivateco-green">
              <Gift className="w-3 h-3" />
              <span>{customer.loyaltyPoints} points</span>
            </div>
          )}
        </div>
      </td>
      
      <td className="px-4 py-3">
        <div className="space-y-1">
          {customer.email && (
            <div className="flex items-center space-x-2 text-sm">
              <Mail className="w-4 h-4 text-gray-400" />
              <span>{customer.email}</span>
            </div>
          )}
          {customer.phone && (
            <div className="flex items-center space-x-2 text-sm">
              <Phone className="w-4 h-4 text-gray-400" />
              <span>{customer.phone}</span>
            </div>
          )}
        </div>
      </td>
      
      <td className="px-4 py-3">
        <div className="text-sm">
          <div className="font-medium">{customer.age} years</div>
          <div className="text-gray-500">Born {formatDate(customer.dateOfBirth)}</div>
        </div>
      </td>
      
      <td className="px-4 py-3">
        <div className="flex items-center space-x-2">
          <CustomerTypeIcon className="w-4 h-4 text-cultivateco-green" />
          <span className="text-sm capitalize">{customer.customerType.replace('-', ' ')}</span>
          {customer.medicalCard?.verified && (
            <CannabisBadge variant="success" size="sm">
              Medical
            </CannabisBadge>
          )}
        </div>
      </td>
      
      <td className="px-4 py-3">
        <div className="space-y-1">
          <div className="font-medium">{formatCurrency(customer.totalSpent)}</div>
          <div className="text-sm text-gray-500">{customer.totalPurchases} purchases</div>
        </div>
      </td>
      
      <td className="px-4 py-3">
        {customer.lastVisit ? (
          <div className="text-sm">
            <div>{formatDate(customer.lastVisit)}</div>
            <div className="text-gray-500">
              {Math.floor((Date.now() - new Date(customer.lastVisit).getTime()) / (1000 * 60 * 60 * 24))} days ago
            </div>
          </div>
        ) : (
          <span className="text-sm text-gray-400">Never visited</span>
        )}
      </td>
      
      <td className="px-4 py-3">
        <div className="space-y-1">
          <CannabisBadge variant={getComplianceColor(customer.compliance.status)} size="sm">
            {customer.compliance.status.charAt(0).toUpperCase() + customer.compliance.status.slice(1)}
          </CannabisBadge>
          {customer.compliance.issues.length > 0 && (
            <div className="text-xs text-amber-600">
              {customer.compliance.issues.length} issue(s)
            </div>
          )}
        </div>
      </td>
      
      <td className="px-4 py-3">
        <CannabisBadge variant={getStatusColor(customer.status)} size="sm">
          {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
        </CannabisBadge>
      </td>
      
      <td className="px-4 py-3">
        <div className="flex items-center space-x-2">
          <button
            onClick={onView}
            className="text-cultivateco-blue hover:text-cultivateco-green"
            title="View cannabis customer details"
          >
            <Eye className="w-4 h-4" />
          </button>
          
          <button
            onClick={onEdit}
            className="text-cultivateco-blue hover:text-cultivateco-green"
            title="Edit cannabis customer"
          >
            <Edit className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  )
}

/**
 * Cannabis add customer modal
 */
function CannabisAddCustomerModal({
  onClose,
  onSubmit,
  isSubmitting
}: {
  onClose: () => void
  onSubmit: (data: any) => void
  isSubmitting: boolean
}) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    identification: {
      type: 'drivers_license',
      number: '',
      issuingState: 'NM',
      expirationDate: ''
    },
    medicalCard: {
      number: '',
      expirationDate: '',
      issuingState: 'NM'
    },
    hasMedicalCard: false
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newErrors: Record<string, string> = {}
    
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required'
    if (!formData.identification.number) newErrors.identificationNumber = 'ID number is required'
    if (!formData.identification.expirationDate) newErrors.identificationExpiry = 'ID expiration date is required'
    
    const age = calculateAge(formData.dateOfBirth)
    if (age < 21) newErrors.age = 'Customer must be 21 or older for cannabis purchases'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const customerData = {
      ...formData,
      medicalCard: formData.hasMedicalCard ? formData.medicalCard : undefined
    }

    onSubmit(customerData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-cultivateco-green flex items-center space-x-2">
              <UserPlus className="w-5 h-5" />
              <span>Add Cannabis Customer</span>
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-md font-medium text-gray-900">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CannabisInput
                label="First Name"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                placeholder="John"
              />

              <CannabisInput
                label="Last Name"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                placeholder="Doe"
              />

              <CannabisInput
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
              />

              <CannabisInput
                label="Phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="(505) 555-0123"
              />

              <CannabisInput
                label="Date of Birth *"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                error={errors.dateOfBirth || errors.age}
              />
            </div>
          </div>

          {/* Identification */}
          <div className="space-y-4">
            <h3 className="text-md font-medium text-gray-900">Government Identification</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CannabisSelect
                label="ID Type *"
                value={formData.identification.type}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  identification: { ...formData.identification, type: e.target.value }
                })}
                options={[
                  { value: 'drivers_license', label: "Driver's License" },
                  { value: 'state_id', label: 'State ID' },
                  { value: 'passport', label: 'Passport' },
                  { value: 'military_id', label: 'Military ID' }
                ]}
              />

              <CannabisSelect
                label="Issuing State *"
                value={formData.identification.issuingState}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  identification: { ...formData.identification, issuingState: e.target.value }
                })}
                options={[
                  { value: 'NM', label: 'New Mexico' },
                  { value: 'AZ', label: 'Arizona' },
                  { value: 'CO', label: 'Colorado' },
                  { value: 'TX', label: 'Texas' },
                  { value: 'CA', label: 'California' }
                ]}
              />

              <CannabisInput
                label="ID Number *"
                value={formData.identification.number}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  identification: { ...formData.identification, number: e.target.value }
                })}
                placeholder="123456789"
                error={errors.identificationNumber}
              />

              <CannabisInput
                label="ID Expiration Date *"
                type="date"
                value={formData.identification.expirationDate}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  identification: { ...formData.identification, expirationDate: e.target.value }
                })}
                error={errors.identificationExpiry}
              />
            </div>
          </div>

          {/* Medical Card */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="hasMedicalCard"
                checked={formData.hasMedicalCard}
                onChange={(e) => setFormData({ ...formData, hasMedicalCard: e.target.checked })}
                className="rounded border-gray-300 text-cultivateco-green focus:ring-cultivateco-green"
              />
              <label htmlFor="hasMedicalCard" className="text-md font-medium text-gray-900">
                Customer has medical cannabis card
              </label>
            </div>

            {formData.hasMedicalCard && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6 border-l-2 border-cultivateco-green/20">
                <CannabisInput
                  label="Medical Card Number"
                  value={formData.medicalCard.number}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    medicalCard: { ...formData.medicalCard, number: e.target.value }
                  })}
                  placeholder="MED123456"
                />

                <CannabisInput
                  label="Medical Card Expiration"
                  type="date"
                  value={formData.medicalCard.expirationDate}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    medicalCard: { ...formData.medicalCard, expirationDate: e.target.value }
                  })}
                />
              </div>
            )}
          </div>

          <div className="flex space-x-4 pt-4 border-t border-gray-200">
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
              icon={UserPlus}
              className="flex-1"
            >
              Add Cannabis Customer
            </CannabisButton>
          </div>
        </form>
      </div>
    </div>
  )
}

/**
 * Cannabis verify customer modal
 */
function CannabisVerifyCustomerModal({
  onClose,
  onSubmit,
  isSubmitting
}: {
  onClose: () => void
  onSubmit: (data: any) => void
  isSubmitting: boolean
}) {
  const [formData, setFormData] = useState({
    identification: {
      type: 'drivers_license',
      number: '',
      expirationDate: ''
    },
    dateOfBirth: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-cultivateco-green flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Quick Cannabis Customer Verification</span>
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <CannabisAlert
            type="info"
            title="Age Verification Required"
            message="All cannabis customers must be verified as 21+ years old before purchase."
          />

          <div className="space-y-4">
            <CannabisSelect
              label="ID Type"
              value={formData.identification.type}
              onChange={(e) => setFormData({ 
                ...formData, 
                identification: { ...formData.identification, type: e.target.value }
              })}
              options={[
                { value: 'drivers_license', label: "Driver's License" },
                { value: 'state_id', label: 'State ID' },
                { value: 'passport', label: 'Passport' },
                { value: 'military_id', label: 'Military ID' }
              ]}
            />

            <CannabisInput
              label="ID Number"
              value={formData.identification.number}
              onChange={(e) => setFormData({ 
                ...formData, 
                identification: { ...formData.identification, number: e.target.value }
              })}
              placeholder="Enter ID number"
            />

            <CannabisInput
              label="ID Expiration Date"
              type="date"
              value={formData.identification.expirationDate}
              onChange={(e) => setFormData({ 
                ...formData, 
                identification: { ...formData.identification, expirationDate: e.target.value }
              })}
            />

            <CannabisInput
              label="Date of Birth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
            />
          </div>

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
              icon={Shield}
              className="flex-1"
            >
              Verify Cannabis Customer
            </CannabisButton>
          </div>
        </form>
      </div>
    </div>
  )
}

/**
 * Cannabis customer details modal
 */
function CannabisCustomerDetailsModal({
  customer,
  onClose
}: {
  customer: CannabisCustomer
  onClose: () => void
}) {
  const fullName = `${customer.firstName || ''} ${customer.lastName || ''}`.trim() || 'Anonymous Customer'
  
  const { data: purchaseHistory } = useCannabisCustomerPurchaseHistory(customer.id)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-cultivateco-green flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>{fullName}</span>
              </h2>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>Customer since {formatDate(customer.createdAt)}</span>
                <CannabisBadge variant={customer.status === 'active' ? 'success' : 'warning'} size="sm">
                  {customer.status}
                </CannabisBadge>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Customer Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CannabisMetricCard
              title="Total Spent"
              value={formatCurrency(customer.totalSpent)}
              icon={DollarSign}
              color="green"
            />
            
            <CannabisMetricCard
              title="Total Purchases"
              value={customer.totalPurchases}
              icon={ShoppingCart}
              color="blue"
            />
            
            <CannabisMetricCard
              title="Loyalty Points"
              value={customer.loyaltyPoints}
              icon={Gift}
              color="purple"
            />
          </div>

          {/* Purchase Limits */}
          <CannabisCollapsible
            title="Cannabis Purchase Limits"
            icon={Shield}
            defaultOpen={true}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-700">Daily Limit</div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {customer.purchaseLimits.daily.current}g / {customer.purchaseLimits.daily.limit}g
                  </span>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-cultivateco-green h-2 rounded-full"
                      style={{ 
                        width: `${Math.min((customer.purchaseLimits.daily.current / customer.purchaseLimits.daily.limit) * 100, 100)}%` 
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-700">Monthly Limit</div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {customer.purchaseLimits.monthly.current}g / {customer.purchaseLimits.monthly.limit}g
                  </span>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-cultivateco-green h-2 rounded-full"
                      style={{ 
                        width: `${Math.min((customer.purchaseLimits.monthly.current / customer.purchaseLimits.monthly.limit) * 100, 100)}%` 
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CannabisCollapsible>

          {/* Customer Information */}
          <CannabisCollapsible
            title="Customer Information"
            icon={IdCard}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium text-gray-700">Contact</div>
                  <div className="space-y-1">
                    {customer.email && (
                      <div className="flex items-center space-x-2 text-sm">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span>{customer.email}</span>
                      </div>
                    )}
                    {customer.phone && (
                      <div className="flex items-center space-x-2 text-sm">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span>{customer.phone}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-700">Age & Birth Date</div>
                  <div className="text-sm text-gray-600">
                    {customer.age} years old • Born {formatDate(customer.dateOfBirth)}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium text-gray-700">Identification</div>
                  <div className="space-y-1">
                    <div className="text-sm text-gray-600">
                      {customer.identification.type.replace('_', ' ').toUpperCase()}
                    </div>
                    <CannabisCopyToClipboard 
                      text={customer.identification.number}
                      className="text-sm font-mono"
                    />
                    <div className="text-sm text-gray-500">
                      Expires {formatDate(customer.identification.expirationDate)}
                    </div>
                  </div>
                </div>

                {customer.medicalCard && (
                  <div>
                    <div className="text-sm font-medium text-gray-700">Medical Cannabis Card</div>
                    <div className="space-y-1">
                      <CannabisCopyToClipboard 
                        text={customer.medicalCard.number}
                        className="text-sm font-mono"
                      />
                      <div className="text-sm text-gray-500">
                        Expires {formatDate(customer.medicalCard.expirationDate)}
                      </div>
                      <CannabisBadge 
                        variant={customer.medicalCard.verified ? 'success' : 'warning'} 
                        size="sm"
                      >
                        {customer.medicalCard.verified ? 'Verified' : 'Pending'}
                      </CannabisBadge>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CannabisCollapsible>

          {/* Purchase History */}
          <CannabisCollapsible
            title="Recent Cannabis Purchases"
            icon={ShoppingCart}
          >
            <div className="pt-4">
              {purchaseHistory?.data?.length > 0 ? (
                <div className="space-y-3">
                  {purchaseHistory.data.slice(0, 5).map((purchase: any) => (
                    <div key={purchase.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="space-y-1">
                        <div className="text-sm font-medium">{formatDate(purchase.date)}</div>
                        <div className="text-sm text-gray-600">
                          {purchase.items.length} item(s) • {formatCurrency(purchase.total)}
                        </div>
                      </div>
                      <button className="text-cultivateco-blue hover:text-cultivateco-green">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <ShoppingCart className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <div>No cannabis purchases yet</div>
                </div>
              )}
            </div>
          </CannabisCollapsible>

          {/* Compliance Status */}
          {customer.compliance.issues.length > 0 && (
            <CannabisAlert
              type={customer.compliance.status === 'violation' ? 'error' : 'warning'}
              title="Cannabis Compliance Issues"
              message={`${customer.compliance.issues.length} compliance issue(s) require attention`}
            />
          )}
        </div>
      </div>
    </div>
  )
}
