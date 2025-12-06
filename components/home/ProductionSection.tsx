'use client';

import { useTranslations } from 'next-intl';
import { Package, Factory, Globe } from 'lucide-react';

export function ProductionSection() {
  const t = useTranslations('home.production');

  const stats = [
    {
      icon: Factory,
      value: '50,000',
      unit: 'TON',
      label: t('capacity'),
      color: 'text-primary-600',
    },
    {
      icon: Package,
      value: '200+',
      unit: '',
      label: t('products'),
      color: 'text-secondary-600',
    },
    {
      icon: Globe,
      value: '60+',
      unit: '',
      label: t('countries'),
      color: 'text-primary-600',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12">
          {t('title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center hover:bg-white/20 transition-colors"
            >
              <stat.icon className={`h-12 w-12 mx-auto mb-4 ${stat.color.replace('text-', 'text-white')}`} />
              <div className="text-5xl font-bold mb-2">
                {stat.value}
                {stat.unit && (
                  <span className="text-2xl ml-2">{stat.unit}</span>
                )}
              </div>
              <div className="text-xl text-primary-100">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

