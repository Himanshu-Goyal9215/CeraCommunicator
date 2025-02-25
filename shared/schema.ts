import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Define the consultations table to store medical consultation data
export const consultations = pgTable("consultations", {
  id: serial("id").primaryKey(),
  // Raw transcript of the doctor-patient conversation
  transcript: text("transcript").notNull(),
  // Structured SOAP note generated from the transcript
  soapNote: jsonb("soap_note").$type<{
    subjective: string;   // Patient's symptoms and history
    objective: string;    // Physical examination findings
    assessment: string;   // Doctor's assessment of the condition
    plan: string;        // Treatment plan and recommendations
  }>(),
  // Array of possible diagnoses with confidence scores
  diagnoses: jsonb("diagnoses").$type<{
    condition: string;    // Name of the medical condition
    description: string; // Detailed explanation of why this diagnosis is suggested
    confidence: number;  // Confidence score between 0 and 1
  }[]>(),
  // Suggested clinical pathway for treatment
  clinicalPathway: jsonb("clinical_pathway").$type<{
    steps: string[];           // Ordered list of next steps
    recommendations: string[]; // Additional recommendations
  }>(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Create a schema for inserting new consultations
export const insertConsultationSchema = createInsertSchema(consultations).pick({
  transcript: true,
  soapNote: true,
  diagnoses: true,
  clinicalPathway: true,
});

// TypeScript types for type safety
export type InsertConsultation = z.infer<typeof insertConsultationSchema>;
export type Consultation = typeof consultations.$inferSelect;