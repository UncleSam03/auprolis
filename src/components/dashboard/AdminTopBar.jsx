/* src/components/dashboard/AdminTopBar.jsx */
import React from 'react';

const AdminTopBar = ({ title, onMenuClick }) => {
  return (
    <header className="fixed top-0 right-0 w-full lg:w-[calc(100%-260px)] h-20 bg-surface/80 backdrop-blur-2xl flex items-center justify-between px-6 lg:px-10 z-40 border-b border-outline-variant/10">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 text-on-surface-variant hover:bg-surface-container-low rounded-xl transition-all"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="hidden sm:flex items-center bg-surface-container-low px-5 py-2.5 rounded-full w-96 group focus-within:ring-2 focus-within:ring-primary/20 transition-all border border-transparent focus-within:border-primary/20">
          <span className="material-symbols-outlined text-outline/40 group-hover:text-primary transition-colors text-xl">search</span>
          <input 
            className="bg-transparent border-none focus:ring-0 text-sm w-full ml-3 text-on-surface font-medium placeholder:text-outline/30 placeholder:italic" 
            placeholder="Search across all intelligence..." 
            type="text" 
          />
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="hidden md:flex flex-col text-right">
          <p className="text-sm font-black text-on-surface font-headline leading-none uppercase tracking-tighter">System Console</p>
          <p className="text-[10px] text-primary/60 font-black uppercase tracking-widest mt-1">Verified Authority</p>
        </div>
        
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-primary-container/10 flex items-center justify-center text-primary font-black shadow-inner border border-primary/10 group-hover:bg-primary group-hover:text-white transition-all">
              A
            </div>
          </div>
          <button className="hidden sm:flex items-center gap-2 px-6 py-2.5 bg-surface-container-high rounded-full text-on-surface font-black text-[10px] uppercase tracking-widest hover:bg-on-surface hover:text-white transition-all">
            <span className="material-symbols-outlined text-sm">logout</span>
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminTopBar;
