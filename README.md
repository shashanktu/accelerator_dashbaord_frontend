# Bots Dashboard

A React frontend with Python FastAPI backend for managing bots and accelerators.

## Quick Start

### Option 1: Run Both Frontend and Backend Together
```bash
npm install
npm run backend:install
npm run dev
```

### Option 2: Run Separately

#### Frontend (React)
```bash
npm install
npm start
```

#### Backend (Python)
```bash
cd py-backend
pip install -r requirements.txt
python main.py
```

## URLs

- Frontend: http://localhost:3000
- Backend API: http://127.0.0.1:8000
- API Documentation: http://127.0.0.1:8000/docs

## Project Structure

```
├── src/                    # React frontend source
├── py-backend/            # Python FastAPI backend
│   ├── main.py           # FastAPI application
│   ├── applications.json # Application data
│   └── requirements.txt  # Python dependencies
├── public/               # Static files
└── package.json         # Node.js dependencies and scripts
```

## Features

- Dashboard view with bots, accelerators, and TSC solutions
- Management interface for health checks, DevOps, and infrastructure
- Python backend with comprehensive API endpoints
- CORS-enabled for development
- Auto-reload for both frontend and backend during development