'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  const t = useTranslations('home.hero');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 overflow-hidden">
      {/* Background Video Placeholder */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/20"></div>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
            {t('title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href={`/${locale}/request-quote`}
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
            >
              {t('requestQuote')}
              <ArrowRight className={`h-5 w-5 ${isRTL ? 'rotate-180' : ''}`} />
            </Link>
            <Link
              href={`/${locale}/start-your-brand`}
              className="inline-flex items-center gap-2 bg-white text-primary-600 border-2 border-primary-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-50 transition-colors"
            >
              {t('startBrand')}
              <ArrowRight className={`h-5 w-5 ${isRTL ? 'rotate-180' : ''}`} />
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
}

