
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
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-[400px] bg-white">
      {!hasRecorded ? (
        <div className="w-full max-w-md flex flex-col items-center">
          <h1 className="text-2xl font-semibold mb-8">Voice Recorder</h1>
          
          {/* Microphone Button */}
          <div className={cn(
            "w-32 h-32 rounded-full flex items-center justify-center mb-8",
            isListening ? "bg-red-500" : "bg-red-400",
            "relative"
          )}>
            <div className={cn(
              "absolute w-40 h-40 rounded-full border-4 border-mint-100 -z-10",
              isListening && "animate-ping"
            )} />
            <div className={cn(
              "absolute w-36 h-36 rounded-full border-4 border-mint-200 -z-10"
            )} />
            <Mic className="w-12 h-12 text-white" />
          </div>

          {/* Timer */}
          <div className="text-xl font-mono mb-6">
            {formatTime(recordingTime)}
          </div>

          {/* Waveform */}
          <div className="w-full flex items-center justify-center gap-[2px] mb-8 h-8">
            {Array.from({ length: 32 }).map((_, i) => (
              <div
                key={i}
                className="w-1 bg-red-400"
                style={{
                  height: isListening ? `${Math.random() * 100}%` : '20%',
                }}
              />
            ))}
          </div>

          {/* Control Button */}
          <Button
            variant={isListening ? "destructive" : "default"}
            size="lg"
            className={cn(
              "w-48 rounded-full font-medium",
              isListening ? "bg-red-500" : "bg-red-400"
            )}
            onClick={isListening ? handleStop : onStart}
          >
            {isListening ? "Stop recording" : "Start"}
          </Button>
        </div>
      ) : (
        <div className="w-full max-w-lg mx-auto text-center">
          <h2 className="text-xl font-semibold mb-6">{transcript}</h2>
          <div className="space-x-4">
            <Button
              variant="default"
              size="lg"
              className="w-32 rounded-full bg-red-400"
              onClick={() => {
                sendMessage({ type: 'transcript', text: transcript });
              }}
            >
              Submit
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-32 rounded-full"
              onClick={() => {
                setHasRecorded(false);
              }}
            >
              Re-record
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
