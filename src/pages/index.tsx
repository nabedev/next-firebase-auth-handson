import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContext } from 'react'

import Navbar from '../components/navbar'
import TodoList from '../components/todo-list'
import { AuthContext } from '../contexts/AuthContext'
import { auth } from '../firebase'

const Home: NextPage = () => {
  const user = useContext(AuthContext)
  const router = useRouter()

  if (user === undefined) {
    return <h1>loading...</h1>
  }

  if (!user) {
    router.push('/auth')
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
