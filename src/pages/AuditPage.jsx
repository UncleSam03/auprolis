import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { PlayCircle, ArrowLeft, ShieldCheck } from 'lucide-react';
import AuditReport from '@/components/AuditReport';
import { runFrontendAudit } from '@/utils/auditTests';
import { runBackendAudit } from '@/utils/backendAudit';
import { runIntegrationAudit } from '@/utils/integrationAudit';
import { runUserJourneyAudit } from '@/utils/userJourneyAudit';
import { generateAuditReport } from '@/utils/auditReportTemplate';
import { useToast } from '@/components/ui/use-toast';

const AuditPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/signin');
      return;
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('user_type')
      .eq('id', session.user.id)
      .single();

    if (profile?.user_type !== 'admin') {
      toast({ 
        variant: "destructive", 
        title: "Access Denied", 
        description: "Only administrators can access system audits." 
      });
      navigate('/dashboard');
      return;
    }
    
    setIsAdmin(true);
    setCheckingAuth(false);
  };

  const runAudit = async () => {
    setLoading(true);
    setProgress(0);
    setReport(null);

    try {
      // Step 1: Frontend
      setProgress(10);
      const frontendResults = await runFrontendAudit();
      
      // Step 2: Backend
      setProgress(40);
      const backendResults = await runBackendAudit();
      
      // Step 3: Integration
      setProgress(70);
      const integrationResults = await runIntegrationAudit();
      
      // Step 4: User Journey
      setProgress(90);
      const userJourneyResults = await runUserJourneyAudit();

      // Step 5: Compile
      const finalReport = generateAuditReport(
        frontendResults,
        backendResults,
        integrationResults,
        userJourneyResults
      );

      setReport(finalReport);
      setProgress(100);
      toast({ title: "Audit Complete", description: "System scan finished successfully." });

    } catch (error) {
      console.error(error);
      toast({ variant: "destructive", title: "Audit Failed", description: error.message });
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) return null;

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <Helmet>
        <title>System Audit - Auprolis</title>
      </Helmet>

      {/* Header */}
      <div className="bg-slate-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
               <Button variant="ghost" size="icon" onClick={() => navigate('/admin')} className="text-slate-300 hover:text-white hover:bg-slate-800">
                  <ArrowLeft className="h-5 w-5" />
               </Button>
               <div>
                  <h1 className="text-2xl font-bold flex items-center gap-2">
                    <ShieldCheck className="h-6 w-6 text-green-400" />
                    System Audit Console
                  </h1>
                  <p className="text-slate-400 text-sm">Diagnostic tools and health verification</p>
               </div>
            </div>
            
            <Button 
              size="lg" 
              onClick={runAudit} 
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg shadow-green-900/20"
            >
              <PlayCircle className={`mr-2 h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
              {loading ? `Running Audit ${progress}%` : 'Run System Audit'}
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
         <AuditReport report={report} loading={loading} />
      </div>
    </div>
  );
};

export default AuditPage;