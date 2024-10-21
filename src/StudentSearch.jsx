import React, { useState } from 'react';
import './StudentSearch.css'; // Import CSS for styling

const StudentSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [students, setStudents] = useState([
    // Example data for 20 students
    { id: 1, name: 'John Doe', major: 'Computer Science', courses: ['CSC101', 'CSC226'], semester: 'Fall 2024' },
    { id: 2, name: 'Jane Smith', major: 'Mathematics', courses: ['MATH101', 'CSC101'], semester: 'Spring 2024' },
    { id: 3, name: 'Mark Johnson', major: 'Biology', courses: ['BIO101', 'CHEM102'], semester: 'Fall 2024' },
    { id: 4, name: 'Emma Wilson', major: 'Physics', courses: ['PHY101', 'MATH201'], semester: 'Fall 2024' },
    { id: 5, name: 'Liam Brown', major: 'Chemistry', courses: ['CHEM101', 'BIO101'], semester: 'Spring 2024' },
    { id: 6, name: 'Olivia Taylor', major: 'English', courses: ['ENG101', 'HIST101'], semester: 'Fall 2024' },
    { id: 7, name: 'Sophia Martinez', major: 'Psychology', courses: ['PSY101', 'SOC101'], semester: 'Spring 2024' },
    { id: 8, name: 'Isabella Anderson', major: 'Sociology', courses: ['SOC101', 'ANTH101'], semester: 'Fall 2024' },
    { id: 9, name: 'William Thomas', major: 'Economics', courses: ['ECO101', 'MATH101'], semester: 'Spring 2024' },
    { id: 10, name: 'Mia Garcia', major: 'History', courses: ['HIST101', 'ENG201'], semester: 'Fall 2024' },
    { id: 11, name: 'James Lee', major: 'Computer Science', courses: ['CSC102', 'CSC226'], semester: 'Fall 2024' },
    { id: 12, name: 'Ava Walker', major: 'Mathematics', courses: ['MATH102', 'CSC101'], semester: 'Spring 2024' },
    { id: 13, name: 'Alexander Harris', major: 'Philosophy', courses: ['PHIL101', 'HIST201'], semester: 'Spring 2024' },
    { id: 14, name: 'Charlotte Clark', major: 'Political Science', courses: ['POL101', 'HIST201'], semester: 'Fall 2024' },
    { id: 15, name: 'Benjamin Young', major: 'Business', courses: ['BUS101', 'ECO101'], semester: 'Spring 2024' },
    { id: 16, name: 'Ethan Lewis', major: 'Finance', courses: ['FIN101', 'ACC101'], semester: 'Fall 2024' },
    { id: 17, name: 'Harper King', major: 'Art', courses: ['ART101', 'ENG101'], semester: 'Spring 2024' },
    { id: 18, name: 'Amelia Scott', major: 'Music', courses: ['MUS101', 'ENG101'], semester: 'Fall 2024' },
    { id: 19, name: 'Lucas Perez', major: 'Mechanical Engineering', courses: ['MEC101', 'PHY101'], semester: 'Spring 2024' },
    { id: 20, name: 'Henry Roberts', major: 'Electrical Engineering', courses: ['ELE101', 'PHY101'], semester: 'Fall 2024' },
  ]);
  const [filteredStudents, setFilteredStudents] = useState(students);

  // Function to filter students based on search query and selected major
  const filterStudents = (query, major) => {
    let filtered = students;

    // Apply name search filter if there's a search query
    if (query) {
      filtered = filtered.filter((student) =>
        student.name.toLowerCase().startsWith(query.toLowerCase())
      );
    }

    // Apply major filter if a major is selected
    if (major !== 'all') {
      filtered = filtered.filter((student) => student.major === major);
    }

    setFilteredStudents(filtered); // Update the filtered list of students
  };

  // Handle search input
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterStudents(query, selectedFilter); // Filter students based on both query and major
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    const filter = e.target.value;
    setSelectedFilter(filter);
    filterStudents(searchQuery, filter); // Filter students based on both query and major
  };

  return (
    <div className="student-search">
      <h1>Student Search</h1>
      
      {/* Search and Filter Controls */}
      <div className="search-controls">
        <input
          type="text"
          placeholder="Search by student name"
          value={searchQuery}
          onChange={handleSearch}
        />

        <select value={selectedFilter} onChange={handleFilterChange}>
          <option value="all">All Majors</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Biology">Biology</option>
          <option value="Physics">Physics</option>
          <option value="Chemistry">Chemistry</option>
          <option value="English">English</option>
          <option value="Psychology">Psychology</option>
          <option value="Sociology">Sociology</option>
          <option value="Economics">Economics</option>
          <option value="History">History</option>
          <option value="Philosophy">Philosophy</option>
          <option value="Political Science">Political Science</option>
          <option value="Business">Business</option>
          <option value="Finance">Finance</option>
          <option value="Art">Art</option>
          <option value="Music">Music</option>
          <option value="Mechanical Engineering">Mechanical Engineering</option>
          <option value="Electrical Engineering">Electrical Engineering</option>
          {/* Add more filters based on majors */}
        </select>
      </div>

      {/* Students List */}
      <div className="students-list">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student) => (
            <div className="student-card" key={student.id}>
              <h2>{student.name}</h2>
              <p><strong>Major:</strong> {student.major}</p>
              <p><strong>Courses:</strong> {student.courses.join(', ')}</p>
              <p><strong>Semester:</strong> {student.semester}</p>
              <button>View Profile</button>
            </div>
          ))
        ) : (
          <p>No students found.</p>
        )}
      </div>
    </div>
  );
};

export default StudentSearch;
