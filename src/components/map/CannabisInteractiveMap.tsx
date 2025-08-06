/**
 * =============================================================================
 * CultivateCo Cannabis Interactive Map Component  
 * =============================================================================
 * Interactive Mapbox-powered map for cannabis governance and compliance data
 */

'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import {
  getCannabisStatusInfo,
  formatComplianceScore,
  getLegalizationProbabilityColor,
  getMarketReadinessColor,
  trackCannabisEvent,
} from '@/lib/cannabis-utils'
import type {
  CannabisStateInfo,
  CannabisMapFilter,
  CannabisDispensaryLocation,
} from '@/types/cannabis-marketing'

// ============================================================================
// CANNABIS MAP TYPES AND INTERFACES
// ============================================================================

interface CannabisInteractiveMapProps {
  states: CannabisStateInfo[]
  onStateClick?: (state: CannabisStateInfo) => void
  mapLayer: 'legal-status' | 'compliance' | 'predictions' | 'market-readiness'
  filters: CannabisMapFilter
  dispensaries?: CannabisDispensaryLocation[]
  className?: string
}

interface CannabisMapState {
  map: mapboxgl.Map | null
  loaded: boolean
  error: string | null
  hoveredState: string | null
}

// ============================================================================
// CANNABIS MAP CONFIGURATION
// ============================================================================

const CANNABIS_MAP_CONFIG = {
  style: process.env.NEXT_PUBLIC_MAPBOX_STYLE_URL || 'mapbox://styles/mapbox/light-v11',
  center: [-98.35, 39.5] as [number, number],
  zoom: 4,
  maxZoom: 10,
  minZoom: 3,
}

const CANNABIS_STATE_BOUNDARIES_URL = 'https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json'

// Cannabis dispensary sample data for demonstration
const SAMPLE_DISPENSARIES: CannabisDispensaryLocation[] = [
  // New Mexico Dispensaries
  {
    id: 'nm-albuquerque-1',
    name: 'CultivateCo Albuquerque North',
    address: '2500 Central Ave NE',
    city: 'Albuquerque',
    state: 'NM',
    coordinates: [-106.609991, 35.084386],
    status: 'operational',
    marketTier: 'flagship',
    openingDate: '2022-04-01',
    monthlyRevenue: 485000,
    complianceScore: 98,
  },
  {
    id: 'nm-albuquerque-2',
    name: 'CultivateCo Albuquerque Westside',
    address: '6000 Coors Blvd NW',
    city: 'Albuquerque',
    state: 'NM',
    coordinates: [-106.721893, 35.131843],
    status: 'construction',
    marketTier: 'flagship',
    openingDate: '2025-11-01',
    complianceScore: 0,
  },
  {
    id: 'nm-santa-fe-1',
    name: 'CultivateCo Santa Fe Downtown',
    address: '125 W Water St',
    city: 'Santa Fe',
    state: 'NM',
    coordinates: [-105.937799, 35.687267],
    status: 'planned',
    marketTier: 'flagship',
    openingDate: '2025-12-01',
    complianceScore: 0,
  },
  // Colorado Dispensaries
  {
    id: 'co-denver-1',
    name: 'CultivateCo Denver Central',
    address: '1234 Colfax Ave',
    city: 'Denver',
    state: 'CO',
    coordinates: [-104.991531, 39.740010],
    status: 'operational',
    marketTier: 'tier-1',
    openingDate: '2023-01-15',
    monthlyRevenue: 680000,
    complianceScore: 96,
  },
  {
    id: 'co-boulder-1',
    name: 'CultivateCo Boulder',
    address: '1500 Pearl St',
    city: 'Boulder',
    state: 'CO',
    coordinates: [-105.270546, 40.026772],
    status: 'operational',
    marketTier: 'tier-1',
    openingDate: '2023-03-01',
    monthlyRevenue: 420000,
    complianceScore: 94,
  },
  // California Dispensaries
  {
    id: 'ca-los-angeles-1',
    name: 'CultivateCo Los Angeles',
    address: '1234 Sunset Blvd',
    city: 'Los Angeles',
    state: 'CA',
    coordinates: [-118.243685, 34.052234],
    status: 'operational',
    marketTier: 'tier-1',
    openingDate: '2023-06-01',
    monthlyRevenue: 920000,
    complianceScore: 91,
  },
]

// ============================================================================
// CANNABIS MAP STYLING FUNCTIONS
// ============================================================================

