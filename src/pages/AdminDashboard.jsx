import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShieldAlert, LogOut, Loader2, Search, UserCheck, UserX, User, Mail, Building2, Gavel } from 'lucide-react';
import { useProperties } from '@/hooks/useProperties'; 
import { useInactivityLogout } from '@/hooks/useInactivityLogout';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import InactivityWarning from '@/components/InactivityWarning';
import PropertyCard from '@/components/PropertyCard';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, profile, signOut } = useAuth();
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [userSearch, setUserSearch] = useState('');
  
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
    await signOut();
    navigate('/signin');
  };

  const handleUpdatePropertyStatus = async (id, newStatus) => {
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

  const handleUpdateUserStatus = async (userId, newStatus) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ status: newStatus })
        .eq('id', userId);
      
      if (error) throw error;
      toast({ title: "User Updated", description: `User status set to ${newStatus}.` });
      fetchUsers();
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

  const filteredUsers = users.filter(u => 
    u.email?.toLowerCase().includes(userSearch.toLowerCase()) || 
    u.name?.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.institution?.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <>
      <InactivityWarning 
        show={showWarning}
        remainingTime={remainingTime}
        onStayLoggedIn={handleStayLoggedIn}
        onLogoutNow={handleLogoutNow}
      />
      
      <div className="min-h-screen bg-slate-50 pb-20 font-sans">
        <Helmet><title>Admin Dashboard - Auprolis</title></Helmet>

        <nav className="bg-slate-900 text-white shadow-xl sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
             <div className="flex items-center gap-3">
                <ShieldAlert className="text-red-500 h-6 w-6" /> 
                <div className="flex flex-col">
                  <span className="font-black text-xl tracking-tighter leading-none uppercase">Admin Console</span>
                  <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">System Control</span>
                </div>
             </div>
             <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-slate-300 hover:text-white hover:bg-white/10">
               <LogOut className="mr-2 h-4 w-4" /> Sign Out
             </Button>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 py-8">
           <Tabs defaultValue="all" className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <TabsList className="bg-slate-200/50 p-1 rounded-xl">
                <TabsTrigger value="all" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm px-6 font-bold text-xs uppercase tracking-wider">Listings ({properties.length})</TabsTrigger>
                <TabsTrigger value="users" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm px-6 font-bold text-xs uppercase tracking-wider">Users ({users.length})</TabsTrigger>
              </TabsList>
              
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="font-bold text-xs tracking-wider uppercase border-2" onClick={() => navigate('/add-property')}>
                  <Gavel className="mr-2 h-4 w-4" /> Add Property
                </Button>
              </div>
            </div>

            <TabsContent value="all" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
               <Card className="border-none shadow-sm bg-white overflow-hidden rounded-2xl">
                  <CardHeader className="bg-slate-50/50 border-b border-slate-100">
                     <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <CardTitle className="text-xl font-black text-slate-900 tracking-tight">System Listings</CardTitle>
                          <CardDescription className="text-xs font-medium">Verify and manage all property listings across the platform.</CardDescription>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                           <div className="relative">
                              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                              <Input 
                                placeholder="Search listings..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 h-9 w-full sm:w-[250px] border-slate-200 rounded-lg text-xs font-medium"
                              />
                           </div>
                           <Tabs defaultValue="all" value={statusFilter} onValueChange={setStatusFilter} className="w-full sm:w-auto">
                              <TabsList className="grid grid-cols-3 h-9 p-1 bg-slate-100 rounded-lg">
                                 <TabsTrigger value="all" className="text-[10px] uppercase font-bold px-3">All</TabsTrigger>
                                 <TabsTrigger value="pending" className="text-[10px] uppercase font-bold px-3">Pending</TabsTrigger>
                                 <TabsTrigger value="approved" className="text-[10px] uppercase font-bold px-3">Live</TabsTrigger>
                              </TabsList>
                           </Tabs>
                        </div>
                     </div>
                  </CardHeader>
                  <CardContent className="p-6">
                     {propertiesLoading && properties.length === 0 ? (
                        <div className="flex justify-center py-20"><Loader2 className="animate-spin h-10 w-10 text-slate-300" /></div>
                     ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                           {properties.map(prop => (
                              <div key={prop.id} className="relative group border border-slate-100 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all duration-300">
                                 <PropertyCard property={prop} subscriptionType={displayTier} />
                                 <div className="p-3 bg-slate-50/80 border-t flex flex-wrap gap-2 justify-between items-center">
                                    <div className="flex gap-1.5">
                                       {prop.status === 'pending' && (
                                          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 font-bold text-[10px] uppercase tracking-wider px-3 h-8 shadow-sm" onClick={() => handleUpdatePropertyStatus(prop.id, 'approved')}>
                                            <UserCheck className="h-3 w-3 mr-1.5" /> Approve
                                          </Button>
                                       )}
                                       {prop.status === 'approved' && (
                                          <Button size="sm" variant="outline" className="text-amber-600 border-amber-200 hover:bg-amber-50 font-bold text-[10px] uppercase tracking-wider px-3 h-8 bg-white" onClick={() => handleUpdatePropertyStatus(prop.id, 'pending')}>
                                            <Clock className="h-3 w-3 mr-1.5" /> Suspend
                                          </Button>
                                       )}
                                       <Button size="sm" variant="ghost" className="hover:bg-slate-200 font-bold text-[10px] uppercase tracking-wider h-8" onClick={() => navigate(`/dashboard/properties/edit/${prop.id}`)}>
                                         Edit
                                       </Button>
                                    </div>
                                    <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 rounded-lg" onClick={() => handleDeleteProperty(prop.id)}>
                                      <UserX className="h-3.5 w-3.5" />
                                    </Button>
                                 </div>
                              </div>
                           ))}
                           {properties.length === 0 && (
                              <div className="col-span-full py-20 text-center flex flex-col items-center">
                                <Search className="h-12 w-12 text-slate-200 mb-4" />
                                <h3 className="text-slate-400 font-bold uppercase tracking-widest text-sm">No matching listings found</h3>
                              </div>
                           )}
                        </div>
                     )}
                  </CardContent>
               </Card>
            </TabsContent>

             <TabsContent value="users" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <Card className="border-none shadow-sm bg-white overflow-hidden rounded-2xl">
                   <CardHeader className="bg-slate-50/50 border-b border-slate-100">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <CardTitle className="text-xl font-black text-slate-900 tracking-tight">User Directory</CardTitle>
                          <CardDescription className="text-xs font-medium">Manage user accounts and approve agent applications.</CardDescription>
                        </div>
                        <div className="relative">
                           <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                           <Input 
                             placeholder="Search users, institutions..." 
                             value={userSearch}
                             onChange={(e) => setUserSearch(e.target.value)}
                             className="pl-10 h-9 w-full sm:w-[300px] border-slate-200 rounded-lg text-xs font-medium"
                           />
                        </div>
                      </div>
                   </CardHeader>
                   <CardContent className="p-0">
                      {usersLoading ? (
                        <div className="flex justify-center py-20"><Loader2 className="animate-spin h-10 w-10 text-slate-300" /></div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">User Details</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Account Type</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Status</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                               {filteredUsers.map(u => (
                                  <tr key={u.id} className="hover:bg-slate-50/30 transition-colors">
                                     <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                          <div className="h-9 w-9 rounded-full bg-[#2563eb]/10 flex items-center justify-center text-[#2563eb]">
                                            <User className="h-5 w-5" />
                                          </div>
                                          <div>
                                            <div className="font-bold text-slate-900 text-sm leading-none mb-1">{u.name || 'Anonymous User'}</div>
                                            <div className="flex items-center text-[10px] text-slate-400 font-medium tracking-tight">
                                              <Mail className="h-3 w-3 mr-1" /> {u.email}
                                            </div>
                                          </div>
                                        </div>
                                     </td>
                                     <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                          <Badge variant="outline" className={`w-fit text-[10px] font-bold uppercase border-none px-1.5 py-0 ${
                                            u.user_type === 'admin' ? 'bg-red-50 text-red-600' : 
                                            u.user_type === 'seller' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                                          }`}>
                                            {u.user_type}
                                          </Badge>
                                          {u.institution && (
                                            <span className="text-[10px] text-slate-500 font-medium flex items-center">
                                              <Building2 className="h-3 w-3 mr-1" /> {u.institution}
                                            </span>
                                          )}
                                        </div>
                                     </td>
                                     <td className="px-6 py-4">
                                        <Badge className={`text-[10px] font-bold uppercase px-2 py-0.5 border-none shadow-none ${
                                          u.status === 'active' ? 'bg-emerald-500/10 text-emerald-600' : 
                                          u.status === 'pending' ? 'bg-amber-500/10 text-amber-600' : 'bg-red-500/10 text-red-600'
                                        }`}>
                                          {u.status || 'Active'}
                                        </Badge>
                                     </td>
                                     <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                           {u.status === 'pending' && (
                                              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 h-8 font-bold text-[10px] uppercase px-3" onClick={() => handleUpdateUserStatus(u.id, 'active')}>
                                                Approve
                                              </Button>
                                           )}
                                           {u.status === 'active' && u.user_type !== 'admin' && (
                                              <Button size="sm" variant="ghost" className="text-amber-600 hover:bg-amber-50 h-8 font-bold text-[10px] uppercase px-3 border border-amber-200" onClick={() => handleUpdateUserStatus(u.id, 'suspended')}>
                                                Suspend
                                              </Button>
                                           )}
                                           {u.status === 'suspended' && (
                                              <Button size="sm" variant="ghost" className="text-emerald-600 hover:bg-emerald-50 h-8 font-bold text-[10px] uppercase px-3 border border-emerald-200" onClick={() => handleUpdateUserStatus(u.id, 'active')}>
                                                Reactivate
                                              </Button>
                                           )}
                                        </div>
                                     </td>
                                  </tr>
                               ))}
                               {filteredUsers.length === 0 && (
                                  <tr>
                                    <td colSpan={4} className="py-20 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">No users found</td>
                                  </tr>
                               )}
                            </tbody>
                          </table>
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