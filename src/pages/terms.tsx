/**
 * =============================================================================
 * CultivateCo Cannabis Terms of Service
 * =============================================================================
 * Comprehensive terms of service for cannabis industry platform and services
 */

'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import {
  Scale,
  Shield,
  AlertTriangle,
  CheckCircle,
  FileText,
  Building2,
  Users,
  CreditCard,
  Globe,
  Lock,
  Eye,
  RefreshCw,
  ExternalLink,
  Mail,
  Phone,
  Calendar,
  Gavel,
  Ban,
  Target,
  Database,
  Award,
} from 'lucide-react'

import { CannabisLayout } from '@/components/layout/CannabisLayout'
import { cn, trackCannabisEvent, formatCannabisDate } from '@/lib/cannabis-utils'
import type { CannabisSEOData } from '@/types/cannabis-marketing'

// ============================================================================
// CANNABIS TERMS OF SERVICE DATA
// ============================================================================

const CANNABIS_TERMS_SECTIONS = [
  {
    id: 'acceptance-agreement',
    title: 'Acceptance of Agreement',
    icon: Scale,
    content: [
      {
        subtitle: 'Agreement to Terms',
        description: 'By accessing or using CultivateCo\'s cannabis compliance platform, you agree to be bound by these Terms of Service and all applicable laws and regulations.',
        items: [
          'These terms constitute a legally binding agreement between you and CultivateCo',
          'Your use of our services indicates acceptance of all terms and conditions',
          'If you disagree with any terms, you must discontinue use of our services',
          'These terms apply to all users, including cannabis businesses, employees, and administrators',
          'Additional terms may apply to specific features or premium services',
          'You represent that you have authority to bind your cannabis business to these terms',
        ],
        details: 'Cannabis businesses must ensure all employees and users understand and comply with these terms when accessing the platform.'
      },
      {
        subtitle: 'Cannabis Industry Compliance',
        description: 'Use of our platform is subject to cannabis industry regulations and licensing requirements:',
        items: [
          'You must hold valid cannabis licenses for your operations and jurisdiction',
          'You are responsible for compliance with all applicable cannabis laws and regulations',
          'You must be legally authorized to operate a cannabis business in your state/jurisdiction',
          'Age verification is required - all users must be 21+ or meet local legal age requirements',
          'Use is restricted to legal cannabis jurisdictions only',
          'International use may be subject to additional restrictions and local laws',
        ],
        details: 'CultivateCo reserves the right to verify cannabis licenses and may suspend accounts that are not properly licensed or compliant.'
      },
    ],
  },
  {
    id: 'cannabis-services',
    title: 'Cannabis Platform Services',
    icon: Database,
    content: [
      {
        subtitle: 'Platform Features and Services',
        description: 'CultivateCo provides cannabis compliance and business management services including:',
        items: [
          'Cannabis regulatory compliance monitoring and alerts',
          'METRC integration and seed-to-sale tracking',
          'Cannabis point-of-sale (POS) systems and inventory management',
          'Automated compliance reporting and submission services',
          'Cannabis business analytics and performance insights',
          'Multi-state cannabis operations support and management',
          'Cannabis-specific accounting and financial reporting tools',
          'Cannabis industry benchmarking and best practices guidance',
        ],
        details: 'Service availability may vary by state and is subject to local cannabis regulations and licensing requirements.'
      },
      {
        subtitle: 'Service Level and Availability',
        description: 'We strive to provide reliable cannabis compliance services with the following expectations:',
        items: [
          '99.9% uptime target for core compliance monitoring services',
          '24/7 monitoring for critical cannabis compliance alerts and violations',
          'Real-time METRC synchronization and state reporting integration',
          'Emergency compliance support for critical violations or license threats',
          'Regular system updates and cannabis regulatory change adaptations',
          'Backup and disaster recovery systems to protect your cannabis business data',
          'Mobile access for cannabis operations management and compliance monitoring',
          'Integration with cannabis industry software and third-party services',
        ],
        details: 'While we maintain high service standards, cannabis regulatory changes or technical issues may occasionally affect service availability.'
      },
    ],
  },
  {
    id: 'user-responsibilities',
    title: 'User Responsibilities and Obligations',
    icon: Users,
    content: [
      {
        subtitle: 'Cannabis License and Compliance Obligations',
        description: 'As a cannabis business using our platform, you are responsible for:',
        items: [
          'Maintaining valid cannabis licenses and permits for all operations',
          'Ensuring compliance with all state, local, and applicable federal cannabis regulations',
          'Providing accurate and current cannabis license information to CultivateCo',
          'Promptly updating license status, renewals, and any regulatory changes',
          'Implementing and following cannabis compliance procedures and best practices',
          'Training staff on cannabis regulations and proper use of compliance systems',
          'Responding promptly to compliance alerts and violation notifications',
          'Maintaining accurate records as required by cannabis regulatory authorities',
        ],
        details: 'Failure to maintain proper cannabis licensing may result in immediate account suspension to protect both parties from regulatory violations.'
      },
      {
        subtitle: 'Account Security and Access Management',
        description: 'You are responsible for securing your CultivateCo account and managing user access:',
        items: [
          'Protecting login credentials and implementing strong password policies',
          'Managing user permissions and access levels within your cannabis business',
          'Promptly reporting any unauthorized access or security breaches',
          'Ensuring all users are properly trained on cannabis compliance procedures',
          'Maintaining current contact information for compliance notifications',
          'Implementing appropriate access controls for cannabis business data',
          'Regularly reviewing user access and removing unnecessary permissions',
          'Complying with cannabis industry data security requirements',
        ],
        details: 'Cannabis businesses are subject to strict data security requirements, and account security is critical for regulatory compliance.'
      },
      {
        subtitle: 'Data Accuracy and Cannabis Reporting',
        description: 'Accurate data is essential for cannabis compliance and regulatory reporting:',
        items: [
          'Providing accurate and complete cannabis business information',
          'Ensuring inventory data, sales records, and compliance information is current',
          'Promptly correcting any errors or discrepancies in cannabis tracking data',
          'Maintaining data integrity for METRC and state reporting requirements',
          'Verifying accuracy of automated reports before submission to regulators',
          'Implementing quality control processes for cannabis data management',
          'Cooperating with regulatory audits and providing required documentation',
          'Following cannabis record-keeping requirements and retention policies',
        ],
        details: 'Inaccurate cannabis data can result in regulatory violations, fines, or license suspension. You are ultimately responsible for all data submitted to regulators.'
      },
    ],
  },
  {
    id: 'prohibited-activities',
    title: 'Prohibited Uses and Activities',
    icon: Ban,
    content: [
      {
        subtitle: 'Cannabis Regulatory Violations',
        description: 'The following activities are strictly prohibited and may result in immediate account termination:',
        items: [
          'Using the platform for unlicensed or illegal cannabis activities',
          'Operating in jurisdictions where cannabis is not legal',
          'Falsifying cannabis license information or regulatory compliance data',
          'Attempting to circumvent cannabis tracking or compliance requirements',
          'Using the platform for non-cannabis illegal activities or substances',
          'Violating state or local cannabis regulations while using our services',
          'Sharing accounts or access credentials with unlicensed individuals',
          'Using the platform to facilitate cannabis sales to minors or unauthorized persons',
        ],
        details: 'Cannabis regulatory compliance is our top priority. Any activities that could jeopardize regulatory compliance will result in immediate account action.'
      },
      {
        subtitle: 'Technical and Security Violations',
        description: 'The following technical activities are prohibited:',
        items: [
          'Attempting to hack, compromise, or gain unauthorized access to our systems',
          'Reverse engineering, decompiling, or attempting to extract our software code',
          'Using automated tools to scrape or harvest data from our platform',
          'Overloading our systems with excessive requests or traffic',
          'Attempting to bypass security measures or access controls',
          'Sharing proprietary information or trade secrets with competitors',
          'Using the platform for spam, malware distribution, or phishing activities',
          'Violating intellectual property rights or software licensing agreements',
        ],
        details: 'Security violations not only breach our terms but may also compromise cannabis regulatory compliance for all users.'
      },
      {
        subtitle: 'Content and Communication Restrictions',
        description: 'When using our platform and communication features, you may not:',
        items: [
          'Post or share content that violates cannabis advertising regulations',
          'Use the platform to advertise cannabis products inappropriately',
          'Share false, misleading, or defamatory information about cannabis businesses',
          'Harass, threaten, or abuse other users or CultivateCo staff',
          'Violate privacy rights or share confidential business information',
          'Use the platform for activities unrelated to cannabis business operations',
          'Post content that could harm the reputation of the cannabis industry',
          'Engage in activities that could trigger regulatory scrutiny or violations',
        ],
        details: 'Cannabis businesses operate in a highly regulated environment, and all communications must comply with industry standards and regulations.'
      },
    ],
  },
  {
    id: 'payment-billing',
    title: 'Payment Terms and Billing',
    icon: CreditCard,
    content: [
      {
        subtitle: 'Cannabis Platform Subscription Fees',
        description: 'CultivateCo cannabis compliance services are provided on a subscription basis:',
        items: [
          'Monthly or annual subscription fees based on your selected cannabis compliance plan',
          'Additional fees for premium features, integrations, or multi-location support',
          'Setup fees for complex cannabis operations or custom compliance requirements',
          'Usage-based fees for certain services like advanced analytics or reporting',
          'Professional services fees for consulting, training, or custom development',
          'Third-party integration fees for METRC, accounting, or other cannabis software connections',
        ],
        details: 'Cannabis platform pricing is designed to scale with your business operations and compliance needs.'
      },
      {
        subtitle: 'Cannabis Industry Payment Processing',
        description: 'Payment processing for cannabis businesses involves special considerations:',
        items: [
          'Payments processed through cannabis-compliant payment providers',
          'ACH transfers, wire transfers, and limited credit card processing options',
          'Additional verification requirements for cannabis business banking',
          'Potential payment delays due to cannabis banking regulations',
          'Alternative payment methods may be required based on banking availability',
          'Tax implications and reporting requirements for cannabis business payments',
        ],
        details: 'Cannabis banking restrictions may limit payment options. We work with cannabis-friendly financial institutions to provide reliable payment processing.'
      },
      {
        subtitle: 'Billing Terms and Late Payments',
        description: 'Cannabis subscription billing is subject to the following terms:',
        items: [
          'Automatic renewal unless cancelled 30 days before billing cycle',
          'Pro-rated billing for mid-cycle plan changes or additions',
          'Late payment fees of $50 or 1.5% per month on overdue balances',
          'Service suspension for accounts 30+ days past due',
          'Account termination for accounts 60+ days past due',
          'Collection fees and legal costs for significantly delinquent accounts',
        ],
        details: 'Maintaining current billing is essential for continuous cannabis compliance monitoring and regulatory protection.'
      },
    ],
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual Property Rights',
    icon: Award,
    content: [
      {
        subtitle: 'CultivateCo Platform Rights',
        description: 'CultivateCo owns all rights to our cannabis compliance platform and related intellectual property:',
        items: [
          'Software code, algorithms, and cannabis compliance methodologies',
          'Platform design, user interfaces, and cannabis industry workflows',
          'Cannabis compliance databases, templates, and regulatory guidance',
          'Trademarks, service marks, and branding related to CultivateCo',
          'Cannabis industry insights, analytics, and benchmarking data',
          'Training materials, documentation, and cannabis best practices guides',
        ],
        details: 'Our cannabis platform represents years of development and cannabis industry expertise. All intellectual property rights are reserved.'
      },
      {
        subtitle: 'Cannabis Business Data Rights',
        description: 'You retain ownership of your cannabis business data while granting us necessary usage rights:',
        items: [
          'You own all cannabis business data, inventory information, and sales records',
          'You grant CultivateCo rights to use your data for compliance services',
          'We may use aggregated, anonymized data for cannabis industry insights',
          'Your cannabis data may be shared with regulators as required by law',
          'You are responsible for ensuring your data doesn\'t violate third-party rights',
          'Data export capabilities available upon request for cannabis business continuity',
        ],
        details: 'While you own your cannabis data, we need certain rights to provide compliance services and meet regulatory requirements.'
      },
    ],
  },
  {
    id: 'liability-disclaimers',
    title: 'Liability and Disclaimers',
    icon: Shield,
    content: [
      {
        subtitle: 'Cannabis Regulatory Compliance Disclaimer',
        description: 'While we provide cannabis compliance tools and monitoring, you remain responsible for regulatory compliance:',
        items: [
          'CultivateCo provides tools to assist with cannabis compliance but cannot guarantee compliance',
          'You are solely responsible for understanding and following all cannabis laws',
          'Cannabis regulations change frequently and vary by jurisdiction',
          'Our platform assists with compliance but does not replace legal or regulatory advice',
          'You must implement proper cannabis compliance procedures beyond our platform',
          'Ultimate responsibility for cannabis regulatory compliance remains with your business',
        ],
        details: 'Cannabis regulations are complex and constantly evolving. Our platform is a tool to assist compliance efforts, not a guarantee of compliance.'
      },
      {
        subtitle: 'Limitation of Liability',
        description: 'CultivateCo\'s liability is limited in the following ways:',
        items: [
          'Total liability limited to the amount paid for services in the preceding 12 months',
          'No liability for indirect, consequential, or punitive damages',
          'No liability for cannabis regulatory violations or license suspensions',
          'No liability for business losses, lost profits, or opportunity costs',
          'No liability for third-party actions or cannabis regulatory changes',
          'No liability for data loss due to cannabis regulatory requirements',
        ],
        details: 'Cannabis businesses face unique risks, and our liability is necessarily limited given the regulatory environment and business complexities.'
      },
      {
        subtitle: 'Cannabis Industry Disclaimers',
        description: 'Important disclaimers specific to cannabis industry operations:',
        items: [
          'Cannabis laws are subject to change and vary significantly by jurisdiction',
          'Federal cannabis regulations may conflict with state laws',
          'Cannabis banking and payment processing options are limited and subject to change',
          'Cannabis business insurance may not cover all operational risks',
          'Cannabis license renewals and regulatory compliance are not guaranteed',
          'Cannabis market conditions and regulations can change rapidly',
        ],
        details: 'The cannabis industry operates in a unique legal and regulatory environment with inherent uncertainties and risks.'
      },
    ],
  },
  {
    id: 'termination-suspension',
    title: 'Account Termination and Suspension',
    icon: RefreshCw,
    content: [
      {
        subtitle: 'Cannabis License-Related Termination',
        description: 'Account termination may occur due to cannabis licensing issues:',
        items: [
          'Immediate suspension if cannabis licenses become invalid or expired',
          'Termination for operating without proper cannabis licenses',
          'Suspension during cannabis license renewal periods with regulatory uncertainty',
          'Termination for cannabis regulatory violations that could affect other users',
          'Suspension for non-payment of cannabis regulatory fees or license costs',
          'Termination if cannabis operations become illegal in your jurisdiction',
        ],
        details: 'Valid cannabis licensing is essential for platform access. We must suspend accounts that pose regulatory compliance risks.'
      },
      {
        subtitle: 'User-Initiated Termination',
        description: 'You may terminate your cannabis platform account under the following conditions:',
        items: [
          '30-day written notice required for annual subscription cancellations',
          'Immediate termination available for monthly subscriptions',
          'Data export services available for 90 days after termination',
          'Final billing occurs within 30 days of account closure',
          'Cannabis compliance data retained per regulatory requirements',
          'Refunds not available except in specific circumstances outlined in your agreement',
        ],
        details: 'Cannabis regulatory requirements may affect termination procedures and data retention periods.'
      },
      {
        subtitle: 'Post-Termination Obligations',
        description: 'After account termination, the following obligations continue:',
        items: [
          'Payment of all outstanding fees and charges',
          'Continued compliance with confidentiality and data protection terms',
          'Return or destruction of proprietary CultivateCo information',
          'Cannabis regulatory data retention requirements may still apply',
          'Survival of warranty disclaimers and limitation of liability terms',
          'Cooperation with ongoing cannabis regulatory audits or investigations',
        ],
        details: 'Cannabis regulatory requirements may necessitate continued data retention and cooperation even after account termination.'
      },
    ],
  },
]

