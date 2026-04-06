import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';

export const useProperties = (options = {}) => {
  const { 
    sellerId = null, 
    enableRealtime = true,
    enabled = true,
    searchQuery = null,
    limit = null,
    status = null 
  } = options;

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  const fetchProperties = useCallback(async () => {
    if (!enabled) return;
    
    try {
      setLoading(true);
      setError(null);
      let query = supabase
        .from('properties')
        .select('*')

      if (sellerId) {
        query = query.eq('seller_id', sellerId);
      }

      if (status && status !== 'all') {
        query = query.eq('status', status);
      }
      
      query = query.order('created_at', { ascending: false });

      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,case_number.ilike.%${searchQuery}%,location.ilike.%${searchQuery}%`);
      }

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
        console.error('Error fetching properties:', fetchError);
        console.error('Error details:', fetchError.message, fetchError.hint);
        throw fetchError;
      }

      setProperties(data || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
      setError(error);
      
      let errorMsg = "Please check your connection and try again.";
      if (error.code === '406' || error.status === 406) {
        errorMsg = "Database access denied or invalid request format (406).";
        console.warn('PostgREST 406 error detected. This usually indicates an RLS policy issue or incompatible Accept headers.');
      }

      if (error.code !== 'PGRST116') {
        toast({
          variant: "destructive",
          title: "Error loading properties",
          description: errorMsg,
        });
      }
    } finally {
      setLoading(false);
    }
  }, [sellerId, toast, enabled, limit, status, searchQuery]);

  // Helper to fetch a single fresh record with relations for realtime updates
  const fetchSingleProperty = async (id) => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single();
      
      return error ? null : data;
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    fetchProperties();

    if (!enableRealtime || !enabled) return;

    const channel = supabase
      .channel(`realtime:properties-${status || 'all'}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'properties' },
        async (payload) => {
          const { eventType, new: newRecord, old: oldRecord } = payload;

          if (eventType === 'INSERT') {
            // Filter by sellerId if needed
            if (sellerId && newRecord.seller_id !== sellerId) return;
            // Filter by status if needed
            if (status && newRecord.status !== status) return;

            const freshRecord = await fetchSingleProperty(newRecord.id);
            if (!freshRecord) return;

            setProperties((prev) => {
              if (prev.some(p => p.id === freshRecord.id)) return prev;
              const newList = [freshRecord, ...prev];
              return limit ? newList.slice(0, limit) : newList;
            });
          }

          if (eventType === 'UPDATE') {
             const freshRecord = await fetchSingleProperty(newRecord.id);
             if (!freshRecord) return;

             // Check if the updated record still matches our filters
             const matchSeller = !sellerId || freshRecord.seller_id === sellerId;
             const matchStatus = !status || freshRecord.status === status;

             if (matchSeller && matchStatus) {
               // Update existing or Add if it wasn't there (e.g. status changed to 'approved')
               setProperties((prev) => {
                 const exists = prev.some(p => p.id === freshRecord.id);
                 if (exists) {
                   return prev.map((prop) => prop.id === freshRecord.id ? freshRecord : prop);
                 } else {
                   // It's a new match (e.g. just approved), add to top
                   const newList = [freshRecord, ...prev];
                   return limit ? newList.slice(0, limit) : newList;
                 }
               });
             } else {
               // Record no longer matches filters, remove it
               setProperties((prev) => prev.filter((prop) => prop.id !== freshRecord.id));
             }
          }

          if (eventType === 'DELETE') {
            setProperties((prev) => prev.filter((prop) => prop.id !== oldRecord.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchProperties, enableRealtime, sellerId, enabled, limit, status]);

  return { properties, loading, error, refresh: fetchProperties };
};