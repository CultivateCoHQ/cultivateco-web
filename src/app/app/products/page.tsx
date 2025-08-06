'use client'

import { useState, useMemo } from 'react'
import { 
  Package, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Copy, 
  Download, 
  Upload, 
  Star, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Percent,
  BarChart3,
  Image as ImageIcon,
  Tag,
  Leaf,
  Settings,
  RefreshCw,
  X,
  Save,
  Camera,
  FileText,
  Zap,
  Target,
  Activity,
  Calendar,
  MapPin,
  Info
} from 'lucide-react'
import {
  useCannabisProducts,
  useCannabisCreateProduct,
  useCannabisUpdateProduct,
  useCannabisDeleteProduct,
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
  CannabisCopyToClipboard
} from '@/components/ui/cannabis-components'
import { CannabisThemeContainer, CannabisStatusIndicator } from '@/providers/theme-provider'
import { formatCurrency, formatCannabisWeight, formatDate, cn } from '@/lib/utils'

/**
 * =============================================================================
 * CultivateCo Cannabis Product Catalog Management
 * =============================================================================
 * Comprehensive cannabis product management with strain information and compliance tracking
 */

interface CannabisProduct {
  id: string
  name: string
  brand: string
  category: 'flower' | 'concentrates' | 'edibles' | 'topicals' | 'accessories' | 'pre-rolls'
  subcategory: string
  sku: string
  upc?: string
  description: string
  price: number
  costPerUnit: number
  unit: 'gram' | 'ounce' | 'each' | 'milligram'
  packageSize: number
  inStock: number
  lowStockThreshold: number
  status: 'active' | 'inactive' | 'discontinued' | 'pending-approval'
  images: string[]
  
  // Cannabis-specific properties
  strainType?: 'indica' | 'sativa' | 'hybrid'
  thcPercentage?: number
  cbdPercentage?: number
  terpenes?: Array<{
    name: string
    percentage: number
  }>
  potency: 'low' | 'medium' | 'high'
  effects?: string[]
  flavors?: string[]
  
  // Compliance & tracking
  labTested: boolean
  labResults?: {
    testDate: string
    batchNumber: string
    potency: { thc: number; cbd: number }
    pesticides: boolean
    heavyMetals: boolean
    microbials: boolean
    residualSolvents: boolean
  }
  metrcItemId?: string
  
  // Business metrics
  totalSold: number
  totalRevenue: number
  averageRating: number
  reviewCount: number
  createdAt: string
  updatedAt: string
}

interface ProductFilters {
  category: string
  subcategory: string
  strainType: string
  status: string
  lowStock: boolean
  search: string
}

type ProductSortField = 'name' | 'price' | 'inStock' | 'totalSold' | 'createdAt' | 'averageRating'
type ProductSortDirection = 'asc' | 'desc'

const CANNABIS_CATEGORIES = {
  flower: {
    label: 'Flower',
    subcategories: ['Indoor', 'Outdoor', 'Greenhouse', 'Premium', 'Budget']
  },
  concentrates: {
    label: 'Concentrates',
    subcategories: ['Shatter', 'Wax', 'Live Resin', 'Rosin', 'Distillate', 'Hash']
  },
  edibles: {
    label: 'Edibles',
    subcategories: ['Gummies', 'Chocolates', 'Beverages', 'Baked Goods', 'Capsules']
  },
  'pre-rolls': {
    label: 'Pre-Rolls',
    subcategories: ['Singles', 'Multi-Packs', 'Infused', 'Strain-Specific']
  },
  topicals: {
    label: 'Topicals',
    subcategories: ['Creams', 'Balms', 'Patches', 'Oils']
  },
  accessories: {
    label: 'Accessories',
    subcategories: ['Pipes', 'Papers', 'Vaporizers', 'Storage']
  }
}

