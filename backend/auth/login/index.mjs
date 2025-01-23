import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
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
    if (!event.body.username || !event.body.password) {
      return sendResponse(
        {
          message: "Insufficient data",
        },
        401
      );
    }

    const sanitizedUsername = validator.escape(
      validator.trim(event.body.username)
    );
    const sanitizedPassword = validator.escape(
      validator.trim(event.body.password)
    );

    const client = new CognitoIdentityProviderClient({
      region: process.env.COGNITO_REGION,
    });

    const command = new InitiateAuthCommand({
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: process.env.COGNITO_CLIENT_ID,
      AuthParameters: {
        USERNAME: sanitizedUsername,
        PASSWORD: sanitizedPassword,
      },
    });
    const response = await client.send(command);
    const userid = jwt.decode(response.AuthenticationResult.IdToken);
    return sendResponse(
      {
        idToken: response.AuthenticationResult.IdToken,
        accessToken: response.AuthenticationResult.AccessToken,
        refreshToken: response.AuthenticationResult.RefreshToken,
        userId: userid.sub,
      },
      200
    );
  } catch ({ name, message }) {
    console.log("---------- error ----------");
    console.log("name : ", name);
    console.log("message : ", message);

    return sendResponse({ message: message || "Invalid data" }, 401);
  }
};
