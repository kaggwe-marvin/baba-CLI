const axios = require("axios");
const { access_token } = require("../../config/Access/access");

const transId = process.argv[2];
const authHeader = access_token;

const requestBody = {
  payer: {
    partyIdType: "MSISDN",
    partyId: "+1234567890",
  },
  payerCurrency: "EUR",
  payerMessage: "Hey there! Enjoy this imaginary money!",
  validityTime: 3600,
};

axios
  .post(
    "https://sandbox.momodeveloper.mtn.com/collection/v2_0/preapproval",
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
