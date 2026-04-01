/* src/pages/dashboard/PropertyDetailGated.jsx */
import React from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { useNavigate, useParams } from 'react-router-dom';

const PropertyDetailGated = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock property data for the gated view
  const property = {
    id: id || 'BA-90077',
    title: 'Bel Air Estates Monolith',
    price: '$3,450,000',
    location: 'Bel Air, Los Angeles, CA 90077',
    beds: 6,
    baths: 5.5,
    area: '485',
    yearBuilt: 1984,
    description: 'Rare development opportunity in the heart of Bel Air. This architectural monolith offers unparalleled potential for redevelopment. Features include sweeping canyon views and a structural frame that accommodates modern expansive floor plans.',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
    thumbnails: [
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1600585154526-990dcea42e49?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&q=80&w=400',
    ]
  };

  return (
    <DashboardLayout title="Dossier Explorer">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8 pb-32">
        {/* Left Column: Carousel & Specs */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="relative rounded-3xl overflow-hidden aspect-[16/9] shadow-sm bg-surface-container-high group">
            <img 
              className="w-full h-full object-cover" 
              src={property.imageUrl} 
              alt={property.title}
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
                Distressed
              </span>
            </div>
          </div>

          {/* Thumbnail Reel */}
          <div className="grid grid-cols-4 gap-4">
            {property.thumbnails.map((thumb, idx) => (
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

          {/* Detailed Specifications (Locked) */}
          <section className="mt-12 bg-surface-container-low rounded-3xl p-8 overflow-hidden relative border border-outline/5">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-headline text-2xl font-extrabold tracking-tight text-on-surface">Detailed Specifications</h3>
              <span className="flex items-center gap-1.5 px-3 py-1 bg-primary text-white text-[10px] font-black uppercase rounded-full">
                <span className="material-symbols-outlined text-[14px]">workspace_premium</span>
                Pro
              </span>
            </div>
            
            {/* Blurred Content Teaser */}
            <div className="grid grid-cols-2 gap-8 opacity-30 blur-[6px] select-none pointer-events-none">
              <div className="space-y-4">
                <div className="flex justify-between border-b border-outline-variant/30 pb-2">
                  <span className="text-sm font-medium text-secondary">Asset Liability</span>
                  <span className="text-sm font-bold">$1,240,000.00</span>
                </div>
                <div className="flex justify-between border-b border-outline-variant/30 pb-2">
                  <span className="text-sm font-medium text-secondary">Zoning Tier</span>
                  <span className="text-sm font-bold">R-4 Mixed Use</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-outline-variant/30 pb-2">
                  <span className="text-sm font-medium text-secondary">Structural Integrity</span>
                  <span className="text-sm font-bold">Grade C-</span>
                </div>
                <div className="flex justify-between border-b border-outline-variant/30 pb-2">
                  <span className="text-sm font-medium text-secondary">Last Transaction</span>
                  <span className="text-sm font-bold">14 Oct 2021</span>
                </div>
              </div>
            </div>

            {/* Lock Overlay */}
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
          </section>
        </div>

        {/* Right Column: Info */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
          <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-sm">
            <h1 className="font-headline text-4xl font-extrabold tracking-tighter text-on-surface mb-2">{property.price}</h1>
            <div className="flex items-center gap-2 text-secondary mb-8">
              <span className="material-symbols-outlined text-sm">location_on</span>
              <span className="text-sm font-medium">{property.location}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-surface-container-low rounded-2xl p-4 flex flex-col items-center justify-center">
                <span className="material-symbols-outlined text-primary mb-2">bed</span>
                <span className="text-xl font-bold">{property.beds}</span>
                <span className="text-[10px] uppercase font-bold text-secondary opacity-60">Bedrooms</span>
              </div>
              <div className="bg-surface-container-low rounded-2xl p-4 flex flex-col items-center justify-center">
                <span className="material-symbols-outlined text-primary mb-2">bathtub</span>
                <span className="text-xl font-bold">{property.baths}</span>
                <span className="text-[10px] uppercase font-bold text-secondary opacity-60">Bathrooms</span>
              </div>
              <div className="bg-surface-container-low rounded-2xl p-4 flex flex-col items-center justify-center">
                <span className="material-symbols-outlined text-primary mb-2">square_foot</span>
                <span className="text-xl font-bold">{property.area}</span>
                <span className="text-[10px] uppercase font-bold text-secondary opacity-60">Sqm Area</span>
              </div>
              <div className="bg-surface-container-low rounded-2xl p-4 flex flex-col items-center justify-center">
                <span className="material-symbols-outlined text-primary mb-2">event</span>
                <span className="text-xl font-bold">{property.yearBuilt}</span>
                <span className="text-[10px] uppercase font-bold text-secondary opacity-60">Year Built</span>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-headline text-xs font-black uppercase tracking-widest text-secondary opacity-60">Property Description</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                {property.description}
              </p>
            </div>
          </div>

          {/* Small Map Widget */}
          <div className="rounded-3xl overflow-hidden h-48 relative bg-surface-container-high group cursor-pointer">
            <img 
              className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all transition-duration-500" 
              src="https://images.unsplash.com/photo-1526778546194-fc173fe31450?auto=format&fit=crop&q=80&w=800" 
              alt="Map"
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
      <footer className="fixed bottom-0 left-[260px] right-0 bg-surface-container-lowest/80 backdrop-blur-2xl px-12 py-6 z-40 border-t border-outline-variant/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button className="w-12 h-12 rounded-full border border-outline flex items-center justify-center hover:bg-surface-container-low transition-colors group">
              <span className="material-symbols-outlined text-outline group-hover:text-destructive transition-colors">favorite</span>
            </button>
            <div className="hidden md:block">
              <p className="text-[10px] uppercase font-black tracking-widest text-secondary opacity-60">Viewing Asset</p>
              <p className="text-sm font-bold text-on-surface">BA-90077-D104</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/account')}
              className="px-8 py-4 bg-primary text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Upgrade for full specifications
            </button>
          </div>
        </div>
      </footer>
    </DashboardLayout>
  );
};

export default PropertyDetailGated;
