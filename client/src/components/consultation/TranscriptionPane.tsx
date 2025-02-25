
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  transcript: string;
  isListening: boolean;
  onStart: () => void;
  onStop: () => void;
  sendMessage: (message: { type: string; text: string }) => void;
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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStop = () => {
    onStop();
    setHasRecorded(true);
    sendMessage({ type: 'transcript', text: transcript });
  };

  const handleReRecord = () => {
    setHasRecorded(false);
    sendMessage({ type: 'clear' });
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-[400px] bg-white">
      {!hasRecorded ? (
        <div className="w-full max-w-md flex flex-col items-center">
          <h1 className="text-2xl font-semibold mb-8">Voice Recorder</h1>

          <div className={cn(
            "w-40 h-40 rounded-full flex items-center justify-center mb-8",
            isListening ? "bg-blue-600" : "bg-blue-500",
            "relative shadow-lg transition-all duration-200 hover:scale-105"
          )}>
            <div className={cn(
              "absolute w-48 h-48 rounded-full border-4 border-blue-200 -z-10",
              isListening && "animate-ping"
            )} />
            <div className={cn(
              "absolute w-44 h-44 rounded-full border-4 border-blue-300 -z-10"
            )} />
            <div className={cn(
              "absolute inset-2 rounded-full bg-gradient-to-br from-blue-400 to-blue-600"
            )} />
            <Mic className="w-16 h-16 text-white relative z-10" />
          </div>

          <div className="text-xl font-mono mb-6">
            {formatTime(recordingTime)}
          </div>

          <div className="w-full flex items-center justify-center gap-[2px] mb-8 h-8">
            {Array.from({ length: 32 }).map((_, i) => (
              <div
                key={i}
                className="w-1 bg-blue-400"
                style={{
                  height: isListening ? `${Math.random() * 100}%` : '20%',
                }}
              />
            ))}
          </div>

          <Button
            variant={isListening ? "destructive" : "default"}
            size="lg"
            className={cn(
              "w-48 rounded-full font-medium",
              isListening ? "bg-blue-600" : "bg-blue-500"
            )}
            onClick={isListening ? handleStop : onStart}
          >
            {isListening ? "Stop recording" : "Start"}
          </Button>
        </div>
      ) : (
        <div className="w-full max-w-lg mx-auto text-center">
          <h2 className="text-xl font-semibold mb-6">{transcript}</h2>
          <Button
            variant="outline"
            size="lg"
            className="w-32 rounded-full"
            onClick={handleReRecord}
          >
            Re-record
          </Button>
        </div>
      )}
    </div>
  );
}
