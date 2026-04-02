/* src/pages/dashboard/seller/SellerNotifications.jsx */
import React from 'react';
import SellerDashboardLayout from '../../../components/dashboard/SellerDashboardLayout';

const SellerNotifications = () => {
  const alerts = [
    { title: 'New Inquiry', desc: 'Real-time alerts for prospective buyer messages on active listings.', icon: 'chat_bubble', active: true, color: 'secondary' },
    { title: 'Listing Approved', desc: 'Notification when a property clearance has been verified for public auction.', icon: 'verified', active: true, color: 'primary' },
    { title: 'Listing Rejected', desc: 'Critical updates if documentation fails compliance or title searches.', icon: 'error_outline', active: true, color: 'error' },
    { title: 'Auction Updates', desc: 'Bidding floor movements, final sale confirmations, and legal deadlines.', icon: 'gavel', active: false, color: 'tertiary' },
  ];

  return (
    <SellerDashboardLayout title="Intelligence Control">
      <div className="max-w-[1440px] mx-auto space-y-16 pb-20">
        <header className="max-w-3xl">
          <h2 className="text-6xl font-[900] font-headline tracking-tighter text-on-surface leading-[0.9] mb-6 uppercase">
            Intelligence <br/>Control
          </h2>
          <p className="text-lg text-on-surface-variant font-medium opacity-60 leading-relaxed max-w-2xl">
            Tailor your editorial stream. Configure how you receive real-time updates on distressed assets, buyer inquiries, and auction liquidations.
          </p>
        </header>

        <div className="grid grid-cols-12 gap-10">
          {/* Main Settings Section */}
          <section className="col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-[2.5rem] p-12 shadow-authoritative border border-outline-variant/10">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h3 className="text-3xl font-[800] font-headline text-on-surface leading-none tracking-tight">Event Alert System</h3>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-outline/40 mt-3">Global Trigger Preferences</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-surface-container-low flex items-center justify-center text-primary shadow-inner">
                <span className="material-symbols-outlined text-3xl">tune</span>
              </div>
            </div>

            <div className="space-y-4">
              {alerts.map((alert, idx) => (
                <div key={idx} className="group flex items-center justify-between p-8 rounded-[2rem] transition-all hover:bg-surface-container-low/50 border border-transparent hover:border-outline-variant/10">
                  <div className="flex items-center gap-8">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform ${
                      alert.color === 'secondary' ? 'bg-secondary/10 text-secondary' : 
                      alert.color === 'primary' ? 'bg-primary/10 text-primary' : 
                      alert.color === 'error' ? 'bg-error/10 text-error' : 'bg-tertiary/10 text-tertiary'
                    }`}>
                      <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: alert.active ? "'FILL' 1" : "" }}>{alert.icon}</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-[800] font-headline text-on-surface leading-none mb-2">{alert.title}</h4>
                      <p className="text-xs text-on-surface-variant font-medium opacity-60 max-w-md">{alert.desc}</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer scale-125 mr-4">
                    <input type="checkbox" defaultChecked={alert.active} className="sr-only peer" />
                    <div className="w-11 h-6 bg-surface-container-highest rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all shadow-inner"></div>
                  </label>
                </div>
              ))}
            </div>

            <div className="mt-16 pt-8 border-t border-outline-variant/10 flex justify-end gap-6">
              <button className="px-10 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant hover:bg-surface-container-low rounded-full transition-all">Restore Defaults</button>
              <button className="px-12 py-4 bg-primary text-white rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 hover:scale-[1.03] active:scale-95 transition-all">Save Preferences</button>
            </div>
          </section>

          {/* Delivery Channels Context Card */}
          <aside className="col-span-12 lg:col-span-4 space-y-10">
            <div className="bg-surface-container-low/50 rounded-[2.5rem] p-10 border border-outline-variant/5 shadow-inner">
              <h3 className="text-2xl font-[800] font-headline text-on-surface leading-none mb-8 tracking-tight">Delivery Channels</h3>
              <div className="space-y-4">
                {[
                  { label: 'Email Intelligence', icon: 'mail', status: 'Active', active: true },
                  { label: 'Push Notifications', icon: 'smartphone', status: 'Disabled', active: false },
                  { label: 'SMS Analytics', icon: 'sms', status: 'Disabled', active: false },
                ].map((channel, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-white p-5 rounded-2xl shadow-sm border border-outline-variant/5">
                    <div className="flex items-center gap-4">
                      <span className={`material-symbols-outlined text-xl ${channel.active ? 'text-primary' : 'text-outline/30'}`}>{channel.icon}</span>
                      <span className="text-[11px] font-[800] text-on-surface-variant uppercase tracking-widest leading-none">{channel.label}</span>
                    </div>
                    <span className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${channel.active ? 'bg-secondary/10 text-secondary' : 'bg-surface-container-high text-outline/30'}`}>
                      {channel.status}
                    </span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-10 py-4 bg-white text-primary border-2 border-primary/10 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-sm">
                Configure Channels
              </button>
            </div>

            <div className="bg-surface-container-lowest rounded-[2.5rem] p-10 shadow-authoritative border border-outline-variant/10">
              <h3 className="text-2xl font-[800] font-headline text-on-surface leading-none mb-8 tracking-tight">History Log</h3>
              <div className="space-y-8 pl-4 border-l-2 border-outline-variant/10">
                <div className="relative">
                  <div className="absolute -left-[25px] top-1 w-2.5 h-2.5 bg-secondary rounded-full ring-4 ring-white shadow-xl"></div>
                  <p className="text-sm font-bold text-on-surface leading-none">New Inquiry: 742 Evergreen</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-outline/40 mt-2">2 hours ago • Via Email</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[25px] top-1 w-2.5 h-2.5 bg-primary rounded-full ring-4 ring-white shadow-xl"></div>
                  <p className="text-sm font-bold text-on-surface leading-none">Listing Approved: Downtown Plaza</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-outline/40 mt-2">14 hours ago • Via Dashboard</p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Premium Upgrade Promotion */}
        <section className="bg-primary rounded-[3rem] overflow-hidden min-h-[360px] relative flex items-center p-16 shadow-2xl shadow-primary/40 group">
          <img 
            alt="Corporate Skyline" 
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30 grayscale group-hover:scale-110 transition-transform duration-[20s]" 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200"
          />
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-5xl font-[900] font-headline text-white mb-6 leading-[0.9] tracking-tighter">Premium <br/>Intelligence Tier</h2>
            <p className="text-xl text-white/70 mb-10 leading-relaxed font-medium">Unlock granular property auction tracking and instant distress-level alerts with our Premium Plan.</p>
            <button className="bg-white text-primary px-10 py-5 rounded-full font-black text-[11px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-black/20 flex items-center gap-4">
              Upgrade Strategy 
              <span className="material-symbols-outlined text-sm font-black">arrow_forward</span>
            </button>
          </div>
          
          <div className="absolute right-0 bottom-0 top-0 hidden lg:flex items-center justify-center p-16 w-1/3">
            <div className="bg-white/10 backdrop-blur-2xl rounded-[2.5rem] p-10 border border-white/20 rotate-3 shadow-2xl relative group-hover:-rotate-2 transition-transform duration-1000">
              <div className="flex gap-2 mb-4">
                {[1, 2, 3].map(i => <span key={i} className="material-symbols-outlined text-secondary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>)}
              </div>
              <p className="text-white text-lg font-bold leading-snug tracking-tight">"Auprolis saved me $240k on my last foreclosure cycle."</p>
              <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mt-6">— Principal Investment Group</p>
            </div>
          </div>
        </section>
      </div>
    </SellerDashboardLayout>
  );
};

export default SellerNotifications;
