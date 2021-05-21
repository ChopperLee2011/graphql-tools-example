import  { HttpLink } from 'apollo-link-http'
import { makeRemoteExecutableSchema, introspectSchema } from 'graphql-tools';
import { GraphQLSchema } from 'graphql';
import fetch from 'node-fetch';

const link = new HttpLink({
    uri: 'http://localhost:3001/graphql',
    fetch: fetch as any
})


export default async function getPersonSchema() :Promise<GraphQLSchema> {
    const schema = makeRemoteExecutableSchema({
        schema: await introspectSchema(link),
        link
    })
    return schema
}