import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Activity, Clock, RotateCcw, Save, Clipboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

interface Props {
  transcript: string;
  isListening: boolean;
  onStart: () => void;
  onStop: () => void;
  sendMessage: (message: { type: 'transcript', text: string } | { type: 'clear' }) => void;
}

export default function TranscriptionPane({ transcript, isListening, onStart, onStop, sendMessage }: Props) {
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [audioLevel, setAudioLevel] = useState<number[]>(Array(32).fill(20));
  const { toast } = useToast();

  // Simulate audio levels when recording
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isListening) {
      interval = setInterval(() => {
        setAudioLevel(Array(32).fill(0).map(() => Math.random() * 100));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isListening]);

  // Track recording time
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

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(transcript);
    toast({
      title: "Copied to clipboard",
      description: "Transcript has been copied to your clipboard",
      duration: 3000,
    });
  };

  const handleSave = () => {
    toast({
      title: "Transcript saved",
      description: "Your transcript has been saved successfully",
      duration: 3000,
    });
  };

  return (
    <Card className="shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <h2 className="font-semibold text-lg">Medical Transcription</h2>
          </div>
          {isListening && (
            <Badge variant="outline" className="bg-red-500/20 text-white border-red-400 px-3 py-1 animate-pulse">
              Recording
            </Badge>
          )}
        </div>
      </div>

      <CardContent className="p-6">
        {!hasRecorded ? (
          <div className="w-full max-w-md mx-auto flex flex-col items-center">
            <div className="flex items-center justify-center mb-8 relative">
              <div className={cn(
                "w-40 h-40 rounded-full flex items-center justify-center cursor-pointer",
                "transform transition-all duration-300 hover:scale-105",
                isListening 
                  ? "bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-200" 
                  : "bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-200",
                "relative"
              )}
              onClick={isListening ? handleStop : onStart}
              >
                {/* Ripple effects */}
                {isListening && (
                  <>
                    <div className="absolute w-48 h-48 rounded-full border-4 border-red-200/50 animate-ping" />
                    <div className="absolute w-44 h-44 rounded-full border-4 border-red-300/70 animate-pulse" />
                  </>
                )}
                
                {/* Inner circle */}
                <div className={cn(
                  "absolute inset-3 rounded-full",
                  isListening 
                    ? "bg-gradient-to-br from-red-400 to-red-500" 
                    : "bg-gradient-to-br from-blue-400 to-blue-500"
                )} />
                
                {/* Icon */}
                {isListening ? (
                  <MicOff className="w-16 h-16 text-white relative z-10 animate-pulse" />
                ) : (
                  <Mic className="w-16 h-16 text-white relative z-10" />
                )}
              </div>

              {/* Timer display */}
              <div className="absolute -bottom-2 bg-white rounded-full px-4 py-1 shadow-md border flex items-center">
                <Clock className="w-4 h-4 text-gray-500 mr-2" />
                <span className="text-lg font-mono font-semibold text-gray-700">
                  {formatTime(recordingTime)}
                </span>
              </div>
            </div>

            {/* Audio visualization */}
            <div className="w-full flex items-center justify-center gap-[2px] mb-8 h-16 bg-gray-50 rounded-lg p-2">
              {audioLevel.map((level, i) => (
                <div
                  key={i}
                  className={cn(
                    "w-1.5 rounded-full transition-all duration-150",
                    isListening 
                      ? "bg-gradient-to-t from-blue-400 to-blue-600" 
                      : "bg-blue-200"
                  )}
                  style={{
                    height: `${isListening ? level : 20}%`,
                    opacity: isListening ? 0.6 + Math.random() * 0.4 : 0.5,
                  }}
                />
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex flex-col items-center space-y-4">
              <Button
                variant={isListening ? "destructive" : "default"}
                size="lg"
                className={cn(
                  "w-48 rounded-full font-medium shadow-md transition-all duration-300",
                  isListening 
                    ? "bg-red-500 hover:bg-red-600" 
                    : "bg-blue-500 hover:bg-blue-600",
                  "transform hover:scale-105"
                )}
                onClick={isListening ? handleStop : onStart}
              >
                {isListening ? "Stop Recording" : "Start Recording"}
              </Button>
              
              <p className="text-sm text-gray-500 text-center max-w-xs">
                {isListening 
                  ? "Recording in progress. Click stop when finished." 
                  : "Click start to begin recording your consultation."}
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-2xl mx-auto space-y-6 py-4">
            <div className="bg-blue-50 p-6 rounded-lg shadow-inner border border-blue-100">
              <h3 className="text-lg font-medium text-blue-800 mb-3">Transcription</h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{transcript}</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full px-4 border-blue-200 hover:bg-blue-50 flex items-center"
                      onClick={handleReRecord}
                    >
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Record Again
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Start a new recording</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full px-4 border-blue-200 hover:bg-blue-50 flex items-center"
                      onClick={handleCopyToClipboard}
                    >
                      <Clipboard className="mr-2 h-4 w-4" />
                      Copy Text
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy transcript to clipboard</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="default"
                      size="sm"
                      className="rounded-full px-4 bg-blue-500 hover:bg-blue-600 flex items-center"
                      onClick={handleSave}
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save Transcript
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Save this transcript</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
