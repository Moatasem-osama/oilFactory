'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations, useLocale } from 'next-intl';
import { Plus, X, Upload, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const orderItemSchema = z.object({
  productId: z.string().min(1, 'Product is required'),
  productName: z.string(),
  quantity: z.number().min(0.1, 'Quantity must be greater than 0'),
  unit: z.enum(['LITER', 'TON', 'KG']),
  packaging: z.enum(['BOTTLE_10L', 'BOTTLE_20L', 'DRUM_200L', 'IBC', 'TANKER']),
  customLabel: z.string().optional(),
});

const requestQuoteSchema = z.object({
  // Customer Information
  customerName: z.string().min(2, 'Name is required'),
  company: z.string().optional(),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(5, 'Phone number is required'),
  country: z.string().min(2, 'Country is required'),
  
  // Order Details
  orderType: z.enum(['BULK', 'WHITE_LABEL', 'SAMPLE']),
  incoterm: z.string().optional(),
  shippingDate: z.string().optional(),
  notes: z.string().optional(),
  
  // Order Items
  items: z.array(orderItemSchema).min(1, 'At least one product is required'),
  
  // Attachments
  attachments: z.array(z.string()).optional(),
});

type RequestQuoteFormData = z.infer<typeof requestQuoteSchema>;

// Mock products - replace with actual data from database
const mockProducts = [
  { id: '1', nameEn: 'Olive Oil', nameAr: 'زيت الزيتون' },
  { id: '2', nameEn: 'Coconut Oil', nameAr: 'زيت جوز الهند' },
  { id: '3', nameEn: 'Sunflower Oil', nameAr: 'زيت عباد الشمس' },
  { id: '4', nameEn: 'Palm Oil', nameAr: 'زيت النخيل' },
];

export function RequestQuoteForm() {
  const t = useTranslations('requestQuote');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RequestQuoteFormData>({
    resolver: zodResolver(requestQuoteSchema),
    defaultValues: {
      items: [{ productId: '', productName: '', quantity: 0, unit: 'LITER', packaging: 'BOTTLE_10L' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const orderType = watch('orderType');

  const onSubmit = async (data: RequestQuoteFormData) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('data', JSON.stringify(data));
      
      // Add uploaded files
      uploadedFiles.forEach((file) => {
        formData.append('attachments', file);
      });

      const response = await fetch('/api/orders', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to submit order');
      }

      const result = await response.json();
      
      // Show success message and redirect
      alert(`Order submitted successfully! Your Order ID: ${result.orderId}`);
      window.location.href = `/${locale}/tracking?orderId=${result.orderId}`;
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Failed to submit order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) throw new Error('Upload failed');
        
        const result = await response.json();
        return result.url;
      });

      const urls = await Promise.all(uploadPromises);
      setUploadedFiles([...uploadedFiles, ...urls]);
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Failed to upload files. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Customer Information */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {t('customerInfo')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('name')} *
            </label>
            <input
              {...register('customerName')}
              className={cn(
                'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent',
                errors.customerName && 'border-red-500'
              )}
            />
            {errors.customerName && (
              <p className="mt-1 text-sm text-red-600">{errors.customerName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('company')}
            </label>
            <input
              {...register('company')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('email')} *
            </label>
            <input
              type="email"
              {...register('email')}
              className={cn(
                'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent',
                errors.email && 'border-red-500'
              )}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('phone')} *
            </label>
            <input
              type="tel"
              {...register('phone')}
              className={cn(
                'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent',
                errors.phone && 'border-red-500'
              )}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('country')} *
            </label>
            <input
              {...register('country')}
              className={cn(
                'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent',
                errors.country && 'border-red-500'
              )}
            />
            {errors.country && (
              <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
            )}
          </div>
        </div>
      </section>

      {/* Order Details */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {t('orderDetails')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('orderType')} *
            </label>
            <select
              {...register('orderType')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="BULK">{t('bulk')}</option>
              <option value="WHITE_LABEL">{t('whiteLabel')}</option>
              <option value="SAMPLE">{t('sample')}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('incoterm')}
            </label>
            <input
              {...register('incoterm')}
              placeholder="FOB, CIF, EXW, etc."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('shippingDate')}
            </label>
            <input
              type="date"
              {...register('shippingDate')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Order Items */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">
              {t('selectOils')}
            </h3>
            <button
              type="button"
              onClick={() => append({ productId: '', productName: '', quantity: 0, unit: 'LITER', packaging: 'BOTTLE_10L' })}
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add Product</span>
            </button>
          </div>

          {fields.map((field, index) => (
            <div
              key={field.id}
              className="border border-gray-200 rounded-lg p-6 bg-gray-50"
            >
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold text-gray-900">Product {index + 1}</h4>
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('selectOils')} *
                  </label>
                  <select
                    {...register(`items.${index}.productId`)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Select Product</option>
                    {mockProducts.map((product) => (
                      <option key={product.id} value={product.id}>
                        {locale === 'ar' ? product.nameAr : product.nameEn}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('quantity')} *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    {...register(`items.${index}.quantity`, { valueAsNumber: true })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('unit')} *
                  </label>
                  <select
                    {...register(`items.${index}.unit`)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="LITER">Liter</option>
                    <option value="TON">Ton</option>
                    <option value="KG">Kilogram</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('packaging')} *
                  </label>
                  <select
                    {...register(`items.${index}.packaging`)}
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

              {orderType === 'WHITE_LABEL' && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Custom Label Name
                  </label>
                  <input
                    {...register(`items.${index}.customLabel`)}
                    placeholder="Enter custom label name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Attachments */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {t('attachments')}
        </h2>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <label className="cursor-pointer">
            <span className="text-primary-600 font-semibold">Click to upload</span>
            <span className="text-gray-600"> or drag and drop</span>
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />
          </label>
          <p className="text-sm text-gray-500 mt-2">
            PDF, DOC, DOCX, JPG, PNG (max 10MB each)
          </p>
        </div>
        {uploadedFiles.length > 0 && (
          <div className="mt-4 space-y-2">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                <span className="text-sm text-gray-700">{file}</span>
                <button
                  type="button"
                  onClick={() => setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))}
                  className="text-red-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Notes */}
      <section>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('notes')}
        </label>
        <textarea
          {...register('notes')}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Any additional information or special requirements..."
        />
      </section>

      {/* Submit Button */}
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

