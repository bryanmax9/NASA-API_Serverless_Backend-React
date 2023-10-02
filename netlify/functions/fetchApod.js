const axios = require('axios');

const NASA_ENDPOINT = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY";

exports.handler = async function(event, context) {
  try {
    const response = await axios.get(NASA_ENDPOINT);
    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: "Error fetching APOD data"
    };
  }
};
