import { useState, useEffect } from 'react';
import { CheckCircle, ChefHat, Bike, Home } from 'lucide-react';

const OrderTracking = () => {
  const [step, setStep] = useState(0);
  const steps = [
    { icon: <CheckCircle size={20} />, label: 'Order Received' },
    { icon: <ChefHat size={20} />, label: 'Preparing' },
    { icon: <Bike size={20} />, label: 'Out for Delivery' },
    { icon: <Home size={20} />, label: 'Delivered' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep(prev => (prev < 3 ? prev + 1 : prev));
    }, 5000); // Progress every 5 seconds for demo

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="order-tracking">
      <div className="tracking-header">
        <h3>Track Your Order</h3>
        <p className="order-id">ID: #MC-{Math.floor(1000 + Math.random() * 9000)}</p>
      </div>
      
      <div className="tracking-steps">
        {steps.map((s, i) => (
          <div key={i} className={`step ${i <= step ? 'active' : ''} ${i === step ? 'current' : ''}`}>
            <div className="step-icon-container">
              {s.icon}
              {i < steps.length - 1 && <div className="step-line" />}
            </div>
            <span className="step-label">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="estimated-time">
        <span>Estimated Delivery: <strong>25 - 35 mins</strong></span>
      </div>

      <style jsx>{`
        .order-tracking {
          padding: 1.5rem;
          background: #fff;
          border-radius: 8px;
          border: 1px solid rgba(200, 134, 58, 0.2);
          margin-top: 1rem;
        }
        .tracking-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        .tracking-header h3 {
          font-family: var(--font-serif);
          font-size: 1.2rem;
          color: var(--color-primary);
        }
        .order-id {
          font-size: 0.75rem;
          color: var(--color-text-muted);
        }
        .tracking-steps {
          display: flex;
          justify-content: space-between;
          position: relative;
          margin-bottom: 1.5rem;
        }
        .step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          flex: 1;
          color: #ccc;
          transition: all 0.5s ease;
        }
        .step.active {
          color: var(--color-accent);
        }
        .step.current {
          color: var(--color-primary);
          animation: pulse 2s infinite;
        }
        .step-icon-container {
          position: relative;
          z-index: 2;
          background: #fff;
          padding: 4px;
        }
        .step-line {
          position: absolute;
          top: 50%;
          left: 100%;
          width: 100%;
          height: 2px;
          background: #eee;
          z-index: 1;
          transform: translateY(-50%);
        }
        .step.active .step-line {
          background: var(--color-accent);
        }
        .step-label {
          font-size: 0.7rem;
          text-align: center;
          font-weight: 500;
          text-transform: uppercase;
        }
        .estimated-time {
          padding-top: 1rem;
          border-top: 1px dashed #eee;
          text-align: center;
          font-size: 0.85rem;
          color: var(--color-text-dark);
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default OrderTracking;
