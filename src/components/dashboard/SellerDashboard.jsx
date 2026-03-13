import React from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { usePropertyData } from '@/hooks/usePropertyData'; // Changed to use the static hook for this task
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import PropertyCard from '@/components/PropertyCard';

const SellerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Task 7: Update SellerDashboard to display with Enterprise tier filtering
  const displayTier = 'enterprise';
  
  // Using the static hook instead of the seller specific hook to show the 3 specific properties
  const { properties, loading } = usePropertyData();

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Seller Dashboard</h1>
            <p className="text-slate-600">Manage your listings and track performance</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="mr-2 h-4 w-4" /> New Listing
          </Button>
        </div>

        {/* Properties List */}
        <Card>
          <CardHeader>
            <CardTitle>My Listings (Static Preview)</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[1,2,3].map(i => <div key={i} className="h-20 bg-slate-100 animate-pulse rounded"></div>)}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map(property => (
                  <PropertyCard key={property.id} property={property} subscriptionType={displayTier} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SellerDashboard;