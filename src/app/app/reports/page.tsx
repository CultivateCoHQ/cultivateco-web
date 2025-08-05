'use client'

import { useState, useMemo } from 'react'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Download, 
  Calendar, 
  Filter, 
  FileText, 
  DollarSign, 
  Users, 
  Package, 
  ShoppingCart, 
  Percent,
  Eye,
  Settings,
  RefreshCw,
  PieChart,
  LineChart,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  Zap,
  Building,
  CreditCard,
  Printer,
  Mail,
  Share2,
  Plus,
  Edit,
  Trash2,
  Star,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react'
import {
  useCannabisAnalytics,
  useCannabisSalesAnalytics,
  useCannabisInventoryAnalytics,
  useCannabisCustomerAnalytics,
  useCannabisGenerateReport,
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
import { formatCurrency, formatDate, formatCannabisWeight, cn } from '@/lib/utils'

/**
 * =============================================================================
 * CultivateCo Cannabis Reports & Analytics Dashboard
 * =============================================================================
 * Comprehensive business intelligence and regulatory reporting for cannabis operations
 */

interface ReportTemplate {
  id: string
  name: string
  description: string
  category: 'sales' | 'inventory' | 'compliance' | 'customers' | 'financial' | 'regulatory'
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annual' | 'on-demand'
  format: 'pdf' | 'csv' | 'excel' | 'json'
  automated: boolean
  lastGenerated?: string
  nextScheduled?: string
  recipients?: string[]
}

interface AnalyticsData {
  period: string
  metrics: {
    totalSales: number
    totalRevenue: number
    totalCustomers: number
    totalTransactions: number
    averageOrderValue: number
    inventoryValue: number
    complianceScore: number
    profitMargin: number
  }
  trends: {
    salesGrowth: number
    customerGrowth: number
    revenueGrowth: number
    inventoryTurnover: number
  }
  topProducts: Array<{
    id: string
    name: string
    sales: number
    revenue: number
    margin: number
  }>
  customerSegments: Array<{
    segment: string
    count: number
    revenue: number
    averageSpend: number
  }>
  complianceAlerts: Array<{
    id: string
    type: string
    severity: string
    message: string
  }>
}

const REPORT_TEMPLATES: ReportTemplate[] = [
  {
    id: 'daily-sales',
    name: 'Daily Sales Report',
    description: 'Daily sales summary with transaction details and tax calculations',
    category: 'sales',
    frequency: 'daily',
    format: 'pdf',
    automated: true,
    lastGenerated: '2024-11-20T08:00:00Z',
    nextScheduled: '2024-11-21T08:00:00Z',
    recipients: ['manager@dispensary.com', 'owner@dispensary.com']
  },
  {
    id: 'monthly-compliance',
    name: 'Monthly Compliance Report',
    description: 'Comprehensive compliance report for state regulatory submission',
    category: 'compliance',
    frequency: 'monthly',
    format: 'pdf',
    automated: true,
    lastGenerated: '2024-11-01T09:00:00Z',
    nextScheduled: '2024-12-01T09:00:00Z',
    recipients: ['compliance@dispensary.com']
  },
  {
    id: 'inventory-analysis',
    name: 'Inventory Analysis',
    description: 'Detailed inventory performance, turnover rates, and stock optimization',
    category: 'inventory',
    frequency: 'weekly',
    format: 'excel',
    automated: true,
    lastGenerated: '2024-11-18T07:00:00Z',
    nextScheduled: '2024-11-25T07:00:00Z'
  },
  {
    id: 'customer-insights',
    name: 'Customer Analytics',
    description: 'Customer behavior analysis, segmentation, and loyalty metrics',
    category: 'customers',
    frequency: 'monthly',
    format: 'pdf',
    automated: false
  },
  {
    id: 'financial-summary',
    name: 'Financial Summary',
    description: 'P&L, cash flow, and financial performance analysis',
    category: 'financial',
    frequency: 'monthly',
    format: 'excel',
    automated: true,
    lastGenerated: '2024-11-01T10:00:00Z',
    nextScheduled: '2024-12-01T10:00:00Z'
  },
  {
    id: 'metrc-reconciliation',
    name: 'METRC Reconciliation',
    description: 'METRC data reconciliation and discrepancy report',
    category: 'regulatory',
    frequency: 'weekly',
    format: 'csv',
    automated: true,
    lastGenerated: '2024-11-18T06:00:00Z',
    nextScheduled: '2024-11-25T06:00:00Z'
  }
]

export default function CannabisReportsPage() {
  // Cannabis reports state
  const [activeTab, setActiveTab] = useState<'overview' | 'sales' | 'inventory' | 'customers' | 'compliance' | 'custom'>('overview')
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  })
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showReportBuilder, setShowReportBuilder] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<ReportTemplate | null>(null)

  // Cannabis API hooks
  const { 
    data: dashboardData, 
    isLoading: dashboardLoading 
  } = useCannabisDashboardAnalytics('30d')

  const { 
    data: salesData, 
    isLoading: salesLoading 
  } = useCannabisSalesAnalytics({
    dateRange: { start: dateRange.start, end: dateRange.end },
    groupBy: 'day'
  })

  const { 
    data: inventoryData 
  } = useCannabisInventoryAnalytics({
    dateRange: { start: dateRange.start, end: dateRange.end }
  })

  const { 
    data: customerData 
  } = useCannabisCustomerAnalytics({
    dateRange: { start: dateRange.start, end: dateRange.end }
  })

  const generateReportMutation = useCannabisGenerateReport()

  // Filter reports by category
  const filteredReports = useMemo(() => {
    return REPORT_TEMPLATES.filter(report => 
      selectedCategory === 'all' || report.category === selectedCategory
    )
  }, [selectedCategory])

  // Calculate analytics summary
  const analyticsSummary = useMemo(() => {
    if (!dashboardData) return null

    return {
      totalRevenue: dashboardData.totalRevenue || 0,
      totalTransactions: dashboardData.totalTransactions || 0,
      averageOrderValue: dashboardData.averageOrderValue || 0,
      customerCount: dashboardData.customerCount || 0,
      revenueGrowth: dashboardData.revenueGrowth || 0,
      transactionGrowth: dashboardData.transactionGrowth || 0,
      complianceScore: dashboardData.complianceScore || 0
    }
  }, [dashboardData])

  /**
   * Handle report generation
   */
  const handleGenerateReport = (template: ReportTemplate) => {
    generateReportMutation.mutate({
      type: template.id,
      dateRange,
      format: template.format
    })
  }

  if (dashboardLoading) {
    return <CannabisLoadingSpinner size="lg" text="Loading cannabis analytics..." />
  }

  return (
    <div className="space-y-6">
      {/* Cannabis Reports Header */}
      <CannabisReportsHeader 
        onDateRangeChange={setDateRange}
        dateRange={dateRange}
        onRefresh={() => window.location.reload()}
        onExport={() => console.log('Export all reports')}
      />

      {/* Cannabis Analytics Overview */}
      {analyticsSummary && (
        <CannabisAnalyticsOverview 
          data={analyticsSummary}
        />
      )}

      {/* Cannabis Reports Navigation */}
      <CannabisReportsTabs 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Cannabis Reports Content */}
      {activeTab === 'overview' && (
        <CannabisReportsOverview 
          reports={filteredReports}
          onGenerateReport={handleGenerateReport}
          onViewReport={setSelectedTemplate}
          onCreateCustom={() => setShowReportBuilder(true)}
          categoryFilter={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      )}

      {activeTab === 'sales' && (
        <CannabisSalesReports 
          salesData={salesData}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          isLoading={salesLoading}
        />
      )}

      {activeTab === 'inventory' && (
        <CannabisInventoryReports 
          inventoryData={inventoryData}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
        />
      )}

      {activeTab === 'customers' && (
        <CannabisCustomerReports 
          customerData={customerData}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
        />
      )}

      {activeTab === 'compliance' && (
        <CannabisComplianceReports 
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
        />
      )}

      {activeTab === 'custom' && (
        <CannabisCustomReports 
          onCreateReport={() => setShowReportBuilder(true)}
        />
      )}

      {/* Cannabis Report Builder Modal */}
      {showReportBuilder && (
        <CannabisReportBuilderModal
          onClose={() => setShowReportBuilder(false)}
          onSave={(reportConfig) => {
            console.log('Save custom report:', reportConfig)
            setShowReportBuilder(false)
          }}
        />
      )}

      {/* Cannabis Report Details Modal */}
      {selectedTemplate && (
        <CannabisReportDetailsModal
          template={selectedTemplate}
          onClose={() => setSelectedTemplate(null)}
          onGenerate={() => handleGenerateReport(selectedTemplate)}
          onEdit={() => {
            setSelectedTemplate(null)
            setShowReportBuilder(true)
          }}
          isGenerating={generateReportMutation.isPending}
        />
      )}
    </div>
  )
}

