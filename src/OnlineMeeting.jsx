import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./OnlineMeeting.css";

const OnlineMeeting = () => {
  const [userName, setUserName] = useState("");
  const [meetingId, setMeetingId] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const roomIdFromUrl = searchParams.get("roomId");
  const isHost = searchParams.get("host") === "true";

  useEffect(() => {
    // Automatically load the meeting if a roomId is passed in the URL
    if (roomIdFromUrl) {
      const domain = "meet.jit.si";
      const options = {
        roomName: roomIdFromUrl,
        width: "100%",
        height: 600,
        parentNode: document.getElementById("jitsi-container"),
        userInfo: {
          displayName: userName || (isHost ? "Host" : "Participant"),
        },
      };

      const api = new window.JitsiMeetExternalAPI(domain, options);

      return () => {
        api.dispose();
      };
    }
  }, [roomIdFromUrl, userName, isHost]);

  const handleCreateMeeting = () => {
    if (!userName) {
      alert("Please enter your name.");
      return;
    }

    const generatedMeetingId = Math.random().toString(36).substr(2, 9);
    navigate(`/online-meeting?roomId=${generatedMeetingId}&host=true`);
  };

  const handleJoinMeeting = () => {
    if (!userName || !meetingId) {
      alert("Please enter both your name and a valid Meeting ID.");
      return;
    }

    navigate(`/online-meeting?roomId=${meetingId}`);
  };

  return (
    <div className="online-meeting-container">
      {!roomIdFromUrl ? (
        <div className="join-create-container">
          <h1>Online Meeting Interface</h1>
          <div className="form-section">
            <input
              type="text"
              placeholder="Enter Your Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="input-field"
            />
            {isCreating ? (
              <>
                <button className="action-button" onClick={handleCreateMeeting}>
                  Create Meeting
                </button>
                <button
                  className="secondary-button"
                  onClick={() => setIsCreating(false)}
                >
                  Back to Options
                </button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Enter Meeting ID"
                  value={meetingId}
                  onChange={(e) => setMeetingId(e.target.value)}
                  className="input-field"
                />
                <button className="action-button" onClick={handleJoinMeeting}>
                  Join Meeting
                </button>
                <button
                  className="secondary-button"
                  onClick={() => setIsCreating(true)}
                >
                  Create a Meeting as Host
                </button>
              </>
            )}
          </div>
        </div>
      ) : (
        <div id="jitsi-container" style={{ width: "100%", height: "600px" }} />
      )}
    </div>
  );
};

export default OnlineMeeting;
