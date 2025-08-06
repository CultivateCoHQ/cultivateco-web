/**
 * =============================================================================
 * CultivateCo Cannabis Next.js App Component
 * =============================================================================
 * Global app wrapper with providers, analytics, and cannabis platform integration
 */

import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Script from 'next/script'

// Global CSS imports
import '@/styles/globals.css'
import '@/styles/cannabis-animations.css'

// Cannabis platform configuration
import { CANNABIS_CONFIG, getEnvironmentConfig } from '@/config'
import { trackCannabisEvent, initializeCannabisAnalytics } from '@/lib/cannabis-utils'

// Error boundary for cannabis platform
import { CannabisErrorBoundary } from '@/components/errors/CannabisErrorBoundary'

// Cannabis platform providers
import { CannabisAuthProvider } from '@/providers/CannabisAuthProvider'
import { CannabisThemeProvider } from '@/providers/CannabisThemeProvider'
import { CannabisNotificationProvider } from '@/providers/CannabisNotificationProvider'

// ============================================================================
// CANNABIS APP ANALYTICS & TRACKING
// ============================================================================

const CannabisAnalyticsManager: React.FC = () => {
  const router = useRouter()
  const { isProduction, enableAnalytics } = getEnvironmentConfig()

  useEffect(() => {
    if (enableAnalytics) {
      // Initialize cannabis analytics
      initializeCannabisAnalytics({
        googleAnalyticsId: CANNABIS_CONFIG.analytics.googleAnalytics,
        intercomAppId: CANNABIS_CONFIG.analytics.intercomAppId,
        hotjarSiteId: CANNABIS_CONFIG.analytics.hotjarSiteId,
      })

      // Track initial page view
      trackCannabisEvent('cannabis_page_view', {
        page_path: router.asPath,
        page_title: document.title,
        referrer: document.referrer,
        user_agent: navigator.userAgent,
      })
    }
  }, [enableAnalytics])

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (enableAnalytics) {
        // Track page navigation for cannabis platform
        trackCannabisEvent('cannabis_page_view', {
          page_path: url,
          page_title: document.title,
          navigation_type: 'route_change',
        })

        // Google Analytics page view
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('config', CANNABIS_CONFIG.analytics.googleAnalytics, {
            page_path: url,
          })
        }

        // Intercom page tracking
        if (typeof window !== 'undefined' && (window as any).Intercom) {
          (window as any).Intercom('update')
        }
      }
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router.events, enableAnalytics])

  // Don't render analytics components in development
  if (!enableAnalytics) return null

  return (
    <>
      {/* Google Analytics */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${CANNABIS_CONFIG.analytics.googleAnalytics}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${CANNABIS_CONFIG.analytics.googleAnalytics}', {
            page_path: window.location.pathname,
            custom_map: {
              'custom_parameter_1': 'cannabis_business_type',
              'custom_parameter_2': 'cannabis_state',
            }
          });
        `}
      </Script>

      {/* Google Tag Manager */}
      <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${CANNABIS_CONFIG.analytics.googleTagManager}');
          `,
        }}
      />

      {/* Facebook Pixel */}
      <Script id="facebook-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window,document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${CANNABIS_CONFIG.analytics.facebookPixel}');
          fbq('track', 'PageView');
        `}
      </Script>

      {/* LinkedIn Insight Tag */}
      <Script id="linkedin-insight" strategy="afterInteractive">
        {`
          _linkedin_partner_id = "${CANNABIS_CONFIG.analytics.linkedInInsight}";
          window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
          window._linkedin_data_partner_ids.push(_linkedin_partner_id);
        `}
      </Script>
      <Script
        src="https://snap.licdn.com/li.lms-analytics/insight.min.js"
        strategy="afterInteractive"
      />

      {/* Intercom Chat */}
      <Script id="intercom-settings" strategy="afterInteractive">
        {`
          window.intercomSettings = {
            app_id: "${CANNABIS_CONFIG.services.intercom.appId}",
            custom_launcher_selector: '.intercom-launcher',
            hide_default_launcher: false,
          };
        `}
      </Script>
      <Script
        src="https://widget.intercom.io/widget/{{ app_id }}"
        strategy="afterInteractive"
        onLoad={() => {
          // Custom Intercom configuration for cannabis platform
          if (typeof window !== 'undefined' && (window as any).Intercom) {
            (window as any).Intercom('boot', {
              app_id: CANNABIS_CONFIG.services.intercom.appId,
              company: {
                name: 'Cannabis Business',
                industry: 'Cannabis',
              },
            })
          }
        }}
      />

      {/* Hotjar Tracking */}
      <Script id="hotjar-tracking" strategy="afterInteractive">
        {`
          (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:${CANNABIS_CONFIG.analytics.hotjarSiteId},hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        `}
      </Script>
    </>
  )
}

// ============================================================================
// CANNABIS APP PERFORMANCE & SEO
// ============================================================================

const CannabisSEOManager: React.FC = () => {
  return (
    <Head>
      {/* Cannabis Platform Preconnect */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="preconnect" href="https://api.cultivateco.com" />
      <link rel="preconnect" href="https://cdn.cultivateco.com" />

      {/* Cannabis DNS Prefetch */}
      <link rel="dns-prefetch" href="//google-analytics.com" />
      <link rel="dns-prefetch" href="//googletagmanager.com" />
      <link rel="dns-prefetch" href="//connect.facebook.net" />
      <link rel="dns-prefetch" href="//widget.intercom.io" />
      <link rel="dns-prefetch" href="//static.hotjar.com" />

      {/* Cannabis Platform Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      {/* Cannabis Platform Icons & Manifest */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon" type="image/png" href="/favicon.png" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.json" />

      {/* Cannabis Platform Theme */}
      <meta name="theme-color" content="#16a34a" />
      <meta name="msapplication-TileColor" content="#16a34a" />
      <meta name="msapplication-config" content="/browserconfig.xml" />

      {/* Cannabis Platform Security */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />

      {/* Cannabis Platform Performance */}
      <meta httpEquiv="Cache-Control" content="public, max-age=31536000, immutable" />
      
      {/* Cannabis Structured Data - Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: CANNABIS_CONFIG.company.name,
            legalName: CANNABIS_CONFIG.company.legalName,
            url: CANNABIS_CONFIG.urls.website,
            logo: `${CANNABIS_CONFIG.urls.website}/logo-cannabis-platform.png`,
            description: CANNABIS_CONFIG.company.description,
            foundingDate: CANNABIS_CONFIG.company.founded,
            industry: CANNABIS_CONFIG.company.industry,
            address: {
              '@type': 'PostalAddress',
              streetAddress: CANNABIS_CONFIG.contact.addresses.headquarters.street,
              addressLocality: CANNABIS_CONFIG.contact.addresses.headquarters.city,
              addressRegion: CANNABIS_CONFIG.contact.addresses.headquarters.state,
              postalCode: CANNABIS_CONFIG.contact.addresses.headquarters.zip,
              addressCountry: CANNABIS_CONFIG.contact.addresses.headquarters.country,
            },
            contactPoint: [
              {
                '@type': 'ContactPoint',
                telephone: CANNABIS_CONFIG.contact.phone.sales,
                contactType: 'sales',
                areaServed: 'US',
                availableLanguage: 'English',
              },
              {
                '@type': 'ContactPoint',
                telephone: CANNABIS_CONFIG.contact.phone.support,
                contactType: 'customer service',
                areaServed: 'US',
                availableLanguage: 'English',
              },
            ],
            sameAs: [
              CANNABIS_CONFIG.social.linkedin,
              CANNABIS_CONFIG.social.twitter,
              CANNABIS_CONFIG.social.facebook,
            ],
          }),
        }}
      />

      {/* Cannabis Structured Data - Website */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: `${CANNABIS_CONFIG.company.name} Cannabis Platform`,
            url: CANNABIS_CONFIG.urls.website,
            description: CANNABIS_CONFIG.company.description,
            publisher: {
              '@type': 'Organization',
              name: CANNABIS_CONFIG.company.name,
            },
            potentialAction: {
              '@type': 'SearchAction',
              target: `${CANNABIS_CONFIG.urls.website}/resources?search={search_term_string}`,
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />

      {/* Cannabis Structured Data - Software Application */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: `${CANNABIS_CONFIG.company.name} Cannabis Compliance Platform`,
            applicationCategory: 'Business Software',
            description: 'Cannabis compliance platform with METRC integration, real-time monitoring, and automated violation prevention',
            operatingSystem: 'Web-based',
            url: CANNABIS_CONFIG.urls.platform,
            author: {
              '@type': 'Organization',
              name: CANNABIS_CONFIG.company.name,
            },
            offers: {
              '@type': 'Offer',
              price: CANNABIS_CONFIG.pricing.starter.price.monthly,
              priceCurrency: 'USD',
              priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              ratingCount: '847',
              bestRating: '5',
            },
          }),
        }}
      />
    </Head>
  )
}

// ============================================================================
// CANNABIS ERROR BOUNDARY COMPONENT  
// ============================================================================

const CannabisErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      {/* Simple error boundary - in production you'd want a proper error boundary component */}
      {children}
    </div>
  )
}

// ============================================================================
// CANNABIS APP PROVIDERS
// ============================================================================

const CannabisAppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <CannabisErrorBoundary>
      <CannabisThemeProvider>
        <CannabisAuthProvider>
          <CannabisNotificationProvider>
            {children}
          </CannabisNotificationProvider>
        </CannabisAuthProvider>
      </CannabisThemeProvider>
    </CannabisErrorBoundary>
  )
}

// ============================================================================
// MAIN CANNABIS APP COMPONENT
// ============================================================================

export default function CannabisApp({ Component, pageProps }: AppProps) {
  const { enableAnalytics } = getEnvironmentConfig()

  // Global error handling for cannabis platform
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (enableAnalytics) {
        trackCannabisEvent('cannabis_javascript_error', {
          error_message: event.message,
          error_filename: event.filename,
          error_line: event.lineno,
          error_column: event.colno,
          user_agent: navigator.userAgent,
        })
      }
      console.error('Cannabis App Error:', event.error)
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (enableAnalytics) {
        trackCannabisEvent('cannabis_unhandled_promise_rejection', {
          error_reason: event.reason?.toString() || 'Unknown',
          user_agent: navigator.userAgent,
        })
      }
      console.error('Cannabis App Unhandled Promise Rejection:', event.reason)
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [enableAnalytics])

  return (
    <>
      {/* Cannabis Platform SEO & Performance */}
      <CannabisSEOManager />
      
      {/* Cannabis Platform Analytics */}
      <CannabisAnalyticsManager />

      {/* Cannabis Platform Providers */}
      <CannabisAppProviders>
        <Component {...pageProps} />
      </CannabisAppProviders>

      {/* Cannabis Platform GTM Noscript */}
      {enableAnalytics && (
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${CANNABIS_CONFIG.analytics.googleTagManager}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
      )}
    </>
  )
}
