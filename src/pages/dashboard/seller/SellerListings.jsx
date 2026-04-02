/* src/pages/dashboard/seller/SellerListings.jsx */
import React from 'react';
import SellerDashboardLayout from '../../../components/dashboard/SellerDashboardLayout';
import SellerListingRow from '../../../components/dashboard/seller/SellerListingRow';
import EmptyState from '../../../components/dashboard/EmptyState';

const SellerListings = () => {
  const listings = [];

  // If testing empty state, set listings to []
  const isEmpty = listings.length === 0;

  return (
    <SellerDashboardLayout title="My Listings">
      {/* Intelligence Filters (Bento Toolbar) */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-4 bg-surface-container-lowest p-2 rounded-2xl flex items-center shadow-authoritative">
          <div className="flex-1 px-4 py-2">
            <label className="block text-[9px] font-black text-outline/50 uppercase tracking-widest mb-1">Status</label>
            <select className="w-full bg-transparent border-none text-xs font-bold p-0 focus:ring-0 cursor-pointer text-on-surface">
              <option>All Statuses</option>
              <option>Live</option>
              <option>Pending</option>
              <option>Paused</option>
              <option>Draft</option>
            </select>
          </div>
          <div className="w-px h-8 bg-outline-variant/30"></div>
          <div className="flex-1 px-4 py-2">
            <label className="block text-[9px] font-black text-outline/50 uppercase tracking-widest mb-1">Property Type</label>
            <select className="w-full bg-transparent border-none text-xs font-bold p-0 focus:ring-0 cursor-pointer text-on-surface">
              <option>All Types</option>
              <option>Residential</option>
              <option>Commercial</option>
              <option>Industrial</option>
            </select>
          </div>
        </div>
        
        <div className="md:col-span-3 bg-surface-container-lowest p-2 rounded-2xl flex items-center shadow-authoritative">
          <div className="flex-1 px-4 py-2">
            <label className="block text-[9px] font-black text-outline/50 uppercase tracking-widest mb-1">Price Range</label>
            <div className="flex items-center gap-2 text-xs font-bold text-on-surface cursor-pointer">
              <span>Any</span>
              <span className="material-symbols-outlined text-sm text-outline/40">expand_more</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-5 flex items-center gap-3">
          <div className="flex-1 bg-surface-container-lowest p-2 rounded-2xl flex items-center shadow-authoritative h-full">
            <div className="flex-1 px-4 py-2">
              <label className="block text-[9px] font-black text-outline/50 uppercase tracking-widest mb-1">Sort By</label>
              <div className="flex items-center justify-between cursor-pointer">
                <span className="text-xs font-bold text-on-surface tracking-tight">Newest First</span>
                <span className="material-symbols-outlined text-lg text-outline/40">sort</span>
              </div>
            </div>
          </div>
          <button className="aspect-square h-full bg-surface-container-lowest rounded-2xl flex items-center justify-center text-outline/40 hover:text-primary transition-all shadow-authoritative">
            <span className="material-symbols-outlined">grid_view</span>
          </button>
          <button className="aspect-square h-full bg-primary/10 rounded-2xl flex items-center justify-center text-primary shadow-authoritative">
            <span className="material-symbols-outlined">view_list</span>
          </button>
        </div>
      </section>

      {/* Listings Table */}
      <section className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-authoritative">
        {isEmpty ? (
          <div className="py-20 flex justify-center">
            <EmptyState 
              title="No active listings" 
              message="Get started by creating your first property entry."
              actionText="+ New Listing"
              onAction={() => window.location.href = '/seller/listings/new/step-1'}
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left min-w-[800px]">
              <thead>
                <tr className="bg-surface-container-low/50">
                  <th className="px-8 py-5 text-[10px] font-black text-outline/50 uppercase tracking-widest leading-none">Listing</th>
                  <th className="px-6 py-5 text-[10px] font-black text-outline/50 uppercase tracking-widest leading-none">Type</th>
                  <th className="px-6 py-5 text-[10px] font-black text-outline/50 uppercase tracking-widest leading-none">Status</th>
                  <th className="px-6 py-5 text-[10px] font-black text-outline/50 uppercase tracking-widest text-right leading-none">Price</th>
                  <th className="px-6 py-5 text-[10px] font-black text-outline/50 uppercase tracking-widest text-center leading-none">Engagement</th>
                  <th className="px-6 py-5 text-[10px] font-black text-outline/50 uppercase tracking-widest leading-none">Last Updated</th>
                  <th className="px-8 py-5 text-[10px] font-black text-outline/50 uppercase tracking-widest text-right leading-none">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {listings.map((listing) => (
                  <SellerListingRow key={listing.id} listing={listing} />
                ))}
              </tbody>
            </table>
            
            {/* Pagination Editorial */}
            <div className="px-8 py-6 flex items-center justify-between bg-surface-container-lowest border-t border-outline-variant/10">
              <p className="text-[11px] font-bold text-outline/50 tracking-tight">
                Showing <span className="text-on-surface font-black">0-0</span> of 0 listings
              </p>
              <div className="flex items-center gap-1">
                <button className="w-10 h-10 flex items-center justify-center rounded-full text-outline/30 hover:bg-surface-container-low transition-all">
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white font-black text-xs shadow-lg shadow-primary/20">1</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full text-outline hover:bg-surface-container-low transition-all">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Intelligence Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
        <div className="bg-primary p-10 rounded-[1.5rem] text-white relative overflow-hidden group shadow-2xl shadow-primary/20 transition-transform hover:scale-[1.02]">
          <div className="relative z-10">
            <h3 className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2 leading-none">Total Value</h3>
            <p className="text-[2.75rem] font-headline font-[800] tracking-tighter leading-none mb-6">$0.00</p>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-white/10 w-fit px-3 py-1 rounded-full">
              <span className="material-symbols-outlined text-xs leading-none" style={{ fontVariationSettings: "'FILL' 1" }}>trending_flat</span>
              <span>No data available</span>
            </div>
          </div>
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
        </div>
        
        <div className="bg-surface-container-lowest p-10 rounded-[1.5rem] shadow-authoritative group transition-transform hover:scale-[1.02]">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-outline/40 mb-2 leading-none">Avg Days on Market</h3>
          <p className="text-[2.75rem] font-headline font-[800] tracking-tighter leading-none text-on-surface mb-6">
            0 <span className="text-[1rem] font-bold tracking-tight text-outline/40">DAYS</span>
          </p>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-secondary font-semibold">
            <span className="material-symbols-outlined text-sm leading-none" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
            <span>Awaiting active listings</span>
          </div>
        </div>
        
        <div className="bg-surface-container-lowest p-10 rounded-[1.5rem] shadow-authoritative group transition-transform hover:scale-[1.02]">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-outline/40 mb-2 leading-none">Lead Conversion</h3>
          <p className="text-[2.75rem] font-headline font-[800] tracking-tighter leading-none text-on-surface mb-6">0%</p>
          <div className="w-full bg-surface-container-low h-2 rounded-full mt-2 overflow-hidden shadow-inner">
            <div className="bg-tertiary h-full w-[0%] rounded-full shadow-[0_0_10px_rgba(107,56,212,0.3)]"></div>
          </div>
        </div>
      </section>
    </SellerDashboardLayout>
  );
};

export default SellerListings;
