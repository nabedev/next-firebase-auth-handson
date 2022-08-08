import { ApolloProvider } from '@apollo/client'
import type { AppProps } from 'next/app'

import Layout from '../components/layout'
import { client } from '../contexts/ApolloContext'
import { AuthProvider } from '../contexts/AuthContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </Layout>
    </ApolloProvider>
  )
}

export default MyApp
