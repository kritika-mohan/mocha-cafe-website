import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import './MenuCard.css';

const MenuCard = ({ item }) => {
  const { cartItems, addToCart, updateQuantity } = useContext(CartContext);
  
  // Find if item is already in cart
  const cartItem = cartItems.find(i => i.name === item.name);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <div className="menu-card">
      <div className="menu-card-image-wrapper">
        <img src={item.image} alt={item.name} className="menu-card-image" />
        {item.tag && <span className="menu-tag-overlay">{item.tag}</span>}
      </div>
      
      <div className="menu-card-content">
        <div className="menu-card-header">
          <h3 className="menu-title">{item.name}</h3>
        </div>
        <p className="menu-desc text-muted">{item.desc}</p>
        
        <div className="menu-card-footer">
          <div className="menu-price text-accent">{item.price}</div>
          
          <div className="cart-controls">
            {quantity > 0 ? (
              <div className="quantity-selector">
                <button 
                  className="qty-btn" 
                  onClick={() => updateQuantity(item.name, quantity - 1)}
                >-</button>
                <span className="qty-count">{quantity}</span>
                <button 
                  className="qty-btn" 
                  onClick={() => updateQuantity(item.name, quantity + 1)}
                >+</button>
              </div>
            ) : (
              <button 
                className="add-to-cart-btn" 
                onClick={() => addToCart(item)}
              >
                Add +
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
