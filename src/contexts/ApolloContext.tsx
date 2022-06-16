import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

import { auth } from '../firebase'

export type ApolloContextProps = {
  client: ApolloClient | null | undefined
}

const httpLink = createHttpLink({
  uri: '/api/graphql',
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await auth.currentUser?.getIdToken()
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    }
  }
});

const client = new ApolloClient({
  // FIXME
  // uri: 'http://localhost:4000',
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export const ApolloGqlProvider: FC = ({children}) => {
  return <ApolloProvider client={client}>
    {children}
  </ApolloProvider>
}
