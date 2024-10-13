import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from "./LandingPage.jsx"; // Import your LandingPage component
import Student from "./Student.jsx"; // Assuming you have a Student component
import LoginPage from "./LoginPage.jsx"; // Import your new LoginPage component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} /> {/* Home page */}
        <Route path="/login" element={<LoginPage />} /> {/* Login page */}
        <Route path="/student" element={<Student />} /> {/* Student page */}
        
      </Routes>
    </Router>
  );
}

export default App;
