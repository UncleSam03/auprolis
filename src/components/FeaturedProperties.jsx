import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { usePropertyData } from '@/hooks/usePropertyData';
import PropertyCard from '@/components/PropertyCard';
import { Loader2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FeaturedProperties = ({ id = "featured-properties" }) => {
  const navigate = useNavigate();
  const { properties, loading, error, subscriptionType } = usePropertyData();

  return (
    <section className="py-20 bg-gray-50" id={id}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Featured Properties
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse our selection of verified sheriff sales and distressed assets
          </p>
        </motion.div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl h-96 animate-pulse shadow-sm border border-gray-100 flex items-center justify-center">
                 <Loader2 className="w-8 h-8 text-gray-300 animate-spin" />
              </div>
            ))}
          </div>
        ) : error ? (
           <div className="text-center py-12 bg-red-50 rounded-lg mb-12 border border-red-100">
              <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-2" />
              <p className="text-red-600 font-medium">Unable to load featured properties.</p>
           </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {properties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <PropertyCard property={property} subscriptionType={subscriptionType || 'basic'} />
              </motion.div>
            ))}
          </div>
        )}

        <div className="text-center">
          <Button
            onClick={() => navigate('/dashboard')}
            size="lg"
            variant="outline"
            className="border-2 border-[#2563eb] text-[#2563eb] hover:bg-[#2563eb] hover:text-white"
          >
            View All Properties
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;