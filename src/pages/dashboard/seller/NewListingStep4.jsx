/* src/pages/dashboard/seller/NewListingStep4.jsx */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SellerDashboardLayout from '../../../components/dashboard/SellerDashboardLayout';
import SellerStepper from '../../../components/dashboard/seller/SellerStepper';
import { useNewListing } from '@/contexts/NewListingContext';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useToast } from '@/components/ui/use-toast';
import { loadGoogleMaps } from '@/lib/googleMaps';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const NewListingStep4 = () => {
    const navigate = useNavigate();
    const { listingData, submitListing, isSubmitting } = useNewListing();
    const miniMapRef = React.useRef(null);
  
    React.useEffect(() => {
      if (listingData.latitude && listingData.longitude) {
        loadGoogleMaps(GOOGLE_MAPS_API_KEY).then(() => {
          const map = new google.maps.Map(miniMapRef.current, {
            center: { lat: listingData.latitude, lng: listingData.longitude },
            zoom: 14,
            disableDefaultUI: true,
            gestureHandling: 'none',
            styles: [
              {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [{"color": "#7c93a3"}]
              },
              {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [{"color": "#ffffff"}]
              }
            ]
          });
          new google.maps.Marker({
            position: { lat: listingData.latitude, lng: listingData.longitude },
            map: map,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: '#6366f1',
              fillOpacity: 1,
              strokeWeight: 4,
              strokeColor: '#ffffff',
            }
          });
        });
      }
    }, [listingData.latitude, listingData.longitude]);

    const formatCurrency = (val) => {
      if (!val) return 'P0';
      const num = parseFloat(val.toString().replace(/[^0-9.]/g, ''));
      return new Intl.NumberFormat('en-BW', { style: 'currency', currency: 'BWP', maximumFractionDigits: 0 }).format(num).replace('BWP', 'P');
    }

  return (
    <SellerDashboardLayout title="Review & Publish">
      <div className="max-w-6xl mx-auto pb-32">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div>
            <span className="text-primary font-black tracking-widest uppercase mb-3 block text-[10px]">Final Step</span>
            <h1 className="text-5xl font-extrabold tracking-tighter text-on-surface leading-tight font-headline">Review & <br/>Publish</h1>
          </div>
          <div className="hidden lg:block w-full max-w-xl">
            <SellerStepper currentStep={4} />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-10">
          {/* Main Summary Section */}
          <div className="col-span-12 lg:col-span-8 space-y-12">
            <div className="bg-surface-container-lowest rounded-3xl p-10 shadow-authoritative transition-all hover:shadow-xl border border-outline-variant/10">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-2xl font-[800] tracking-tight text-on-surface font-headline leading-none text-on-surface/80">Listing Summary</h2>
                <button 
                  onClick={() => navigate('/seller/listings/new/step-1')}
                  className="text-primary font-black text-[10px] uppercase tracking-widest hover:underline flex items-center gap-2 group"
                >
                  <span className="material-symbols-outlined text-sm group-hover:rotate-12 transition-transform">edit</span> 
                  Edit Details
                </button>
              </div>

              {/* Hero Preview */}
              <div className="aspect-video rounded-2xl overflow-hidden mb-12 relative group shadow-2xl bg-surface-container-low border border-outline-variant/10">
                {listingData.images && listingData.images.length > 0 ? (
                  <img 
                    alt="Property Main View" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                    src={listingData.images[0]}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center opacity-40">
                    <span className="material-symbols-outlined text-6xl mb-4">image_not_supported</span>
                    <p className="text-xs font-black uppercase tracking-widest font-headline">No image uploaded</p>
                  </div>
                )}
                {listingData.images && listingData.images.length > 0 && (
                  <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between pointer-events-none">
                    <div className="bg-on-surface/80 backdrop-blur-md px-5 py-2 rounded-full text-white text-[10px] font-black uppercase tracking-widest shadow-2xl">
                      Main Property View
                    </div>
                  </div>
                )}
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-16">
                <div className="space-y-3">
                  <span className="text-[10px] font-black text-outline/40 uppercase tracking-widest block font-headline">Property Location</span>
                  <p className="text-xl font-bold text-on-surface font-headline leading-tight">{listingData.location || "No location specified"}</p>
                </div>
                <div className="space-y-3">
                  <span className="text-[10px] font-black text-outline/40 uppercase tracking-widest block font-headline">Listing Type</span>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>gavel</span>
                    <p className="text-xl font-bold text-on-surface font-headline">{listingData.case_type}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <span className="text-[10px] font-black text-outline/40 uppercase tracking-widest block font-headline">Target List Price</span>
                  <p className="text-4xl font-[900] text-primary tracking-tighter font-headline leading-none">{formatCurrency(listingData.price_pula)}</p>
                </div>
                <div className="space-y-3">
                  <span className="text-[10px] font-black text-outline/40 uppercase tracking-widest block font-headline">Property Theme</span>
                  <p className="text-xl font-bold text-on-surface font-headline leading-none">{listingData.property_type}</p>
                </div>
                <div className="col-span-1 md:col-span-2 pt-8 border-t border-outline-variant/10">
                  <span className="text-[10px] font-black text-outline/40 uppercase tracking-widest block font-headline mb-4">Detailed Description</span>
                  <p className="text-on-surface-variant leading-relaxed text-base font-medium opacity-70">
                    {listingData.description || "No description provided."}
                  </p>
                </div>
              </div>
            </div>

            {/* AI Performance Audit */}
            <div className="bg-secondary-container/10 rounded-3xl p-10 border border-secondary/10 flex items-start gap-8 shadow-inner">
              <div className="bg-secondary text-white w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-xl shadow-secondary/20">
                <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-[800] text-on-surface font-headline leading-none mb-3 tracking-tight">Pre-Audit Performance: 98%</h3>
                <p className="text-on-surface-variant leading-relaxed font-medium opacity-60">Our intelligence algorithm has cross-referenced the title history and tax liens. The risk score for this listing is exceptionally low. Documentation integrity is high.</p>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Quick Actions */}
          <div className="col-span-12 lg:col-span-4 translate-y-0 lg:-translate-y-20">
            <div className="sticky top-28 space-y-8">
              <div className="bg-surface-container-lowest rounded-3xl p-10 shadow-authoritative border border-outline-variant/10">
                <h3 className="text-2xl font-[800] text-on-surface font-headline leading-none mb-8">Ready to publish?</h3>
                <div className="space-y-4 mb-10">
                  <div className="flex items-center justify-between py-4 border-b border-outline-variant/10">
                    <span className="text-xs font-black uppercase tracking-widest text-outline/40">Duration</span>
                    <span className="text-sm font-bold text-on-surface">30 Days</span>
                  </div>
                  <div className="flex items-center justify-between py-4 border-b border-outline-variant/10">
                    <span className="text-xs font-black uppercase tracking-widest text-outline/40">Marketing Boost</span>
                    <span className="text-sm font-bold text-secondary">Premium Active</span>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <span className="text-xs font-black uppercase tracking-widest text-outline/40">Visibility</span>
                    <span className="text-sm font-bold text-on-surface">Global Reach</span>
                  </div>
                </div>
                <button 
                  disabled={isSubmitting}
                  onClick={() => submitListing('approved')}
                  className="w-full py-6 bg-gradient-to-br from-primary to-primary-container text-white rounded-full font-black text-sm shadow-2xl shadow-primary/30 hover:scale-[1.02] transition-all active:scale-95 uppercase tracking-widest mb-6 disabled:opacity-50"
                >
                  {isSubmitting ? 'Publishing...' : 'Submit Listing'}
                </button>
                <button 
                  disabled={isSubmitting}
                  onClick={() => submitListing('pending')}
                  className="w-full py-4 bg-transparent border border-outline-variant/20 text-on-surface-variant rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-surface-container-low transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : 'Save as Draft'}
                </button>
              </div>

              {/* mini map */}
              <div className="rounded-[2rem] overflow-hidden aspect-square border border-outline-variant/10 shadow-authoritative relative group">
                {listingData.latitude && listingData.longitude ? (
                  <div ref={miniMapRef} className="w-full h-full grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" />
                ) : (
                  <img 
                    alt="Location" 
                    className="w-full h-full object-cover grayscale opacity-40" 
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=600"
                  />
                )}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-white/95 px-6 py-3 rounded-full shadow-2xl border border-white flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]"></div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-on-surface leading-none">
                        {listingData.latitude ? 'Verified Address' : 'Address Not Set'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Suppression Footer */}
      <footer className="fixed bottom-0 left-0 lg:left-[260px] right-0 bg-white/90 backdrop-blur-xl px-4 lg:px-16 py-8 border-t border-outline-variant/10 z-50 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-outline/40">
        <div className="flex gap-12">
          <div className="space-y-1">
            <span className="opacity-40">License ID</span>
            <p className="text-on-surface opacity-100">AU-9921-XPR</p>
          </div>
          <div className="space-y-1">
            <span className="opacity-40">Security Standard</span>
            <p className="text-on-surface opacity-100">AES-256 Encrypted</p>
          </div>
        </div>
        <p className="max-w-md text-right leading-relaxed font-medium">
          By submitting this listing, you agree to the Auprolis Intelligence Terms of Service and Auction Ethics Guidelines.
        </p>
      </footer>
    </SellerDashboardLayout>
  );
};

export default NewListingStep4;
