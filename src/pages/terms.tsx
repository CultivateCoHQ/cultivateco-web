/**
 * =============================================================================
 * CultivateCo Terms of Service - Enterprise Cannabis Compliance Platform
 * =============================================================================
 * Pharmaceutical-grade terms of service for enterprise cannabis operations
 */

'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Shield,
  Scale,
  Building2,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Lock,
  Award,
  Phone,
  Mail,
  ArrowRight,
  Globe,
  Users,
} from 'lucide-react'

import { CannabisLayout } from '@/components/layout/CannabisLayout'

const TermsPage: React.FC = () => {
  const lastUpdated = "January 15, 2025"
  const effectiveDate = "January 15, 2025"

  return (
    <CannabisLayout seo={{
      title: 'Terms of Service | CultivateCo Pharmaceutical-Grade Cannabis Compliance Platform',
      description: 'Enterprise terms of service for pharmaceutical-grade cannabis compliance platform. SOC 2 Type II certified platform with 99.99% uptime SLA for multi-state operators.',
      keywords: [
        'cannabis compliance terms of service',
        'enterprise cannabis platform terms',
        'SOC 2 cannabis compliance terms',
        'pharmaceutical-grade cannabis terms',
        'multi-state cannabis compliance agreement',
        'institutional cannabis platform terms',
        'cannabis banking compliance terms',
        'enterprise SLA cannabis platform',
        'cannabis compliance contract terms',
        'pharmaceutical validation terms',
      ],
      ogTitle: 'Terms of Service | CultivateCo Enterprise Cannabis Platform',
      ogDescription: 'Enterprise terms of service with 99.99% uptime SLA and pharmaceutical-grade compliance standards for multi-state cannabis operations.',
      ogImage: 'https://cultivateco.com/og-terms-cannabis-compliance.jpg',
    }}>
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-600 text-white py-16 lg:py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center max-w-4xl mx-auto space-y-6"
          >
            <div className="inline-flex items-center space-x-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium">
              <Scale className="h-4 w-4" />
              <span>Enterprise Cannabis Compliance Agreement</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              Terms of Service
              <span className="block text-cyan-200">Enterprise Agreement</span>
            </h1>
            
            <p className="text-xl opacity-90 leading-relaxed max-w-2xl mx-auto">
              Pharmaceutical-grade terms of service for enterprise cannabis operations. 
              Comprehensive agreement covering SOC 2 Type II certification, 99.99% uptime SLA, and institutional-grade compliance.
            </p>

            <div className="flex items-center justify-center space-x-8 text-sm">
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4" />
                <span>99.99% Uptime SLA</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>SOC 2 Type II Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <Building2 className="h-4 w-4" />
                <span>Enterprise-Grade Terms</span>
              </div>
            </div>

            <div className="space-y-1 text-sm opacity-75">
              <p>Last Updated: {lastUpdated}</p>
              <p>Effective Date: {effectiveDate}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Terms of Service Content */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Enterprise Agreement Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-teal-50 rounded-2xl p-8 mb-12 border border-teal-200"
            >
              <div className="flex items-start space-x-4">
                <div className="bg-teal-100 rounded-lg p-3">
                  <Building2 className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    Enterprise Cannabis Compliance Agreement
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    These Terms of Service constitute a binding legal agreement between CultivateCo, Inc. 
                    and enterprise cannabis operations. This Agreement governs the use of our pharmaceutical-grade 
                    cannabis compliance platform, including SOC 2 Type II certified services, 99.99% uptime SLA, 
                    and institutional-grade compliance capabilities.
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="space-y-12">
              
              {/* Enterprise Services */}
              <section>
                <div className="flex items-center space-x-3 mb-6">
                  <Award className="h-6 w-6 text-teal-600" />
                  <h2 className="text-3xl font-bold text-gray-900">1. Enterprise Platform Services</h2>
                </div>
                
                <div className="space-y-6">
                  <p className="text-gray-700">
                    CultivateCo provides pharmaceutical-grade cannabis compliance platform services designed 
                    for enterprise operations, multi-state operators, and institutional investors.
                  </p>
                  
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Core Enterprise Services</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-teal-500 mt-1 mr-2 flex-shrink-0" />
                          <span>Multi-state regulatory compliance management</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-teal-500 mt-1 mr-2 flex-shrink-0" />
                          <span>Pharmaceutical-grade validation protocols</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-teal-500 mt-1 mr-2 flex-shrink-0" />
                          <span>SOC 2 Type II certified security infrastructure</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-teal-500 mt-1 mr-2 flex-shrink-0" />
                          <span>Banking compliance and BSA/AML monitoring</span>
                        </li>
                      </ul>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-teal-500 mt-1 mr-2 flex-shrink-0" />
                          <span>Enterprise analytics and reporting</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-teal-500 mt-1 mr-2 flex-shrink-0" />
                          <span>Dedicated enterprise support</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-teal-500 mt-1 mr-2 flex-shrink-0" />
                          <span>Custom integration development</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-teal-500 mt-1 mr-2 flex-shrink-0" />
                          <span>White-glove implementation services</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Service Level Agreement */}
              <section>
                <div className="flex items-center space-x-3 mb-6">
                  <Clock className="h-6 w-6 text-teal-600" />
                  <h2 className="text-3xl font-bold text-gray-900">2. Service Level Agreement (SLA)</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-teal-50 rounded-lg p-6 border border-teal-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">99.99% Uptime Guarantee</h3>
                    <p className="text-gray-700 mb-4">
                      CultivateCo guarantees 99.99% platform availability, allowing a maximum of 4.38 minutes 
                      of downtime per month. This guarantee is backed by financial penalties and service credits.
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-teal-200">
                        <span className="font-medium text-gray-900">Monthly Uptime</span>
                        <span className="text-teal-600 font-semibold">99.99% guaranteed</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-teal-200">
                        <span className="font-medium text-gray-900">Maximum Downtime/Month</span>
                        <span className="text-teal-600 font-semibold">4.38 minutes</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-teal-200">
                        <span className="font-medium text-gray-900">Service Credit</span>
                        <span className="text-teal-600 font-semibold">10% monthly fee per hour below SLA</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="font-medium text-gray-900">Enterprise Support</span>
                        <span className="text-teal-600 font-semibold">24/7 dedicated response</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Payment Terms */}
              <section>
                <div className="flex items-center space-x-3 mb-6">
                  <DollarSign className="h-6 w-6 text-teal-600" />
                  <h2 className="text-3xl font-bold text-gray-900">3. Enterprise Pricing and Payment Terms</h2>
                </div>
                
                <div className="space-y-6">
                  <p className="text-gray-700">
                    Enterprise pricing reflects pharmaceutical-grade compliance capabilities and institutional-grade 
                    service levels. All pricing is based on annual contracts with monthly billing.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Enterprise Tier</h4>
                      <p className="text-2xl font-bold text-teal-600 mb-2">$8,000/month</p>
                      <p className="text-gray-700 text-sm">
                        Multi-location operations with SOC 2 Type II certification and 99.99% uptime SLA.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Multi-State Tier</h4>
                      <p className="text-2xl font-bold text-teal-600 mb-2">$15,000/month</p>
                      <p className="text-gray-700 text-sm">
                        Unlimited locations with white-glove service and banking compliance ready.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Enterprise Plus</h4>
                      <p className="text-2xl font-bold text-teal-600 mb-2">Custom Pricing</p>
                      <p className="text-gray-700 text-sm">
                        Pharmaceutical-grade validation with dedicated compliance officers.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Security and Compliance */}
              <section>
                <div className="flex items-center space-x-3 mb-6">
                  <Lock className="h-6 w-6 text-teal-600" />
                  <h2 className="text-3xl font-bold text-gray-900">4. Security and Compliance Obligations</h2>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">CultivateCo Security Commitments</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-teal-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Maintain SOC 2 Type II certification with annual audits</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-teal-500 mt-1 mr-2 flex-shrink-0" />
                        <span>End-to-end encryption for all data in transit and at rest</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-teal-500 mt-1 mr-2 flex-shrink-0" />
                        <span>AWS GovCloud hosting with enterprise redundancy</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-teal-500 mt-1 mr-2 flex-shrink-0" />
                        <span>24/7 security monitoring and threat detection</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Customer Compliance Responsibilities</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-teal-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Maintain valid cannabis business licenses in all operating jurisdictions</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-teal-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Comply with state cannabis regulations and reporting requirements</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-teal-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Implement recommended security controls and access management</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-teal-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Notify CultivateCo of material compliance issues within 24 hours</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Limitation of Liability */}
              <section>
                <div className="flex items-center space-x-3 mb-6">
                  <AlertTriangle className="h-6 w-6 text-teal-600" />
                  <h2 className="text-3xl font-bold text-gray-900">5. Limitation of Liability</h2>
                </div>
                
                <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
                  <p className="text-gray-700 mb-4">
                    <strong>IMPORTANT LEGAL NOTICE:</strong> While CultivateCo provides pharmaceutical-grade 
                    compliance tools and guidance, ultimate regulatory compliance responsibility remains with 
                    the cannabis business entity. Our platform facilitates compliance but does not guarantee 
                    regulatory approval or exemption from violations.
                  </p>
                  
                  <div className="space-y-3">
                    <p className="text-gray-700">
                      CultivateCo's total liability for any claim related to the Services shall not exceed 
                      the total amount paid by Customer in the twelve (12) months preceding the claim, 
                      except for damages resulting from:
                    </p>
                    
                    <ul className="space-y-2 text-gray-700 ml-4">
                      <li>• Gross negligence or willful misconduct by CultivateCo</li>
                      <li>• Breach of confidentiality or data security obligations</li>
                      <li>• Violation of intellectual property rights</li>
                      <li>• Failure to meet SLA commitments (limited to service credits)</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Termination */}
              <section>
                <div className="flex items-center space-x-3 mb-6">
                  <FileText className="h-6 w-6 text-teal-600" />
                  <h2 className="text-3xl font-bold text-gray-900">6. Termination and Data Retention</h2>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Enterprise Contract Termination</h3>
                    <p className="text-gray-700 mb-4">
                      Either party may terminate this Agreement with 90 days written notice. CultivateCo may 
                      terminate immediately for material breach, loss of cannabis licenses, or non-payment.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Data Retention and Return</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-teal-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Customer data export available for 90 days post-termination</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-teal-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Compliance records retained per regulatory requirements (typically 3-7 years)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-teal-500 mt-1 mr-2 flex-shrink-0" />
                        <span>Secure data destruction after retention period with certification</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Governing Law */}
              <section>
                <div className="flex items-center space-x-3 mb-6">
                  <Scale className="h-6 w-6 text-teal-600" />
                  <h2 className="text-3xl font-bold text-gray-900">7. Governing Law and Dispute Resolution</h2>
                </div>
                
                <div className="space-y-6">
                  <p className="text-gray-700">
                    This Agreement shall be governed by the laws of the State of Delaware, without regard 
                    to conflict of law principles. Any disputes shall be resolved through binding arbitration 
                    in Denver, Colorado, administered by JAMS under its Commercial Arbitration Rules.
                  </p>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Enterprise Dispute Resolution Process</h4>
                    <ol className="list-decimal list-inside space-y-2 text-gray-700 text-sm">
                      <li>Direct negotiation between enterprise account managers (30 days)</li>
                      <li>Executive-level mediation with neutral cannabis industry mediator (30 days)</li>
                      <li>Binding arbitration with cannabis industry arbitrator panel</li>
                    </ol>
                  </div>
                </div>
              </section>

              {/* Contact Information */}
              <section>
                <div className="flex items-center space-x-3 mb-6">
                  <Phone className="h-6 w-6 text-teal-600" />
                  <h2 className="text-3xl font-bold text-gray-900">8. Legal and Enterprise Contact</h2>
                </div>
                
                <div className="bg-teal-50 rounded-lg p-6 border border-teal-200">
                  <p className="text-gray-700 mb-4">
                    For legal questions, contract modifications, or enterprise compliance matters, contact our legal department:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-teal-600" />
                        <span className="text-gray-900 font-medium">legal@cultivateco.com</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-teal-600" />
                        <span className="text-gray-900 font-medium">(555) 123-LEGAL</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Building2 className="h-4 w-4 text-teal-600" />
                        <span className="text-gray-900 font-medium">CultivateCo, Inc.<br/>Legal Department<br/>123 Enterprise Way, Suite 500<br/>Denver, CO 80202</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Legal Support CTA */}
      <section className="py-16 bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Enterprise Legal & Compliance Questions?
            </h2>
            
            <p className="text-xl opacity-90">
              Our legal team provides dedicated contract support and compliance guidance for 
              enterprise cannabis operations requiring pharmaceutical-grade standards.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center space-x-2 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-teal-600 hover:bg-gray-50 transition-colors"
              >
                <span>Contact Legal Team</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <Link
                href="/demo"
                className="inline-flex items-center space-x-2 rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold text-white hover:bg-white/10 transition-colors"
              >
                <span>Enterprise Consultation</span>
                <Scale className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </CannabisLayout>
  )
}

export default TermsPage
