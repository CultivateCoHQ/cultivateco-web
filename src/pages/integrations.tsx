import { CannabisLayout } from '@/components/layout/CannabisLayout'

export default function IntegrationsPage() {
  return (
    <CannabisLayout seo={{
      title: 'Cannabis Platform Integrations | CultivateCo',
      description: 'Connect with METRC, QuickBooks, and 25+ cannabis integrations.',
    }}>
      <div className="min-h-screen bg-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Cannabis Integrations</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with METRC, QuickBooks, Stripe, and 25+ other tools.
          </p>
        </div>
      </div>
    </CannabisLayout>
  )
}
