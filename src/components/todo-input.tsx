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
        <label className="label">
          <span className="label-text">What do you do?</span>
        </label>
        <div className="input-group">
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered input-lg w-full max-w-xs"
            onChange={handleChange}
            onKeyPress={handleKeypress}
            value={value}
          />
          <button
            className="btn btn-primary btn-lg"
            onClick={handleClick}
            disabled={value === ''}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
</svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default TodoInput
