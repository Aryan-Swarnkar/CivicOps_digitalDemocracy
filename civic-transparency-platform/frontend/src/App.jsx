import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import NotificationBanner from './components/NotificationBanner';
import Home from './pages/Home';
import Login from './pages/Login';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import FileComplaint from './pages/FileComplaint';
import Complaints from './pages/Complaints';
import ComplaintMap from './pages/ComplaintMap';
import { useState, useEffect } from 'react';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3500);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    showNotification(`Welcome, ${userData.name}!`);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    showNotification('Logged out successfully', 'info');
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      {notification && <NotificationBanner notification={notification} />}
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/file-complaint" element={<FileComplaint user={user} showNotification={showNotification} />} />
          <Route path="/complaints" element={<Complaints />} />
          <Route path="/map" element={<ComplaintMap />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
