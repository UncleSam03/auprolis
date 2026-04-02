/* src/pages/dashboard/seller/SellerDashboardHome.jsx */
import React from 'react';
import SellerDashboardLayout from '../../../components/dashboard/SellerDashboardLayout';
import KPIBlock from '../../../components/dashboard/seller/KPIBlock';
import SellerListingSummary from '../../../components/dashboard/seller/SellerListingSummary';
import { useNavigate } from 'react-router-dom';

const SellerDashboardHome = () => {
  const navigate = useNavigate();

  const kpis = [
    { label: 'Total listings', value: '124', trend: '+2.4%', icon: 'inventory_2', color: 'primary' },
    { label: 'Live', value: '89', trend: 'Steady', icon: 'check_circle', color: 'secondary' },
    { label: 'Pending review', value: '32', trend: '12 New', icon: 'hourglass_empty', color: 'tertiary' },
    { label: 'Inquiries this week', value: '412', trend: 'High', icon: 'forum', color: 'error' },
  ];

  const recentListings = [
    { 
      status: 'Live', 
      refCode: 'AUP-2041', 
      title: 'The Horizon Heights Villa', 
      location: 'Beverly Hills, CA', 
      price: '$4,250,000', 
      views: 1240, 
      inquiries: 24, 
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=400' 
    },
    { 
      status: 'Pending', 
      refCode: 'AUP-9812', 
      title: 'Oakwood Estate Loft', 
      location: 'Austin, TX', 
      price: '$850,000', 
      views: 0, 
      inquiries: 0, 
      imageUrl: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=400' 
    },
    { 
      status: 'Live', 
      refCode: 'AUP-1102', 
      title: 'Blue Coast Retreat', 
      location: 'Malibu, CA', 
      price: '$2,100,000', 
      views: 842, 
      inquiries: 12, 
      imageUrl: 'https://images.unsplash.com/photo-1600585154526-990dcea42e49?auto=format&fit=crop&q=80&w=400' 
    },
  ];

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
            {recentListings.map((listing, idx) => (
              <SellerListingSummary key={idx} {...listing} />
            ))}
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
              <p className="text-white/80 text-sm mb-8 leading-relaxed max-w-xs">Your portfolio exposure has increased by 14% since last month.</p>
              <button 
                onClick={() => navigate('/seller/performance')}
                className="w-full bg-white text-primary font-black py-4 rounded-full hover:bg-white/90 active:scale-95 transition-all text-xs uppercase tracking-widest shadow-lg shadow-black/10"
              >
                View performance
              </button>
            </div>
            <div className="absolute -bottom-6 -right-6 opacity-10 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
              <span className="material-symbols-outlined text-[140px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 200" }}>trending_up</span>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="space-y-8 bg-surface-container-low/30 p-8 rounded-[1.5rem]">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold tracking-tight text-on-surface">Recent activity</h3>
              <button className="text-[10px] font-black uppercase tracking-widest text-outline/50 hover:text-primary transition-colors">Clear</button>
            </div>
            <div className="space-y-8 border-l border-outline-variant/30 pl-8 ml-2">
              <div className="relative">
                <div className="absolute -left-[36.5px] top-0 w-4 h-4 bg-secondary rounded-full ring-4 ring-surface"></div>
                <p className="text-[10px] font-black text-on-surface-variant mb-1 uppercase tracking-widest opacity-40">2 hours ago</p>
                <p className="text-sm font-bold text-on-surface">New inquiry received</p>
                <p className="text-xs text-on-surface-variant font-medium mt-1">Horizon Heights Villa • David S.</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[36.5px] top-0 w-4 h-4 bg-tertiary rounded-full ring-4 ring-surface"></div>
                <p className="text-[10px] font-black text-on-surface-variant mb-1 uppercase tracking-widest opacity-40">5 hours ago</p>
                <p className="text-sm font-bold text-on-surface">Submitted listing for review</p>
                <p className="text-xs text-on-surface-variant font-medium mt-1 tracking-tight">Oakwood Estate Loft • Admin audit</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[36.5px] top-0 w-4 h-4 bg-primary rounded-full ring-4 ring-surface"></div>
                <p className="text-[10px] font-black text-on-surface-variant mb-1 uppercase tracking-widest opacity-40">Yesterday</p>
                <p className="text-sm font-bold text-on-surface">Price adjustment approved</p>
                <p className="text-xs text-on-surface-variant font-medium mt-1">Blue Coast Retreat • Marketplace team</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </SellerDashboardLayout>
  );
};

export default SellerDashboardHome;
