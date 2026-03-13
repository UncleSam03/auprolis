import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { 
  Loader2, Plus, Gavel, Users, Calendar, LogOut, Trash2, Edit, MapPin, DollarSign, Clock, CheckCircle
} from 'lucide-react';
import { format } from 'date-fns';
import { useInactivityLogout } from '@/hooks/useInactivityLogout';
import InactivityWarning from '@/components/InactivityWarning';

const AgentDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [properties, setProperties] = useState([]);
  const [stats, setStats] = useState({
    totalListings: 0,
    totalReservations: 0,
    upcomingAuctions: 0
  });
  const [currentUser, setCurrentUser] = useState(null);

  // Inactivity logout hook
  const { showWarning, remainingTime, handleStayLoggedIn, handleLogoutNow } = useInactivityLogout(!!currentUser);

  useEffect(() => {
    checkAgentAccess();
  }, []);

  const checkAgentAccess = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/signin');
        return;
      }

      setCurrentUser(session.user);

      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (error) throw error;

      if (!['sheriff', 'bank', 'admin'].includes(profileData.user_type)) {
        toast({
          variant: "destructive",
          title: "Access Denied",
          description: "This dashboard is restricted to authorized agents only.",
        });
        navigate('/dashboard');
        return;
      }

      setProfile(profileData);
      fetchAgentData(session.user.id);
      
      const channel = supabase.channel(`realtime:agent-${session.user.id}`)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'properties', filter: `seller_id=eq.${session.user.id}` }, 
        () => {
             fetchAgentData(session.user.id);
        })
        .subscribe();
        
      return () => supabase.removeChannel(channel);

    } catch (error) {
      console.error('Error verifying access:', error);
      navigate('/signin');
    }
  };

  const fetchAgentData = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select(`
          *,
          reservations (id)
        `)
        .eq('seller_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const processedProperties = data.map(prop => ({
        ...prop,
        reservationCount: prop.reservations ? prop.reservations.length : 0
      }));

      setProperties(processedProperties);

      const totalListings = processedProperties.length;
      const totalReservations = processedProperties.reduce((acc, curr) => acc + curr.reservationCount, 0);
      const upcomingAuctions = processedProperties.filter(p => p.auction_date && new Date(p.auction_date) > new Date()).length;

      setStats({ totalListings, totalReservations, upcomingAuctions });

    } catch (error) {
      console.error('Error fetching data:', error);
      toast({ variant: "destructive", title: "Error", description: "Failed to load dashboard data." });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProperty = async (propertyId) => {
    if(!window.confirm("Are you sure you want to remove this listing? This action cannot be undone.")) return;

    try {
      const { error } = await supabase.from('properties').delete().eq('id', propertyId);
      if (error) throw error;
      
      setProperties(prev => prev.filter(p => p.id !== propertyId));
      toast({ title: "Property Removed", description: "The listing has been successfully deleted." });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to delete property." });
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/signin');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-slate-900" />
      </div>
    );
  }

  return (
    <>
      <InactivityWarning 
        show={showWarning}
        remainingTime={remainingTime}
        onStayLoggedIn={handleStayLoggedIn}
        onLogoutNow={handleLogoutNow}
      />
      
      <div className="min-h-screen bg-slate-50 pb-20">
        <Helmet>
          <title>Agent Dashboard - Auprolis</title>
        </Helmet>

        <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center gap-3">
                <Gavel className="h-6 w-6 text-amber-500" />
                <div>
                  <span className="text-xl font-bold tracking-tight block leading-none">Auprolis</span>
                  <span className="text-xs text-slate-400 font-medium tracking-wider uppercase">Agent Portal</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden md:flex flex-col items-end mr-2">
                  <span className="text-sm font-medium">{profile?.name}</span>
                  <span className="text-xs text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full capitalize">{profile?.user_type}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-slate-300 hover:text-white hover:bg-slate-800">
                  <LogOut className="h-4 w-4 mr-2" /> Sign Out
                </Button>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                  <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
                  <p className="text-slate-500">Manage your auctions, track reservations, and list new assets.</p>
              </div>
              <Link to="/dashboard/properties/new">
                  <Button className="bg-amber-600 hover:bg-amber-700 text-white shadow-md">
                      <Plus className="mr-2 h-4 w-4" /> List New Auction
                  </Button>
              </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="border-l-4 border-l-blue-500 shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-slate-600">Active Listings</CardTitle>
                      <Gavel className="h-4 w-4 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                      <div className="text-2xl font-bold text-slate-900">{stats.totalListings}</div>
                  </CardContent>
              </Card>
              <Card className="border-l-4 border-l-amber-500 shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-slate-600">Total Reservations</CardTitle>
                      <Users className="h-4 w-4 text-amber-500" />
                  </CardHeader>
                  <CardContent>
                      <div className="text-2xl font-bold text-slate-900">{stats.totalReservations}</div>
                  </CardContent>
              </Card>
              <Card className="border-l-4 border-l-green-500 shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-slate-600">Upcoming Auctions</CardTitle>
                      <Calendar className="h-4 w-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                      <div className="text-2xl font-bold text-slate-900">{stats.upcomingAuctions}</div>
                  </CardContent>
              </Card>
          </div>

          <Card className="shadow-sm border-slate-200">
              <CardHeader>
                  <CardTitle>My Auction Listings</CardTitle>
                  <CardDescription>View and manage all properties you have listed for auction.</CardDescription>
              </CardHeader>
              <CardContent>
                  {properties.length === 0 ? (
                      <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-lg">
                          <Gavel className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                          <h3 className="text-lg font-medium text-slate-900">No properties listed</h3>
                          <Link to="/dashboard/properties/new">
                              <Button variant="outline" className="mt-4">Create Listing</Button>
                          </Link>
                      </div>
                  ) : (
                      <div className="space-y-4">
                          {properties.map((property) => (
                              <div key={property.id} className="flex flex-col lg:flex-row bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                                  <div className="w-full lg:w-48 h-48 lg:h-auto bg-slate-100 flex-shrink-0 relative">
                                      {property.images && property.images.length > 0 ? (
                                          <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
                                      ) : (
                                          <div className="w-full h-full flex items-center justify-center text-slate-400">
                                              <span className="text-sm">No Image</span>
                                          </div>
                                      )}
                                      <div className="absolute top-2 left-2 flex flex-col gap-1">
                                          <Badge className="bg-white/90 text-slate-800 hover:bg-white backdrop-blur shadow-sm">
                                              {property.type}
                                          </Badge>
                                          <Badge 
                                              variant={property.status === 'approved' ? 'success' : 'outline'} 
                                              className={`shadow-sm ${property.status === 'pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' : ''}`}
                                          >
                                              {property.status === 'approved' && <CheckCircle className="w-3 h-3 mr-1" />}
                                              {property.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                                              {property.status || 'Pending'}
                                          </Badge>
                                      </div>
                                  </div>

                                  <div className="flex-1 p-6 flex flex-col justify-between">
                                      <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                                          <div>
                                              <h3 className="text-lg font-bold text-slate-900 mb-1">{property.title}</h3>
                                              <div className="flex items-center text-slate-500 text-sm mb-2">
                                                  <MapPin className="w-4 h-4 mr-1" /> {property.location}
                                              </div>
                                              <div className="flex items-center text-slate-900 font-semibold">
                                                  <DollarSign className="w-4 h-4 mr-1 text-green-600" />
                                                  {property.price ? property.price.toLocaleString() : 'Not Set'} <span className="text-xs text-slate-400 font-normal ml-1"> (BWP)</span>
                                              </div>
                                          </div>
                                          
                                          <div className="flex flex-col items-start md:items-end gap-2">
                                              <div className="flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium border border-blue-100">
                                                  <Users className="w-4 h-4 mr-2" />
                                                  {property.reservationCount} Reservations
                                              </div>
                                              {property.auction_date && (
                                                  <div className="flex items-center text-xs text-slate-500">
                                                      <Calendar className="w-3 h-3 mr-1" />
                                                      Auction: {format(new Date(property.auction_date), 'PPP p')}
                                                  </div>
                                              )}
                                          </div>
                                      </div>

                                      <div className="pt-4 border-t border-slate-100 flex justify-between items-center mt-auto">
                                          <div className="text-xs text-slate-400">
                                              Listed on {format(new Date(property.created_at), 'MMM d, yyyy')}
                                          </div>
                                          <div className="flex gap-2">
                                              <Button size="sm" variant="outline" onClick={() => navigate(`/dashboard/properties/edit/${property.id}`)}>
                                                  <Edit className="w-4 h-4 mr-2" /> Edit
                                              </Button>
                                              <Button size="sm" variant="destructive" onClick={() => handleDeleteProperty(property.id)}>
                                                  <Trash2 className="w-4 h-4 mr-2" /> Remove
                                              </Button>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          ))}
                      </div>
                  )}
              </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AgentDashboard;