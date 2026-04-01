import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const { toast } = useToast();

  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper to fetch profile data with retry logic
  const fetchProfileWithRetry = async (userId, retries = 3) => {
    for (let i = 0; i < retries; i++) {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();
        
        if (data) return data;
        
        if (error && error.code !== 'PGRST116') { // PGRST116 is 'no rows found'
          console.error('Error fetching profile:', error);
        }
        
        // Wait before retrying (exponential backoff or simple delay)
        if (i < retries - 1) {
          await new Promise(resolve => setTimeout(resolve, 500 * (i + 1)));
        }
      } catch (err) {
        console.error('Unexpected error fetching profile:', err);
      }
    }
    return null;
  };

  const handleSession = useCallback(async (currentSession) => {
    setSession(currentSession);
    const currentUser = currentSession?.user ?? null;
    setUser(currentUser);

    if (currentUser) {
      // Fetch detailed profile information
      // We use retry logic because the database trigger might have a slight delay
      const userProfile = await fetchProfileWithRetry(currentUser.id);
      setProfile(userProfile);
    } else {
      setProfile(null);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    // Initial session check
    const getSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Supabase getSession error:", error);
        }
        
        const initialSession = data?.session || null;
        await handleSession(initialSession);
      } catch (err) {
        console.error("Supabase getSession caught exception:", err);
        setLoading(false);
      }
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        // We always refresh on auth state changes as roles might have changed
        await handleSession(currentSession);
      }
    );

    return () => subscription.unsubscribe();
  }, [handleSession]);

  const signUp = useCallback(async (email, password, options) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options,
    });

    if (error) {
      toast({
        variant: "destructive",
        title: "Sign up Failed",
        description: error.message || "Something went wrong",
      });
    }

    return { data, error };
  }, [toast]);

  const signIn = useCallback(async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        variant: "destructive",
        title: "Sign in Failed",
        description: error.message || "Something went wrong",
      });
    }
    
    if (data.session) {
      await handleSession(data.session);
    }

    return { data, error };
  }, [toast, handleSession]);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        variant: "destructive",
        title: "Sign out Failed",
        description: error.message || "Something went wrong",
      });
    }
    
    setSession(null);
    setUser(null);
    setProfile(null);
    
    return { error };
  }, [toast]);

  const value = useMemo(() => ({
    user,
    session,
    profile, 
    loading,
    signUp,
    signIn,
    signOut,
    isAdmin: profile?.user_type === 'admin',
    isSeller: ['seller', 'agent', 'bank', 'sheriff'].includes(profile?.user_type),
    isBuyer: profile?.user_type === 'buyer',
    status: profile?.status || 'active'
  }), [user, session, profile, loading, signUp, signIn, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};