export default function ShippingPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Shipping & Export Policy</h1>
          
          <div className="prose max-w-none space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Shipping Methods</h2>
              <p>
                We offer various shipping methods depending on the order size, destination, and customer
                requirements. Common shipping methods include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Sea freight (for large bulk orders)</li>
                <li>Air freight (for urgent shipments)</li>
                <li>Ground transportation (for local deliveries)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Shipping Terms (Incoterms)</h2>
              <p>We work with various Incoterms including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>EXW (Ex Works)</li>
                <li>FOB (Free On Board)</li>
                <li>CIF (Cost, Insurance and Freight)</li>
                <li>CFR (Cost and Freight)</li>
                <li>DDP (Delivered Duty Paid)</li>
              </ul>
              <p className="mt-4">
                The specific Incoterms will be agreed upon during the order process and stated in the
                commercial invoice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Delivery Times</h2>
              <p>
                Delivery times vary based on the destination, shipping method, and order size.
                Estimated delivery times will be provided with your order quotation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Export Documentation</h2>
              <p>We provide all necessary export documentation including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Commercial Invoice</li>
                <li>Packing List</li>
                <li>Certificate of Origin</li>
                <li>Certificate of Analysis (COA)</li>
                <li>Material Safety Data Sheet (MSDS)</li>
                <li>Bill of Lading / Air Waybill</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Customs and Duties</h2>
              <p>
                Import duties, taxes, and customs fees are the responsibility of the buyer unless
                otherwise specified in the Incoterms agreement (e.g., DDP).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Insurance</h2>
              <p>
                Insurance coverage will be specified in the shipping terms. We recommend adequate
                insurance coverage for all shipments.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
              <p>
                For shipping inquiries, please contact our logistics team:
                <br />
                Email: shipping@oilfactory.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

