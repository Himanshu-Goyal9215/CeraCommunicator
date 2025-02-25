
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  transcript: string;
  isListening: boolean;
  onStart: () => void;
  onStop: () => void;
  onTest: (text: string) => void;
}

export default function TranscriptionPane({ transcript, isListening, onStart, onStop, onTest }: Props) {
  const [recordingTime, setRecordingTime] = useState(0);

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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-[400px] bg-[#0a0a2e] text-white">
      {/* Recording icon */}
      <div className={cn(
        "w-32 h-32 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center mb-6",
        isListening && "animate-pulse"
      )}>
        <Mic className="w-16 h-16" />
      </div>

      {/* Recording label and timer */}
      <div className="text-center mb-6">
        <h2 className="text-blue-400 text-xl mb-2">
          Recording {String(transcript.length).padStart(3, '0')}
        </h2>
        <div className="text-2xl font-medium">
          {formatTime(recordingTime)}
        </div>
      </div>

      {/* Waveform visualization */}
      <div className="flex items-center gap-1 mb-8">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "w-2 bg-gradient-to-t from-purple-600 to-pink-500",
              "animate-pulse transition-all duration-150",
              isListening ? "h-12" : "h-2"
            )}
            style={{
              height: isListening ? `${Math.random() * 48 + 8}px` : '8px',
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
      </div>

      {/* Control buttons */}
      {isListening ? (
        <Button
          variant="destructive"
          size="lg"
          className="w-32 rounded-full bg-pink-600 hover:bg-pink-700"
          onClick={onStop}
        >
          Stop
        </Button>
      ) : (
        <Button
          variant="default"
          size="lg"
          className="w-32 rounded-full bg-blue-600 hover:bg-blue-700"
          onClick={onStart}
        >
          Start
        </Button>
      )}

      {/* Recording indicators */}
      <div className="flex gap-2 mt-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "w-2 h-2 rounded-full",
              i === 2 ? "bg-purple-500" : "bg-gray-600"
            )}
          />
        ))}
      </div>
    </div>
  );
}
