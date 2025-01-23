import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
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
    body: JSON.stringify(body),
  };
};

export const handler = async (event) => {
  try {
    console.log("inside fun body", event);
    const identityToken = event?.headers?.identityToken;
    const userId = event?.headers?.userId;

    console.log("userId", userId);

    if (!identityToken || !userId) {
      return sendResponse({ message: "UnAuthorized" }, 401);
    }
    if (!event.body) return sendResponse({ message: "No Data Found" }, 400);

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
      Item: {
        userId: { S: userId },
        firstName: { S: event.body.firstName },
        lastName: { S: event.body.lastName },
        gender: { S: event.body.gender },
        height: { S: event.body.height },
        birthDate: { S: new Date().toISOString() },
      },
    };

    const putItem = new PutItemCommand(input);

    console.log("after put command");
    const res = await dynamoDBClient.send(putItem);
    return sendResponse({ message: "Data Inserted" }, 200);
  } catch ({ name, message, ...err }) {
    console.log(err);
    return sendResponse(message, 400);
  }
};
