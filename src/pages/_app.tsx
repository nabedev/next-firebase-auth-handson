import { ApolloProvider } from '@apollo/client'
import type { AppProps } from 'next/app'

import Layout from '../components/layout'
import { client } from '../contexts/ApolloContext'
import { AuthProvider } from '../contexts/AuthContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ApolloProvider>
  )
}

export default MyApp
