import React, { useState, useEffect } from "react";
import "./HRPayroll.css";

const HRPayroll = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [staffList, setStaffList] = useState([]);
  const [filteredStaff, setFilteredStaff] = useState([]);

  // Simulated data for staff (replace with API or database)
  useEffect(() => {
    const mockStaff = [
      { id: 1, name: "John Doe", role: "Student", daysWorked: 18, callouts: 2, hourlyRate: 15, timesheet: [{ date: "2024-12-01", hours: 8 }] },
      { id: 2, name: "Jane Smith", role: "Staff", daysWorked: 20, callouts: 0, hourlyRate: 20, timesheet: [{ date: "2024-12-01", hours: 7 }] },
      { id: 3, name: "Michael Lee", role: "Student", daysWorked: 15, callouts: 1, hourlyRate: 12, timesheet: [{ date: "2024-12-01", hours: 6 }] },
      { id: 4, name: "Sarah Connor", role: "Staff", daysWorked: 22, callouts: 0, hourlyRate: 25, timesheet: [{ date: "2024-12-01", hours: 9 }] },
    ];
    setStaffList(mockStaff);
    setFilteredStaff(mockStaff);
  }, []);

  // Handle search query
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = staffList.filter((staff) =>
      staff.name.toLowerCase().includes(query)
    );
    setFilteredStaff(filtered);
  };

  return (
    <div className="hr-payroll-container">
      <h1>HR Payroll Management</h1>
      <div className="search-section">
        <input
          type="text"
          placeholder="Search by name or ID"
          value={searchQuery}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      <div className="staff-table">
        {filteredStaff.map((staff) => (
          <div key={staff.id} className="staff-card">
            <h2>{staff.name}</h2>
            <p>Role: {staff.role}</p>
            <p>Days Worked: {staff.daysWorked}</p>
            <p>Callouts: {staff.callouts}</p>
            <p>
              Payroll: $
              {(staff.daysWorked * 8 * staff.hourlyRate).toFixed(2)} (Rate: $
              {staff.hourlyRate}/hr)
            </p>
            <h3>Timesheet:</h3>
            <ul>
              {staff.timesheet.map((entry, index) => (
                <li key={index}>
                  {entry.date}: {entry.hours} hours
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HRPayroll;
