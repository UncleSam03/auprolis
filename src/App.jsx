import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from '@/pages/Home';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';

/* New Dashboard System */
import DashboardHome from '@/pages/dashboard/DashboardHome';
import SearchBrowse from '@/pages/dashboard/SearchBrowse';
import Favorites from '@/pages/dashboard/Favorites';
import MessagesLocked from '@/pages/dashboard/MessagesLocked';
import DocumentsLocked from '@/pages/dashboard/DocumentsLocked';
import Notifications from '@/pages/dashboard/Notifications';
import AccountBilling from '@/pages/dashboard/AccountBilling';
import PropertyDetailGated from '@/pages/dashboard/PropertyDetailGated';

/* Seller Dashboard System */
import SellerDashboardHome from '@/pages/dashboard/seller/SellerDashboardHome';
import SellerListings from '@/pages/dashboard/seller/SellerListings';
import NewListingStep1 from '@/pages/dashboard/seller/NewListingStep1';
import NewListingStep2 from '@/pages/dashboard/seller/NewListingStep2';
import NewListingStep3 from '@/pages/dashboard/seller/NewListingStep3';
import NewListingStep4 from '@/pages/dashboard/seller/NewListingStep4';
import SellerListingDetail from '@/pages/dashboard/seller/SellerListingDetail';
import SellerPerformance from '@/pages/dashboard/seller/SellerPerformance';
import SellerInquiries from '@/pages/dashboard/seller/SellerInquiries';
import SellerDocuments from '@/pages/dashboard/seller/SellerDocuments';
import SellerNotifications from '@/pages/dashboard/seller/SellerNotifications';
import SellerAccount from '@/pages/dashboard/seller/SellerAccount';

/* Admin Dashboard System */
import AdminHome from '@/pages/dashboard/admin/AdminHome';
import AdminListings from '@/pages/dashboard/admin/AdminListings';
import AdminListingReview from '@/pages/dashboard/admin/AdminListingReview';
import AdminUsers from '@/pages/dashboard/admin/AdminUsers';


import AdminDashboard from '@/pages/AdminDashboard';
import AgentDashboard from '@/pages/AgentDashboard';
import AdminSetup from '@/pages/AdminSetup';
import AuditPage from '@/pages/AuditPage';
import TermsOfService from '@/pages/TermsOfService';
import FAQs from '@/pages/FAQs';
import LegalGuide from '@/pages/LegalGuide';
import SellerDashboard from '@/components/dashboard/SellerDashboard'; 
import { Toaster } from '@/components/ui/toaster';
import { useAuth, AuthProvider } from '@/contexts/SupabaseAuthContext';
import { NewListingProvider } from '@/contexts/NewListingContext';
import { useToast } from '@/components/ui/use-toast';
import { AlertCircle } from 'lucide-react';

// Check Env Vars
const checkEnvVars = () => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return false;
  }
  return true;
};

const SELLER_ROLES = ['seller', 'agent', 'bank', 'sheriff'];

