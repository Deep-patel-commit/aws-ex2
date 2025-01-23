import {
  CognitoIdentityProviderClient,
  SignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { config } from "dotenv";
import validator from "validator";
config();

console.log("Lambda Start ------");
const sendResponse = (body, statusCode) => {
  return {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type,Authorization",
      "Access-Control-Allow-Methods": "OPTIONS,POST",
    },
    body: body,
  };
};

export const handler = async (event) => {
  try {
    if (!event.body.username || !event.body.password || !event.body.email) {
      return sendResponse(
        {
          message: "Insufficient data",
        },
        401
      );
    }

    if (!validator.isEmail(event.body.email)) {
      return sendResponse(
        {
          message: "Invalid email",
        },
        401
      );
    }
    const sanitizedUsername = validator.escape(event.body.username);
    const sanitizedPassword = validator.escape(event.body.password);
    const sanitizedEmail = validator.escape(event.body.email);

    const client = new CognitoIdentityProviderClient({
      region: process.env.COGNITO_REGION,
    });

    const command = new SignUpCommand({
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: process.env.COGNITO_CLIENT_ID,
      Username: sanitizedUsername,
      Password: sanitizedPassword,
      UserAttributes: [
        {
          Name: "email",
          Value: sanitizedEmail,
        },
      ],
    });
    const response = await client.send(command);

    return sendResponse(response, 200);
  } catch ({ name, message }) {
    console.log("---------- error ----------");
    console.log("name : ", name);
    console.log("message : ", message);

    return sendResponse({ message: message || "Invalid data" }, 401);
  }
};
