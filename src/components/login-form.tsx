import {
  GithubAuthProvider,
  signInAnonymously,
  signInWithRedirect,
} from 'firebase/auth'
import { useRouter } from 'next/router'
import { FC, useContext, useState } from 'react'

import { AuthContext } from '../contexts/AuthContext'
import { auth } from '../firebase'

const LoginForm: FC = () => {
  const [loading, setLoading] = useState(false)
  const user = useContext(AuthContext)
  const router = useRouter()

  if (user) {
    router.push('/')
  }

  if (loading) return <p>Loading...</p>

  const loginWithGithub = async () => {
    setLoading(true)
    const provider = new GithubAuthProvider()
    await signInWithRedirect(auth, provider)
    setLoading(false)
  }

  const loginWithAnonymously = async () => {
    setLoading(true)
    await signInAnonymously(auth)
    setLoading(false)
  }

  return (
    <div className="flex flex-col gap-y-10">
      <button className="btn btn-lg btn-outline" disabled>
        Continue with Google
      </button>
      <button
        className="btn btn-lg btn-outline"
        disabled
        onClick={loginWithGithub}
      >
        Continue with GitHub
      </button>
      <button className="btn btn-lg" onClick={loginWithAnonymously}>
        Guest
      </button>
    </div>
  )
}

export default LoginForm
