
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { isValidUrl } from "@/lib/validation";

interface TestFormProps {
  onSubmit: (url: string) => void;
  loading?: boolean;
}

export function TestForm({ onSubmit, loading = false }: TestFormProps) {
  const { toast } = useToast();
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let processedUrl = url.trim();
    
    // Add https:// if protocol is missing
    if (!/^https?:\/\//i.test(processedUrl)) {
      processedUrl = `https://${processedUrl}`;
    }
    
    if (!isValidUrl(processedUrl)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid website URL",
        variant: "destructive",
      });
      return;
    }

    onSubmit(processedUrl);
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="Enter website URL (e.g., example.com)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1"
            disabled={loading}
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Testing..." : "Start Security Test"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
