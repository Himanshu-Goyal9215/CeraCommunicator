import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TranscriptionPane from "@/components/consultation/TranscriptionPane";
import SOAPNote from "@/components/consultation/SOAPNote";
import DiagnosisList from "@/components/consultation/DiagnosisList";
import ClinicalPathway from "@/components/consultation/ClinicalPathway";
import RecentInsights from "@/components/consultation/RecentInsights";
import { useWebSocket } from "@/lib/useWebSocket";
import { useSpeechRecognition } from "@/lib/useSpeechRecognition";
import { Stethoscope } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { type Consultation } from "@shared/schema";

export default function Dashboard() {
  const { transcript, isListening, startListening, stopListening } = useSpeechRecognition();
  const { connected, lastMessage, sendMessage } = useWebSocket();

  // Fetch recent consultations
  const { data: consultations } = useQuery<Consultation[]>({
    queryKey: ['/api/consultations'],
  });

  useEffect(() => {
    if (transcript) {
      sendMessage({ type: 'transcript', text: transcript });
    }
  }, [transcript]);

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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2">
            <Tabs defaultValue="record">
              <TabsList className="w-full">
                <TabsTrigger value="record">Record</TabsTrigger>
                <TabsTrigger value="soap">SOAP Note</TabsTrigger>
                <TabsTrigger value="diagnosis">Diagnosis</TabsTrigger>
                <TabsTrigger value="pathway">Clinical Pathway</TabsTrigger>
              </TabsList>

              <TabsContent value="record">
                <TranscriptionPane
                  transcript={transcript}
                  isListening={isListening}
                  onStart={startListening}
                  onStop={stopListening}
                  sendMessage={sendMessage}
                />
              </TabsContent>

              <TabsContent value="soap">
                <SOAPNote soapNote={analysis?.soapNote} />
              </TabsContent>

              <TabsContent value="diagnosis">
                <DiagnosisList diagnoses={analysis?.diagnoses} />
              </TabsContent>

              <TabsContent value="pathway">
                <ClinicalPathway pathway={analysis?.clinicalPathway} />
              </TabsContent>
            </Tabs>
          </Card>

          <Card>
            <RecentInsights consultations={consultations} />
          </Card>
        </div>
      </main>
    </div>
  );
}