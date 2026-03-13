import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, FileCheck, MessageSquare, CreditCard, Bell, Shield } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Calendar,
      title: 'Easy Reservations',
      description: 'Reserve properties with just a few clicks. Simple and hassle-free process.'
    },
    {
      icon: FileCheck,
      title: 'Verified Documentation',
      description: 'All documents are verified and authenticated for your peace of mind.'
    },
    {
      icon: MessageSquare,
      title: 'Direct Messaging',
      description: 'Communicate directly with sheriffs and sellers through our platform.'
    },
    {
      icon: CreditCard,
      title: 'Secure Payments',
      description: 'Safe and secure payment processing with multiple payment options.'
    },
    {
      icon: Bell,
      title: 'Real-Time Updates',
      description: 'Get instant notifications about new listings and auction updates.'
    },
    {
      icon: Shield,
      title: 'Transparent Process',
      description: 'Complete transparency throughout the entire transaction process.'
    }
  ];

  return (
    <section className="py-20 bg-[#E6ECF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Why Choose Auprolis?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience a streamlined process with features designed for both buyers and sheriffs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-[#2563eb] bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="text-[#2563eb]" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;