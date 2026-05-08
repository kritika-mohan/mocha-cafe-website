import { useState, useEffect } from 'react';
import { storeSettings } from '../data/menuData';
import { Clock } from 'lucide-react';

const StoreStatus = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const timeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      
      const open = timeStr >= storeSettings.openingTime && timeStr < storeSettings.closingTime;
      setIsOpen(open);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`store-status-badge ${isOpen ? 'open' : 'closed'}`}>
      <Clock size={14} />
      <span>
        {isOpen ? (
          `Open Now • Serving until ${formatTime(storeSettings.closingTime)}`
        ) : (
          `Closed • Opens at ${formatTime(storeSettings.openingTime)}`
        )}
      </span>
      <style jsx>{`
        .store-status-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-family: 'Jost', sans-serif;
          font-weight: 400;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          transition: all 0.3s ease;
        }
        .store-status-badge.open {
          background: rgba(43, 18, 6, 0.1);
          color: #2B1206;
          border: 1px solid rgba(43, 18, 6, 0.2);
        }
        .store-status-badge.closed {
          background: rgba(123, 63, 30, 0.1);
          color: #7B3F1E;
          border: 1px solid rgba(123, 63, 30, 0.2);
        }
      `}</style>
    </div>
  );
};

// Helper to format 24h to 12h
const formatTime = (time24) => {
  const [hours, minutes] = time24.split(':');
  const h = parseInt(hours);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  return `${h12}${ampm}`;
};

export default StoreStatus;
