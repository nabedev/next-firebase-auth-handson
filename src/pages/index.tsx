import { useContext, useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useQuery, gql } from '@apollo/client'

import styles from '../styles/Home.module.css'

import { AuthContext } from "../contexts/AuthContext"

import { auth } from "../firebase"

const Home: NextPage = () => {
  const user = useContext(AuthContext)
  const { loading, error, data } = useQuery(gql`query ExampleQuery {
    todos {
      title
    }
  }`)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  if (user === undefined) {
    return <h1>loading...</h1>
  }

  console.log(data)

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
      <ul>
      {data.todos.map((val, key)=> <li key={key}>{val.title}</li>)}
      </ul>
    </div>
  )
}

export default Home
