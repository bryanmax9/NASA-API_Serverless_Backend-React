const axios = require("axios");

const EONET_EVENTS_ENDPOINT = "https://eonet.gsfc.nasa.gov/api/v2.1/events";

exports.handler = async function (event, context) {
  try {
    const response = await axios.get(EONET_EVENTS_ENDPOINT, {
      params: {
        limit: 5,
        days: 20,
        // Removed the InciWeb source filter
        status: "open",
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error("Error fetching EONET events data:", error.message);
    return {
      statusCode: 500,
      body: `Error fetching EONET events data: ${error.message}`,
    };
  }
};
