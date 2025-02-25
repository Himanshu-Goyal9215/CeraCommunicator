import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API with the provided key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Type definitions for medical analysis output
interface SOAPNote {
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
}

interface Diagnosis {
  condition: string;
  description: string;
  confidence: number;
}

interface ClinicalPathway {
  steps: string[];
  recommendations: string[];
}

// Generate a structured SOAP note from conversation transcript
export async function generateSOAPNote(transcript: string): Promise<SOAPNote> {
  try {
    // Get the most capable Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    // Craft a detailed prompt for SOAP note generation
    const prompt = `As a medical scribe assistant, generate a detailed SOAP note from the following doctor-patient conversation. Format your response as JSON with the following structure:
    {
      "subjective": "patient's reported symptoms and history",
      "objective": "physical examination findings and vital signs",
      "assessment": "diagnosis and clinical reasoning",
      "plan": "treatment plan and next steps"
    }
    
    Conversation transcript:
    ${transcript}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return JSON.parse(text);
  } catch (error) {
    console.error("Error generating SOAP note:", error);
    throw new Error("Failed to generate SOAP note");
  }
}

// Generate possible diagnoses with confidence scores
export async function generateDiagnoses(transcript: string): Promise<Diagnosis[]> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    // Prompt for generating differential diagnoses
    const prompt = `As a clinical diagnosis assistant, analyze this conversation and provide possible diagnoses. Return a JSON array with this structure:
    [
      {
        "condition": "name of condition",
        "description": "detailed explanation",
        "confidence": number between 0 and 1 representing likelihood
      }
    ]
    List diagnoses in order of likelihood.
    
    Conversation transcript:
    ${transcript}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const diagnoses = JSON.parse(text);
    return diagnoses.map((d: any) => ({
      condition: d.condition,
      description: d.description,
      confidence: Math.max(0, Math.min(1, d.confidence)) // Ensure confidence is between 0 and 1
    }));
  } catch (error) {
    console.error("Error generating diagnoses:", error);
    throw new Error("Failed to generate diagnoses");
  }
}

// Generate recommended clinical pathway
export async function generateClinicalPathway(transcript: string): Promise<ClinicalPathway> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    // Prompt for generating treatment steps and recommendations
    const prompt = `As a clinical pathway advisor, analyze this conversation and provide next steps and recommendations. Return JSON in this format:
    {
      "steps": ["ordered list of next clinical steps"],
      "recommendations": ["list of additional recommendations"]
    }
    
    Conversation transcript:
    ${transcript}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return JSON.parse(text);
  } catch (error) {
    console.error("Error generating clinical pathway:", error);
    throw new Error("Failed to generate clinical pathway");
  }
}
