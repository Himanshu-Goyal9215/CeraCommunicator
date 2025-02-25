import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

interface DiagnosisListProps {
  diagnoses?: Array<{
    condition: string;
    description: string;
    confidence: number;
  }>;
}

export default function DiagnosisList({ diagnoses }: DiagnosisListProps) {
  if (!diagnoses) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  return (
    <ScrollArea className="h-[400px]">
      <div className="space-y-4">
        {diagnoses.map((diagnosis, index) => (
          <Card key={index} className="p-4 bg-muted/5">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className={`h-5 w-5 ${index === 0 ? 'text-destructive' : 'text-muted-foreground'}`} />
                  <h3 className="font-semibold">{diagnosis.condition}</h3>
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  {Math.round(diagnosis.confidence * 100)}% confidence
                </span>
              </div>
              <Progress 
                value={diagnosis.confidence * 100} 
                className={index === 0 ? 'bg-destructive/20' : ''} 
              />
              <p className="text-sm text-muted-foreground">
                {diagnosis.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}