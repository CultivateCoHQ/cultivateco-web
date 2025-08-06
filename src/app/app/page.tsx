'use client'

import { useState, useMemo } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock,
  Calendar,
  Activity,
  BarChart3,
  PieChart,
  Target,
  Star,
  Zap,
  Bell,
  Filter,
  RefreshCw,
  ArrowRight,
  Plus,
  Eye,
  MapPin,
  Thermometer,
  Droplets,
  Sun,
  CloudRain,
  Leaf,
  Building2,
  UserCheck,
  Shield,
  FileText,
  Truck,
  CreditCard,
  Percent,
  Gauge,
  LineChart,
  AreaChart,
  PlayCircle,
  PauseCircle,
  Settings,
  HelpCircle,
  ExternalLink,
  MessageSquare,
  Mail,
  Phone,
  BookOpen,
  Award,
  TrendingUpIcon,
  ChevronRight,
  ChevronDown,
  Search
} from 'lucide-react'
import {
  useCannabisBusinessMetrics,
  useCannabisRecentActivity,
  useCannabisComplianceAlerts,
  useCannabisInventoryAlerts,
  useCannabisStaffActivity,
  useCannabisWeatherData,
  useCannabisNewsUpdates,
  useCannabisQuickStats
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
  CannabisChart,
  CannabisProgressBar
} from '@/components/ui/cannabis-components'
import { CannabisThemeContainer, CannabisStatusIndicator } from '@/providers/theme-provider'
import { formatCurrency, formatDate, formatCannabisWeight, cn } from '@/lib/utils'
import Link from 'next/link'

/**
 * =============================================================================
 * CultivateCo Cannabis Business Dashboard
 * =============================================================================
 * Comprehensive cannabis business overview with real-time metrics and insights
 */

interface BusinessMetrics {
  today: {
    sales: number
    orders: number
    customers: number
    avgOrderValue: number
  }
  week: {
    sales: number
    salesGrowth: number
    orders: number
    ordersGrowth: number
    newCustomers: number
    customersGrowth: number
  }
  month: {
    sales: number
    salesGrowth: number
    orders: number
    ordersGrowth: number
    customers: number
    customersGrowth: number
  }
  inventory: {
    totalValue: number
    lowStockItems: number
    expiringItems: number
    turnoverRate: number
  }
  compliance: {
    score: number
    violations: number
    expiringLicenses: number
    metrcSyncStatus: 'synced' | 'pending' | 'error'
  }
  staff: {
    activeToday: number
    totalStaff: number
    avgPerformance: number
    trainingAlerts: number
  }
}

interface RecentActivity {
  id: string
  type: 'sale' | 'order' | 'inventory' | 'compliance' | 'staff' | 'customer'
  title: string
  description: string
  timestamp: string
  user?: string
  amount?: number
  status?: string
  priority?: 'low' | 'normal' | 'high' | 'urgent'
}

interface ComplianceAlert {
  id: string
  type: 'license-expiring' | 'training-overdue' | 'metrc-sync' | 'violation' | 'audit'
  title: string
  description: string
  severity: 'info' | 'warning' | 'critical'
  dueDate?: string
  actionRequired: boolean
}

interface WeatherData {
  current: {
    temperature: number
    humidity: number
    conditions: string
    icon: string
  }
  forecast: Array<{
    date: string
    high: number
    low: number
    conditions: string
    icon: string
  }>
  alerts: Array<{
    type: string
    description: string
    severity: 'minor' | 'moderate' | 'severe'
  }>
}

