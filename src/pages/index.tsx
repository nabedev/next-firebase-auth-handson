import { gql, useMutation } from '@apollo/client'
import type { NextPage } from 'next'
import { useContext, useEffect } from 'react'

import Navbar from '../components/navbar'
import TodoList from '../components/todo-list'
import LoginForm from '../components/login-form'
import { AuthContext } from '../contexts/AuthContext'


const UPDATE_USER = gql`
  mutation UpdateUser($uid: String!) {
    updateUser(uid: $uid) {
      _id
    }
  }
`

const Home: NextPage = () => {
  const user = useContext(AuthContext)
  const [updateUser] = useMutation(UPDATE_USER)

  useEffect(() => {
    if (!user) return
    updateUser({
      variables: {
        uid: user.uid,
      },
    })
  }, [user])

  if (user === undefined) {
    return <h1>loading...</h1>
  }

  return (
    <div className="container max-w-3xl">
      <Navbar user={user}/>
      {user ? <TodoList /> : <LoginForm />}
    </div>
  )
}

export default Home
