import { supabase } from '@/lib/customSupabaseClient';

export async function createAdminUser(email, password, name, user_type) {
  try {
    const { data, error } = await supabase.functions.invoke('create-admin-user', {
      body: JSON.stringify({ email, password, name, user_type }),
    });

    if (error) {
      console.error('Error calling create-admin-user function:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Failed to create admin user:', error);
    throw error;
  }
}

// Example usage (for your reference, not part of the active app flow):
// In a dev console or a temporary script:
/*
import { createAdminUser } from './src/utils/createAdminUser';

async function setupAdmin() {
  try {
    const result = await createAdminUser('hendrickmathumo@gmail.com', 'Auprolis@60', 'Hendrick Mathumo', 'admin');
    console.log('Admin user creation result:', result);
    alert('Admin user created successfully! Check console for details.');
  } catch (error) {
    console.error('Admin user creation failed:', error);
    alert('Admin user creation failed. See console for error.');
  }
}

// Call this function once from your browser's developer console after the app loads
// or via a temporary script. Do not include this directly in the main app logic for security.
// setupAdmin();
*/