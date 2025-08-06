/**
 * =============================================================================
 * CultivateCo Cannabis About Us Page
 * =============================================================================
 * Company information, team, mission, and cannabis industry expertise
 */

'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  Users,
  Target,
  Award,
  MapPin,
  Calendar,
  Building2,
  Lightbulb,
  Shield,
  TrendingUp,
  Globe,
  Star,
  CheckCircle,
  Heart,
  Zap,
  Eye,
  Mail,
  LinkedIn,
  Twitter,
  ExternalLink,
  Phone,
  Clock,
  Briefcase,
  GraduationCap,
  Coffee,
} from 'lucide-react'

import { CannabisLayout } from '@/components/layout/CannabisLayout'
import { cn, trackCannabisEvent, formatCannabisDate } from '@/lib/cannabis-utils'
import type { CannabisSEOData } from '@/types/cannabis-marketing'

// ============================================================================
// CANNABIS ABOUT PAGE DATA
// ============================================================================

interface CannabisTeamMember {
  id: string
  name: string
  role: string
  department: 'leadership' | 'engineering' | 'compliance' | 'sales' | 'support'
  bio: string
  image: string
  experience: string
  expertise: string[]
  education?: string
  location: string
  social: {
    linkedin?: string
    twitter?: string
    email?: string
  }
  featured: boolean
}

const CANNABIS_COMPANY_STATS = [
  { label: 'Cannabis Customers', value: '2,500+', icon: Users },
  { label: 'States Supported', value: '19+', icon: Globe },
  { label: 'Years of Experience', value: '8+', icon: Calendar },
  { label: 'Compliance Score', value: '99.8%', icon: Shield },
]

const CANNABIS_COMPANY_VALUES = [
  {
    icon: Shield,
    title: 'Cannabis Compliance First',
    description: 'Every decision prioritizes cannabis regulatory compliance and customer protection',
    color: 'cannabis-green',
  },
  {
    icon: Heart,
    title: 'Customer Success',
    description: 'We succeed only when cannabis operators achieve their compliance and business goals',
    color: 'cannabis-blue',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'Continuous innovation in cannabis technology while maintaining regulatory excellence',
    color: 'cannabis-green',
  },
  {
    icon: Users,
    title: 'Industry Partnership',
    description: 'Collaborative approach with cannabis businesses, regulators, and industry organizations',
    color: 'cannabis-blue',
  },
]

