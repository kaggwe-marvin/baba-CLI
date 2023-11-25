const axios = require("axios");
const fs = require("fs");
const { access_token } = require("../../config/Access/access");

const transId = process.argv[2];
const authHeader = access_token;

// Function to generate a random number between 10000000 and 99999999
function generateRandomExternalId() {
  return Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000;
}

const referenceId = generateRandomExternalId().toString();
console.log("Generated transaction Id :", referenceId);

const referenceString = `module.exports = {\n  reference_Id: '${referenceId}',\n};`;
fs.writeFileSync("referenceId.js", referenceString);

const requestBody = {
  externalId: referenceId,
  amount: "5",
  currency: "EUR",
  validityDuration: "3600",
  intendedPayer: {
    partyIdType: "MSISDN",
    partyId: "256788320104",
  },
  payee: {
    partyIdType: "MSISDN",
    partyId: "256788320104",
  },
  description: "An optional description of the invoice",
};

// Make the API Request
axios
  .post(
    "https://sandbox.momodeveloper.mtn.com/collection/v2_0/invoice",
    requestBody,
    {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "Ocp-Apim-Subscription-Key": "a4c3021a47204fe0a2f2c6f888034b34",
        "X-Reference-Id": transId,
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
