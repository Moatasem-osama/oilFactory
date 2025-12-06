'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations, useLocale } from 'next-intl';
import { Upload, Loader2 } from 'lucide-react';

const whiteLabelSchema = z.object({
  customerName: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  country: z.string().min(2, 'Country is required'),
  oilType: z.string().min(1, 'Oil type is required'),
  quantity: z.number().min(0.1, 'Quantity must be greater than 0'),
  packaging: z.enum(['BOTTLE_10L', 'BOTTLE_20L', 'DRUM_200L', 'IBC', 'TANKER']),
  hasDesign: z.boolean(),
  needDesign: z.boolean(),
  notes: z.string().optional(),
});

type WhiteLabelFormData = z.infer<typeof whiteLabelSchema>;

export function WhiteLabelForm() {
  const t = useTranslations('whiteLabel');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [designFiles, setDesignFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<WhiteLabelFormData>({
    resolver: zodResolver(whiteLabelSchema),
    defaultValues: {
      hasDesign: false,
      needDesign: false,
    },
  });

  const hasDesign = watch('hasDesign');
  const needDesign = watch('needDesign');

  const onSubmit = async (data: WhiteLabelFormData) => {
    setIsSubmitting(true);
    try {
      // Upload design files if any
      const designFileUrls: string[] = [];
      for (const file of designFiles) {
        const formData = new FormData();
        formData.append('file', file);
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        const result = await response.json();
        if (result.url) {
          designFileUrls.push(result.url);
        }
      }

      // Submit white label request
      const response = await fetch('/api/white-label', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          designFiles: designFileUrls,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit request');
      }

      alert('White label request submitted successfully! We will contact you soon.');
      // Reset form
      window.location.reload();
    } catch (error) {
      console.error('Error submitting request:', error);
      alert('Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Customer Information */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name *
            </label>
            <input
              {...register('customerName')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
            {errors.customerName && (
              <p className="mt-1 text-sm text-red-600">{errors.customerName.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              {...register('email')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>
            <input
              type="tel"
              {...register('phone')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company
            </label>
            <input
              {...register('company')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country *
            </label>
            <input
              {...register('country')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
            {errors.country && (
              <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
            )}
          </div>
        </div>
      </section>

      {/* Product Details */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('oilType')} *
            </label>
            <input
              {...register('oilType')}
              placeholder="e.g., Olive Oil"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
            {errors.oilType && (
              <p className="mt-1 text-sm text-red-600">{errors.oilType.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('quantity')} *
            </label>
            <input
              type="number"
              step="0.1"
              {...register('quantity', { valueAsNumber: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
            {errors.quantity && (
              <p className="mt-1 text-sm text-red-600">{errors.quantity.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('packaging')} *
            </label>
            <select
              {...register('packaging')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="BOTTLE_10L">10L Bottle</option>
              <option value="BOTTLE_20L">20L Bottle</option>
              <option value="DRUM_200L">200L Drum</option>
              <option value="IBC">IBC</option>
              <option value="TANKER">Tanker</option>
            </select>
          </div>
        </div>
      </section>

      {/* Design Options */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Label Design</h2>
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              {...register('hasDesign')}
              className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
            />
            <span className="text-lg font-medium text-gray-900">{t('hasDesign')}</span>
          </label>

          {hasDesign && (
            <div className="ml-8 p-4 bg-gray-50 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('uploadDesign')}
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.ai,.psd"
                  onChange={(e) => {
                    if (e.target.files) {
                      setDesignFiles(Array.from(e.target.files));
                    }
                  }}
                  className="hidden"
                  id="design-upload"
                />
                <label
                  htmlFor="design-upload"
                  className="cursor-pointer text-primary-600 font-semibold"
                >
                  Click to upload design files
                </label>
                {designFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {designFiles.map((file, index) => (
                      <div key={index} className="text-sm text-gray-600">
                        {file.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              {...register('needDesign')}
              className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
            />
            <span className="text-lg font-medium text-gray-900">{t('needDesign')}</span>
          </label>
        </div>
      </section>

      {/* Notes */}
      <section>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Notes
        </label>
        <textarea
          {...register('notes')}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          placeholder="Any special requirements or information..."
        />
      </section>

      {/* Submit */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Submitting...</span>
            </>
          ) : (
            <span>{t('submit')}</span>
          )}
        </button>
      </div>
    </form>
  );
}

