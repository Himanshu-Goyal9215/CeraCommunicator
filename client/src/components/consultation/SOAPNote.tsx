import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

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
    return <Skeleton className="w-full h-[400px]" />;
  }

  return (
    <ScrollArea className="h-[400px]">
      <div className="space-y-6 p-4">
        <section>
          <h3 className="font-semibold mb-2">Subjective</h3>
          <p className="text-sm text-muted-foreground whitespace-pre-wrap">
            {note.subjective}
          </p>
        </section>

        <section>
          <h3 className="font-semibold mb-2">Objective</h3>
          <p className="text-sm text-muted-foreground whitespace-pre-wrap">
            {note.objective}
          </p>
        </section>

        <section>
          <h3 className="font-semibold mb-2">Assessment</h3>
          <p className="text-sm text-muted-foreground whitespace-pre-wrap">
            {note.assessment}
          </p>
        </section>

        <section>
          <h3 className="font-semibold mb-2">Plan</h3>
          <p className="text-sm text-muted-foreground whitespace-pre-wrap">
            {note.plan}
          </p>
        </section>
      </div>
    </ScrollArea>
  );
}
