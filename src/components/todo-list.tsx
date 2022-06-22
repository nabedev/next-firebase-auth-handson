import { gql, useQuery } from '@apollo/client'
import { useState } from 'react'
import * as React from 'react'

import TodoItem from "./todo-item";
import TodoInput from "./todo-input";

type Todo = {
  id: number
  title: string
  completed: boolean
}

type QueryData = {
  todos: Todo[]
}

const TodoList: React.FC = () => {
  const [checked, setChecked] = useState(false)
  const { loading, error, data } = useQuery<QueryData>(gql`
    query ExampleQuery {
      todos {
        title
      }
    }
  `)
  console.log({ data })

  if (loading) return <progress class="progress w-56"></progress>
  if (error) return <p>Error : {error.message}</p>

  if (data === undefined) return <p>no todos</p>

  const handleClick = () => {
    setChecked(!checked)
  }

  return (
      <div class="flex flex-col gap-y-8 items-center">
      <TodoInput />
      {data.todos.map((val, key) => (
        <TodoItem title={val.title} />
      ))}
      </div>
  )
}

export default TodoList
