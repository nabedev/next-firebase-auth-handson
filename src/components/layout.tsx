import { useContext } from 'react'

import Loading from '../components/loading'
import LoginForm from '../components/login-form'
import Navbar from '../components/navbar'
import { AuthContext } from '../contexts/AuthContext'

export default function Layout({ children }) {
  const { user, loading } = useContext(AuthContext)

  const renderContentByAuthState = () => {
    if (user) {
      return (
        <>
          <Navbar />
          {children}
        </>
      )
    }

    return (
      <div className="flex h-screen">
        <div className="m-auto">{loading ? <Loading /> : <LoginForm />}</div>
      </div>
    )
  }

  return (
    <div className="container max-w-3xl text-center">
      {renderContentByAuthState()}
    </div>
  )
}
