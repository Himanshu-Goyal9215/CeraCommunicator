import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mic, MicOff } from "lucide-react";

interface TranscriptionPaneProps {
  transcript: string;
  isListening: boolean;
  onStart: () => void;
  onStop: () => void;
}

export default function TranscriptionPane({
  transcript,
  isListening,
  onStart,
  onStop
}: TranscriptionPaneProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Live Transcription</h2>
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
      </div>

      <ScrollArea className="h-[400px] w-full rounded-md border p-4">
        <p className="text-sm leading-relaxed">
          {transcript || "Transcription will appear here..."}
        </p>
      </ScrollArea>
    </div>
  );
}
