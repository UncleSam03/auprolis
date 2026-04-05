/* src/pages/dashboard/seller/SellerDashboardHome.jsx */
import React from 'react';
import SellerDashboardLayout from '../../../components/dashboard/SellerDashboardLayout';
import KPIBlock from '../../../components/dashboard/seller/KPIBlock';
import SellerListingSummary from '../../../components/dashboard/seller/SellerListingSummary';
import { useNavigate } from 'react-router-dom';

const SellerDashboardHome = () => {
  const navigate = useNavigate();

  const kpis = [
    { label: 'Total listings', value: '0', trend: '---', icon: 'inventory_2', color: 'primary' },
    { label: 'Live', value: '0', trend: '---', icon: 'check_circle', color: 'secondary' },
    { label: 'Pending review', value: '0', trend: '---', icon: 'hourglass_empty', color: 'tertiary' },
    { label: 'Total Views', value: '0', trend: '---', icon: 'visibility', color: 'tertiary' },
  ];

  const recentListings = [];

  return (
    <SellerDashboardLayout title="Seller Dashboard">
      {/* KPI Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => (
          <KPIBlock key={idx} {...kpi} />
        ))}
      </section>

      {/* Main Bento Grid Section */}
      <div className="grid grid-cols-12 gap-10">
        {/* Left Column: Listings */}
        <section className="col-span-12 xl:col-span-8 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-on-surface">Your listings at a glance</h2>
            <button 
              onClick={() => navigate('/seller/listings')}
              className="text-primary font-bold text-sm hover:underline uppercase tracking-widest text-[10px]"
            >
              View all
            </button>
          </div>
          <div className="space-y-4">
            {recentListings.length > 0 ? (
              recentListings.map((listing, idx) => (
                <SellerListingSummary key={idx} {...listing} />
              ))
            ) : (
              <div className="bg-surface-container-low/20 rounded-3xl p-12 flex flex-col items-center justify-center text-center">
                <span className="material-symbols-outlined text-4xl text-outline/30 mb-4">inventory</span>
                <p className="text-on-surface-variant font-medium text-sm">No active listings to display.</p>
                <button 
                  onClick={() => navigate('/seller/listings/new/step-1')}
                  className="mt-6 text-primary font-black text-[10px] uppercase tracking-widest border border-primary/20 px-6 py-2 rounded-full hover:bg-primary/5 transition-all"
                >
                  + Add Listing
                </button>
              </div>
            )}
          </div>
          <div className="pt-4">
            <button 
              onClick={() => navigate('/seller/listings/new/step-1')}
              className="w-full py-6 rounded-2xl border-2 border-dashed border-outline-variant/30 text-on-surface-variant font-bold text-sm hover:bg-surface-container-low hover:border-primary/50 transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span className="material-symbols-outlined text-outline/40 group-hover:text-primary transition-colors">add_circle</span>
              <span className="text-outline/40 group-hover:text-on-surface transition-colors font-headline uppercase tracking-widest text-xs">Create a New Listing</span>
            </button>
          </div>
        </section>

        {/* Right Column: Activity & Performance */}
        <section className="col-span-12 xl:col-span-4 space-y-12">
          {/* Performance CTA */}
          <div className="bg-gradient-to-br from-primary to-primary-container p-10 rounded-[1.5rem] text-white shadow-xl shadow-primary/20 relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-2xl font-extrabold mb-2 tracking-tight">Intelligence Report</h3>
              <p className="text-white/80 text-sm mb-8 leading-relaxed max-w-xs">Your portfolio insights will appear here once listings are active.</p>
              <button 
                onClick={() => navigate('/seller/performance')}
                className="w-full bg-white text-primary font-black py-4 rounded-full hover:bg-white/90 active:scale-95 transition-all text-xs uppercase tracking-widest shadow-lg shadow-black/10"
              >
                View performance
              </button>
            </div>
            <div className="absolute -bottom-6 -right-6 opacity-10 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
              <span className="material-symbols-outlined text-[140px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200" }}>analytics</span>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="space-y-8 bg-surface-container-low/30 p-8 rounded-[1.5rem]">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold tracking-tight text-on-surface">Recent activity</h3>
              <button className="text-[10px] font-black uppercase tracking-widest text-outline/50 hover:text-primary transition-colors">Clear</button>
            </div>
            <div className="min-h-[200px] flex flex-col items-center justify-center text-center border-l border-outline-variant/10 ml-2 pl-8">
              <span className="material-symbols-outlined text-outline/20 text-3xl mb-3">history</span>
              <p className="text-xs font-bold text-outline/40 uppercase tracking-widest">No recent activity</p>
            </div>
          </div>
        </section>
      </div>
    </SellerDashboardLayout>
  );
};

export default SellerDashboardHome;
