/* src/pages/dashboard/admin/AdminNewListingStep2.jsx */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashboardLayout from '../../../components/dashboard/AdminDashboardLayout';
import SellerStepper from '../../../components/dashboard/seller/SellerStepper';
import { useNewListing } from '@/contexts/NewListingContext';

const AdminNewListingStep2 = () => {
    const navigate = useNavigate();
    const { listingData, updateListingData, submitListing, isSubmitting } = useNewListing();
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      updateListingData({ [name]: value });
    };

    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          updateListingData({ images: [reader.result] });
        };
        reader.readAsDataURL(file);
      }
    };

  return (
    <AdminDashboardLayout title="Media & Specifications">
      <div className="max-w-4xl mx-auto">
        <SellerStepper currentStep={2} />

        <div className="bg-surface-container-lowest rounded-3xl shadow-authoritative border border-outline-variant/15 overflow-hidden">
          <div className="p-12 space-y-12">
            {/* Media Section */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-[800] text-on-surface font-headline flex items-center gap-4">
                  <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>photo_library</span>
                  Property Media
                </h3>
                <span className="text-[10px] font-black uppercase tracking-widest text-outline/40">Max 20 photos • 4K recommended</span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 aspect-video">
                <div 
                    onClick={() => document.getElementById('hero-upload').click()}
                    className="col-span-2 row-span-2 border-2 border-dashed border-outline-variant/30 hover:border-primary bg-surface-container-low rounded-2xl transition-all flex flex-col items-center justify-center cursor-pointer group relative overflow-hidden">
                  {listingData.images && listingData.images.length > 0 ? (
                    <img src={listingData.images[0]} alt="Hero" className="w-full h-full object-cover" />
                  ) : (
                    <>
                        <div className="w-16 h-16 rounded-full bg-white shadow-authoritative flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-primary text-3xl">cloud_upload</span>
                        </div>
                        <span className="font-headline font-extrabold text-on-surface text-sm">Upload Hero Photo</span>
                        <span className="text-[10px] text-outline/40 mt-1 uppercase tracking-widest font-black">Click to select asset</span>
                    </>
                  )}
                  <input id="hero-upload" type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                </div>
                <div className="border-2 border-dashed border-outline-variant/30 hover:border-primary bg-surface-container-low rounded-2xl flex flex-col items-center justify-center cursor-pointer group transition-all">
                  <span className="material-symbols-outlined text-outline/40 group-hover:text-primary mb-2 transition-colors">add_a_photo</span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-outline/40">Add Photo</span>
                </div>
                <div className="border-2 border-dashed border-outline-variant/30 hover:border-primary bg-surface-container-low rounded-2xl flex flex-col items-center justify-center cursor-pointer group transition-all">
                  <span className="material-symbols-outlined text-outline/40 group-hover:text-primary mb-2 transition-colors">video_library</span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-outline/40">Video</span>
                </div>
                <div className="border-2 border-dashed border-outline-variant/30 hover:border-primary bg-surface-container-low rounded-2xl flex flex-col items-center justify-center cursor-pointer group transition-all">
                  <span className="material-symbols-outlined text-outline/40 group-hover:text-primary mb-2 transition-colors">view_in_ar</span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-outline/40">3D Tour</span>
                </div>
                <div className="border-2 border-dashed border-outline-variant/30 hover:border-primary bg-surface-container-low rounded-2xl flex flex-col items-center justify-center cursor-pointer group transition-all">
                  <span className="material-symbols-outlined text-outline/40 group-hover:text-primary mb-2 transition-colors">layers</span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-outline/40">Floor Plans</span>
                </div>
              </div>
            </section>

            {/* Specifications Section */}
            <section>
              <h3 className="text-2xl font-[800] text-on-surface font-headline flex items-center gap-4 mb-10">
                <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>straighten</span>
                Technical Specifications
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-outline/60 ml-1 font-headline opacity-60">Beds</label>
                  <div className="relative">
                    <input 
                        name="bedrooms"
                        value={listingData.bedrooms}
                        onChange={handleChange}
                        className="w-full bg-surface-container-low border-none rounded-2xl py-5 px-14 focus:ring-2 focus:ring-primary/20 text-on-surface font-[800]" placeholder="0" type="number" />
                    <span className="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-outline/40" style={{ fontVariationSettings: "'FILL' 1" }}>bed</span>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-outline/60 ml-1 font-headline opacity-60">Baths</label>
                  <div className="relative">
                    <input 
                        name="bathrooms"
                        value={listingData.bathrooms}
                        onChange={handleChange}
                        className="w-full bg-surface-container-low border-none rounded-2xl py-5 px-14 focus:ring-2 focus:ring-primary/20 text-on-surface font-[800]" placeholder="0" type="number" />
                    <span className="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-outline/40" style={{ fontVariationSettings: "'FILL' 1" }}>bathtub</span>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-outline/60 ml-1 font-headline opacity-60">Land Size (sqft)</label>
                  <div className="relative">
                    <input 
                        name="land_size"
                        value={listingData.land_size}
                        onChange={handleChange}
                        className="w-full bg-surface-container-low border-none rounded-2xl py-5 px-14 focus:ring-2 focus:ring-primary/20 text-on-surface font-[800]" placeholder="5,000" type="text" />
                    <span className="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-outline/40" style={{ fontVariationSettings: "'FILL' 1" }}>architecture</span>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-outline/60 ml-1 font-headline opacity-60">Year Built</label>
                  <div className="relative">
                    <input 
                        name="year_built"
                        value={listingData.year_built}
                        onChange={handleChange}
                        className="w-full bg-surface-container-low border-none rounded-2xl py-5 px-14 focus:ring-2 focus:ring-primary/20 text-on-surface font-[800]" placeholder="2000" type="number" />
                    <span className="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-outline/40" style={{ fontVariationSettings: "'FILL' 1" }}>event</span>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-outline/60 ml-1 font-headline opacity-60">Auction Date</label>
                  <div className="relative">
                    <input 
                        name="auction_date"
                        value={listingData.auction_date || ''}
                        onChange={handleChange}
                        className="w-full bg-surface-container-low border-none rounded-2xl py-5 px-14 focus:ring-2 focus:ring-primary/20 text-on-surface font-bold" 
                        type="date" 
                    />
                    <span className="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_today</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 md:col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-outline/60 ml-1 font-headline opacity-60">Distressed Status Flag</label>
                  <div className="relative">
                    <select 
                        name="case_type"
                        value={listingData.case_type}
                        onChange={handleChange}
                        className="w-full bg-surface-container-low border-none rounded-2xl py-5 px-14 focus:ring-2 focus:ring-primary/20 text-on-surface font-bold appearance-none">
                      <option>Select Case Type...</option>
                      <option>Sheriff Sale / Auction</option>
                      <option>Bank Owned / REO</option>
                      <option>Short Sale</option>
                    </select>
                    <span className="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>gavel</span>
                    <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 text-outline/40 pointer-events-none">expand_more</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Persistent Flow Controls */}
      <div className="fixed bottom-0 left-0 lg:left-[260px] right-0 bg-white/90 backdrop-blur-xl px-4 lg:px-16 py-6 border-t border-outline-variant/10 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => navigate('/admin/listings/new/step-1')}
            className="text-outline hover:text-primary font-black text-[10px] uppercase tracking-widest flex items-center gap-2 transition-colors px-4 py-2"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Property Info
          </button>
          <div className="flex items-center gap-4">
            <button 
                onClick={() => submitListing('pending')}
                disabled={isSubmitting}
                className="text-primary font-black text-[10px] uppercase tracking-[0.2em] px-8 py-3 rounded-full hover:bg-primary/5 transition-colors disabled:opacity-50">
              {isSubmitting ? 'Saving...' : 'Save as draft'}
            </button>
            <button 
              onClick={() => navigate('/admin/listings/new/step-3')}
              className="bg-primary text-white font-black text-[10px] uppercase tracking-[0.2em] px-10 py-4 rounded-full shadow-2xl shadow-primary/20 hover:scale-[1.03] active:scale-95 transition-all flex items-center gap-3"
            >
              Continue to Legal
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminNewListingStep2;
