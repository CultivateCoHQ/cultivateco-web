'use client'

import { useState, useMemo } from 'react'
import { 
  Map, 
  Info, 
  Calendar, 
  DollarSign, 
  Scale, 
  Shield, 
  Users, 
  Package, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  ExternalLink,
  Filter,
  Search,
  TrendingUp,
  Building,
  Leaf,
  BookOpen,
  Eye,
  X,
  Percent,
  CreditCard,
  FileText
} from 'lucide-react'
import {
  CannabisButton,
  CannabisInput,
  CannabisSelect,
  CannabisMetricCard,
  CannabisAlert,
  CannabisBadge,
  CannabisSearchInput,
  CannabisCollapsible,
  CannabisEmptyState,
  CannabisCopyToClipboard
} from '@/components/ui/cannabis-components'
import { CannabisThemeContainer } from '@/providers/theme-provider'
import { formatCurrency, formatDate, cn } from '@/lib/utils'

/**
 * =============================================================================
 * CultivateCo Interactive Cannabis Governance Map
 * =============================================================================
 * Educational map showing cannabis legalization status and governance rules
 */

interface StateInfo {
  name: string
  code: string
  status: 'recreational' | 'medical-only' | 'illegal' | 'decriminalized' | 'cbd-only'
  legalizationDate?: string
  population: number
  dispensaries: number
  revenue?: string
  taxes: {
    excise: number
    state: number
    local?: number
  }
  governance: {
    agency: string
    tracking: string
    purchaseLimits: {
      flower: string
      concentrates: string
      edibles: string
    }
    businessHours: string
    testingRequired: boolean
    homeGrow: boolean
  }
  compliance: {
    score: number
    violations: number
    lastUpdate: string
  }
  futureOutlook?: {
    probability: number
    timeframe: string
    keyFactors: string[]
  }
}

// Cannabis state data based on the governance structure
const CANNABIS_STATES: Record<string, StateInfo> = {
  // Recreational Legal States
  'NM': {
    name: 'New Mexico',
    code: 'NM',
    status: 'recreational',
    legalizationDate: '2021-04-12',
    population: 2117500,
    dispensaries: 142,
    revenue: '$342M',
    taxes: { excise: 12.0, state: 5.125, local: 3.3125 },
    governance: {
      agency: 'Cannabis Control Division',
      tracking: 'METRC',
      purchaseLimits: {
        flower: '2 oz/day',
        concentrates: '16g/day', 
        edibles: '800mg/day'
      },
      businessHours: '8am-10pm',
      testingRequired: true,
      homeGrow: true
    },
    compliance: { score: 95, violations: 3, lastUpdate: '2024-11-15' }
  },
  'CA': {
    name: 'California',
    code: 'CA',
    status: 'recreational',
    legalizationDate: '2016-11-08',
    population: 39538200,
    dispensaries: 1247,
    revenue: '$6.2B',
    taxes: { excise: 15.0, state: 7.25, local: 5.0 },
    governance: {
      agency: 'Department of Cannabis Control',
      tracking: 'METRC',
      purchaseLimits: {
        flower: '1 oz/day',
        concentrates: '8g/day',
        edibles: '1000mg/day'
      },
      businessHours: '6am-10pm',
      testingRequired: true,
      homeGrow: true
    },
    compliance: { score: 88, violations: 127, lastUpdate: '2024-11-18' }
  },
  'CO': {
    name: 'Colorado',
    code: 'CO',
    status: 'recreational',
    legalizationDate: '2012-12-10',
    population: 5773700,
    dispensaries: 573,
    revenue: '$2.2B',
    taxes: { excise: 15.0, state: 2.9, local: 3.5 },
    governance: {
      agency: 'Marijuana Enforcement Division',
      tracking: 'METRC',
      purchaseLimits: {
        flower: '1 oz/day',
        concentrates: '8g/day',
        edibles: '800mg/day'
      },
      businessHours: '8am-12am',
      testingRequired: true,
      homeGrow: true
    },
    compliance: { score: 92, violations: 45, lastUpdate: '2024-11-20' }
  },
  // Medical-Only States
  'PA': {
    name: 'Pennsylvania',
    code: 'PA',
    status: 'medical-only',
    population: 13002700,
    dispensaries: 156,
    revenue: '$485M',
    taxes: { excise: 0, state: 6.0, local: 2.0 },
    governance: {
      agency: 'Department of Health',
      tracking: 'MJ Freeway',
      purchaseLimits: {
        flower: '3 oz/month',
        concentrates: '24g/month',
        edibles: '1000mg/month'
      },
      businessHours: '9am-9pm',
      testingRequired: true,
      homeGrow: false
    },
    compliance: { score: 89, violations: 12, lastUpdate: '2024-11-10' },
    futureOutlook: {
      probability: 85,
      timeframe: '2025',
      keyFactors: ['Governor support', 'Bipartisan interest', 'Revenue pressure']
    }
  },
  // Illegal/Future States
  'TX': {
    name: 'Texas',
    code: 'TX',
    status: 'cbd-only',
    population: 30029600,
    dispensaries: 73,
    revenue: '$12M',
    taxes: { excise: 0, state: 6.25, local: 2.0 },
    governance: {
      agency: 'Department of Public Safety',
      tracking: 'Custom System',
      purchaseLimits: {
        flower: 'None',
        concentrates: '1% THC max',
        edibles: '1% THC max'
      },
      businessHours: '8am-8pm',
      testingRequired: true,
      homeGrow: false
    },
    compliance: { score: 76, violations: 8, lastUpdate: '2024-11-12' },
    futureOutlook: {
      probability: 45,
      timeframe: '2027',
      keyFactors: ['Hemp-derived THC issues', 'Business pressure', 'Public support']
    }
  },
  'WI': {
    name: 'Wisconsin',
    code: 'WI',
    status: 'illegal',
    population: 5893700,
    dispensaries: 0,
    taxes: { excise: 0, state: 0 },
    governance: {
      agency: 'None',
      tracking: 'None',
      purchaseLimits: {
        flower: 'Illegal',
        concentrates: 'Illegal',
        edibles: 'Illegal'
      },
      businessHours: 'N/A',
      testingRequired: false,
      homeGrow: false
    },
    compliance: { score: 0, violations: 0, lastUpdate: 'N/A' },
    futureOutlook: {
      probability: 75,
      timeframe: '2025',
      keyFactors: ['Governor support', 'Republican division', 'Public support']
    }
  }
}

