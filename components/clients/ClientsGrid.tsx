'use client';

export function ClientsGrid() {
  // Placeholder client logos - replace with actual client data
  const clients = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `Client ${i + 1}`,
    logo: `/clients/client${i + 1}.png`,
  }));

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {clients.map((client) => (
        <div
          key={client.id}
          className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow flex items-center justify-center min-h-[150px]"
        >
          <div className="text-gray-400 text-sm font-semibold">
            {client.name}
          </div>
          {/* Replace with actual logo image when available */}
          {/* <Image src={client.logo} alt={client.name} width={150} height={80} className="object-contain" /> */}
        </div>
      ))}
    </div>
  );
}

