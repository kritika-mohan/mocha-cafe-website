import { useContext, useState } from 'react';
import { ShoppingBag, X, Plus, Minus, CheckCircle } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { isStoreOpen } from '../utils/timeUtils';
import OrderTracking from './OrderTracking';
import { supabase } from '../lib/supabaseClient';
import './CartSidebar.css';

const CartSidebar = () => {
  const { 
    cartItems, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    getCartTotal,
    clearCart
  } = useContext(CartContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOrderSuccess, setIsOrderSuccess] = useState(false);
  const [address, setAddress] = useState('');

  const handleCheckout = async () => {
    if (!address.trim()) {
      alert('Please enter a delivery address');
      return;
    }
    setIsSubmitting(true);

    const orderData = {
      items: cartItems,
      total_amount: getCartTotal(),
      address: address,
      status: 'Received'
    };

    try {
      if (supabase) {
        // REAL BACKEND: Save to Supabase
        const { error } = await supabase
          .from('orders')
          .insert([orderData]);
        
        if (error) throw error;
      } else {
        // MOCK BACKEND: Simulate delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Save to local history for guest view
        const history = JSON.parse(localStorage.getItem('mocha_order_history') || '[]');
        const newOrder = { 
          id: `MOCK-${Math.random().toString(36).substr(2, 9)}`,
          created_at: new Date().toISOString(),
          ...orderData 
        };
        localStorage.setItem('mocha_order_history', JSON.stringify([newOrder, ...history]));
        
        console.log('Mock Order saved to local history:', newOrder);
      }

      setIsSubmitting(false);
      setIsOrderSuccess(true);
      
      // Keep success state open for tracking demo
      setTimeout(() => {
        clearCart();
        setIsOrderSuccess(false);
        setIsCartOpen(false);
        setAddress('');
      }, 25000);

    } catch (error) {
      console.error('Order failed:', error.message);
      alert('Failed to place order. Please check your connection.');
      setIsSubmitting(false);
    }
  };

  if (!isCartOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={() => setIsCartOpen(false)}></div>
      <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
        
        <div className="cart-header">
          <h2>Your Order</h2>
          <button className="close-btn" onClick={() => setIsCartOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="cart-content">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <ShoppingBag size={48} strokeWidth={1} />
              <p>Your cart is empty</p>
              <button className="btn btn-outline" onClick={() => setIsCartOpen(false)}>Browse Menu</button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={item.name} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h4 className="cart-item-title">{item.name}</h4>
                    <div className="cart-item-price">{item.price}</div>
                    
                    <div className="cart-item-actions">
                      <div className="cart-quantity-controls">
                        <button onClick={() => updateQuantity(item.name, item.quantity - 1)}>
                          <Minus size={14} />
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.name, item.quantity + 1)}>
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {cartItems.length > 0 && !isOrderSuccess && (
            <div className="cart-delivery-section">
              <h3>Delivery Address</h3>
              <textarea 
                placeholder="Enter your full address (Building, Street, Landmark)..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={3}
              />
            </div>
          )}

          {isOrderSuccess && (
            <div className="order-success-view">
              <div className="success-banner">
                <CheckCircle size={32} color="#2e7d32" />
                <h2>Order Placed Successfully!</h2>
                <p>Your delicious meal is on its way to:</p>
                <div className="address-display">{address}</div>
              </div>
              <OrderTracking />
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary">
              <div className="cart-subtotal">
                <span>Subtotal</span>
                <span>₹{getCartTotal()}</span>
              </div>
              <p className="cart-taxes">Taxes and delivery calculated at checkout</p>
            </div>
            <button 
              className={`checkout-btn ${isSubmitting ? 'loading' : ''} ${isOrderSuccess ? 'success' : ''} ${!isStoreOpen() ? 'disabled' : ''}`}
              onClick={handleCheckout}
              disabled={isSubmitting || isOrderSuccess || !isStoreOpen()}
            >
              {isSubmitting ? (
                'Processing Order...'
              ) : isOrderSuccess ? (
                <span className="flex-center gap-2"><CheckCircle size={18} /> Order Placed!</span>
              ) : !isStoreOpen() ? (
                'Closed - Opens at 8 AM'
              ) : (
                `Proceed to Checkout • ₹${getCartTotal()}`
              )}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
