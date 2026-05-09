import { Link, useLocation } from 'react-router-dom';
import { useState, useContext } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { AuthContext } from '../App';
import { CartContext } from '../context/CartContext';
import StoreStatus from './StoreStatus';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const { isAuthenticated, logout } = useContext(AuthContext);
  const { getCartCount, toggleCart } = useContext(CartContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

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
        <div className={`navbar-links ${isMenuOpen ? 'mobile-open' : ''}`}>
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              onClick={closeMenu}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="navbar-actions">
            {isAuthenticated ? (
              <button onClick={() => { logout(); closeMenu(); }} className="nav-btn">Sign Out</button>
            ) : (
              <Link to="/signin" className="nav-btn" onClick={closeMenu}>Sign In</Link>
            )}
            
            <button className="cart-toggle-btn" onClick={() => { toggleCart(); closeMenu(); }}>
              <ShoppingBag size={20} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
          </div>
        </div>

        <button className="mobile-menu-btn" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