export default function CannabisDashboard() {
  // Cannabis dashboard state
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month'>('today')
  const [showAllAlerts, setShowAllAlerts] = useState(false)
  const [selectedMetricCategory, setSelectedMetricCategory] = useState<'sales' | 'inventory' | 'compliance' | 'staff'>('sales')

  // Cannabis API hooks
  const { 
    data: businessMetrics, 
    isLoading: metricsLoading,
    refetch: refetchMetrics 
  } = useCannabisBusinessMetrics({ timeRange })

  const { 
    data: recentActivity, 
    isLoading: activityLoading 
  } = useCannabisRecentActivity({ limit: 10 })

  const { 
    data: complianceAlerts, 
    isLoading: alertsLoading 
  } = useCannabisComplianceAlerts()

  const { 
    data: inventoryAlerts 
  } = useCannabisInventoryAlerts()

  const { 
    data: staffActivity 
  } = useCannabisStaffActivity()

  const { 
    data: weatherData 
  } = useCannabisWeatherData()

  const { 
    data: newsUpdates 
  } = useCannabisNewsUpdates({ limit: 5 })

  const { 
    data: quickStats 
  } = useCannabisQuickStats()

  // Process alerts by priority
  const prioritizedAlerts = useMemo(() => {
    const allAlerts = [
      ...(complianceAlerts || []),
      ...(inventoryAlerts || []).map((alert: any) => ({
        ...alert,
        type: 'inventory',
        severity: alert.quantity <= 0 ? 'critical' : 'warning'
      }))
    ]

    return allAlerts
      .sort((a, b) => {
        const severityOrder = { critical: 3, warning: 2, info: 1 }
        return severityOrder[b.severity as keyof typeof severityOrder] - severityOrder[a.severity as keyof typeof severityOrder]
      })
      .slice(0, showAllAlerts ? undefined : 5)
  }, [complianceAlerts, inventoryAlerts, showAllAlerts])

  // Quick action items
  const quickActions = [
    { 
      label: 'New Sale', 
      href: '/app/pos', 
      icon: ShoppingCart, 
      color: 'green',
      description: 'Process a new sale'
    },
    { 
      label: 'Add Inventory', 
      href: '/app/inventory', 
      icon: Package, 
      color: 'blue',
      description: 'Receive new products'
    },
    { 
      label: 'New Customer', 
      href: '/app/customers', 
      icon: UserCheck, 
      color: 'purple',
      description: 'Register new customer'
    },
    { 
      label: 'View Reports', 
      href: '/app/reports', 
      icon: BarChart3, 
      color: 'amber',
      description: 'Business analytics'
    }
  ]

  if (metricsLoading) {
    return (
      <div className="space-y-6">
        <CannabisDashboardHeader 
          onRefresh={() => {}}
          onTimeRangeChange={() => {}}
          timeRange={timeRange}
        />
        <CannabisLoadingSpinner size="lg" text="Loading cannabis business dashboard..." />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Cannabis Dashboard Header */}
      <CannabisDashboardHeader 
        onRefresh={refetchMetrics}
        onTimeRangeChange={setTimeRange}
        timeRange={timeRange}
      />

      {/* Critical Alerts Banner */}
      {prioritizedAlerts.filter(alert => alert.severity === 'critical').length > 0 && (
        <CannabisAlert
          type="error"
          title="Critical Business Alerts"
          message={`${prioritizedAlerts.filter(alert => alert.severity === 'critical').length} critical issue${prioritizedAlerts.filter(alert => alert.severity === 'critical').length !== 1 ? 's' : ''} require immediate attention.`}
          action={{ 
            label: 'View All Alerts', 
            onClick: () => setShowAllAlerts(true) 
          }}
        />
      )}

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Main Content Area - 3 columns */}
        <div className="xl:col-span-3 space-y-6">
          {/* Key Business Metrics */}
          <CannabisBusinessMetrics 
            metrics={businessMetrics}
            timeRange={timeRange}
            selectedCategory={selectedMetricCategory}
            onCategoryChange={setSelectedMetricCategory}
          />

          {/* Performance Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CannabisSalesChart data={businessMetrics} timeRange={timeRange} />
            <CannabisInventoryChart data={businessMetrics} />
          </div>

          {/* Quick Actions & Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CannabisQuickActions actions={quickActions} />
            <CannabisRecentActivity 
              activities={recentActivity || []}
              isLoading={activityLoading}
            />
          </div>

          {/* Staff Performance & Compliance Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CannabisStaffOverview data={staffActivity} />
            <CannabisComplianceOverview 
              metrics={businessMetrics?.compliance}
              alerts={complianceAlerts || []}
            />
          </div>
        </div>

        {/* Sidebar - 1 column */}
        <div className="space-y-6">
          {/* Business Alerts */}
          <CannabisBusinessAlerts 
            alerts={prioritizedAlerts}
            showAll={showAllAlerts}
            onToggleShowAll={() => setShowAllAlerts(!showAllAlerts)}
          />

          {/* Weather for Cultivation */}
          {weatherData && <CannabisWeatherWidget weather={weatherData} />}

          {/* Quick Stats */}
          <CannabisQuickStats stats={quickStats} />

          {/* Cannabis Industry News */}
          <CannabisNewsWidget news={newsUpdates || []} />

          {/* Help & Resources */}
          <CannabisHelpResources />
        </div>
      </div>
    </div>
  )
}

