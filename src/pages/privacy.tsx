/**
 * =============================================================================
 * CultivateCo Cannabis Privacy Policy
 * =============================================================================
 * Comprehensive privacy policy for cannabis industry compliance and data protection
 */

'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import {
  Shield,
  Lock,
  Eye,
  Database,
  Mail,
  Phone,
  Globe,
  FileCheck,
  AlertTriangle,
  CheckCircle,
  Calendar,
  User,
  Building2,
  ExternalLink,
  Download,
} from 'lucide-react'

import { CannabisLayout } from '@/components/layout/CannabisLayout'
import { cn, trackCannabisEvent, formatCannabisDate } from '@/lib/cannabis-utils'
import type { CannabisSEOData } from '@/types/cannabis-marketing'

// ============================================================================
// CANNABIS PRIVACY POLICY DATA
// ============================================================================

const CANNABIS_PRIVACY_SECTIONS = [
  {
    id: 'information-collection',
    title: 'Information We Collect',
    icon: Database,
    content: [
      {
        subtitle: 'Personal Information',
        description: 'We collect personal information that you voluntarily provide to us when you:',
        items: [
          'Register for a CultivateCo account or request a demo',
          'Subscribe to our newsletter or cannabis industry insights',
          'Contact us through our website, email, or phone',
          'Participate in surveys, webinars, or cannabis industry events',
          'Apply for employment with CultivateCo',
          'Use our cannabis compliance platform and services',
        ],
        details: 'This may include your name, email address, phone number, company information, job title, cannabis license information, and other contact details.'
      },
      {
        subtitle: 'Cannabis Business Information',
        description: 'For our cannabis compliance services, we may collect:',
        items: [
          'Cannabis license numbers and regulatory information',
          'Business location and operational details',
          'METRC account information and tracking data',
          'Compliance history and violation records',
          'Inventory and sales data for compliance monitoring',
          'Employee access logs and system usage data',
        ],
        details: 'This information is necessary to provide cannabis compliance monitoring, METRC integration, and regulatory reporting services.'
      },
      {
        subtitle: 'Automatic Information Collection',
        description: 'We automatically collect certain information when you visit our website:',
        items: [
          'IP address and geographic location',
          'Browser type, version, and operating system',
          'Pages visited, time spent, and navigation patterns',
          'Referring website and search terms used',
          'Device information and screen resolution',
          'Cookies and similar tracking technologies',
        ],
        details: 'This information helps us improve our website performance and user experience while maintaining cannabis industry compliance.'
      },
    ],
  },
  {
    id: 'information-usage',
    title: 'How We Use Your Information',
    icon: Eye,
    content: [
      {
        subtitle: 'Cannabis Compliance Services',
        description: 'We use your information to provide our core cannabis services:',
        items: [
          'Cannabis regulatory compliance monitoring and alerts',
          'METRC integration and seed-to-sale tracking',
          'Automated compliance reporting and submissions',
          'Violation prevention and risk assessment',
          'Cannabis license monitoring and renewal reminders',
          'Industry-specific analytics and insights',
        ],
        details: 'This usage is essential for our cannabis compliance platform to function effectively and keep your business compliant with state regulations.'
      },
      {
        subtitle: 'Communication and Support',
        description: 'We use your contact information to:',
        items: [
          'Provide customer support and technical assistance',
          'Send service updates and cannabis compliance alerts',
          'Deliver newsletters and industry insights',
          'Communicate about account changes or issues',
          'Respond to your inquiries and requests',
          'Send important security and legal notices',
        ],
        details: 'We respect your communication preferences and provide easy opt-out options for non-essential communications.'
      },
      {
        subtitle: 'Platform Improvement and Analytics',
        description: 'We analyze usage data to:',
        items: [
          'Improve our cannabis compliance platform features',
          'Enhance website performance and user experience',
          'Develop new cannabis industry tools and services',
          'Conduct research on cannabis compliance trends',
          'Generate anonymized industry reports and insights',
          'Optimize our marketing and educational content',
        ],
        details: 'This analysis helps us better serve the cannabis industry and improve compliance outcomes for all users.'
      },
    ],
  },
  {
    id: 'information-sharing',
    title: 'Information Sharing and Disclosure',
    icon: Globe,
    content: [
      {
        subtitle: 'Regulatory Compliance Requirements',
        description: 'We may share information as required by cannabis regulations:',
        items: [
          'State cannabis regulatory agencies (when required by law)',
          'METRC and other state tracking systems for compliance',
          'Law enforcement agencies (when legally compelled)',
          'Regulatory audits and compliance investigations',
          'Court orders, subpoenas, or legal proceedings',
          'Emergency situations involving public safety',
        ],
        details: 'We only share information as legally required and will notify you when possible, unless prohibited by law.'
      },
      {
        subtitle: 'Service Providers and Partners',
        description: 'We share information with trusted service providers who help us operate:',
        items: [
          'Cloud hosting and data storage providers (AWS, Google Cloud)',
          'Payment processors for subscription billing',
          'Email service providers for communications',
          'Analytics and performance monitoring tools',
          'Customer support and help desk software',
          'Security and fraud prevention services',
        ],
        details: 'All service providers are bound by contractual obligations to protect your information and use it only for specified purposes.'
      },
      {
        subtitle: 'Business Transfers and Legal Requirements',
        description: 'Information may be disclosed in connection with:',
        items: [
          'Merger, acquisition, or sale of CultivateCo assets',
          'Bankruptcy or insolvency proceedings',
          'Legal compliance and regulatory requirements',
          'Protection of our rights, property, or safety',
          'Enforcement of our terms of service',
          'Investigation of fraud or security incidents',
        ],
        details: 'We will provide notice of any business transfer that affects your personal information, when legally permitted.'
      },
    ],
  },
  {
    id: 'data-security',
    title: 'Data Security and Protection',
    icon: Lock,
    content: [
      {
        subtitle: 'Security Measures',
        description: 'We implement comprehensive security measures including:',
        items: [
          'End-to-end encryption for all data transmission',
          'Advanced firewall and intrusion detection systems',
          'Multi-factor authentication for user accounts',
          'Regular security audits and vulnerability assessments',
          'SOC 2 Type II compliance and certification',
          'Employee security training and background checks',
        ],
        details: 'Our security infrastructure meets or exceeds cannabis industry standards and financial services requirements.'
      },
      {
        subtitle: 'Cannabis Industry Compliance',
        description: 'Our security practices address cannabis industry requirements:',
        items: [
          'State-specific cannabis data protection requirements',
          'METRC data security and integration standards',
          'Cannabis banking compliance and data isolation',
          'Regulatory audit trail maintenance and protection',
          'Cannabis license information security protocols',
          'Industry-specific access controls and monitoring',
        ],
        details: 'We understand the unique security challenges facing the cannabis industry and have designed our systems accordingly.'
      },
      {
        subtitle: 'Data Breach Response',
        description: 'In the event of a security incident, we will:',
        items: [
          'Immediately contain and investigate the incident',
          'Notify affected users within 72 hours when possible',
          'Report breaches to relevant regulatory authorities',
          'Provide detailed information about the incident',
          'Take steps to prevent future occurrences',
          'Offer credit monitoring or identity protection services if needed',
        ],
        details: 'We have a comprehensive incident response plan specifically designed for cannabis industry requirements.'
      },
    ],
  },
  {
    id: 'your-rights',
    title: 'Your Privacy Rights',
    icon: User,
    content: [
      {
        subtitle: 'Access and Control Rights',
        description: 'You have the following rights regarding your personal information:',
        items: [
          'Access: Request a copy of the personal information we hold about you',
          'Correction: Request correction of inaccurate or incomplete information',
          'Deletion: Request deletion of your personal information (with some exceptions)',
          'Portability: Request transfer of your data to another service provider',
          'Restriction: Request limitation of processing in certain circumstances',
          'Objection: Object to certain types of processing of your information',
        ],
        details: 'We will respond to your requests within 30 days, though some requests may take longer due to complexity or legal requirements.'
      },
      {
        subtitle: 'Cannabis Industry Considerations',
        description: 'Some rights may be limited by cannabis regulatory requirements:',
        items: [
          'Compliance data may be retained for regulatory audit purposes',
          'METRC integration data may be subject to state retention requirements',
          'License and regulatory information may be required to be maintained',
          'Some deletion requests may conflict with cannabis record-keeping laws',
          'Audit trail data may be subject to longer retention periods',
          'State regulatory agencies may have access rights to certain information',
        ],
        details: 'We will work with you to honor your privacy rights while maintaining compliance with cannabis regulations.'
      },
      {
        subtitle: 'Communication Preferences',
        description: 'You can control your communication preferences:',
        items: [
          'Unsubscribe from marketing emails at any time',
          'Opt out of non-essential phone communications',
          'Update your contact information and preferences',
          'Choose which types of industry insights to receive',
          'Set preferences for compliance alerts and notifications',
          'Control sharing of your information for marketing purposes',
        ],
        details: 'Note that some communications related to your account, security, or compliance may be necessary regardless of your preferences.'
      },
    ],
  },
  {
    id: 'cookies-tracking',
    title: 'Cookies and Tracking Technologies',
    icon: Globe,
    content: [
      {
        subtitle: 'Types of Cookies We Use',
        description: 'We use different types of cookies for various purposes:',
        items: [
          'Essential cookies: Required for website functionality and security',
          'Analytics cookies: Help us understand how visitors use our website',
          'Functional cookies: Remember your preferences and settings',
          'Marketing cookies: Used to deliver relevant advertisements',
          'Social media cookies: Enable social sharing and integration',
          'Third-party cookies: From integrated services like Google Analytics',
        ],
        details: 'You can control cookie settings through your browser, though disabling certain cookies may affect website functionality.'
      },
      {
        subtitle: 'Third-Party Tracking',
        description: 'We use third-party services that may collect information:',
        items: [
          'Google Analytics for website traffic analysis',
          'Salesforce for customer relationship management',
          'Intercom for customer support and live chat',
          'Stripe for payment processing and billing',
          'Mailchimp for email marketing campaigns',
          'LinkedIn and Facebook for advertising and analytics',
        ],
        details: 'These services have their own privacy policies and may use cookies or similar technologies to track your activity.'
      },
    ],
  },
  {
    id: 'compliance-retention',
    title: 'Cannabis Compliance and Data Retention',
    icon: FileCheck,
    content: [
      {
        subtitle: 'Regulatory Compliance Requirements',
        description: 'As a cannabis industry service provider, we must comply with:',
        items: [
          'State cannabis regulations regarding data retention',
          'METRC data sharing and reporting requirements',
          'Cannabis banking compliance and record-keeping rules',
          'State licensing authority audit and inspection requirements',
          'Federal regulations applicable to cannabis businesses',
          'Industry-specific compliance and reporting standards',
        ],
        details: 'These requirements may affect how long we retain certain types of information and who may have access to it.'
      },
      {
        subtitle: 'Data Retention Periods',
        description: 'We retain different types of information for varying periods:',
        items: [
          'Account information: For the duration of your account plus 7 years',
          'Cannabis compliance data: As required by state regulations (typically 3-7 years)',
          'METRC and tracking data: Per state-specific requirements',
          'Financial and billing records: 7 years for tax and audit purposes',
          'Communication records: 3 years or as required by law',
          'Website analytics: 2 years unless aggregated and anonymized',
        ],
        details: 'Retention periods may be extended if required by legal holds, investigations, or ongoing regulatory matters.'
      },
    ],
  },
]

