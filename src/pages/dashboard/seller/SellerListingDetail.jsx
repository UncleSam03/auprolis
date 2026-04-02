/* src/pages/dashboard/seller/SellerListingDetail.jsx */
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SellerDashboardLayout from '../../../components/dashboard/SellerDashboardLayout';

const SellerListingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <SellerDashboardLayout title={`Edit Listing ${id || ''}`}>
      <div className="max-w-[1440px] mx-auto">
        {/* Status Banner */}
        <div className="mb-12 flex flex-col md:flex-row items-center justify-between bg-amber-50 border border-amber-200/50 p-8 rounded-3xl shadow-sm">
          <div className="flex items-center gap-6 mb-6 md:mb-0">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 shadow-inner">
              <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>pending_actions</span>
            </div>
            <div>
              <h3 className="font-[800] text-on-surface font-headline text-lg leading-none mb-2 tracking-tight">Pending Review</h3>
              <p className="text-sm text-on-surface-variant font-medium opacity-70 max-w-xl">
                Your listing is currently being verified by our compliance team. Expected window: 24-48 hours from submission.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="px-8 py-3 text-[10px] font-black uppercase tracking-widest text-on-surface-variant hover:bg-surface-container-low rounded-full transition-all">Discard Draft</button>
            <button className="px-8 py-3 text-[10px] font-black uppercase tracking-widest bg-white border border-outline-variant/30 text-primary rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all">Preview Live</button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-10 items-start">
          {/* Left Column: Media Gallery */}
          <div className="col-span-12 lg:col-span-4 lg:sticky lg:top-24 space-y-8">
            <div className="aspect-[4/5] bg-surface-container-low rounded-[2.5rem] overflow-hidden group relative shadow-authoritative border-4 border-white">
              <img 
                alt="Property Main View" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800"
              />
              <div className="absolute inset-0 bg-on-surface/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                <button className="bg-white/95 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl hover:scale-110 transition-transform">Replace Hero</button>
              </div>
              <div className="absolute bottom-6 left-6 bg-primary text-white text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-2xl">Primary Cover</div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {[1, 2].map((i) => (
                <div key={i} className="aspect-square bg-surface-container-low rounded-2xl overflow-hidden cursor-pointer hover:ring-4 hover:ring-primary/20 transition-all shadow-sm group">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    src={`https://images.unsplash.com/photo-1600${500+i}5154340?auto=format&fit=crop&q=80&w=200`} 
                  />
                </div>
              ))}
              <div className="aspect-square bg-surface-container-low rounded-2xl flex items-center justify-center border-2 border-dashed border-outline-variant/30 text-outline/30 cursor-pointer hover:bg-white hover:text-primary transition-all shadow-inner group">
                <span className="material-symbols-outlined text-4xl group-hover:scale-110 transition-transform" data-icon="add_a_photo">add_a_photo</span>
              </div>
            </div>

            <div className="bg-surface-container-low/50 p-8 rounded-[2rem] space-y-6 shadow-inner border border-outline-variant/5">
              <h4 className="font-headline font-black text-[10px] text-on-surface uppercase tracking-[0.2em] opacity-40">Intelligence Audit</h4>
              <div className="flex items-center justify-between text-base">
                <span className="text-on-surface-variant font-bold">Quality Score</span>
                <span className="text-secondary font-black tracking-tighter">9.2/10</span>
              </div>
              <div className="w-full h-2.5 bg-white/50 rounded-full overflow-hidden shadow-inner">
                <div className="w-[92%] h-full bg-secondary rounded-full shadow-[0_0_10px_var(--secondary)]"></div>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed font-medium opacity-60 italic">High resolution and professional lighting detected. This will increase engagement by approx 14%.</p>
            </div>
          </div>

          {/* Right Column: Editable Fields */}
          <div className="col-span-12 lg:col-span-8 space-y-10">
            {/* Section: Location */}
            <section className="bg-surface-container-lowest rounded-[2.5rem] p-12 shadow-authoritative border border-outline-variant/5 group">
              <div className="flex items-center gap-5 mb-10">
                <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                </div>
                <h2 className="font-headline text-3xl font-[800] text-on-surface tracking-tighter leading-none">Property Location</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2 space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-outline/60 ml-1">Street Address</label>
                  <input className="w-full bg-surface-container-low border-none rounded-2xl py-5 px-6 focus:ring-2 focus:ring-primary/20 transition-all font-bold text-on-surface" type="text" defaultValue="8821 Marble Canyon Way" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-outline/60 ml-1">City</label>
                  <input className="w-full bg-surface-container-low border-none rounded-2xl py-5 px-6 focus:ring-2 focus:ring-primary/20 transition-all font-bold text-on-surface" type="text" defaultValue="Aspen" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-outline/60 ml-1">State / ZIP</label>
                  <div className="flex gap-4">
                    <input className="w-1/3 bg-surface-container-low border-none rounded-2xl py-5 px-6 focus:ring-2 focus:ring-primary/20 transition-all font-bold text-on-surface text-center" type="text" defaultValue="CO" />
                    <input className="w-2/3 bg-surface-container-low border-none rounded-2xl py-5 px-6 focus:ring-2 focus:ring-primary/20 transition-all font-bold text-on-surface" type="text" defaultValue="81611" />
                  </div>
                </div>
              </div>
            </section>

            {/* Section: Specs */}
            <section className="bg-surface-container-lowest rounded-[2.5rem] p-12 shadow-authoritative border border-outline-variant/5 group">
              <div className="flex items-center gap-5 mb-10">
                <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>square_foot</span>
                </div>
                <h2 className="font-headline text-3xl font-[800] text-on-surface tracking-tighter leading-none">Core Specifications</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-outline/60 ml-1">Bedrooms</label>
                  <input className="w-full bg-surface-container-low border-none rounded-2xl py-5 px-6 focus:ring-2 focus:ring-primary/20 transition-all font-black text-on-surface" type="number" defaultValue="4" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-outline/60 ml-1">Bathrooms</label>
                  <input className="w-full bg-surface-container-low border-none rounded-2xl py-5 px-6 focus:ring-2 focus:ring-primary/20 transition-all font-black text-on-surface" type="number" step="0.5" defaultValue="3.5" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-outline/60 ml-1">Living Area (SQFT)</label>
                  <input className="w-full bg-surface-container-low border-none rounded-2xl py-5 px-6 focus:ring-2 focus:ring-primary/20 transition-all font-black text-on-surface" type="text" defaultValue="3,250" />
                </div>
                <div className="md:col-span-3 space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-outline/60 ml-1">Property Type</label>
                  <select className="w-full bg-surface-container-low border-none rounded-2xl py-5 px-6 focus:ring-2 focus:ring-primary/20 transition-all font-bold text-on-surface appearance-none cursor-pointer">
                    <option>Single Family Residential</option>
                    <option>Condominium</option>
                    <option>Multi-Family</option>
                    <option>Townhouse</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Actions */}
            <div className="flex items-center justify-end gap-6 pt-10 pb-20">
              <button 
                onClick={() => navigate('/seller/listings')}
                className="px-10 py-4 text-[11px] font-black uppercase tracking-widest text-on-surface-variant hover:bg-surface-container-low rounded-full transition-all"
              >
                Cancel Changes
              </button>
              <button className="px-14 py-5 bg-gradient-to-br from-primary to-primary-container text-white rounded-full font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 hover:scale-[1.03] active:scale-95 transition-all">
                Save & Resubmit
              </button>
            </div>

            {/* Danger Zone */}
            <section className="bg-red-50/50 border border-red-200/50 p-10 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-8 group">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center text-red-600 shadow-inner group-hover:rotate-12 transition-transform">
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>dangerous</span>
                </div>
                <div>
                  <h3 className="font-headline font-black text-red-900 leading-none mb-2">Danger Zone</h3>
                  <p className="text-xs text-red-700/60 font-medium">Archiving this listing will remove it from all active search results and history.</p>
                </div>
              </div>
              <button className="px-10 py-4 bg-white text-red-600 border border-red-200 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-sm">
                Archive Listing
              </button>
            </section>
          </div>
        </div>
      </div>
    </SellerDashboardLayout>
  );
};

export default SellerListingDetail;
