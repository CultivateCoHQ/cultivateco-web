/**
 * =============================================================================
 * CultivateCo Privacy Policy - Enterprise Cannabis Compliance Platform
 * =============================================================================
 * Pharmaceutical-grade privacy and data protection for enterprise cannabis operations
 */

'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Shield,
  Lock,
  Eye,
  FileText,
  Globe,
  Users,
  Database,
  AlertTriangle,
  CheckCircle,
  Phone,
  Mail,
  ArrowRight,
  Award,
  Building2,
} from 'lucide-react'

import { CannabisLayout } from '@/components/layout/CannabisLayout'

const PrivacyPage: React.FC = () => {
  const lastUpdated = "January 15, 2025"

  return (
    <CannabisLayout seo={{
      title: 'Privacy Policy | CultivateCo Pharmaceutical-Grade Cannabis Compliance Platform',
      description: 'Enterprise privacy policy for pharmaceutical-grade cannabis compliance platform. SOC 2 Type II certified data protection for multi-state operators.',
      keywords: [
        'cannabis compliance privacy policy',
        'enterprise cannabis data protection',
        'SOC 2 cannabis platform privacy',
        'pharmaceutical-grade data security',
        'cannabis business data privacy',
        'multi-state cannabis compliance privacy',
        'institutional cannabis data protection',
        'GDPR cannabis compliance',
        'CCPA cannabis platform',
        'enterprise cannabis privacy',
      ],
      ogTitle: 'Privacy Policy | CultivateCo Enterprise Cannabis Platform',
      ogDescription: 'SOC 2 Type II certified data protection for enterprise cannabis operations. Pharmaceutical-grade privacy standards.',
      ogImage: 'https://cultivateco.com/og-privacy-cannabis-compliance.jpg',
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
              <Shield className="h-4 w-4" />
              <span>SOC 2 Type II Certified Data Protection</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              Privacy Policy
              <span className="block text-cyan-200">Enterprise Data Protection</span>
            </h1>
            
            <p className="text-xl opacity-90 leading-relaxed max-w-2xl mx-auto">
              Pharmaceutical-grade data protection for enterprise cannabis operations. 
              Our privacy practices meet institutional investor and banking partnership requirements.
            </p>

            <div className="flex items-center justify-center space-x-8 text-sm">
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4" />
                <span>SOC 2 Type II Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>GDPR & CCPA Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Lock className="h-4 w-4" />
                <span>Enterprise-Grade Security</span>
              </div>
            </div>

            <p className="text-sm opacity-75">
              Last Updated: {lastUpdated}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Enterprise Privacy Overview */}
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
                    Enterprise Privacy Standards
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    CultivateCo ("Company," "we," "us," or "our") operates a pharmaceutical-grade cannabis compliance platform 
                    designed for enterprise cannabis operations, multi-state operators, and institutional investors. This Privacy Policy 
                    describes how we collect, use, disclose, and safeguard your information when you use our enterprise platform, 
                    services, and website (collectively, the "Services").
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="prose prose-lg max-w-none">
              
              {/* Information We Collect */}
              <section className="mb-12">
                <div className="flex items-center space-x-3 mb-6">
                  <Database className="h-6 w-6 text-teal-600" />
                  <h2 className="text-3xl font-bold text-gray-900">Information We Collect</h2>
                </div>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Enterprise Account Information</h3>
                    <p className="text-gray-700 mb-4">
                      When you create an enterprise account or request a consultation, we collect business information, 
                      executive contact details, compliance requirements, and financial information necessary to provide 
                      pharmaceutical-grade cannabis compliance services.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Platform Usage Data</h3>
                    <p className="text-gray-700 mb-4">
                      Our SOC 2 Type II certified platform automatically collects compliance activity, system access logs, 
                      technical information, and performance metrics to ensure enterprise-grade security and reliability.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Cannabis Business Data</h3>
                    <p className="text-gray-700 mb-4">
                      For enterprise cannabis operations, we process inventory records, regulatory submissions, 
                      transaction data, and compliance documentation as required for pharmaceutical-grade validation 
                      and multi-state regulatory compliance.
                    </p>
                  </div>
                </div>
              </section>

              {/* How We Use Information */}
              <section className="mb-12">
                <div className="flex items-center space-x-3 mb-6">
                  <Eye className="h-6 w-6 text-teal-600" />
                  <h2 className="text-3xl font-bold text-gray-900">How We Use Your Information</h2>
                </div>
                
                <div className="space-y-6">
                  <p className="text-gray-700">
                    We use collected information to provide pharmaceutical-grade cannabis compliance services, including:
                  </p>
                  
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-teal-500 mt-1 mr-3 flex-shrink-0" />
                      <span><strong>Enterprise Platform Services:</strong> Providing multi-state compliance management, regulatory reporting, and pharmaceutical-grade validation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-teal-500 mt-1 mr-3 flex-shrink-0" />
                      <span><strong>Compliance Monitoring:</strong> Real-time regulatory compliance tracking, audit trail maintenance, and violation prevention</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-teal-500 mt-1 mr-3 flex-shrink-0" />
                      <span><strong>Banking Compliance:</strong> BSA/AML monitoring, suspicious activity detection, and institutional partnership support</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-teal-500 mt-1 mr-3 flex-shrink-0" />
                      <span><strong>Enterprise Support:</strong> Dedicated account management, compliance consulting, and white-glove implementation services</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-teal-500 mt-1 mr-3 flex-shrink-0" />
                      <span><strong>Security & Compliance:</strong> Maintaining SOC 2 Type II certification, audit trails, and enterprise-grade data protection</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Information Sharing */}
              <section className="mb-12">
                <div className="flex items-center space-x-3 mb-6">
                  <Users className="h-6 w-6 text-teal-600" />
                  <h2 className="text-3xl font-bold text-gray-900">Information Sharing and Disclosure</h2>
                </div>
                
                <div className="space-y-6">
                  <p className="text-gray-700">
                    We maintain strict data confidentiality and only share information in limited circumstances:
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Regulatory Compliance</h4>
                      <p className="text-gray-700">
                        We may share cannabis business data with state regulatory authorities, METRC systems, 
                        and other official compliance platforms as required by law and necessary for regulatory compliance.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Service Providers</h4>
                      <p className="text-gray-700">
                        We work with SOC 2 certified service providers for enterprise infrastructure, including 
                        AWS GovCloud hosting, enterprise security services, and compliance automation tools.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Business Transfers</h4>
                      <p className="text-gray-700">
                        In connection with mergers, acquisitions, or asset sales, we may transfer information 
                        to institutional investors or acquiring entities with equivalent privacy protections.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Data Security */}
              <section className="mb-12">
                <div className="flex items-center space-x-3 mb-6">
                  <Lock className="h-6 w-6 text-teal-600" />
                  <h2 className="text-3xl font-bold text-gray-900">Enterprise Data Security</h2>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Award className="h-5 w-5 text-teal-600" />
                    <span className="font-semibold text-gray-900">SOC 2 Type II Certified Security Controls</span>
                  </div>
                  <p className="text-gray-700">
                    Our pharmaceutical-grade security infrastructure meets institutional investor and banking partnership requirements 
                    through comprehensive security controls, continuous monitoring, and regular compliance audits.
                  </p>
                </div>
                
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-teal-500 mt-1 mr-3 flex-shrink-0" />
                    <span><strong>Encryption:</strong> End-to-end encryption for data in transit and at rest using enterprise-grade protocols</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-teal-500 mt-1 mr-3 flex-shrink-0" />
                    <span><strong>Access Controls:</strong> Role-based permissions, multi-factor authentication, and executive privilege management</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-teal-500 mt-1 mr-3 flex-shrink-0" />
                    <span><strong>Infrastructure:</strong> AWS GovCloud hosting with 99.99% uptime SLA and enterprise redundancy</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-teal-500 mt-1 mr-3 flex-shrink-0" />
                    <span><strong>Monitoring:</strong> 24/7 security monitoring, threat detection, and compliance audit trails</span>
                  </li>
                </ul>
              </section>

              {/* Your Rights */}
              <section className="mb-12">
                <div className="flex items-center space-x-3 mb-6">
                  <FileText className="h-6 w-6 text-teal-600" />
                  <h2 className="text-3xl font-bold text-gray-900">Your Privacy Rights</h2>
                </div>
                
                <div className="space-y-6">
                  <p className="text-gray-700">
                    As an enterprise customer, you have comprehensive rights regarding your business data:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Access & Portability</h4>
                        <p className="text-gray-700 text-sm">
                          Request copies of your enterprise data and compliance records in machine-readable formats.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Correction & Updates</h4>
                        <p className="text-gray-700 text-sm">
                          Update business information, compliance requirements, and account settings through your enterprise dashboard.
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Data Retention</h4>
                        <p className="text-gray-700 text-sm">
                          Enterprise data retained per regulatory requirements and SOC 2 compliance standards.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Deletion Requests</h4>
                        <p className="text-gray-700 text-sm">
                          Request data deletion subject to regulatory compliance and audit trail requirements.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Regulatory Compliance */}
              <section className="mb-12">
                <div className="flex items-center space-x-3 mb-6">
                  <Globe className="h-6 w-6 text-teal-600" />
                  <h2 className="text-3xl font-bold text-gray-900">Regulatory Compliance</h2>
                </div>
                
                <div className="space-y-6">
                  <p className="text-gray-700">
                    Our privacy practices comply with applicable data protection regulations:
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">GDPR Compliance</h4>
                      <p className="text-gray-700 text-sm">
                        European data protection standards for international cannabis operations and institutional investors.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">CCPA Compliance</h4>
                      <p className="text-gray-700 text-sm">
                        California privacy rights for enterprise cannabis operations and business partnerships.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">State Cannabis Laws</h4>
                      <p className="text-gray-700 text-sm">
                        Multi-state cannabis privacy requirements and regulatory compliance obligations.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Contact Information */}
              <section className="mb-12">
                <div className="flex items-center space-x-3 mb-6">
                  <Phone className="h-6 w-6 text-teal-600" />
                  <h2 className="text-3xl font-bold text-gray-900">Privacy Questions & Contact</h2>
                </div>
                
                <div className="bg-teal-50 rounded-lg p-6 border border-teal-200">
                  <p className="text-gray-700 mb-4">
                    For enterprise privacy questions, data protection inquiries, or compliance concerns, contact our legal and compliance team:
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-teal-600" />
                      <span className="text-gray-900 font-medium">privacy@cultivateco.com</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-teal-600" />
                      <span className="text-gray-900 font-medium">(555) 123-PRIVACY</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Building2 className="h-5 w-5 text-teal-600" />
                      <span className="text-gray-900 font-medium">CultivateCo Legal Department<br/>123 Enterprise Way, Suite 500<br/>Denver, CO 80202</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Policy Updates */}
              <section className="mb-12">
                <div className="flex items-center space-x-3 mb-6">
                  <AlertTriangle className="h-6 w-6 text-teal-600" />
                  <h2 className="text-3xl font-bold text-gray-900">Policy Updates</h2>
                </div>
                
                <div className="space-y-4">
                  <p className="text-gray-700">
                    We may update this Privacy Policy to reflect changes in our enterprise services, regulatory requirements, 
                    or data protection practices. Enterprise customers will be notified of material changes through:
                  </p>
                  
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-teal-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span>Direct notification to enterprise account executives</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-teal-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span>Platform notifications and compliance dashboard alerts</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-teal-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span>Updated privacy policy with revision date and change summary</span>
                    </li>
                  </ul>
                </div>
              </section>

            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Contact CTA */}
      <section className="py-16 bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Enterprise Privacy & Compliance Questions?
            </h2>
            
            <p className="text-xl opacity-90">
              Our legal and compliance team provides dedicated support for enterprise cannabis operations 
              requiring pharmaceutical-grade data protection and regulatory compliance.
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
                <Shield className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </CannabisLayout>
  )
}

export default PrivacyPage
