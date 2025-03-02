import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Stethoscope, 
  FileText, 
  Brain, 
  Clipboard, 
  ArrowRight, 
  CheckCircle2 
} from "lucide-react";
import React from "react";

const steps = [
  {
    title: "Welcome to CeraCommunicator",
    description: "Your AI-powered medical consultation assistant that helps you document patient interactions with ease.",
    icon: Stethoscope,
  },
  {
    title: "Voice Recording",
    description: "Record your patient consultations in real-time. Our system transcribes your conversations automatically.",
    icon: FileText,
  },
  {
    title: "AI Analysis",
    description: "Our AI analyzes the conversation to generate structured medical documentation and insights.",
    icon: Brain,
  },
  {
    title: "Complete Documentation",
    description: "Get SOAP notes, diagnostic suggestions, and clinical pathways instantly.",
    icon: Clipboard,
  },
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [, setLocation] = useLocation();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Redirect to dashboard when onboarding is complete
      setLocation("/dashboard");
    }
  };

  const handleSkip = () => {
    setLocation("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6 flex items-center justify-between">
            <div className="flex items-center">
              <Stethoscope className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-semibold text-gray-800">CeraCommunicator</h1>
            </div>
            <Button variant="ghost" onClick={handleSkip}>
              Skip
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <Card className="w-full max-w-3xl shadow-xl bg-white overflow-hidden">
          <div className="flex flex-col md:flex-row h-full">
            {/* Progress sidebar */}
            <div className="bg-blue-50 p-6 md:w-1/3">
              <div className="space-y-6">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-start">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      index === currentStep 
                        ? "bg-blue-600 text-white" 
                        : index < currentStep 
                          ? "bg-green-500 text-white" 
                          : "bg-gray-200 text-gray-500"
                    }`}>
                      {index < currentStep ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>
                    <div className={`ml-3 ${index === currentStep ? "text-blue-600" : "text-gray-500"}`}>
                      <p className="text-sm font-medium">{step.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Content area */}
            <div className="p-8 md:w-2/3 flex flex-col">
              <div className="flex-1">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  {steps[currentStep].icon && (
                    <div className="w-8 h-8 text-blue-600">
                      {React.createElement(steps[currentStep].icon, { className: "w-8 h-8" })}
                    </div>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  {steps[currentStep].title}
                </h2>
                <p className="text-gray-600 mb-8">
                  {steps[currentStep].description}
                </p>
              </div>

              <div className="flex justify-end">
                <Button 
                  onClick={handleNext} 
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {currentStep < steps.length - 1 ? (
                    <>
                      Next
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </>
                  ) : (
                    "Get Started"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
} 