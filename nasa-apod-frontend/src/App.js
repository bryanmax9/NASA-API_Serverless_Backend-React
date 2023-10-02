import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [apodData, setApodData] = useState(null);

  // For the API Landsat, lets put a default coordinate
  const [location, setLocation] = useState({
    lat: 1.5,
    lon: 100.75,
    date: "2014-02-01",
  });

  //give the user a location list:
  const locationsList = [
    { name: "Default", lat: 1.5, lon: 100.75 },
    { name: "Houston, Texas", lat: 29.76, lon: -95.37 },
    { name: "New York City, New York", lat: 40.71, lon: -74.01 },
    { name: "Los Angeles, California", lat: 34.05, lon: -118.25 },
  ];

  //For the Landsat API, the image of the satellite capture will be null in the beginning
  const [imageURL, setImageURL] = useState(null);

  const fetchLandsatImage = async () => {
    try {
      const response = await fetch(
        `/.netlify/functions/fetchLandsatImage?lat=${location.lat}&lon=${location.lon}&date=${location.date}`
      );
      if (!response.ok) {
        // Handle the timeout error here
        if (response.status === 500) {
          setImageURL(null); // clear any previous image
          throw new Error(
            "There is no image available yet for this location or there was a timeout fetching the image. Please try again later."
          );
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setImageURL(data.url);
    } catch (error) {
      console.error("Error fetching Landsat data:", error);
      alert(error.message); // Display the message to the user using an alert, or you can use state to display it on the page.
    }
  };

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
    // Invoke the fetch function once the component is mounted
    fetchApodData();
  }, []);

  return (
    <div className="App">
      {/* APOD API Section */}
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

      {/* Landsat API Section */}
      <div className="App-section">
        <h2>Landsat Imagery</h2>
        <div>
          <label>Choose a location: </label>
          <select
            onChange={(e) => {
              const selectedLocation = locationsList[e.target.selectedIndex];
              setLocation({
                lat: selectedLocation.lat,
                lon: selectedLocation.lon,
                date: location.date,
              });
            }}
          >
            {locationsList.map((loc, index) => (
              <option key={index} value={index}>
                {loc.name}
              </option>
            ))}
          </select>
          <br />
          <br />

          <label>Latitude: </label>
          <input
            type="number"
            placeholder="Latitude"
            value={location.lat}
            readOnly
          />
          <label>Longitude: </label>
          <input
            type="number"
            placeholder="Longitude"
            value={location.lon}
            readOnly
          />
          <label>Date: </label>
          <input
            type="date"
            value={location.date}
            onChange={(e) =>
              setLocation((prev) => ({ ...prev, date: e.target.value }))
            }
          />
          <button onClick={fetchLandsatImage}>Fetch Image</button>
        </div>
        {imageURL && <img src={imageURL} alt="Landsat Imagery" />}
      </div>
    </div>
  );
}

export default App;
