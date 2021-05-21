import {ApolloServer, gql} from 'apollo-server'

async function startServer() :Promise<any> {
        const typeDefs =gql `
        type Team {
          id: Int!
          name: String
        }
        type Query {
            teams: [Team]
            team(id: Int): Team
        }
      `;
      const teams = [
        { id: 1, name: 'Backend'},
        { id: 2, name: 'Frontend' },
        { id: 3, name: 'Mobile'}
      ];
    const resolvers = {
        Query: {
          teams: () => teams,
          team: ( root: any, args: any, context: any, info: any) => {
            return teams.find(t => t.id === args.id);
            }
          }
    }
    const server = new ApolloServer({typeDefs, resolvers });
    server.listen(3002).then(({url}) => {
        console.log(`\u{1F680} Server ready at ${url}`);
    })
}

startServer();