import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Plus, ArrowLeft, Edit, Trash2, MapPin } from 'lucide-react';
import PropertyDisclaimer from '@/components/PropertyDisclaimer'; // New import

const ManageProperties = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/signin');
        return;
      }

      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('seller_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProperties(data || []);
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to load properties." });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;
    
    try {
      const { error } = await supabase.from('properties').delete().eq('id', id);
      if (error) throw error;
      
      setProperties(properties.filter(p => p.id !== id));
      toast({ title: "Success", description: "Property deleted successfully." });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to delete property." });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#2563eb]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>My Properties - Auprolis</title>
      </Helmet>

      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/dashboard" className="flex items-center text-gray-500 hover:text-gray-900 mr-4">
                <ArrowLeft className="h-5 w-5 mr-1" /> Back
              </Link>
              <span className="text-xl font-bold text-gray-900">My Properties</span>
            </div>
            <div className="flex items-center">
              <Link to="/dashboard/properties/new">
                <Button className="bg-[#2563eb] hover:bg-[#1d4ed8]">
                  <Plus className="mr-2 h-4 w-4" /> Add New Property
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {properties.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="p-4 bg-blue-50 rounded-full mb-4">
                <Plus className="h-8 w-8 text-[#2563eb]" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No properties listed yet</h3>
              <p className="text-gray-500 mb-6">Start by adding your first property to the marketplace.</p>
              <Link to="/dashboard/properties/new">
                <Button>List Your First Property</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-200 relative">
                  <img 
                    src={property.images?.[0] || 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3'} 
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-semibold">
                    {property.type}
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg truncate">{property.title}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {property.location}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={() => navigate(`/dashboard/properties/edit/${property.id}`)}>
                      <Edit className="h-4 w-4 mr-2" /> Edit
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => handleDelete(property.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  {/* Property Disclaimer */}
                  <PropertyDisclaimer />
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageProperties;