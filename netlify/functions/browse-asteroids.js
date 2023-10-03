// file: browse-asteroids.js
const axios = require("axios");

exports.handler = async function (event, context) {
  const API_ENDPOINT = `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=Jbm6MlEtCMeow8EedEFMEcfoXEfd9YmyvhbYdZ2b`;

  try {
    const response = await axios.get(API_ENDPOINT);
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: "Error fetching asteroid data",
    };
  }
};
