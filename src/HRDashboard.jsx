import React, { useEffect } from 'react';
import './HRDashboard.css';
import { MdOutlineManageSearch } from 'react-icons/md'; // Manage Search icon
import { AiFillNotification } from 'react-icons/ai'; // Notification icon
import { GrTableAdd } from 'react-icons/gr'; // Table Add icon for Course Pool
import { FaMoneyCheckAlt } from 'react-icons/fa'; // Payroll icon
import { useNavigate } from 'react-router-dom'; // For navigation

const HRDashboard = () => {
  const navigate = useNavigate(); // Initialize navigation

  // Add animation effect to cards on mount
  useEffect(() => {
    const cards = document.querySelectorAll('.dashboard-item');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('visible');
      }, index * 200); // Adding delay to each card for animation
    });
  }, []);

  // Navigation functions for each section
  const goToStudentSearch = () => {
    navigate('/student-search'); // Navigate to Student Search page
  };

  const goToNotifications = () => {
    navigate('/staff-notifications'); // Navigate to HRNotification (Staff Notifications) page
  };

  const goToCoursePool = () => {
    navigate('/course-pool'); // Navigate to HRCoursePool page
  };

  const goToPayroll = () => {
    navigate('/hr-payroll'); // Navigate to HR Payroll page
  };

  return (
    <div className="hr-dashboard">
      <h1>Welcome to HR Dashboard</h1>

      <div className="dashboard-section">
        {/* Student Search section */}
        <div className="dashboard-item" onClick={goToStudentSearch}>
          <MdOutlineManageSearch className="icon" />
          <div className="item-info">
            <h2>Student Search</h2>
            <p>Search and manage student profiles and courses.</p>
            <button className="action-button">View Students</button>
          </div>
        </div>

        {/* Notification Center section */}
        <div className="dashboard-item" onClick={goToNotifications}>
          <AiFillNotification className="icon" />
          <div className="item-info">
            <h2>Notification Center</h2>
            <p>View notifications sent by students.</p>
            <button className="action-button">Check Notifications</button>
          </div>
        </div>

        {/* Course Pool section */}
        <div className="dashboard-item" onClick={goToCoursePool}>
          <GrTableAdd className="icon" />
          <div className="item-info">
            <h2>Course Pool</h2>
            <p>Manage course offerings and enrollments.</p>
            <button className="action-button">Manage Courses</button>
          </div>
        </div>

        {/* Payroll section */}
        <div className="dashboard-item" onClick={goToPayroll}>
          <FaMoneyCheckAlt className="icon" />
          <div className="item-info">
            <h2>Payroll</h2>
            <p>View and manage payroll for students and staff.</p>
            <button className="action-button">View Payroll</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRDashboard;
