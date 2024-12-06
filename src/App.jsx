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
import CollaborativeWhiteboard from './CollaborativeWhiteboard.jsx';
import OnlineMeeting from './OnlineMeeting.jsx'; // Import the OnlineMeeting component
import MeetingForm from './MeetingForm.jsx'; // Import the MeetingForm component
import HRPayroll from './HRPayroll.jsx'; // Import the HRPayroll component
import { CourseProvider } from './CourseContext.jsx';

function App() {
  return (
    <CourseProvider>
      <Router>
        <Routes>
          {/* Home page (Landing Page) */}
          <Route path="/" element={<LandingPage />} />

          {/* Login Pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/staff-login" element={<StaffLogin />} />

          {/* Student Dashboard and Related Routes */}
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/student-schedule" element={<StudentSchedule />} />
          <Route path="/registered-courses" element={<StudentRegisteredCourses />} />
          <Route path="/student-notifications" element={<StudentNotification />} />

          {/* Meeting Functionality */}
          <Route path="/online-meeting" element={<OnlineMeeting />} /> {/* Join or Host Meeting */}
          <Route path="/create-meeting" element={<MeetingForm />} /> {/* Host Meeting Form */}

          {/* Collaborative Whiteboard */}
          <Route path="/collaborative-whiteboard" element={<CollaborativeWhiteboard />} />

          {/* Staff (HR) Dashboard and Related Routes */}
          <Route path="/staff-dashboard" element={<HRDashboard />} />
          <Route path="/student-search" element={<StudentSearch />} />
          <Route path="/staff-notifications" element={<HRNotification />} />
          <Route path="/course-pool" element={<HRCoursePool />} />

          {/* HR Payroll and Staff Search */}
          <Route path="/hr-payroll" element={<HRPayroll />} />

          {/* Fallback for unknown routes */}
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </Router>
    </CourseProvider>
  );
}

export default App;