export default function CannabisProductsPage() {
  // Cannabis products state
  const [filters, setFilters] = useState<ProductFilters>({
    category: 'all',
    subcategory: 'all',
    strainType: 'all',
    status: 'all',
    lowStock: false,
    search: ''
  })
  const [sortField, setSortField] = useState<ProductSortField>('name')
  const [sortDirection, setSortDirection] = useState<ProductSortDirection>('asc')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set())
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<CannabisProduct | null>(null)
  const [showProductDetails, setShowProductDetails] = useState(false)

  // Cannabis API hooks
  const { 
    data: productsResponse, 
    isLoading: productsLoading, 
    error: productsError,
    refetch: refetchProducts 
  } = useCannabisProducts({
    page: 1,
    limit: 100,
    category: filters.category !== 'all' ? filters.category : undefined,
    search: filters.search || undefined,
    lowStock: filters.lowStock
  })

  const createProductMutation = useCannabisCreateProduct()
  const updateProductMutation = useCannabisUpdateProduct()
  const deleteProductMutation = useCannabisDeleteProduct()
  const uploadFileMutation = useCannabisFileUpload()

  // Cannabis products data processing
  const products = productsResponse?.data || []

  // Cannabis product filtering and sorting
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter((product: CannabisProduct) => {
      const matchesCategory = filters.category === 'all' || product.category === filters.category
      const matchesSubcategory = filters.subcategory === 'all' || product.subcategory === filters.subcategory
      const matchesStrainType = filters.strainType === 'all' || product.strainType === filters.strainType
      const matchesStatus = filters.status === 'all' || product.status === filters.status
      const matchesLowStock = !filters.lowStock || product.inStock <= product.lowStockThreshold
      const matchesSearch = !filters.search || 
        product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.brand.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.sku.toLowerCase().includes(filters.search.toLowerCase())

      return matchesCategory && matchesSubcategory && matchesStrainType && 
             matchesStatus && matchesLowStock && matchesSearch
    })

    // Cannabis product sorting
    filtered.sort((a: CannabisProduct, b: CannabisProduct) => {
      let aVal, bVal

      switch (sortField) {
        case 'name':
          aVal = a.name.toLowerCase()
          bVal = b.name.toLowerCase()
          break
        case 'price':
          aVal = a.price
          bVal = b.price
          break
        case 'inStock':
          aVal = a.inStock
          bVal = b.inStock
          break
        case 'totalSold':
          aVal = a.totalSold
          bVal = b.totalSold
          break
        case 'createdAt':
          aVal = new Date(a.createdAt).getTime()
          bVal = new Date(b.createdAt).getTime()
          break
        case 'averageRating':
          aVal = a.averageRating
          bVal = b.averageRating
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
  }, [products, filters, sortField, sortDirection])

  // Cannabis product metrics
  const productMetrics = useMemo(() => {
    const totalProducts = products.length
    const activeProducts = products.filter((p: CannabisProduct) => p.status === 'active').length
    const lowStockProducts = products.filter((p: CannabisProduct) => p.inStock <= p.lowStockThreshold).length
    const totalValue = products.reduce((sum: number, p: CannabisProduct) => sum + (p.inStock * p.price), 0)
    const averagePrice = totalProducts > 0 ? products.reduce((sum: number, p: CannabisProduct) => sum + p.price, 0) / totalProducts : 0
    const topPerformer = products.reduce((top: CannabisProduct | null, p: CannabisProduct) => 
      !top || p.totalRevenue > top.totalRevenue ? p : top, null)

    return {
      totalProducts,
      activeProducts,
      lowStockProducts,
      totalValue,
      averagePrice,
      topPerformer
    }
  }, [products])

  /**
   * Handle cannabis product operations
   */
  const handleFilterChange = (key: keyof ProductFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleSort = (field: ProductSortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const handleSelectProduct = (productId: string) => {
    const newSelected = new Set(selectedProducts)
    if (newSelected.has(productId)) {
      newSelected.delete(productId)
    } else {
      newSelected.add(productId)
    }
    setSelectedProducts(newSelected)
  }

  const handleSelectAll = () => {
    if (selectedProducts.size === filteredAndSortedProducts.length) {
      setSelectedProducts(new Set())
    } else {
      setSelectedProducts(new Set(filteredAndSortedProducts.map((product: CannabisProduct) => product.id)))
    }
  }

  const handleBulkAction = (action: 'activate' | 'deactivate' | 'delete') => {
    console.log(`Bulk ${action} for products:`, Array.from(selectedProducts))
    setSelectedProducts(new Set())
  }

  if (productsLoading) {
    return (
      <div className="space-y-6">
        <CannabisProductsHeader 
          onRefresh={() => {}} 
          onAddProduct={() => {}} 
          onImport={() => {}}
          onExport={() => {}}
        />
        <CannabisLoadingSpinner size="lg" text="Loading cannabis products..." />
      </div>
    )
  }

  if (productsError) {
    return (
      <div className="space-y-6">
        <CannabisProductsHeader 
          onRefresh={refetchProducts} 
          onAddProduct={() => setShowAddModal(true)} 
          onImport={() => console.log('Import products')}
          onExport={() => console.log('Export products')}
        />
        <CannabisAlert
          type="error"
          title="Cannabis Products Error"
          message="Failed to load cannabis products. Please try again."
          action={{ label: 'Retry', onClick: refetchProducts }}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Cannabis Products Header */}
      <CannabisProductsHeader 
        onRefresh={refetchProducts} 
        onAddProduct={() => setShowAddModal(true)} 
        onImport={() => console.log('Import products')}
        onExport={() => console.log('Export products')}
      />

      {/* Cannabis Product Metrics */}
      <CannabisProductMetrics metrics={productMetrics} />

      {/* Cannabis Product Filters */}
      <CannabisProductFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
      />

      {/* Cannabis Bulk Actions */}
      {selectedProducts.size > 0 && (
        <CannabisBulkActions
          selectedCount={selectedProducts.size}
          onBulkAction={handleBulkAction}
          onClearSelection={() => setSelectedProducts(new Set())}
        />
      )}

      {/* Cannabis Products Table */}
      <CannabisThemeContainer variant="card">
        <CannabisProductsTable
          products={filteredAndSortedProducts}
          selectedProducts={selectedProducts}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
          onSelectProduct={handleSelectProduct}
          onSelectAll={handleSelectAll}
          onViewProduct={(product) => {
            setSelectedProduct(product)
            setShowProductDetails(true)
          }}
          onEditProduct={(product) => {
            setSelectedProduct(product)
            setShowEditModal(true)
          }}
          onDeleteProduct={(productId) => deleteProductMutation.mutate(productId)}
        />
      </CannabisThemeContainer>

      {/* Cannabis Add Product Modal */}
      {showAddModal && (
        <CannabisProductModal
          mode="create"
          onClose={() => setShowAddModal(false)}
          onSubmit={(productData) => {
            createProductMutation.mutate(productData, {
              onSuccess: () => setShowAddModal(false)
            })
          }}
          isSubmitting={createProductMutation.isPending}
        />
      )}

      {/* Cannabis Edit Product Modal */}
      {showEditModal && selectedProduct && (
        <CannabisProductModal
          mode="edit"
          product={selectedProduct}
          onClose={() => {
            setShowEditModal(false)
            setSelectedProduct(null)
          }}
          onSubmit={(productData) => {
            updateProductMutation.mutate(
              { productId: selectedProduct.id, productData },
              {
                onSuccess: () => {
                  setShowEditModal(false)
                  setSelectedProduct(null)
                }
              }
            )
          }}
          isSubmitting={updateProductMutation.isPending}
        />
      )}

      {/* Cannabis Product Details Modal */}
      {showProductDetails && selectedProduct && (
        <CannabisProductDetailsModal
          product={selectedProduct}
          onClose={() => {
            setShowProductDetails(false)
            setSelectedProduct(null)
          }}
          onEdit={() => {
            setShowProductDetails(false)
            setShowEditModal(true)
          }}
        />
      )}
    </div>
  )
}

/**
 * Cannabis products page header
 */
function CannabisProductsHeader({
  onRefresh,
  onAddProduct,
  onImport,
  onExport
}: {
  onRefresh: () => void
  onAddProduct: () => void
  onImport: () => void
  onExport: () => void
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-cultivateco-green flex items-center space-x-2">
          <Package className="w-6 h-6" />
          <span>Cannabis Product Catalog</span>
        </h1>
        <p className="text-gray-600">
          Manage your cannabis products, strains, pricing, and inventory
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
          onClick={onAddProduct}
          icon={Plus}
        >
          Add Product
        </CannabisButton>
      </div>
    </div>
  )
}

/**
 * Cannabis product metrics cards
 */
function CannabisProductMetrics({ 
  metrics 
}: { 
  metrics: {
    totalProducts: number
    activeProducts: number
    lowStockProducts: number
    totalValue: number
    averagePrice: number
    topPerformer: CannabisProduct | null
  }
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      <CannabisMetricCard
        title="Total Products"
        value={metrics.totalProducts}
        icon={Package}
        color="green"
      />

      <CannabisMetricCard
        title="Active Products"
        value={metrics.activeProducts}
        icon={CheckCircle}
        color="blue"
      />

      <CannabisMetricCard
        title="Low Stock Items"
        value={metrics.lowStockProducts}
        icon={AlertTriangle}
        color={metrics.lowStockProducts > 0 ? 'red' : 'green'}
      />

      <CannabisMetricCard
        title="Total Inventory Value"
        value={formatCurrency(metrics.totalValue)}
        icon={DollarSign}
        color="purple"
      />

      <CannabisMetricCard
        title="Average Price"
        value={formatCurrency(metrics.averagePrice)}
        icon={Target}
        color="amber"
      />

      <CannabisMetricCard
        title="Top Performer"
        value={metrics.topPerformer?.name || 'None'}
        icon={Star}
        color="green"
        onClick={() => console.log('View top performer details')}
      />
    </div>
  )
}

/**
 * Cannabis product filters
 */
function CannabisProductFilters({
  filters,
  onFilterChange,
  showFilters,
  onToggleFilters
}: {
  filters: ProductFilters
  onFilterChange: (key: keyof ProductFilters, value: any) => void
  showFilters: boolean
  onToggleFilters: () => void
}) {
  const selectedCategory = filters.category !== 'all' ? CANNABIS_CATEGORIES[filters.category as keyof typeof CANNABIS_CATEGORIES] : null

  return (
    <CannabisThemeContainer variant="card">
      <div className="space-y-4">
        {/* Search and Filter Toggle */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <CannabisSearchInput
              value={filters.search}
              onChange={(e) => onFilterChange('search', e.target.value)}
              placeholder="Search cannabis products, strains, SKUs..."
              showFilter={true}
              onFilter={onToggleFilters}
            />
          </div>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onFilterChange('lowStock', !filters.lowStock)}
            className={cn(
              'px-3 py-1 rounded-full text-sm font-medium transition-colors',
              filters.lowStock
                ? 'bg-amber-100 text-amber-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            )}
          >
            Low Stock Only
          </button>

          {Object.entries(CANNABIS_CATEGORIES).map(([key, category]) => (
            <button
              key={key}
              onClick={() => onFilterChange('category', filters.category === key ? 'all' : key)}
              className={cn(
                'px-3 py-1 rounded-full text-sm font-medium transition-colors',
                filters.category === key
                  ? 'bg-cultivateco-green text-cultivateco-cream'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              )}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
            <CannabisSelect
              label="Category"
              value={filters.category}
              onChange={(e) => onFilterChange('category', e.target.value)}
              options={[
                { value: 'all', label: 'All Categories' },
                ...Object.entries(CANNABIS_CATEGORIES).map(([key, category]) => ({
                  value: key,
                  label: category.label
                }))
              ]}
            />

            <CannabisSelect
              label="Subcategory"
              value={filters.subcategory}
              onChange={(e) => onFilterChange('subcategory', e.target.value)}
              options={[
                { value: 'all', label: 'All Subcategories' },
                ...(selectedCategory?.subcategories.map(sub => ({
                  value: sub,
                  label: sub
                })) || [])
              ]}
              disabled={!selectedCategory}
            />

            <CannabisSelect
              label="Strain Type"
              value={filters.strainType}
              onChange={(e) => onFilterChange('strainType', e.target.value)}
              options={[
                { value: 'all', label: 'All Strain Types' },
                { value: 'indica', label: 'Indica' },
                { value: 'sativa', label: 'Sativa' },
                { value: 'hybrid', label: 'Hybrid' }
              ]}
            />

            <CannabisSelect
              label="Status"
              value={filters.status}
              onChange={(e) => onFilterChange('status', e.target.value)}
              options={[
                { value: 'all', label: 'All Statuses' },
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' },
                { value: 'discontinued', label: 'Discontinued' },
                { value: 'pending-approval', label: 'Pending Approval' }
              ]}
            />
          </div>
        )}
      </div>
    </CannabisThemeContainer>
  )
}

/**
 * Cannabis bulk actions bar
 */
function CannabisBulkActions({
  selectedCount,
  onBulkAction,
  onClearSelection
}: {
  selectedCount: number
  onBulkAction: (action: 'activate' | 'deactivate' | 'delete') => void
  onClearSelection: () => void
}) {
  return (
    <CannabisThemeContainer variant="card">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-900">
            {selectedCount} product{selectedCount !== 1 ? 's' : ''} selected
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
              onClick={() => onBulkAction('delete')}
              className="text-red-600 border-red-300 hover:bg-red-50"
            >
              Delete
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
 * Cannabis products table
 */
function CannabisProductsTable({
  products,
  selectedProducts,
  sortField,
  sortDirection,
  onSort,
  onSelectProduct,
  onSelectAll,
  onViewProduct,
  onEditProduct,
  onDeleteProduct
}: {
  products: CannabisProduct[]
  selectedProducts: Set<string>
  sortField: ProductSortField
  sortDirection: ProductSortDirection
  onSort: (field: ProductSortField) => void
  onSelectProduct: (productId: string) => void
  onSelectAll: () => void
  onViewProduct: (product: CannabisProduct) => void
  onEditProduct: (product: CannabisProduct) => void
  onDeleteProduct: (productId: string) => void
}) {
  const SortIcon = sortDirection === 'asc' ? TrendingUp : TrendingDown

  const renderSortHeader = (field: ProductSortField, label: string) => (
    <button
      onClick={() => onSort(field)}
      className="flex items-center space-x-1 text-left font-medium text-gray-700 hover:text-cultivateco-green"
    >
      <span>{label}</span>
      {sortField === field && <SortIcon className="w-4 h-4" />}
    </button>
  )

  if (products.length === 0) {
    return (
      <CannabisEmptyState
        icon={Package}
        title="No Cannabis Products Found"
        description="No cannabis products match your current filters. Try adjusting your search criteria or add new products."
        action={{
          label: 'Add Cannabis Product',
          onClick: () => console.log('Add product')
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
                checked={selectedProducts.size === products.length && products.length > 0}
                onChange={onSelectAll}
                className="rounded border-gray-300 text-cultivateco-green focus:ring-cultivateco-green"
              />
            </th>
            <th className="px-4 py-3 text-left">Product</th>
            <th className="px-4 py-3 text-left">
              {renderSortHeader('price', 'Price')}
            </th>
            <th className="px-4 py-3 text-left">
              {renderSortHeader('inStock', 'Stock')}
            </th>
            <th className="px-4 py-3 text-left">Cannabis Info</th>
            <th className="px-4 py-3 text-left">
              {renderSortHeader('totalSold', 'Performance')}
            </th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>
        
        <tbody className="divide-y divide-gray-200">
          {products.map((product: CannabisProduct) => (
            <CannabisProductRow
              key={product.id}
              product={product}
              isSelected={selectedProducts.has(product.id)}
              onSelect={() => onSelectProduct(product.id)}
              onView={() => onViewProduct(product)}
              onEdit={() => onEditProduct(product)}
              onDelete={() => onDeleteProduct(product.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

/**
 * Cannabis product table row
 */
function CannabisProductRow({
  product,
  isSelected,
  onSelect,
  onView,
  onEdit,
  onDelete
}: {
  product: CannabisProduct
  isSelected: boolean
  onSelect: () => void
  onView: () => void
  onEdit: () => void
  onDelete: () => void
}) {
  const isLowStock = product.inStock <= product.lowStockThreshold
  const profitMargin = ((product.price - product.costPerUnit) / product.price) * 100

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success'
      case 'inactive': return 'warning'
      case 'discontinued': return 'violation'
      case 'pending-approval': return 'info'
      default: return 'info'
    }
  }

  const getStrainColor = (strain?: string) => {
    switch (strain) {
      case 'indica': return 'bg-purple-100 text-purple-700'
      case 'sativa': return 'bg-orange-100 text-orange-700'
      case 'hybrid': return 'bg-green-100 text-green-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getPotencyColor = (potency: string) => {
    switch (potency) {
      case 'high': return 'text-red-600'
      case 'medium': return 'text-amber-600'
      case 'low': return 'text-green-600'
      default: return 'text-gray-600'
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
          <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
            {product.images.length > 0 ? (
              <img 
                src={product.images[0]} 
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <ImageIcon className="w-6 h-6 text-gray-400" />
            )}
          </div>
          
          <div className="space-y-1">
            <div className="font-medium text-gray-900">{product.name}</div>
            <div className="text-sm text-gray-600">{product.brand}</div>
            <div className="flex items-center space-x-2">
              <CannabisCopyToClipboard text={product.sku} className="text-xs font-mono">
                {product.sku}
              </CannabisCopyToClipboard>
              {product.strainType && (
                <span className={cn('px-2 py-0.5 rounded-full text-xs', getStrainColor(product.strainType))}>
                  {product.strainType}
                </span>
              )}
            </div>
          </div>
        </div>
      </td>
      
      <td className="px-4 py-3">
        <div className="space-y-1">
          <div className="font-semibold text-cultivateco-green">
            {formatCurrency(product.price)}
          </div>
          <div className="text-sm text-gray-600">
            Cost: {formatCurrency(product.costPerUnit)}
          </div>
          <div className="text-xs text-gray-500">
            Margin: {profitMargin.toFixed(1)}%
          </div>
        </div>
      </td>
      
      <td className="px-4 py-3">
        <div className="space-y-1">
          <div className={cn('font-medium', isLowStock && 'text-amber-600')}>
            {formatCannabisWeight(product.inStock, product.unit)}
          </div>
          <div className="text-sm text-gray-600">
            {formatCannabisWeight(product.packageSize, product.unit)} units
          </div>
          {isLowStock && (
            <div className="flex items-center space-x-1 text-xs text-amber-600">
              <AlertTriangle className="w-3 h-3" />
              <span>Low Stock</span>
            </div>
          )}
        </div>
      </td>
      
      <td className="px-4 py-3">
        <div className="space-y-1">
          {(product.thcPercentage || product.cbdPercentage) && (
            <div className="text-sm space-y-0.5">
              {product.thcPercentage && (
                <div className="text-cultivateco-green font-medium">
                  {product.thcPercentage}% THC
                </div>
              )}
              {product.cbdPercentage && (
                <div className="text-cultivateco-blue font-medium">
                  {product.cbdPercentage}% CBD
                </div>
              )}
            </div>
          )}
          
          <div className={cn('text-sm font-medium', getPotencyColor(product.potency))}>
            {product.potency.toUpperCase()} potency
          </div>
          
          {product.labTested && (
            <div className="flex items-center space-x-1 text-xs text-green-600">
              <CheckCircle className="w-3 h-3" />
              <span>Lab Tested</span>
            </div>
          )}
        </div>
      </td>
      
      <td className="px-4 py-3">
        <div className="space-y-1">
          <div className="text-sm font-medium">
            {product.totalSold.toLocaleString()} sold
          </div>
          <div className="text-sm text-cultivateco-green">
            {formatCurrency(product.totalRevenue)}
          </div>
          {product.averageRating > 0 && (
            <div className="flex items-center space-x-1 text-xs">
              <Star className="w-3 h-3 text-amber-500 fill-current" />
              <span>{product.averageRating.toFixed(1)}</span>
              <span className="text-gray-500">({product.reviewCount})</span>
            </div>
          )}
        </div>
      </td>
      
      <td className="px-4 py-3">
        <CannabisBadge variant={getStatusColor(product.status)} size="sm">
          {product.status.replace('-', ' ').toUpperCase()}
        </CannabisBadge>
      </td>
      
      <td className="px-4 py-3">
        <div className="flex items-center space-x-2">
          <button
            onClick={onView}
            className="text-cultivateco-blue hover:text-cultivateco-green"
            title="View cannabis product details"
          >
            <Eye className="w-4 h-4" />
          </button>
          
          <button
            onClick={onEdit}
            className="text-cultivateco-blue hover:text-cultivateco-green"
            title="Edit cannabis product"
          >
            <Edit className="w-4 h-4" />
          </button>
          
          <button
            onClick={onDelete}
            className="text-gray-400 hover:text-red-600"
            title="Delete cannabis product"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  )
}

/**
 * Cannabis product modal - simplified for space
 */
function CannabisProductModal({
  mode,
  product,
  onClose,
  onSubmit,
  isSubmitting
}: {
  mode: 'create' | 'edit'
  product?: CannabisProduct
  onClose: () => void
  onSubmit: (data: any) => void
  isSubmitting: boolean
}) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    brand: product?.brand || '',
    category: product?.category || 'flower',
    subcategory: product?.subcategory || '',
    price: product?.price || 0,
    costPerUnit: product?.costPerUnit || 0,
    inStock: product?.inStock || 0,
    description: product?.description || '',
    strainType: product?.strainType || 'hybrid',
    thcPercentage: product?.thcPercentage || 0,
    cbdPercentage: product?.cbdPercentage || 0,
    potency: product?.potency || 'medium'
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
              {mode === 'create' ? 'Add Cannabis Product' : 'Edit Cannabis Product'}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CannabisInput
              label="Product Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Blue Dream"
              required
            />

            <CannabisInput
              label="Brand"
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              placeholder="Premium Cannabis Co."
              required
            />

            <CannabisSelect
              label="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              options={Object.entries(CANNABIS_CATEGORIES).map(([key, category]) => ({
                value: key,
                label: category.label
              }))}
              required
            />

            <CannabisSelect
              label="Strain Type"
              value={formData.strainType}
              onChange={(e) => setFormData({ ...formData, strainType: e.target.value })}
              options={[
                { value: 'indica', label: 'Indica' },
                { value: 'sativa', label: 'Sativa' },
                { value: 'hybrid', label: 'Hybrid' }
              ]}
            />

            <CannabisInput
              label="Price"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
              min="0"
              step="0.01"
              required
            />

            <CannabisInput
              label="Cost per Unit"
              type="number"
              value={formData.costPerUnit}
              onChange={(e) => setFormData({ ...formData, costPerUnit: parseFloat(e.target.value) || 0 })}
              min="0"
              step="0.01"
              required
            />

            <CannabisInput
              label="THC Percentage"
              type="number"
              value={formData.thcPercentage}
              onChange={(e) => setFormData({ ...formData, thcPercentage: parseFloat(e.target.value) || 0 })}
              min="0"
              max="100"
              step="0.1"
            />

            <CannabisInput
              label="CBD Percentage"
              type="number"
              value={formData.cbdPercentage}
              onChange={(e) => setFormData({ ...formData, cbdPercentage: parseFloat(e.target.value) || 0 })}
              min="0"
              max="100"
              step="0.1"
            />
          </div>

          <CannabisInput
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe the cannabis product..."
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
              {mode === 'create' ? 'Add Product' : 'Save Changes'}
            </CannabisButton>
          </div>
        </form>
      </div>
    </div>
  )
}

/**
 * Cannabis product details modal - simplified
 */
function CannabisProductDetailsModal({
  product,
  onClose,
  onEdit
}: {
  product: CannabisProduct
  onClose: () => void
  onEdit: () => void
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-cultivateco-green">{product.name}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Product Information</h3>
              <div className="space-y-2 text-sm">
                <div><span className="text-gray-600">Brand:</span> <span className="ml-2">{product.brand}</span></div>
                <div><span className="text-gray-600">Category:</span> <span className="ml-2">{product.category}</span></div>
                <div><span className="text-gray-600">SKU:</span> <CannabisCopyToClipboard text={product.sku} className="ml-2" /></div>
                <div><span className="text-gray-600">Price:</span> <span className="ml-2 font-medium text-cultivateco-green">{formatCurrency(product.price)}</span></div>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-2">Cannabis Information</h3>
              <div className="space-y-2 text-sm">
                {product.strainType && <div><span className="text-gray-600">Strain:</span> <span className="ml-2 capitalize">{product.strainType}</span></div>}
                {product.thcPercentage && <div><span className="text-gray-600">THC:</span> <span className="ml-2 font-medium text-cultivateco-green">{product.thcPercentage}%</span></div>}
                {product.cbdPercentage && <div><span className="text-gray-600">CBD:</span> <span className="ml-2 font-medium text-cultivateco-blue">{product.cbdPercentage}%</span></div>}
                <div><span className="text-gray-600">Potency:</span> <span className="ml-2 capitalize">{product.potency}</span></div>
              </div>
            </div>
          </div>

          {product.description && (
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Description</h3>
              <p className="text-sm text-gray-600">{product.description}</p>
            </div>
          )}

          <div className="flex space-x-4">
            <CannabisButton
              onClick={onEdit}
              variant="primary"
              icon={Edit}
              className="flex-1"
            >
              Edit Product
            </CannabisButton>
          </div>
        </div>
      </div>
    </div>
  )
}
