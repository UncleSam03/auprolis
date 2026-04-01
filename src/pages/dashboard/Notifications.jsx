/* src/pages/dashboard/Notifications.jsx */
import React from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import EmptyState from '../../components/dashboard/EmptyState';

const Notifications = () => {
  // Empty state as requested
  const notifications = [];

  return (
    <DashboardLayout title="Notifications">
      <section className="max-w-4xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h3 className="font-headline text-4xl font-extrabold tracking-tighter text-on-surface mb-2">Notifications</h3>
            <p className="text-secondary text-sm font-medium">Stay updated on asset status changes and auction alerts.</p>
          </div>
          <button className="text-primary text-xs font-black uppercase tracking-widest hover:underline">Mark all as read</button>
        </div>

        {notifications.length > 0 ? (
          <div className="space-y-4">
            {/* Notification items would go here */}
          </div>
        ) : (
          <EmptyState 
            title="All caught up" 
            message="Your notifications will appear here as property data updates or auction dates approach."
            icon="notifications"
          />
        )}
      </section>
    </DashboardLayout>
  );
};

export default Notifications;
