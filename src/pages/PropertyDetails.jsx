import React, { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import { Loader2, ArrowLeft, MapPin, Calendar, CheckCircle, Gavel, Eye, Users, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { loadGoogleMaps } from '@/lib/googleMaps';
import PropertyDisclaimer from '@/components/PropertyDisclaimer';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAttending, setIsAttending] = useState(false);
  const [rsvpLoading, setRsvpLoading] = useState(false);
  const mapRef = useRef(null);
  const [isStale, setIsStale] = useState(false);
  const [isMapsLoaded, setIsMapsLoaded] = useState(false);

  useEffect(() => {
    fetchProperty();
    incrementViews();
    checkIfAttending();
    loadGoogleMaps(GOOGLE_MAPS_API_KEY).then(() => setIsMapsLoaded(true));

    const channel = supabase.channel(`public:properties:id=${id}`)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'properties', filter: `id=eq.${id}` }, 
        (payload) => {
          setProperty(prev => ({...prev, ...payload.new}));
          setIsStale(false);
        })
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          setIsStale(false);
        } else if (status === 'CLOSED' || status === 'CHANNEL_ERROR') {
          setIsStale(true);
        }
      });
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, [id, user]);

  const incrementViews = async () => {
    try {
      await supabase.rpc('increment_property_views', { property_id: id });
    } catch (err) {
      console.error('Error incrementing views:', err);
    }
  };

  const checkIfAttending = async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from('property_attendees')
        .select('*')
        .eq('user_id', user.id)
        .eq('property_id', id)
        .maybeSingle();
      
      if (data) setIsAttending(true);
    } catch (err) {
      console.error('Error checking RSVP status:', err);
    }
  };

  const toggleRSVP = async () => {
    if (!user) {
      alert('Please sign in to RSVP for this auction.');
      navigate('/signin');
      return;
    }

    try {
      setRsvpLoading(true);
      const { data, error } = await supabase.rpc('toggle_property_rsvp', { property_id_param: id });
      
      if (error) throw error;
      setIsAttending(data);
      // Property data will update via realtime channel
    } catch (err) {
      console.error('Error toggling RSVP:', err);
      alert('Failed to update RSVP. Please try again.');
    } finally {
      setRsvpLoading(false);
    }
  };

  useEffect(() => {
    if (isMapsLoaded && mapRef.current && property && property.latitude && property.longitude) {
      const google = window.google;
      const location = { lat: property.latitude, lng: property.longitude };
      
      const map = new google.maps.Map(mapRef.current, {
        center: location,
        zoom: 15,
      });
      
      new google.maps.Marker({
        position: location,
        map: map,
        title: property.title
      });
    }
  }, [isMapsLoaded, property]);

  const fetchProperty = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*, profiles:seller_id(name, phone)')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      setProperty(data);
    } catch (error) {
      console.error(error);
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;
  if (!property) return <div>Property not found</div>;

  return (
    <div className="min-h-screen bg-white">
       <Helmet>
         <title>{property.title} | Auprolis</title>
       </Helmet>
       
       {/* Simple Navbar */}
       <div className="border-b p-4">
         <div className="max-w-7xl mx-auto flex items-center">
            <Button variant="ghost" onClick={() => navigate(-1)}><ArrowLeft className="mr-2 h-4 w-4"/> Back to Dashboard</Button>
         </div>
       </div>

       <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <div className="grid lg:grid-cols-2 gap-8">
             {/* Left Column: Images and Info */}
             <div className="space-y-6">
                <div className="rounded-xl overflow-hidden aspect-video bg-gray-100">
                   <img src={property.images?.[0] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa'} alt={property.title} className="w-full h-full object-cover" />
                </div>
                
                <div>
                   <div className="flex justify-between items-start mb-4">
                      <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
                      <Badge className="text-lg bg-blue-600">{property.type}</Badge>
                   </div>
                   <div className="flex items-center text-gray-600 mb-6">
                      <MapPin className="h-5 w-5 mr-2" />
                      {property.location}
                   </div>
                   
                    <div className="prose max-w-none text-gray-700 mb-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                      <p>{property.description || "No detailed description provided."}</p>
                    </div>

                    {property.sheriff_information && (
                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
                        <div className="flex items-center gap-2 mb-3 text-amber-800">
                          <Gavel className="h-5 w-5" />
                          <h3 className="font-bold uppercase tracking-wider text-sm">Sheriff / Auction Information</h3>
                        </div>
                        <p className="text-amber-900 text-sm leading-relaxed whitespace-pre-wrap">
                          {property.sheriff_information}
                        </p>
                      </div>
                    )}

                    {/* Property Disclaimer */}
                    <PropertyDisclaimer />
                </div>
             </div>

             {/* Right Column: Bid Info & Map */}
             <div className="space-y-6">
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                   <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Current Status</h3>
                   <div className="flex flex-col gap-2 mb-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Active Auction</Badge>
                        <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">Verify Required</Badge>
                      </div>
                      {isStale && (
                        <div className="flex items-center text-xs text-red-500 bg-red-50 p-2 rounded border border-red-100 mt-2">
                           ⚠️ Live connection lost. Prices may not be up to date.
                        </div>
                      )}
                   </div>
                   
                   <div className="mb-6">
                      <p className="text-sm text-gray-500">Starting Bid</p>
                      <p className="text-4xl font-bold text-blue-600">P{property.price_usd ? property.price_usd.toLocaleString('en-BW', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}</p>
                   </div>

                    <div className="flex flex-col gap-3 mb-6">
                      <Button className="w-full size-lg text-lg bg-blue-600 hover:bg-blue-700 h-12">
                        <Gavel className="mr-2 h-5 w-5" /> Place Bid
                      </Button>
                      
                      <Button 
                        variant={isAttending ? "outline" : "default"}
                        onClick={toggleRSVP}
                        disabled={rsvpLoading}
                        className={`w-full size-lg text-lg h-12 ${isAttending ? 'border-green-600 text-green-600 hover:bg-green-50' : 'bg-slate-900 hover:bg-slate-800'}`}
                      >
                        {rsvpLoading ? (
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        ) : isAttending ? (
                          <CheckCircle className="mr-2 h-5 w-5" />
                        ) : (
                          <Bell className="mr-2 h-5 w-5" />
                        )}
                        {isAttending ? "Attending Auction" : "Notify Me / RSVP"}
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                       <div className="flex items-center gap-2 text-gray-500 text-sm bg-white p-3 rounded-lg border border-slate-100">
                         <Eye className="h-4 w-4" />
                         <span className="font-bold text-gray-900">{property.views_count || 0}</span>
                         <span>Views</span>
                       </div>
                       <div className="flex items-center gap-2 text-gray-500 text-sm bg-white p-3 rounded-lg border border-slate-100">
                         <Users className="h-4 w-4" />
                         <span className="font-bold text-gray-900">{property.attendees_count || 0}</span>
                         <span>Going</span>
                       </div>
                    </div>

                   {/* Trust Bar */}
                   <div className="flex items-center justify-center gap-4 py-3 border-t border-slate-200 text-xs text-slate-500">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                        <span>Secure Transaction</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-blue-500 mr-1" />
                        <span>Skillbridge Africa Verified</span>
                      </div>
                   </div>
                </div>

                {/* Map Section */}
                <div className="rounded-xl overflow-hidden border border-gray-200 h-[400px] relative bg-gray-100">
                   {(!property.latitude || !property.longitude) ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                         <MapPin className="h-10 w-10 mb-2 opacity-20" />
                         <p>No precise location data provided</p>
                      </div>
                   ) : (
                      <div ref={mapRef} className="w-full h-full" />
                   )}
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

export default PropertyDetails;