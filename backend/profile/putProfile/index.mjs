import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
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

    if (!identityToken || !userId) {
      return sendResponse({ message: "UnAuthorized" }, 401);
    }
    if (!event.body.profilePicture)
      return sendResponse({ message: "No image Found" }, 400);

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
    const buf = Buffer.from(event.body.profilePicture, "base64");

    const uploadImage = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `profilePictures/${userId}/image`,
      Body: buf,
      ContentEncoding: "base64",
      ContentType: "image/png",
    });
    const res = await s3Client.send(uploadImage);
    console.log(res);
    return sendResponse(res, 200);
  } catch ({ name, message, ...err }) {
    console.log(err);
    console.log(message);
    return sendResponse(message, 400);
  }
};
