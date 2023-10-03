import React, { useEffect, useState } from "react";

function BrowseAsteroids() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/.netlify/functions/browse-asteroids")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setData(data))
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      });
  }, []);

  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Browse Asteroids</h2>
      {data.near_earth_objects &&
        data.near_earth_objects.map((asteroid) => (
          <div
            key={asteroid.id}
            style={{
              marginBottom: "30px",
              border: "1px solid #ddd",
              padding: "15px",
              borderRadius: "5px",
            }}
          >
            <h3>
              <a
                href={asteroid.nasa_jpl_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {asteroid.name}
              </a>
            </h3>
            {asteroid.is_potentially_hazardous_asteroid && (
              <span
                style={{
                  color: "#E94E77",
                  marginLeft: "10px",
                  display: "inline-block",
                  padding: "5px",
                  borderRadius: "5px",
                }}
              >
                ⚠️ Potentially Hazardous
              </span>
            )}
            {asteroid.estimated_diameter && (
              <p style={{ marginTop: "5px" }}>
                Estimated Diameter:{" "}
                {typeof asteroid.estimated_diameter.kilometers
                  .estimated_diameter_min === "number"
                  ? asteroid.estimated_diameter.kilometers.estimated_diameter_min.toFixed(
                      2
                    )
                  : "N/A"}{" "}
                km -{" "}
                {typeof asteroid.estimated_diameter.kilometers
                  .estimated_diameter_max === "number"
                  ? asteroid.estimated_diameter.kilometers.estimated_diameter_max.toFixed(
                      2
                    )
                  : "N/A"}{" "}
                km
              </p>
            )}
            {asteroid.close_approach_data &&
              asteroid.close_approach_data[0] && (
                <p style={{ marginTop: "5px" }}>
                  Next Close Approach:{" "}
                  {new Date(
                    asteroid.close_approach_data[0].close_approach_date
                  ).toLocaleDateString()}{" "}
                  at a distance of{" "}
                  {typeof asteroid.close_approach_data[0].miss_distance
                    .kilometers === "number"
                    ? asteroid.close_approach_data[0].miss_distance.kilometers.toFixed(
                        2
                      )
                    : "N/A"}{" "}
                  km
                </p>
              )}
          </div>
        ))}
    </div>
  );
}

export default BrowseAsteroids;
