/* src/pages/dashboard/admin/AdminListings.jsx */
import React from 'react';
import AdminDashboardLayout from '../../../components/dashboard/AdminDashboardLayout';

const AdminListings = () => {
  const listings = [
    { id: '#AUR-8821', title: 'Mokolodi Estate - Phase 2', type: 'Residential', location: 'Gaborone West', seller: 'Lobatse Properties Ltd.', status: 'Live', date: 'Oct 12, 2023', views: '1,204', imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=300' },
    { id: '#AUR-7712', title: 'iTowers Corporate Suite', type: 'Commercial', location: 'CBD Gaborone', seller: 'Prime Assets Group', status: 'Pending', date: 'Oct 14, 2023', views: '842', imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=300' },
    { id: '#AUR-4490', title: 'Broadhurst Industrial Yard', type: 'Industrial', location: 'Block 6', seller: 'Eco-Logic Mining', status: 'Suspended', date: 'Oct 05, 2023', views: '2,410', imageUrl: 'https://images.unsplash.com/photo-1600585154526-990dcea42e49?auto=format&fit=crop&q=80&w=300' },
    { id: '#AUR-9902', title: 'Phakalane Golf Estate', type: 'Residential', location: 'Phakalane', seller: 'Private Seller - N. Kole', status: 'Live', date: 'Sep 28, 2023', views: '4,119', imageUrl: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=300' }
  ];

  return (
    <AdminDashboardLayout title="Listings Management" subtitle="High-density data view of active and pending administrative property intelligence.">
      <div className="space-y-12 pb-24">
        {/* Toolbar Section */}
        <section className="flex flex-wrap items-center gap-8 bg-surface-container-low/30 p-8 rounded-[2rem] border border-outline-variant/10 shadow-inner">
          <div className="flex items-center bg-white px-6 py-3 rounded-2xl gap-4 shadow-sm border border-outline-variant/5">
            <span className="text-[10px] font-black uppercase tracking-widest text-outline/40">Status:</span>
            <select className="bg-transparent border-none text-xs font-[800] text-on-surface focus:ring-0 py-0 pr-8 cursor-pointer">
              <option>All Statuses</option>
              <option>Live Assets</option>
              <option>Pending Moderation</option>
              <option>Suspended Intelligence</option>
            </select>
          </div>
          <div className="flex items-center bg-white px-6 py-3 rounded-2xl gap-4 shadow-sm border border-outline-variant/5">
            <span className="text-[10px] font-black uppercase tracking-widest text-outline/40">Type:</span>
            <select className="bg-transparent border-none text-xs font-[800] text-on-surface focus:ring-0 py-0 pr-8 cursor-pointer">
              <option>All Property Types</option>
              <option>Commercial Suite</option>
              <option>Residential Villa</option>
              <option>Industrial Complex</option>
            </select>
          </div>
          <div className="flex items-center bg-white px-6 py-3 rounded-2xl gap-4 shadow-sm border border-outline-variant/5">
            <span className="text-[10px] font-black uppercase tracking-widest text-outline/40">Sort By:</span>
            <select className="bg-transparent border-none text-xs font-[800] text-on-surface focus:ring-0 py-0 pr-8 cursor-pointer">
              <option>Latest Submission</option>
              <option>Highest Engagement</option>
              <option>Maximum Valuation</option>
            </select>
          </div>
          <button className="ml-auto flex items-center gap-3 text-primary font-black text-[10px] uppercase tracking-[0.2em] hover:bg-primary/5 px-6 py-3 rounded-full transition-all">
            <span className="material-symbols-outlined text-[20px]">filter_list</span>
            Advanced Filters
          </button>
        </section>

        {/* High-Density Data Table */}
        <section className="bg-surface-container-lowest rounded-[2.5rem] overflow-hidden shadow-authoritative border border-outline-variant/10">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead className="bg-surface-container-low/30 sticky top-0 z-10">
              <tr>
                <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.25em] text-outline/40 leading-none">Identifier</th>
                <th className="px-8 py-8 text-[10px] font-black uppercase tracking-[0.25em] text-outline/40 leading-none">Asset Intelligence</th>
                <th className="px-8 py-8 text-[10px] font-black uppercase tracking-[0.25em] text-outline/40 leading-none">Entity / Seller</th>
                <th className="px-8 py-8 text-[10px] font-black uppercase tracking-[0.25em] text-outline/40 leading-none">Status</th>
                <th className="px-8 py-8 text-[10px] font-black uppercase tracking-[0.25em] text-outline/40 leading-none">Submitted</th>
                <th className="px-8 py-8 text-[10px] font-black uppercase tracking-[0.25em] text-outline/40 leading-none text-right">Reach</th>
                <th className="px-10 py-8 text-right text-[10px] font-black uppercase tracking-[0.25em] text-outline/40 leading-none">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {listings.map((item, idx) => (
                <tr key={idx} className="group hover:bg-surface transition-all duration-300">
                  <td className="px-10 py-8 text-xs font-black text-on-surface-variant opacity-40 font-mono tracking-tighter">{item.id}</td>
                  <td className="px-8 py-8">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-xl shadow-on-surface/[0.05] flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                        <img className="w-full h-full object-cover" src={item.imageUrl} alt="Asset" />
                      </div>
                      <div className="flex flex-col gap-1 pr-6">
                        <span className="font-[900] text-lg text-on-surface font-headline leading-tight tracking-tight group-hover:text-primary transition-colors">{item.title}</span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 italic">{item.type} • {item.location}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-8 text-sm font-[800] text-on-surface/70 italic">{item.seller}</td>
                  <td className="px-8 py-8">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest leading-none shadow-sm ${
                      item.status === 'Live' ? 'bg-secondary/10 text-secondary' : 
                      item.status === 'Pending' ? 'bg-primary/10 text-primary' : 'bg-error/10 text-error'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-8 py-8 text-xs font-bold text-on-surface-variant opacity-60 font-body">{item.date}</td>
                  <td className="px-8 py-8 text-right">
                    <span className="text-sm font-[900] text-on-surface tracking-tighter">{item.views}</span>
                    <p className="text-[8px] font-black uppercase tracking-widest text-outline/30 mt-1">Unique Imprints</p>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <button className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-outline/30 hover:bg-on-surface hover:text-white transition-all shadow-md group-hover:shadow-lg">
                      <span className="material-symbols-outlined text-xl">settings_intelligence</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <footer className="px-10 py-8 flex items-center justify-between bg-surface-container-low/30 border-t border-outline-variant/10">
            <span className="text-[11px] font-black uppercase tracking-widest text-outline/40 italic">Aggregated Intelligence: 1,248 Active Listings</span>
            <div className="flex items-center gap-3">
              <button className="w-10 h-10 rounded-xl bg-surface-container-high text-outline/40 flex items-center justify-center hover:bg-white transition-all shadow-inner">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <div className="flex items-center gap-2">
                <span className="w-10 h-10 rounded-xl bg-primary text-white text-xs font-black shadow-xl shadow-primary/20 flex items-center justify-center">1</span>
                <span className="w-10 h-10 rounded-xl text-on-surface font-black text-xs hover:bg-white transition-all flex items-center justify-center cursor-pointer">2</span>
              </div>
              <button className="w-10 h-10 rounded-xl bg-surface-container-high text-on-surface flex items-center justify-center hover:bg-white transition-all shadow-inner">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </footer>
        </section>

        {/* Performance Bento */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { label: 'Total Portfolio Intelligence', value: '1,248', trend: '+12%', color: 'emerald' },
            { label: 'Pending Human Verification', value: '42', subtext: 'SLA Active', color: 'primary' },
            { label: 'Average Asset Valuation', value: 'BWP 4.2M', subtext: 'Market Aggregated', color: 'tertiary' },
            { label: 'Network Reach Imprints', value: '8.2k', trend: 'Global', color: 'primary' }
          ].map((stat, idx) => (
            <div key={idx} className="p-10 bg-white rounded-[2.5rem] border-l-8 border-primary shadow-authoritative hover:scale-[1.03] transition-all">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-outline/40 block mb-6">{stat.label}</span>
              <div className="flex items-end justify-between">
                <h3 className="text-4xl font-[900] font-headline text-on-surface tracking-tighter leading-none">{stat.value}</h3>
                <div className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                  stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-700' : 'bg-primary/5 text-primary'
                }`}>
                  {stat.trend || stat.subtext}
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminListings;
