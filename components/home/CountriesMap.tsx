'use client';

import { useTranslations } from 'next-intl';

export function CountriesMap() {
  // Placeholder for interactive map
  // In production, use react-map-gl or similar library

  const countries = [
    'United States',
    'United Kingdom',
    'Germany',
    'France',
    'Saudi Arabia',
    'UAE',
    'Egypt',
    'Jordan',
    'Lebanon',
    'Turkey',
    'India',
    'China',
    'Japan',
    'Australia',
    // Add more countries
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          {/* {t('title')} */}
          Export Markets
        </h2>
        <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-gray-400 text-lg">Interactive World Map</span>
          </div>
          {/* Replace with actual map component */}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {countries.map((country, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-4 text-center text-gray-700 font-medium hover:bg-primary-50 transition-colors"
            >
              {country}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

