/* src/pages/dashboard/AccountBilling.jsx */
import React from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';

const AccountBilling = () => {
  const features = [
    { name: 'Distressed Property Leads', free: 'check', basic: 'check', pro: 'check', enterprise: 'check' },
    { name: 'Favorites Limit', free: '10', basic: '100', pro: 'Unlimited', enterprise: 'Unlimited' },
    { name: 'Messaging System', free: 'cross', basic: 'check', pro: 'check', enterprise: 'check' },
    { name: 'Bulk PDF Export', free: 'cross', basic: 'cross', pro: 'check', enterprise: 'check' },
    { name: 'Advanced API Access', free: 'cross', basic: 'cross', pro: 'check', enterprise: 'check' },
    { name: 'Priority Support', free: 'cross', basic: 'cross', pro: 'cross', enterprise: 'check' },
  ];

  return (
    <DashboardLayout title="Account">
      <div className="max-w-6xl mx-auto">
        {/* Header Area */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h3 className="font-headline text-4xl font-extrabold tracking-tighter text-on-surface">Plan & Billing</h3>
            <p className="text-secondary mt-2 font-medium">Manage your institutional access and financial history.</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-2.5 text-destructive font-bold text-sm tracking-wide uppercase hover:bg-destructive/5 rounded-lg transition-colors">
            <span className="material-symbols-outlined text-lg">logout</span>
            Sign out
          </button>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Current Plan Card */}
          <div className="col-span-12 lg:col-span-5 bg-surface-container-lowest rounded-xl p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-8">
                <div className="bg-primary/10 text-primary px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                  Current Plan
                </div>
                <div className="text-right">
                  <span className="font-headline text-3xl font-extrabold text-on-surface">$0</span>
                  <span className="text-outline text-sm">/mo</span>
                </div>
              </div>
              <h4 className="font-headline text-5xl font-black mb-2 text-on-surface">Free</h4>
              <p className="text-secondary text-sm mb-10">Standard intelligence tier for individual researchers.</p>
              
              {/* Usage Statistics */}
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2 uppercase tracking-tighter text-on-surface">
                    <span>Favorites Used</span>
                    <span>0/10</span>
                  </div>
                  <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[0%]"></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-surface-container-low rounded-xl flex flex-col items-center justify-center text-center opacity-60">
                    <span className="material-symbols-outlined text-outline mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">Messages</span>
                    <span className="text-xs font-medium text-on-surface">Locked</span>
                  </div>
                  <div className="p-4 bg-surface-container-low rounded-xl flex flex-col items-center justify-center text-center opacity-60">
                    <span className="material-symbols-outlined text-outline mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">Documents</span>
                    <span className="text-xs font-medium text-on-surface">Locked</span>
                  </div>
                </div>
              </div>
            </div>
            <button className="w-full mt-12 bg-primary hover:bg-primary-deep text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all uppercase tracking-widest text-xs">
              Upgrade Intelligence Tier
            </button>
          </div>

          {/* Comparison Table */}
          <div className="col-span-12 lg:col-span-7 bg-surface-container-low rounded-xl p-8 border border-white/50 overflow-hidden">
            <h5 className="font-headline text-xl font-extrabold mb-8 text-on-surface">Tier Comparison</h5>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] uppercase tracking-widest text-outline font-black border-b border-outline-variant/20">
                    <th className="pb-4 font-black">Features</th>
                    <th className="pb-4 px-4 text-center">Free</th>
                    <th className="pb-4 px-4 text-center text-primary">Basic</th>
                    <th className="pb-4 px-4 text-center">Pro</th>
                    <th className="pb-4 px-4 text-center">Ent.</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {features.map((feature, idx) => (
                    <tr key={idx} className="border-b border-outline-variant/10">
                      <td className="py-4 font-medium text-on-surface">{feature.name}</td>
                      <td className="py-4 text-center">
                        {feature.free === 'check' ? <span className="material-symbols-outlined text-primary text-lg">check_circle</span> : 
                         feature.free === 'cross' ? <span className="material-symbols-outlined text-outline/20 text-lg">cancel</span> : 
                         <span className="text-outline/60">{feature.free}</span>}
                      </td>
                      <td className="py-4 text-center">
                        {feature.basic === 'check' ? <span className="material-symbols-outlined text-primary text-lg">check_circle</span> : 
                         feature.basic === 'cross' ? <span className="material-symbols-outlined text-outline/20 text-lg">cancel</span> : 
                         <span className="font-bold text-on-surface">{feature.basic}</span>}
                      </td>
                      <td className="py-4 text-center">
                        {feature.pro === 'check' ? <span className="material-symbols-outlined text-primary text-lg">check_circle</span> : 
                         feature.pro === 'cross' ? <span className="material-symbols-outlined text-outline/20 text-lg">cancel</span> : 
                         <span className="font-bold text-on-surface">{feature.pro}</span>}
                      </td>
                      <td className="py-4 text-center">
                        {feature.enterprise === 'check' ? <span className="material-symbols-outlined text-primary text-lg">check_circle</span> : 
                         feature.enterprise === 'cross' ? <span className="material-symbols-outlined text-outline/20 text-lg">cancel</span> : 
                         <span className="font-bold text-on-surface">{feature.enterprise}</span>}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td className="py-4 font-black text-on-surface uppercase tracking-widest text-[10px]">Price / Mo</td>
                    <td className="py-4 text-center font-bold font-headline text-on-surface">$0</td>
                    <td className="py-4 text-center font-bold font-headline text-primary">$15</td>
                    <td className="py-4 text-center font-bold font-headline text-on-surface">$30</td>
                    <td className="py-4 text-center font-bold font-headline text-on-surface">$45</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Empty Sections Bento Grid */}
          <div className="col-span-12 md:col-span-6 bg-surface-container-lowest rounded-xl p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8 cursor-pointer group">
              <h5 className="font-headline text-lg font-extrabold uppercase tracking-tight text-on-surface">Payment Methods</h5>
              <button className="text-primary text-xs font-black uppercase tracking-widest hover:underline">+ Add Card</button>
            </div>
            <div className="border-2 border-dashed border-outline-variant/30 rounded-xl py-12 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-10 bg-surface-container-low rounded-lg flex items-center justify-center mb-4 text-outline/20">
                <span className="material-symbols-outlined">credit_card</span>
              </div>
              <p className="text-xs font-bold text-outline/40 uppercase tracking-widest">No active payment methods</p>
              <p className="text-xs text-outline/30 mt-1 max-w-[200px]">Securely store cards for instant tier upgrades.</p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 bg-surface-container-lowest rounded-xl p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h5 className="font-headline text-lg font-extrabold uppercase tracking-tight text-on-surface">Invoices</h5>
              <button className="text-outline/30 text-xs font-black uppercase tracking-widest cursor-not-allowed">Export All</button>
            </div>
            <div className="border-2 border-dashed border-outline-variant/30 rounded-xl py-12 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 bg-surface-container-low rounded-full flex items-center justify-center mb-4 text-outline/20">
                <span className="material-symbols-outlined">receipt_long</span>
              </div>
              <p className="text-xs font-bold text-outline/40 uppercase tracking-widest">Transaction history empty</p>
              <p className="text-xs text-outline/30 mt-1 max-w-[200px]">Your billing history will appear here once you subscribe.</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AccountBilling;
