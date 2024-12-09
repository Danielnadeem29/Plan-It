import React, { createContext, useState, useEffect } from "react";

// Create Context
export const StudentEventContext = createContext();

// Provider Component
export const StudentEventProvider = ({ children }) => {
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem("events");
    return savedEvents ? JSON.parse(savedEvents) : [];
  });

  // Function to add events
  const addEvent = (event) => {
    setEvents((prevEvents) => {
      const updatedEvents = [...prevEvents, event];
      localStorage.setItem("events", JSON.stringify(updatedEvents)); // Save to local storage
      return updatedEvents;
    });
  };

  // Function to update an existing event
  const updateEvent = (index, updatedEvent) => {
    setEvents((prevEvents) => {
      const newEvents = [...prevEvents];
      newEvents[index] = updatedEvent;
      localStorage.setItem("events", JSON.stringify(newEvents)); // Save updated events
      return newEvents;
    });
  };

  // Function to remove an event
  const removeEvent = (index) => {
    setEvents((prevEvents) => {
      const newEvents = prevEvents.filter((_, i) => i !== index);
      localStorage.setItem("events", JSON.stringify(newEvents)); // Save updated events
      return newEvents;
    });
  };

  // Log events for debugging
  useEffect(() => {
    console.log("Current events:", events);
  }, [events]);

  return (
    <StudentEventContext.Provider value={{ events, addEvent, updateEvent, removeEvent }}>
      {children}
    </StudentEventContext.Provider>
  );
};
