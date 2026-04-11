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
      console.log(`AuthProvider: Fetching profile for ${userId} (attempt ${i + 1}/${retries})`);
      try {
        // Add a safety timeout to the supabase call
        const { data, error, status } = await Promise.race([
          supabase.from('profiles').select('*').eq('id', userId).single(),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Profile fetch timeout')), 5000))
        ]);
        
        if (data) {
          console.log('AuthProvider: Profile found');
          return data;
        }
        
        if (error) {
          // Handle 406 specifically (Project Paused)
          if (status === 406 || (error.message && error.message.includes('406'))) {
            console.error('AuthProvider: CRITICAL ERROR 406 - Project is likely PAUSED. Please check Supabase dashboard.');
            return null; // Don't retry if project is paused
          }

          if (error.code === 'PGRST116') { // PGRST116 is 'no rows found'
            console.warn('AuthProvider: Profile row not found (PGRST116)');
            return null; // Don't retry if profile doesn't exist
          } else {
            console.error('AuthProvider: Error fetching profile:', error);
          }
        }
        
        // Wait before retrying (exponential backoff)
        if (i < retries - 1) {
          const delay = 1000 * (i + 1);
          console.warn(`AuthProvider: Retrying in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      } catch (err) {
        console.error(`AuthProvider: Error on attempt ${i + 1}:`, err.message || err);
        if (err.message === 'Profile fetch timeout') {
           // On timeout, we can retry, but maybe the network is just dead
        }
        if (i < retries - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    }
    console.warn('AuthProvider: Profile fetch failed after all retries');
    return null;
  };

  const handleSession = useCallback(async (currentSession) => {
    console.log('AuthProvider: Handling session change');
    setSession(currentSession);
    const currentUser = currentSession?.user ?? null;
    setUser(currentUser);

    if (currentUser) {
      // Fetch detailed profile information
      console.log(`AuthProvider: User logged in (${currentUser.id}), fetching profile...`);
      const userProfile = await fetchProfileWithRetry(currentUser.id);
      setProfile(userProfile);
    } else {
      console.log('AuthProvider: No active session');
      setProfile(null);
    }

    console.log('AuthProvider: Finalizing initialization, setting loading=false');
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