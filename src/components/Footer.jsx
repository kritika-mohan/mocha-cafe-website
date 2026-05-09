import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <h2 className="footer-brand">Mocha·Café</h2>
        <p className="footer-copy">&copy; {new Date().getFullYear()} Mocha Café. All rights reserved.</p>
        <div className="footer-admin">
          <Link to="/admin">Admin Access</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
