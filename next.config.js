/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  
  // Enable SWC minification for better performance
  swcMinify: true,
  
  // Experimental features for cannabis application needs
  experimental: {
    // Enable server actions for cannabis form handling
    serverActions: true,
    // Optimize for cannabis business dashboard performance
    optimizePackageImports: ['lucide-react', 'recharts', 'framer-motion'],
  },

  // Image optimization for cannabis product images and marketing
  images: {
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
        destination: '/app/login',
        permanent: true,
      },
      {
        source: '/signup',
        destination: '/app/signup',
        permanent: true,
      },
    ]
  },

  // Environment variables for cannabis application
  env: {
    CANNABIS_API_URL: process.env.CANNABIS_API_URL,
    METRC_API_URL: process.env.METRC_API_URL,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
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
    return config
  },

  // Output configuration for deployment
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,

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
}

module.exports = nextConfig
