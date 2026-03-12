import { Link } from 'react-router-dom';
import { Home, Map as MapIcon, FileText, AlertCircle, LogIn, LogOut, Briefcase } from 'lucide-react';

export default function Navbar({ user, onLogout }) {
  return (
    <nav style={{ backgroundColor: 'white', borderBottom: '1px solid var(--border)', padding: '1rem' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0' }}>
        <Link to="/" style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Home size={24} />
          Civic Transparency Platform
        </Link>
        
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Link to="/projects" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Briefcase size={18} /> Projects
          </Link>
          <Link to="/complaints" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <AlertCircle size={18} /> Complaints
          </Link>
          <Link to="/map" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <MapIcon size={18} /> Map
          </Link>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Link to="/file-complaint" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <FileText size={18} /> File Complaint
              </Link>
              <button onClick={onLogout} style={{ border: 'none', background: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--danger)' }}>
                <LogOut size={18} /> Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <LogIn size={18} /> Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