/**
 * Cannabis dashboard header
 */
function CannabisDashboardHeader({
  onRefresh,
  onTimeRangeChange,
  timeRange
}: {
  onRefresh: () => void
  onTimeRangeChange: (range: 'today' | 'week' | 'month') => void
  timeRange: 'today' | 'week' | 'month'
}) {
  const getCurrentGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 17) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-cultivateco-green flex items-center space-x-2">
          <Activity className="w-6 h-6" />
          <span>{getCurrentGreeting()}! Cannabis Business Dashboard</span>
        </h1>
        <p className="text-gray-600">
          Real-time overview of your cannabis dispensary operations
        </p>
      </div>

      <div className="flex items-center space-x-3">
        <CannabisSelect
          value={timeRange}
          onChange={(e) => onTimeRangeChange(e.target.value as any)}
          options={[
            { value: 'today', label: 'Today' },
            { value: 'week', label: 'This Week' },
            { value: 'month', label: 'This Month' }
          ]}
          className="w-32"
        />

        <CannabisButton
          variant="outline"
          onClick={onRefresh}
          icon={RefreshCw}
        >
          Refresh
        </CannabisButton>

        <Link href="/app/reports">
          <CannabisButton
            variant="primary"
            icon={BarChart3}
          >
            View Reports
          </CannabisButton>
        </Link>
      </div>
    </div>
  )
}

/**
 * Cannabis business metrics overview
 */
function CannabisBusinessMetrics({ 
  metrics, 
  timeRange, 
  selectedCategory,
  onCategoryChange
}: { 
  metrics: BusinessMetrics
  timeRange: 'today' | 'week' | 'month'
  selectedCategory: 'sales' | 'inventory' | 'compliance' | 'staff'
  onCategoryChange: (category: 'sales' | 'inventory' | 'compliance' | 'staff') => void
}) {
  if (!metrics) return null

  const timeData = metrics[timeRange] || metrics.today

  return (
    <CannabisThemeContainer variant="card">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-cultivateco-green">
            Key Business Metrics
          </h2>
          
          <div className="flex space-x-2">
            {[
              { key: 'sales', label: 'Sales', icon: DollarSign },
              { key: 'inventory', label: 'Inventory', icon: Package },
              { key: 'compliance', label: 'Compliance', icon: Shield },
              { key: 'staff', label: 'Staff', icon: Users }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => onCategoryChange(key as any)}
                className={cn(
                  'px-3 py-1 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1',
                  selectedCategory === key
                    ? 'bg-cultivateco-green text-cultivateco-cream'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                )}
              >
                <Icon className="w-3 h-3" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {selectedCategory === 'sales' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <CannabisMetricCard
              title={`${timeRange === 'today' ? "Today's" : timeRange === 'week' ? "This Week's" : "This Month's"} Sales`}
              value={formatCurrency(timeData.sales)}
              change={timeRange !== 'today' ? timeData.salesGrowth : undefined}
              icon={DollarSign}
              color="green"
            />

            <CannabisMetricCard
              title={`${timeRange === 'today' ? "Today's" : timeRange === 'week' ? "This Week's" : "This Month's"} Orders`}
              value={timeData.orders}
              change={timeRange !== 'today' ? timeData.ordersGrowth : undefined}
              icon={ShoppingCart}
              color="blue"
            />

            <CannabisMetricCard
              title="Average Order Value"
              value={formatCurrency(timeData.avgOrderValue)}
              icon={Target}
              color="purple"
            />

            <CannabisMetricCard
              title={`${timeRange === 'today' ? "Today's" : timeRange === 'week' ? "New This Week" : "New This Month"} Customers`}
              value={timeData.customers}
              change={timeRange !== 'today' ? timeData.customersGrowth : undefined}
              icon={Users}
              color="amber"
            />
          </div>
        )}

        {selectedCategory === 'inventory' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <CannabisMetricCard
              title="Total Inventory Value"
              value={formatCurrency(metrics.inventory.totalValue)}
              icon={Package}
              color="green"
            />

            <CannabisMetricCard
              title="Low Stock Items"
              value={metrics.inventory.lowStockItems}
              icon={AlertTriangle}
              color={metrics.inventory.lowStockItems > 0 ? 'red' : 'green'}
            />

            <CannabisMetricCard
              title="Expiring Items"
              value={metrics.inventory.expiringItems}
              icon={Clock}
              color={metrics.inventory.expiringItems > 0 ? 'amber' : 'green'}
            />

            <CannabisMetricCard
              title="Turnover Rate"
              value={`${metrics.inventory.turnoverRate.toFixed(1)}x`}
              icon={RefreshCw}
              color="blue"
            />
          </div>
        )}

        {selectedCategory === 'compliance' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <CannabisMetricCard
              title="Compliance Score"
              value={`${metrics.compliance.score}%`}
              icon={Shield}
              color={metrics.compliance.score >= 90 ? 'green' : metrics.compliance.score >= 70 ? 'amber' : 'red'}
            />

            <CannabisMetricCard
              title="Active Violations"
              value={metrics.compliance.violations}
              icon={AlertTriangle}
              color={metrics.compliance.violations > 0 ? 'red' : 'green'}
            />

            <CannabisMetricCard
              title="Expiring Licenses"
              value={metrics.compliance.expiringLicenses}
              icon={FileText}
              color={metrics.compliance.expiringLicenses > 0 ? 'amber' : 'green'}
            />

            <CannabisMetricCard
              title="METRC Sync"
              value={metrics.compliance.metrcSyncStatus}
              icon={Zap}
              color={metrics.compliance.metrcSyncStatus === 'synced' ? 'green' : 
                     metrics.compliance.metrcSyncStatus === 'pending' ? 'amber' : 'red'}
            />
          </div>
        )}

        {selectedCategory === 'staff' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <CannabisMetricCard
              title="Staff Active Today"
              value={`${metrics.staff.activeToday}/${metrics.staff.totalStaff}`}
              icon={UserCheck}
              color="green"
            />

            <CannabisMetricCard
              title="Total Staff"
              value={metrics.staff.totalStaff}
              icon={Users}
              color="blue"
            />

            <CannabisMetricCard
              title="Avg Performance"
              value={`${metrics.staff.avgPerformance}%`}
              icon={Star}
              color={metrics.staff.avgPerformance >= 90 ? 'green' : 
                     metrics.staff.avgPerformance >= 70 ? 'amber' : 'red'}
            />

            <CannabisMetricCard
              title="Training Alerts"
              value={metrics.staff.trainingAlerts}
              icon={BookOpen}
              color={metrics.staff.trainingAlerts > 0 ? 'amber' : 'green'}
            />
          </div>
        )}
      </div>
    </CannabisThemeContainer>
  )
}

