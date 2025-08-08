import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { CheckCircle, Shield, Activity, BarChart3, FileText, ArrowRight, Star, Users, Zap, Lock } from 'lucide-react'
import CannabisLayout from '../components/layout/CannabisLayout'

const HomePage: NextPage = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  return (
    <CannabisLayout>
      <Head>
        <title>CultivateCo - Pharmaceutical-Grade Cannabis Compliance Platform</title>
        <meta name="description" content="Enterprise cannabis compliance platform with SOC 2 Type II certification and 99.99% uptime SLA. Built for multi-state operators who demand pharmaceutical-grade standards." />
        <meta property="og:title" content="CultivateCo - Pharmaceutical-Grade Cannabis Compliance" />
        <meta property="og:description" content="The only cannabis platform built to pharmaceutical standards. SOC 2 certified with enterprise-grade security and guaranteed 99.99% uptime." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-teal-700/90 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {/* Enterprise Badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <Shield className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">SOC 2 Type II Certified</span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <Activity className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">99.99% Uptime SLA</span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <Lock className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">Enterprise Grade</span>
                </div>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Pharmaceutical-Grade
                <span className="block text-cyan-200">Cannabis Compliance</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-white/90 leading-relaxed">
                The only cannabis platform built to pharmaceutical standards. Enterprise operations powered by SOC 2 Type II security and guaranteed 99.99% uptime SLA.
              </p>

              <div className="flex items-center space-x-6 text-white/80">
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  <span>Trusted by 50+ Multi-State Operators</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/demo" className="inline-flex items-center justify-center px-8 py-4 bg-white text-teal-700 font-semibold rounded-lg hover:bg-white/90 transition-colors">
                  Schedule Enterprise Demo
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link href="/platform" className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
                  View Platform Features
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
                <img 
                  src="/cannabis-enterprise-dashboard.jpg" 
                  alt="CultivateCo Enterprise Cannabis Compliance Dashboard" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/50 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Value Propositions */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Enterprise Cannabis Operations Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything multi-state operators need to maintain pharmaceutical-grade compliance while scaling operations across jurisdictions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Enterprise Security</h3>
              <p className="text-gray-600 mb-4">
                SOC 2 Type II certified security with pharmaceutical-grade access controls and complete audit trails.
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-teal-500" />
                  End-to-end encryption
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-teal-500" />
                  Role-based access control
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-teal-500" />
                  Complete audit logging
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-6">
                <Activity className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Guaranteed Reliability</h3>
              <p className="text-gray-600 mb-4">
                99.99% uptime SLA with financial penalties. Never lose sales to system failures again.
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-teal-500" />
                  4 minutes downtime/month max
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-teal-500" />
                  Automatic failover systems
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-teal-500" />
                  24/7 infrastructure monitoring
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Institutional-Grade Analytics</h3>
              <p className="text-gray-600 mb-4">
                Advanced business intelligence with complete batch genealogy and regulatory reporting.
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-teal-500" />
                  Multi-state consolidated reporting
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-teal-500" />
                  Predictive compliance alerts
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-teal-500" />
                  Real-time performance metrics
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-6">
                <FileText className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Banking-Ready Operations</h3>
              <p className="text-gray-600 mb-4">
                BSA/AML monitoring and suspicious activity detection for financial institution partnerships.
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-teal-500" />
                  Real-time transaction monitoring
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-teal-500" />
                  Automated compliance reporting
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-teal-500" />
                  Institutional audit trails
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Enterprise Cannabis Operators
            </h2>
            <p className="text-xl text-gray-600">
              See how CultivateCo is helping multi-state operators maintain pharmaceutical-grade compliance while scaling operations.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-gray-700 mb-6">
                "CultivateCo's pharmaceutical-grade approach transformed our multi-state compliance process. We went from constant regulatory stress to complete confidence in our operations across 12 states."
              </blockquote>
              <div className="flex items-center">
                <img src="/testimonials/sarah-martinez.jpg" alt="Sarah Martinez" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <div className="font-semibold text-gray-900">Sarah Martinez</div>
                  <div className="text-gray-600">Chief Compliance Officer, Verde Holdings</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-gray-700 mb-6">
                "The SOC 2 certification was crucial for our institutional investors. CultivateCo's enterprise-grade security gave them the confidence to complete our $50M Series B."
              </blockquote>
              <div className="flex items-center">
                <img src="/testimonials/mike-chen.jpg" alt="Mike Chen" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <div className="font-semibold text-gray-900">Mike Chen</div>
                  <div className="text-gray-600">CEO, Pacific Cannabis Group</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-gray-700 mb-6">
                "99.99% uptime SLA means we never lose revenue to system failures. The guaranteed reliability is worth every penny for our 24/7 operations."
              </blockquote>
              <div className="flex items-center">
                <img src="/testimonials/lisa-thompson.jpg" alt="Lisa Thompson" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <div className="font-semibold text-gray-900">Lisa Thompson</div>
                  <div className="text-gray-600">COO, Rocky Mountain Cannabis</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Integrations */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Enterprise-Grade Cannabis Integrations
            </h2>
            <p className="text-xl text-gray-600">
              Connect with the enterprise tools and services your multi-state operation demands.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="h-16 w-16 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                <svg className="h-8 w-8 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-900 text-center">METRC</span>
              <span className="text-xs text-gray-500 text-center">State Tracking</span>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="h-16 w-16 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <svg className="h-8 w-8 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-900 text-center">QuickBooks</span>
              <span className="text-xs text-gray-500 text-center">Enterprise Accounting</span>
            </div>

            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="h-16 w-16 bg-yellow-100 rounded-lg flex items-center justify-center mb-3">
                <svg className="h-8 w-8 text-yellow-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10,9 9,9 8,9"/>
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-900 text-center">DocuSign</span>
              <span className="text-xs text-gray-500 text-center">Digital Signatures</span>
            </div>

            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="h-16 w-16 bg-cyan-100 rounded-lg flex items-center justify-center mb-3">
                <svg className="h-8 w-8 text-cyan-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-900 text-center">Salesforce</span>
              <span className="text-xs text-gray-500 text-center">Enterprise CRM</span>
            </div>

            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="h-16 w-16 bg-indigo-100 rounded-lg flex items-center justify-center mb-3">
                <svg className="h-8 w-8 text-indigo-600" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="3" y="3" width="7" height="7"/>
                  <rect x="14" y="3" width="7" height="7"/>
                  <rect x="14" y="14" width="7" height="7"/>
                  <rect x="3" y="14" width="7" height="7"/>
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-900 text-center">Microsoft 365</span>
              <span className="text-xs text-gray-500 text-center">Enterprise Collaboration</span>
            </div>

            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="h-16 w-16 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
                <svg className="h-8 w-8 text-orange-600" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="10"/>
                  <polygon points="10,8 16,12 10,16"/>
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-900 text-center">AWS GovCloud</span>
              <span className="text-xs text-gray-500 text-center">Enterprise Hosting</span>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">Looking for a specific integration?</p>
            <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors">
              Request Custom Integration
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Enterprise CTA Section */}
      <section className="py-20 bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Cannabis Enterprise?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join the multi-state operators who trust CultivateCo for pharmaceutical-grade compliance, enterprise security, and guaranteed reliability.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo" className="inline-flex items-center justify-center px-8 py-4 bg-white text-teal-700 font-semibold rounded-lg hover:bg-white/90 transition-colors">
              Schedule Enterprise Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link href="/pricing" className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
              View Enterprise Pricing
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-cyan-200">99.99%</div>
              <div className="text-white/80">Guaranteed Uptime</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyan-200">50+</div>
              <div className="text-white/80">Multi-State Operators</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyan-200">SOC 2</div>
              <div className="text-white/80">Type II Certified</div>
            </div>
          </div>
        </div>
      </section>
    </CannabisLayout>
  )
}

export default HomePage
