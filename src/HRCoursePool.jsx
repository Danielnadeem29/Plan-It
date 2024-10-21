import React, { useState, useContext } from 'react';
import './HRCoursePool.css';
import { CourseContext } from './CourseContext'; // Import the context
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Icons for edit and remove

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
  const [days, setDays] = useState(''); // State for selected days
  const [professor, setProfessor] = useState(''); // State for selected professor
  const [newProfessor, setNewProfessor] = useState(''); // State for adding new professor
  const [editingCourse, setEditingCourse] = useState(null);

  const handleAddCourse = (e) => {
    e.preventDefault();
    if (courseName && courseCode && credits && days && professor) {
      const newCourse = { courseName, courseCode, credits, days, professor };
      addCourse(newCourse); // Add course
      resetForm();
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleEditCourse = (course) => {
    setCourseName(course.courseName);
    setCourseCode(course.courseCode);
    setCredits(course.credits);
    setDays(course.days);
    setProfessor(course.professor); // Set selected professor
    setEditingCourse(course);
  };

  const handleUpdateCourse = (e) => {
    e.preventDefault();
    if (courseName && credits && days && professor) {
      const updatedCourse = { ...editingCourse, courseName, credits, days, professor }; // Update course details
      removeCourse(editingCourse.courseCode); // Remove the old course
      addCourse(updatedCourse); // Add the updated course
      resetForm();
      setEditingCourse(null); // Exit edit mode
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleRemoveCourse = (courseCode) => {
    removeCourse(courseCode); // Remove course
  };

  const resetForm = () => {
    setCourseName('');
    setCourseCode('');
    setCredits('');
    setDays('');
    setProfessor('');
    setNewProfessor(''); // Reset new professor input
    setEditingCourse(null); // Reset form and edit state
  };

  const handleProfessorChange = (e) => {
    setProfessor(e.target.value); // Update selected professor
  };

  const handleNewProfessor = () => {
    if (newProfessor.trim()) {
      predefinedProfessors.push(newProfessor);
      setProfessor(newProfessor); // Set new professor as selected
      setNewProfessor(''); // Clear input
    } else {
      alert('Enter a valid professor name');
    }
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

        {/* Input for adding new professor */}
        <input
          type="text"
          placeholder="Add New Professor"
          value={newProfessor}
          onChange={(e) => setNewProfessor(e.target.value)}
        />
        <button type="button" onClick={handleNewProfessor} className="add-professor-button">
          Add Professor
        </button>

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
                <span>{course.courseName} ({course.courseCode}) - {course.credits} credits - {course.days} - {course.professor}</span>
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
