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
                Aggregated traffic across all active properties including sheriff sales and premium distressed assets.
              </p>
            </div>
            <div className="text-left md:text-right">
              <div className="flex items-center justify-start md:justify-end gap-2 text-secondary font-black text-xl mb-2">
                <span className="material-symbols-outlined font-black" style={{ fontVariationSettings: "'FILL' 1" }}>trending_up</span>
                <span>+12.4%</span>
              </div>
              <span className="text-5xl font-[900] font-headline text-on-surface tracking-tighter leading-none">24,592</span>
            </div>
          </div>

          {/* Chart Visualization Mockup */}
          <div className="relative h-[400px] w-full mt-8 rounded-3xl border-l-2 border-b-2 border-outline-variant/10 p-8 chart-grid overflow-hidden">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 320">
              <defs>
                <linearGradient id="chartGradient" x1="0%" x2="0%" y1="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: 'var(--primary)', stopOpacity: 0.2 }} />
                  <stop offset="100%" style={{ stopColor: 'var(--primary)', stopOpacity: 0 }} />
                </linearGradient>
              </defs>
              <path 
                d="M0,280 L50,260 L150,220 L250,240 L350,180 L450,140 L550,160 L650,80 L750,100 L850,40 L950,60 L1000,20 L1000,320 L0,320 Z" 
                fill="url(#chartGradient)" 
              />
              <polyline 
                fill="none" 
                points="0,280 50,260 150,220 250,240 350,180 450,140 550,160 650,80 750,100 850,40 950,60 1000,20" 
                stroke="var(--primary)" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="6" 
                className="drop-shadow-2xl"
              />
              <circle cx="650" cy="80" fill="var(--primary)" r="8" className="shadow-2xl" />
              <circle cx="650" cy="80" fill="var(--primary)" fillOpacity="0.1" r="20" className="animate-pulse" />
            </svg>

            {/* X Axis Labels */}
            <div className="absolute -bottom-2 left-0 w-full flex justify-between text-[10px] font-black text-outline/30 uppercase tracking-[0.2em] px-10">
              <span>Oct 01</span>
              <span>Oct 08</span>
              <span>Oct 15</span>
              <span>Oct 22</span>
              <span>Oct 29</span>
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
                <h4 className="text-5xl font-[900] font-headline mt-2 text-on-surface tracking-tighter">142</h4>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60">Response Rate</span>
                <span className="font-[900] text-secondary text-lg">98%</span>
              </div>
              <div className="w-full h-3 bg-surface-container-high rounded-full overflow-hidden shadow-inner">
                <div className="h-full bg-secondary rounded-full shadow-[0_0_10px_var(--secondary)]" style={{ width: '98%' }}></div>
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
                <h4 className="text-5xl font-[900] font-headline mt-2 text-on-surface tracking-tighter">856</h4>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium text-on-surface-variant bg-surface-container-low/50 p-6 rounded-2xl border border-outline-variant/5">
              <span className="material-symbols-outlined text-tertiary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
              <p className="opacity-70 italic tracking-tight">Watchlist activity has increased by 14% since you boosted Listing #4092.</p>
            </div>
          </div>
        </div>

        {/* Breakdown Section */}
        <div className="space-y-8 pb-16">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-[800] font-headline text-on-surface tracking-tight">Top Performing Listings</h3>
            <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">View Detailed Report</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-[2rem] p-8 shadow-authoritative group transition-all hover:shadow-2xl border border-outline-variant/10">
              <div className="aspect-video w-full rounded-2xl mb-6 bg-surface-container-low overflow-hidden relative">
                <img 
                  alt="Property" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90" 
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=400"
                />
                <div className="absolute top-4 right-4 bg-primary text-white text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">Trending</div>
              </div>
              <h5 className="font-[800] text-on-surface font-headline leading-tight truncate mb-2">The Harrison Estates, Unit 4B</h5>
              <p className="text-[10px] font-black uppercase tracking-widest text-outline/40 mb-6">Auction ends in 4 days</p>
              <div className="pt-6 border-t border-outline-variant/10 flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-outline/40">Total Views</span>
                <span className="text-xl font-[900] text-primary font-headline tracking-tighter">4,102</span>
              </div>
            </div>

            {/* Empty State Mockup */}
            <div className="md:col-span-2 bg-surface-container-low/30 rounded-[2rem] border-2 border-dashed border-outline-variant/20 flex flex-col items-center justify-center p-12 text-center group hover:bg-white/50 transition-all">
              <div className="w-20 h-20 rounded-3xl bg-surface-container-high flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-4xl text-outline/20">bar_chart_4_bars</span>
              </div>
              <h4 className="text-xl font-[800] font-headline text-on-surface tracking-tight mb-3">Regional Insights Pending</h4>
              <p className="text-sm font-medium text-on-surface-variant opacity-60 max-w-sm mx-auto leading-relaxed italic">
                Detailed comparative data will populate as your listings go live in this specific jurisdiction.
              </p>
              <button className="mt-10 px-8 py-3 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-primary hover:text-white transition-all shadow-sm">
                Learn more about Intel
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
