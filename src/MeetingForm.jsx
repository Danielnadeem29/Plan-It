import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HostMeetingForm = () => {
  const [meetingId, setMeetingId] = useState("");
  const [password, setPassword] = useState("");
  const [hostName, setHostName] = useState("");
  const navigate = useNavigate();

  const generateMeeting = () => {
    if (!hostName) {
      alert("Please enter your name.");
      return;
    }

    // Generate unique Meeting ID and Password
    const generatedMeetingId = Math.random().toString(36).substr(2, 9);
    const generatedPassword = Math.random().toString(36).substr(2, 6);

    setMeetingId(generatedMeetingId);
    setPassword(generatedPassword);

    // Save meeting details for sharing
    // Here, you can save to Firebase or backend if required
    console.log("Meeting Created:", { meetingId: generatedMeetingId, password: generatedPassword });
  };

  const startMeeting = () => {
    if (meetingId && password) {
      navigate(`/online-meeting?roomId=${meetingId}&host=true`);
    } else {
      alert("Please create a meeting first.");
    }
  };

  return (
    <div>
      <h1>Host an Online Meeting</h1>
      <input
        type="text"
        placeholder="Enter Your Name"
        value={hostName}
        onChange={(e) => setHostName(e.target.value)}
      />
      <button onClick={generateMeeting}>Create Meeting</button>
      {meetingId && password && (
        <div>
          <p>Meeting ID: {meetingId}</p>
          <p>Password: {password}</p>
          <button onClick={startMeeting}>Start Meeting</button>
        </div>
      )}
    </div>
  );
};

export default HostMeetingForm;
