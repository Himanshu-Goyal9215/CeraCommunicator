import { consultations, type Consultation, type InsertConsultation } from "@shared/schema";

// Define the interface for storage operations
export interface IStorage {
  createConsultation(consultation: InsertConsultation): Promise<Consultation>;
  getConsultation(id: number): Promise<Consultation | undefined>;
  getConsultations(): Promise<Consultation[]>;
}

// In-memory storage implementation for development
export class MemStorage implements IStorage {
  private consultations: Map<number, Consultation>;
  private currentId: number;

  constructor() {
    // Initialize empty storage
    this.consultations = new Map();
    this.currentId = 1;
  }

  // Create a new consultation with auto-incrementing ID
  async createConsultation(insertConsultation: InsertConsultation): Promise<Consultation> {
    const id = this.currentId++;
    const consultation: Consultation = {
      ...insertConsultation,
      id,
      createdAt: new Date(),
    };
    this.consultations.set(id, consultation);
    return consultation;
  }

  // Retrieve a single consultation by ID
  async getConsultation(id: number): Promise<Consultation | undefined> {
    return this.consultations.get(id);
  }

  // Get all stored consultations
  async getConsultations(): Promise<Consultation[]> {
    return Array.from(this.consultations.values());
  }
}

// Create a singleton instance of the storage
export const storage = new MemStorage();