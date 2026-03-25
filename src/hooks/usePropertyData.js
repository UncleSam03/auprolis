import { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useToast } from '@/components/ui/use-toast';

export const usePropertyData = (options = {}) => {
  const { user, profile } = useAuth();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  const subscriptionType = profile?.subscription_type || 'free';

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('properties')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false })
        .limit(6);

      if (fetchError) throw fetchError;

      setProperties(data || []);
    } catch (err) {
      console.error('Error fetching property data:', err);
      setError(err);
      toast({
        variant: "destructive",
        title: "Error loading properties",
        description: "Could not load property listings. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const refresh = () => {
    fetchProperties();
  };

  return { properties, loading, error, subscriptionType, refresh };
};