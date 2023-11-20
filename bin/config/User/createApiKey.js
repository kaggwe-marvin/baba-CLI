const axios = require("axios");
const fs = require("fs").promises;

const apiUserId = process.argv[2];

axios
  .post(
    `https://sandbox.momodeveloper.mtn.com/v1_0/apiuser/${apiUserId}/apikey`,
    {},
    {
      headers: {
        "Cache-Control": "no-cache",
        "Ocp-Apim-Subscription-Key": "a4c3021a47204fe0a2f2c6f888034b34",
        "X-Reference-Id": apiUserId,
      },
    }
  )
  .then((response) => {
    console.log(`Response: ${response.status} ${response.statusText}`);
    console.log("API Key Response:", response.data);

    // Convert the response data to a string
    const responseDataString = `module.exports = ${formatObject(
      response.data
    )};`;

    // Write the response data to clientKey.js
    return fs.writeFile("clientKey.js", responseDataString);
  })
  .catch((error) => {
    if (error.response) {
      // The request was made, and the server responded with a status code
      console.error(
        `Response: ${error.response.status} ${error.response.statusText}`
      );
      console.error("Error Details:", error.response.data);
    } else if (error.request) {
      // The request was made, but no response was received
      console.error("No response received from the server");
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error setting up the request:", error.message);
    }
  });

// Function to format the object as a string without double quotes around keys
function formatObject(obj) {
  const result = [];
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result.push(`${key}: ${formatValue(obj[key])}`);
    }
  }
  return `{ ${result.join(", ")} }`;
}

// Function to format the values inside the object
function formatValue(value) {
  if (typeof value === "object" && value !== null) {
    return formatObject(value);
  } else if (typeof value === "string") {
    return `"${value}"`;
  } else {
    return value;
  }
}
