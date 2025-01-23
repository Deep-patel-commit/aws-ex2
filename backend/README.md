# BACKEND

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
