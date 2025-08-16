/**
 * =============================================================================
 * CultivateCo State Cannabis Compliance Directory
 * =============================================================================
 * Comprehensive state-by-state cannabis compliance requirements for enterprise operations
 */

'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import {
  Shield,
  Search,
  Filter,
  Building2,
  Scale,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Download,
  Globe,
  Users,
  TrendingUp,
  Award,
  ArrowRight,
  MapPin,
  FileText,
  Lock,
  Briefcase,
} from 'lucide-react'

import { CannabisLayout } from '@/components/layout/CannabisLayout'

// ============================================================================
// STATE COMPLIANCE DATA (Updated June 2025)
// ============================================================================

interface StateComplianceData {
  state: string
  abbreviation: string
  legalForUse: boolean
  medicalUse: boolean
  decriminalized: boolean
  cbdLowTHC: boolean
  licenseTypes: string[]
  keyRegulations: string[]
  complianceComplexity: 'Low' | 'Medium' | 'High' | 'Very High'
  bankingFriendly: boolean
  multiStateFriendly: boolean
  institutionalReady: boolean
  regulatoryBody: string
  trackingSystem: string
  lastUpdated: string
}

const STATE_COMPLIANCE_DATA: StateComplianceData[] = [
  {
    state: 'Alabama',
    abbreviation: 'AL',
    legalForUse: false,
    medicalUse: true,
    decriminalized: false,
    cbdLowTHC: false,
    licenseTypes: ['Medical Cultivator', 'Medical Processor', 'Medical Dispensary'],
    keyRegulations: ['Alabama Medical Cannabis Act', 'AMCC Regulations'],
    complianceComplexity: 'Medium',
    bankingFriendly: false,
    multiStateFriendly: false,
    institutionalReady: false,
    regulatoryBody: 'Alabama Medical Cannabis Commission',
    trackingSystem: 'METRC',
    lastUpdated: '2025-06-26'
  },
  {
    state: 'Alaska',
    abbreviation: 'AK',
    legalForUse: true,
    medicalUse: true,
    decriminalized: true,
    cbdLowTHC: false,
    licenseTypes: ['Cultivator', 'Manufacturer', 'Retail', 'Testing Lab', 'Transporter'],
    keyRegulations: ['Alaska Statute 17.38', 'Marijuana Control Board Regulations'],
    complianceComplexity: 'High',
    bankingFriendly: true,
    multiStateFriendly: true,
    institutionalReady: true,
    regulatoryBody: 'Alaska Marijuana Control Board',
    trackingSystem: 'METRC',
    lastUpdated: '2025-06-26'
  },
  {
    state: 'Arizona',
    abbreviation: 'AZ',
    legalForUse: true,
    medicalUse: true,
    decriminalized: true,
    cbdLowTHC: false,
    licenseTypes: ['Cultivation', 'Manufacturing', 'Retail', 'Testing', 'Transportation'],
    keyRegulations: ['Smart and Safe Act', 'Arizona Medical Marijuana Act'],
    complianceComplexity: 'Very High',
    bankingFriendly: true,
    multiStateFriendly: true,
    institutionalReady: true,
    regulatoryBody: 'Arizona Department of Health Services',
    trackingSystem: 'METRC',
    lastUpdated: '2025-06-26'
  },
  {
    state: 'Arkansas',
    abbreviation: 'AR',
    legalForUse: false,
    medicalUse: true,
    decriminalized: false,
    cbdLowTHC: false,
    licenseTypes: ['Medical Cultivator', 'Medical Processor', 'Medical Dispensary'],
    keyRegulations: ['Arkansas Medical Cannabis Amendment', 'AMC Rules'],
    complianceComplexity: 'Medium',
    bankingFriendly: false,
    multiStateFriendly: false,
    institutionalReady: false,
    regulatoryBody: 'Arkansas Medical Cannabis Commission',
    trackingSystem: 'BioTrackTHC',
    lastUpdated: '2025-06-26'
  },
  {
    state: 'California',
    abbreviation: 'CA',
    legalForUse: true,
    medicalUse: true,
    decriminalized: true,
    cbdLowTHC: false,
    licenseTypes: ['Cultivation', 'Manufacturing', 'Distribution', 'Retail', 'Testing', 'Microbusiness'],
    keyRegulations: ['MAUCRSA', 'Prop 64', 'BCC Regulations', 'CDPH Regulations'],
    complianceComplexity: 'Very High',
    bankingFriendly: true,
    multiStateFriendly: true,
    institutionalReady: true,
    regulatoryBody: 'Department of Cannabis Control',
    trackingSystem: 'METRC',
    lastUpdated: '2025-06-26'
  },
  {
    state: 'Colorado',
    abbreviation: 'CO',
    legalForUse: true,
    medicalUse: true,
    decriminalized: true,
    cbdLowTHC: false,
    licenseTypes: ['Cultivation', 'Manufacturing', 'Retail', 'Testing', 'Research', 'Transporter'],
    keyRegulations: ['Colorado Constitution Article XVIII', 'MED Rules'],
    complianceComplexity: 'Very High',
    bankingFriendly: true,
    multiStateFriendly: true,
    institutionalReady: true,
    regulatoryBody: 'Marijuana Enforcement Division',
    trackingSystem: 'METRC',
    lastUpdated: '2025-06-26'
  },
  {
    state: 'Connecticut',
    abbreviation: 'CT',
    legalForUse: true,
    medicalUse: true,
    decriminalized: true,
    cbdLowTHC: false,
    licenseTypes: ['Cultivation', 'Manufacturing', 'Retail', 'Delivery', 'Testing'],
    keyRegulations: ['Public Act 21-1', 'DCP Regulations'],
    complianceComplexity: 'High',
    bankingFriendly: true,
    multiStateFriendly: true,
    institutionalReady: true,
    regulatoryBody: 'Department of Consumer Protection',
    trackingSystem: 'METRC',
    lastUpdated: '2025-06-26'
  },
  {
    state: 'Delaware',
    abbreviation: 'DE',
    legalForUse: true,
    medicalUse: true,
    decriminalized: true,
    cbdLowTHC: false,
    licenseTypes: ['Cultivation', 'Manufacturing', 'Retail', 'Testing'],
    keyRegulations: ['Delaware Medical Marijuana Act', 'HB 1'],
    complianceComplexity: 'Medium',
    bankingFriendly: true,
    multiStateFriendly: false,
    institutionalReady: false,
    regulatoryBody: 'Delaware Division of Public Health',
    trackingSystem: 'BioTrackTHC',
    lastUpdated: '2025-06-26'
  },
  {
    state: 'Florida',
    abbreviation: 'FL',
    legalForUse: false,
    medicalUse: true,
    decriminalized: false,
    cbdLowTHC: false,
    licenseTypes: ['Medical Cultivation', 'Medical Processing', 'Medical Dispensing'],
    keyRegulations: ['Florida Statutes Chapter 381', 'Amendment 2'],
    complianceComplexity: 'Very High',
    bankingFriendly: false,
    multiStateFriendly: true,
    institutionalReady: true,
    regulatoryBody: 'Office of Medical Marijuana Use',
    trackingSystem: 'METRC',
    lastUpdated: '2025-06-26'
  },
  {
    state: 'Georgia',
    abbreviation: 'GA',
    legalForUse: false,
    medicalUse: false,
    decriminalized: false,
    cbdLowTHC: true,
    licenseTypes: ['Low-THC Oil Producer', 'Low-THC Oil Processor'],
    keyRegulations: ['Georgia Hope Act', 'HB 324'],
    complianceComplexity: 'Low',
    bankingFriendly: false,
    multiStateFriendly: false,
    institutionalReady: false,
    regulatoryBody: 'Georgia Department of Public Health',
    trackingSystem: 'Custom System',
    lastUpdated: '2025-06-26'
  },
  {
    state: 'Illinois',
    abbreviation: 'IL',
    legalForUse: true,
    medicalUse: true,
    decriminalized: true,
    cbdLowTHC: false,
    licenseTypes: ['Cultivation', 'Processing', 'Dispensing', 'Transportation', 'Testing'],
    keyRegulations: ['Cannabis Regulation and Tax Act', 'Compassionate Use Act'],
    complianceComplexity: 'Very High',
    bankingFriendly: true,
    multiStateFriendly: true,
    institutionalReady: true,
    regulatoryBody: 'Illinois Cannabis Control Board',
    trackingSystem: 'BioTrackTHC',
    lastUpdated: '2025-06-26'
  },
  {
    state: 'Massachusetts',
    abbreviation: 'MA',
    legalForUse: true,
    medicalUse: true,
    decriminalized: true,
    cbdLowTHC: false,
    licenseTypes: ['Cultivation', 'Manufacturing', 'Retail', 'Testing', 'Transportation', 'Research'],
    keyRegulations: ['Massachusetts General Laws Chapter 94G', 'CCC Regulations'],
    complianceComplexity: 'Very High',
    bankingFriendly: true,
    multiStateFriendly: true,
    institutionalReady: true,
    regulatoryBody: 'Cannabis Control Commission',
    trackingSystem: 'METRC',
    lastUpdated: '2025-06-26'
  },
  {
    state: 'Michigan',
    abbreviation: 'MI',
    legalForUse: true,
    medicalUse: true,
    decriminalized: true,
    cbdLowTHC: false,
    licenseTypes: ['Cultivation', 'Processing', 'Retail', 'Testing', 'Transportation', 'Microbusiness'],
    keyRegulations: ['Michigan Cannabis Regulatory Agency Rules', 'MMMA'],
    complianceComplexity: 'High',
    bankingFriendly: true,
    multiStateFriendly: true,
    institutionalReady: true,
    regulatoryBody: 'Cannabis Regulatory Agency',
    trackingSystem: 'METRC',
    lastUpdated: '2025-06-26'
  },
  {
    state: 'Nevada',
    abbreviation: 'NV',
    legalForUse: true,
    medicalUse: true,
    decriminalized: true,
    cbdLowTHC: false,
    licenseTypes: ['Cultivation', 'Manufacturing', 'Retail', 'Testing', 'Distribution'],
    keyRegulations: ['Nevada Cannabis Compliance Board Regulations', 'Question 2'],
    complianceComplexity: 'High',
    bankingFriendly: true,
    multiStateFriendly: true,
    institutionalReady: true,
    regulatoryBody: 'Cannabis Compliance Board',
    trackingSystem: 'METRC',
    lastUpdated: '2025-06-26'
  },
  {
    state: 'New Jersey',
    abbreviation: 'NJ',
    legalForUse: true,
    medicalUse: true,
    decriminalized: true,
    cbdLowTHC: false,
    licenseTypes: ['Cultivation', 'Manufacturing', 'Retail', 'Delivery', 'Testing'],
    keyRegulations: ['Cannabis Regulatory, Enforcement Assistance, and Marketplace Modernization Act'],
    complianceComplexity: 'Very High',
    bankingFriendly: true,
    multiStateFriendly: true,
    institutionalReady: true,
    regulatoryBody: 'Cannabis Regulatory Commission',
    trackingSystem: 'METRC',
    lastUpdated: '2025-06-26'
  },
  {
    state: 'New York',
    abbreviation: 'NY',
    legalForUse: true,
    medicalUse: true,
    decriminalized: true,
    cbdLowTHC: false,
    licenseTypes: ['Cultivation', 'Processing', 'Retail', 'Distribution', 'Testing', 'Delivery'],
    keyRegulations: ['Marihuana Regulation and Taxation Act', 'OCM Regulations'],
    complianceComplexity: 'Very High',
    bankingFriendly: true,
    multiStateFriendly: true,
    institutionalReady: true,
    regulatoryBody: 'Office of Cannabis Management',
    trackingSystem: 'METRC',
    lastUpdated: '2025-06-26'
  },
  {
    state: 'Oregon',
    abbreviation: 'OR',
    legalForUse: true,
    medicalUse: true,
    decriminalized: true,
    cbdLowTHC: false,
    licenseTypes: ['Cultivation', 'Processing', 'Retail', 'Testing', 'Research'],
    keyRegulations: ['Oregon Cannabis Control Act', 'OLCC Rules'],
    complianceComplexity: 'High',
    bankingFriendly: true,
    multiStateFriendly: true,
    institutionalReady: true,
    regulatoryBody: 'Oregon Liquor and Cannabis Commission',
    trackingSystem: 'METRC',
    lastUpdated: '2025-06-26'
  },
  {
    state: 'Pennsylvania',
    abbreviation: 'PA',
    legalForUse: false,
    medicalUse: true,
    decriminalized: false,
    cbdLowTHC: false,
    licenseTypes: ['Medical Cultivation', 'Medical Processing', 'Medical Dispensing'],
    keyRegulations: ['Medical Marijuana Act', 'DOH Regulations'],
    complianceComplexity: 'High',
    bankingFriendly: false,
    multiStateFriendly: true,
    institutionalReady: true,
    regulatoryBody: 'Department of Health',
    trackingSystem: 'MJ Freeway',
    lastUpdated: '2025-06-26'
  },
  {
    state: 'Texas',
    abbreviation: 'TX',
    legalForUse: false,
    medicalUse: true,
    decriminalized: false,
    cbdLowTHC: false,
    licenseTypes: ['Low-THC Medical Cannabis'],
    keyRegulations: ['Compassionate Use Act', 'Texas Health and Safety Code'],
    complianceComplexity: 'Medium',
    bankingFriendly: false,
    multiStateFriendly: false,
    institutionalReady: false,
    regulatoryBody: 'Department of Public Safety',
    trackingSystem: 'Custom System',
    lastUpdated: '2025-06-26'
  },
  {
    state: 'Washington',
    abbreviation: 'WA',
    legalForUse: true,
    medicalUse: true,
    decriminalized: true,
    cbdLowTHC: false,
    licenseTypes: ['Cultivation', 'Processing', 'Retail', 'Testing', 'Transportation'],
    keyRegulations: ['Initiative 502', 'WAC 314-55', 'RCW 69.50'],
    complianceComplexity: 'Very High',
    bankingFriendly: true,
    multiStateFriendly: true,
    institutionalReady: true,
    regulatoryBody: 'Washington State Liquor and Cannabis Board',
    trackingSystem: 'CCRS (Leaf Data Systems)',
    lastUpdated: '2025-06-26'
  },
]

