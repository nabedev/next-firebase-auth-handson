import { FC } from 'react'

const Loading: FC = () => {
  return (
    <span className="flex h-4 w-4">
      <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-sky-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-4 w-4 bg-sky-500"></span>
    </span>
  )
}

export default Loading
