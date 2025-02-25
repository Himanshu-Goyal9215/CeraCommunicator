
# Clinical Decision Support System

A real-time AI-powered clinical decision support system that transcribes doctor-patient conversations and generates medical insights.

## Features
- Voice-to-text transcription
- SOAP note generation
- Differential diagnosis suggestions
- Clinical pathway recommendations

## API Documentation

### WebSocket Endpoints
- `ws://[app-name].replit.app/ws`
  - Messages:
    - `{ type: 'transcript', text: string }` - Send transcription for analysis
    - `{ type: 'clear' }` - Clear current analysis
  - Responses:
    - `{ type: 'analysis', consultation: {...} }` - Analysis results

### REST Endpoints
- GET `/api/consultations` - Retrieve all consultations
- GET `/api/consultations/:id` - Retrieve specific consultation

## Testing Instructions
1. Visit the deployed app at: `https://[app-name].replit.app`
2. Click the microphone button to start recording
3. Speak or play sample doctor-patient conversation
4. View generated SOAP notes, diagnoses, and clinical pathways

## Development Setup
1. Fork this Repl
2. Add required secrets in the Secrets tab
3. Click Run to start development server
