
import React, { useState } from "react";
import { TestForm } from "@/components/dashboard/TestForm";
import { NoDataState } from "@/components/dashboard/NoDataState";
import { GradeScoreCard } from "@/components/dashboard/GradeScoreCard";
import { TestResultInfoCard } from "@/components/dashboard/TestResultInfoCard";
import { ComplianceSection } from "@/components/dashboard/ComplianceSection";
import { Button } from "@/components/ui/button";
import { simulateWebsiteTest, TestResult } from "@/lib/test-simulator";
import { useToast } from "@/components/ui/use-toast";
import { Download, RefreshCw } from "lucide-react";

const Index = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);

  const handleStartTest = async (url: string) => {
    setLoading(true);
    try {
      const result = await simulateWebsiteTest(url);
      setTestResult(result);
      toast({
        title: "Test completed",
        description: `Security scan of ${result.domain} completed successfully.`,
      });
    } catch (error) {
      toast({
        title: "Test failed",
        description: "An error occurred while testing the website.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRefreshTest = () => {
    if (testResult?.url) {
      handleStartTest(testResult.url);
    }
  };

  const handleDownloadReport = () => {
    toast({
      title: "Report download started",
      description: "Your security report is being generated as PDF.",
    });
    
    // In a real app, we'd generate a PDF here
    setTimeout(() => {
      toast({
        title: "Report ready",
        description: "Your security report has been downloaded."
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="dashboard-gradient text-white">
        <div className="container py-8 md:py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Website Security Test Dashboard</h1>
          <p className="text-white/90 max-w-xl">
            Analyze websites for security vulnerabilities and compliance with industry standards.
          </p>
        </div>
      </header>

      <main className="container py-8 space-y-8">
        <TestForm onSubmit={handleStartTest} loading={loading} />

        {!testResult && !loading ? (
          <NoDataState />
        ) : (
          <div className="space-y-8">
            {testResult && (
              <div className="flex flex-row justify-between items-center">
                <div>
                  <h2 className="text-2xl font-semibold">
                    Results for {testResult.domain}
                  </h2>
                  <p className="text-muted-foreground">
                    Test completed in {testResult.testDuration.toFixed(1)}s
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={handleRefreshTest} disabled={loading}>
                    <RefreshCw className="mr-1.5 h-4 w-4" />
                    Refresh
                  </Button>
                  <Button onClick={handleDownloadReport} disabled={loading}>
                    <Download className="mr-1.5 h-4 w-4" />
                    Download Report
                  </Button>
                </div>
              </div>
            )}

            {/* Score and Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <GradeScoreCard 
                grade={testResult?.grade || null}
                score={testResult?.score}
                loading={loading}
                className="md:row-span-2"
              />
              <TestResultInfoCard
                title="Domain"
                value={testResult?.domain || ""}
                loading={loading}
              />
              <TestResultInfoCard
                title="Server IP"
                value={testResult?.ip || ""}
                loading={loading}
              />
              <TestResultInfoCard
                title="Test Time"
                value={testResult ? new Date(testResult.timestamp).toLocaleString() : ""}
                loading={loading}
                className="md:col-span-2"
              />
            </div>

            {/* Compliance Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ComplianceSection
                title="Security Headers"
                description="Checks for presence of critical security headers"
                checks={testResult?.securityHeaders || []}
                loading={loading}
              />
              <ComplianceSection
                title="PCI DSS Compliance"
                description="Payment Card Industry Data Security Standard checks"
                checks={testResult?.pciCompliance || []}
                loading={loading}
              />
              <ComplianceSection
                title="GDPR Compliance"
                description="General Data Protection Regulation checks"
                checks={testResult?.gdprCompliance || []}
                loading={loading}
                className="lg:col-span-2"
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
