'use client';

import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'John Smith',
    company: 'ABC Trading Co.',
    country: 'United States',
    rating: 5,
    comment: 'Excellent quality products and outstanding customer service. Highly recommended!',
    image: '/testimonials/client1.jpg',
  },
  {
    id: 2,
    name: 'Ahmed Al-Mansoori',
    company: 'Gulf Oils LLC',
    country: 'UAE',
    rating: 5,
    comment: 'We have been working with them for 3 years. Consistently high quality and reliable delivery.',
    image: '/testimonials/client2.jpg',
  },
  {
    id: 3,
    name: 'Maria Garcia',
    company: 'European Imports',
    country: 'Spain',
    rating: 5,
    comment: 'Professional team, great communication, and products that exceed expectations.',
    image: '/testimonials/client3.jpg',
  },
  {
    id: 4,
    name: 'David Chen',
    company: 'Asia Pacific Trading',
    country: 'Singapore',
    rating: 5,
    comment: 'Best supplier we have worked with. Quality, pricing, and service are all excellent.',
    image: '/testimonials/client4.jpg',
  },
  {
    id: 5,
    name: 'Fatima Ibrahim',
    company: 'Middle East Distributors',
    country: 'Saudi Arabia',
    rating: 5,
    comment: 'Their white label service helped us launch our brand successfully. Great partnership!',
    image: '/testimonials/client5.jpg',
  },
  {
    id: 6,
    name: 'Michael Johnson',
    company: 'Global Oils Inc.',
    country: 'United Kingdom',
    rating: 5,
    comment: 'Outstanding quality control and certifications. Perfect for our B2B needs.',
    image: '/testimonials/client6.jpg',
  },
];

export function TestimonialsList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {testimonials.map((testimonial) => (
        <div
          key={testimonial.id}
          className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow"
        >
          {/* Rating */}
          <div className="flex gap-1 mb-4">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star
                key={i}
                className="h-5 w-5 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>

          {/* Comment */}
          <p className="text-gray-700 mb-6 leading-relaxed italic">
            "{testimonial.comment}"
          </p>

          {/* Client Info */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-primary-600 font-semibold">
                {testimonial.name.charAt(0)}
              </span>
            </div>
            <div>
              <p className="font-semibold text-gray-900">{testimonial.name}</p>
              <p className="text-sm text-gray-600">{testimonial.company}</p>
              <p className="text-xs text-gray-500">{testimonial.country}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

