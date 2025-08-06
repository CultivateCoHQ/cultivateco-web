import { CannabisLayout } from '@/components/layout/CannabisLayout'

export default function AboutPage() {
  return (
    <CannabisLayout seo={{
      title: 'About CultivateCo | Cannabis Compliance Platform',
      description: 'Learn about CultivateCo team and cannabis industry expertise.',
    }}>
      <div className="min-h-screen bg-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About CultivateCo</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Leading cannabis compliance platform with 8+ years of industry experience.
          </p>
        </div>
      </div>
    </CannabisLayout>
  )
}
