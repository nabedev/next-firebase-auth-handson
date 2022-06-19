import { User } from 'firebase/auth'
import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

import { auth } from '../firebase'

export type AuthContextProps = User | null | undefined

export const AuthContext = createContext<AuthContextProps>(undefined)

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null | undefined>(undefined)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user)
    })
  }, [])

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}
