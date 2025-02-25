
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";
import { cn } from "@/lib/utils";
import { sampleConversation } from "@/lib/testData";

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
        "w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-blue-400 flex items-center justify-center mb-4",
        isListening && "animate-pulse"
      )}>
        <Mic className="w-12 h-12" />
      </div>

      {/* Recording label and timer */}
      <div className="text-center mb-4">
        <h2 className="text-blue-400 mb-1">
          Recording {String(transcript.length).padStart(3, '0')}
        </h2>
        <div className="text-2xl font-medium text-pink-500">
          {formatTime(recordingTime)}
        </div>
      </div>

      {/* Waveform visualization */}
      <div className="flex items-center gap-[2px] mb-6 h-12">
        {Array.from({ length: 32 }).map((_, i) => (
          <div
            key={i}
            className="w-1 bg-gradient-to-t from-purple-600 to-pink-500 transition-all duration-75"
            style={{
              height: isListening ? `${Math.random() * 100}%` : '20%',
              opacity: isListening ? 1 : 0.5
            }}
          />
        ))}
      </div>

      {/* Transcript display */}
      {transcript && (
        <div className="w-full max-w-lg mx-auto mb-6">
          <div className="bg-gray-100 p-4 rounded-lg text-gray-800 min-h-[100px] max-h-[200px] overflow-y-auto">
            {transcript}
          </div>
        </div>
      )}

      {/* Control buttons */}
      <div className="space-y-3">
        {isListening ? (
          <Button
            variant="destructive"
            size="sm"
            className="w-24 rounded-full bg-pink-600 hover:bg-pink-700"
            onClick={onStop}
          >
            stop
          </Button>
        ) : (
          <div className="flex gap-2 items-center justify-center">
            <Button
              variant="default"
              size="sm"
              className="w-24 rounded-full bg-blue-600 hover:bg-blue-700"
              onClick={onStart}
            >
              Start
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-24 rounded-full bg-white hover:bg-gray-100"
              onClick={() => onTest(sampleConversation)}
            >
              Test
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="w-24 rounded-full"
              onClick={() => onTest(transcript)}
            >
              Submit
            </Button>
          </div>
        )}
      </div>

      {/* Recording indicators */}
      <div className="flex gap-2 mt-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "w-2 h-2 rounded-full transition-opacity",
              i === Math.floor(recordingTime / 2) % 4 ? "bg-purple-500" : "bg-gray-600"
            )}
          />
        ))}
      </div>
    </div>
  );
}
