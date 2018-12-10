import { 
    makeExecutableSchema
 } from 'graphql-tools';

const typeDefs = `
    type Query {
        team(id: String): Team
    }

    type Team {
        id: String
        name: String
    }
`

const resolvers = {
    Query: {
        team: () => ({id: '1', name: 'wcl'})
    }
}
const teamSchema = makeExecutableSchema({typeDefs, resolvers});
export default teamSchema;