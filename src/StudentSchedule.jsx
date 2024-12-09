import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./StudentSchedule.css";

const localizer = momentLocalizer(moment);

// Expanded dummy course data
const dummyCourses = [
  {
    courseCode: "CS101",
    courseName: "Introduction to Computer Science",
    professor: "Dr. Smith",
    days: ["Mon", "Wed"],
    startTime: moment("08:00", "HH:mm"),
    endTime: moment("09:30", "HH:mm"),
    duration: 1.5,
  },
  {
    courseCode: "MATH202",
    courseName: "Calculus II",
    professor: "Dr. Johnson",
    days: ["Tue", "Thu"],
    startTime: moment("10:00", "HH:mm"),
    endTime: moment("11:30", "HH:mm"),
    duration: 1.5,
  },
  {
    courseCode: "ENG303",
    courseName: "English Literature",
    professor: "Prof. Brown",
    days: ["Mon", "Wed"],
    startTime: moment("12:00", "HH:mm"),
    endTime: moment("13:30", "HH:mm"),
    duration: 1.5,
  },
  {
    courseCode: "HIST204",
    courseName: "World History",
    professor: "Dr. White",
    days: ["Tue", "Thu"],
    startTime: moment("14:00", "HH:mm"),
    endTime: moment("15:30", "HH:mm"),
    duration: 1.5,
  },
  {
    courseCode: "PHY101",
    courseName: "Physics I",
    professor: "Dr. Adams",
    days: ["Mon", "Wed"],
    startTime: moment("16:00", "HH:mm"),
    endTime: moment("17:30", "HH:mm"),
    duration: 1.5,
  },
  {
    courseCode: "CHEM110",
    courseName: "General Chemistry",
    professor: "Dr. Green",
    days: ["Fri"],
    startTime: moment("10:00", "HH:mm"),
    endTime: moment("12:00", "HH:mm"),
    duration: 2,
  },
];

const StudentSchedule = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDay, setFilterDay] = useState("");
  const [filterProfessor, setFilterProfessor] = useState("");

  const filteredCourses = dummyCourses
    .filter((course) =>
      course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((course) => (filterDay ? course.days.includes(filterDay) : true))
    .filter((course) =>
      filterProfessor
        ? course.professor.toLowerCase().includes(filterProfessor.toLowerCase())
        : true
    );

  const enrollInCourse = (course) => {
    if (!enrolledCourses.some((enrolled) => enrolled.courseCode === course.courseCode)) {
      setEnrolledCourses((prev) => [...prev, course]);
    }
  };

  const removeFromSchedule = (courseCode) => {
    setEnrolledCourses((prev) => prev.filter((course) => course.courseCode !== courseCode));
  };

  const calendarEvents = enrolledCourses.flatMap((course) => {
    const events = [];
    course.days.forEach((day) => {
      const eventStart = moment().day(day).set({
        hour: course.startTime.hour(),
        minute: course.startTime.minute(),
      });
      const eventEnd = eventStart.clone().add(course.duration, "hours");
      events.push({
        title: course.courseName,
        start: eventStart.toDate(),
        end: eventEnd.toDate(),
      });
    });
    return events;
  });

  return (
    <div className="schedule-container">
      <header className="header">
        <h1 className="heading">Student Class Scheduler</h1>
      </header>

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

      <div className="course-list-container">
        <h2 className="sub-heading">Available Courses</h2>
        <ul className="course-list">
          {filteredCourses.map((course) => (
            <li key={course.courseCode} className="course-item">
              <h3 className="course-name">{course.courseName}</h3>
              <p className="course-info">Professor: {course.professor}</p>
              <button className="add-btn" onClick={() => enrollInCourse(course)}>
                Enroll
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="schedule-list-container">
        <h2 className="sub-heading">My Added Classes</h2>
        <ul className="course-list">
          {enrolledCourses.map((course) => (
            <li key={course.courseCode} className="course-item">
              <h3 className="course-name">{course.courseName}</h3>
              <p className="course-info">Professor: {course.professor}</p>
              <button
                className="remove-btn"
                onClick={() => removeFromSchedule(course.courseCode)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="calendar-container">
        <h2 className="sub-heading">Schedule Calendar</h2>
        <Calendar
          localizer={localizer}
          events={calendarEvents}
          startAccessor="start"
          endAccessor="end"
          defaultView="week"
          style={{ height: 500 }}
        />
      </div>
    </div>
  );
};

export default StudentSchedule;
