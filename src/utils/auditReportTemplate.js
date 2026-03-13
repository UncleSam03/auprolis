export const generateAuditReport = (frontend, backend, integration, userJourney) => {
    const timestamp = new Date().toISOString();
    
    // Calculate totals
    const allTests = [
      ...frontend.tests,
      ...backend.tests,
      ...integration.tests,
      ...userJourney.tests
    ];
    
    const passed = allTests.filter(t => t.status === 'pass').length;
    const failed = allTests.filter(t => t.status === 'fail').length;
    const warnings = allTests.filter(t => t.status === 'warning').length;
    const total = allTests.length;
    const score = total > 0 ? Math.round((passed / total) * 100) : 0;
  
    return {
      metadata: {
        id: `AUDIT-${Date.now()}`,
        timestamp,
        tester: 'Automated System Audit',
        environment: import.meta.env.MODE,
        version: '1.0.0'
      },
      summary: {
        totalTests: total,
        passed,
        failed,
        warnings,
        score,
        overallStatus: failed > 0 ? 'FAIL' : (warnings > 0 ? 'WARNING' : 'PASS')
      },
      sections: {
        frontend,
        backend,
        integration,
        userJourney
      },
      recommendations: allTests
        .filter(t => t.status !== 'pass')
        .map(t => ({
          area: t.name,
          issue: t.message,
          severity: t.severity,
          action: `Investigate ${t.name} configuration and logs.`
        }))
    };
  };