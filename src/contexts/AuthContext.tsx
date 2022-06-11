import { User } from "firebase"
import { createContext, FC, useState, useContext, useEffect } from "react"

import { auth } from "../firebase"

type AuthContextProps = {
  user: User | null | undefined
}

const AuthContext = createContext<AuthContextProps>({ user: undefined })

const AuthProvider: FC = ({children}) => {
  const [user, setUser] = useState<User | null | undefined>(undefined)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    })
  }, []);

  return <AuthContext.Provider value={user}>
    {children}
  </AuthContext.Provider>
}

export const AuthProvider

export function useAuth () {
  return useContext(AuthContext)
}
