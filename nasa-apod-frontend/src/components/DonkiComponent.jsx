import React, { useState, useEffect } from "react";

function DonkiComponent() {
  const [startDate, setStartDate] = useState("2023-01-01");
  const [endDate, setEndDate] = useState("2023-01-31");
  const [type, setType] = useState("all");
  const [donkiData, setDonkiData] = useState(null);

  const fetchDonkiData = async () => {
    try {
      const response = await fetch(
        `/.netlify/functions/donki?startDate=${startDate}&endDate=${endDate}&type=${type}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setDonkiData(data);
    } catch (error) {
      console.error("Error fetching DONKI data:", error);
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchDonkiData();
  }, []); // Fetch data on component mount

  // Helper function to format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="App-section">
      <h2>DONKI Notifications</h2>
      <div>
        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <label>Type:</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="all">All</option>
          <option value="FLR">FLR</option>
          <option value="SEP">SEP</option>
          <option value="CME">CME</option>
          {/* Add more options as needed */}
        </select>
      </div>
      {donkiData && (
        <div>
          <h3>Notifications:</h3>
          <ul>
            {donkiData.map((notification, index) => (
              <li key={index}>
                <h4>Type: {notification.messageType}</h4>
                <p>ID: {notification.messageID}</p>
                <p>Issue Time: {formatDate(notification.messageIssueTime)}</p>
                <div>
                  <h5>Summary:</h5>
                  <p>{notification.messageBody.replace(/## /g, "")}</p>
                </div>
                <p>
                  <a
                    href={notification.messageURL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    More Info
                  </a>
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DonkiComponent;
