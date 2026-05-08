import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load from localStorage on mount (optional but good for UX)
  useEffect(() => {
    const savedCart = localStorage.getItem('mocha_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart");
      }
    }
  }, []);

  // Save to localStorage when cart changes
  useEffect(() => {
    localStorage.setItem('mocha_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.name === item.name);
      if (existing) {
        return prev.map(i => i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (itemName) => {
    setCartItems(prev => prev.filter(i => i.name !== itemName));
  };

  const updateQuantity = (itemName, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemName);
      return;
    }
    setCartItems(prev => prev.map(i => i.name === itemName ? { ...i, quantity: newQuantity } : i));
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      // price is a string like "₹240", we need to parse it
      const numericPrice = parseInt(item.price.replace(/[^0-9]/g, ''), 10);
      return total + (numericPrice * item.quantity);
    }, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('mocha_cart');
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      isCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleCart,
      setIsCartOpen,
      getCartTotal,
      getCartCount,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};
