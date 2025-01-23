import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { config } from "dotenv";
console.log("Loading function");
config();

const sendResponse = (resBody, statusCode) => {
  return {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type,Authorization",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    },
    body: resBody,
  };
};

export const handler = async (event) => {
  try {
    console.log("inside fun body", event);
    const identityToken = event?.headers?.identityToken;
    const userId = event?.headers?.userId;

    console.log("iden tok", identityToken);
    console.log("userId", userId);

    if (!identityToken || !userId) {
      return sendResponse({ message: "UnAuthorized" }, 401);
    }

    const s3Client = new S3Client({
      region: process.env.AWS_S3_REGION,
      credentials: fromCognitoIdentityPool({
        clientConfig: { region: process.env.AWS_COGNITO_REGION },
        identityPoolId: process.env.AWS_IDENTITY_POOL_ID,
        logins: {
          [process.env.AWS_USER_POOL_URI]: identityToken,
        },
      }),
    });
    console.log("after s3 client");

    const uploadImage = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `profilePictures/${userId}/image`,
      ResponseContentEncoding: "base64",
      ResponseContentType: "image/png",
    });

    console.log("after s3 command");
    const response = await s3Client.send(uploadImage);

    console.log("after s3 command");

    const streamToString = (stream) =>
      new Promise((resolve, reject) => {
        const chunks = [];
        stream.on("data", (chunk) => chunks.push(chunk));
        stream.on("error", reject);
        stream.on("end", () =>
          resolve(Buffer.concat(chunks).toString("base64"))
        );
      });

    const base64Image = await streamToString(response.Body);
    console.log("after s3 res", base64Image);

    return sendResponse({ image: base64Image }, 200);
  } catch ({ name, message, ...err }) {
    console.log("-------- error ---------");
    console.log(err);
    console.log(message);
    return sendResponse(
      message || "Error while fetching the image please try later",
      400
    );
  }
};
