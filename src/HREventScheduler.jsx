import React, { useState, useContext } from "react";
import { StudentEventContext } from "./StudentEventContext.jsx";
import "./HREventScheduler.css";

const HREventScheduler = () => {
  const { events: sharedEvents, addEvent, updateEvent, removeEvent } = useContext(StudentEventContext); // Access context
  const [form, setForm] = useState({ title: "", date: "", time: "", location: "" });
  const [editingIndex, setEditingIndex] = useState(null); // Track the event being edited

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrUpdateEvent = () => {
    if (form.title && form.date && form.time && form.location) {
      if (editingIndex !== null) {
        // Update existing event
        updateEvent(editingIndex, form); // Update in shared context
        setEditingIndex(null);
        alert("Event updated successfully!");
      } else {
        // Add new event
        addEvent(form); // Add to shared context
        alert("Event added successfully!");
      }
      setForm({ title: "", date: "", time: "", location: "" }); // Clear form
    } else {
      alert("Please fill out all fields.");
    }
  };

  const handleEditEvent = (index) => {
    setForm(sharedEvents[index]); // Populate the form with the selected event
    setEditingIndex(index);
  };

  const handleRemoveEvent = (index) => {
    removeEvent(index); // Remove from shared context
    alert("Event removed successfully!");
  };

  return (
    <div className="event-scheduler">
      <h1>HR Event Scheduler</h1>
      <p className="description">Add, edit, or remove events for students and staff.</p>

      {/* Add/Edit Event Form */}
      <div className="event-form">
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={form.title}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleInputChange}
        />
        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Event Location"
          value={form.location}
          onChange={handleInputChange}
        />
        <button onClick={handleAddOrUpdateEvent} className="submit-button">
          {editingIndex !== null ? "Update Event" : "Add Event"}
        </button>
      </div>

      {/* Display Scheduled Events */}
      <div className="event-list">
        <h2>Scheduled Events</h2>
        {sharedEvents.length > 0 ? (
          <ul>
            {sharedEvents.map((event, index) => (
              <li key={index} className="event-item">
                <div>
                  <h3>{event.title}</h3>
                  <p>
                    <strong>Date:</strong> {event.date}
                  </p>
                  <p>
                    <strong>Time:</strong> {event.time}
                  </p>
                  <p>
                    <strong>Location:</strong> {event.location}
                  </p>
                </div>
                <div className="event-actions">
                  <button onClick={() => handleEditEvent(index)} className="edit-button">
                    Edit
                  </button>
                  <button onClick={() => handleRemoveEvent(index)} className="remove-button">
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No events scheduled yet.</p>
        )}
      </div>
    </div>
  );
};

export default HREventScheduler;
