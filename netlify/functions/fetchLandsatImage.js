const axios = require("axios");

const LANDSAT_ENDPOINT = "https://api.nasa.gov/planetary/earth/imagery";
const NASA_API_KEY = "DEMO_KEY"; // You should use your own API Key here

exports.handler = async function (event, context) {
  const { lat, lon, date } = event.queryStringParameters;

  try {
    const response = await axios.get(LANDSAT_ENDPOINT, {
      params: {
        lat,
        lon,
        date,
        api_key: NASA_API_KEY,
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: "Error fetching Landsat imagery data",
    };
  }
};
