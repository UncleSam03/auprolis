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
import { useProperties } from '@/hooks/useProperties'; 
import { useInactivityLogout } from '@/hooks/useInactivityLogout';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import InactivityWarning from '@/components/InactivityWarning';
import PropertyCard from '@/components/PropertyCard';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, profile } = useAuth();
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const displayTier = profile?.subscription_type || 'enterprise';

  const { properties, loading: propertiesLoading, refresh: refreshProperties } = useProperties({ 
    searchQuery, 
    status: statusFilter 
  });
  
  const { showWarning, remainingTime, handleStayLoggedIn, handleLogoutNow } = useInactivityLogout(!!user);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setUsersLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({ variant: "destructive", title: "User error", description: "Failed to load user directory." });
    } finally {
      setUsersLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/signin');
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const { error } = await supabase
        .from('properties')
        .update({ status: newStatus })
        .eq('id', id);
      
      if (error) throw error;
      toast({ title: "Status Updated", description: `Property is now ${newStatus}.` });
      refreshProperties();
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    }
  };

  const handleDeleteProperty = async (id) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;
    
    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      toast({ title: "Property Deleted", description: "The listing has been removed." });
      refreshProperties();
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: error.message });
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
              <TabsTrigger value="all">Listings ({properties.length})</TabsTrigger>
              <TabsTrigger value="users">Users ({users.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
               <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                     <CardTitle>Properties for Review</CardTitle>
                     <Button size="sm" onClick={() => navigate('/add-property')}>Add Property</Button>
                  </CardHeader>
                  <CardContent>
                     <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="flex-1 relative">
                           <Input 
                             placeholder="Search by title, case number, or location..." 
                             value={searchQuery}
                             onChange={(e) => setSearchQuery(e.target.value)}
                             className="pl-10"
                           />
                           <Loader2 className={`absolute left-3 top-3 h-4 w-4 text-slate-400 ${propertiesLoading ? 'animate-spin' : ''}`} />
                        </div>
                        <Tabs defaultValue="all" value={statusFilter} onValueChange={setStatusFilter} className="w-full md:w-auto">
                           <TabsList className="grid grid-cols-3 w-full">
                              <TabsTrigger value="all">All</TabsTrigger>
                              <TabsTrigger value="pending">Pending</TabsTrigger>
                              <TabsTrigger value="approved">Approved</TabsTrigger>
                           </TabsList>
                        </Tabs>
                     </div>

                     {propertiesLoading && properties.length === 0 ? (
                        <div className="flex justify-center py-12"><Loader2 className="animate-spin h-8 w-8 text-slate-400" /></div>
                     ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                           {properties.map(prop => (
                              <div key={prop.id} className="relative group border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                                 <PropertyCard property={prop} subscriptionType={displayTier} />
                                 <div className="p-4 bg-slate-50 border-t flex flex-wrap gap-2 justify-between items-center">
                                    <div className="flex gap-2">
                                       {prop.status === 'pending' && (
                                          <Button size="sm" className="bg-green-600 hover:bg-green-700 font-medium" onClick={() => handleUpdateStatus(prop.id, 'approved')}>Approve</Button>
                                       )}
                                       {prop.status === 'approved' && (
                                          <Button size="sm" variant="outline" className="text-amber-600 border-amber-200 hover:bg-amber-50" onClick={() => handleUpdateStatus(prop.id, 'pending')}>Mark Pending</Button>
                                       )}
                                       <Button size="sm" variant="ghost" className="hover:bg-slate-200" onClick={() => navigate(`/dashboard/properties/edit/${prop.id}`)}>Edit</Button>
                                    </div>
                                    <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => handleDeleteProperty(prop.id)}>Delete</Button>
                                 </div>
                              </div>
                           ))}
                           {properties.length === 0 && (
                              <div className="col-span-full py-12 text-center text-slate-500">No properties found matching your criteria.</div>
                           )}
                        </div>
                     )}
                  </CardContent>
               </Card>
            </TabsContent>

             <TabsContent value="users">
                <Card>
                   <CardHeader><CardTitle>User Directory</CardTitle></CardHeader>
                   <CardContent>
                      {usersLoading ? (
                        <div className="flex justify-center py-12"><Loader2 className="animate-spin h-8 w-8 text-slate-400" /></div>
                      ) : (
                        <div className="divide-y">
                           {users.map(u => (
                              <div key={u.id} className="py-2 flex justify-between">
                                 <div>
                                    <div className="font-medium">{u.name || u.email}</div>
                                    <div className="text-xs text-slate-500">{u.email}</div>
                                 </div>
                                 <div className="flex gap-2">
                                    <Badge variant="outline">{u.role}</Badge>
                                    <Badge variant="secondary">{u.subscription_type}</Badge>
                                 </div>
                              </div>
                           ))}
                        </div>
                      )}
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