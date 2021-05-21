import { ApolloServer, gql } from 'apollo-server'

async function startServer(): Promise<any> {
  const typeDefs = gql`
        type Person {
          id: Int!
          firstName: String
          lastName: String
          teamId: Int!
        }
        type Query {
            persons(teamId: Int): [Person]
            person(id: Int): Person
        }
      `;
  const persons = [
    { id: 1, firstName: 'Chopper', lastName: 'Lee', teamId: 1 },
    { id: 2, firstName: 'Charlie', lastName: 'Li', teamId: 1 },
    { id: 3, firstName: 'Tommy', lastName: 'Wei', teamId: 1 },
    { id: 4, firstName: 'James', lastName: 'Wang', teamId: 2 },
    { id: 5, firstName: 'Jason', lastName: 'Wang', teamId: 2 },
    { id: 6, firstName: 'Bruce', lastName: 'Liang', teamId: 3 }
  ];
  const resolvers = {
    Query: {
      persons: (root: any, args: any, context: any, info: any) => {
        return persons.filter(p => p.teamId === args.teamId);
      },
      person: (root: any, args: any, context: any, info: any) => {
          return persons.find(p => p.id === args.id);
      }
    }
  }
  const server = new ApolloServer({ typeDefs, resolvers });
  server.listen(3001).then(({ url }) => {
    console.log(`\u{1F680} Server ready at ${url}`);
  })
}

startServer();