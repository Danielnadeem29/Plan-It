import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage.jsx';
import StudentDashboard from './StudentDashboard.jsx';
import LoginPage from './LoginPage.jsx';
import StaffLogin from './StaffLogin.jsx';
import HRDashboard from './HRDashboard.jsx';
import StudentSchedule from './StudentSchedule.jsx';
import StudentRegisteredCourses from './StudentRegisteredCourses.jsx';
import StudentNotification from './StudentNotification.jsx';
import HRNotification from './HRNotification.jsx';
import StudentSearch from './StudentSearch.jsx';
import HRCoursePool from './HRCoursePool.jsx'; 
import { CourseProvider } from './CourseContext'; // Ensure this is correct

function App() {
  return (
    <CourseProvider> {/* Wrap with CourseProvider */}
      <Router>
        <Routes>
          {/* Home page (Landing page) */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Login pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/staff-login" element={<StaffLogin />} />

          {/* Student Dashboard and related routes */}
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/student-schedule" element={<StudentSchedule />} />
          <Route path="/registered-courses" element={<StudentRegisteredCourses />} />
          <Route path="/student-notifications" element={<StudentNotification />} />

          {/* Staff (HR) Dashboard and related routes */}
          <Route path="/staff-dashboard" element={<HRDashboard />} />
          <Route path="/student-search" element={<StudentSearch />} />
          <Route path="/staff-notifications" element={<HRNotification />} />
          <Route path="/course-pool" element={<HRCoursePool />} /> {/* HR Course Pool */}
        </Routes>
      </Router>
    </CourseProvider>
  );
}

export default App;
