/* src/components/dashboard/AdminDashboardLayout.jsx */
import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminTopBar from './AdminTopBar';

const AdminDashboardLayout = ({ children, title, subtitle = "System control and platform moderation." }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-surface selection:bg-primary/20">
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-[#0F1F3D]/60 backdrop-blur-sm z-[45] lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Admin Sidebar */}
      <AdminSidebar isOpen={isSidebarOpen} closeSidebar={() => setSidebarOpen(false)} />

      <div className="lg:ml-[260px] transition-all duration-300">
        <AdminTopBar title={title} onMenuClick={toggleSidebar} />
        
        <main className="pt-24 pb-16 px-6 lg:px-16 min-h-screen space-y-12 bg-surface">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 py-10 max-w-[1600px] mx-auto border-b border-outline-variant/10">
            <div className="space-y-3">
              <span className="text-[10px] font-black tracking-[0.25em] text-primary uppercase mb-2 block font-headline">Authority Console</span>
              <h1 className="text-5xl font-[900] tracking-tighter text-on-surface font-headline leading-[0.9]">
                {title}
              </h1>
              <p className="text-on-surface-variant font-medium text-lg leading-relaxed max-w-2xl">
                {subtitle}
              </p>
            </div>
            

          </header>
          
          <div className="max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
