import { gql, useMutation, useQuery } from '@apollo/client'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { callbackify } from 'util'

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

const DELETE_TODO = gql`
  mutation DeleteTodo($todoId: String!) {
    deleteTodo(todoId: $todoId)
  }
`

const UPDATE_TODO = gql`
  mutation UpdateTodo($todoId: String!, $title: String!, $completed: Boolean!) {
    updateTodo(todoId: $todoId, title: $title, completed: $completed)
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
  const [deleteTodo] = useMutation(DELETE_TODO)
  const [updateTodo] = useMutation(UPDATE_TODO)

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

  const handleDelete = async (id: string) => {
    console.log('handledelete')
    await deleteTodo({ variables: { todoId: id } })
    const newTodos = todos.filter((todo) => todo._id !== id)
    console.log({ newTodos })
    setTodos(newTodos)
  }

  const handleUpdate = async (
    id: string,
    title: string,
    completed: boolean
  ) => {
    console.log(`updateTodo ${id}, ${title}, ${completed}`)
    await updateTodo({ variables: { todoId: id, title, completed } })
  }

  const renderTodo = () => {
    if (loading) return <button class="btn btn-lg btn-ghost loading" />
    if (error) return <p>Error : {error.message}</p>

    const hasTodo = todos?.length > 0
    if (!hasTodo) return <p>Nothing to do ✅</p>

    return (
      <>
        {todos.map((val) => (
          <TodoItem
            title={val.title}
            id={val['_id']}
            completed={val.completed}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
            key={val._id}
          />
        ))}
      </>
    )
  }

  return (
    <div className="flex flex-col gap-y-10 items-center">
      <TodoInput onAddTodo={handleAddTodo} />
      {renderTodo()}
    </div>
  )
}

export default TodoList
