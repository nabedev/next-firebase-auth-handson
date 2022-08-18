import { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'

import DefaultLayout from '../components/default-layout'
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
  const getLayout =
    Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>)

  return (
    <ApolloProvider>
      <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
    </ApolloProvider>
  )
}
