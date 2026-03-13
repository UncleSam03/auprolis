import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShieldAlert, LogOut, Loader2 } from 'lucide-react';
import { usePropertyData } from '@/hooks/usePropertyData'; 
import { useInactivityLogout } from '@/hooks/useInactivityLogout';
import InactivityWarning from '@/components/InactivityWarning';
import PropertyCard from '@/components/PropertyCard';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = useState(null);
  
  // Task 8: Update AdminDashboard to display with Enterprise tier filtering
  const displayTier = 'enterprise';

  const { properties } = usePropertyData();
  
  // Mock users for display
  const users = [
    { id: 1, name: 'Admin User', email: 'admin@example.com', user_type: 'admin', subscription_type: 'enterprise' },
    { id: 2, name: 'Basic User', email: 'user@example.com', user_type: 'buyer', subscription_type: 'basic' }
  ];

  const { showWarning, remainingTime, handleStayLoggedIn, handleLogoutNow } = useInactivityLogout(!!currentUser);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/signin');
  };

  return (
    <>
      <InactivityWarning 
        show={showWarning}
        remainingTime={remainingTime}
        onStayLoggedIn={handleStayLoggedIn}
        onLogoutNow={handleLogoutNow}
      />
      
      <div className="min-h-screen bg-slate-100 pb-20">
        <Helmet><title>Admin Dashboard - Auprolis</title></Helmet>

        <nav className="bg-slate-900 text-white shadow-md sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
             <div className="flex items-center gap-2 font-bold text-xl"><ShieldAlert className="text-red-500" /> Admin Console</div>
             <Button variant="ghost" size="sm" onClick={handleSignOut}><LogOut className="mr-2 h-4 w-4" /> Sign Out</Button>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 py-8">
           <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Listings (Static)</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
               <Card>
                  <CardHeader className="flex flex-row justify-between">
                     <CardTitle>Global Listings Review</CardTitle>
                  </CardHeader>
                  <CardContent>
                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {properties.map(prop => (
                           <div key={prop.id}>
                              <PropertyCard property={prop} subscriptionType={displayTier} />
                           </div>
                        ))}
                     </div>
                  </CardContent>
               </Card>
            </TabsContent>

             <TabsContent value="users">
                <Card>
                   <CardHeader><CardTitle>User Directory</CardTitle></CardHeader>
                   <CardContent>
                      <div className="divide-y">
                         {users.map(u => (
                            <div key={u.id} className="py-2 flex justify-between">
                               <div>
                                  <div className="font-medium">{u.name}</div>
                                  <div className="text-xs text-slate-500">{u.email}</div>
                               </div>
                               <div className="flex gap-2">
                                  <Badge variant="outline">{u.user_type}</Badge>
                                  <Badge>{u.subscription_type}</Badge>
                               </div>
                            </div>
                         ))}
                      </div>
                   </CardContent>
                </Card>
             </TabsContent>
           </Tabs>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;