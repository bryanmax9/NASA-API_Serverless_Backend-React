import React, { useState, useEffect } from "react";

function APODComponent() {
  const [apodData, setApodData] = useState(null);

  const fetchApodData = async () => {
    try {
      // Fetch data from our serverless function endpoint
      const response = await fetch("/.netlify/functions/fetchApod");

      // Check if the response is successful, if not throw an error
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Convert the response data to a JavaScript object
      const data = await response.json();

      // Update the state with the fetched data
      setApodData(data);
    } catch (error) {
      console.error("Error fetching APOD data:", error);
    }
  };

  useEffect(() => {
    fetchApodData();
  }, []);

  return (
    <div className="App-section">
      <h2>Astronomy Picture of the Day (APOD)</h2>
      {apodData && (
        <div>
          <h3>{apodData.title}</h3>
          <img src={apodData.url} alt={apodData.title} />
          <p>{apodData.explanation}</p>
        </div>
      )}
    </div>
  );
}

export default APODComponent;
