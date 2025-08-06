/**
 * =============================================================================
 * CultivateCo Cannabis Resources Hub
 * =============================================================================
 * Comprehensive cannabis industry resources, guides, and insights
 */

'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  BookOpen,
  FileText,
  Video,
  Headphones,
  Download,
  Calendar,
  TrendingUp,
  Shield,
  Users,
  Building2,
  Award,
  Star,
  Clock,
  Eye,
  ThumbsUp,
  Search,
  Filter,
  ExternalLink,
  Play,
  CheckCircle,
  AlertTriangle,
  Target,
  BarChart3,
  Globe,
  Smartphone,
  Mail,
} from 'lucide-react'

import { CannabisLayout } from '@/components/layout/CannabisLayout'
import { cn, trackCannabisEvent, formatCannabisDate } from '@/lib/cannabis-utils'
import type { CannabisSEOData } from '@/types/cannabis-marketing'

// ============================================================================
// CANNABIS RESOURCES DATA
// ============================================================================

interface CannabisResource {
  id: string
  title: string
  description: string
  type: 'guide' | 'case-study' | 'whitepaper' | 'webinar' | 'blog' | 'template' | 'video'
  category: 'compliance' | 'operations' | 'marketing' | 'finance' | 'technology' | 'legal'
  publishDate: string
  readTime: number
  views: number
  downloads?: number
  featured: boolean
  image: string
  author: {
    name: string
    role: string
    image: string
  }
  tags: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  premium: boolean
}

const CANNABIS_FEATURED_RESOURCES: CannabisResource[] = [
  {
    id: 'complete-metrc-guide-2024',
    title: 'Complete METRC Compliance Guide for Cannabis Operators',
    description: 'Comprehensive guide covering METRC setup, daily operations, common violations, and best practices for maintaining perfect compliance across all supported states.',
    type: 'guide',
    category: 'compliance',
    publishDate: '2024-01-15',
    readTime: 25,
    views: 15420,
    downloads: 3240,
    featured: true,
    image: '/resources/metrc-compliance-guide.jpg',
    author: {
      name: 'Sarah Mitchell',
      role: 'Cannabis Compliance Expert',
      image: '/team/sarah-mitchell.jpg',
    },
    tags: ['METRC', 'Compliance', 'State Tracking', 'Regulatory'],
    difficulty: 'intermediate',
    premium: false,
  },
  {
    id: 'cannabis-280e-tax-optimization',
    title: 'Cannabis 280E Tax Optimization Strategies',
    description: 'Advanced strategies for minimizing 280E tax impact, maximizing deductions, and implementing compliant cost accounting systems for cannabis businesses.',
    type: 'whitepaper',
    category: 'finance',
    publishDate: '2024-02-08',
    readTime: 18,
    views: 9850,
    downloads: 1920,
    featured: true,
    image: '/resources/280e-tax-strategies.jpg',
    author: {
      name: 'David Chen',
      role: 'Cannabis Tax Specialist',
      image: '/team/david-chen.jpg',
    },
    tags: ['280E', 'Taxation', 'Accounting', 'Finance'],
    difficulty: 'advanced',
    premium: true,
  },
  {
    id: 'dispensary-operations-case-study',
    title: 'How Green Valley Cannabis Increased Efficiency by 300%',
    description: 'Detailed case study showing how a Colorado dispensary chain streamlined operations, reduced compliance violations by 95%, and tripled their operational efficiency.',
    type: 'case-study',
    category: 'operations',
    publishDate: '2024-01-28',
    readTime: 12,
    views: 12630,
    downloads: 2840,
    featured: true,
    image: '/resources/green-valley-case-study.jpg',
    author: {
      name: 'Mike Rodriguez',
      role: 'Cannabis Operations Consultant',
      image: '/team/mike-rodriguez.jpg',
    },
    tags: ['Case Study', 'Operations', 'Efficiency', 'Colorado'],
    difficulty: 'beginner',
    premium: false,
  },
]

