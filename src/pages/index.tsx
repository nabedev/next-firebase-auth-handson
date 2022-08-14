import { gql, useMutation } from '@apollo/client'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { ReactElement, useContext, useEffect } from 'react'

import Loading from '../components/loading'
import AuthenticatedLayout from '../components/authenticated-layout'
import Navbar from '../components/navbar'
import TodoInput from '../components/todo-input'
import TodoList from '../components/todo-list'
import { AuthContext } from '../contexts/AuthContext'
import {
  useAddTodoMutation,
  useUpdateUserMutation,
  useUserQuery,
} from '../generated/graphql'

const Home: NextPage = () => {
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

  if (loading) return <Loading text="Fetching todo list..." />
  if (error) return <p>Error : {error.message}</p>

  return (
    <div className="flex flex-col gap-y-10 items-center mt-12">
      <TodoInput onAddTodo={handleAddTodo} disabled={loading} />
      {loading ? <Loading /> : <TodoList todos={data?.user?.todos || []} />}
    </div>
  )
}

// Home.getLayout = function getLayout(page: ReactElement) {
//   return <AuthenticatedLayout>{page}</AuthenticatedLayout>
// }

export default Home
