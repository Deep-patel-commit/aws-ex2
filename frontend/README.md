# Aws exercise 2

## Installation

```
npm install
```

## Run the Application

```
npm run dev
```

## Dependencies

```
"dependencies": {
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.0",
    "@mui/icons-material": "^6.3.1",
    "@mui/material": "^6.3.0",
    "@reduxjs/toolkit": "^2.5.0",
    "axios": "^1.7.9",
    "dompurify": "^3.2.3",
    "oidc-client-ts": "^3.1.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-oidc-context": "^3.2.0",
    "react-redux": "^9.2.0",
    "react-router-dom": "^7.1.1"
  },
  "devDependencies": {
    "@eslint/js": "^9.17.0",
    "@types/react": "^18.3.18",
    "@types/react-dom": "^18.3.5",
    "@vitejs/plugin-react": "^4.3.4",
    "eslint": "^9.17.0",
    "eslint-plugin-import": "^2.31.0",
    "eslint-plugin-react-hooks": "^5.0.0",
    "eslint-plugin-react-refresh": "^0.4.16",
    "typescript": "~5.6.2",
    "typescript-eslint": "^8.18.2",
    "vite": "^6.0.5"
  }

```

## Task

Users can Sign In to the application.

Hint - use Cognito UserPool for authentication

Users can upload their profile image and users can access their own image only.

Hint - use S3 bucket to store images using SDK. The Identity Pool and the IAM Role configured in the Pool can be used to restrict access by the user (Identity) to his own image in the S3 bucket.

Users can set their profile information like Name, Height, Gender, DOB.

Hint - Should develop REST API using API Gateway, Lambda and DynamoDB to store user profile information.

Users should be able to View their own Profile information on successful Login.

Hint - Develop API which provides information about logged in user only

Admin users should be able to view all users Profile information on successful Login.

Hint - Develop API which provides information for all users in the system.

Here, the entire Back-end is hosted on AWS Cloud, whereas the Front-end\Client can be anything eg. React (The Amplify JavaScript libraries are supported for different web and mobile frameworks including React, React Native, Angular, Ionic, and Vue. For Android\IOS, the mobile Amplify SDKs can be used.)
