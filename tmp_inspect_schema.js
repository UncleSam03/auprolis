
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ecwflzrbtdkbmhbwklvm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjd2ZsenJidGRrYm1oYndrbHZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyNzAyMzYsImV4cCI6MjA4MDg0NjIzNn0.oxzrdEnyeDBmkurIqM9Dixdhs92nDVKXAMza84qusQI';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function inspectSchema() {
  console.log('Querying schema for properties table...');
  
  // Try to get column information using RPC if possible, or just a sample row
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .limit(1);

  if (error) {
    console.error('Error fetching property sample:', error);
  } else {
    console.log('Property table sample keys:', Object.keys(data[0] || {}));
    console.log('Sample data:', data[0]);
  }

  const { data: profiles, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .limit(1);

  if (profileError) {
    console.error('Error fetching profile sample:', profileError);
  } else {
    console.log('Profiles table sample keys:', Object.keys(profiles[0] || {}));
    console.log('Sample profile data:', profiles[0]);
  }
}

inspectSchema();
