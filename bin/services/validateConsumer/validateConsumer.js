const axios = require("axios");
const { access_token } = require("../../config/Access/access");

const authHeader = access_token;
const accountHolderMSISDN = "0788320104";

axios
  .get(
    `https://sandbox.momodeveloper.mtn.com/collection/v1_0/accountholder/msisdn/${accountHolderMSISDN}/basicuserinfo`,
    {
      headers: {
        "Cache-Control": "no-cache",
        "Ocp-Apim-Subscription-Key": "a4c3021a47204fe0a2f2c6f888034b34",
        "X-Target-Environment": "sandbox",
        Authorization: `Bearer ${authHeader}`,
      },
    }
  )
  .then((response) => {
    console.log(`Response: ${response.status} ${response.statusText}`);
    console.log("API Key Response:", response.data);
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
