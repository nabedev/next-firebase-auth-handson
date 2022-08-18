import { FC } from 'react'

type Props = {
  text?: string
}

const Loading: FC<Props> = ({ text }) => {
  return <button className="btn btn-ghost loading normal-case">{text}</button>
}

export default Loading
