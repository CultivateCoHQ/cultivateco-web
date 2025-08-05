'use client'

import { useState, useMemo } from 'react'
import { 
  Package, 
  AlertTriangle, 
  Plus, 
  Edit, 
  Trash2, 
  Download, 
  Upload, 
  Filter, 
  SortAsc, 
  SortDesc,
  BarChart3,
  Clock,
  MapPin,
  Eye,
  RefreshCw,
  Calendar,
  Leaf,
  ShoppingCart,
  CheckCircle,
  XCircle,
  ExternalLink,
  Search
} from 'lucide-react'
import {
  useCannabisInventory,
  useCannabisInventoryAlerts,
  useCannabisUpdateInventory,
  useCannabisReceiveInventory,
  useCannabisProducts,
  useCannabisMetrcSyncStatus,
  useCannabisTriggerMetrcSync
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
  CannabisCopyToClipboard
} from '@/components/ui/cannabis-components'
import { CannabisThemeContainer, CannabisStatusIndicator } from '@/providers/theme-provider'
import { formatCurrency, formatCannabisWeight, formatDate, cn } from '@/lib/utils'

/**
 * =============================================================================
 * CultivateCo Cannabis Inventory Management Page
 * =============================================================================
 * Comprehensive inventory tracking with METRC integration and compliance monitoring
 */

interface InventoryItem {
  id: string
  productId: string
  productName: string
  productCategory: string
  sku: string
  batchNumber: string
  quantity: number
  unit: string
  location: string
  cost: number
  expirationDate?: string
  metrcPackageId?: string
  lastUpdated: string
  status: 'active' | 'expired' | 'recalled' | 'sold'
  thcPercentage?: number
  cbdPercentage?: number
  supplier: string
  receiveDate: string
}

interface InventoryAlert {
  id: string
  type: 'low_stock' | 'expiring' | 'expired' | 'missing_metrc' | 'compliance_issue'
  title: string
  message: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  itemId: string
  productName: string
  actionRequired: boolean
  createdAt: string
}

type SortField = 'productName' | 'quantity' | 'expirationDate' | 'lastUpdated' | 'cost'
type SortDirection = 'asc' | 'desc'

