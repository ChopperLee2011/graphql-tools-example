import { ApolloServer } from "apollo-server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { gql } from "apollo-server";
import "reflect-metadata";

// 定义你的 GraphQL schema
const typeDefs = gql`
  type Stay @key(fields: "id") {
    id: ID!
    userId: ID!
    hotelId: ID!
    roomNumber: String!
    startDate: String!
    endDate: String!
    hotel: Hotel @requires(fields: "hotelId")
  }

  extend type Hotel @key(fields: "id") {
    id: ID! @external
    name: String @external
    address: String @external
    rating: Float @external
  }

  type Query {
    stays: [Stay!]!
    stay(id: ID!): Stay
  }
`;

const stays = [
  {
    id: "1",
    userId: "123",
    hotelId: "1",
    roomNumber: "101",
    startDate: "2023-01-01",
    endDate: "2023-01-07",
  },
];

const resolvers = {
  Query: {
    stays: () => stays,
    stay: (_: any, args: { id: string }) =>
      stays.find((stay) => stay.id === args.id),
  },
  Stay: {
    __resolveReference: (reference: { id: string }) =>
      stays.find((stay) => stay.id === reference.id),
    hotel: (stay: { hotelId: string }) => ({
      __typename: "Hotel",
      id: stay.hotelId,
    }),
  },
};

// 创建 Apollo 服务器
const server = new ApolloServer({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
});

// 启动服务器
server.listen({ port: 4002 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