const CANNABIS_RESOURCE_CATEGORIES = [
  {
    id: 'compliance',
    name: 'Cannabis Compliance',
    description: 'Regulatory guides, compliance checklists, and violation prevention strategies',
    icon: Shield,
    color: 'cannabis-green',
    count: 24,
    resources: [
      {
        id: 'state-compliance-checklist',
        title: 'Multi-State Cannabis Compliance Checklist',
        description: 'Essential checklist for maintaining compliance across different cannabis legal states',
        type: 'template' as const,
        category: 'compliance' as const,
        publishDate: '2024-02-01',
        readTime: 8,
        views: 8420,
        featured: false,
        image: '/resources/compliance-checklist.jpg',
        author: {
          name: 'Jennifer Walsh',
          role: 'Compliance Specialist',
          image: '/team/jennifer-walsh.jpg',
        },
        tags: ['Checklist', 'Multi-State', 'Template'],
        difficulty: 'beginner' as const,
        premium: false,
      },
      {
        id: 'violation-prevention-playbook',
        title: 'Cannabis Violation Prevention Playbook',
        description: 'Step-by-step playbook for preventing common cannabis compliance violations',
        type: 'guide' as const,
        category: 'compliance' as const,
        publishDate: '2024-01-22',
        readTime: 15,
        views: 6230,
        featured: false,
        image: '/resources/violation-prevention.jpg',
        author: {
          name: 'Robert Kim',
          role: 'Cannabis Attorney',
          image: '/team/robert-kim.jpg',
        },
        tags: ['Violations', 'Prevention', 'Legal'],
        difficulty: 'intermediate' as const,
        premium: true,
      },
    ],
  },
  {
    id: 'operations',
    name: 'Cannabis Operations',
    description: 'Operational excellence guides, efficiency optimization, and best practices',
    icon: Building2,
    color: 'cannabis-blue',
    count: 18,
    resources: [
      {
        id: 'inventory-optimization-guide',
        title: 'Cannabis Inventory Optimization Guide',
        description: 'Comprehensive guide to optimizing cannabis inventory management and reducing waste',
        type: 'guide' as const,
        category: 'operations' as const,
        publishDate: '2024-02-05',
        readTime: 20,
        views: 4820,
        featured: false,
        image: '/resources/inventory-optimization.jpg',
        author: {
          name: 'Lisa Park',
          role: 'Operations Manager',
          image: '/team/lisa-park.jpg',
        },
        tags: ['Inventory', 'Optimization', 'Waste Reduction'],
        difficulty: 'intermediate' as const,
        premium: false,
      },
    ],
  },
  {
    id: 'finance',
    name: 'Cannabis Finance',
    description: 'Financial management, tax strategies, and accounting best practices',
    icon: BarChart3,
    color: 'cannabis-green',
    count: 15,
    resources: [
      {
        id: 'cannabis-financial-planning',
        title: 'Cannabis Business Financial Planning Template',
        description: 'Professional financial planning template designed specifically for cannabis businesses',
        type: 'template' as const,
        category: 'finance' as const,
        publishDate: '2024-02-10',
        readTime: 5,
        views: 3210,
        downloads: 840,
        featured: false,
        image: '/resources/financial-planning-template.jpg',
        author: {
          name: 'Amanda Foster',
          role: 'Cannabis CFO',
          image: '/team/amanda-foster.jpg',
        },
        tags: ['Financial Planning', 'Template', 'Business Plan'],
        difficulty: 'intermediate' as const,
        premium: true,
      },
    ],
  },
  {
    id: 'marketing',
    name: 'Cannabis Marketing',
    description: 'Marketing strategies, customer retention, and brand building guides',
    icon: TrendingUp,
    color: 'cannabis-blue',
    count: 12,
    resources: [],
  },
  {
    id: 'technology',
    name: 'Cannabis Technology',
    description: 'Technology implementation, software selection, and digital transformation',
    icon: Smartphone,
    color: 'cannabis-green',
    count: 9,
    resources: [],
  },
  {
    id: 'legal',
    name: 'Cannabis Legal',
    description: 'Legal insights, regulatory updates, and industry analysis',
    icon: FileText,
    color: 'cannabis-blue',
    count: 8,
    resources: [],
  },
]

