#!/bin/bash
# Generate UUID using Node.js
transId=$(node -e "const uuid = require('uuid'); console.log(uuid.v4())")
echo "Generated Transaction-ID: '$transId';"
echo "module.exports = { transId: '$transId' };" > transactionId.js
# Make the API POST request to create an Access Token

node preApproval.js $transId

node preApprovalStatus.js $transId

node requestToPay.js $transId

node requestToPayTransactionStatus.js $transId

