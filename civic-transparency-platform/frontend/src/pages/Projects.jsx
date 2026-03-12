import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, IndianRupee, HardHat, TrendingUp } from 'lucide-react';

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="page-title">Government Projects</h2>
      <p className="page-subtitle">Track ongoing and completed local infrastructure projects.</p>

      <div className="grid grid-cols-2">
        {projects.map((proj) => (
          <div key={proj.id} className="card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--primary-dark)' }}>
              {proj.name}
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem', color: 'var(--muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={18} /> {proj.location}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <IndianRupee size={18} /> {proj.budget}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <HardHat size={18} /> {proj.contractor}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <TrendingUp size={18} /> {proj.status}
              </div>
            </div>

            <Link to={`/projects/${proj.id}`} className="btn btn-primary" style={{ display: 'block', textAlign: 'center' }}>
              View Details & Timeline
            </Link>
          </div>
        ))}
      </div>
      
      {projects.length === 0 && (
        <p style={{ textAlign: 'center', color: 'var(--muted)', marginTop: '2rem' }}>Loading projects...</p>
      )}
    </div>
  );
}
