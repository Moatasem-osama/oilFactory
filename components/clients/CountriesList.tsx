'use client';

export function CountriesList() {
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
    'Canada',
    'Brazil',
    'Mexico',
    'South Africa',
    'Nigeria',
    'Kenya',
  ];

  return (
    <>
      <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden mb-8">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-gray-400 text-lg">Interactive World Map</span>
        </div>
        {/* Replace with actual map component using react-map-gl or similar */}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {countries.map((country, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-4 text-center text-gray-700 font-medium hover:bg-primary-50 hover:text-primary-700 transition-colors cursor-pointer"
          >
            {country}
          </div>
        ))}
      </div>
    </>
  );
}

