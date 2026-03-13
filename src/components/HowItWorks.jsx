import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, FileText, CalendarCheck, Bell } from 'lucide-react'; // Changed Gavel to CalendarCheck, Key to Bell for buyer steps

const HowItWorks = ({ id }) => {
  const buyerSteps = [
    {
      icon: Search,
      title: 'Browse Properties',
      description: 'Search through verified sheriff sales and distressed assets using our advanced filters.'
    },
    {
      icon: FileText,
      title: 'Review Documentation',
      description: 'Access all verified legal documents and property details before making a decision.'
    },
    {
      icon: CalendarCheck, // Changed icon for "Make a Reservation"
      title: 'Make a Reservation', // Changed title
      description: 'Secure your interest by making a reservation on properties you wish to acquire.' // Changed description
    },
    {
      icon: Bell, // Changed icon for "Get Real Time Updates"
      title: 'Get Real Time Updates', // Changed title
      description: 'Stay informed with real-time notifications on property status and reservation progress.' // Changed description
    }
  ];

  const sheriffSteps = [
    {
      icon: FileText,
      title: 'List Your Assets',
      description: 'Upload property details, legal documents, and high-quality images to our platform.'
    },
    {
      icon: Search,
      title: 'Reach Buyers',
      description: 'Connect with verified buyers actively searching for sheriff sales and distressed assets.'
    },
    {
      icon: CalendarCheck, // Using CalendarCheck as a consistent icon for transaction/booking related steps
      title: 'Manage Reservations', // Changed title to reflect reservation management for sellers
      description: 'Control reservation settings, monitor buyer interest, and approve/decline requests.' // Updated description
    },
    {
      icon: Bell, // Using Bell for notifications/updates for sellers too
      title: 'Receive Real Time Updates', // Changed title for seller side
      description: 'Stay informed with notifications on new reservations, messages, and property activity.' // Updated description
    }
  ];

  return (
    <section id={id} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Simple steps to get started, whether you're buying or selling
          </p>
        </motion.div>

        <Tabs defaultValue="buyers" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
            <TabsTrigger value="buyers" className="text-base">For Buyers</TabsTrigger>
            <TabsTrigger value="sheriffs" className="text-base">For Sheriffs</TabsTrigger>
          </TabsList>

          <TabsContent value="buyers">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {buyerSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative"
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 bg-[#2563eb] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="text-[#2563eb]" size={32} />
                      </div>
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#2563eb] text-white rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="sheriffs">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {sheriffSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative"
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 bg-[#2563eb] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="text-[#2563eb]" size={32} />
                      </div>
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#2563eb] text-white rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default HowItWorks;