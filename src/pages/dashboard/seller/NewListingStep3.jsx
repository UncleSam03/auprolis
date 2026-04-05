/* src/pages/dashboard/seller/NewListingStep3.jsx */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SellerDashboardLayout from '../../../components/dashboard/SellerDashboardLayout';
import SellerStepper from '../../../components/dashboard/seller/SellerStepper';

import { useNewListing } from '@/contexts/NewListingContext';

const NewListingStep3 = () => {
    const navigate = useNavigate();
    const { submitListing, isSubmitting } = useNewListing();

  const checklistItems = [
    { title: 'Certified Title Deed', subtitle: 'Original digital copy (PDF/A)', status: 'uploaded' },
    { title: 'Seller Identification', subtitle: 'Government ID or Passport', status: 'uploaded' },
    { title: 'Court Order of Foreclosure', subtitle: 'Mandatory for Distressed Sales', status: 'pending' },
    { title: 'Tax Clearance Certificate', subtitle: 'Proof of zero outstanding municipal debt', status: 'pending' },
  ];

  return (
    <SellerDashboardLayout title="Legal & Compliance">
      <div className="max-w-4xl mx-auto">
        <SellerStepper currentStep={3} />

        <div className="bg-surface-container-lowest rounded-3xl shadow-authoritative border border-outline-variant/15 overflow-hidden relative">
          {/* Background Shield Watermark */}
          <div className="absolute -top-10 -right-10 opacity-[0.03] pointer-events-none scale-150 rotate-12">
            <span className="material-symbols-outlined text-[300px]">verified_user</span>
          </div>

          <div className="p-12">
            <div className="flex items-start gap-8 mb-12 relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary group hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>gavel</span>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-[800] text-on-surface font-headline leading-none">Compliance Checklist</h3>
                <p className="text-on-surface-variant text-sm mt-3 leading-relaxed font-medium opacity-60 max-w-2xl">
                  Please ensure all regulatory documentation is uploaded. These files are required for the Sheriff's Office to authorize the listing for public auction.
                </p>
              </div>
            </div>

            {/* Checklist Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              {checklistItems.map((item, idx) => (
                <div key={idx} className={`group flex items-center p-6 rounded-2xl border-2 transition-all duration-300 ${
                  item.status === 'uploaded' 
                    ? 'bg-surface border-transparent hover:border-secondary/20 hover:bg-surface-container-low' 
                    : 'bg-surface-container-low border-dashed border-primary/20 hover:bg-white hover:border-primary/40'
                }`}>
                  <div className="flex items-center gap-5 w-full">
                    <div className="relative">
                      <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
                        item.status === 'uploaded' 
                          ? 'bg-secondary border-secondary shadow-lg shadow-secondary/20' 
                          : 'bg-white border-primary/20'
                      }`}>
                        <span className={`material-symbols-outlined text-white text-xl ${item.status === 'uploaded' ? 'opacity-100' : 'opacity-0'}`}>check</span>
                        {item.status === 'pending' && <span className="material-symbols-outlined text-primary text-xl">add</span>}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className={`font-bold text-on-surface group-hover:text-primary transition-colors font-headline ${item.status === 'uploaded' ? 'opacity-100' : 'opacity-60'}`}>{item.title}</p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 mt-1">{item.subtitle}</p>
                    </div>
                    {item.status === 'uploaded' ? (
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-secondary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>cloud_done</span>
                        <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">Replace</button>
                      </div>
                    ) : (
                      <button className="bg-primary text-white px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                        Upload
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Compliance Ledger Section */}
            <div className="mt-12 p-8 rounded-3xl bg-surface-container-low flex flex-col md:flex-row items-center gap-10 border-l-8 border-secondary shadow-inner pb-16 relative z-10">
              <div className="flex -space-x-4 shrink-0">
                <div className="w-14 h-14 rounded-full border-4 border-white bg-white shadow-authoritative flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
                </div>
                <div className="w-14 h-14 rounded-full border-4 border-white bg-white shadow-authoritative flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                </div>
                <div className="w-14 h-14 rounded-full border-4 border-white bg-white shadow-authoritative flex items-center justify-center">
                  <span className="material-symbols-outlined text-tertiary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>encrypted</span>
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h4 className="text-lg font-[800] text-on-surface font-headline leading-none mb-2 tracking-tight">Auprolis Secure Ledger Technology</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed font-medium opacity-60">
                  Your legal documents are encrypted using SHA-256 and stored on private blockchain nodes to ensure immutable chain of custody for all legal filings.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline & Assistance */}
        <div className="mt-8 grid grid-cols-12 gap-8 pb-16">
          <div className="col-span-12 md:col-span-8 bg-surface-container-lowest rounded-3xl p-10 shadow-authoritative border border-outline-variant/10">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-xl font-[800] font-headline tracking-tight text-on-surface">Review Timeline</h3>
              <span className="px-5 py-1.5 bg-tertiary/10 text-tertiary text-[10px] font-black uppercase tracking-widest rounded-full">Standard Processing</span>
            </div>
            <div className="space-y-10 border-l-2 border-outline-variant/20 pl-8 ml-2">
              <div className="relative">
                <div className="absolute -left-[41.5px] top-0 w-4 h-4 bg-secondary rounded-full ring-4 ring-surface"></div>
                <p className="font-[800] text-on-surface leading-none text-sm">Draft Submission</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-outline/40 mt-2">Completed Today at 10:45 AM</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[41.5px] top-0 w-4 h-4 bg-primary rounded-full ring-4 ring-surface animate-pulse"></div>
                <p className="font-[800] text-on-surface leading-none text-sm">Legal Review Pending</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-outline/40 mt-2">Expected: Within 24-48 hours</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[41.5px] top-0 w-4 h-4 bg-surface-container-high rounded-full ring-4 ring-surface"></div>
                <p className="font-[800] text-on-surface leading-none text-sm opacity-30">Auction Activation</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-outline/40 mt-2 opacity-30">Requires final Sheriff signature</p>
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-4 bg-primary text-white rounded-3xl p-10 shadow-2xl shadow-primary/20 flex flex-col justify-between overflow-hidden relative group">
            <div className="absolute -top-10 -right-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
              <span className="material-symbols-outlined text-[160px]">help_center</span>
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-[800] font-headline tracking-tighter mb-4 leading-tight">Need Legal Assistance?</h3>
              <p className="text-white/70 text-sm leading-relaxed mb-8 font-medium">Our partner attorneys can help you expedite missing court documents and title searches.</p>
            </div>
            <button className="w-full bg-white text-primary font-black py-4 rounded-full hover:bg-white/90 active:scale-95 transition-all text-[10px] uppercase tracking-widest shadow-lg shadow-black/10 z-10">
              Consult Specialist
            </button>
          </div>
        </div>
      </div>

      {/* Persistent Flow Controls */}
      <div className="fixed bottom-0 left-0 lg:left-[260px] right-0 bg-white/90 backdrop-blur-xl px-4 lg:px-16 py-6 border-t border-outline-variant/10 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => navigate('/seller/listings/new/step-2')}
            className="text-outline hover:text-primary font-black text-[10px] uppercase tracking-widest flex items-center gap-2 transition-colors px-4 py-2"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Media & Specs
          </button>
          <div className="flex items-center gap-4">
            <button 
                onClick={() => submitListing('pending')}
                disabled={isSubmitting}
                className="text-primary font-black text-[10px] uppercase tracking-[0.2em] px-8 py-3 rounded-full hover:bg-primary/5 transition-colors disabled:opacity-50">
              {isSubmitting ? 'Saving...' : 'Save as draft'}
            </button>
            <button 
              onClick={() => navigate('/seller/listings/new/step-4')}
              className="bg-primary text-white font-black text-[10px] uppercase tracking-[0.2em] px-10 py-4 rounded-full shadow-2xl shadow-primary/20 hover:scale-[1.03] active:scale-95 transition-all flex items-center gap-3"
            >
              Continue to Review
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </SellerDashboardLayout>
  );
};

export default NewListingStep3;