const getCannabisMapStyleExpression = (
  layer: 'legal-status' | 'compliance' | 'predictions' | 'market-readiness',
  states: CannabisStateInfo[]
): mapboxgl.Expression => {
  const stateDataMap = states.reduce((acc, state) => {
    acc[state.code] = state
    return acc
  }, {} as Record<string, CannabisStateInfo>)

  switch (layer) {
    case 'legal-status': {
      const statusExpression: mapboxgl.Expression = ['case']
      
      states.forEach(state => {
        const statusInfo = getCannabisStatusInfo(state.legalStatus)
        statusExpression.push(['==', ['get', 'STUSPS'], state.code])
        statusExpression.push(statusInfo.color)
      })
      
      statusExpression.push('#e5e7eb') // Default gray for unmatched states
      return statusExpression
    }

    case 'compliance': {
      const complianceExpression: mapboxgl.Expression = ['case']
      
      states.forEach(state => {
        if (state.complianceScore > 0) {
          const complianceInfo = formatComplianceScore(state.complianceScore)
          complianceExpression.push(['==', ['get', 'STUSPS'], state.code])
          complianceExpression.push(complianceInfo.color)
        }
      })
      
      complianceExpression.push('#f3f4f6') // Light gray for states without compliance data
      return complianceExpression
    }

    case 'predictions': {
      const predictionsExpression: mapboxgl.Expression = ['case']
      
      states.forEach(state => {
        if (state.legalStatus !== 'recreational') {
          const color = getLegalizationProbabilityColor(state.legalizationPrediction.probability)
          predictionsExpression.push(['==', ['get', 'STUSPS'], state.code])
          predictionsExpression.push(color)
        } else {
          // Already legal states in green
          predictionsExpression.push(['==', ['get', 'STUSPS'], state.code])
          predictionsExpression.push('#154438')
        }
      })
      
      predictionsExpression.push('#f3f4f6') // Light gray for unmatched states
      return predictionsExpression
    }

    case 'market-readiness': {
      const readinessExpression: mapboxgl.Expression = ['case']
      
      states.forEach(state => {
        const color = getMarketReadinessColor(state.marketReadiness.score)
        readinessExpression.push(['==', ['get', 'STUSPS'], state.code])
        readinessExpression.push(color)
      })
      
      readinessExpression.push('#f3f4f6') // Light gray for unmatched states
      return readinessExpression
    }

    default:
      return '#e5e7eb'
  }
}

// ============================================================================
// CANNABIS INTERACTIVE MAP COMPONENT
// ============================================================================

