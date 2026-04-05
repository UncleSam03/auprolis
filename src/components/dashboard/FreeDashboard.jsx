import React from 'react';
import { motion } from 'framer-motion';
import { Lock, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { usePropertyData } from '@/hooks/usePropertyData';
import PropertyCard from '@/components/PropertyCard';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useNavigate } from 'react-router-dom';
import { useInactivityLogout } from '@/hooks/useInactivityLogout';
import InactivityWarning from '@/components/InactivityWarning';

const FreeDashboard = ({ onUpgrade }) => {
  const { toast } = useToast();
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  
  // Use the new hook
  const { properties, loading } = usePropertyData();

  // Inactivity logout hook
  const { showWarning, remainingTime, handleStayLoggedIn, handleLogoutNow } = useInactivityLogout(!!user);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/signin');
      toast({ description: "Successfully signed out." });
    } catch (error) {
      toast({ variant: "destructive", description: "Error signing out." });
    }
  };

  return (
    <>
      <InactivityWarning 
        show={showWarning}
        remainingTime={remainingTime}
        onStayLoggedIn={handleStayLoggedIn}
        onLogoutNow={handleLogoutNow}
      />
      
      <div className="space-y-8 p-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
            <div className="flex items-center gap-2 mt-1">
               <Badge variant="outline" className="bg-gray-100 text-gray-600 border-gray-300 capitalize">
                 Current Plan: Free
               </Badge>
               <span className="text-sm text-gray-500">Upgrade to unlock more</span>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={handleSignOut}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-6 flex flex-col justify-between shadow-sm">
             <div>
               <h2 className="text-xl font-bold text-[#2563eb] mb-2">Upgrade to Basic</h2>
               <p className="text-gray-600 text-sm mb-4">
                 Get full access to all listings, email notifications, and save up to 10 favorites.
               </p>
               <p className="font-bold text-lg text-slate-900 mb-4">P150 / month</p>
             </div>
             <Button onClick={() => onUpgrade('Basic')} className="w-full bg-[#2563eb] hover:bg-[#1d4ed8]">
               Get Basic Plan
             </Button>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 rounded-xl p-6 flex flex-col justify-between shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 bg-amber-500 text-white text-xs px-2 py-1 rounded-bl">Recommended</div>
             <div>
               <h2 className="text-xl font-bold text-amber-700 mb-2">Go Pro</h2>
               <p className="text-gray-600 text-sm mb-4">
                 Unlock advanced filters, document verification, and direct messaging with sellers.
               </p>
               <p className="font-bold text-lg text-slate-900 mb-4">P300 / month</p>
             </div>
             <Button onClick={() => onUpgrade('Pro')} className="w-full bg-amber-600 hover:bg-amber-700 text-white">
               Get Pro Plan
             </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">Preview Properties</h3>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
             <div className="flex">
               <div className="flex-shrink-0">
                 <Lock className="h-5 w-5 text-yellow-400" />
               </div>
               <div className="ml-3">
                 <p className="text-sm text-yellow-700">
                   You are viewing Basic information. <button onClick={() => onUpgrade('Pro')} className="font-medium underline hover:text-yellow-600">Upgrade to Pro</button> to view detailed specs.
                 </p>
               </div>
             </div>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-80 bg-gray-100 rounded-lg animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((prop, idx) => (
                <motion.div 
                  key={prop.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  {/* Task 4: Display with Basic tier filtering */}
                  <PropertyCard property={prop} subscriptionType="basic" />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FreeDashboard;