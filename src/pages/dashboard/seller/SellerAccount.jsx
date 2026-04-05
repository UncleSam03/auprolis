/* src/pages/dashboard/seller/SellerAccount.jsx */
import React from 'react';
import SellerDashboardLayout from '../../../components/dashboard/SellerDashboardLayout';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const SellerAccount = () => {
  const { signOut } = useAuth();
  
  const plans = [
    { name: 'Basic', price: '15', desc: 'Entry Level', features: ['5 Active Listings', 'Basic Analytics', 'Email Support'], action: 'Downgrade', active: false },
    { name: 'Pro', price: '30', desc: 'Recommended', features: ['20 Active Listings', 'Advanced Filters', 'PDF Reports', 'Verified Badge'], action: 'Current Plan', active: true, highlighted: true },
    { name: 'Enterprise', price: '45', desc: 'Institutional', features: ['Unlimited Listings', 'Custom API Access', 'Team Accounts', '24/7 Priority'], action: 'Upgrade', active: false, dark: true },
  ];

  return (
    <SellerDashboardLayout title="Account & Plan">
      <div className="max-w-[1200px] mx-auto space-y-16 pb-24">
        {/* Page Header */}
        <header className="flex justify-between items-start">
          <div>
            <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4 block font-headline">Strategic Management</p>
            <h2 className="text-5xl font-[900] font-headline tracking-tighter text-on-surface leading-none mb-6">Account & Billing</h2>
            <p className="text-lg text-on-surface-variant font-medium opacity-60 leading-relaxed max-w-2xl">
              Manage your commercial real estate subscription, monitor intelligence usage, and review your institutional-grade billing history.
            </p>
          </div>
          <button 
            onClick={signOut}
            className="flex items-center gap-3 px-8 py-3.5 bg-surface-container-low text-destructive font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:bg-white hover:shadow-authoritative transition-all group"
          >
            <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">logout</span>
            Sign Out
          </button>
        </header>

        {/* Current Plan & Usage Bento */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-12 lg:col-span-7 bg-surface-container-lowest rounded-[2.5rem] p-12 shadow-authoritative border border-outline-variant/10 flex flex-col justify-between group relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-10">
                <div>
                  <span className="bg-secondary/10 text-secondary px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest mb-4 inline-block shadow-sm">Active Subscription</span>
                  <h3 className="text-5xl font-[900] text-primary font-headline tracking-tighter leading-none">Pro Plan</h3>
                </div>
                <div className="text-right">
                  <p className="text-5xl font-[900] text-on-surface font-headline tracking-tighter leading-none">P30<span className="text-xl font-medium opacity-40">/mo</span></p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-outline/40 mt-3">Billed Monthly</p>
                </div>
              </div>
              <p className="text-base text-on-surface-variant font-medium opacity-60 mb-12 max-w-md leading-relaxed italic">"Unlocking full editorial intelligence tools, high-fidelity data exports, and premium listing visibility."</p>
              
              <div className="grid grid-cols-2 gap-8 mb-16">
                {['Priority Support 24/7', 'Custom Analytics API', 'Unlimited Media', 'Verified Badge'].map((f, i) => (
                  <div key={i} className="flex items-center gap-4 group/item">
                    <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover/item:scale-110 transition-transform shadow-inner">
                      <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    </div>
                    <span className="text-sm font-bold text-on-surface/80 group-hover/item:text-primary transition-colors">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-6 relative z-10">
              <button className="bg-primary text-white px-10 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 hover:scale-[1.03] active:scale-95 transition-all">Manage Subscription</button>
              <button className="px-10 py-5 rounded-full border-2 border-outline-variant/10 text-on-surface-variant font-black text-[10px] uppercase tracking-[0.2em] hover:bg-surface-container-low transition-all">View All Features</button>
            </div>
            
            {/* Background design */}
            <div className="absolute -bottom-10 -right-10 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-1000">
              <span className="material-symbols-outlined text-[300px]">verified</span>
            </div>
          </div>

          <div className="md:col-span-12 lg:col-span-5 bg-surface-container-low/50 rounded-[2.5rem] p-12 border border-outline-variant/5 shadow-inner flex flex-col gap-10">
            <h3 className="text-2xl font-[800] font-headline text-on-surface tracking-tighter leading-none mb-4">Intelligence Usage</h3>
            <div className="space-y-10">
              <div>
                <div className="flex justify-between items-end mb-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60">Active Listing Count</p>
                  <p className="font-[900] text-primary tracking-tighter">24 / 50</p>
                </div>
                <div className="h-3 w-full bg-surface-container-high rounded-full overflow-hidden shadow-inner">
                  <div className="h-full bg-primary rounded-full shadow-[0_0_10px_var(--primary)]" style={{ width: '48%' }}></div>
                </div>
                <p className="text-[9px] font-black uppercase tracking-widest text-outline/30 mt-3">48% of capacity utilized</p>
              </div>

              <div>
                <div className="flex justify-between items-end mb-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60">Monthly Data Analytics</p>
                  <p className="font-[900] text-tertiary tracking-tighter">112 / 200</p>
                </div>
                <div className="h-3 w-full bg-surface-container-high rounded-full overflow-hidden shadow-inner">
                  <div className="h-full bg-tertiary rounded-full shadow-[0_0_10px_var(--tertiary)]" style={{ width: '56%' }}></div>
                </div>
                <p className="text-[9px] font-black uppercase tracking-widest text-outline/30 mt-3">Resets in 12 days</p>
              </div>
            </div>
            
            <div className="mt-auto p-6 bg-white/50 rounded-3xl border border-outline-variant/10 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 shadow-inner">
                <span className="material-symbols-outlined text-xl">info</span>
              </div>
              <p className="text-xs font-medium text-on-surface-variant leading-relaxed tracking-tight">
                Approaching mid-tier limits. Consider the <strong className="text-on-surface font-black uppercase tracking-widest text-[9px] ml-1">Enterprise Strategy</strong> for unlimited institutional volume.
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Comparison */}
        <section className="space-y-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <h3 className="text-3xl font-[800] font-headline text-on-surface tracking-tighter leading-none">Available Intelligence Tiers</h3>
            <div className="flex bg-surface-container-low p-2 rounded-full shadow-inner border border-outline-variant/5">
              <button className="px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-white shadow-xl shadow-primary/5 text-primary">Monthly</button>
              <button className="px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest text-outline/40 hover:text-on-surface transition-colors">Annual (Save 20%)</button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {plans.map((plan, idx) => (
              <div 
                key={idx} 
                className={`p-12 rounded-[2.5rem] relative transition-all duration-500 hover:scale-[1.03] group ${
                  plan.highlighted ? 'bg-white shadow-[0_40px_80px_rgba(38,75,221,0.15)] ring-4 ring-primary/20 scale-105 z-10' : 
                  plan.dark ? 'bg-on-background text-white shadow-authoritative' : 
                  'bg-surface-container-low/30 border border-outline-variant/10 hover:bg-white hover:shadow-authoritative'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[9px] font-black uppercase tracking-[0.2em] px-6 py-2 rounded-full shadow-2xl">Recommended</div>
                )}
                <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-6 ${plan.dark ? 'text-white/40' : 'text-outline/40'}`}>{plan.desc}</p>
                <h4 className={`text-2xl font-[900] font-headline mb-4 tracking-tighter ${plan.dark ? 'text-white' : 'text-on-surface'}`}>{plan.name}</h4>
                <p className={`text-5xl font-[900] font-headline mb-12 tracking-tighter ${plan.dark ? 'text-white' : 'text-on-surface'}`}>
                  P{plan.price}<span className={`text-lg font-medium opacity-40 ml-1 ${plan.dark ? 'text-white/40' : 'text-on-surface/40'}`}>/mo</span>
                </p>
                
                <ul className="space-y-6 mb-16">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-4 group/item">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${plan.dark ? 'bg-white/10 text-secondary' : 'bg-primary/5 text-primary'}`}>
                        <span className="material-symbols-outlined text-sm font-black">check</span>
                      </div>
                      <span className={`text-xs font-bold ${plan.dark ? 'text-white/70' : 'text-on-surface/70'}`}>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full py-5 rounded-full font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-xl hover:shadow-2xl ${
                  plan.active ? 'bg-primary/10 text-primary cursor-default' : 
                  plan.dark ? 'bg-white text-on-background hover:bg-secondary hover:text-white' : 
                  'bg-white text-on-surface border border-outline-variant/10 hover:bg-primary hover:text-white'
                }`}>
                  {plan.action}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Invoice History */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-[800] font-headline text-on-surface tracking-tighter leading-none">Invoice History</h3>
            <button className="text-[10px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-3 hover:underline">
              <span className="material-symbols-outlined text-xl">file_download</span>
              Export All
            </button>
          </div>
          
          <div className="bg-surface-container-low/30 rounded-[2.5rem] border-2 border-dashed border-outline-variant/20 flex flex-col items-center justify-center p-20 text-center group hover:bg-white transition-all shadow-sm">
            <div className="w-24 h-24 rounded-[2rem] bg-surface-container-high flex items-center justify-center text-outline/20 mb-8 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-transform">
              <span className="material-symbols-outlined text-5xl">receipt_long</span>
            </div>
            <div>
              <p className="text-xl font-[800] font-headline text-on-surface tracking-tight mb-2">No recent invoices found</p>
              <p className="text-sm font-medium text-on-surface-variant opacity-60 max-w-sm mx-auto leading-relaxed italic">Your upcoming billing cycle ends on Nov 30. Your institutional report will appear here once processed.</p>
            </div>
          </div>
        </section>

        {/* Secondary Account Actions */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-surface-container-lowest p-10 rounded-[2.5rem] flex items-center gap-10 group cursor-pointer hover:bg-white transition-all shadow-authoritative border border-outline-variant/5">
            <div className="w-20 h-20 rounded-3xl bg-secondary/10 flex items-center justify-center text-secondary shadow-inner group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>credit_card</span>
            </div>
            <div>
              <h4 className="text-2xl font-[800] font-headline text-on-surface tracking-tight mb-1">Payment Strategy</h4>
              <p className="text-[10px] font-black uppercase tracking-widest text-outline/40">Visa ending in •••• 4242</p>
            </div>
            <span className="material-symbols-outlined ml-auto text-outline/20 group-hover:text-primary group-hover:translate-x-2 transition-all">chevron_right</span>
          </div>

          <div className="bg-surface-container-lowest p-10 rounded-[2.5rem] flex items-center gap-10 group cursor-pointer hover:bg-white transition-all shadow-authoritative border border-outline-variant/5">
            <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary shadow-inner group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>policy</span>
            </div>
            <div>
              <h4 className="text-2xl font-[800] font-headline text-on-surface tracking-tight mb-1">Security Shield</h4>
              <p className="text-[10px] font-black uppercase tracking-widest text-outline/40">2FA Enabled • Last Login 2h ago</p>
            </div>
            <span className="material-symbols-outlined ml-auto text-outline/20 group-hover:text-primary group-hover:translate-x-2 transition-all">chevron_right</span>
          </div>
        </section>
      </div>
    </SellerDashboardLayout>
  );
};

export default SellerAccount;
