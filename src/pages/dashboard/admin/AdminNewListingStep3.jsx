/* src/pages/dashboard/admin/AdminNewListingStep3.jsx */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashboardLayout from '../../../components/dashboard/AdminDashboardLayout';
import SellerStepper from '../../../components/dashboard/seller/SellerStepper';
import { useNewListing } from '@/contexts/NewListingContext';

const AdminNewListingStep3 = () => {
    const navigate = useNavigate();
    const { listingData, updateListingData, submitListing, isSubmitting } = useNewListing();

    const handleUpload = (docId, e) => {
        const file = e.target.files[0];
        if (file) {
            const newDocs = { ...listingData.documents, [docId]: true };
            updateListingData({ documents: newDocs });
        }
    };

    const checklistItems = [
        { id: 'title_deed', title: 'Certified Title Deed', subtitle: 'Original digital copy (PDF/A)', status: listingData.documents.title_deed ? 'uploaded' : 'pending' },
        { id: 'seller_id', title: 'Seller Identification', subtitle: 'Government ID or Passport', status: listingData.documents.seller_id ? 'uploaded' : 'pending' },
        { id: 'court_order', title: 'Court Order of Foreclosure', subtitle: 'Mandatory for Distressed Sales', status: listingData.documents.court_order ? 'uploaded' : 'pending' },
        { id: 'tax_clearance', title: 'Tax Clearance Certificate', subtitle: 'Proof of zero outstanding municipal debt', status: listingData.documents.tax_clearance ? 'uploaded' : 'pending' },
    ];

  return (
    <AdminDashboardLayout title="Legal & Compliance">
      <div className="max-w-4xl mx-auto">
        <SellerStepper currentStep={3} />

        <div className="bg-surface-container-lowest rounded-3xl shadow-authoritative border border-outline-variant/15 overflow-hidden relative">
          <div className="absolute -top-10 -right-10 opacity-[0.03] pointer-events-none scale-150 rotate-12">
            <span className="material-symbols-outlined text-[300px]">verified_user</span>
          </div>

          <div className="p-12">
            <div className="flex items-start gap-8 mb-12 relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary group hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>gavel</span>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-[800] text-on-surface font-headline leading-none">Authority Checklist</h3>
                <p className="text-on-surface-variant text-sm mt-3 leading-relaxed font-medium opacity-60 max-w-2xl">
                  As an administrator, verify all regulatory documentation. These files are required to authorize the listing for public auction.
                </p>
              </div>
            </div>

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
                        <button 
                            onClick={() => updateListingData({ documents: { ...listingData.documents, [item.id]: false } })}
                            className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">Replace</button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-end gap-2">
                        <button 
                            onClick={() => document.getElementById(`file-input-${item.id}`).click()}
                            className="bg-primary text-white px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                            Upload
                        </button>
                        <input 
                            id={`file-input-${item.id}`}
                            type="file"
                            className="hidden"
                            onChange={(e) => handleUpload(item.id, e)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-8 rounded-3xl bg-surface-container-low flex flex-col md:flex-row items-center gap-10 border-l-8 border-secondary shadow-inner pb-16 relative z-10 text-on-surface">
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
                <h4 className="text-lg font-[800] font-headline leading-none mb-2 tracking-tight">Administrative Protocol</h4>
                <p className="text-xs leading-relaxed font-medium opacity-60">
                  Documents uploaded via Administrator Console are pre-verified and flagged for priority review by the Sheriff's Office.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Persistent Flow Controls */}
      <div className="fixed bottom-0 left-0 lg:left-[260px] right-0 bg-white/90 backdrop-blur-xl px-4 lg:px-16 py-6 border-t border-outline-variant/10 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => navigate('/admin/listings/new/step-2')}
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
              onClick={() => navigate('/admin/listings/new/step-4')}
              className="bg-primary text-white font-black text-[10px] uppercase tracking-[0.2em] px-10 py-4 rounded-full shadow-2xl shadow-primary/20 hover:scale-[1.03] active:scale-95 transition-all flex items-center gap-3"
            >
              Continue to Review
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminNewListingStep3;
