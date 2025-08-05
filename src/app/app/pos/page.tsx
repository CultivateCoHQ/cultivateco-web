'use client'

import { useState, useMemo, useEffect } from 'react'
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  User, 
  CreditCard, 
  DollarSign, 
  Percent, 
  Calculator, 
  Receipt, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Search, 
  Scan, 
  UserPlus,
  Shield,
  Gift,
  Zap,
  Printer,
  X,
  Package,
  Users,
  Eye,
  Settings,
  Leaf,
  QrCode,
  Banknote,
  Smartphone
} from 'lucide-react'
import {
  useCannabisProducts,
  useCannabisCustomers,
  useCannabisCustomer,
  useCannabisCreateTransaction,
  useCannabisVerifyCustomer,
  useCannabisCreateCustomer,
  useCannabisInventory
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
import { formatCurrency, formatCannabisWeight, calculateAge, cn } from '@/lib/utils'

/**
 * =============================================================================
 * CultivateCo Cannabis Point of Sale System
 * =============================================================================
 * Professional POS interface for cannabis dispensary transactions
 */

interface CannabisProduct {
  id: string
  name: string
  category: string
  brand: string
  sku: string
  price: number
  thcPercentage?: number
  cbdPercentage?: number
  description: string
  image?: string
  inStock: number
  unit: string
  preTaxPrice: number
  taxRate: number
  isPreRoll: boolean
  strainType?: 'indica' | 'sativa' | 'hybrid'
  potency: 'low' | 'medium' | 'high'
}

interface CartItem {
  product: CannabisProduct
  quantity: number
  unitPrice: number
  subtotal: number
  tax: number
  total: number
  discountAmount?: number
}

interface CannabisCustomer {
  id: string
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  age: number
  customerType: 'adult-use' | 'medical' | 'dual'
  loyaltyPoints: number
  totalSpent: number
  lastVisit?: string
  identification: {
    verified: boolean
    expirationDate: string
  }
  medicalCard?: {
    verified: boolean
    expirationDate: string
  }
  purchaseLimits: {
    daily: { current: number; limit: number }
    monthly: { current: number; limit: number }
  }
  compliance: {
    status: 'compliant' | 'warning' | 'violation'
  }
}

interface PaymentMethod {
  id: string
  name: string
  type: 'cash' | 'debit' | 'credit' | 'check' | 'gift_card' | 'loyalty_points'
  icon: React.ComponentType<{ className?: string }>
  enabled: boolean
  processingFee?: number
}

interface CannabisDiscount {
  id: string
  name: string
  type: 'percentage' | 'fixed' | 'bogo' | 'loyalty'
  value: number
  minPurchase?: number
  applicableProducts?: string[]
  customerTypes?: string[]
  description: string
}

const PAYMENT_METHODS: PaymentMethod[] = [
  { id: 'cash', name: 'Cash', type: 'cash', icon: Banknote, enabled: true },
  { id: 'debit', name: 'Debit Card', type: 'debit', icon: CreditCard, enabled: true, processingFee: 0.025 },
  { id: 'credit', name: 'Credit Card', type: 'credit', icon: CreditCard, enabled: false }, // Often not allowed for cannabis
  { id: 'digital', name: 'Digital Payment', type: 'debit', icon: Smartphone, enabled: true, processingFee: 0.03 },
  { id: 'gift_card', name: 'Gift Card', type: 'gift_card', icon: Gift, enabled: true },
  { id: 'loyalty', name: 'Loyalty Points', type: 'loyalty_points', icon: Gift, enabled: true },
]

const CANNABIS_DISCOUNTS: CannabisDiscount[] = [
  {
    id: 'first_time',
    name: 'First Time Customer',
    type: 'percentage',
    value: 15,
    customerTypes: ['new'],
    description: '15% off first cannabis purchase'
  },
  {
    id: 'senior',
    name: 'Senior Discount',
    type: 'percentage',
    value: 10,
    description: '10% off for customers 65+'
  },
  {
    id: 'medical',
    name: 'Medical Patient',
    type: 'percentage',
    value: 20,
    customerTypes: ['medical'],
    description: '20% off for medical cannabis patients'
  },
  {
    id: 'loyalty_tier',
    name: 'Loyalty Member',
    type: 'percentage',
    value: 5,
    description: '5% off for loyalty members'
  }
]

export default function CannabisPOSPage() {
  // Cannabis POS state
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedCustomer, setSelectedCustomer] = useState<CannabisCustomer | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null)
  const [appliedDiscounts, setAppliedDiscounts] = useState<CannabisDiscount[]>([])
  const [cashTendered, setCashTendered] = useState<number>(0)
  const [showCustomerSearch, setShowCustomerSearch] = useState(false)
  const [showAddCustomer, setShowAddCustomer] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [showReceipt, setShowReceipt] = useState(false)
  const [completedTransaction, setCompletedTransaction] = useState<any>(null)
  const [notes, setNotes] = useState('')

  // Cannabis API hooks
  const { 
    data: productsResponse, 
    isLoading: productsLoading 
  } = useCannabisProducts({ 
    search: searchQuery || undefined,
    category: categoryFilter !== 'all' ? categoryFilter : undefined,
    limit: 100 
  })

  const { 
    data: customersResponse 
  } = useCannabisCustomers({ limit: 100 })

  const createTransactionMutation = useCannabisCreateTransaction()
  const verifyCustomerMutation = useCannabisVerifyCustomer()
  const createCustomerMutation = useCannabisCreateCustomer()

  // Cannabis data processing
  const products = productsResponse?.data || []
  const customers = customersResponse?.data || []

  // Cannabis product filtering
  const filteredProducts = useMemo(() => {
    return products.filter((product: CannabisProduct) => {
      const matchesSearch = !searchQuery || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter

      return matchesSearch && matchesCategory && product.inStock > 0
    })
  }, [products, searchQuery, categoryFilter])

  // Cannabis cart calculations
  const cartTotals = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => sum + item.subtotal, 0)
    const tax = cart.reduce((sum, item) => sum + item.tax, 0)
    const discountAmount = appliedDiscounts.reduce((sum, discount) => {
      if (discount.type === 'percentage') {
        return sum + (subtotal * discount.value / 100)
      } else if (discount.type === 'fixed') {
        return sum + discount.value
      }
      return sum
    }, 0)
    const total = subtotal + tax - discountAmount
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

    return { subtotal, tax, discountAmount, total, totalItems }
  }, [cart, appliedDiscounts])

  // Cannabis compliance checks
  const complianceCheck = useMemo(() => {
    if (!selectedCustomer) return { passed: false, issues: ['No customer selected'] }

    const issues: string[] = []
    
    // Age verification
    if (selectedCustomer.age < 21 && selectedCustomer.customerType === 'adult-use') {
      issues.push('Customer under 21 for adult-use cannabis')
    }

    // ID expiration
    const idExpiry = new Date(selectedCustomer.identification.expirationDate)
    if (idExpiry < new Date()) {
      issues.push('Customer ID has expired')
    }

    // Medical card for medical products
    const hasmedicalProducts = cart.some(item => item.product.category === 'medical')
    if (hasmedicalProducts && !selectedCustomer.medicalCard?.verified) {
      issues.push('Medical cannabis products require verified medical card')
    }

    // Purchase limits
    const cartWeight = cart.reduce((sum, item) => sum + item.quantity, 0)
    const dailyRemaining = selectedCustomer.purchaseLimits.daily.limit - selectedCustomer.purchaseLimits.daily.current
    const monthlyRemaining = selectedCustomer.purchaseLimits.monthly.limit - selectedCustomer.purchaseLimits.monthly.current

    if (cartWeight > dailyRemaining) {
      issues.push(`Cart exceeds daily limit (${cartWeight}g > ${dailyRemaining}g remaining)`)
    }

    if (cartWeight > monthlyRemaining) {
      issues.push(`Cart exceeds monthly limit (${cartWeight}g > ${monthlyRemaining}g remaining)`)
    }

    return { passed: issues.length === 0, issues }
  }, [selectedCustomer, cart])

  /**
   * Cannabis cart operations
   */
  const addToCart = (product: CannabisProduct, quantity: number = 1) => {
    const existingItem = cart.find(item => item.product.id === product.id)
    
    if (existingItem) {
      updateCartItemQuantity(existingItem.product.id, existingItem.quantity + quantity)
    } else {
      const unitPrice = product.price
      const subtotal = unitPrice * quantity
      const tax = subtotal * (product.taxRate || 0.08) // Default 8% tax
      const total = subtotal + tax

      const newItem: CartItem = {
        product,
        quantity,
        unitPrice,
        subtotal,
        tax,
        total
      }

      setCart(prev => [...prev, newItem])
    }
  }

  const updateCartItemQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCart(prev => prev.map(item => {
      if (item.product.id === productId) {
        const subtotal = item.unitPrice * newQuantity
        const tax = subtotal * (item.product.taxRate || 0.08)
        const total = subtotal + tax

        return { ...item, quantity: newQuantity, subtotal, tax, total }
      }
      return item
    }))
  }

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId))
  }

  const clearCart = () => {
    setCart([])
    setSelectedCustomer(null)
    setAppliedDiscounts([])
    setNotes('')
    setCashTendered(0)
    setSelectedPaymentMethod(null)
  }

  /**
   * Cannabis discount operations
   */
  const applyDiscount = (discount: CannabisDiscount) => {
    if (appliedDiscounts.find(d => d.id === discount.id)) return

    // Check if discount is applicable
    if (discount.customerTypes && selectedCustomer) {
      const customerQualifies = discount.customerTypes.some(type => {
        if (type === 'new' && selectedCustomer.totalSpent === 0) return true
        if (type === 'medical' && selectedCustomer.customerType === 'medical') return true
        return false
      })

      if (!customerQualifies) return
    }

    if (discount.minPurchase && cartTotals.subtotal < discount.minPurchase) return

    setAppliedDiscounts(prev => [...prev, discount])
  }

  const removeDiscount = (discountId: string) => {
    setAppliedDiscounts(prev => prev.filter(d => d.id !== discountId))
  }

  /**
   * Cannabis transaction processing
   */
  const processTransaction = async () => {
    if (!selectedCustomer || !selectedPaymentMethod || !complianceCheck.passed) return

    const transactionData = {
      customerId: selectedCustomer.id,
      items: cart.map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
        price: item.unitPrice
      })),
      payment: {
        method: selectedPaymentMethod.type,
        amount: cartTotals.total,
        tendered: selectedPaymentMethod.type === 'cash' ? cashTendered : cartTotals.total
      },
      discounts: appliedDiscounts.map(discount => ({
        type: discount.type,
        amount: discount.type === 'percentage' 
          ? cartTotals.subtotal * discount.value / 100
          : discount.value
      })),
      notes
    }

    try {
      const result = await createTransactionMutation.mutateAsync(transactionData)
      setCompletedTransaction(result)
      setShowReceipt(true)
      setShowPayment(false)
    } catch (error) {
      console.error('Cannabis transaction failed:', error)
    }
  }

  const getProductCategories = () => {
    const categories = new Set(products.map(p => p.category))
    return Array.from(categories).sort()
  }

  if (productsLoading) {
    return <CannabisLoadingSpinner size="lg" text="Loading cannabis POS system..." />
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Cannabis POS Header */}
      <CannabisPOSHeader 
        customerCount={customers.length}
        cartTotal={cartTotals.total}
        onSettings={() => console.log('Settings')}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Cannabis Product Selection */}
        <div className="flex-1 flex flex-col p-6 space-y-4">
          <CannabisProductFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            categoryFilter={categoryFilter}
            onCategoryChange={setCategoryFilter}
            categories={getProductCategories()}
          />

          <CannabisProductGrid
            products={filteredProducts}
            onAddToCart={addToCart}
          />
        </div>

        {/* Cannabis Cart & Customer */}
        <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
          <CannabisCartPanel
            cart={cart}
            customer={selectedCustomer}
            cartTotals={cartTotals}
            appliedDiscounts={appliedDiscounts}
            complianceCheck={complianceCheck}
            onUpdateQuantity={updateCartItemQuantity}
            onRemoveItem={removeFromCart}
            onSelectCustomer={() => setShowCustomerSearch(true)}
            onAddCustomer={() => setShowAddCustomer(true)}
            onApplyDiscount={applyDiscount}
            onRemoveDiscount={removeDiscount}
            onClearCart={clearCart}
            onCheckout={() => setShowPayment(true)}
          />
        </div>
      </div>

      {/* Cannabis Customer Search Modal */}
      {showCustomerSearch && (
        <CannabisCustomerSearchModal
          customers={customers}
          onClose={() => setShowCustomerSearch(false)}
          onSelectCustomer={(customer) => {
            setSelectedCustomer(customer)
            setShowCustomerSearch(false)
          }}
          onAddNew={() => {
            setShowCustomerSearch(false)
            setShowAddCustomer(true)
          }}
        />
      )}

      {/* Cannabis Add Customer Modal */}
      {showAddCustomer && (
        <CannabisQuickAddCustomerModal
          onClose={() => setShowAddCustomer(false)}
          onSubmit={(customerData) => {
            createCustomerMutation.mutate(customerData, {
              onSuccess: (newCustomer) => {
                setSelectedCustomer(newCustomer)
                setShowAddCustomer(false)
              }
            })
          }}
          isSubmitting={createCustomerMutation.isPending}
        />
      )}

      {/* Cannabis Payment Modal */}
      {showPayment && (
        <CannabisPaymentModal
          cartTotals={cartTotals}
          customer={selectedCustomer!}
          paymentMethods={PAYMENT_METHODS}
          selectedPaymentMethod={selectedPaymentMethod}
          cashTendered={cashTendered}
          onSelectPaymentMethod={setSelectedPaymentMethod}
          onCashTenderedChange={setCashTendered}
          onClose={() => setShowPayment(false)}
          onProcessTransaction={processTransaction}
          isProcessing={createTransactionMutation.isPending}
          complianceCheck={complianceCheck}
        />
      )}

      {/* Cannabis Receipt Modal */}
      {showReceipt && completedTransaction && (
        <CannabisReceiptModal
          transaction={completedTransaction}
          customer={selectedCustomer!}
          onClose={() => {
            setShowReceipt(false)
            clearCart()
            setCompletedTransaction(null)
          }}
          onPrint={() => console.log('Print receipt')}
          onNewTransaction={() => {
            setShowReceipt(false)
            clearCart()
            setCompletedTransaction(null)
          }}
        />
      )}
    </div>
  )
}

