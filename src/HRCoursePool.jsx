import React, { useState, useContext } from 'react';
import './HRCoursePool.css';
import { CourseContext } from './CourseContext'; // Import the context
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Icons for edit and remove
import moment from 'moment'; // Added moment for time formatting

const predefinedProfessors = [
  'Dr. Smith', 'Prof. Johnson', 'Dr. Brown', 'Prof. Lee', 'Dr. Miller',
  'Prof. Davis', 'Dr. Garcia', 'Prof. Wilson', 'Dr. Anderson', 'Prof. Martinez',
  'Dr. Taylor', 'Prof. Thomas', 'Dr. Hernandez', 'Prof. Moore', 'Dr. Martin',
  'Prof. Jackson', 'Dr. White', 'Prof. Harris', 'Dr. Lewis', 'Prof. Clark'
];

const HRCoursePool = () => {
  const { courses, addCourse, removeCourse } = useContext(CourseContext);
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [credits, setCredits] = useState('');
  const [days, setDays] = useState('');
  const [professor, setProfessor] = useState('');
  const [editingCourse, setEditingCourse] = useState(null);

  const handleAddCourse = (e) => {
    e.preventDefault();
    if (courseName && courseCode && credits && days && professor) {
      const newCourse = {
        courseName,
        courseCode,
        credits,
        days: days.split('-'),
        professor,
        startTime: moment('09:00 AM', 'h:mm A'), // Example start time
        endTime: moment('10:30 AM', 'h:mm A'),  // Example end time
        duration: 1.5,
      };
      addCourse(newCourse);
      resetForm();
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleEditCourse = (course) => {
    setCourseName(course.courseName);
    setCourseCode(course.courseCode);
    setCredits(course.credits);
    setDays(course.days.join('-'));
    setProfessor(course.professor);
    setEditingCourse(course);
  };

  const handleUpdateCourse = (e) => {
    e.preventDefault();
    if (courseName && credits && days && professor) {
      const updatedCourse = { ...editingCourse, courseName, credits, days, professor };
      removeCourse(editingCourse.courseCode);
      addCourse(updatedCourse);
      resetForm();
      setEditingCourse(null);
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleRemoveCourse = (courseCode) => {
    removeCourse(courseCode);
  };

  const resetForm = () => {
    setCourseName('');
    setCourseCode('');
    setCredits('');
    setDays('');
    setProfessor('');
    setEditingCourse(null);
  };

  const handleProfessorChange = (e) => {
    setProfessor(e.target.value);
  };

  return (
    <div className="hr-course-pool">
      <h1>Course Pool</h1>

      {/* Form to Add or Edit Course */}
      <form onSubmit={editingCourse ? handleUpdateCourse : handleAddCourse} className="add-course-form">
        <input
          type="text"
          placeholder="Course Name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Course Code"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
          required
          disabled={!!editingCourse}
        />
        <input
          type="number"
          placeholder="Credits"
          value={credits}
          onChange={(e) => setCredits(e.target.value)}
          required
        />
        
        {/* Days Dropdown */}
        <select value={days} onChange={(e) => setDays(e.target.value)} required>
          <option value="">Select Days</option>
          <option value="Mon-Wed">Mon-Wed</option>
          <option value="Tues-Thurs">Tues-Thurs</option>
        </select>

        {/* Professor Dropdown */}
        <select value={professor} onChange={handleProfessorChange} required>
          <option value="">Select Professor</option>
          {predefinedProfessors.map((prof, index) => (
            <option key={index} value={prof}>{prof}</option>
          ))}
        </select>

        <button type="submit" className="add-course-button">
          {editingCourse ? 'Update Course' : 'Add Course'}
        </button>
        {editingCourse && <button onClick={resetForm} className="cancel-button">Cancel</button>}
      </form>

      {/* Display Courses */}
      <div className="course-list">
        <h2>Available Courses</h2>
        {courses.length > 0 ? (
          <ul>
            {courses.map((course, index) => (
              <li key={index} className="course-item">
                <span>{course.courseName} ({course.courseCode}) - {course.credits} credits - {course.days.join(', ')} - {course.professor}</span>
                <div>
                  <button className="edit-btn" onClick={() => handleEditCourse(course)}>
                    <FaEdit /> Edit
                  </button>
                  <button className="remove-btn" onClick={() => handleRemoveCourse(course.courseCode)}>
                    <FaTrashAlt /> Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No courses available.</p>
        )}
      </div>
    </div>
  );
};

export default HRCoursePool;
