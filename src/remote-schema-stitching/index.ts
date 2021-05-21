import {ApolloServer} from 'apollo-server'
import { GraphQLSchema } from 'graphql';
import { mergeSchemas } from 'graphql-tools';
import getRemoteSchemas from './remote-schemas';
import resolvers from './remote-schemas/resolvers';

async function startServer(): Promise<any> {
    const schemaMerged: GraphQLSchema = mergeSchemas({
        schemas: Object.values(await getRemoteSchemas()),
        resolvers
    });
    const server = new ApolloServer({schema:schemaMerged});
    server.listen().then(({url}) => {
        console.log(`\u{1F680} Server ready at ${url}`);
    })
}

startServer();