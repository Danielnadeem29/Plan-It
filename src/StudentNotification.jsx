import React, { useState } from 'react';
import './StudentNotification.css';

const StudentNotification = () => {
  // Initial notifications (fake messages)
  const initialNotifications = [
    { id: 1, message: 'Schedule a meeting with your advisor', read: false, archived: false, tag: 'advising' },
    { id: 2, message: 'Course registration opens tomorrow', read: false, archived: false, tag: 'registration' },
    { id: 3, message: 'New spot opened up in Math 101', read: false, archived: false, tag: 'course' },
    { id: 4, message: 'Reminder: Financial aid deadline is approaching', read: false, archived: false, tag: 'financial' },
    { id: 5, message: 'Midterm exams start next week', read: false, archived: false, tag: 'exams' },
    { id: 6, message: 'Join the computer science club!', read: false, archived: false, tag: 'clubs' },
    { id: 7, message: 'Your lab assignment has been graded', read: false, archived: false, tag: 'grades' },
  ];

  const [notifications, setNotifications] = useState(initialNotifications);
  const [showArchived, setShowArchived] = useState(false);
  const [filterTag, setFilterTag] = useState('');

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

  // Function to archive a notification
  const archiveNotification = (id) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, archived: true } : notification
    ));
  };

  // Function to filter notifications based on tag
  const filterNotifications = (notification) => {
    return (
      (showArchived ? notification.archived : !notification.archived) &&
      (filterTag ? notification.tag === filterTag : true)
    );
  };

  return (
    <div className="notification-page">
      <h1>Notifications</h1>

      {/* Filter and Tagging Options */}
      <div className="filter-options">
        <button onClick={() => setShowArchived(!showArchived)}>
          {showArchived ? 'Show Active' : 'Show Archived'}
        </button>
        <select
          value={filterTag}
          onChange={(e) => setFilterTag(e.target.value)}
        >
          <option value="">All Tags</option>
          <option value="advising">Advising</option>
          <option value="registration">Registration</option>
          <option value="course">Course</option>
          <option value="financial">Financial</option>
          <option value="exams">Exams</option>
          <option value="clubs">Clubs</option>
          <option value="grades">Grades</option>
        </select>
      </div>

      {/* Notification List */}
      <div className="notification-list">
        {notifications.filter(filterNotifications).length === 0 ? (
          <p>No notifications found</p>
        ) : (
          notifications.filter(filterNotifications).map(notification => (
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
                  className="archive-btn"
                  onClick={() => archiveNotification(notification.id)}
                >
                  Archive
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteNotification(notification.id)}
                >
                  Delete
                </button>
              </div>
              <small className="notification-tag">Tag: {notification.tag}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StudentNotification;
