import { useEffect } from "react";
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

  

  

  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const websocket = new WebSocket(`ws://${window.location.hostname}:5000/ws`);
    websocket.onopen = () => console.log('Connected to server');
    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'analysis') {
        setAnalysis(data.consultation);
      }
    };
    setWs(ws);
    return () => websocket.close();
  }, []);

  const handleTest = (testTranscript: string) => {
    if (ws?.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: 'transcript', text: testTranscript }));
    }
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Transcription and Analysis */}
          <div className="lg:col-span-8 space-y-8">
            <Card className="shadow-lg">
              <TranscriptionPane 
                transcript={transcript}
                isListening={isListening}
                onStart={startListening}
                onStop={stopListening}
                onTest={handleTest}
              />
            </Card>

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

          {/* Right Column - Recent Insights */}
          <div className="lg:col-span-4 space-y-6">
            <RecentInsights consultations={consultations} />
          </div>
        </div>
      </main>
    </div>
  );
}