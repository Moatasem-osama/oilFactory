import { WhiteLabelForm } from '@/components/white-label/WhiteLabelForm';
import { useTranslations } from 'next-intl';

export default function StartYourBrandPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Start Your Brand
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Create your own brand with our white label services. We handle the production,
            you handle the marketing.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <WhiteLabelForm />
        </div>
      </div>
    </div>
  );
}

