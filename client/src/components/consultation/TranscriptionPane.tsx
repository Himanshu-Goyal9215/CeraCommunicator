import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  transcript: string;
  isListening: boolean;
  onStart: () => void;
  onStop: () => void;
  sendMessage: (message: { type: string; text: string }) => void; // Added sendMessage prop
}

export default function TranscriptionPane({ transcript, isListening, onStart, onStop, sendMessage }: Props) {
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasRecorded, setHasRecorded] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isListening) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isListening]);

  const handleStop = () => {
    onStop();
    setHasRecorded(true);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-[400px] bg-[#0a0a2e] text-white">
      {!hasRecorded ? (
        <>
          <div className={cn(
            "w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-blue-400 flex items-center justify-center mb-4",
            isListening && "animate-pulse"
          )}>
            <Mic className="w-12 h-12" />
          </div>

          {/* Waveform visualization */}
          <div className="flex items-center gap-[2px] mb-6 h-24">
            {Array.from({ length: 32 }).map((_, i) => (
              <div
                key={i}
                className="w-2 bg-gradient-to-t from-purple-600 to-pink-500 transition-all duration-75"
                style={{
                  height: isListening ? `${Math.random() * 100}%` : '20%',
                  opacity: isListening ? 1 : 0.5
                }}
              />
            ))}
          </div>

          {/* Control buttons */}
          <div className="space-y-3">
            {isListening ? (
              <Button
                variant="destructive"
                size="sm"
                className="w-24 rounded-full bg-pink-600 hover:bg-pink-700"
                onClick={handleStop}
              >
                Stop
              </Button>
            ) : (
              <Button
                variant="default"
                size="sm"
                className="w-24 rounded-full bg-blue-600 hover:bg-blue-700"
                onClick={onStart}
              >
                Start
              </Button>
            )}
          </div>
        </>
      ) : (
        <div className="w-full max-w-lg mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-6">{transcript}</h2>
          <Button
            variant="secondary"
            size="sm"
            className="w-24 rounded-full"
            onClick={() => sendMessage({ type: 'transcript', text: transcript })}
          >
            Submit
          </Button>
        </div>
      )}
    </div>
  );
}