#!/bin/bash

# Generate UUID using Node.js
apiUserId=$(node -e "const uuid = require('uuid'); console.log(uuid.v4())")
echo "Generated Client-ID: '$apiUserId';"
echo "module.exports = { clientId: '$apiUserId' };" > clientId.js

# Make the API POST request to create an API user
node createApiUser.js $apiUserId

# Make the API POST request to get an API User
node getApiUser.js $apiUserId

# Make the API POST request to get an API key
node createApiKey.js $apiUserId
