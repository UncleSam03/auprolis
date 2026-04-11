import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashboardLayout from '../../../components/dashboard/AdminDashboardLayout';
import { supabase } from '../../../lib/customSupabaseClient';
import { formatCurrency } from '../../../lib/utils';
import { useToast } from '@/components/ui/use-toast';


const AdminListings = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(null); // To track which ID is being processed
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [typeFilter, setTypeFilter] = useState('All Property Types');
  const [sortBy, setSortBy] = useState('Latest Submission');

  const filteredListings = listings.filter(item => {
    const statusMatch = statusFilter === 'All Statuses' || 
      (statusFilter === 'Live Assets' && item.status?.toLowerCase() === 'live') ||
      (statusFilter === 'Pending Moderation' && (item.status?.toLowerCase() === 'pending' || !item.status)) ||
      (statusFilter === 'Suspended Intelligence' && item.status?.toLowerCase() === 'denied');
      
    const typeMatch = typeFilter === 'All Property Types' || 
      item.property_type === typeFilter || item.type === typeFilter;
      
    return statusMatch && typeMatch;
  }).sort((a, b) => {
    if (sortBy === 'Latest Submission') {
      return new Date(b.created_at) - new Date(a.created_at);
    }
    if (sortBy === 'Maximum Valuation') {
      return (Number(b.price_usd) || 0) - (Number(a.price_usd) || 0);
    }
    return 0;
  });


  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('properties')
        .select(`
          *,
          profiles!seller_id(name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setListings(data || []);
    } catch (err) {
      console.error('Error fetching listings:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      setIsProcessing(id);
      const { error } = await supabase
        .from('properties')
        .update({ status: 'live' })
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Asset Live",
        description: "The property has been approved and moved to market intelligence.",
      });
      
      fetchListings();
    } catch (err) {
      toast({
        title: "Action Failed",
        description: err.message,
        variant: "destructive"
      });
    } finally {
      setIsProcessing(null);
    }
  };

  const handleDeny = async (id) => {
    try {
      setIsProcessing(id);
      const { error } = await supabase
        .from('properties')
        .update({ status: 'denied' })
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Asset Denied",
        description: "The property listing has been rejected and archived.",
      });
      
      fetchListings();
    } catch (err) {
      toast({
        title: "Action Failed",
        description: err.message,
        variant: "destructive"
      });
    } finally {
      setIsProcessing(null);
    }
  };


  return (
    <AdminDashboardLayout 
      title="Listings Management" 
      subtitle="High-density data view of active and pending administrative property intelligence."
      headerAction={
        <button 
          onClick={() => navigate('/admin/listings/new')}
          className="bg-primary text-white font-black text-[12px] uppercase tracking-[0.2em] px-10 py-5 rounded-full shadow-2xl shadow-primary/30 hover:scale-[1.03] active:scale-95 transition-all flex items-center gap-4"
        >
          <span className="material-symbols-outlined text-xl">add_circle</span>
          Create Authority Listing
        </button>
      }
    >
      <div className="space-y-12 pb-24">
        {/* Toolbar Section */}
        <section className="flex flex-wrap items-center gap-8 bg-surface-container-low/30 p-8 rounded-[2rem] border border-outline-variant/10 shadow-inner">
          <div className="flex items-center bg-white px-6 py-3 rounded-2xl gap-4 shadow-sm border border-outline-variant/5">
            <span className="text-[10px] font-black uppercase tracking-widest text-outline/40">Status:</span>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent border-none text-xs font-[800] text-on-surface focus:ring-0 py-0 pr-8 cursor-pointer"
            >
              <option>All Statuses</option>
              <option>Live Assets</option>
              <option>Pending Moderation</option>
              <option>Suspended Intelligence</option>
            </select>

          </div>
          <div className="flex items-center bg-white px-6 py-3 rounded-2xl gap-4 shadow-sm border border-outline-variant/5">
            <span className="text-[10px] font-black uppercase tracking-widest text-outline/40">Type:</span>
            <select 
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-transparent border-none text-xs font-[800] text-on-surface focus:ring-0 py-0 pr-8 cursor-pointer"
            >
              <option>All Property Types</option>
              <option>Commercial Suite</option>
              <option>Residential Villa</option>
              <option>Industrial Complex</option>
            </select>

          </div>
          <div className="flex items-center bg-white px-6 py-3 rounded-2xl gap-4 shadow-sm border border-outline-variant/5">
            <span className="text-[10px] font-black uppercase tracking-widest text-outline/40">Sort By:</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent border-none text-xs font-[800] text-on-surface focus:ring-0 py-0 pr-8 cursor-pointer"
            >
              <option>Latest Submission</option>
              <option>Maximum Valuation</option>
            </select>

          </div>
          <button className="ml-auto flex items-center gap-3 text-primary font-black text-[10px] uppercase tracking-[0.2em] hover:bg-primary/5 px-6 py-3 rounded-full transition-all">
            <span className="material-symbols-outlined text-[20px]">filter_list</span>
            Advanced Filters
          </button>
        </section>

        {/* High-Density Data Table */}
        <section className="bg-surface-container-lowest rounded-[2.5rem] overflow-hidden shadow-authoritative border border-outline-variant/10">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead className="bg-surface-container-low/30 sticky top-0 z-10">
                <tr>
                  <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.25em] text-outline/40 leading-none">Identifier</th>
                  <th className="px-8 py-8 text-[10px] font-black uppercase tracking-[0.25em] text-outline/40 leading-none">Asset Intelligence</th>
                  <th className="px-8 py-8 text-[10px] font-black uppercase tracking-[0.25em] text-outline/40 leading-none">Entity / Seller</th>
                  <th className="px-8 py-8 text-[10px] font-black uppercase tracking-[0.25em] text-outline/40 leading-none">Status</th>
                  <th className="px-8 py-8 text-[10px] font-black uppercase tracking-[0.25em] text-outline/40 leading-none">Submitted</th>
                  <th className="px-8 py-8 text-[10px] font-black uppercase tracking-[0.25em] text-outline/40 leading-none text-right">Reach</th>
                  <th className="px-10 py-8 text-right text-[10px] font-black uppercase tracking-[0.25em] text-outline/40 leading-none">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/5">
                {loading ? (
                  Array(5).fill(0).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={7} className="px-10 py-8 bg-surface-container-low/20 h-24 whitespace-nowrap"></td>
                    </tr>
                  ))
                ) : filteredListings.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-10 py-20 text-center opacity-40 font-black uppercase tracking-widest text-[10px]">No intelligence matching selected filters</td>
                  </tr>
                ) : (
                  filteredListings.map((item) => (

                    <tr key={item.id} className="group hover:bg-surface transition-all duration-300">
                      <td className="px-10 py-8 text-xs font-black text-on-surface-variant opacity-40 font-mono tracking-tighter truncate max-w-[120px]">
                        #{item.id.slice(0, 8).toUpperCase()}
                      </td>
                      <td className="px-8 py-8">
                        <div className="flex items-center gap-6">
                          <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-xl shadow-on-surface/[0.05] flex-shrink-0 group-hover:scale-110 transition-transform duration-500 bg-surface-container-high">
                            {item.images && item.images[0] ? (
                              <img className="w-full h-full object-cover" src={item.images[0]} alt="Asset" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center opacity-20">
                                <span className="material-symbols-outlined">image</span>
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col gap-1 pr-6">
                            <span className="font-[900] text-lg text-on-surface font-headline leading-tight tracking-tight group-hover:text-primary transition-colors">{item.title || item.listing_title || 'Untitled Asset'}</span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 italic">{item.property_type || item.type || 'Unspecified'} • {item.location || 'Unknown Location'}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-8 text-sm font-[800] text-on-surface/70 italic">{item.profiles?.name || 'Institutional Seller'}</td>
                      <td className="px-8 py-8">
                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest leading-none shadow-sm ${
                          item.status?.toLowerCase() === 'live' ? 'bg-secondary/10 text-secondary' : 
                          item.status?.toLowerCase() === 'pending' || !item.status ? 'bg-primary/10 text-primary' : 'bg-error/10 text-error'
                        }`}>
                          {item.status || 'Pending'}
                        </span>
                      </td>
                      <td className="px-8 py-8 text-xs font-bold text-on-surface-variant opacity-60 font-body">
                        {new Date(item.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-8 py-8 text-right">
                        <span className="text-sm font-[900] text-on-surface tracking-tighter">{item.views_count || 0}</span>
                        <p className="text-[8px] font-black uppercase tracking-widest text-outline/30 mt-1">Unique Imprints</p>
                      </td>
                      <td className="px-10 py-8 text-right">
                        <div className="flex items-center justify-end gap-3">
                          {(item.status?.toLowerCase() === 'pending' || !item.status) && (
                            <>
                              <button 
                                onClick={() => handleApprove(item.id)}
                                disabled={isProcessing === item.id}
                                className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all shadow-md active:scale-95 disabled:opacity-50"
                                title="Quick Approve"
                              >
                                {isProcessing === item.id ? (
                                  <span className="material-symbols-outlined text-xl animate-spin">refresh</span>
                                ) : (
                                  <span className="material-symbols-outlined text-xl">check_circle</span>
                                )}
                              </button>
                              <button 
                                onClick={() => handleDeny(item.id)}
                                disabled={isProcessing === item.id}
                                className="w-10 h-10 rounded-full bg-error/10 text-error flex items-center justify-center hover:bg-error hover:text-white transition-all shadow-md active:scale-95 disabled:opacity-50"
                                title="Deny Intelligence"
                              >
                                <span className="material-symbols-outlined text-xl">block</span>
                              </button>
                            </>
                          )}
                          <button 
                            onClick={() => navigate(`/admin/listings/review/${item.id}`)}
                            className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-outline/30 hover:bg-on-surface hover:text-white transition-all shadow-md group-hover:shadow-lg"
                            title="Full Moderation Review"
                          >
                            <span className="material-symbols-outlined text-xl">settings_intelligence</span>
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          <footer className="px-10 py-8 flex items-center justify-between bg-surface-container-low/30 border-t border-outline-variant/10">
            <span className="text-[11px] font-black uppercase tracking-widest text-outline/40 italic">Aggregated Intelligence: {filteredListings.length} Active Listings</span>

            <div className="flex items-center gap-3">
              <button className="w-10 h-10 rounded-xl bg-surface-container-high text-outline/40 flex items-center justify-center hover:bg-white transition-all shadow-inner">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <div className="flex items-center gap-2">
                <span className="w-10 h-10 rounded-xl bg-primary text-white text-xs font-black shadow-xl shadow-primary/20 flex items-center justify-center">1</span>
              </div>
              <button className="w-10 h-10 rounded-xl bg-surface-container-high text-outline/40 flex items-center justify-center hover:bg-white transition-all shadow-inner">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </footer>
        </section>

        {/* Performance Bento */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { 
              label: 'Total Portfolio Intelligence', 
              value: listings.length.toString(), 
              trend: '+12%', 
              color: 'emerald' 
            },
            { 
              label: 'Pending Human Verification', 
              value: listings.filter(l => l.status?.toLowerCase() === 'pending' || !l.status).length.toString(), 
              subtext: 'SLA Active', 
              color: 'primary' 
            },
            { 
              label: 'Average Asset Valuation', 
              value: formatCurrency(listings.reduce((acc, l) => acc + (Number(l.price_usd) || 0), 0) / (listings.length || 1)), 
              subtext: 'Market Aggregated', 
              color: 'tertiary' 
            },
            { 
              label: 'Network Reach Imprints', 
              value: `${(listings.reduce((acc, l) => acc + (Number(l.views_count) || 0), 0) / 1000).toFixed(1)}k`, 
              trend: 'Global', 
              color: 'primary' 
            }
          ].map((stat, idx) => (
            <div key={idx} className="p-10 bg-white rounded-[2.5rem] border-l-8 border-primary shadow-authoritative hover:scale-[1.03] transition-all">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-outline/40 block mb-6">{stat.label}</span>
              <div className="flex items-end justify-between">
                <h3 className="text-4xl font-[900] font-headline text-on-surface tracking-tighter leading-none">{stat.value}</h3>
                <div className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                  stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-700' : 'bg-primary/5 text-primary'
                }`}>
                  {stat.trend || stat.subtext}
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminListings;
