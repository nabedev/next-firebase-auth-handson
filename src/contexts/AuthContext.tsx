import { useRouter } from 'next/router'
import { User } from 'firebase/auth'
import { FC, ReactNode, createContext, useEffect, useState } from 'react'

import Loading from '../components/loading'
import DefaultLayout from '../components/default-layout'
import { auth } from '../firebase'

export type AuthContextType = User | null | undefined

export const AuthContext = createContext<AuthContextType>(undefined)

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthContextType>(undefined)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/login')
      }
      setUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  if (loading) {
    return (
      <DefaultLayout>
        <Loading text="Initializing user" />
      </DefaultLayout>
    )
  }

  // FIXME: 未認証なら`/login`にリダイレクトするが、`/`にアクセスした場合、pages/index.tsx が一度マウントされ、hooksでクエリが発行されてしまう。
  // マウントせずにリダイレクトさせたいので、未認証かつ`/login`以外へのアクセスでは、本コンポーネント以下をマウントさせないようにundefinedを返している。
  // たぶん良くない。
  if (!user && router.pathname !== '/login') return <></>

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}
