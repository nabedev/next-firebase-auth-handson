import * as React from 'react'


const TodoInput: React.FC = () => {
  return (
    <div class="flex flex-col gap-y-8 items-center">
    <div class="form-control">
      <div class="input-group">
        <input
          type="text"
          placeholder="Create a new TODO!"
          class="input input-bordered input-info w-full max-w-xs"
        />
        <button class="btn btn-info">Add</button>
      </div>
    </div>
    </div>
  )
}

export default TodoInput
