'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';

export function AboutSection() {
  const t = useTranslations('home.about');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={isRTL ? 'lg:order-2' : ''}>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {t('title')}
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              {t('description')}
            </p>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              {locale === 'ar'
                ? 'نحن ملتزمون بتقديم منتجات عالية الجودة تلبي أعلى المعايير الدولية، مع التركيز على الاستدامة والابتكار في كل ما نقوم به.'
                : 'We are committed to delivering high-quality products that meet the highest international standards, with a focus on sustainability and innovation in everything we do.'}
            </p>
            <Link
              href={`/${locale}/about`}
              className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
            >
              {isRTL ? (
                <>
                  <ArrowLeft className="h-5 w-5" />
                  <span>اعرف المزيد</span>
                </>
              ) : (
                <>
                  <span>Learn More</span>
                  <ArrowLeft className="h-5 w-5 rotate-180" />
                </>
              )}
            </Link>
          </div>
          <div className={`relative h-96 rounded-lg overflow-hidden shadow-lg ${isRTL ? 'lg:order-1' : ''}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
              <span className="text-gray-400 text-lg">Factory Image</span>
            </div>
            {/* Replace with actual factory image */}
            {/* <Image src="/images/factory.jpg" alt="Factory" fill className="object-cover" /> */}
          </div>
        </div>
      </div>
    </section>
  );
}

