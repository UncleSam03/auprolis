import React, { useState, useEffect, useCallback } from 'react';
import SellerDashboardLayout from '../../../components/dashboard/SellerDashboardLayout';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';

const SellerDocuments = () => {
  const { user } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [stats, setStats] = useState({ compliance: 0, pending: 0, missing: 0 });
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [filter, setFilter] = useState('All Files');
  const { toast } = useToast();

  const fetchDocuments = useCallback(async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      // Fetch documents joined with properties to get the case number or title
      const { data, error } = await supabase
        .from('property_documents')
        .select(`
          *,
          properties:property_id (
            id,
            title,
            case_number
          )
        `)
        .eq('seller_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setDocuments(data || []);
      
      // Calculate stats
      const total = (data || []).length;
      if (total > 0) {
        const verified = data.filter(doc => doc.status === 'verified').length;
        const pending = data.filter(doc => doc.status === 'pending').length;
        const missing = data.filter(doc => doc.status === 'missing').length;
        
        setStats({
          compliance: Math.round((verified / total) * 100),
          pending,
          missing
        });
      } else {
          setStats({ compliance: 0, pending: 0, missing: 0 });
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchDocuments();

    // Set up real-time subscription
    const channel = supabase
      .channel('property_documents_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'property_documents', filter: `seller_id=eq.${user?.id}` },
        () => {
          fetchDocuments(); // Refresh on any change
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, fetchDocuments]);

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    // Basic validation
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast({
        title: "File too large",
        description: "Maximum file size is 10MB",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsUploading(true);
      
      // 1. Generate unique file path
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}-${Date.now()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      // 2. Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('property-documents')
        .upload(filePath, file);

      if (uploadError) {
        if (uploadError.message.includes('bucket not found')) {
            // If bucket doesn't exist, we can't do much here, but usually it should be created
            throw new Error("Storage vault not initialized. Please contact support.");
        }
        throw uploadError;
      }

      // 3. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('property-documents')
        .getPublicUrl(filePath);

      // 4. Insert Intelligence Record
      // We'll try to find any property to link it to, or leave it null
      const { data: properties } = await supabase
        .from('properties')
        .select('id')
        .eq('seller_id', user.id)
        .limit(1);

      const propertyId = properties?.[0]?.id || null;

      const { error: dbError } = await supabase
        .from('property_documents')
        .insert({
          name: file.name,
          file_url: publicUrl,
          file_type: file.type || 'application/octet-stream',
          size_bytes: file.size,
          seller_id: user.id,
          property_id: propertyId,
          category: 'legal', // Default category
          status: 'pending'
        });

      if (dbError) throw dbError;

      toast({
        title: "Intelligence Secured",
        description: `${file.name} has been archived in the vault.`,
      });

      fetchDocuments();
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload Failed",
        description: error.message || "An error occurred during secure transmission.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
      // Clear input
      event.target.value = '';
    }
  };

  const filteredDocuments = documents.filter(doc => {
    if (filter === 'All Files') return true;
    const categoryMap = {
      'Legal': 'legal',
      'Identification': 'identification',
      'Property Photos': 'property_photos'
    };
    return doc.category === categoryMap[filter];
  });

  const statusStyles = {
    verified: 'bg-secondary/10 text-secondary',
    pending: 'bg-tertiary/10 text-tertiary',
    rejected: 'bg-error/10 text-error',
    missing: 'bg-error/10 text-error',
  };

  const getIcon = (category, status) => {
    if (status === 'missing') return 'report_problem';
    if (category === 'legal') return 'gavel';
    if (category === 'identification') return 'badge';
    return 'description';
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return 'n/a';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <SellerDashboardLayout title="Documents Vault">
      <div className="max-w-7xl mx-auto space-y-12 pb-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-4">
          <div>
            <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2 block font-headline">Centralized Intelligence</p>
            <h2 className="text-5xl font-[800] font-headline text-on-surface tracking-tighter leading-none">Security Vault</h2>
          </div>
          <input 
            type="file" 
            id="vault-upload" 
            className="hidden" 
            onChange={handleFileUpload}
            disabled={isUploading}
          />
          <button 
            disabled={isUploading}
            onClick={() => document.getElementById('vault-upload').click()}
            className="flex items-center gap-3 bg-gradient-to-br from-primary to-primary-container text-white px-10 py-4 rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 hover:scale-[1.03] active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
          >
            <span className={`material-symbols-outlined text-lg leading-none ${isUploading ? 'animate-spin' : ''}`}>
              {isUploading ? 'sync' : 'cloud_upload'}
            </span>
            {isUploading ? 'Securing Data...' : 'Upload New Document'}
          </button>
        </div>

        {/* Bento Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-surface-container-lowest rounded-[2.5rem] p-10 flex items-start gap-8 shadow-authoritative border border-outline-variant/5 transition-all duration-500"
          >
            <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary shadow-inner">
              <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
            </div>
            <div>
              <p className="text-[10px] font-black text-outline/40 uppercase tracking-[0.2em] mb-2">Compliance Rate</p>
              <h3 className="text-4xl font-[900] text-on-surface font-headline tracking-tighter leading-none">{stats.compliance}%</h3>
              <p className="text-[10px] text-secondary mt-3 flex items-center gap-2 font-black uppercase tracking-widest">
                <span className="material-symbols-outlined text-xs leading-none" style={{ fontVariationSettings: "'FILL' 1" }}>trending_up</span> 
                Synced Real-time
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-surface-container-lowest rounded-[2.5rem] p-10 flex items-start gap-8 shadow-authoritative border border-outline-variant/5 transition-all duration-500"
          >
            <div className="w-16 h-16 rounded-2xl bg-tertiary/10 flex items-center justify-center text-tertiary shadow-inner">
              <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>pending_actions</span>
            </div>
            <div>
              <p className="text-[10px] font-black text-outline/40 uppercase tracking-[0.2em] mb-2">Pending Reviews</p>
              <h3 className="text-4xl font-[900] text-on-surface font-headline tracking-tighter leading-none">{stats.pending.toString().padStart(2, '0')}</h3>
              <p className="text-[10px] text-tertiary mt-3 font-black uppercase tracking-widest opacity-60">Requires verification</p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-surface-container-lowest rounded-[2.5rem] p-10 flex items-start gap-8 shadow-authoritative border border-outline-variant/5 transition-all duration-500"
          >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner ${stats.missing > 0 ? 'bg-error/10 text-error' : 'bg-surface-container-high text-outline/40'}`}>
              <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>priority_high</span>
            </div>
            <div>
              <p className="text-[10px] font-black text-outline/40 uppercase tracking-[0.2em] mb-2">Missing Files</p>
              <h3 className={`text-4xl font-[900] font-headline tracking-tighter leading-none ${stats.missing > 0 ? 'text-error' : 'text-on-surface'}`}>{stats.missing.toString().padStart(2, '0')}</h3>
              <p className="text-[10px] text-error mt-3 font-extrabold uppercase tracking-widest underline decoration-2 underline-offset-4 cursor-pointer hover:opacity-70 transition-opacity">Action Required</p>
            </div>
          </motion.div>
        </div>

        {/* Documents Table Section */}
        <div className="bg-surface-container-lowest rounded-[2.5rem] shadow-authoritative border border-outline-variant/10 overflow-hidden">
          {/* Filters Bar */}
          <div className="px-10 py-8 border-b border-outline-variant/10 flex justify-between items-center bg-white/50 backdrop-blur-md">
            <div className="flex gap-4">
              {['All Files', 'Legal', 'Identification', 'Property Photos'].map((f) => (
                <button 
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                    filter === f ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'text-outline/60 hover:text-primary hover:bg-surface-container-low'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto min-h-[400px]">
             {loading ? (
                <div className="w-full h-[400px] flex flex-col items-center justify-center gap-4 opacity-50">
                    <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                    <p className="text-[10px] font-black uppercase tracking-widest">Fetching secure vault...</p>
                </div>
             ) : (
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead className="bg-surface-container-low/50">
                    <tr>
                      <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-outline/40">Document Name</th>
                      <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-outline/40">Listing ID</th>
                      <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-outline/40">Upload Date</th>
                      <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-outline/40">Status</th>
                      <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-outline/40 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/10">
                    <AnimatePresence>
                        {filteredDocuments.length > 0 ? filteredDocuments.map((doc) => (
                          <motion.tr 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            key={doc.id} 
                            className="group hover:bg-surface-container-low/30 transition-all duration-300"
                          >
                            <td className="px-10 py-7">
                              <div className="flex items-center gap-6">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform ${doc.status === 'missing' ? 'bg-error/10 text-error' : 'bg-primary/5 text-primary'}`}>
                                  <span className="material-symbols-outlined text-2xl">{getIcon(doc.category, doc.status)}</span>
                                </div>
                                <div>
                                  <p className={`text-base font-[800] font-headline tracking-tight group-hover:text-primary transition-colors ${doc.status === 'missing' ? 'text-error/80' : 'text-on-surface'}`}>{doc.name}</p>
                                  <p className="text-[10px] font-black uppercase tracking-widest text-outline/40 mt-1">{doc.file_type || 'Unknown'} • {formatFileSize(doc.size_bytes)}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-10 py-7 text-sm font-bold text-on-surface font-headline opacity-60 tracking-tight">
                                {doc.properties?.case_number || doc.properties?.title || '--'}
                            </td>
                            <td className="px-10 py-7 text-sm font-bold text-on-surface font-headline opacity-40 tracking-tight">
                                {doc.created_at ? format(new Date(doc.created_at), 'MMM dd, yyyy') : '--'}
                            </td>
                            <td className="px-10 py-7">
                              <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm ${statusStyles[doc.status] || 'bg-surface-container-high'}`}>
                                {doc.status}
                              </span>
                            </td>
                            <td className="px-10 py-7 text-right">
                              {doc.status === 'missing' ? (
                                <button 
                                  onClick={() => document.getElementById('vault-upload').click()}
                                  className="text-primary text-[10px] font-black uppercase tracking-widest underline decoration-2 underline-offset-4 hover:no-underline"
                                >
                                  Upload Now
                                </button>
                              ) : (
                                <div className="flex items-center justify-end gap-2">
                                  <button className="p-3 text-outline/40 hover:text-primary hover:bg-surface-container-low transition-all rounded-xl">
                                    <span className="material-symbols-outlined text-xl">download</span>
                                  </button>
                                  <button className="p-3 text-outline/40 hover:text-on-surface hover:bg-surface-container-low transition-all rounded-xl">
                                    <span className="material-symbols-outlined text-xl">more_vert</span>
                                  </button>
                                </div>
                              )}
                            </td>
                          </motion.tr>
                        )) : (
                            <tr>
                                <td colSpan="5" className="px-10 py-20 text-center">
                                    <div className="flex flex-col items-center gap-4 opacity-30">
                                        <span className="material-symbols-outlined text-5xl">folder_off</span>
                                        <p className="text-[10px] font-black uppercase tracking-widest">No documents found for this vault</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </AnimatePresence>
                  </tbody>
                </table>
             )}
          </div>

          {/* Pagination Mockup */}
          <div className="px-10 py-8 bg-white/50 backdrop-blur-md flex justify-between items-center border-t border-outline-variant/10">
            <p className="text-[11px] font-bold text-outline/50 tracking-tight">
                Showing <span className="text-on-surface font-black">{filteredDocuments.length}</span> documents
            </p>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-2xl border border-outline-variant/20 flex items-center justify-center text-outline/30 hover:bg-surface-container-low transition-all">
                <span className="material-symbols-outlined text-xl">chevron_left</span>
              </button>
              <button className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center font-black text-xs shadow-lg shadow-primary/20">1</button>
              <button className="w-10 h-10 rounded-2xl border border-outline-variant/20 flex items-center justify-center text-outline/30 hover:bg-surface-container-low transition-all">
                <span className="material-symbols-outlined text-xl">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {/* Security Audit Sidebar Card */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 pb-16">
          <div className="md:col-span-8 space-y-6">
            <h3 className="text-2xl font-[800] font-headline tracking-tighter text-on-surface">Vault Insights</h3>
            <div className="space-y-4">
              <div className="bg-surface-container-low/50 rounded-3xl p-6 flex items-center justify-between border border-transparent hover:border-primary/20 hover:bg-white transition-all shadow-sm group">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-white rounded-2xl shadow-authoritative flex items-center justify-center overflow-hidden shrink-0 group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-[800] font-headline text-on-surface leading-tight mb-1">Encrypted Intelligence</h4>
                    <p className="text-[10px] font-black uppercase tracking-widest text-outline/40">Decentralized storage active • Safe & Immutable</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-secondary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              </div>
            </div>
          </div>
          <div className="md:col-span-4 self-start">
            <div className="bg-on-background rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl transition-all hover:scale-[1.02] duration-500">
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-secondary mb-8 shadow-inner">
                  <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
                </div>
                <h4 className="text-2xl font-[800] font-headline tracking-tighter leading-tight mb-4">Vault Security Insight</h4>
                <p className="text-white/60 text-sm font-medium leading-relaxed mb-10">
                  Your documents are encrypted with AES-256 standard. Securely linked with institutional verification API.
                </p>
                <button className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all border border-white/10 shadow-xl">
                  View Audit Log
                </button>
              </div>
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/20 blur-[80px] rounded-full"></div>
            </div>
          </div>
        </section>
      </div>
    </SellerDashboardLayout>
  );
};

export default SellerDocuments;
