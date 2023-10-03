import React, { useState, useEffect } from "react";
import axios from "axios";

function EonetEvents() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "http://localhost:8888/.netlify/functions/eonet"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching EONET events data:", error);
      }
    }
    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{data.title}</h2>
      {data.events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

function EventCard({ event }) {
  return (
    <div
      style={{ border: "1px solid #ccc", padding: "16px", margin: "16px 0" }}
    >
      <h3>🌡️{event.title}🌡️</h3>
      <p>
        <strong>Category:</strong> {event.categories[0]?.title}
      </p>
      <div>
        <strong>Sources:</strong>
        <ul>
          {event.sources.map((source) => (
            <li key={source.id}>
              <a href={source.url} target="_blank" rel="noopener noreferrer">
                {source.id}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <strong>Recent Locations:</strong>
        <ul>
          {event.geometries.slice(0, 3).map((geo, index) => (
            <li key={index}>
              {geo.date}: {geo.coordinates.join(", ")}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default EonetEvents;
