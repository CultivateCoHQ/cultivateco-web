/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  
  // Enable SWC minification for better performance
  swcMinify: true,
  
  // Static export configuration for Netlify deployment
  output: 'export',
  trailingSlash: true,
  
  // Experimental features for cannabis application needs
  experimental: {
    // Enable server actions for cannabis form handling (disabled for static export)
    // serverActions: true,
    // Optimize for cannabis business dashboard performance
    optimizePackageImports: ['lucide-react', 'recharts', 'framer-motion'],
  },

  // Image optimization for cannabis product images and marketing
  images: {
    // Unoptimized images required for static export
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.cultivateco.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.cultivateco.com', 
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/**',
      },
      // Add additional domains for cannabis compliance documentation
      {
        protocol: 'https',
        hostname: 'metrc-cdn.com',
        pathname: '/**',
      }
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Security headers for cannabis business data protection
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
            value: 'camera=(), microphone=(), geolocation=(self)',
          },
          // Cannabis business specific headers
          {
            key: 'X-Cannabis-Platform',
            value: 'CultivateCo-Business-Management',
          },
          {
            key: 'X-Cannabis-Compliance',
            value: 'metrc-integrated',
          },
        ],
      },
      // Additional security for SaaS portal routes
      {
        source: '/app/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate',
          },
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
          // Cannabis business privacy headers
          {
            key: 'X-Cannabis-Private',
            value: 'business-data-protected',
          },
        ],
      },
      // Static asset caching for performance
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },

  // Redirects for cannabis business domain management
  async redirects() {
    return [
      // Redirect old URLs to new structure
      {
        source: '/dashboard/:path*',
        destination: '/app/dashboard/:path*',
        permanent: true,
      },
      {
        source: '/login',
        destination: '/auth/signin',
        permanent: true,
      },
      {
        source: '/signup',
        destination: '/auth/signup',
        permanent: true,
      },
      // Cannabis compliance redirects
      {
        source: '/compliance',
        destination: '/app/compliance',
        permanent: true,
      },
      {
        source: '/inventory',
        destination: '/app/inventory',
        permanent: true,
      },
      {
        source: '/customers',
        destination: '/app/customers',
        permanent: true,
      },
      {
        source: '/orders',
        destination: '/app/orders',
        permanent: true,
      },
      {
        source: '/staff',
        destination: '/app/staff',
        permanent: true,
      },
      {
        source: '/vendors',
        destination: '/app/vendors',
        permanent: true,
      },
      {
        source: '/products',
        destination: '/app/products',
        permanent: true,
      },
      {
        source: '/reports',
        destination: '/app/reports',
        permanent: true,
      },
      {
        source: '/settings',
        destination: '/app/settings',
        permanent: true,
      },
      // Age verification redirect
      {
        source: '/verify-age',
        destination: '/auth/age-verification',
        permanent: false,
      },
    ]
  },

  // Environment variables for cannabis application
  env: {
    CANNABIS_API_URL: process.env.CANNABIS_API_URL,
    METRC_API_URL: process.env.METRC_API_URL,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    CANNABIS_API_VERSION: 'v1',
    METRC_INTEGRATION: 'enabled',
    COMPLIANCE_MONITORING: 'active',
  },

  // Webpack configuration for cannabis business features
  webpack: (config, { dev, isServer }) => {
    // Optimize for cannabis dashboard performance
    if (!dev && !isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': require('path').resolve(__dirname, './src'),
      }
    }

    // Cannabis-specific webpack optimizations
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    }

    // Optimize bundle size for cannabis business modules
    config.optimization = {
      ...config.optimization,
      usedExports: true,
      sideEffects: false,
    }

    return config
  },

  // TypeScript configuration
  typescript: {
    // Enable type checking during build for cannabis compliance
    ignoreBuildErrors: false,
  },

  // ESLint configuration
  eslint: {
    // Run ESLint on build for cannabis code quality
    ignoreDuringBuilds: false,
  },

  // Compiler options for better performance
  compiler: {
    // Remove console logs in production for cannabis business security
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // Page extensions for cannabis business components
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],

  // PoweredByHeader disabled for cannabis business branding
  poweredByHeader: false,

  // Generate buildId for cannabis application versioning
  generateBuildId: async () => {
    return `cultivateco-${new Date().getTime()}`
  },
}

module.exports = nextConfig