const CANNABIS_UPCOMING_WEBINARS = [
  {
    id: 'metrc-masterclass-march',
    title: 'METRC Masterclass: Advanced Compliance Strategies',
    description: 'Deep dive into advanced METRC features and compliance optimization techniques',
    date: '2024-03-15',
    time: '2:00 PM MT',
    presenter: 'Sarah Mitchell',
    presenterRole: 'Cannabis Compliance Expert',
    registrations: 420,
    image: '/webinars/metrc-masterclass.jpg',
  },
  {
    id: '280e-tax-workshop-march',
    title: '280E Tax Workshop: Maximizing Cannabis Deductions',
    description: 'Learn advanced strategies for minimizing 280E tax impact on your cannabis business',
    date: '2024-03-22',
    time: '1:00 PM MT',
    presenter: 'David Chen',
    presenterRole: 'Cannabis Tax Specialist',
    registrations: 380,
    image: '/webinars/280e-workshop.jpg',
  },
  {
    id: 'cannabis-operations-optimization',
    title: 'Cannabis Operations Optimization Bootcamp',
    description: 'Comprehensive training on streamlining cannabis operations for maximum efficiency',
    date: '2024-03-29',
    time: '3:00 PM MT',
    presenter: 'Mike Rodriguez',
    presenterRole: 'Operations Consultant',
    registrations: 315,
    image: '/webinars/operations-bootcamp.jpg',
  },
]

