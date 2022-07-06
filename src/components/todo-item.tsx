import { FC, useState } from 'react'

type Props = {
  title: string
  id: string
  completed: boolean
  onDelete: (id: string) => void
  onUpdate: (id: string, title: string, completed: boolean) => void
}

const TodoItem: FC<Props> = ({ title, id, completed, onDelete, onUpdate }) => {
  const [checked, setChecked] = useState(completed)
  const [value, setValue] = useState(title)

  const handleChecked = () => {
    setChecked(!checked)
    onUpdate(id, value, !checked)
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
          readOnly
        />
        <input
          type="text"
          disabled={checked}
          className="input input-lg w-full max-w-xs"
          value={value}
          onChange={handleChange}
          onBlur={() => {
            onUpdate(id, value, completed)
          }}
        />
        <button
          className="btn btn-xs btn-circle btn-outline"
          onClick={() => onDelete(id)}
        >
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
