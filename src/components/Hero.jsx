import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Search, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleClick = () => {
    toast({
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-[#2563eb] to-[#1e40af] text-white py-20 lg:py-32 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-blue-400 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-800/50 border border-blue-400/30 text-sm font-medium text-blue-100">
               Plans start at <span className="text-white font-bold">$15/mo</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Botswana's first distressed property intelligence platform
            </h1>
            <p className="text-lg sm:text-xl mb-8 text-blue-100">
              Get early access to repossessed court-ordered, and auction properties - updated daily and verified from trusted sources.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleClick}
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 text-lg font-semibold px-8"
              >
                Start Browsing
              </Button>
              <Button 
                onClick={scrollToPricing}
                size="lg"
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white text-lg px-8"
              >
                View Plans <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-6 space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">Find Your Property</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Search by location or property type"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                />
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2563eb]">
                  <option>Property Type</option>
                  <option>Residential</option>
                  <option>Commercial</option>
                  <option>Land</option>
                </select>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2563eb]">
                  <option>Price Range</option>
                  <option>Under P100,000</option>
                  <option>P100,000 - P500,000</option>
                  <option>P500,000 - P1,000,000</option>
                  <option>Over P1,000,000</option>
                </select>
                <Button
                  onClick={handleClick}
                  className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white py-3"
                >
                  <Search className="mr-2" size={20} />
                  Search Properties
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;