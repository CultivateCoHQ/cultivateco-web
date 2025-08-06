import Link from 'next/link'
import { Leaf, ArrowRight, Shield, BarChart3, Users, Package } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-900">CultivateCo</span>
            </div>
            <Link
              href="/app"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
            >
              Launch App
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </header>

        {/* Hero Section */}
        <main className="py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
              Cannabis Business
              <span className="text-green-600"> Management</span>
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-600">
              Professional dispensary management platform with compliance tracking, 
              inventory management, and business intelligence for cannabis operations.
            </p>
            <div className="mt-10 flex items-center justify-center space-x-4">
              <Link
                href="/app"
                className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/cannabis-map"
                className="inline-flex items-center px-8 py-4 border border-gray-300 text-lg font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Cannabis Laws Map
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mt-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <Shield className="h-12 w-12 text-green-600 mx-auto" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">Compliance</h3>
                <p className="mt-2 text-gray-600">METRC integration and regulatory tracking</p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <Package className="h-12 w-12 text-green-600 mx-auto" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">Inventory</h3>
                <p className="mt-2 text-gray-600">Real-time cannabis inventory management</p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <BarChart3 className="h-12 w-12 text-green-600 mx-auto" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">Analytics</h3>
                <p className="mt-2 text-gray-600">Business intelligence and reporting</p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <Users className="h-12 w-12 text-green-600 mx-auto" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">Staff</h3>
                <p className="mt-2 text-gray-600">Employee management and training</p>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-12 border-t border-gray-200">
          <div className="text-center">
            <p className="text-gray-600">
              © 2024 CultivateCo. Professional cannabis business management platform.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
