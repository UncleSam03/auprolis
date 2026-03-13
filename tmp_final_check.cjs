
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ecwflzrbtdkbmhbwklvm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjd2ZsenJidGRrYm1oYndrbHZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyNzAyMzYsImV4cCI6MjA4MDg0NjIzNn0.oxzrdEnyeDBmkurIqM9Dixdhs92nDVKXAMza84qusQI';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function inspect() {
  const { data, error } = await supabase.from('properties').select('*').limit(1);
  if (error) {
    console.error('Error:', error);
  } else if (data && data.length > 0) {
    console.log('FIELDS:', Object.keys(data[0]).join(', '));
  } else {
    console.log('No data in properties table.');
  }

  const { data: buckets, error: bError } = await supabase.storage.listBuckets();
  if (bError) {
    console.error('Bucket Error:', bError);
  } else {
    console.log('BUCKETS:', buckets.map(b => b.name).join(', '));
  }
}

inspect();
