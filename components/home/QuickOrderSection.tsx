'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export function QuickOrderSection() {
  const t = useTranslations('home.quickOrder');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          {t('title')}
        </h2>
        <p className="text-xl text-gray-700 mb-8">
          {t('description')}
        </p>
        <Link
          href={`/${locale}/request-quote`}
          className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg"
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
    </section>
  );
}

