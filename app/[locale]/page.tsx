import { useTranslations } from 'next-intl';
import { HeroSection } from '@/components/home/HeroSection';
import { ClientsSection } from '@/components/home/ClientsSection';
import { AboutSection } from '@/components/home/AboutSection';
import { ProductionSection } from '@/components/home/ProductionSection';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { QuickOrderSection } from '@/components/home/QuickOrderSection';
import { WhiteLabelSection } from '@/components/home/WhiteLabelSection';
import { CountriesMap } from '@/components/home/CountriesMap';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <ClientsSection />
      <AboutSection />
      <ProductionSection />
      <FeaturedProducts />
      <QuickOrderSection />
      <WhiteLabelSection />
      <CountriesMap />
    </div>
  );
}

