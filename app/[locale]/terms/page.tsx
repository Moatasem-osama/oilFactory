export default function TermsPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms & Conditions</h1>
          
          <div className="prose max-w-none space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Agreement to Terms</h2>
              <p>
                By accessing and using this website, you agree to be bound by these Terms and Conditions.
                If you do not agree with any part of these terms, please do not use our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Orders and Payment</h2>
              <p>
                All orders are subject to acceptance by Oil Factory. Prices are subject to change without notice.
                Payment terms will be agreed upon during the order process.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Shipping and Delivery</h2>
              <p>
                Shipping terms will be specified in your order confirmation. Delivery times are estimates
                and may vary based on location and circumstances beyond our control.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Information</h2>
              <p>
                We strive to provide accurate product information, but we do not warrant that product
                descriptions or other content on this site is accurate, complete, or error-free.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
              <p>
                Oil Factory shall not be liable for any indirect, incidental, or consequential damages
                arising from the use of our products or services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <p>
                For questions about these Terms & Conditions, please contact us at:
                <br />
                Email: legal@oilfactory.com
              </p>
            </section>

            <section>
              <p className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

