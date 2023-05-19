import { setContext } from '@apollo/client/link/context';
import Cookie from 'js-cookie';

import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_SERVER_URI
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: Cookie.get('token') || ''
    }
  };
});

export const clientConfig = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
  credentials: 'include'
});
