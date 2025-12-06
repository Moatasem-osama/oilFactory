import { ProductsList } from '@/components/products/ProductsList';

export default function ProductsPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Products</h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Premium natural oils for your business needs
          </p>
        </div>
        <ProductsList />
      </div>
    </div>
  );
}

