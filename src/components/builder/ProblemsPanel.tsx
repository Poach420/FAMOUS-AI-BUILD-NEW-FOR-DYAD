import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, AlertTriangle, Info } from "lucide-react";

export interface Problem {
  id: string;
  severity: "error" | "warning" | "info";
  message: string;
  file?: string;
  line?: number;
}

interface ProblemsPanelProps {
  problems?: Problem[];
}

const ProblemsPanel = ({ problems = [] }: ProblemsPanelProps) => {
  const getSeverityIcon = (severity: Problem['severity']) => {
    switch (severity) {
      case 'error':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'info':
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const getSeverityBadge = (severity: Problem['severity']) => {
    const variants = {
      error: "destructive" as const,
      warning: "secondary" as const,
      info: "outline" as const,
    };
    return <Badge variant={variants[severity]}>{severity.toUpperCase()}</Badge>;
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Problems</CardTitle>
        <CardDescription>
          {problems.length === 0 
            ? "No issues detected" 
            : `${problems.length} issue(s) found`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] rounded-md border p-4">
          {problems.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <p>No problems to display. Your code looks good!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {problems.map((problem) => (
                <div 
                  key={problem.id} 
                  className="flex gap-3 p-3 rounded-md border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {getSeverityIcon(problem.severity)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      {getSeverityBadge(problem.severity)}
                      {problem.file && (
                        <span className="text-xs text-muted-foreground">
                          {problem.file}
                          {problem.line && `:${problem.line}`}
                        </span>
                      )}
                    </div>
                    <p className="text-sm">{problem.message}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ProblemsPanel;
