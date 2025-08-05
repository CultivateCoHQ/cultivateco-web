import Link from 'next/link'
import { Metadata } from 'next'
import { ArrowRight, Shield, BarChart3, Zap, CheckCircle, Star, Users, TrendingUp } from 'lucide-react'
import { CannabisThemeContainer } from '@/providers/theme-provider'

/**
 * =============================================================================
 * CultivateCo Cannabis Marketing Homepage
 * =============================================================================
 * Professional cannabis compliance platform landing page
 */

export const metadata: Metadata = {
  title: 'CultivateCo - Cannabis Compliance Platform for Dispensaries',
  description: 'Professional cannabis compliance software for dispensaries. Real-time METRC integration, compliance monitoring, and business intelligence for cannabis retail operations.',
  openGraph: {
    title: 'CultivateCo - Cannabis Compliance Platform for Dispensaries',
    description: 'Professional cannabis compliance software with real-time METRC integration and business intelligence.',
    type: 'website',
    url: 'https://cultivateco.com',
  },
}

export default function CannabisHomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-cultivateco-cream">
      {/* Cannabis Marketing Navigation */}
      <CannabisMarketingHeader />
      
      {/* Cannabis Hero Section */}
      <CannabisHeroSection />
      
      {/* Cannabis Features Section */}
      <CannabisFeaturesSection />
      
      {/* Cannabis Social Proof */}
      <CannabisSocialProofSection />
      
      {/* Cannabis Pricing Section */}
      <CannabisPricingSection />
      
      {/* Cannabis CTA Section */}
      <CannabisCTASection />
      
      {/* Cannabis Marketing Footer */}
      <CannabisMarketingFooter />
    </div>
  )
}

/**
 * Cannabis marketing header with navigation
 */
