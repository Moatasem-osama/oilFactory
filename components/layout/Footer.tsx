'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

export function Footer() {
  const t = useTranslations('common');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const footerLinks = {
    company: [
      { name: t('about'), href: `/${locale}/about` },
      { name: t('products'), href: `/${locale}/products` },
      { name: t('quality'), href: `/${locale}/quality` },
      { name: t('clients'), href: `/${locale}/clients` },
    ],
    services: [
      { name: t('requestQuote'), href: `/${locale}/request-quote` },
      { name: t('startBrand'), href: `/${locale}/start-your-brand` },
      { name: t('orderTracking'), href: `/${locale}/tracking` },
      { name: t('catalog'), href: `/${locale}/catalog` },
    ],
    legal: [
      { name: t('privacy'), href: `/${locale}/privacy` },
      { name: t('terms'), href: `/${locale}/terms` },
      { name: t('shipping'), href: `/${locale}/shipping` },
      { name: t('contact'), href: `/${locale}/contact` },
    ],
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className={isRTL ? 'lg:text-right' : 'lg:text-left'}>
            <h3 className="text-lg font-bold mb-4">
              {isRTL ? 'مصنع الزيوت' : 'Oil Factory'}
            </h3>
            <p className="text-gray-400 mb-4">
              {isRTL
                ? 'شريكك الموثوق في الزيوت الطبيعية عالية الجودة'
                : 'Your trusted partner for premium natural oils'}
            </p>
            <div className="space-y-2">
              <a
                href="tel:+1234567890"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                <Phone className="h-4 w-4" />
                <span>+1 234 567 890</span>
              </a>
              <a
                href="mailto:info@oilfactory.com"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                <Mail className="h-4 w-4" />
                <span>info@oilfactory.com</span>
              </a>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
              {isRTL ? 'الشركة' : 'Company'}
            </h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
              {isRTL ? 'الخدمات' : 'Services'}
            </h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
              {isRTL ? 'قانوني' : 'Legal'}
            </h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()}{' '}
            {isRTL ? 'مصنع الزيوت. جميع الحقوق محفوظة.' : 'Oil Factory. All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
}

