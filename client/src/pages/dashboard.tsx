import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TranscriptionPane from "@/components/consultation/TranscriptionPane";
import SOAPNote from "@/components/consultation/SOAPNote";
import DiagnosisList from "@/components/consultation/DiagnosisList";
import ClinicalPathway from "@/components/consultation/ClinicalPathway";
import { useWebSocket } from "@/lib/useWebSocket";
import { useSpeechRecognition } from "@/lib/useSpeechRecognition";
import { Stethoscope } from "lucide-react";

export default function Dashboard() {
  const { transcript, isListening, startListening, stopListening } = useSpeechRecognition();
  const { connected, lastMessage, sendMessage } = useWebSocket();

  useEffect(() => {
    if (transcript) {
      sendMessage({ type: 'transcript', text: transcript });
    }
  }, [transcript]);

  const handleTest = (testTranscript: string) => {
    sendMessage({ type: 'transcript', text: testTranscript });
  };

  const analysis = lastMessage?.type === 'analysis' ? lastMessage.consultation : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6 flex items-center">
            <Stethoscope className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-2xl font-semibold text-foreground">Clinical Decision Support</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Transcription */}
          <div className="space-y-6">
            <Card className="shadow-lg">
              <TranscriptionPane 
                transcript={transcript}
                isListening={isListening}
                onStart={startListening}
                onStop={stopListening}
                onTest={handleTest}
              />
            </Card>
          </div>

          {/* Right Column - Analysis */}
          <div className="space-y-6">
            <Card className="shadow-lg">
              <Tabs defaultValue="soap" className="p-6">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="soap">SOAP Note</TabsTrigger>
                  <TabsTrigger value="diagnoses">Diagnoses</TabsTrigger>
                  <TabsTrigger value="pathway">Clinical Pathway</TabsTrigger>
                </TabsList>

                <div className="mt-6">
                  <TabsContent value="soap" className="m-0">
                    <SOAPNote note={analysis?.soapNote} />
                  </TabsContent>

                  <TabsContent value="diagnoses" className="m-0">
                    <DiagnosisList diagnoses={analysis?.diagnoses} />
                  </TabsContent>

                  <TabsContent value="pathway" className="m-0">
                    <ClinicalPathway pathway={analysis?.clinicalPathway} />
                  </TabsContent>
                </div>
              </Tabs>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}