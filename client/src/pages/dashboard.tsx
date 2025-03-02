import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TranscriptionPane from "@/components/consultation/TranscriptionPane";
import SOAPNote from "@/components/consultation/SOAPNote";
import DiagnosisList from "@/components/consultation/DiagnosisList";
import ClinicalPathway from "@/components/consultation/ClinicalPathway";
import RecentInsights from "@/components/consultation/RecentInsights";
import { useWebSocket } from "@/lib/useWebSocket";
import { useSpeechRecognition } from "@/lib/useSpeechRecognition";
import { Stethoscope, Bell, User, Search, Menu, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { type Consultation } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Link } from "wouter";
import { useLocation } from "wouter";

export default function Dashboard() {
  const { transcript, isListening, startListening, stopListening } = useSpeechRecognition();
  const { connected, lastMessage, sendMessage } = useWebSocket();
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const [, setLocation] = useLocation();

  // Fetch recent consultations
  const { data: consultations } = useQuery<Consultation[]>({
    queryKey: ['/api/consultations'],
  });

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  useEffect(() => {
    if (transcript) {
      sendMessage({ type: 'transcript', text: transcript });
    }
  }, [transcript]);

  const handleTest = (testTranscript: string) => {
    sendMessage({ type: 'transcript', text: testTranscript });
  };

  const analysis = lastMessage?.type === 'analysis' ? lastMessage.consultation : null;

  const handleLogout = () => {
    localStorage.removeItem('user');
    setLocation('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="border-b bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Stethoscope className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-800">CeraCommunicator</h1>
            </div>
            
            <div className="hidden md:block flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search consultations..." 
                  className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-500 hover:text-blue-600">
                <Bell className="h-5 w-5" />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                      <AvatarFallback>DR</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-gray-900 text-gray-100 border-gray-800">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-800" />
                  <Link href="/profile">
                    <DropdownMenuItem className="hover:bg-gray-800 focus:bg-gray-800 cursor-pointer">Profile</DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem className="hover:bg-gray-800 focus:bg-gray-800 cursor-pointer">Settings</DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-800 focus:bg-gray-800 cursor-pointer">Help</DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-800" />
                  <DropdownMenuItem onClick={handleLogout} className="hover:bg-gray-800 focus:bg-gray-800 cursor-pointer">Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Blog Navigation Button */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Welcome back, Dr. {user?.name}</h2>
            <Link href="/blogs">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
                Latest Insights <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column - Transcription and Analysis */}
            <div className="lg:col-span-8 space-y-8">
              <TranscriptionPane 
                transcript={transcript}
                isListening={isListening}
                onStart={startListening}
                onStop={stopListening}
                sendMessage={sendMessage}
              />

              <Card className="shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white">
                  <h2 className="font-semibold text-lg">AI Analysis</h2>
                </div>
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
              <Card className="shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white">
                  <h2 className="font-semibold text-lg">Recent Consultations</h2>
                </div>
                <div className="p-4">
                  <RecentInsights consultations={consultations} />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Stethoscope className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-sm text-gray-500">© {new Date().getFullYear()} CeraCommunicator. All rights reserved.</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-gray-500 hover:text-blue-600">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-500 hover:text-blue-600">Terms of Service</a>
              <a href="#" className="text-sm text-gray-500 hover:text-blue-600">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}