const COMPLIANCE_COMPLEXITY_COLORS = {
  'Low': 'bg-green-100 text-green-800',
  'Medium': 'bg-yellow-100 text-yellow-800',
  'High': 'bg-orange-100 text-orange-800',
  'Very High': 'bg-red-100 text-red-800',
}

const ENTERPRISE_STATS = [
  { label: 'States Covered', value: '24+', icon: Globe },
  { label: 'Compliance Requirements', value: '500+', icon: Shield },
  { label: 'Regulatory Updates/Month', value: '50+', icon: TrendingUp },
  { label: 'Enterprise Clients', value: '50+', icon: Building2 },
]

// ============================================================================
// STATE COMPLIANCE COMPONENTS
// ============================================================================

interface StateComplianceCardProps {
  state: StateComplianceData
}

const StateComplianceCard: React.FC<StateComplianceCardProps> = ({ state }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-200"
    >
      <div className="space-y-4">
        {/* State Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-teal-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{state.state}</h3>
              <p className="text-sm text-gray-600">{state.abbreviation}</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${COMPLIANCE_COMPLEXITY_COLORS[state.complianceComplexity]}`}>
              {state.complianceComplexity} Complexity
            </div>
          </div>
        </div>

        {/* Legal Status */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center space-x-2">
            {state.legalForUse ? (
              <CheckCircle className="w-4 h-4 text-green-500" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-red-500" />
            )}
            <span className="text-sm text-gray-700">Adult Use</span>
          </div>
          
          <div className="flex items-center space-x-2">
            {state.medicalUse ? (
              <CheckCircle className="w-4 h-4 text-green-500" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-red-500" />
            )}
            <span className="text-sm text-gray-700">Medical Use</span>
          </div>
          
          <div className="flex items-center space-x-2">
            {state.bankingFriendly ? (
              <CheckCircle className="w-4 h-4 text-green-500" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-red-500" />
            )}
            <span className="text-sm text-gray-700">Banking Friendly</span>
          </div>
          
          <div className="flex items-center space-x-2">
            {state.institutionalReady ? (
              <CheckCircle className="w-4 h-4 text-green-500" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-red-500" />
            )}
            <span className="text-sm text-gray-700">Institutional Ready</span>
          </div>
        </div>

        {/* License Types */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">License Types</h4>
          <div className="flex flex-wrap gap-1">
            {state.licenseTypes.map((license, index) => (
              <span
                key={index}
                className="inline-block px-2 py-1 bg-teal-50 text-teal-700 text-xs rounded-md"
              >
                {license}
              </span>
            ))}
          </div>
        </div>

        {/* Regulatory Info */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Regulatory Body:</span>
            <span className="text-gray-900 font-medium">{state.regulatoryBody}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Tracking System:</span>
            <span className="text-gray-900 font-medium">{state.trackingSystem}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Last Updated:</span>
            <span className="text-gray-900 font-medium">{new Date(state.lastUpdated).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full flex items-center justify-center space-x-2 rounded-lg border border-teal-600 px-4 py-2 text-teal-600 hover:bg-teal-50 transition-colors">
          <FileText className="w-4 h-4" />
          <span>View Compliance Requirements</span>
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  )
}

const StateComplianceFilter: React.FC<{
  onFilterChange: (filters: any) => void
}> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    legalStatus: 'all',
    complexity: 'all',
    bankingFriendly: 'all',
    institutionalReady: 'all',
  })

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
      <div className="flex items-center space-x-2">
        <Filter className="w-5 h-5 text-teal-600" />
        <h3 className="text-lg font-semibold text-gray-900">Filter States</h3>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Legal Status</label>
          <select
            value={filters.legalStatus}
            onChange={(e) => handleFilterChange('legalStatus', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          >
            <option value="all">All States</option>
            <option value="adult-use">Adult Use Legal</option>
            <option value="medical-only">Medical Only</option>
            <option value="cbd-only">CBD/Low-THC Only</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Complexity</label>
          <select
            value={filters.complexity}
            onChange={(e) => handleFilterChange('complexity', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          >
            <option value="all">All Levels</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Very High">Very High</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Banking Ready</label>
          <select
            value={filters.bankingFriendly}
            onChange={(e) => handleFilterChange('bankingFriendly', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          >
            <option value="all">All States</option>
            <option value="yes">Banking Friendly</option>
            <option value="no">Banking Restricted</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Institutional Ready</label>
          <select
            value={filters.institutionalReady}
            onChange={(e) => handleFilterChange('institutionalReady', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          >
            <option value="all">All States</option>
            <option value="yes">Institutional Ready</option>
            <option value="no">Limited Institutional</option>
          </select>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// MAIN STATE COMPLIANCE PAGE SECTIONS
// ============================================================================

const StateComplianceHeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-600 text-white py-20 lg:py-32">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
              }
            }
          }}
          className="text-center max-w-4xl mx-auto space-y-8"
        >
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 60 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.6, ease: 'easeOut' }
              }
            }}
            className="space-y-6"
          >
            <div className="inline-flex items-center space-x-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium">
              <Shield className="h-4 w-4" />
              <span>State Cannabis Compliance Directory</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Pharmaceutical-Grade
              <span className="block text-cyan-200">State Compliance</span>
              <span className="block">Requirements</span>
            </h1>
            
            <p className="text-xl opacity-90 leading-relaxed max-w-3xl mx-auto">
              Comprehensive state-by-state cannabis compliance directory for enterprise operations. 
              Navigate complex multi-state regulations with pharmaceutical-grade precision and institutional investor confidence.
            </p>
          </motion.div>

          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 60 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.6, ease: 'easeOut' }
              }
            }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {ENTERPRISE_STATS.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="text-center">
                  <Icon className="h-8 w-8 mx-auto mb-3 opacity-75" />
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="text-sm opacity-75">{stat.label}</div>
                </div>
              )
            })}
          </motion.div>

          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 60 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.6, ease: 'easeOut' }
              }
            }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/demo"
              className="inline-flex items-center space-x-2 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-teal-600 hover:bg-gray-50 transition-colors"
            >
              <span>Enterprise Consultation</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            <button className="inline-flex items-center space-x-2 rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold text-white hover:bg-white/10 transition-colors">
              <Download className="w-5 h-5" />
              <span>Download Compliance Guide</span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// MAIN STATE COMPLIANCE PAGE COMPONENT
