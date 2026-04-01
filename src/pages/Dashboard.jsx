import React, { useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Loader2 } from 'lucide-react';
import FreeDashboard from '@/components/dashboard/FreeDashboard';
import PremiumDashboard from '@/components/dashboard/PremiumDashboard';
import SellerDashboard from '@/components/dashboard/SellerDashboard';
import AgentDashboard from '@/pages/AgentDashboard';
import AdminDashboard from '@/pages/AdminDashboard';
import { useToast } from '@/components/ui/use-toast';

const SELLER_ROLES = ['seller', 'agent', 'bank', 'sheriff'];

const Dashboard = () => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/signin');
    }
  }, [user, loading, navigate]);

  const handleUpgrade = (plan) => {
    toast({
      title: "Upgrade Request",
      description: `Redirecting to payment for ${plan} plan...`
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-[#2563eb]" />
      </div>
    );
  }

  if (!profile) {
     return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-[#2563eb]" />
      </div>
    );
  }

  console.log('Dashboard: Current user type:', profile.user_type);

  // Admin Dashboard
  if (profile.user_type === 'admin') {
    return <AdminDashboard />;
  }

  // Seller/Agent Dashboards
  if (profile.user_type === 'seller') {
    return <SellerDashboard />;
  }

  if (SELLER_ROLES.includes(profile.user_type)) {
    return <AgentDashboard />;
  }

  // Buyer Dashboards based on subscription
  if (profile.subscription_type === 'free' || !profile.subscription_type) {
    return <FreeDashboard onUpgrade={handleUpgrade} user={user} />;
  }

  return <PremiumDashboard user={user} profile={profile} />;
};

export default Dashboard;