import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Package, TrendingUp, Users, DollarSign, Clock, RefreshCcw } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalOrders: 0, totalRevenue: 0, pending: 0 });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      if (supabase) {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setOrders(data || []);
        calculateStats(data || []);
      } else {
        const mockOrders = JSON.parse(localStorage.getItem('mocha_order_history') || '[]');
        setOrders(mockOrders);
        calculateStats(mockOrders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    const revenue = data.reduce((sum, order) => sum + (order.total_amount || 0), 0);
    const pending = data.filter(o => o.status === 'Received' || o.status === 'Preparing').length;
    setStats({
      totalOrders: data.length,
      totalRevenue: revenue,
      pending: pending
    });
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      if (supabase) {
        const { error } = await supabase
          .from('orders')
          .update({ status: newStatus })
          .eq('id', orderId);
        if (error) throw error;
      } else {
        const history = JSON.parse(localStorage.getItem('mocha_order_history') || '[]');
        const updated = history.map(o => o.id === orderId ? { ...o, status: newStatus } : o);
        localStorage.setItem('mocha_order_history', JSON.stringify(updated));
      }
      // Refresh local state
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      calculateStats(orders);
    } catch (error) {
      alert('Error updating status: ' + error.message);
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="container">
        <div className="dashboard-header">
          <SectionHeading title="Admin Dashboard" subtitle="Manage Mocha Café orders and track growth" />
          <button className="refresh-btn" onClick={fetchOrders} title="Refresh Data">
            <RefreshCcw size={20} className={loading ? 'spinning' : ''} />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon"><Package size={24} /></div>
            <div className="stat-info">
              <h3>{stats.totalOrders}</h3>
              <p>Total Orders</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon accent"><DollarSign size={24} /></div>
            <div className="stat-info">
              <h3>₹{stats.totalRevenue.toLocaleString()}</h3>
              <p>Revenue</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon warning"><Clock size={24} /></div>
            <div className="stat-info">
              <h3>{stats.pending}</h3>
              <p>Pending Orders</p>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="admin-orders-section">
          <h3>Recent Orders</h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Customer Address</th>
                  <th>Items</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr><td colSpan="7" className="empty-table">No orders found.</td></tr>
                ) : (
                  orders.map(order => (
                    <tr key={order.id}>
                      <td className="id-cell">#{order.id.slice(0, 8).toUpperCase()}</td>
                      <td>{new Date(order.created_at).toLocaleDateString()}</td>
                      <td className="address-cell">{order.address}</td>
                      <td>
                        <div className="items-tooltip">
                          {order.items.length} items
                          <span className="tooltip-text">
                            {order.items.map((i,idx) => (
                              <div key={idx}>{i.quantity}x {i.name}</div>
                            ))}
                          </span>
                        </div>
                      </td>
                      <td className="price-cell">₹{order.total_amount}</td>
                      <td>
                        <span className={`status-badge ${order.status.toLowerCase()}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <select 
                          value={order.status} 
                          onChange={(e) => updateStatus(order.id, e.target.value)}
                          className="status-select"
                        >
                          <option value="Received">Received</option>
                          <option value="Preparing">Preparing</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
