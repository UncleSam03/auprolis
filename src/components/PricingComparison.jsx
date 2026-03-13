import React from 'react';
import { Check, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const PricingComparison = () => {
  const { toast } = useToast();

  const handleUpgrade = (plan) => {
    toast({
      title: "Upgrade Initiated",
      description: `Processing upgrade to ${plan} plan...`
    });
  };

  const features = [
    { name: 'Property Listings Access', basic: true, pro: true, ent: true },
    { name: 'Standard Search Filters', basic: true, pro: true, ent: true },
    { name: 'Email Notifications', basic: true, pro: true, ent: true },
    { name: 'Saved Favorites', basic: '10 Properties', pro: 'Unlimited', ent: 'Unlimited' },
    { name: 'Advanced Filters (Price, Type)', basic: false, pro: true, ent: true },
    { name: 'Document Verification', basic: false, pro: true, ent: true },
    { name: 'Sheriff Messaging', basic: false, pro: true, ent: true },
    { name: 'Real-time Updates', basic: false, pro: true, ent: true },
    { name: 'Property Analytics', basic: false, pro: false, ent: true },
    { name: 'Data Export (CSV/PDF)', basic: false, pro: false, ent: true },
    { name: 'Verified User Badge', basic: false, pro: false, ent: true },
    { name: 'Dedicated Account Manager', basic: false, pro: false, ent: true },
  ];

  const RenderCheck = ({ val }) => {
    if (val === true) return <Check className="w-5 h-5 text-green-500 mx-auto" />;
    if (val === false) return <Minus className="w-5 h-5 text-gray-300 mx-auto" />;
    return <span className="text-sm font-medium text-gray-900">{val}</span>;
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Compare Plans</h2>
          <p className="text-gray-600 mt-2">Detailed feature breakdown</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-4 px-6 text-left text-gray-500 font-medium w-1/3">Features</th>
                <th className="py-4 px-6 text-center w-1/5">
                  <div className="font-bold text-xl text-gray-900">Basic</div>
                  <div className="text-sm text-blue-600">$15/mo</div>
                </th>
                <th className="py-4 px-6 text-center w-1/5 bg-blue-50/50 rounded-t-lg">
                  <div className="font-bold text-xl text-[#2563eb]">Pro</div>
                  <div className="text-sm text-blue-600">$30/mo</div>
                </th>
                <th className="py-4 px-6 text-center w-1/5">
                  <div className="font-bold text-xl text-gray-900">Enterprise</div>
                  <div className="text-sm text-blue-600">$45/mo</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, idx) => (
                <tr key={idx} className={`border-b border-gray-100 hover:bg-gray-50 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                  <td className="py-4 px-6 text-gray-700 font-medium">{feature.name}</td>
                  <td className="py-4 px-6 text-center"><RenderCheck val={feature.basic} /></td>
                  <td className="py-4 px-6 text-center bg-blue-50/30"><RenderCheck val={feature.pro} /></td>
                  <td className="py-4 px-6 text-center"><RenderCheck val={feature.ent} /></td>
                </tr>
              ))}
              <tr>
                <td className="py-6 px-6"></td>
                <td className="py-6 px-6 text-center">
                  <Button variant="outline" className="w-full" onClick={() => handleUpgrade('Basic')}>Choose Basic</Button>
                </td>
                <td className="py-6 px-6 text-center bg-blue-50/30">
                  <Button className="w-full bg-[#2563eb] hover:bg-[#1d4ed8]" onClick={() => handleUpgrade('Pro')}>Choose Pro</Button>
                </td>
                <td className="py-6 px-6 text-center">
                  <Button variant="outline" className="w-full border-slate-900 text-slate-900" onClick={() => handleUpgrade('Enterprise')}>Contact Sales</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default PricingComparison;