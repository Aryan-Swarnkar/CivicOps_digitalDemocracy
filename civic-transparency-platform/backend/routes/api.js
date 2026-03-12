const express = require('express');
const router = express.Router();

// ---------------------------------------------------------------------------
// IN-MEMORY DATA ARRAYS
// ---------------------------------------------------------------------------

let users = [];

let projects = [
  {
    id: 1,
    name: "Road Repair Project",
    location: "Local Area",
    budget: "10 Crore",
    contractor: "ABC Construction",
    status: "In Progress",
    timeline: [
      "Project sanctioned - Jan 2026",
      "Budget approved - Feb 2026",
      "Contractor selected - Feb 2026",
      "Work started - Mar 2026"
    ]
  },
  {
    id: 2,
    name: "New Water Pipeline",
    location: "City Center",
    budget: "5 Crore",
    contractor: "XYZ Plumbers",
    status: "Completed",
    timeline: [
      "Project sanctioned - Jun 2025",
      "Work started - Aug 2025",
      "Work completed - Dec 2025"
    ]
  }
];

let complaints = [
  {
    id: Date.now(),
    category: "road",
    tag: "pothole",
    description: "Huge pothole causing traffic issues.",
    image: null,
    latitude: 19.076,
    longitude: 72.877,
    time: "2026-03-10 12:30",
    status: "under review"
  }
];

// ---------------------------------------------------------------------------
// USER ROUTES (FEATURE 1)
// ---------------------------------------------------------------------------

router.post('/register', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ error: 'User already exists.' });
  }
  const newUser = { name, email };
  users.push(newUser);
  res.status(201).json({ message: 'User registered successfully', user: newUser });
});

router.post('/login', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }
  const user = users.find(u => u.email === email && u.name === name);
  if (user) {
    res.status(200).json({ message: 'Login successful', user });
  } else {
    // For simplicity, auto-register if they don't exist but try to login
    const newUser = { name, email };
    users.push(newUser);
    res.status(200).json({ message: 'Auto-registered & Login successful', user: newUser });
  }
});

// ---------------------------------------------------------------------------
// PROJECT ROUTES (FEATURE 2 & 3)
// ---------------------------------------------------------------------------

// Get all projects
router.get('/projects', (req, res) => {
  res.status(200).json(projects);
});

// Get single project details by ID
router.get('/projects/:id', (req, res) => {
  const projectId = parseInt(req.params.id);
  const project = projects.find(p => p.id === projectId);
  if (project) {
    res.status(200).json(project);
  } else {
    res.status(404).json({ error: 'Project not found.' });
  }
});

// ---------------------------------------------------------------------------
// COMPLAINT ROUTES (FEATURE 4, 5, 6, 7)
// ---------------------------------------------------------------------------

// File a complaint
router.post('/complaints', (req, res) => {
  const { category, tag, description, image, latitude, longitude, time } = req.body;
  
  const newComplaint = {
    id: Date.now(),
    category,
    tag,
    description: description || "",
    image: image || null,
    latitude,
    longitude,
    time: time || new Date().toISOString(),
    status: "submitted"
  };

  complaints.unshift(newComplaint); // Add to the top
  res.status(201).json({ message: 'Complaint filed successfully', complaint: newComplaint });
});

// Get all complaints
router.get('/complaints', (req, res) => {
  res.status(200).json(complaints);
});

module.exports = router;
