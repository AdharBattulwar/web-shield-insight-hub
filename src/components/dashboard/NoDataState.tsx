
import { ShieldCheck } from "lucide-react";

export function NoDataState() {
  return (
    <div className="flex flex-col items-center justify-center p-10 bg-muted/20 rounded-lg border border-dashed text-center space-y-4">
      <div className="bg-primary/10 p-4 rounded-full">
        <ShieldCheck className="h-12 w-12 text-primary" />
      </div>
      <h3 className="text-xl font-semibold">No Test Results</h3>
      <p className="text-muted-foreground max-w-md">
        Enter a website URL above to analyze its security headers, compliance status, and generate a security grade.
      </p>
    </div>
  );
}
