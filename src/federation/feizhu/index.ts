import { ApolloServer } from "apollo-server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { gql } from "apollo-server";
import "reflect-metadata";

// 定义 GraphQL schema
const typeDefs = gql`
  type User @key(fields: "id") {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
  }
`;

const users = [
  { id: "1", name: "Alice", email: "alice@example.com" },
  { id: "2", name: "Bob", email: "bob@example.com" },
];

// 定义 resolvers
const resolvers = {
  Query: {
    users: () => users,
    user: (_: any, args: { id: string }) =>
      users.find((user) => user.id === args.id),
  },
  User: {
    __resolveReference: (reference: { id: string }) =>
      users.find((user) => user.id === reference.id),
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
});

// 启动服务器
server.listen({ port: 4003 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
