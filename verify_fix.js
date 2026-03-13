
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabaseUrl = 'https://ecwflzrbtdkbmhbwklvm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjd2ZsenJidGRrYm1oYndrbHZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyNzAyMzYsImV4cCI6MjA4MDg0NjIzNn0.oxzrdEnyeDBmkurIqM9Dixdhs92nDVKXAMza84qusQI';

// Suppress storage warnings
global.localStorage = {
  getItem: () => null,
  setItem: () => null,
  removeItem: () => null,
};

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const logFile = 'verification_results.txt';
fs.writeFileSync(logFile, '--- VERIFICATION LOG ---\n');

function log(msg) {
    console.log(msg);
    fs.appendFileSync(logFile, msg + '\n');
}

async function testFetch() {
  log('--- STARTING VERIFICATION ---');
  try {
    log('Testing properties fetch with profiles join...');
    const { data, error } = await supabase
      .from('properties')
      .select('*, profiles:seller_id(name, email, phone)')
      .limit(1);

    if (error) {
      log('FETCH ERROR DETECTED');
      log('Status: ' + error.status);
      log('Code: ' + error.code);
      log('Message: ' + error.message);
      
      if (error.status === 406 || error.code === '406' || error.code === 'PGRST200') {
          log('Relationship error confirmed (406/PGRST200).');
          
          log('Attempting simple properties fetch to check columns...');
          const { data: pData, error: pError } = await supabase.from('properties').select('seller_id').limit(1);
          if (pError) {
              log('Properties seller_id check error: ' + pError.message);
          } else {
              log('Properties seller_id check: SUCCESS (column exists)');
          }

          log('Attempting simple profiles fetch...');
          const { data: profData, error: profError } = await supabase.from('profiles').select('*').limit(1);
          if (profError) {
              log('Simple profiles error: ' + profError.message);
          } else {
              if (profData && profData.length > 0) {
                  log('Simple profiles success. Columns: ' + Object.keys(profData[0]).join(', '));
              } else {
                  log('Simple profiles success, but table is EMPTY.');
              }
          }
      }
    } else {
      log('FETCH SUCCESS');
      log('Records: ' + data.length);
      if (data.length > 0) {
          log('Fields in record: ' + Object.keys(data[0]).join(', '));
          if (data[0].profiles) {
              log('Profile fields: ' + Object.keys(data[0].profiles).join(', '));
          } else {
              log('WARNING: Profile missing in join result');
          }
      }
    }
  } catch (err) {
    log('UNEXPECTED SCRIPT ERROR: ' + err.message);
  }
  log('--- VERIFICATION COMPLETE ---');
}

testFetch();
