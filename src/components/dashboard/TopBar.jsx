/* src/components/dashboard/TopBar.jsx */
import React from 'react';

const TopBar = ({ title = 'Dossier Explorer', onMenuClick }) => {
  return (
    <header className="fixed top-0 left-0 lg:left-[260px] right-0 h-20 glass-panel flex justify-between items-center px-4 lg:px-12 z-40 border-none shadow-none transition-all duration-300">
      <div className="flex items-center gap-4 lg:gap-8 flex-1">
        {/* Menu Toggle for Mobile */}
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 text-outline hover:text-primary transition-colors flex items-center justify-center rounded-full hover:bg-white/40"
        >
          <span className="material-symbols-outlined text-2xl">menu</span>
        </button>
        
        <h2 className="font-headline text-lg lg:text-xl font-extrabold tracking-tight text-on-surface leading-none whitespace-nowrap overflow-hidden text-ellipsis">
          {title}
        </h2>
        
        {/* Search Bar - Hidden or adjusted on small screens */}
        <div className="relative flex-grow max-w-sm hidden md:block">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline/50 text-base">search</span>
          <input 
            className="w-full pl-12 pr-4 py-2.5 bg-surface-container-lowest border-none rounded-xl text-xs font-medium focus:ring-2 focus:ring-primary/40 placeholder:text-outline/40 outline-none transition-all" 
            placeholder="Search repossessed assets..." 
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-2 lg:gap-6">
        <button className="hidden sm:flex text-outline hover:text-primary transition-colors items-center justify-center p-2 rounded-full hover:bg-white/40">
          <span className="material-symbols-outlined text-xl">help_outline</span>
        </button>
        <button className="text-outline hover:text-primary transition-colors flex items-center justify-center p-2 rounded-full hover:bg-white/40">
          <span className="material-symbols-outlined text-xl text-on-surface/60">settings</span>
        </button>
        <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full overflow-hidden border-2 border-white shadow-sm cursor-pointer ml-2 hover:scale-105 transition-transform">
          <img 
            alt="User Avatar" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZe3zoOe83CSaoWnefQZJGYfM0EhWFIaUc17l7n5js4zGVwUNBfl0HeKbHHchkzCMGVpZWAfDmMAcosMW-_wf3lJaaKwvzCKxVhGj-PBYALFAy484uLMocnpGhGpPDwdUdlTDRVFqSqC5v2Pa3FJm13XK9hoWHGKrVnvgTzwjD0PoIIR0j99SI-v1PRRe0RolzmuMnZ3S7POoAyn9NBzqdHdvZBs84PrOVEbqWYzjoyk2vzXbCg7abKc7wvp5Du6I5j6-l2l_VF0I"
          />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
