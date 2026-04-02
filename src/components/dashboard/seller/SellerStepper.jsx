/* src/components/dashboard/seller/SellerStepper.jsx */
import React from 'react';

const SellerStepper = ({ currentStep, totalSteps = 4 }) => {
  const steps = [
    { number: 1, label: 'Basics' },
    { number: 2, label: 'Details' },
    { number: 3, label: 'Media' },
    { number: 4, label: 'Review' },
  ];

  return (
    <div className="flex items-center gap-10 mb-12">
      {steps.map((step, idx) => (
        <div key={idx} className="flex items-center gap-4 group">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs tracking-widest transition-all ${
            currentStep === step.number 
              ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-110' 
              : currentStep > step.number 
                ? 'bg-secondary text-white' 
                : 'bg-surface-container-high text-on-surface-variant opacity-40'
          }`}>
            {currentStep > step.number ? (
              <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'wght' 700" }}>check</span>
            ) : (
              step.number
            )}
          </div>
          <div className="flex flex-col">
            <span className={`text-[10px] font-black uppercase tracking-[0.2em] leading-none ${
              currentStep === step.number ? 'text-on-surface' : 'text-on-surface-variant opacity-30'
            }`}>
              {step.label}
            </span>
          </div>
          {idx < steps.length - 1 && (
            <div className="w-16 h-px bg-outline-variant/30 hidden lg:block" />
          )}
        </div>
      ))}
    </div>
  );
};

export default SellerStepper;
