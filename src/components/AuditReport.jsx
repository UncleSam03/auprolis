import React from 'react';
import { 
  CheckCircle, XCircle, AlertTriangle, Info, Download, Activity, Shield, Globe, Users, Database
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const StatusIcon = ({ status }) => {
  if (status === 'pass') return <CheckCircle className="h-5 w-5 text-green-500" />;
  if (status === 'fail') return <XCircle className="h-5 w-5 text-red-500" />;
  if (status === 'warning') return <AlertTriangle className="h-5 w-5 text-amber-500" />;
  return <Info className="h-5 w-5 text-blue-500" />;
};

const StatusBadge = ({ status }) => {
  const styles = {
    pass: 'bg-green-100 text-green-800 border-green-200',
    fail: 'bg-red-100 text-red-800 border-red-200',
    warning: 'bg-amber-100 text-amber-800 border-amber-200',
    pending: 'bg-gray-100 text-gray-800 border-gray-200',
    info: 'bg-blue-100 text-blue-800 border-blue-200'
  };
  return (
    <Badge variant="outline" className={`uppercase ${styles[status] || styles.pending}`}>
      {status}
    </Badge>
  );
};

const SectionResult = ({ title, icon: Icon, data }) => {
  if (!data) return null;

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-slate-100 rounded-lg">
               <Icon className="h-5 w-5 text-slate-600" />
            </div>
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              <CardDescription className="text-xs">Executed: {new Date(data.timestamp).toLocaleTimeString()}</CardDescription>
            </div>
          </div>
          <StatusBadge status={data.status} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.tests.map((test, idx) => (
            <div key={idx} className="flex items-start justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
              <div className="flex gap-3">
                <StatusIcon status={test.status} />
                <div>
                  <p className="font-medium text-sm text-slate-900">{test.name}</p>
                  <p className="text-xs text-slate-500">{test.message}</p>
                </div>
              </div>
              <Badge variant="secondary" className="text-[10px] capitalize bg-white border-slate-200 text-slate-500">
                {test.severity}
              </Badge>
            </div>
          ))}
          {data.tests.length === 0 && (
            <div className="text-center py-4 text-slate-400 text-sm">No tests executed yet.</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const AuditReport = ({ report, loading }) => {
  if (!report && !loading) return <div className="text-center p-8">No report data available. Run the audit.</div>;

  if (loading) {
    return (
       <div className="space-y-6 animate-pulse">
          <div className="h-32 bg-slate-100 rounded-xl"></div>
          <div className="grid grid-cols-2 gap-4">
             <div className="h-64 bg-slate-100 rounded-xl"></div>
             <div className="h-64 bg-slate-100 rounded-xl"></div>
          </div>
       </div>
    );
  }

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(report, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `audit-report-${Date.now()}.json`);
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="space-y-8">
      {/* Summary Card */}
      <Card className="bg-slate-900 text-white border-slate-800">
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">System Health Score: {report.summary.score}/100</h2>
              <p className="text-slate-400">
                Audit ID: {report.metadata.id} • {new Date(report.metadata.timestamp).toLocaleString()}
              </p>
            </div>
            <div className="flex gap-4">
               <div className="text-center px-4 py-2 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="text-2xl font-bold text-green-400">{report.summary.passed}</div>
                  <div className="text-xs text-slate-400 uppercase">Passed</div>
               </div>
               <div className="text-center px-4 py-2 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="text-2xl font-bold text-red-400">{report.summary.failed}</div>
                  <div className="text-xs text-slate-400 uppercase">Failed</div>
               </div>
               <div className="text-center px-4 py-2 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="text-2xl font-bold text-amber-400">{report.summary.warnings}</div>
                  <div className="text-xs text-slate-400 uppercase">Warnings</div>
               </div>
            </div>
            <Button variant="outline" className="text-slate-900 bg-white hover:bg-slate-200" onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" /> Export Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Details */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="bg-slate-100">
          <TabsTrigger value="all">All Sections</TabsTrigger>
          <TabsTrigger value="issues">Issues Only ({report.summary.failed + report.summary.warnings})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
           <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <SectionResult title="Frontend & UI" icon={Globe} data={report.sections.frontend} />
              <SectionResult title="Backend & Database" icon={Database} data={report.sections.backend} />
              <SectionResult title="Integration & API" icon={Activity} data={report.sections.integration} />
              <SectionResult title="User Journey" icon={Users} data={report.sections.userJourney} />
           </div>
        </TabsContent>

        <TabsContent value="issues">
           <Card>
             <CardHeader>
               <CardTitle>Issues & Recommendations</CardTitle>
               <CardDescription>Action items requiring attention based on audit findings.</CardDescription>
             </CardHeader>
             <CardContent>
               {report.recommendations.length === 0 ? (
                 <div className="text-center py-8 text-green-600">
                    <CheckCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No issues found! System is healthy.</p>
                 </div>
               ) : (
                 <div className="space-y-4">
                   {report.recommendations.map((rec, idx) => (
                     <div key={idx} className="p-4 border rounded-lg bg-slate-50 border-slate-200">
                        <div className="flex items-center gap-2 mb-2">
                           {rec.severity === 'critical' || rec.severity === 'fail' ? (
                             <Badge variant="destructive">Critical</Badge>
                           ) : (
                             <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">Warning</Badge>
                           )}
                           <span className="font-bold text-slate-800">{rec.area}</span>
                        </div>
                        <p className="text-sm text-slate-600 mb-2"><strong>Issue:</strong> {rec.issue}</p>
                        <p className="text-sm text-slate-600"><strong>Recommendation:</strong> {rec.action}</p>
                     </div>
                   ))}
                 </div>
               )}
             </CardContent>
           </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuditReport;