import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AdditionalFeatures from '@/components/AdditionalFeatures';
import FeaturedProperties from '@/components/FeaturedProperties';
import HowItWorks from '@/components/HowItWorks';
import WhyChooseAuprolis from '@/components/WhyChooseAuprolis';
import Pricing from '@/components/Pricing';
import PricingComparison from '@/components/PricingComparison';
import Footer from '@/components/Footer';
import { debugPropertyData } from '@/utils/debugPropertyData';
import { AlertTriangle } from 'lucide-react';

const DebugSection = () => {
  const [report, setReport] = useState(null);
  const isDev = import.meta.env.DEV;

  useEffect(() => {
    if (isDev) {
      debugPropertyData().then(setReport);
    }
  }, [isDev]);

  if (!isDev || !report) return null;

  return (
    <div className="bg-slate-900 text-white p-4 text-xs font-mono overflow-auto max-h-60 border-b border-yellow-500">
      <h3 className="text-yellow-400 font-bold mb-2 flex items-center gap-2">
        <AlertTriangle className="w-4 h-4" /> Debug Mode: Data Diagnostic
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p>Connection: {report.connection ? <span className="text-green-400">OK</span> : <span className="text-red-400">FAIL</span>}</p>
          <p>Table Found: {report.tableExists ? <span className="text-green-400">YES</span> : <span className="text-red-400">NO</span>}</p>
          <p>Schema Valid: {report.columnsValid ? <span className="text-green-400">YES</span> : <span className="text-yellow-400">PARTIAL/NO</span>}</p>
          <p>Row Count: {report.rowCount || 0}</p>
        </div>
        <div>
          {report.errors.length > 0 && (
             <div className="text-red-300">
               <strong>Errors:</strong>
               <ul className="list-disc pl-4">
                 {report.errors.map((e, i) => <li key={i}>{e}</li>)}
               </ul>
             </div>
          )}
          {report.sampleData && (
            <div>
              <strong>Sample Title:</strong> {report.sampleData.listing_title}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const sectionId = location.state.scrollTo;
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  }, [location]);

  return (
    <>
      <Helmet>
        <title>Auprolis - Botswana's Trusted Marketplace for Sheriff & Distressed Assets</title>
        <meta name="description" content="Discover verified sheriff sales and distressed assets in Botswana. Easy reservations, secure payments, and transparent processes for buyers and sellers." />
      </Helmet>
      
      <DebugSection />

      <div className="min-h-screen bg-white">
        <Navbar />
        <Hero />
        
        <AdditionalFeatures />
        
        <FeaturedProperties id="properties" />
        
        <HowItWorks id="how-it-works" />
        
        <WhyChooseAuprolis id="why-choose" />
        
        <div id="pricing">
           <Pricing />
           <PricingComparison />
        </div>
        
        <Footer id="contact" />
      </div>
    </>
  );
};

export default Home;