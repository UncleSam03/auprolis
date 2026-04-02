/* src/components/dashboard/seller/KPIBlock.jsx */
import React from 'react';

const KPIBlock = ({ label, value, trend, icon, color = 'primary' }) => {
  const colorMap = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    tertiary: 'bg-tertiary/10 text-tertiary',
    error: 'bg-error/10 text-error',
  };

  const trendColor = trend?.includes('+') ? 'text-secondary bg-secondary/10' : 
                     trend === 'Steady' ? 'text-secondary bg-secondary/10' : 
                     'text-tertiary bg-tertiary/10';

  return (
    <div className="bg-surface-container-lowest p-6 rounded-xl shadow-authoritative flex flex-col justify-between hover:scale-[1.02] transition-all cursor-default group overflow-hidden relative">
      <div className="flex justify-between items-start mb-6">
        <div className={`p-2.5 rounded-lg transition-transform group-hover:scale-110 ${colorMap[color] || colorMap.primary}`}>
          <span className="material-symbols-outlined text-[20px]">{icon}</span>
        </div>
        {trend && (
          <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full ${trendColor}`}>
            {trend}
          </span>
        )}
      </div>
      <div>
        <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.1em] mb-2 font-headline opacity-60">
          {label}
        </p>
        <p className="text-3xl font-[800] tracking-tight text-on-surface font-headline leading-none">
          {value}
        </p>
      </div>
      <div className="absolute -bottom-2 -right-2 opacity-5 scale-150 rotate-12 group-hover:scale-[2] transition-transform pointer-events-none">
        <span className="material-symbols-outlined text-6xl">{icon}</span>
      </div>
    </div>
  );
};

export default KPIBlock;
