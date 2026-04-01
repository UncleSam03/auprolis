/* src/components/dashboard/Sidebar.jsx */
import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ isOpen = false, closeSidebar }) => {
  const navItems = [
    { label: 'Home', icon: 'home', path: '/dashboard' },
    { label: 'Search', icon: 'search', path: '/search' },
    { label: 'Favorites', icon: 'favorite', path: '/favorites' },
    { label: 'Messages', icon: 'lock', path: '/messages' },
    { label: 'Documents', icon: 'lock', path: '/documents' },
    { label: 'Notifications', icon: 'notifications', path: '/notifications' },
    { label: 'Account', icon: 'person', path: '/account' },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 h-screen w-[260px] bg-navy flex flex-col py-10 justify-between z-50 shadow-2xl transition-transform duration-500 lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div>
        <div className="px-10 mb-12 flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-2xl font-black tracking-tighter text-white font-headline uppercase leading-none">
              AUPROLIS
            </h1>
            <p className="text-[9px] uppercase tracking-[0.25em] text-white/30 font-bold mt-2">
              Intelligence Dossier
            </p>
          </div>
          {/* Close button for mobile */}
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
              onClick={() => closeSidebar && closeSidebar()} // Close sidebar on nav on mobile
              className={({ isActive }) =>
                `flex items-center gap-4 px-10 py-4 transition-all group relative ${
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
        <div className="p-4 rounded-2xl bg-white/5 flex items-center gap-4 border border-white/5 hover:border-white/10 transition-colors cursor-default">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-xl">workspace_premium</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white text-[11px] font-black uppercase tracking-tight">Free plan</span>
            <span className="text-white/30 text-[9px] font-bold uppercase tracking-widest leading-none">Limited Tier</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
