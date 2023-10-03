import React, { useState, useEffect } from "react";

function EPICComponent() {
  const [epicData, setEpicData] = useState([]);

  const fetchEpicData = async () => {
    try {
      // Fetch data from our serverless function endpoint
      const response = await fetch("/.netlify/functions/epic");

      // Check if the response is successful, if not throw an error
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Convert the response data to a JavaScript object
      const data = await response.json();

      // Update the state with the fetched data
      setEpicData(data);
    } catch (error) {
      console.error("Error fetching EPIC data:", error);
    }
  };

  useEffect(() => {
    fetchEpicData();
  }, []);

  return (
    <div className="App-section">
      <h2>NASA's EPIC Camera Images</h2>
      {epicData.map((item) => (
        <div key={item.identifier} className="epic-card">
          <h3>Date: {item.date}</h3>
          <img
            src={`https://epic.gsfc.nasa.gov/archive/natural/2023/10/01/png/${item.image}.png`}
            alt={item.caption}
          />
          <p>{item.caption}</p>
          <div className="coordinates">
            <strong>Centroid Coordinates:</strong> Latitude:{" "}
            {item.centroid_coordinates.lat}, Longitude:{" "}
            {item.centroid_coordinates.lon}
          </div>
        </div>
      ))}
    </div>
  );
}

export default EPICComponent;