export const CannabisInteractiveMap: React.FC<CannabisInteractiveMapProps> = ({
  states,
  onStateClick,
  mapLayer,
  filters,
  dispensaries = SAMPLE_DISPENSARIES,
  className,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const [mapState, setMapState] = useState<CannabisMapState>({
    map: null,
    loaded: false,
    error: null,
    hoveredState: null,
  })

  // Initialize Mapbox access token
  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
    if (token) {
      mapboxgl.accessToken = token
    } else {
      setMapState(prev => ({
        ...prev,
        error: 'Mapbox access token not found. Please check your environment variables.'
      }))
    }
  }, [])

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current || !mapboxgl.accessToken) return

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: CANNABIS_MAP_CONFIG.style,
      center: CANNABIS_MAP_CONFIG.center,
      zoom: CANNABIS_MAP_CONFIG.zoom,
      maxZoom: CANNABIS_MAP_CONFIG.maxZoom,
      minZoom: CANNABIS_MAP_CONFIG.minZoom,
      attributionControl: false,
      logoPosition: 'bottom-right',
    })

    // Add navigation controls
    map.addControl(new mapboxgl.NavigationControl(), 'top-right')

    // Add attribution
    map.addControl(new mapboxgl.AttributionControl({
      compact: true,
      customAttribution: '© CultivateCo Cannabis Governance Data',
    }), 'bottom-left')

    mapRef.current = map
    setMapState(prev => ({ ...prev, map }))

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [])

  // Load state boundaries and setup layers
  useEffect(() => {
    const map = mapRef.current
    if (!map || mapState.loaded) return

    const handleMapLoad = () => {
      // Load US state boundaries
      map.addSource('states', {
        type: 'geojson',
        data: CANNABIS_STATE_BOUNDARIES_URL,
      })

      // Add state fill layer
      map.addLayer({
        id: 'states-fill',
        type: 'fill',
        source: 'states',
        paint: {
          'fill-color': getCannabisMapStyleExpression(mapLayer, states),
          'fill-opacity': 0.8,
        },
      })

      // Add state stroke layer
      map.addLayer({
        id: 'states-stroke',
        type: 'line',
        source: 'states',
        paint: {
          'fill-outline-color': '#ffffff',
          'line-color': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            '#154438',
            '#ffffff'
          ],
          'line-width': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            3,
            1
          ],
        },
      })

      // Add dispensary markers if enabled
      if (filters.showDispensaries && dispensaries.length > 0) {
        const dispensaryGeojson = {
          type: 'FeatureCollection' as const,
          features: dispensaries.map(dispensary => ({
            type: 'Feature' as const,
            geometry: {
              type: 'Point' as const,
              coordinates: dispensary.coordinates,
            },
            properties: {
              id: dispensary.id,
              name: dispensary.name,
              status: dispensary.status,
              marketTier: dispensary.marketTier,
              complianceScore: dispensary.complianceScore,
              monthlyRevenue: dispensary.monthlyRevenue || 0,
            },
          })),
        }

        map.addSource('dispensaries', {
          type: 'geojson',
          data: dispensaryGeojson,
        })

        map.addLayer({
          id: 'dispensaries',
          type: 'circle',
          source: 'dispensaries',
          paint: {
            'circle-radius': [
              'case',
              ['==', ['get', 'status'], 'operational'], 8,
              ['==', ['get', 'status'], 'construction'], 6,
              4
            ],
            'circle-color': [
              'case',
              ['==', ['get', 'marketTier'], 'flagship'], '#154438',
              ['==', ['get', 'marketTier'], 'tier-1'], '#0b447a',
              '#3d9a87'
            ],
            'circle-stroke-color': '#ffffff',
            'circle-stroke-width': 2,
            'circle-opacity': 0.9,
          },
        })

        map.addLayer({
          id: 'dispensaries-labels',
          type: 'symbol',
          source: 'dispensaries',
          layout: {
            'text-field': ['get', 'name'],
            'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
            'text-size': 12,
            'text-offset': [0, 2],
            'text-anchor': 'top',
          },
          paint: {
            'text-color': '#1f2937',
            'text-halo-color': '#ffffff',
            'text-halo-width': 1,
          },
        })
      }

      setMapState(prev => ({ ...prev, loaded: true }))
    }

    if (map.isStyleLoaded()) {
      handleMapLoad()
    } else {
      map.on('load', handleMapLoad)
    }

    return () => {
      map.off('load', handleMapLoad)
    }
  }, [mapLayer, states, filters.showDispensaries, dispensaries, mapState.loaded])

  // Update map styling when layer changes
  useEffect(() => {
    const map = mapRef.current
    if (!map || !mapState.loaded) return

    if (map.getLayer('states-fill')) {
      map.setPaintProperty(
        'states-fill',
        'fill-color',
        getCannabisMapStyleExpression(mapLayer, states)
      )
    }
  }, [mapLayer, states, mapState.loaded])

  // Handle state click events
  const handleStateClick = useCallback((e: mapboxgl.MapMouseEvent) => {
    const map = mapRef.current
    if (!map || !onStateClick) return

    const features = map.queryRenderedFeatures(e.point, {
      layers: ['states-fill'],
    })

    if (features.length > 0) {
      const stateCode = features[0].properties?.STUSPS
      const state = states.find(s => s.code === stateCode)
      
      if (state) {
        onStateClick(state)
        trackCannabisEvent('cannabis_map_state_click', {
          state: state.name,
          state_code: state.code,
          legal_status: state.legalStatus,
          map_layer: mapLayer,
        })
      }
    }
  }, [states, onStateClick, mapLayer])

  // Handle state hover events
  const handleStateHover = useCallback((e: mapboxgl.MapMouseEvent) => {
    const map = mapRef.current
    if (!map) return

    const features = map.queryRenderedFeatures(e.point, {
      layers: ['states-fill'],
    })

    if (features.length > 0) {
      const stateCode = features[0].properties?.STUSPS
      const state = states.find(s => s.code === stateCode)
      
      if (state && mapState.hoveredState !== stateCode) {
        // Remove previous hover state
        if (mapState.hoveredState) {
          map.removeFeatureState({ source: 'states', id: mapState.hoveredState })
        }

        // Set new hover state
        map.setFeatureState(
          { source: 'states', id: stateCode },
          { hover: true }
        )

        setMapState(prev => ({ ...prev, hoveredState: stateCode }))

        // Update cursor
        map.getCanvas().style.cursor = 'pointer'

        // Create tooltip
        const tooltip = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
          className: 'cannabis-map-tooltip',
        })
          .setLngLat(e.lngLat)
          .setHTML(`
            <div class="p-3">
              <h3 class="font-semibold text-gray-900 mb-1">${state.name}</h3>
              <div class="space-y-1 text-sm">
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">Status:</span>
                  <span class="font-medium">${getCannabisStatusInfo(state.legalStatus).label}</span>
                </div>
                ${state.complianceScore > 0 ? `
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">Compliance:</span>
                  <span class="font-medium">${state.complianceScore}%</span>
                </div>
                ` : ''}
                ${state.legalStatus !== 'recreational' ? `
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">Legalization:</span>
                  <span class="font-medium">${state.legalizationPrediction.probability}%</span>
                </div>
                ` : ''}
              </div>
            </div>
          `)
          .addTo(map)

        // Store tooltip for cleanup
        ;(map as any)._cannabisTooltip = tooltip
      }
    } else {
      // Remove hover state when not hovering over a state
      if (mapState.hoveredState) {
        map.removeFeatureState({ source: 'states', id: mapState.hoveredState })
        setMapState(prev => ({ ...prev, hoveredState: null }))
      }

      map.getCanvas().style.cursor = ''

      // Remove tooltip
      if ((map as any)._cannabisTooltip) {
        ;(map as any)._cannabisTooltip.remove()
        ;(map as any)._cannabisTooltip = null
      }
    }
  }, [states, mapState.hoveredState])

  // Handle dispensary click events
  const handleDispensaryClick = useCallback((e: mapboxgl.MapMouseEvent) => {
    const map = mapRef.current
    if (!map) return

    const features = map.queryRenderedFeatures(e.point, {
      layers: ['dispensaries'],
    })

    if (features.length > 0) {
      const dispensary = features[0].properties
      if (dispensary) {
        trackCannabisEvent('cannabis_map_dispensary_click', {
          dispensary_id: dispensary.id,
          dispensary_name: dispensary.name,
          status: dispensary.status,
          market_tier: dispensary.marketTier,
        })

        // Show dispensary popup
        new mapboxgl.Popup({ closeOnClick: true })
          .setLngLat(e.lngLat)
          .setHTML(`
            <div class="p-4">
              <h3 class="font-semibold text-gray-900 mb-2">${dispensary.name}</h3>
              <div class="space-y-2 text-sm">
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">Status:</span>
                  <span class="font-medium capitalize">${dispensary.status}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">Tier:</span>
                  <span class="font-medium capitalize">${dispensary.marketTier}</span>
                </div>
                ${dispensary.complianceScore > 0 ? `
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">Compliance:</span>
                  <span class="font-medium">${dispensary.complianceScore}%</span>
                </div>
                ` : ''}
                ${dispensary.monthlyRevenue > 0 ? `
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">Monthly Revenue:</span>
                  <span class="font-medium">$${(dispensary.monthlyRevenue / 1000).toFixed(0)}K</span>
                </div>
                ` : ''}
              </div>
            </div>
          `)
          .addTo(map)
      }
    }
  }, [])

  // Setup event listeners
  useEffect(() => {
    const map = mapRef.current
    if (!map || !mapState.loaded) return

    // Add click listeners
    map.on('click', 'states-fill', handleStateClick)
    if (filters.showDispensaries) {
      map.on('click', 'dispensaries', handleDispensaryClick)
    }

    // Add hover listeners
    map.on('mousemove', 'states-fill', handleStateHover)
    map.on('mouseleave', 'states-fill', () => {
      if (mapState.hoveredState) {
        map.removeFeatureState({ source: 'states', id: mapState.hoveredState })
        setMapState(prev => ({ ...prev, hoveredState: null }))
      }
      map.getCanvas().style.cursor = ''
      
      // Remove tooltip
      if ((map as any)._cannabisTooltip) {
        ;(map as any)._cannabisTooltip.remove()
        ;(map as any)._cannabisTooltip = null
      }
    })

    return () => {
      map.off('click', 'states-fill', handleStateClick)
      map.off('click', 'dispensaries', handleDispensaryClick)
      map.off('mousemove', 'states-fill', handleStateHover)
    }
  }, [mapState.loaded, handleStateClick, handleStateHover, handleDispensaryClick, filters.showDispensaries, mapState.hoveredState])

  // Update dispensary layer visibility
  useEffect(() => {
    const map = mapRef.current
    if (!map || !mapState.loaded) return

    const dispensaryLayers = ['dispensaries', 'dispensaries-labels']
    const visibility = filters.showDispensaries ? 'visible' : 'none'

    dispensaryLayers.forEach(layerId => {
      if (map.getLayer(layerId)) {
        map.setLayoutProperty(layerId, 'visibility', visibility)
      }
    })
  }, [filters.showDispensaries, mapState.loaded])

  // Handle loading and error states
  if (mapState.error) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-100">
        <div className="text-center">
          <div className="text-red-600 mb-2">⚠️ Map Error</div>
          <p className="text-sm text-gray-600">{mapState.error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative h-full w-full ${className}`}>
      <div ref={mapContainerRef} className="h-full w-full" />
      
      {!mapState.loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-cannabis-cream-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cannabis-green-600 mx-auto mb-4"></div>
            <p className="text-sm text-gray-600">Loading Cannabis Governance Map...</p>
          </div>
        </div>
      )}

      {/* Custom CSS for tooltip styling */}
      <style jsx global>{`
        .cannabis-map-tooltip .mapboxgl-popup-content {
          padding: 0 !important;
          border-radius: 0.5rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        .cannabis-map-tooltip .mapboxgl-popup-tip {
          border-top-color: white;
        }
      `}</style>
    </div>
  )
}

export default CannabisInteractiveMap
