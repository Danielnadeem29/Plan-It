import React, { useEffect } from 'react';
import './HRDashboard.css';
import { MdOutlineManageSearch } from 'react-icons/md'; // Manage Search icon
import { AiFillNotification } from 'react-icons/ai'; // Notification icon
import { GrTableAdd } from 'react-icons/gr'; // Table Add icon for Course Pool
import { FaMoneyCheckAlt } from 'react-icons/fa'; // Payroll icon
import { HiOutlineAcademicCap } from 'react-icons/hi'; // Academic cap icon for Performance Dashboard
import { IoMdCalendar } from 'react-icons/io'; // Calendar icon for Event Scheduler
import { FaChalkboardTeacher } from 'react-icons/fa'; // Whiteboard icon
import { BsFillCameraVideoFill } from 'react-icons/bs'; // Online meeting icon
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
  const goToStudentSearch = () => navigate('/student-search');
  const goToNotifications = () => navigate('/staff-notifications');
  const goToCoursePool = () => navigate('/course-pool');
  const goToPayroll = () => navigate('/hr-payroll');
  const goToPerformanceDashboard = () =>
    navigate('/hr-student-performance-dashboard');
  const goToEventScheduler = () => navigate('/event-scheduler');
  const goToWhiteboard = () => navigate('/collaborative-whiteboard');
  const goToOnlineMeetings = () => navigate('/online-meeting');

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

        {/* Student Performance Dashboard section */}
        <div className="dashboard-item" onClick={goToPerformanceDashboard}>
          <HiOutlineAcademicCap className="icon" />
          <div className="item-info">
            <h2>Performance Dashboard</h2>
            <p>Track and analyze student performance metrics.</p>
            <button className="action-button">View Performance</button>
          </div>
        </div>

        {/* Event Scheduler section */}
        <div className="dashboard-item" onClick={goToEventScheduler}>
          <IoMdCalendar className="icon" />
          <div className="item-info">
            <h2>Event Scheduler</h2>
            <p>Manage campus events, workshops, and job fairs.</p>
            <button className="action-button">View Events</button>
          </div>
        </div>

        {/* Collaborative Whiteboard section */}
        <div className="dashboard-item" onClick={goToWhiteboard}>
          <FaChalkboardTeacher className="icon" />
          <div className="item-info">
            <h2>Collaborative Whiteboard</h2>
            <p>Engage in collaborative visual discussions.</p>
            <button className="action-button">Go to Whiteboard</button>
          </div>
        </div>

        {/* Online Meetings section */}
        <div className="dashboard-item" onClick={goToOnlineMeetings}>
          <BsFillCameraVideoFill className="icon" />
          <div className="item-info">
            <h2>Online Meetings</h2>
            <p>Host or join virtual meetings with your team.</p>
            <button className="action-button">Join Meetings</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRDashboard;
