import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { HtmlDir } from '@/components/layout/HtmlDir';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <HtmlDir locale={locale}>
      <NextIntlClientProvider messages={messages}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </NextIntlClientProvider>
    </HtmlDir>
  );
}
