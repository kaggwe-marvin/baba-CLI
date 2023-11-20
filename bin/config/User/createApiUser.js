const axios = require("axios");

const apiUserId = process.argv[2];

const requestBody = {
  providerCallbackHost: "string",
};

axios
  .post("https://sandbox.momodeveloper.mtn.com/v1_0/apiuser", requestBody, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      "Ocp-Apim-Subscription-Key": "a4c3021a47204fe0a2f2c6f888034b34",
      "X-Reference-Id": apiUserId,
    },
  })
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
