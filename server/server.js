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
