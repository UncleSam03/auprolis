import React, { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, ArrowLeft, Upload, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { loadGoogleMaps } from '@/lib/googleMaps';

const GOOGLE_MAPS_API_KEY = "AIzaSyC3VcZh-50x8BYjzqWdduRaBOTIEnPRpXs";

const PropertyForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMapsLoaded, setIsMapsLoaded] = useState(false);
  
  const mapRef = useRef(null);
  const searchInputRef = useRef(null);
  const googleMapInstance = useRef(null);
  const markerInstance = useRef(null);
  const autocompleteInstance = useRef(null);
  
  const [formData, setFormData] = useState({
    title: '',
    location: '', // acts as address string
    latitude: null,
    longitude: null,
    price: '',
    type: 'Residential',
    condition: 'Good',
    auction_date: '',
    description: '',
    images: [],
    status: 'pending'
  });

  // Default center (Gaborone, Botswana)
  const defaultCenter = { lat: -24.6282, lng: 25.9231 };

  useEffect(() => {
    checkUserRole();
    if (id) {
      fetchProperty();
    }
    
    loadGoogleMaps(GOOGLE_MAPS_API_KEY).then(() => {
      setIsMapsLoaded(true);
    }).catch(err => {
      console.error("Failed to load Google Maps", err);
      toast({ variant: "destructive", description: "Could not load Google Maps" });
    });
  }, [id]);

  // Initialize Map and Autocomplete once API is loaded
  useEffect(() => {
    if (isMapsLoaded && mapRef.current && !googleMapInstance.current) {
      initMap();
    }
  }, [isMapsLoaded]);

  // Update map when formData loads (editing mode)
  useEffect(() => {
    if (isMapsLoaded && googleMapInstance.current && formData.latitude && formData.longitude) {
      const pos = { lat: formData.latitude, lng: formData.longitude };
      googleMapInstance.current.setCenter(pos);
      updateMarker(pos);
    }
  }, [formData.latitude, formData.longitude, isMapsLoaded]);

  const initMap = () => {
    const google = window.google;
    
    // Create Map
    googleMapInstance.current = new google.maps.Map(mapRef.current, {
      center: defaultCenter,
      zoom: 13,
      mapId: "DEMO_MAP_ID" // Required for AdvancedMarkerElement if used, safe to include string
    });

    // Create Marker
    markerInstance.current = new google.maps.Marker({
      position: defaultCenter,
      map: googleMapInstance.current,
      draggable: true,
      title: "Property Location"
    });

    // Handle Marker Drag
    markerInstance.current.addListener('dragend', (event) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setFormData(prev => ({ ...prev, latitude: lat, longitude: lng }));
      
      // Reverse geocode to update address string (optional, keeps UI in sync)
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === "OK" && results[0]) {
           setFormData(prev => ({ ...prev, location: results[0].formatted_address }));
        }
      });
    });

    // Click map to move marker
    googleMapInstance.current.addListener('click', (event) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      updateMarker({ lat, lng });
      setFormData(prev => ({ ...prev, latitude: lat, longitude: lng }));
    });

    // Init Autocomplete
    if (searchInputRef.current) {
      autocompleteInstance.current = new google.maps.places.Autocomplete(searchInputRef.current, {
        fields: ["formatted_address", "geometry", "name"],
      });

      autocompleteInstance.current.addListener("place_changed", () => {
        const place = autocompleteInstance.current.getPlace();
        
        if (!place.geometry || !place.geometry.location) {
          toast({ description: "No details available for input: '" + place.name + "'" });
          return;
        }

        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const address = place.formatted_address || place.name;

        // Update state
        setFormData(prev => ({ 
          ...prev, 
          location: address,
          latitude: lat, 
          longitude: lng 
        }));

        // Update Map View
        if (place.geometry.viewport) {
          googleMapInstance.current.fitBounds(place.geometry.viewport);
        } else {
          googleMapInstance.current.setCenter(place.geometry.location);
          googleMapInstance.current.setZoom(17);
        }

        updateMarker(place.geometry.location);
      });
    }
  };

  const updateMarker = (location) => {
    if (markerInstance.current) {
      markerInstance.current.setPosition(location);
    }
  };

  const checkUserRole = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
       const { data: profile } = await supabase.from('profiles').select('user_type').eq('id', session.user.id).single();
       if (profile?.user_type === 'admin') {
         setIsAdmin(true);
       }
    }
  };

  const fetchProperty = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      setFormData({
        title: data.title,
        location: data.location,
        latitude: data.latitude,
        longitude: data.longitude,
        price: data.price || '',
        type: data.type,
        condition: data.condition,
        auction_date: data.auction_date ? new Date(data.auction_date).toISOString().slice(0, 16) : '',
        description: data.description,
        images: data.images || [],
        status: data.status || 'pending'
      });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to load property details." });
      navigate('/dashboard');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      let statusToSave = formData.status;
      if (!id) statusToSave = isAdmin ? 'approved' : 'pending';

      const imagesToSave = formData.images.length > 0 ? formData.images : ['https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3'];

      const propertyData = {
        title: formData.title,
        location: formData.location,
        latitude: formData.latitude,
        longitude: formData.longitude,
        price: formData.price ? parseFloat(formData.price) : 0,
        type: formData.type,
        condition: formData.condition,
        auction_date: formData.auction_date ? new Date(formData.auction_date).toISOString() : null,
        description: formData.description,
        images: imagesToSave,
        seller_id: user.id,
        status: statusToSave
      };

      if (id) {
        const { error } = await supabase.from('properties').update(propertyData).eq('id', id);
        if (error) throw error;
        toast({ title: "Success", description: "Property updated successfully." });
      } else {
        const { error } = await supabase.from('properties').insert([propertyData]);
        if (error) throw error;
        toast({ title: isAdmin ? "Success" : "Submitted", description: isAdmin ? "Property listed and approved." : "Your listing is pending admin approval." });
      }
      
      if (isAdmin) navigate('/admin');
      else navigate('/agent-dashboard');

    } catch (error) {
      console.error(error);
      toast({ variant: "destructive", title: "Error", description: error.message || "Failed to save property." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Helmet>
        <title>{id ? 'Edit Property' : 'Add Property'} - Auprolis</title>
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)} className="flex items-center text-gray-500 hover:text-gray-900 pl-0">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{id ? 'Edit Property Details' : 'List New Auction Property'}</CardTitle>
            <CardDescription>
              Drag the pin to fine-tune the exact location for buyers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Property Title</Label>
                  <Input id="title" name="title" value={formData.title} onChange={handleChange} required placeholder="e.g. Seized Asset - 4 Bedroom House" />
                </div>
                
                {/* Google Maps Location Section */}
                <div className="space-y-2">
                  <Label htmlFor="location">Address / Location Search</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      ref={searchInputRef}
                      id="location" 
                      name="location" 
                      value={formData.location} 
                      onChange={handleChange} 
                      required 
                      placeholder="Search for a street, area, or landmark..." 
                      className="pl-10"
                    />
                  </div>
                  <div className="text-xs text-gray-500">Start typing to search Google Maps</div>
                  
                  {/* The Map Container */}
                  <div className="mt-2 h-[300px] w-full rounded-md border border-gray-200 overflow-hidden relative bg-gray-100">
                     {!isMapsLoaded && <div className="absolute inset-0 flex items-center justify-center text-gray-400">Loading Maps...</div>}
                     <div ref={mapRef} className="w-full h-full" />
                  </div>
                  <div className="flex gap-4 text-xs text-gray-400">
                    <span>Lat: {formData.latitude?.toFixed(6) || 'N/A'}</span>
                    <span>Lng: {formData.longitude?.toFixed(6) || 'N/A'}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                  <Label htmlFor="price">Starting Bid / Reserve Price (BWP)</Label>
                  <Input id="price" name="price" type="number" min="0" value={formData.price} onChange={handleChange} required placeholder="e.g. 1500000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Property Type</Label>
                  <select 
                    id="type" name="type" 
                    value={formData.type} 
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Land">Land</option>
                    <option value="Industrial">Industrial</option>
                    <option value="Vehicle">Vehicle</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                  <Label htmlFor="condition">Condition</Label>
                  <select 
                    id="condition" name="condition" 
                    value={formData.condition} 
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                    <option value="Poor">Poor</option>
                    <option value="Distressed">Distressed</option>
                  </select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="auction_date">Auction Date & Time</Label>
                    <Input 
                    id="auction_date" 
                    name="auction_date" 
                    type="datetime-local" 
                    value={formData.auction_date} 
                    onChange={handleChange} 
                    />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description & Legal Notices</Label>
                <textarea
                  id="description"
                  name="description"
                  rows={5}
                  value={formData.description}
                  onChange={handleChange}
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Describe the property, auction terms, and viewing details..."
                />
              </div>

              <div className="space-y-2">
                <Label>Images</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => toast({description: "Image upload is simulated. A default image will be used."})}>
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">Click to upload property images</p>
                  <p className="text-xs text-gray-500">(Feature currently simulated)</p>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
                <Button type="submit" disabled={isLoading} className="bg-[#2563eb] hover:bg-[#1d4ed8]">
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {id ? 'Update Property' : 'List Property'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PropertyForm;