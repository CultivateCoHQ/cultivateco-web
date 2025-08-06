import { CannabisLayout } from '@/components/layout/CannabisLayout'

export default function ContactPage() {
  return (
    <CannabisLayout seo={{
      title: 'Contact CultivateCo | Cannabis Compliance Experts',
      description: 'Get in touch with cannabis compliance experts.',
    }}>
      <div className="min-h-screen bg-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get in touch with our cannabis compliance experts.
          </p>
        </div>
      </div>
    </CannabisLayout>
  )
}
