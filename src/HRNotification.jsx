import React, { useState } from 'react';
import './HRNotification.css';

const HRNotification = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'John Doe scheduled a meeting with you.', date: '2024-10-20', student: 'John Doe', read: false },
    { id: 2, message: 'Jane Smith sent a message regarding course registration.', date: '2024-10-18', student: 'Jane Smith', read: false },
    { id: 3, message: 'Mark Johnson has dropped a course.', date: '2024-10-17', student: 'Mark Johnson', read: false },
    { id: 4, message: 'Emma Wilson requested an advising session.', date: '2024-10-16', student: 'Emma Wilson', read: false },
    { id: 5, message: 'Olivia Taylor is asking about her grades.', date: '2024-10-15', student: 'Olivia Taylor', read: false },
  ]);

  const [replyingTo, setReplyingTo] = useState(null); // Track the notification being replied to
  const [replyMessage, setReplyMessage] = useState(''); // Track the reply message

  // Handle toggling the "Read" status
  const toggleRead = (id) => {
    setNotifications(
      notifications.map(notif => notif.id === id ? { ...notif, read: !notif.read } : notif)
    );
  };

  // Handle the "Reply" button click
  const handleReply = (notification) => {
    setReplyingTo(notification); // Set the notification to reply to
  };

  // Handle the reply form submission
  const handleSendReply = (e) => {
    e.preventDefault();
    if (replyMessage.trim()) {
      console.log(`Message sent to ${replyingTo.student}: ${replyMessage}`);
      setReplyingTo(null); // Close the reply form after sending
      setReplyMessage(''); // Reset the reply message
    }
  };

  // Handle the "Delete" button click
  const handleDelete = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id)); // Remove the notification
  };

  return (
    <div className="hr-notification">
      <h1>HR Notification Center</h1>

      <div className="notification-list">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              className={`notification-card ${notification.read ? 'read' : ''}`}
              key={notification.id}
            >
              <div className="notification-content">
                <p>{notification.message}</p>
                <span className="notification-date">{notification.date}</span>
              </div>
              <div className="notification-actions">
                <button
                  onClick={() => toggleRead(notification.id)}
                  className="action-button"
                >
                  {notification.read ? 'Unread' : 'Read'}
                </button>
                <button onClick={() => handleReply(notification)} className="action-button">Reply</button>
                <button onClick={() => handleDelete(notification.id)} className="action-button delete-button">Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No notifications found.</p>
        )}
      </div>

      {/* Reply form - shows up if a notification is being replied to */}
      {replyingTo && (
        <div className="reply-form">
          <h2>Reply to {replyingTo.student}</h2>
          <form onSubmit={handleSendReply}>
            <textarea
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              placeholder="Write your message here..."
            />
            <button type="submit" className="action-button">Send Message</button>
            <button type="button" className="action-button cancel-button" onClick={() => setReplyingTo(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default HRNotification;
