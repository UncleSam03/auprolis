/* src/components/dashboard/AdminSidebar.jsx */
import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminSidebar = ({ isOpen = false, closeSidebar }) => {
  const navItems = [
    { label: 'Overview', icon: 'dashboard', path: '/admin' },
    { label: 'Listings', icon: 'list_alt', path: '/admin/listings' },
    { label: 'Users', icon: 'group', path: '/admin/users' },
    { label: 'Agents / Institutions', icon: 'account_balance', path: '/admin/institutions' },
    { label: 'Audit Log', icon: 'history_edu', path: '/admin/audit' },
    { label: 'Reports', icon: 'assessment', path: '/admin/reports' },
    { label: 'Notifications', icon: 'notifications', path: '/admin/notifications' },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 h-screen w-[260px] bg-[#0F1F3D] flex flex-col py-10 justify-between z-50 shadow-2xl transition-transform duration-500 lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div>
        <div className="px-10 mb-12 flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-2xl font-black tracking-tighter text-white font-headline uppercase leading-none">
              AUPROLIS
            </h1>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#4B6BFB] font-bold mt-2 font-headline">
              Admin Console
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
                    ? 'bg-[#4B6BFB]/15 text-[#4B6BFB] border-r-4 border-[#4B6BFB]'
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
                  <span className={`font-label text-[10px] tracking-widest uppercase font-bold ${isActive ? '' : 'opacity-80'}`}>
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="px-8 mt-auto">
        <div className="p-5 rounded-2xl bg-white/5 flex items-center gap-4 border border-white/5 hover:border-white/10 transition-colors cursor-default group">
          <div className="w-10 h-10 rounded-xl bg-[#4B6BFB]/20 flex items-center justify-center text-[#4B6BFB] group-hover:scale-110 transition-transform shadow-inner">
            <span className="material-symbols-outlined text-xl">admin_panel_settings</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white text-[11px] font-black uppercase tracking-tight">Superadmin</span>
            <span className="text-white/30 text-[9px] font-bold uppercase tracking-widest leading-none mt-0.5">Console Active</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
