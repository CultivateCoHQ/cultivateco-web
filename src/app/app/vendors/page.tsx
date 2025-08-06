'use client'

import { useState, useMemo } from 'react'
import { 
  Building2, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Download, 
  Upload, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle,
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Package,
  Truck,
  Phone,
  Mail,
  MapPin,
  Globe,
  FileText,
  Award,
  Shield,
  Settings,
  RefreshCw,
  X,
  Save,
  Star,
  Calendar,
  CreditCard,
  Percent,
  BarChart3,
  Target,
  Activity,
  Building,
  Factory,
  Leaf,
  FlaskConical,
  Seedling,
  Users,
  LinkIcon,
  ExternalLink,
  ClipboardCheck,
  UserCheck,
  MessageCircle,
  Send,
  Archive,
  RotateCcw,
  Zap,
  TrendingUpIcon,
  ChartBar,
  Banknote
} from 'lucide-react'
import {
  useCannabisVendors,
  useCannabisCreateVendor,
  useCannabisUpdateVendor,
  useCannabisDeleteVendor,
  useCannabisVendorMetrics,
  useCannabisVendorProducts,
  useCannabisVendorOrders,
  useCannabisFileUpload
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
  CannabisTextArea,
  CannabisToggle
} from '@/components/ui/cannabis-components'
import { CannabisThemeContainer, CannabisStatusIndicator } from '@/providers/theme-provider'
import { formatCurrency, formatDate, cn } from '@/lib/utils'

/**
 * =============================================================================
 * CultivateCo Cannabis Vendor/Supplier Management
 * =============================================================================
 * Comprehensive cannabis vendor management with compliance tracking and procurement
 */

interface CannabisVendor {
  id: string
  vendorId: string
  companyName: string
  contactName: string
  email: string
  phone: string
  website?: string
  
  // Business details
  businessType: 'cultivator' | 'manufacturer' | 'distributor' | 'processor' | 'testing-lab' | 'packaging' | 'equipment' | 'services'
  specialties: string[]
  description: string
  
  // Cannabis licensing & compliance
  cannabisLicense: {
    licenseNumber: string
    licenseType: string
    issuingState: string
    issueDate: string
    expirationDate: string
    status: 'active' | 'expired' | 'suspended' | 'pending' | 'revoked'
  }
  
  // Additional certifications
  certifications: Array<{
    name: string
    type: 'organic' | 'gmp' | 'iso' | 'state-certification' | 'quality' | 'safety'
    issuingBody: string
    issueDate: string
    expirationDate?: string
    certificateUrl?: string
  }>
  
  // Address & location
  address: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  
  // Financial & payment terms
  paymentTerms: string
  creditLimit: number
  currentBalance: number
  taxId: string
  bankingDetails?: {
    accountName: string
    routingNumber: string
    accountNumber: string
  }
  
  // Vendor status & relationship
  status: 'active' | 'inactive' | 'suspended' | 'pending-approval' | 'blacklisted'
  vendorType: 'preferred' | 'standard' | 'occasional' | 'trial'
  relationshipManager?: string
  onboardingDate: string
  lastOrderDate?: string
  
  // Performance metrics
  metrics: {
    totalOrders: number
    totalSpend: number
    averageOrderValue: number
    onTimeDeliveryRate: number
    qualityRating: number
    complianceScore: number
    paymentTermsCompliance: number
    returnRate: number
  }
  
  // Product categories supplied
  productCategories: Array<{
    category: string
    subcategories: string[]
    isPreferred: boolean
  }>
  
  // Compliance & documentation
  insuranceInfo: {
    generalLiability: {
      carrier: string
      policyNumber: string
      coverage: number
      expirationDate: string
    }
    productLiability?: {
      carrier: string
      policyNumber: string
      coverage: number
      expirationDate: string
    }
  }
  
  // Quality assurance
  qualityStandards: {
    labTesting: boolean
    coa: boolean // Certificate of Analysis
    batchTracking: boolean
    recallProcedures: boolean
    qualityManagementSystem: boolean
  }
  
  // Communication & notes
  notes: string
  communicationLog: Array<{
    date: string
    type: 'email' | 'phone' | 'meeting' | 'order' | 'issue'
    summary: string
    followUp?: string
    staffMember: string
  }>
  
  // METRC integration
  metrcInfo?: {
    facilityLicense: string
    facilityName: string
    isLinked: boolean
    lastSyncDate?: string
  }
  
  // Audit trail
  createdAt: string
  updatedAt: string
  createdBy: string
  updatedBy: string
}

interface VendorFilters {
  businessType: string
  vendorType: string
  status: string
  licenseStatus: string
  state: string
  specialty: string
  search: string
  showExpiringLicenses: boolean
  showExpiringInsurance: boolean
}

type VendorSortField = 'companyName' | 'totalSpend' | 'onTimeDeliveryRate' | 'qualityRating' | 'lastOrderDate' | 'onboardingDate'
type VendorSortDirection = 'asc' | 'desc'

const VENDOR_BUSINESS_TYPES = {
  'cultivator': { label: 'Cultivator', color: 'green', icon: Seedling },
  'manufacturer': { label: 'Manufacturer', color: 'blue', icon: Factory },
  'distributor': { label: 'Distributor', color: 'purple', icon: Truck },
  'processor': { label: 'Processor', color: 'amber', icon: FlaskConical },
  'testing-lab': { label: 'Testing Lab', color: 'red', icon: ClipboardCheck },
  'packaging': { label: 'Packaging', color: 'gray', icon: Package },
  'equipment': { label: 'Equipment', color: 'blue', icon: Settings },
  'services': { label: 'Services', color: 'purple', icon: Users }
}

const VENDOR_TYPES = {
  'preferred': { label: 'Preferred', color: 'success' },
  'standard': { label: 'Standard', color: 'info' },
  'occasional': { label: 'Occasional', color: 'warning' },
  'trial': { label: 'Trial', color: 'processing' }
}

const VENDOR_STATUSES = {
  'active': { label: 'Active', color: 'success', icon: CheckCircle },
  'inactive': { label: 'Inactive', color: 'warning', icon: XCircle },
  'suspended': { label: 'Suspended', color: 'violation', icon: AlertTriangle },
  'pending-approval': { label: 'Pending Approval', color: 'info', icon: Clock },
  'blacklisted': { label: 'Blacklisted', color: 'violation', icon: XCircle }
}

