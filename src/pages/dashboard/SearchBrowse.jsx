/* src/pages/dashboard/SearchBrowse.jsx */
import React, { useState } from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import PropertyCard from '../../components/dashboard/PropertyCard';
import EmptyState from '../../components/dashboard/EmptyState';
import { usePropertyData } from '../../hooks/usePropertyData';

const SearchBrowse = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [searchKeywords, setSearchKeywords] = useState('');
  const { properties, loading } = usePropertyData();

  const filteredProperties = properties.filter(prop => {
    const locMatch = !searchLocation || (prop.location || '').toLowerCase().includes(searchLocation.toLowerCase());
    const keywordMatch = !searchKeywords || 
      (prop.title || prop.listing_title || '').toLowerCase().includes(searchKeywords.toLowerCase()) ||
      (prop.description || '').toLowerCase().includes(searchKeywords.toLowerCase());
    return locMatch && keywordMatch;
  });

  return (
    <DashboardLayout title="Dossier Explorer">
      {/* Search & Filters Container */}
      <section className="max-w-6xl mx-auto space-y-6 mb-12">
        <div className="bg-surface-container-lowest rounded-[2rem] p-4 flex flex-col md:flex-row items-stretch md:items-center gap-4 shadow-sm border border-outline-variant/10">
          <div className="flex-1 flex items-center px-4 gap-3 border-b md:border-b-0 md:border-r border-outline-variant/20 py-2 md:py-0">
            <span className="material-symbols-outlined text-primary">location_on</span>
            <input 
              className="w-full border-none focus:ring-0 bg-transparent text-on-surface font-label font-medium placeholder:text-on-surface/30 outline-none" 
              placeholder="Location, Neighborhood, or Zip" 
              type="text"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
            />
          </div>
          <div className="flex-1 flex items-center px-4 gap-3 border-b md:border-b-0 md:border-r border-outline-variant/20 py-2 md:py-0">
            <span className="material-symbols-outlined text-primary">key</span>
            <input 
              className="w-full border-none focus:ring-0 bg-transparent text-on-surface font-label font-medium placeholder:text-on-surface/30 outline-none" 
              placeholder="Keywords (e.g. Distressed, Foreclosure)" 
              type="text"
              value={searchKeywords}
              onChange={(e) => setSearchKeywords(e.target.value)}
            />
          </div>
          <button className="bg-primary hover:bg-primary-deep text-white px-8 py-4 rounded-2xl font-headline font-bold text-sm tracking-wide transition-all scale-100 active:scale-95">
            SEARCH
          </button>
        </div>

        {/* Basic Filters */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative group">
            <select className="appearance-none bg-surface-container-low border-none rounded-xl px-6 py-3 pr-10 text-sm font-semibold text-on-surface focus:ring-2 focus:ring-primary/20 cursor-pointer outline-none">
              <option>Price Range</option>
              <option>P0 - P500,000</option>
              <option>P500,000 - P1,000,000</option>
              <option>P1,000,000+</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface pointer-events-none text-xl">expand_more</span>
          </div>
          <div className="relative group">
            <select className="appearance-none bg-surface-container-low border-none rounded-xl px-6 py-3 pr-10 text-sm font-semibold text-on-surface focus:ring-2 focus:ring-primary/20 cursor-pointer outline-none">
              <option>Property Type</option>
              <option>Single Family</option>
              <option>Multi-Family</option>
              <option>Industrial</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface pointer-events-none text-xl">expand_more</span>
          </div>
          {/* Locked Pro Filters */}
          <div className="flex items-center gap-3 px-6 py-3 bg-surface-container-high opacity-50 rounded-xl cursor-not-allowed">
            <span className="material-symbols-outlined text-xs">lock</span>
            <span className="text-sm font-semibold text-on-surface">Advanced filters</span>
            <span className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Pro</span>
          </div>
        </div>
      </section>

      {/* Results Grid */}
      <section className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h3 className="font-headline text-3xl font-extrabold tracking-tighter text-on-surface">Available Leads</h3>
            <p className="text-secondary font-label text-sm mt-1">
              {filteredProperties.length} results found in your current view
            </p>
          </div>
          <div className="flex items-center gap-2 text-primary font-bold text-sm bg-primary/10 px-4 py-2 rounded-full cursor-pointer hover:bg-primary/20 transition-colors">
            <span className="material-symbols-outlined text-sm">sort</span>
            <span>Sort: Newest First</span>
          </div>
        </div>

        {loading ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {[1,2,3,4].map(i => <div key={i} className="h-64 bg-slate-100 animate-pulse rounded-xl" />)}
             </div>
        ) : filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProperties.map((prop) => (
              <PropertyCard key={prop.id} property={{
                ...prop,
                title: prop.title || prop.listing_title,
                price: `P ${prop.price_usd?.toLocaleString()}`,
                imageUrl: prop.images?.[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800',
                location: prop.location,
                status: [prop.property_type || 'Unknown', prop.status || 'Pending']
              }} />
            ))}
          </div>
        ) : (
          <EmptyState 
            title="No leads matching your criteria" 
            message="Try adjusting your filters or location. New distressed assets are added daily."
            icon="search_off"
          />
        )}
      </section>

      {/* Footer Strip */}
      <footer className="mt-20 py-8 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-sm text-secondary">visibility_off</span>
          <p className="text-xs font-semibold text-secondary uppercase tracking-widest">Limited fields on Free tier.</p>
        </div>
        <div className="flex gap-8">
          <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary hover:underline">Terms of Service</button>
          <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary hover:underline">Privacy Policy</button>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary/40">v2.4.0-build.82</span>
        </div>
      </footer>
    </DashboardLayout>
  );
};

export default SearchBrowse;
