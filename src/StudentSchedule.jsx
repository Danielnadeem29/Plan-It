import React, { useContext, useState } from "react";
import { CourseContext } from "./CourseContext";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./StudentSchedule.css";

const localizer = momentLocalizer(moment);

const StudentSchedule = () => {
  const { courses } = useContext(CourseContext);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDay, setFilterDay] = useState("");
  const [filterProfessor, setFilterProfessor] = useState("");
  const [notification, setNotification] = useState(null);

  // Check for conflicts
  const hasConflict = (newCourse) => {
    return enrolledCourses.some((course) =>
      course.days.some((day) =>
        newCourse.days.includes(day) &&
        (
          newCourse.startTime.isBetween(course.startTime, course.endTime, null, "[)") ||
          newCourse.endTime.isBetween(course.startTime, course.endTime, null, "[)") ||
          course.startTime.isBetween(newCourse.startTime, newCourse.endTime, null, "[)") ||
          course.endTime.isBetween(newCourse.startTime, newCourse.endTime, null, "[)")
        )
      )
    );
  };

  // Add a course to the schedule
  const enrollInCourse = (course) => {
    if (hasConflict(course)) {
      setNotification({ type: "error", message: "Schedule conflict detected!" });
      return;
    }
    if (!enrolledCourses.some((enrolled) => enrolled.courseCode === course.courseCode)) {
      setEnrolledCourses((prev) => [...prev, course]);
      setNotification({ type: "success", message: `${course.courseName} added successfully!` });
    } else {
      setNotification({ type: "error", message: `${course.courseName} is already in your schedule!` });
    }
  };

  // Remove a course
  const removeFromSchedule = (courseCode) => {
    setEnrolledCourses((prev) => prev.filter((course) => course.courseCode !== courseCode));
    setNotification({ type: "success", message: "Course removed successfully!" });
  };

  // Filter courses
  const filteredCourses = courses
    .filter((course) => course.courseName.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((course) => (filterDay ? course.days.includes(filterDay) : true))
    .filter((course) => (filterProfessor ? course.professor.toLowerCase().includes(filterProfessor.toLowerCase()) : true));

  // Generate events for the calendar
  const generateWeeklyEvents = (course) => {
    const semesterStart = moment(new Date(2024, 7, 20));
    const semesterEnd = moment(new Date(2024, 11, 16));
    const events = [];

    course.days.forEach((day) => {
      let currentDay = semesterStart.clone().day(day);

      while (currentDay.isBefore(semesterEnd)) {
        const eventStart = currentDay.clone().set({
          hour: course.startTime.hour(),
          minute: course.startTime.minute(),
        });
        const eventEnd = eventStart.clone().add(course.duration, "hours");

        events.push({
          title: `${course.courseName} (${course.courseCode})`,
          start: eventStart.toDate(),
          end: eventEnd.toDate(),
        });
        currentDay.add(1, "week");
      }
    });

    return events;
  };

  const calendarEvents = enrolledCourses.flatMap(generateWeeklyEvents);

  return (
    <div className="schedule-container">
      <h1 className="heading">My Class Schedule</h1>

      {/* Notifications */}
      {notification && (
        <div className={`notification ${notification.type}`}>
          <p>{notification.message}</p>
          <button onClick={() => setNotification(null)}>Close</button>
        </div>
      )}

      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search by course name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={filterDay} onChange={(e) => setFilterDay(e.target.value)}>
          <option value="">All Days</option>
          <option value="Mon">Monday</option>
          <option value="Tue">Tuesday</option>
          <option value="Wed">Wednesday</option>
          <option value="Thu">Thursday</option>
          <option value="Fri">Friday</option>
        </select>
        <input
          type="text"
          placeholder="Filter by professor..."
          value={filterProfessor}
          onChange={(e) => setFilterProfessor(e.target.value)}
        />
      </div>

      {/* Available Courses */}
      <div className="course-list-container">
        <h2>Available Courses</h2>
        <ul className="course-list">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <li key={course.courseCode} className="course-item">
                <h3>{course.courseName} ({course.courseCode})</h3>
                <p>Professor: {course.professor}</p>
                <button className="add-btn" onClick={() => enrollInCourse(course)}>
                  Enroll
                </button>
              </li>
            ))
          ) : (
            <p>No courses available.</p>
          )}
        </ul>
      </div>

      {/* Enrolled Courses */}
      <div className="schedule-list-container">
        <h2>My Added Classes</h2>
        <ul className="course-list">
          {enrolledCourses.length > 0 ? (
            enrolledCourses.map((course) => (
              <li key={course.courseCode} className="course-item">
                <h3>{course.courseName} ({course.courseCode})</h3>
                <p>Professor: {course.professor}</p>
                <button className="remove-btn" onClick={() => removeFromSchedule(course.courseCode)}>
                  Remove
                </button>
              </li>
            ))
          ) : (
            <p>No courses added.</p>
          )}
        </ul>
      </div>

      {/* Calendar */}
      <div className="calendar-container">
        <Calendar
          localizer={localizer}
          events={calendarEvents}
          startAccessor="start"
          endAccessor="end"
          defaultView="month"
          views={["month", "week"]}
          step={30}
          timeslots={2}
          style={{ height: 500 }}
        />
      </div>
    </div>
  );
};

export default StudentSchedule;
