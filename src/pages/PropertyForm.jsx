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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
    case_number: '',
    listing_type: 'Sale', // Sale, Auction, Rental
    location: '', 
    latitude: null,
    longitude: null,
    price: '',
    type: 'Residential',
    condition: 'Good',
    auction_date: '',
    auction_time: '',
    auction_venue: '',
    address_lot_number: '',
    size_m2: '',
    title_deed_number: '',
    bedrooms: '',
    description: '',
    terms_of_sale: '',
    seller_contact_entity: '',
    contact_numbers: '',
    attorney: '',
    plaintiff: '',
    defendant_owner: '',
    notice_date: '',
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
        case_number: data.case_number || '',
        listing_type: data.listing_type || 'Sale',
        location: data.location,
        latitude: data.latitude,
        longitude: data.longitude,
        price: data.price || '',
        type: data.type,
        condition: data.condition,
        auction_date: data.auction_date ? new Date(data.auction_date).toISOString().split('T')[0] : '',
        auction_time: data.auction_time || '',
        auction_venue: data.auction_venue || '',
        address_lot_number: data.address_lot_number || '',
        size_m2: data.size_m2 || '',
        title_deed_number: data.title_deed_number || '',
        bedrooms: data.bedrooms || '',
        description: data.description,
        terms_of_sale: data.terms_of_sale || '',
        seller_contact_entity: data.seller_contact_entity || '',
        contact_numbers: data.contact_numbers || '',
        attorney: data.attorney || '',
        plaintiff: data.plaintiff || '',
        defendant_owner: data.defendant_owner || '',
        notice_date: data.notice_date || '',
        images: data.images || [],
        status: data.status || 'pending'
      });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to load property details." });
      navigate('/dashboard');
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setIsLoading(true);
    const uploadedUrls = [];

    try {
      for (const file of files) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        const filePath = `properties/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('property-images')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('property-images')
          .getPublicUrl(filePath);

        uploadedUrls.push(publicUrl);
      }

      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls]
      }));

      toast({ title: "Images uploaded", description: `${uploadedUrls.length} images successfully uploaded.` });
    } catch (error) {
      console.error('Upload error:', error);
      toast({ variant: "destructive", title: "Upload Failed", description: error.message || "Failed to upload images." });
    } finally {
      setIsLoading(false);
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

      const propertyData = {
        title: formData.title,
        case_number: formData.case_number,
        listing_type: formData.listing_type,
        location: formData.location,
        latitude: formData.latitude,
        longitude: formData.longitude,
        price: formData.price ? parseFloat(formData.price) : 0,
        type: formData.type,
        condition: formData.condition,
        auction_date: formData.auction_date || null,
        auction_time: formData.auction_time || null,
        auction_venue: formData.auction_venue || null,
        address_lot_number: formData.address_lot_number || null,
        size_m2: formData.size_m2 || null,
        title_deed_number: formData.title_deed_number || null,
        bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : null,
        description: formData.description,
        terms_of_sale: formData.terms_of_sale || null,
        seller_contact_entity: formData.seller_contact_entity || null,
        contact_numbers: formData.contact_numbers || null,
        attorney: formData.attorney || null,
        plaintiff: formData.plaintiff || null,
        defendant_owner: formData.defendant_owner || null,
        notice_date: formData.notice_date || null,
        images: formData.images,
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
            <form onSubmit={handleSubmit} className="space-y-8">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="basic">1. Basic Info</TabsTrigger>
                  <TabsTrigger value="legal">2. Legal & Auction</TabsTrigger>
                  <TabsTrigger value="media">3. Media & Description</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Property Title</Label>
                      <Input id="title" name="title" value={formData.title} onChange={handleChange} required placeholder="e.g. Seized Asset - 4 Bedroom House" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="listing_type">Listing Type</Label>
                      <select 
                        id="listing_type" name="listing_type" 
                        value={formData.listing_type} 
                        onChange={handleChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      >
                        <option value="Sale">Sale</option>
                        <option value="Auction">Auction</option>
                        <option value="Rental">Rental</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <div className="space-y-2">
                      <Label htmlFor="price">Price / Reserve (USD)</Label>
                      <Input id="price" name="price" type="number" min="0" value={formData.price} onChange={handleChange} required placeholder="e.g. 150000" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Property Type</Label>
                      <select 
                        id="type" name="type" 
                        value={formData.type} 
                        onChange={handleChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      >
                        <option value="Residential">Residential</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Land">Land</option>
                        <option value="Industrial">Industrial</option>
                        <option value="Vehicle">Vehicle</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                       <Label htmlFor="size_m2">Size (m²)</Label>
                       <Input id="size_m2" name="size_m2" value={formData.size_m2} onChange={handleChange} placeholder="e.g. 320m2" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
                    <div className="space-y-2">
                      <Label htmlFor="bedrooms">Bedrooms</Label>
                      <Input id="bedrooms" name="bedrooms" type="number" value={formData.bedrooms} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="condition">Condition</Label>
                      <select 
                        id="condition" name="condition" 
                        value={formData.condition} 
                        onChange={handleChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      >
                        <option value="Excellent">Excellent</option>
                        <option value="Good">Good</option>
                        <option value="Fair">Fair</option>
                        <option value="Poor">Poor</option>
                        <option value="Distressed">Distressed</option>
                        <option value="Developed Property">Developed Property</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t">
                    <Label htmlFor="location">Google Maps Address</Label>
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
                    
                    <div className="mt-2 h-[300px] w-full rounded-md border border-gray-200 overflow-hidden relative bg-gray-100 shadow-inner">
                       {!isMapsLoaded && <div className="absolute inset-0 flex items-center justify-center text-gray-400">Loading Maps...</div>}
                       <div ref={mapRef} className="w-full h-full" />
                    </div>
                    <div className="flex gap-4 text-[10px] text-gray-400 font-mono">
                      <span>LAT: {formData.latitude?.toFixed(6) || 'N/A'}</span>
                      <span>LNG: {formData.longitude?.toFixed(6) || 'N/A'}</span>
                      <span className="ml-auto italic">Drag pin to calibrate exact location</span>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="legal" className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="case_number">Case Number</Label>
                      <Input id="case_number" name="case_number" value={formData.case_number} onChange={handleChange} placeholder="e.g. CVHGB-002250-22" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title_deed_number">Title Deed Number</Label>
                      <Input id="title_deed_number" name="title_deed_number" value={formData.title_deed_number} onChange={handleChange} placeholder="Deed of Transfer No. 1118/2019" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
                    <div className="space-y-2">
                      <Label htmlFor="auction_date">Auction Date</Label>
                      <Input id="auction_date" name="auction_date" type="date" value={formData.auction_date} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="auction_time">Auction Time</Label>
                      <Input id="auction_time" name="auction_time" type="time" value={formData.auction_time} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="auction_venue">Auction Venue</Label>
                    <Input id="auction_venue" name="auction_venue" value={formData.auction_venue} onChange={handleChange} placeholder="e.g. On-Site: Lot 59217" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
                    <div className="space-y-2">
                      <Label htmlFor="plaintiff">Plaintiff</Label>
                      <Input id="plaintiff" name="plaintiff" value={formData.plaintiff} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="defendant_owner">Defendant / Owner</Label>
                      <Input id="defendant_owner" name="defendant_owner" value={formData.defendant_owner} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="attorney">Attorney</Label>
                    <Input id="attorney" name="attorney" value={formData.attorney} onChange={handleChange} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
                    <div className="space-y-2">
                      <Label htmlFor="seller_contact_entity">Deputy Sheriff / Contact</Label>
                      <Input id="seller_contact_entity" name="seller_contact_entity" value={formData.seller_contact_entity} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact_numbers">Contact Numbers</Label>
                      <Input id="contact_numbers" name="contact_numbers" value={formData.contact_numbers} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="terms_of_sale">Terms of Sale</Label>
                    <Input id="terms_of_sale" name="terms_of_sale" value={formData.terms_of_sale} onChange={handleChange} placeholder="e.g. Bank transfer (EFT), 10% deposit" />
                  </div>
                </TabsContent>

                <TabsContent value="media" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <div className="space-y-2">
                    <Label htmlFor="description">Full Property Description</Label>
                    <textarea
                      id="description"
                      name="description"
                      rows={8}
                      value={formData.description}
                      onChange={handleChange}
                      className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 transition-all"
                      placeholder="Provide detailed information about the property, its features, and any other relevant auction details..."
                    />
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <Label>Property Images</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      {formData.images.map((img, index) => (
                        <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 border group shadow-sm">
                          <img src={img} alt={`Property ${index}`} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                          <button 
                            type="button" 
                            onClick={() => setFormData(prev => ({...prev, images: prev.images.filter((_, i) => i !== index)}))}
                            className="absolute top-2 right-2 bg-red-500/80 backdrop-blur-sm text-white rounded-full p-1.5 hover:bg-red-600 shadow-md transition-all scale-0 group-hover:scale-100"
                          >
                            <ShieldAlert className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    <label className="border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-xl p-8 text-center hover:bg-blue-50/50 transition-all cursor-pointer block group">
                      <div className="mx-auto h-12 w-12 text-gray-400 group-hover:text-blue-500 group-hover:bounce transition-all"><Upload /></div>
                      <p className="mt-3 text-sm font-medium text-gray-700">Click to upload property images</p>
                      <p className="text-xs text-gray-500 mt-1">Professional high-res photos recommended (JPG, PNG, WebP)</p>
                      <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-between items-center pt-8 border-t gap-4">
                <p className="text-xs text-muted-foreground max-w-[200px]">
                  Fields marked with * are required for public listing.
                </p>
                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={() => navigate(-1)} className="px-8">Cancel</Button>
                  <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 px-10 shadow-lg shadow-blue-200">
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {id ? 'Save Changes' : 'Publish Listing'}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PropertyForm;