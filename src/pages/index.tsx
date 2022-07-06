import { gql, useMutation } from '@apollo/client'
import type { NextPage } from 'next'
import { useContext, useEffect } from 'react'

import LoginForm from '../components/login-form'
import Navbar from '../components/navbar'
import TodoInput from '../components/todo-input'
import TodoList from '../components/todo-list'
import { AuthContext } from '../contexts/AuthContext'
import { useAddTodoMutation, useUserQuery, useUpdateUserMutation } from '../generated/graphql'


const Home: NextPage = () => {
  const user = useContext(AuthContext)
  const { data, loading, error } = useUserQuery()
  const [addTodoMutation] = useAddTodoMutation()
  const [updateUser] = useUpdateUserMutation()

  const handleAddTodo = async (title: string) => {
    try {
      await addTodoMutation({ variables: { title } })
    } catch (e) {
      console.log(e)
    }
  }

  const renderContent = () => {
    if (loading) return <button className="btn btn-lg btn-ghost loading" />
    if (error) return <p>Error : {error.message}</p>

    console.log('index render')
    return (
      <div className="flex flex-col gap-y-10 items-center">
        <TodoInput onAddTodo={handleAddTodo} />
        <TodoList todos={data?.user?.todos || []} />
      </div>
    )
  }

  return (
    <div className="container max-w-3xl text-center">
      <Navbar user={user} />
      {renderContent()}
    </div>
  )
}

export default Home
