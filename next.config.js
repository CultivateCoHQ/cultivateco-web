/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  
  // Enable SWC minification for better performance
  swcMinify: true,
  
  // Static export configuration for Netlify deployment
  output: 'export',
  trailingSlash: true,
  
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
      }
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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
    // Cannabis-specific webpack optimizations
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
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

  // PoweredByHeader disabled for cannabis business branding
  poweredByHeader: false,

  // Generate buildId for cannabis application versioning
  generateBuildId: async () => {
    return `cultivateco-${new Date().getTime()}`
  },
}

module.exports = nextConfig
