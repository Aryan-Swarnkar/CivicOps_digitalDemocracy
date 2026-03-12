import React from 'react';
import { CheckCircle, Info } from 'lucide-react';

export default function NotificationBanner({ notification }) {
  const isSuccess = notification.type === 'success';
  const bgColor = isSuccess ? '#dcfce7' : '#e0f2fe';
  const color = isSuccess ? '#166534' : '#075985';
  const borderColor = isSuccess ? '#bbf7d0' : '#bae6fd';

  return (
    <div style={{ 
      position: 'fixed', 
      top: '1rem', 
      left: '50%', 
      transform: 'translateX(-50%)', 
      zIndex: 1000,
      backgroundColor: bgColor,
      color: color,
      border: `1px solid ${borderColor}`,
      padding: '0.75rem 1.5rem',
      borderRadius: '2rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontWeight: '500'
    }}>
      {isSuccess ? <CheckCircle size={20} /> : <Info size={20} />}
      {notification.message}
    </div>
  );
}
