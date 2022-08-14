import { NextPage } from 'next'
import type { AppProps } from 'next/app'

import Layout from '../components/layout'
import { AuthProvider } from '../contexts/AuthContext'
import { ApolloProvider } from '../contexts/ApolloContext'
import '../styles/globals.css'

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>)

  return (
    <ApolloProvider>
      {getLayout(
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      )}
    </ApolloProvider>
  )
}
