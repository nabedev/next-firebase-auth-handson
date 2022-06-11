import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState, useContext } from 'react'
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";

import { AuthContext } from "../contexts/AuthContext"
import { auth } from "../firebase"

const Auth: NextPage = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const user = useContext(AuthContext)

  if (user) {
    router.push('/')
  }

  const handleOnClick = async () => {
    setLoading(true)
    const provider = new GithubAuthProvider();
    await signInWithPopup(auth, provider)
    setLoading(false)
  }

  return (
    <main>
      <button onClick={handleOnClick}>Login with GitHub</button>
    </main>
  )
}

export default Auth
