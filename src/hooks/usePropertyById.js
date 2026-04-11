import { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';

export const usePropertyById = (id) => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!id) return;

    const fetchProperty = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('properties')
          .select('*')
          .eq('id', id)
          .single();

        if (fetchError) {
          if (fetchError.code === 'PGRST116') {
             // Property not found
             throw new Error('Property not found');
          }
          throw fetchError;
        }

        setProperty(data || null);
      } catch (err) {
        console.error('Error fetching property:', err);
        setError(err);
        toast({
          variant: "destructive",
          title: "Error loading property",
          description: err.message || "Could not load property details.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id, toast]);

  return { property, loading, error };
};
