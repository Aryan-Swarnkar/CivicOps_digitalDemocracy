# Civic Transparency Platform

A prototype web application to demonstrate how citizens can track government projects and file complaints with geo-tagged photos.

## Features Included
1. **User Login:** Simulated in-memory mock authentication.
2. **Project Display:** Lists projects with details like budget, contractor, and location.
3. **Project Timeline:** Visual tracking of a project's lifecycle.
4. **File Complaint:** Dynamic form requiring descriptions for 'other' issues.
5. **Camera & Geo-Location:** Uses browser `navigator.mediaDevices` and `navigator.geolocation` APIs to snap real-time pictures and attach coordinates natively.
6. **Complaint List:** Feed of submitted civic issues.
7. **Complaint Map:** Leaflet.js interactive map plotting all captured issues.
8. **Notifications:** Temporary global alerts upon actions.

## Technology Stack
- **Frontend:** React (Vite), React Router, Leaflet, Lucide React, basic aesthetic CSS.
- **Backend:** Node.js, Express, strict simple in-memory arrays without a database.

---

## How to Run

### 1. Start the Backend Server
The backend stores all mock data in arrays and acts as the API.

```bash
cd backend
npm install
node server.js
```
*The backend will be running on `http://localhost:5000`.*

### 2. Start the Frontend App
The modern frontend built with Vite.

```bash
cd frontend
npm install
npm run dev
```

It will provide a local URL (e.g., `http://localhost:5173`). Open that Link in your browser to interact with the Platform!

> **Browser Prompts Note:** For the File Complaint feature's camera capture and mapping to work, ensure you explicitly **"Allow"** the browser to access your Camera and Location. Location coordinate capture will fallback to mock coordinates if blocked for demo purposes.
