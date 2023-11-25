const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const { access_token } = require("../../config/Access/access");

const transId = process.argv[2];
const authHeader = access_token;

const requestBody = {
  externalId: transId.toString(),
};

// Generate UUID for X-Reference-Id
const xReferenceId = uuidv4();

// Make the API Request
axios
  .delete(
    `https://sandbox.momodeveloper.mtn.com/collection/v2_0/invoice/${transId}`,
    {
      data: requestBody, // Use 'data' instead of 'requestBody'
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "Ocp-Apim-Subscription-Key": "a4c3021a47204fe0a2f2c6f888034b34",
        "X-Reference-Id": xReferenceId,
        "X-Target-Environment": "sandbox",
        Authorization: `Bearer ${authHeader}`,
      },
    }
  )
  .then((response) => {
    console.log(`Response: ${response.status} ${response.statusText}`);
    console.log("API User Response:", response.data);
  })
  .catch((error) => {
    // Your error handling code here
    console.error("Error:", error.message);
    console.error("Request Data:", error.config);
    if (error.response) {
      console.error(
        `Response: ${error.response.status} ${error.response.statusText}`
      );
      console.error("Error Details:", error.response.data);
    } else if (error.request) {
      console.error("No response received from the server");
    } else {
      console.error("Error setting up the request:", error.message);
    }
  });
