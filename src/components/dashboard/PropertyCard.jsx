/* src/components/dashboard/PropertyCard.jsx */
import React from 'react';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property }) => {
  if (!property) return null;

  const {
    id = '#',
    title = 'Unit Title',
    price = '0',
    location = 'Location',
    district = 'District',
    assetId = 'AU-XXXX',
    imageUrl = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800',
    status = []
  } = property;

  return (
    <div className="bg-surface-container-lowest rounded-xl overflow-hidden group hover:shadow-ambient transition-all cursor-pointer">
      <div className="h-48 relative overflow-hidden">
        <img 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          src={imageUrl} 
        />
        <div className="absolute top-4 left-4 flex gap-2">
          {status.map((s, idx) => (
            <span 
              key={idx}
              className={`px-2 py-1 text-white text-[9px] font-black uppercase tracking-widest rounded-md ${
                s === 'Repossessed' ? 'bg-tertiary-container' : 'bg-navy'
              }`}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-headline font-extrabold text-lg leading-tight tracking-tighter text-on-surface">
            {title}
          </h4>
          <p className="font-headline font-extrabold text-primary">
            {price}
          </p>
        </div>
        <p className="text-xs text-outline font-medium mb-4 flex items-center gap-1">
          <span className="material-symbols-outlined text-xs">location_on</span>
          {location} • {district}
        </p>
        <div className="flex items-center justify-between pt-4 border-t border-outline/5">
          <span className="text-[10px] font-bold text-outline uppercase tracking-wider">
            Asset ID: {assetId}
          </span>
          <Link 
            to={`/property/${id}`}
            className="text-primary font-black text-[10px] uppercase tracking-widest hover:underline"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
