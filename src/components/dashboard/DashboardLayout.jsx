/* src/components/dashboard/DashboardLayout.jsx */
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const DashboardLayout = ({ children, title }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-surface">
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-navy/60 backdrop-blur-sm z-[45] lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Responsive */}
      <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setSidebarOpen(false)} />

      <div className="lg:ml-[260px] transition-all duration-300">
        <TopBar title={title} onMenuClick={toggleSidebar} />
        <main className="pt-20 p-6 lg:p-12 min-h-screen bg-surface">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
