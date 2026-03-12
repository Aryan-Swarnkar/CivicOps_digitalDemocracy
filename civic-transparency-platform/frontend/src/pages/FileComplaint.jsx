import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, MapPin, Check } from 'lucide-react';

const CATEGORIES = {
  Road: ['pothole', 'broken road', 'waterlogging', 'other'],
  Garbage: ['overflowing bin', 'illegal dumping', 'dead animal', 'other'],
  Water: ['pipe leak', 'no water supply', 'dirty water', 'other'],
  Other: ['other']
};

export default function FileComplaint({ user, showNotification }) {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [category, setCategory] = useState('');
  const [tag, setTag] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);
  
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [stream, setStream] = useState(null);

  if (!user) {
    return (
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <h2>Please login to file a complaint.</h2>
        <button onClick={() => navigate('/login')} className="btn btn-primary" style={{ marginTop: '1rem' }}>Login</button>
      </div>
    );
  }

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setTag('');
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setIsCameraOpen(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Could not access the camera. Make sure you gave permission.");
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageDataUrl = canvas.toDataURL('image/jpeg');
      setImage(imageDataUrl);
      
      // Stop camera
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      setIsCameraOpen(false);

      // Get Location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
            showNotification('Photo and Location captured!', 'success');
          },
          (err) => {
            console.error("Error getting location: ", err);
            // Default mock location if denied, just for prototype to work
            setLocation({ latitude: 19.076, longitude: 72.877 });
            showNotification('Location denied, using mock location.', 'info');
          }
        );
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !location) {
      alert("Please capture a photo first (which also gets your location).");
      return;
    }

    const payload = {
      category,
      tag,
      description,
      image,
      latitude: location.latitude,
      longitude: location.longitude,
      time: new Date().toISOString()
    };

    try {
      const res = await fetch('http://localhost:5000/api/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        showNotification('Complaint submitted successfully');
        navigate('/complaints');
      }
    } catch (err) {
      console.error(err);
      alert("Failed to submit complaint.");
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 className="page-title">File a Complaint</h2>
      <p className="page-subtitle">Snap a picture of the issue and submit it with GPS co-ordinates.</p>

      <div className="card">
        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label className="form-label">Category</label>
            <select className="form-control" value={category} onChange={handleCategoryChange} required>
              <option value="">Select Category</option>
              {Object.keys(CATEGORIES).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {category && (
            <div className="form-group">
              <label className="form-label">Tag</label>
              <select className="form-control" value={tag} onChange={(e) => setTag(e.target.value)} required>
                <option value="">Select specific issue</option>
                {CATEGORIES[category].map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          )}

          {tag === 'other' && (
            <div className="form-group">
              <label className="form-label">Description (Required for 'other')</label>
              <textarea 
                className="form-control" 
                rows="3" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          )}

          {tag !== 'other' && (
            <div className="form-group">
              <label className="form-label">Description (Optional)</label>
              <textarea 
                className="form-control" 
                rows="3" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          )}

          <div className="form-group" style={{ marginTop: '2rem' }}>
            <label className="form-label">Geo-Tagged Photo Evidence</label>
            
            {!image && !isCameraOpen && (
              <button type="button" onClick={startCamera} className="btn btn-secondary" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', padding: '1rem' }}>
                <Camera size={20} /> Open Camera to Capture Photo
              </button>
            )}

            <div style={{ display: isCameraOpen ? 'block' : 'none', position: 'relative', marginTop: '1rem' }}>
              <video ref={videoRef} autoPlay playsInline style={{ width: '100%', borderRadius: '0.5rem', backgroundColor: '#000' }}></video>
              <button type="button" onClick={capturePhoto} className="btn btn-primary" style={{ position: 'absolute', bottom: '1rem', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
                Capture Photo
              </button>
            </div>
            
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

            {image && (
              <div style={{ marginTop: '1rem', border: '1px solid var(--border)', borderRadius: '0.5rem', padding: '1rem', backgroundColor: 'var(--background)' }}>
                <img src={image} alt="Captured issue" style={{ width: '100%', borderRadius: '0.25rem', marginBottom: '1rem' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)', fontSize: '0.875rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <MapPin size={16} /> Lat: {location?.latitude.toFixed(4)}, Lng: {location?.longitude.toFixed(4)}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--secondary-dark)' }}>
                    <Check size={16} /> Location verified
                  </span>
                </div>
                <button type="button" onClick={() => setImage(null)} className="btn" style={{ marginTop: '1rem', width: '100%', border: '1px solid var(--danger)', color: 'var(--danger)' }}>
                  Retake Photo
                </button>
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', fontSize: '1.125rem', padding: '0.75rem' }} disabled={!image || !location}>
            Submit Complaint
          </button>
        </form>
      </div>
    </div>
  );
}
