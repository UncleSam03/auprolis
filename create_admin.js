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

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase URL or Anon Key in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function createAdmin() {
  const email = 'admin@auprolis.com';
  const password = 'admin2026';

  console.log(`Attempting to create admin account: ${email}`);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: 'Administrator',
        user_type: 'admin',
        status: 'active'
      }
    }
  });

  if (error) {
    if (error.message.includes('already registered')) {
        console.log('User already exists. Trying to sign in to verify...');
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        if (signInError) {
            console.error('Sign in failed:', signInError.message);
        } else {
            console.log('Sign in successful. User exists and password is correct.');
        }
    } else {
        console.error('Error creating admin:', error.message);
    }
  } else {
    console.log('Admin account created successfully:', data.user?.id);
    console.log('Profile should be automatically created via trigger.');
  }
}

createAdmin();
