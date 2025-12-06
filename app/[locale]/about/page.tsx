import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">About Us</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Leading manufacturer of premium natural oils with a commitment to quality and sustainability
          </p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                To be the leading global provider of premium natural oils, recognized for
                our commitment to quality, sustainability, and customer satisfaction.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We strive to deliver exceptional products that meet the highest international
                standards while supporting sustainable practices and environmental stewardship.
              </p>
            </div>
            <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-gray-400">Factory Image</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Production Capabilities */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Production Capabilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-md">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">State-of-the-Art Facility</h3>
              <p className="text-gray-700">
                Our modern manufacturing facility spans over 50,000 square meters, equipped
                with the latest technology and machinery.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-md">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Quality Control</h3>
              <p className="text-gray-700">
                Every batch undergoes rigorous testing and quality assurance to ensure
                consistency and excellence.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-md">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Sustainability</h3>
              <p className="text-gray-700">
                We are committed to sustainable sourcing and environmentally friendly
                production practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quality System */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Quality System
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Our quality management system is based on international standards including
              ISO, HACCP, and other relevant certifications. We maintain strict quality
              control procedures throughout the entire production process.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">ISO Certified</h3>
                <p className="text-gray-700">
                  Certified under ISO 9001:2015 for Quality Management Systems
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">HACCP Compliant</h3>
                <p className="text-gray-700">
                  Following Hazard Analysis and Critical Control Points protocols
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Certifications
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg p-6 shadow-md text-center">
                <div className="h-32 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-gray-400">Certificate {i}</span>
                </div>
                <p className="text-sm text-gray-600">ISO/HACCP Certificate</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

