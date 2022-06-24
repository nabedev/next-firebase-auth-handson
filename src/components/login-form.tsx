import { GithubAuthProvider, signInWithRedirect, signInAnonymously } from 'firebase/auth'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

import { useState, useContext } from 'react'
import * as React from 'react'

import { AuthContext } from '../contexts/AuthContext'
import { auth } from '../firebase'

const LoginForm: React.FC = () =>{
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
      <button className="btn btn-lg btn-outline" disabled>Continue with Google</button>
      <button className="btn btn-lg btn-outline" disabled onClick={loginWithGithub}>Continue with GitHub</button>
      <button className="btn btn-lg" onClick={loginWithAnonymously}>Guest</button>
    </div>
  )
}

export default LoginForm
