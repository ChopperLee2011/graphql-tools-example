import {ApolloServer} from 'apollo-server';
import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            hello: {
                type: GraphQLString,
                description: 'A simple type for getting started!',
                resolve: () => 'world'
            }
        }
    })
});
const server = new ApolloServer({
    schema,
    context: async ({res}: {res:any}) => {
        res.set('Set-Cookie', 'foo=bar');
    }
});
server.listen().then(({url}) => {
    console.log(`\u{1F680} Server ready at ${url}`);
})