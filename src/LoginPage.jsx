import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import { FaEnvelope, FaLock } from 'react-icons/fa'; // Import icons for email and password

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

    // Mock login validation (replace this with your actual login logic)
    if (email === 'student@example.com' && password === 'passw123') {
      // On successful login, redirect to the student dashboard
      navigate('/student-dashboard');
    } else {
      // If the login fails, show an error message
      setError('Invalid email or password');
    }
  }

  return (
    <div className="login-page">
      <div className="overlay"></div> {/* Background overlay */}
      <div className="login-box">
        <h1>Welcome Back</h1>
        <p className="subtext">Login to continue</p>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <FaEnvelope className="input-icon" /> {/* Email Icon */}
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
          </div>
          <div className="input-group">
            <FaLock className="input-icon" /> {/* Password Icon */}
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
          </div>
          <button type="submit" className="submit-btn">Login</button>
          {error && <p className="error-message">{error}</p>} {/* Display error message */}
        </form>
        <p className="forgot-password">Forgot your password?</p> {/* Optional link */}
      </div>
    </div>
  );
}

export default LoginPage;
