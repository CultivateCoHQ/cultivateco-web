/**
 * =============================================================================
 * CultivateCo Cannabis Governance Map Page
 * =============================================================================
 * Interactive map showing cannabis legalization status and compliance data
 */

'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import {
  MapPin,
  TrendingUp,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Building2,
  BarChart3,
  Filter,
  Info,
  X,
  ExternalLink,
  Calendar,
  DollarSign,
  Users,
  Zap,
  Target,
} from 'lucide-react'

import { CannabisLayout } from '@/components/layout/CannabisLayout'
import {
  cn,
  getCannabisStatusInfo,
  formatComplianceScore,
  getLegalizationProbabilityColor,
  getMarketReadinessColor,
  formatCannabisRevenue,
  trackCannabisEvent,
} from '@/lib/cannabis-utils'
import type {
  CannabisSEOData,
  CannabisStateInfo,
  CannabisLegalStatus,
  CannabisMapFilter,
} from '@/types/cannabis-marketing'

// Dynamic import for map component to avoid SSR issues
const CannabisInteractiveMap = dynamic(
  () => import('@/components/map/CannabisInteractiveMap'),
  { ssr: false }
)

// ============================================================================
// CANNABIS GOVERNANCE MAP DATA
// ============================================================================

const CANNABIS_STATES_DATA: CannabisStateInfo[] = [
  // Recreational Legal States
  {
    id: 'nm',
    name: 'New Mexico',
    code: 'NM',
    legalStatus: 'recreational',
    marketType: ['adult-use', 'medical'],
    legalizationDate: '2021-04-12',
    effectiveDate: '2022-04-01',
    regulatoryAgency: 'Cannabis Control Division',
    licensingAuthority: 'NM Regulation & Licensing Department',
    trackingSystem: 'METRC',
    businessHours: {
      earliest: '08:00',
      latest: '22:00',
      timezone: 'America/Denver',
    },
    purchaseLimits: {
      adultUse: { flower: 56, concentrates: 16, edibles: 800 },
      medical: { flower: 113, concentrates: 32, edibles: 1600 },
    },
    ageRequirements: { adultUse: 21, medical: 18 },
    taxation: { exciseTax: 12.0, stateTax: 5.125, localTax: 3.3125 },
    complianceScore: 96,
    complianceGrade: 'A+',
    legalizationPrediction: {
      probability: 100,
      timeframe: '2025',
      confidence: 'high',
      keyFactors: ['Already legalized', 'Established market', 'Strong regulatory framework'],
    },
    marketReadiness: {
      score: 95,
      infrastructure: 98,
      demand: 94,
      regulation: 97,
      competition: 89,
    },
    revenueProjection: {
      year1: 85,
      year3: 150,
      year5: 220,
      marketSize: 350,
    },
    alerts: { total: 2, critical: 0, high: 0, medium: 1, low: 1 },
  },
  {
    id: 'co',
    name: 'Colorado',
    code: 'CO',
    legalStatus: 'recreational',
    marketType: ['adult-use', 'medical'],
    legalizationDate: '2012-11-06',
    effectiveDate: '2014-01-01',
    regulatoryAgency: 'Marijuana Enforcement Division',
    licensingAuthority: 'Colorado Department of Revenue',
    trackingSystem: 'METRC',
    businessHours: {
      earliest: '08:00',
      latest: '22:00',
      timezone: 'America/Denver',
    },
    purchaseLimits: {
      adultUse: { flower: 28, concentrates: 8, edibles: 800 },
      medical: { flower: 56, concentrates: 16, edibles: 800 },
    },
    ageRequirements: { adultUse: 21, medical: 18 },
    taxation: { exciseTax: 15.0, stateTax: 15.0, localTax: 5.0 },
    complianceScore: 94,
    complianceGrade: 'A',
    legalizationPrediction: {
      probability: 100,
      timeframe: '2025',
      confidence: 'high',
      keyFactors: ['Mature market leader', 'Comprehensive regulations', 'Industry standard'],
    },
    marketReadiness: {
      score: 98,
      infrastructure: 99,
      demand: 97,
      regulation: 99,
      competition: 96,
    },
    revenueProjection: {
      year1: 320,
      year3: 450,
      year5: 580,
      marketSize: 950,
    },
    alerts: { total: 5, critical: 0, high: 1, medium: 2, low: 2 },
  },
  {
    id: 'ca',
    name: 'California',
    code: 'CA',
    legalStatus: 'recreational',
    marketType: ['adult-use', 'medical'],
    legalizationDate: '2016-11-08',
    effectiveDate: '2018-01-01',
    regulatoryAgency: 'Department of Cannabis Control',
    licensingAuthority: 'California Department of Cannabis Control',
    trackingSystem: 'METRC',
    businessHours: {
      earliest: '06:00',
      latest: '22:00',
      timezone: 'America/Los_Angeles',
    },
    purchaseLimits: {
      adultUse: { flower: 28, concentrates: 8, edibles: 800 },
      medical: { flower: 224, concentrates: 32, edibles: 800 },
    },
    ageRequirements: { adultUse: 21, medical: 18 },
    taxation: { exciseTax: 15.0, stateTax: 7.25, localTax: 12.5 },
    complianceScore: 89,
    complianceGrade: 'B+',
    legalizationPrediction: {
      probability: 100,
      timeframe: '2025',
      confidence: 'high',
      keyFactors: ['Largest market', 'Complex regulations', 'High competition'],
    },
    marketReadiness: {
      score: 92,
      infrastructure: 95,
      demand: 99,
      regulation: 88,
      competition: 95,
    },
    revenueProjection: {
      year1: 850,
      year3: 1200,
      year5: 1650,
      marketSize: 2800,
    },
    alerts: { total: 12, critical: 1, high: 3, medium: 5, low: 3 },
  },
  // Medical Only States
  {
    id: 'pa',
    name: 'Pennsylvania',
    code: 'PA',
    legalStatus: 'medical-only',
    marketType: ['medical'],
    regulatoryAgency: 'Department of Health Medical Marijuana Program',
    licensingAuthority: 'Pennsylvania Department of Health',
    trackingSystem: 'Custom',
    businessHours: {
      earliest: '09:00',
      latest: '21:00',
      timezone: 'America/New_York',
    },
    purchaseLimits: {
      medical: { flower: 84, concentrates: 24, edibles: 1000 },
    },
    ageRequirements: { medical: 18 },
    taxation: { exciseTax: 0, stateTax: 6.0, localTax: 2.0 },
    complianceScore: 91,
    complianceGrade: 'A',
    legalizationPrediction: {
      probability: 85,
      timeframe: '2025',
      confidence: 'high',
      keyFactors: ['Governor support', 'Bipartisan interest', 'Neighboring pressure', 'Revenue needs'],
    },
    marketReadiness: {
      score: 78,
      infrastructure: 82,
      demand: 88,
      regulation: 75,
      competition: 68,
    },
    revenueProjection: {
      year1: 180,
      year3: 420,
      year5: 650,
      marketSize: 890,
    },
    alerts: { total: 3, critical: 0, high: 0, medium: 2, low: 1 },
  },
  // Illegal States with High Legalization Probability
  {
    id: 'wi',
    name: 'Wisconsin',
    code: 'WI',
    legalStatus: 'illegal',
    marketType: ['none'],
    regulatoryAgency: 'None',
    licensingAuthority: 'None',
    trackingSystem: 'None',
    businessHours: {
      earliest: '00:00',
      latest: '00:00',
      timezone: 'America/Chicago',
    },
    purchaseLimits: {},
    ageRequirements: { adultUse: 21, medical: 18 },
    taxation: { exciseTax: 0, stateTax: 0 },
    complianceScore: 0,
    complianceGrade: 'F',
    legalizationPrediction: {
      probability: 75,
      timeframe: '2025',
      confidence: 'medium',
      keyFactors: ['Governor support', 'Republican disagreement', '86% medical support', 'Border pressure'],
    },
    marketReadiness: {
      score: 45,
      infrastructure: 35,
      demand: 68,
      regulation: 25,
      competition: 52,
    },
    revenueProjection: {
      year1: 0,
      year3: 220,
      year5: 380,
      marketSize: 520,
    },
    alerts: { total: 0, critical: 0, high: 0, medium: 0, low: 0 },
  },
  {
    id: 'tx',
    name: 'Texas',
    code: 'TX',
    legalStatus: 'cbd-only',
    marketType: ['hemp-cbd'],
    regulatoryAgency: 'Department of Public Safety',
    licensingAuthority: 'Texas Department of Public Safety',
    trackingSystem: 'Custom',
    businessHours: {
      earliest: '08:00',
      latest: '20:00',
      timezone: 'America/Chicago',
    },
    purchaseLimits: {
      medical: { flower: 0, concentrates: 1, edibles: 1 }, // 1% THC max
    },
    ageRequirements: { medical: 18 },
    taxation: { exciseTax: 0, stateTax: 6.25, localTax: 2.0 },
    complianceScore: 88,
    complianceGrade: 'B+',
    legalizationPrediction: {
      probability: 45,
      timeframe: '2027',
      confidence: 'low',
      keyFactors: ['Hemp market explosion', 'Lt. Gov opposition', '62% public support', 'Revenue pressure'],
    },
    marketReadiness: {
      score: 35,
      infrastructure: 42,
      demand: 78,
      regulation: 28,
      competition: 15,
    },
    revenueProjection: {
      year1: 0,
      year3: 450,
      year5: 1200,
      marketSize: 2100,
    },
    alerts: { total: 8, critical: 0, high: 2, medium: 4, low: 2 },
  },
]

