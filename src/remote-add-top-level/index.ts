import {ApolloServer, gql} from 'apollo-server'
import getRemoteSchemas from '../utils/remote-schema'
import { GraphQLSchema,printSchema,execute,DocumentNode } from 'graphql';


async function startServer() :Promise<any> {
    const remoteSchema: GraphQLSchema = await getRemoteSchemas();
    const remoteTypeDefs = printSchema(remoteSchema);

    const typeDefs = gql`
        ${remoteTypeDefs
            .replace('type Query', 'type hrQuery')
            .replace('type Mutation', 'type hrMutation')
        }

        type Query {
            hr: hrQuery
        }
    `

    const resolvers = {
        Query: {
            hr: async function (root: any, args: any, context: any, info: any ) {
                const operation = {
                    ...info.operation,
                    selectionSet:
                      info.operation.selectionSet.selections[0].selectionSet,
                  }
                const doc: DocumentNode = { kind: 'Document', definitions: [operation] }        
                const result = await execute(
                    remoteSchema,
                    doc,
                    info.rootValue,
                    context,
                    info.variableValues,
                    info.operation.name
                );
                return (result|| {}).data
            }
        }
    }
    const server = new ApolloServer({typeDefs, resolvers });
    server.listen().then(({url}) => {
        console.log(`\u{1F680} Server ready at ${url}`);
    })
}

startServer();

