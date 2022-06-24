import { useState } from 'react'
import * as React from 'react'

import { gql, useMutation, useQuery } from '@apollo/client'

type TodoItemProps = {
  title: string,
  id: string,
  handleDelete: (id: string) => void,
  handleUpdate: (id: string, title: string, completed: boolean) => void,
}

const TodoItem: React.FC<TodoItemProps> = ({ title, id, completed, handleDelete, handleUpdate }) => {
  const [checked, setChecked] = useState(completed)
  const [value, setValue] = useState(title)


  const handleChecked = () => {
    setChecked(!checked)
    handleUpdate(id, value, !checked)
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
          className="input input-lg w-full max-w-xs"
          value={value}
          onChange={handleChange}
        />
        <button className="btn btn-xs btn-circle btn-outline" onClick={() => handleDelete(id)}>
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