const CANNABIS_MAP_LEGEND = [
  { status: 'recreational' as CannabisLegalStatus, label: 'Recreational Legal', count: 24 },
  { status: 'medical-only' as CannabisLegalStatus, label: 'Medical Only', count: 14 },
  { status: 'cbd-only' as CannabisLegalStatus, label: 'CBD Only', count: 3 },
  { status: 'decriminalized' as CannabisLegalStatus, label: 'Decriminalized', count: 5 },
  { status: 'illegal' as CannabisLegalStatus, label: 'Illegal', count: 4 },
]

// ============================================================================
// CANNABIS MAP COMPONENTS
// ============================================================================

interface CannabisMapControlsProps {
  filters: CannabisMapFilter
  onFiltersChange: (filters: CannabisMapFilter) => void
  mapLayer: 'legal-status' | 'compliance' | 'predictions' | 'market-readiness'
  onLayerChange: (layer: 'legal-status' | 'compliance' | 'predictions' | 'market-readiness') => void
}

const CannabisMapControls: React.FC<CannabisMapControlsProps> = ({
  filters,
  onFiltersChange,
  mapLayer,
  onLayerChange,
}) => {
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="absolute top-4 left-4 z-10 space-y-4">
      {/* Cannabis Map Layer Selector */}
      <div className="bg-white rounded-lg shadow-cannabis p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Map View</h3>
        <div className="space-y-2">
          {[
            { key: 'legal-status', label: 'Legal Status', icon: Shield },
            { key: 'compliance', label: 'Compliance Scores', icon: CheckCircle },
            { key: 'predictions', label: 'Legalization Predictions', icon: TrendingUp },
            { key: 'market-readiness', label: 'Market Readiness', icon: Target },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => onLayerChange(key as any)}
              className={cn(
                'w-full flex items-center space-x-2 px-3 py-2 text-sm rounded-lg transition-colors text-left',
                mapLayer === key
                  ? 'bg-cannabis-green-100 text-cannabis-green-800'
                  : 'text-gray-600 hover:bg-gray-50'
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Cannabis Map Filters */}
      <div className="bg-white rounded-lg shadow-cannabis">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="w-full flex items-center justify-between p-4 text-sm font-semibold text-gray-900"
        >
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </div>
          <motion.div
            animate={{ rotate: showFilters ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Info className="h-4 w-4" />
          </motion.div>
        </button>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              className="overflow-hidden"
            >
              <div className="p-4 pt-0 space-y-4 border-t border-gray-200">
                {/* Legal Status Filter */}
                <div>
                  <label className="text-xs font-medium text-gray-700 uppercase tracking-wide mb-2 block">
                    Legal Status
                  </label>
                  <div className="space-y-2">
                    {CANNABIS_MAP_LEGEND.map(({ status, label }) => (
                      <label key={status} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={filters.legalStatus?.includes(status) ?? true}
                          onChange={(e) => {
                            const current = filters.legalStatus || Object.values(CANNABIS_MAP_LEGEND).map(l => l.status)
                            const updated = e.target.checked
                              ? [...current.filter(s => s !== status), status]
                              : current.filter(s => s !== status)
                            onFiltersChange({ ...filters, legalStatus: updated })
                          }}
                          className="rounded text-cannabis-green-600"
                        />
                        <div className="flex items-center space-x-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: getCannabisStatusInfo(status).color }}
                          />
                          <span className="text-sm text-gray-700">{label}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Compliance Score Range */}
                <div>
                  <label className="text-xs font-medium text-gray-700 uppercase tracking-wide mb-2 block">
                    Compliance Score
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={filters.complianceScore?.min ?? 0}
                      onChange={(e) => {
                        onFiltersChange({
                          ...filters,
                          complianceScore: {
                            min: parseInt(e.target.value),
                            max: filters.complianceScore?.max ?? 100,
                          }
                        })
                      }}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{filters.complianceScore?.min ?? 0}%</span>
                      <span>{filters.complianceScore?.max ?? 100}%</span>
                    </div>
                  </div>
                </div>

                {/* Show Dispensaries Toggle */}
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.showDispensaries ?? true}
                      onChange={(e) => {
                        onFiltersChange({ ...filters, showDispensaries: e.target.checked })
                      }}
                      className="rounded text-cannabis-green-600"
                    />
                    <span className="text-sm text-gray-700">Show Dispensary Locations</span>
                  </label>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

interface CannabisStateDetailProps {
  state: CannabisStateInfo | null
  isOpen: boolean
  onClose: () => void
}

const CannabisStateDetail: React.FC<CannabisStateDetailProps> = ({
  state,
  isOpen,
  onClose,
}) => {
  if (!state) return null

  const statusInfo = getCannabisStatusInfo(state.legalStatus)
  const complianceInfo = formatComplianceScore(state.complianceScore)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            onClick={(e) => e.stopPropagation()}
            className="absolute right-4 top-4 bottom-4 w-96 bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Cannabis State Header */}
            <div className="relative p-6 bg-gradient-to-r from-cannabis-green-600 to-cannabis-blue-600 text-white">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
              
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">{state.name}</h2>
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: statusInfo.color }}
                  />
                  <span className="text-sm opacity-90">{statusInfo.label}</span>
                </div>
              </div>
            </div>

            {/* Cannabis State Content */}
            <div className="h-full overflow-y-auto pb-20">
              <div className="p-6 space-y-6">
                {/* Cannabis Legal Status */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Legal Status</h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Status</span>
                      <span className="text-sm font-medium text-gray-900">{statusInfo.label}</span>
                    </div>
                    {state.legalizationDate && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Legalized</span>
                        <span className="text-sm font-medium text-gray-900">
                          {new Date(state.legalizationDate).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                    {state.effectiveDate && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Effective</span>
                        <span className="text-sm font-medium text-gray-900">
                          {new Date(state.effectiveDate).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Cannabis Compliance Score */}
                {state.complianceScore > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Compliance</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Compliance Score</span>
                        <span className="text-lg font-bold" style={{ color: complianceInfo.color }}>
                          {complianceInfo.score}% ({complianceInfo.grade})
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${complianceInfo.score}%`,
                            backgroundColor: complianceInfo.color,
                          }}
                        />
                      </div>
                      <p className="text-xs text-gray-600 mt-2">{complianceInfo.description}</p>
                    </div>
                  </div>
                )}

                {/* Cannabis Legalization Prediction */}
                {state.legalStatus !== 'recreational' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Legalization Outlook</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Probability</span>
                        <span
                          className="text-lg font-bold"
                          style={{ color: getLegalizationProbabilityColor(state.legalizationPrediction.probability) }}
                        >
                          {state.legalizationPrediction.probability}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Timeframe</span>
                        <span className="text-sm font-medium text-gray-900">
                          {state.legalizationPrediction.timeframe}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Confidence</span>
                        <span className="text-sm font-medium text-gray-900 capitalize">
                          {state.legalizationPrediction.confidence}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Key Factors</h4>
                      <div className="space-y-1">
                        {state.legalizationPrediction.keyFactors.map((factor, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-cannabis-green-500 rounded-full" />
                            <span>{factor}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Cannabis Market Readiness */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Market Readiness</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Overall Score</span>
                      <span
                        className="text-lg font-bold"
                        style={{ color: getMarketReadinessColor(state.marketReadiness.score) }}
                      >
                        {state.marketReadiness.score}/100
                      </span>
                    </div>
                    
                    {[
                      { key: 'infrastructure', label: 'Infrastructure' },
                      { key: 'demand', label: 'Market Demand' },
                      { key: 'regulation', label: 'Regulatory Framework' },
                      { key: 'competition', label: 'Competition Level' },
                    ].map(({ key, label }) => (
                      <div key={key}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-600">{label}</span>
                          <span className="text-xs font-medium text-gray-900">
                            {state.marketReadiness[key as keyof typeof state.marketReadiness]}/100
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className="h-1.5 rounded-full bg-cannabis-green-500 transition-all duration-300"
                            style={{
                              width: `${state.marketReadiness[key as keyof typeof state.marketReadiness]}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cannabis Revenue Projection */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Revenue Projections</h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Year 1</span>
                      <span className="text-sm font-medium text-gray-900">
                        {formatCannabisRevenue(state.revenueProjection.year1 * 1000000)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Year 3</span>
                      <span className="text-sm font-medium text-gray-900">
                        {formatCannabisRevenue(state.revenueProjection.year3 * 1000000)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Year 5</span>
                      <span className="text-sm font-medium text-gray-900">
                        {formatCannabisRevenue(state.revenueProjection.year5 * 1000000)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                      <span className="text-sm font-medium text-gray-700">Market Size</span>
                      <span className="text-sm font-bold text-cannabis-green-600">
                        {formatCannabisRevenue(state.revenueProjection.marketSize * 1000000)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Cannabis Regulatory Info */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Regulatory Framework</h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Agency</span>
                      <span className="text-sm font-medium text-gray-900 text-right">
                        {state.regulatoryAgency}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Tracking System</span>
                      <span className="text-sm font-medium text-gray-900">
                        {state.trackingSystem}
                      </span>
                    </div>
                    {state.businessHours.earliest !== '00:00' && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Business Hours</span>
                        <span className="text-sm font-medium text-gray-900">
                          {state.businessHours.earliest} - {state.businessHours.latest}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Cannabis Action Buttons */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
              <div className="flex space-x-3">
                <Link
                  href={`/states/${state.code.toLowerCase()}`}
                  className="flex-1 inline-flex items-center justify-center space-x-2 rounded-lg cannabis-gradient px-4 py-2 text-sm font-medium text-white"
                >
                  <span>View Details</span>
                  <ExternalLink className="h-4 w-4" />
                </Link>
                <Link
                  href="/demo"
                  className="flex-1 inline-flex items-center justify-center space-x-2 rounded-lg border border-cannabis-green-600 px-4 py-2 text-sm font-medium text-cannabis-green-600 hover:bg-cannabis-green-50"
                >
                  <span>Book Demo</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const CannabisMapLegend: React.FC<{
  mapLayer: 'legal-status' | 'compliance' | 'predictions' | 'market-readiness'
}> = ({ mapLayer }) => {
  const legendContent = useMemo(() => {
    switch (mapLayer) {
      case 'legal-status':
        return CANNABIS_MAP_LEGEND.map(({ status, label, count }) => ({
          color: getCannabisStatusInfo(status).color,
          label: `${label} (${count})`,
        }))
      
      case 'compliance':
        return [
          { color: '#154438', label: 'Excellent (90-100%)' },
          { color: '#3d9a87', label: 'Good (80-89%)' },
          { color: '#0b447a', label: 'Fair (70-79%)' },
          { color: '#d97706', label: 'Poor (60-69%)' },
          { color: '#dc2626', label: 'Critical (<60%)' },
        ]
      
      case 'predictions':
        return [
          { color: '#154438', label: 'Very Likely (80-100%)' },
          { color: '#3d9a87', label: 'Likely (60-79%)' },
          { color: '#0b447a', label: 'Possible (40-59%)' },
          { color: '#d97706', label: 'Unlikely (20-39%)' },
          { color: '#6b7280', label: 'Very Unlikely (<20%)' },
        ]
      
      case 'market-readiness':
        return [
          { color: '#154438', label: 'Ready (80-100%)' },
          { color: '#0b447a', label: 'Developing (50-79%)' },
          { color: '#fbfaf7', label: 'Emerging (0-49%)', border: true },
        ]
      
      default:
        return []
    }
  }, [mapLayer])

  return (
    <div className="absolute bottom-4 left-4 z-10 bg-white rounded-lg shadow-cannabis p-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Legend</h3>
      <div className="space-y-2">
        {legendContent.map(({ color, label, border }, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div
              className={cn("w-4 h-4 rounded", border && "border-2 border-gray-300")}
              style={{ backgroundColor: color }}
            />
            <span className="text-sm text-gray-700">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================================================
// MAIN CANNABIS GOVERNANCE MAP PAGE
// ============================================================================

const CannabisGovernanceMapPage: React.FC = () => {
  const [selectedState, setSelectedState] = useState<CannabisStateInfo | null>(null)
  const [mapLayer, setMapLayer] = useState<'legal-status' | 'compliance' | 'predictions' | 'market-readiness'>('legal-status')
  const [filters, setFilters] = useState<CannabisMapFilter>({
    showDispensaries: true,
    showAlerts: false,
  })

  const filteredStates = useMemo(() => {
    return CANNABIS_STATES_DATA.filter(state => {
      if (filters.legalStatus && !filters.legalStatus.includes(state.legalStatus)) {
        return false
      }
      if (filters.complianceScore) {
        if (state.complianceScore < filters.complianceScore.min || state.complianceScore > filters.complianceScore.max) {
          return false
        }
      }
      return true
    })
  }, [filters])

  const handleStateClick = (state: CannabisStateInfo) => {
    setSelectedState(state)
    trackCannabisEvent('cannabis_governance_state_click', {
      state: state.name,
      state_code: state.code,
      legal_status: state.legalStatus,
      compliance_score: state.complianceScore,
    })
  }

  const handleLayerChange = (layer: typeof mapLayer) => {
    setMapLayer(layer)
    trackCannabisEvent('cannabis_governance_layer_change', {
      layer: layer,
      previous_layer: mapLayer,
    })
  }

  const seo: CannabisSEOData = {
    title: 'Cannabis Governance Map | Interactive State Legalization & Compliance Tracking',
    description: 'Interactive cannabis governance map showing legalization status, compliance scores, and market predictions across all 50 states. Real-time cannabis regulatory intelligence.',
    keywords: [
      'cannabis governance map',
      'cannabis legalization map',
      'cannabis compliance by state',
      'cannabis legal status',
      'cannabis market predictions',
      'cannabis regulatory tracking',
      'dispensary locations',
      'cannabis business intelligence',
      'state cannabis laws',
      'cannabis compliance scores',
    ],
    ogTitle: 'Interactive Cannabis Governance Map - Real-Time Legalization & Compliance Tracking',
    ogDescription: 'Explore cannabis legalization status, compliance scores, and market predictions across all 50 states with our interactive governance map.',
    ogImage: 'https://cultivateco.com/og-cannabis-governance-map.jpg',
  }

  return (
    <CannabisLayout seo={seo} containerClassName="h-screen">
      <div className="relative h-full">
        {/* Cannabis Map Header */}
        <div className="absolute top-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-sm border-b border-gray-200 p-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Cannabis Governance Map</h1>
                <p className="text-gray-600">
                  Real-time cannabis legalization status and compliance intelligence
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-600">
                  <span className="font-medium text-cannabis-green-600">
                    {filteredStates.length}
                  </span> states shown
                </div>
                
                <Link
                  href="/demo"
                  className="inline-flex items-center space-x-2 rounded-lg cannabis-gradient px-4 py-2 text-sm font-medium text-white hover:shadow-cannabis-lg transition-all duration-200"
                >
                  <span>Book Demo</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Cannabis Interactive Map */}
        <div className="h-full pt-20">
          <CannabisInteractiveMap
            states={filteredStates}
            onStateClick={handleStateClick}
            mapLayer={mapLayer}
            filters={filters}
          />
        </div>

        {/* Cannabis Map Controls */}
        <CannabisMapControls
          filters={filters}
          onFiltersChange={setFilters}
          mapLayer={mapLayer}
          onLayerChange={handleLayerChange}
        />

        {/* Cannabis Map Legend */}
        <CannabisMapLegend mapLayer={mapLayer} />

        {/* Cannabis State Detail Modal */}
        <CannabisStateDetail
          state={selectedState}
          isOpen={!!selectedState}
          onClose={() => setSelectedState(null)}
        />

        {/* Cannabis Quick Stats */}
        <div className="absolute top-20 right-4 z-10 space-y-4">
          {[
            {
              icon: Building2,
              label: 'Total Dispensaries',
              value: '2,500+',
              color: 'cannabis-green',
            },
            {
              icon: Shield,
              label: 'Avg Compliance',
              value: '94.2%',
              color: 'cannabis-blue',
            },
            {
              icon: TrendingUp,
              label: 'Revenue Tracked',
              value: '$2.1B',
              color: 'cannabis-green',
            },
            {
              icon: MapPin,
              label: 'States Supported',
              value: '19',
              color: 'cannabis-blue',
            },
          ].map(({ icon: Icon, label, value, color }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-cannabis p-4 min-w-[140px]"
            >
              <div className="flex items-center space-x-3">
                <div className={cn(
                  'rounded-full p-2',
                  color === 'cannabis-green' ? 'bg-cannabis-green-100' : 'bg-cannabis-blue-100'
                )}>
                  <Icon className={cn(
                    'h-4 w-4',
                    color === 'cannabis-green' ? 'text-cannabis-green-600' : 'text-cannabis-blue-600'
                  )} />
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">{value}</div>
                  <div className="text-xs text-gray-600">{label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </CannabisLayout>
  )
}

export default CannabisGovernanceMapPage
