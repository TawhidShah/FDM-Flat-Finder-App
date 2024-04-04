import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import mime from "mime-types";

import { NextResponse } from "next/server";

export async function POST(request) {
  const formData = await request.formData();
  const files = formData.getAll("files");

  const client = new S3Client({
    region: "eu-west-2",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });

  const links = [];

  const response = await Promise.all(
    files.map(async (file) => {
      const ext = file.name.split(".").pop();
      const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
      const Body = await file.arrayBuffer();
      const fileName = `${nameWithoutExt}-${uuidv4()}.${ext}`;

      client.send(
        new PutObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME,
          Key: fileName,
          Body,
          ACL: "public-read",
          ContentType: mime.lookup(file.path),
        }),
      );
      const link = `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${fileName}`;
      links.push(link);
    }),
  );

  return NextResponse.json({ links });
}
