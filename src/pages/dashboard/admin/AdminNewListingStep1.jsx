/* src/pages/dashboard/admin/AdminNewListingStep1.jsx */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashboardLayout from '../../../components/dashboard/AdminDashboardLayout';
import SellerStepper from '../../../components/dashboard/seller/SellerStepper';
import { loadGoogleMaps } from '@/lib/googleMaps';
import { useNewListing } from '@/contexts/NewListingContext';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const AdminNewListingStep1 = () => {
  const navigate = useNavigate();
  const { listingData, updateListingData, submitListing, isSubmitting } = useNewListing();
  const mapRef = React.useRef(null);
  const autoCompleteRef = React.useRef(null);
  const [map, setMap] = React.useState(null);
  const [marker, setMarker] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateListingData({ [name]: value });
  };

  React.useEffect(() => {
    loadGoogleMaps(GOOGLE_MAPS_API_KEY).then(() => {
      // 1. Initialize Autocomplete
      const input = document.getElementById('location-input');
      if (input) {
        autoCompleteRef.current = new window.google.maps.places.Autocomplete(input, {
          fields: ['address_components', 'geometry', 'formatted_address'],
          componentRestrictions: { country: 'bw' } // Botswana
        });

        autoCompleteRef.current.addListener('place_changed', () => {
          const place = autoCompleteRef.current.getPlace();
          if (place.geometry) {
            updateListingData({ 
                location: place.formatted_address || '',
                latitude: place.geometry.location.lat(),
                longitude: place.geometry.location.lng()
            });
            updateMap(place.geometry.location);
          }
        });
      }

      // 2. Initialize Map (Gaborone default)
      if (!mapRef.current) return;
      const newMap = new window.google.maps.Map(mapRef.current, {
        center: defaultCenter,
        zoom: 13,
        styles: [
          {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [{"saturation": 36}, {"color": "#333333"}, {"lightness": 40}]
          },
          {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [{"visibility": "on"}, {"color": "#ffffff"}, {"lightness": 16}]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{"color": "#e9e9e9"}, {"lightness": 17}]
          }
        ],
        disableDefaultUI: true,
        zoomControl: true,
      });

      const newMarker = new window.google.maps.Marker({
        position: defaultCenter,
        map: newMap,
        draggable: true,
        animation: window.google.maps.Animation.DROP,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: "#2563eb",
          fillOpacity: 1,
          strokeWeight: 4,
          strokeColor: "#ffffff",
        }
      });

      setMap(newMap);
      setMarker(newMarker);
    });
  }, []);

  const updateMap = (location) => {
    if (map && marker) {
      map.setCenter(location);
      map.setZoom(16);
      marker.setPosition(location);
    }
  };

  const handleVerifyCoordinates = () => {
    setLoading(true);
    // Simulate verification
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <AdminDashboardLayout title="Create Authority Listing">
      <div className="max-w-4xl mx-auto">
        <SellerStepper currentStep={1} />

        <div className="bg-surface-container-lowest rounded-3xl shadow-authoritative border border-outline-variant/15 overflow-hidden">
          <div className="p-12">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-12 w-12 rounded-2xl bg-surface-container-low flex items-center justify-center text-primary group hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>location_city</span>
              </div>
              <div>
                <h3 className="text-2xl font-[800] text-on-surface font-headline leading-none">Basics & Location</h3>
                <p className="text-on-surface-variant text-sm mt-1 font-medium opacity-60">Establish the core identity of the property asset.</p>
              </div>
            </div>

            <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-60 ml-1 font-headline">Property Type</label>
                  <div className="relative">
                    <select 
                        name="property_type"
                        value={listingData.property_type}
                        onChange={handleChange}
                        className="w-full bg-surface-container-low border-none rounded-2xl py-5 px-6 focus:ring-2 focus:ring-primary/20 appearance-none text-sm font-bold text-on-surface cursor-pointer">
                      <option>Residential Multi-Family</option>
                      <option>Commercial Office</option>
                      <option>Industrial Warehouse</option>
                      <option>Retail Complex</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-outline/40" style={{ fontVariationSettings: "'FILL' 1" }}>expand_more</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-60 ml-1 font-headline">Target List Price (Pula)</label>
                  <div className="relative">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-outline/40 font-black text-xs">P</span>
                    <input 
                      name="price_pula"
                      value={listingData.price_pula}
                      onChange={handleChange}
                      className="w-full bg-surface-container-low border-none rounded-2xl py-5 pl-10 pr-6 focus:ring-2 focus:ring-primary/20 text-sm font-[800] text-on-surface placeholder:text-outline/20" 
                      placeholder="1,250,000" 
                      type="text"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-60 ml-1 font-headline">Listing Title</label>
                <input 
                  name="title"
                  value={listingData.title}
                  onChange={handleChange}
                  className="w-full bg-surface-container-low border-none rounded-2xl py-5 px-6 focus:ring-2 focus:ring-primary/20 text-sm font-bold text-on-surface placeholder:text-outline/20" 
                  placeholder="e.g. Prime Midtown Multi-Family Distressed Asset" 
                  type="text"
                />
              </div>

               <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-60 ml-1 font-headline">Property Location</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-outline/40" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                  <input 
                    id="location-input"
                    className="w-full bg-surface-container-low border-none rounded-2xl py-5 pl-14 pr-6 focus:ring-2 focus:ring-primary/20 text-sm font-bold text-on-surface placeholder:text-outline/20" 
                    placeholder="Search for address or coordinate mapping..." 
                    type="text"
                    onChange={(e) => updateListingData({ location: e.target.value })}
                    value={listingData.location}
                  />
                </div>
                {/* Real Google Map Container */}
                <div className="mt-6 rounded-3xl overflow-hidden h-56 relative border border-outline-variant/10 shadow-inner group">
                   <div ref={mapRef} className="w-full h-full bg-slate-100" />
                  <div className="absolute top-4 right-4 z-10">
                    <button 
                      onClick={handleVerifyCoordinates}
                      className={`bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-2xl border border-white flex items-center gap-3 hover:scale-105 transition-all pointer-events-auto ${loading ? 'opacity-50' : ''}`}
                    >
                      <div className={`w-2.5 h-2.5 rounded-full bg-primary ${loading ? 'animate-spin' : 'animate-pulse'} shadow-[0_0_10px_var(--primary)]`}></div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-on-surface leading-none">{loading ? 'VERIFYING...' : 'VERIFY COORDINATES'}</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-60 ml-1 font-headline">Brief Description</label>
                <textarea 
                  name="description"
                  value={listingData.description}
                  onChange={handleChange}
                  className="w-full bg-surface-container-low border-none rounded-2xl py-5 px-6 focus:ring-2 focus:ring-primary/20 text-sm font-bold text-on-surface placeholder:text-outline/30 resize-none min-h-[140px]" 
                  placeholder="Provide a concise intelligence summary of the property, including key distress factors..."
                  rows="4"
                ></textarea>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Persistent Flow Controls */}
      <div className="fixed bottom-0 left-0 lg:left-[260px] right-0 bg-white/90 backdrop-blur-xl px-4 lg:px-16 py-6 border-t border-outline-variant/10 z-50 transition-all duration-300">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => navigate('/admin/listings')}
            className="text-outline hover:text-primary font-black text-[10px] uppercase tracking-widest flex items-center gap-2 transition-colors px-4 py-2"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Cancel & Exit
          </button>
          <div className="flex items-center gap-4">
            <button 
                onClick={() => submitListing('pending')}
                disabled={isSubmitting}
                className="text-primary font-black text-[10px] uppercase tracking-[0.2em] px-8 py-3 rounded-full hover:bg-primary/5 transition-colors disabled:opacity-50">
              {isSubmitting ? 'Saving...' : 'Save as draft'}
            </button>
            <button 
              onClick={() => navigate('/admin/listings/new/step-2')}
              className="bg-primary text-white font-black text-[10px] uppercase tracking-[0.2em] px-10 py-4 rounded-full shadow-2xl shadow-primary/20 hover:scale-[1.03] active:scale-95 transition-all flex items-center gap-3"
            >
              Continue to Media
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminNewListingStep1;
