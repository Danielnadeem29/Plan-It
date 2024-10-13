import React, { useState } from 'react';
import './LoginPage.css'; // Import login page CSS


function LoginPage() {
  const [studentID, setStudentID] = useState('');
  const [pin, setPin] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add your login logic
    console.log(`Student ID: ${studentID}, PIN: ${pin}`);
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Last 4 digits of Student ID:</label>
          <input 
            type="text" 
            value={studentID} 
            onChange={(e) => setStudentID(e.target.value)} 
            maxLength={4} 
            required 
          />
        </div>
        <div>
          <label>4-digit PIN:</label>
          <input 
            type="password" 
            value={pin} 
            onChange={(e) => setPin(e.target.value)} 
            maxLength={4} 
            required 
          />
        </div>
        <button type="submit" className="myButton">Submit</button>
      </form>
    </div>
  );
}

export default LoginPage;
