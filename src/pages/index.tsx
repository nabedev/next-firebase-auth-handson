import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { a, useRouter } from 'next/router'
import { useContext, useEffect } from 'react'

import TodoList from '../components/todo-list'
import { AuthContext } from '../contexts/AuthContext'
import { auth } from '../firebase'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const user = useContext(AuthContext)
  const router = useRouter()

  if (user === undefined) {
    return <h1>loading...</h1>
  }

  if (!user) {
    router.push('/auth')
    return
  }

  const logout = async () => {
    await auth.signOut()
  }

  return (
    <div className={styles.container}>
      hi
      <p>
        {user && user.email}
        {user && <button onClick={logout}>Log out</button>}
      </p>
      <TodoList />
    </div>
  )
}

export default Home
