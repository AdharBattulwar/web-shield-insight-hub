
import { cn } from "@/lib/utils";
import { Check, Flag, Info, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export type SecurityCheckStatus = "pass" | "fail" | "warning" | "info" | "na";

interface SecurityCheckItemProps {
  title: string;
  status: SecurityCheckStatus;
  description?: string;
  className?: string;
}

export function SecurityCheckItem({
  title,
  status,
  description,
  className,
}: SecurityCheckItemProps) {
  const statusConfig = {
    pass: {
      icon: Check,
      color: "text-green-600 bg-green-100 dark:bg-green-950/40",
      label: "Pass",
    },
    fail: {
      icon: X,
      color: "text-red-600 bg-red-100 dark:bg-red-950/40",
      label: "Fail",
    },
    warning: {
      icon: Flag,
      color: "text-amber-600 bg-amber-100 dark:bg-amber-950/40",
      label: "Warning",
    },
    info: {
      icon: Info,
      color: "text-blue-600 bg-blue-100 dark:bg-blue-950/40",
      label: "Info",
    },
    na: {
      icon: Info,
      color: "text-muted-foreground bg-muted/50",
      label: "N/A",
    },
  };

  const { icon: Icon, color, label } = statusConfig[status];

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg border p-3 shadow-sm",
        className
      )}
    >
      <div className={cn("p-1.5 rounded-full", color)}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center">
          <p className="text-sm font-medium leading-none">{title}</p>
          {description && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-3.5 w-3.5 ml-1.5 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs text-xs">{description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}
