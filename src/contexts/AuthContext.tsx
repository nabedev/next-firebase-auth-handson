import { User } from 'firebase/auth'
import { FC, ReactNode, createContext, useEffect, useState } from 'react'

import Loading from '../components/loading'
import LoginForm from '../components/login-form'
import { auth } from '../firebase'

export type AuthContextProps = {
  user: User | null | undefined
  loading: boolean
}

export const AuthContext = createContext<AuthContextProps>({
  user: undefined,
  loading: true,
})

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  if (loading) return <Loading text='Initializing user' />

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