const CANNABIS_TEAM_MEMBERS: CannabisTeamMember[] = [
  {
    id: 'sarah-chen',
    name: 'Sarah Chen',
    role: 'CEO & Co-Founder',
    department: 'leadership',
    bio: 'Former cannabis regulatory attorney with 12+ years in cannabis law and compliance. Led the legal teams for three successful cannabis license applications in Colorado and New Mexico.',
    image: '/team/sarah-chen-ceo.jpg',
    experience: '12+ years cannabis law',
    expertise: ['Cannabis Regulation', 'Legal Compliance', 'Business Strategy', 'Licensing'],
    education: 'JD Harvard Law, Cannabis Law Certificate',
    location: 'Albuquerque, NM',
    social: {
      linkedin: 'https://linkedin.com/in/sarahchen-cannabis',
      email: 'sarah@cultivateco.com',
    },
    featured: true,
  },
  {
    id: 'mike-rodriguez',
    name: 'Mike Rodriguez',
    role: 'CTO & Co-Founder',
    department: 'leadership',
    bio: 'Former software engineer at major fintech companies with expertise in regulatory compliance systems. Built the first version of CultivateCo in 2016.',
    image: '/team/mike-rodriguez-cto.jpg',
    experience: '15+ years software engineering',
    expertise: ['Software Architecture', 'Compliance Systems', 'METRC Integration', 'Data Security'],
    education: 'MS Computer Science, Stanford',
    location: 'Denver, CO',
    social: {
      linkedin: 'https://linkedin.com/in/mikerodriguez-tech',
      twitter: 'https://twitter.com/mike_cannabis_tech',
      email: 'mike@cultivateco.com',
    },
    featured: true,
  },
  {
    id: 'jennifer-kim',
    name: 'Jennifer Kim',
    role: 'VP of Cannabis Compliance',
    department: 'compliance',
    bio: 'Former state cannabis regulator with 10 years at Colorado Department of Revenue. Expert in METRC systems and multi-state cannabis compliance requirements.',
    image: '/team/jennifer-kim-compliance.jpg',
    experience: '10+ years regulatory experience',
    expertise: ['State Cannabis Regulations', 'METRC Systems', 'Compliance Auditing', 'Policy Development'],
    education: 'MBA Cannabis Management, MS Regulatory Affairs',
    location: 'Denver, CO',
    social: {
      linkedin: 'https://linkedin.com/in/jenniferkim-compliance',
      email: 'jennifer@cultivateco.com',
    },
    featured: true,
  },
  {
    id: 'david-thompson',
    name: 'David Thompson',
    role: 'VP of Engineering',
    department: 'engineering',
    bio: 'Led engineering teams at three successful SaaS startups. Specializes in scalable systems and cannabis industry integrations with focus on security and reliability.',
    image: '/team/david-thompson-engineering.jpg',
    experience: '12+ years engineering leadership',
    expertise: ['System Architecture', 'Cannabis Integrations', 'Team Leadership', 'Security'],
    education: 'BS Computer Engineering, MIT',
    location: 'Boulder, CO',
    social: {
      linkedin: 'https://linkedin.com/in/davidthompson-engineering',
      email: 'david@cultivateco.com',
    },
    featured: true,
  },
  {
    id: 'lisa-martinez',
    name: 'Lisa Martinez',
    role: 'Head of Customer Success',
    department: 'support',
    bio: 'Cannabis industry veteran with 8 years helping dispensaries and cultivation facilities optimize their operations and maintain compliance.',
    image: '/team/lisa-martinez-success.jpg',
    experience: '8+ years cannabis operations',
    expertise: ['Cannabis Operations', 'Customer Training', 'Process Optimization', 'Compliance Support'],
    education: 'BA Business Administration, Cannabis Certificate',
    location: 'Albuquerque, NM',
    social: {
      linkedin: 'https://linkedin.com/in/lisamartinez-cannabis',
      email: 'lisa@cultivateco.com',
    },
    featured: true,
  },
  {
    id: 'robert-taylor',
    name: 'Robert Taylor',
    role: 'VP of Sales',
    department: 'sales',
    bio: 'Former cannabis business owner and industry sales leader. Understands the challenges facing cannabis operators and helps businesses find the right compliance solutions.',
    image: '/team/robert-taylor-sales.jpg',
    experience: '6+ years cannabis business',
    expertise: ['Cannabis Business Development', 'Industry Relationships', 'Sales Strategy', 'Market Analysis'],
    education: 'MBA Marketing, Cannabis Business Certificate',
    location: 'Denver, CO',
    social: {
      linkedin: 'https://linkedin.com/in/roberttaylor-cannabis',
      email: 'robert@cultivateco.com',
    },
    featured: true,
  },
]

const CANNABIS_COMPANY_TIMELINE = [
  {
    year: '2016',
    title: 'CultivateCo Founded',
    description: 'Founded by Sarah Chen and Mike Rodriguez to address cannabis compliance challenges in Colorado',
    icon: Lightbulb,
    color: 'cannabis-green',
  },
  {
    year: '2017',
    title: 'First METRC Integration',
    description: 'Launched comprehensive METRC integration serving Colorado cannabis businesses',
    icon: Shield,
    color: 'cannabis-blue',
  },
  {
    year: '2018',
    title: 'Multi-State Expansion',
    description: 'Expanded to New Mexico and California, serving 100+ cannabis operators',
    icon: Globe,
    color: 'cannabis-green',
  },
  {
    year: '2019',
    title: 'Series A Funding',
    description: 'Raised $5M Series A to accelerate cannabis compliance technology development',
    icon: TrendingUp,
    color: 'cannabis-blue',
  },
  {
    year: '2020',
    title: 'AI Compliance Engine',
    description: 'Launched AI-powered violation prevention system, reducing violations by 95%',
    icon: Zap,
    color: 'cannabis-green',
  },
  {
    year: '2021',
    title: '1,000+ Customers',
    description: 'Reached milestone of serving over 1,000 cannabis businesses across 15+ states',
    icon: Users,
    color: 'cannabis-blue',
  },
  {
    year: '2022',
    title: 'Enterprise Platform',
    description: 'Launched enterprise platform for multi-state cannabis operations and MSOs',
    icon: Building2,
    color: 'cannabis-green',
  },
  {
    year: '2023',
    title: '19 States Supported',
    description: 'Expanded cannabis compliance support to 19+ states with comprehensive METRC integration',
    icon: Award,
    color: 'cannabis-blue',
  },
  {
    year: '2024',
    title: '2,500+ Cannabis Customers',
    description: 'Now serving over 2,500 cannabis businesses with industry-leading compliance platform',
    icon: Star,
    color: 'cannabis-green',
  },
]

