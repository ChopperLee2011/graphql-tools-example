const resolvers = {
    Team: {
        members: {
            fragment: `... on Team { id }`,
            resolve: (parent: any, args: any, context: any, info: any) => {
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
    },
    Person: {
        team: {
            fragment: `... on Person { teamId }`, // this will help to pass the implicit type to remote
            resolve:  (parent: any, args: any, context: any, info: any) => {
                const id = parent.teamId;
                return info.mergeInfo.delegateToSchema({
                    schema: info.schema,
                    operation: 'query',
                    fieldName: 'team',
                    args: { id },
                    context,
                    info
                })
            }
        }
    }
}

export default resolvers;