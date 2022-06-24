import { gql, useMutation, useQuery } from '@apollo/client'
import * as React from 'react'
import { useEffect, useState } from 'react'

import TodoInput from './todo-input'
import TodoItem from './todo-item'

const ADD_TODO = gql`
  mutation AddTodo($title: String!) {
    addTodo(title: $title) {
      _id
      title
      completed
    }
  }
`

type Todo = {
  _id: string
  title: string
  completed: boolean
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [addTodo] = useMutation(ADD_TODO)
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

  useEffect(() => {
    if (loading) return
    setTodos(data.user?.todos || [])
  }, [loading])

  const handleAddTodo = async (value) => {
    let newTodo
    try {
      newTodo = await addTodo({ variables: { title: value } })
    } catch (e) {
      console.log(e)
    }
    setTodos([...todos, newTodo.data.addTodo])
  }

  const renderTodo = () => {
    if (loading) return <progress className="progress w-56"></progress>
    if (error) return <p>Error : {error.message}</p>

    const hasTodo = todos?.length > 0
    if (!hasTodo) return <p>Nothing to do ✅</p>

    return (
      <>
        {todos.map((val) => (
          <TodoItem title={val.title} id={val['_id']} />
        ))}
      </>
    )
  }

  return (
    <div className="flex flex-col gap-y-8 items-center">
      <TodoInput onAddTodo={handleAddTodo} />
      {renderTodo()}
    </div>
  )
}

export default TodoList