const CANNABIS_PRIVACY_HIGHLIGHTS = [
  {
    icon: Shield,
    title: 'Cannabis Industry Expertise',
    description: 'Privacy practices designed specifically for cannabis regulatory requirements',
  },
  {
    icon: Lock,
    title: 'Enterprise-Grade Security',
    description: 'SOC 2 Type II compliance with advanced encryption and access controls',
  },
  {
    icon: CheckCircle,
    title: 'Regulatory Compliance',
    description: 'Full compliance with state cannabis regulations and data protection laws',
  },
  {
    icon: Eye,
    title: 'Transparency',
    description: 'Clear information about how we collect, use, and protect your data',
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
// CANNABIS PRIVACY POLICY COMPONENTS
// ============================================================================

const CannabisPrivacySectionComponent: React.FC<{
  section: typeof CANNABIS_PRIVACY_SECTIONS[0]
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
// CANNABIS PRIVACY POLICY PAGE SECTIONS
// ============================================================================

const CannabisPrivacyHeroSection: React.FC = () => {
  const lastUpdated = '2024-02-15'

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cannabis-green-700 to-cannabis-blue-700 text-white py-20 lg:py-32">
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
              <Shield className="h-4 w-4" />
              <span>Cannabis Industry Privacy Policy</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Cannabis
              <span className="block">Privacy</span>
              <span className="block">Policy</span>
            </h1>
            
            <p className="text-xl opacity-90 leading-relaxed">
              Our commitment to protecting your privacy while maintaining cannabis regulatory 
              compliance. Designed specifically for the cannabis industry with enterprise-grade security.
            </p>
          </motion.div>

          <motion.div variants={fadeInUpVariants} className="flex items-center justify-center space-x-6 text-sm opacity-75">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Last Updated: {formatCannabisDate(lastUpdated)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FileCheck className="h-4 w-4" />
              <span>Cannabis Regulatory Compliant</span>
            </div>
          </motion.div>

          <motion.div variants={fadeInUpVariants} className="grid md:grid-cols-4 gap-6">
            {CANNABIS_PRIVACY_HIGHLIGHTS.map((highlight, index) => {
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

const CannabisPrivacyPolicySectionsComponent: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('information-collection')
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(activeSection === sectionId ? '' : sectionId)
    trackCannabisEvent('cannabis_privacy_section_click', {
      section_id: sectionId,
      section_title: CANNABIS_PRIVACY_SECTIONS.find(s => s.id === sectionId)?.title,
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
              Privacy Policy
              <span className="block text-cannabis-green-700">Details</span>
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive information about how we collect, use, protect, and share 
              your information in compliance with cannabis industry regulations.
            </p>
          </motion.div>

          <div className="space-y-4">
            {CANNABIS_PRIVACY_SECTIONS.map((section) => (
              <CannabisPrivacySectionComponent
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
                    Cannabis Industry Considerations
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    The cannabis industry operates under unique regulatory requirements that may affect 
                    how we handle your information. State and local cannabis regulations may require us 
                    to retain certain types of data for extended periods, share information with regulatory 
                    authorities, or implement specific security measures. We are committed to balancing 
                    your privacy rights with these regulatory obligations.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Questions About Cannabis Compliance?</h4>
                <p className="text-gray-700 mb-4">
                  If you have specific questions about how cannabis regulations affect your privacy 
                  rights or our data handling practices, we're here to help.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center space-x-2 bg-cannabis-green-600 hover:bg-cannabis-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span>Contact Privacy Team</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

const CannabisPrivacyContactSection: React.FC = () => {
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
              Privacy Questions or Concerns?
            </h2>
            <p className="text-xl text-gray-600">
              Contact our privacy team for assistance with data requests, 
              privacy concerns, or cannabis regulatory compliance questions.
            </p>
          </motion.div>

          <motion.div variants={fadeInUpVariants} className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-6 text-center shadow-cannabis">
              <Mail className="h-8 w-8 text-cannabis-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Email Privacy Team</h3>
              <p className="text-gray-600 text-sm mb-4">
                Get detailed responses to privacy questions
              </p>
              
                href="mailto:privacy@cultivateco.com"
                className="text-cannabis-green-600 hover:underline font-medium"
              >
                privacy@cultivateco.com
              </a>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-cannabis">
              <Phone className="h-8 w-8 text-cannabis-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Call Privacy Hotline</h3>
              <p className="text-gray-600 text-sm mb-4">
                Speak directly with privacy specialists
              </p>
              
                href="tel:+15551234567"
                className="text-cannabis-green-600 hover:underline font-medium"
              >
                (555) 123-4567
              </a>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-cannabis">
              <Building2 className="h-8 w-8 text-cannabis-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Mailing Address</h3>
              <p className="text-gray-600 text-sm mb-4">
                Send written privacy requests
              </p>
              <div className="text-gray-700 text-sm">
                <div>CultivateCo Privacy Team</div>
                <div>2500 Louisiana Blvd NE</div>
                <div>Albuquerque, NM 87110</div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeInUpVariants} className="bg-white rounded-2xl p-8 shadow-cannabis">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Data Subject Rights</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-cannabis-green-500" />
                    <span>Request access to your personal data</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-cannabis-green-500" />
                    <span>Correct inaccurate information</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-cannabis-green-500" />
                    <span>Request deletion of your data</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-cannabis-green-500" />
                    <span>Opt out of marketing communications</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Response Time</h3>
                <p className="text-gray-700 text-sm mb-4">
                  We will respond to your privacy requests within 30 days. Some requests 
                  may take longer due to complexity or cannabis regulatory requirements.
                </p>
                <div className="flex space-x-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center space-x-2 bg-cannabis-green-600 hover:bg-cannabis-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                  >
                    <span>Submit Request</span>
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                  <button className="inline-flex items-center space-x-2 border-2 border-cannabis-green-600 text-cannabis-green-600 hover:bg-cannabis-green-50 font-semibold py-2 px-4 rounded-lg transition-colors">
                    <Download className="h-4 w-4" />
                    <span>Download Data</span>
                  </button>
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
// MAIN CANNABIS PRIVACY POLICY PAGE COMPONENT
// ============================================================================

const CannabisPrivacyPage: React.FC = () => {
  const seo: CannabisSEOData = {
    title: 'Privacy Policy | CultivateCo Cannabis Platform | Data Protection & Security',
    description: 'CultivateCo privacy policy detailing how we collect, use, and protect your cannabis business data. Cannabis regulatory compliant with enterprise-grade security.',
    keywords: [
      'cannabis privacy policy',
      'cannabis data protection',
      'cannabis data security',
      'cannabis regulatory compliance',
      'cannabis privacy rights',
      'cannabis data collection',
      'cannabis information security',
      'cannabis business privacy',
      'metrc data privacy',
      'cannabis platform privacy',
    ],
    ogTitle: 'Privacy Policy | Cannabis Data Protection & Security',
    ogDescription: 'Comprehensive privacy policy for cannabis businesses covering data collection, protection, and regulatory compliance with cannabis industry requirements.',
    ogImage: 'https://cultivateco.com/og-cannabis-privacy-policy.jpg',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'CultivateCo Privacy Policy',
      description: 'Privacy policy for cannabis industry platform covering data protection and regulatory compliance',
      dateModified: '2024-02-15',
      publisher: {
        '@type': 'Organization',
        name: 'CultivateCo',
      },
    },
  }

  return (
    <CannabisLayout seo={seo}>
      <CannabisPrivacyHeroSection />
      <CannabisPrivacyPolicySectionsComponent />
      <CannabisPrivacyContactSection />
    </CannabisLayout>
  )
}

export default CannabisPrivacyPage
