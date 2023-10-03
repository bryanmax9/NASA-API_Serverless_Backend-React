const axios = require("axios");

const EPIC_ENDPOINT =
  "https://api.nasa.gov/EPIC/api/natural?api_key=Jbm6MlEtCMeow8EedEFMEcfoXEfd9YmyvhbYdZ2b";

exports.handler = async function (event, context) {
  try {
    const response = await axios.get(EPIC_ENDPOINT);

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: "Error fetching EPIC data",
    };
  }
};
