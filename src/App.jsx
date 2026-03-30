import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from '@/pages/Home';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import Dashboard from '@/pages/Dashboard';
import ManageProperties from '@/pages/ManageProperties';
import PropertyForm from '@/pages/PropertyForm';
import PropertyDetails from '@/pages/PropertyDetails'; 
import AdminDashboard from '@/pages/AdminDashboard';
import AgentDashboard from '@/pages/AgentDashboard';
import Messages from '@/pages/Messages';
import AdminSetup from '@/pages/AdminSetup';
import AuditPage from '@/pages/AuditPage';
import TermsOfService from '@/pages/TermsOfService';
import FAQs from '@/pages/FAQs';
import LegalGuide from '@/pages/LegalGuide';
import SellerDashboard from '@/components/dashboard/SellerDashboard'; 
import BuyerDashboard from '@/components/dashboard/BuyerDashboard'; 
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

// Protected Route Component
const ProtectedRoute = ({ children, allowedTypes = [] }) => {
  const { user, profile, loading } = useAuth();
  
  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!user) return <Navigate to="/signin" replace />;
  
  // If allowedTypes is provided, check permission
  if (allowedTypes.length > 0 && profile && !allowedTypes.includes(profile.role)) {
     // Redirect based on role if they try to access wrong dashboard
     if (profile.role === 'admin') return <Navigate to="/admin" replace />;
     if (profile.role === 'seller') return <Navigate to="/seller-dashboard" replace />;
     return <Navigate to="/dashboard" replace />;
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
        
        {/* General Dashboard */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        
        {/* Role Specific Dashboards */}
        <Route 
          path="/seller-dashboard" 
          element={<ProtectedRoute allowedTypes={['seller']}><SellerDashboard /></ProtectedRoute>} 
        />
        <Route 
          path="/buyer-dashboard" 
          element={<ProtectedRoute allowedTypes={['buyer']}><BuyerDashboard /></ProtectedRoute>} 
        />
        <Route 
          path="/admin" 
          element={<ProtectedRoute allowedTypes={['admin']}><AdminDashboard /></ProtectedRoute>} 
        />

        {/* Property Management */}
        <Route path="/dashboard/properties" element={<ProtectedRoute><ManageProperties /></ProtectedRoute>} />
        <Route path="/dashboard/properties/new" element={<ProtectedRoute><PropertyForm /></ProtectedRoute>} />
        <Route path="/dashboard/properties/edit/:id" element={<ProtectedRoute><PropertyForm /></ProtectedRoute>} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
        
        {/* Utilities */}
        <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
        <Route path="/agent-dashboard" element={<ProtectedRoute><AgentDashboard /></ProtectedRoute>} /> 
        <Route path="/setup-admin" element={<AdminSetup />} />
        <Route path="/audit" element={<AuditPage />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/legal-guide" element={<LegalGuide />} />
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