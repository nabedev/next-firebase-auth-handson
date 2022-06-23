import { gql, useMutation } from '@apollo/client'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'

import Navbar from '../components/navbar'
import TodoList from '../components/todo-list'
import { AuthContext } from '../contexts/AuthContext'
import { auth } from '../firebase'

const UPDATE_USER = gql`
  mutation UpdateUser($uid: String!, $email: String!) {
    updateUser(uid: $uid, email: $email) {
      _id
    }
  }
`

const Home: NextPage = () => {
  const user = useContext(AuthContext)
  const router = useRouter()
  const [updateUser] = useMutation(UPDATE_USER)

  useEffect(() => {
    if (!user) return
    updateUser({
      variables: {
        uid: user.uid,
        email: user.email,
      },
    })
  }, [user])

  if (user === undefined) {
    return <h1>loading...</h1>
  }

  if (!user) {
    router.push('/auth')
    return <></>
  }

  const logout = async () => {
    await auth.signOut()
  }

  return (
    <div className="container mx-auto">
      <Navbar />
      <p>
        {user && user.email}
        {user && <button onClick={logout}>Log out</button>}
      </p>
      <TodoList />
    </div>
  )
}

export default Home
