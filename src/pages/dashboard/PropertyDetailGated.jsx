/* src/pages/dashboard/PropertyDetailGated.jsx */
import React from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { usePropertyById } from '@/hooks/usePropertyById';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const PropertyDetailGated = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { property, loading, error } = usePropertyById(id);
  const { profile, isAdmin } = useAuth();

  const isUnlocked = isAdmin || profile?.subscription_type === 'pro';

  if (loading) {
    return (
      <DashboardLayout title="Dossier Explorer">
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-secondary font-medium font-headline animate-pulse">Loading property intelligence dossier...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !property) {
    return (
      <DashboardLayout title="Dossier Explorer">
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <span className="material-symbols-outlined text-4xl text-destructive">error</span>
          <p className="text-on-surface font-bold text-lg">Property not found</p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="text-primary font-bold hover:underline"
          >
            Return to search
          </button>
        </div>
      </DashboardLayout>
    );
  }

  const formatCurrency = (val) => {
    if (!val) return 'P0';
    return `P${parseFloat(val).toLocaleString()}`;
  };

  const images = property.images && property.images.length > 0 
    ? property.images 
    : ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1200'];

  return (
    <DashboardLayout title="Dossier Explorer">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8 pb-32">
        {/* Left Column: Carousel & Specs */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="relative rounded-3xl overflow-hidden aspect-[16/9] shadow-sm bg-surface-container-high group">
            <img 
              className="w-full h-full object-cover" 
              src={images[0]} 
              alt={property.listing_title || property.title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent"></div>
            <div className="absolute bottom-6 left-6 flex gap-2">
              <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
            <div className="absolute top-6 right-6">
              <span className="px-4 py-2 bg-tertiary-container text-white rounded-full text-xs font-bold tracking-wider uppercase">
                {property.status || 'Active'}
              </span>
            </div>
          </div>

          {/* Thumbnail Reel */}
          <div className="grid grid-cols-4 gap-4">
            {images.slice(0, 4).map((thumb, idx) => (
              <div 
                key={idx} 
                className={`rounded-xl overflow-hidden aspect-video transition-all cursor-pointer ${
                  idx === 0 ? 'border-2 border-primary' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <img className="w-full h-full object-cover" src={thumb} alt={`Thumbnail ${idx + 1}`} />
              </div>
            ))}
          </div>

          {/* Detailed Specifications (Gated) */}
          <section className="mt-12 bg-surface-container-low rounded-3xl p-8 overflow-hidden relative border border-outline/5">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-headline text-2xl font-extrabold tracking-tight text-on-surface">Detailed Specifications</h3>
              {!isUnlocked && (
                <span className="flex items-center gap-1.5 px-3 py-1 bg-primary text-white text-[10px] font-black uppercase rounded-full">
                  <span className="material-symbols-outlined text-[14px]">workspace_premium</span>
                  Pro
                </span>
              )}
            </div>
            
            <div className={`grid grid-cols-2 gap-8 ${!isUnlocked ? 'opacity-30 blur-[6px] select-none pointer-events-none' : ''}`}>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-outline-variant/30 pb-2">
                  <span className="text-sm font-medium text-secondary">Title Deed</span>
                  <span className="text-sm font-bold">{property.title_deed_number || 'Pending'}</span>
                </div>
                <div className="flex justify-between border-b border-outline-variant/30 pb-2">
                  <span className="text-sm font-medium text-secondary">Court Authority</span>
                  <span className="text-sm font-bold">{property.court_name || 'N/A'}</span>
                </div>
                <div className="flex justify-between border-b border-outline-variant/30 pb-2">
                  <span className="text-sm font-medium text-secondary">Sheriff of Court</span>
                  <span className="text-sm font-bold">{property.sheriff_name || 'N/A'}</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-outline-variant/30 pb-2 text-on-surface">
                  <span className="text-sm font-medium text-secondary">Legal Description</span>
                  <span className="text-sm font-bold truncate max-w-[150px]">{property.legal_description || 'N/A'}</span>
                </div>
                <div className="flex justify-between border-b border-outline-variant/30 pb-2">
                  <span className="text-sm font-medium text-secondary">Plaintiff</span>
                  <span className="text-sm font-bold">{property.plaintiff || 'N/A'}</span>
                </div>
                <div className="flex justify-between border-b border-outline-variant/30 pb-2">
                  <span className="text-sm font-medium text-secondary">Attorney Ref</span>
                  <span className="text-sm font-bold">{property.attorney || 'N/A'}</span>
                </div>
              </div>
            </div>

            {!isUnlocked && (
              <div className="absolute inset-0 bg-surface-container-low/40 backdrop-blur-[2px] flex flex-col items-center justify-center p-12 text-center">
                <span className="material-symbols-outlined text-4xl text-primary mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                <h4 className="font-headline text-lg font-bold mb-2">Deep Intelligence Locked</h4>
                <p className="text-secondary text-sm max-w-sm">Access structural reports, ownership history, and distress metrics with a Pro Dossier license.</p>
                <button 
                  onClick={() => navigate('/account')}
                  className="mt-6 px-6 py-3 bg-white text-primary border border-primary/20 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-surface-container-high transition-colors"
                >
                  Compare Plans
                </button>
              </div>
            )}
          </section>
        </div>

        {/* Right Column: Info */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
          <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-sm">
            <h1 className="font-headline text-4xl font-extrabold tracking-tighter text-on-surface mb-2">
              {formatCurrency(property.price_usd)}
            </h1>
            <div className="flex items-center gap-2 text-secondary mb-8">
              <span className="material-symbols-outlined text-sm">location_on</span>
              <span className="text-sm font-medium">{property.location}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-surface-container-low rounded-2xl p-4 flex flex-col items-center justify-center">
                <span className="material-symbols-outlined text-primary mb-2">bed</span>
                <span className="text-xl font-bold">{property.bedroom_count || 0}</span>
                <span className="text-[10px] uppercase font-bold text-secondary opacity-60">Bedrooms</span>
              </div>
              <div className="bg-surface-container-low rounded-2xl p-4 flex flex-col items-center justify-center">
                <span className="material-symbols-outlined text-primary mb-2">bathtub</span>
                <span className="text-xl font-bold">{property.bathroom_count || 0}</span>
                <span className="text-[10px] uppercase font-bold text-secondary opacity-60">Bathrooms</span>
              </div>
              <div className="bg-surface-container-low rounded-2xl p-4 flex flex-col items-center justify-center">
                <span className="material-symbols-outlined text-primary mb-2">square_foot</span>
                <span className="text-xl font-bold">{property.size_m2 || property.land_size || 'N/A'}</span>
                <span className="text-[10px] uppercase font-bold text-secondary opacity-60">M² Area</span>
              </div>
              <div className="bg-surface-container-low rounded-2xl p-4 flex flex-col items-center justify-center">
                <span className="material-symbols-outlined text-primary mb-2">event</span>
                <span className="text-xl font-bold">{property.auction_date ? new Date(property.auction_date).toLocaleDateString() : (property.year_built || 'N/A')}</span>
                <span className="text-[10px] uppercase font-bold text-secondary opacity-60">
                   {property.auction_date ? 'Auction Date' : 'Year Built'}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-headline text-xs font-black uppercase tracking-widest text-secondary opacity-60">Property Description</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                {property.description || 'No description provided.'}
              </p>
            </div>
          </div>

          {/* Small Map Widget */}
          <div className="rounded-3xl overflow-hidden h-48 relative bg-surface-container-high group cursor-pointer shadow-sm border border-outline-variant/10">
            <img 
              className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-500" 
              src={`https://maps.googleapis.com/maps/api/staticmap?center=${property.latitude},${property.longitude}&zoom=14&size=600x300&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`} 
              alt="Map View"
            />
            <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-all"></div>
            <div className="absolute bottom-4 right-4 bg-white px-3 py-1.5 rounded-full shadow-lg flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-sm">open_in_new</span>
              <span className="text-[10px] font-bold uppercase tracking-wider">Full Map</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <footer className="fixed bottom-0 left-0 lg:left-[260px] right-0 bg-surface-container-lowest/90 backdrop-blur-2xl px-6 lg:px-12 py-6 z-40 border-t border-outline-variant/10 shadow-up">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button className="w-12 h-12 rounded-full border border-outline flex items-center justify-center hover:bg-surface-container-low transition-colors group">
              <span className="material-symbols-outlined text-outline group-hover:text-destructive transition-colors">favorite</span>
            </button>
            <div className="hidden md:block">
              <p className="text-[10px] uppercase font-black tracking-widest text-secondary opacity-60">Viewing Asset</p>
              <p className="text-sm font-bold text-on-surface">{id ? id.substring(0, 8).toUpperCase() : 'UNKNOWN'}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {!isUnlocked ? (
              <button 
                onClick={() => navigate('/account')}
                className="px-8 py-4 bg-primary text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Upgrade for full specifications
              </button>
            ) : (
              <button className="px-8 py-4 bg-secondary text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-xl shadow-secondary/20 hover:scale-[1.02] active:scale-98 transition-all">
                Download Full Report
              </button>
            )}
          </div>
        </div>
      </footer>
    </DashboardLayout>
  );
};

export default PropertyDetailGated;
