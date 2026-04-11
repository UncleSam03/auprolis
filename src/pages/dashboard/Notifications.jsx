/* src/pages/dashboard/Notifications.jsx */
import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import EmptyState from '../../components/dashboard/EmptyState';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';

const Notifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    fetchNotifications();

    // Real-time subscription to notifications table
    const channel = supabase
      .channel('public:notifications')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'notifications',
        filter: `recipient_id=eq.${user.id}`
      }, (payload) => {
        console.log('Real-time notification received:', payload);
        // Add new notification to the top of the list
        setNotifications(prev => [payload.new, ...prev]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const fetchNotifications = async () => {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('recipient_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNotifications(data || []);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', id);
      
      if (error) throw error;
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
    } catch (err) {
      console.error('Error marking as read:', err);
    }
  };

  const markAllAsRead = async () => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('recipient_id', user.id);
      
      if (error) throw error;
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
    } catch (err) {
      console.error('Error marking all as read:', err);
    }
  };

  return (
    <DashboardLayout title="Notifications">
      <section className="max-w-4xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h3 className="font-headline text-4xl font-extrabold tracking-tighter text-on-surface mb-2">Notifications</h3>
            <p className="text-secondary text-sm font-medium">Stay updated on asset status changes and auction alerts.</p>
          </div>
          {notifications.some(n => !n.is_read) && (
            <button 
              onClick={markAllAsRead}
              className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline transition-all"
            >
              Mark all as read
            </button>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          </div>
        ) : notifications.length > 0 ? (
          <div className="space-y-4">
            <AnimatePresence>
              {notifications.map((n) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={n.id}
                  onClick={() => markAsRead(n.id)}
                  className={`p-6 rounded-[2rem] border transition-all cursor-pointer group ${
                    n.is_read 
                      ? 'bg-surface-container-low/50 border-outline-variant/5' 
                      : 'bg-white border-primary/20 shadow-authoritative ring-1 ring-primary/5'
                  }`}
                >
                  <div className="flex items-start gap-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform ${
                      n.type === 'new_listing' ? 'bg-primary/10 text-primary' : 
                      n.type === 'listing_update' ? 'bg-secondary/10 text-secondary' : 'bg-surface-container-high text-outline/30'
                    }`}>
                      <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                        {n.type === 'new_listing' ? 'verified' : n.type === 'listing_update' ? 'gavel' : 'notifications'}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className={`text-lg font-[800] font-headline tracking-tight leading-none ${n.is_read ? 'text-on-surface/60' : 'text-on-surface'}`}>
                          {n.title}
                        </h4>
                        <span className="text-[10px] font-black uppercase tracking-widest text-outline/40 whitespace-nowrap ml-4">
                          {formatDistanceToNow(new Date(n.created_at), { addSuffix: true })}
                        </span>
                      </div>
                      <p className={`text-sm leading-relaxed font-medium ${n.is_read ? 'text-on-surface-variant/50' : 'text-on-surface-variant'}`}>
                        {n.message}
                      </p>
                      {n.link && (
                        <div className="flex items-center justify-between mt-4">
                          <div 
                            onClick={(e) => { e.stopPropagation(); window.location.href = n.link; }}
                            className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest hover:underline"
                          >
                            View Details <span className="material-symbols-outlined text-xs">arrow_forward</span>
                          </div>
                          {n.type === 'listing_update' && (
                            <div className="flex items-center gap-1 text-[9px] font-bold text-secondary/60 uppercase tracking-tighter bg-secondary/5 px-2 py-1 rounded-md">
                              <span className="material-symbols-outlined text-[10px]">mail</span>
                              Email Alert Sent
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    {!n.is_read && (
                      <div className="w-2.5 h-2.5 bg-primary rounded-full shadow-[0_0_8px_var(--primary)] mt-2" />
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
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
