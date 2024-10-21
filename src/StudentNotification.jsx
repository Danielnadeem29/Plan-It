import React, { useState } from 'react';
import './StudentNotification.css';

const StudentNotification = () => {
  // Initial notifications (fake messages)
    const initialNotifications = [
    { id: 1, message: 'Schedule a meeting with your advisor' },
    { id: 2, message: 'Course registration opens tomorrow' },
    { id: 3, message: 'New spot opened up in Math 101' },
    { id: 4, message: 'Reminder: Financial aid deadline is approaching' },
    { id: 5, message: 'Midterm exams start next week' },
    { id: 6, message: 'Join the computer science club!' },
    { id: 7, message: 'Your lab assignment has been graded' }
];

  const [notifications, setNotifications] = useState(initialNotifications);

  // Function to handle deleting a notification
  const deleteNotification = (id) => {
    const updatedNotifications = notifications.filter(notification => notification.id !== id);
    setNotifications(updatedNotifications);
  };

  // Function to handle replying to a notification (for demo purposes, this just alerts a message)
  const replyNotification = (message) => {
    alert(`Replying to: ${message}`);
  };

  return (
    <div className="notification-page">
      <h1>Notifications</h1>
      <div className="notification-list">
        {notifications.length === 0 ? (
          <p>No new notifications</p>
        ) : (
          notifications.map(notification => (
            <div key={notification.id} className="notification-item">
              <p>{notification.message}</p>
              <div className="notification-actions">
                <button className="reply-btn" onClick={() => replyNotification(notification.message)}>Reply</button>
                <button className="delete-btn" onClick={() => deleteNotification(notification.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StudentNotification;
