import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { ShoppingBag } from 'lucide-react';
import { AuthContext } from '../App';
import { CartContext } from '../context/CartContext';
import StoreStatus from './StoreStatus';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const { isAuthenticated, logout } = useContext(AuthContext);
  const { getCartCount, toggleCart } = useContext(CartContext);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'About Us', path: '/about' },
    { name: 'My Orders', path: '/profile' },
  ];

  const cartCount = getCartCount();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand-group">
          <Link to="/" className="navbar-brand">Mocha·Café</Link>
          <StoreStatus />
        </div>
        <div className="navbar-links">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="navbar-actions">
            {isAuthenticated ? (
              <button onClick={logout} className="nav-btn">Sign Out</button>
            ) : (
              <Link to="/signin" className="nav-btn">Sign In</Link>
            )}
            
            <button className="cart-toggle-btn" onClick={toggleCart}>
              <ShoppingBag size={20} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