/**
 * Cannabis reports page header
 */
function CannabisReportsHeader({
  onDateRangeChange,
  dateRange,
  onRefresh,
  onExport
}: {
  onDateRangeChange: (range: { start: string; end: string }) => void
  dateRange: { start: string; end: string }
  onRefresh: () => void
  onExport: () => void
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-cultivateco-green flex items-center space-x-2">
          <BarChart3 className="w-6 h-6" />
          <span>Cannabis Reports & Analytics</span>
        </h1>
        <p className="text-gray-600">
          Business intelligence, compliance reporting, and performance analytics
        </p>
      </div>

      <div className="flex items-center space-x-3">
        {/* Date Range Selector */}
        <div className="flex items-center space-x-2">
          <CannabisInput
            type="date"
            value={dateRange.start}
            onChange={(e) => onDateRangeChange({ ...dateRange, start: e.target.value })}
            className="w-auto"
          />
          <span className="text-gray-500">to</span>
          <CannabisInput
            type="date"
            value={dateRange.end}
            onChange={(e) => onDateRangeChange({ ...dateRange, end: e.target.value })}
            className="w-auto"
          />
        </div>

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
          Export All
        </CannabisButton>

        <CannabisButton
          variant="primary"
          onClick={() => console.log('Create report')}
          icon={Plus}
        >
          Create Report
        </CannabisButton>
      </div>
    </div>
  )
}

