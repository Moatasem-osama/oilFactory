import { ContactForm } from '@/components/contact/ContactForm';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Get in touch with us for any inquiries or support
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <ContactForm />
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                    <p className="text-gray-700">
                      123 Factory Street<br />
                      Industrial District<br />
                      City, Country 12345
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-primary-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                    <a href="tel:+1234567890" className="text-primary-600 hover:text-primary-700">
                      +1 234 567 890
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-primary-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <a href="mailto:info@oilfactory.com" className="text-primary-600 hover:text-primary-700">
                      info@oilfactory.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MessageCircle className="h-6 w-6 text-primary-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">WhatsApp</h3>
                    <a
                      href="https://wa.me/1234567890"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700"
                    >
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map Placeholder */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Location</h2>
              <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">Google Map will be embedded here</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