const CANNABIS_SPECIALTIES = [
  'Indoor Flower', 'Outdoor Flower', 'Concentrates', 'Edibles', 'Pre-Rolls',
  'Topicals', 'Vape Cartridges', 'Live Resin', 'Rosin', 'Hash',
  'Testing Services', 'Packaging', 'Equipment', 'Security', 'Consulting'
]

export default function CannabisVendorsPage() {
  // Cannabis vendors state
  const [filters, setFilters] = useState<VendorFilters>({
    businessType: 'all',
    vendorType: 'all',
    status: 'all',
    licenseStatus: 'all',
    state: 'all',
    specialty: 'all',
    search: '',
    showExpiringLicenses: false,
    showExpiringInsurance: false
  })
  const [sortField, setSortField] = useState<VendorSortField>('companyName')
  const [sortDirection, setSortDirection] = useState<VendorSortDirection>('asc')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedVendors, setSelectedVendors] = useState<Set<string>>(new Set())
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showVendorDetails, setShowVendorDetails] = useState(false)
  const [selectedVendor, setSelectedVendor] = useState<CannabisVendor | null>(null)

  // Cannabis API hooks
  const { 
    data: vendorsResponse, 
    isLoading: vendorsLoading, 
    error: vendorsError,
    refetch: refetchVendors 
  } = useCannabisVendors({
    page: 1,
    limit: 100,
    businessType: filters.businessType !== 'all' ? filters.businessType : undefined,
    status: filters.status !== 'all' ? filters.status : undefined,
    search: filters.search || undefined
  })

  const { data: vendorMetrics } = useCannabisVendorMetrics()
  
  const createVendorMutation = useCannabisCreateVendor()
  const updateVendorMutation = useCannabisUpdateVendor()
  const deleteVendorMutation = useCannabisDeleteVendor()
  const uploadFileMutation = useCannabisFileUpload()

  // Cannabis vendors data processing
  const vendors = vendorsResponse?.data || []

  // Cannabis vendor filtering and sorting
  const filteredAndSortedVendors = useMemo(() => {
    let filtered = vendors.filter((vendor: CannabisVendor) => {
      const matchesBusinessType = filters.businessType === 'all' || vendor.businessType === filters.businessType
      const matchesVendorType = filters.vendorType === 'all' || vendor.vendorType === filters.vendorType
      const matchesStatus = filters.status === 'all' || vendor.status === filters.status
      const matchesLicenseStatus = filters.licenseStatus === 'all' || vendor.cannabisLicense.status === filters.licenseStatus
      const matchesState = filters.state === 'all' || vendor.address.state === filters.state
      const matchesSpecialty = filters.specialty === 'all' || vendor.specialties.includes(filters.specialty)
      const matchesSearch = !filters.search || 
        vendor.companyName.toLowerCase().includes(filters.search.toLowerCase()) ||
        vendor.contactName.toLowerCase().includes(filters.search.toLowerCase()) ||
        vendor.email.toLowerCase().includes(filters.search.toLowerCase()) ||
        vendor.vendorId.toLowerCase().includes(filters.search.toLowerCase())

      let matchesExpirationFilters = true
      const thirtyDaysFromNow = new Date()
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30)

      if (filters.showExpiringLicenses) {
        const licenseExpiry = new Date(vendor.cannabisLicense.expirationDate)
        matchesExpirationFilters = matchesExpirationFilters && licenseExpiry <= thirtyDaysFromNow
      }

      if (filters.showExpiringInsurance) {
        const insuranceExpiry = new Date(vendor.insuranceInfo.generalLiability.expirationDate)
        matchesExpirationFilters = matchesExpirationFilters && insuranceExpiry <= thirtyDaysFromNow
      }

      return matchesBusinessType && matchesVendorType && matchesStatus && 
             matchesLicenseStatus && matchesState && matchesSpecialty && 
             matchesSearch && matchesExpirationFilters
    })

    // Cannabis vendor sorting
    filtered.sort((a: CannabisVendor, b: CannabisVendor) => {
      let aVal, bVal

      switch (sortField) {
        case 'companyName':
          aVal = a.companyName.toLowerCase()
          bVal = b.companyName.toLowerCase()
          break
        case 'totalSpend':
          aVal = a.metrics.totalSpend
          bVal = b.metrics.totalSpend
          break
        case 'onTimeDeliveryRate':
          aVal = a.metrics.onTimeDeliveryRate
          bVal = b.metrics.onTimeDeliveryRate
          break
        case 'qualityRating':
          aVal = a.metrics.qualityRating
          bVal = b.metrics.qualityRating
          break
        case 'lastOrderDate':
          aVal = a.lastOrderDate ? new Date(a.lastOrderDate).getTime() : 0
          bVal = b.lastOrderDate ? new Date(b.lastOrderDate).getTime() : 0
          break
        case 'onboardingDate':
          aVal = new Date(a.onboardingDate).getTime()
          bVal = new Date(b.onboardingDate).getTime()
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
  }, [vendors, filters, sortField, sortDirection])

  // Cannabis vendor analytics
  const vendorAnalytics = useMemo(() => {
    const totalVendors = vendors.length
    const activeVendors = vendors.filter((v: CannabisVendor) => v.status === 'active').length
    const preferredVendors = vendors.filter((v: CannabisVendor) => v.vendorType === 'preferred').length
    
    // License and compliance alerts
    const thirtyDaysFromNow = new Date()
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30)
    
    const expiringLicenses = vendors.filter((v: CannabisVendor) => {
      const licenseExpiry = new Date(v.cannabisLicense.expirationDate)
      return licenseExpiry <= thirtyDaysFromNow && v.status === 'active'
    }).length
    
    const expiringInsurance = vendors.filter((v: CannabisVendor) => {
      const insuranceExpiry = new Date(v.insuranceInfo.generalLiability.expirationDate)
      return insuranceExpiry <= thirtyDaysFromNow && v.status === 'active'
    }).length
    
    // Financial metrics
    const totalSpend = vendors.reduce((sum: number, v: CannabisVendor) => sum + v.metrics.totalSpend, 0)
    const totalOrders = vendors.reduce((sum: number, v: CannabisVendor) => sum + v.metrics.totalOrders, 0)
    const avgOrderValue = totalOrders > 0 ? totalSpend / totalOrders : 0
    
    // Performance metrics
    const avgOnTimeDelivery = vendors.length > 0 ? 
      vendors.reduce((sum: number, v: CannabisVendor) => sum + v.metrics.onTimeDeliveryRate, 0) / vendors.length : 0
    const avgQualityRating = vendors.length > 0 ? 
      vendors.reduce((sum: number, v: CannabisVendor) => sum + v.metrics.qualityRating, 0) / vendors.length : 0
    const avgComplianceScore = vendors.length > 0 ? 
      vendors.reduce((sum: number, v: CannabisVendor) => sum + v.metrics.complianceScore, 0) / vendors.length : 0

    return {
      totalVendors,
      activeVendors,
      preferredVendors,
      expiringLicenses,
      expiringInsurance,
      totalSpend,
      totalOrders,
      avgOrderValue,
      avgOnTimeDelivery,
      avgQualityRating,
      avgComplianceScore
    }
  }, [vendors])

  /**
   * Handle cannabis vendor operations
   */
  const handleFilterChange = (key: keyof VendorFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleSort = (field: VendorSortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const handleSelectVendor = (vendorId: string) => {
    const newSelected = new Set(selectedVendors)
    if (newSelected.has(vendorId)) {
      newSelected.delete(vendorId)
    } else {
      newSelected.add(vendorId)
    }
    setSelectedVendors(newSelected)
  }

  const handleSelectAll = () => {
    if (selectedVendors.size === filteredAndSortedVendors.length) {
      setSelectedVendors(new Set())
    } else {
      setSelectedVendors(new Set(filteredAndSortedVendors.map((vendor: CannabisVendor) => vendor.id)))
    }
  }

  const handleStatusUpdate = (vendorId: string, newStatus: string) => {
    updateVendorMutation.mutate({
      vendorId,
      vendorData: { status: newStatus }
    })
  }

  const handleBulkAction = (action: 'activate' | 'deactivate' | 'suspend' | 'send-message' | 'export') => {
    console.log(`Bulk ${action} for vendors:`, Array.from(selectedVendors))
    setSelectedVendors(new Set())
  }

  if (vendorsLoading) {
    return (
      <div className="space-y-6">
        <CannabisVendorsHeader 
          onRefresh={() => {}} 
          onAddVendor={() => {}} 
          onImport={() => {}}
          onExport={() => {}}
        />
        <CannabisLoadingSpinner size="lg" text="Loading cannabis vendors..." />
      </div>
    )
  }

  if (vendorsError) {
    return (
      <div className="space-y-6">
        <CannabisVendorsHeader 
          onRefresh={refetchVendors} 
          onAddVendor={() => setShowAddModal(true)} 
          onImport={() => console.log('Import vendors')}
          onExport={() => console.log('Export vendors')}
        />
        <CannabisAlert
          type="error"
          title="Cannabis Vendors Error"
          message="Failed to load cannabis vendors. Please try again."
          action={{ label: 'Retry', onClick: refetchVendors }}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Cannabis Vendors Header */}
      <CannabisVendorsHeader 
        onRefresh={refetchVendors} 
        onAddVendor={() => setShowAddModal(true)} 
        onImport={() => console.log('Import vendors')}
        onExport={() => console.log('Export vendors')}
      />

      {/* Cannabis Vendor Analytics */}
      <CannabisVendorAnalytics analytics={vendorAnalytics} />

      {/* Cannabis Vendor Alerts */}
      {(vendorAnalytics.expiringLicenses > 0 || vendorAnalytics.expiringInsurance > 0) && (
        <div className="space-y-3">
          {vendorAnalytics.expiringLicenses > 0 && (
            <CannabisAlert
              type="warning"
              title="Vendor License Expiration Alert"
              message={`${vendorAnalytics.expiringLicenses} vendor${vendorAnalytics.expiringLicenses !== 1 ? 's have' : ' has'} cannabis licenses expiring within 30 days.`}
              action={{ 
                label: 'View Expiring', 
                onClick: () => handleFilterChange('showExpiringLicenses', true) 
              }}
            />
          )}
          
          {vendorAnalytics.expiringInsurance > 0 && (
            <CannabisAlert
              type="warning"
              title="Vendor Insurance Expiration Alert"
              message={`${vendorAnalytics.expiringInsurance} vendor${vendorAnalytics.expiringInsurance !== 1 ? 's have' : ' has'} insurance expiring within 30 days.`}
              action={{ 
                label: 'View Expiring', 
                onClick: () => handleFilterChange('showExpiringInsurance', true) 
              }}
            />
          )}
        </div>
      )}

      {/* Cannabis Vendor Filters */}
      <CannabisVendorFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
      />

      {/* Cannabis Bulk Actions */}
      {selectedVendors.size > 0 && (
        <CannabisVendorBulkActions
          selectedCount={selectedVendors.size}
          onBulkAction={handleBulkAction}
          onClearSelection={() => setSelectedVendors(new Set())}
        />
      )}

      {/* Cannabis Vendors Table */}
      <CannabisThemeContainer variant="card">
        <CannabisVendorsTable
          vendors={filteredAndSortedVendors}
          selectedVendors={selectedVendors}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
          onSelectVendor={handleSelectVendor}
          onSelectAll={handleSelectAll}
          onViewVendor={(vendor) => {
            setSelectedVendor(vendor)
            setShowVendorDetails(true)
          }}
          onEditVendor={(vendor) => {
            setSelectedVendor(vendor)
            setShowEditModal(true)
          }}
          onStatusUpdate={handleStatusUpdate}
          onDeleteVendor={(vendorId) => deleteVendorMutation.mutate(vendorId)}
        />
      </CannabisThemeContainer>

      {/* Cannabis Add Vendor Modal */}
      {showAddModal && (
        <CannabisVendorModal
          mode="create"
          onClose={() => setShowAddModal(false)}
          onSubmit={(vendorData) => {
            createVendorMutation.mutate(vendorData, {
              onSuccess: () => setShowAddModal(false)
            })
          }}
          isSubmitting={createVendorMutation.isPending}
        />
      )}

      {/* Cannabis Edit Vendor Modal */}
      {showEditModal && selectedVendor && (
        <CannabisVendorModal
          mode="edit"
          vendor={selectedVendor}
          onClose={() => {
            setShowEditModal(false)
            setSelectedVendor(null)
          }}
          onSubmit={(vendorData) => {
            updateVendorMutation.mutate(
              { vendorId: selectedVendor.id, vendorData },
              {
                onSuccess: () => {
                  setShowEditModal(false)
                  setSelectedVendor(null)
                }
              }
            )
          }}
          isSubmitting={updateVendorMutation.isPending}
        />
      )}

      {/* Cannabis Vendor Details Modal */}
      {showVendorDetails && selectedVendor && (
        <CannabisVendorDetailsModal
          vendor={selectedVendor}
          onClose={() => {
            setShowVendorDetails(false)
            setSelectedVendor(null)
          }}
          onEdit={() => {
            setShowVendorDetails(false)
            setShowEditModal(true)
          }}
        />
      )}
    </div>
  )
}

/**
 * Cannabis vendors page header
 */
function CannabisVendorsHeader({
  onRefresh,
  onAddVendor,
  onImport,
  onExport
}: {
  onRefresh: () => void
  onAddVendor: () => void
  onImport: () => void
  onExport: () => void
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-cultivateco-green flex items-center space-x-2">
          <Building2 className="w-6 h-6" />
          <span>Cannabis Vendor Management</span>
        </h1>
        <p className="text-gray-600">
          Manage cannabis vendors, suppliers, compliance, and procurement relationships
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
          onClick={onImport}
          icon={Upload}
        >
          Import
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
          onClick={onAddVendor}
          icon={Plus}
        >
          Add Vendor
        </CannabisButton>
      </div>
    </div>
  )
}

/**
 * Cannabis vendor analytics cards
 */
function CannabisVendorAnalytics({ 
  analytics 
}: { 
  analytics: {
    totalVendors: number
    activeVendors: number
    preferredVendors: number
    expiringLicenses: number
    expiringInsurance: number
    totalSpend: number
    totalOrders: number
    avgOrderValue: number
    avgOnTimeDelivery: number
    avgQualityRating: number
    avgComplianceScore: number
  }
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-11 gap-6">
      <CannabisMetricCard
        title="Total Vendors"
        value={analytics.totalVendors}
        icon={Building2}
        color="green"
      />

      <CannabisMetricCard
        title="Active Vendors"
        value={analytics.activeVendors}
        icon={CheckCircle}
        color="blue"
      />

      <CannabisMetricCard
        title="Preferred Vendors"
        value={analytics.preferredVendors}
        icon={Star}
        color="amber"
      />

      <CannabisMetricCard
        title="Expiring Licenses"
        value={analytics.expiringLicenses}
        icon={AlertTriangle}
        color={analytics.expiringLicenses > 0 ? 'red' : 'green'}
      />

      <CannabisMetricCard
        title="Expiring Insurance"
        value={analytics.expiringInsurance}
        icon={Shield}
        color={analytics.expiringInsurance > 0 ? 'red' : 'green'}
      />

      <CannabisMetricCard
        title="Total Spend"
        value={formatCurrency(analytics.totalSpend)}
        icon={DollarSign}
        color="purple"
      />

      <CannabisMetricCard
        title="Total Orders"
        value={analytics.totalOrders}
        icon={Package}
        color="info"
      />

      <CannabisMetricCard
        title="Avg Order Value"
        value={formatCurrency(analytics.avgOrderValue)}
        icon={Target}
        color="green"
      />

      <CannabisMetricCard
        title="On-Time Delivery"
        value={`${analytics.avgOnTimeDelivery.toFixed(1)}%`}
        icon={Truck}
        color={analytics.avgOnTimeDelivery >= 95 ? 'green' : analytics.avgOnTimeDelivery >= 85 ? 'amber' : 'red'}
      />

      <CannabisMetricCard
        title="Quality Rating"
        value={`${analytics.avgQualityRating.toFixed(1)}/5`}
        icon={Award}
        color={analytics.avgQualityRating >= 4.5 ? 'green' : analytics.avgQualityRating >= 3.5 ? 'amber' : 'red'}
      />

      <CannabisMetricCard
        title="Compliance Score"
        value={`${analytics.avgComplianceScore.toFixed(1)}%`}
        icon={Shield}
        color={analytics.avgComplianceScore >= 90 ? 'green' : analytics.avgComplianceScore >= 70 ? 'amber' : 'red'}
      />
    </div>
  )
}

/**
 * Cannabis vendor filters
 */
function CannabisVendorFilters({
  filters,
  onFilterChange,
  showFilters,
  onToggleFilters
}: {
  filters: VendorFilters
  onFilterChange: (key: keyof VendorFilters, value: any) => void
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
              value={filters.search}
              onChange={(e) => onFilterChange('search', e.target.value)}
              placeholder="Search vendors, contacts, company names..."
              showFilter={true}
              onFilter={onToggleFilters}
            />
          </div>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onFilterChange('showExpiringLicenses', !filters.showExpiringLicenses)}
            className={cn(
              'px-3 py-1 rounded-full text-sm font-medium transition-colors flex items-center space-x-1',
              filters.showExpiringLicenses
                ? 'bg-amber-100 text-amber-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            )}
          >
            <AlertTriangle className="w-3 h-3" />
            <span>Expiring Licenses</span>
          </button>

          <button
            onClick={() => onFilterChange('showExpiringInsurance', !filters.showExpiringInsurance)}
            className={cn(
              'px-3 py-1 rounded-full text-sm font-medium transition-colors flex items-center space-x-1',
              filters.showExpiringInsurance
                ? 'bg-amber-100 text-amber-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            )}
          >
            <Shield className="w-3 h-3" />
            <span>Expiring Insurance</span>
          </button>

          {Object.entries(VENDOR_BUSINESS_TYPES).map(([key, type]) => {
            const IconComponent = type.icon
            return (
              <button
                key={key}
                onClick={() => onFilterChange('businessType', filters.businessType === key ? 'all' : key)}
                className={cn(
                  'px-3 py-1 rounded-full text-sm font-medium transition-colors flex items-center space-x-1',
                  filters.businessType === key
                    ? 'bg-cultivateco-green text-cultivateco-cream'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                )}
              >
                <IconComponent className="w-3 h-3" />
                <span>{type.label}</span>
              </button>
            )
          })}
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 pt-4 border-t border-gray-200">
            <CannabisSelect
              label="Vendor Type"
              value={filters.vendorType}
              onChange={(e) => onFilterChange('vendorType', e.target.value)}
              options={[
                { value: 'all', label: 'All Types' },
                ...Object.entries(VENDOR_TYPES).map(([key, type]) => ({
                  value: key,
                  label: type.label
                }))
              ]}
            />

            <CannabisSelect
              label="Status"
              value={filters.status}
              onChange={(e) => onFilterChange('status', e.target.value)}
              options={[
                { value: 'all', label: 'All Statuses' },
                ...Object.entries(VENDOR_STATUSES).map(([key, status]) => ({
                  value: key,
                  label: status.label
                }))
              ]}
            />

            <CannabisSelect
              label="License Status"
              value={filters.licenseStatus}
              onChange={(e) => onFilterChange('licenseStatus', e.target.value)}
              options={[
                { value: 'all', label: 'All License Status' },
                { value: 'active', label: 'Active' },
                { value: 'expired', label: 'Expired' },
                { value: 'suspended', label: 'Suspended' },
                { value: 'pending', label: 'Pending' },
                { value: 'revoked', label: 'Revoked' }
              ]}
            />

            <CannabisSelect
              label="State"
              value={filters.state}
              onChange={(e) => onFilterChange('state', e.target.value)}
              options={[
                { value: 'all', label: 'All States' },
                { value: 'CA', label: 'California' },
                { value: 'CO', label: 'Colorado' },
                { value: 'WA', label: 'Washington' },
                { value: 'OR', label: 'Oregon' },
                { value: 'NV', label: 'Nevada' }
              ]}
            />

            <CannabisSelect
              label="Specialty"
              value={filters.specialty}
              onChange={(e) => onFilterChange('specialty', e.target.value)}
              options={[
                { value: 'all', label: 'All Specialties' },
                ...CANNABIS_SPECIALTIES.map(specialty => ({
                  value: specialty,
                  label: specialty
                }))
              ]}
            />
          </div>
        )}
      </div>
    </CannabisThemeContainer>
  )
}

/**
 * Cannabis vendor bulk actions bar
 */
function CannabisVendorBulkActions({
  selectedCount,
  onBulkAction,
  onClearSelection
}: {
  selectedCount: number
  onBulkAction: (action: 'activate' | 'deactivate' | 'suspend' | 'send-message' | 'export') => void
  onClearSelection: () => void
}) {
  return (
    <CannabisThemeContainer variant="card">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-900">
            {selectedCount} vendor{selectedCount !== 1 ? 's' : ''} selected
          </span>
          
          <div className="flex space-x-2">
            <CannabisButton
              variant="outline"
              size="sm"
              onClick={() => onBulkAction('activate')}
            >
              Activate
            </CannabisButton>
            
            <CannabisButton
              variant="outline"
              size="sm"
              onClick={() => onBulkAction('deactivate')}
            >
              Deactivate
            </CannabisButton>
            
            <CannabisButton
              variant="outline"
              size="sm"
              onClick={() => onBulkAction('send-message')}
            >
              Send Message
            </CannabisButton>
            
            <CannabisButton
              variant="outline"
              size="sm"
              onClick={() => onBulkAction('export')}
            >
              Export
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
 * Cannabis vendors table
 */
function CannabisVendorsTable({
  vendors,
  selectedVendors,
  sortField,
  sortDirection,
  onSort,
  onSelectVendor,
  onSelectAll,
  onViewVendor,
  onEditVendor,
  onStatusUpdate,
  onDeleteVendor
}: {
  vendors: CannabisVendor[]
  selectedVendors: Set<string>
  sortField: VendorSortField
  sortDirection: VendorSortDirection
  onSort: (field: VendorSortField) => void
  onSelectVendor: (vendorId: string) => void
  onSelectAll: () => void
  onViewVendor: (vendor: CannabisVendor) => void
  onEditVendor: (vendor: CannabisVendor) => void
  onStatusUpdate: (vendorId: string, status: string) => void
  onDeleteVendor: (vendorId: string) => void
}) {
  const SortIcon = sortDirection === 'asc' ? TrendingUp : TrendingDown

  const renderSortHeader = (field: VendorSortField, label: string) => (
    <button
      onClick={() => onSort(field)}
      className="flex items-center space-x-1 text-left font-medium text-gray-700 hover:text-cultivateco-green"
    >
      <span>{label}</span>
      {sortField === field && <SortIcon className="w-4 h-4" />}
    </button>
  )

  if (vendors.length === 0) {
    return (
      <CannabisEmptyState
        icon={Building2}
        title="No Cannabis Vendors Found"
        description="No cannabis vendors match your current filters. Try adjusting your search criteria or add new vendors."
        action={{
          label: 'Add Cannabis Vendor',
          onClick: () => console.log('Add vendor')
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
                checked={selectedVendors.size === vendors.length && vendors.length > 0}
                onChange={onSelectAll}
                className="rounded border-gray-300 text-cultivateco-green focus:ring-cultivateco-green"
              />
            </th>
            <th className="px-4 py-3 text-left">
              {renderSortHeader('companyName', 'Vendor')}
            </th>
            <th className="px-4 py-3 text-left">Business Type</th>
            <th className="px-4 py-3 text-left">Cannabis License</th>
            <th className="px-4 py-3 text-left">
              {renderSortHeader('totalSpend', 'Spend & Performance')}
            </th>
            <th className="px-4 py-3 text-left">
              {renderSortHeader('qualityRating', 'Quality & Delivery')}
            </th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">
              {renderSortHeader('lastOrderDate', 'Last Order')}
            </th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>
        
        <tbody className="divide-y divide-gray-200">
          {vendors.map((vendor: CannabisVendor) => (
            <CannabisVendorRow
              key={vendor.id}
              vendor={vendor}
              isSelected={selectedVendors.has(vendor.id)}
              onSelect={() => onSelectVendor(vendor.id)}
              onView={() => onViewVendor(vendor)}
              onEdit={() => onEditVendor(vendor)}
              onStatusUpdate={onStatusUpdate}
              onDelete={() => onDeleteVendor(vendor.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

/**
 * Cannabis vendor table row
 */
function CannabisVendorRow({
  vendor,
  isSelected,
  onSelect,
  onView,
  onEdit,
  onStatusUpdate,
  onDelete
}: {
  vendor: CannabisVendor
  isSelected: boolean
  onSelect: () => void
  onView: () => void
  onEdit: () => void
  onStatusUpdate: (vendorId: string, status: string) => void
  onDelete: () => void
}) {
  const statusConfig = VENDOR_STATUSES[vendor.status as keyof typeof VENDOR_STATUSES]
  const StatusIcon = statusConfig.icon
  const businessTypeConfig = VENDOR_BUSINESS_TYPES[vendor.businessType as keyof typeof VENDOR_BUSINESS_TYPES]
  const BusinessTypeIcon = businessTypeConfig.icon

  // Check for expiring items
  const isLicenseExpiringSoon = () => {
    const thirtyDaysFromNow = new Date()
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30)
    return new Date(vendor.cannabisLicense.expirationDate) <= thirtyDaysFromNow
  }

  const isInsuranceExpiringSoon = () => {
    const thirtyDaysFromNow = new Date()
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30)
    return new Date(vendor.insuranceInfo.generalLiability.expirationDate) <= thirtyDaysFromNow
  }

  const getLicenseStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success'
      case 'expired': return 'violation'
      case 'suspended': return 'warning'
      case 'pending': return 'info'
      case 'revoked': return 'violation'
      default: return 'info'
    }
  }

  const getPerformanceColor = (score: number, type: 'percentage' | 'rating') => {
    if (type === 'percentage') {
      if (score >= 90) return 'text-green-600'
      if (score >= 70) return 'text-amber-600'
      return 'text-red-600'
    } else {
      if (score >= 4.5) return 'text-green-600'
      if (score >= 3.5) return 'text-amber-600'
      return 'text-red-600'
    }
  }

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
          <div className="font-medium text-gray-900">{vendor.companyName}</div>
          <div className="text-sm text-gray-600">{vendor.contactName}</div>
          <div className="flex items-center space-x-2">
            <CannabisCopyToClipboard text={vendor.vendorId} className="text-xs font-mono">
              {vendor.vendorId}
            </CannabisCopyToClipboard>
            {vendor.vendorType === 'preferred' && (
              <Star className="w-3 h-3 text-amber-500 fill-current" title="Preferred Vendor" />
            )}
          </div>
          <div className="text-xs text-gray-600">{vendor.address.city}, {vendor.address.state}</div>
        </div>
      </td>
      
      <td className="px-4 py-3">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <BusinessTypeIcon className="w-4 h-4 text-gray-600" />
            <CannabisBadge variant={businessTypeConfig.color as any} size="sm">
              {businessTypeConfig.label}
            </CannabisBadge>
          </div>
          <div className="text-xs text-gray-600">
            {vendor.specialties.slice(0, 2).join(', ')}
            {vendor.specialties.length > 2 && ` +${vendor.specialties.length - 2}`}
          </div>
          <CannabisBadge variant={VENDOR_TYPES[vendor.vendorType as keyof typeof VENDOR_TYPES].color as any} size="sm">
            {VENDOR_TYPES[vendor.vendorType as keyof typeof VENDOR_TYPES].label}
          </CannabisBadge>
        </div>
      </td>
      
      <td className="px-4 py-3">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <CannabisBadge 
              variant={getLicenseStatusColor(vendor.cannabisLicense.status)} 
              size="sm"
            >
              {vendor.cannabisLicense.status.toUpperCase()}
            </CannabisBadge>
            {isLicenseExpiringSoon() && (
              <AlertTriangle className="w-3 h-3 text-amber-500" title="License expiring soon" />
            )}
          </div>
          <div className="text-xs text-gray-600">
            <CannabisCopyToClipboard text={vendor.cannabisLicense.licenseNumber}>
              {vendor.cannabisLicense.licenseNumber}
            </CannabisCopyToClipboard>
          </div>
          <div className="text-xs text-gray-600">
            Exp: {formatDate(vendor.cannabisLicense.expirationDate)}
          </div>
          {isInsuranceExpiringSoon() && (
            <div className="flex items-center space-x-1 text-xs text-amber-600">
              <Shield className="w-3 h-3" />
              <span>Insurance Expiring</span>
            </div>
          )}
        </div>
      </td>
      
      <td className="px-4 py-3">
        <div className="space-y-1">
          <div className="text-sm">
            <span className="text-gray-600">Total:</span>
            <span className="ml-1 font-medium text-cultivateco-green">
              {formatCurrency(vendor.metrics.totalSpend)}
            </span>
          </div>
          <div className="text-sm">
            <span className="text-gray-600">Orders:</span>
            <span className="ml-1 font-medium">
              {vendor.metrics.totalOrders}
            </span>
          </div>
          <div className="text-sm">
            <span className="text-gray-600">Avg Order:</span>
            <span className="ml-1 font-medium">
              {formatCurrency(vendor.metrics.averageOrderValue)}
            </span>
          </div>
          <div className="text-sm">
            <span className="text-gray-600">Compliance:</span>
            <span className={cn('ml-1 font-medium', getPerformanceColor(vendor.metrics.complianceScore, 'percentage'))}>
              {vendor.metrics.complianceScore}%
            </span>
          </div>
        </div>
      </td>
      
      <td className="px-4 py-3">
        <div className="space-y-1">
          <div className="text-sm">
            <span className="text-gray-600">Quality:</span>
            <span className={cn('ml-1 font-medium', getPerformanceColor(vendor.metrics.qualityRating, 'rating'))}>
              {vendor.metrics.qualityRating.toFixed(1)}/5
            </span>
          </div>
          <div className="text-sm">
            <span className="text-gray-600">On-Time:</span>
            <span className={cn('ml-1 font-medium', getPerformanceColor(vendor.metrics.onTimeDeliveryRate, 'percentage'))}>
              {vendor.metrics.onTimeDeliveryRate}%
            </span>
          </div>
          <div className="text-sm">
            <span className="text-gray-600">Returns:</span>
            <span className="ml-1 font-medium text-red-600">
              {vendor.metrics.returnRate}%
            </span>
          </div>
        </div>
      </td>
      
      <td className="px-4 py-3">
        <div className="flex items-center space-x-2">
          <CannabisBadge variant={statusConfig.color as any} size="sm">
            <StatusIcon className="w-3 h-3 mr-1" />
            {statusConfig.label}
          </CannabisBadge>
          
          {vendor.status === 'active' && (
            <select
              onChange={(e) => onStatusUpdate(vendor.id, e.target.value)}
              className="text-xs border border-gray-300 rounded px-2 py-1"
              defaultValue=""
            >
              <option value="" disabled>Update...</option>
              <option value="inactive">Deactivate</option>
              <option value="suspended">Suspend</option>
              <option value="blacklisted">Blacklist</option>
            </select>
          )}
        </div>
      </td>
      
      <td className="px-4 py-3">
        <div className="space-y-1">
          {vendor.lastOrderDate ? (
            <div className="text-sm">{formatDate(vendor.lastOrderDate)}</div>
          ) : (
            <div className="text-sm text-gray-500">No orders yet</div>
          )}
          <div className="text-xs text-gray-600">
            Onboarded: {formatDate(vendor.onboardingDate)}
          </div>
        </div>
      </td>
      
      <td className="px-4 py-3">
        <div className="flex items-center space-x-2">
          <button
            onClick={onView}
            className="text-cultivateco-blue hover:text-cultivateco-green"
            title="View vendor details"
          >
            <Eye className="w-4 h-4" />
          </button>
          
          <button
            onClick={onEdit}
            className="text-cultivateco-blue hover:text-cultivateco-green"
            title="Edit vendor"
          >
            <Edit className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => console.log('Contact vendor', vendor.id)}
            className="text-cultivateco-blue hover:text-cultivateco-green"
            title="Contact vendor"
          >
            <MessageCircle className="w-4 h-4" />
          </button>

          {vendor.website && (
            <a
              href={vendor.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cultivateco-blue hover:text-cultivateco-green"
              title="Visit vendor website"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
          
          <button
            onClick={onDelete}
            className="text-gray-400 hover:text-red-600"
            title="Delete vendor"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  )
}

/**
 * Cannabis vendor modal - simplified for space
 */
function CannabisVendorModal({
  mode,
  vendor,
  onClose,
  onSubmit,
  isSubmitting
}: {
  mode: 'create' | 'edit'
  vendor?: CannabisVendor
  onClose: () => void
  onSubmit: (data: any) => void
  isSubmitting: boolean
}) {
  const [formData, setFormData] = useState({
    companyName: vendor?.companyName || '',
    contactName: vendor?.contactName || '',
    email: vendor?.email || '',
    phone: vendor?.phone || '',
    website: vendor?.website || '',
    businessType: vendor?.businessType || 'cultivator',
    vendorType: vendor?.vendorType || 'standard',
    specialties: vendor?.specialties || [],
    description: vendor?.description || '',
    cannabisLicense: {
      licenseNumber: vendor?.cannabisLicense.licenseNumber || '',
      licenseType: vendor?.cannabisLicense.licenseType || '',
      expirationDate: vendor?.cannabisLicense.expirationDate || ''
    },
    address: {
      street: vendor?.address.street || '',
      city: vendor?.address.city || '',
      state: vendor?.address.state || '',
      zipCode: vendor?.address.zipCode || ''
    },
    paymentTerms: vendor?.paymentTerms || 'Net 30',
    creditLimit: vendor?.creditLimit || 0
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-cultivateco-green">
              {mode === 'create' ? 'Add Cannabis Vendor' : 'Edit Cannabis Vendor'}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CannabisInput
              label="Company Name"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              placeholder="Green Valley Farms"
              required
            />

            <CannabisInput
              label="Contact Name"
              value={formData.contactName}
              onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
              placeholder="John Smith"
              required
            />

            <CannabisInput
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="contact@greenvalley.com"
              required
            />

            <CannabisInput
              label="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="(555) 123-4567"
              required
            />

            <CannabisInput
              label="Website"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              placeholder="https://greenvalley.com"
            />

            <CannabisSelect
              label="Business Type"
              value={formData.businessType}
              onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
              options={Object.entries(VENDOR_BUSINESS_TYPES).map(([key, type]) => ({
                value: key,
                label: type.label
              }))}
              required
            />

            <CannabisSelect
              label="Vendor Type"
              value={formData.vendorType}
              onChange={(e) => setFormData({ ...formData, vendorType: e.target.value })}
              options={Object.entries(VENDOR_TYPES).map(([key, type]) => ({
                value: key,
                label: type.label
              }))}
              required
            />

            <CannabisInput
              label="Payment Terms"
              value={formData.paymentTerms}
              onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })}
              placeholder="Net 30"
              required
            />

            <CannabisInput
              label="Cannabis License Number"
              value={formData.cannabisLicense.licenseNumber}
              onChange={(e) => setFormData({ 
                ...formData, 
                cannabisLicense: { ...formData.cannabisLicense, licenseNumber: e.target.value }
              })}
              placeholder="ABC123456789"
              required
            />

            <CannabisInput
              label="License Expiration Date"
              type="date"
              value={formData.cannabisLicense.expirationDate}
              onChange={(e) => setFormData({ 
                ...formData, 
                cannabisLicense: { ...formData.cannabisLicense, expirationDate: e.target.value }
              })}
              required
            />
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Address Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CannabisInput
                label="Street Address"
                value={formData.address.street}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  address: { ...formData.address, street: e.target.value }
                })}
                placeholder="123 Main Street"
                required
              />

              <CannabisInput
                label="City"
                value={formData.address.city}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  address: { ...formData.address, city: e.target.value }
                })}
                placeholder="Denver"
                required
              />

              <CannabisInput
                label="State"
                value={formData.address.state}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  address: { ...formData.address, state: e.target.value }
                })}
                placeholder="CO"
                required
              />

              <CannabisInput
                label="ZIP Code"
                value={formData.address.zipCode}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  address: { ...formData.address, zipCode: e.target.value }
                })}
                placeholder="80202"
                required
              />
            </div>
          </div>

          <CannabisTextArea
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe the vendor's specialties and services..."
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
              {mode === 'create' ? 'Add Vendor' : 'Save Changes'}
            </CannabisButton>
          </div>
        </form>
      </div>
    </div>
  )
}

