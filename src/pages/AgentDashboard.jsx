import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { 
  Loader2, Plus, Gavel, Users, Calendar, LogOut, Trash2, Edit, MapPin, DollarSign, Clock, CheckCircle, Home
} from 'lucide-react';
import { format } from 'date-fns';
import { useInactivityLogout } from '@/hooks/useInactivityLogout';
import InactivityWarning from '@/components/InactivityWarning';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useProperties } from '@/hooks/useProperties';

const AgentDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, profile, loading: authLoading, signOut } = useAuth();
  
  // Inactivity logout hook
  const { showWarning, remainingTime, handleStayLoggedIn, handleLogoutNow } = useInactivityLogout(!!user);

  // Fetch properties for this agent
  const { properties, loading: propertiesLoading, refresh } = useProperties({ 
    sellerId: user?.id,
    enabled: !!user?.id 
  });

  // Calculate stats
  const stats = useMemo(() => {
    const totalListings = properties.length;
    const totalReservations = properties.reduce((acc, curr) => acc + (curr.reservations?.length || 0), 0);
    const upcomingAuctions = properties.filter(p => p.auction_date && new Date(p.auction_date) > new Date()).length;
    
    return { totalListings, totalReservations, upcomingAuctions };
  }, [properties]);

  const handleDeleteProperty = async (propertyId) => {
    if(!window.confirm("Are you sure you want to remove this listing? This action cannot be undone.")) return;

    try {
      const { error } = await supabase.from('properties').delete().eq('id', propertyId);
      if (error) throw error;
      
      toast({ title: "Property Removed", description: "The listing has been successfully deleted." });
      refresh();
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to delete property." });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/signin');
  };

  if (authLoading || (propertiesLoading && properties.length === 0)) {
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
      
      <div className="min-h-screen bg-slate-50 pb-20 font-sans">
        <Helmet>
          <title>Agent Dashboard - Auprolis</title>
        </Helmet>

        <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center gap-3">
                <Gavel className="h-6 w-6 text-amber-500" />
                <div>
                  <span className="text-xl font-extrabold tracking-tight block leading-none">AUPROLIS</span>
                  <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase mt-0.5">AGENT PORTAL</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden md:flex flex-col items-end mr-2">
                  <span className="text-sm font-semibold">{profile?.name || user?.email}</span>
                  <Badge variant="outline" className="text-[10px] h-4 border-amber-500/50 text-amber-500 uppercase px-1.5">{profile?.user_type || 'Agent'}</Badge>
                </div>
                <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-slate-300 hover:text-white hover:bg-white/10 transition-colors">
                  <LogOut className="h-4 w-4 mr-2" /> Sign Out
                </Button>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                  <h1 className="text-3xl font-black text-slate-900 tracking-tight">Dashboard</h1>
                  <p className="text-slate-500 text-sm font-medium">Manage your auctions, track reservations, and list new assets.</p>
              </div>
              <Link to="/dashboard/properties/new">
                  <Button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white shadow-lg shadow-blue-200 border-none px-6 font-bold transition-all hover:scale-105 active:scale-95">
                      <Plus className="mr-2 h-5 w-5 stroke-[3px]" /> LIST NEW PROPERTY
                  </Button>
              </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <Card className="border-none shadow-sm bg-white overflow-hidden group hover:shadow-md transition-shadow">
                  <div className="h-1 w-full bg-blue-500"></div>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Listings</CardTitle>
                      <Gavel className="h-5 w-5 text-blue-500 transition-transform group-hover:scale-110" />
                  </CardHeader>
                  <CardContent>
                      <div className="text-3xl font-black text-slate-900">{stats.totalListings}</div>
                      <p className="text-[10px] text-slate-400 mt-1 font-medium italic">Properties currently on market</p>
                  </CardContent>
              </Card>
              <Card className="border-none shadow-sm bg-white overflow-hidden group hover:shadow-md transition-shadow">
                  <div className="h-1 w-full bg-amber-500"></div>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Reservations</CardTitle>
                      <Users className="h-5 w-5 text-amber-500 transition-transform group-hover:scale-110" />
                  </CardHeader>
                  <CardContent>
                      <div className="text-3xl font-black text-slate-900">{stats.totalReservations}</div>
                      <p className="text-[10px] text-slate-400 mt-1 font-medium italic">Interested buyers found</p>
                  </CardContent>
              </Card>
              <Card className="border-none shadow-sm bg-white overflow-hidden group hover:shadow-md transition-shadow">
                  <div className="h-1 w-full bg-emerald-500"></div>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-xs font-bold text-slate-500 uppercase tracking-wider">Upcoming Auctions</CardTitle>
                      <Calendar className="h-5 w-5 text-emerald-500 transition-transform group-hover:scale-110" />
                  </CardHeader>
                  <CardContent>
                      <div className="text-3xl font-black text-slate-900">{stats.upcomingAuctions}</div>
                      <p className="text-[10px] text-slate-400 mt-1 font-medium italic">Events scheduled this month</p>
                  </CardContent>
              </Card>
          </div>

          <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <Home className="h-5 w-5 text-[#2563eb]" /> 
                My Auction Listings
              </h2>
              {propertiesLoading && <Loader2 className="h-4 w-4 animate-spin text-slate-400" />}
          </div>

          {properties.length === 0 && !propertiesLoading ? (
              <div className="text-center py-20 bg-white border-2 border-dashed border-slate-200 rounded-2xl">
                  <div className="bg-slate-50 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Gavel className="h-10 w-10 text-slate-300" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">No properties listed yet</h3>
                  <p className="text-slate-500 max-w-xs mx-auto mb-8 mt-2">Start showcasing your properties to thousands of potential buyers today.</p>
                  <Link to="/dashboard/properties/new">
                      <Button variant="outline" className="border-2 font-bold px-8 hover:bg-slate-50">Create First Listing</Button>
                  </Link>
              </div>
          ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {properties.map((property) => (
                      <Card key={property.id} className="border-none shadow-sm bg-white overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col h-full rounded-xl">
                          <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                              {property.images && property.images.length > 0 ? (
                                  <img 
                                    src={property.images[0]} 
                                    alt={property.title} 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                                  />
                              ) : (
                                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
                                      <Home className="w-12 h-12 mb-2 opacity-20" />
                                      <span className="text-xs font-bold uppercase tracking-widest">No Imagery</span>
                                  </div>
                              )}
                              
                              <div className="absolute top-4 left-4 flex gap-2">
                                  <Badge className="bg-white/95 text-slate-900 hover:bg-white backdrop-blur shadow-md font-bold text-[10px] px-2 py-0.5 border-none">
                                      {property.type}
                                  </Badge>
                                  <Badge 
                                      className={`shadow-md font-bold text-[10px] px-2 py-0.5 border-none ${
                                        property.status === 'approved' 
                                          ? 'bg-emerald-500 text-white' 
                                          : 'bg-amber-500 text-white'
                                      }`}
                                  >
                                      {property.status === 'approved' ? (
                                        <><CheckCircle className="w-3 h-3 mr-1 inline" /> LIVE</>
                                      ) : (
                                        <><Clock className="w-3 h-3 mr-1 inline" /> PENDING</>
                                      )}
                                  </Badge>
                              </div>
                              
                              {property.listing_type === 'Auction' && (
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                                  <div className="flex items-center text-white text-[10px] font-bold tracking-wider">
                                    <Clock className="w-3 h-3 mr-1.5 text-amber-400" />
                                    {property.auction_date ? format(new Date(property.auction_date), 'MMM d, yyyy') : 'DATE NOT SET'}
                                  </div>
                                </div>
                              )}
                          </div>

                          <CardContent className="p-5 flex flex-col flex-1">
                              <div className="mb-4">
                                  <div className="flex items-center text-[#2563eb] text-[10px] font-black uppercase tracking-widest mb-1">
                                    <MapPin className="w-3 h-3 mr-1" /> {property.location?.split(',')[0]}
                                  </div>
                                  <h3 className="text-lg font-extrabold text-slate-900 line-clamp-1 group-hover:text-[#2563eb] transition-colors">{property.title}</h3>
                              </div>

                              <div className="flex items-end justify-between mt-auto pt-4 border-t border-slate-100">
                                  <div>
                                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Current Reserve</span>
                                      <div className="flex items-center text-xl font-black text-slate-900">
                                          <span className="text-emerald-500 mr-1 text-sm">P</span>
                                          {property.price_usd ? property.price_usd.toLocaleString('en-BW') : '0'}
                                      </div>
                                  </div>
                                  <div className="flex flex-col items-end">
                                      <div className="flex items-center bg-blue-50 text-[#2563eb] px-2 py-1 rounded-md text-[10px] font-black tracking-widest mb-2">
                                          <Users className="w-3 h-3 mr-1.5" />
                                          {property.reservations?.length || 0} LEADS
                                      </div>
                                      <div className="flex gap-1.5">
                                          <Button 
                                            size="icon" 
                                            variant="ghost" 
                                            className="h-8 w-8 text-slate-400 hover:text-[#2563eb] hover:bg-blue-50 rounded-lg transition-all"
                                            onClick={() => navigate(`/dashboard/properties/edit/${property.id}`)}
                                          >
                                              <Edit className="w-4 h-4" />
                                          </Button>
                                          <Button 
                                            size="icon" 
                                            variant="ghost" 
                                            className="h-8 w-8 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                            onClick={() => handleDeleteProperty(property.id)}
                                          >
                                              <Trash2 className="w-4 h-4" />
                                          </Button>
                                      </div>
                                  </div>
                              </div>
                          </CardContent>
                      </Card>
                  ))}
              </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AgentDashboard;