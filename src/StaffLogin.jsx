import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StaffLogin.css'; // Import staff login-specific CSS
import { FaUserTie, FaLock } from 'react-icons/fa'; // Import icons for staff ID and password

function StaffLogin() {
  const [staffID, setStaffID] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize the navigate hook

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mock login validation (replace with actual logic)
    if (staffID === 'hrstaff' && password === 'password123') {
      navigate('/staff-dashboard'); // Redirect to the HR dashboard
    } else {
      setError('Invalid credentials'); // Handle login failure
    }
  };

  return (
    <div className="login-page">
      <div className="overlay"></div> {/* Background overlay */}
      <div className="login-box">
        <h1>HR Staff Login</h1>
        <p className="subtext">Login to access your dashboard</p>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <FaUserTie className="input-icon" /> {/* Staff ID Icon */}
            <input 
              type="text" 
              placeholder="Staff ID" 
              value={staffID} 
              onChange={(e) => setStaffID(e.target.value)} 
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

export default StaffLogin;
