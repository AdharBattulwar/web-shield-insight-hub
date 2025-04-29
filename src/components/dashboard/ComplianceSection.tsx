
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SecurityCheckItem, SecurityCheckStatus } from "./SecurityCheckItem";
import { Flag, ShieldCheck } from "lucide-react";

export interface ComplianceCheck {
  id: string;
  title: string;
  status: SecurityCheckStatus;
  description?: string;
}

interface ComplianceSectionProps {
  title: string;
  description: string;
  checks: ComplianceCheck[];
  loading?: boolean;
}

export function ComplianceSection({
  title,
  description,
  checks,
  loading = false,
}: ComplianceSectionProps) {
  const statusSummary = checks.reduce(
    (acc, check) => {
      if (check.status in acc) {
        acc[check.status as keyof typeof acc]++;
      }
      return acc;
    },
    { pass: 0, fail: 0, warning: 0, info: 0, na: 0 }
  );

  // Get the most critical status
  const getCriticalStatus = () => {
    if (statusSummary.fail > 0) return "fail";
    if (statusSummary.warning > 0) return "warning";
    if (statusSummary.pass > 0) return "pass";
    return "na";
  };

  const criticalStatus = getCriticalStatus();

  return (
    <Card className="security-card">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          {!loading && (
            <div className="flex items-center gap-1.5">
              {criticalStatus === "fail" ? (
                <Flag className="h-4 w-4 text-red-500" />
              ) : (
                <ShieldCheck className="h-4 w-4 text-green-500" />
              )}
              <span
                className={`text-xs font-medium ${
                  criticalStatus === "fail"
                    ? "text-red-500"
                    : criticalStatus === "warning"
                    ? "text-amber-500"
                    : "text-green-500"
                }`}
              >
                {criticalStatus === "fail"
                  ? `${statusSummary.fail} Issue${statusSummary.fail > 1 ? "s" : ""} Found`
                  : criticalStatus === "warning"
                  ? `${statusSummary.warning} Warning${statusSummary.warning > 1 ? "s" : ""}`
                  : "All Passed"}
              </span>
            </div>
          )}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {loading ? (
          <>
            <div className="h-12 bg-muted rounded animate-pulse mb-2" />
            <div className="h-12 bg-muted rounded animate-pulse mb-2" />
            <div className="h-12 bg-muted rounded animate-pulse" />
          </>
        ) : (
          checks.map((check) => (
            <SecurityCheckItem
              key={check.id}
              title={check.title}
              status={check.status}
              description={check.description}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
}
