/* src/components/dashboard/SellerTopBar.jsx */
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SellerTopBar = ({ title = 'Seller Dashboard', onMenuClick }) => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 lg:left-[260px] right-0 h-16 glass-panel flex justify-between items-center px-4 lg:px-12 z-40 border-none shadow-none transition-all duration-300">
      <div className="flex items-center gap-4 lg:gap-8 flex-1">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 text-outline hover:text-primary transition-colors flex items-center justify-center rounded-full hover:bg-white/40"
        >
          <span className="material-symbols-outlined text-2xl">menu</span>
        </button>
        
        <div className="relative flex-grow max-w-md hidden md:block">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline/50 text-base">search</span>
          <input 
            className="w-full pl-12 pr-4 py-2.5 bg-surface-container-high border-none rounded-full text-xs font-medium focus:ring-2 focus:ring-primary/40 placeholder:text-outline/40 outline-none transition-all" 
            placeholder="Search your assets..." 
            type="text"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4 lg:gap-6">
        <div className="flex items-center gap-2 lg:gap-4 text-outline">
          <button className="hover:text-primary transition-colors flex items-center justify-center p-2 rounded-full hover:bg-white/40">
            <span className="material-symbols-outlined text-xl">notifications</span>
          </button>
          <button className="hover:text-primary transition-colors flex items-center justify-center p-2 rounded-full hover:bg-white/40">
            <span className="material-symbols-outlined text-xl">settings</span>
          </button>
        </div>
        
        <button 
          onClick={() => navigate('/seller/listings/new/step-1')}
          className="bg-primary text-white px-6 py-2 rounded-full font-bold text-xs shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest hidden sm:block"
        >
          + New Listing
        </button>
        
        <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-container-high cursor-pointer ml-2 hover:scale-105 transition-transform border-2 border-white/50">
          <img 
            alt="Seller Avatar" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEYf_XqSXb2oFynt7pTeGQLkFpXUBXp4G0FeEKOBWxOytl9fa6lukdNClaTq2HqV3S3QK6XdEIR2Un5jaqxSkdU1XLvT7wvrdpAYH828byp9ITltNaxRb7c3l5XORcHk_ws_yGOcAAEQFx5alK3r0u7Vp7-RoSw4XfTikcrr4oNpNEPmIyFn4vAg5tla5Hd7K9-Ts-AkFbryWukaVIvSqlrBHdMsSFmOtN1oA-eCboi0SJ26Fgm0ZPX8jZxLMwxomJSF_zWc4if47Y"
          />
        </div>
      </div>
    </header>
  );
};

export default SellerTopBar;
