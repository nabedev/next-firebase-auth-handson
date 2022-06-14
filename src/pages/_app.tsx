import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { AuthProvider } from '../contexts/AuthContext'
import { ApolloGqlProvider } from '../contexts/ApolloContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloGqlProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ApolloGqlProvider>
  )
}

export default MyApp
