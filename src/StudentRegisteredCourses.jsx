import React, { useState } from 'react';
import './StudentRegisteredCourses.css'; // CSS file for styling

const RegisteredCourses = () => {
  // Example data for registered courses
  const registeredCourses = [
    { id: 1, title: 'Math 101', credits: 3, icon: '📘' },
    { id: 2, title: 'History 202', credits: 4, icon: '📚' },
    { id: 3, title: 'CS 315', credits: 3, icon: '💻' },
  ];

  // Calculate the total payment based on credits
  const calculateTotalPayment = () => {
    return registeredCourses.reduce((total, course) => {
      if (course.credits === 3) {
        return total + 300;
      } else if (course.credits === 4) {
        return total + 400;
      }
      return total;
    }, 0);
  };

  const totalPayment = calculateTotalPayment(); // Calculate total payment

  // Dummy function to handle payment
  const handlePayment = () => {
    alert(`You have successfully paid $${totalPayment}`);
  };

  return (
    <div className="student-registered-courses-container">
      <h1 className="page-title">Your Registered Courses</h1>
      
      <div className="courses-list">
        {registeredCourses.map((course) => (
          <div key={course.id} className="course-item">
            <span className="course-icon">{course.icon}</span> {/* Course icon */}
            <h3>{course.title}</h3>
            <p>Credits: {course.credits}</p>
            <p>Price: ${course.credits === 3 ? '300' : '400'}</p>
          </div>
        ))}
      </div>

      {/* Total Payment Section */}
      <div className="total-payment">
        <h2>Total Payment: ${totalPayment}</h2>
        <button className="pay-now-btn" onClick={handlePayment}>Complete Payment</button>
      </div>
    </div>
  );
};

export default RegisteredCourses;