/**
 * Cannabis sales chart
 */
function CannabisSalesChart({ 
  data, 
  timeRange 
}: { 
  data: BusinessMetrics
  timeRange: 'today' | 'week' | 'month'
}) {
  const chartData = useMemo(() => {
    // Mock chart data - in real app this would come from API
    const baseData = []
    const periods = timeRange === 'today' ? 24 : timeRange === 'week' ? 7 : 30
    
    for (let i = 0; i < periods; i++) {
      baseData.push({
        period: timeRange === 'today' ? `${i}:00` : 
                timeRange === 'week' ? `Day ${i + 1}` : 
                `Day ${i + 1}`,
        sales: Math.random() * 5000 + 1000,
        orders: Math.floor(Math.random() * 50) + 10
      })
    }
    
    return baseData
  }, [timeRange])

  return (
    <CannabisThemeContainer variant="card">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-cultivateco-green">
            Sales Performance
          </h3>
          <CannabisBadge variant="success" size="sm">
            <TrendingUp className="w-3 h-3 mr-1" />
            +12.5%
          </CannabisBadge>
        </div>

        <div className="h-64">
          <CannabisChart
            type="line"
            data={chartData}
            xKey="period"
            yKeys={['sales']}
            colors={['#10B981']}
            formatValue={(value) => formatCurrency(value)}
          />
        </div>
      </div>
    </CannabisThemeContainer>
  )
}

/**
 * Cannabis inventory chart
 */
