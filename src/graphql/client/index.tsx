import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { RetryLink } from 'apollo-link-retry';
import { RestLink } from 'apollo-link-rest';
import { AddressPatcher } from '../patchers';

const customLink = new ApolloLink((operation, forward: any) => {
  operation.setContext(({headers = {}}) => ({
    headers: {
      ...headers,
      Authorization: 'HellIamaheader'
    }
  }));
  return forward(operation);
});

export const client = new ApolloClient({
  link: ApolloLink.from([customLink,
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
        );
      }
      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
      }
    }),
    new RetryLink({
      delay: {
        initial: 300,
        max: Infinity,
        jitter: true
      },
      attempts: {
        max: 5,
        retryIf: (error, _operation) => !!error
      }
    }),
    new RestLink({
      uri: 'https://jsonplaceholder.typicode.com',
      typePatcher: {...AddressPatcher}
    })
  ]),
  cache: new InMemoryCache()
});