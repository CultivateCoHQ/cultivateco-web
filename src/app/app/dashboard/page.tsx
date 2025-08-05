'use client'

import { useState, useEffect } from 'react'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Package, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  DollarSign,
  Calendar,
  Clock,
  Eye,
  ArrowRight,
  Leaf,
  Building2
} from 'lucide-react'
import { useRequireAuth } from '@/providers/auth-provider'
import { CannabisThemeContainer, CannabisStatusIndicator } from '@/providers/theme-provider'
import { formatCurrency, formatCannabisWeight, calculateGrowth, getRelativeTime } from '@/lib/utils'

/**
 * =============================================================================
 * CultivateCo Cannabis Business Dashboard
 * =============================================================================
 * Comprehensive cannabis business overview and analytics
 */

export default function CannabisDashboardPage() {
  const { user, currentFacility } = useRequireAuth()
  const [dashboardData, setDashboardData] = useState<CannabisDashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | '7d' | '30d' | '90d'>('7d')

  // Load cannabis dashboard data
  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true)
      try {
        // Simulate API call - replace with actual cannabis API
        await new Promise(resolve => setTimeout(resolve, 1000))
        setDashboardData(mockCannabisDashboardData)
      } catch (error) {
        console.error('Cannabis dashboard data error:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadDashboardData()
  }, [selectedPeriod, currentFacility])

  if (isLoading) {
    return <CannabisDashboardLoading />
  }

  if (!dashboardData) {
    return <CannabisDashboardError />
  }

  return (
    <div className="p-6 space-y-8">
      {/* Cannabis Welcome Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-cultivateco-green">
            Welcome back, {user?.firstName}! 👋
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your cannabis business today
          </p>
        </div>
        
        {/* Cannabis Period Selector */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Period:</span>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value as any)}
            className="form-input py-2 px-3 text-sm"
          >
            <option value="today">Today</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Cannabis Compliance Status Alert */}
      <CannabisComplianceAlert compliance={dashboardData.compliance} />

      {/* Cannabis Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <CannabisMetricCard
          title="Total Revenue"
          value={formatCurrency(dashboardData.metrics.revenue.current)}
          change={calculateGrowth(dashboardData.metrics.revenue.current, dashboardData.metrics.revenue.previous)}
          icon={DollarSign}
          color="green"
        />
        
        <CannabisMetricCard
          title="Transactions"
          value={dashboardData.metrics.transactions.current.toLocaleString()}
          change={calculateGrowth(dashboardData.metrics.transactions.current, dashboardData.metrics.transactions.previous)}
          icon={BarChart3}
          color="blue"
        />
        
        <CannabisMetricCard
          title="Active Customers"
          value={dashboardData.metrics.customers.current.toLocaleString()}
          change={calculateGrowth(dashboardData.metrics.customers.current, dashboardData.metrics.customers.previous)}
          icon={Users}
          color="purple"
        />
        
        <CannabisMetricCard
          title="Compliance Score"
          value={`${dashboardData.metrics.complianceScore.current}%`}
          change={calculateGrowth(dashboardData.metrics.complianceScore.current, dashboardData.metrics.complianceScore.previous)}
          icon={Shield}
          color="green"
        />
      </div>

      {/* Cannabis Dashboard Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Cannabis Recent Activity */}
        <CannabisRecentActivity activities={dashboardData.recentActivity} />
        
        {/* Cannabis Inventory Alerts */}
        <CannabisInventoryAlerts alerts={dashboardData.inventoryAlerts} />
      </div>

      {/* Cannabis Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Cannabis Sales Chart */}
        <CannabisSalesChart data={dashboardData.salesChart} />
        
        {/* Cannabis Top Products */}
        <CannabisTopProducts products={dashboardData.topProducts} />
      </div>

      {/* Cannabis Quick Actions */}
      <CannabisQuickActions />
    </div>
  )
}

/**
 * Cannabis compliance status alert
 */
