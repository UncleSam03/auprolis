import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const AdditionalFeatures = () => {
  const additionalFeatures = [
    'Advanced search filters for quick property discovery',
    'Detailed property information and high-quality images',
    'Legal compliance and regulatory guidance',
    'Market insights and property valuation tools',
    'Bidding history and auction analytics',
    'Dedicated customer support team'
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img className="rounded-2xl shadow-2xl w-full" alt="Professional team reviewing property documents" src="https://images.unsplash.com/photo-1519515610653-d54c776c9901" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Everything You Need in One Platform
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Our comprehensive platform provides all the tools and features you need for successful property transactions.
            </p>
            <div className="space-y-4">
              {additionalFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="text-[#2563eb] flex-shrink-0 mt-1" size={24} />
                  <p className="text-gray-700">{feature}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AdditionalFeatures;