/* src/components/dashboard/SellerDashboardLayout.jsx */
import React, { useState } from 'react';
import SellerSidebar from './SellerSidebar';
import SellerTopBar from './SellerTopBar';

const SellerDashboardLayout = ({ children, title }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-surface selection:bg-primary/20">
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-navy/60 backdrop-blur-sm z-[45] lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Seller Sidebar - Responsive Off-canvas */}
      <SellerSidebar isOpen={isSidebarOpen} closeSidebar={() => setSidebarOpen(false)} />

      <div className="lg:ml-[260px] transition-all duration-300">
        <SellerTopBar title={title} onMenuClick={toggleSidebar} />
        <main className="pt-24 pb-16 px-6 lg:px-16 min-h-screen space-y-12 bg-surface">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl font-[800] tracking-tight text-on-surface mb-2 font-headline leading-none">
                {title}
              </h1>
              <p className="text-on-surface-variant font-medium text-sm">
                Manage listings and track performance across your portfolio.
              </p>
            </div>
            {/* Removed buttons */}
          </header>
          
          <div className="max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SellerDashboardLayout;
