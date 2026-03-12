import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/projects/${id}`)
      .then(res => res.json())
      .then(data => setProject(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!project) return <div style={{ textAlign: 'center', marginTop: '3rem' }}>Loading project details...</div>;

  return (
    <div>
      <Link to="/projects" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--muted)', marginBottom: '1.5rem', fontWeight: '500' }}>
        <ArrowLeft size={18} /> Back to Projects
      </Link>
      
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 className="page-title" style={{ marginBottom: '0.5rem' }}>{project.name}</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', color: 'var(--muted)', marginBottom: '1rem' }}>
          <span style={{ backgroundColor: 'var(--background)', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>Status: <strong>{project.status}</strong></span>
          <span style={{ backgroundColor: 'var(--background)', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>Budget: <strong>{project.budget}</strong></span>
        </div>
      </div>

      <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--foreground)' }}>Project Timeline</h3>
      
      <div className="card">
        {project.timeline && project.timeline.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {project.timeline.map((event, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', position: 'relative' }}>
                <div style={{ color: 'var(--primary)', marginTop: '0.25rem', zIndex: 1, backgroundColor: 'var(--card)' }}>
                  <CheckCircle2 size={24} />
                </div>
                {index !== project.timeline.length - 1 && (
                  <div style={{ position: 'absolute', top: '24px', left: '11px', bottom: '-24px', width: '2px', backgroundColor: 'var(--border)' }}></div>
                )}
                <div style={{ backgroundColor: 'var(--background)', padding: '1rem', borderRadius: '0.375rem', flex: 1 }}>
                  {event}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No timeline available.</p>
        )}
      </div>
    </div>
  );
}
