import React, { useContext, useState } from 'react';
import { CourseContext } from './CourseContext';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './StudentSchedule.css';

const localizer = momentLocalizer(moment);

const StudentSchedule = () => {
  const { courses } = useContext(CourseContext); // Access courses from the global context
  const [enrolledCourses, setEnrolledCourses] = useState([]); // Local state for enrolled courses
  const [searchTerm, setSearchTerm] = useState(''); // State to hold the search input

  // Function to add a course to the enrolled list
  const enrollInCourse = (course) => {
    if (!enrolledCourses.some((enrolled) => enrolled.courseCode === course.courseCode)) {
      setEnrolledCourses((prevCourses) => [...prevCourses, course]); // Add course to enrolledCourses
    } else {
      alert(`${course.courseName} is already in your schedule!`);
    }
  };

  // Function to remove a course from the enrolled list
  const removeFromSchedule = (courseCode) => {
    setEnrolledCourses((prevCourses) => prevCourses.filter((course) => course.courseCode !== courseCode));
  };

  // Filter courses based on the search term (search functionality)
  const filteredCourses = courses.filter((course) =>
    course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to generate events for the entire semester
  const generateWeeklyEvents = (course) => {
    const semesterStart = moment(new Date(2024, 7, 20)); // August 20, 2024
    const semesterEnd = moment(new Date(2024, 11, 16)); // December 16, 2024
    const events = [];

    // Loop through each day the course is held
    course.days.forEach((day) => {
      let currentDay = semesterStart.clone().day(day); // Get the first occurrence of that day

      while (currentDay.isBefore(semesterEnd)) {
        const eventStart = currentDay.clone().set({
          hour: course.startTime.hour(),
          minute: course.startTime.minute(),
        });
        const eventEnd = eventStart.clone().add(course.duration, 'hours');

        events.push({
          title: `${course.courseName} (${course.courseCode})\nProfessor: ${course.professor}`, // Include professor's name
          start: eventStart.toDate(),
          end: eventEnd.toDate(),
        });

        currentDay.add(1, 'week'); // Move to the same day in the next week
      }
    });

    return events;
  };

  // Generate calendar events for all enrolled courses
  const calendarEvents = enrolledCourses.flatMap(generateWeeklyEvents);

  return (
    <div className="schedule-container">
      <h1 className="heading">My Class Schedule</h1>

      {/* Search Bar for Courses */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a class..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Available Courses */}
      <div className="course-list-container">
        <h2>Available Courses</h2>
        <ul className="course-list">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <li key={course.courseCode} className="course-item">
                <div className="course-details">
                  <h3>{course.courseName} ({course.courseCode})</h3>
                  <p>Credits: {course.credits}</p>
                  <p>Days: {course.days.join(', ')}</p>
                  <p>Time: {course.startTime.format('h:mm A')} - {course.endTime.format('h:mm A')}</p>
                  <p>Professor: {course.professor}</p> {/* Show professor's name */}
                  <button className="add-btn" onClick={() => enrollInCourse(course)}>Enroll</button>
                </div>
              </li>
            ))
          ) : (
            <p>No courses available for enrollment.</p>
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
                <div className="course-details">
                  <h3>{course.courseName} ({course.courseCode})</h3>
                  <p>Credits: {course.credits}</p>
                  <p>Days: {course.days.join(', ')}</p>
                  <p>Time: {course.startTime.format('h:mm A')} - {course.endTime.format('h:mm A')}</p>
                  <p>Professor: {course.professor}</p> {/* Show professor's name */}
                  <button className="remove-btn" onClick={() => removeFromSchedule(course.courseCode)}>Remove</button>
                </div>
              </li>
            ))
          ) : (
            <p>No courses added to your schedule yet.</p>
          )}
        </ul>
      </div>

      {/* Calendar Display */}
      <div className="calendar-container">
        <Calendar
          localizer={localizer}
          events={calendarEvents} // Display generated events
          startAccessor="start"
          endAccessor="end"
          defaultView="month"
          views={['month', 'work_week']}
          step={30}
          timeslots={2}
          min={new Date(2024, 7, 20, 8, 0)} // Semester start time
          max={new Date(2024, 7, 20, 18, 0)} // Semester end time
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: '#3174ad',
              color: 'white',
            },
          })}
        />
      </div>
    </div>
  );
};

export default StudentSchedule;
