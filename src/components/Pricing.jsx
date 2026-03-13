import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, Star } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Pricing = () => {
  const { toast } = useToast();

  const handleSubscribe = (plan) => {
    toast({
      title: `Selected ${plan} Plan`,
      description: "Redirecting to payment gateway...",
    });
  };

  const plans = [
    {
      name: 'Basic',
      price: '$15',
      period: 'per month',
      target: 'Individual buyers & First-timers',
      features: [
        'Full access to property listings',
        'Standard search filters',
        'Email notifications for new sales',
        'Save up to 10 favorite properties'
      ],
      highlighted: false,
      color: 'bg-white',
      buttonVariant: 'outline'
    },
    {
      name: 'Pro',
      price: '$30',
      period: 'per month',
      target: 'Regular investors & small agencies',
      features: [
        'Everything in Basic',
        'Advanced search filters (Price, Type, Location)',
        'Document verification & Deed views',
        'Priority real-time auction updates',
        'Direct messaging with sheriffs',
        'Save unlimited favorite properties'
      ],
      highlighted: true,
      color: 'bg-gradient-to-b from-blue-50 to-white border-blue-200',
      buttonVariant: 'default'
    },
    {
      name: 'Enterprise',
      price: '$45',
      period: 'per month',
      target: 'Professional investors & legal firms',
      features: [
        'Everything in Pro',
        'Detailed property analytics & reports',
        'Exportable property data (PDF/CSV)',
        'Verified user badge for higher trust',
        'Dedicated account manager & Premium support'
      ],
      highlighted: false,
      color: 'bg-white',
      buttonVariant: 'outline'
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-[#E6ECF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Transparent Pricing Plans
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the right tools for your investment journey
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`relative rounded-2xl p-8 shadow-xl border flex flex-col ${
                plan.highlighted 
                  ? 'ring-4 ring-[#2563eb]/20 border-[#2563eb] ' + plan.color 
                  : 'border-gray-100 ' + plan.color
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#2563eb] text-white text-sm font-bold px-4 py-1 rounded-full shadow-md flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" /> Recommended
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{plan.target}</p>
              </div>

              <div className="mb-6 pb-6 border-b border-gray-100">
                <div className="flex items-baseline">
                  <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                  <span className="text-gray-500 ml-2 font-medium">/ {plan.period}</span>
                </div>
              </div>

              <div className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                       <Check className="text-green-600 w-3 h-3" />
                    </div>
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                onClick={() => handleSubscribe(plan.name)}
                className={`w-full ${
                  plan.highlighted
                    ? 'bg-[#2563eb] hover:bg-[#1d4ed8] text-white'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
                size="lg"
                variant={plan.buttonVariant === 'outline' ? 'default' : 'default'}
              >
                Choose {plan.name}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;