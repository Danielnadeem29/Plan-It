import React, { createContext, useState } from 'react';
import moment from 'moment';

// Create the context
export const CourseContext = createContext();

// Create the provider component
export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([
    {
      courseName: 'CSC 315',
      courseCode: 'CSC 315',
      credits: 3,
      days: ['Monday', 'Wednesday'],
      startTime: moment('09:00 AM', 'h:mm A'),
      endTime: moment('10:30 AM', 'h:mm A'),
      duration: 1.5,
    },
    {
      courseName: 'Math 101',
      courseCode: 'MATH101',
      credits: 4,
      days: ['Tuesday', 'Thursday'],
      startTime: moment('11:00 AM', 'h:mm A'),
      endTime: moment('12:30 PM', 'h:mm A'),
      duration: 1.5,
    },
    // Add other predefined courses...
    {
      courseName: 'CSC 126',
      courseCode: 'CSC126',
      credits: 4,
      days: ['Tuesday', 'Thursday'],
      startTime: moment('8:00 AM', 'h:mm A'),
      endTime: moment('10:30 AM', 'h:mm A'),
      duration: 1.5,
    },
  ]);

  // Function to add a new course
  const addCourse = (course) => {
    setCourses((prevCourses) => [...prevCourses, course]);
  };

  // Function to remove a course by its course code
  const removeCourse = (courseCode) => {
    setCourses((prevCourses) => prevCourses.filter((course) => course.courseCode !== courseCode));
  };

  return (
    <CourseContext.Provider value={{ courses, addCourse, removeCourse }}>
      {children}
    </CourseContext.Provider>
  );
};
