import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
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
    const identityToken = event?.headers?.identitytoken;
    const userId = event?.headers?.userid;

    console.log("iden tok", identityToken);
    console.log("userId", userId);

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
    };

    const getAllItems = new ScanCommand(input);

    console.log("after s3 command");
    const res = await dynamoDBClient.send(getAllItems);

    return sendResponse(res, 200);
  } catch ({ name, message, ...err }) {
    console.log("-------- error ---------");
    console.log(name);
    console.log(message);
    console.log(err);
    return sendResponse(message, 400);
  }
};
