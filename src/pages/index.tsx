import { useContext, useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { AuthContext } from "../contexts/AuthContext"

import { auth } from "../firebase"

const Home: NextPage = () => {
  const user = useContext(AuthContext)

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
    </div>
  )
}

export default Home
