
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TestResultInfoCardProps {
  title: string;
  value: string | React.ReactNode;
  loading?: boolean;
  className?: string;
}

export function TestResultInfoCard({
  title,
  value,
  loading = false,
  className,
}: TestResultInfoCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-6 w-3/4 bg-muted rounded animate-pulse" />
        ) : (
          <div className="text-lg font-semibold">{value}</div>
        )}
      </CardContent>
    </Card>
  );
}
