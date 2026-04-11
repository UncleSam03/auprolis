import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import SellerDashboardLayout from '../../../components/dashboard/SellerDashboardLayout';
import { Loader2, Save, Trash2, ArrowLeft, Info } from 'lucide-react';

const SellerListingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price_usd: 0,
    description: '',
    type: '',
    sheriff_information: '',
    status: 'Draft'
  });

  useEffect(() => {
    if (id) {
      fetchProperty();
    }
  }, [id]);

  const fetchProperty = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      if (data) {
        setProperty(data);
        setFormData({
          title: data.title || '',
          location: data.location || '',
          price_usd: data.price_usd || 0,
          description: data.description || '',
          type: data.type || '',
          sheriff_information: data.sheriff_information || '',
          status: data.status || 'Draft'
        });
      }
    } catch (err) {
      console.error('Error fetching property:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const { error } = await supabase
        .from('properties')
        .update({
          title: formData.title,
          location: formData.location,
          price_usd: formData.price_usd,
          description: formData.description,
          type: formData.type,
          sheriff_information: formData.sheriff_information,
          status: formData.status
        })
        .eq('id', id);

      if (error) throw error;
      alert('Listing updated successfully!');
    } catch (err) {
      console.error('Error updating listing:', err);
      alert('Failed to update listing: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <SellerDashboardLayout title="Edit Listing">
        <div className="py-20 flex justify-center items-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      </SellerDashboardLayout>
    );
  }

  if (!property) return <div className="p-10 text-center">Property not found.</div>;

  return (
    <SellerDashboardLayout title={`Edit Listing ${id || ''}`}>
      <div className="max-w-[1440px] mx-auto">
        {/* Status Banner */}
        <div className="mb-12 flex flex-col md:flex-row items-center justify-between bg-amber-50 border border-amber-200/50 p-8 rounded-3xl shadow-sm">
          <div className="flex items-center gap-6 mb-6 md:mb-0">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 shadow-inner">
              <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>{formData.status === 'Active' || formData.status === 'Live' ? 'check_circle' : 'pending_actions'}</span>
            </div>
            <div>
              <h3 className="font-[800] text-on-surface font-headline text-lg leading-none mb-2 tracking-tight">{formData.status}</h3>
              <p className="text-sm text-on-surface-variant font-medium opacity-70 max-w-xl">
                {formData.status === 'Pending' 
                  ? "Your listing is currently being verified by our compliance team. Expected window: 24-48 hours."
                  : "Listing is currently " + formData.status.toLowerCase() + ". You can manage its visibility and details here."}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => navigate('/seller/listings')}
              className="px-8 py-3 text-[10px] font-black uppercase tracking-widest text-on-surface-variant hover:bg-surface-container-low rounded-full transition-all"
            >
              Back to List
            </button>
            <button className="px-8 py-3 text-[10px] font-black uppercase tracking-widest bg-white border border-outline-variant/30 text-primary rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all">Preview Live</button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-10 items-start">
          {/* Left Column: Media Gallery */}
          <div className="col-span-12 lg:col-span-4 lg:sticky lg:top-24 space-y-8">
            <div className="aspect-[4/5] bg-surface-container-low rounded-[2.5rem] overflow-hidden group relative shadow-authoritative border-4 border-white">
              <img 
                alt="Property Main View" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800"
              />
              <div className="absolute inset-0 bg-on-surface/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                <button className="bg-white/95 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl hover:scale-110 transition-transform">Replace Hero</button>
              </div>
              <div className="absolute bottom-6 left-6 bg-primary text-white text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-2xl">Primary Cover</div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {[1, 2].map((i) => (
                <div key={i} className="aspect-square bg-surface-container-low rounded-2xl overflow-hidden cursor-pointer hover:ring-4 hover:ring-primary/20 transition-all shadow-sm group">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    src={`https://images.unsplash.com/photo-1600${500+i}5154340?auto=format&fit=crop&q=80&w=200`} 
                  />
                </div>
              ))}
              <div className="aspect-square bg-surface-container-low rounded-2xl flex items-center justify-center border-2 border-dashed border-outline-variant/30 text-outline/30 cursor-pointer hover:bg-white hover:text-primary transition-all shadow-inner group">
                <span className="material-symbols-outlined text-4xl group-hover:scale-110 transition-transform" data-icon="add_a_photo">add_a_photo</span>
              </div>
            </div>

            <div className="bg-surface-container-low/50 p-8 rounded-[2rem] space-y-6 shadow-inner border border-outline-variant/5">
              <h4 className="font-headline font-black text-[10px] text-on-surface uppercase tracking-[0.2em] opacity-40">Property Analytics</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl shadow-sm">
                  <p className="text-[10px] font-black text-outline uppercase tracking-widest mb-1">Total Views</p>
                  <p className="text-2xl font-black text-on-surface">{(property.views_count || 0).toLocaleString()}</p>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm">
                  <p className="text-[10px] font-black text-outline uppercase tracking-widest mb-1">Total RSVPs</p>
                  <p className="text-2xl font-black text-primary">{(property.attendees_count || 0).toLocaleString()}</p>
                </div>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed font-medium opacity-60 italic text-center">Engagement is healthy. Consider adding more photos to boost views.</p>
            </div>
          </div>

          {/* Right Column: Editable Fields */}
          <div className="col-span-12 lg:col-span-8 space-y-10">
            <section className="bg-surface-container-lowest rounded-[2.5rem] p-12 shadow-authoritative border border-outline-variant/5 group">
              <div className="flex items-center gap-5 mb-10">
                <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>edit_note</span>
                </div>
                <h2 className="font-headline text-3xl font-[800] text-on-surface tracking-tighter leading-none">Listing Information</h2>
              </div>
              <div className="grid grid-cols-1 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-outline/60 ml-1">Listing Title</label>
                  <input 
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full bg-surface-container-low border-none rounded-2xl py-5 px-6 focus:ring-2 focus:ring-primary/20 transition-all font-bold text-on-surface" 
                    type="text" 
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-outline/60 ml-1">Property Location / Address</label>
                  <input 
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full bg-surface-container-low border-none rounded-2xl py-5 px-6 focus:ring-2 focus:ring-primary/20 transition-all font-bold text-on-surface" 
                    type="text" 
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-outline/60 ml-1">Starting Price (P)</label>
                  <input 
                    name="price_usd"
                    value={formData.price_usd}
                    onChange={handleChange}
                    className="w-full bg-surface-container-low border-none rounded-2xl py-5 px-6 focus:ring-2 focus:ring-primary/20 transition-all font-bold text-on-surface font-headline text-xl" 
                    type="number" 
                  />
                </div>
              </div>
            </section>

            {/* Section: Sheriff Information */}
            <section className="bg-surface-container-lowest rounded-[2.5rem] p-12 shadow-authoritative border border-outline-variant/5 group">
              <div className="flex items-center gap-5 mb-10">
                <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>gavel</span>
                </div>
                <div className="flex-1">
                  <h2 className="font-headline text-3xl font-[800] text-on-surface tracking-tighter leading-none">Sheriff/Seller Information</h2>
                  <p className="text-xs text-on-surface-variant mt-2 font-medium">Add important auction-specific details, terms, or contact information for the sheriff.</p>
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-outline/60 ml-1">Sheriff's Note / Auction Details</label>
                <textarea 
                  name="sheriff_information"
                  value={formData.sheriff_information}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Insert any legal references, auctioneer comments, or specific viewing instructions here..."
                  className="w-full bg-surface-container-low border-none rounded-3xl py-6 px-6 focus:ring-2 focus:ring-secondary/20 transition-all font-medium text-on-surface leading-loose"
                />
              </div>
            </section>

            {/* Section: Specs */}
            <section className="bg-surface-container-lowest rounded-[2.5rem] p-12 shadow-authoritative border border-outline-variant/5 group">
              <div className="flex items-center gap-5 mb-10">
                <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>square_foot</span>
                </div>
                <h2 className="font-headline text-3xl font-[800] text-on-surface tracking-tighter leading-none">Core Specifications</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-outline/60 ml-1">Bedrooms</label>
                  <input className="w-full bg-surface-container-low border-none rounded-2xl py-5 px-6 focus:ring-2 focus:ring-primary/20 transition-all font-black text-on-surface" type="number" defaultValue="4" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-outline/60 ml-1">Bathrooms</label>
                  <input className="w-full bg-surface-container-low border-none rounded-2xl py-5 px-6 focus:ring-2 focus:ring-primary/20 transition-all font-black text-on-surface" type="number" step="0.5" defaultValue="3.5" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-outline/60 ml-1">Living Area (SQFT)</label>
                  <input className="w-full bg-surface-container-low border-none rounded-2xl py-5 px-6 focus:ring-2 focus:ring-primary/20 transition-all font-black text-on-surface" type="text" defaultValue="3,250" />
                </div>
                <div className="md:col-span-3 space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-outline/60 ml-1">Property Type</label>
                  <select className="w-full bg-surface-container-low border-none rounded-2xl py-5 px-6 focus:ring-2 focus:ring-primary/20 transition-all font-bold text-on-surface appearance-none cursor-pointer">
                    <option>Single Family Residential</option>
                    <option>Condominium</option>
                    <option>Multi-Family</option>
                    <option>Townhouse</option>
                  </select>
                </div>
              </div>
            </section>

            <div className="flex items-center justify-end gap-6 pt-10 pb-20">
              <button 
                onClick={() => navigate('/seller/listings')}
                disabled={saving}
                className="px-10 py-4 text-[11px] font-black uppercase tracking-widest text-on-surface-variant hover:bg-surface-container-low rounded-full transition-all disabled:opacity-50"
              >
                Cancel Changes
              </button>
              <button 
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-3 px-14 py-5 bg-gradient-to-br from-primary to-primary-container text-white rounded-full font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 hover:scale-[1.03] active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {saving ? 'Updating...' : 'Save & Resubmit'}
              </button>
            </div>

            {/* Danger Zone */}
            <section className="bg-red-50/50 border border-red-200/50 p-10 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-8 group">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center text-red-600 shadow-inner group-hover:rotate-12 transition-transform">
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>dangerous</span>
                </div>
                <div>
                  <h3 className="font-headline font-black text-red-900 leading-none mb-2">Danger Zone</h3>
                  <p className="text-xs text-red-700/60 font-medium">Archiving this listing will remove it from all active search results and history.</p>
                </div>
              </div>
              <button className="px-10 py-4 bg-white text-red-600 border border-red-200 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-sm">
                Archive Listing
              </button>
            </section>
          </div>
        </div>
      </div>
    </SellerDashboardLayout>
  );
};

export default SellerListingDetail;
