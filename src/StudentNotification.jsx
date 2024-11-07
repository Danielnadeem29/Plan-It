import React, { useState } from 'react';
import './StudentNotification.css';

const StudentNotification = () => {
  // Initial notifications (fake messages)
  const initialNotifications = [
    { id: 1, message: 'Schedule a meeting with your advisor', read: false },
    { id: 2, message: 'Course registration opens tomorrow', read: false },
    { id: 3, message: 'New spot opened up in Math 101', read: false },
    { id: 4, message: 'Reminder: Financial aid deadline is approaching', read: false },
    { id: 5, message: 'Midterm exams start next week', read: false },
    { id: 6, message: 'Join the computer science club!', read: false },
    { id: 7, message: 'Your lab assignment has been graded', read: false }
  ];

  const [notifications, setNotifications] = useState(initialNotifications);

  // Function to handle deleting a notification
  const deleteNotification = (id) => {
    const updatedNotifications = notifications.filter(notification => notification.id !== id);
    setNotifications(updatedNotifications);
  };

  // Function to toggle read status of a notification
  const toggleReadStatus = (id) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: !notification.read } : notification
    ));
  };

  return (
    <div className="notification-page">
      <h1>Notifications</h1>
      <div className="notification-list">
        {notifications.length === 0 ? (
          <p>No new notifications</p>
        ) : (
          notifications.map(notification => (
            <div 
              key={notification.id} 
              className={`notification-item ${notification.read ? 'read' : ''}`}
            >
              <p>{notification.message}</p>
              <div className="notification-actions">
                <button 
                  className="read-btn" 
                  onClick={() => toggleReadStatus(notification.id)}
                >
                  {notification.read ? 'Mark as Unread' : 'Mark as Read'}
                </button>
                <button 
                  className="delete-btn" 
                  onClick={() => deleteNotification(notification.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StudentNotification;
