'use client';

export function CertificationsGrid() {
  const certifications = [
    { name: 'ISO 9001:2015', type: 'Quality Management' },
    { name: 'HACCP', type: 'Food Safety' },
    { name: 'GMP', type: 'Good Manufacturing Practice' },
    { name: 'Halal Certificate', type: 'Certification' },
    { name: 'Kosher Certificate', type: 'Certification' },
    { name: 'Organic Certificate', type: 'Certification' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {certifications.map((cert, index) => (
        <div
          key={index}
          className="bg-white rounded-lg p-6 shadow-md text-center hover:shadow-lg transition-shadow"
        >
          <div className="h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
            <span className="text-gray-400 text-sm">{cert.name}</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">{cert.name}</h3>
          <p className="text-sm text-gray-600">{cert.type}</p>
        </div>
      ))}
    </div>
  );
}

