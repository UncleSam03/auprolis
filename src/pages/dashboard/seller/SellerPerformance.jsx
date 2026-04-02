/* src/pages/dashboard/seller/SellerPerformance.jsx */
import React from 'react';
import SellerDashboardLayout from '../../../components/dashboard/SellerDashboardLayout';

const SellerPerformance = () => {
  return (
    <SellerDashboardLayout title="Performance Intelligence">
      <div className="max-w-[1200px] mx-auto space-y-12">
        {/* Page Header & Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2 block">Market Intel</span>
            <h2 className="text-5xl font-[800] font-headline text-on-surface tracking-tighter leading-none">Analytics Dashboard</h2>
          </div>
          <div className="flex items-center bg-surface-container-low p-2 rounded-full shadow-inner border border-outline-variant/10 self-start md:self-auto">
            {['7 Days', '30 Days', '90 Days'].map((period) => (
              <button 
                key={period}
                className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-full transition-all ${
                  period === '30 Days' ? 'bg-white text-primary shadow-lg shadow-primary/5' : 'text-outline/60 hover:text-primary'
                }`}
              >
                {period}
              </button>
            ))}
            <div className="w-[1px] h-4 bg-outline-variant/30 mx-3"></div>
            <button className="px-5 py-2.5 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-on-surface hover:text-primary transition-all">
              <span className="material-symbols-outlined text-lg leading-none">calendar_today</span>
              Custom
            </button>
          </div>
        </div>

        {/* Primary Metric Chart: Intelligence Card */}
        <section className="bg-surface-container-lowest rounded-[2.5rem] p-12 shadow-authoritative relative overflow-hidden group">
          <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8 relative z-10">
            <div>
              <h3 className="text-3xl font-[800] font-headline text-on-surface tracking-tight leading-none mb-4">Total Listing Views</h3>
              <p className="text-sm text-on-surface-variant font-medium opacity-60 max-w-md leading-relaxed">
                Aggregated traffic across all active properties. Insights will appear once listings are live.
              </p>
            </div>
            <div className="text-left md:text-right">
              <div className="flex items-center justify-start md:justify-end gap-2 text-outline/40 font-black text-xl mb-2">
                <span className="material-symbols-outlined font-black" style={{ fontVariationSettings: "'FILL' 1" }}>trending_flat</span>
                <span>0.0%</span>
              </div>
              <span className="text-5xl font-[900] font-headline text-on-surface tracking-tighter leading-none">0</span>
            </div>
          </div>

          {/* Chart Visualization Mockup */}
          <div className="relative h-[400px] w-full mt-8 rounded-3xl border-l-2 border-b-2 border-outline-variant/10 p-8 chart-grid overflow-hidden flex items-center justify-center">
            <div className="flex flex-col items-center gap-4 opacity-20">
              <span className="material-symbols-outlined text-6xl">show_chart</span>
              <p className="text-xs font-black uppercase tracking-widest text-on-surface">No visibility data yet</p>
            </div>
          </div>
          
          {/* Subtle watermark */}
          <div className="absolute -top-20 -right-20 opacity-[0.02] pointer-events-none group-hover:scale-110 transition-transform duration-1000">
            <span className="material-symbols-outlined text-[400px]">monitoring</span>
          </div>
        </section>

        {/* Secondary Metrics: Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-surface-container-lowest rounded-[2.5rem] p-10 shadow-authoritative flex flex-col justify-between h-[280px] hover:scale-[1.02] transition-transform duration-500 border border-outline-variant/10">
            <div className="flex justify-between items-start">
              <div className="p-4 bg-primary/10 text-primary rounded-2xl shadow-inner">
                <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>chat_bubble</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-black text-outline/40 uppercase tracking-widest font-headline">Qualified Leads</span>
                <h4 className="text-5xl font-[900] font-headline mt-2 text-on-surface tracking-tighter">0</h4>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60">Response Rate</span>
                <span className="font-[900] text-outline/40 text-lg">0%</span>
              </div>
              <div className="w-full h-3 bg-surface-container-high rounded-full overflow-hidden shadow-inner">
                <div className="h-full bg-primary/10 rounded-full shadow-inner" style={{ width: '0%' }}></div>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-[2.5rem] p-10 shadow-authoritative flex flex-col justify-between h-[280px] hover:scale-[1.02] transition-transform duration-500 border border-outline-variant/10">
            <div className="flex justify-between items-start">
              <div className="p-4 bg-tertiary/10 text-tertiary rounded-2xl shadow-inner">
                <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>visibility</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-black text-outline/40 uppercase tracking-widest font-headline">Active Watchers</span>
                <h4 className="text-5xl font-[900] font-headline mt-2 text-on-surface tracking-tighter">0</h4>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium text-on-surface-variant bg-surface-container-low/50 p-6 rounded-2xl border border-outline-variant/5">
              <span className="material-symbols-outlined text-outline/40 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
              <p className="opacity-70 italic tracking-tight">Portfolio metrics will populate here as watchlists are built.</p>
            </div>
          </div>
        </div>

        {/* Breakdown Section */}
        <div className="space-y-8 pb-16">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-[800] font-headline text-on-surface tracking-tight">Top Performing Listings</h3>
            <button className="text-[10px] font-black uppercase tracking-widest text-outline/50 cursor-not-allowed">View Detailed Report</button>
          </div>
          
          <div className="grid grid-cols-1 gap-8">
            <div className="bg-surface-container-low/30 rounded-[2.5rem] border-2 border-dashed border-outline-variant/20 flex flex-col items-center justify-center p-20 text-center">
              <div className="w-20 h-20 rounded-3xl bg-surface-container-high flex items-center justify-center mb-6 shadow-inner">
                <span className="material-symbols-outlined text-4xl text-outline/20">analytics</span>
              </div>
              <h4 className="text-2xl font-[800] font-headline text-on-surface tracking-tight mb-3">No Listing Performance Data</h4>
              <p className="text-sm font-medium text-on-surface-variant opacity-60 max-w-sm mx-auto leading-relaxed italic">
                Performance tracking requires at least one active listing. Get started by creating your first entry.
              </p>
              <button 
                onClick={() => window.location.href = '/seller/listings/new/step-1'}
                className="mt-10 px-10 py-4 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:scale-105 transition-all shadow-xl shadow-primary/20"
              >
                + New Listing
              </button>
            </div>
          </div>
        </div>

        {/* Footer Meta */}
        <footer className="pt-12 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-widest text-outline/40 pb-12">
          <p>© 2024 Auprolis Intelligence. All reports generated are encrypted and strictly confidential.</p>
          <div className="flex items-center gap-10">
            <button className="hover:text-primary transition-colors">Export PDF Report</button>
            <button className="hover:text-primary transition-colors">API Settings</button>
          </div>
        </footer>
      </div>
    </SellerDashboardLayout>
  );
};

export default SellerPerformance;
