import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { Check, ArrowRight } from "lucide-react";

interface ClinicalPathwayProps {
  pathway?: {
    steps: string[];
    recommendations: string[];
  };
}

export default function ClinicalPathway({ pathway }: ClinicalPathwayProps) {
  if (!pathway) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  return (
    <ScrollArea className="h-[400px]">
      <div className="space-y-6">
        <section>
          <h3 className="font-semibold text-primary mb-4">Next Steps</h3>
          <div className="space-y-3">
            {pathway.steps.map((step, index) => (
              <Card key={index} className="p-4 bg-muted/5">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    {index === pathway.steps.length - 1 ? (
                      <ArrowRight className="h-4 w-4 text-primary" />
                    ) : (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <p className="text-sm">{step}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h3 className="font-semibold text-primary mb-4">Recommendations</h3>
          <div className="space-y-3">
            {pathway.recommendations.map((rec, index) => (
              <Card key={index} className="p-4 bg-muted/5">
                <p className="text-sm text-muted-foreground">
                  {rec}
                </p>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </ScrollArea>
  );
}