import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, Gavel, Search, Bell, Filter, 
  Heart, MessageSquare, LogOut, Map as MapIcon, List,
  BarChart2, ShieldCheck, Crown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { usePropertyData } from '@/hooks/usePropertyData'; 
import PropertyCard from '@/components/PropertyCard';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { loadGoogleMaps } from '@/lib/googleMaps';
import { useInactivityLogout } from '@/hooks/useInactivityLogout';
import InactivityWarning from '@/components/InactivityWarning';

const GOOGLE_MAPS_API_KEY = "AIzaSyC3VcZh-50x8BYjzqWdduRaBOTIEnPRpXs";

const PremiumDashboard = ({ user, profile }) => {
  const { properties, loading } = usePropertyData();
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState('list');
  const mapRef = useRef(null);
  const [isMapsLoaded, setIsMapsLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Explicitly using subscription type from profile, but forcing 'pro' view for this component as per instructions
  // Task 5: Update PremiumDashboard to display ... with Pro tier filtering
  const displayTier = 'pro'; 

  // Inactivity logout hook
  const { showWarning, remainingTime, handleStayLoggedIn, handleLogoutNow } = useInactivityLogout(!!user);

  useEffect(() => {
    loadGoogleMaps(GOOGLE_MAPS_API_KEY).then(() => setIsMapsLoaded(true));
  }, []);

  useEffect(() => {
    if (viewMode === 'map' && isMapsLoaded && mapRef.current && properties.length > 0) {
      const google = window.google;
      const defaultCenter = { lat: -24.6282, lng: 25.9231 };
      const map = new google.maps.Map(mapRef.current, { center: defaultCenter, zoom: 12 });
      // Map logic (simplified for static data)
    }
  }, [viewMode, isMapsLoaded, properties]);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/signin');
    } catch (error) {
      toast({ variant: "destructive", description: "Error signing out." });
    }
  };

  const filteredProperties = properties.filter(prop => 
    prop.listing_title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prop.property_type?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <InactivityWarning 
        show={showWarning}
        remainingTime={remainingTime}
        onStayLoggedIn={handleStayLoggedIn}
        onLogoutNow={handleLogoutNow}
      />
      
      <div className="flex h-screen bg-slate-50 overflow-hidden">
        {/* Sidebar (simplified) */}
        <div className="w-64 bg-slate-900 text-slate-300 hidden md:flex flex-col">
          <div className="p-6 border-b border-slate-800">
            <div className="flex items-center gap-2 text-white font-bold text-xl">
               <Gavel className="h-6 w-6 text-amber-500" /> Auprolis 
               <Badge className="ml-2 uppercase text-[10px] bg-amber-500">PRO</Badge>
            </div>
          </div>
          <nav className="flex-1 p-4 space-y-1">
             <Button variant="ghost" className="w-full justify-start text-white bg-slate-800"><Home className="mr-3 h-5 w-5" /> Dashboard</Button>
          </nav>
          <div className="p-4 border-t border-slate-800">
             <Button variant="ghost" className="w-full justify-start text-red-400" onClick={handleSignOut}>
               <LogOut className="mr-3 h-4 w-4" /> Sign Out
             </Button>
          </div>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm z-10">
             <h1 className="text-xl font-bold text-slate-800">Premium Dashboard</h1>
             <div className="flex items-center gap-4">
                <div className="relative hidden sm:block">
                   <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                   <Input 
                      placeholder="Search..." 
                      className="pl-9 w-64 bg-slate-100" 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                   />
                </div>
             </div>
          </header>

          <div className="flex-1 overflow-y-auto p-6 flex flex-col">
             {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{[1,2,3].map(i => <div key={i} className="h-72 bg-slate-100 rounded-xl animate-pulse"/>)}</div>
             ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProperties.map((prop, idx) => (
                      <motion.div 
                        key={prop.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                         {/* Task 5: Display with Pro tier filtering */}
                         <PropertyCard property={prop} subscriptionType={displayTier} />
                      </motion.div>
                    ))}
                </div>
             )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PremiumDashboard;