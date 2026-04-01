/* src/pages/dashboard/DocumentsLocked.jsx */
import React from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { useNavigate } from 'react-router-dom';

const DocumentsLocked = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout title="Documents">
      <div className="relative flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        {/* Iconic Representation of Locked Feature */}
        <div className="mb-10 inline-flex items-center justify-center">
          <div className="relative">
            <div className="absolute -inset-8 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="w-24 h-24 bg-surface-container-lowest rounded-[2rem] flex items-center justify-center shadow-sm relative z-10">
              <span className="material-symbols-outlined text-5xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                description
              </span>
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary rounded-full flex items-center justify-center border-4 border-surface text-white z-20 shadow-md">
              <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'wght' 700" }}>
                lock
              </span>
            </div>
          </div>
        </div>

        {/* Lock Message Content */}
        <h3 className="font-headline text-4xl font-extrabold tracking-tight text-on-surface mb-4">
          Dossier Exports are a Pro feature.
        </h3>
        <p className="font-body text-secondary text-lg mb-10 leading-relaxed max-w-xl">
          Accessing full property deeds, structural surveys, and automated valuation reports is exclusive to our Intelligence Dossier Pro members. Download high-fidelity PDFs for your due diligence.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => navigate('/account')}
            className="bg-primary hover:bg-primary-deep transition-all text-white font-label font-bold text-sm px-10 py-4 rounded-xl tracking-wider uppercase flex items-center gap-2 group shadow-lg shadow-primary/20"
          >
            <span>Upgrade to Pro</span>
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>
          <button 
            onClick={() => navigate('/search')}
            className="bg-surface-container-highest hover:bg-surface-container-high transition-all text-on-surface font-label font-bold text-sm px-10 py-4 rounded-xl tracking-wider uppercase"
          >
            Back to Search
          </button>
        </div>

        {/* Feature Preview */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 opacity-40 grayscale pointer-events-none w-full max-w-3xl">
          <div className="bg-surface-container-low p-6 rounded-2xl flex flex-col items-start gap-3 text-left">
            <span className="material-symbols-outlined text-primary">picture_as_pdf</span>
            <span className="font-label text-xs font-bold">Bulk PDF Export</span>
          </div>
          <div className="bg-surface-container-low p-6 rounded-2xl flex flex-col items-start gap-3 text-left">
            <span className="material-symbols-outlined text-primary">history_edu</span>
            <span className="font-label text-xs font-bold">Property Deeds</span>
          </div>
          <div className="bg-surface-container-low p-6 rounded-2xl flex flex-col items-start gap-3 text-left">
            <span className="material-symbols-outlined text-primary">analytics</span>
            <span className="font-label text-xs font-bold">Valuation Reports</span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DocumentsLocked;
