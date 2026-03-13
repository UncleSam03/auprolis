
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = 'https://ecwflzrbtdkbmhbwklvm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjd2ZsenJidGRrYm1oYndrbHZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyNzAyMzYsImV4cCI6MjA4MDg0NjIzNn0.oxzrdEnyeDBmkurIqM9Dixdhs92nDVKXAMza84qusQI';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function inspect() {
  let output = '';
  const { data, error } = await supabase.from('properties').select('*').limit(1);
  if (error) {
    output += 'Error: ' + JSON.stringify(error) + '\n';
  } else if (data && data.length > 0) {
    output += 'FIELDS: ' + Object.keys(data[0]).join(', ') + '\n';
  } else {
    output += 'No data in properties table.\n';
  }

  const { data: buckets, error: bError } = await supabase.storage.listBuckets();
  if (bError) {
    output += 'Bucket Error: ' + JSON.stringify(bError) + '\n';
  } else {
    output += 'BUCKETS: ' + buckets.map(b => b.name).join(', ') + '\n';
  }
  
  fs.writeFileSync('c:\\Users\\samuk\\Documents\\Auprolis\\schema_info.txt', output);
  console.log('Written to schema_info.txt');
}

inspect();
