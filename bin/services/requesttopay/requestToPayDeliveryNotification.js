const axios = require("axios");
const { access_token } = require("../../config/Access/access");
const transId = process.argv[2];
const authHeader = access_token;
const message = "please put in your pin to complete this payment";

const requestBody = {
  notificationMessage: message,
};

axios
  .post(
    `https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay/${transId}/deliverynotification`,
    requestBody,
    {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "Ocp-Apim-Subscription-Key": "a4c3021a47204fe0a2f2c6f888034b34",
        ReferenceId: transId,
        "X-Target-Environment": "sandbox",
        Authorization: `Bearer ${authHeader}`,
        Language: "English", // Include this if needed, otherwise remove it
      },
    }
  )
  .then((response) => {
    console.log(`Response: ${response.status} ${response.statusText}`);
    console.log("API User Response:", response.data);
  })
  .catch((error) => {
    console.error("Error Details:", error.response?.data || error.message);
  });
