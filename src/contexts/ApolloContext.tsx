import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

import { auth } from '../firebase'

const httpLink = createHttpLink({
  uri: '/api/graphql',
})

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await auth.currentUser?.getIdToken()
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token || '',
    },
  }
})

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    // typePolicies: {
    //   Todo: {
    //     keyFields: ['_id'],
    //   },
    // },
  }),
})
