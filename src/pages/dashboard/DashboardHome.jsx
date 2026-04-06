import React from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import PlanCard from '../../components/dashboard/PlanCard';
import PropertyCard from '../../components/dashboard/PropertyCard';
import EmptyState from '../../components/dashboard/EmptyState';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/SupabaseAuthContext';
import { usePropertyData } from '../../hooks/usePropertyData';

const DashboardHome = () => {
  const { profile, loading: authLoading } = useAuth();
  const { properties, loading: propertiesLoading } = usePropertyData();
  const navigate = useNavigate();

  // Role-based redirection for consolidated dashboard entry point
  React.useEffect(() => {
    if (!authLoading && profile) {
      if (['seller', 'agent', 'bank', 'sheriff'].includes(profile.user_type)) {
        navigate('/seller', { replace: true });
      } else if (profile.user_type === 'admin') {
        navigate('/admin', { replace: true });
      }
    }
  }, [profile, authLoading, navigate]);

  const plans = [
    {
      name: 'Basic',
      description: 'Foundational access for casual research.',
      price: '15',
      features: [
        { text: '10 Property lookups / day', included: true },
        { text: 'Auction dates & locations', included: true },
        { text: 'No historical price data', included: false },
      ],
      isRecommended: false,
      buttonText: 'Start Basic',
    },
    {
      name: 'Pro Intelligence',
      description: 'The gold standard for serious investors and commercial property agents.',
      price: '30',
      features: [
        { text: 'Unlimited lookups', included: true },
        { text: 'AI-Driven Valuation', included: true },
        { text: 'Historical dossiers', included: true },
        { text: 'Tax delinquency alerts', included: true },
      ],
      isRecommended: true,
      buttonText: 'Get Pro Access',
    },
  ];

  return (
    <DashboardLayout title="Dossier Explorer">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Welcome Row */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="font-headline text-4xl font-extrabold tracking-tighter text-on-surface leading-none">
              Welcome, {profile?.name || 'Explorer'}!
            </h1>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full">
                Current plan: {profile?.subscription_type || 'Free'}
              </span>
              <p className="text-secondary text-sm font-medium">Upgrade to unlock full property intelligence. Plans start at P15/mo</p>
            </div>
          </div>
          <button className="px-8 py-4 bg-primary text-white font-headline text-xs font-black uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
            Unlock All Data
          </button>
        </section>

        {/* Upgrade Cards (Bento style) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-12 xl:col-span-5">
            <PlanCard plan={plans[0]} />
          </div>
          <div className="lg:col-span-12 xl:col-span-7">
            <PlanCard plan={plans[1]} />
          </div>
        </section>

        {/* Preview Properties Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-headline text-2xl font-extrabold tracking-tight text-on-surface">
              Preview Properties
            </h2>
            <Link to="/search" className="text-sm font-bold text-primary flex items-center gap-1 group">
              View Dossier Database 
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>

          {propertiesLoading ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1,2,3].map(i => <div key={i} className="h-48 bg-slate-100 animate-pulse rounded-xl" />)}
             </div>
          ) : properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((prop) => (
                <PropertyCard key={prop.id} property={{
                  ...prop,
                  title: prop.title || prop.listing_title,
                  price: `P ${prop.price_usd?.toLocaleString()}`,
                  imageUrl: prop.images?.[0],
                  location: prop.location,
                  status: [prop.property_type, prop.status]
                }} />
              ))}
            </div>
          ) : (
            <EmptyState 
              title="Nothing listed yet" 
              message="Property data will appear here once listings exist. Upgrade to access our full database."
            />
          )}
        </section>

        {/* Info Banner */}
        <div className="bg-tertiary-fixed p-6 rounded-[1.5rem] flex flex-col md:flex-row items-center justify-between border border-tertiary/10 shadow-sm gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 min-w-10 h-10 rounded-full bg-white flex items-center justify-center text-tertiary shadow-sm">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                lock
              </span>
            </div>
            <p className="font-semibold text-on-tertiary-fixed text-sm">
              Basic info only - <span className="text-on-tertiary-fixed/60 font-medium">Upgrade to Pro for full specs, including interior photography and structural surveys.</span>
            </p>
          </div>
          <Link to="/account" className="w-full md:w-auto text-center font-headline text-[10px] font-black uppercase tracking-widest text-primary hover:underline px-4 py-2 bg-white md:bg-transparent rounded-lg">
            COMPARE PLANS
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardHome;
