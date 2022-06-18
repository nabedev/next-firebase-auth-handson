import type { AppProps } from 'next/app'

import { ApolloGqlProvider } from '../contexts/ApolloContext'
import { AuthProvider } from '../contexts/AuthContext'
import '../styles/globals.css'

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