/**
 * Cannabis vendor details modal - simplified
 */
function CannabisVendorDetailsModal({
  vendor,
  onClose,
  onEdit
}: {
  vendor: CannabisVendor
  onClose: () => void
  onEdit: () => void
}) {
  const statusConfig = VENDOR_STATUSES[vendor.status as keyof typeof VENDOR_STATUSES]
  const StatusIcon = statusConfig.icon
  const businessTypeConfig = VENDOR_BUSINESS_TYPES[vendor.businessType as keyof typeof VENDOR_BUSINESS_TYPES]
  const BusinessTypeIcon = businessTypeConfig.icon

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h2 className="text-lg font-semibold text-cultivateco-green">
                {vendor.companyName}
              </h2>
              <CannabisBadge variant={statusConfig.color as any}>
                <StatusIcon className="w-3 h-3 mr-1" />
                {statusConfig.label}
              </CannabisBadge>
              {vendor.vendorType === 'preferred' && (
                <CannabisBadge variant="success">
                  <Star className="w-3 h-3 mr-1" />
                  Preferred
                </CannabisBadge>
              )}
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Contact Information */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
                <BusinessTypeIcon className="w-4 h-4" />
                <span>Contact Information</span>
              </h3>
              <div className="space-y-2 text-sm">
                <div><span className="text-gray-600">Contact:</span> <span className="ml-2">{vendor.contactName}</span></div>
                <div><span className="text-gray-600">Email:</span> <span className="ml-2">{vendor.email}</span></div>
                <div><span className="text-gray-600">Phone:</span> <span className="ml-2">{vendor.phone}</span></div>
                {vendor.website && (
                  <div>
                    <span className="text-gray-600">Website:</span> 
                    <a href={vendor.website} target="_blank" rel="noopener noreferrer" className="ml-2 text-cultivateco-blue hover:underline">
                      {vendor.website}
                    </a>
                  </div>
                )}
                <div><span className="text-gray-600">Vendor ID:</span> <CannabisCopyToClipboard text={vendor.vendorId} className="ml-2" /></div>
              </div>
            </div>

            {/* Business Information */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Business Information</h3>
              <div className="space-y-2 text-sm">
                <div><span className="text-gray-600">Type:</span> <span className="ml-2">{businessTypeConfig.label}</span></div>
                <div><span className="text-gray-600">Vendor Type:</span> <span className="ml-2">{VENDOR_TYPES[vendor.vendorType as keyof typeof VENDOR_TYPES].label}</span></div>
                <div><span className="text-gray-600">Payment Terms:</span> <span className="ml-2">{vendor.paymentTerms}</span></div>
                <div><span className="text-gray-600">Credit Limit:</span> <span className="ml-2">{formatCurrency(vendor.creditLimit)}</span></div>
                <div><span className="text-gray-600">Onboarded:</span> <span className="ml-2">{formatDate(vendor.onboardingDate)}</span></div>
              </div>
            </div>

            {/* Cannabis License */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Cannabis License</h3>
              <div className="space-y-2 text-sm">
                <div><span className="text-gray-600">License #:</span> <CannabisCopyToClipboard text={vendor.cannabisLicense.licenseNumber} className="ml-2" /></div>
                <div><span className="text-gray-600">Type:</span> <span className="ml-2">{vendor.cannabisLicense.licenseType}</span></div>
                <div><span className="text-gray-600">State:</span> <span className="ml-2">{vendor.cannabisLicense.issuingState}</span></div>
                <div><span className="text-gray-600">Status:</span> 
                  <CannabisBadge 
                    variant={vendor.cannabisLicense.status === 'active' ? 'success' : 'violation'} 
                    size="sm" 
                    className="ml-2"
                  >
                    {vendor.cannabisLicense.status.toUpperCase()}
                  </CannabisBadge>
                </div>
                <div><span className="text-gray-600">Expires:</span> <span className="ml-2">{formatDate(vendor.cannabisLicense.expirationDate)}</span></div>
              </div>
            </div>
          </div>

          {/* Address */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Address</h3>
            <div className="bg-gray-50 p-3 rounded text-sm">
              {vendor.address.street}<br />
              {vendor.address.city}, {vendor.address.state} {vendor.address.zipCode}
            </div>
          </div>

          {/* Specialties */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Specialties</h3>
            <div className="flex flex-wrap gap-2">
              {vendor.specialties.map((specialty, index) => (
                <CannabisBadge key={index} variant="info" size="sm">
                  {specialty}
                </CannabisBadge>
              ))}
            </div>
          </div>

          {/* Performance Metrics */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Performance Metrics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-3 rounded">
                <div className="text-xs text-gray-600">Total Spend</div>
                <div className="font-medium text-cultivateco-green">{formatCurrency(vendor.metrics.totalSpend)}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <div className="text-xs text-gray-600">Total Orders</div>
                <div className="font-medium">{vendor.metrics.totalOrders}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <div className="text-xs text-gray-600">Quality Rating</div>
                <div className="font-medium">{vendor.metrics.qualityRating}/5</div>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <div className="text-xs text-gray-600">On-Time Delivery</div>
                <div className="font-medium">{vendor.metrics.onTimeDeliveryRate}%</div>
              </div>
            </div>
          </div>

          {/* Description */}
          {vendor.description && (
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Description</h3>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{vendor.description}</p>
            </div>
          )}

          <div className="flex space-x-4">
            <CannabisButton
              onClick={onEdit}
              variant="primary"
              icon={Edit}
              className="flex-1"
            >
              Edit Vendor
            </CannabisButton>
            
            <CannabisButton
              onClick={() => console.log('Contact vendor')}
              variant="outline"
              icon={MessageCircle}
              className="flex-1"
            >
              Contact Vendor
            </CannabisButton>
          </div>
        </div>
      </div>
    </div>
  )
}
