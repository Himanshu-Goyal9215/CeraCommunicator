import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

interface SOAPNoteProps {
  note?: {
    subjective: string;
    objective: string;
    assessment: string;
    plan: string;
  };
}

export default function SOAPNote({ note }: SOAPNoteProps) {
  if (!note) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  return (
    <ScrollArea className="h-[400px]">
      <div className="space-y-6">
        <Card className="p-4 bg-muted/5">
          <h3 className="font-semibold text-primary mb-2">Subjective</h3>
          <p className="text-sm text-foreground/90 whitespace-pre-wrap">
            {note.subjective}
          </p>
        </Card>

        <Card className="p-4 bg-muted/5">
          <h3 className="font-semibold text-primary mb-2">Objective</h3>
          <p className="text-sm text-foreground/90 whitespace-pre-wrap">
            {note.objective}
          </p>
        </Card>

        <Card className="p-4 bg-muted/5">
          <h3 className="font-semibold text-primary mb-2">Assessment</h3>
          <p className="text-sm text-foreground/90 whitespace-pre-wrap">
            {note.assessment}
          </p>
        </Card>

        <Card className="p-4 bg-muted/5">
          <h3 className="font-semibold text-primary mb-2">Plan</h3>
          <p className="text-sm text-foreground/90 whitespace-pre-wrap">
            {note.plan}
          </p>
        </Card>
      </div>
    </ScrollArea>
  );
}