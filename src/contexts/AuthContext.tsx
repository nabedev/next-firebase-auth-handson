import { User } from 'firebase'
import { FC, createContext, useContext, useEffect, useState } from 'react'

import { auth } from '../firebase'

export type AuthContextProps = {
  usre: User | null | undefined
}

export const AuthContext = createContext<AuthContextProps>({ user: undefined })

export const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User | null | undefined>(undefined)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user)
    })
  }, [])

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}
