/* src/components/dashboard/seller/SellerListingRow.jsx */
import React from 'react';

const SellerListingRow = ({ listing }) => {
  if (!listing) return null;

  const {
    id,
    title,
    address,
    type,
    status,
    price,
    roi,
    views,
    leads,
    lastUpdated,
    imageUrl
  } = listing;

  const statusColors = {
    Live: 'bg-secondary/10 text-secondary',
    Pending: 'bg-tertiary/10 text-tertiary',
    Paused: 'bg-surface-container-high text-on-surface-variant',
    Draft: 'bg-primary/10 text-primary',
  };

  return (
    <tr className="group hover:bg-surface-container-low transition-all duration-200">
      <td className="px-8 py-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl overflow-hidden relative flex-shrink-0">
            <img 
              alt={title} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
              src={imageUrl || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=200'} 
            />
          </div>
          <div>
            <h4 className="font-bold text-on-surface text-base group-hover:text-primary transition-colors font-headline">
              {title}
            </h4>
            <p className="text-xs text-on-surface-variant/60 mt-0.5 font-medium">{address}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-6 text-sm font-medium text-on-surface-variant font-body">{type}</td>
      <td className="px-6 py-6">
        <span className={`px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest rounded-full ${statusColors[status] || statusColors.Draft}`}>
          {status}
        </span>
      </td>
      <td className="px-6 py-6 text-right">
        <p className="font-bold text-on-surface font-headline">{price}</p>
        {roi && <p className="text-[10px] text-secondary font-black uppercase tracking-tighter">Est. ROI {roi}</p>}
      </td>
      <td className="px-6 py-6 text-center">
        <div className="flex items-center justify-center gap-4">
          <div className="text-center">
            <p className="text-xs font-black text-on-surface leading-none">{views.toLocaleString()}</p>
            <p className="text-[9px] text-on-surface-variant uppercase tracking-tighter font-bold opacity-40">Views</p>
          </div>
          <div className="text-center">
            <p className="text-xs font-black text-primary leading-none">{leads}</p>
            <p className="text-[9px] text-on-surface-variant uppercase tracking-tighter font-bold opacity-40">Leads</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-6 text-sm text-on-surface-variant/60 font-medium">{lastUpdated}</td>
      <td className="px-8 py-6 text-right">
        <button className="text-outline hover:text-on-surface transition-all flex items-center justify-center p-2 rounded-full hover:bg-surface-container-high">
          <span className="material-symbols-outlined text-xl">more_vert</span>
        </button>
      </td>
    </tr>
  );
};

export default SellerListingRow;
