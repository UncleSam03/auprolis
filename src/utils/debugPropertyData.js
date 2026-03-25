import { supabase } from '@/lib/customSupabaseClient';

export const debugPropertyData = async () => {
  console.group('🔍 DEBUG: Property Data Diagnostic');
  
  const report = {
    connection: false,
    tableExists: false,
    columnsValid: false,
    rowCount: 0,
    sampleData: null,
    errors: []
  };

  try {
    // 1. Test basic connection
    const { data: healthCheck, error: healthError } = await supabase.from('properties').select('count', { count: 'exact', head: true });
    
    if (healthError) {
      report.errors.push(`Connection failed: ${healthError.message}`);
      console.error('❌ Supabase connection failed', healthError);
    } else {
      report.connection = true;
      report.tableExists = true; // Implied if query worked
      report.rowCount = healthCheck; // Usually comes as count if head:true used correctly or null depending on SDK version
      // Correct way to get count often depends on exact version, trying standard select first row next
      console.log('✅ Supabase connection successful');
    }

    // 2. Query actual data
    const { data, error, count } = await supabase
      .from('properties')
      .select('*', { count: 'exact' })
      .limit(1);

    if (error) {
      report.errors.push(`Query failed: ${error.message}`);
      console.error('❌ Query failed', error);
    } else {
      report.rowCount = count;
      
      if (data && data.length > 0) {
        report.sampleData = data[0];
        console.log('✅ Data retrieved successfully. Total count:', count);
        console.log('📄 Sample Row:', data[0]);

        // 3. Validate key columns expected by app
        const expectedColumns = [
          'id', 'listing_title', 'property_type', 'address_lot_number', 
          'auction_date', 'price_usd', 'status'
        ];
        
        const rowKeys = Object.keys(data[0]);
        const missingCols = expectedColumns.filter(col => !rowKeys.includes(col));

        if (missingCols.length > 0) {
          report.errors.push(`Missing expected columns: ${missingCols.join(', ')}`);
          console.warn('⚠️ Missing columns:', missingCols);
        } else {
          report.columnsValid = true;
          console.log('✅ All key columns present');
        }
      } else {
        console.warn('⚠️ Table is empty');
      }
    }

  } catch (err) {
    report.errors.push(`Unexpected error: ${err.message}`);
    console.error('❌ Unexpected exception', err);
  }

  console.groupEnd();
  return report;
};