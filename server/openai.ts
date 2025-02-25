import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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

export async function generateSOAPNote(transcript: string): Promise<SOAPNote> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a medical scribe assistant. Generate a detailed SOAP note from the provided doctor-patient conversation transcript. Format the response as JSON with subjective, objective, assessment, and plan sections."
        },
        {
          role: "user",
          content: transcript
        }
      ],
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content);
    return {
      subjective: result.subjective,
      objective: result.objective,
      assessment: result.assessment,
      plan: result.plan
    };
  } catch (error) {
    console.error("Error generating SOAP note:", error);
    throw new Error("Failed to generate SOAP note");
  }
}

export async function generateDiagnoses(transcript: string): Promise<Diagnosis[]> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `As a clinical diagnosis assistant, analyze the conversation and provide possible diagnoses. 
            Return a JSON array of diagnoses with the following structure:
            [{ 
              condition: "name of condition",
              description: "detailed explanation",
              confidence: 0.0-1.0 (likelihood score)
            }]
            List diagnoses in order of likelihood.`
        },
        {
          role: "user",
          content: transcript
        }
      ],
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content);
    return result.diagnoses.map((d: any) => ({
      condition: d.condition,
      description: d.description,
      confidence: Math.max(0, Math.min(1, d.confidence)) // Ensure confidence is between 0 and 1
    }));
  } catch (error) {
    console.error("Error generating diagnoses:", error);
    throw new Error("Failed to generate diagnoses");
  }
}

export async function generateClinicalPathway(transcript: string): Promise<ClinicalPathway> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `As a clinical pathway advisor, provide next steps and recommendations based on the conversation.
            Return JSON in the following format:
            {
              steps: ["ordered list of next clinical steps"],
              recommendations: ["list of additional recommendations"]
            }`
        },
        {
          role: "user",
          content: transcript
        }
      ],
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content);
    return {
      steps: result.steps,
      recommendations: result.recommendations
    };
  } catch (error) {
    console.error("Error generating clinical pathway:", error);
    throw new Error("Failed to generate clinical pathway");
  }
}

// Helper function to structure medical prompts
function createMedicalPrompt(transcript: string, task: string): string {
  return `
Context: Doctor-patient conversation transcript
Task: ${task}

Transcript:
${transcript}

Please analyze the above conversation and provide structured medical insights.`;
}
