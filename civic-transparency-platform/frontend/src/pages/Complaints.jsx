import { useState, useEffect } from 'react';
import { MapPin, Clock } from 'lucide-react';

export default function Complaints() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/complaints')
      .then(res => res.json())
      .then(data => setComplaints(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="page-title">Recent Complaints</h2>
      <p className="page-subtitle">View civic issues reported by citizens in your area.</p>

      <div className="grid grid-cols-2">
        {complaints.map(comp => (
          <div key={comp.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
            {comp.image && (
              <div style={{ marginBottom: '1rem', width: '100%', height: '200px', overflow: 'hidden', borderRadius: '0.375rem' }}>
                <img src={comp.image} alt={comp.tag} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
              <div>
                <span style={{ textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--primary)', letterSpacing: '0.05em' }}>
                  {comp.category}
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', textTransform: 'capitalize', marginTop: '0.25rem' }}>
                  {comp.tag.replace('-', ' ')}
                </h3>
              </div>
              <span style={{ fontSize: '0.875rem', padding: '0.25rem 0.5rem', borderRadius: '1rem', backgroundColor: comp.status === 'resolved' ? '#dcfce7' : '#fef9c3', color: comp.status === 'resolved' ? '#166534' : '#854d0e', fontWeight: '500' }}>
                {comp.status}
              </span>
            </div>

            {comp.description && (
              <p style={{ color: 'var(--muted)', marginBottom: '1rem', flex: 1 }}>{comp.description}</p>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border)', fontSize: '0.875rem', color: 'var(--muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <MapPin size={16} /> Lat: {comp.latitude?.toFixed(2)} Lng: {comp.longitude?.toFixed(2)}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Clock size={16} /> {new Date(comp.time).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {complaints.length === 0 && (
        <p style={{ textAlign: 'center', color: 'var(--muted)', marginTop: '2rem' }}>No complaints filed yet.</p>
      )}
    </div>
  );
}
