'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Search, Loader2, Package, Calendar, User, MapPin } from 'lucide-react';
import { formatDate } from '@/lib/utils';

const statusColors: Record<string, string> = {
  NEW: 'bg-blue-100 text-blue-800',
  UNDER_REVIEW: 'bg-yellow-100 text-yellow-800',
  QUOTED: 'bg-purple-100 text-purple-800',
  CONFIRMED: 'bg-green-100 text-green-800',
  SHIPPED: 'bg-indigo-100 text-indigo-800',
  DELIVERED: 'bg-gray-100 text-gray-800',
  CANCELLED: 'bg-red-100 text-red-800',
};

export default function TrackingPage() {
  const t = useTranslations('tracking');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`/api/orders?orderId=${orderId}`);
      const data = await response.json();

      if (!response.ok || !data.order) {
        setError('Order not found. Please check your Order ID.');
        setOrder(null);
      } else {
        setOrder(data.order);
      }
    } catch (err) {
      setError('Failed to fetch order. Please try again.');
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            {t('title')}
          </h1>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="mb-8" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="flex gap-4">
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value.toUpperCase())}
                placeholder={t('enterOrderId')}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button
                type="submit"
                disabled={loading || !orderId.trim()}
                className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5" />
                    <span>{t('track')}</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {/* Order Details */}
          {order && (
            <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
              {/* Order Header */}
              <div className="border-b pb-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {t('orderId')}: {order.orderId}
                    </h2>
                    <div className="flex items-center gap-4 text-gray-600">
                      <span className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {formatDate(order.createdAt, locale)}
                      </span>
                      <span className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {order.country}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${statusColors[order.status] || statusColors.NEW}`}>
                      {t(`statuses.${order.status}`)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="h-5 w-5" />
                  {t('customer')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium text-gray-900">{order.customerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium text-gray-900">{order.customerEmail}</p>
                  </div>
                  {order.customerPhone && (
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium text-gray-900">{order.customerPhone}</p>
                    </div>
                  )}
                  {order.company && (
                    <div>
                      <p className="text-sm text-gray-600">Company</p>
                      <p className="font-medium text-gray-900">{order.company}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  {t('items')}
                </h3>
                <div className="space-y-4">
                  {order.items.map((item: any, index: number) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-gray-900">{item.productName}</p>
                          <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600">
                            <span>Quantity: {item.quantity} {item.unit}</span>
                            <span>Packaging: {item.packaging}</span>
                            {item.customLabel && (
                              <span>Label: {item.customLabel}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status History */}
              {order.statusHistory && order.statusHistory.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Status History
                  </h3>
                  <div className="space-y-3">
                    {order.statusHistory.map((history: any, index: number) => (
                      <div key={index} className="flex items-start gap-4 border-l-2 border-primary-500 pl-4">
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">
                            {t(`statuses.${history.status}`)}
                          </p>
                          <p className="text-sm text-gray-600">
                            {formatDate(history.createdAt, locale)}
                          </p>
                          {history.notes && (
                            <p className="text-sm text-gray-500 mt-1">{history.notes}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Order Notes */}
              {order.notes && (
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Additional Notes
                  </h3>
                  <p className="text-gray-700">{order.notes}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