const CANNABIS_OFFICE_LOCATIONS = [
  {
    city: 'Albuquerque',
    state: 'New Mexico',
    type: 'Headquarters',
    address: '2500 Louisiana Blvd NE, Suite 200',
    description: 'Cannabis compliance headquarters and customer success center',
    image: '/offices/albuquerque-hq.jpg',
    employees: 45,
    opened: '2016',
    focus: ['Cannabis Compliance', 'Customer Success', 'Legal Affairs'],
  },
  {
    city: 'Denver',
    state: 'Colorado',
    type: 'Engineering Center',
    address: '1400 16th Street, Suite 300',
    description: 'Engineering, product development, and cannabis technology innovation',
    image: '/offices/denver-engineering.jpg',
    employees: 38,
    opened: '2018',
    focus: ['Engineering', 'Product Development', 'METRC Integration'],
  },
]

const CANNABIS_AWARDS_RECOGNITION = [
  {
    award: 'Best Cannabis Compliance Software',
    organization: 'Cannabis Industry Awards',
    year: '2023',
    description: 'Recognized for excellence in cannabis regulatory compliance technology',
  },
  {
    award: 'Top Cannabis Technology Company',
    organization: 'MJBizDaily',
    year: '2023',
    description: 'Named among top cannabis technology companies for innovation and growth',
  },
  {
    award: 'Cannabis Business Leadership Award',
    organization: 'New Mexico Cannabis Industry Association',
    year: '2022',
    description: 'Recognized for leadership in cannabis business technology and compliance',
  },
  {
    award: 'SOC 2 Type II Certification',
    organization: 'AICPA',
    year: '2022',
    description: 'Achieved SOC 2 Type II compliance for cannabis data security and controls',
  },
]

// ============================================================================
// CANNABIS ANIMATION VARIANTS
// ============================================================================

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 60 },
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

const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
}

// ============================================================================
// CANNABIS ABOUT COMPONENTS
// ============================================================================

