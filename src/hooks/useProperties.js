import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';

export const useProperties = (options = {}) => {
  const { 
    sellerId = null, 
    enableRealtime = true,
    enabled = true,
    limit = null,
    status = null // 'approved', 'pending', etc. If null, fetches all (useful for admin)
  } = options;

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchProperties = useCallback(async () => {
    if (!enabled) return;
    
    try {
      setLoading(true);
      let query = supabase
        .from('properties')
        .select('*, profiles:seller_id(name, email, phone)')
        .order('created_at', { ascending: false });

      if (sellerId) {
        query = query.eq('seller_id', sellerId);
      }

      if (status) {
        query = query.eq('status', status);
      }

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (error) throw error;

      setProperties(data || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
      if (error.code !== 'PGRST116') {
        toast({
          variant: "destructive",
          title: "Error loading properties",
          description: "Please check your connection and try again.",
        });
      }
    } finally {
      setLoading(false);
    }
  }, [sellerId, toast, enabled, limit, status]);

  // Helper to fetch a single fresh record with relations for realtime updates
  const fetchSingleProperty = async (id) => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*, profiles:seller_id(name, email, phone)')
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

  return { properties, loading, refresh: fetchProperties };
};