import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, MapPin, Calendar, FileText, DollarSign, 
  Phone, User, Download, Lock, Building, Map, AlertTriangle, Briefcase, Gavel
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import PropertyDisclaimer from '@/components/PropertyDisclaimer';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Card className="h-full flex items-center justify-center p-6 bg-red-50 border-red-200">
           <div className="text-center text-red-500">
             <AlertTriangle className="h-8 w-8 mx-auto mb-2" />
             <p>Failed to load property card.</p>
           </div>
        </Card>
      );
    }
    return this.props.children;
  }
}

const PropertyCardContent = ({ property, subscriptionType = 'free' }) => {
  const { toast } = useToast();
  
  // Safe access to properties with defaults
  const title = property.listing_title || 'Untitled Property';
  const type = property.property_type || 'Unknown';
  const address = property.address_lot_number || 'Location not specified';
  const date = property.auction_date;
  const status = property.status;

  // Tier Logic
  const isBasicOrHigher = ['basic', 'pro', 'premium', 'enterprise', 'admin'].includes(subscriptionType);
  const isProOrHigher = ['pro', 'premium', 'enterprise', 'admin'].includes(subscriptionType);
  const isEnterpriseOrHigher = ['enterprise', 'admin'].includes(subscriptionType);

  // Field Visibility Control
  // Basic: type, title, address, date (Always visible if isBasicOrHigher or even free if we consider free=basic for this view)
  // Let's assume even Free tier sees basic info.
  const showBasicInfo = true; 

  // Pro: bedrooms, size_m2, condition
  const showProInfo = isProOrHigher;

  // Enterprise: full details
  const showEnterpriseInfo = isEnterpriseOrHigher;

  const handleRestrictedAction = (feature) => {
    toast({
      title: "Access Restricted",
      description: `Upgrade your plan to access ${feature}.`,
      variant: "destructive"
    });
  };

  const getPropertyIcon = (typeVal) => {
    switch (typeVal) {
      case 'Residential': return <Home className="h-5 w-5" />;
      case 'Commercial': return <Building className="h-5 w-5" />;
      case 'Land': return <Map className="h-5 w-5" />;
      default: return <Home className="h-5 w-5" />;
    }
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(property));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", title + ".json");
    document.body.appendChild(downloadAnchorNode); 
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    toast({ description: "Property data exported successfully." });
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 bg-slate-100 flex items-center justify-center">
        {property.images && property.images.length > 0 ? (
          <img 
            src={property.images[0]} 
            alt={title} 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.style.display = 'none';
              e.target.parentNode.classList.add('flex', 'items-center', 'justify-center');
            }}
          />
        ) : (
          <div className="text-slate-400 flex flex-col items-center">
            {getPropertyIcon(type)}
            <span className="text-xs mt-2">No Image</span>
          </div>
        )}
        <div className="absolute top-3 right-3 flex gap-2">
          <Badge variant="secondary" className="backdrop-blur-md bg-white/90">
            {type}
          </Badge>
          {status === 'active' && (
            <Badge className="bg-green-500/90 hover:bg-green-600">Active</Badge>
          )}
        </div>
      </div>

      <CardHeader className="pb-2">
        <h3 className="text-lg font-bold text-slate-900 line-clamp-2" title={title}>
          {title}
        </h3>
        <div className="flex items-center text-sm text-slate-500 gap-1">
          <MapPin className="h-3 w-3" />
          <span className="truncate">{address}</span>
        </div>
      </CardHeader>

      <CardContent className="flex-grow space-y-4 py-2">
        {/* Basic Info (Always Visible) */}
        <div className="grid grid-cols-2 gap-y-2 text-sm">
          <div className="flex items-center gap-2 text-slate-600">
            <Calendar className="h-4 w-4 text-blue-500" />
            <span className="truncate">{date ? new Date(date).toLocaleDateString() : 'Date TBA'}</span>
          </div>
        </div>

        {/* Pro Info */}
        {showProInfo ? (
          <div className="grid grid-cols-2 gap-y-2 text-sm border-t border-slate-100 pt-2">
            <div className="flex items-center gap-2 text-slate-600">
              <Home className="h-4 w-4 text-blue-500" />
              <span>{property.bedrooms || 'N/A'} Beds</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Building className="h-4 w-4 text-blue-500" />
              <span>{property.size_m2 || 'N/A'}</span>
            </div>
            <div className="col-span-2 flex items-center gap-2 text-slate-600">
              <Briefcase className="h-4 w-4 text-blue-500" />
              <span>{property.condition || 'N/A'}</span>
            </div>
          </div>
        ) : (
           <div className="bg-slate-50 p-3 rounded flex items-center justify-between group cursor-pointer border border-slate-100" onClick={() => handleRestrictedAction('Pro Details')}>
             <div className="flex items-center gap-2 text-xs text-slate-500">
               <Lock className="h-3 w-3" />
               <span>Details Hidden</span>
             </div>
             <Badge variant="outline" className="text-[10px] h-5 border-amber-200 text-amber-600">Pro Plan</Badge>
           </div>
        )}

        {/* Enterprise Info */}
        {showEnterpriseInfo ? (
          <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
             <div className="flex items-center gap-2 text-slate-600">
                <FileText className="h-3 w-3 text-green-600" />
                <span className="font-medium">Deed: {property.title_deed_number}</span>
             </div>
             <div className="flex items-center gap-2 text-slate-600">
                <User className="h-3 w-3 text-green-600" />
                <span>Seller: {property.seller_contact_entity}</span>
             </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Gavel className="h-3 w-3 text-green-600" />
                <span>Plaintiff: {property.plaintiff}</span>
             </div>
          </div>
        ) : (
           <div className="bg-slate-50 p-3 rounded flex items-center justify-between group cursor-pointer border border-slate-100" onClick={() => handleRestrictedAction('Full Details')}>
             <div className="flex items-center gap-2 text-xs text-slate-500">
               <Lock className="h-3 w-3" />
               <span>Seller & Legal Info Hidden</span>
             </div>
             <Badge variant="outline" className="text-[10px] h-5 border-purple-200 text-purple-600">Enterprise</Badge>
           </div>
        )}

      </CardContent>

      <CardFooter className="flex flex-col gap-2 pt-2 pb-4">
        <div className="flex w-full gap-2">
          <Link to={`/properties/${property.id}`} className="flex-1">
            <Button className="w-full" size="sm">View Details</Button>
          </Link>
          {showEnterpriseInfo && (
            <Button size="icon" variant="outline" className="h-9 w-9" onClick={handleExport} title="Export Data">
              <Download className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

const PropertyCard = (props) => (
  <ErrorBoundary>
    <PropertyCardContent {...props} />
  </ErrorBoundary>
);

export default PropertyCard;