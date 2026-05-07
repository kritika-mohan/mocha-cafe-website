import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../App';
import './SignIn.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate authentication
    login();
    navigate('/');
  };

  return (
    <div className="page-transition signin-page">
      <div className="signin-split">
        
        {/* Left Panel - Decorative */}
        <div className="signin-left">
          <div className="signin-left-content">
            <h1 className="signin-title">Members<br/>Lounge</h1>
            <p className="signin-subtitle">Log in to access your saved orders, exclusive rewards, and priority reservations.</p>
            
            <div className="decorative-circles">
              <div className="circle circle-1"></div>
              <div className="circle circle-2"></div>
            </div>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="signin-right">
          <div className="signin-form-container">
            <h2 className="form-heading text-primary">Welcome Back</h2>
            <p className="form-subheading text-muted">Please enter your details to sign in.</p>
            
            <form onSubmit={handleSubmit} className="signin-form">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                  placeholder="name@example.com"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                  placeholder="••••••••"
                />
              </div>

              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" /> Remember me
                </label>
                <a href="#" className="forgot-password text-accent">Forgot password?</a>
              </div>

              <button type="submit" className="btn btn-full">Sign In</button>
            </form>

            <div className="form-footer">
              <p className="text-muted">
                Don't have an account? <a href="#" className="text-accent" style={{ fontWeight: 500 }}>Sign up</a>
              </p>
              <div className="guest-link-wrapper">
                <Link to="/" className="guest-link text-muted">Continue as Guest</Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SignIn;
