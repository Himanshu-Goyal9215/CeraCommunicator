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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Live Transcription</h2>
        <div className="space-x-2">
          <Button
            variant={isListening ? "destructive" : "default"}
            onClick={isListening ? onStop : onStart}
          >
            {isListening ? (
              <>
                <MicOff className="mr-2 h-4 w-4" />
                Stop Recording
              </>
            ) : (
              <>
                <Mic className="mr-2 h-4 w-4" />
                Start Recording
              </>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={() => onTest?.(sampleConversation)}
          >
            <PlayCircle className="mr-2 h-4 w-4" />
            Test with Sample
          </Button>
        </div>
      </div>

      <ScrollArea className="h-[400px] w-full rounded-md border p-4">
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {transcript || "Transcription will appear here..."}
        </p>
      </ScrollArea>
    </div>
  );
}