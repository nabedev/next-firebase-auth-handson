import { useContext, useEffect } from 'react'
import type { NextPage } from 'next'
import { useRouter, a } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'

import styles from '../styles/Home.module.css'

import { AuthContext } from "../contexts/AuthContext"

import TodoList from "../components/todo-list"

import { auth } from "../firebase"

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
