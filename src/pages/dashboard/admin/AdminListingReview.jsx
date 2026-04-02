/* src/pages/dashboard/admin/AdminListingReview.jsx */
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminDashboardLayout from '../../../components/dashboard/AdminDashboardLayout';

const AdminListingReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <AdminDashboardLayout title={`Moderation: ${id || 'Gaborone Industrial Unit'}`} subtitle="Human intelligence review for high-value distressed asset verification.">
      <div className="space-y-12 pb-32">
        {/* Breadcrumbs & Title */}
        <nav className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.25em] text-outline/30 font-headline leading-none">
          <span>Authority</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span>Pending Moderation</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-primary">{id || 'GAB772'}</span>
        </nav>

        {/* Status Alert Banner */}
        <section className="bg-amber-500/10 border-l-8 border-amber-500 p-10 rounded-[2.5rem] flex items-center justify-between shadow-2xl shadow-amber-500/5 group">
          <div className="flex items-center gap-8">
            <div className="w-16 h-16 bg-white/50 backdrop-blur rounded-2xl flex items-center justify-center text-amber-600 shadow-inner group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl font-black">priority_high</span>
            </div>
            <div>
              <h3 className="text-sm font-black text-amber-800 uppercase tracking-[0.2em] font-headline mb-2 leading-none">Pending Governance Approval</h3>
              <p className="text-xs font-medium text-amber-700/70 max-w-xl leading-relaxed italic pr-10">Submitted by <strong className="text-amber-800">PropertyFirst Agents</strong> • 4 hours remaining for institutional SLA compliance before automated escalation.</p>
            </div>
          </div>
          <div className="text-right flex flex-col gap-2">
            <p className="text-[10px] font-black text-amber-800/40 uppercase tracking-widest leading-none">Intelligence Case ID</p>
            <p className="text-lg font-mono font-black text-amber-800 tracking-tighter">#AU-772-2023-GAB</p>
          </div>
        </section>

        {/* Content Split: Dossier & Moderation Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Dossier Column */}
          <div className="lg:col-span-8 space-y-12">
            {/* Immersive Gallery */}
            <div className="bg-surface-container-lowest rounded-[3rem] overflow-hidden group relative h-[500px] shadow-authoritative border border-outline-variant/10">
              <img 
                alt="Industrial Site" 
                className="w-full h-full object-cover transition-transform duration-[20s] group-hover:scale-110" 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200"
              />
              <div className="absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-black/60 to-transparent flex gap-4">
                <div className="px-6 py-3 bg-white/20 backdrop-blur-2xl rounded-full text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-3 border border-white/20 shadow-2xl">
                  <span className="material-symbols-outlined text-sm">photo_library</span>
                  1 of 12 Intelligence Imprints
                </div>
                <div className="px-6 py-3 bg-white/20 backdrop-blur-2xl rounded-full text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-3 border border-white/20 shadow-2xl">
                  <span className="material-symbols-outlined text-sm">360</span>
                  Spatial Scan Available
                </div>
              </div>
              <div className="absolute top-1/2 right-10 -translate-y-1/2">
                <button className="w-14 h-14 bg-white/90 backdrop-blur-xl rounded-full flex items-center justify-center text-on-surface shadow-2xl hover:scale-110 active:scale-90 transition-all border border-white">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>

            {/* Asset Intelligence Grid */}
            <div className="bg-surface-container-lowest p-16 rounded-[3rem] shadow-authoritative border border-outline-variant/10">
              <h2 className="text-[10px] font-black tracking-[0.3em] text-outline/30 uppercase mb-12 font-headline leading-none">Asset Intelligence Dossier</h2>
              <div className="grid grid-cols-2 gap-y-16 gap-x-20">
                <div className="flex flex-col gap-4">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-outline/50 font-black leading-none">Institutional Valuation</span>
                  <span className="text-5xl font-[900] text-primary tracking-tighter font-headline leading-none">BWP 4,250,000</span>
                </div>
                <div className="flex flex-col gap-4">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-outline/50 font-black leading-none">Geographic Hierarchy</span>
                  <span className="text-xl font-[800] text-on-surface font-headline leading-relaxed tracking-tight">Gaborone West Industrial, Phase 4</span>
                </div>
                <div className="flex flex-col gap-4">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-outline/50 font-black leading-none">Seller Entity Intelligence</span>
                  <div className="flex items-center gap-5 bg-surface-container-low px-6 py-4 rounded-3xl border border-outline-variant/5">
                    <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm border border-outline-variant/10">
                      <span className="material-symbols-outlined text-xl">corporate_fare</span>
                    </div>
                    <span className="text-[11px] font-[900] text-on-surface uppercase tracking-widest leading-none font-headline">Kalahari Logistics Group PTY</span>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-outline/50 font-black leading-none">Property Genetic Profile</span>
                  <span className="text-[11px] font-[900] text-on-surface uppercase tracking-[0.1em] flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-secondary shadow-lg shadow-secondary/20 animate-pulse"></div>
                    Light Industrial / Warehouse Intelligence
                  </span>
                </div>
              </div>

              {/* Document Registry */}
              <div className="mt-20">
                <h3 className="text-[10px] font-black tracking-[0.3em] text-outline/30 uppercase mb-8 font-headline leading-none">Verified Legal Ledger</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Certificate_of_Title_GAB772.pdf', status: 'VERIFIED', type: 'Certificate' },
                    { name: 'Valuation_Report_Oct_2023.pdf', status: 'PENDING', type: 'Valuation' },
                    { name: 'Distressed_Asset_Disclosure.pdf', status: 'VERIFIED', type: 'Legal' }
                  ].map((doc, idx) => (
                    <div key={idx} className="flex items-center justify-between p-6 rounded-3xl bg-surface-container-low/30 hover:bg-surface-container-low transition-all border border-transparent hover:border-outline-variant/10 group cursor-pointer">
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm border border-outline-variant/10 group-hover:scale-110 transition-transform">
                          <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-sm font-[800] text-on-surface font-headline">{doc.name}</span>
                          <span className="text-[9px] font-black tracking-widest text-outline/40 uppercase">{doc.type} Evidence</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className={`text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm ${
                          doc.status === 'VERIFIED' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}>{doc.status}</span>
                        <button className="w-10 h-10 rounded-full flex items-center justify-center text-outline/40 hover:bg-on-surface hover:text-white transition-all shadow-md">
                          <span className="material-symbols-outlined text-lg">visibility</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Governance Column */}
          <aside className="lg:col-span-4 flex flex-col gap-8 sticky top-28">
            <div className="bg-on-background text-white p-12 rounded-[3rem] shadow-authoritative relative overflow-hidden group">
              <div className="absolute top-4 right-4 opacity-10">
                <span className="material-symbols-outlined text-[120px]" style={{ fontVariationSettings: "'FILL' 1" }}>shield_locked</span>
              </div>
              <div className="flex items-center justify-between mb-12 relative z-10">
                <h2 className="text-[10px] font-black tracking-[0.3em] text-white/40 uppercase font-headline">Governance Protocol</h2>
                <div className="px-3 py-1 bg-primary text-white text-[8px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg">Tier 3</div>
              </div>

              {/* Verification Checklist */}
              <div className="space-y-6 mb-16 relative z-10">
                <h3 className="text-[10px] font-black tracking-widest text-white/30 uppercase font-headline">Authority Checklist</h3>
                {[
                  'Documents complete & institutional',
                  'Zero hits on national legal logs',
                  'Valuation aligns with sector velocity'
                ].map((check, i) => (
                  <label key={i} className="flex items-center gap-5 cursor-pointer group/check">
                    <div className="relative">
                      <input className="peer h-6 w-6 rounded-xl border-white/10 bg-white/5 text-primary focus:ring-primary/40 transition-all cursor-pointer opacity-0 absolute inset-0 z-10" type="checkbox" />
                      <div className="h-6 w-6 rounded-xl border-2 border-white/10 bg-white/5 flex items-center justify-center peer-checked:bg-primary peer-checked:border-primary transition-all">
                        <span className="material-symbols-outlined text-sm font-black text-white">check</span>
                      </div>
                    </div>
                    <span className="text-[13px] font-[700] text-white/60 group-hover/check:text-white transition-colors">{check}</span>
                  </label>
                ))}
              </div>

              {/* Notes Area */}
              <div className="space-y-4 mb-16 relative z-10">
                <h3 className="text-[10px] font-black tracking-widest text-white/30 uppercase font-headline">Judgement Intelligence</h3>
                <textarea 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-[13px] font-bold text-white placeholder:text-white/20 focus:ring-2 focus:ring-primary/40 resize-none min-h-[140px] italic shadow-inner" 
                  placeholder="Record administrative rationale here for legal audit..."
                ></textarea>
              </div>

              {/* Judicial Actions */}
              <div className="flex flex-col gap-4 relative z-10">
                <button className="w-full py-5 bg-primary text-white rounded-2xl font-[900] text-[10px] uppercase tracking-[0.3em] shadow-2xl shadow-primary/40 hover:scale-[1.03] active:scale-95 transition-all">
                  Approve Intelligence
                </button>
                <button className="w-full py-5 bg-white text-on-surface rounded-2xl font-[900] text-[10px] uppercase tracking-[0.3em] hover:bg-secondary hover:text-white transition-all shadow-xl">
                  Human Correction Needed
                </button>
                <button className="w-full py-4 text-error font-black text-[10px] uppercase tracking-widest hover:bg-error/10 rounded-2xl transition-all mt-4">
                  Final Asset Rejection
                </button>
              </div>
            </div>

            {/* Case History Timeline */}
            <div className="bg-surface-container-low/50 p-10 rounded-[2.5rem] border border-outline-variant/10">
              <h4 className="text-[10px] font-black tracking-widest text-outline/30 uppercase mb-8 font-headline leading-none">History Ledger</h4>
              <div className="space-y-10 pl-4 border-l-2 border-outline-variant/10">
                <div className="relative">
                  <div className="absolute -left-[27px] top-1 w-3 h-3 bg-primary rounded-full ring-4 ring-white shadow-xl"></div>
                  <p className="text-xs font-[900] text-on-surface font-headline">Submitted for Moderation</p>
                  <p className="text-[9px] font-black text-outline/40 uppercase tracking-widest mt-1.5">Today, 09:42 AM • Sarah M.</p>
                </div>
                <div className="relative opacity-30">
                  <div className="absolute -left-[27px] top-1 w-3 h-3 bg-outline rounded-full ring-4 ring-white shadow-xl"></div>
                  <p className="text-xs font-[900] text-on-surface font-headline">Initial Dossier Compiled</p>
                  <p className="text-[9px] font-black text-outline/40 uppercase tracking-widest mt-1.5">Yesterday, 04:15 PM • System v2</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Authority Footer Metric */}
      <footer className="fixed bottom-0 left-[260px] right-0 px-16 py-6 bg-surface/90 backdrop-blur-xl border-t border-outline-variant/10 flex items-center justify-between z-40">
        <div className="flex gap-12">
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-black text-outline/40 uppercase tracking-widest leading-none">Intelligence Quality Score</span>
            <span className="text-sm font-[900] text-emerald-600 tracking-tighter">92.4 / 100</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-black text-outline/40 uppercase tracking-widest leading-none">Market Velocity Alignment</span>
            <span className="text-sm font-[900] text-on-surface tracking-tighter italic">Within ±1.5% Tolerance</span>
          </div>
        </div>
        <div className="text-[9px] font-black text-outline/20 uppercase tracking-[0.3em] font-headline">
          © 2023 AUPROLIS ADMIN GEOPROTOCAL • VERIFIED v2.4.0
        </div>
      </footer>
    </AdminDashboardLayout>
  );
};

export default AdminListingReview;