function CannabisComplianceAlert({ compliance }: { compliance: CannabisComplianceStatus }) {
  const getAlertStyle = () => {
    switch (compliance.status) {
      case 'compliant':
        return 'bg-cultivateco-green/10 border-cultivateco-green/20 text-cultivateco-green'
      case 'warning':
        return 'bg-amber-50 border-amber-200 text-amber-700'
      case 'violation':
        return 'bg-red-50 border-red-200 text-red-700'
      default:
        return 'bg-gray-50 border-gray-200 text-gray-700'
    }
  }

  const getIcon = () => {
    switch (compliance.status) {
      case 'compliant':
        return <CheckCircle className="w-5 h-5" />
      case 'warning':
      case 'violation':
        return <AlertTriangle className="w-5 h-5" />
      default:
        return <Shield className="w-5 h-5" />
    }
  }

  return (
    <div className={`rounded-lg border p-4 ${getAlertStyle()}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {getIcon()}
          <div className="space-y-1">
            <div className="font-medium">
              Cannabis Compliance Status: {compliance.status.charAt(0).toUpperCase() + compliance.status.slice(1)}
            </div>
            <div className="text-sm opacity-80">
              {compliance.message}
            </div>
          </div>
        </div>
        
        {compliance.actionRequired && (
          <button className="btn-cultivateco-outline text-sm py-2 px-4">
            View Details
          </button>
        )}
      </div>
      
      {compliance.violations > 0 && (
        <div className="mt-3 text-sm opacity-80">
          {compliance.violations} active violation(s) • Last METRC sync: {getRelativeTime(compliance.lastSync)}
        </div>
      )}
    </div>
  )
}

/**
 * Cannabis metric card component
 */
function CannabisMetricCard({
  title,
  value,
  change,
  icon: Icon,
  color = 'green'
}: {
  title: string
  value: string
  change: { percentage: number; isPositive: boolean; formatted: string }
  icon: React.ComponentType<{ className?: string }>
  color?: 'green' | 'blue' | 'purple' | 'amber'
}) {
  const colorClasses = {
    green: 'bg-cultivateco-green/10 text-cultivateco-green',
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    amber: 'bg-amber-50 text-amber-600'
  }

  return (
    <CannabisThemeContainer variant="card" className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-gray-600">{title}</div>
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="text-2xl font-bold text-cultivateco-green">
          {value}
        </div>
        
        <div className="flex items-center space-x-2">
          {change.isPositive ? (
            <TrendingUp className="w-4 h-4 text-cultivateco-green" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500" />
          )}
          <span className={`text-sm font-medium ${change.isPositive ? 'text-cultivateco-green' : 'text-red-500'}`}>
            {change.formatted}
          </span>
          <span className="text-sm text-gray-500">vs previous period</span>
        </div>
      </div>
    </CannabisThemeContainer>
  )
}

/**
 * Cannabis recent activity component
 */
function CannabisRecentActivity({ activities }: { activities: CannabisActivity[] }) {
  return (
    <CannabisThemeContainer variant="card" className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-cultivateco-green">Recent Activity</h3>
        <button className="text-sm text-cultivateco-blue hover:text-cultivateco-green transition-colors">
          View All
        </button>
      </div>
      
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="flex-shrink-0">
              <CannabisStatusIndicator 
                status={activity.type === 'compliance' ? 'compliant' : 'offline'} 
                size="sm" 
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900">
                {activity.description}
              </div>
              <div className="text-xs text-gray-500">
                {getRelativeTime(activity.timestamp)}
              </div>
            </div>
            
            {activity.amount && (
              <div className="text-sm font-medium text-cultivateco-green">
                {formatCurrency(activity.amount)}
              </div>
            )}
          </div>
        ))}
      </div>
    </CannabisThemeContainer>
  )
}

/**
 * Cannabis inventory alerts component
 */
function CannabisInventoryAlerts({ alerts }: { alerts: CannabisInventoryAlert[] }) {
  return (
    <CannabisThemeContainer variant="card" className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-cultivateco-green">Inventory Alerts</h3>
        <button className="text-sm text-cultivateco-blue hover:text-cultivateco-green transition-colors">
          Manage Inventory
        </button>
      </div>
      
      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <div key={index} className="flex items-center space-x-3 p-3 border border-amber-200 bg-amber-50 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
            
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-amber-800">
                {alert.productName}
              </div>
              <div className="text-xs text-amber-600">
                {alert.type === 'low_stock' ? 'Low Stock' : 'Expiring Soon'} • 
                {alert.type === 'low_stock' 
                  ? ` ${formatCannabisWeight(alert.quantity)} remaining`
                  : ` Expires ${getRelativeTime(alert.expiryDate!)}`
                }
              </div>
            </div>
            
            <button className="text-xs text-amber-700 hover:text-amber-900 font-medium">
              Action
            </button>
          </div>
        ))}
      </div>
    </CannabisThemeContainer>
  )
}

/**
 * Cannabis sales chart component
 */
function CannabisSalesChart({ data }: { data: any[] }) {
  return (
    <CannabisThemeContainer variant="card" className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-cultivateco-green">Sales Overview</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <TrendingUp className="w-4 h-4" />
          <span>+12.5% this period</span>
        </div>
      </div>
      
      {/* Simplified chart placeholder */}
      <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
        <div className="text-center space-y-2">
          <BarChart3 className="w-12 h-12 text-cultivateco-green mx-auto" />
          <div className="text-sm text-gray-600">Sales Chart</div>
          <div className="text-xs text-gray-500">Chart visualization would be implemented here</div>
        </div>
      </div>
    </CannabisThemeContainer>
  )
}

/**
 * Cannabis top products component
 */
function CannabisTopProducts({ products }: { products: CannabisTopProduct[] }) {
  return (
    <CannabisThemeContainer variant="card" className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-cultivateco-green">Top Products</h3>
        <button className="text-sm text-cultivateco-blue hover:text-cultivateco-green transition-colors">
          View All Products
        </button>
      </div>
      
      <div className="space-y-3">
        {products.map((product, index) => (
          <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-cultivateco-green/10 rounded-lg flex items-center justify-center">
              <Leaf className="w-4 h-4 text-cultivateco-green" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900">
                {product.name}
              </div>
              <div className="text-xs text-gray-500">
                {product.category} • {formatCannabisWeight(product.sold)} sold
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-sm font-medium text-cultivateco-green">
                {formatCurrency(product.revenue)}
              </div>
              <div className="text-xs text-gray-500">
                {product.transactions} sales
              </div>
            </div>
          </div>
        ))}
      </div>
    </CannabisThemeContainer>
  )
}

/**
 * Cannabis quick actions component
 */
function CannabisQuickActions() {
  const quickActions = [
    {
      title: 'Process Sale',
      description: 'Start a new cannabis transaction',
      icon: DollarSign,
      href: '/app/pos',
      color: 'bg-cultivateco-green hover:bg-cultivateco-green/90'
    },
    {
      title: 'Add Inventory',
      description: 'Receive new cannabis products',
      icon: Package,
      href: '/app/inventory/add',
      color: 'bg-cultivateco-blue hover:bg-cultivateco-blue/90'
    },
    {
      title: 'View Reports',
      description: 'Generate compliance reports',
      icon: BarChart3,
      href: '/app/reports',
      color: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      title: 'Check Compliance',
      description: 'Review compliance status',
      icon: Shield,
      href: '/app/compliance',
      color: 'bg-amber-600 hover:bg-amber-700'
    }
  ]

  return (
    <CannabisThemeContainer variant="card" className="space-y-4">
      <h3 className="text-lg font-semibold text-cultivateco-green">Quick Actions</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <button
            key={index}
            className={`${action.color} text-white p-4 rounded-lg text-left space-y-2 transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1`}
          >
            <action.icon className="w-6 h-6" />
            <div className="space-y-1">
              <div className="font-medium">{action.title}</div>
              <div className="text-sm opacity-90">{action.description}</div>
            </div>
          </button>
        ))}
      </div>
    </CannabisThemeContainer>
  )
}

/**
 * Cannabis dashboard loading state
 */
function CannabisDashboardLoading() {
  return (
    <div className="p-6 space-y-8">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-cultivateco-cream border border-gray-200 rounded-lg p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Cannabis dashboard error state
 */
function CannabisDashboardError() {
  return (
    <div className="p-6">
      <div className="text-center space-y-4">
        <AlertTriangle className="w-12 h-12 text-red-500 mx-auto" />
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">
            Cannabis Dashboard Unavailable
          </h3>
          <p className="text-gray-600">
            Unable to load cannabis business data. Please try again.
          </p>
        </div>
        <button className="btn-cultivateco-primary">
          Retry Dashboard
        </button>
      </div>
    </div>
  )
}

// Mock data types and data
interface CannabisDashboardData {
  metrics: {
    revenue: { current: number; previous: number }
    transactions: { current: number; previous: number }
    customers: { current: number; previous: number }
    complianceScore: { current: number; previous: number }
  }
  compliance: CannabisComplianceStatus
  recentActivity: CannabisActivity[]
  inventoryAlerts: CannabisInventoryAlert[]
  salesChart: any[]
  topProducts: CannabisTopProduct[]
}

interface CannabisComplianceStatus {
  status: 'compliant' | 'warning' | 'violation'
  message: string
  violations: number
  lastSync: Date
  actionRequired: boolean
}

interface CannabisActivity {
  type: 'sale' | 'inventory' | 'compliance'
  description: string
  timestamp: Date
  amount?: number
}

interface CannabisInventoryAlert {
  productName: string
  type: 'low_stock' | 'expiring'
  quantity: number
  expiryDate?: Date
}

interface CannabisTopProduct {
  name: string
  category: string
  sold: number
  revenue: number
  transactions: number
}

// Mock cannabis dashboard data
const mockCannabisDashboardData: CannabisDashboardData = {
  metrics: {
    revenue: { current: 47329, previous: 42156 },
    transactions: { current: 287, previous: 251 },
    customers: { current: 1542, previous: 1398 },
    complianceScore: { current: 98.7, previous: 96.4 }
  },
  compliance: {
    status: 'compliant',
    message: 'All cannabis operations are compliant with New Mexico Cannabis Control Division requirements',
    violations: 0,
    lastSync: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    actionRequired: false
  },
  recentActivity: [
    {
      type: 'sale',
      description: 'Cannabis transaction completed - Flower purchase',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      amount: 89.50
    },
    {
      type: 'inventory',
      description: 'Cannabis inventory updated - OG Kush received',
      timestamp: new Date(Date.now() - 1000 * 60 * 12),
    },
    {
      type: 'compliance',
      description: 'METRC sync completed successfully',
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
    }
  ],
  inventoryAlerts: [
    {
      productName: 'Blue Dream - Flower',
      type: 'low_stock',
      quantity: 28.5
    },
    {
      productName: 'Edible Gummies - 10mg',
      type: 'expiring',
      quantity: 50,
      expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) // 7 days
    }
  ],
  salesChart: [], // Chart data would be here
  topProducts: [
    {
      name: 'OG Kush - Flower',
      category: 'Flower',
      sold: 245.5,
      revenue: 4321.50,
      transactions: 23
    },
    {
      name: 'Vape Cartridge - Hybrid',
      category: 'Vape',
      sold: 15,
      revenue: 2850.00,
      transactions: 15
    },
    {
      name: 'Edible Chocolates - 5mg',
      category: 'Edibles',
      sold: 120,
      revenue: 1890.00,
      transactions: 31
    }
  ]
}
