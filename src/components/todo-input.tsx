import * as React from 'react'
import { useState } from 'react'

type TodoInputProps = {
  onAddTodo: (value: string) => void
}

const TodoInput: React.FC<TodoInputProps> = ({ onAddTodo }) => {
  const [value, setValue] = useState('')

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const handleKeypress = (e) => {
    if (e.key == 'Enter') {
      e.preventDefault()
      onAddTodo(value)
      setValue('')
    }
  }

  const handleClick = () => {
    onAddTodo(value)
    setValue('')
  }

  return (
    <div className="flex flex-col gap-y-8 items-center">
      <div className="form-control">
        <div className="input-group">
          <input
            type="text"
            placeholder="Create a new TODO"
            className="input input-bordered input-info w-full max-w-xs"
            onChange={handleChange}
            onKeyPress={handleKeypress}
            value={value}
          />
          <button
            className="btn btn-info"
            onClick={handleClick}
            disabled={value === ''}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  )
}

export default TodoInput
