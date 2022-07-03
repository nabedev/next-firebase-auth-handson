import { User } from 'firebase/auth'
import { FC, ReactNode, createContext, useEffect, useState } from 'react'

import LoginForm from '../components/login-form'
import { auth } from '../firebase'

export type AuthContextProps = User | null | undefined

export const AuthContext = createContext<AuthContextProps>(undefined)

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null | undefined>(undefined)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
    })
    return unsubscribe
  }, [])

  if (user === undefined) return <p>loading...</p>
  if (user === null) return <LoginForm />

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}