function CannabisInventoryChart({ data }: { data: BusinessMetrics }) {
  const inventoryData = useMemo(() => [
    { category: 'Flower', value: 45, color: '#10B981' },
    { category: 'Concentrates', value: 25, color: '#3B82F6' },
    { category: 'Edibles', value: 20, color: '#F59E0B' },
    { category: 'Pre-Rolls', value: 10, color: '#EF4444' }
  ], [])

  return (
    <CannabisThemeContainer variant="card">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-cultivateco-green">
            Inventory Distribution
          </h3>
          <CannabisBadge variant="info" size="sm">
            {formatCurrency(data?.inventory?.totalValue || 0)}
          </CannabisBadge>
        </div>

        <div className="space-y-3">
          {inventoryData.map((item, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{item.category}</span>
                <span>{item.value}%</span>
              </div>
              <CannabisProgressBar 
                value={item.value} 
                color={item.color}
                className="h-2"
              />
            </div>
          ))}
        </div>
      </div>
    </CannabisThemeContainer>
  )
}

/**
 * Cannabis quick actions
 */
function CannabisQuickActions({ actions }: { actions: Array<any> }) {
  return (
    <CannabisThemeContainer variant="card">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-cultivateco-green">
          Quick Actions
        </h3>

        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <Link key={index} href={action.href}>
              <div className="p-4 border border-gray-200 rounded-lg hover:border-cultivateco-green hover:bg-cultivateco-green/5 transition-colors cursor-pointer group">
                <div className="flex items-center space-x-3">
                  <div className={cn(
                    'w-8 h-8 rounded-lg flex items-center justify-center',
                    action.color === 'green' && 'bg-green-100 text-green-600',
                    action.color === 'blue' && 'bg-blue-100 text-blue-600',
                    action.color === 'purple' && 'bg-purple-100 text-purple-600',
                    action.color === 'amber' && 'bg-amber-100 text-amber-600'
                  )}>
                    <action.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 group-hover:text-cultivateco-green">
                      {action.label}
                    </div>
                    <div className="text-xs text-gray-600">
                      {action.description}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </CannabisThemeContainer>
  )
}

/**
 * Cannabis recent activity
 */
