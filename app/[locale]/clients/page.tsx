import { CountriesList } from '@/components/clients/CountriesList';
import { ClientsGrid } from '@/components/clients/ClientsGrid';

export default function ClientsPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Clients & Markets</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Serving clients across the globe with premium natural oils
          </p>
        </div>
      </section>

      {/* Countries Map */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Export Markets
          </h2>
          <CountriesList />
        </div>
      </section>

      {/* Clients Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Our Clients
          </h2>
          <ClientsGrid />
        </div>
      </section>
    </div>
  );
}

