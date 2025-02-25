import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mic, MicOff, PlayCircle } from "lucide-react";
import { sampleConversation } from "@/lib/testData";

interface TranscriptionPaneProps {
  transcript: string;
  isListening: boolean;
  onStart: () => void;
  onStop: () => void;
  onTest?: (text: string) => void;
}

export default function TranscriptionPane({
  transcript,
  isListening,
  onStart,
  onStop,
  onTest
}: TranscriptionPaneProps) {
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Live Transcription</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {isListening ? "Recording in progress..." : "Ready to record"}
          </p>
        </div>
        <div className="space-x-3">
          <Button
            variant={isListening ? "destructive" : "default"}
            size="lg"
            onClick={isListening ? onStop : onStart}
            className="shadow-sm"
          >
            {isListening ? (
              <>
                <MicOff className="mr-2 h-5 w-5" />
                Stop Recording
              </>
            ) : (
              <>
                <Mic className="mr-2 h-5 w-5" />
                Start Recording
              </>
            )}
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => onTest?.(sampleConversation)}
            className="shadow-sm"
          >
            <PlayCircle className="mr-2 h-5 w-5" />
            Test with Sample
          </Button>
        </div>
      </div>

      <ScrollArea className="h-[400px] w-full rounded-lg border bg-muted/5 p-4">
        <p className={`text-sm leading-relaxed whitespace-pre-wrap ${!transcript && 'text-muted-foreground italic'}`}>
          {transcript || "Transcription will appear here..."}
        </p>
      </ScrollArea>
    </div>
  );
}