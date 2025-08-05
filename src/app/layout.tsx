import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/providers/auth-provider'
import { QueryProvider } from '@/providers/query-provider'
import { ThemeProvider } from '@/providers/theme-provider'
import '@/styles/globals.css'

// CultivateCo professional fonts
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

// CultivateCo website metadata
export const metadata: Metadata = {
  title: {
    template: '%s | CultivateCo - Cannabis Compliance Platform',
    default: 'CultivateCo - Cannabis Compliance Platform for Dispensaries',
  },
  description: 'Professional cannabis compliance software for dispensaries. Real-time METRC integration, compliance monitoring, and business intelligence for cannabis retail operations.',
  keywords: [
    'cannabis compliance',
    'dispensary software',
    'METRC integration',
    'cannabis POS',
    'marijuana compliance',
    'cannabis business intelligence',
    'dispensary management',
    'cannabis analytics',
    'New Mexico cannabis',
    'cannabis regulatory compliance'
  ],
  authors: [{ name: 'CultivateCo' }],
  creator: 'CultivateCo',
  publisher: 'CultivateCo',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cultivateco.com',
    siteName: 'CultivateCo',
    title: 'CultivateCo - Cannabis Compliance Platform for Dispensaries',
    description: 'Professional cannabis compliance software for dispensaries. Real-time METRC integration, compliance monitoring, and business intelligence.',
    images: [
      {
        url: 'https://cultivateco.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CultivateCo Cannabis Compliance Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CultivateCo - Cannabis Compliance Platform',
    description: 'Professional cannabis compliance software for dispensaries with real-time METRC integration.',
    images: ['https://cultivateco.com/twitter-image.png'],
    creator: '@cultivateco',
  },
  verification: {
    google: 'your-google-verification-code',
  },
  category: 'Cannabis Technology',
  classification: 'Cannabis Compliance Software',
  other: {
    'cannabis-industry': 'Cannabis Technology Platform',
    'target-audience': 'Cannabis Dispensaries and Retailers',
  },
}

// CultivateCo viewport configuration
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fbfaf7' },
    { media: '(prefers-color-scheme: dark)', color: '#154438' },
  ],
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html 
      lang="en" 
      className={cn('scroll-smooth', inter.variable)}
      suppressHydrationWarning
    >
      <head>
        {/* CultivateCo brand favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Cannabis industry specific meta tags */}
        <meta name="cannabis-compliance" content="METRC-integrated" />
        <meta name="industry" content="Cannabis Technology" />
        <meta name="business-type" content="Cannabis Software Platform" />
        
        {/* Preconnect to cannabis API domains for performance */}
        <link rel="preconnect" href="https://api.cultivateco.com" />
        <link rel="preconnect" href="https://metrc.com" />
        <link rel="dns-prefetch" href="https://api.cultivateco.com" />
        
        {/* Cannabis business structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'CultivateCo Cannabis Compliance Platform',
              description: 'Professional cannabis compliance software for dispensaries with real-time METRC integration and business intelligence.',
              applicationCategory: 'Business Software',
              operatingSystem: 'Web Browser',
              offers: {
                '@type': 'Offer',
                category: 'Cannabis Technology',
                businessFunction: 'Cannabis Compliance Management',
              },
              publisher: {
                '@type': 'Organization',
                name: 'CultivateCo',
                url: 'https://cultivateco.com',
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                reviewCount: '127',
              },
            }),
          }}
        />
      </head>
      <body 
        className={cn(
          'min-h-screen bg-cultivateco-cream font-sans antialiased',
          'selection:bg-cultivateco-green/20 selection:text-cultivateco-green'
        )}
      >
        {/* Cannabis application providers */}
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <AuthProvider>
              {/* Main cannabis application content */}
              <div className="relative flex min-h-screen flex-col bg-cultivateco-cream">
                <div className="flex-1">
                  {children}
                </div>
              </div>
              
              {/* Cannabis business toast notifications */}
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: '#fbfaf7', // CultivateCo cream
                    color: '#154438', // CultivateCo green
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(21, 68, 56, 0.1)',
                  },
                  success: {
                    iconTheme: {
                      primary: '#154438', // CultivateCo green
                      secondary: '#fbfaf7', // CultivateCo cream
                    },
                  },
                  error: {
                    iconTheme: {
                      primary: '#ef4444',
                      secondary: '#fbfaf7',
                    },
                  },
                  loading: {
                    iconTheme: {
                      primary: '#0b447a', // CultivateCo blue
                      secondary: '#fbfaf7', // CultivateCo cream
                    },
                  },
                }}
              />
            </AuthProvider>
          </QueryProvider>
        </ThemeProvider>

        {/* Cannabis business analytics and tracking */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Cannabis business performance tracking
              if (typeof window !== 'undefined') {
                window.cultivatecoConfig = {
                  apiUrl: '${process.env.NEXT_PUBLIC_API_URL || 'https://api.cultivateco.com'}',
                  environment: '${process.env.NODE_ENV}',
                  version: '1.0.0',
                  features: {
                    metrcIntegration: true,
                    complianceMonitoring: true,
                    businessIntelligence: true,
                    realTimeUpdates: true,
                  }
                };
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
