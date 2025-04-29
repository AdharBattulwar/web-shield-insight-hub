
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type GradeType = "A" | "B" | "C" | "D" | "F" | null;

interface GradeScoreCardProps {
  grade: GradeType;
  score?: number;
  loading?: boolean;
  className?: string;
}

export function GradeScoreCard({
  grade,
  score,
  loading = false,
  className,
}: GradeScoreCardProps) {
  const getGradeColor = (grade: GradeType) => {
    switch (grade) {
      case "A":
        return "bg-security-grade-a text-green-800";
      case "B":
        return "bg-security-grade-a/80 text-green-800";
      case "C":
        return "bg-security-grade-c text-amber-800";
      case "D":
        return "bg-security-grade-c/80 text-amber-800";
      case "F":
        return "bg-security-grade-f text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-0">
        <div
          className={cn(
            "flex flex-col items-center justify-center aspect-square w-full h-full transition-colors",
            loading ? "animate-pulse bg-muted" : getGradeColor(grade)
          )}
        >
          {loading ? (
            <div className="h-20 w-20 rounded-full bg-muted-foreground/20 animate-pulse-slow" />
          ) : (
            <>
              <span className="text-6xl md:text-7xl lg:text-8xl font-bold">
                {grade || "?"}
              </span>
              {score !== undefined && (
                <span className="text-sm font-medium mt-2 opacity-90">
                  Score: {score}/100
                </span>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
