import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Check } from "lucide-react";

interface ClinicalPathwayProps {
  pathway?: {
    steps: string[];
    recommendations: string[];
  };
}

export default function ClinicalPathway({ pathway }: ClinicalPathwayProps) {
  if (!pathway) {
    return <Skeleton className="w-full h-[400px]" />;
  }

  return (
    <ScrollArea className="h-[400px]">
      <div className="space-y-6 p-4">
        <section>
          <h3 className="font-semibold mb-4">Next Steps</h3>
          <div className="space-y-2">
            {pathway.steps.map((step, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <p className="text-sm">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="font-semibold mb-4">Recommendations</h3>
          <ul className="list-disc list-inside space-y-2">
            {pathway.recommendations.map((rec, index) => (
              <li key={index} className="text-sm text-muted-foreground">
                {rec}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </ScrollArea>
  );
}
