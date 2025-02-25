import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TranscriptionPane from "@/components/consultation/TranscriptionPane";
import SOAPNote from "@/components/consultation/SOAPNote";
import DiagnosisList from "@/components/consultation/DiagnosisList";
import ClinicalPathway from "@/components/consultation/ClinicalPathway";
import { useWebSocket } from "@/lib/useWebSocket";
import { useSpeechRecognition } from "@/lib/useSpeechRecognition";

export default function Dashboard() {
  const { transcript, isListening, startListening, stopListening } = useSpeechRecognition();
  const { connected, lastMessage, sendMessage } = useWebSocket();

  useEffect(() => {
    if (transcript) {
      sendMessage({ type: 'transcript', text: transcript });
    }
  }, [transcript]);

  const analysis = lastMessage?.type === 'analysis' ? lastMessage.consultation : null;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-foreground">Clinical Decision Support</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <TranscriptionPane 
              transcript={transcript}
              isListening={isListening}
              onStart={startListening}
              onStop={stopListening}
            />
          </Card>

          <Card className="p-6">
            <Tabs defaultValue="soap">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="soap">SOAP Note</TabsTrigger>
                <TabsTrigger value="diagnoses">Diagnoses</TabsTrigger>
                <TabsTrigger value="pathway">Clinical Pathway</TabsTrigger>
              </TabsList>

              <TabsContent value="soap">
                <SOAPNote note={analysis?.soapNote} />
              </TabsContent>

              <TabsContent value="diagnoses">
                <DiagnosisList diagnoses={analysis?.diagnoses} />
              </TabsContent>

              <TabsContent value="pathway">
                <ClinicalPathway pathway={analysis?.clinicalPathway} />
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}
