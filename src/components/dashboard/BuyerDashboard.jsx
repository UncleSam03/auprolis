import React, { useState } from 'react';
import { usePropertyData } from '@/hooks/usePropertyData';
import PropertyCard from '@/components/PropertyCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, Heart, Clock } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const BuyerDashboard = () => {
  const { properties, loading } = usePropertyData();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Task 6: Update BuyerDashboard to display with Pro tier filtering
  const displayTier = 'pro';

  const filteredProperties = properties.filter(prop => 
    prop.listing_title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    prop.address_lot_number?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Buyer Dashboard</h1>
            <p className="text-slate-600">Discover and track properties matching your criteria</p>
          </div>
          
          <div className="flex items-center gap-2 bg-white p-1 rounded-lg border shadow-sm">
             <div className="relative">
               <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
               <Input 
                 placeholder="Search location, title..." 
                 className="pl-9 w-64 border-none shadow-none focus-visible:ring-0"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
               />
             </div>
             <Button variant="ghost" size="icon"><Filter className="h-4 w-4" /></Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Properties</TabsTrigger>
            <TabsTrigger value="watchlist" className="gap-2"><Heart className="h-4 w-4" /> Watchlist</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {loading ? (
               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {[1,2,3].map(i => <div key={i} className="h-80 bg-slate-200 animate-pulse rounded-lg"/>)}
               </div>
            ) : filteredProperties.length > 0 ? (
               <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                 {filteredProperties.map(prop => (
                   <PropertyCard key={prop.id} property={prop} subscriptionType={displayTier} />
                 ))}
               </div>
            ) : (
               <div className="text-center py-20 text-slate-500">No properties found.</div>
            )}
          </TabsContent>

          <TabsContent value="watchlist">
             <div className="bg-white p-10 text-center rounded-lg border border-dashed">
                <Heart className="h-10 w-10 text-slate-300 mx-auto mb-2" />
                <h3 className="font-semibold text-slate-900">Your Watchlist is Empty</h3>
             </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BuyerDashboard;