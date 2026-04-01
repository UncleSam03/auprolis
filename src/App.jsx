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
    const matchesRole =
      allowedTypes.includes(profile.user_type) ||
      (allowedTypes.includes('seller') && SELLER_ROLES.includes(profile.user_type));
    if (!matchesRole) {
      if (profile.user_type === 'admin') return <Navigate to="/admin" replace />;
      if (SELLER_ROLES.includes(profile.user_type)) return <Navigate to="/seller-dashboard" replace />;
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
        
        {/* Legacy / Role Specific Dashboards */}
        <Route 
          path="/seller-dashboard" 
          element={<ProtectedRoute allowedTypes={['seller']}><SellerDashboard /></ProtectedRoute>} 
        />
        <Route 
          path="/admin" 
          element={<ProtectedRoute allowedTypes={['admin']}><AdminDashboard /></ProtectedRoute>} 
        />
        
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
    <AuthProvider>
      <Router>
        <AppRoutes />
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;