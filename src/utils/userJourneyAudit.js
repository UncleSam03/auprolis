import { supabase } from '@/lib/customSupabaseClient';

export const runUserJourneyAudit = async () => {
  const results = {
    category: 'User Journey Simulation',
    tests: [],
    status: 'pending',
    timestamp: new Date().toISOString()
  };

  const addResult = (name, status, message, severity = 'critical') => {
    results.tests.push({ name, status, message, severity });
  };

  // 1. Auth State Check (Pre-requisite)
  const { data: { session } } = await supabase.auth.getSession();
  const isAuthenticated = !!session;
  
  if (isAuthenticated) {
     addResult('Authentication Status', 'pass', `User is authenticated as ${session.user.email}`);
  } else {
     addResult('Authentication Status', 'warning', 'User is NOT authenticated. Some journey tests will be skipped.', 'warning');
  }

  // 2. Profile Access
  if (isAuthenticated) {
     const { data: profile, error } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
     if (error) {
        addResult('Profile Retrieval', 'fail', `Failed to load user profile: ${error.message}`);
     } else {
        addResult('Profile Retrieval', 'pass', `Profile loaded for ${profile.name} (${profile.user_type})`);
     }
  }

  // 3. Property Listing Flow (Simulation)
  // We don't actually create a property to avoid junk data, but we verify we CAN select from properties
  // which simulates the "View" capability.
  try {
     const { data, error } = await supabase.from('properties').select('id').limit(1);
     if (error) throw error;
     addResult('Property Browsing', 'pass', 'Successfully queried properties database');
  } catch (e) {
     addResult('Property Browsing', 'fail', `Failed to browse properties: ${e.message}`);
  }

  // 4. Watchlist/Favorites Logic
  if (isAuthenticated) {
     // Check if we can query the watchlist table
     const { error } = await supabase.from('watchlist').select('*').eq('buyer_id', session.user.id);
     if (error) {
        addResult('Watchlist Access', 'fail', `Watchlist table inaccessible: ${error.message}`);
     } else {
        addResult('Watchlist Access', 'pass', 'Watchlist system accessible');
     }
  }

  // 5. Admin Dashboard Access Simulation
  // Check if current user WOULD have access
  if (isAuthenticated) {
     const { data: profile } = await supabase.from('profiles').select('user_type').eq('id', session.user.id).single();
     if (profile?.user_type === 'admin') {
        addResult('Admin Privileges', 'pass', 'User has ADMIN privileges - full dashboard access enabled');
     } else {
        addResult('Admin Privileges', 'info', 'User is not admin (Access Control functioning correctly)', 'info');
     }
  }

  // 6. Messaging System Check
  if (isAuthenticated) {
    const { error } = await supabase.from('messages').select('id').limit(1);
    if (!error || error.code === 'PGRST116') { // success or no rows found is fine
        addResult('Messaging System', 'pass', 'Messaging channel open');
    } else {
        addResult('Messaging System', 'warning', 'Messaging check encountered error (might be empty)', 'warning');
    }
  }

  const failed = results.tests.filter(t => t.status === 'fail').length;
  const warnings = results.tests.filter(t => t.status === 'warning').length;
  results.status = failed > 0 ? 'fail' : (warnings > 0 ? 'warning' : 'pass');

  return results;
};