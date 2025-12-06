import { TestimonialsList } from '@/components/testimonials/TestimonialsList';

export default function TestimonialsPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Client Testimonials</h1>
          <p className="text-xl max-w-3xl mx-auto">
            What our clients say about working with us
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TestimonialsList />
        </div>
      </section>
    </div>
  );
}