function CannabisMarketingHeader() {
  return (
    <header className="bg-cultivateco-cream border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-cultivateco-cream/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* CultivateCo Brand Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-cultivateco-gradient rounded-lg flex items-center justify-center">
              <span className="text-cultivateco-cream font-bold text-sm">C</span>
            </div>
            <span className="text-xl font-bold text-cultivateco-green">CultivateCo</span>
          </div>
          
          {/* Cannabis Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="nav-link">Features</Link>
            <Link href="#pricing" className="nav-link">Pricing</Link>
            <Link href="#about" className="nav-link">About</Link>
            <Link href="/blog" className="nav-link">Resources</Link>
            <Link href="/contact" className="nav-link">Contact</Link>
          </nav>
          
          {/* Cannabis Action Buttons */}
          <div className="flex items-center space-x-4">
            <Link 
              href="/app/login" 
              className="text-cultivateco-blue hover:text-cultivateco-green transition-colors font-medium"
            >
              Sign In
            </Link>
            <Link 
              href="/app/signup" 
              className="btn-cultivateco-primary"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

/**
 * Cannabis hero section with value proposition
 */
function CannabisHeroSection() {
  return (
    <section className="bg-cultivateco-hero py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Cannabis Value Proposition */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-cultivateco-green/10 text-cultivateco-green text-sm font-medium">
                <Shield className="w-4 h-4 mr-2" />
                Cannabis Compliance Made Simple
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-cultivateco-green leading-tight">
                Professional Cannabis Compliance Platform for 
                <span className="text-cultivateco-blue"> Modern Dispensaries</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Streamline cannabis compliance, monitor regulations in real-time, and grow your dispensary with confidence. 
                Trusted by cannabis professionals across New Mexico and beyond.
              </p>
            </div>
            
            {/* Cannabis Key Benefits */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-cultivateco-green flex-shrink-0" />
                <span className="text-gray-700">Real-time METRC integration and state tracking</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-cultivateco-green flex-shrink-0" />
                <span className="text-gray-700">Automated compliance monitoring and violation alerts</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-cultivateco-green flex-shrink-0" />
                <span className="text-gray-700">Professional business intelligence and analytics</span>
              </div>
            </div>
            
            {/* Cannabis Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/app/signup" 
                className="btn-cultivateco-primary inline-flex items-center justify-center"
              >
                Start Free 14-Day Trial
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link 
                href="/demo" 
                className="btn-cultivateco-outline inline-flex items-center justify-center"
              >
                Watch Demo
              </Link>
            </div>
            
            {/* Cannabis Trust Indicators */}
            <div className="flex items-center space-x-6 pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-500">Trusted by 500+ dispensaries</div>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                ))}
                <span className="text-sm text-gray-600 ml-2">4.9/5 rating</span>
              </div>
            </div>
          </div>
          
          {/* Cannabis Dashboard Preview */}
          <div className="relative">
            <div className="bg-cultivateco-cream rounded-xl shadow-cultivateco-lg border border-gray-200 overflow-hidden">
              {/* Mock Cannabis Dashboard */}
              <div className="bg-cultivateco-green text-cultivateco-cream px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">Cannabis Compliance Dashboard</div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-sm">Compliant</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-cultivateco-green">98.7%</div>
                    <div className="text-sm text-gray-600">Compliance Score</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-cultivateco-blue">$47,329</div>
                    <div className="text-sm text-gray-600">Monthly Revenue</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">METRC Sync Status</span>
                    <span className="text-sm font-medium text-cultivateco-green">Connected</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Active Violations</span>
                    <span className="text-sm font-medium text-gray-900">0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">License Expiry</span>
                    <span className="text-sm font-medium text-gray-900">247 days</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Cannabis Floating Cards */}
            <div className="absolute -top-4 -right-4 bg-cultivateco-cream rounded-lg shadow-cultivateco border border-gray-200 p-3">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-cultivateco-green" />
                <div className="text-sm font-medium text-cultivateco-green">+15% Growth</div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-cultivateco-cream rounded-lg shadow-cultivateco border border-gray-200 p-3">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-cultivateco-blue" />
                <div className="text-sm font-medium text-cultivateco-blue">100% Compliant</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * Cannabis features section
 */
function CannabisFeaturesSection() {
  const cannabisFeatures = [
    {
      icon: Shield,
      title: "Cannabis Compliance Monitoring",
      description: "Real-time compliance tracking with automated violation detection and resolution guidance for New Mexico Cannabis Control Division requirements.",
      features: ["METRC Integration", "Violation Alerts", "Compliance Scoring", "Audit Trails"]
    },
    {
      icon: BarChart3,
      title: "Cannabis Business Intelligence",
      description: "Professional analytics and insights to optimize your cannabis business operations and maximize profitability.",
      features: ["Sales Analytics", "Inventory Insights", "Customer Analytics", "Performance Metrics"]
    },
    {
      icon: Zap,
      title: "Cannabis Operations Automation",
      description: "Streamline daily cannabis operations with automated workflows, inventory management, and compliance reporting.",
      features: ["Automated Reporting", "Inventory Management", "Customer Management", "Multi-Location Support"]
    }
  ]

  return (
    <section id="features" className="py-20 bg-cultivateco-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-cultivateco-green">
            Complete Cannabis Compliance Solution
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to run a compliant, profitable cannabis business in one professional platform.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {cannabisFeatures.map((feature, index) => (
            <CannabisThemeContainer key={index} variant="card" className="text-center space-y-6">
              <div className="w-12 h-12 bg-cultivateco-green/10 rounded-lg flex items-center justify-center mx-auto">
                <feature.icon className="w-6 h-6 text-cultivateco-green" />
              </div>
              
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-cultivateco-green">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
              
              <div className="space-y-2">
                {feature.features.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-cultivateco-green flex-shrink-0" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </CannabisThemeContainer>
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * Cannabis social proof section
 */
function CannabisSocialProofSection() {
  const cannabisTestimonials = [
    {
      name: "Sarah Martinez",
      role: "Compliance Manager",
      company: "Green Valley Dispensary",
      content: "CultivateCo transformed our compliance process. We went from manual tracking to automated monitoring, saving 15 hours per week.",
      rating: 5
    },
    {
      name: "Mike Rodriguez",
      role: "Dispensary Owner",
      company: "Desert Bloom Cannabis",
      content: "The METRC integration is flawless. Real-time sync means we never worry about compliance violations or state reporting deadlines.",
      rating: 5
    },
    {
      name: "Lisa Chen",
      role: "Operations Director",
      company: "Southwest Cannabis Co.",
      content: "Professional platform that gives us confidence in our compliance. The analytics help us make better business decisions daily.",
      rating: 5
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-cultivateco-green">
            Trusted by Cannabis Professionals
          </h2>
          <p className="text-xl text-gray-600">
            See why dispensaries choose CultivateCo for their compliance needs
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {cannabisTestimonials.map((testimonial, index) => (
            <CannabisThemeContainer key={index} variant="elevated" className="space-y-4">
              <div className="flex items-center space-x-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-gray-700 italic">
                "{testimonial.content}"
              </blockquote>
              
              <div className="space-y-1">
                <div className="font-semibold text-cultivateco-green">
                  {testimonial.name}
                </div>
                <div className="text-sm text-gray-600">
                  {testimonial.role} at {testimonial.company}
                </div>
              </div>
            </CannabisThemeContainer>
          ))}
        </div>
        
        {/* Cannabis Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-3xl font-bold text-cultivateco-green">500+</div>
            <div className="text-sm text-gray-600">Cannabis Businesses</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-cultivateco-green">99.8%</div>
            <div className="text-sm text-gray-600">Compliance Rate</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-cultivateco-green">24/7</div>
            <div className="text-sm text-gray-600">Monitoring</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-cultivateco-green">15min</div>
            <div className="text-sm text-gray-600">Setup Time</div>
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * Cannabis pricing section
 */
function CannabisPricingSection() {
  const cannabisPlans = [
    {
      name: "Cannabis Starter",
      price: "$199",
      period: "/month",
      description: "Perfect for single-location dispensaries starting their compliance journey",
      features: [
        "METRC Integration",
        "Basic Compliance Monitoring",
        "Monthly Reports",
        "Email Support",
        "Up to 1,000 transactions/month"
      ],
      cta: "Start Free Trial",
      popular: false
    },
    {
      name: "Cannabis Professional",
      price: "$399",
      period: "/month",
      description: "Complete solution for established dispensaries requiring advanced features",
      features: [
        "Everything in Starter",
        "Real-time Compliance Alerts",
        "Advanced Analytics",
        "Priority Support",
        "Multi-location Support",
        "Custom Reporting",
        "API Access"
      ],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Cannabis Enterprise",
      price: "Custom",
      period: "",
      description: "Tailored solution for cannabis chains and large-scale operations",
      features: [
        "Everything in Professional",
        "Dedicated Account Manager",
        "Custom Integrations",
        "Advanced Security",
        "SLA Guarantee",
        "White-label Options",
        "Training & Onboarding"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ]

  return (
    <section id="pricing" className="py-20 bg-cultivateco-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-cultivateco-green">
            Cannabis Compliance Pricing
          </h2>
          <p className="text-xl text-gray-600">
            Transparent pricing for cannabis businesses of all sizes
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {cannabisPlans.map((plan, index) => (
            <CannabisThemeContainer 
              key={index} 
              variant="card" 
              className={`relative space-y-6 ${plan.popular ? 'ring-2 ring-cultivateco-green' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 -right-3 bg-cultivateco-green text-cultivateco-cream px-3 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-cultivateco-green">
                  {plan.name}
                </h3>
                <div className="flex items-baseline space-x-1">
                  <span className="text-3xl font-bold text-cultivateco-green">
                    {plan.price}
                  </span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </div>
              
              <div className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-cultivateco-green flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              
              <Link 
                href={plan.cta === "Contact Sales" ? "/contact" : "/app/signup"}
                className={`block text-center py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                  plan.popular 
                    ? 'bg-cultivateco-green text-cultivateco-cream hover:bg-cultivateco-green/90' 
                    : 'bg-cultivateco-cream border-2 border-cultivateco-green text-cultivateco-green hover:bg-cultivateco-green hover:text-cultivateco-cream'
                }`}
              >
                {plan.cta}
              </Link>
            </CannabisThemeContainer>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            All plans include 14-day free trial • No setup fees • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  )
}

/**
 * Cannabis call-to-action section
 */
function CannabisCTASection() {
  return (
    <section className="py-20 bg-cultivateco-gradient">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-cultivateco-cream">
            Ready to Streamline Your Cannabis Compliance?
          </h2>
          <p className="text-xl text-cultivateco-cream/90">
            Join hundreds of cannabis professionals who trust CultivateCo for their compliance needs. 
            Start your free trial today.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/app/signup" 
            className="bg-cultivateco-cream text-cultivateco-green px-8 py-4 rounded-lg font-semibold hover:bg-cultivateco-cream/90 transition-all duration-200 inline-flex items-center justify-center"
          >
            Start Free 14-Day Trial
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <Link 
            href="/demo" 
            className="border-2 border-cultivateco-cream text-cultivateco-cream px-8 py-4 rounded-lg font-semibold hover:bg-cultivateco-cream hover:text-cultivateco-green transition-all duration-200 inline-flex items-center justify-center"
          >
            Schedule Demo
          </Link>
        </div>
        
        <div className="flex items-center justify-center space-x-6 pt-4">
          <div className="flex items-center space-x-2 text-cultivateco-cream/80">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm">No credit card required</span>
          </div>
          <div className="flex items-center space-x-2 text-cultivateco-cream/80">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm">Setup in 15 minutes</span>
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * Cannabis marketing footer
 */
function CannabisMarketingFooter() {
  return (
    <footer className="bg-cultivateco-green text-cultivateco-cream py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* CultivateCo Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-cultivateco-cream rounded-lg flex items-center justify-center">
                <span className="text-cultivateco-green font-bold text-sm">C</span>
              </div>
              <span className="text-xl font-bold">CultivateCo</span>
            </div>
            <p className="text-cultivateco-cream/80">
              Professional cannabis compliance platform trusted by dispensaries nationwide.
            </p>
          </div>
          
          {/* Cannabis Product Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Product</h4>
            <div className="space-y-2">
              <Link href="#features" className="block text-cultivateco-cream/80 hover:text-cultivateco-cream transition-colors">Features</Link>
              <Link href="#pricing" className="block text-cultivateco-cream/80 hover:text-cultivateco-cream transition-colors">Pricing</Link>
              <Link href="/integrations" className="block text-cultivateco-cream/80 hover:text-cultivateco-cream transition-colors">Integrations</Link>
              <Link href="/api" className="block text-cultivateco-cream/80 hover:text-cultivateco-cream transition-colors">API</Link>
            </div>
          </div>
          
          {/* Cannabis Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold">Resources</h4>
            <div className="space-y-2">
              <Link href="/blog" className="block text-cultivateco-cream/80 hover:text-cultivateco-cream transition-colors">Blog</Link>
              <Link href="/docs" className="block text-cultivateco-cream/80 hover:text-cultivateco-cream transition-colors">Documentation</Link>
              <Link href="/compliance-guide" className="block text-cultivateco-cream/80 hover:text-cultivateco-cream transition-colors">Compliance Guide</Link>
              <Link href="/support" className="block text-cultivateco-cream/80 hover:text-cultivateco-cream transition-colors">Support</Link>
            </div>
          </div>
          
          {/* Cannabis Company */}
          <div className="space-y-4">
            <h4 className="font-semibold">Company</h4>
            <div className="space-y-2">
              <Link href="/about" className="block text-cultivateco-cream/80 hover:text-cultivateco-cream transition-colors">About</Link>
              <Link href="/contact" className="block text-cultivateco-cream/80 hover:text-cultivateco-cream transition-colors">Contact</Link>
              <Link href="/careers" className="block text-cultivateco-cream/80 hover:text-cultivateco-cream transition-colors">Careers</Link>
              <Link href="/privacy" className="block text-cultivateco-cream/80 hover:text-cultivateco-cream transition-colors">Privacy</Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-cultivateco-cream/20 mt-12 pt-8 text-center">
          <p className="text-cultivateco-cream/80">
            © 2024 CultivateCo. All rights reserved. Professional cannabis compliance solutions.
          </p>
        </div>
      </div>
    </footer>
  )
}
