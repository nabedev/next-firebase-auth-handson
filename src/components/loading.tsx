import { FC } from 'react'

type Props = {
  text?: string
}

const Loading: FC<Props> = ({ text }) => {
  return <div className="flex h-screen">
  <div className="m-auto text-center"><button className="btn btn-ghost loading normal-case">{text}</button></div>
</div>
}

export default Loading
