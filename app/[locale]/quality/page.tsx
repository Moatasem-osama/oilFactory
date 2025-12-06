import { CertificationsGrid } from '@/components/quality/CertificationsGrid';
import { QualitySystem } from '@/components/quality/QualitySystem';

export default function QualityPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Quality & Certifications</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Committed to the highest standards of quality and excellence
          </p>
        </div>
      </section>

      {/* Quality System */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <QualitySystem />
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Certifications
          </h2>
          <CertificationsGrid />
        </div>
      </section>

      {/* Laboratory Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Laboratory & Analysis</h2>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                Our state-of-the-art laboratory ensures every batch meets the highest quality
                standards. We perform comprehensive testing including:
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 font-bold">•</span>
                  <span>Chemical composition analysis</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 font-bold">•</span>
                  <span>Microbiological testing</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 font-bold">•</span>
                  <span>Purity verification</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 font-bold">•</span>
                  <span>Heavy metals detection</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 font-bold">•</span>
                  <span>Organoleptic evaluation</span>
                </li>
              </ul>
            </div>
            <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-gray-400">Laboratory Image</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

