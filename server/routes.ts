import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer } from "ws";
import { storage } from "./storage";
import { generateSOAPNote, generateDiagnoses, generateClinicalPathway } from "./gemini";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // Setup WebSocket server for real-time transcription and analysis
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });

  wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', async (message) => {
      try {
        const data = JSON.parse(message.toString());

        if (data.type === 'clear') {
          if (ws.readyState === ws.OPEN) {
            ws.send(JSON.stringify({
              type: 'analysis',
              consultation: null
            }));
          }
          return;
        }

        if (data.type === 'transcript') {
          // Generate medical insights from transcript using Gemini
          const soapNote = await generateSOAPNote(data.text);
          const diagnoses = await generateDiagnoses(data.text);
          const clinicalPathway = await generateClinicalPathway(data.text);

          // Store consultation
          const consultation = await storage.createConsultation({
            transcript: data.text,
            soapNote,
            diagnoses,
            clinicalPathway
          });

          // Send analysis back to client
          if (ws.readyState === ws.OPEN) {
            ws.send(JSON.stringify({
              type: 'analysis',
              consultation
            }));
          }
        }
      } catch (error) {
        console.error('WebSocket error:', error);
        if (ws.readyState === ws.OPEN) {
          ws.send(JSON.stringify({ 
            type: 'error', 
            message: error instanceof Error ? error.message : 'Unknown error'
          }));
        }
      }
    });
  });

  // REST endpoints for consultation history
  app.get('/api/consultations', async (req, res) => {
    const consultations = await storage.getConsultations();
    res.json(consultations);
  });

  app.get('/api/consultations/:id', async (req, res) => {
    const consultation = await storage.getConsultation(parseInt(req.params.id));
    if (!consultation) {
      res.status(404).json({ message: 'Consultation not found' });
      return;
    }
    res.json(consultation);
  });

  return httpServer;
}