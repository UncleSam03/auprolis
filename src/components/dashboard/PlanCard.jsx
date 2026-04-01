/* src/components/dashboard/PlanCard.jsx */
import React from 'react';

const PlanCard = ({ plan }) => {
  if (!plan) return null;

  const {
    name,
    description,
    price,
    features,
    isRecommended = false,
    buttonText = 'Choose Plan',
    onSelect
  } = plan;

  const isPro = name.toLowerCase().includes('pro');

  return (
    <div 
      className={`p-8 rounded-xl shadow-sm flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${
        isPro 
          ? 'bg-[#FFF9F2] ring-1 ring-tertiary/10 scale-[1.02]' 
          : 'bg-surface-container-lowest'
      }`}
    >
      {isRecommended && (
        <div className="absolute top-4 right-[-40px] bg-tertiary text-white px-12 py-1 rotate-45 text-[10px] font-black uppercase tracking-widest">
          Recommended
        </div>
      )}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <h3 className={`font-headline text-2xl font-extrabold ${isPro ? 'text-on-tertiary-fixed-variant' : 'text-on-surface'}`}>
            {name}
          </h3>
          {isPro && <span className="material-symbols-outlined text-tertiary">bolt</span>}
        </div>
        <p className={`text-sm mb-6 ${isPro ? 'text-on-tertiary-fixed-variant/70' : 'text-secondary'}`}>
          {description}
        </p>
        <div className="flex items-baseline gap-1 mb-8">
          <span className={`text-4xl font-headline font-extrabold ${isPro ? 'text-on-tertiary-fixed-variant' : 'text-on-surface'}`}>
            ${price}
          </span>
          <span className={`font-medium ${isPro ? 'text-on-tertiary-fixed-variant/40' : 'text-outline'}`}>/mo</span>
        </div>
        <ul className={`space-y-4 mb-10 ${isPro ? 'grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4' : ''}`}>
          {features.map((feature, idx) => (
            <li 
              key={idx} 
              className={`flex items-center gap-3 text-sm font-medium ${
                feature.included 
                  ? (isPro ? 'text-on-tertiary-fixed-variant' : 'text-secondary') 
                  : (isPro ? 'text-on-tertiary-fixed-variant/40' : 'text-secondary/40')
              }`}
            >
              <span className={`material-symbols-outlined text-lg ${
                feature.included ? (isPro ? 'text-tertiary' : 'text-primary') : 'text-outline/30'
              }`}>
                {feature.included ? 'check_circle' : 'block'}
              </span> 
              {feature.text}
            </li>
          ))}
        </ul>
      </div>
      <button 
        onClick={onSelect}
        className={`w-full py-4 text-white font-headline text-xs font-black uppercase tracking-widest rounded-xl transition-all duration-300 ${
          isPro 
            ? 'bg-primary hover:bg-primary-deep shadow-lg shadow-primary/20 hover:scale-[1.02]' 
            : 'bg-[#4B6BFB] hover:bg-primary'
        }`}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default PlanCard;