const CANNABIS_TERMS_HIGHLIGHTS = [
  {
    icon: Scale,
    title: 'Cannabis Industry Focused',
    description: 'Terms specifically designed for cannabis regulatory compliance and industry requirements',
  },
  {
    icon: Shield,
    title: 'Legal Protection',
    description: 'Comprehensive legal framework protecting both cannabis businesses and CultivateCo',
  },
  {
    icon: CheckCircle,
    title: 'Regulatory Compliance',
    description: 'Terms structured to support cannabis regulatory compliance and licensing requirements',
  },
  {
    icon: Lock,
    title: 'Data Security',
    description: 'Strong data protection terms meeting cannabis industry security requirements',
  },
]

// ============================================================================
// CANNABIS ANIMATION VARIANTS
// ============================================================================

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
}

const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

// ============================================================================
// CANNABIS TERMS COMPONENTS
// ============================================================================

const CannabisTermsSectionComponent: React.FC<{
  section: typeof CANNABIS_TERMS_SECTIONS[0]
  isActive: boolean
  onClick: () => void
}> = ({ section, isActive, onClick }) => {
  const Icon = section.icon

  return (
    <motion.div
      variants={fadeInUpVariants}
      className={cn(
        'border rounded-xl transition-all duration-300 cursor-pointer',
        isActive 
          ? 'border-cannabis-green-500 bg-cannabis-green-50 shadow-cannabis' 
          : 'border-gray-200 bg-white hover:border-cannabis-green-200 hover:shadow-md'
      )}
    >
      <div
        onClick={onClick}
        className="p-6 flex items-center justify-between"
      >
        <div className="flex items-center space-x-4">
          <div className={cn(
            'p-3 rounded-lg',
            isActive 
              ? 'bg-cannabis-green-600 text-white' 
              : 'bg-gray-100 text-gray-600'
          )}>
            <Icon className="h-6 w-6" />
          </div>
          <h2 className={cn(
            'text-xl font-bold',
            isActive ? 'text-cannabis-green-900' : 'text-gray-900'
          )}>
            {section.title}
          </h2>
        </div>
        <div className={cn(
          'transform transition-transform',
          isActive ? 'rotate-180' : 'rotate-0'
        )}>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      {isActive && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="px-6 pb-6"
        >
          <div className="space-y-6">
            {section.content.map((subsection, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-lg font-semibold text-cannabis-green-800">
                  {subsection.subtitle}
                </h3>
                
                <p className="text-gray-700">{subsection.description}</p>
                
                <ul className="space-y-2">
                  {subsection.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-3">
                      <CheckCircle className="h-4 w-4 text-cannabis-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                
                {subsection.details && (
                  <div className="bg-cannabis-cream-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700 italic">{subsection.details}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

// ============================================================================
// CANNABIS TERMS PAGE SECTIONS
// ============================================================================

const CannabisTermsHeroSection: React.FC = () => {
  const lastUpdated = '2024-02-15'

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cannabis-blue-700 to-cannabis-green-700 text-white py-20 lg:py-32">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainerVariants}
          className="max-w-4xl mx-auto space-y-8"
        >
          <motion.div variants={fadeInUpVariants} className="space-y-6">
            <div className="inline-flex items-center space-x-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium">
              <Scale className="h-4 w-4" />
              <span>Cannabis Industry Terms of Service</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Cannabis
              <span className="block">Terms of</span>
              <span className="block">Service</span>
            </h1>
            
            <p className="text-xl opacity-90 leading-relaxed">
              Comprehensive terms governing the use of CultivateCo's cannabis compliance platform. 
              Designed specifically for the cannabis industry with regulatory compliance focus.
            </p>
          </motion.div>

          <motion.div variants={fadeInUpVariants} className="flex items-center justify-center space-x-6 text-sm opacity-75">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Effective: {formatCannabisDate(lastUpdated)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Gavel className="h-4 w-4" />
              <span>Cannabis Regulatory Compliant</span>
            </div>
          </motion.div>

          <motion.div variants={fadeInUpVariants} className="grid md:grid-cols-4 gap-6">
            {CANNABIS_TERMS_HIGHLIGHTS.map((highlight, index) => {
              const Icon = highlight.icon
              return (
                <div key={highlight.title} className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                  <Icon className="h-8 w-8 mx-auto mb-3" />
                  <div className="font-semibold mb-2">{highlight.title}</div>
                  <div className="text-sm opacity-90">{highlight.description}</div>
                </div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

const CannabisTermsSectionsComponent: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('acceptance-agreement')
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(activeSection === sectionId ? '' : sectionId)
    trackCannabisEvent('cannabis_terms_section_click', {
      section_id: sectionId,
      section_title: CANNABIS_TERMS_SECTIONS.find(s => s.id === sectionId)?.title,
    })
  }

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={fadeInUpVariants} className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              Terms of Service
              <span className="block text-cannabis-green-700">Details</span>
            </h2>
            <p className="text-xl text-gray-600">
              Detailed terms and conditions governing the use of CultivateCo's cannabis 
              compliance platform, services, and cannabis industry solutions.
            </p>
          </motion.div>

          <div className="space-y-4">
            {CANNABIS_TERMS_SECTIONS.map((section) => (
              <CannabisTermsSectionComponent
                key={section.id}
                section={section}
                isActive={activeSection === section.id}
                onClick={() => handleSectionClick(section.id)}
              />
            ))}
          </div>

          <motion.div variants={fadeInUpVariants} className="mt-16 bg-cannabis-cream-50 rounded-2xl p-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <AlertTriangle className="h-6 w-6 text-cannabis-green-600 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Important Cannabis Industry Notice
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The cannabis industry operates under complex and evolving regulations. These terms 
                    are designed to protect both cannabis businesses and CultivateCo while ensuring 
                    compliance with applicable laws. Cannabis regulations vary by state and can change 
                    frequently, which may affect these terms and our services.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    By using our cannabis compliance platform, you acknowledge the unique regulatory 
                    environment and agree to maintain proper licensing and compliance. CultivateCo 
                    provides tools to assist with compliance but cannot guarantee regulatory compliance 
                    or replace professional legal advice.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Questions About Cannabis Terms?</h4>
                <p className="text-gray-700 mb-4">
                  If you have questions about these terms, cannabis regulatory compliance, 
                  or how they apply to your specific cannabis business situation, contact our legal team.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center space-x-2 bg-cannabis-green-600 hover:bg-cannabis-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span>Contact Legal Team</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

const CannabisTermsContactSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-cannabis-cream-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={fadeInUpVariants} className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Legal Questions or Disputes?
            </h2>
            <p className="text-xl text-gray-600">
              Contact our legal team for questions about these terms, cannabis regulatory 
              compliance, or dispute resolution.
            </p>
          </motion.div>

          <motion.div variants={fadeInUpVariants} className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-6 text-center shadow-cannabis">
              <Mail className="h-8 w-8 text-cannabis-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Email Legal Team</h3>
              <p className="text-gray-600 text-sm mb-4">
                Get detailed legal guidance and compliance support
              </p>
              
                href="mailto:legal@cultivateco.com"
                className="text-cannabis-green-600 hover:underline font-medium"
              >
                legal@cultivateco.com
              </a>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-cannabis">
              <Phone className="h-8 w-8 text-cannabis-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Legal Hotline</h3>
              <p className="text-gray-600 text-sm mb-4">
                Speak with cannabis legal specialists
              </p>
              
                href="tel:+15551234567"
                className="text-cannabis-green-600 hover:underline font-medium"
              >
                (555) 123-4567
              </a>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-cannabis">
              <Building2 className="h-8 w-8 text-cannabis-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Legal Address</h3>
              <p className="text-gray-600 text-sm mb-4">
                Send formal legal notices and documents
              </p>
              <div className="text-gray-700 text-sm">
                <div>CultivateCo Legal Department</div>
                <div>2500 Louisiana Blvd NE</div>
                <div>Albuquerque, NM 87110</div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeInUpVariants} className="bg-white rounded-2xl p-8 shadow-cannabis">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Dispute Resolution</h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <p>
                    Most disputes can be resolved through direct communication with our 
                    cannabis industry experts and legal team.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-cannabis-green-500" />
                      <span>Direct negotiation and communication</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-cannabis-green-500" />
                      <span>Cannabis industry mediation</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-cannabis-green-500" />
                      <span>Binding arbitration if necessary</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-cannabis-green-500" />
                      <span>New Mexico governing law</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Cannabis Regulatory Support</h3>
                <p className="text-gray-700 text-sm mb-4">
                  Our legal team includes cannabis industry specialists who understand 
                  the unique regulatory challenges facing cannabis businesses.
                </p>
                <div className="flex space-x-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center space-x-2 bg-cannabis-green-600 hover:bg-cannabis-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                  >
                    <span>Get Legal Help</span>
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/privacy"
                    className="inline-flex items-center space-x-2 border-2 border-cannabis-green-600 text-cannabis-green-600 hover:bg-cannabis-green-50 font-semibold py-2 px-4 rounded-lg transition-colors"
                  >
                    <FileText className="h-4 w-4" />
                    <span>Privacy Policy</span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// MAIN CANNABIS TERMS PAGE COMPONENT
// ============================================================================

const CannabisTermsPage: React.FC = () => {
  const seo: CannabisSEOData = {
    title: 'Terms of Service | CultivateCo Cannabis Platform | Legal Terms & Conditions',
    description: 'CultivateCo terms of service for cannabis compliance platform covering user responsibilities, cannabis regulatory compliance, payment terms, and legal protections.',
    keywords: [
      'cannabis terms of service',
      'cannabis platform legal terms',
      'cannabis compliance terms',
      'cannabis software agreement',
      'cannabis regulatory terms',
      'cannabis business legal terms',
      'cannabis platform conditions',
      'cannabis service agreement',
      'cannabis legal compliance',
      'cannabis software terms',
    ],
    ogTitle: 'Terms of Service | Cannabis Platform Legal Terms & Conditions',
    ogDescription: 'Comprehensive terms of service for cannabis businesses using CultivateCo platform. Covers regulatory compliance, user responsibilities, and legal protections.',
    ogImage: 'https://cultivateco.com/og-cannabis-terms-service.jpg',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'CultivateCo Terms of Service',
      description: 'Terms of service for cannabis industry compliance platform and services',
      dateModified: '2024-02-15',
      publisher: {
        '@type': 'Organization',
        name: 'CultivateCo',
      },
    },
  }

  return (
    <CannabisLayout seo={seo}>
      <CannabisTermsHeroSection />
      <CannabisTermsSectionsComponent />
      <CannabisTermsContactSection />
    </CannabisLayout>
  )
}

export default CannabisTermsPage
