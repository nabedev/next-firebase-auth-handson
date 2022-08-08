import { User } from 'firebase/auth'
import { FC, ReactNode, createContext, useEffect, useState } from 'react'

import Loading from '../components/loading'
import { auth } from '../firebase'

export type AuthContextType = User | null | undefined

export const AuthContext = createContext<AuthContextType>(undefined)

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthContextType>(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  if (loading) return <Loading text="Initializing user" />

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}
