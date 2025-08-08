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
      <section className="relative bg-gradient-to-br from-[#154438] via-[#0b447a] to-[#154438] text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#154438]/90 to-transparent"></div>
        
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
                <span className="block text-[#0b447a]">Cannabis Compliance</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-[#fbfaf7]/90 leading-relaxed">
                The only cannabis platform built to pharmaceutical standards. Enterprise operations powered by SOC 2 Type II security and guaranteed 99.99% uptime SLA.
              </p>

              <div className="flex items-center space-x-6 text-[#fbfaf7]/80">
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  <span>Trusted by 50+ Multi-State Operators</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/demo" className="inline-flex items-center justify-center px-8 py-4 bg-[#fbfaf7] text-[#154438] font-semibold rounded-lg hover:bg-[#fbfaf7]/90 transition-colors">
                  Schedule Enterprise Demo
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link href="/platform" className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#fbfaf7] text-[#fbfaf7] font-semibold rounded-lg hover:bg-white/10 transition-colors">
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
      <section className="py-20 bg-[#fbfaf7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#154438] mb-4">
              Enterprise Cannabis Operations Platform
            </h2>
            <p className="text-xl text-[#0b447a] max-w-3xl mx-auto">
              Everything multi-state operators need to maintain pharmaceutical-grade compliance while scaling operations across jurisdictions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-[#154438]/10 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-[#154438]" />
              </div>
              <h3 className="text-xl font-semibold text-[#154438] mb-4">Enterprise Security</h3>
              <p className="text-[#0b447a] mb-4">
                SOC 2 Type II certified security with pharmaceutical-grade access controls and complete audit trails.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-[#154438]" />
                  End-to-end encryption
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-[#154438]" />
                  Role-based access control
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-[#154438]" />
                  Complete audit logging
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-[#0b447a]/10 rounded-lg flex items-center justify-center mb-6">
                <Activity className="w-6 h-6 text-[#0b447a]" />
              </div>
              <h3 className="text-xl font-semibold text-[#154438] mb-4">Guaranteed Reliability</h3>
              <p className="text-[#0b447a] mb-4">
                99.99% uptime SLA with financial penalties. Never lose sales to system failures again.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-[#154438]" />
                  4 minutes downtime/month max
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-[#154438]" />
                  Automatic failover systems
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-[#154438]" />
                  24/7 infrastructure monitoring
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-[#154438]/10 rounded-lg flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-[#154438]" />
              </div>
              <h3 className="text-xl font-semibold text-[#154438] mb-4">Institutional-Grade Analytics</h3>
              <p className="text-[#0b447a] mb-4">
                Advanced business intelligence with complete batch genealogy and regulatory reporting.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-[#154438]" />
                  Multi-state consolidated reporting
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-[#154438]" />
                  Predictive compliance alerts
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-[#154438]" />
                  Real-time performance metrics
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-[#0b447a]/10 rounded-lg flex items-center justify-center mb-6">
                <FileText className="w-6 h-6 text-[#0b447a]" />
              </div>
              <h3 className="text-xl font-semibold text-[#154438] mb-4">Banking-Ready Operations</h3>
              <p className="text-[#0b447a] mb-4">
                BSA/AML monitoring and suspicious activity detection for financial institution partnerships.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-[#154438]" />
                  Real-time transaction monitoring
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-[#154438]" />
                  Automated compliance reporting
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-[#154438]" />
                  Institutional audit trails
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#154438] mb-4">
              Trusted by Enterprise Cannabis Operators
            </h2>
            <p className="text-xl text-[#0b447a]">
              See how CultivateCo is helping multi-state operators maintain pharmaceutical-grade compliance while scaling operations.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-[#fbfaf7] p-8 rounded-xl border border-gray-200">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-[#0b447a] mb-6">
                "CultivateCo's pharmaceutical-grade approach transformed our multi-state compliance process. We went from constant regulatory stress to complete confidence in our operations across 12 states."
              </blockquote>
              <div className="flex items-center">
                <img src="/testimonials/sarah-martinez.jpg" alt="Sarah Martinez" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <div className="font-semibold text-[#154438]">Sarah Martinez</div>
                  <div className="text-gray-600">Chief Compliance Officer, Verde Holdings</div>
                </div>
              </div>
            </div>

            <div className="bg-[#fbfaf7] p-8 rounded-xl border border-gray-200">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-[#0b447a] mb-6">
                "The SOC 2 certification was crucial for our institutional investors. CultivateCo's enterprise-grade security gave them the confidence to complete our $50M Series B."
              </blockquote>
              <div className="flex items-center">
                <img src="/testimonials/mike-chen.jpg" alt="Mike Chen" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <div className="font-semibold text-[#154438]">Mike Chen</div>
                  <div className="text-gray-600">CEO, Pacific Cannabis Group</div>
                </div>
              </div>
            </div>

            <div className="bg-[#fbfaf7] p-8 rounded-xl border border-gray-200">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-[#0b447a] mb-6">
                "99.99% uptime SLA means we never lose revenue to system failures. The guaranteed reliability is worth every penny for our 24/7 operations."
              </blockquote>
              <div className="flex items-center">
                <img src="/testimonials/lisa-thompson.jpg" alt="Lisa Thompson" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <div className="font-semibold text-[#154438]">Lisa Thompson</div>
                  <div className="text-gray-600">COO, Rocky Mountain Cannabis</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Integrations */}
      <section className="py-20 bg-[#fbfaf7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#154438] mb-4">
              Enterprise-Grade Cannabis Integrations
            </h2>
            <p className="text-xl text-[#0b447a]">
              Connect with the enterprise tools and services your multi-state operation demands.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
              <img src="/integrations/metrc.png" alt="METRC" className="h-12 w-auto mb-3" />
              <span className="text-sm font-medium text-gray-700">METRC</span>
              <span className="text-xs text-gray-500">State Tracking</span>
            </div>
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
              <img src="/integrations/quickbooks.png" alt="QuickBooks" className="h-12 w-auto mb-3" />
              <span className="text-sm font-medium text-gray-700">QuickBooks</span>
              <span className="text-xs text-gray-500">Enterprise Accounting</span>
            </div>
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
              <img src="/integrations/docusign.png" alt="DocuSign" className="h-12 w-auto mb-3" />
              <span className="text-sm font-medium text-gray-700">DocuSign</span>
              <span className="text-xs text-gray-500">Digital Signatures</span>
            </div>
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
              <img src="/integrations/salesforce.png" alt="Salesforce" className="h-12 w-auto mb-3" />
              <span className="text-sm font-medium text-gray-700">Salesforce</span>
              <span className="text-xs text-gray-500">Enterprise CRM</span>
            </div>
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
              <img src="/integrations/microsoft.png" alt="Microsoft 365" className="h-12 w-auto mb-3" />
              <span className="text-sm font-medium text-gray-700">Microsoft 365</span>
              <span className="text-xs text-gray-500">Enterprise Collaboration</span>
            </div>
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
              <img src="/integrations/aws.png" alt="AWS" className="h-12 w-auto mb-3" />
              <span className="text-sm font-medium text-gray-700">AWS GovCloud</span>
              <span className="text-xs text-gray-500">Enterprise Hosting</span>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise CTA Section */}
      <section className="py-20 bg-[#154438] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Cannabis Enterprise?
          </h2>
          <p className="text-xl text-[#fbfaf7]/90 mb-8 max-w-2xl mx-auto">
            Join the multi-state operators who trust CultivateCo for pharmaceutical-grade compliance, enterprise security, and guaranteed reliability.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo" className="inline-flex items-center justify-center px-8 py-4 bg-[#fbfaf7] text-[#154438] font-semibold rounded-lg hover:bg-[#fbfaf7]/90 transition-colors">
              Schedule Enterprise Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link href="/pricing" className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#fbfaf7] text-[#fbfaf7] font-semibold rounded-lg hover:bg-white/10 transition-colors">
              View Enterprise Pricing
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-[#0b447a]">99.99%</div>
              <div className="text-[#fbfaf7]/80">Guaranteed Uptime</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#0b447a]">50+</div>
              <div className="text-[#fbfaf7]/80">Multi-State Operators</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#0b447a]">SOC 2</div>
              <div className="text-[#fbfaf7]/80">Type II Certified</div>
            </div>
          </div>
        </div>
      </section>
    </CannabisLayout>