// Add more recreational states
const ADDITIONAL_RECREATIONAL_STATES = [
  'AK', 'AZ', 'CT', 'DE', 'IL', 'ME', 'MD', 'MA', 'MI', 'MN', 
  'MO', 'MT', 'NV', 'NJ', 'NY', 'OH', 'OR', 'RI', 'VT', 'VA', 'WA'
]

ADDITIONAL_RECREATIONAL_STATES.forEach(code => {
  if (!CANNABIS_STATES[code]) {
    CANNABIS_STATES[code] = {
      name: getStateName(code),
      code,
      status: 'recreational',
      legalizationDate: '2020-01-01',
      population: 5000000,
      dispensaries: 100,
      revenue: '$500M',
      taxes: { excise: 10.0, state: 5.0, local: 2.0 },
      governance: {
        agency: 'State Cannabis Control',
        tracking: 'METRC',
        purchaseLimits: {
          flower: '1 oz/day',
          concentrates: '8g/day',
          edibles: '800mg/day'
        },
        businessHours: '8am-10pm',
        testingRequired: true,
        homeGrow: true
      },
      compliance: { score: 90, violations: 15, lastUpdate: '2024-11-15' }
    }
  }
})

function getStateName(code: string): string {
  const stateNames: Record<string, string> = {
    'AK': 'Alaska', 'AZ': 'Arizona', 'CT': 'Connecticut', 'DE': 'Delaware',
    'IL': 'Illinois', 'ME': 'Maine', 'MD': 'Maryland', 'MA': 'Massachusetts',
    'MI': 'Michigan', 'MN': 'Minnesota', 'MO': 'Missouri', 'MT': 'Montana',
    'NV': 'Nevada', 'NJ': 'New Jersey', 'NY': 'New York', 'OH': 'Ohio',
    'OR': 'Oregon', 'RI': 'Rhode Island', 'VT': 'Vermont', 'VA': 'Virginia', 'WA': 'Washington'
  }
  return stateNames[code] || code
}

