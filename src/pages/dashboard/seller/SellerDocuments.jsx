/* src/pages/dashboard/seller/SellerDocuments.jsx */
import React from 'react';
import SellerDashboardLayout from '../../../components/dashboard/SellerDashboardLayout';

const SellerDocuments = () => {
  const documents = [
    { id: 'DOC-9921', name: 'Court Order #8821-X', type: 'PDF • 2.4 MB', listingId: 'AU-40992', date: 'Oct 24, 2023', status: 'Verified', icon: 'gavel' },
    { id: 'DOC-1029', name: 'Title Deed - Pinecrest Est.', type: 'PDF • 5.1 MB', listingId: 'AU-10294', date: 'Oct 28, 2023', status: 'Pending', icon: 'description' },
    { id: 'DOC-3382', name: 'Seller Identification - J. Doe', type: 'JPG • 1.2 MB', listingId: 'AU-40992', date: 'Nov 02, 2023', status: 'Verified', icon: 'badge' },
    { id: 'DOC-ERR', name: 'Compliance Audit Report', type: 'Missing Required File', listingId: 'AU-99021', date: '--', status: 'Missing', icon: 'report_problem' },
  ];

  const statusStyles = {
    Verified: 'bg-secondary/10 text-secondary',
    Pending: 'bg-tertiary/10 text-tertiary',
    Missing: 'bg-error/10 text-error',
  };

  return (
    <SellerDashboardLayout title="Documents Vault">
      <div className="max-w-7xl mx-auto space-y-12 pb-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-4">
          <div>
            <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2 block">Centralized Intelligence</p>
            <h2 className="text-5xl font-[800] font-headline text-on-surface tracking-tighter leading-none">Security Vault</h2>
          </div>
          <button className="flex items-center gap-3 bg-gradient-to-br from-primary to-primary-container text-white px-10 py-4 rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 hover:scale-[1.03] active:scale-95 transition-all">
            <span className="material-symbols-outlined text-lg leading-none">cloud_upload</span>
            Upload New Document
          </button>
        </div>

        {/* Bento Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-surface-container-lowest rounded-[2.5rem] p-10 flex items-start gap-8 shadow-authoritative border border-outline-variant/5 hover:scale-[1.02] transition-transform duration-500">
            <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary shadow-inner">
              <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
            </div>
            <div>
              <p className="text-[10px] font-black text-outline/40 uppercase tracking-[0.2em] mb-2">Compliance Rate</p>
              <h3 className="text-4xl font-[900] text-on-surface font-headline tracking-tighter leading-none">94%</h3>
              <p className="text-[10px] text-secondary mt-3 flex items-center gap-2 font-black uppercase tracking-widest">
                <span className="material-symbols-outlined text-xs leading-none" style={{ fontVariationSettings: "'FILL' 1" }}>trending_up</span> 
                +2% from audit
              </p>
            </div>
          </div>
          
          <div className="bg-surface-container-lowest rounded-[2.5rem] p-10 flex items-start gap-8 shadow-authoritative border border-outline-variant/5 hover:scale-[1.02] transition-transform duration-500">
            <div className="w-16 h-16 rounded-2xl bg-tertiary/10 flex items-center justify-center text-tertiary shadow-inner">
              <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>pending_actions</span>
            </div>
            <div>
              <p className="text-[10px] font-black text-outline/40 uppercase tracking-[0.2em] mb-2">Pending Reviews</p>
              <h3 className="text-4xl font-[900] text-on-surface font-headline tracking-tighter leading-none">08</h3>
              <p className="text-[10px] text-tertiary mt-3 font-black uppercase tracking-widest opacity-60">Avg. response: 4.2h</p>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-[2.5rem] p-10 flex items-start gap-8 shadow-authoritative border border-outline-variant/5 hover:scale-[1.02] transition-transform duration-500">
            <div className="w-16 h-16 rounded-2xl bg-error/10 flex items-center justify-center text-error shadow-inner">
              <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>priority_high</span>
            </div>
            <div>
              <p className="text-[10px] font-black text-outline/40 uppercase tracking-[0.2em] mb-2">Missing Files</p>
              <h3 className="text-4xl font-[900] text-on-surface font-headline tracking-tighter leading-none text-error">03</h3>
              <p className="text-[10px] text-error mt-3 font-extrabold uppercase tracking-widest underline decoration-2 underline-offset-4 cursor-pointer hover:opacity-70 transition-opacity">Action Required</p>
            </div>
          </div>
        </div>

        {/* Documents Table Section */}
        <div className="bg-surface-container-lowest rounded-[2.5rem] shadow-authoritative border border-outline-variant/10 overflow-hidden">
          {/* Filters Bar */}
          <div className="px-10 py-8 border-b border-outline-variant/10 flex justify-between items-center bg-white/50 backdrop-blur-md">
            <div className="flex gap-4">
              {['All Files', 'Legal', 'Identification', 'Property Photos'].map((filter) => (
                <button 
                  key={filter}
                  className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                    filter === 'All Files' ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'text-outline/60 hover:text-primary hover:bg-surface-container-low'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead className="bg-surface-container-low/50">
                <tr>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-outline/40">Document Name</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-outline/40">Listing ID</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-outline/40">Upload Date</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-outline/40">Status</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-outline/40 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {documents.map((doc) => (
                  <tr key={doc.id} className="group hover:bg-surface-container-low/30 transition-all duration-300">
                    <td className="px-10 py-7">
                      <div className="flex items-center gap-6">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform ${doc.status === 'Missing' ? 'bg-error/10 text-error' : 'bg-primary/5 text-primary'}`}>
                          <span className="material-symbols-outlined text-2xl">{doc.icon}</span>
                        </div>
                        <div>
                          <p className={`text-base font-[800] font-headline tracking-tight group-hover:text-primary transition-colors ${doc.status === 'Missing' ? 'text-error/80' : 'text-on-surface'}`}>{doc.name}</p>
                          <p className="text-[10px] font-black uppercase tracking-widest text-outline/40 mt-1">{doc.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-7 text-sm font-bold text-on-surface font-headline opacity-60 tracking-tight">{doc.listingId}</td>
                    <td className="px-10 py-7 text-sm font-bold text-on-surface font-headline opacity-40 tracking-tight">{doc.date}</td>
                    <td className="px-10 py-7">
                      <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm ${statusStyles[doc.status]}`}>
                        {doc.status}
                      </span>
                    </td>
                    <td className="px-10 py-7 text-right">
                      {doc.status === 'Missing' ? (
                        <button className="text-primary text-[10px] font-black uppercase tracking-widest underline decoration-2 underline-offset-4 hover:no-underline">Upload Now</button>
                      ) : (
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-3 text-outline/40 hover:text-primary hover:bg-surface-container-low transition-all rounded-xl">
                            <span className="material-symbols-outlined text-xl">download</span>
                          </button>
                          <button className="p-3 text-outline/40 hover:text-on-surface hover:bg-surface-container-low transition-all rounded-xl">
                            <span className="material-symbols-outlined text-xl">more_vert</span>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-10 py-8 bg-white/50 backdrop-blur-md flex justify-between items-center border-t border-outline-variant/10">
            <p className="text-[11px] font-bold text-outline/50 tracking-tight">Showing <span className="text-on-surface font-black">1-4</span> of 42 documents</p>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-2xl border border-outline-variant/20 flex items-center justify-center text-outline/30 hover:bg-surface-container-low transition-all">
                <span className="material-symbols-outlined text-xl">chevron_left</span>
              </button>
              <button className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center font-black text-xs shadow-lg shadow-primary/20">1</button>
              <button className="w-10 h-10 rounded-2xl border border-outline-variant/20 flex items-center justify-center text-on-surface font-bold text-xs hover:bg-surface-container-low transition-all">2</button>
              <button className="w-10 h-10 rounded-2xl border border-outline-variant/20 flex items-center justify-center text-on-surface font-bold text-xs hover:bg-surface-container-low transition-all">3</button>
              <button className="w-10 h-10 rounded-2xl border border-outline-variant/20 flex items-center justify-center text-outline/30 hover:bg-surface-container-low transition-all">
                <span className="material-symbols-outlined text-xl">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {/* Security Audit Sidebar Card (Simulation of the footer area) */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 pb-16">
          <div className="md:col-span-8 space-y-6">
            <h3 className="text-2xl font-[800] font-headline tracking-tighter text-on-surface">Recent Verifications</h3>
            <div className="space-y-4">
              <div className="bg-surface-container-low/50 rounded-3xl p-6 flex items-center justify-between border border-transparent hover:border-primary/20 hover:bg-white transition-all shadow-sm group">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-white rounded-2xl shadow-authoritative flex items-center justify-center overflow-hidden shrink-0 group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-[800] font-headline text-on-surface leading-tight mb-1">Sheriff Deed - Listing AU-1022</h4>
                    <p className="text-[10px] font-black uppercase tracking-widest text-outline/40">Verified by Agent Maria S. • 12 mins ago</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-secondary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              </div>
            </div>
          </div>
          <div className="md:col-span-4 self-start">
            <div className="bg-on-background rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl transition-all hover:scale-[1.02] duration-500">
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-secondary mb-8 shadow-inner">
                  <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
                </div>
                <h4 className="text-2xl font-[800] font-headline tracking-tighter leading-tight mb-4">Vault Security Insight</h4>
                <p className="text-white/60 text-sm font-medium leading-relaxed mb-10">
                  Your documents are encrypted with AES-256 standard. Last security audit was performed <span className="text-white font-black uppercase tracking-widest text-[10px] ml-1 bg-white/10 px-2 py-1 rounded">Today, 08:00 AM</span>.
                </p>
                <button className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all border border-white/10 shadow-xl">
                  View Audit Log
                </button>
              </div>
              {/* background decorative light */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/20 blur-[80px] rounded-full"></div>
            </div>
          </div>
        </section>
      </div>
    </SellerDashboardLayout>
  );
};

export default SellerDocuments;
