/* src/components/dashboard/SellerSidebar.jsx */
import React from 'react';
import { NavLink } from 'react-router-dom';

const SellerSidebar = ({ isOpen = false, closeSidebar }) => {
  const navItems = [
    { label: 'Dashboard', icon: 'home', path: '/seller' },
    { label: 'My Listings', icon: 'list_alt', path: '/seller/listings' },
    { label: 'New Listing', icon: 'add_box', path: '/seller/listings/new/step-1' },
    { label: 'Performance', icon: 'trending_up', path: '/seller/performance' },
    { label: 'Documents', icon: 'description', path: '/seller/documents' },
    { label: 'Notifications', icon: 'notifications', path: '/seller/notifications' },
    { label: 'Account', icon: 'account_circle', path: '/seller/account' },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 h-screen w-[260px] bg-navy-dark flex flex-col py-10 justify-between z-50 shadow-2xl transition-transform duration-500 lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div>
        <div className="px-10 mb-12 flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-2xl font-black tracking-tighter text-white font-headline uppercase leading-none">
              AUPROLIS
            </h1>
            <p className="text-[9px] uppercase tracking-[0.25em] text-white/30 font-bold mt-2 font-headline">
              Seller Dashboard
            </p>
          </div>
          <button 
            onClick={closeSidebar}
            className="lg:hidden p-2 text-white/60 hover:text-white hover:bg-white/5 rounded-full"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <nav className="space-y-px">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              onClick={() => closeSidebar && closeSidebar()}
              className={({ isActive }) =>
                `flex items-center gap-4 px-10 py-3.5 transition-all group relative ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-white/60 hover:text-white/90 hover:bg-white/5'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span 
                    className="material-symbols-outlined text-[20px]" 
                    style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    {item.icon}
                  </span>
                  <span className={`font-label text-xs tracking-wide ${isActive ? 'font-bold' : 'font-medium'}`}>
                    {item.label}
                  </span>
                  {isActive && (
                    <div className="absolute right-0 top-[20%] bottom-[20%] w-1 bg-primary rounded-l-full shadow-[0_0_15px_var(--primary)]" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="px-8 mb-4">
        <div className="p-4 rounded-2xl bg-white/5 flex items-center gap-4 border border-white/5 hover:border-white/10 transition-colors cursor-default group">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-primary text-xl">stars</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white text-[11px] font-black uppercase tracking-tight">Seller Plan</span>
            <span className="text-white/30 text-[9px] font-bold uppercase tracking-widest leading-none mt-0.5">Premium Member</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SellerSidebar;
