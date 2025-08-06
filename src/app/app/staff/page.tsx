'use client'

import { useState, useMemo } from 'react'
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Download, 
  Upload, 
  UserCheck, 
  UserX, 
  Shield, 
  Award,
  TrendingUp, 
  TrendingDown,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  DollarSign,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  GraduationCap,
  FileText,
  Key,
  Settings,
  RefreshCw,
  X,
  Save,
  Star,
  Target,
  Activity,
  IdCard,
  Certificate,
  Lock,
  Unlock,
  UserPlus,
  Send,
  MessageCircle,
  BarChart3,
  TrendingUpIcon,
  Zap,
  Building,
  CreditCard,
  Percent,
  Timer,
  Flag,
  Camera,
  Fingerprint,
  Smartphone
} from 'lucide-react'
import {
  useCannabisStaff,
  useCannabisCreateStaff,
  useCannabisUpdateStaff,
  useCannabisDeleteStaff,
  useCannabisStaffMetrics,
  useCannabisRoles,
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
 * CultivateCo Cannabis Staff Management
 * =============================================================================
 * Comprehensive cannabis staff management with licensing, compliance, and role-based access
 */

interface CannabisStaffMember {
  id: string
  employeeId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  avatar?: string
  
  // Employment details
  position: string
  department: 'management' | 'budtender' | 'compliance' | 'security' | 'cultivation' | 'processing' | 'admin'
  role: 'admin' | 'manager' | 'supervisor' | 'budtender' | 'compliance-officer' | 'security' | 'cultivator'
  employmentType: 'full-time' | 'part-time' | 'contractor' | 'intern'
  status: 'active' | 'inactive' | 'suspended' | 'terminated' | 'on-leave'
  hireDate: string
  terminationDate?: string
  
  // Compensation
  hourlyRate?: number
  salary?: number
  commissionRate?: number
  bonusEligible: boolean
  
  // Cannabis industry licensing & compliance
  cannabisLicense: {
    licenseNumber: string
    licenseType: 'agent' | 'key-employee' | 'manager' | 'budtender'
    issueDate: string
    expirationDate: string
    issuingState: string
    status: 'active' | 'expired' | 'suspended' | 'pending'
  }
  
  // Training & certifications
  training: Array<{
    id: string
    name: string
    type: 'compliance' | 'safety' | 'product-knowledge' | 'customer-service' | 'security'
    completedDate: string
    expirationDate?: string
    score?: number
    certificateUrl?: string
    required: boolean
  }>
  
  // Permissions & access
  permissions: {
    pos: boolean
    inventory: boolean
    customers: boolean
    reports: boolean
    compliance: boolean
    staff: boolean
    settings: boolean
    financials: boolean
  }
  accessLevel: 'basic' | 'standard' | 'advanced' | 'admin'
  
  // Performance metrics
  metrics: {
    totalSales: number
    averageTransactionValue: number
    customerRating: number
    complianceScore: number
    punctualityScore: number
    trainingCompliance: number
  }
  
  // Background check & compliance
  backgroundCheck: {
    completed: boolean
    completedDate?: string
    status: 'clear' | 'pending' | 'flagged' | 'failed'
    expirationDate?: string
  }
  
  // Contact & emergency information
  address: {
    street: string
    city: string
    state: string
    zipCode: string
  }
  emergencyContact: {
    name: string
    relationship: string
    phone: string
  }
  
  // System access
  lastLoginDate?: string
  twoFactorEnabled: boolean
  accountLocked: boolean
  
  // Audit trail
  createdAt: string
  updatedAt: string
  createdBy: string
  updatedBy: string
}

interface StaffFilters {
  department: string
  role: string
  status: string
  employmentType: string
  accessLevel: string
  licenseStatus: string
  search: string
  showExpiringSoon: boolean
}

type StaffSortField = 'name' | 'hireDate' | 'position' | 'totalSales' | 'complianceScore' | 'lastLogin'
type StaffSortDirection = 'asc' | 'desc'

const CANNABIS_DEPARTMENTS = {
  'management': { label: 'Management', color: 'purple' },
  'budtender': { label: 'Budtender', color: 'green' },
  'compliance': { label: 'Compliance', color: 'blue' },
  'security': { label: 'Security', color: 'red' },
  'cultivation': { label: 'Cultivation', color: 'green' },
  'processing': { label: 'Processing', color: 'amber' },
  'admin': { label: 'Administration', color: 'gray' }
}

const STAFF_ROLES = {
  'admin': { label: 'Administrator', level: 5, color: 'purple' },
  'manager': { label: 'Manager', level: 4, color: 'blue' },
  'supervisor': { label: 'Supervisor', level: 3, color: 'green' },
  'budtender': { label: 'Budtender', level: 2, color: 'amber' },
  'compliance-officer': { label: 'Compliance Officer', level: 4, color: 'red' },
  'security': { label: 'Security', level: 3, color: 'red' },
  'cultivator': { label: 'Cultivator', level: 2, color: 'green' }
}

const EMPLOYMENT_STATUSES = {
  'active': { label: 'Active', color: 'success', icon: UserCheck },
  'inactive': { label: 'Inactive', color: 'warning', icon: UserX },
  'suspended': { label: 'Suspended', color: 'violation', icon: Lock },
  'terminated': { label: 'Terminated', color: 'violation', icon: XCircle },
  'on-leave': { label: 'On Leave', color: 'info', icon: Clock }
}

export default function CannabisStaffPage() {
  // Cannabis staff state
  const [filters, setFilters] = useState<StaffFilters>({
    department: 'all',
    role: 'all',
    status: 'all',
    employmentType: 'all',
    accessLevel: 'all',
    licenseStatus: 'all',
    search: '',
    showExpiringSoon: false
  })
  const [sortField, setSortField] = useState<StaffSortField>('name')
  const [sortDirection, setSortDirection] = useState<StaffSortDirection>('asc')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState<Set<string>>(new Set())
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showStaffDetails, setShowStaffDetails] = useState(false)
  const [selectedStaffMember, setSelectedStaffMember] = useState<CannabisStaffMember | null>(null)

  // Cannabis API hooks
  const { 
    data: staffResponse, 
    isLoading: staffLoading, 
    error: staffError,
    refetch: refetchStaff 
  } = useCannabisStaff({
    page: 1,
    limit: 100,
    department: filters.department !== 'all' ? filters.department : undefined,
    role: filters.role !== 'all' ? filters.role : undefined,
    status: filters.status !== 'all' ? filters.status : undefined,
    search: filters.search || undefined
  })

  const { data: staffMetrics } = useCannabisStaffMetrics()
  const { data: rolesResponse } = useCannabisRoles()

  const createStaffMutation = useCannabisCreateStaff()
  const updateStaffMutation = useCannabisUpdateStaff()
  const deleteStaffMutation = useCannabisDeleteStaff()
  const uploadFileMutation = useCannabisFileUpload()

  // Cannabis staff data processing
  const staff = staffResponse?.data || []
  const roles = rolesResponse?.data || []

  // Cannabis staff filtering and sorting
  const filteredAndSortedStaff = useMemo(() => {
    let filtered = staff.filter((member: CannabisStaffMember) => {
      const matchesDepartment = filters.department === 'all' || member.department === filters.department
      const matchesRole = filters.role === 'all' || member.role === filters.role
      const matchesStatus = filters.status === 'all' || member.status === filters.status
      const matchesEmploymentType = filters.employmentType === 'all' || member.employmentType === filters.employmentType
      const matchesAccessLevel = filters.accessLevel === 'all' || member.accessLevel === filters.accessLevel
      const matchesLicenseStatus = filters.licenseStatus === 'all' || member.cannabisLicense.status === filters.licenseStatus
      const matchesSearch = !filters.search || 
        `${member.firstName} ${member.lastName}`.toLowerCase().includes(filters.search.toLowerCase()) ||
        member.email.toLowerCase().includes(filters.search.toLowerCase()) ||
        member.employeeId.toLowerCase().includes(filters.search.toLowerCase()) ||
        member.position.toLowerCase().includes(filters.search.toLowerCase())

      let matchesExpirationFilter = true
      if (filters.showExpiringSoon) {
        const thirtyDaysFromNow = new Date()
        thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30)
        const licenseExpiry = new Date(member.cannabisLicense.expirationDate)
        const hasExpiringTraining = member.training.some(t => {
          if (!t.expirationDate) return false
          const trainingExpiry = new Date(t.expirationDate)
          return trainingExpiry <= thirtyDaysFromNow
        })
        matchesExpirationFilter = licenseExpiry <= thirtyDaysFromNow || hasExpiringTraining
      }

      return matchesDepartment && matchesRole && matchesStatus && 
             matchesEmploymentType && matchesAccessLevel && matchesLicenseStatus && 
             matchesSearch && matchesExpirationFilter
    })

    // Cannabis staff sorting
    filtered.sort((a: CannabisStaffMember, b: CannabisStaffMember) => {
      let aVal, bVal

      switch (sortField) {
        case 'name':
          aVal = `${a.firstName} ${a.lastName}`.toLowerCase()
          bVal = `${b.firstName} ${b.lastName}`.toLowerCase()
          break
        case 'hireDate':
          aVal = new Date(a.hireDate).getTime()
          bVal = new Date(b.hireDate).getTime()
          break
        case 'position':
          aVal = a.position.toLowerCase()
          bVal = b.position.toLowerCase()
          break
        case 'totalSales':
          aVal = a.metrics.totalSales
          bVal = b.metrics.totalSales
          break
        case 'complianceScore':
          aVal = a.metrics.complianceScore
          bVal = b.metrics.complianceScore
          break
        case 'lastLogin':
          aVal = a.lastLoginDate ? new Date(a.lastLoginDate).getTime() : 0
          bVal = b.lastLoginDate ? new Date(b.lastLoginDate).getTime() : 0
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
  }, [staff, filters, sortField, sortDirection])

  // Cannabis staff analytics
  const staffAnalytics = useMemo(() => {
    const totalStaff = staff.length
    const activeStaff = staff.filter((s: CannabisStaffMember) => s.status === 'active').length
    const budtenders = staff.filter((s: CannabisStaffMember) => s.role === 'budtender').length
    
    // License expiration warnings
    const thirtyDaysFromNow = new Date()
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30)
    const expiringLicenses = staff.filter((s: CannabisStaffMember) => {
      const licenseExpiry = new Date(s.cannabisLicense.expirationDate)
      return licenseExpiry <= thirtyDaysFromNow && s.status === 'active'
    }).length
    
    // Training compliance
    const totalTrainingRequired = staff.reduce((sum: number, s: CannabisStaffMember) => 
      sum + s.training.filter(t => t.required).length, 0)
    const completedTraining = staff.reduce((sum: number, s: CannabisStaffMember) => 
      sum + s.training.filter(t => t.required && t.completedDate).length, 0)
    const trainingComplianceRate = totalTrainingRequired > 0 ? (completedTraining / totalTrainingRequired) * 100 : 100
    
    // Performance metrics
    const avgComplianceScore = staff.length > 0 ? 
      staff.reduce((sum: number, s: CannabisStaffMember) => sum + s.metrics.complianceScore, 0) / staff.length : 0
    const avgCustomerRating = staff.length > 0 ? 
      staff.reduce((sum: number, s: CannabisStaffMember) => sum + s.metrics.customerRating, 0) / staff.length : 0
    const totalStaffSales = staff.reduce((sum: number, s: CannabisStaffMember) => sum + s.metrics.totalSales, 0)

    return {
      totalStaff,
      activeStaff,
      budtenders,
      expiringLicenses,
      trainingComplianceRate,
      avgComplianceScore,
      avgCustomerRating,
      totalStaffSales
    }
  }, [staff])

  /**
   * Handle cannabis staff operations
   */
  const handleFilterChange = (key: keyof StaffFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleSort = (field: StaffSortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const handleSelectStaff = (staffId: string) => {
    const newSelected = new Set(selectedStaff)
    if (newSelected.has(staffId)) {
      newSelected.delete(staffId)
    } else {
      newSelected.add(staffId)
    }
    setSelectedStaff(newSelected)
  }

  const handleSelectAll = () => {
    if (selectedStaff.size === filteredAndSortedStaff.length) {
      setSelectedStaff(new Set())
    } else {
      setSelectedStaff(new Set(filteredAndSortedStaff.map((member: CannabisStaffMember) => member.id)))
    }
  }

  const handleStatusUpdate = (staffId: string, newStatus: string) => {
    updateStaffMutation.mutate({
      staffId,
      staffData: { status: newStatus }
    })
  }

  const handleBulkAction = (action: 'activate' | 'deactivate' | 'suspend' | 'send-training' | 'export') => {
    console.log(`Bulk ${action} for staff:`, Array.from(selectedStaff))
    setSelectedStaff(new Set())
  }

  if (staffLoading) {
    return (
      <div className="space-y-6">
        <CannabisStaffHeader 
          onRefresh={() => {}} 
          onAddStaff={() => {}} 
          onImport={() => {}}
          onExport={() => {}}
        />
        <CannabisLoadingSpinner size="lg" text="Loading cannabis staff..." />
      </div>
    )
  }

  if (staffError) {
    return (
      <div className="space-y-6">
        <CannabisStaffHeader 
          onRefresh={refetchStaff} 
          onAddStaff={() => setShowAddModal(true)} 
          onImport={() => console.log('Import staff')}
          onExport={() => console.log('Export staff')}
        />
        <CannabisAlert
          type="error"
          title="Cannabis Staff Error"
          message="Failed to load cannabis staff. Please try again."
          action={{ label: 'Retry', onClick: refetchStaff }}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Cannabis Staff Header */}
      <CannabisStaffHeader 
        onRefresh={refetchStaff} 
        onAddStaff={() => setShowAddModal(true)} 
        onImport={() => console.log('Import staff')}
        onExport={() => console.log('Export staff')}
      />

      {/* Cannabis Staff Analytics */}
      <CannabisStaffAnalytics analytics={staffAnalytics} />

      {/* Cannabis Staff Alerts */}
      {staffAnalytics.expiringLicenses > 0 && (
        <CannabisAlert
          type="warning"
          title="License Expiration Alert"
          message={`${staffAnalytics.expiringLicenses} staff member${staffAnalytics.expiringLicenses !== 1 ? 's have' : ' has'} cannabis licenses expiring within 30 days.`}
          action={{ 
            label: 'View Expiring', 
            onClick: () => handleFilterChange('showExpiringSoon', true) 
          }}
        />
      )}

      {/* Cannabis Staff Filters */}
      <CannabisStaffFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
      />

      {/* Cannabis Bulk Actions */}
      {selectedStaff.size > 0 && (
        <CannabisStaffBulkActions
          selectedCount={selectedStaff.size}
          onBulkAction={handleBulkAction}
          onClearSelection={() => setSelectedStaff(new Set())}
        />
      )}

      {/* Cannabis Staff Table */}
      <CannabisThemeContainer variant="card">
        <CannabisStaffTable
          staff={filteredAndSortedStaff}
          selectedStaff={selectedStaff}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
          onSelectStaff={handleSelectStaff}
          onSelectAll={handleSelectAll}
          onViewStaff={(member) => {
            setSelectedStaffMember(member)
            setShowStaffDetails(true)
          }}
          onEditStaff={(member) => {
            setSelectedStaffMember(member)
            setShowEditModal(true)
          }}
          onStatusUpdate={handleStatusUpdate}
          onDeleteStaff={(staffId) => deleteStaffMutation.mutate(staffId)}
        />
      </CannabisThemeContainer>

      {/* Cannabis Add Staff Modal */}
      {showAddModal && (
        <CannabisStaffModal
          mode="create"
          roles={roles}
          onClose={() => setShowAddModal(false)}
          onSubmit={(staffData) => {
            createStaffMutation.mutate(staffData, {
              onSuccess: () => setShowAddModal(false)
            })
          }}
          isSubmitting={createStaffMutation.isPending}
        />
      )}

      {/* Cannabis Edit Staff Modal */}
      {showEditModal && selectedStaffMember && (
        <CannabisStaffModal
          mode="edit"
          staff={selectedStaffMember}
          roles={roles}
          onClose={() => {
            setShowEditModal(false)
            setSelectedStaffMember(null)
          }}
          onSubmit={(staffData) => {
            updateStaffMutation.mutate(
              { staffId: selectedStaffMember.id, staffData },
              {
                onSuccess: () => {
                  setShowEditModal(false)
                  setSelectedStaffMember(null)
                }
              }
            )
          }}
          isSubmitting={updateStaffMutation.isPending}
        />
      )}

      {/* Cannabis Staff Details Modal */}
      {showStaffDetails && selectedStaffMember && (
        <CannabisStaffDetailsModal
          staff={selectedStaffMember}
          onClose={() => {
            setShowStaffDetails(false)
            setSelectedStaffMember(null)
          }}
          onEdit={() => {
            setShowStaffDetails(false)
            setShowEditModal(true)
          }}
        />
      )}
    </div>
  )
}

/**
 * Cannabis staff page header
 */
function CannabisStaffHeader({
  onRefresh,
  onAddStaff,
  onImport,
  onExport
}: {
  onRefresh: () => void
  onAddStaff: () => void
  onImport: () => void
  onExport: () => void
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-cultivateco-green flex items-center space-x-2">
          <Users className="w-6 h-6" />
          <span>Cannabis Staff Management</span>
        </h1>
        <p className="text-gray-600">
          Manage cannabis staff, licensing, training, and compliance
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
          onClick={onAddStaff}
          icon={UserPlus}
        >
          Add Staff
        </CannabisButton>
      </div>
    </div>
  )
}

/**
 * Cannabis staff analytics cards
 */
function CannabisStaffAnalytics({ 
  analytics 
}: { 
  analytics: {
    totalStaff: number
    activeStaff: number
    budtenders: number
    expiringLicenses: number
    trainingComplianceRate: number
    avgComplianceScore: number
    avgCustomerRating: number
    totalStaffSales: number
  }
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-6">
      <CannabisMetricCard
        title="Total Staff"
        value={analytics.totalStaff}
        icon={Users}
        color="green"
      />

      <CannabisMetricCard
        title="Active Staff"
        value={analytics.activeStaff}
        icon={UserCheck}
        color="blue"
      />

      <CannabisMetricCard
        title="Budtenders"
        value={analytics.budtenders}
        icon={Briefcase}
        color="green"
      />

      <CannabisMetricCard
        title="Expiring Licenses"
        value={analytics.expiringLicenses}
        icon={AlertTriangle}
        color={analytics.expiringLicenses > 0 ? 'red' : 'green'}
      />

      <CannabisMetricCard
        title="Training Compliance"
        value={`${analytics.trainingComplianceRate.toFixed(1)}%`}
        icon={GraduationCap}
        color={analytics.trainingComplianceRate >= 80 ? 'green' : analytics.trainingComplianceRate >= 60 ? 'amber' : 'red'}
      />

      <CannabisMetricCard
        title="Avg Compliance Score"
        value={`${analytics.avgComplianceScore.toFixed(1)}%`}
        icon={Shield}
        color={analytics.avgComplianceScore >= 90 ? 'green' : analytics.avgComplianceScore >= 70 ? 'amber' : 'red'}
      />

      <CannabisMetricCard
        title="Customer Rating"
        value={`${analytics.avgCustomerRating.toFixed(1)}/5`}
        icon={Star}
        color={analytics.avgCustomerRating >= 4.5 ? 'green' : analytics.avgCustomerRating >= 3.5 ? 'amber' : 'red'}
      />

      <CannabisMetricCard
        title="Staff Sales"
        value={formatCurrency(analytics.totalStaffSales)}
        icon={DollarSign}
        color="purple"
      />
    </div>
  )
}

/**
 * Cannabis staff filters
 */
function CannabisStaffFilters({
  filters,
  onFilterChange,
  showFilters,
  onToggleFilters
}: {
  filters: StaffFilters
  onFilterChange: (key: keyof StaffFilters, value: any) => void
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
              placeholder="Search staff members, positions, employee IDs..."
              showFilter={true}
              onFilter={onToggleFilters}
            />
          </div>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onFilterChange('showExpiringSoon', !filters.showExpiringSoon)}
            className={cn(
              'px-3 py-1 rounded-full text-sm font-medium transition-colors flex items-center space-x-1',
              filters.showExpiringSoon
                ? 'bg-amber-100 text-amber-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            )}
          >
            <AlertTriangle className="w-3 h-3" />
            <span>Expiring Soon</span>
          </button>

          {Object.entries(CANNABIS_DEPARTMENTS).map(([key, dept]) => (
            <button
              key={key}
              onClick={() => onFilterChange('department', filters.department === key ? 'all' : key)}
              className={cn(
                'px-3 py-1 rounded-full text-sm font-medium transition-colors',
                filters.department === key
                  ? 'bg-cultivateco-green text-cultivateco-cream'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              )}
            >
              {dept.label}
            </button>
          ))}
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 pt-4 border-t border-gray-200">
            <CannabisSelect
              label="Role"
              value={filters.role}
              onChange={(e) => onFilterChange('role', e.target.value)}
              options={[
                { value: 'all', label: 'All Roles' },
                ...Object.entries(STAFF_ROLES).map(([key, role]) => ({
                  value: key,
                  label: role.label
                }))
              ]}
            />

            <CannabisSelect
              label="Status"
              value={filters.status}
              onChange={(e) => onFilterChange('status', e.target.value)}
              options={[
                { value: 'all', label: 'All Statuses' },
                ...Object.entries(EMPLOYMENT_STATUSES).map(([key, status]) => ({
                  value: key,
                  label: status.label
                }))
              ]}
            />

            <CannabisSelect
              label="Employment Type"
              value={filters.employmentType}
              onChange={(e) => onFilterChange('employmentType', e.target.value)}
              options={[
                { value: 'all', label: 'All Types' },
                { value: 'full-time', label: 'Full-Time' },
                { value: 'part-time', label: 'Part-Time' },
                { value: 'contractor', label: 'Contractor' },
                { value: 'intern', label: 'Intern' }
              ]}
            />

            <CannabisSelect
              label="Access Level"
              value={filters.accessLevel}
              onChange={(e) => onFilterChange('accessLevel', e.target.value)}
              options={[
                { value: 'all', label: 'All Levels' },
                { value: 'basic', label: 'Basic' },
                { value: 'standard', label: 'Standard' },
                { value: 'advanced', label: 'Advanced' },
                { value: 'admin', label: 'Admin' }
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
                { value: 'pending', label: 'Pending' }
              ]}
            />
          </div>
        )}
      </div>
    </CannabisThemeContainer>
  )
}

/**
 * Cannabis staff bulk actions bar
 */
function CannabisStaffBulkActions({
  selectedCount,
  onBulkAction,
  onClearSelection
}: {
  selectedCount: number
  onBulkAction: (action: 'activate' | 'deactivate' | 'suspend' | 'send-training' | 'export') => void
  onClearSelection: () => void
}) {
  return (
    <CannabisThemeContainer variant="card">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-900">
            {selectedCount} staff member{selectedCount !== 1 ? 's' : ''} selected
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
              onClick={() => onBulkAction('send-training')}
            >
              Send Training
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
 * Cannabis staff table
 */
function CannabisStaffTable({
  staff,
  selectedStaff,
  sortField,
  sortDirection,
  onSort,
  onSelectStaff,
  onSelectAll,
  onViewStaff,
  onEditStaff,
  onStatusUpdate,
  onDeleteStaff
}: {
  staff: CannabisStaffMember[]
  selectedStaff: Set<string>
  sortField: StaffSortField
  sortDirection: StaffSortDirection
  onSort: (field: StaffSortField) => void
  onSelectStaff: (staffId: string) => void
  onSelectAll: () => void
  onViewStaff: (staff: CannabisStaffMember) => void
  onEditStaff: (staff: CannabisStaffMember) => void
  onStatusUpdate: (staffId: string, status: string) => void
  onDeleteStaff: (staffId: string) => void
}) {
  const SortIcon = sortDirection === 'asc' ? TrendingUp : TrendingDown

  const renderSortHeader = (field: StaffSortField, label: string) => (
    <button
      onClick={() => onSort(field)}
      className="flex items-center space-x-1 text-left font-medium text-gray-700 hover:text-cultivateco-green"
    >
      <span>{label}</span>
      {sortField === field && <SortIcon className="w-4 h-4" />}
    </button>
  )

  if (staff.length === 0) {
    return (
      <CannabisEmptyState
        icon={Users}
        title="No Cannabis Staff Found"
        description="No cannabis staff members match your current filters. Try adjusting your search criteria or add new staff."
        action={{
          label: 'Add Staff Member',
          onClick: () => console.log('Add staff')
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
                checked={selectedStaff.size === staff.length && staff.length > 0}
                onChange={onSelectAll}
                className="rounded border-gray-300 text-cultivateco-green focus:ring-cultivateco-green"
              />
            </th>
            <th className="px-4 py-3 text-left">
              {renderSortHeader('name', 'Staff Member')}
            </th>
            <th className="px-4 py-3 text-left">
              {renderSortHeader('position', 'Position')}
            </th>
            <th className="px-4 py-3 text-left">Cannabis License</th>
            <th className="px-4 py-3 text-left">
              {renderSortHeader('complianceScore', 'Performance')}
            </th>
            <th className="px-4 py-3 text-left">Training</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">
              {renderSortHeader('lastLogin', 'Last Login')}
            </th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>
        
        <tbody className="divide-y divide-gray-200">
          {staff.map((member: CannabisStaffMember) => (
            <CannabisStaffRow
              key={member.id}
              staff={member}
              isSelected={selectedStaff.has(member.id)}
              onSelect={() => onSelectStaff(member.id)}
              onView={() => onViewStaff(member)}
              onEdit={() => onEditStaff(member)}
              onStatusUpdate={onStatusUpdate}
              onDelete={() => onDeleteStaff(member.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

/**
 * Cannabis staff table row
 */
function CannabisStaffRow({
  staff,
  isSelected,
  onSelect,
  onView,
  onEdit,
  onStatusUpdate,
  onDelete
}: {
  staff: CannabisStaffMember
  isSelected: boolean
  onSelect: () => void
  onView: () => void
  onEdit: () => void
  onStatusUpdate: (staffId: string, status: string) => void
  onDelete: () => void
}) {
  const statusConfig = EMPLOYMENT_STATUSES[staff.status as keyof typeof EMPLOYMENT_STATUSES]
  const StatusIcon = statusConfig.icon
  const roleConfig = STAFF_ROLES[staff.role as keyof typeof STAFF_ROLES]
  const deptConfig = CANNABIS_DEPARTMENTS[staff.department as keyof typeof CANNABIS_DEPARTMENTS]

  // Check for expiring items
  const isLicenseExpiringSoon = () => {
    const thirtyDaysFromNow = new Date()
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30)
    return new Date(staff.cannabisLicense.expirationDate) <= thirtyDaysFromNow
  }

  const hasExpiringTraining = () => {
    const thirtyDaysFromNow = new Date()
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30)
    return staff.training.some(t => {
      if (!t.expirationDate) return false
      return new Date(t.expirationDate) <= thirtyDaysFromNow
    })
  }

  const getTrainingComplianceColor = () => {
    const requiredCount = staff.training.filter(t => t.required).length
    const completedCount = staff.training.filter(t => t.required && t.completedDate).length
    const rate = requiredCount > 0 ? (completedCount / requiredCount) * 100 : 100
    
    if (rate >= 80) return 'text-green-600'
    if (rate >= 60) return 'text-amber-600'
    return 'text-red-600'
  }

  const getLicenseStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success'
      case 'expired': return 'violation'
      case 'suspended': return 'warning'
      case 'pending': return 'info'
      default: return 'info'
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
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            {staff.avatar ? (
              <img 
                src={staff.avatar} 
                alt={`${staff.firstName} ${staff.lastName}`}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <span className="text-sm font-medium text-gray-600">
                {staff.firstName.charAt(0)}{staff.lastName.charAt(0)}
              </span>
            )}
          </div>
          
          <div className="space-y-1">
            <div className="font-medium text-gray-900">
              {staff.firstName} {staff.lastName}
            </div>
            <div className="text-sm text-gray-600">{staff.email}</div>
            <div className="flex items-center space-x-2">
              <CannabisCopyToClipboard text={staff.employeeId} className="text-xs font-mono">
                {staff.employeeId}
              </CannabisCopyToClipboard>
              {staff.twoFactorEnabled && (
                <Shield className="w-3 h-3 text-green-600" title="2FA Enabled" />
              )}
            </div>
          </div>
        </div>
      </td>
      
      <td className="px-4 py-3">
        <div className="space-y-1">
          <div className="font-medium text-gray-900">{staff.position}</div>
          <div className="flex items-center space-x-2">
            <CannabisBadge variant={deptConfig.color as any} size="sm">
              {deptConfig.label}
            </CannabisBadge>
            <CannabisBadge variant={roleConfig.color as any} size="sm">
              {roleConfig.label}
            </CannabisBadge>
          </div>
          <div className="text-xs text-gray-600 capitalize">
            {staff.employmentType.replace('-', ' ')}
          </div>
        </div>
      </td>
      
      <td className="px-4 py-3">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <CannabisBadge 
              variant={getLicenseStatusColor(staff.cannabisLicense.status)} 
              size="sm"
            >
              {staff.cannabisLicense.status.toUpperCase()}
            </CannabisBadge>
            {isLicenseExpiringSoon() && (
              <AlertTriangle className="w-3 h-3 text-amber-500" title="License expiring soon" />
            )}
          </div>
          <div className="text-xs text-gray-600">
            <CannabisCopyToClipboard text={staff.cannabisLicense.licenseNumber}>
              {staff.cannabisLicense.licenseNumber}
            </CannabisCopyToClipboard>
          </div>
          <div className="text-xs text-gray-600">
            Exp: {formatDate(staff.cannabisLicense.expirationDate)}
          </div>
        </div>
      </td>
      
      <td className="px-4 py-3">
        <div className="space-y-1">
          <div className="text-sm">
            <span className="text-gray-600">Compliance:</span>
            <span className={cn('ml-1 font-medium', 
              staff.metrics.complianceScore >= 90 ? 'text-green-600' : 
              staff.metrics.complianceScore >= 70 ? 'text-amber-600' : 'text-red-600'
            )}>
              {staff.metrics.complianceScore}%
            </span>
          </div>
          <div className="text-sm">
            <span className="text-gray-600">Sales:</span>
            <span className="ml-1 font-medium text-cultivateco-green">
              {formatCurrency(staff.metrics.totalSales)}
            </span>
          </div>
          {staff.metrics.customerRating > 0 && (
            <div className="flex items-center space-x-1 text-xs">
              <Star className="w-3 h-3 text-amber-500 fill-current" />
              <span>{staff.metrics.customerRating.toFixed(1)}/5</span>
            </div>
          )}
        </div>
      </td>
      
      <td className="px-4 py-3">
        <div className="space-y-1">
          <div className={cn('text-sm font-medium', getTrainingComplianceColor())}>
            {staff.training.filter(t => t.required && t.completedDate).length}/
            {staff.training.filter(t => t.required).length} Required
          </div>
          {hasExpiringTraining() && (
            <div className="flex items-center space-x-1 text-xs text-amber-600">
              <AlertTriangle className="w-3 h-3" />
              <span>Expiring Soon</span>
            </div>
          )}
          <div className="text-xs text-gray-600">
            {staff.training.filter(t => !t.required).length} Optional
          </div>
        </div>
      </td>
      
      <td className="px-4 py-3">
        <div className="flex items-center space-x-2">
          <CannabisBadge variant={statusConfig.color as any} size="sm">
            <StatusIcon className="w-3 h-3 mr-1" />
            {statusConfig.label}
          </CannabisBadge>
          
          {staff.status === 'active' && (
            <select
              onChange={(e) => onStatusUpdate(staff.id, e.target.value)}
              className="text-xs border border-gray-300 rounded px-2 py-1"
              defaultValue=""
            >
              <option value="" disabled>Update...</option>
              <option value="inactive">Deactivate</option>
              <option value="suspended">Suspend</option>
              <option value="on-leave">On Leave</option>
              <option value="terminated">Terminate</option>
            </select>
          )}
        </div>
      </td>
      
      <td className="px-4 py-3">
        <div className="space-y-1">
          {staff.lastLoginDate ? (
            <div className="text-sm">{formatDate(staff.lastLoginDate)}</div>
          ) : (
            <div className="text-sm text-gray-500">Never</div>
          )}
          {staff.accountLocked && (
            <div className="flex items-center space-x-1 text-xs text-red-600">
              <Lock className="w-3 h-3" />
              <span>Locked</span>
            </div>
          )}
        </div>
      </td>
      
      <td className="px-4 py-3">
        <div className="flex items-center space-x-2">
          <button
            onClick={onView}
            className="text-cultivateco-blue hover:text-cultivateco-green"
            title="View staff details"
          >
            <Eye className="w-4 h-4" />
          </button>
          
          <button
            onClick={onEdit}
            className="text-cultivateco-blue hover:text-cultivateco-green"
            title="Edit staff member"
          >
            <Edit className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => console.log('Send message to', staff.id)}
            className="text-cultivateco-blue hover:text-cultivateco-green"
            title="Send message"
          >
            <MessageCircle className="w-4 h-4" />
          </button>
          
          <button
            onClick={onDelete}
            className="text-gray-400 hover:text-red-600"
            title="Delete staff member"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  )
}

/**
 * Cannabis staff modal - simplified for space
 */
function CannabisStaffModal({
  mode,
  staff,
  roles,
  onClose,
  onSubmit,
  isSubmitting
}: {
  mode: 'create' | 'edit'
  staff?: CannabisStaffMember
  roles: any[]
  onClose: () => void
  onSubmit: (data: any) => void
  isSubmitting: boolean
}) {
  const [formData, setFormData] = useState({
    firstName: staff?.firstName || '',
    lastName: staff?.lastName || '',
    email: staff?.email || '',
    phone: staff?.phone || '',
    position: staff?.position || '',
    department: staff?.department || 'budtender',
    role: staff?.role || 'budtender',
    employmentType: staff?.employmentType || 'full-time',
    hourlyRate: staff?.hourlyRate || 0,
    cannabisLicense: {
      licenseNumber: staff?.cannabisLicense.licenseNumber || '',
      licenseType: staff?.cannabisLicense.licenseType || 'agent',
      expirationDate: staff?.cannabisLicense.expirationDate || ''
    }
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
              {mode === 'create' ? 'Add Cannabis Staff Member' : 'Edit Cannabis Staff Member'}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CannabisInput
              label="First Name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              placeholder="John"
              required
            />

            <CannabisInput
              label="Last Name"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              placeholder="Doe"
              required
            />

            <CannabisInput
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john.doe@example.com"
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
              label="Position"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              placeholder="Senior Budtender"
              required
            />

            <CannabisSelect
              label="Department"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              options={Object.entries(CANNABIS_DEPARTMENTS).map(([key, dept]) => ({
                value: key,
                label: dept.label
              }))}
              required
            />

            <CannabisSelect
              label="Role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              options={Object.entries(STAFF_ROLES).map(([key, role]) => ({
                value: key,
                label: role.label
              }))}
              required
            />

            <CannabisSelect
              label="Employment Type"
              value={formData.employmentType}
              onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
              options={[
                { value: 'full-time', label: 'Full-Time' },
                { value: 'part-time', label: 'Part-Time' },
                { value: 'contractor', label: 'Contractor' },
                { value: 'intern', label: 'Intern' }
              ]}
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
              {mode === 'create' ? 'Add Staff Member' : 'Save Changes'}
            </CannabisButton>
          </div>
        </form>
      </div>
    </div>
  )
}

/**
 * Cannabis staff details modal - simplified
 */
function CannabisStaffDetailsModal({
  staff,
  onClose,
  onEdit
}: {
  staff: CannabisStaffMember
  onClose: () => void
  onEdit: () => void
}) {
  const statusConfig = EMPLOYMENT_STATUSES[staff.status as keyof typeof EMPLOYMENT_STATUSES]
  const StatusIcon = statusConfig.icon

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h2 className="text-lg font-semibold text-cultivateco-green">
                {staff.firstName} {staff.lastName}
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Personal Information */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Personal Information</h3>
              <div className="space-y-2 text-sm">
                <div><span className="text-gray-600">Employee ID:</span> <CannabisCopyToClipboard text={staff.employeeId} className="ml-2" /></div>
                <div><span className="text-gray-600">Email:</span> <span className="ml-2">{staff.email}</span></div>
                <div><span className="text-gray-600">Phone:</span> <span className="ml-2">{staff.phone}</span></div>
                <div><span className="text-gray-600">Hire Date:</span> <span className="ml-2">{formatDate(staff.hireDate)}</span></div>
              </div>
            </div>

            {/* Position Information */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Position Information</h3>
              <div className="space-y-2 text-sm">
                <div><span className="text-gray-600">Position:</span> <span className="ml-2">{staff.position}</span></div>
                <div><span className="text-gray-600">Department:</span> <span className="ml-2">{CANNABIS_DEPARTMENTS[staff.department as keyof typeof CANNABIS_DEPARTMENTS].label}</span></div>
                <div><span className="text-gray-600">Role:</span> <span className="ml-2">{STAFF_ROLES[staff.role as keyof typeof STAFF_ROLES].label}</span></div>
                <div><span className="text-gray-600">Type:</span> <span className="ml-2 capitalize">{staff.employmentType.replace('-', ' ')}</span></div>
              </div>
            </div>

            {/* Cannabis License */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Cannabis License</h3>
              <div className="space-y-2 text-sm">
                <div><span className="text-gray-600">License #:</span> <CannabisCopyToClipboard text={staff.cannabisLicense.licenseNumber} className="ml-2" /></div>
                <div><span className="text-gray-600">Type:</span> <span className="ml-2 capitalize">{staff.cannabisLicense.licenseType.replace('-', ' ')}</span></div>
                <div><span className="text-gray-600">Status:</span> 
                  <CannabisBadge 
                    variant={staff.cannabisLicense.status === 'active' ? 'success' : 'violation'} 
                    size="sm" 
                    className="ml-2"
                  >
                    {staff.cannabisLicense.status.toUpperCase()}
                  </CannabisBadge>
                </div>
                <div><span className="text-gray-600">Expires:</span> <span className="ml-2">{formatDate(staff.cannabisLicense.expirationDate)}</span></div>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Performance Metrics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-3 rounded">
                <div className="text-xs text-gray-600">Total Sales</div>
                <div className="font-medium text-cultivateco-green">{formatCurrency(staff.metrics.totalSales)}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <div className="text-xs text-gray-600">Compliance Score</div>
                <div className="font-medium">{staff.metrics.complianceScore}%</div>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <div className="text-xs text-gray-600">Customer Rating</div>
                <div className="font-medium">{staff.metrics.customerRating}/5</div>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <div className="text-xs text-gray-600">Training Compliance</div>
                <div className="font-medium">{staff.metrics.trainingCompliance}%</div>
              </div>
            </div>
          </div>

          {/* Training & Certifications */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Training & Certifications</h3>
            <div className="space-y-2">
              {staff.training.map((training, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div>
                    <div className="font-medium text-sm">{training.name}</div>
                    <div className="text-xs text-gray-600 capitalize">{training.type.replace('-', ' ')}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">{formatDate(training.completedDate)}</div>
                    {training.expirationDate && (
                      <div className="text-xs text-gray-600">Exp: {formatDate(training.expirationDate)}</div>
                    )}
                    {training.required && (
                      <CannabisBadge variant="info" size="sm">Required</CannabisBadge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-4">
            <CannabisButton
              onClick={onEdit}
              variant="primary"
              icon={Edit}
              className="flex-1"
            >
              Edit Staff Member
            </CannabisButton>
          </div>
        </div>
      </div>
    </div>
  )
}
