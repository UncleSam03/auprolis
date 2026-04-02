/* src/pages/dashboard/admin/AdminHome.jsx */
import React from 'react';
import { Link } from 'react-router-dom';
import AdminDashboardLayout from '../../../components/dashboard/AdminDashboardLayout';

const AdminHome = () => {
  const kpis = [
    { label: 'Pending Listings', value: '48', status: 'Requires Action', icon: 'hourglass_empty', color: 'amber' },
    { label: 'Live Listings', value: '1,204', trend: '+12% vs last month', icon: 'check_circle', color: 'emerald' },
    { label: 'Active Users', value: '8,432', subtext: '84% verified', icon: 'group', color: 'primary' },
    { label: 'Open Inquiries', value: '12', status: 'High Priority', icon: 'chat_bubble', color: 'amber' },
  ];

  return (
    <AdminDashboardLayout title="Admin Overview">
      <div className="space-y-16">
        {/* KPI Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {kpis.map((kpi, idx) => (
            <div key={idx} className="bg-surface-container-lowest p-10 rounded-[2rem] flex flex-col gap-6 relative overflow-hidden group shadow-authoritative border border-outline-variant/10">
              <div className="flex items-center justify-between">
                <span className="font-label text-[10px] font-black tracking-[0.25em] text-on-surface-variant uppercase opacity-50">{kpi.label}</span>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform ${
                  kpi.color === 'amber' ? 'bg-amber-500/10 text-amber-600' : 
                  kpi.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-primary/10 text-primary'
                }`}>
                  <span className="material-symbols-outlined text-2xl">{kpi.icon}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-5xl font-[900] text-on-surface tracking-tighter leading-none">{kpi.value}</span>
                {kpi.status && (
                  <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest w-fit shadow-sm ${
                    kpi.color === 'amber' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {kpi.status}
                  </span>
                )}
                {kpi.trend && <span className="text-emerald-700 text-[10px] font-black uppercase tracking-widest italic">{kpi.trend}</span>}
                {kpi.subtext && <span className="text-on-surface-variant text-[10px] font-black uppercase tracking-widest opacity-40">{kpi.subtext}</span>}
              </div>
              <div className="absolute -bottom-10 -right-10 opacity-[0.03] group-hover:scale-110 transition-transform duration-1000">
                <span className="material-symbols-outlined text-[180px]">{kpi.icon}</span>
              </div>
            </div>
          ))}
        </section>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-12 gap-10">
          {/* Chart Area */}
          <section className="col-span-12 lg:col-span-8 bg-surface-container-lowest p-12 rounded-[2.5rem] shadow-authoritative border border-outline-variant/10">
            <div className="flex items-center justify-between mb-12">
              <div className="space-y-1">
                <h3 className="text-3xl font-[800] font-headline text-on-surface tracking-tight">Platform Velocity</h3>
                <p className="text-sm font-medium text-on-surface-variant opacity-60 italic">Listings Submitted vs. Institutional Approvals</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <span className="w-4 h-4 rounded-full bg-primary shadow-lg shadow-primary/20"></span>
                  <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest leading-none">Submitted</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-4 h-4 rounded-full bg-secondary-fixed-dim shadow-lg shadow-secondary/20"></span>
                  <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest leading-none">Approved</span>
                </div>
              </div>
            </div>
            
            <div className="w-full h-96 relative flex items-end justify-between gap-4 px-4 mt-8 pb-10">
              <div className="absolute inset-0 flex flex-col justify-between py-1 opacity-10 pointer-events-none">
                {[0, 1, 2, 3, 4].map(i => <div key={i} className="border-t border-outline w-full"></div>)}
              </div>
              {[60, 85, 40, 75, 95, 50, 65, 80].map((h, i) => (
                <div key={i} className="flex flex-col flex-1 gap-2 items-center max-w-[50px] group/bar relative">
                  <div className="w-full bg-primary rounded-t-xl opacity-90 transition-all hover:opacity-100 shadow-lg shadow-primary/10 group-hover/bar:scale-x-105" style={{ height: `${h}%` }}></div>
                  <div className="w-full bg-secondary-fixed-dim rounded-t-xl opacity-80 transition-all hover:opacity-100 shadow-lg shadow-secondary/10 group-hover/bar:scale-x-105" style={{ height: `${h * 0.75}%` }}></div>
                </div>
              ))}
            </div>
          </section>

          {/* Action Required List */}
          <section className="col-span-12 lg:col-span-4 bg-surface-container-low/50 rounded-[2.5rem] p-12 border border-outline-variant/5 shadow-inner">
            <div className="mb-10">
              <span className="font-label text-[10px] font-black tracking-[0.25em] text-on-surface-variant uppercase block mb-3 opacity-50">High Severity Protocol</span>
              <h3 className="text-3xl font-[800] font-headline text-on-surface tracking-tight leading-none">Moderation Queue</h3>
            </div>
            
            <div className="space-y-6">
              {[
                { title: 'Gaborone Industrial - Block 4', type: 'Listing Review', icon: 'home_work', color: 'primary' },
                { title: 'John Doe Investor', type: 'Flagged Account', avatar: true, color: 'error' },
                { title: 'First Capital Bank', type: 'Entity Verification', icon: 'account_balance', color: 'tertiary' }
              ].map((item, idx) => (
                <div key={idx} className="group flex items-center justify-between p-6 rounded-[2rem] transition-all hover:bg-white hover:shadow-authoritative border border-transparent hover:border-outline-variant/10">
                  <div className="flex items-center gap-5">
                    {item.avatar ? (
                      <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-xl shadow-error/10">
                        <img className="w-full h-full object-cover" src="https://i.pravatar.cc/150?u=a" alt="User" />
                      </div>
                    ) : (
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner ${
                        item.color === 'primary' ? 'bg-primary/10 text-primary' : 'bg-tertiary/10 text-tertiary'
                      }`}>
                        <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                      </div>
                    )}
                    <div>
                      <p className="font-[800] text-sm text-on-surface font-headline leading-tight">{item.title}</p>
                      <p className={`text-[10px] font-black uppercase tracking-widest mt-1 ${item.color === 'error' ? 'text-error' : 'text-on-surface-variant opacity-60'}`}>
                        {item.type}
                      </p>
                    </div>
                  </div>
                  <Link 
                    to={`/admin/listings/review/${item.title.includes('Industrial') ? 'GAB772' : 'USER101'}`}
                    className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-outline hover:bg-primary hover:text-white transition-all shadow-md"
                  >
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-10 py-5 bg-on-surface text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-primary transition-all shadow-2xl flex items-center justify-center gap-3 group">
              Full Moderation Deck
              <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
            </button>
          </section>
        </div>

        {/* Detailed Analysis Section (Editorial Asymmetry) */}
        <section className="pt-16 grid grid-cols-12 gap-10">
          <div className="col-span-12 md:col-span-4 lg:pr-10">
            <span className="font-label text-[10px] font-black tracking-[0.25em] text-primary uppercase block mb-4">Integrity Suite</span>
            <h3 className="text-4xl font-[900] font-headline text-on-surface tracking-tighter mb-8 leading-[0.9]">System <br/>Governer</h3>
            <p className="text-on-surface-variant leading-relaxed mb-10 font-medium opacity-60 italic">"Real-time governance through institutional cross-referencing and editorial moderation protocols."</p>
            <div className="w-32 h-1.5 bg-primary/20 rounded-full shadow-inner"></div>
          </div>
          
          <div className="col-span-12 md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div className="bg-white p-12 rounded-[2.5rem] relative overflow-hidden shadow-authoritative border border-outline-variant/10 group transition-all hover:scale-[1.02]">
              <span className="material-symbols-outlined absolute -top-8 -right-8 text-primary/5 text-[160px] group-hover:text-primary/10 transition-colors" style={{ fontVariationSettings: "'wght' 100" }}>security</span>
              <h4 className="text-2xl font-[800] font-headline mb-4 flex items-center gap-4 text-on-surface">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                  <span className="material-symbols-outlined text-xl">verified_user</span>
                </div>
                Compliance
              </h4>
              <p className="text-sm text-on-surface-variant font-medium opacity-60 leading-relaxed italic pr-6">Instant cross-referencing with national property registries to ensure 100% asset legitimacy.</p>
            </div>
            
            <div className="bg-white p-12 rounded-[2.5rem] relative overflow-hidden shadow-authoritative border border-outline-variant/10 group transition-all hover:scale-[1.02]">
              <span className="material-symbols-outlined absolute -top-8 -right-8 text-tertiary/5 text-[160px] group-hover:text-tertiary/10 transition-colors" style={{ fontVariationSettings: "'wght' 100" }}>gavel</span>
              <h4 className="text-2xl font-[800] font-headline mb-4 flex items-center gap-4 text-on-surface">
                <div className="w-10 h-10 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary shadow-inner">
                  <span className="material-symbols-outlined text-xl">gavel</span>
                </div>
                Oversight
              </h4>
              <p className="text-sm text-on-surface-variant font-medium opacity-60 leading-relaxed italic pr-6">Administrative log capture for definitive audit trails and institutional accountability standards.</p>
            </div>
          </div>
        </section>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminHome;
