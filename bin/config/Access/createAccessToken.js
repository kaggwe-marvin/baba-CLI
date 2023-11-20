const fs = require("fs").promises;
const axios = require("axios");
const { clientId } = require("../User/clientId");
const { apiKey: clientSecret } = require("../User/clientKey");

// Use process.argv[2] to get the command-line argument
const authHeaderArg = process.argv[2];

// Check if authHeaderArg is provided, otherwise, use Basic authentication
const authHeader =
  authHeaderArg ||
  `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`;

console.log("Auth Header:", authHeader);
console.log("Client ID:", clientId);
console.log("Client Secret:", clientSecret);

axios
  .post(
    "https://sandbox.momodeveloper.mtn.com/collection/token/",
    {},
    {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "Ocp-Apim-Subscription-Key": "a4c3021a47204fe0a2f2c6f888034b34",
        Authorization: authHeader,
      },
    }
  )
  .then(async (response) => {
    console.log(`Response: ${response.status} ${response.statusText}`);
    console.log("API User Response:", response.data);

    // Convert the response data to a string and write it to access.js
    const responseDataString = formatObject(response.data, null, 2); // The '2' is for indentation
    const accessContent = `module.exports = ${responseDataString};`;

    await fs.writeFile("access.js", accessContent);
    console.log("Access data written to access.js");
  })
  .catch((error) => {
    console.error("Error:", error.message);
    console.error("Request Data:", error.config);
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
