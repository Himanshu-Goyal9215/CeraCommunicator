# CeraCommunicator

A medical consultation system powered by Google Gemini AI for generating SOAP notes and medical analysis. The system helps healthcare providers automate documentation and receive AI-assisted clinical insights in real-time.

## ✨ Features

### Medical Documentation
- Real-time medical documentation generation
- AI-powered SOAP note creation with structured format
- Smart diagnostic suggestions with confidence scores
- Evidence-based clinical pathway recommendations

### Technical Features
- Real-time WebSocket communication
- Modern, responsive UI with TailwindCSS
- Secure data handling and storage
- RESTful API endpoints

## 🚀 Setup

### Prerequisites
- Node.js v18+
- Google Gemini API key ([Get it here](https://makersuite.google.com/app/apikey))
- PostgreSQL database

### Installation

1. Clone and install dependencies:
```bash
git clone https://github.com/Himanshu-Goyal9215/CeraCommunicator.git
cd CeraCommunicator
npm install
```

2. Create `.env` file in project root:
```env
GEMINI_API_KEY=your_gemini_api_key_here
DATABASE_URL=your_postgresql_connection_string
```

3. Run the application:
```bash
# Development mode with hot reload
npm run dev

# Production build and start
npm run build
npm start
```

Access the application at `http://localhost:5000`

## 🛠️ Tech Stack

### Frontend
- React 18 with TypeScript
- TailwindCSS for styling
- WebSocket for real-time updates
- Radix UI components

### Backend
- Express.js with TypeScript
- Google Gemini AI for analysis
- WebSocket Server
- PostgreSQL with Drizzle ORM

## 📁 Project Structure
```
CeraCommunicator/
├── client/          # React frontend
├── server/          # Express backend
└── shared/          # Shared types
```