export default function CannabisInventoryPage() {
  // Cannabis inventory state
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [locationFilter, setLocationFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortField, setSortField] = useState<SortField>('productName')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())
  const [showReceiveModal, setShowReceiveModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null)

  // Cannabis API hooks
  const { 
    data: inventoryResponse, 
    isLoading: inventoryLoading, 
    error: inventoryError,
    refetch: refetchInventory 
  } = useCannabisInventory({
    page: 1,
    limit: 100,
    lowStock: statusFilter === 'low_stock',
    expiring: statusFilter === 'expiring'
  })

  const { 
    data: alerts, 
    isLoading: alertsLoading 
  } = useCannabisInventoryAlerts()

  const { 
    data: metrcStatus, 
    isLoading: metrcLoading 
  } = useCannabisMetrcSyncStatus()

  const { 
    data: productsResponse 
  } = useCannabisProducts({ limit: 1000 })

  const updateInventoryMutation = useCannabisUpdateInventory()
  const receiveInventoryMutation = useCannabisReceiveInventory()
  const triggerMetrcSyncMutation = useCannabisTriggerMetrcSync()

  // Cannabis inventory data processing
  const inventory = inventoryResponse?.data || []
  const products = productsResponse?.data || []

  // Cannabis inventory filtering and sorting
  const filteredAndSortedInventory = useMemo(() => {
    let filtered = inventory.filter((item: InventoryItem) => {
      const matchesSearch = !searchQuery || 
        item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.batchNumber.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = categoryFilter === 'all' || item.productCategory === categoryFilter
      const matchesLocation = locationFilter === 'all' || item.location === locationFilter
      
      const matchesStatus = statusFilter === 'all' || (() => {
        if (statusFilter === 'low_stock') return item.quantity <= 10
        if (statusFilter === 'expiring') {
          const expiry = new Date(item.expirationDate || '')
          const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          return expiry <= thirtyDaysFromNow
        }
        return item.status === statusFilter
      })()

      return matchesSearch && matchesCategory && matchesLocation && matchesStatus
    })

    // Cannabis inventory sorting
    filtered.sort((a: InventoryItem, b: InventoryItem) => {
      let aVal, bVal

      switch (sortField) {
        case 'productName':
          aVal = a.productName
          bVal = b.productName
          break
        case 'quantity':
          aVal = a.quantity
          bVal = b.quantity
          break
        case 'expirationDate':
          aVal = new Date(a.expirationDate || '').getTime()
          bVal = new Date(b.expirationDate || '').getTime()
          break
        case 'lastUpdated':
          aVal = new Date(a.lastUpdated).getTime()
          bVal = new Date(b.lastUpdated).getTime()
          break
        case 'cost':
          aVal = a.cost
          bVal = b.cost
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
  }, [inventory, searchQuery, categoryFilter, locationFilter, statusFilter, sortField, sortDirection])

  // Cannabis inventory metrics
  const inventoryMetrics = useMemo(() => {
    const totalItems = inventory.length
    const totalValue = inventory.reduce((sum: number, item: InventoryItem) => sum + (item.quantity * item.cost), 0)
    const lowStockItems = inventory.filter((item: InventoryItem) => item.quantity <= 10).length
    const expiringItems = inventory.filter((item: InventoryItem) => {
      if (!item.expirationDate) return false
      const expiry = new Date(item.expirationDate)
      const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      return expiry <= thirtyDaysFromNow
    }).length

    return { totalItems, totalValue, lowStockItems, expiringItems }
  }, [inventory])

  // Cannabis alert categorization
  const categorizedAlerts = useMemo(() => {
    if (!alerts) return { critical: [], high: [], medium: [], low: [] }
    
    return {
      critical: alerts.filter((alert: InventoryAlert) => alert.severity === 'critical'),
      high: alerts.filter((alert: InventoryAlert) => alert.severity === 'high'),
      medium: alerts.filter((alert: InventoryAlert) => alert.severity === 'medium'),
      low: alerts.filter((alert: InventoryAlert) => alert.severity === 'low'),
    }
  }, [alerts])

  /**
   * Handle cannabis inventory operations
   */
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const handleSelectItem = (itemId: string) => {
    const newSelected = new Set(selectedItems)
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId)
    } else {
      newSelected.add(itemId)
    }
    setSelectedItems(newSelected)
  }

  const handleSelectAll = () => {
    if (selectedItems.size === filteredAndSortedInventory.length) {
      setSelectedItems(new Set())
    } else {
      setSelectedItems(new Set(filteredAndSortedInventory.map((item: InventoryItem) => item.id)))
    }
  }

  const handleMetrcSync = () => {
    triggerMetrcSyncMutation.mutate()
  }

  if (inventoryLoading) {
    return (
      <div className="space-y-6">
        <CannabisInventoryHeader 
          onRefresh={() => {}} 
          onReceive={() => {}} 
          metrcStatus={null}
          metrcLoading={true}
          onMetrcSync={() => {}}
        />
        <CannabisLoadingSpinner size="lg" text="Loading cannabis inventory..." />
      </div>
    )
  }

  if (inventoryError) {
    return (
      <div className="space-y-6">
        <CannabisInventoryHeader 
          onRefresh={refetchInventory} 
          onReceive={() => setShowReceiveModal(true)} 
          metrcStatus={metrcStatus}
          metrcLoading={metrcLoading}
          onMetrcSync={handleMetrcSync}
        />
        <CannabisAlert
          type="error"
          title="Cannabis Inventory Error"
          message="Failed to load cannabis inventory. Please try again."
          action={{ label: 'Retry', onClick: refetchInventory }}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Cannabis Inventory Header */}
      <CannabisInventoryHeader 
        onRefresh={refetchInventory} 
        onReceive={() => setShowReceiveModal(true)} 
        metrcStatus={metrcStatus}
        metrcLoading={metrcLoading}
        onMetrcSync={handleMetrcSync}
      />

      {/* Cannabis Alerts */}
      {(categorizedAlerts.critical.length > 0 || categorizedAlerts.high.length > 0) && (
        <CannabisInventoryAlerts alerts={categorizedAlerts} />
      )}

      {/* Cannabis Inventory Metrics */}
      <CannabisInventoryMetrics metrics={inventoryMetrics} />

      {/* Cannabis Inventory Filters */}
      <CannabisInventoryFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        locationFilter={locationFilter}
        onLocationChange={setLocationFilter}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
        products={products}
        inventory={inventory}
      />

      {/* Cannabis Inventory Table */}
      <CannabisThemeContainer variant="card">
        <CannabisInventoryTable
          inventory={filteredAndSortedInventory}
          selectedItems={selectedItems}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
          onSelectItem={handleSelectItem}
          onSelectAll={handleSelectAll}
          onEditItem={setSelectedItem}
          onUpdateQuantity={(itemId, quantity) => 
            updateInventoryMutation.mutate({ inventoryId: itemId, updateData: { quantity } })
          }
        />
      </CannabisThemeContainer>

      {/* Cannabis Receive Inventory Modal */}
      {showReceiveModal && (
        <CannabisReceiveInventoryModal
          products={products}
          onClose={() => setShowReceiveModal(false)}
          onSubmit={(receiptData) => {
            receiveInventoryMutation.mutate(receiptData, {
              onSuccess: () => setShowReceiveModal(false)
            })
          }}
          isSubmitting={receiveInventoryMutation.isPending}
        />
      )}

      {/* Cannabis Edit Item Modal */}
      {selectedItem && (
        <CannabisEditInventoryModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onSubmit={(updateData) => {
            updateInventoryMutation.mutate(
              { inventoryId: selectedItem.id, updateData },
              {
                onSuccess: () => setSelectedItem(null)
              }
            )
          }}
          isSubmitting={updateInventoryMutation.isPending}
        />
      )}
    </div>
  )
}

