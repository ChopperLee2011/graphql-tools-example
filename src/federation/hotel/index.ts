import { ApolloServer } from "apollo-server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { gql } from "apollo-server";
import "reflect-metadata";

const typeDefs = gql`
  type Hotel @key(fields: "id") {
    id: ID!
    name: String!
    address: String!
    rating: Float!
    rooms: [Room!]!
  }

  type Room {
    id: ID!
    type: String!
    price: Float!
  }

  extend type Stay @key(fields: "id") {
    id: ID! @external
    hotelId: ID! @external
  }

  type Query {
    hotels: [Hotel!]!
    hotel(id: ID!): Hotel
  }
`;
const hotels = [
  {
    id: "1",
    name: "Shanghai Hotel",
    address: "jingan road",
    rating: 4.5,
    rooms: [
      { id: "101", type: "Single", price: 100.0 },
      { id: "102", type: "Double", price: 150.0 },
    ],
  },
  {
    id: "2",
    name: "Beijing Hotel",
    address: "wangfujing road",
    rating: 4.5,
    rooms: [
      { id: "101", type: "Single", price: 100.0 },
      { id: "102", type: "Double", price: 150.0 },
    ],
  },
];
// 定义你的 resolvers
const resolvers = {
  Query: {
    hotels: () => hotels,
    hotel: (_: any, args: { id: string }) =>
      hotels.find((hotel) => hotel.id === args.id),
  },
  Hotel: {
    __resolveReference: (reference: { id: string }) =>
      hotels.find((hotel) => hotel.id === reference.id),
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
});

server.listen({ port: 4001 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
