/* src/pages/dashboard/seller/SellerInquiries.jsx */
import React from 'react';
import SellerDashboardLayout from '../../../components/dashboard/SellerDashboardLayout';

const SellerInquiries = () => {
  const inquiries = [
    { id: 1, name: 'Julianne DeMarco', initial: 'JD', time: '12:45 PM', ref: 'Ref: 422 West Oak St.', message: "I'd like to schedule a viewing for the property this Thursday if possible...", new: true, active: true },
    { id: 2, name: 'Marcus Knight', initial: 'MK', time: 'Yesterday', ref: 'Ref: 12-B Skyline Tower', message: 'Are the foreclosure documents verified by the county clerk yet?', new: false },
    { id: 3, name: 'Sarah Lindt', initial: 'SL', time: 'Oct 24', ref: 'Ref: Ridge View Estate', message: 'Thank you for the quick response. We are reviewing the equity analysis...', new: false },
    { id: 4, name: 'Thomas Henderson', initial: 'TH', time: 'Oct 23', ref: 'Ref: Multiple Listings', message: 'Sending over the proof of funds for the upcoming auction batch.', new: false },
  ];

  return (
    <SellerDashboardLayout title="Inquiries & Leads">
      <div className="flex bg-surface-container-low rounded-[2rem] overflow-hidden h-[calc(100vh-180px)] shadow-authoritative border border-outline-variant/10">
        {/* Left Pane: Inbox List */}
        <div className="w-full md:w-[400px] bg-white border-r border-outline-variant/10 flex flex-col pt-10">
          <div className="px-8 mb-8 flex items-center justify-between">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-outline/50">Recent Intelligence</h3>
            <span className="bg-primary/10 text-primary text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">12 New</span>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar px-4 space-y-4 pb-12">
            {inquiries.map((inquiry) => (
              <div 
                key={inquiry.id} 
                className={`p-6 rounded-3xl flex gap-5 cursor-pointer relative transition-all duration-300 group ${
                  inquiry.active 
                    ? 'bg-surface-container-lowest shadow-authoritative ring-4 ring-primary/5' 
                    : 'bg-transparent hover:bg-surface-container-low/50'
                }`}
              >
                {inquiry.active && (
                  <div className="absolute left-1 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-primary rounded-full shadow-[0_0_10px_var(--primary)]"></div>
                )}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xs shrink-0 shadow-inner group-hover:scale-105 transition-transform ${
                  inquiry.id % 2 === 0 ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'
                }`}>
                  {inquiry.initial}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-[800] text-on-surface truncate font-headline text-sm tracking-tight">{inquiry.name}</h4>
                    <span className="text-[9px] font-black text-outline/30 uppercase tracking-widest">{inquiry.time}</span>
                  </div>
                  <p className="text-[10px] font-black text-primary mb-1 uppercase tracking-widest opacity-80">{inquiry.ref}</p>
                  <p className="text-xs text-on-surface-variant truncate font-medium opacity-60 leading-relaxed">{inquiry.message}</p>
                </div>
                {inquiry.new && (
                  <div className="w-2.5 h-2.5 bg-primary rounded-full mt-2 shrink-0 animate-pulse shadow-[0_0_8px_var(--primary)]"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Middle Pane: Thread View */}
        <div className="flex-1 hidden md:flex flex-col bg-surface-container-lowest relative overflow-hidden">
          {/* Thread Header */}
          <div className="px-10 py-8 flex items-center justify-between border-b border-outline-variant/10 bg-white/50 backdrop-blur-md">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black text-sm">JD</div>
              <div>
                <h3 className="font-[800] text-xl leading-none text-on-surface font-headline tracking-tighter">Julianne DeMarco</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-outline/40 mt-2">
                  Inquiry Ref: <span className="text-primary opacity-100">422 West Oak St.</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-3 text-outline/40 hover:text-primary transition-all rounded-2xl hover:bg-surface-container-low">
                <span className="material-symbols-outlined text-xl">archive</span>
              </button>
              <button className="p-3 text-outline/40 hover:text-red-500 transition-all rounded-2xl hover:bg-red-50">
                <span className="material-symbols-outlined text-xl">delete</span>
              </button>
            </div>
          </div>

          {/* Messages Canvas */}
          <div className="flex-1 overflow-y-auto p-10 flex flex-col gap-10 custom-scrollbar bg-surface-container-lowest">
            <div className="flex gap-5 max-w-[85%] group">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 shrink-0 flex items-center justify-center text-[10px] font-black text-primary">JD</div>
              <div>
                <div className="bg-surface-container-low/50 p-6 rounded-3xl rounded-tl-none border border-outline-variant/5 group-hover:bg-white transition-all shadow-sm">
                  <p className="text-sm text-on-surface leading-loose font-medium opacity-80">
                    Hello, I've been tracking the pre-foreclosure status of the property at 422 West Oak St. through the sheriff's office portal. I noticed Auprolis has the primary listing. I'd like to schedule a viewing for this Thursday if possible. Also, do you have the most recent title report available for review?
                  </p>
                </div>
                <span className="text-[10px] font-black text-outline/30 mt-3 block ml-1 uppercase tracking-widest">12:45 PM • Oct 30</span>
              </div>
            </div>

            <div className="flex gap-5 max-w-[85%] ml-auto flex-row-reverse group">
              <div className="w-10 h-10 rounded-2xl bg-on-background shrink-0 flex items-center justify-center text-[10px] font-black text-white">AU</div>
              <div className="text-right">
                <div className="bg-primary p-6 rounded-3xl rounded-tr-none text-white shadow-2xl shadow-primary/20 group-hover:scale-[1.01] transition-transform">
                  <p className="text-sm leading-loose font-medium">
                    Hi Julianne, thanks for reaching out. Thursday works perfectly for a viewing. We have slots available at 10:00 AM and 2:30 PM. I'll attach the preliminary title report to this thread as well.
                  </p>
                </div>
                <div className="flex items-center justify-end gap-2 mt-3">
                  <span className="text-[10px] font-black text-outline/30 uppercase tracking-widest">12:58 PM</span>
                  <span className="material-symbols-outlined text-sm text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center my-6">
              <div className="bg-tertiary/10 px-6 py-2.5 rounded-full flex items-center gap-3 border border-tertiary/10 shadow-sm animate-pulse">
                <span className="material-symbols-outlined text-sm text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                <span className="text-[9px] font-black text-tertiary uppercase tracking-widest">Upgrade to Pro for real-time lead analytics</span>
              </div>
            </div>
          </div>

          {/* Input Footer */}
          <div className="p-8 bg-white border-t border-outline-variant/10">
            <div className="bg-surface-container-low rounded-3xl p-3 focus-within:ring-4 focus-within:ring-primary/5 transition-all group overflow-hidden border border-outline-variant/5">
              <textarea 
                className="w-full border-none focus:ring-0 text-sm p-4 resize-none bg-transparent font-medium text-on-surface placeholder:text-outline/30" 
                placeholder="Type your strategic response here..." 
                rows="3"
              ></textarea>
              <div className="flex items-center justify-between px-4 pb-3">
                <div className="flex items-center gap-3 opacity-40 group-focus-within:opacity-100 transition-opacity">
                  <button className="p-2 text-outline hover:text-primary transition-all"><span className="material-symbols-outlined text-xl">attach_file</span></button>
                  <button className="p-2 text-outline hover:text-primary transition-all"><span className="material-symbols-outlined text-xl">description</span></button>
                </div>
                <button className="bg-primary px-10 py-3 rounded-full text-white font-[800] text-[10px] uppercase tracking-[0.2em] flex items-center gap-3 hover:shadow-2xl hover:shadow-primary/30 transition-all active:scale-95">
                  Send Response
                  <span className="material-symbols-outlined text-sm">send</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Pane: Context Sidebar (Desktop Only) */}
        <div className="w-[320px] hidden lg:flex flex-col bg-surface-container-low/50 p-8 gap-8 border-l border-outline-variant/10 overflow-y-auto">
          <div className="bg-white p-6 rounded-3xl shadow-authoritative border border-outline-variant/10">
            <h5 className="text-[9px] font-black text-outline/40 uppercase tracking-[0.2em] mb-6">Property Context</h5>
            <div className="rounded-2xl overflow-hidden mb-6 h-36 relative shadow-inner group">
              <img 
                alt="Property" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=300"
              />
              <div className="absolute top-3 right-3 bg-secondary text-white text-[8px] font-black px-3 py-1 rounded-full shadow-lg">ACTIVE</div>
            </div>
            <h3 className="font-[800] text-on-surface text-lg font-headline tracking-tight leading-none mb-2">422 West Oak St.</h3>
            <p className="text-[10px] font-black uppercase tracking-widest text-outline/40 mb-8">Oak Haven, Sector 4</p>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-on-surface-variant font-medium opacity-60">Listing Price</span>
                <span className="font-[900] text-primary tracking-tighter">$412,000</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-on-surface-variant font-medium opacity-60">Potential Equity</span>
                <span className="font-[900] text-secondary tracking-tighter">+$114k</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-authoritative border border-outline-variant/10">
            <h5 className="text-[9px] font-black text-outline/40 uppercase tracking-[0.2em] mb-6">Lead Intelligence</h5>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary shadow-inner">
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
              </div>
              <div>
                <p className="text-[9px] font-black text-secondary uppercase tracking-widest">Verified Investor</p>
                <p className="text-xs font-[800] text-on-surface font-headline leading-tight mt-1">High Intent Score</p>
              </div>
            </div>
            <div className="p-5 bg-surface-container-low rounded-2xl border border-outline-variant/5">
              <div className="flex items-center gap-3 mb-3">
                <span className="material-symbols-outlined text-lg text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>history</span>
                <span className="text-[9px] font-black text-on-surface-variant uppercase tracking-[0.2em]">Activity</span>
              </div>
              <p className="text-[11px] text-on-surface-variant leading-relaxed font-medium opacity-70 italic tracking-tight">
                Viewed 4 foreclosure listings in Sector 4 over the last 48 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SellerDashboardLayout>
  );
};

export default SellerInquiries;