/**
 * Cannabis POS header
 */
function CannabisPOSHeader({
  customerCount,
  cartTotal,
  onSettings
}: {
  customerCount: number
  cartTotal: number
  onSettings: () => void
}) {
  return (
    <div className="bg-cultivateco-green text-cultivateco-cream p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Leaf className="w-6 h-6" />
          <h1 className="text-xl font-bold">CultivateCo POS</h1>
        </div>
        
        <div className="text-sm text-cultivateco-cream/80">
          {new Date().toLocaleDateString()} • {new Date().toLocaleTimeString()}
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{customerCount} Customers</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <ShoppingCart className="w-4 h-4" />
            <span>{formatCurrency(cartTotal)}</span>
          </div>
        </div>

        <button
          onClick={onSettings}
          className="p-2 rounded-lg bg-cultivateco-cream/10 hover:bg-cultivateco-cream/20 transition-colors"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

/**
 * Cannabis product filters
 */
function CannabisProductFilters({
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  categories
}: {
  searchQuery: string
  onSearchChange: (query: string) => void
  categoryFilter: string
  onCategoryChange: (category: string) => void
  categories: string[]
}) {
  return (
    <div className="space-y-4">
      <CannabisSearchInput
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search cannabis products..."
        icon={Search}
      />

      <div className="flex space-x-2 overflow-x-auto">
        <button
          onClick={() => onCategoryChange('all')}
          className={cn(
            'px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors',
            categoryFilter === 'all'
              ? 'bg-cultivateco-green text-cultivateco-cream'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          )}
        >
          All Products
        </button>
        
        {categories.map(category => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors',
              categoryFilter === category
                ? 'bg-cultivateco-green text-cultivateco-cream'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            )}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}

/**
 * Cannabis product grid
 */
function CannabisProductGrid({
  products,
  onAddToCart
}: {
  products: CannabisProduct[]
  onAddToCart: (product: CannabisProduct, quantity: number) => void
}) {
  if (products.length === 0) {
    return (
      <CannabisEmptyState
        icon={Package}
        title="No Cannabis Products Found"
        description="No cannabis products match your search criteria."
      />
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 flex-1 overflow-y-auto">
      {products.map(product => (
        <CannabisProductCard
          key={product.id}
          product={product}
          onAddToCart={(quantity) => onAddToCart(product, quantity)}
        />
      ))}
    </div>
  )
}

/**
 * Cannabis product card
 */
function CannabisProductCard({
  product,
  onAddToCart
}: {
  product: CannabisProduct
  onAddToCart: (quantity: number) => void
}) {
  const [quantity, setQuantity] = useState(1)

  const getPotencyColor = (potency: string) => {
    switch (potency) {
      case 'low': return 'text-green-600'
      case 'medium': return 'text-amber-600'
      case 'high': return 'text-red-600'
      default: return 'text-gray-600'
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

  return (
    <CannabisThemeContainer variant="card" className="hover:shadow-cultivateco-md transition-shadow">
      <div className="space-y-3">
        {/* Product Header */}
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="font-medium text-gray-900 line-clamp-2">{product.name}</h3>
            <CannabisBadge variant="info" size="sm">
              {formatCannabisWeight(product.inStock, product.unit)} left
            </CannabisBadge>
          </div>
          
          <div className="text-sm text-gray-600">{product.brand}</div>
          
          <div className="flex items-center space-x-2">
            {product.strainType && (
              <span className={cn('px-2 py-1 rounded-full text-xs', getStrainColor(product.strainType))}>
                {product.strainType}
              </span>
            )}
            <span className={cn('text-xs font-medium', getPotencyColor(product.potency))}>
              {product.potency.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Cannabis Info */}
        {(product.thcPercentage || product.cbdPercentage) && (
          <div className="flex items-center space-x-4 text-sm">
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

        {/* Price */}
        <div className="space-y-1">
          <div className="text-lg font-bold text-cultivateco-green">
            {formatCurrency(product.price)}
          </div>
          <div className="text-sm text-gray-500">
            per {product.unit}
          </div>
        </div>

        {/* Add to Cart */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-1 rounded border border-gray-300 hover:bg-gray-50"
              disabled={quantity <= 1}
            >
              <Minus className="w-4 h-4" />
            </button>
            
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-16 text-center border border-gray-300 rounded px-2 py-1 text-sm"
              min="1"
              max={product.inStock}
            />
            
            <button
              onClick={() => setQuantity(Math.min(product.inStock, quantity + 1))}
              className="p-1 rounded border border-gray-300 hover:bg-gray-50"
              disabled={quantity >= product.inStock}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <CannabisButton
            onClick={() => onAddToCart(quantity)}
            className="w-full"
            variant="primary"
            size="sm"
            icon={ShoppingCart}
            disabled={product.inStock === 0}
          >
            Add to Cart
          </CannabisButton>
        </div>
      </div>
    </CannabisThemeContainer>
  )
}

/**
 * Cannabis cart panel
 */
function CannabisCartPanel({
  cart,
  customer,
  cartTotals,
  appliedDiscounts,
  complianceCheck,
  onUpdateQuantity,
  onRemoveItem,
  onSelectCustomer,
  onAddCustomer,
  onApplyDiscount,
  onRemoveDiscount,
  onClearCart,
  onCheckout
}: {
  cart: CartItem[]
  customer: CannabisCustomer | null
  cartTotals: any
  appliedDiscounts: CannabisDiscount[]
  complianceCheck: any
  onUpdateQuantity: (productId: string, quantity: number) => void
  onRemoveItem: (productId: string) => void
  onSelectCustomer: () => void
  onAddCustomer: () => void
  onApplyDiscount: (discount: CannabisDiscount) => void
  onRemoveDiscount: (discountId: string) => void
  onClearCart: () => void
  onCheckout: () => void
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Customer Section */}
      <div className="p-4 border-b border-gray-200">
        {customer ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="font-medium">
                {customer.firstName} {customer.lastName}
              </div>
              <button
                onClick={onSelectCustomer}
                className="text-cultivateco-blue hover:text-cultivateco-green text-sm"
              >
                Change
              </button>
            </div>
            
            <div className="text-sm text-gray-600 space-y-1">
              <div>Age: {customer.age} • {customer.customerType.replace('-', ' ')}</div>
              <div>Loyalty Points: {customer.loyaltyPoints}</div>
              
              {customer.medicalCard?.verified && (
                <CannabisBadge variant="success" size="sm">
                  Medical Card Verified
                </CannabisBadge>
              )}
            </div>

            {!complianceCheck.passed && (
              <CannabisAlert
                type="error"
                title="Compliance Issues"
                message={complianceCheck.issues.join(', ')}
              />
            )}
          </div>
        ) : (
          <div className="space-y-2">
            <CannabisButton
              onClick={onSelectCustomer}
              variant="outline"
              icon={User}
              className="w-full"
            >
              Select Customer
            </CannabisButton>
            
            <CannabisButton
              onClick={onAddCustomer}
              variant="outline"
              icon={UserPlus}
              className="w-full"
            >
              Add New Customer
            </CannabisButton>
          </div>
        )}
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {cart.length === 0 ? (
          <CannabisEmptyState
            icon={ShoppingCart}
            title="Cart Empty"
            description="Add cannabis products to start a transaction"
          />
        ) : (
          cart.map(item => (
            <CannabisCartItem
              key={item.product.id}
              item={item}
              onUpdateQuantity={onUpdateQuantity}
              onRemove={onRemoveItem}
            />
          ))
        )}
      </div>

      {/* Discounts */}
      {cart.length > 0 && (
        <div className="p-4 border-t border-gray-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-medium">Discounts</span>
            <button className="text-cultivateco-blue hover:text-cultivateco-green text-sm">
              Browse All
            </button>
          </div>
          
          {CANNABIS_DISCOUNTS.slice(0, 3).map(discount => (
            <button
              key={discount.id}
              onClick={() => onApplyDiscount(discount)}
              disabled={appliedDiscounts.some(d => d.id === discount.id)}
              className="w-full text-left p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="text-sm font-medium">{discount.name}</div>
              <div className="text-xs text-gray-600">{discount.description}</div>
            </button>
          ))}

          {appliedDiscounts.map(discount => (
            <div key={discount.id} className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
              <div className="text-sm text-green-700">{discount.name}</div>
              <button
                onClick={() => onRemoveDiscount(discount.id)}
                className="text-green-600 hover:text-green-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Cart Totals */}
      {cart.length > 0 && (
        <div className="p-4 border-t border-gray-200 space-y-3">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal ({cartTotals.totalItems} items)</span>
              <span>{formatCurrency(cartTotals.subtotal)}</span>
            </div>
            
            <div className="flex justify-between">
              <span>Tax</span>
              <span>{formatCurrency(cartTotals.tax)}</span>
            </div>
            
            {cartTotals.discountAmount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discounts</span>
                <span>-{formatCurrency(cartTotals.discountAmount)}</span>
              </div>
            )}
            
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total</span>
              <span>{formatCurrency(cartTotals.total)}</span>
            </div>
          </div>

          <div className="space-y-2">
            <CannabisButton
              onClick={onClearCart}
              variant="outline"
              className="w-full"
              icon={Trash2}
            >
              Clear Cart
            </CannabisButton>
            
            <CannabisButton
              onClick={onCheckout}
              variant="primary"
              className="w-full"
              icon={CreditCard}
              disabled={!customer || !complianceCheck.passed || cart.length === 0}
            >
              Checkout
            </CannabisButton>
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Cannabis cart item
 */
function CannabisCartItem({
  item,
  onUpdateQuantity,
  onRemove
}: {
  item: CartItem
  onUpdateQuantity: (productId: string, quantity: number) => void
  onRemove: (productId: string) => void
}) {
  return (
    <div className="border border-gray-200 rounded-lg p-3 space-y-2">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="font-medium text-sm">{item.product.name}</div>
          <div className="text-xs text-gray-600">{item.product.brand}</div>
          <div className="text-sm text-cultivateco-green font-medium">
            {formatCurrency(item.unitPrice)} each
          </div>
        </div>
        
        <button
          onClick={() => onRemove(item.product.id)}
          className="text-gray-400 hover:text-red-600"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
            className="p-1 rounded border border-gray-300 hover:bg-gray-50"
            disabled={item.quantity <= 1}
          >
            <Minus className="w-3 h-3" />
          </button>
          
          <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
          
          <button
            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
            className="p-1 rounded border border-gray-300 hover:bg-gray-50"
            disabled={item.quantity >= item.product.inStock}
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
        
        <div className="text-sm font-medium">
          {formatCurrency(item.total)}
        </div>
      </div>
    </div>
  )
}

/**
 * Cannabis customer search modal - simplified for space
 */
function CannabisCustomerSearchModal({
  customers,
  onClose,
  onSelectCustomer,
  onAddNew
}: {
  customers: CannabisCustomer[]
  onClose: () => void
  onSelectCustomer: (customer: CannabisCustomer) => void
  onAddNew: () => void
}) {
  const [search, setSearch] = useState('')

  const filteredCustomers = customers.filter(customer => {
    const fullName = `${customer.firstName} ${customer.lastName}`.toLowerCase()
    return fullName.includes(search.toLowerCase()) || 
           customer.phone?.includes(search) ||
           customer.email?.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-cultivateco-green">Select Customer</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="mt-4 space-y-3">
            <CannabisSearchInput
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search customers..."
            />
            
            <CannabisButton
              onClick={onAddNew}
              variant="outline"
              icon={UserPlus}
              className="w-full"
            >
              Add New Customer
            </CannabisButton>
          </div>
        </div>

        <div className="p-6 space-y-3">
          {filteredCustomers.map(customer => (
            <button
              key={customer.id}
              onClick={() => onSelectCustomer(customer)}
              className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="font-medium">
                {customer.firstName} {customer.lastName}
              </div>
              <div className="text-sm text-gray-600">
                Age: {customer.age} • {customer.phone}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

/**
 * Cannabis quick add customer modal - simplified
 */
function CannabisQuickAddCustomerModal({
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
    dateOfBirth: '',
    identification: {
      type: 'drivers_license',
      number: '',
      expirationDate: ''
    }
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
            <h2 className="text-lg font-semibold text-cultivateco-green">Quick Add Customer</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <CannabisInput
              label="First Name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />
            
            <CannabisInput
              label="Last Name"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />
          </div>

          <CannabisInput
            label="Date of Birth"
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
          />

          <CannabisInput
            label="ID Number"
            value={formData.identification.number}
            onChange={(e) => setFormData({ 
              ...formData, 
              identification: { ...formData.identification, number: e.target.value }
            })}
          />

          <CannabisInput
            label="ID Expiration"
            type="date"
            value={formData.identification.expirationDate}
            onChange={(e) => setFormData({ 
              ...formData, 
              identification: { ...formData.identification, expirationDate: e.target.value }
            })}
          />

          <div className="flex space-x-4">
            <CannabisButton
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </CannabisButton>
            
            <CannabisButton
              type="submit"
              variant="primary"
              loading={isSubmitting}
              className="flex-1"
            >
              Add Customer
            </CannabisButton>
          </div>
        </form>
      </div>
    </div>
  )
}

/**
 * Cannabis payment modal - simplified
 */
function CannabisPaymentModal({
  cartTotals,
  customer,
  paymentMethods,
  selectedPaymentMethod,
  cashTendered,
  onSelectPaymentMethod,
  onCashTenderedChange,
  onClose,
  onProcessTransaction,
  isProcessing,
  complianceCheck
}: {
  cartTotals: any
  customer: CannabisCustomer
  paymentMethods: PaymentMethod[]
  selectedPaymentMethod: PaymentMethod | null
  cashTendered: number
  onSelectPaymentMethod: (method: PaymentMethod) => void
  onCashTenderedChange: (amount: number) => void
  onClose: () => void
  onProcessTransaction: () => void
  isProcessing: boolean
  complianceCheck: any
}) {
  const change = selectedPaymentMethod?.type === 'cash' ? Math.max(0, cashTendered - cartTotals.total) : 0

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-cultivateco-green">Payment</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Payment Methods */}
          <div className="space-y-3">
            <h3 className="font-medium">Select Payment Method</h3>
            
            <div className="grid grid-cols-2 gap-3">
              {paymentMethods.filter(method => method.enabled).map(method => {
                const Icon = method.icon
                return (
                  <button
                    key={method.id}
                    onClick={() => onSelectPaymentMethod(method)}
                    className={cn(
                      'p-3 border rounded-lg flex items-center space-x-2 transition-colors',
                      selectedPaymentMethod?.id === method.id
                        ? 'border-cultivateco-green bg-cultivateco-green/5'
                        : 'border-gray-200 hover:bg-gray-50'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm">{method.name}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Cash Payment */}
          {selectedPaymentMethod?.type === 'cash' && (
            <div className="space-y-3">
              <CannabisInput
                label="Cash Tendered"
                type="number"
                value={cashTendered}
                onChange={(e) => onCashTenderedChange(parseFloat(e.target.value) || 0)}
                min={cartTotals.total}
                step="0.01"
              />
              
              {change > 0 && (
                <div className="text-lg font-medium text-cultivateco-green">
                  Change: {formatCurrency(change)}
                </div>
              )}
            </div>
          )}

          {/* Total */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-lg font-bold">
              Total: {formatCurrency(cartTotals.total)}
            </div>
          </div>

          {/* Compliance Warning */}
          {!complianceCheck.passed && (
            <CannabisAlert
              type="error"
              title="Cannot Process Payment"
              message="Compliance issues must be resolved before payment"
            />
          )}

          <div className="flex space-x-4">
            <CannabisButton
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </CannabisButton>
            
            <CannabisButton
              onClick={onProcessTransaction}
              variant="primary"
              className="flex-1"
              loading={isProcessing}
              disabled={!selectedPaymentMethod || !complianceCheck.passed || 
                       (selectedPaymentMethod.type === 'cash' && cashTendered < cartTotals.total)}
            >
              Process Payment
            </CannabisButton>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Cannabis receipt modal - simplified
 */
function CannabisReceiptModal({
  transaction,
  customer,
  onClose,
  onPrint,
  onNewTransaction
}: {
  transaction: any
  customer: CannabisCustomer
  onClose: () => void
  onPrint: () => void
  onNewTransaction: () => void
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6 text-center space-y-4">
          <div className="w-16 h-16 bg-cultivateco-green rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-cultivateco-cream" />
          </div>
          
          <div>
            <h2 className="text-xl font-bold text-cultivateco-green">Transaction Complete!</h2>
            <p className="text-gray-600">Receipt #: {transaction.id}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg text-left">
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Customer:</span>
                <span>{customer.firstName} {customer.lastName}</span>
              </div>
              <div className="flex justify-between">
                <span>Total:</span>
                <span className="font-medium">{formatCurrency(transaction.total)}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment:</span>
                <span>{transaction.paymentMethod}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex space-x-3">
              <CannabisButton
                onClick={onPrint}
                variant="outline"
                icon={Printer}
                className="flex-1"
              >
                Print
              </CannabisButton>
              
              <CannabisButton
                onClick={onNewTransaction}
                variant="primary"
                className="flex-1"
              >
                New Sale
              </CannabisButton>
            </div>
            
            <CannabisButton
              onClick={onClose}
              variant="ghost"
              className="w-full"
            >
              Close
            </CannabisButton>
          </div>
        </div>
      </div>
    </div>
  )
}
