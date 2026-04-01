/* src/pages/dashboard/Favorites.jsx */
import React from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import PropertyCard from '../../components/dashboard/PropertyCard';
import EmptyState from '../../components/dashboard/EmptyState';

const Favorites = () => {
  // Empty state as requested
  const favorites = [];

  return (
    <DashboardLayout title="Favorites">
      <section className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h3 className="font-headline text-4xl font-extrabold tracking-tighter text-on-surface mb-2">My Favorites</h3>
            <p className="text-secondary text-sm font-medium">Track and monitor your key property interests.</p>
          </div>
          <div className="bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
            {favorites.length}/10 Slots Used
          </div>
        </div>

        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favorites.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        ) : (
          <EmptyState 
            title="No favorites yet" 
            message="Add properties to your favorites to monitor their status and auction dates."
            icon="favorite"
          />
        )}
      </section>
    </DashboardLayout>
  );
};

export default Favorites;
