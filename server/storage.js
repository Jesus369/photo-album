import { Storage } from "@google-cloud/storage";
require("dotenv").config({
  path: "./.env"
});

// Connecting to your Storage
const storage = new Storage({
  // Service Key JSON path and Project ID requirements
  keyFilename: "./serviceKey.json",
  projectId: process.env.GOOGLE_CLOUD_PROJECT
});

let photoBucketName = "photos";

async function createBucket() {
  // Creating a bucket within Google-Cloud-Storage
  await storage.createBucket(photoBucketName);
  console.log(`Bucket ${photoBucketName} created`);
}

exports.createBucket = createBucket;
