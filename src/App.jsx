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
import OnlineMeeting from './OnlineMeeting.jsx';
import MeetingForm from './MeetingForm.jsx';
import HRPayroll from './HRPayroll.jsx';
import HRStudentPerformanceDashboard from './HRStudentPerformanceDashboard.jsx';
import HREventScheduler from './HREventScheduler.jsx';
import StudentEventsOnCampus from './StudentEventsOnCampus.jsx'; // Correct import for Events on Campus
import { CourseProvider } from './CourseContext.jsx';
import { StudentEventProvider } from './StudentEventContext.jsx';

function App() {
  return (
    <StudentEventProvider> {/* Wrap the app with the event provider */}
      <CourseProvider>
        <Router>
          <Routes>
            {/* Landing Page */}
            <Route path="/" element={<LandingPage />} />

            {/* Login Pages */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/staff-login" element={<StaffLogin />} />

            {/* Student Dashboard and Related Routes */}
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/student-schedule" element={<StudentSchedule />} />
            <Route path="/registered-courses" element={<StudentRegisteredCourses />} />
            <Route path="/student-notifications" element={<StudentNotification />} />
            <Route path="/events-on-campus" element={<StudentEventsOnCampus />} />

            {/* Meeting Functionality */}
            <Route path="/online-meeting" element={<OnlineMeeting />} />
            <Route path="/create-meeting" element={<MeetingForm />} />

            {/* Collaborative Whiteboard */}
            <Route path="/collaborative-whiteboard" element={<CollaborativeWhiteboard />} />

            {/* Staff (HR) Dashboard and Related Routes */}
            <Route path="/staff-dashboard" element={<HRDashboard />} />
            <Route path="/student-search" element={<StudentSearch />} />
            <Route path="/staff-notifications" element={<HRNotification />} />
            <Route path="/course-pool" element={<HRCoursePool />} />

            {/* HR Payroll and Staff Search */}
            <Route path="/hr-payroll" element={<HRPayroll />} />

            {/* HR-Specific Routes */}
            <Route path="/hr-student-performance-dashboard" element={<HRStudentPerformanceDashboard />} />
            <Route path="/event-scheduler" element={<HREventScheduler />} />

            {/* Fallback for Unknown Routes */}
            <Route path="*" element={<h1>404 - Page Not Found</h1>} />
          </Routes>
        </Router>
      </CourseProvider>
    </StudentEventProvider>
  );
}

export default App;
