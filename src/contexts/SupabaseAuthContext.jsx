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

  // Helper to fetch profile data
  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }
      return data;
    } catch (err) {
      console.error('Unexpected error fetching profile:', err);
      return null;
    }
  };

  const handleSession = useCallback(async (currentSession) => {
    setSession(currentSession);
    const currentUser = currentSession?.user ?? null;
    setUser(currentUser);

    if (currentUser) {
      // Fetch detailed profile information including role
      const userProfile = await fetchProfile(currentUser.id);
      setProfile(userProfile);
    } else {
      setProfile(null);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    // Initial session check
    const getSession = async () => {
      const { data: { session: initialSession } } = await supabase.auth.getSession();
      await handleSession(initialSession);
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        // Optimization: if the session user ID hasn't changed, we might not need to re-fetch the profile
        // But for safety on role updates, we re-fetch if it's a new sign-in or session update
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
    
    // Explicitly handle session update immediately after successful sign-in
    // to ensure redirection logic has access to the profile data immediately
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
    // State clearing is handled by onAuthStateChange, but we can force it here for immediate UI feedback
    setSession(null);
    setUser(null);
    setProfile(null);
    
    return { error };
  }, [toast]);

  const value = useMemo(() => ({
    user,
    session,
    profile, // Export profile so components can check role directly
    loading,
    signUp,
    signIn,
    signOut,
    isAdmin: profile?.user_type === 'admin', // Convenience accessor
    isSheriff: profile?.user_type === 'sheriff',
    isBank: profile?.user_type === 'bank',
    isBuyer: profile?.user_type === 'buyer',
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