import { ApolloProvider } from '@apollo/client'
import type { AppProps } from 'next/app'

import { client } from '../contexts/ApolloContext'
import { AuthProvider } from '../contexts/AuthContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ApolloProvider>
  )
}

export default MyApp
