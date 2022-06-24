import { useState } from 'react'
import * as React from 'react'

import { gql, useMutation, useQuery } from '@apollo/client'

const DELETE_TODO = gql`
  mutation DeleteTodo($todoId: String!) {
    deleteTodo(todoId: $todoId)
  }
`

const TodoItem: React.FC<{ title: string, id: string }> = ({ title, id }) => {
  const [checked, setChecked] = useState(false)
  const [value, setValue] = useState(title)
  const [deleteTodo] = useMutation(DELETE_TODO)

  const handleDelete = async () => {
    await deleteTodo({ variables: { todoId: id } })
  }

  const handleChecked = () => {
    setChecked(!checked)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  return (
    <>
      <div className="flex items-center gap-x-2">
        <input
          type="checkbox"
          checked={checked}
          className="checkbox checkbox-accent checkbox-md"
          onClick={handleChecked}
        />
        <input
          type="text"
          disabled={checked}
          className="input input-md w-full max-w-xs"
          value={value}
          onChange={handleChange}
        />
        <button className="btn btn-sm btn-square btn-outline" onClick={handleDelete}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </>
  )
}

export default TodoItem
