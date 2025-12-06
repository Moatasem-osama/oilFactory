'use client';

export function QualitySystem() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
        Quality Management System
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-gray-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">ISO 9001:2015</h3>
          <p className="text-gray-700">
            Certified under ISO 9001:2015 for Quality Management Systems, ensuring
            consistent quality in all our processes and products.
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">HACCP</h3>
          <p className="text-gray-700">
            Following Hazard Analysis and Critical Control Points protocols to
            ensure food safety and prevent hazards throughout production.
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">GMP</h3>
          <p className="text-gray-700">
            Adhering to Good Manufacturing Practices to ensure products are
            consistently produced and controlled according to quality standards.
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">COA</h3>
          <p className="text-gray-700">
            Certificate of Analysis (COA) provided with every shipment, confirming
            product specifications and quality parameters.
          </p>
        </div>
      </div>

      <div className="bg-primary-50 rounded-lg p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment</h3>
        <p className="text-lg text-gray-700 leading-relaxed">
          Quality is at the heart of everything we do. From raw material sourcing
          to final product delivery, we maintain rigorous quality control measures
          to ensure our customers receive only the finest natural oils. Our
          dedicated quality assurance team works continuously to improve our
          processes and exceed industry standards.
        </p>
      </div>
    </div>
  );
}

