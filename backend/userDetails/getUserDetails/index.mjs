import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { config } from "dotenv";
console.log("Loading function");
config();

const sendResponse = (body, statusCode) => {
  return {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type,Authorization",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    },
    body: body,
  };
};

export const handler = async (event) => {
  try {
    console.log("inside fun body", event);
    const identityToken = event?.headers?.identityToken;
    const userId = event?.headers?.userId;

    if (!identityToken || !userId) {
      return sendResponse({ message: "UnAuthorized" }, 401);
    }

    const dynamoDBClient = new DynamoDBClient({
      region: process.env.AWS_DYNAMODB_REGION,
      credentials: fromCognitoIdentityPool({
        clientConfig: { region: process.env.AWS_COGNITO_REGION },
        identityPoolId: process.env.AWS_IDENTITY_POOL_ID,
        logins: {
          [process.env.AWS_USER_POOL_URI]: identityToken,
        },
      }),
    });

    const input = {
      TableName: process.env.AWS_DYNAMODB_TABLE_NAME,
      Key: {
        userId: { S: userId },
      },
    };

    const getItem = new GetItemCommand(input);

    console.log("after s3 command");
    const res = await dynamoDBClient.send(getItem);
    return sendResponse(res, 200);
  } catch ({ name, message, ...err }) {
    console.log(err);
    console.log(name);
    console.log(message);
    return sendResponse(message, 400);
  }
};
