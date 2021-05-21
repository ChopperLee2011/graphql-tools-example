const linkTypeDefs = `
    extend type Team {
        members: [Person]
    }
    extend type Person {
        team: Team
    }
`

export default linkTypeDefs;