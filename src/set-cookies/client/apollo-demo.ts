import 'cross-fetch/polyfill';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

const client = new ApolloClient({
    uri: 'http://localhost:4000',
    credentials: 'include'
});

client.query({
    query: gql`
        query {
            hello
        }
    ` 
})
    .then(data => console.log(data))
    .catch(error => console.log(error));