/**
 * Cannabis analytics overview
 */
function CannabisAnalyticsOverview({ 
  data 
}: { 
  data: {
    totalRevenue: number
    totalTransactions: number
    averageOrderValue: number
    customerCount: number
    revenueGrowth: number
    transactionGrowth: number
    complianceScore: number
  }
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-6">
      <CannabisMetricCard
        title="Total Revenue"
        value={formatCurrency(data.totalRevenue)}
        change={{
          value: data.revenueGrowth,
          type: data.revenueGrowth >= 0 ? 'increase' : 'decrease',
          period: 'vs last period'
        }}
        icon={DollarSign}
        color="green"
      />

      <CannabisMetricCard
        title="Transactions"
        value={data.totalTransactions.toLocaleString()}
        change={{
          value: data.transactionGrowth,
          type: data.transactionGrowth >= 0 ? 'increase' : 'decrease',
          period: 'vs last period'
        }}
        icon={ShoppingCart}
        color="blue"
      />

      <CannabisMetricCard
        title="Avg Order Value"
        value={formatCurrency(data.averageOrderValue)}
        icon={Target}
        color="purple"
      />

      <CannabisMetricCard
        title="Active Customers"
        value={data.customerCount.toLocaleString()}
        icon={Users}
        color="amber"
      />

      <CannabisMetricCard
        title="Compliance Score"
        value={`${data.complianceScore}/100`}
        icon={CheckCircle}
        color={data.complianceScore >= 90 ? 'green' : data.complianceScore >= 70 ? 'amber' : 'red'}
      />

      <CannabisMetricCard
        title="Reports Generated"
        value="47"
        icon={FileText}
        color="blue"
      />

      <CannabisMetricCard
        title="Data Accuracy"
        value="99.2%"
        icon={Activity}
        color="green"
      />
    </div>
  )
}

