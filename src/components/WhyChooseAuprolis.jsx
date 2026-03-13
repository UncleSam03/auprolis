import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Users, CheckCircle2, Gavel } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const WhyChooseAuprolis = ({ id }) => {
  const features = [
    {
      icon: <ShieldCheck className="w-10 h-10 text-blue-600" />,
      title: "Verified Listings",
      description: "Every property is vetted by legal professionals and deputy sheriffs to ensure complete legitimacy and accuracy.",
      gradient: "from-blue-50 to-indigo-50"
    },
    {
      icon: <Zap className="w-10 h-10 text-amber-500" />,
      title: "Streamlined Process",
      description: "Skip the red tape. Our digital platform handles documentation, reservations, and compliance instantly.",
      gradient: "from-amber-50 to-orange-50"
    },
    {
      icon: <Users className="w-10 h-10 text-green-600" />,
      title: "Direct Access",
      description: "Connect directly with sellers and sheriffs without intermediaries complicating the communication.",
      gradient: "from-green-50 to-emerald-50"
    },
    {
      icon: <CheckCircle2 className="w-10 h-10 text-purple-600" />,
      title: "Secure Transactions",
      description: "Bank-grade security protocols protect your data and payments throughout the entire purchasing journey.",
      gradient: "from-purple-50 to-pink-50"
    }
  ];

  return (
    <section id={id} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-4">
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
              The Auprolis Advantage
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            Why Choose Auprolis?
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We're revolutionizing the distressed property market with technology that brings transparency, speed, and trust to every deal.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`h-full border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br ${feature.gradient}`}>
                <CardHeader>
                  <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm mb-4 mx-auto md:mx-0">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-900 text-center md:text-left">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 leading-relaxed text-center md:text-left">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseAuprolis;