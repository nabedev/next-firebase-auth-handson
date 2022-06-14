import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

export type ApolloContextProps = {
  client: ApolloClient | null | undefined
}

const client = new ApolloClient({
  // FIXME
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
});

export const ApolloGqlProvider: FC = ({children}) => {
  return <ApolloProvider client={client}>
    {children}
  </ApolloProvider>
}
