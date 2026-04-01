/* src/components/dashboard/EmptyState.jsx */
import React from 'react';

const EmptyState = ({ 
  title = 'Nothing listed yet', 
  message = 'Property data will appear here once listings are added to the system.',
  icon = 'database' 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-surface-container-low rounded-xl text-center border-none shadow-none">
      <div className="w-16 h-16 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary/30 mb-6 shadow-sm border border-outline-variant/10">
        <span className="material-symbols-outlined text-4xl">{icon}</span>
      </div>
      <h3 className="font-headline text-xl font-extrabold text-on-surface mb-2 tracking-tighter">{title}</h3>
      <p className="text-secondary text-sm max-w-sm mx-auto font-medium opacity-80">{message}</p>
    </div>
  );
};

export default EmptyState;