function CannabisRecentActivity({ 
  activities, 
  isLoading 
}: { 
  activities: RecentActivity[]
  isLoading: boolean
}) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'sale': return DollarSign
      case 'order': return ShoppingCart
      case 'inventory': return Package
      case 'compliance': return Shield
      case 'staff': return Users
      case 'customer': return UserCheck
      default: return Activity
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'sale': return 'text-green-600'
      case 'order': return 'text-blue-600'
      case 'inventory': return 'text-purple-600'
      case 'compliance': return 'text-red-600'
      case 'staff': return 'text-amber-600'
      case 'customer': return 'text-indigo-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <CannabisThemeContainer variant="card">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-cultivateco-green">
            Recent Activity
          </h3>
          <Link href="/app/reports">
            <CannabisButton variant="ghost" size="sm" icon={ArrowRight}>
              View All
            </CannabisButton>
          </Link>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-lg" />
                  <div className="flex-1 space-y-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {activities.map((activity) => {
              const Icon = getActivityIcon(activity.type)
              return (
                <div key={activity.id} className="flex items-center space-x-3 p-2 rounded hover:bg-gray-50">
                  <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center bg-gray-100', getActivityColor(activity.type))}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">
                      {activity.title}
                    </div>
                    <div className="text-xs text-gray-600">
                      {activity.description} • {formatDate(activity.timestamp)}
                    </div>
                  </div>
                  {activity.amount && (
                    <div className="text-sm font-medium text-cultivateco-green">
                      {formatCurrency(activity.amount)}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </CannabisThemeContainer>
  )
}

/**
 * Cannabis staff overview
 */
function CannabisStaffOverview({ data }: { data: any }) {
  return (
    <CannabisThemeContainer variant="card">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-cultivateco-green">
            Staff Performance
          </h3>
          <Link href="/app/staff">
            <CannabisButton variant="ghost" size="sm" icon={ArrowRight}>
              View All
            </CannabisButton>
          </Link>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Active Today</span>
            <span className="font-medium">8/12 Staff</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Avg Performance</span>
            <CannabisBadge variant="success" size="sm">92%</CannabisBadge>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Training Due</span>
            <CannabisBadge variant="warning" size="sm">3 Staff</CannabisBadge>
          </div>

          <div className="pt-2 border-t">
            <div className="text-sm font-medium text-gray-900 mb-2">Top Performers Today</div>
            <div className="space-y-2">
              {[
                { name: 'Sarah Johnson', sales: 1250, rating: 4.8 },
                { name: 'Mike Chen', sales: 980, rating: 4.6 },
                { name: 'Emily Davis', sales: 750, rating: 4.9 }
              ].map((staff, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium">
                      {staff.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span>{staff.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-cultivateco-green font-medium">
                      {formatCurrency(staff.sales)}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-amber-500 fill-current" />
                      <span>{staff.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </CannabisThemeContainer>
  )
}

/**
 * Cannabis compliance overview
 */
function CannabisComplianceOverview({ 
  metrics, 
  alerts 
}: { 
  metrics: any
  alerts: ComplianceAlert[]
}) {
  return (
    <CannabisThemeContainer variant="card">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-cultivateco-green">
            Compliance Status
          </h3>
          <Link href="/app/compliance">
            <CannabisButton variant="ghost" size="sm" icon={ArrowRight}>
              View Details
            </CannabisButton>
          </Link>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Overall Score</span>
            <CannabisBadge variant={metrics?.score >= 90 ? 'success' : metrics?.score >= 70 ? 'warning' : 'violation'} size="sm">
              {metrics?.score || 0}%
            </CannabisBadge>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">METRC Sync</span>
            <CannabisBadge variant={metrics?.metrcSyncStatus === 'synced' ? 'success' : 'warning'} size="sm">
              {metrics?.metrcSyncStatus || 'Unknown'}
            </CannabisBadge>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Active Violations</span>
            <CannabisBadge variant={metrics?.violations > 0 ? 'violation' : 'success'} size="sm">
              {metrics?.violations || 0}
            </CannabisBadge>
          </div>

          {alerts.length > 0 && (
            <div className="pt-2 border-t">
              <div className="text-sm font-medium text-gray-900 mb-2">Recent Alerts</div>
              <div className="space-y-2">
                {alerts.slice(0, 3).map((alert, index) => (
                  <div key={index} className="flex items-start space-x-2 text-sm">
                    <AlertTriangle className={cn(
                      'w-4 h-4 mt-0.5',
                      alert.severity === 'critical' ? 'text-red-500' :
                      alert.severity === 'warning' ? 'text-amber-500' : 'text-blue-500'
                    )} />
                    <div className="flex-1">
                      <div className="font-medium">{alert.title}</div>
                      <div className="text-gray-600">{alert.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </CannabisThemeContainer>
  )
}

/**
 * Cannabis business alerts
 */
function CannabisBusinessAlerts({ 
  alerts, 
  showAll, 
  onToggleShowAll 
}: { 
  alerts: any[]
  showAll: boolean
  onToggleShowAll: () => void
}) {
  const getAlertIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return AlertTriangle
      case 'warning': return Clock
      case 'info': return Bell
      default: return Bell
    }
  }

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600'
      case 'warning': return 'text-amber-600'
      case 'info': return 'text-blue-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <CannabisThemeContainer variant="card">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-cultivateco-green">
            Business Alerts
          </h3>
          <CannabisBadge variant="info" size="sm">
            {alerts.length}
          </CannabisBadge>
        </div>

        {alerts.length === 0 ? (
          <div className="text-center py-6">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
            <div className="text-sm text-gray-600">All clear! No active alerts.</div>
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {alerts.map((alert, index) => {
              const Icon = getAlertIcon(alert.severity)
              return (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg border border-gray-200">
                  <Icon className={cn('w-4 h-4 mt-0.5', getAlertColor(alert.severity))} />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">
                      {alert.title}
                    </div>
                    <div className="text-xs text-gray-600">
                      {alert.description}
                    </div>
                    {alert.dueDate && (
                      <div className="text-xs text-gray-500 mt-1">
                        Due: {formatDate(alert.dueDate)}
                      </div>
                    )}
                  </div>
                  {alert.actionRequired && (
                    <CannabisButton variant="outline" size="sm">
                      Action
                    </CannabisButton>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {alerts.length > 5 && (
          <button
            onClick={onToggleShowAll}
            className="w-full text-sm text-cultivateco-blue hover:text-cultivateco-green flex items-center justify-center space-x-1"
          >
            <span>{showAll ? 'Show Less' : `Show All ${alerts.length} Alerts`}</span>
            {showAll ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
          </button>
        )}
      </div>
    </CannabisThemeContainer>
  )
}

/**
 * Cannabis weather widget
 */
function CannabisWeatherWidget({ weather }: { weather: WeatherData }) {
  const getWeatherIcon = (conditions: string) => {
    if (conditions.includes('rain')) return CloudRain
    if (conditions.includes('sun')) return Sun
    return Sun
  }

  const WeatherIcon = getWeatherIcon(weather.current.conditions)

  return (
    <CannabisThemeContainer variant="card">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-cultivateco-green">
          Weather Conditions
        </h3>

        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <WeatherIcon className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <div className="text-2xl font-bold">{weather.current.temperature}°F</div>
            <div className="text-sm text-gray-600">{weather.current.conditions}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Droplets className="w-4 h-4 text-blue-500" />
            <span>Humidity: {weather.current.humidity}%</span>
          </div>
          <div className="flex items-center space-x-2">
            <Thermometer className="w-4 h-4 text-red-500" />
            <span>Ideal for cultivation</span>
          </div>
        </div>

        {weather.alerts.length > 0 && (
          <div className="pt-3 border-t">
            <div className="text-sm font-medium text-gray-900 mb-2">Weather Alerts</div>
            {weather.alerts.map((alert, index) => (
              <div key={index} className="text-xs text-amber-600 bg-amber-50 p-2 rounded">
                {alert.description}
              </div>
            ))}
          </div>
        )}
      </div>
    </CannabisThemeContainer>
  )
}

/**
 * Cannabis quick stats
 */
function CannabisQuickStats({ stats }: { stats: any }) {
  return (
    <CannabisThemeContainer variant="card">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-cultivateco-green">
          Quick Stats
        </h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Conversion Rate</span>
            <span className="font-medium">68.5%</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Cart Abandonment</span>
            <span className="font-medium">12.3%</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Customer Satisfaction</span>
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 text-amber-500 fill-current" />
              <span className="font-medium">4.7/5</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Repeat Customers</span>
            <span className="font-medium">45.2%</span>
          </div>
        </div>
      </div>
    </CannabisThemeContainer>
  )
}

/**
 * Cannabis news widget
 */
function CannabisNewsWidget({ news }: { news: any[] }) {
  return (
    <CannabisThemeContainer variant="card">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-cultivateco-green">
            Cannabis Industry News
          </h3>
          <a 
            href="https://cannabisbusinesstimes.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-cultivateco-blue hover:text-cultivateco-green"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <div className="space-y-3 max-h-64 overflow-y-auto">
          {[
            { title: 'New Cannabis Regulations in California', time: '2 hours ago' },
            { title: 'Market Report: Q1 2024 Growth Trends', time: '4 hours ago' },
            { title: 'Cannabis Banking Updates', time: '6 hours ago' },
            { title: 'Sustainability in Cannabis Cultivation', time: '1 day ago' },
            { title: 'State Licensing Updates', time: '2 days ago' }
          ].map((item, index) => (
            <div key={index} className="p-2 rounded hover:bg-gray-50 cursor-pointer">
              <div className="text-sm font-medium text-gray-900 line-clamp-2">
                {item.title}
              </div>
              <div className="text-xs text-gray-600">
                {item.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </CannabisThemeContainer>
  )
}

/**
 * Cannabis help resources
 */
function CannabisHelpResources() {
  const resources = [
    { label: 'User Guide', icon: BookOpen, href: '/help/guide' },
    { label: 'Compliance Help', icon: Shield, href: '/help/compliance' },
    { label: 'Contact Support', icon: MessageSquare, href: '/help/support' },
    { label: 'Training Videos', icon: PlayCircle, href: '/help/videos' }
  ]

  return (
    <CannabisThemeContainer variant="card">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-cultivateco-green">
          Help & Resources
        </h3>

        <div className="space-y-2">
          {resources.map((resource, index) => (
            <Link key={index} href={resource.href}>
              <div className="flex items-center space-x-3 p-2 rounded hover:bg-gray-50 cursor-pointer group">
                <resource.icon className="w-4 h-4 text-gray-600 group-hover:text-cultivateco-green" />
                <span className="text-sm text-gray-900 group-hover:text-cultivateco-green">
                  {resource.label}
                </span>
                <ChevronRight className="w-3 h-3 text-gray-400 ml-auto" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </CannabisThemeContainer>
  )
}
