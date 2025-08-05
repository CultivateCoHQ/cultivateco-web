'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  BarChart3, 
  Settings, 
  Shield, 
  FileText, 
  Menu, 
  X,
  Building2,
  LogOut,
  User,
  Bell,
  ChevronDown,
  Leaf
} from 'lucide-react'
import { useCannabisAuth } from '@/providers/auth-provider'
import { CannabisThemeToggle, CannabisStatusIndicator } from '@/providers/theme-provider'

/**
 * =============================================================================
 * CultivateCo Cannabis SaaS Portal Layout
 * =============================================================================
 * Authenticated cannabis business dashboard layout with navigation
 */

interface SaaSLayoutProps {
  children: React.ReactNode
}

export default function CannabisAppLayout({ children }: SaaSLayoutProps) {
  const pathname = usePathname()
  const { user, currentFacility, logout, isLoading } = useCannabisAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  // Don't render layout for login/signup pages
  if (pathname === '/app/login' || pathname === '/app/signup' || pathname === '/app/reset-password') {
    return <>{children}</>
  }

  // Show loading state during auth check
  if (isLoading) {
    return <CannabisLoadingScreen />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cannabis Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </div>
      )}

      {/* Cannabis Sidebar Navigation */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-cultivateco-cream border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Cannabis Brand Header */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <Link href="/app/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-cultivateco-gradient rounded-lg flex items-center justify-center">
                <span className="text-cultivateco-cream font-bold text-sm">C</span>
              </div>
              <span className="text-lg font-bold text-cultivateco-green">CultivateCo</span>
            </Link>
            
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded-md text-gray-500 hover:text-cultivateco-green"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cannabis Facility Selector */}
          {currentFacility && (
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <Building2 className="w-4 h-4 text-cultivateco-green" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-cultivateco-green truncate">
                      {currentFacility.name}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      License: {currentFacility.licenseNumber}
                    </div>
                  </div>
                  <CannabisStatusIndicator status="compliant" size="sm" />
                </div>
              </div>
            </div>
          )}

          {/* Cannabis Navigation Menu */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            <CannabisNavItem
              icon={LayoutDashboard}
              label="Dashboard"
              href="/app/dashboard"
              isActive={pathname === '/app/dashboard'}
            />
            
            <CannabisNavItem
              icon={Package}
              label="Inventory"
              href="/app/inventory"
              isActive={pathname.startsWith('/app/inventory')}
              badge="3" // Low stock alerts
            />
            
            <CannabisNavItem
              icon={Users}
              label="Customers"
              href="/app/customers"
              isActive={pathname.startsWith('/app/customers')}
            />
            
            <CannabisNavItem
              icon={FileText}
              label="Transactions"
              href="/app/transactions"
              isActive={pathname.startsWith('/app/transactions')}
            />
            
            <CannabisNavItem
              icon={BarChart3}
              label="Analytics"
              href="/app/analytics"
              isActive={pathname.startsWith('/app/analytics')}
            />
            
            <CannabisNavItem
              icon={Shield}
              label="Compliance"
              href="/app/compliance"
              isActive={pathname.startsWith('/app/compliance')}
              badge="2" // Active violations
              badgeColor="warning"
            />

            {/* Cannabis Admin Section */}
            <div className="pt-6 mt-6 border-t border-gray-200">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                Administration
              </div>
              
              <CannabisNavItem
                icon={FileText}
                label="Reports"
                href="/app/reports"
                isActive={pathname.startsWith('/app/reports')}
              />
              
              <CannabisNavItem
                icon={Settings}
                label="Settings"
                href="/app/settings"
                isActive={pathname.startsWith('/app/settings')}
              />
            </div>
          </nav>

          {/* Cannabis User Profile Footer */}
          <div className="px-4 py-4 border-t border-gray-200">
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-8 h-8 bg-cultivateco-green rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-cultivateco-cream">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </span>
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {user?.firstName} {user?.lastName}
                  </div>
                  <div className="text-xs text-gray-500 truncate capitalize">
                    {user?.role?.replace('-', ' ')}
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {/* Cannabis User Dropdown Menu */}
              {userMenuOpen && (
                <div className="absolute bottom-full left-0 right-0 mb-2 bg-cultivateco-cream border border-gray-200 rounded-lg shadow-cultivateco-lg py-2">
                  <Link
                    href="/app/profile"
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    <span>Profile Settings</span>
                  </Link>
                  
                  <button
                    onClick={() => {
                      setUserMenuOpen(false)
                      logout()
                    }}
                    className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cannabis Main Content Area */}
      <div className="lg:pl-64">
        {/* Cannabis Top Navigation Bar */}
        <header className="bg-cultivateco-cream border-b border-gray-200 h-16">
          <div className="flex items-center justify-between h-full px-6">
            {/* Cannabis Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-500 hover:text-cultivateco-green"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Cannabis Page Title */}
            <div className="flex-1 lg:flex-none">
              <h1 className="text-xl font-semibold text-cultivateco-green">
                {getPageTitle(pathname)}
              </h1>
            </div>

            {/* Cannabis Top Bar Actions */}
            <div className="flex items-center space-x-4">
              {/* Cannabis Notifications */}
              <button className="relative p-2 text-gray-500 hover:text-cultivateco-green rounded-lg hover:bg-gray-50 transition-colors">
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full">
                  <div className="w-2 h-2 bg-white rounded-full absolute top-0.5 left-0.5" />
                </div>
              </button>

              {/* Cannabis Theme Toggle */}
              <CannabisThemeToggle />

              {/* Cannabis Business Hours Status */}
              <div className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-cultivateco-green/10 rounded-full">
                <CannabisStatusIndicator status="compliant" size="xs" />
                <span className="text-sm font-medium text-cultivateco-green">
                  Open until 10:00 PM
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Cannabis Main Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}

/**
 * Cannabis navigation item component
 */
function CannabisNavItem({ 
  icon: Icon, 
  label, 
  href, 
  isActive, 
  badge,
  badgeColor = "default"
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  href: string
  isActive: boolean
  badge?: string
  badgeColor?: "default" | "warning" | "error"
}) {
  const badgeClasses = {
    default: "bg-cultivateco-green text-cultivateco-cream",
    warning: "bg-amber-500 text-white",
    error: "bg-red-500 text-white"
  }

  return (
    <Link
      href={href}
      className={`
        flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
        ${isActive 
          ? 'bg-cultivateco-green/10 text-cultivateco-green border-r-2 border-cultivateco-green' 
          : 'text-gray-700 hover:bg-gray-50 hover:text-cultivateco-green'
        }
      `}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      <span className="flex-1">{label}</span>
      {badge && (
        <div className={`
          px-2 py-0.5 rounded-full text-xs font-medium
          ${badgeClasses[badgeColor]}
        `}>
          {badge}
        </div>
      )}
    </Link>
  )
}

/**
 * Cannabis loading screen component
 */
function CannabisLoadingScreen() {
  return (
    <div className="min-h-screen bg-cultivateco-cream flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-cultivateco-gradient rounded-xl flex items-center justify-center mx-auto">
          <Leaf className="w-8 h-8 text-cultivateco-cream animate-pulse" />
        </div>
        <div className="space-y-2">
          <div className="text-lg font-semibold text-cultivateco-green">
            Loading CultivateCo
          </div>
          <div className="text-sm text-gray-600">
            Preparing your cannabis business dashboard...
          </div>
        </div>
        <div className="w-48 h-1 bg-gray-200 rounded-full mx-auto overflow-hidden">
          <div className="w-full h-full bg-cultivateco-gradient animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

/**
 * Get page title from pathname
 */
function getPageTitle(pathname: string): string {
  const titles: Record<string, string> = {
    '/app/dashboard': 'Dashboard',
    '/app/inventory': 'Inventory Management',
    '/app/customers': 'Customer Management',
    '/app/transactions': 'Transactions',
    '/app/analytics': 'Analytics & Reports',
    '/app/compliance': 'Compliance Monitoring',
    '/app/reports': 'Business Reports',
    '/app/settings': 'Settings',
    '/app/profile': 'Profile Settings',
  }

  // Handle dynamic routes
  for (const [route, title] of Object.entries(titles)) {
    if (pathname.startsWith(route)) {
      return title
    }
  }

  return 'Cannabis Business Portal'
}
