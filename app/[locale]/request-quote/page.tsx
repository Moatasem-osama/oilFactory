import { RequestQuoteForm } from '@/components/request-quote/RequestQuoteForm';

export default function RequestQuotePage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Request Quote
          </h1>
          <RequestQuoteForm />
        </div>
      </div>
    </div>
  );
}

