'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Globe } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function Header() {
  const t = useTranslations('common');
  const locale = useLocale();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: t('home'), href: `/${locale}` },
    { name: t('about'), href: `/${locale}/about` },
    { name: t('products'), href: `/${locale}/products` },
    { name: t('requestQuote'), href: `/${locale}/request-quote` },
    { name: t('startBrand'), href: `/${locale}/start-your-brand` },
    { name: t('clients'), href: `/${locale}/clients` },
    { name: t('quality'), href: `/${locale}/quality` },
    { name: t('contact'), href: `/${locale}/contact` },
  ];

  const switchLocale = () => {
    const newLocale = locale === 'en' ? 'ar' : 'en';
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    window.location.href = `/${newLocale}${pathWithoutLocale}`;
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href={`/${locale}`} className="flex items-center">
              <span className="text-2xl font-bold text-primary-600">
                {locale === 'ar' ? 'مصنع الزيوت' : 'Oil Factory'}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-6 rtl:space-x-reverse">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary-600',
                  pathname === item.href
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-700'
                )}
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={switchLocale}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              <Globe className="h-4 w-4" />
              <span>{locale === 'en' ? t('arabic') : t('english')}</span>
            </button>
            <Link
              href={`/${locale}/tracking`}
              className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
            >
              {t('orderTracking')}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-4 lg:hidden">
            <button
              onClick={switchLocale}
              className="rounded-lg p-2 text-gray-700 hover:bg-gray-100"
            >
              <Globe className="h-5 w-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 text-gray-700 hover:bg-gray-100"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'block rounded-lg px-3 py-2 text-base font-medium',
                    pathname === item.href
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href={`/${locale}/tracking`}
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-lg bg-primary-600 px-3 py-2 text-base font-medium text-white"
              >
                {t('orderTracking')}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