/**
 * Cannabis inventory page header
 */
function CannabisInventoryHeader({
  onRefresh,
  onReceive,
  metrcStatus,
  metrcLoading,
  onMetrcSync
}: {
  onRefresh: () => void
  onReceive: () => void
  metrcStatus: any
  metrcLoading: boolean
  onMetrcSync: () => void
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-cultivateco-green flex items-center space-x-2">
          <Package className="w-6 h-6" />
          <span>Cannabis Inventory</span>
        </h1>
        <p className="text-gray-600">
          Track your cannabis products, monitor compliance, and manage stock levels
        </p>
      </div>

      <div className="flex items-center space-x-3">
        {/* METRC Status */}
        <div className="flex items-center space-x-2">
          <CannabisStatusIndicator
            status={metrcStatus?.connected ? 'connected' : 'disconnected'}
            size="sm"
          />
          <span className="text-sm text-gray-600">METRC</span>
          <CannabisButton
            variant="ghost"
            size="sm"
            onClick={onMetrcSync}
            loading={metrcLoading}
            icon={RefreshCw}
          >
            Sync
          </CannabisButton>
        </div>

        {/* Action Buttons */}
        <CannabisButton
          variant="outline"
          onClick={onRefresh}
          icon={RefreshCw}
        >
          Refresh
        </CannabisButton>

        <CannabisButton
          variant="primary"
          onClick={onReceive}
          icon={Plus}
        >
          Receive Inventory
        </CannabisButton>
      </div>
    </div>
  )
}

/**
 * Cannabis inventory alerts section
 */
