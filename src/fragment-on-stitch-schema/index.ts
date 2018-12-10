import {ApolloServer} from 'apollo-server'
import { GraphQLSchema } from 'graphql';
import { mergeSchemas } from 'graphql-tools';
import getRemoteSchemas from '../utils/remote-schema'
import teamSchema from './schemas/team';
import linkTypeDefs from './schemas/linkTypeDefs';

async function startServer() :Promise<any> {
    const remoteSchema: GraphQLSchema = await getRemoteSchemas();
    const schemaMerged: GraphQLSchema = mergeSchemas({
        schemas: [remoteSchema, teamSchema, linkTypeDefs],
        resolvers: {
            Team: {
                members: {
                    fragment: `... on Team { id }`,
                    resolve: (parent, args, context, info) => {
                        const teamId = parent.id;
                        return info.mergeInfo.delegateToSchema({
                            schema: info.schema,
                            operation: 'query',
                            fieldName: 'persons',
                            args: { teamId },
                            context,
                            info
                        })
                    }
                }
            }
        }
    });
    const server = new ApolloServer({schema:schemaMerged});
    server.listen().then(({url}) => {
        console.log(`\u{1F680} Server ready at ${url}`);
    })
}

startServer();

