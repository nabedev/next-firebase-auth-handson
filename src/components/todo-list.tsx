import { gql, useQuery } from '@apollo/client'
import * as React from 'react'

import TodoInput from './todo-input'
import TodoItem from './todo-item'

type Todo = {
  id: number
  title: string
  completed: boolean
}

type QueryData = {
  todos: Todo[]
}

const TodoList: React.FC = () => {
  const { loading, error, data } = useQuery<QueryData>(gql`
    query ExampleQuery {
      todos {
        title
      }
    }
  `)
  console.log({ data })

  if (loading) return <progress className="progress w-56"></progress>
  if (error) return <p>Error : {error.message}</p>

  if (data === undefined) return <p>no todos</p>

  return (
    <div className="flex flex-col gap-y-8 items-center">
      <TodoInput />
      {loading ? (
        <progress className="progress w-56"></progress>
      ) : (
        data.todos.map((val, key) => <TodoItem title={val.title} key={key}/>)
      )}
    </div>
  )
}

export default TodoList