function CannabisInventoryAlerts({ 
  alerts 
}: { 
  alerts: { critical: InventoryAlert[]; high: InventoryAlert[]; medium: InventoryAlert[]; low: InventoryAlert[] } 
}) {
  return (
    <div className="space-y-4">
      {alerts.critical.length > 0 && (
        <CannabisAlert
          type="error"
          title="Critical Cannabis Compliance Issues"
          message={`${alerts.critical.length} critical issue(s) require immediate attention`}
          action={{
            label: 'View Details',
            onClick: () => console.log('View critical alerts')
          }}
        />
      )}

      {alerts.high.length > 0 && (
        <CannabisAlert
          type="warning"
          title="Cannabis Inventory Alerts"
          message={`${alerts.high.length} high priority alert(s) need attention`}
          action={{
            label: 'Review Alerts',
            onClick: () => console.log('View high alerts')
          }}
        />
      )}
    </div>
  )
}

/**
 * Cannabis inventory metrics cards
 */
function CannabisInventoryMetrics({ 
  metrics 
}: { 
  metrics: { totalItems: number; totalValue: number; lowStockItems: number; expiringItems: number } 
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <CannabisMetricCard
        title="Total Cannabis Products"
        value={metrics.totalItems}
        icon={Package}
        color="green"
      />

      <CannabisMetricCard
        title="Total Inventory Value"
        value={formatCurrency(metrics.totalValue)}
        icon={DollarSign}
        color="blue"
      />

      <CannabisMetricCard
        title="Low Stock Items"
        value={metrics.lowStockItems}
        icon={AlertTriangle}
        color={metrics.lowStockItems > 0 ? 'amber' : 'green'}
      />

      <CannabisMetricCard
        title="Expiring Soon"
        value={metrics.expiringItems}
        icon={Clock}
        color={metrics.expiringItems > 0 ? 'red' : 'green'}
      />
    </div>
  )
}

/**
 * Cannabis inventory filters
 */
function CannabisInventoryFilters({
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  locationFilter,
  onLocationChange,
  statusFilter,
  onStatusChange,
  showFilters,
  onToggleFilters,
  products,
  inventory
}: {
  searchQuery: string
  onSearchChange: (query: string) => void
  categoryFilter: string
  onCategoryChange: (category: string) => void
  locationFilter: string
  onLocationChange: (location: string) => void
  statusFilter: string
  onStatusChange: (status: string) => void
  showFilters: boolean
  onToggleFilters: () => void
  products: any[]
  inventory: InventoryItem[]
}) {
  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category).filter(Boolean))
    return Array.from(cats).sort()
  }, [products])

  const locations = useMemo(() => {
    const locs = new Set(inventory.map(i => i.location).filter(Boolean))
    return Array.from(locs).sort()
  }, [inventory])

  return (
    <CannabisThemeContainer variant="card">
      <div className="space-y-4">
        {/* Search and Filter Toggle */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <CannabisSearchInput
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search cannabis products, SKUs, batches..."
              showFilter={true}
              onFilter={onToggleFilters}
            />
          </div>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
            <CannabisSelect
              label="Cannabis Category"
              value={categoryFilter}
              onChange={(e) => onCategoryChange(e.target.value)}
              options={[
                { value: 'all', label: 'All Categories' },
                ...categories.map(cat => ({ value: cat, label: cat }))
              ]}
            />

            <CannabisSelect
              label="Storage Location"
              value={locationFilter}
              onChange={(e) => onLocationChange(e.target.value)}
              options={[
                { value: 'all', label: 'All Locations' },
                ...locations.map(loc => ({ value: loc, label: loc }))
              ]}
            />

            <CannabisSelect
              label="Status Filter"
              value={statusFilter}
              onChange={(e) => onStatusChange(e.target.value)}
              options={[
                { value: 'all', label: 'All Items' },
                { value: 'active', label: 'Active' },
                { value: 'low_stock', label: 'Low Stock' },
                { value: 'expiring', label: 'Expiring Soon' },
                { value: 'expired', label: 'Expired' },
              ]}
            />
          </div>
        )}
      </div>
    </CannabisThemeContainer>
  )
}

