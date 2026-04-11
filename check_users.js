import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const envContent = fs.readFileSync('.env', 'utf8');
const env = Object.fromEntries(
  envContent.split('\n')
    .filter(line => line.includes('='))
    .map(line => line.split('=').map(part => part.trim()))
);

const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkUsers() {
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('email, user_type, status')
    .eq('email', 'admin@auprolis.com');

  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Profiles for admin@auprolis.com:', profiles);
  }
}

checkUsers();
