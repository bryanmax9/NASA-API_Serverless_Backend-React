const axios = require("axios");

exports.handler = async function (event, context) {
  const { startDate, endDate, type } = event.queryStringParameters;
  const NASA_API_KEY = "Jbm6MlEtCMeow8EedEFMEcfoXEfd9YmyvhbYdZ2b"; // Replace with your NASA API Key

  try {
    const response = await axios.get(
      `https://api.nasa.gov/DONKI/notifications?startDate=${startDate}&endDate=${endDate}&type=${type}&api_key=${NASA_API_KEY}`
    );

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: "Error fetching DONKI data",
    };
  }
};
