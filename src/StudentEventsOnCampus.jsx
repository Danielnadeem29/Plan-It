import React, { useContext } from "react";
import { StudentEventContext } from "./StudentEventContext.jsx";
import "./StudentEventsOnCampus.css";

const StudentEventsOnCampus = () => {
  const { events } = useContext(StudentEventContext); // Access context

  return (
    <div className="events-on-campus">
      <h1>Events on Campus</h1>
      {events.length > 0 ? (
        <div className="event-list">
          {events.map((event, index) => (
            <div key={index} className="event-item">
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
          ))}
        </div>
      ) : (
        <p className="no-events">No upcoming events.</p>
      )}
    </div>
  );
};

export default StudentEventsOnCampus;