const CANNABIS_RESOURCE_STATS = [
  { label: 'Industry Resources', value: '100+', icon: BookOpen },
  { label: 'Expert Authors', value: '25+', icon: Users },
  { label: 'Monthly Downloads', value: '15K+', icon: Download },
  { label: 'Customer Rating', value: '4.9/5', icon: Star },
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
// CANNABIS RESOURCES COMPONENTS
// ============================================================================

const CannabisResourceCard: React.FC<{
  resource: CannabisResource
  variant?: 'default' | 'featured' | 'compact'
}> = ({ resource, variant = 'default' }) => {
  const handleResourceClick = () => {
    trackCannabisEvent('cannabis_resource_click', {
      resource_id: resource.id,
      resource_title: resource.title,
      resource_type: resource.type,
      resource_category: resource.category,
      featured: resource.featured,
    })
  }

  const getTypeIcon = () => {
    switch (resource.type) {
      case 'guide': return BookOpen
      case 'whitepaper': return FileText
      case 'case-study': return TrendingUp
      case 'webinar': return Video
      case 'template': return Download
      case 'blog': return Mail
      default: return FileText
    }
  }

  const TypeIcon = getTypeIcon()

  if (variant === 'featured') {
    return (
      <motion.div
        variants={scaleInVariants}
        className="bg-white rounded-2xl shadow-cannabis hover:shadow-cannabis-lg transition-all duration-300 overflow-hidden group cursor-pointer"
        onClick={handleResourceClick}
      >
        <div className="relative h-64">
          <Image
            src={resource.image}
            alt={resource.title}
            width={600}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          <div className="absolute top-4 left-4">
            <div className={cn(
              'inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium text-white',
              resource.category === 'compliance' ? 'bg-cannabis-green-600' :
              resource.category === 'operations' ? 'bg-cannabis-blue-600' :
              resource.category === 'finance' ? 'bg-purple-600' :
              'bg-gray-600'
            )}>
              <TypeIcon className="h-3 w-3" />
              <span className="capitalize">{resource.type.replace('-', ' ')}</span>
            </div>
          </div>

          {resource.premium && (
            <div className="absolute top-4 right-4">
              <div className="bg-yellow-500 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold">
                PREMIUM
              </div>
            </div>
          )}

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h3 className="text-xl font-bold mb-2 group-hover:text-cannabis-green-300 transition-colors">
              {resource.title}
            </h3>
            <p className="text-sm opacity-90 line-clamp-2">
              {resource.description}
            </p>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{resource.readTime} min read</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="h-4 w-4" />
              <span>{resource.views.toLocaleString()} views</span>
            </div>
            {resource.downloads && (
              <div className="flex items-center space-x-1">
                <Download className="h-4 w-4" />
                <span>{resource.downloads.toLocaleString()} downloads</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative w-8 h-8 rounded-full overflow-hidden bg-cannabis-green-100">
                <Image
                  src={resource.author.image}
                  alt={resource.author.name}
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">{resource.author.name}</div>
                <div className="text-xs text-gray-600">{resource.author.role}</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1">
              {resource.tags.slice(0, 2).map(tag => (
                <span key={tag} className="px-2 py-1 bg-cannabis-green-100 text-cannabis-green-700 text-xs rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <button className="w-full flex items-center justify-center space-x-2 bg-cannabis-green-600 hover:bg-cannabis-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
            <span>{resource.type === 'template' || resource.type === 'whitepaper' ? 'Download' : 'Read'} Now</span>
            {resource.type === 'template' || resource.type === 'whitepaper' ? 
              <Download className="h-4 w-4" /> : 
              <ArrowRight className="h-4 w-4" />
            }
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={scaleInVariants}
      className="bg-white rounded-xl border border-gray-200 p-6 hover:border-cannabis-green-200 hover:shadow-cannabis transition-all duration-300 cursor-pointer"
      onClick={handleResourceClick}
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className={cn(
              'p-2 rounded-lg',
              resource.category === 'compliance' ? 'bg-cannabis-green-100 text-cannabis-green-600' :
              resource.category === 'operations' ? 'bg-cannabis-blue-100 text-cannabis-blue-600' :
              resource.category === 'finance' ? 'bg-purple-100 text-purple-600' :
              'bg-gray-100 text-gray-600'
            )}>
              <TypeIcon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 line-clamp-2">{resource.title}</h3>
              <div className="text-sm text-gray-600 capitalize">{resource.type.replace('-', ' ')}</div>
            </div>
          </div>
          
          {resource.premium && (
            <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">
              Premium
            </div>
          )}
        </div>

        <p className="text-gray-600 text-sm line-clamp-2">{resource.description}</p>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-3">
            <span>{resource.readTime} min</span>
            <span>{resource.views.toLocaleString()} views</span>
          </div>
          <span>{formatCannabisDate(resource.publishDate)}</span>
        </div>

        <div className="flex flex-wrap gap-1">
          {resource.tags.slice(0, 3).map(tag => (
            <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

const CannabisUpcomingWebinarCard: React.FC<{
  webinar: typeof CANNABIS_UPCOMING_WEBINARS[0]
}> = ({ webinar }) => {
  const handleWebinarClick = () => {
    trackCannabisEvent('cannabis_webinar_register_click', {
      webinar_id: webinar.id,
      webinar_title: webinar.title,
      webinar_date: webinar.date,
    })
  }

  return (
    <motion.div
      variants={scaleInVariants}
      className="bg-white rounded-xl border border-gray-200 p-6 hover:border-cannabis-green-200 hover:shadow-cannabis transition-all duration-300"
    >
      <div className="space-y-4">
        <div className="relative h-32 rounded-lg overflow-hidden">
          <Image
            src={webinar.image}
            alt={webinar.title}
            width={400}
            height={200}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-gray-900">{webinar.title}</h3>
          <p className="text-gray-600 text-sm">{webinar.description}</p>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-cannabis-green-600">
              <Calendar className="h-4 w-4" />
              <span>{formatCannabisDate(webinar.date)} at {webinar.time}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Users className="h-4 w-4" />
              <span>{webinar.registrations} registered</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-cannabis-green-100 rounded-full flex items-center justify-center">
            <span className="text-cannabis-green-600 text-xs font-bold">
              {webinar.presenter.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">{webinar.presenter}</div>
            <div className="text-xs text-gray-600">{webinar.presenterRole}</div>
          </div>
        </div>

        <button
          onClick={handleWebinarClick}
          className="w-full bg-cannabis-green-600 hover:bg-cannabis-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          Register Free
        </button>
      </div>
    </motion.div>
  )
}

// ============================================================================
// CANNABIS RESOURCES PAGE SECTIONS
// ============================================================================

const CannabisResourcesHeroSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    trackCannabisEvent('cannabis_resource_search', {
      search_query: searchQuery,
      source: 'hero_search',
    })
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cannabis-cream-50 to-white py-20 lg:py-32">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 cannabis-gradient rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cannabis-blue-500 rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainerVariants}
          className="max-w-4xl mx-auto space-y-8"
        >
          <motion.div variants={fadeInUpVariants} className="space-y-6">
            <div className="inline-flex items-center space-x-2 rounded-full bg-cannabis-green-100 px-4 py-2 text-sm font-medium text-cannabis-green-800">
              <BookOpen className="h-4 w-4" />
              <span>Cannabis Industry Resource Hub</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Cannabis
              <span className="block text-cannabis-green-700">Resources</span>
              <span className="block">& Insights</span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              Access comprehensive guides, case studies, templates, and expert insights 
              to help your cannabis business thrive in a complex regulatory environment.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div variants={fadeInUpVariants} className="max-w-2xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search cannabis compliance guides, case studies, templates..."
                  className="w-full pl-12 pr-16 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-cannabis-green-500 focus:border-cannabis-green-500 transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-cannabis-green-600 hover:bg-cannabis-green-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Search
                </button>
              </div>
            </form>
          </motion.div>

          <motion.div variants={fadeInUpVariants} className="grid md:grid-cols-4 gap-6">
            {CANNABIS_RESOURCE_STATS.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="text-center p-4 bg-white rounded-lg shadow-cannabis">
                  <Icon className="h-6 w-6 mx-auto mb-2 text-cannabis-green-600" />
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

const CannabisFeaturedResourcesSection: React.FC = () => {
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
              Featured Cannabis
              <span className="block text-cannabis-green-700">Resources</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our most popular and highly-rated resources to help you navigate 
              cannabis compliance, operations, and business growth.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
          className="grid lg:grid-cols-3 gap-8"
        >
          {CANNABIS_FEATURED_RESOURCES.map((resource) => (
            <CannabisResourceCard
              key={resource.id}
              resource={resource}
              variant="featured"
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

const CannabisResourceCategoriesSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('compliance')
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const activeCategoryData = CANNABIS_RESOURCE_CATEGORIES.find(
    cat => cat.id === activeCategory
  )

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
              Cannabis Resource
              <span className="block text-cannabis-green-700">Categories</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our comprehensive library of cannabis industry resources 
              organized by category to find exactly what you need.
            </p>
          </motion.div>
        </motion.div>

        {/* Category Grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {CANNABIS_RESOURCE_CATEGORIES.map((category) => {
            const Icon = category.icon
            return (
              <motion.div
                key={category.id}
                variants={scaleInVariants}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  'p-8 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-cannabis',
                  activeCategory === category.id 
                    ? 'bg-white shadow-cannabis border-2 border-cannabis-green-200' 
                    : 'bg-white hover:border-cannabis-green-100 border-2 border-transparent'
                )}
              >
                <div className="space-y-4">
                  <div className={cn(
                    'w-16 h-16 rounded-full flex items-center justify-center',
                    category.color === 'cannabis-green' 
                      ? 'bg-cannabis-green-100 text-cannabis-green-600'
                      : 'bg-cannabis-blue-100 text-cannabis-blue-600'
                  )}>
                    <Icon className="h-8 w-8" />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
                    <p className="text-gray-600 text-sm">{category.description}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-cannabis-green-600">
                      {category.count} resources
                    </span>
                    <ArrowRight className={cn(
                      'h-4 w-4 transition-colors',
                      activeCategory === category.id 
                        ? 'text-cannabis-green-600' 
                        : 'text-gray-400'
                    )} />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Active Category Resources */}
        {activeCategoryData && activeCategoryData.resources.length > 0 && (
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {activeCategoryData.name} Resources
              </h3>
              <p className="text-gray-600">{activeCategoryData.description}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {activeCategoryData.resources.map((resource) => (
                <CannabisResourceCard
                  key={resource.id}
                  resource={resource}
                  variant="default"
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

const CannabisUpcomingWebinarsSection: React.FC = () => {
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
              Upcoming Cannabis
              <span className="block text-cannabis-green-700">Webinars</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our cannabis industry experts for live webinars covering compliance, 
              operations, and business growth strategies.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariants}
          className="grid lg:grid-cols-3 gap-8"
        >
          {CANNABIS_UPCOMING_WEBINARS.map((webinar) => (
            <CannabisUpcomingWebinarCard key={webinar.id} webinar={webinar} />
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUpVariants}
          className="text-center mt-12"
        >
          <Link
            href="/webinars"
            className="inline-flex items-center space-x-2 rounded-lg border-2 border-cannabis-green-600 px-8 py-3 text-cannabis-green-600 font-semibold hover:bg-cannabis-green-50 transition-colors"
          >
            <span>View All Webinars</span>
            <Video className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

const CannabisResourcesCTASection: React.FC = () => {
  const handleNewsletterSignup = () => {
    trackCannabisEvent('cannabis_newsletter_signup_click', {
      source: 'resources_cta',
      button_text: 'Subscribe to Newsletter'
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
              Stay Updated with
              <span className="block">Cannabis Industry Insights</span>
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Get the latest cannabis compliance guides, industry insights, and expert analysis 
              delivered directly to your inbox every week.
            </p>
          </motion.div>

          <motion.div variants={fadeInUpVariants} className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleNewsletterSignup}
              className="inline-flex items-center justify-center space-x-2 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-cannabis-green-700 hover:bg-cannabis-cream-50 transition-all duration-200 hover:scale-105"
            >
              <Mail className="h-5 w-5" />
              <span>Subscribe to Newsletter</span>
            </button>
            
            <Link
              href="/contact"
              className="inline-flex items-center justify-center space-x-2 rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold text-white hover:bg-white/10 transition-all duration-200"
            >
              <span>Request Custom Content</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>

          <motion.div variants={fadeInUpVariants} className="pt-8">
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm opacity-75">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>Weekly cannabis insights</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>Expert industry analysis</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>Exclusive resources</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ============================================================================
// MAIN CANNABIS RESOURCES PAGE COMPONENT
// ============================================================================

const CannabisResourcesPage: React.FC = () => {
  const seo: CannabisSEOData = {
    title: 'Cannabis Industry Resources | Guides, Templates & Insights | CultivateCo',
    description: '100+ cannabis industry resources including compliance guides, case studies, templates, and expert insights. Free access to METRC guides, 280E tax strategies, and operational best practices.',
    keywords: [
      'cannabis industry resources',
      'cannabis compliance guides',
      'cannabis business templates',
      'cannabis case studies',
      'metrc compliance guide',
      'cannabis 280e tax guide',
      'dispensary operations guide',
      'cannabis industry insights',
      'cannabis regulatory guides',
      'cannabis business resources',
    ],
    ogTitle: 'Cannabis Industry Resources | 100+ Guides, Templates & Insights',
    ogDescription: 'Access comprehensive cannabis compliance guides, operational templates, case studies, and expert insights. Free METRC guides, 280E tax strategies, and more.',
    ogImage: 'https://cultivateco.com/og-cannabis-resources-hub.jpg',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      name: 'Cannabis Industry Resource Hub',
      description: 'Comprehensive collection of cannabis business resources, guides, and insights',
      author: {
        '@type': 'Organization',
        name: 'CultivateCo',
      },
      publisher: {
        '@type': 'Organization',
        name: 'CultivateCo',
      },
      mainEntityOfPage: 'https://cultivateco.com/resources',
    },
  }

  return (
    <CannabisLayout seo={seo}>
      <CannabisResourcesHeroSection />
      <CannabisFeaturedResourcesSection />
      <CannabisResourceCategoriesSection />
      <CannabisUpcomingWebinarsSection />
      <CannabisResourcesCTASection />
    </CannabisLayout>
  )
}

export default CannabisResourcesPage
