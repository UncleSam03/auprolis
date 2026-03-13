import React, { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import { Loader2, ArrowLeft, MapPin, Calendar, CheckCircle, Gavel } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { loadGoogleMaps } from '@/lib/googleMaps';
import PropertyDisclaimer from '@/components/PropertyDisclaimer'; // New import

const GOOGLE_MAPS_API_KEY = "AIzaSyC3VcZh-50x8BYjzqWdduRaBOTIEnPRpXs";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef(null);
  const [isMapsLoaded, setIsMapsLoaded] = useState(false);

  useEffect(() => {
    fetchProperty();
    loadGoogleMaps(GOOGLE_MAPS_API_KEY).then(() => setIsMapsLoaded(true));
  }, [id]);

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
        .select('*, profiles:seller_id(name, email, phone)')
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
                   
                   <div className="prose max-w-none text-gray-700">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                      <p>{property.description || "No detailed description provided."}</p>
                   </div>
                   {/* Property Disclaimer */}
                   <PropertyDisclaimer />
                </div>
             </div>

             {/* Right Column: Bid Info & Map */}
             <div className="space-y-6">
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                   <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Current Status</h3>
                   <div className="flex items-center gap-2 mb-4">
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Active Auction</Badge>
                      <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">Verify Required</Badge>
                   </div>
                   
                   <div className="mb-6">
                      <p className="text-sm text-gray-500">Starting Bid</p>
                      <p className="text-4xl font-bold text-blue-600">P{property.price?.toLocaleString()}</p>
                   </div>

                   <Button className="w-full size-lg text-lg bg-slate-900 hover:bg-slate-800">
                     <Gavel className="mr-2 h-5 w-5" /> Place Bid
                   </Button>
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