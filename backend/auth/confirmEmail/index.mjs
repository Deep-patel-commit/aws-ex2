import {
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
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
    if (!event.body.username || !event.body.code) {
      return sendResponse(
        {
          message: "Invalid data",
        },
        401
      );
    }
    if (!validator.isNumeric(event.body.code)) {
      return sendResponse(
        {
          message: "Invalid code",
        },
        401
      );
    }
    const sanitizedUsername = validator.escape(event.body.username);
    const sanitizedCode = validator.escape(event.body.code);

    const client = new CognitoIdentityProviderClient({
      region: process.env.COGNITO_REGION,
    });

    const command = new ConfirmSignUpCommand({
      ClientId: process.env.COGNITO_CLIENT_ID,
      Username: sanitizedUsername,
      ConfirmationCode: sanitizedCode,
    });

    const response = await client.send(command);

    console.log("response", response);

    return sendResponse(response, 200);
  } catch ({ name, message, ...error }) {
    console.log("------ error --------");
    console.log("name", name);
    console.log("message", message);
    console.log("error", error);

    return sendResponse(
      {
        message: message || "Incorrect code",
      },
      401
    );
  }
};
