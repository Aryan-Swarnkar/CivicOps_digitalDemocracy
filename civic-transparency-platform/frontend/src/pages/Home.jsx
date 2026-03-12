import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Building, AlertTriangle } from 'lucide-react';

export default function Home() {
  return (
    <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto', paddingTop: '3rem' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary-dark)', marginBottom: '1rem' }}>
        Empowering Citizens
      </h1>
      <p style={{ fontSize: '1.25rem', color: 'var(--muted)', marginBottom: '3rem' }}>
        Track local government projects and report civic issues with simple geo-tagged photos to improve transparency and build a better community together.
      </p>

      <div className="grid grid-cols-3" style={{ marginBottom: '3rem', textAlign: 'left' }}>
        <div className="card">
          <Building size={32} color="var(--primary)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Track Projects</h3>
          <p style={{ color: 'var(--muted)', marginBottom: '1rem' }}>See timelines, budgets, and contractors for infrastructure work in your area.</p>
          <Link to="/projects" style={{ color: 'var(--primary)', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            View Projects <ArrowRight size={16} />
          </Link>
        </div>

        <div className="card">
          <AlertTriangle size={32} color="var(--warning)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Report Issues</h3>
          <p style={{ color: 'var(--muted)', marginBottom: '1rem' }}>Found a pothole or garbage dump? Snap a picture and report it instantly.</p>
          <Link to="/file-complaint" style={{ color: 'var(--primary)', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            File Complaint <ArrowRight size={16} />
          </Link>
        </div>

        <div className="card">
          <MapPin size={32} color="var(--secondary)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Issue Map</h3>
          <p style={{ color: 'var(--muted)', marginBottom: '1rem' }}>Visualize all reported complaints in your city on an interactive map.</p>
          <Link to="/map" style={{ color: 'var(--primary)', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            Open Map <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