/**
 * Cannabis inventory table
 */
function CannabisInventoryTable({
  inventory,
  selectedItems,
  sortField,
  sortDirection,
  onSort,
  onSelectItem,
  onSelectAll,
  onEditItem,
  onUpdateQuantity
}: {
  inventory: InventoryItem[]
  selectedItems: Set<string>
  sortField: SortField
  sortDirection: SortDirection
  onSort: (field: SortField) => void
  onSelectItem: (itemId: string) => void
  onSelectAll: () => void
  onEditItem: (item: InventoryItem) => void
  onUpdateQuantity: (itemId: string, quantity: number) => void
}) {
  const SortIcon = sortDirection === 'asc' ? SortAsc : SortDesc

  const renderSortHeader = (field: SortField, label: string) => (
    <button
      onClick={() => onSort(field)}
      className="flex items-center space-x-1 text-left font-medium text-gray-700 hover:text-cultivateco-green"
    >
      <span>{label}</span>
      {sortField === field && <SortIcon className="w-4 h-4" />}
    </button>
  )

  if (inventory.length === 0) {
    return (
      <CannabisEmptyState
        icon={Package}
        title="No Cannabis Inventory Found"
        description="No cannabis products match your current filters. Try adjusting your search criteria or add new inventory."
        action={{
          label: 'Receive Inventory',
          onClick: () => console.log('Open receive modal')
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
                checked={selectedItems.size === inventory.length && inventory.length > 0}
                onChange={onSelectAll}
                className="rounded border-gray-300 text-cultivateco-green focus:ring-cultivateco-green"
              />
            </th>
            <th className="px-4 py-3 text-left">
              {renderSortHeader('productName', 'Cannabis Product')}
            </th>
            <th className="px-4 py-3 text-left">SKU / Batch</th>
            <th className="px-4 py-3 text-left">
              {renderSortHeader('quantity', 'Quantity')}
            </th>
            <th className="px-4 py-3 text-left">Location</th>
            <th className="px-4 py-3 text-left">
              {renderSortHeader('expirationDate', 'Expiration')}
            </th>
            <th className="px-4 py-3 text-left">
              {renderSortHeader('cost', 'Cost/Unit')}
            </th>
            <th className="px-4 py-3 text-left">METRC</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>
        
        <tbody className="divide-y divide-gray-200">
          {inventory.map((item: InventoryItem) => (
            <CannabisInventoryRow
              key={item.id}
              item={item}
              isSelected={selectedItems.has(item.id)}
              onSelect={() => onSelectItem(item.id)}
              onEdit={() => onEditItem(item)}
              onUpdateQuantity={onUpdateQuantity}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

/**
 * Cannabis inventory table row
 */
function CannabisInventoryRow({
  item,
  isSelected,
  onSelect,
  onEdit,
  onUpdateQuantity
}: {
  item: InventoryItem
  isSelected: boolean
  onSelect: () => void
  onEdit: () => void
  onUpdateQuantity: (itemId: string, quantity: number) => void
}) {
  const [editingQuantity, setEditingQuantity] = useState(false)
  const [tempQuantity, setTempQuantity] = useState(item.quantity)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success'
      case 'expired': return 'danger'
      case 'recalled': return 'violation'
      default: return 'info'
    }
  }

  const isLowStock = item.quantity <= 10
  const isExpiring = item.expirationDate && new Date(item.expirationDate) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

  const handleQuantitySubmit = () => {
    if (tempQuantity !== item.quantity) {
      onUpdateQuantity(item.id, tempQuantity)
    }
    setEditingQuantity(false)
  }

  const handleQuantityCancel = () => {
    setTempQuantity(item.quantity)
    setEditingQuantity(false)
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
          <div className="font-medium text-gray-900">{item.productName}</div>
          <div className="text-sm text-gray-500 flex items-center space-x-2">
            <span>{item.productCategory}</span>
            {(item.thcPercentage || item.cbdPercentage) && (
              <span className="text-cultivateco-green">
                {item.thcPercentage && `${item.thcPercentage}% THC`}
                {item.thcPercentage && item.cbdPercentage && ' • '}
                {item.cbdPercentage && `${item.cbdPercentage}% CBD`}
              </span>
            )}
          </div>
        </div>
      </td>
      
      <td className="px-4 py-3">
        <div className="space-y-1">
          <CannabisCopyToClipboard text={item.sku} className="font-mono text-sm">
            {item.sku}
          </CannabisCopyToClipboard>
          <div className="text-sm text-gray-500">Batch: {item.batchNumber}</div>
        </div>
      </td>
      
      <td className="px-4 py-3">
        {editingQuantity ? (
          <div className="flex items-center space-x-2">
            <input
              type="number"
              value={tempQuantity}
              onChange={(e) => setTempQuantity(parseFloat(e.target.value) || 0)}
              className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:border-cultivateco-green focus:ring-1 focus:ring-cultivateco-green"
              min="0"
              step="0.1"
            />
            <button
              onClick={handleQuantitySubmit}
              className="text-cultivateco-green hover:text-cultivateco-green/80"
            >
              <CheckCircle className="w-4 h-4" />
            </button>
            <button
              onClick={handleQuantityCancel}
              className="text-gray-400 hover:text-gray-600"
            >
              <XCircle className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setEditingQuantity(true)}
            className="flex items-center space-x-2 hover:text-cultivateco-green"
          >
            <span className={cn(
              'font-medium',
              isLowStock && 'text-amber-600'
            )}>
              {formatCannabisWeight(item.quantity, item.unit)}
            </span>
            {isLowStock && <AlertTriangle className="w-4 h-4 text-amber-500" />}
          </button>
        )}
      </td>
      
      <td className="px-4 py-3">
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span className="text-sm">{item.location}</span>
        </div>
      </td>
      
      <td className="px-4 py-3">
        {item.expirationDate ? (
          <div className={cn(
            'text-sm',
            isExpiring && 'text-amber-600 font-medium'
          )}>
            <div>{formatDate(item.expirationDate)}</div>
            {isExpiring && (
              <div className="text-xs text-amber-500 flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>Expiring Soon</span>
              </div>
            )}
          </div>
        ) : (
          <span className="text-sm text-gray-400">No expiry</span>
        )}
      </td>
      
      <td className="px-4 py-3">
        <span className="text-sm font-medium">
          {formatCurrency(item.cost)}
        </span>
      </td>
      
      <td className="px-4 py-3">
        {item.metrcPackageId ? (
          <div className="flex items-center space-x-2">
            <CannabisBadge variant="compliant" size="sm">
              Synced
            </CannabisBadge>
            <button className="text-cultivateco-blue hover:text-cultivateco-green">
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <CannabisBadge variant="warning" size="sm">
            Pending
          </CannabisBadge>
        )}
      </td>
      
      <td className="px-4 py-3">
        <CannabisBadge variant={getStatusColor(item.status)} size="sm">
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </CannabisBadge>
      </td>
      
      <td className="px-4 py-3">
        <div className="flex items-center space-x-2">
          <button
            onClick={onEdit}
            className="text-cultivateco-blue hover:text-cultivateco-green"
            title="Edit cannabis inventory item"
          >
            <Edit className="w-4 h-4" />
          </button>
          
          <button
            className="text-cultivateco-blue hover:text-cultivateco-green"
            title="View cannabis product details"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  )
}

/**
 * Cannabis receive inventory modal
 */
function CannabisReceiveInventoryModal({
  products,
  onClose,
  onSubmit,
  isSubmitting
}: {
  products: any[]
  onClose: () => void
  onSubmit: (data: any) => void
  isSubmitting: boolean
}) {
  const [formData, setFormData] = useState({
    productId: '',
    quantity: 0,
    batchNumber: '',
    expirationDate: '',
    cost: 0,
    supplier: '',
    metrcPackageId: '',
    location: 'main-storage'
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newErrors: Record<string, string> = {}
    if (!formData.productId) newErrors.productId = 'Cannabis product is required'
    if (!formData.quantity || formData.quantity <= 0) newErrors.quantity = 'Valid quantity is required'
    if (!formData.batchNumber) newErrors.batchNumber = 'Batch number is required'
    if (!formData.supplier) newErrors.supplier = 'Supplier is required'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSubmit(formData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-cultivateco-green flex items-center space-x-2">
              <Upload className="w-5 h-5" />
              <span>Receive Cannabis Inventory</span>
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <CannabisSelect
                label="Cannabis Product"
                value={formData.productId}
                onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                options={[
                  { value: '', label: 'Select cannabis product' },
                  ...products.map(p => ({ value: p.id, label: `${p.name} (${p.sku})` }))
                ]}
                error={errors.productId}
              />
            </div>

            <CannabisQuantityInput
              label="Quantity Received"
              value={formData.quantity}
              onChange={(value) => setFormData({ ...formData, quantity: value })}
              min={0}
              step={0.1}
              unit="grams"
              error={errors.quantity}
            />

            <CannabisInput
              label="Batch Number"
              value={formData.batchNumber}
              onChange={(e) => setFormData({ ...formData, batchNumber: e.target.value })}
              placeholder="BATCH-2024-001"
              error={errors.batchNumber}
            />

            <CannabisInput
              label="Expiration Date"
              type="date"
              value={formData.expirationDate}
              onChange={(e) => setFormData({ ...formData, expirationDate: e.target.value })}
            />

            <CannabisInput
              label="Cost per Unit"
              type="number"
              value={formData.cost}
              onChange={(e) => setFormData({ ...formData, cost: parseFloat(e.target.value) || 0 })}
              min="0"
              step="0.01"
              placeholder="0.00"
            />

            <CannabisInput
              label="Supplier"
              value={formData.supplier}
              onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
              placeholder="Cannabis supplier name"
              error={errors.supplier}
            />

            <CannabisInput
              label="METRC Package ID"
              value={formData.metrcPackageId}
              onChange={(e) => setFormData({ ...formData, metrcPackageId: e.target.value })}
              placeholder="Optional METRC package ID"
              helpText="Link to METRC package if available"
            />
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
              icon={Upload}
              className="flex-1"
            >
              Receive Cannabis Inventory
            </CannabisButton>
          </div>
        </form>
      </div>
    </div>
  )
}

/**
 * Cannabis edit inventory modal
 */
function CannabisEditInventoryModal({
  item,
  onClose,
  onSubmit,
  isSubmitting
}: {
  item: InventoryItem
  onClose: () => void
  onSubmit: (data: any) => void
  isSubmitting: boolean
}) {
  const [formData, setFormData] = useState({
    quantity: item.quantity,
    location: item.location,
    notes: ''
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
              <Edit className="w-5 h-5" />
              <span>Edit Cannabis Inventory</span>
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            {item.productName} • {item.sku}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <CannabisQuantityInput
            label="Current Quantity"
            value={formData.quantity}
            onChange={(value) => setFormData({ ...formData, quantity: value })}
            min={0}
            step={0.1}
            unit={item.unit}
          />

          <CannabisInput
            label="Storage Location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="Storage location"
          />

          <CannabisInput
            label="Update Notes"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Reason for inventory update..."
          />

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
              icon={CheckCircle}
              className="flex-1"
            >
              Update Cannabis Inventory
            </CannabisButton>
          </div>
        </form>
      </div>
    </div>
  )
}
