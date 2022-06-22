import * as React from 'react'


const TodoInput: React.FC = () => {
  return (
    <div className="flex flex-col gap-y-8 items-center">
    <div className="form-control">
      <div className="input-group">
        <input
          type="text"
          placeholder="Create a new TODO!"
          className="input input-bordered input-info w-full max-w-xs"
        />
        <button className="btn btn-info">Add</button>
      </div>
    </div>
    </div>
  )
}

export default TodoInput
