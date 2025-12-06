'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export function FeaturedProducts() {
  const t = useTranslations('home.products');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  // Placeholder products - will be fetched from database
  const products = [
    {
      id: '1',
      nameEn: 'Olive Oil',
      nameAr: 'زيت الزيتون',
      image: '/products/olive-oil.jpg',
    },
    {
      id: '2',
      nameEn: 'Coconut Oil',
      nameAr: 'زيت جوز الهند',
      image: '/products/coconut-oil.jpg',
    },
    {
      id: '3',
      nameEn: 'Sunflower Oil',
      nameAr: 'زيت عباد الشمس',
      image: '/products/sunflower-oil.jpg',
    },
    {
      id: '4',
      nameEn: 'Palm Oil',
      nameAr: 'زيت النخيل',
      image: '/products/palm-oil.jpg',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">
            {t('title')}
          </h2>
          <Link
            href={`/${locale}/products`}
            className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
          >
            {isRTL ? (
              <>
                <ArrowLeft className="h-5 w-5" />
                <span>{t('viewAll')}</span>
              </>
            ) : (
              <>
                <span>{t('viewAll')}</span>
                <ArrowLeft className="h-5 w-5 rotate-180" />
              </>
            )}
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <p className="text-primary-600 font-medium">
                  {isRTL ? 'اطلب الآن' : 'Order Now'} →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

