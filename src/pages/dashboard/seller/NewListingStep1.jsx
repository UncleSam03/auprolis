/* src/pages/dashboard/seller/NewListingStep1.jsx */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SellerDashboardLayout from '../../../components/dashboard/SellerDashboardLayout';
import SellerStepper from '../../../components/dashboard/seller/SellerStepper';

const NewListingStep1 = () => {
  const navigate = useNavigate();

  return (
    <SellerDashboardLayout title="Create New Listing">
      <div className="max-w-4xl mx-auto">
        <SellerStepper currentStep={1} />

        <div className="bg-surface-container-lowest rounded-3xl shadow-authoritative border border-outline-variant/15 overflow-hidden">
          <div className="p-12">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-12 w-12 rounded-2xl bg-surface-container-low flex items-center justify-center text-primary group hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>location_city</span>
              </div>
              <div>
                <h3 className="text-2xl font-[800] text-on-surface font-headline leading-none">Basics & Location</h3>
                <p className="text-on-surface-variant text-sm mt-1 font-medium opacity-60">Establish the core identity of your property asset.</p>
              </div>
            </div>

            <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-60 ml-1 font-headline">Property Type</label>
                  <div className="relative">
                    <select className="w-full bg-surface-container-low border-none rounded-2xl py-5 px-6 focus:ring-2 focus:ring-primary/20 appearance-none text-sm font-bold text-on-surface cursor-pointer">
                      <option>Residential Multi-Family</option>
                      <option>Commercial Office</option>
                      <option>Industrial Warehouse</option>
                      <option>Retail Complex</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-outline/40" style={{ fontVariationSettings: "'FILL' 1" }}>expand_more</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-60 ml-1 font-headline">Target List Price (USD)</label>
                  <div className="relative">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-outline/40 font-black text-xs">$</span>
                    <input 
                      className="w-full bg-surface-container-low border-none rounded-2xl py-5 pl-10 pr-6 focus:ring-2 focus:ring-primary/20 text-sm font-[800] text-on-surface placeholder:text-outline/20" 
                      placeholder="1,250,000" 
                      type="text"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-60 ml-1 font-headline">Listing Title</label>
                <input 
                  className="w-full bg-surface-container-low border-none rounded-2xl py-5 px-6 focus:ring-2 focus:ring-primary/20 text-sm font-bold text-on-surface placeholder:text-outline/20" 
                  placeholder="e.g. Prime Midtown Multi-Family Distressed Asset" 
                  type="text"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-60 ml-1 font-headline">Property Location</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-outline/40" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                  <input 
                    className="w-full bg-surface-container-low border-none rounded-2xl py-5 pl-14 pr-6 focus:ring-2 focus:ring-primary/20 text-sm font-bold text-on-surface placeholder:text-outline/20" 
                    placeholder="Search for address or coordinate mapping..." 
                    type="text"
                  />
                </div>
                {/* Map Mockup */}
                <div className="mt-6 rounded-3xl overflow-hidden h-56 relative border border-outline-variant/10 shadow-inner group">
                  <img 
                    alt="Map mockup" 
                    className="w-full h-full object-cover grayscale-[0.6] opacity-30 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" 
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1400"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-2xl border border-white flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_10px_var(--primary)]"></div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-on-surface leading-none">Verify Coordinates</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-60 ml-1 font-headline">Brief Description</label>
                <textarea 
                  className="w-full bg-surface-container-low border-none rounded-2xl py-5 px-6 focus:ring-2 focus:ring-primary/20 text-sm font-bold text-on-surface placeholder:text-outline/30 resize-none min-h-[140px]" 
                  placeholder="Provide a concise intelligence summary of the property, including key distress factors..."
                  rows="4"
                ></textarea>
              </div>
            </form>
          </div>
        </div>

        {/* Editorial Tips Footer */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 pb-16">
          <div className="p-8 bg-secondary/5 rounded-3xl border border-secondary/10 flex gap-6 hover:bg-secondary/10 transition-colors">
            <span className="material-symbols-outlined text-secondary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>tips_and_updates</span>
            <div>
              <h4 className="text-sm font-black uppercase tracking-widest mb-2 text-secondary">Editorial Tip</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed font-medium opacity-70">Listings with precise titles that highlight "Distress Type" receive 40% higher institutional engagement according to market logs.</p>
            </div>
          </div>
          <div className="p-8 bg-tertiary/5 rounded-3xl border border-tertiary/10 flex gap-6 hover:bg-tertiary/10 transition-colors">
            <span className="material-symbols-outlined text-tertiary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_graph</span>
            <div>
              <h4 className="text-sm font-black uppercase tracking-widest mb-2 text-tertiary">Market Velocity</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed font-medium opacity-70">Current demand for Multi-Family assets in this region is 2.4x higher than seasonal averages.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Persistent Flow Controls */}
      <div className="fixed bottom-0 left-0 lg:left-[260px] right-0 bg-white/90 backdrop-blur-xl px-4 lg:px-16 py-6 border-t border-outline-variant/10 z-50 transition-all duration-300">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => navigate('/seller/listings')}
            className="text-outline hover:text-primary font-black text-[10px] uppercase tracking-widest flex items-center gap-2 transition-colors px-4 py-2"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Cancel & Exit
          </button>
          <div className="flex items-center gap-4">
            <button className="text-primary font-black text-[10px] uppercase tracking-[0.2em] px-8 py-3 rounded-full hover:bg-primary/5 transition-colors">
              Save as draft
            </button>
            <button 
              onClick={() => navigate('/seller/listings/new/step-2')}
              className="bg-primary text-white font-black text-[10px] uppercase tracking-[0.2em] px-10 py-4 rounded-full shadow-2xl shadow-primary/20 hover:scale-[1.03] active:scale-95 transition-all flex items-center gap-3"
            >
              Continue to Media
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </SellerDashboardLayout>
  );
};

export default NewListingStep1;
