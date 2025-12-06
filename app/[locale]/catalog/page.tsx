import { CatalogForm } from '@/components/catalog/CatalogForm';

export default function CatalogPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Download Catalog</h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Get our complete product catalog, certificates, and technical specifications
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <CatalogForm />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Downloads</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="/catalogs/main-catalog.pdf"
              download
              className="flex flex-col items-center justify-center p-6 border-2 border-gray-200 rounded-lg hover:border-primary-600 hover:bg-primary-50 transition-colors"
            >
              <div className="text-4xl mb-4">📄</div>
              <h3 className="font-semibold text-gray-900 mb-2">Product Catalog</h3>
              <p className="text-sm text-gray-600 text-center">Download PDF</p>
            </a>
            <a
              href="/catalogs/certificates.pdf"
              download
              className="flex flex-col items-center justify-center p-6 border-2 border-gray-200 rounded-lg hover:border-primary-600 hover:bg-primary-50 transition-colors"
            >
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="font-semibold text-gray-900 mb-2">Certificates</h3>
              <p className="text-sm text-gray-600 text-center">Download PDF</p>
            </a>
            <a
              href="/catalogs/technical-specs.pdf"
              download
              className="flex flex-col items-center justify-center p-6 border-2 border-gray-200 rounded-lg hover:border-primary-600 hover:bg-primary-50 transition-colors"
            >
              <div className="text-4xl mb-4">📋</div>
              <h3 className="font-semibold text-gray-900 mb-2">Technical Specs</h3>
              <p className="text-sm text-gray-600 text-center">Download PDF</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

