import React, { useState, useEffect } from 'react';
import SellerDashboardLayout from '../../../components/dashboard/SellerDashboardLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { formatDistanceToNow } from 'date-fns';

const SellerNotifications = () => {
  const { user } = useAuth();
  const [isGmailConnected, setIsGmailConnected] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const alerts = [
    { id: 1, title: 'Listing Intelligence', desc: 'Alerts when property data is verified or rejected by an admin.', icon: 'verified', active: true, color: 'primary' },
    { id: 2, title: 'Direct Inquiries', desc: 'Secure alerts for prospective buyer messages on active dossiers.', icon: 'mark_as_unread', active: true, color: 'secondary' },
    { id: 3, title: 'Strategic Deadlines', desc: 'Critical alerts for auction windows and final liquidation dates.', icon: 'gavel', active: true, color: 'tertiary' },
  ];

  // Fetch internal notifications from the properties hit
  useEffect(() => {
    if (!user) return;

    fetchNotifications();

    const channel = supabase
      .channel('seller:notifications')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'notifications',
        filter: `recipient_id=eq.${user.id}`
      }, (payload) => {
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
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setNotifications(data || []);
    } catch (err) {
      console.error('Error fetching internal notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGmailConnect = () => {
    setIsSyncing(true);
    // Simulate OAuth / Discovery flow
    setTimeout(() => {
        setIsGmailConnected(true);
        setIsSyncing(false);
    }, 2000);
  };

  return (
    <SellerDashboardLayout title="Operational Intelligence">
      <div className="max-w-[1400px] mx-auto space-y-12 pb-24">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-3 block font-headline">Intelligence Stream</span>
            <h2 className="text-5xl font-[900] font-headline text-on-surface tracking-tighter leading-none mb-6">Operational Control</h2>
            <p className="text-sm text-on-surface-variant font-medium opacity-60 max-w-xl leading-relaxed">
                Synchronization of asset dossiers and legal notices is now automated. Internal platform alerts are indexed below.
            </p>
          </div>
          <div className="flex bg-surface-container-low p-2 rounded-2xl shadow-inner border border-outline-variant/5">
            <button className="px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest bg-white shadow-xl shadow-primary/5 text-primary">All Activity</button>
            <button className="px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-outline/40 hover:text-on-surface transition-colors">Alert Settings</button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-10">
          {/* Main: Alert Configuration */}
          <div className="col-span-12 xl:col-span-8 space-y-10">
            {/* Gmail Integration Active/Inactive Card */}
            <section className={`rounded-[2.5rem] p-12 transition-all duration-700 border flex items-center gap-10 relative overflow-hidden ${
                isGmailConnected 
                ? 'bg-white border-primary/20 shadow-authoritative' 
                : 'bg-surface-container-low/50 border-outline-variant/10 shadow-inner'
            }`}>
                <div className={`w-24 h-24 rounded-[2rem] flex items-center justify-center shadow-inner transition-colors duration-500 ${
                    isGmailConnected ? 'bg-error/5 text-error' : 'bg-surface-container-high text-outline/30'
                }`}>
                    <span className="material-symbols-outlined text-[56px]" style={{ fontVariationSettings: isGmailConnected ? "'FILL' 1" : "" }}>{(isGmailConnected && !isSyncing) ? 'mail' : 'mark_email_read'}</span>
                </div>
                
                <div className="flex-1 relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                        <h3 className="text-3xl font-[800] font-headline text-on-surface tracking-tighter leading-none">Gmail Intelligence Audit</h3>
                        {isGmailConnected && (
                            <span className="bg-emerald-500/10 text-emerald-600 px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest animate-pulse border border-emerald-500/10">Active Sync</span>
                        )}
                    </div>
                    <p className="text-sm text-on-surface-variant font-medium opacity-60 mb-8 max-w-lg leading-relaxed">
                        {isGmailConnected 
                            ? "Auprolis is actively auditing your Gmail inbox for subject-line keywords related to your listings. All identified property intelligence is linked automatically."
                            : "Unlock seamless dossier tracking. Connect your organizational Gmail to automatically filter and archive buyer inquiries directly into search-ready property logs."
                        }
                    </p>
                    <div className="flex gap-4">
                        <button 
                            disabled={isSyncing}
                            onClick={handleGmailConnect}
                            className={`px-10 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-xl hover:scale-105 active:scale-95 ${
                                isGmailConnected 
                                ? 'bg-surface-container-high text-on-surface border border-outline-variant/10 hover:bg-surface-container-highest' 
                                : 'bg-on-background text-white hover:bg-secondary'
                            }`}
                        >
                            {isSyncing ? 'Accessing API...' : (isGmailConnected ? 'Manage Credentials' : 'Connect Gmail Account')}
                        </button>
                        {isGmailConnected && (
                             <button className="px-10 py-5 bg-primary/10 text-primary rounded-full font-black text-[10px] uppercase tracking-[0.2em] hover:bg-primary/20 transition-all border border-primary/10">Run Instant Sweep</button>
                        )}
                    </div>
                </div>

                {/* Subtle Gmail Watermark */}
                <div className="absolute -bottom-10 -right-10 opacity-[0.02] pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                    <span className="material-symbols-outlined text-[400px]">security</span>
                </div>
            </section>

            {/* Alert Categories */}
            <div className="bg-surface-container-lowest rounded-[2.5rem] p-12 shadow-authoritative border border-outline-variant/10">
                <div className="flex items-center justify-between mb-12">
                    <h3 className="text-2xl font-[800] font-headline text-on-surface tracking-tighter">Event Parameters</h3>
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black text-outline/40 uppercase tracking-widest leading-none">Filter:</span>
                        <select className="bg-transparent border-none text-[10px] font-black text-primary p-0 pr-8 focus:ring-0 uppercase tracking-widest cursor-pointer">
                            <option>All Assets</option>
                            <option>Midtown Industrial</option>
                            <option>Central Plaza</option>
                        </select>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {alerts.map((alert) => (
                        <div key={alert.id} className="p-8 bg-surface-container-low/30 rounded-[2rem] border border-outline-variant/5 group hover:bg-white hover:shadow-authoritative transition-all duration-500">
                            <div className="flex items-start justify-between mb-8">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform ${
                                    alert.id === 1 ? 'bg-primary/10 text-primary' : 
                                    alert.id === 2 ? 'bg-secondary/10 text-secondary' : 'bg-tertiary/10 text-tertiary'
                                }`}>
                                    <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>{alert.icon}</span>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer scale-110">
                                    <input type="checkbox" defaultChecked={alert.active} className="sr-only peer" />
                                    <div className="w-10 h-5 bg-surface-container-high rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all shadow-inner"></div>
                                </label>
                            </div>
                            <h4 className="text-lg font-[800] font-headline text-on-surface mb-2 leading-none">{alert.title}</h4>
                            <p className="text-xs text-on-surface-variant font-medium opacity-60 leading-relaxed italic pr-6 h-10 line-clamp-2">"{alert.desc}"</p>
                        </div>
                    ))}
                    {/* Add New Hook */}
                    <button className="p-8 rounded-[2rem] border-2 border-dashed border-outline-variant/20 flex flex-col items-center justify-center gap-4 text-outline/40 hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all group">
                        <span className="material-symbols-outlined text-3xl group-hover:scale-125 transition-transform">add_circle</span>
                        <span className="text-[10px] font-black uppercase tracking-widest">New Intelligence Hook</span>
                    </button>
                </div>
            </div>
          </div>

          {/* Side: Intelligence Feed */}
          <aside className="col-span-12 xl:col-span-4 space-y-10">
            {/* Platform Audit Feed */}
            <div className="bg-surface-container-lowest rounded-[2.5rem] p-10 shadow-authoritative border border-outline-variant/10 overflow-hidden relative group">
                <div className="flex items-center justify-between mb-10">
                    <h3 className="text-2xl font-[800] font-headline text-on-surface tracking-tighter leading-none">Intelligence Feed</h3>
                    <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-primary shadow-sm hover:rotate-180 transition-transform duration-700 cursor-pointer" onClick={fetchNotifications}>
                        <span className="material-symbols-outlined text-xl">autorenew</span>
                    </div>
                </div>

                <div className="space-y-10 overflow-y-auto max-h-[600px] pr-2 custom-scrollbar">
                    {loading ? (
                        <div className="py-20 text-center opacity-40 text-[10px] font-black uppercase tracking-widest animate-pulse italic">Scanning stream...</div>
                    ) : notifications.length > 0 ? (
                        <AnimatePresence>
                            {notifications.map((n) => (
                                <motion.div 
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    key={n.id} 
                                    className={`relative pl-6 border-l-2 group/item hover:border-primary transition-colors cursor-pointer ${n.is_read ? 'border-outline-variant/10' : 'border-primary'}`}
                                >
                                    <div className={`absolute -left-[7px] top-1 w-3 h-3 bg-white border-2 rounded-full transition-all shadow-lg ${n.is_read ? 'border-outline-variant/20' : 'border-primary bg-primary shadow-primary/20'}`}></div>
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className={`text-sm font-[800] font-headline tracking-tight group-hover/item:text-primary transition-colors ${n.is_read ? 'text-on-surface-variant' : 'text-on-surface'}`}>{n.title}</h4>
                                        <span className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                                            n.type === 'new_listing' ? 'bg-primary/10 text-primary' : 'bg-surface-container-high text-outline/40'
                                        }`}>Alert</span>
                                    </div>
                                    <p className={`text-[11px] font-medium opacity-60 line-clamp-2 mb-3 leading-relaxed ${n.is_read ? 'text-on-surface-variant/50' : 'text-on-surface-variant'}`}>{n.message}</p>
                                    <div className="flex justify-between items-center pr-2 text-[9px] font-black uppercase tracking-widest text-outline/30">
                                        <span>{formatDistanceToNow(new Date(n.created_at), { addSuffix: true })}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    ) : (
                        <div className="py-20 flex flex-col items-center justify-center text-center opacity-40">
                             <span className="material-symbols-outlined text-4xl mb-4">notifications_off</span>
                             <p className="text-[10px] font-black uppercase tracking-widest">Feed Secure <br/>No Intelligence Alerts</p>
                        </div>
                    )}
                </div>

                <div className="mt-12 pt-8 border-t border-outline-variant/10">
                    <p className="text-[9px] font-bold text-on-surface-variant opacity-40 uppercase tracking-widest leading-relaxed mb-6"> External Channel Status </p>
                    {/* Placeholder for Gmail/External if needed */}
                    {!isGmailConnected && (
                        <div className="p-6 bg-surface-container-low rounded-2xl border border-outline-variant/5 group-hover:border-primary/20 transition-all flex items-center justify-between hover:bg-white cursor-pointer" onClick={handleGmailConnect}>
                            <div className="flex items-center gap-4">
                                <span className="material-symbols-outlined text-xl text-primary">mail</span>
                                <span className="text-[9px] font-black uppercase tracking-widest text-on-surface">Sync Gmail Channel</span>
                            </div>
                            <span className="material-symbols-outlined text-sm text-outline/40">arrow_forward</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Platform Strategy Card */}
            <div className="bg-on-background rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group hover:scale-[1.02] transition-all">
                <div className="relative z-10">
                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-8 border border-white/5 shadow-inner group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>tips_and_updates</span>
                    </div>
                    <h4 className="text-2xl font-[800] font-headline tracking-tighter leading-snug mb-4">Strategic Delivery Audit</h4>
                    <p className="text-sm text-white/50 leading-relaxed font-medium mb-10">
                        Our intelligence system identifies and archives sensitive auction data using advanced natural language processing over your connected streams.
                    </p>
                    <button className="w-full py-4 bg-white text-on-background rounded-full font-black text-[10px] uppercase tracking-[0.2em] hover:bg-secondary hover:text-white transition-all shadow-xl">Audit Log: 24h Summary</button>
                </div>
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <span className="material-symbols-outlined text-7xl font-black">policy</span>
                </div>
            </div>
          </aside>
        </div>
      </div>
    </SellerDashboardLayout>
  );
};

export default SellerNotifications;
