import React, { useEffect } from 'react';
import './StudentDashboard.css';
import { SlCalender } from 'react-icons/sl'; // Calendar icon for My Schedule
import { IoMdNotifications } from "react-icons/io"; // Notification icon
import { GoChecklist } from "react-icons/go"; // Checklist icon for Registered Courses
import { useNavigate } from 'react-router-dom'; // For navigation

const StudentDashboard = () => {
  const navigate = useNavigate(); // Initialize navigation

  // Function to navigate to StudentSchedule page
  const goToSchedule = () => {
    navigate('/student-schedule'); // Correct path for student schedule
  };

  // Function to navigate to StudentRegisteredCourses page
  const goToRegisteredCourses = () => {
    navigate('/registered-courses'); // Correct path for registered courses
  };

  // Function to navigate to StudentNotification page
  const goToNotifications = () => {
    navigate('/student-notifications'); // Correct path for notifications
  };

  // Add fade-in animation on component mount
  useEffect(() => {
    const cards = document.querySelectorAll('.dashboard-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('visible');
      }, index * 200); // Delay the animation for each card
    });
  }, []);

  return (
    <div className="student-dashboard">
      <h1>Welcome to Your Dashboard</h1>
      
      <div className="dashboard-section">
        {/* My Schedule Section */}
        <div className="dashboard-card" onClick={goToSchedule}>
          <SlCalender className="icon" />
          <div className="card-content">
            <h2>My Schedule</h2>
            <p>Manage your schedule effectively. View your registered courses and timings.</p>
          </div>
          <button className="action-button">View Schedule</button>
        </div>

        {/* Notifications Section */}
        <div className="dashboard-card" onClick={goToNotifications}>
          <IoMdNotifications className="icon" />
          <div className="card-content">
            <h2>Notifications</h2>
            <p>Receive important reminders on registration deadlines, class updates, and more.</p>
          </div>
          <button className="action-button">Check Notifications</button>
        </div>

        {/* Registered Courses Section */}
        <div className="dashboard-card" onClick={goToRegisteredCourses}>
          <GoChecklist className="icon" />
          <div className="card-content">
            <h2>Registered Courses</h2>
            <p>Track your registered courses, drop or add courses, and plan your academic journey.</p>
          </div>
          <button className="action-button">Manage Courses</button>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
