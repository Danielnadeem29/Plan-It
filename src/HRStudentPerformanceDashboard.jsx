import React, { useState } from "react";
import "./HRStudentPerformanceDashboard.css";

const dummyStudents = [
  {
    id: 1,
    name: "Alice Johnson",
    grades: { Math: "B", Science: "A", History: "C" },
    attendance: 85,
    participation: "Moderate",
    trend: "Improving",
  },
  {
    id: 2,
    name: "Bob Smith",
    grades: { Math: "C", Science: "B", History: "B" },
    attendance: 92,
    participation: "High",
    trend: "Stable",
  },
  {
    id: 3,
    name: "Charlie Brown",
    grades: { Math: "A", Science: "A", History: "A" },
    attendance: 98,
    participation: "Very High",
    trend: "Improving",
  },
  {
    id: 4,
    name: "Diana Green",
    grades: { Math: "A", Science: "B", History: "C" },
    attendance: 76,
    participation: "Low",
    trend: "Declining",
  },
  {
    id: 5,
    name: "Evan Turner",
    grades: { Math: "B", Science: "C", History: "A" },
    attendance: 88,
    participation: "Moderate",
    trend: "Stable",
  },
];

const calculateAverageGrade = (grades) => {
  const gradeValues = { A: 4, B: 3, C: 2, D: 1, F: 0 };
  const total = Object.values(grades).reduce((acc, grade) => acc + gradeValues[grade], 0);
  return (total / Object.keys(grades).length).toFixed(2);
};

const StudentPerformanceDashboard = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [customMessage, setCustomMessage] = useState("");

  const filteredStudents = dummyStudents.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="performance-dashboard">
      <h1>Student Performance Dashboard</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Search students by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
      </div>

      <div className="student-list">
        <h2>Student List</h2>
        <ul>
          {filteredStudents.map((student) => (
            <li
              key={student.id}
              onClick={() => setSelectedStudent(student)}
              className={selectedStudent?.id === student.id ? "active" : ""}
            >
              {student.name}
            </li>
          ))}
        </ul>
      </div>

      {selectedStudent && (
        <div className="student-details">
          <h2>Performance Metrics: {selectedStudent.name}</h2>
          <div className="metrics-container">
            <div className="metric">
              <h4>Attendance</h4>
              <p>{selectedStudent.attendance}%</p>
            </div>
            <div className="metric">
              <h4>Participation</h4>
              <p>{selectedStudent.participation}</p>
            </div>
            <div className="metric">
              <h4>Trend</h4>
              <p>{selectedStudent.trend}</p>
            </div>
            <div className="metric">
              <h4>Average Grade</h4>
              <p>{calculateAverageGrade(selectedStudent.grades)}</p>
            </div>
          </div>

          <h3>Grades</h3>
          <table className="grades-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(selectedStudent.grades).map(([subject, grade]) => (
                <tr key={subject}>
                  <td>{subject}</td>
                  <td>{grade}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <textarea
            className="notification-message"
            placeholder="Write a custom notification message..."
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
          />
          <button
            className="notification-btn"
            onClick={() => {
              alert(
                `Notification sent to ${selectedStudent.name} with message: "${customMessage}"`
              );
              setCustomMessage("");
            }}
          >
            Send Performance Notification
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentPerformanceDashboard;
