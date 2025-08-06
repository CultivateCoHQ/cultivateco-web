/**
 * =============================================================================
 * CultivateCo Cannabis Next.js Document Component
 * =============================================================================
 * Custom HTML document structure for cannabis platform with SEO optimization
 */

import { Html, Head, Main, NextScript } from 'next/document'
import Document, { DocumentContext, DocumentInitialProps } from 'next/document'

// Cannabis platform configuration
import { CANNABIS_CONFIG, getEnvironmentConfig } from '@/config'

// ============================================================================
// CANNABIS DOCUMENT CLASS
// ============================================================================

class CannabisDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx)
    
    // Cannabis platform server-side rendering optimization
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {/* Cannabis platform critical CSS could go here */}
        </>
      ),
    }
  }

  render() {
    const { isProduction } = getEnvironmentConfig()

    return (
      <Html lang="en" className="scroll-smooth">
        <Head>
          {/* Cannabis Platform Meta Tags */}
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          
          {/* Cannabis Platform PWA */}
          <meta name="application-name" content="CultivateCo Cannabis Platform" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="CultivateCo" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-tap-highlight" content="no" />
          
          {/* Cannabis Platform Theme Colors */}
          <meta name="theme-color" content="#16a34a" />
          <meta name="msapplication-TileColor" content="#16a34a" />
          <meta name="msapplication-navbutton-color" content="#16a34a" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          
          {/* Cannabis Platform Icons */}
          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
          <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png" />
          
          {/* Cannabis Platform Manifest */}
          <link rel="manifest" href="/manifest.json" />
          
          {/* Cannabis Platform Preload Critical Resources */}
          <link
            rel="preload"
            href="/fonts/inter-var.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/images/cannabis-hero-bg.webp"
            as="image"
            type="image/webp"
          />
          
          {/* Cannabis Platform DNS Prefetch */}
          <link rel="dns-prefetch" href="//fonts.googleapis.com" />
          <link rel="dns-prefetch" href="//fonts.gstatic.com" />
          <link rel="dns-prefetch" href="//api.cultivateco.com" />
          <link rel="dns-prefetch" href="//cdn.cultivateco.com" />
          <link rel="dns-prefetch" href="//www.google-analytics.com" />
          <link rel="dns-prefetch" href="//www.googletagmanager.com" />
          <link rel="dns-prefetch" href="//connect.facebook.net" />
          <link rel="dns-prefetch" href="//px.ads.linkedin.com" />
          <link rel="dns-prefetch" href="//widget.intercom.io" />
          <link rel="dns-prefetch" href="//static.hotjar.com" />
          
          {/* Cannabis Platform Preconnect */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link rel="preconnect" href="https://api.cultivateco.com" />
          <link rel="preconnect" href="https://cdn.cultivateco.com" />
          
          {/* Cannabis Platform Security Headers */}
          <meta httpEquiv="Content-Security-Policy" content={
            isProduction 
              ? "default-src 'self' 'unsafe-inline' 'unsafe-eval' *.cultivateco.com *.google-analytics.com *.googletagmanager.com *.facebook.net *.linkedin.com *.intercom.io *.hotjar.com; img-src 'self' data: blob: *.cultivateco.com *.google-analytics.com *.googletagmanager.com *.facebook.com *.linkedin.com *.intercom.io *.hotjar.com; font-src 'self' data: *.googleapis.com *.gstatic.com;"
              : "default-src 'self' 'unsafe-inline' 'unsafe-eval' *;"
          } />
          <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
          <meta httpEquiv="X-Frame-Options" content="SAMEORIGIN" />
          <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
          <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
          <meta httpEquiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=()" />
          
          {/* Cannabis Platform Performance */}
          <meta httpEquiv="Cache-Control" content="public, max-age=31536000, immutable" />
          <link rel="preload" as="style" href="/_next/static/css/app.css" />
          
          {/* Cannabis Platform Structured Data - Organization */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Organization',
                '@id': `${CANNABIS_CONFIG.urls.website}#organization`,
                name: CANNABIS_CONFIG.company.name,
                legalName: CANNABIS_CONFIG.company.legalName,
                url: CANNABIS_CONFIG.urls.website,
                logo: {
                  '@type': 'ImageObject',
                  url: `${CANNABIS_CONFIG.urls.website}/logo-cannabis-platform.png`,
                  width: 512,
                  height: 512,
                },
                description: CANNABIS_CONFIG.company.description,
                foundingDate: CANNABIS_CONFIG.company.founded,
                industry: CANNABIS_CONFIG.company.industry,
                numberOfEmployees: {
                  '@type': 'QuantitativeValue',
                  value: CANNABIS_CONFIG.metrics.teamMembers,
                },
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
                    contactType: 'sales',
                    telephone: CANNABIS_CONFIG.contact.phone.sales,
                    email: CANNABIS_CONFIG.contact.email.sales,
                    areaServed: ['US', 'CA'],
                    availableLanguage: ['English'],
                    hoursAvailable: {
                      '@type': 'OpeningHoursSpecification',
                      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                      opens: '08:00',
                      closes: '18:00',
                      timeZone: 'America/Denver',
                    },
                  },
                  {
                    '@type': 'ContactPoint',
                    contactType: 'customer service',
                    telephone: CANNABIS_CONFIG.contact.phone.support,
                    email: CANNABIS_CONFIG.contact.email.support,
                    areaServed: ['US', 'CA'],
                    availableLanguage: ['English'],
                    hoursAvailable: {
                      '@type': 'OpeningHoursSpecification',
                      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                      opens: '07:00',
                      closes: '19:00',
                      timeZone: 'America/Denver',
                    },
                  },
                  {
                    '@type': 'ContactPoint',
                    contactType: 'technical support',
                    telephone: CANNABIS_CONFIG.contact.phone.emergency,
                    email: CANNABIS_CONFIG.contact.email.compliance,
                    areaServed: ['US', 'CA'],
                    availableLanguage: ['English'],
                    hoursAvailable: '24/7',
                  },
                ],
                sameAs: [
                  CANNABIS_CONFIG.social.linkedin,
                  CANNABIS_CONFIG.social.twitter,
                  CANNABIS_CONFIG.social.facebook,
                  CANNABIS_CONFIG.social.instagram,
                ],
                award: [
                  'Best Cannabis Compliance Software 2023',
                  'Top Cannabis Technology Company 2023',
                  'SOC 2 Type II Certified',
                ],
              }),
            }}
          />

          {/* Cannabis Platform Structured Data - Software */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                '@id': `${CANNABIS_CONFIG.urls.website}#software`,
                name: 'CultivateCo Cannabis Compliance Platform',
                applicationCategory: 'BusinessApplication',
                applicationSubCategory: 'Cannabis Compliance Software',
                description: 'AI-powered cannabis compliance platform with METRC integration, real-time monitoring, and automated violation prevention for dispensaries and cannabis businesses.',
                operatingSystem: ['Web Browser', 'iOS', 'Android'],
                url: CANNABIS_CONFIG.urls.platform,
                downloadUrl: CANNABIS_CONFIG.urls.platform,
                screenshot: `${CANNABIS_CONFIG.urls.website}/images/cannabis-platform-screenshot.png`,
                softwareVersion: '2024.1',
                datePublished: '2016-01-01',
                dateModified: new Date().toISOString().split('T')[0],
                author: {
                  '@type': 'Organization',
                  '@id': `${CANNABIS_CONFIG.urls.website}#organization`,
                },
                publisher: {
                  '@type': 'Organization',
                  '@id': `${CANNABIS_CONFIG.urls.website}#organization`,
                },
                offers: [
                  {
                    '@type': 'Offer',
                    name: 'Cannabis Starter Plan',
                    price: CANNABIS_CONFIG.pricing.starter.price.monthly,
                    priceCurrency: 'USD',
                    priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    availability: 'https://schema.org/InStock',
                    url: `${CANNABIS_CONFIG.urls.website}/pricing`,
                  },
                  {
                    '@type': 'Offer',
                    name: 'Cannabis Professional Plan',
                    price: CANNABIS_CONFIG.pricing.professional.price.monthly,
                    priceCurrency: 'USD',
                    priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    availability: 'https://schema.org/InStock',
                    url: `${CANNABIS_CONFIG.urls.website}/pricing`,
                  },
                  {
                    '@type': 'Offer',
                    name: 'Cannabis Enterprise Plan',
                    price: CANNABIS_CONFIG.pricing.enterprise.price.monthly,
                    priceCurrency: 'USD',
                    priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    availability: 'https://schema.org/InStock',
                    url: `${CANNABIS_CONFIG.urls.website}/pricing`,
                  },
                ],
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: 4.9,
                  ratingCount: 847,
                  bestRating: 5,
                  worstRating: 1,
                },
                review: [
                  {
                    '@type': 'Review',
                    reviewRating: {
                      '@type': 'Rating',
                      ratingValue: 5,
                      bestRating: 5,
                    },
                    author: {
                      '@type': 'Person',
                      name: 'Rachel Martinez',
                    },
                    reviewBody: 'CultivateCo\'s compliance monitoring saved us from 12 potential violations in our first year. The AI-powered alerts are incredibly accurate.',
                  },
                ],
                featureList: [
                  'METRC Integration (19+ States)',
                  'AI-Powered Violation Prevention',
                  'Real-time Compliance Monitoring',
                  'Automated Regulatory Reporting',
                  'Cannabis POS System',
                  'Inventory Management',
                  'Multi-State Operations Support',
                  'Comprehensive Audit Trails',
                  'Cannabis Tax Compliance',
                  '24/7 Compliance Monitoring',
                ],
              }),
            }}
          />

          {/* Cannabis Platform Structured Data - Website */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                '@id': `${CANNABIS_CONFIG.urls.website}#website`,
                name: 'CultivateCo Cannabis Platform',
                alternateName: 'CultivateCo',
                url: CANNABIS_CONFIG.urls.website,
                description: CANNABIS_CONFIG.company.description,
                inLanguage: 'en-US',
                publisher: {
                  '@type': 'Organization',
                  '@id': `${CANNABIS_CONFIG.urls.website}#organization`,
                },
                potentialAction: [
                  {
                    '@type': 'SearchAction',
                    target: {
                      '@type': 'EntryPoint',
                      urlTemplate: `${CANNABIS_CONFIG.urls.website}/resources?search={search_term_string}`,
                    },
                    'query-input': 'required name=search_term_string',
                  },
                  {
                    '@type': 'SubscribeAction',
                    target: {
                      '@type': 'EntryPoint',
                      urlTemplate: `${CANNABIS_CONFIG.urls.website}/demo`,
                    },
                    name: 'Schedule Cannabis Demo',
                  },
                ],
              }),
            }}
          />

          {/* Cannabis Platform Breadcrumb List */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                itemListElement: [
                  {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Home',
                    item: CANNABIS_CONFIG.urls.website,
                  },
                  {
                    '@type': 'ListItem',
                    position: 2,
                    name: 'Cannabis Platform',
                    item: `${CANNABIS_CONFIG.urls.website}/platform`,
                  },
                  {
                    '@type': 'ListItem',
                    position: 3,
                    name: 'Cannabis Compliance',
                    item: `${CANNABIS_CONFIG.urls.website}/compliance`,
                  },
                  {
                    '@type': 'ListItem',
                    position: 4,
                    name: 'Cannabis Pricing',
                    item: `${CANNABIS_CONFIG.urls.website}/pricing`,
                  },
                  {
                    '@type': 'ListItem',
                    position: 5,
                    name: 'Cannabis Resources',
                    item: `${CANNABIS_CONFIG.urls.website}/resources`,
                  },
                ],
              }),
            }}
          />

          {/* Cannabis Platform FAQ Schema */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'What is CultivateCo\'s cannabis compliance platform?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'CultivateCo provides AI-powered cannabis compliance monitoring with METRC integration, real-time violation prevention, and automated regulatory reporting for dispensaries and cannabis businesses across 19+ states.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Which states does CultivateCo support?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'CultivateCo supports cannabis businesses in 19+ states with METRC integration including New Mexico, Colorado, California, Oregon, Nevada, Michigan, and more. We continuously add new state integrations.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'How much does CultivateCo cannabis software cost?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'CultivateCo pricing starts at $299/month for the Cannabis Starter plan, $599/month for Cannabis Professional, and $1,299/month for Cannabis Enterprise. All plans include METRC integration and compliance monitoring.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Does CultivateCo offer a free trial?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Yes, CultivateCo offers a 30-day free trial with full access to all cannabis compliance features. No credit card required to start your trial.',
                    },
                  },
                ],
              }),
            }}
          />

          {/* Cannabis Platform Critical CSS */}
          <style
            dangerouslySetInnerHTML={{
              __html: `
                /* Cannabis Platform Critical CSS */
                *,::before,::after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}
                html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"}
                body{margin:0;line-height:inherit;background-color:#ffffff;color:#111827}
                .cannabis-gradient{background:linear-gradient(135deg,#16a34a 0%,#15803d 100%)}
                .cannabis-green{color:#16a34a}
                .cannabis-blue{color:#2563eb}
                .cannabis-cream{background-color:#fefce8}
                .shadow-cannabis{box-shadow:0 10px 25px -3px rgba(22,163,74,0.1),0 4px 6px -2px rgba(22,163,74,0.05)}
                .loading-spinner{animation:spin 1s linear infinite}
                @keyframes spin{to{transform:rotate(360deg)}}
                @media(prefers-reduced-motion:reduce){*,::before,::after{animation-duration:0.01ms!important;animation-iteration-count:1!important;transition-duration:0.01ms!important}}
              `,
            }}
          />
        </Head>
        
        <body className="min-h-screen bg-white antialiased">
          {/* Cannabis Platform Loading Screen */}
          <div id="cannabis-loading-screen" className="fixed inset-0 bg-white z-50 flex items-center justify-center">
            <div className="text-center">
              <div className="loading-spinner w-8 h-8 border-4 border-cannabis-green-200 border-t-cannabis-green-600 rounded-full mx-auto mb-4"></div>
              <div className="text-cannabis-green-600 font-semibold">Loading Cannabis Platform...</div>
            </div>
          </div>

          <Main />
          <NextScript />

          {/* Cannabis Platform Loading Script */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                document.addEventListener('DOMContentLoaded', function() {
                  const loadingScreen = document.getElementById('cannabis-loading-screen');
                  if (loadingScreen) {
                    setTimeout(function() {
                      loadingScreen.style.opacity = '0';
                      loadingScreen.style.transition = 'opacity 0.3s ease-out';
                      setTimeout(function() {
                        loadingScreen.style.display = 'none';
                      }, 300);
                    }, 100);
                  }
                });
              `,
            }}
          />

          {/* Cannabis Platform Performance Monitoring */}
          {isProduction && (
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  if ('serviceWorker' in navigator) {
                    window.addEventListener('load', function() {
                      navigator.serviceWorker.register('/sw.js').then(function(registration) {
                        console.log('Cannabis Platform SW registered: ', registration);
                      }, function(registrationError) {
                        console.log('Cannabis Platform SW registration failed: ', registrationError);
                      });
                    });
                  }
                `,
              }}
            />
          )}
        </body>
      </Html>
    )
  }
}

export default CannabisDocument
