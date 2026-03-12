import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Also included in main.jsx but good to have here

// Fix for default marker icons in Leaflet when using bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function ComplaintMap() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/complaints')
      .then(res => res.json())
      .then(data => setComplaints(data))
      .catch(err => console.error(err));
  }, []);

  // Default center to Mumbai approx since mock data uses 19.076, 72.877
  const center = [19.076, 72.877];

  return (
    <div style={{ height: 'calc(100vh - 120px)', width: '100%', display: 'flex', flexDirection: 'column' }}>
      <h2 className="page-title" style={{ marginBottom: '1rem' }}>Complaint Map View</h2>
      <div style={{ flex: 1, borderRadius: '0.5rem', overflow: 'hidden', border: '1px solid var(--border)', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
        <MapContainer center={center} zoom={11} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {complaints.map(comp => (
            comp.latitude && comp.longitude && (
              <Marker key={comp.id} position={[comp.latitude, comp.longitude]}>
                <Popup>
                  <div style={{ minWidth: '150px' }}>
                    <strong>{comp.category.toUpperCase()} - {comp.tag}</strong>
                    <p style={{ margin: '0.5rem 0', color: 'var(--muted)' }}>Status: {comp.status}</p>
                    {comp.description && <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem' }}>{comp.description}</p>}
                    {comp.image && <img src={comp.image} alt={comp.tag} style={{ width: '100%', height: 'auto', borderRadius: '0.25rem' }} />}
                    <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.75rem', color: 'var(--muted)' }}>
                      Reported: {new Date(comp.time).toLocaleDateString()}
                    </p>
                  </div>
                </Popup>
              </Marker>
            )
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
