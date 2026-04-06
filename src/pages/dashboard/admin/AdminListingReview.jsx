import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminDashboardLayout from '../../../components/dashboard/AdminDashboardLayout';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { notifyBuyersOfNewListing, requestGmailToken } from '@/lib/gmail';

const AdminListingReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isApproving, setIsApproving] = useState(false);
  const [checks, setChecks] = useState([false, false, false]);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*, profiles:seller_id(*)')
          .eq('id', id)
          .single();

        if (error) throw error;
        setProperty(data);
      } catch (err) {
        console.error('Error fetching moderation asset:', err);
        toast({
          title: "Access Denied",
          description: "Could not retrieve the requested intelligence dossier.",
          variant: "destructive"
        });
        navigate('/admin/listings');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProperty();
  }, [id, navigate, toast]);

  const handleApprove = async () => {
    if (!checks.every(c => c)) {
      toast({
        title: "Governance Protocol Failure",
        description: "All authority checklist items must be verified before approval.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsApproving(true);
      
      // 1. Request Google OAuth2 Token for Gmail Send scope
      toast({
          title: "Authenticating Authority",
          description: "Launching Google Identity Protocol for investor broadcast..."
      });
      
      let token;
      try {
          token = await requestGmailToken();
      } catch (authErr) {
          console.error('Auth failure:', authErr);
          toast({
              title: "Authentication Failed",
              description: "Google authorization is required for investor broadcast.",
              variant: "destructive"
          });
          setIsApproving(false);
          return;
      }

      // 2. Update Asset Status
      const { error: updateError } = await supabase
        .from('properties')
        .update({ status: 'approved', moderation_notes: notes })
        .eq('id', id);

      if (updateError) throw updateError;

      // 3. Broadcast to Buyers via Gmail API
      const broadcastResult = await notifyBuyersOfNewListing(property, token);
      
      // 4. Create Internal Notification for Seller
      await supabase.from('notifications').insert({
        recipient_id: property.seller_id,
        title: 'Asset Verified & Broadcasted',
        message: `Governance has approved ${property.title}. Intelligence has been broadcasted to all verified investors.`,
        type: 'listing_approved'
      });

      toast({
        title: "Intelligence Verified",
        description: broadcastResult.success 
          ? `Broadcast success: ${broadcastResult.broadcast_count} investors notified via verified Gmail stream.`
          : `Asset approved, but broadcast failed: ${broadcastResult.errors?.[0] || 'Check logs'}`,
      });

      navigate('/admin/listings');
    } catch (err) {
      console.error('Moderation protocol error:', err);
      toast({
        title: "Approval Failed",
        description: err.message,
        variant: "destructive"
      });
    } finally {
      setIsApproving(false);
    }
  };

  const toggleCheck = (index) => {
    const newChecks = [...checks];
    newChecks[index] = !newChecks[index];
    setChecks(newChecks);
  };

  if (loading) return (
    <AdminDashboardLayout title="Moderation Utility">
        <div className="p-32 text-center opacity-30 text-[10px] font-black uppercase tracking-widest animate-pulse">Initializing Governance Protocol...</div>
    </AdminDashboardLayout>
  );

  return (
    <AdminDashboardLayout title={`Moderation: ${property?.title || 'Unknown Asset'}`} subtitle="Human intelligence review for high-value distressed asset verification.">
      <div className="space-y-12 pb-32">
        {/* Breadcrumbs & Title */}
        <nav className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.25em] text-outline/30 font-headline leading-none">
          <span>Authority</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span>Pending Moderation</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-primary">{property?.id?.substring(0, 8) || 'GAB772'}</span>
        </nav>

        {/* Status Alert Banner */}
        <section className="bg-amber-500/10 border-l-8 border-amber-500 p-10 rounded-[2.5rem] flex items-center justify-between shadow-2xl shadow-amber-500/5 group">
          <div className="flex items-center gap-8">
            <div className="w-16 h-16 bg-white/50 backdrop-blur rounded-2xl flex items-center justify-center text-amber-600 shadow-inner group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl font-black">priority_high</span>
            </div>
            <div>
              <h3 className="text-sm font-black text-amber-800 uppercase tracking-[0.2em] font-headline mb-2 leading-none">Pending Governance Approval</h3>
              <p className="text-xs font-medium text-amber-700/70 max-w-xl leading-relaxed italic pr-10">Submitted by <strong className="text-amber-800">{property?.profiles?.full_name || 'Anonymous Entity'}</strong> • Real-time SLA active for compliance reporting.</p>
            </div>
          </div>
          <div className="text-right flex flex-col gap-2">
            <p className="text-[10px] font-black text-amber-800/40 uppercase tracking-widest leading-none">Intelligence Case ID</p>
            <p className="text-lg font-mono font-black text-amber-800 tracking-tighter">#AU-{property?.id?.substring(0, 8).toUpperCase()}</p>
          </div>
        </section>

        {/* Content Split: Dossier & Moderation Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Dossier Column */}
          <div className="lg:col-span-8 space-y-12">
            {/* Immersive Gallery */}
            <div className="bg-surface-container-lowest rounded-[3rem] overflow-hidden group relative h-[500px] shadow-authoritative border border-outline-variant/10">
              <img 
                alt="Asset Intelligence" 
                className="w-full h-full object-cover transition-transform duration-[20s] group-hover:scale-110" 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200"
              />
              <div className="absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-black/60 to-transparent flex gap-4">
                <div className="px-6 py-3 bg-white/20 backdrop-blur-2xl rounded-full text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-3 border border-white/20 shadow-2xl">
                  <span className="material-symbols-outlined text-sm">enhanced_encryption</span>
                  Secure Metadata Locked
                </div>
              </div>
            </div>

            {/* Asset Intelligence Grid */}
            <div className="bg-surface-container-lowest p-16 rounded-[3rem] shadow-authoritative border border-outline-variant/10">
              <h2 className="text-[10px] font-black tracking-[0.3em] text-outline/30 uppercase mb-12 font-headline leading-none">Asset Intelligence Dossier</h2>
              <div className="grid grid-cols-2 gap-y-16 gap-x-20">
                <div className="flex flex-col gap-4">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-outline/50 font-black leading-none">Institutional Valuation</span>
                  <span className="text-5xl font-[900] text-primary tracking-tighter font-headline leading-none">BWP {Number(property?.price_pula).toLocaleString()}</span>
                </div>
                <div className="flex flex-col gap-4">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-outline/50 font-black leading-none">Geographic Hierarchy</span>
                  <span className="text-xl font-[800] text-on-surface font-headline leading-relaxed tracking-tight">{property?.location}</span>
                </div>
                <div className="flex flex-col gap-4">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-outline/50 font-black leading-none">Seller Intelligence</span>
                  <div className="flex items-center gap-5 bg-surface-container-low px-6 py-4 rounded-3xl border border-outline-variant/5">
                    <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm border border-outline-variant/10">
                      <span className="material-symbols-outlined text-xl">account_circle</span>
                    </div>
                    <span className="text-[11px] font-[900] text-on-surface uppercase tracking-widest leading-none font-headline">{property?.profiles?.full_name || 'Private Entity'}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-outline/50 font-black leading-none">Property Genetic Profile</span>
                  <span className="text-[11px] font-[900] text-on-surface uppercase tracking-[0.1em] flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-secondary shadow-lg shadow-secondary/20 animate-pulse"></div>
                    {property?.property_type}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Governance Column */}
          <aside className="lg:col-span-4 flex flex-col gap-8 sticky top-28">
            <div className="bg-on-background text-white p-12 rounded-[3rem] shadow-authoritative relative overflow-hidden group">
              <div className="absolute top-4 right-4 opacity-10">
                <span className="material-symbols-outlined text-[120px]" style={{ fontVariationSettings: "'FILL' 1" }}>shield_locked</span>
              </div>
              <div className="flex items-center justify-between mb-12 relative z-10">
                <h2 className="text-[10px] font-black tracking-[0.3em] text-white/40 uppercase font-headline">Governance Protocol</h2>
              </div>

              {/* Verification Checklist */}
              <div className="space-y-6 mb-16 relative z-10">
                <h3 className="text-[10px] font-black tracking-widest text-white/30 uppercase font-headline">Authority Checklist</h3>
                {[
                  'Documents complete & institutional',
                  'Zero hits on national legal logs',
                  'Valuation aligns with sector velocity'
                ].map((check, i) => (
                  <div key={i} className="flex items-center gap-5 cursor-pointer group/check" onClick={() => toggleCheck(i)}>
                    <div className="relative">
                      <div className={`h-6 w-6 rounded-xl border-2 transition-all flex items-center justify-center ${checks[i] ? 'bg-primary border-primary' : 'border-white/10 bg-white/5'}`}>
                        {checks[i] && <span className="material-symbols-outlined text-sm font-black text-white">check</span>}
                      </div>
                    </div>
                    <span className={`text-[13px] font-[700] transition-colors ${checks[i] ? 'text-white' : 'text-white/40 group-hover/check:text-white/60'}`}>{check}</span>
                  </div>
                ))}
              </div>

              {/* Notes Area */}
              <div className="space-y-4 mb-16 relative z-10">
                <h3 className="text-[10px] font-black tracking-widest text-white/30 uppercase font-headline">Judgement Intelligence</h3>
                <textarea 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-[13px] font-bold text-white placeholder:text-white/20 focus:ring-2 focus:ring-primary/40 resize-none min-h-[140px] italic shadow-inner" 
                  placeholder="Record administrative rationale here for legal audit..."
                ></textarea>
              </div>

              {/* Judicial Actions */}
              <div className="flex flex-col gap-4 relative z-10">
                <button 
                  onClick={handleApprove}
                  disabled={isApproving}
                  className="w-full py-5 bg-primary text-white rounded-2xl font-[900] text-[10px] uppercase tracking-[0.3em] shadow-2xl shadow-primary/40 hover:scale-[1.03] active:scale-95 transition-all disabled:opacity-50"
                >
                  {isApproving ? 'Executing Protocol...' : 'Approve & Broadcast'}
                </button>
                <button 
                    disabled={isApproving}
                    onClick={() => navigate('/admin/listings')}
                    className="w-full py-5 bg-white/5 text-white/40 rounded-2xl font-[900] text-[10px] uppercase tracking-[0.3em] hover:bg-white/10 hover:text-white transition-all">
                  Return to Registry
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminListingReview;
