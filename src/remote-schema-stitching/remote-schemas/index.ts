import getPersonSchema from './remote-person';
import getTeamSchema from './remote-team';
import linkTypeDefs from './linkTypeDefs';

export default async function getRemoteSchemas(): Promise<any> {
  const person = await getPersonSchema();
  const team = await getTeamSchema();
  return {
    linkTypeDefs,
    person,
    team
  }
}