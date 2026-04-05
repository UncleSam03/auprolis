/* src/components/dashboard/SellerSidebar.jsx */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const SellerSidebar = ({ isOpen = false, closeSidebar }) => {
  const { signOut } = useAuth();
  const navItems = [
    { label: 'Dashboard', icon: 'dashboard', path: '/seller' },
    { label: 'Dossiers', icon: 'folder_open', path: '/seller/listings' },
    { label: 'Intelligence', icon: 'psychology', path: '/seller/performance' },
    { label: 'Documents', icon: 'description', path: '/seller/documents' },
    { label: 'Notifications', icon: 'notifications', path: '/seller/notifications' },
    { label: 'Account', icon: 'person', path: '/seller/account' },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 h-screen w-[260px] bg-navy flex flex-col py-10 justify-between z-50 shadow-2xl transition-transform duration-500 lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="px-10 mb-12 flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-2xl font-black tracking-tighter text-white font-headline uppercase leading-none">
              AUPROLIS
            </h1>
            <p className="text-[10px] uppercase tracking-[0.25em] text-primary font-bold mt-2 font-headline">
                Sovereign Curator
            </p>
          </div>
          <button 
            onClick={closeSidebar}
            className="lg:hidden p-2 text-white/60 hover:text-white hover:bg-white/5 rounded-full"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <nav className="space-y-px flex-1 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              onClick={() => closeSidebar && closeSidebar()}
              className={({ isActive }) =>
                `flex items-center gap-4 px-10 py-4 transition-all group relative ${
                  isActive
                    ? 'bg-primary/20 text-primary'
                    : 'text-white/60 hover:text-white/90 hover:bg-white/10'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span 
                    className="material-symbols-outlined text-[22px]" 
                    style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    {item.icon}
                  </span>
                  <span className={`font-label text-xs tracking-[0.05em] uppercase ${isActive ? 'font-black' : 'font-bold'}`}>
                    {item.label}
                  </span>
                  {isActive && (
                    <div className="absolute right-0 top-[25%] bottom-[25%] w-1.5 bg-primary rounded-l-full shadow-[0_0_20px_var(--primary)]" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
        
        <div className="px-6 space-y-6">
          <button 
            onClick={signOut}
            className="w-full flex items-center gap-4 px-5 py-4 text-white/30 hover:text-destructive hover:bg-destructive/5 rounded-2xl transition-all group font-label text-xs font-black uppercase tracking-widest"
          >
            <span className="material-symbols-outlined text-[22px] group-hover:translate-x-1 transition-transform">logout</span>
            Sign Out
          </button>

          <div className="p-5 rounded-3xl bg-white/5 flex items-center gap-5 border border-white/5 shadow-inner cursor-default">
            <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary shadow-xl">
              <span className="material-symbols-outlined text-2xl">verified</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white text-[11px] font-black uppercase tracking-wider">Pro Intelligence</span>
              <span className="text-white/30 text-[9px] font-bold uppercase tracking-widest leading-none mt-1">Verified Tier</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SellerSidebar;
