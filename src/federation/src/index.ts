import { ApolloServer } from "apollo-server";
import { ApolloGateway, IntrospectAndCompose } from "@apollo/gateway";
const { express: voyagerMiddleware } = require("graphql-voyager/middleware");

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: "hotel", url: "http://localhost:4001" },
      { name: "stay", url: "http://localhost:4002" },
    ],
  }),
});

const server = new ApolloServer({
  gateway,
});

server.listen().then(async ({ url }) => {
  console.log(`🚀 Gateway ready at ${url}`);
});
