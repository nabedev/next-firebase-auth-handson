import React from 'react'
import { NextPage, NextPageContext } from 'next'

type Props = {
  statusCode: number
  message?: string
}

const NotFound: NextPage<Props> = (props: Props) => {
  return (
    <div>
      <div>not found</div>
      <div>{props.statusCode}</div>
    </div>
  )
}

export default NotFound
