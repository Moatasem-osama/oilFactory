'use client';

import { useTranslations } from 'next-intl';

export function ClientsSection() {
  const t = useTranslations('home.clients');

  // Placeholder client logos - replace with actual client logos
  const clients = [
    { name: 'Client 1', logo: '/clients/client1.png' },
    { name: 'Client 2', logo: '/clients/client2.png' },
    { name: 'Client 3', logo: '/clients/client3.png' },
    { name: 'Client 4', logo: '/clients/client4.png' },
    { name: 'Client 5', logo: '/clients/client5.png' },
    { name: 'Client 6', logo: '/clients/client6.png' },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          {t('title')}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {clients.map((client, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-gray-400 text-sm font-semibold">
                {client.name}
              </div>
              {/* Replace with actual logo image when available */}
              {/* <Image src={client.logo} alt={client.name} width={120} height={60} className="object-contain" /> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