// ============================================================================

const StateCompliancePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredStates, setFilteredStates] = useState(STATE_COMPLIANCE_DATA)

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    applyFilters(term, {})
  }

  const handleFilterChange = (filters: any) => {
    applyFilters(searchTerm, filters)
  }

  const applyFilters = (search: string, filters: any) => {
    let filtered = STATE_COMPLIANCE_DATA

    // Search filter
    if (search) {
      filtered = filtered.filter(state =>
        state.state.toLowerCase().includes(search.toLowerCase()) ||
        state.abbreviation.toLowerCase().includes(search.toLowerCase())
      )
    }

    // Status filters
    if (filters.legalStatus && filters.legalStatus !== 'all') {
      filtered = filtered.filter(state => {
        switch (filters.legalStatus) {
          case 'adult-use':
            return state.legalForUse
          case 'medical-only':
            return state.medicalUse && !state.legalForUse
          case 'cbd-only':
            return state.cbdLowTHC
          default:
            return true
        }
      })
    }

    if (filters.complexity && filters.complexity !== 'all') {
      filtered = filtered.filter(state => state.complianceComplexity === filters.complexity)
    }

    if (filters.bankingFriendly && filters.bankingFriendly !== 'all') {
      filtered = filtered.filter(state => 
        filters.bankingFriendly === 'yes' ? state.bankingFriendly : !state.bankingFriendly
      )
    }

    if (filters.institutionalReady && filters.institutionalReady !== 'all') {
      filtered = filtered.filter(state => 
        filters.institutionalReady === 'yes' ? state.institutionalReady : !state.institutionalReady
      )
    }

    setFilteredStates(filtered)
  }

  return (
    <CannabisLayout seo={{
      title: 'State Cannabis Compliance Directory | Pharmaceutical-Grade Multi-State Requirements | CultivateCo',
      description: 'Comprehensive state-by-state cannabis compliance directory for enterprise operations. Navigate multi-state regulations with pharmaceutical-grade precision.',
      keywords: [
        'state cannabis compliance directory',
        'multi-state cannabis regulations',
        'cannabis compliance by state',
        'pharmaceutical-grade cannabis compliance',
        'enterprise cannabis state requirements',
        'cannabis banking compliance by state',
        'institutional cannabis compliance',
        'cannabis regulatory requirements',
        'multi-state cannabis operations',
        'cannabis compliance consulting',
      ],
      ogTitle: 'State Cannabis Compliance Directory | CultivateCo',
      ogDescription: 'Navigate complex multi-state cannabis regulations with pharmaceutical-grade precision. Comprehensive compliance directory for enterprise operations.',
      ogImage: 'https://cultivateco.com/og-state-cannabis-compliance.jpg',
    }}>
      <StateComplianceHeroSection />
      
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="space-y-8">
            {/* Search and Filter */}
            <div className="space-y-6">
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search states..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              
              <StateComplianceFilter onFilterChange={handleFilterChange} />
            </div>

            {/* States Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStates.map((state) => (
                <StateComplianceCard key={state.abbreviation} state={state} />
              ))}
            </div>

            {filteredStates.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No states found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Enterprise CTA Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900">
              Need Multi-State
              <span className="block text-teal-700">Compliance Strategy?</span>
            </h2>
            
            <p className="text-xl text-gray-600">
              Our pharmaceutical-grade compliance experts help enterprise cannabis operations 
              navigate complex multi-state regulations with institutional investor confidence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/demo"
                className="inline-flex items-center space-x-2 rounded-lg bg-teal-600 px-8 py-4 text-lg font-semibold text-white hover:bg-teal-700 transition-colors"
              >
                <span>Schedule Enterprise Consultation</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <Link
                href="/platform"
                className="inline-flex items-center space-x-2 rounded-lg border-2 border-teal-600 px-8 py-4 text-lg font-semibold text-teal-600 hover:bg-teal-50 transition-colors"
              >
                <span>See Platform Capabilities</span>
                <ExternalLink className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </CannabisLayout>
  )
}

export default StateCompliancePage
