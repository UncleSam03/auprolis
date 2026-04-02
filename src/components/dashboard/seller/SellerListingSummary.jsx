/* src/components/dashboard/seller/SellerListingSummary.jsx */
import React from 'react';

const SellerListingSummary = ({ status, refCode, title, location, price, views, inquiries, imageUrl }) => {
  const statusColors = {
    Live: 'bg-secondary-container text-on-secondary-container border-secondary',
    Pending: 'bg-tertiary-container text-on-tertiary-container border-tertiary',
    Draft: 'bg-surface-container-high text-on-surface-variant border-outline-variant',
  };

  return (
    <div className={`group bg-surface-container-lowest p-4 rounded-xl flex flex-col sm:flex-row items-center gap-6 shadow-authoritative hover:shadow-lg transition-all border-l-4 ${statusColors[status] || statusColors.Draft}`}>
      <div className="w-24 min-w-24 h-24 rounded-lg overflow-hidden shrink-0">
        <img 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
          src={imageUrl} 
        />
      </div>
      <div className="flex-1 w-full text-left">
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-[9px] font-[800] px-2 py-0.5 rounded-full uppercase tracking-widest ${statusColors[status] || statusColors.Draft}`}>
            {status}
          </span>
          <span className="text-[10px] text-on-surface-variant font-medium tracking-tight opacity-40">Ref: {refCode}</span>
        </div>
        <h3 className="text-lg font-bold text-on-surface font-headline leading-tight">{title}</h3>
        <p className="text-sm text-on-surface-variant font-medium opacity-60">{location} • {price}</p>
      </div>
      <div className="flex items-center gap-6 px-8 border-none sm:border-x border-outline-variant/10 h-full py-2 w-full sm:w-auto justify-between sm:justify-start">
        <div className="text-center">
          <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 mb-1">Views</p>
          <p className={`text-xl font-[800] font-headline ${views === 0 ? 'opacity-20' : 'text-on-surface'}`}>{views.toLocaleString()}</p>
        </div>
        <div className="text-center">
          <p className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 mb-1">Inquiries</p>
          <p className={`text-xl font-[800] font-headline ${inquiries === 0 ? 'opacity-20' : 'text-on-surface'}`}>{inquiries}</p>
        </div>
      </div>
      <button className="p-3 text-outline hover:text-primary transition-colors flex items-center justify-center rounded-full hover:bg-surface-container-low">
        <span className="material-symbols-outlined text-xl">more_vert</span>
      </button>
    </div>
  );
};

export default SellerListingSummary;
