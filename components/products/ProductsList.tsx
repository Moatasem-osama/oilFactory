'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';

// Mock products - replace with actual data from database
const mockProducts = [
  {
    id: '1',
    nameEn: 'Olive Oil',
    nameAr: 'زيت الزيتون',
    descriptionEn: 'Premium extra virgin olive oil',
    descriptionAr: 'زيت زيتون بكر ممتاز',
    image: '/products/olive-oil.jpg',
  },
  {
    id: '2',
    nameEn: 'Coconut Oil',
    nameAr: 'زيت جوز الهند',
    descriptionEn: 'Pure coconut oil',
    descriptionAr: 'زيت جوز هند نقي',
    image: '/products/coconut-oil.jpg',
  },
  {
    id: '3',
    nameEn: 'Sunflower Oil',
    nameAr: 'زيت عباد الشمس',
    descriptionEn: 'Refined sunflower oil',
    descriptionAr: 'زيت عباد الشمس المكرر',
    image: '/products/sunflower-oil.jpg',
  },
  {
    id: '4',
    nameEn: 'Palm Oil',
    nameAr: 'زيت النخيل',
    descriptionEn: 'High-quality palm oil',
    descriptionAr: 'زيت نخيل عالي الجودة',
    image: '/products/palm-oil.jpg',
  },
];

export function ProductsList() {
  const locale = useLocale();
  const [products, setProducts] = useState(mockProducts);

  // TODO: Fetch products from API
  // useEffect(() => {
  //   fetch('/api/products')
  //     .then(res => res.json())
  //     .then(data => setProducts(data.products));
  // }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/${locale}/products/${product.id}`}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow group"
        >
          <div className="relative h-64 bg-gradient-to-br from-primary-100 to-secondary-100">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-gray-400">
                {locale === 'ar' ? product.nameAr : product.nameEn}
              </span>
            </div>
            {/* Replace with actual product image */}
            {/* <Image src={product.image} alt={product.nameEn} fill className="object-cover group-hover:scale-105 transition-transform" /> */}
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {locale === 'ar' ? product.nameAr : product.nameEn}
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              {locale === 'ar' ? product.descriptionAr : product.descriptionEn}
            </p>
            <span className="text-primary-600 font-medium">
              {locale === 'ar' ? 'اطلب الآن' : 'Order Now'} →
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

