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

  const renderContent = () => {
    // TODO: firebaseのonAuthStateChangedでユーザーを取得中は初期値のundefinedに設定される。
    // AuthContextでloadingの状態を持った方が良さそう。
    if (user === undefined) return <button className="btn btn-lg btn-ghost loading" />
    if (user === null) return <LoginForm />
    return <TodoList />
  }

  return (
    <div className="container max-w-3xl text-center">
      <Navbar user={user}/>
      {renderContent()}
    </div>
  )
}

export default Home
