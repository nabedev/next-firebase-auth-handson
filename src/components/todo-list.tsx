import { gql, useQuery } from '@apollo/client'
import * as React from 'react'

import TodoInput from './todo-input'
import TodoItem from './todo-item'


const TodoList: React.FC = () => {
  const { loading, error, data } = useQuery(gql`
    query ExampleQuery {
      user {
        _id
        todos {
          _id
          title
          completed
        }
      }
    }
  `)

  if (loading) return <progress className="progress w-56"></progress>
  if (error) return <p>Error : {error.message}</p>

  const { todos } = data.user
  if (todos === undefined) return <p>no todos</p>

  return (
    <div className="flex flex-col gap-y-8 items-center">
      <TodoInput />
      {loading ? (
        <progress className="progress w-56"></progress>
      ) : (
        todos.map((val, key) => <TodoItem title={val.title} key={key}/>)
      )}
    </div>
  )
}

export default TodoList
