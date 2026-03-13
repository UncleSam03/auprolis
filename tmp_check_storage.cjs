
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ecwflzrbtdkbmhbwklvm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjd2ZsenJidGRrYm1oYndrbHZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyNzAyMzYsImV4cCI6MjA4MDg0NjIzNn0.oxzrdEnyeDBmkurIqM9Dixdhs92nDVKXAMza84qusQI';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkStorage() {
  console.log('Checking storage buckets...');
  
  try {
    const { data: buckets, error } = await supabase
      .storage
      .listBuckets();

    if (error) {
      console.error('Error listing buckets:', error);
    } else {
      console.log('Buckets:', buckets.map(b => b.name));
      const hasImages = buckets.some(b => b.name === 'property-images');
      console.log('Has property-images bucket:', hasImages);
    }
  } catch (e) {
    console.error('Unexpected error:', e);
  }
}

checkStorage();
