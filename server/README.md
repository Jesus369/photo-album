# photo-album
A Photo Album using Google Cloud Storage

## Getting Started
* Create Directory titled *photo-album*
* Create 2 folders within **Photo Album** titled *server* and *client*
* Within *server*
  * yarn init -y
  * yarn add graphql-yoga
  * yarn add @google-cloud/storage
  * yarn add dotenv
  * yarn add babel-preset-env
  * yarn global add babel-cli

```javascript
const { GraphQLServer } = require("graphql-yoga");

const { createBucket } = require("./storage");

// Defining the Photo Object and the call for querying all photos
const typeDefs = `
    type Photo {
        id: ID!
        name: String!
        url: String!
    }

    type Query {
        photos: [Photo!]!
    }
`;

// Graphql Function for Querying and Mutations
const resolvers = {
  Query: {
    photos: () => photos
  }
};

// Executing the createBucket function from "./storage.js"
createBucket().catch(console.error);

// GraphQLServer instance
const server = new GraphQLServer({ typeDefs, resolvers });

// Starting Server
server.start(({ port }) => {
  console.log(`Server is running on port ${port}`);
});
```

* Within *server* create a file *storage.js*
```javascript
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
```
