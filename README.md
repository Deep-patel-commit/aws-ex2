
# User Profile Management Application

# Client

## Description


This application allows users to manage their profiles efficiently and securely. Users can sign in, upload their profile images, and set their profile information such as name, height, gender, and date of birth. Admin users can view all users' profile information.


## Features


- 🔐 **User Authentication**: Users can sign in using Cognito UserPool.
- 📸 **Profile Image Upload**: Users can upload their profile images and access their own images only.
- 📝 **Profile Information**: Users can set and update their profile information.
- 👀 **Admin Access**: Admin users can view all users' profile information.


## Tech Stack


- **Frontend**: React, Redux, TypeScript, Material-UI, Vite
- **Backend**: AWS Lambda, API Gateway, DynamoDB, S3, Cognito




## Installation


1. Clone the repository:
 ```sh
 git clone <repository-url>
 cd <repository-directory>
 ```
2. Install Dependencies


 ```
 npm install
 ```


## Add Required env Variables


```
AWS_COGNITO_REGION = <your-cognito-region>
COGNITO_CLIENT_ID = <your-cognito-client-id>
AWS_IDENTITY_POOL_ID = <your-identity-pool-id>
AWS_USER_POOL_URI = <your-user-pool-uri>
AWS_DYNAMODB_REGION = <your-dynamodb-region>
AWS_DYNAMODB_TABLE_NAME = <your-dynamodb-table-name>
AWS_S3_REGION = <your-s3-region>
AWS_S3_BUCKET_NAME = <your-s3-bucket-name>
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


# Server


backend code for AWS exercise 2

## API Endpoints

```
├── v1
    │
    │
    ├── auth
    │   ├── login
    |   |       └ post
    |   |
    │   ├── signup
    |   |       └ post
    |   |
    │   └── confirm-email
    |           └ post
    |
    ├── profilePicture
    |           ├ get
    |           └ post
    |
    └── userDetails
                ├ get
                └ post

```

# API Reference

## v1

### Auth

#### POST /v1/auth/signup

- **Description**: Registers a new user.
- **Request Body**:
  - `username` (string): The username of the user.
  - `password` (string): The password of the user.
  - `email` (string): email of user

#### POST /v1/auth/confirm-email

- **Description**: Confirms a user's email address.
- **Request Body**:
  - `username` (string): The username of the user.
  - `code` (string): verification code

#### POST /v1/auth/login

- **Description**: Authenticates a user and returns tokens.
- **Request Body**:
  - `username` (string): The username of the user.
  - `password` (string): The password of the user.
- **Response**:
  - `idToken` (string): The ID token.
  - `accessToken` (string): The access token.
  - `refreshToken` (string): The refresh token.
  - `userId` (string): The user ID.
  - `group` (string) (optional): Group of User

### Profile Picture

#### GET /v1/profilePicture

- **Description**: Retrieves the profile picture of a user.

- **Request Headers**:
  - `userid` (string): The cognito id of the user.
  - `identitytoken` (string): token for resource access

#### POST /v1/profilePicture

- **Description**: Uploads a new profile picture for a user.
- **Request Headers**:
  - `userid` (string): The cognito id of the user.
  - `identitytoken` (string): token for resource access
- **Request Body**:
  - `profilePicture` (string): The base64 encoded image.

### User Details

#### GET /v1/userDetails

- **Description**: Retrieves the details of a user.
- **Request Headers**:
  - `userid` (string): The cognito id of the user.
  - `identitytoken` (string): token for resource access

#### POST /v1/userDetails

- **Description**: Updates the details of a user.
- **Request Headers**:
  - `userid` (string): The cognito id of the user.
  - `identitytoken` (string): token for resource access
- **Request Body**:
  - `firstname` (string):
  - `lastname` (string):
  - `height` (string):
  - `gender` (string):
  - `birthdate` (string):


# ScreenShots



## Tasks


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