const CannabisTeamMemberCard: React.FC<{
  member: CannabisTeamMember
  onClick: (member: CannabisTeamMember) => void
}> = ({ member, onClick }) => {
  const handleClick = () => {
    onClick(member)
    trackCannabisEvent('cannabis_team_member_click', {
      member_name: member.name,
      member_role: member.role,
      member_department: member.department,
    })
  }

  return (
    <motion.div
      variants={scaleInVariants}
      className="bg-white rounded-2xl p-8 shadow-cannabis hover:shadow-cannabis-lg transition-all duration-300 cursor-pointer group"
      onClick={handleClick}
    >
      <div className="space-y-6">
        {/* Team Member Photo */}
        <div className="relative w-32 h-32 mx-auto">
          <div className="relative w-full h-full rounded-full overflow-hidden bg-cannabis-green-100">
            <Image
              src={member.image}
              alt={`${member.name} - ${member.role}`}
              width={128}
              height={128}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-cannabis-green-600 rounded-full flex items-center justify-center">
            <CheckCircle className="h-5 w-5 text-white" />
          </div>
        </div>

        {/* Team Member Info */}
        <div className="text-center space-y-3">
          <div>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-cannabis-green-700 transition-colors">
              {member.name}
            </h3>
            <p className="text-cannabis-green-600 font-medium">{member.role}</p>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 mt-1">
              <MapPin className="h-4 w-4" />
              <span>{member.location}</span>
            </div>
          </div>

          <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
            {member.bio}
          </p>

          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-900">{member.experience}</div>
            
            <div className="flex flex-wrap justify-center gap-1">
              {member.expertise.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 bg-cannabis-green-100 text-cannabis-green-700 text-xs rounded"
                >
                  {skill}
                </span>
              ))}
              {member.expertise.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                  +{member.expertise.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-3 pt-4">
            {member.social.email && (
              
                href={`mailto:${member.social.email}`}
                className="p-2 bg-gray-100 hover:bg-cannabis-green-100 text-gray-600 hover:text-cannabis-green-600 rounded-lg transition-colors"
              >
                <Mail className="h-4 w-4" />
              </a>
            )}
            {member.social.linkedin && (
              
                href={member.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-100 hover:bg-cannabis-green-100 text-gray-600 hover:text-cannabis-green-600 rounded-lg transition-colors"
              >
                <LinkedIn className="h-4 w-4" />
              </a>
            )}
            {member.social.twitter && (
              
                href={member.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-100 hover:bg-cannabis-green-100 text-gray-600 hover:text-cannabis-green-600 rounded-lg transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ============================================================================
// CANNABIS ABOUT PAGE SECTIONS
// ============================================================================

const CannabisAboutHeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cannabis-green-700 to-cannabis-blue-700 text-white py-20 lg:py-32">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* About Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainerVariants}
            className="space-y-8"
          >
            <motion.div variants={fadeInUpVariants} className="space-y-6">
              <div className="inline-flex items-center space-x-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium">
                <Users className="h-4 w-4" />
                <span>Cannabis Industry Leaders</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                About
                <span className="block">CultivateCo</span>
              </h1>
              
              <p className="text-xl opacity-90 leading-relaxed">
                Founded by cannabis industry veterans, CultivateCo is dedicated to helping 
                cannabis businesses achieve perfect regulatory compliance while growing 
                their operations with confidence.
              </p>
            </motion.div>

            <motion.div variants={fadeInUpVariants} className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/demo"
                className="inline-flex items-center justify-center space-x-2 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-cannabis-green-700 hover:bg-cannabis-cream-50 transition-all duration-200 hover:scale-105"
              >
                <span>Meet Our Team</span>
                <Users className="h-5 w-5" />
              </Link>
              
              <Link
                href="/contact"
                className="inline-flex items-center justify-center space-x-2 rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold text-white hover:bg-white/10 transition-all duration-200"
              >
                <span>Contact Us</span>
                <Mail className="h-5 w-5" />
              </Link>
            </motion.div>

            {/* Company Stats */}
            <motion.div variants={fadeInUpVariants} className="pt-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {CANNABIS_COMPANY_STATS.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <div key={stat.label} className="text-center">
                      <Icon className="h-8 w-8 mx-auto mb-2 opacity-75" />
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-sm opacity-75">{stat.label}</div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* About Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/about/cultivateco-team-photo.jpg"
                alt="CultivateCo Cannabis Team"
                width={600}
                height={400}
                className="w-full h-auto"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const CannabisMissionValuesSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-cannabis-cream-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUpVariants}>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              Our Mission &
              <span className="block text-cannabis-green-700">Values</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              CultivateCo exists to empower cannabis businesses with the technology, 
              expertise, and confidence needed to thrive in a regulated industry.
            </p>
          </motion.div>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUpVariants}
          className="bg-white rounded-2xl p-8 shadow-cannabis mb-16"
        >
          <div className="text-center space-y-6">
            <Target className="h-16 w-16 text-cannabis-green-600 mx-auto" />
            <h3 className="text-3xl font-bold text-gray-900">Our Mission</h3>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              To provide cannabis businesses with industry-leading compliance technology 
              that simplifies regulatory requirements, prevents violations, and enables 
              sustainable growth in legal cannabis markets. We believe every cannabis 
              operator deserves access to tools that make compliance effortless and 
              business growth achievable.
            </p>
          </div>
        </motion.div>

        {/* Company Values */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {CANNABIS_COMPANY_VALUES.map((value, index) => {
            const Icon = value.icon
            return (
              <motion.div
                key={value.title}
                variants={scaleInVariants}
                className="bg-white rounded-2xl p-6 shadow-cannabis text-center hover:shadow-cannabis-lg transition-all duration-300"
              >
                <div className={cn(
                  'w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center',
                  value.color === 'cannabis-green' 
                    ? 'bg-cannabis-green-100 text-cannabis-green-600'
                    : 'bg-cannabis-blue-100 text-cannabis-blue-600'
                )}>
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

const CannabisTeamSection: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<CannabisTeamMember | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const featuredTeam = CANNABIS_TEAM_MEMBERS.filter(member => member.featured)

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUpVariants}>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              Cannabis Industry
              <span className="block text-cannabis-green-700">Experts</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our team combines deep cannabis industry experience with technology expertise 
              to deliver the most comprehensive compliance platform in the industry.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featuredTeam.map((member) => (
            <CannabisTeamMemberCard
              key={member.id}
              member={member}
              onClick={setSelectedMember}
            />
          ))}
        </motion.div>

        {/* Team Stats */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUpVariants}
          className="mt-16 bg-cannabis-green-50 rounded-2xl p-8"
        >
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-cannabis-green-700">85+</div>
              <div className="text-sm text-gray-600">Team Members</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cannabis-green-700">50+</div>
              <div className="text-sm text-gray-600">Years Combined Cannabis Experience</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cannabis-green-700">25+</div>
              <div className="text-sm text-gray-600">Former Cannabis Operators</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cannabis-green-700">100%</div>
              <div className="text-sm text-gray-600">Remote-Friendly</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const CannabisTimelineSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUpVariants}>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              Cannabis Industry
              <span className="block text-cannabis-green-700">Journey</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From a small team solving Colorado cannabis compliance challenges 
              to serving 2,500+ cannabis businesses across 19+ states.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
          className="relative max-w-4xl mx-auto"
        >
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-cannabis-green-200 transform md:-translate-x-1/2" />

          <div className="space-y-12">
            {CANNABIS_COMPANY_TIMELINE.map((milestone, index) => {
              const Icon = milestone.icon
              const isEven = index % 2 === 0
              
              return (
                <motion.div
                  key={milestone.year}
                  variants={fadeInUpVariants}
                  className={cn(
                    'relative flex items-center',
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  )}
                >
                  {/* Timeline Node */}
                  <div className={cn(
                    'absolute left-8 md:left-1/2 w-6 h-6 rounded-full flex items-center justify-center transform md:-translate-x-1/2 z-10',
                    milestone.color === 'cannabis-green' ? 'bg-cannabis-green-600' : 'bg-cannabis-blue-600'
                  )}>
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>

                  {/* Content */}
                  <div className={cn(
                    'ml-20 md:ml-0 md:w-5/12 bg-white rounded-2xl p-6 shadow-cannabis',
                    isEven ? 'md:mr-auto md:ml-0' : 'md:ml-auto md:mr-0'
                  )}>
                    <div className="flex items-start space-x-4">
                      <div className={cn(
                        'p-3 rounded-lg flex-shrink-0',
                        milestone.color === 'cannabis-green' 
                          ? 'bg-cannabis-green-100 text-cannabis-green-600'
                          : 'bg-cannabis-blue-100 text-cannabis-blue-600'
                      )}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <div className={cn(
                          'text-lg font-bold mb-1',
                          milestone.color === 'cannabis-green' ? 'text-cannabis-green-700' : 'text-cannabis-blue-700'
                        )}>
                          {milestone.year}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-gray-600">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const CannabisOfficesSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUpVariants}>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              Cannabis Office
              <span className="block text-cannabis-green-700">Locations</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Strategic locations in key cannabis markets to better serve our 
              customers and stay close to industry developments.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
          className="grid lg:grid-cols-2 gap-12"
        >
          {CANNABIS_OFFICE_LOCATIONS.map((office, index) => (
            <motion.div
              key={office.city}
              variants={scaleInVariants}
              className="bg-cannabis-cream-50 rounded-2xl overflow-hidden shadow-cannabis hover:shadow-cannabis-lg transition-all duration-300"
            >
              <div className="relative h-48">
                <Image
                  src={office.image}
                  alt={`CultivateCo ${office.city} Office`}
                  width={600}
                  height={300}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold">{office.city}, {office.state}</h3>
                  <p className="text-sm opacity-90">{office.type}</p>
                </div>
              </div>

              <div className="p-8 space-y-6">
                <p className="text-gray-700">{office.description}</p>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-white rounded-lg p-4">
                    <Users className="h-6 w-6 text-cannabis-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{office.employees}</div>
                    <div className="text-sm text-gray-600">Team Members</div>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <Calendar className="h-6 w-6 text-cannabis-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{office.opened}</div>
                    <div className="text-sm text-gray-600">Established</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Focus Areas:</h4>
                  <div className="flex flex-wrap gap-2">
                    {office.focus.map((area) => (
                      <span
                        key={area}
                        className="px-3 py-1 bg-cannabis-green-100 text-cannabis-green-700 text-sm rounded-full"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{office.address}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

const CannabisAwardsSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-cannabis-cream-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUpVariants}>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              Awards &
              <span className="block text-cannabis-green-700">Recognition</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Recognition from cannabis industry organizations and technology leaders 
              for excellence in cannabis compliance and innovation.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
          className="grid md:grid-cols-2 gap-8"
        >
          {CANNABIS_AWARDS_RECOGNITION.map((award, index) => (
            <motion.div
              key={award.award}
              variants={scaleInVariants}
              className="bg-white rounded-2xl p-8 shadow-cannabis hover:shadow-cannabis-lg transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <Award className="h-8 w-8 text-cannabis-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{award.award}</h3>
                    <div className="text-cannabis-green-600 font-medium mb-1">
                      {award.organization} • {award.year}
                    </div>
                    <p className="text-gray-600 text-sm">{award.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

const CannabisAboutCTASection: React.FC = () => {
  const handleJoinTeamClick = () => {
    trackCannabisEvent('cannabis_join_team_click', {
      source: 'about_cta',
      button_text: 'Join Our Team'
    })
  }

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-cannabis-green-700 to-cannabis-blue-700 text-white">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainerVariants}
          className="space-y-8"
        >
          <motion.div variants={fadeInUpVariants}>
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Ready to Join the
              <span className="block">Cannabis Revolution?</span>
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Whether you're a cannabis business looking for compliance solutions or 
              a talented professional wanting to make an impact in the cannabis industry, 
              we'd love to hear from you.
            </p>
          </motion.div>

          <motion.div variants={fadeInUpVariants} className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center space-x-2 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-cannabis-green-700 hover:bg-cannabis-cream-50 transition-all duration-200 hover:scale-105"
            >
              <span>Contact Our Team</span>
              <Mail className="h-5 w-5" />
            </Link>
            
            <button
              onClick={handleJoinTeamClick}
              className="inline-flex items-center justify-center space-x-2 rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold text-white hover:bg-white/10 transition-all duration-200"
            >
              <span>Join Our Team</span>
              <Users className="h-5 w-5" />
            </button>
          </motion.div>

          <motion.div variants={fadeInUpVariants} className="pt-8">
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm opacity-75">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>2,500+ cannabis customers</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>8+ years cannabis experience</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>Industry-leading compliance</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// MAIN CANNABIS ABOUT PAGE COMPONENT
// ============================================================================

const CannabisAboutPage: React.FC = () => {
  const seo: CannabisSEOData = {
    title: 'About CultivateCo | Cannabis Industry Experts | Company & Team',
    description: 'Learn about CultivateCo\'s cannabis industry experts, company mission, and team. 8+ years serving 2,500+ cannabis businesses with industry-leading compliance technology.',
    keywords: [
      'about cultivateco',
      'cannabis industry experts',
      'cannabis compliance company',
      'cannabis technology team',
      'cannabis business leaders',
      'cannabis industry experience',
      'cannabis compliance experts',
      'cannabis company information',
      'cannabis platform team',
      'cannabis industry leadership',
    ],
    ogTitle: 'About CultivateCo | Cannabis Industry Experts & Company Team',
    ogDescription: 'Meet CultivateCo\'s cannabis industry experts with 8+ years experience serving 2,500+ cannabis businesses. Learn about our mission and team.',
    ogImage: 'https://cultivateco.com/og-about-cultivateco-team.jpg',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'CultivateCo',
      description: 'Cannabis compliance and technology company serving cannabis businesses',
      foundingDate: '2016',
      founder: [
        {
          '@type': 'Person',
          name: 'Sarah Chen',
          jobTitle: 'CEO & Co-Founder',
        },
        {
          '@type': 'Person',
          name: 'Mike Rodriguez',
          jobTitle: 'CTO & Co-Founder',
        },
      ],
      address: {
        '@type': 'PostalAddress',
        streetAddress: '2500 Louisiana Blvd NE, Suite 200',
        addressLocality: 'Albuquerque',
        addressRegion: 'NM',
        postalCode: '87110',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+1-555-123-4567',
        contactType: 'customer service',
      },
    },
  }

  return (
    <CannabisLayout seo={seo}>
      <CannabisAboutHeroSection />
      <CannabisMissionValuesSection />
      <CannabisTeamSection />
      <CannabisTimelineSection />
      <CannabisOfficesSection />
      <CannabisAwardsSection />
      <CannabisAboutCTASection />
    </CannabisLayout>
  )
}

export default CannabisAboutPage
