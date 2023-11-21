const axios = require("axios");
const { access_token } = require("../config/Access/access");

const transId = process.argv[2];
const authHeader = access_token;

// Function to generate a random number between 10000000 and 99999999
function generateRandomExternalId() {
  return Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000;
}

const requestBody = {
  amount: "50",
  currency: "EUR",
  externalId: generateRandomExternalId(), // Generate random externalId
  payer: {
    partyIdType: "MSISDN",
    partyId: "+256788320104",
  },
  payerMessage: "test message",
  payeeNote: "test note",
};

axios
  .post(
    "https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay",
    requestBody,
    {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "Ocp-Apim-Subscription-Key": "a4c3021a47204fe0a2f2c6f888034b34",
        "X-Reference-Id": transId,
        "X-Target-Environment": "sandbox",
        Authorization: `Bearer ${authHeader}`, // Add Bearer token here
      },
    }
  )
  .then((response) => {
    console.log(`Response: ${response.status} ${response.statusText}`);
    console.log("API User Response:", response.data);
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
