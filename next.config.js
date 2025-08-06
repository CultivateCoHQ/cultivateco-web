/** @type {import('next').NextConfig} */
const nextConfig = {
  // Output configuration for Netlify static deployment
  output: 'export',
  trailingSlash: true,
  
  // Image optimization configuration
  images: {
    unoptimized: true, // Required for static export on Netlify
    domains: [
      'cultivateco.com',
      'api.mapbox.com',
      'tiles.mapbox.com',
    ],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Environment variables for cannabis compliance and map features
  env: {
    MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN,
    CULTIVATECO_API_URL: process.env.CULTIVATECO_API_URL,
    CANNABIS_COMPLIANCE_API: process.env.CANNABIS_COMPLIANCE_API,
    METRC_API_ENDPOINT: process.env.METRC_API_ENDPOINT,
    CANNABIS_ANALYTICS_KEY: process.env.CANNABIS_ANALYTICS_KEY,
  },
  
  // Performance and optimization
  poweredByHeader: false,
  compress: true,
  
  // Static generation configuration for marketing pages
  generateEtags: false,
  
  // Headers for cannabis compliance and security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), microphone=(), camera=()',
          },
        ],
      },
      {
        // Cache cannabis compliance data appropriately
        source: '/api/cannabis/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=300, stale-while-revalidate=600',
          },
        ],
      },
      {
        // Cache static assets for cannabis marketing
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  
  // Redirects for cannabis marketing and compliance pages
  async redirects() {
    return [
      {
        source: '/dispensary-software',
        destination: '/platform',
        permanent: true,
      },
      {
        source: '/cannabis-compliance',
        destination: '/compliance',
        permanent: true,
      },
      {
        source: '/metrc-integration',
        destination: '/integrations',
        permanent: true,
      },
      {
        source: '/pos-system',
        destination: '/platform',
        permanent: true,
      },
    ]
  },
  
  // Webpack configuration for cannabis map and analytics
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle for Mapbox and cannabis analytics
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }
    
    // Cannabis industry specific optimizations
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    
    return config
  },
  
  // Experimental features for cannabis marketing performance
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
  
  // Build configuration for cannabis compliance requirements
  typescript: {
    ignoreBuildErrors: false,
  },
  
  eslint: {
    ignoreDuringBuilds: false,
  },
  
  // Cannabis industry specific build optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Bundle analyzer for cannabis marketing optimization
  ...(process.env.ANALYZE === 'true' && {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      if (process.env.ANALYZE) {
        const { BundleAnalyzerPlugin } = require('@next/bundle-analyzer')({
          enabled: process.env.ANALYZE === 'true',
        })
        config.plugins.push(new BundleAnalyzerPlugin())
      }
      return config
    },
  }),
}

module.exports = nextConfig