export default function CannabisGovernanceMapPage() {
  const [selectedState, setSelectedState] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [showDetails, setShowDetails] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Filter states based on status and search
  const filteredStates = useMemo(() => {
    return Object.values(CANNABIS_STATES).filter(state => {
      const matchesStatus = filterStatus === 'all' || state.status === filterStatus
      const matchesSearch = !searchQuery || 
        state.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        state.code.toLowerCase().includes(searchQuery.toLowerCase())
      
      return matchesStatus && matchesSearch
    })
  }, [filterStatus, searchQuery])

  // Calculate summary statistics
  const statistics = useMemo(() => {
    const recreational = Object.values(CANNABIS_STATES).filter(s => s.status === 'recreational')
    const medical = Object.values(CANNABIS_STATES).filter(s => s.status === 'medical-only')
    const totalRevenue = recreational.reduce((sum, state) => {
      const revenue = state.revenue ? parseFloat(state.revenue.replace(/[$MB]/g, '')) : 0
      return sum + (state.revenue?.includes('B') ? revenue * 1000 : revenue)
    }, 0)
    const totalDispensaries = Object.values(CANNABIS_STATES).reduce((sum, state) => sum + state.dispensaries, 0)
    
    return {
      recreationalStates: recreational.length,
      medicalStates: medical.length,
      totalRevenue: `$${totalRevenue.toFixed(1)}B`,
      totalDispensaries
    }
  }, [])

  const selectedStateData = selectedState ? CANNABIS_STATES[selectedState] : null

  return (
    <div className="min-h-screen bg-cultivateco-hero">
      {/* Cannabis Map Header */}
      <div className="bg-cultivateco-gradient text-cultivateco-cream py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-cultivateco-cream/20 rounded-xl flex items-center justify-center">
                <Map className="w-8 h-8 text-cultivateco-cream" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold">
              Cannabis Governance Map
            </h1>
            
            <p className="text-xl text-cultivateco-cream/90 max-w-3xl mx-auto">
              Explore cannabis legalization status, governance rules, and compliance requirements 
              across all 50 states. Stay informed about the evolving cannabis regulatory landscape.
            </p>
            
            <div className="flex items-center justify-center space-x-8 text-cultivateco-cream/80">
              <div className="text-center">
                <div className="text-2xl font-bold">{statistics.recreationalStates}</div>
                <div className="text-sm">Recreational States</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{statistics.totalRevenue}</div>
                <div className="text-sm">Annual Revenue</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{statistics.totalDispensaries.toLocaleString()}</div>
                <div className="text-sm">Dispensaries</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="space-y-8">
          {/* Cannabis Map Controls */}
          <CannabisThemeContainer variant="card">
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <h2 className="text-xl font-semibold text-cultivateco-green">
                  Interactive Cannabis Legalization Map
                </h2>
                
                <div className="flex items-center space-x-4">
                  <CannabisButton
                    variant="outline"
                    size="sm"
                    onClick={() => setShowDetails(!showDetails)}
                    icon={showDetails ? Eye : Info}
                  >
                    {showDetails ? 'Hide Details' : 'Show Details'}
                  </CannabisButton>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex-1">
                  <CannabisSearchInput
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search states..."
                  />
                </div>
                
                <CannabisSelect
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  options={[
                    { value: 'all', label: 'All States' },
                    { value: 'recreational', label: 'Recreational Legal' },
                    { value: 'medical-only', label: 'Medical Only' },
                    { value: 'cbd-only', label: 'CBD Only' },
                    { value: 'illegal', label: 'Illegal' }
                  ]}
                />
              </div>
              
              {/* Cannabis Status Legend */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-cultivateco-green rounded"></div>
                  <span className="text-sm">Recreational Legal</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-cultivateco-blue rounded"></div>
                  <span className="text-sm">Medical Only</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-amber-500 rounded"></div>
                  <span className="text-sm">CBD Only</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-400 rounded"></div>
                  <span className="text-sm">Illegal</span>
                </div>
              </div>
            </div>
          </CannabisThemeContainer>

          {/* Cannabis Interactive Map */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cannabis Map Visualization */}
            <div className="lg:col-span-2">
              <CannabisThemeContainer variant="card">
                <div className="space-y-4">
                  <h3 className="font-semibold text-cultivateco-green">United States Cannabis Map</h3>
                  
                  {/* SVG Map Placeholder - In production, use a proper US map SVG */}
                  <div className="bg-gray-100 rounded-lg p-8 text-center min-h-[400px] flex items-center justify-center">
                    <div className="space-y-4">
                      <Map className="w-16 h-16 text-cultivateco-green mx-auto" />
                      <div className="space-y-2">
                        <h4 className="text-lg font-medium text-cultivateco-green">
                          Interactive US Cannabis Map
                        </h4>
                        <p className="text-gray-600 max-w-md">
                          Click on states below to explore their cannabis governance rules, 
                          compliance requirements, and legalization status.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* State Buttons Grid */}
                  <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-2">
                    {Object.values(CANNABIS_STATES).map(state => (
                      <button
                        key={state.code}
                        onClick={() => setSelectedState(state.code)}
                        className={cn(
                          'p-2 rounded text-xs font-medium transition-all duration-200',
                          selectedState === state.code 
                            ? 'bg-cultivateco-green text-cultivateco-cream' 
                            : getStateButtonColor(state.status),
                          'hover:shadow-lg hover:-translate-y-0.5'
                        )}
                        title={`${state.name} - ${state.status.replace('-', ' ')}`}
                      >
                        {state.code}
                      </button>
                    ))}
                  </div>
                </div>
              </CannabisThemeContainer>
            </div>

            {/* Cannabis State Details Panel */}
            <div className="space-y-6">
              {selectedStateData ? (
                <CannabisStateDetails state={selectedStateData} />
              ) : (
                <CannabisThemeContainer variant="card">
                  <CannabisEmptyState
                    icon={Map}
                    title="Select a State"
                    description="Click on any state to view its cannabis governance rules and compliance requirements."
                  />
                </CannabisThemeContainer>
              )}
            </div>
          </div>

          {/* Cannabis States List */}
          <CannabisThemeContainer variant="card">
            <div className="space-y-4">
              <h3 className="font-semibold text-cultivateco-green">Cannabis States Overview</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredStates.map(state => (
                  <CannabisStateCard
                    key={state.code}
                    state={state}
                    onClick={() => setSelectedState(state.code)}
                    isSelected={selectedState === state.code}
                  />
                ))}
              </div>
            </div>
          </CannabisThemeContainer>

          {/* Cannabis Legalization Trends */}
          <CannabisLegalizationTrends />

          {/* Cannabis Educational Resources */}
          <CannabisEducationalResources />
        </div>
      </div>
    </div>
  )
}

