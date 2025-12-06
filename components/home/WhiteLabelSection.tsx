'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { ArrowLeft, Check } from 'lucide-react';

export function WhiteLabelSection() {
  const t = useTranslations('home.whiteLabel');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const steps = [
    { number: '01', title: locale === 'ar' ? 'اختر نوع الزيت' : 'Choose Your Oil' },
    { number: '02', title: locale === 'ar' ? 'صمم الملصق' : 'Design Your Label' },
    { number: '03', title: locale === 'ar' ? 'قدم الطلب' : 'Place Your Order' },
    { number: '04', title: locale === 'ar' ? 'احصل على منتجك' : 'Get Your Product' },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-secondary-50 to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {t('title')}
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              {t('description')}
            </p>
            <div className="space-y-4 mb-8">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 bg-white rounded-lg p-4 shadow-sm"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                    {step.number}
                  </div>
                  <span className="text-lg font-medium text-gray-900">
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
            <Link
              href={`/${locale}/start-your-brand`}
              className="inline-flex items-center gap-2 bg-secondary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-secondary-700 transition-colors"
            >
              {isRTL ? (
                <>
                  <ArrowLeft className="h-5 w-5" />
                  <span>ابدأ الآن</span>
                </>
              ) : (
                <>
                  <span>Get Started</span>
                  <ArrowLeft className="h-5 w-5 rotate-180" />
                </>
              )}
            </Link>
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary-100 to-primary-100 flex items-center justify-center">
              <span className="text-gray-400 text-lg">White Label Products</span>
            </div>
            {/* Replace with actual white label product images */}
          </div>
        </div>
      </div>
    </section>
  );
}

