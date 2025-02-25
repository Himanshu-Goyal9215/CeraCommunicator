import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

interface DiagnosisListProps {
  diagnoses?: Array<{
    condition: string;
    description: string;
    confidence: number;
  }>;
}

export default function DiagnosisList({ diagnoses }: DiagnosisListProps) {
  if (!diagnoses) {
    return <Skeleton className="w-full h-[400px]" />;
  }

  return (
    <ScrollArea className="h-[400px]">
      <div className="space-y-4 p-4">
        {diagnoses.map((diagnosis, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{diagnosis.condition}</h3>
              <span className="text-sm text-muted-foreground">
                {Math.round(diagnosis.confidence * 100)}% confidence
              </span>
            </div>
            <Progress value={diagnosis.confidence * 100} />
            <p className="text-sm text-muted-foreground">
              {diagnosis.description}
            </p>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
