import { useContext } from 'react';
import { ShoppingBag, X, Plus, Minus } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import './CartSidebar.css';

const CartSidebar = () => {
  const { 
    cartItems, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    getCartTotal 
  } = useContext(CartContext);

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
            <button className="checkout-btn">
              Proceed to Checkout • ₹{getCartTotal()}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