/**
 * Cannabis reports navigation tabs
 */
function CannabisReportsTabs({
  activeTab,
  onTabChange
}: {
  activeTab: string
  onTabChange: (tab: 'overview' | 'sales' | 'inventory' | 'customers' | 'compliance' | 'custom') => void
}) {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'sales', label: 'Sales Analytics', icon: TrendingUp },
    { id: 'inventory', label: 'Inventory Reports', icon: Package },
    { id: 'customers', label: 'Customer Analytics', icon: Users },
    { id: 'compliance', label: 'Compliance Reports', icon: CheckCircle },
    { id: 'custom', label: 'Custom Reports', icon: Settings }
  ]

  return (
    <CannabisThemeContainer variant="card">
      <div className="flex space-x-1 overflow-x-auto">
        {tabs.map(tab => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id as any)}
              className={cn(
                'flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap',
                activeTab === tab.id
                  ? 'bg-cultivateco-green text-cultivateco-cream'
                  : 'text-gray-700 hover:bg-gray-100'
              )}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>
    </CannabisThemeContainer>
  )
}

/**
 * Cannabis reports overview panel
 */
function CannabisReportsOverview({
  reports,
  onGenerateReport,
  onViewReport,
  onCreateCustom,
  categoryFilter,
  onCategoryChange
}: {
  reports: ReportTemplate[]
  onGenerateReport: (template: ReportTemplate) => void
  onViewReport: (template: ReportTemplate) => void
  onCreateCustom: () => void
  categoryFilter: string
  onCategoryChange: (category: string) => void
}) {
  return (
    <div className="space-y-6">
      {/* Report Filters */}
      <CannabisThemeContainer variant="card">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <h3 className="font-semibold text-cultivateco-green">Available Reports</h3>
            
            <CannabisSelect
              value={categoryFilter}
              onChange={(e) => onCategoryChange(e.target.value)}
              options={[
                { value: 'all', label: 'All Categories' },
                { value: 'sales', label: 'Sales Reports' },
                { value: 'inventory', label: 'Inventory Reports' },
                { value: 'compliance', label: 'Compliance Reports' },
                { value: 'customers', label: 'Customer Reports' },
                { value: 'financial', label: 'Financial Reports' },
                { value: 'regulatory', label: 'Regulatory Reports' }
              ]}
            />
          </div>

          <CannabisButton
            variant="primary"
            onClick={onCreateCustom}
            icon={Plus}
          >
            Create Custom Report
          </CannabisButton>
        </div>
      </CannabisThemeContainer>

      {/* Report Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map(template => (
          <CannabisReportCard
            key={template.id}
            template={template}
            onGenerate={() => onGenerateReport(template)}
            onView={() => onViewReport(template)}
          />
        ))}
      </div>

      {reports.length === 0 && (
        <CannabisEmptyState
          icon={FileText}
          title="No Reports Found"
          description="No reports match your current filter criteria."
          action={{
            label: 'Create Custom Report',
            onClick: onCreateCustom
          }}
        />
      )}
    </div>
  )
}

/**
 * Cannabis report card component
 */
function CannabisReportCard({
  template,
  onGenerate,
  onView
}: {
  template: ReportTemplate
  onGenerate: () => void
  onView: () => void
}) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'sales': return 'bg-green-100 text-green-700'
      case 'inventory': return 'bg-blue-100 text-blue-700'
      case 'compliance': return 'bg-purple-100 text-purple-700'
      case 'customers': return 'bg-amber-100 text-amber-700'
      case 'financial': return 'bg-red-100 text-red-700'
      case 'regulatory': return 'bg-indigo-100 text-indigo-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'sales': return TrendingUp
      case 'inventory': return Package
      case 'compliance': return CheckCircle
      case 'customers': return Users
      case 'financial': return DollarSign
      case 'regulatory': return FileText
      default: return BarChart3
    }
  }

  const CategoryIcon = getCategoryIcon(template.category)

  return (
    <CannabisThemeContainer variant="card" className="hover:shadow-cultivateco-md transition-shadow">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className={cn('p-2 rounded-lg', getCategoryColor(template.category))}>
              <CategoryIcon className="w-5 h-5" />
            </div>
            
            <div className="space-y-1">
              <h4 className="font-medium text-gray-900">{template.name}</h4>
              <p className="text-sm text-gray-600">{template.description}</p>
            </div>
          </div>
          
          {template.automated && (
            <CannabisBadge variant="success" size="sm">
              Auto
            </CannabisBadge>
          )}
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <div className="text-gray-600">Frequency</div>
            <div className="font-medium capitalize">{template.frequency}</div>
          </div>
          
          <div>
            <div className="text-gray-600">Format</div>
            <div className="font-medium uppercase">{template.format}</div>
          </div>
          
          {template.lastGenerated && (
            <div className="col-span-2">
              <div className="text-gray-600">Last Generated</div>
              <div className="font-medium">{formatDate(template.lastGenerated)}</div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <CannabisButton
            variant="outline"
            size="sm"
            onClick={onView}
            icon={Eye}
            className="flex-1"
          >
            View
          </CannabisButton>
          
          <CannabisButton
            variant="primary"
            size="sm"
            onClick={onGenerate}
            icon={Download}
            className="flex-1"
          >
            Generate
          </CannabisButton>
        </div>
      </div>
    </CannabisThemeContainer>
  )
}

/**
 * Cannabis sales reports panel
 */
function CannabisSalesReports({
  salesData,
  dateRange,
  onDateRangeChange,
  isLoading
}: {
  salesData: any
  dateRange: { start: string; end: string }
  onDateRangeChange: (range: { start: string; end: string }) => void
  isLoading: boolean
}) {
  if (isLoading) {
    return <CannabisLoadingSpinner size="lg" text="Loading sales analytics..." />
  }

  return (
    <div className="space-y-6">
      {/* Sales Overview */}
      <CannabisThemeContainer variant="card">
        <div className="space-y-4">
          <h3 className="font-semibold text-cultivateco-green">Sales Performance</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600">Total Sales</div>
              <div className="text-2xl font-bold text-cultivateco-green">
                {formatCurrency(salesData?.totalSales || 0)}
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600">Transactions</div>
              <div className="text-2xl font-bold text-cultivateco-green">
                {(salesData?.totalTransactions || 0).toLocaleString()}
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600">Avg Order Value</div>
              <div className="text-2xl font-bold text-cultivateco-green">
                {formatCurrency(salesData?.averageOrderValue || 0)}
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600">Tax Collected</div>
              <div className="text-2xl font-bold text-cultivateco-green">
                {formatCurrency(salesData?.taxCollected || 0)}
              </div>
            </div>
          </div>
        </div>
      </CannabisThemeContainer>

      {/* Sales Chart Placeholder */}
      <CannabisThemeContainer variant="card">
        <div className="space-y-4">
          <h3 className="font-semibold text-cultivateco-green">Sales Trends</h3>
          
          <div className="bg-gray-50 rounded-lg p-8 text-center min-h-[300px] flex items-center justify-center">
            <div className="space-y-4">
              <LineChart className="w-16 h-16 text-cultivateco-green mx-auto" />
              <div className="space-y-2">
                <h4 className="text-lg font-medium text-cultivateco-green">
                  Sales Trends Chart
                </h4>
                <p className="text-gray-600 max-w-md">
                  Interactive sales trends chart showing daily, weekly, and monthly performance 
                  with cannabis-specific metrics and compliance indicators.
                </p>
              </div>
            </div>
          </div>
        </CannabisThemeContainer>
      )}

      {/* Top Products */}
      <CannabisThemeContainer variant="card">
        <div className="space-y-4">
          <h3 className="font-semibold text-cultivateco-green">Top Performing Products</h3>
          
          <div className="space-y-3">
            {(salesData?.topProducts || []).slice(0, 5).map((product: any, index: number) => (
              <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-cultivateco-green rounded-full flex items-center justify-center text-cultivateco-cream font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-gray-600">{product.category}</div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-semibold text-cultivateco-green">
                    {formatCurrency(product.revenue)}
                  </div>
                  <div className="text-sm text-gray-600">
                    {product.sales} units
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CannabisThemeContainer>
    </div>
  )
}

/**
 * Cannabis inventory reports panel
 */
function CannabisInventoryReports({
  inventoryData,
  dateRange,
  onDateRangeChange
}: {
  inventoryData: any
  dateRange: { start: string; end: string }
  onDateRangeChange: (range: { start: string; end: string }) => void
}) {
  return (
    <div className="space-y-6">
      <CannabisThemeContainer variant="card">
        <div className="space-y-4">
          <h3 className="font-semibold text-cultivateco-green">Inventory Analytics</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600">Total Inventory Value</div>
              <div className="text-2xl font-bold text-cultivateco-green">
                {formatCurrency(inventoryData?.totalValue || 0)}
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600">Turnover Rate</div>
              <div className="text-2xl font-bold text-cultivateco-green">
                {(inventoryData?.turnoverRate || 0).toFixed(1)}x
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600">Low Stock Items</div>
              <div className="text-2xl font-bold text-amber-600">
                {inventoryData?.lowStockItems || 0}
              </div>
            </div>
          </div>
        </div>
      </CannabisThemeContainer>
    </div>
  )
}

/**
 * Cannabis customer reports panel
 */
function CannabisCustomerReports({
  customerData,
  dateRange,
  onDateRangeChange
}: {
  customerData: any
  dateRange: { start: string; end: string }
  onDateRangeChange: (range: { start: string; end: string }) => void
}) {
  return (
    <div className="space-y-6">
      <CannabisThemeContainer variant="card">
        <div className="space-y-4">
          <h3 className="font-semibold text-cultivateco-green">Customer Analytics</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600">Total Customers</div>
              <div className="text-2xl font-bold text-cultivateco-green">
                {(customerData?.totalCustomers || 0).toLocaleString()}
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600">New Customers</div>
              <div className="text-2xl font-bold text-cultivateco-green">
                {customerData?.newCustomers || 0}
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600">Avg Customer Value</div>
              <div className="text-2xl font-bold text-cultivateco-green">
                {formatCurrency(customerData?.averageCustomerValue || 0)}
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600">Retention Rate</div>
              <div className="text-2xl font-bold text-cultivateco-green">
                {(customerData?.retentionRate || 0).toFixed(1)}%
              </div>
            </div>
          </div>
        </div>
      </CannabisThemeContainer>
    </div>
  )
}

/**
 * Cannabis compliance reports panel
 */
function CannabisComplianceReports({
  dateRange,
  onDateRangeChange
}: {
  dateRange: { start: string; end: string }
  onDateRangeChange: (range: { start: string; end: string }) => void
}) {
  return (
    <div className="space-y-6">
      <CannabisThemeContainer variant="card">
        <div className="space-y-4">
          <h3 className="font-semibold text-cultivateco-green">Compliance Reports</h3>
          
          <div className="space-y-4">
            <CannabisAlert
              type="info"
              title="Regulatory Compliance"
              message="All cannabis compliance reports are automatically generated and submitted to relevant state agencies."
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">METRC Compliance</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sync Status</span>
                    <CannabisBadge variant="compliant" size="sm">Active</CannabisBadge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Sync</span>
                    <span className="text-sm">2 hours ago</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Packages Tracked</span>
                    <span className="text-sm font-medium">1,247</span>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">State Reporting</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Report</span>
                    <CannabisBadge variant="compliant" size="sm">Submitted</CannabisBadge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Next Due</span>
                    <span className="text-sm">Dec 15, 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Compliance Score</span>
                    <span className="text-sm font-medium text-cultivateco-green">98/100</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CannabisThemeContainer>
    </div>
  )
}

/**
 * Cannabis custom reports panel
 */
function CannabisCustomReports({
  onCreateReport
}: {
  onCreateReport: () => void
}) {
  return (
    <div className="space-y-6">
      <CannabisThemeContainer variant="card">
        <CannabisEmptyState
          icon={Settings}
          title="Custom Report Builder"
          description="Create custom reports tailored to your cannabis business needs with our drag-and-drop report builder."
          action={{
            label: 'Build Custom Report',
            onClick: onCreateReport
          }}
        />
      </CannabisThemeContainer>
    </div>
  )
}

/**
 * Cannabis report builder modal - simplified
 */
function CannabisReportBuilderModal({
  onClose,
  onSave
}: {
  onClose: () => void
  onSave: (config: any) => void
}) {
  const [reportName, setReportName] = useState('')
  const [reportType, setReportType] = useState('sales')

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-cultivateco-green">Custom Report Builder</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <CannabisInput
            label="Report Name"
            value={reportName}
            onChange={(e) => setReportName(e.target.value)}
            placeholder="Enter report name..."
          />

          <CannabisSelect
            label="Report Type"
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            options={[
              { value: 'sales', label: 'Sales Report' },
              { value: 'inventory', label: 'Inventory Report' },
              { value: 'customers', label: 'Customer Report' },
              { value: 'compliance', label: 'Compliance Report' }
            ]}
          />

          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <Settings className="w-12 h-12 text-cultivateco-green mx-auto mb-4" />
            <h3 className="text-lg font-medium text-cultivateco-green mb-2">
              Advanced Report Builder
            </h3>
            <p className="text-gray-600">
              Drag and drop interface for creating custom cannabis reports with 
              advanced filtering, grouping, and visualization options.
            </p>
          </div>

          <div className="flex space-x-4">
            <CannabisButton
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </CannabisButton>
            
            <CannabisButton
              onClick={() => onSave({ name: reportName, type: reportType })}
              variant="primary"
              className="flex-1"
              disabled={!reportName}
            >
              Save Report
            </CannabisButton>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Cannabis report details modal - simplified
 */
function CannabisReportDetailsModal({
  template,
  onClose,
  onGenerate,
  onEdit,
  isGenerating
}: {
  template: ReportTemplate
  onClose: () => void
  onGenerate: () => void
  onEdit: () => void
  isGenerating: boolean
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-cultivateco-green">{template.name}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <p className="text-gray-600">{template.description}</p>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Category:</span>
                <span className="ml-2 font-medium capitalize">{template.category}</span>
              </div>
              <div>
                <span className="text-gray-600">Frequency:</span>
                <span className="ml-2 font-medium capitalize">{template.frequency}</span>
              </div>
              <div>
                <span className="text-gray-600">Format:</span>
                <span className="ml-2 font-medium uppercase">{template.format}</span>
              </div>
              <div>
                <span className="text-gray-600">Automated:</span>
                <span className="ml-2 font-medium">{template.automated ? 'Yes' : 'No'}</span>
              </div>
            </div>

            {template.lastGenerated && (
              <div className="text-sm">
                <span className="text-gray-600">Last Generated:</span>
                <span className="ml-2 font-medium">{formatDate(template.lastGenerated)}</span>
              </div>
            )}
          </div>

          <div className="flex space-x-4">
            <CannabisButton
              onClick={onEdit}
              variant="outline"
              icon={Edit}
              className="flex-1"
            >
              Edit
            </CannabisButton>
            
            <CannabisButton
              onClick={onGenerate}
              variant="primary"
              icon={Download}
              className="flex-1"
              loading={isGenerating}
            >
              Generate Report
            </CannabisButton>
          </div>
        </div>
      </div>
    </div>
  )
}
