import { useState, useEffect, useContext } from 'react';
import { supabase } from '../lib/supabaseClient';
import { AuthContext } from '../App';
import { Package, Calendar, MapPin, CheckCircle } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import './Profile.css';

const Profile = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, [isAuthenticated]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      if (supabase) {
        // In a real app, we would filter by user_id
        // For this demo, we'll fetch the latest orders
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10);
        
        if (error) throw error;
        setOrders(data || []);
      } else {
        // Fallback: load from local storage mock
        const mockOrders = JSON.parse(localStorage.getItem('mocha_order_history') || '[]');
        setOrders(mockOrders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page">
      <div className="container">
        <SectionHeading 
          title="Order History" 
          subtitle="View your past delights and tracking status"
        />

        {!isAuthenticated && (
          <div className="auth-notice">
            <p>Sign in to sync your orders across devices.</p>
          </div>
        )}

        <div className="orders-list">
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Fetching your orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="empty-history">
              <Package size={48} strokeWidth={1} />
              <h3>No orders yet</h3>
              <p>Your future delicious meals will appear here.</p>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-card-header">
                  <div className="order-meta">
                    <span className="order-id">#{order.id.slice(0, 8).toUpperCase()}</span>
                    <span className="order-date">
                      <Calendar size={14} />
                      {new Date(order.created_at).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <div className={`order-status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </div>
                </div>

                <div className="order-items">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="order-item-row">
                      <span>{item.quantity}x {item.name}</span>
                      <span>{item.price}</span>
                    </div>
                  ))}
                </div>

                <div className="order-card-footer">
                  <div className="order-address">
                    <MapPin size={14} />
                    <span>{order.address}</span>
                  </div>
                  <div className="order-total">
                    <span>Total Amount</span>
                    <strong>₹{order.total_amount}</strong>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
