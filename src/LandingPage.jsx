import React, { useEffect } from 'react';
import './LandingPage.css'; // Import landing page CSS
import { useNavigate } from 'react-router-dom';
import { FaUserGraduate, FaUserTie, FaLightbulb } from 'react-icons/fa'; // Import icons for sections

function LandingPage() {
  const navigate = useNavigate();

  // Function to handle student login button click
  const handleStudentLogin = () => {
    navigate('/login'); // Navigate to the student login page
  };

  // Function to handle staff login button click
  const handleStaffLogin = () => {
    navigate('/staff-login'); // Navigate to the staff login page
  };

  // Custom smooth scroll function with slower speed and offset
  const scrollToAbout = () => {
    const target = document.getElementById('about-section');
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 50; // Offset by 50px
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000; // Duration in milliseconds (1 second)
    let start = null;

    // Custom animation function
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const scroll = easeInOutQuad(progress, startPosition, distance, duration);
      window.scrollTo(0, scroll);
      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    };

    // Easing function for smooth scrolling
    const easeInOutQuad = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    window.requestAnimationFrame(step);
  };

  // Scroll-triggered animations
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.scroll-section');
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight * 0.8) {
          section.classList.add('visible'); // Add 'visible' class when in view
        } else {
          section.classList.remove('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="landing-page">
      {/* Header Section with Logo */}
      <header className="header">
        <img src="../src/assets/logo.png" alt="Plan-it Logo" className="logo" />
        <h1>Welcome to Plan-it</h1>
        <p style={{ margin: '0', textAlign: 'center' }}>Your solution for seamless course management and timely enrollment.</p>
        <a href="#about-section" className="scroll-down" onClick={scrollToAbout}>Learn More</a>
      </header>

      {/* Project Features Section */}
      <section id="about-section" className="scroll-section features">
        {/* About Plan-it */}
        <div className="feature-card">
          <FaLightbulb className="feature-icon" /> {/* Icon for About Plan-it */}
          <h2>About Plan-it</h2>
          <p>
            Plan-it is a software designed to help students enroll in courses on time, manage their schedules, and stay on top of their academic progress. Our intuitive platform ensures that both students and faculty have access to all the tools they need for a seamless academic experience.
          </p>
        </div>

        {/* Student Features */}
        <div className="feature-card">
          <FaUserGraduate className="feature-icon" /> {/* Icon for Student Features */}
          <h2>Student Features</h2>
          <p>
            Students can view their course schedules, add/drop classes, and get reminders about important deadlines. Plan-it keeps students informed and ensures they don’t miss any key dates.
          </p>
        </div>

        {/* Faculty Features */}
        <div className="feature-card">
          <FaUserTie className="feature-icon" /> {/* Icon for Faculty Features */}
          <h2>Faculty Features</h2>
          <p>
            Faculty members can manage class enrollments, track student progress, and communicate with students directly. Plan-it helps faculty ensure smooth administration of their courses.
          </p>
        </div>
      </section>

      {/* Login Section */}
      <section className="login-section">
        <div className="login-container">
          {/* Student Login */}
          <div className="Student-login">
            <FaUserGraduate className="icon" />
            <h2>Student Portal</h2>
            <p>Access your courses and schedule.</p>
            <button className="action-button" onClick={handleStudentLogin}>Login as Student</button>
          </div>

          {/* Faculty Login */}
          <div className="HR-login">
            <FaUserTie className="icon" />
            <h2>Faculty Portal</h2>
            <p>Manage courses and students efficiently.</p>
            <button className="action-button" onClick={handleStaffLogin}>Login as Faculty</button>
          </div>
        </div>
      </section>

      <footer>
        <p>&copy; 2024 Plan-it. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
