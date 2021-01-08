### Photo Album created using React, Graphql-Yoga, and Google Cloud Storage

* Create your main directory titled *photo-album*
* Within *photo-album* create two directories: *server* and *client*
* Go into your *server* directory and run the following commands
  * yarn init -y
  * yarn add graphql-yoga
  * yarn add @google-cloud/storage
  * yarn add dotenv
  * yarn add babel-cli
  
* In your *package.json* add scripts
```javascript
 "scripts": {
    "start": "babel-node server.js"
  }
```


* Create a *.babelrc* file in your *server* folder
```javascript
{
  "presets": ["env"]
}
```

* Create a *server.js* file in your *server* directory
```javascript
const { GraphQLServer } = require("graphql-yoga");

const { createBucket } = require("./storage");

// Defining the Photo Object and the call for querying all photos
const typeDefs = `
    type Photo {
        id: ID!
        name: String!
        url: String!
        password: String!
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
````
* We'll keep our google-cloud/storage in a seperate file called *storage.js* within the *server* directory
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
````
* In root directory run *npx create-react-app client* 
 * In the *client* directory run *yarn add @apollo/client grapqhl*