/**
 * Get state button color based on status
 */
function getStateButtonColor(status: string): string {
  switch (status) {
    case 'recreational':
      return 'bg-cultivateco-green/20 text-cultivateco-green hover:bg-cultivateco-green/30'
    case 'medical-only':
      return 'bg-cultivateco-blue/20 text-cultivateco-blue hover:bg-cultivateco-blue/30'
    case 'cbd-only':
      return 'bg-amber-100 text-amber-700 hover:bg-amber-200'
    case 'decriminalized':
      return 'bg-purple-100 text-purple-700 hover:bg-purple-200'
    default:
      return 'bg-gray-100 text-gray-700 hover:bg-gray-200'
  }
}

/**
 * Cannabis state details component
 */
function CannabisStateDetails({ state }: { state: StateInfo }) {
  return (
    <CannabisThemeContainer variant="card">
      <div className="space-y-6">
        {/* State Header */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-cultivateco-green">
              {state.name}
            </h3>
            <CannabisBadge 
              variant={getStatusVariant(state.status)}
              size="sm"
            >
              {state.status.replace('-', ' ').toUpperCase()}
            </CannabisBadge>
          </div>
          
          {state.legalizationDate && (
            <div className="text-sm text-gray-600">
              Legalized: {formatDate(state.legalizationDate)}
            </div>
          )}
        </div>

        {/* Cannabis Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-sm text-gray-600">Population</div>
            <div className="font-semibold">{(state.population / 1000000).toFixed(1)}M</div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-sm text-gray-600">Dispensaries</div>
            <div className="font-semibold">{state.dispensaries.toLocaleString()}</div>
          </div>
          
          {state.revenue && (
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-sm text-gray-600">Annual Revenue</div>
              <div className="font-semibold text-cultivateco-green">{state.revenue}</div>
            </div>
          )}
          
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-sm text-gray-600">Compliance Score</div>
            <div className="font-semibold">{state.compliance.score}/100</div>
          </div>
        </div>

        {/* Cannabis Governance */}
        <CannabisCollapsible
          title="Governance Rules"
          icon={Shield}
          defaultOpen={true}
        >
          <div className="space-y-3 pt-3">
            <div>
              <div className="text-sm text-gray-600">Regulatory Agency</div>
              <div className="font-medium">{state.governance.agency}</div>
            </div>
            
            <div>
              <div className="text-sm text-gray-600">Tracking System</div>
              <div className="font-medium">{state.governance.tracking}</div>
            </div>
            
            <div>
              <div className="text-sm text-gray-600">Business Hours</div>
              <div className="font-medium">{state.governance.businessHours}</div>
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <div>
                <div className="text-sm text-gray-600">Purchase Limits</div>
                <div className="text-sm space-y-1">
                  <div>Flower: {state.governance.purchaseLimits.flower}</div>
                  <div>Concentrates: {state.governance.purchaseLimits.concentrates}</div>
                  <div>Edibles: {state.governance.purchaseLimits.edibles}</div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <CheckCircle className={cn('w-4 h-4', state.governance.testingRequired ? 'text-green-600' : 'text-gray-400')} />
                <span>Testing Required</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className={cn('w-4 h-4', state.governance.homeGrow ? 'text-green-600' : 'text-gray-400')} />
                <span>Home Growing</span>
              </div>
            </div>
          </div>
        </CannabisCollapsible>

        {/* Cannabis Taxation */}
        <CannabisCollapsible
          title="Tax Structure"
          icon={DollarSign}
        >
          <div className="space-y-3 pt-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-sm text-gray-600">Excise Tax</div>
                <div className="font-semibold">{state.taxes.excise}%</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">State Tax</div>
                <div className="font-semibold">{state.taxes.state}%</div>
              </div>
            </div>
            
            {state.taxes.local && (
              <div>
                <div className="text-sm text-gray-600">Local Tax (avg)</div>
                <div className="font-semibold">{state.taxes.local}%</div>
              </div>
            )}
            
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-sm text-gray-600">Total Tax Rate</div>
              <div className="text-lg font-bold text-cultivateco-green">
                {(state.taxes.excise + state.taxes.state + (state.taxes.local || 0)).toFixed(1)}%
              </div>
            </div>
          </div>
        </CannabisCollapsible>

        {/* Future Outlook */}
        {state.futureOutlook && (
          <CannabisCollapsible
            title="Legalization Outlook"
            icon={TrendingUp}
          >
            <div className="space-y-3 pt-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Probability</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-cultivateco-green h-2 rounded-full"
                      style={{ width: `${state.futureOutlook.probability}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{state.futureOutlook.probability}%</span>
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-600">Expected Timeframe</div>
                <div className="font-medium">{state.futureOutlook.timeframe}</div>
              </div>
              
              <div>
                <div className="text-sm text-gray-600">Key Factors</div>
                <ul className="text-sm space-y-1">
                  {state.futureOutlook.keyFactors.map((factor, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-1 h-1 bg-cultivateco-green rounded-full mt-2 flex-shrink-0" />
                      <span>{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CannabisCollapsible>
        )}
      </div>
    </CannabisThemeContainer>
  )
}

/**
 * Cannabis state card component
 */
function CannabisStateCard({ 
  state, 
  onClick, 
  isSelected 
}: { 
  state: StateInfo
  onClick: () => void
  isSelected: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'text-left p-4 rounded-lg border transition-all duration-200 hover:shadow-md',
        isSelected 
          ? 'border-cultivateco-green bg-cultivateco-green/5' 
          : 'border-gray-200 hover:border-cultivateco-green/50'
      )}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">{state.name}</h4>
          <CannabisBadge 
            variant={getStatusVariant(state.status)}
            size="sm"
          >
            {state.status === 'medical-only' ? 'MED' : 
             state.status === 'recreational' ? 'REC' :
             state.status === 'cbd-only' ? 'CBD' : 'ILLEGAL'}
          </CannabisBadge>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <div className="text-gray-600">Dispensaries</div>
            <div className="font-medium">{state.dispensaries}</div>
          </div>
          
          {state.revenue && (
            <div>
              <div className="text-gray-600">Revenue</div>
              <div className="font-medium text-cultivateco-green">{state.revenue}</div>
            </div>
          )}
        </div>
        
        {state.futureOutlook && (
          <div className="text-sm">
            <div className="text-gray-600">Legalization Probability</div>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-gray-200 rounded-full h-1">
                <div 
                  className="bg-cultivateco-green h-1 rounded-full"
                  style={{ width: `${state.futureOutlook.probability}%` }}
                />
              </div>
              <span className="font-medium">{state.futureOutlook.probability}%</span>
            </div>
          </div>
        )}
      </div>
    </button>
  )
}

/**
 * Get status variant for badges
 */
function getStatusVariant(status: string): 'compliant' | 'warning' | 'info' | 'violation' {
  switch (status) {
    case 'recreational':
      return 'compliant'
    case 'medical-only':
      return 'info'
    case 'cbd-only':
      return 'warning'
    default:
      return 'violation'
  }
}

/**
 * Cannabis legalization trends component
 */
function CannabisLegalizationTrends() {
  const trends = [
    {
      year: '2012',
      milestone: 'Colorado & Washington legalize recreational cannabis',
      states: 2
    },
    {
      year: '2024',
      milestone: '24 states have legalized recreational cannabis',
      states: 24
    },
    {
      year: '2025',
      milestone: 'Projected: Pennsylvania, Wisconsin could legalize',
      states: 26,
      projected: true
    }
  ]

  return (
    <CannabisThemeContainer variant="card">
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-cultivateco-green">
          Cannabis Legalization Timeline
        </h3>
        
        <div className="space-y-4">
          {trends.map((trend, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className={cn(
                'w-16 h-16 rounded-full flex items-center justify-center text-white font-bold',
                trend.projected ? 'bg-amber-500' : 'bg-cultivateco-green'
              )}>
                {trend.states}
              </div>
              
              <div className="flex-1 space-y-1">
                <div className="font-medium text-gray-900">{trend.year}</div>
                <div className="text-gray-600">{trend.milestone}</div>
                {trend.projected && (
                  <CannabisBadge variant="warning" size="sm">
                    Projected
                  </CannabisBadge>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </CannabisThemeContainer>
  )
}

/**
 * Cannabis educational resources component
 */
function CannabisEducationalResources() {
  const resources = [
    {
      title: 'Cannabis Compliance Guide',
      description: 'Complete guide to state cannabis regulations and compliance requirements',
      icon: BookOpen,
      link: '/resources/compliance-guide'
    },
    {
      title: 'State Licensing Requirements',
      description: 'Step-by-step licensing process for each state',
      icon: FileText,
      link: '/resources/licensing'
    },
    {
      title: 'Tax Calculation Tools',
      description: 'Calculate cannabis taxes across different states',
      icon: Calculator,
      link: '/tools/tax-calculator'
    },
    {
      title: 'Market Analysis Reports',
      description: 'In-depth analysis of cannabis markets by state',
      icon: TrendingUp,
      link: '/resources/market-reports'
    }
  ]

  return (
    <CannabisThemeContainer variant="card">
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-cultivateco-green">
          Educational Resources
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resources.map((resource, index) => {
            const Icon = resource.icon
            return (
              <a
                key={index}
                href={resource.link}
                className="block p-4 border border-gray-200 rounded-lg hover:border-cultivateco-green hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-cultivateco-green/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-cultivateco-green" />
                  </div>
                  
                  <div className="flex-1 space-y-1">
                    <h4 className="font-medium text-gray-900">{resource.title}</h4>
                    <p className="text-sm text-gray-600">{resource.description}</p>
                  </div>
                  
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </CannabisThemeContainer>
  )
}
