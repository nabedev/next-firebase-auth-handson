import { gql, useMutation } from '@apollo/client'
import { FC, useEffect, useState } from 'react'

import { Todo, useAddTodoMutation, useUserQuery, useDeleteTodoMutation, useUpdateTodoMutation } from '../generated/graphql'
import TodoInput from './todo-input'
import TodoItem from './todo-item'

type Props = {
  todos: Todo[]
}

const TodoList: FC<Props> = ({ todos }) => {
  const [deleteTodo] = useDeleteTodoMutation()
  const [updateTodo] = useUpdateTodoMutation()

  const handleDelete = async (id: string) => {
    await deleteTodo({ variables: { todoId: id } })
  }

  const handleUpdate = async (
    id: string,
    title: string,
    completed: boolean
  ) => {
    await updateTodo({ variables: { todoId: id, title, completed } })
  }

  if (todos.length === 0) return <p>no todo</p>

  return (
    <>
      {todos.map((val) => (
        <TodoItem
          title={val.title}
          id={val['_id']}
          completed={val.completed}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          key={val._id}
        />
      ))}
    </>
  )
}

export default TodoList