// Protected Route Component
const ProtectedRoute = ({ children, allowedTypes = [] }) => {
  const { user, profile, loading } = useAuth();

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!user) return <Navigate to="/signin" replace />;

  if (allowedTypes.length > 0) {
    if (!profile) {
      return <div className="p-10 text-center">Loading profile…</div>;
    }
    
    const isSellerRole = SELLER_ROLES.includes(profile.user_type);
    const matchesRole = 
      allowedTypes.includes(profile.user_type) || 
      (allowedTypes.includes('seller') && isSellerRole);
    
    if (!matchesRole) {
      // Redirect to correct dashboard based on actual role
      if (profile.user_type === 'admin') return <Navigate to="/admin" replace />;
      if (isSellerRole) return <Navigate to="/seller" replace />;
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
};

// Main App Routes
function AppRoutes() {
  const { toast } = useToast();
  const [configError, setConfigError] = useState(false);

  useEffect(() => {
    if (!checkEnvVars()) {
       setConfigError(true);
       toast({
         variant: "destructive",
         title: "Configuration Error",
         description: "Missing environment variables. Application may not function correctly."
       });
    }
  }, [toast]);

  return (
    <>
      {configError && (
        <div className="bg-destructive text-destructive-foreground p-4 text-center flex items-center justify-center gap-2 font-medium">
          <AlertCircle className="h-5 w-5" />
          <span>CRITICAL: Missing Supabase environment variables. Please configure your .env file.</span>
        </div>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        
        {/* Auprolis Modern Dashboard Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardHome /></ProtectedRoute>} />
        <Route path="/search" element={<ProtectedRoute><SearchBrowse /></ProtectedRoute>} />
        <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
        <Route path="/messages" element={<ProtectedRoute><MessagesLocked /></ProtectedRoute>} />
        <Route path="/documents" element={<ProtectedRoute><DocumentsLocked /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
        <Route path="/account" element={<ProtectedRoute><AccountBilling /></ProtectedRoute>} />
        <Route path="/property/:id" element={<ProtectedRoute><PropertyDetailGated /></ProtectedRoute>} />
        
        {/* Seller Dashboard Routes */}
        <Route path="/seller" element={<ProtectedRoute allowedTypes={['seller']}><SellerDashboardHome /></ProtectedRoute>} />
        <Route path="/seller/listings" element={<ProtectedRoute allowedTypes={['seller']}><SellerListings /></ProtectedRoute>} />
        
        <Route path="/seller/listings/new/*" element={
          <ProtectedRoute allowedTypes={['seller']}>
            <NewListingProvider>
                <Routes>
                    <Route path="step-1" element={<NewListingStep1 />} />
                    <Route path="step-2" element={<NewListingStep2 />} />
                    <Route path="step-3" element={<NewListingStep3 />} />
                    <Route path="step-4" element={<NewListingStep4 />} />
                </Routes>
            </NewListingProvider>
          </ProtectedRoute>
        } />
        
        <Route path="/seller/listings/:id" element={<ProtectedRoute allowedTypes={['seller']}><SellerListingDetail /></ProtectedRoute>} />
        <Route path="/seller/performance" element={<ProtectedRoute allowedTypes={['seller']}><SellerPerformance /></ProtectedRoute>} />
        <Route path="/seller/inquiries" element={<ProtectedRoute allowedTypes={['seller']}><SellerInquiries /></ProtectedRoute>} />
        <Route path="/seller/documents" element={<ProtectedRoute allowedTypes={['seller']}><SellerDocuments /></ProtectedRoute>} />
        <Route path="/seller/notifications" element={<ProtectedRoute allowedTypes={['seller']}><SellerNotifications /></ProtectedRoute>} />
        <Route path="/seller/account" element={<ProtectedRoute allowedTypes={['seller']}><SellerAccount /></ProtectedRoute>} />

        {/* Legacy / Role Specific Dashboards */}
        <Route 
          path="/seller-dashboard" 
          element={<Navigate to="/seller" replace />} 
        />
        {/* New Admin Dashboard Routes */}
        <Route path="/admin" element={<ProtectedRoute allowedTypes={['admin']}><AdminHome /></ProtectedRoute>} />
        <Route path="/admin/listings" element={<ProtectedRoute allowedTypes={['admin']}><AdminListings /></ProtectedRoute>} />
        <Route path="/admin/listings/pending" element={<ProtectedRoute allowedTypes={['admin']}><AdminListings /></ProtectedRoute>} />
        <Route path="/admin/listings/review/:id" element={<ProtectedRoute allowedTypes={['admin']}><AdminListingReview /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute allowedTypes={['admin']}><AdminUsers /></ProtectedRoute>} />

        
        <Route path="/agent-dashboard" element={<ProtectedRoute><AgentDashboard /></ProtectedRoute>} /> 
        <Route path="/setup-admin" element={<AdminSetup />} />
        <Route path="/audit" element={<AuditPage />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/legal-guide" element={<LegalGuide />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
      <Toaster />
    </Router>
  );
}

export default App;