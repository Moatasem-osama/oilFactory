'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations, useLocale } from 'next-intl';
import { Loader2, Download } from 'lucide-react';
import { sendCatalogEmail } from '@/lib/email';

const catalogSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  country: z.string().optional(),
  catalogType: z.string().optional(),
});

type CatalogFormData = z.infer<typeof catalogSchema>;

export function CatalogForm() {
  const t = useTranslations('catalog');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CatalogFormData>({
    resolver: zodResolver(catalogSchema),
  });

  const onSubmit = async (data: CatalogFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/catalog-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit request');
      }

      // Send catalog via email
      await sendCatalogEmail(data.email, data.name, data.catalogType || 'catalog');

      setIsSuccess(true);
      reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting catalog request:', error);
      alert('Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
      {isSuccess && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
          Catalog has been sent to your email!
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name *
          </label>
          <input
            {...register('name')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            {...register('email')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country
          </label>
          <input
            {...register('country')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Catalog Type
          </label>
          <select
            {...register('catalogType')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="catalog">Product Catalog</option>
            <option value="certificate">Certificates</option>
            <option value="specs">Technical Specifications</option>
            <option value="all">All Documents</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Sending...</span>
          </>
        ) : (
          <>
            <Download className="h-5 w-5" />
            <span>Send Catalog to Email</span>
          </>
        )}
      </button>
    </form>
  );
}

