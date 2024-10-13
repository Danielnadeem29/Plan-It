import React from 'react';
import './LandingPage.css'; // Import landing page CSS
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

function LandingPage() {
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Function to handle student login button click
  const handleStudentLogin = () => {
    navigate('/login'); // Navigate to the login page
  };

  // Function to handle HR login button click (you can modify this if needed)
  const handleHRLogin = () => {
    navigate('/login'); // Navigate to the login page (change this if HR needs a different login page)
  };

  return (
    <section>
      <div className="Student-login">
        <h1>Student Log in</h1>
        <p>Students Only</p>
        <button className="myButton" onClick={handleStudentLogin}>Log in</button>
        <button className="myButton">Register</button>
      </div>

      <div className="HR-login">
        <h1>HR Log in</h1>
        <p>Faculty Only</p>
        <button className="myButton" onClick={handleHRLogin}>Log in</button>
        <button className="myButton">Register</button>
      </div>
    </section>
  );
}

export default LandingPage;
